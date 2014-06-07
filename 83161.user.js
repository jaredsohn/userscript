// ==UserScript==
// @namespace pardus-scripts@uncledan.it
// @name FA_infocenter_share
// @include http://artemis.pardus.at/combat_details.php*
// @include http://artemis.pardus.at/hack.php*
// @include http://artemis.pardus.at/bulletin_board.php*
// ==/UserScript==

// This script is for use with Pardus Infocenter v1.6
//
// This script has been modded by Taurvi (Artemis)/Sobkou (Orion) to fit the Pardus Infocenter 1.5b2.004
//
// This script has been modified by Brad Cable
//   (Artemis - Aeiri / Orion - Jetix / Pegasus - Likor)
//   to fit the Pardus Infocenter v1.6
//
// ASCII art made with Doom font at http://patorjk.com/software/taag/

//  _____      _   _   _
// /  ___|    | | | | (_)
// \ `--.  ___| |_| |_ _ _ __   __ _ ___
//  `--. \/ _ \ __| __| | '_ \ / _` / __|
// /\__/ /  __/ |_| |_| | | | | (_| \__ \
// \____/ \___|\__|\__|_|_| |_|\__, |___/
//                              __/ |
//                             |___/

var enableCombatShare   = true;
var enableHackShare     = true;
var hideHackerLocation  = true; //if set to *true* the hacker location won't be shown
var enableMissionsShare = true;
var enablePaymentShare  = false;

//  _____
// /  ___|
// \ `--.  ___ _ ____   _____ _ __ ___
//  `--. \/ _ \ '__\ \ / / _ \ '__/ __|
// /\__/ /  __/ |   \ V /  __/ |  \__ \
// \____/ \___|_|    \_/ \___|_|  |___/

var servers = [
	{
		name: "Federal Assassins� Infocenter", //the name you want to be displayed in the combo box
		url: "http://skarphedin.byethost17.com/", //the exact url to your Infocenter, no trailing slashes
		accounts: { //the user names you wont to use; to disable a universe, just delete the line, but look twice at commas!!!
					//ATTENTION: it is suggested to give to these account(s) permission level = 1
			artemis: {name: "Federal", password: "4ss4ss1ns"}
		}
	},

];

//  _____
// /  __ \
// | /  \/ ___  _ __ ___  _ __ ___   ___  _ __
// | |    / _ \| '_ ` _ \| '_ ` _ \ / _ \| '_ \
// | \__/\ (_) | | | | | | | | | | | (_) | | | |
//  \____/\___/|_| |_| |_|_| |_| |_|\___/|_| |_|

function sltServer_onChange() {
	var btnShare = document.getElementById("btnShare");
	btnShare.disabled = false;
	btnShare.className = "";
}

//  _____                 _           _
// /  __ \               | |         | |
// | /  \/ ___  _ __ ___ | |__   __ _| |_ ___
// | |    / _ \| '_ ` _ \| '_ \ / _` | __/ __|
// | \__/\ (_) | | | | | | |_) | (_| | |_\__ \
//  \____/\___/|_| |_| |_|_.__/ \__,_|\__|___/

