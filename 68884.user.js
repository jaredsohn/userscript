// ==UserScript==
// @name Pardus Pilot Spy
// @version 1.10
// @namespace coawyn@gmail.com
// @description Records information on your travels across Pardus.
// @attribution LCN (http://www.pardus-lcn.org/)
// @attribution Pardus Infocenter
// @attribution Rhindon
// @homepage http://unique.hobby-site.com/
// @include http://*.pardus.at/alliance_members.php
// @include http://*.pardus.at/building.php
// @include http://*.pardus.at/bulletin_board.php
// @include http://*.pardus.at/combat_details.php*
// @include http://*.pardus.at/game.php
// @include http://*.pardus.at/index_buildings.php*
// @include http://*.pardus.at/main.php*
// @include http://*.pardus.at/overview_ship.php
// @include http://*.pardus.at/overview_stats.php
// @include http://*.pardus.at/overview_tl_res.php*
// @include http://*.pardus.at/ship2opponent_combat.php*
// @include http://*.pardus.at/starbase.php
// @include http://www.pardus.at/index.php?section=account_settings
// ==/UserScript==
// Portions of script from LCN, Pardus Infocenter, Rhindon, and Zaqwer.

var release = "Pardus Spy 1.10";

var sectorUrl = "http://unique.hobby-site.com/Pardus-Spy/SectorReport";
var submitUrl = "http://unique.hobby-site.com/Pardus-Spy/Pilot";
var webServiceUrl = "http://unique.hobby-site.com/Pardus-Spy/WS";

var location;
var ac;
var followRoute;
var route;
var recordCombatLogs;

var Preferences = new Array();


String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


function A_setValue(name, value) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+(365*5));
	document.cookie = "A_" + name + "=" + escape(value) + "; path=/; domain=.pardus.at; expires=" + exdate.toUTCString();
}


function A_deleteValue(name) {
	document.cookie = "A_" + name + "=; path=/; expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


function A_getValue(name, defaultValue) {
	var nameEQ = "A_" + name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0;i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') { c = c.substring(1,c.length); }
		if (c.indexOf(nameEQ) === 0) { return unescape(c.substring(nameEQ.length,c.length)); }
	}
	var gmValue = GM_getValue(name,defaultValue);
	if (gmValue == undefined) {
		return defaultValue;
	} else {
		if (gmValue != defaultValue) {
			A_setValue(name, gmValue);
//			GM_deleteValue(name);
		}
		return gmValue;
	}
}


function A_getBooleanValue(name, defaultValue) {
	var value = A_getValue(name, defaultValue);
	if (value == "false") {
		return false;
	} else if (value == "true") {
		return true;
	} else {
		return value;
	}
}


function stripFileName(filePath) {
	return filePath.substring(filePath.lastIndexOf("/") + 1,filePath.lastIndexOf("."));
}


function highlightRoute(row, cell) {
	row.style.backgroundColor = "#FFFF00";
	cell.style.opacity = ".8";
}


function getNavArea() {
	return getMyNavArea(document);
}


function getMyNavArea(myDocument) {
	var nav = myDocument.getElementById('nav');
	if (nav && nav.style.display.match(/none/)) {
		return myDocument.getElementById('navtransition').childNodes[0];
	} else {
		return myDocument.getElementById('navarea');
	}
}


