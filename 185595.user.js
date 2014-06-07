// ==UserScript==
// @name OGame: Resursi u Transportu
// @namespace http://www.bluustoriz.webs.com
// @description OGame: Resursi u Transportu
// @version 0.3
// @creator Bluu StoiZ
// @include http://*.ogame.gameforge.com/game/index.php?page=overview*
// @include http://*.ogame.gameforge.com/game/index.php?page=movement*
// ==/UserScript==

var strFunc = (function(){
	var language = document.querySelector("meta[name=ogame-language]").getAttribute("content");
	var strTitle,strTotal,strLoading;
	switch (language) {
		case "fr":
			strTitle = "Resursi u Transportu";
			strTotal = "Ukupno:";
			strLoading = "Chargement...";
			break;
		default:
			strTitle = "Resursi u Transportu";
			strTotal = "Ukupno:";
			strLoading = "Ocitavanje...";
			break;
	}
	var arrstrResources = [];
	$("#resources .tooltipHTML").each(function () {
		var title = $(this).attr("title") || $(this).data("tipped_restore_title");
		if (title) {
			arrstrResources.push(title.split("|")[0]);
		}
	});

	var addDots = function(nb) {
		nb = nb + "";
		while (/\d{4}/.test(nb)) {
			nb = nb.replace(/(\d+)(\d{3})/,"$1.$2");
		}
		return nb;
	}

	var sort_planets = function(a,b) {
		/(\d*):(\d*):(\d*)/.exec(a);
		var galaxy1 = parseInt(RegExp.$1);
		var system1 = parseInt(RegExp.$2);
		var planet1 = parseInt(RegExp.$3);
		/(\d*):(\d*):(\d*)/.exec(b);
		var galaxy2 = parseInt(RegExp.$1);
		var system2 = parseInt(RegExp.$2);
		var planet2 = parseInt(RegExp.$3);
		if (galaxy1 > galaxy2) return 1;
		else if (galaxy1 < galaxy2) return -1;
		if (system1 > system2) return 1;
		else if (system1 < system2) return -1;
		if (planet1 > planet2) return 1;
		else if (planet1 < planet2) return -1;
		return 0;
	}

	var refresh = "data:image/png;base64,R0lGODlhEAAQAOYAAGB6jpGmtdXe5V54jXGKntrh5vDz9nCJnYedrqu7x/3+/+3w8+zw9LfFz/L1+GZ/k3ePo/7//42gsI2isrC+ycjT22uDlsDM1aGwvXONoIacreHm64ugsai2wpaotq+8x6GywHWOodri5pCltWF7j/Dz9crU3HSNoI+jsdDa4IqfrnmSpNjh6K+9yevv8/j5++Xq7qu4w2J7kMjU3HmRpKi5xtzi6KW0v3iNn7rFzvr7/bzJ04SaqnaMnsjU3X+VpgAAAP///2+JnVx2iwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAdxgEBDg4SFhYKGiYqGMoM/D4tDODc+FB4MPIoAMS8uJhtBQTskiQA5HRYDLQpBOiqRgz0oGB8SsItCubq7vLscGidCB728AgsFFTTEuwmhLCsEGQECAb0QBiUOMCkiETYIxDUjEw0zFyAhy+q6QOu7QIEAOw==";

	var isPageMovement = (document.location.href.indexOf("page=movement") != -1);

	var clearFloat = document.createElement("div");
	clearFloat.className = "clearfloat";
	var mydiv = document.createElement("div");
	mydiv.id = "resourcesontransitWrapper";
	mydiv.style.width = "667px";
	mydiv.style.cssFloat = "left";
	mydiv.style.overflow = "auto";
	var header = "<div id='resourcesontransitHeader' style='background: url(\"http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif\") no-repeat scroll 0 0 transparent; height: 28px; padding: 0 20px; position: relative; text-align: center;'><h3 style='color: #6F9FC8; font-size: 11px; font-weight: 700; margin: 0; padding: 9px 0 0;'>" + (!isPageMovement?"<a href='javascript:void(0);' id='resourcesontransitRefresh'><img style='vertical-align:middle;' src='" + refresh + "' /></a> ":"") + strTitle + "</h3></div>";
	var content = "<div id='resourcesontransitContent' style='background: url(\"http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif\") repeat-y scroll 5px 0 transparent; text-align:center; padding-top: 5px;'></div>";
	var footer = "<div id='resourcesontransitFooter' style='background: url(\"http://gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif\") no-repeat scroll 2px 0 transparent; height: 17px;'></div>";
	mydiv.innerHTML = header + content + footer;
	var inhalt = document.getElementById("inhalt");
	inhalt.appendChild(mydiv);
	inhalt.appendChild(clearFloat.cloneNode(false));
	var resourcesontransitContent = document.getElementById("resourcesontransitContent");

	var resources = {};
	var resourcesNames = ["","",""];
	var displayResourcesOnTransit = function() {
		var rightMenu = document.getElementById("rechts");
		var activeLink = rightMenu.getElementsByClassName("active")[0];
		var thisCoords;
		if (activeLink) {
			thisCoords = activeLink.parentNode.getElementsByClassName("planet-koords")[0].textContent;
		} else {
			thisCoords = rightMenu.getElementsByClassName("planet-koords")[0].textContent;
		}
		thisCoords = $.trim(thisCoords);
		var thisResources = [0,0,0];
		thisResources[0] = parseInt(document.getElementById("resources_metal").innerHTML.replace(/\D/g, ''));
		thisResources[1] = parseInt(document.getElementById("resources_crystal").innerHTML.replace(/\D/g, ''));
		thisResources[2] = parseInt(document.getElementById("resources_deuterium").innerHTML.replace(/\D/g, ''));

		var planets = [];
		for (var i in resources) {
			planets.push(i);
		}
		planets.sort(sort_planets);

		var table = document.createElement("table");
		table.style.borderCollapse = "collapse";
		table.style.marginLeft = "auto";
		table.style.marginRight = "auto";
		table.cellSpacing = "0";
		table.cellPadding = "0";
		var tr1 = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.style.textAlign = "center";
		th1.style.padding = "3px";
		th1.style.color = "#6F9FC8";
		var td1 = document.createElement("td");
		td1.style.textAlign = "right";
		td1.style.border = "1px solid #A26D00";
		td1.style.padding = "3px";
		var tr = tr1.cloneNode(false);
		var th = th1.cloneNode(false);
		th.textContent = " ";
		tr.appendChild(th);
		th1.style.border = "1px solid #A26D00";
		for (var k=0;k<planets.length;k++) {
			var i = planets[k];
			th = th1.cloneNode(false);
			th.textContent = i;
			tr.appendChild(th);
		}
		th = th1.cloneNode(false);
		th.textContent = strTotal;
		tr.appendChild(th);
		table.appendChild(tr);
		var td;
		var sum;
		for (var j=0;j<3;j++) {
			if (resourcesNames[j] != "") {
				sum = 0;
				tr = tr1.cloneNode(false);
				th = th1.cloneNode(false);
				th.textContent = resourcesNames[j];
				tr.appendChild(th);
				for (var k=0;k<planets.length;k++) {
					var i = planets[k];
					var tmp = resources[i][j];
					sum += tmp;
					td = td1.cloneNode(false);
					td.textContent = addDots(tmp);
					if (i == thisCoords) {
						td.className = "tooltipRight js_hideTipOnMobile";
						td.title = addDots(tmp+thisResources[j]);
					}
					tr.appendChild(td);
				}
				td = td1.cloneNode(false);
				td.textContent = addDots(sum);
				tr.appendChild(td);
				table.appendChild(tr);
			}
		}
		tr = tr1.cloneNode(false);
		th = th1.cloneNode(false);
		th.textContent = strTotal;
		tr.appendChild(th);
		sum = 0;
		for (var k=0;k<planets.length;k++) {
			var i = planets[k];
			var tmp = resources[i][0] + resources[i][1] + resources[i][2];
			sum += tmp;
			td = td1.cloneNode(false);
			td.textContent = addDots(tmp);
			if (i == thisCoords) {
				td.className = "tooltipRight js_hideTipOnMobile";
				td.title = addDots(tmp+thisResources[0]+thisResources[1]+thisResources[2]);
			}
			tr.appendChild(td);
		}
		td = td1.cloneNode(false);
		td.textContent = addDots(sum);
		tr.appendChild(td);
		table.appendChild(tr);
		resourcesontransitContent.innerHTML = "";
		resourcesontransitContent.appendChild(table);
	}

	if (isPageMovement) {
		mydiv.style.marginTop = "5px";
		$("#inhalt .fleetDetails").each(function () {
			var fleetDetails = $(this);
			if (isMobile) {
				var metal = 0;
				var cristal = 0;
				var deuterium = 0;
				fleetDetails.find(".fleet_details > ul.fleet_detail_list > li").each(function () {
					var div = $(this).find("div").eq(0);
					if (div.hasClass("metal")) {
						metal = parseInt($(this).text().replace(/\D/g, ""));
					} else if (div.hasClass("crystal")) {
						cristal = parseInt($(this).text().replace(/\D/g, ""));
					} else if (div.hasClass("deuterium")) {
						deuterium = parseInt($(this).text().replace(/\D/g, ""));
					}
				});
				resourcesNames = [arrstrResources[0],arrstrResources[1],arrstrResources[2]];
				if (metal + cristal + deuterium > 0) {
					var detailsClass = fleetDetails.find(".route a span").eq(0).attr("class");
					var isReverse = (detailsClass.indexOf("reverse")!=-1);
					var missionId = fleetDetails.attr("data-mission-type");
					var coords;
					if (isReverse || (missionId != 3 && missionId != 4 && missionId != 7)) {
						coords = fleetDetails.find(".origin .coords").eq(0).text();
					} else {
						coords = fleetDetails.find(".destination .coords").eq(0).text();
					}
					coords = $.trim(coords);
					if (resources[coords]) {
						metal += resources[coords][0];
						cristal += resources[coords][1];
						deuterium += resources[coords][2];
					}
					resources[coords] = [metal,cristal,deuterium];
				}
			} else {
				var href = fleetDetails.find(".route a").eq(0).attr("href");
				var tooltip = $(href);
				var tooltip_th = tooltip.find("th").eq(1);
				if (tooltip_th.length > 0) {
					var tooltip_tr = tooltip_th.parent().nextAll();
					var metal = parseInt(tooltip_tr.eq(0).find("td").eq(1).text().replace(/\D/g, ""));
					var cristal = parseInt(tooltip_tr.eq(1).find("td").eq(1).text().replace(/\D/g, ""));
					var deuterium = parseInt(tooltip_tr.eq(2).find("td").eq(1).text().replace(/\D/g, ""));
					if (resourcesNames[0] == "") {
						resourcesNames[0] = tooltip_tr.eq(0).find("td").eq(0).text();
						resourcesNames[1] = tooltip_tr.eq(1).find("td").eq(0).text();
						resourcesNames[2] = tooltip_tr.eq(2).find("td").eq(0).text();
					}
					if (metal + cristal + deuterium > 0) {
						var detailsClass = fleetDetails.find(".route a").eq(0).attr("class");
						var isReverse = (detailsClass.indexOf("reverse")!=-1);
						var missionId = fleetDetails.attr("data-mission-type");
						var coords;
						if (isReverse || (missionId != 3 && missionId != 4 && missionId != 7)) {
							coords = fleetDetails.find(".originCoords").eq(0).text();
						} else {
							coords = fleetDetails.find(".destinationCoords").eq(0).text();
						}
						coords = $.trim(coords);
						if (resources[coords]) {
							metal += resources[coords][0];
							cristal += resources[coords][1];
							deuterium += resources[coords][2];
						}
						resources[coords] = [metal,cristal,deuterium];
					}
				}
			}
		});
		displayResourcesOnTransit();
	} else {
		var readEvents = function() {
			resources = {};
			resourcesNames = ["","",""];
			var idRequested = ","; //only those on the way out
			$("#eventContent .eventFleet").each(function () {
				var eventFleet = $(this);
				var td;
				if (isMobile) {
					td = eventFleet.find("td.detailsFleet");
				} else {
					td = eventFleet.find("td[class^='icon_movement']");
				}
				var tooltip = td.find("span.tooltip").eq(0);
				var title = tooltip.attr("title") || tooltip.data("tipped_restore_title");
				if (title) {
					var eventId = eventFleet.attr("id").replace(/\D/g, '');
					var isReverse;
					if (isMobile) {
						isReverse = !(tooltip.find("span").eq(0).hasClass("icon_movement"));
					} else {
						isReverse = !(tooltip.parent().hasClass("icon_movement"));
					}
					if (!isReverse || idRequested.indexOf(","+(parseInt(eventId)-1)+",") == -1) {
						var missionId = eventFleet.attr("data-mission-type");
						if (isReverse || missionId == 3 || missionId == 4 || missionId == 7) {
							var coords;
							if (isReverse) {
								coords = eventFleet.find(".coordsOrigin").eq(0).text().replace(/^[^[]*\[/,"[");
							} else {
								idRequested += eventId + ",";
								coords = eventFleet.find(".destCoords").eq(0).text().replace(/^[^[]*\[/,"[");
							}
							coords = $.trim(coords);
							var tooltip_th = title.replace(/\n/g,"").split("<th");
							if (tooltip_th[2]) {
								var tooltip_td = tooltip_th[2].split("<td");
								var metal = parseInt(tooltip_td[2].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
								var cristal = parseInt(tooltip_td[4].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
								var deuterium = parseInt(tooltip_td[6].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
								if (resourcesNames[0] == "") {
									resourcesNames[0] = tooltip_td[1].replace(/^[^>]*>([^<]*).*$/,"$1");
									resourcesNames[1] = tooltip_td[3].replace(/^[^>]*>([^<]*).*$/,"$1");
									resourcesNames[2] = tooltip_td[5].replace(/^[^>]*>([^<]*).*$/,"$1");
								}
								if (metal + cristal + deuterium > 0) {
									if (resources[coords]) {
										metal += resources[coords][0];
										cristal += resources[coords][1];
										deuterium += resources[coords][2];
									}
									resources[coords] = [metal,cristal,deuterium];
								}
							}
						}
					}
				}
			});
			displayResourcesOnTransit();
		}

		mydiv.style.marginBottom = "5px";

		$(document).ajaxSuccess(function(e,xhr,settings){
			var page = settings.url.replace(/^.*page=([a-zA-Z]*).*$/,"$1");
			if (page != "eventList") return;

			readEvents();
		});

		var resourcesontransitRefresh = document.getElementById("resourcesontransitRefresh");
		resourcesontransitRefresh.addEventListener(
			"click",
			function () {
				resourcesontransitContent.innerHTML = strLoading;
				$("#eventboxContent").html('<img height="16" width="16" src="/cdn/img/ajax-loader.gif" />');
				$.get(eventlistLink, function (data) {
					$("#eventboxContent").html(data);
					toggleEvents.loaded=true;
				});
			},
			false
		);

		if ($("#eventboxContent").is(":visible")) {
			readEvents();
		}
	}
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);