function saveCombat() {
	var server = servers[document.getElementById("sltServer").selectedIndex];
	var level = document.getElementById("sltLevel").value;

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

	var btnShare = document.getElementById("btnShare");
	btnShare.disabled = "true";
	btnShare.className = "disabled";

	var cmbt = new Object();
	cmbt.level = level;

	var str = document.location.search;
	cmbt.pid = str.substring(str.indexOf("=") + 1);
	str = document.location.hostname;
	var universe = str.substring(0, str.indexOf("."));
	var account = server.accounts[universe];
	if (!account)
		return;
	cmbt.universe = universe.charAt(0).toUpperCase() + universe.substring(1);

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
	form.action = server.url + "/combat_add.php";
	form.method = "post";
	form.target = "combatFrame";
	form.id = "combatPost";
	append_input(form, "acc", account.name);
	append_input(form, "pwd", account.password);
	append_input(form, "pid", cmbt.pid);
	append_input(form, "type", cmbt.type);
	append_input(form, "when", cmbt.when);
	append_input(form, "universe", cmbt.universe);
	append_input(form, "sector", cmbt.sector);
	append_input(form, "coords", cmbt.coords);
	append_input(form, "attacker", cmbt.attacker);
	append_input(form, "defender", cmbt.defender);
	append_input(form, "outcome", cmbt.outcome);
	append_input(form, "additional", cmbt.additional);
	append_input(form, "level", cmbt.level);
	append_input(form, "data", cmbt.data);
	document.body.appendChild(form);
	var frame = document.getElementById("combatFrame");
	if (!frame) {
		frame = document.createElement("iframe");
		frame.name = "combatFrame";
		frame.id = frame.name;
		frame.style.display = "none";
		document.body.appendChild(frame);
	}
	form.submit();
}

function addCombatShareBtn() {
	// text
	var div = document.createElement("div");
	var label = document.createElement("b");
	label.appendChild(document.createTextNode("Share combat log at: "));
	div.appendChild(label);

	// share location
	var select = document.createElement("select");
	select.id = "sltServer";
	for (var i = 0; i < servers.length; i++) {
		var option = document.createElement("option");
		option.text = servers[i].name;
		option.value = i;
		select.appendChild(option);
	}
	select.addEventListener("change", sltServer_onChange, false);
	div.appendChild(select);
	div.appendChild(document.createTextNode(" "));

	// security levels
	var select_level = document.createElement("select");
	select_level.id = "sltLevel";
	var levels = Array("Open", "Confidential", "Admin");
	for (var i in levels) {
		var option = document.createElement("option");
		if (levels[i] == "Confidential") {
			option.selected = "selected";
		}
		option.text = levels[i];
		option.value = levels[i];
		select_level.appendChild(option);
	}
	div.appendChild(select_level);
	div.appendChild(document.createTextNode(" "));

	// share button
	var btnShare = document.createElement("input");
	btnShare.id = "btnShare";
	btnShare.type = "button";
	btnShare.value = "Share";
	btnShare.addEventListener("click", saveCombat, false);
	div.appendChild(btnShare);
	div.appendChild(document.createElement("br"));
	div.appendChild(document.createElement("br"));
	var br = document.getElementsByTagName("br")[1];
	br.parentNode.insertBefore(div, br.nextSibling);
}

//  _   _            _
// | | | |          | |
// | |_| | __ _  ___| | _____
// |  _  |/ _` |/ __| |/ / __|
// | | | | (_| | (__|   <\__ \
// \_| |_/\__,_|\___|_|\_\___/