function generateMapParams() {
	var params = "";

	var viewSize = 0;

	var yRows = getNavArea().getElementsByTagName('tr');
	var gridX = location.pilotX - ((yRows[0].getElementsByTagName("td").length - 1) / 2);
	var gridY = location.pilotY - ((yRows.length - 1) / 2);
	for (var y = 0; y < yRows.length; y++) {
		var xTDs = yRows[y].getElementsByTagName("td");
		for (var x = 0; x < xTDs.length; x++) {
			var img = xTDs[x].getElementsByTagName("img")[0];
			if (img.src.indexOf("nodata") == -1) {
				if (x > viewSize) {
					viewSize = x;
				}
				var tileX = x + gridX;
				var tileY = y + gridY;
				if (tileX > -1 && tileY > -1) {
					var tileImage;
					if (xTDs[x].style.backgroundImage.length == 0) {
						backGround = img.src.substring(img.src.lastIndexOf("/") + 1,img.src.length);
					} else {
						backGround = xTDs[x].style.backgroundImage.substring(xTDs[x].style.backgroundImage.lastIndexOf("/") + 1,xTDs[x].style.backgroundImage.length - 1);
						if (img.src.indexOf("foregrounds") > -1) {
							var foreGround = img.src.substring(img.src.lastIndexOf("/") + 1,img.src.length);
							params = params + "&" + tileX + "_" + tileY + "FG=" + foreGround;
						} else if (img.src.indexOf("opponents") > -1) {
							var foreGround = stripFileName(img.src);
							params = params + "&" + tileX + "_" + tileY + "Oppon=" + foreGround;
						}
					}
					params = params + "&" + tileX + "_" + tileY + "BG=" + backGround;
					if (followRoute) {
						for (var i = 0; i < route.length; i++) {
							if (route[i] == tileX + "," + tileY) {
								highlightRoute(yRows[y], xTDs[x]);
							}
						}
					}
				}
			}
		}
	}

	return "&VS=" + viewSize + params;
}


function parsePilotList() {
	var pilots = [];

	var chk_page = document.location.href.split("?");
	var otherShipsContent = document.getElementById("otherships_content");
	if (chk_page.length > 1 || (otherShipsContent.firstChild != null && otherShipsContent.firstChild.tagName == "DIV")) { // check to see if this is an update action
		var pilot = {};
		pilot.syndicate = "";
		pilot.rank = 0;

		var detail_working = document.getElementById("otherships_content");
		var rough_pilot_rank = detail_working.getElementsByTagName("img")[0].getAttribute("src");
		if (rough_pilot_rank) {
			if (rough_pilot_rank.indexOf("eps") > 0 || rough_pilot_rank.indexOf("tss") > 0) {
				pilot.syndicate = stripFileName(rough_pilot_rank);
			}
		}

		var imgs = detail_working.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.indexOf("rank") > -1) {
				pilot.rank = stripFileName(imgs[i].src).replace(/[^\d]/g,'');
				break;
			}
		}

		pilot.name = detail_working.getElementsByTagName("a")[0].innerHTML;

		pilot.update = true;
		pilots.push(pilot);
	} else { // okay Grab the information from the otherships window.
		var div = document.getElementById("otherships");

		if (div == null || div.style.display == 'none')
			return null;

		var tables = div.getElementsByTagName("table");

		//next few need to be changed, once a foreach is added into the code
		for (var i = 0; i < tables.length; i++) {
			var pilot = {};
			pilot.update = false;

				var working = tables[i].getElementsByTagName("td");

			if ( working[0].firstChild ) {
				var raw_faction = working[0].getElementsByTagName("img")[0].getAttribute("src"); // faction insignia

				if (raw_faction.indexOf("eps") > 0 || raw_faction.indexOf("tss")  >0) {
					pilot.syndicate = raw_faction;
					raw_faction = working[0].getElementsByTagName("img")[3].getAttribute("src"); // faction insignia
				}
			} else {
				var raw_faction = "";
			}

			// Get the pilots Name
			// Check and make sure we are at the last child, bounty notifications can ass this up

			if ( working[1].getElementsByTagName("a")[0].getAttribute('title') ) {
				pilot.name = working[1].getElementsByTagName("a")[0].lastChild.innerHTML;								
			} else {
				pilot.name = working[1].getElementsByTagName("a")[0].innerHTML;
			}

			// Get the alliance
			if (working[1].getElementsByTagName("a").length > 1 && working[1].getElementsByTagName("a")[1].firstChild.innerHTML)
				pilot.alliance =  working[1].getElementsByTagName("a")[1].firstChild.innerHTML;
			else
				pilot.alliance = "";

			// Pull out the faction Abreviation from the image name
			var raw1_faction = raw_faction.split("/")[raw_faction.split("/").length-1];
			var raw2_faction = raw1_faction.split(".")[0];
			pilot.faction = raw1_faction.split("_")[1];

			// get the ship information
			var ship_img = working[0].style.backgroundImage.replace(/^url|[\(\)]/g, '');
			if (ship_img) {
				var filename = ship_img.split("/")[ship_img.split("/").length-1];
				pilot.ship = filename.split(".")[0];
			}
			pilots.push(pilot);
		}
	}
	return pilots; 
}


function parseLocation() {
	var spans = document.getElementById("status_content").getElementsByTagName("span");
	var sector = spans[0].textContent;
	var coords = spans[1].textContent;
	var pilotX = coords.substring(1,coords.indexOf(','));
	var pilotY = coords.substring(coords.indexOf(',')+1,coords.indexOf(']'));
	var fieldAmount = spans[3].textContent;

	A_setValue("Sector", sector);
	A_setValue("X", pilotX);
	A_setValue("Y", pilotY);

	var location ={};
	location.name = sector;
	location.pilotX = pilotX;
	location.pilotY = pilotY;
	location.fieldAmount = fieldAmount;

	if (followRoute) {
		if (A_getValue("RouteSector",null) != sector) {
			followRoute = false;
			loadRoute(document);
		}
	}

	return location;
}


function loadRoute(myDocument) {
	if (followRoute) {
		navPath(myDocument, false);
	}
	var universe = document.location.hostname.split(".")[0];
	var sector = A_getValue("Sector",null);
	GM_xmlhttpRequest({
		method: "POST",
		url: webServiceUrl,
		data: "Route&universe=" + universe + "&sector=" + sector,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			if (response.responseText.length > 0) {
				A_setValue("Route", response.responseText);
				route = response.responseText.split(";");
				followRoute = true;
				navPath(myDocument, true);
			} else {
				followRoute = false;
				alert("No Route Found\n\nPlease login to Arkoan's Super Awesome Map to create a route.");
				window.open(sectorUrl + "?universe=" + universe + "&sector=" + sector);
			}
			A_setValue("RouteSector", sector);
			A_setValue("FollowRoute", followRoute);
		}
	});
}


function cancelRoute(myDocument) {
	A_setValue("FollowRoute", false);
	navPath(myDocument, false);
}


function enterDestination(myDocument) {
	var destination = prompt("Please enter sector and coordinates like: Tau Ceti[11,4]");
	if (destination != null && destination.length > 5) {
		if (followRoute) {
			navPath(myDocument, false);
		}
		var destSector = destination.substring(0,destination.indexOf("[")).trim();
		var roughXY = destination.substring(destination.indexOf("[")+1, destination.indexOf("]")).split(",");
		var destX = roughXY[0].replace(/[^0-9]/g, "");
		var destY = roughXY[1].replace(/[^0-9]/g, "");
		var universe = document.location.hostname.split(".")[0];
		var spans = myDocument.getElementById("status_content").getElementsByTagName("span");
		var sector = spans[0].textContent;
		var coords = spans[1].textContent;
		var pilotX = coords.substring(1,coords.indexOf(','));
		var pilotY = coords.substring(coords.indexOf(',')+1,coords.indexOf(']'));
		GM_xmlhttpRequest({
			method: "POST",
			url: webServiceUrl,
			data: "Route&universe=" + universe + "&sector=" + sector + "&x=" + pilotX + "&y=" + pilotY
				+ "&RouteStartSector=" + sector + "&RouteStartX=" + pilotX + "&RouteStartY=" + pilotY
				+ "&RouteEndSector=" + destSector + "&RouteEndX=" + destX + "&RouteEndY=" + destY
				+ "&MagScoop=0",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				if (response.responseText.length > 0) {
					A_setValue("Route", response.responseText);
					route = response.responseText.split(";");
					followRoute = true;
					navPath(myDocument, true);
				} else {
					followRoute = false;
					alert("No Route Found\n\nPlease login to Arkoan's Super Awesome Map to create a route.");
					window.open(sectorUrl + "?universe=" + universe + "&sector=" + sector);
				}
				A_setValue("RouteSector", sector);
				A_setValue("FollowRoute", followRoute);
			}
		});
	}
}