function saveHack() {
	var server = servers[document.getElementById("sltServer").selectedIndex];

	function prepareHack(hack, account) {
		function prepareSector(pos, sector) {
			var i = sector.indexOf("[");
			if (i != -1) {
				pos.sector = sector.substr(0, i - 1);
				pos.coords = sector.substr(i);
			} else
				pos.sector = sector;
		}

		function getPosition(posCell) {
			var len = posCell.childNodes.length;
			var result = {sector: null, coords: null};
			result.cluster = posCell.childNodes[len - 1].textContent;
			if (len > 1)
				prepareSector(result, posCell.childNodes[0].nodeValue);
			return result;
		}

		function prepareResources(resourceCell) {
			var result = [];
			var res = null;
			for (var i = 0; i < resourceCell.childNodes.length; i++) {
				var node = resourceCell.childNodes[i];
				var tag = node.tagName;
				if (tag) {
					if (tag.toLowerCase() == "br")
						continue;
					else
					if (tag.toLowerCase() == "img") {
						var name = node.src;
						name = name.substr(name.lastIndexOf("/") + 1);
						res = {img_name: name};
					}
				}
				else {
					var amount = node.nodeValue;
					res.amount = amount.substring(amount.indexOf(" ") + 1, amount.length - 1);
					result.push(res);
				}
			}
			return result;
		}

		var btnShare = document.getElementById("btnShare");
		btnShare.disabled = "true";
		btnShare.className = "disabled";

		var str = document.location.hostname;
		var universe = str.substring(0, str.indexOf("."));
		if (!universe)
			universe = "orion";
		var acc = server.accounts[universe];
		if (!acc)
			return false;
		account.name = acc.name;
		account.password = acc.password;
		hack.universe = universe.charAt(0).toUpperCase() + universe.substring(1);

		var table = document.getElementsByTagName("table")[0];
		table = table.rows[1].cells[1].getElementsByTagName("table")[0];
		var cell = table.rows[0].cells[0];
		var tables = [];
		for (var i = 0; i < cell.childNodes.length; i++) {
			var child = cell.childNodes[i];
			var tag = child.tagName;
			if (tag && (tag.toLowerCase() == "table"))
				tables.push(child);
		}

		if (!hideHackerLocation)
			hack.location = table.getElementsByTagName("a")[0].innerHTML;

		var buildingTable = null;
		var foeTable = null;
		var friendTable = null;
		var resourceTable = null;
		var shipTable = null;

		// if the user has no buildings, the buildings table is not displayed...
		// we have to substitute this if it's not there so that data doesn't get
		// truncated
		if (tables.length > 2) {
			var buildingsTH = tables[2].getElementsByTagName("th")[0];
			// if not buildings table
			if (!buildingsTH || buildingsTH.innerHTML != "Buildings") {
				var newTables = tables.slice(0, 2);
				newTables[2] = null;
				for (var i = 2; i < tables.length; i++) {
					newTables[i+1] = tables[i];
				}
				tables = newTables;
			}
		}

		switch (tables.length) {
		case 2:
			hack.method = "brute";
			break;
		case 4:
			hack.method = "skilled";
			buildingTable = tables[2];
			foeTable = tables[3];
			break;
		case 5:
			hack.method = "freak";
			buildingTable = tables[2];
			foeTable = tables[3].getElementsByTagName("table")[0];
			friendTable = tables[3].getElementsByTagName("table")[1];
			resourceTable = tables[4];
			break;
		case 6:
			hack.method = "guru";
			shipTable = tables[2];
			buildingTable = tables[3];
			foeTable = tables[4].getElementsByTagName("table")[0];
			friendTable = tables[4].getElementsByTagName("table")[1];
			resourceTable = tables[5];
			break;
		default:
			return false;
		}

		var pilotTable = tables[1];
		hack.date = new Date(pilotTable.rows[0].cells[0].innerHTML.replace(/-/g, "/")).getTime();
		hack.pilot = pilotTable.rows[1].cells[0].textContent;
		hack.credits = pilotTable.rows[3].cells[0].innerHTML.replace(/,/g, "");
		hack.reputation = pilotTable.rows[3].cells[1].innerHTML.replace(/,/g, "");
		hack.building_amount = pilotTable.rows[3].cells[2].innerHTML;
		if (pilotTable.rows.length >= 6)
			hack.experience = pilotTable.rows[5].cells[0].innerHTML.replace(/,/g, "");
		if (pilotTable.rows.length >= 8)
			hack.position = getPosition(pilotTable.rows[7].cells[0]);

		var lookupCell = tables[0].rows[1].cells[0];
		var pilotSelect = lookupCell.getElementsByTagName("select")[0];
		if (pilotSelect) {
			for (var i = 0; i < pilotSelect.length; i++) {
				var option = pilotSelect.item(i);
				if (option.text == hack.pilot) {
					hack.pilot_id = option.value;
					break;
				}
			}
		} else {
			var pilotInput = lookupCell.getElementsByTagName("input")[1];
			hack.pilot_id = pilotInput.value;
		}

		if (shipTable != null) {
			hack.ship_status = {};
			for (var i = 1; i < shipTable.rows.length; i++) {
				var font = shipTable.rows[i].cells[0].getElementsByTagName("font")[0];
				var name = font.innerHTML;
				name = name.substr(0, name.indexOf(":")).toLowerCase();
				var status = {};
				status.color = font.color;
				status.amount = shipTable.rows[i].cells[1].getElementsByTagName("table")[0].width;
				hack.ship_status[name] = status;
			}
		}

		hack.building_positions = [];
		if (buildingTable != null) {
			for (var i = 1; i < buildingTable.rows.length; i++) {
				var pos = getPosition(buildingTable.rows[i].cells[1]);
				pos.amount = buildingTable.rows[i].cells[0].innerHTML;
				hack.building_positions.push(pos);
			}
		}

		hack.foes = [];
		hack.foe_alliances = [];
		var alliance = false;
		if (foeTable != null) {
			for (var i = 1; i < foeTable.rows.length; i++) {
				var cell = foeTable.rows[i].cells[0];
				if (cell.tagName.toLowerCase() == "th") {
					alliance = true;
					continue;
				}
				if (alliance)
					hack.foe_alliances.push(cell.textContent);
				else
					hack.foes.push(cell.textContent);
			}
		}

		hack.friends = [];
		hack.friend_alliances = [];
		alliance = false;
		if (friendTable != null) {
			for (var i = 1; i < friendTable.rows.length; i++) {
				var cell = friendTable.rows[i].cells[0];
				if (cell.tagName.toLowerCase() == "th") {
					alliance = true;
					continue;
				}
				if (alliance)
					hack.friend_alliances.push(cell.textContent);
				else
					hack.friends.push(cell.textContent);
			}
		}

		if (resourceTable) {
			hack.buildings = [];
			var buildingTables = resourceTable.getElementsByTagName("table");
			for (var i = 0; i < buildingTables.length; i++) {
				var posStr = buildingTables[i].rows[0].cells[0].innerHTML;
				posStr = posStr.substr(new String("Building in ").length);
				var building = {};
				prepareSector(building, posStr);
				for (var j = 0; j < hack.building_positions.length; j++)
					if (building.sector == hack.building_positions[j].sector) {
						building.cluster = hack.building_positions[j].cluster;
						break;
					}
				building.commodities = prepareResources(buildingTables[i].rows[2].cells[0]);
				building.stock = prepareResources(buildingTables[i].rows[2].cells[1]);
				hack.buildings.push(building);
			}
		}

		return true;
	}

	function objectToXml(obj, nodeName, parentNode) {
		if (!parentNode)
			parentNode = document.implementation.createDocument("", "", null);
		var node = document.createElement(nodeName);
		parentNode.appendChild(node);
		if (obj instanceof Array) {
			var collection = node.ownerDocument.createAttribute("collection");
			collection.value = true;
			node.attributes.setNamedItem(collection);
			var name = nodeName.substr(0, nodeName.length - 1);
			for (var i = 0; i < obj.length; i++)
				objectToXml(obj[i], name, node);
		} else
		if (typeof(obj) == "object") {
			var i;
			for (i in obj)
				objectToXml(obj[i], i, node);
		} else
			node.appendChild(node.ownerDocument.createTextNode(obj));
		return parentNode;
	}

	function xmlToStr(doc) {
		return new XMLSerializer().serializeToString(doc);
	}

	function postHack(data, account) {
		var level = document.getElementById("sltLevel").value;

		function appendFormElement(form, elemName, type, name, value) {
			var elem = document.createElement(elemName);
			if (type)
				elem.type = type;
			elem.name = name;
			elem.value = value;
			form.appendChild(elem);
		}

		var frame = document.getElementById("hackFrame");
		if (!frame) {
			frame = document.createElement("iframe");
			frame.name = "hackFrame";
			frame.id = frame.name;
			frame.style.display = "none";
			document.body.appendChild(frame);
		}
		var form = document.getElementById("hackPost");
		if (form)
			document.body.removeChild(form);
		form = document.createElement("form");
		form.method = "post";
		form.action = server.url + "/hack_add.php";
		form.target = "hackFrame";
		form.id = "hackPost";
		form.style.display = "none";
		appendFormElement(form, "textarea", null, "data", data);
		appendFormElement(form, "input", "text", "acc", account.name);
		appendFormElement(form, "input", "text", "pwd", account.password);
		appendFormElement(form, "input", "text", "level", level);
		document.body.appendChild(form);
		form.submit();
	}

	var hack = {};
	var account = {};
	if (!prepareHack(hack, account))
		return;
	var doc = objectToXml(hack, "hack");
	postHack(xmlToStr(doc), account);
}