function navPath(myDocument, highlight) {
	var spans = myDocument.getElementById("status_content").getElementsByTagName("span");
	var coords = spans[1].textContent;
	var pilotX = coords.substring(1,coords.indexOf(','));
	var pilotY = coords.substring(coords.indexOf(',')+1,coords.indexOf(']'));
	var yRows = getMyNavArea(myDocument).getElementsByTagName('tr');
	var gridX = pilotX - ((yRows[0].getElementsByTagName("td").length - 1) / 2);
	var gridY = pilotY - ((yRows.length - 1) / 2);
	for (var y = 0; y < yRows.length; y++) {
		var xTDs = yRows[y].getElementsByTagName("td");
		for (var x = 0; x < xTDs.length; x++) {
			var img = xTDs[x].getElementsByTagName("img")[0];
			if (img.src.indexOf("nodata") == -1) {
				var tileX = x + gridX;
				var tileY = y + gridY;
				if (tileX > -1 && tileY > -1) {
					for (var i = 0; i < route.length; i++) {
						if (route[i] == tileX + "," + tileY) {
							if (highlight) {
								highlightRoute(yRows[y], xTDs[x]);
							} else {
								xTDs[x].style.opacity = "1";
							}
						}
					}
				}
			}
		}
	}
}


function postCombat(universe, timezone) {
	function extractStr(source, begin, end) {
		var re = new RegExp(begin, "i");
		var i = source.search(re) + begin.length;
		var str = source.substring(i);
		re = new RegExp(end, "i");
		var j = str.search(re);
		return str.substring(0, j);
	}

	function trim(str) {
		var result = str.replace(/^\s+/, "");
		return result.replace(/\s+$/, "");
	}

	function prepareName(name) {
		var i = name.indexOf("(");
		return trim(i == -1 ? name : name.substr(0, i));
	}

	function append_input(form, name, value) {
		var input = document.createElement("input");
		input.type = "hidden";
		input.name = name;
		input.value = value;
		form.appendChild(input);
	}

	var cmbt = new Object();
	var str = document.location.search;
	cmbt.pid = str.substring(str.indexOf("=") + 1);
	var html = document.body.innerHTML;
	var elem = document.getElementById("report").previousSibling;
	while (elem && !elem.tagName)
		elem = elem.previousSibling;
	str = elem.innerHTML;
	var values = str.split(/<br>/i);
	cmbt.type = values[0];
	cmbt.additional = values[1];
	cmbt.when = new Date(values[values.length - 2].replace(/-/g, "/")).getTime();
	str = values[values.length - 1];
	var delim = null;
	if (str.search(/font/i) != -1) {
		delim = /<font.+font>/i;
		cmbt.outcome = extractStr(str, ">", "<");
	} else {
		var delims = ["disengaged from battle with", "was defeated by", "defeated"];
		var outcomes = ["disengaged", "was defeated by", "defeated"];
		for (var i = 0; i < delims.length; i++)
			if (str.indexOf(delims[i]) != -1) {
				delim = delims[i];
				cmbt.outcome = outcomes[i];
				break;
			}
	}
	values = str.split(delim);
	cmbt.attacker = prepareName(values[0]);
	cmbt.defender = prepareName(values[1]);
	str = extractStr(html, "confrontation in ", "]");
	values = str.split(" [");
	cmbt.sector = values[0];
	cmbt.coords = values[1];
	cmbt.data = extractStr(html, "cr = \"", "\"");
	var form = document.getElementById("combatPost");
	if (form)
		document.body.removeChild(form);
	form = document.createElement("form");
	form.style.display = "none";
	form.action = submitUrl;
	form.method = "get";
	form.target = "spyCombatFrame";
	form.id = "combatPost";
	if (recordCombatLogs) {
		append_input(form, "pid", cmbt.pid);
		append_input(form, "data", cmbt.data);
	}
	append_input(form, "type", cmbt.type);
	append_input(form, "when", cmbt.when);
	append_input(form, "universe", universe);
	append_input(form, "timezone", timezone);
	if (ac != null) {
		append_input(form, "AC", ac);
	}
	append_input(form, "sector", cmbt.sector);
	var xyRough = cmbt.coords.split(",");
	append_input(form, "x", xyRough[0]);
	append_input(form, "y", xyRough[1]);
	append_input(form, "attacker", cmbt.attacker);
	append_input(form, "defender", cmbt.defender);
	append_input(form, "outcome", cmbt.outcome);
	append_input(form, "additional", cmbt.additional);
	document.body.appendChild(form);
	var frame = document.getElementById("spyCombatFrame");
	if (!frame) {
		frame = document.createElement("iframe");
		frame.name = "spyCombatFrame";
		frame.id = frame.name;
		frame.style.display = "none";
		document.body.appendChild(frame);
	}
	form.submit();
}