function sltServer_onChange() {
	var btnShare = document.getElementById("btnShare");
	btnShare.disabled = false;
	btnShare.className = "";
}

function addHackShareBtn() {
    var breakline = document.createElement("br");

	var label = document.createElement("b");
	label.appendChild(document.createTextNode("Share this hack at: "));

	var btnShare = document.createElement("input");
	btnShare.id = "btnShare";
	btnShare.type = "button";
	btnShare.value = "Share";
	btnShare.addEventListener("click", saveHack, false);

	var select = document.createElement("select");
	select.id = "sltServer";
	for (var i = 0; i < servers.length; i++) {
		var option = document.createElement("option");
		option.text = servers[i].name;
		option.value = i;
		select.appendChild(option);
	}
	select.addEventListener("change", sltServer_onChange, false);

	// security levels
	var select_level = document.createElement("select");
	select_level.id = "sltLevel";
	var levels = Array("Open", "Confidential", "Admin");
	for (var i in levels) {
		var option = document.createElement("option");
		if (levels[i] == "Confidential") {
			option.selected = "selected";
		}
		option.text = levels[i];
		option.value = levels[i];
		select_level.appendChild(option);
	}

	var table = document.getElementsByTagName("table")[0];
	table = table.rows[1].cells[1].getElementsByTagName("table")[0];
	table = table.getElementsByTagName("table")[0];
	var row = table.insertRow(-1);
	var cell = row.insertCell(-1);
	cell.colSpan = 2;
	cell.align = "center";
	cell.appendChild(breakline);
	cell.appendChild(label);
	cell.appendChild(select);
	cell.appendChild(document.createTextNode(" "));
	cell.appendChild(select_level);
	cell.appendChild(document.createTextNode(" "));
	cell.appendChild(btnShare);
}

// ___  ____         _
// |  \/  (_)       (_)
// | .  . |_ ___ ___ _  ___  _ __  ___
// | |\/| | / __/ __| |/ _ \| '_ \/ __|
// | |  | | \__ \__ \ | (_) | | | \__ \
// \_|  |_/_|___/___/_|\___/|_| |_|___/

function saveMissions() {
	var server = servers[document.getElementById("sltServer").selectedIndex];

	var btnShare = document.getElementById("btnShare");
	btnShare.disabled = "true";
	btnShare.className = "disabled";

	function postMissions(account) {
		var str = document.location.hostname;
		var universe = str.substring(0, str.indexOf("."));
		if (!universe)
			universe = "orion";
		var acc = server.accounts[universe];
		if (!acc)
			return false;
		account.name = acc.name;
		account.password = acc.password;

		function extractWord(text, startsWith, endsWith, fromStart) {
			if (fromStart) {
				var i = text.toLowerCase().indexOf(startsWith.toLowerCase());
				var str = text.substr(i + startsWith.length, text.length);
				i = str.toLowerCase().indexOf(endsWith.toLowerCase());
				return str.substr(0, i);
			} else {
				var i = text.toLowerCase().indexOf(endsWith.toLowerCase());
				var str = text.substr(0, i);
				i = str.toLowerCase().lastIndexOf(startsWith.toLowerCase());
				return str.substr(i + startsWith.length, str.length);
			}
		}

		function trim(str) {
			var result = str.replace(/^\s+/, "");
			return result.replace(/\s+$/, "");
		}

		function appendFormElement(form, elemName, type, name, value) {
			var elem = document.createElement(elemName);
			if (type)
				elem.type = type;
			elem.name = name;
			elem.value = value;
			form.appendChild(elem);
		}

		function extractFirstText(node) {
			var NODE_TEXT = 3;
			while (node.nodeType != NODE_TEXT && node.childNodes.length > 0)
				node = node.childNodes[0];
			return node.nodeValue;
		}

		MISSION_TRANSPORT_PACKAGES = "Transport Packages";
		MISSION_ASSASSINATION = "Assassination";
		MISSION_TRANSPORT_EXPLOSIVES = "Transport Explosives";
		MISSION_VIP_ACTION_TRIP = "VIP Action Trip";
		MISSION_TRANSPORT_VIP = "Transport VIP";
		MISSION_CLEAN_WH = "Cleaning Wormhole Exit";

		var msgsTable = document.body.getElementsByTagName("table")[2];
		var p = msgsTable.getElementsByTagName("p")[0];
		var source = extractWord(p.innerHTML, "Return to ", "'s", true);

		var tables = msgsTable.getElementsByTagName("table");
		var missions = [];

		var xml = document.implementation.createDocument("", "missions", null);
		var xmlMissions = xml.documentElement;
		var collection = xml.createAttribute("collection");
		collection.value = true;
		xmlMissions.attributes.setNamedItem(collection);

		var when = new Date().getTime();
		for (var i = 0; i < tables.length; i++) {
			var msgTable = tables[i];
			if (msgTable.getElementsByTagName("table").length == 0)
				continue;

			var mission = {"source": source, "when": when};

			mission.universe = universe.charAt(0).toUpperCase() + universe.substring(1);

			var cell = msgTable.rows[0].cells[0];
			var img = cell.getElementsByTagName("img")[0];
			if (img) {
				var factionType = extractWord(img.src, "sign_", "_16x16.png", false);
				if (factionType == "eps" || factionType == "tss")
					cell = msgTable.rows[0].cells[1];
				mission.faction = factionType;
			}
			mission.type = trim(cell.textContent);

			if (mission.type == MISSION_ASSASSINATION) {
				var imgSrc = msgTable.rows[1].getElementsByTagName("img")[0].src;
				mission.opponent = imgSrc.substring(imgSrc.lastIndexOf("/") + 1, imgSrc.lastIndexOf("."));
			}

			var cellCount = msgTable.rows[2].cells.length;
			if ((cellCount == 3) && (mission.type != MISSION_TRANSPORT_VIP)) {
				mission.amount = extractFirstText(msgTable.rows[2].cells[0]);
				if (mission.type == MISSION_VIP_ACTION_TRIP)
					mission.amount = mission.amount.split(" ")[1];
			}
			cell = msgTable.rows[2].cells[cellCount - 1];
			mission.pid = cell.getElementsByTagName("div")[0].id;
			mission.pid = mission.pid.substr(1, mission.pid.length);

			text = msgTable.rows[1].cells[2].innerHTML;

			if (!(mission.type == MISSION_ASSASSINATION && mission.amount)) {
				if (mission.type == MISSION_CLEAN_WH)
					mission.sector = extractWord(text, "stuck in <B>", "</B>");
				else
					mission.sector = extractWord(text, "<B>", "</B> at the coordinates");
				mission.coords = extractWord(text, "coordinates [<B>", "</B>", true);
				if (mission.type != MISSION_ASSASSINATION && mission.type != MISSION_CLEAN_WH)
					mission.destination = extractWord(text, "<B>", "</B> in sector");
			}

			mission.reward = extractWord(text, "<B>", "</B> credits").replace(",", "");
			mission.deposit = extractWord(text, "completed: ", " credits", true).replace(",", "");
			mission.timelimit = extractWord(text, "<B>", "</B> minutes");

			missions.push(mission);

			var xmlMission = xml.createElement("mission");
			var j;
			for (j in mission) {
				var prop = xml.createElement(j);
				prop.appendChild(xml.createTextNode(mission[j]));
				xmlMission.appendChild(prop);
			}
			xmlMissions.appendChild(xmlMission);
		}

		var form = document.createElement("form");
		form.action = server.url + "/missions_add.php";
		form.method = "post";
		form.target = "missionsAdd";
		form.style.display = "none";
		var data = new XMLSerializer().serializeToString(xml);
		appendFormElement(form, "textarea", null, "missions", data);
		appendFormElement(form, "input", "text", "acc", account.name);
		appendFormElement(form, "input", "text", "pwd", account.password);
		document.body.appendChild(form);
		frame = document.createElement("iframe");
		frame.name = "missionsAdd";
		frame.style.display = "none";
		document.body.appendChild(frame);
		form.submit();

		}

	var account = {};
	postMissions(account);
}