function bulletinBoard(universe) {
	var tbl = null;
	var text = null;
	var sector = null;
	var x = null;
	var y = null;
	var type = null;
	var type_img = null;

	var cell = null;
	var id = null;
	var img = null;
	var i = 0;
	var temp;

	var postData = "universe=" + universe + "&bb=1";

	var mode = document.getElementById('tipBox').nextSibling.textContent;
	if (mode.match('compact mode')) {
		tbl = document.getElementsByTagName('table');
		for (i = 4; i < tbl.length; i++) {
			// Skip over anything that doesn't have tables inside of it.
			if (tbl[i].getElementsByTagName('table').length === 0) { continue; }

			// Lets get the Body of the Mission and set some default values
			text = tbl[i].rows[1].cells[2].getElementsByTagName('b');

			// Grab the first cell of the first row
			cell = tbl[i].rows[0].cells[0];

			//Check if we are looking for War Points
			if (cell.textContent.match("War Points")) {
				// Skip for now
				cell = tbl[i].rows[0].cells[1];
			}

			img = cell.getElementsByTagName('img')[0];

			// Check to see if this is a TSS or EPS or Faction Mission
			if (img) {
				// Check if this is a TSS or EPS mission
				img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1);
				// If We have a TSS or EPS Mission Jump to the Next Cell
				if (img.match("tss") || img.match("eps")) { cell = tbl[i].rows[0].cells[1]; }
			}

			type = cell.textContent.trim();
			if (type == "Assassination") {
				// Get Img for Missions
				img = tbl[i].rows[1].getElementsByTagName('img')[0];
				type_img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1);
				sector = text[1].textContent;
				x = text[2].textContent.split(',')[0];
				y = text[2].textContent.split(',')[1];
				if (x != null && y != null) {
					postData += "&opponent=" + stripFileName(type_img);
					postData += "&sector=" + sector;
					postData += "&x=" + x;
					postData += "&y=" + y;
				}
			}
		}
	} else {
		tbl = document.getElementById('missions').childNodes[0];
		for (i = 1; i < tbl.rows.length; i++) {
			var r = tbl.rows[i];
			var j = 0;
			j++;
			if (r.cells.length == 11) {
				j++;
				img = r.cells[j++].getElementsByTagName('img')[0];
				if (img) {
					type_img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1);
					type = img.alt;
				}
			} else {
				img = r.cells[j++].getElementsByTagName('img')[0];
				if (img) {
					type_img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1);
					type = img.alt;
				}
			}
			if (type == "Assassination") {
				j++;
				j++;
				j++;
				// Get Sector
				temp = r.cells[j++].innerHTML;
				if (temp.length > 1) { sector = temp; }
				// Get Coords
				temp = r.cells[j++].innerHTML;
				if (temp.length > 1) {
					x = temp.substring(1,temp.indexOf(','));
					y = temp.substring(temp.indexOf(',') + 1,temp.indexOf(']'));
				}
				sector = text[1].textContent;
				x = text[2].textContent.split(',')[0];
				y = text[2].textContent.split(',')[1];
				if (x != null && y != null) {
					postData += "&opponent=" + stripFileName(type_img);
					postData += "&sector=" + sector;
					postData += "&x=" + x;
					postData += "&y=" + y;
				}
			}
		}
	}
	return postData;
}