function addMissionsShareBtn() {
    var breakline = document.createElement("br");

	var label = document.createElement("b");
	label.appendChild(document.createTextNode("Share missions at: "));

	var btnShare = document.createElement("input");
	btnShare.id = "btnShare";
	btnShare.type = "button";
	btnShare.value = "Share";
	btnShare.addEventListener("click", saveMissions, false);

	var select = document.createElement("select");
	select.id = "sltServer";
	for (var i = 0; i < servers.length; i++) {
		var option = document.createElement("option");
		option.text = servers[i].name;
		option.value = i;
		select.appendChild(option);
	}
	select.addEventListener("change", sltServer_onChange, false);

	var table = document.getElementsByTagName("table")[0];
	table = table.rows[1].cells[1].getElementsByTagName("table")[0];
	table = table.getElementsByTagName("table")[0];
	var row = table.insertRow(-1);
	var cell = row.insertCell(-1);
	cell.colSpan = 2;
	cell.align = "center";
	cell.appendChild(breakline);
	cell.appendChild(label);
	cell.appendChild(select);
	cell.appendChild(document.createTextNode(" "));
	cell.appendChild(btnShare);
}

// ______                                 _
// | ___ \                               | |
// | |_/ /__ _ _   _ _ __ ___   ___ _ __ | |_ ___
// |  __// _` | | | | '_ ` _ \ / _ \ '_ \| __/ __|
// | |  | (_| | |_| | | | | | |  __/ | | | |_\__ \
// \_|   \__,_|\__, |_| |_| |_|\___|_| |_|\__|___/
//              __/ |
//             |___/