function postData() {
	var params = "";

	var universe = document.location.hostname.split(".")[0];

	if (document.location.href.indexOf("account_settings") > -1) {
		A_deleteValue("Timezone");
		var table = document.getElementsByClassName("listing_table")[0];
		var tds = table.getElementsByTagName("td");
		for (var i = 0; i < tds.length; i++) {
			if (tds[i].innerHTML.indexOf("GMT") > -1) {
				var options = tds[i].getElementsByTagName("option");
				for (var i = 0; i < options.length; i++) {
					if (options[i].selected) {
						A_setValue("Timezone", options[i].value);
						break;
					}
				}
			}
		}
	} else if (document.location.href.indexOf("overview_tl_res") > -1) {
		var timezone = A_getValue("Timezone",null);
		if (timezone != null) {
			params = "universe=" + universe +
				"&timezone=" + timezone;
			var ms = document.getElementsByClassName("messagestyle")[1];
			var trs = ms.getElementsByTagName("tr");
			var count = 0
			for (var i = 1; i < trs.length; i++) {
				var tds = trs[i].getElementsByTagName("td");
				var datetime = tds[1].innerHTML;
				var logloc = tds[2].innerHTML;
				logloc = logloc.substring(logloc.indexOf("(")+1, logloc.indexOf(")"));
				var sector = logloc.substring(0,logloc.lastIndexOf(" "));
				var xyRough = logloc.substring(sector.length + 1).split(",");
				var x = xyRough[0].replace(/[^0-9]/g, "");
				var y = xyRough[1].replace(/[^0-9]/g, "");
				var pilot = tds[3].getElementsByTagName("a")[0].innerHTML;
				params = params + "&datetime_" + i + "=" + datetime +
					"&sector_" + i + "=" + sector +
					"&x_" + i + "=" + x +
					"&y_" + i + "=" + y +
					"&pilot_" + i + "=" + pilot;
				count = count + 1;
			}
			params = params + "&count=" + count;
		}
	} else if (document.location.href.indexOf("overview_stats") > -1) {
		if (recordCombatLogs) {
			var ms = document.getElementsByClassName("messagestyle")[0];
			var tds = ms.getElementsByTagName("td");
			for (var i = 0; i < tds.length; i++) {
				if (tds[i].innerHTML.indexOf("Name:") > -1) {
					params = "nameupdate&universe=" + universe +
						"&name=" + tds[i + 1].innerHTML.replace(/<\S[^><]*>/g, "");
					break;
				}
			}
		}
	} else if (document.location.href.indexOf("ship2opponent_combat") > -1) {
		var sector;
		var x;
		var y;
		var opponent;
		var tds = document.getElementsByTagName("td");
		for (var i = 0; i < tds.length; i++) {
			if (tds[i].innerHTML.indexOf("Confrontation in") > -1) {
				var temp = tds[i].innerHTML.substring(tds[i].innerHTML.indexOf("Confrontation in")+16);
				temp = temp.substring(temp.indexOf(">")+1,temp.indexOf("."));
				sector = temp.substring(0,temp.indexOf("[")-1);
				var xyRough = temp.substring(temp.indexOf("[")+1, temp.indexOf("]")).split(",");
				x = xyRough[0].replace(/[^0-9]/g, "");
				y = xyRough[1].replace(/[^0-9]/g, "");
				break;
			}
		}
		var imgs = document.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.indexOf("opponents") > -1) {
				opponent = stripFileName(imgs[i].src);
				break;
			}
		}
		if (universe && sector && x && y && opponent) {
			params =
				"universe=" + universe +
				"&sector=" + sector +
				"&loc_x=" + x +
				"&loc_y=" + y +
				"&opponent=" + opponent;
		}
	} else if (document.location.href.indexOf("building.php") > -1 || document.location.href.indexOf("starbase.php") > -1) {
		params = "building&universe=" + universe +
			"&sector=" + A_getValue("Sector") +
			"&x=" + A_getValue("X") +
			"&y=" + A_getValue("Y");
		var ms = document.getElementsByClassName("messagestyle")[0];
		var imgs = ms .getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.indexOf("factions") > -1) {
				params = params + "&faction=" + stripFileName(imgs[i].src);
				break;
			}
		}
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].title.indexOf("Syndicate") > -1) {
				params = params + "&syndicate=" + stripFileName(imgs[i].src);
				break;
			}
		}
		if (document.location.href.indexOf("starbase.php") > -1) {
			params = params + "&name=" + ms.getElementsByTagName("span")[0].innerHTML;
		}
		var as = ms.getElementsByTagName("a");
		for (var i = 0; i < as.length; i++) {
			if (as[i].href.indexOf("sendmsg") > -1) {
				params = params + "&pilot=" + as[i].href.substring(as[i].href.indexOf("'")+1, as[i].href.lastIndexOf("'"));
				break;
			}
		}
		for (var i = 0; i < as.length; i++) {
			if (as[i].href.indexOf("alliance") > -1) {
				params = params + "&alliance=" + as[i].innerHTML;
				break;
			}
		}
	} else if (document.location.href.indexOf("bulletin_board.php") > -1) {
		params = bulletinBoard(universe);
	} else if (document.location.href.indexOf("index_buildings.php") > -1) {
		var sectorH1 = document.getElementsByTagName("h1")[0];
		var sector = sectorH1.innerHTML;
		sector = sector.substring(0,sector.indexOf(" Building Index"));
		var crop = sectorH1.parentNode.innerHTML;
		var lastUpdate = crop.substring(crop.indexOf("<br>")+4,crop.indexOf("</span>"));
		params = "index&universe=" + universe +
			"&sector=" + sector +
			"&when=" + new Date(lastUpdate).getTime();
		var indexTable = document.getElementsByClassName("pad2")[0].parentNode.parentNode;
		for (var i = 2; i <= indexTable.childNodes.length-1; i = i + 2) {
			var row = indexTable.childNodes[i];
			crop = row.innerHTML;
			crop = crop.substring(crop.indexOf("foregrounds/")+12);
			var foreground = crop.substring(0,crop.indexOf(".")+4);
			crop = crop.substring(crop.indexOf("[")+1);
			var x = crop.substring(0,crop.indexOf(","));
			var y = crop.substring(crop.indexOf(",")+1,crop.indexOf("]"));
			crop = crop.substring(crop.indexOf("sendmsg('")+9);
			var owner = crop.substring(0,crop.indexOf("')"));
			params = params + "&foreground=" + foreground +
				"&x=" + x +
				"&y=" + y +
				"&owner=" + owner;
		}
	} else if (document.location.href.indexOf("combat_details.php") > -1) {
		var timezone = A_getValue("Timezone",null);
		if (timezone != null) {
			postCombat(universe, timezone);
		}
	} else if (document.location.href.indexOf("main") > -1) {
		if (unsafeWindow.ajax == false) {
			navScreen();
		} else {
			ajaxNavScreen();
		}
		return;
	}

	if (params.length > 0) {
		if (ac == null) {
			params = "V1.5&" + params;
		} else {
			params = "V1.5&AC=" + ac + "&" + params;
		}
		var frame = document.createElement("iframe");
		frame.style.display = "none";
		document.body.appendChild(frame);
		frame.src = submitUrl + "?" + params;
	}
}