function stripHTML(code) {
	ret = code.replace(/<[^>]+>/g, '');
	return ret;
}

function savePayments() {
	var server = servers[document.getElementById("sltServer").selectedIndex];
	var level = document.getElementById("sltLevel").value;

	// disable button
	var btnShare = document.getElementById("btnShare");
	btnShare.disabled = "true";
	btnShare.className = "disabled";

	// append to invisible form
	function append_input(form, name, value) {
		var input = document.createElement("input");
		input.type = "hidden";
		input.name = name;
		input.value = value;
		form.appendChild(input);
	}

	// account retrieval
	var str = document.location.search;
	str = document.location.hostname;
	var universe = str.substring(0, str.indexOf("."));
	var account = server.accounts[universe];
	if (!account)
		return;

	// loop through checkboxes and see which ones are checked; those that are,
	// send a log to the db
	var table = document.getElementsByTagName("table")[7];
	var rows = table.getElementsByTagName("tr");
	for(var i = 0; i < rows.length; i++) {
		var tds = rows[i].getElementsByTagName("td");
		if (tds.length > 0) {
			var chk = tds[0].getElementsByTagName("input")[0];
			if (chk.checked) {
				var when = stripHTML(tds[1].innerHTML);
				when = new Date(when.replace(/-/g, "/")).getTime();
				var type = stripHTML(tds[2].innerHTML);
				var loc = stripHTML(tds[3].innerHTML);
				var pilot = stripHTML(tds[4].innerHTML);
				var receiver = (tds[5].innerHTML == "received" ? 1 : 0);
				var credits = stripHTML(tds[6].innerHTML).replace(/[^0-9]/g, '');
				form = document.createElement("form");
				form.style.display = "none";
				form.action = server.url + "/payment_add.php";
				form.method = "post";
				form.target = "paymentsAdd";
				append_input(form, "acc", account.name);
				append_input(form, "pwd", account.password);
				append_input(form, "when", when);
				append_input(form, "type", type);
				append_input(form, "location", loc);
				append_input(form, "pilot", pilot);
				append_input(form, "receiver", receiver);
				append_input(form, "credits", credits);
				append_input(form, "level", level);
				document.body.appendChild(form);
				frame = document.createElement("iframe");
				frame.name = "paymentsAdd";
				frame.style.display = "none";
				document.body.appendChild(frame);
				form.submit();
			}
		}
	}
}