function navScreen() {
	var params = "";

	var universe = document.location.hostname.split(".")[0];

	var pilots = parsePilotList();

	location = parseLocation();

	if (pilots == null) {
		params =
			"universe=" + universe +
			"&n=0" +
			"&sector=" + location.name +
			"&loc_x=" + location.pilotX +
			"&loc_y=" + location.pilotY +
			"&fieldamount=" + location.fieldAmount;
		params = params + generateMapParams();
	} else if (pilots[0].update) {
		params =
			"update" +
			"&universe=" + universe +
			"&pilot=" + pilots[0].name +
			"&rank=" + pilots[0].rank;
	} else {
		params =
			"n=" + pilots.length +
			"&universe=" + universe +
			"&sector=" + location.name +
			"&loc_x=" + location.pilotX +
			"&loc_y=" + location.pilotY +
			"&fieldamount=" + location.fieldAmount;
		for (var i = 0; i < pilots.length; i++) {
			var pilot = pilots[i];
			var index = "[" + (i + 1) + "]";
			params +=
				"&pilot" + index + "=" + pilot.name +
				"&alliance" + index + "=" + pilot.alliance +
				"&faction" + index + "=" + pilot.faction +
				"&syndicate" + index + "=" + pilot.syndicate +
				"&ship" + index + "=" + pilot.ship;
		}
		params = params + generateMapParams();
	}

	if (params.length > 0) {
		if (ac == null) {
			params = "V1.5&" + params;
		} else {
			params = "V1.5&AC=" + ac + "&" + params;
		}
		var frame = document.createElement("iframe");
		frame.style.display = "none";
		document.body.appendChild(frame);
		frame.src = submitUrl + "?" + params;
	}
}


function ajaxNavScreen() {
	var originalcheckToDo = unsafeWindow.checkToDo;
	unsafeWindow.checkToDo = function() {
		originalcheckToDo();
		setTimeout(navScreen,1);
	}
	navScreen();
}