function addPaymentShareBtn() {
	// adds checkboxes to all of the 
	var table = document.getElementsByTagName("table")[7];
	var rows = table.getElementsByTagName("tr");
	for(var i = 0; i < rows.length; i++) {
		var tds = rows[i].getElementsByTagName("td");
		if (tds.length > 0) {
			var chk = document.createElement("input");
			chk.type = "checkbox";
			chk.value = i;
			tds[0].appendChild(chk);
		}
	}

	// adds the area with the share button below the payments table
	var label = document.createElement("b");
	label.appendChild(document.createTextNode("Share checked payments at: "));

	var btnShare = document.createElement("input");
	btnShare.id = "btnShare";
	btnShare.type = "button";
	btnShare.value = "Share";
	btnShare.addEventListener("click", savePayments, false);

	var select = document.createElement("select");
	select.id = "sltServer";
	for (var i = 0; i < servers.length; i++) {
		var option = document.createElement("option");
		option.text = servers[i].name;
		option.value = i;
		select.appendChild(option);
	}
	select.addEventListener("change", sltServer_onChange, false);

	// security levels
	var select_level = document.createElement("select");
	select_level.id = "sltLevel";
	var levels = Array("Open", "Confidential", "Admin");
	for (var i in levels) {
		var option = document.createElement("option");
		if (levels[i] == "Confidential") {
			option.selected = "selected";
		}
		option.text = levels[i];
		option.value = levels[i];
		select_level.appendChild(option);
	}

	table = document.getElementsByTagName("table")[6];
	var cell = table.getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
	var breakline = document.createElement("br");
	cell.appendChild(breakline);
	var center = document.createElement("center");
	center.appendChild(label);
	center.appendChild(select);
	center.appendChild(document.createTextNode(" "));
	center.appendChild(select_level);
	center.appendChild(document.createTextNode(" "));
	center.appendChild(btnShare);
	cell.appendChild(center);
}

// ___  ___      _
// |  \/  |     (_)
// | .  . | __ _ _ _ __
// | |\/| |/ _` | | '_ \
// | |  | | (_| | | | | |
// \_|  |_/\__,_|_|_| |_|

if(enableCombatShare && document.URL.indexOf('combat_details.php') >= 0) addCombatShareBtn();
if(enableHackShare && document.URL.indexOf('hack.php') >= 0) addHackShareBtn();
if(enableMissionsShare && document.URL.indexOf('bulletin_board.php') >= 0) addMissionsShareBtn();
if(enablePaymentShare && document.URL.indexOf('overview_payment_log.php') >= 0) addPaymentShareBtn();