function Preference(name, value, inputType, scriptName, description) {
	this.name = name;
	this.value = value;
	this.type = inputType;
	this.description = description;
	this.scriptName = scriptName;
	
	this.getHtmlTableRow = function() {
		html  = "<tr><th>" + this.name + "</th><td><input type='" + this.type + "' id='" + this.name + "_" + this.scriptName + "' ";
		html += (this.type.toUpperCase() == "CHECKBOX" && this.value == true ? "CHECKED='CHECKED' " : "");
		html += "value='" + this.value + "'></td>"
		html += "<td>" + (this.description ? this.description : "&nbsp;") + "</td>";
		html += "</tr>";
		
		return html;
	}
}


function addPreference(name, value, inputType, scriptName, desc) {
	if(!value) value = "";
	p = new Preference(name, value, inputType, scriptName, desc);
	Preferences.push(p);
}


function addPreferenceDisplay(scriptName) {
	var prefHtml = "";

	for(var i = 0; i < Preferences.length; i++) {
		prefHtml += Preferences[i].getHtmlTableRow();
	}

	var div = document.createElement("div");
	div.innerHTML = "<table id='gm_preferences_" + scriptName + "' style='width: 100%; border-bottom: ridge 3px gray; display: none;"
					+ "background-color: #303030; z-index: 5; position: absolute; top: 0; left: 0;'>"
					+ (scriptName ? "<tr><td colspan='3' style='border-bottom: solid 1px black; text-align: center; '><h2>" 
						+ scriptName + " Preferences</h2></td></tr>" : "")
					+ prefHtml 
					+ "<tr><td colspan='3' style='text-align: center; border-top: solid 1px black;'>"
					+ "<button id='saveGmPrefs_" + scriptName + "'>Save Preferences</button>&nbsp;&nbsp;&nbsp;"
					+ "<button id='cancelGmPrefs_" + scriptName + "'>Cancel</button>"
					+ "</td></tr></table>";

	var body = document.body;
	if (body) {
		body.insertBefore(div, body.firstChild);

		saveButton = document.getElementById("saveGmPrefs_" + scriptName);
		cancelButton = document.getElementById("cancelGmPrefs_" + scriptName);

		saveButton.addEventListener("click", function() {
				preftable = document.getElementById('gm_preferences_' + scriptName);
				if(preftable) {
					for(var i = 0; i < Preferences.length; i++) {
						var p = Preferences[i];
						var field = document.getElementById(p.name + "_" + scriptName);
						if (field) {
							if(field.type.toUpperCase() == "CHECKBOX") {
								A_setValue(p.name, field.checked);
							} else {
								if (field.value.length == 0) {
									A_deleteValue(p.name);
								} else {
									A_setValue(p.name, field.value);
								}
							}
						}

					}
					preftable.style.display="none";
					alert("Preferences Saved!");
				}
			}, true);

		cancelButton.addEventListener("click", function() {
				var preftable = document.getElementById('gm_preferences_' + scriptName);
				if(preftable) {
					preftable.style.display = "none";
				}
			}, true);
	}
}


function checkSettings() {
	ac = A_getValue("AC",null);
	followRoute = A_getBooleanValue("FollowRoute",false);
	if (followRoute) {
		route = A_getValue("Route","").split(";");
	}
	recordCombatLogs = A_getBooleanValue("RecordCombatLogs",true);
	if (document.location.href.indexOf("game.php") > -1) {
		GM_registerMenuCommand(release + ": Preferences", function() {
				var main_frame = window.frames[2];
				if (main_frame.document.location.href.indexOf("overview_ship.php") < 0) {
					alert("Please visit Overview -> Ship before editing your preferences.");
				} else {
					if (main_frame.document.getElementById('gm_preferences_' + release)) {
						main_frame.document.getElementById('gm_preferences_' + release).style.display = "";
					}
				}
			});
		GM_registerMenuCommand(release + ": Follow Route", function() {
				loadRoute(window.frames[2].document);
			});
		GM_registerMenuCommand(release + ": Cancel Route", function() {
				cancelRoute(window.frames[2].document);
			});
		GM_registerMenuCommand(release + ": Enter Destination", function() {
				enterDestination(window.frames[2].document);
			});
	} else if (document.location.href.indexOf("overview_ship.php") > -1) {
		addPreference("AC", ac, "text", release, "Access Code (case sensitive): Entering a valid access code will limit pilot data to just those who also know that access code.");
		addPreference("RecordCombatLogs", recordCombatLogs, "checkbox", release, "Automatically upload combat log data.");
		addPreferenceDisplay(release);
	}
}


checkSettings();
postData();