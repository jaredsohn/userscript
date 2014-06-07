// ==UserScript==
// @name			Pardus RatchFaz Commander
// @namespace		RatchFaz
// @description		Upgraded version of the Quick Commands.
// @include			http*://*.pardus.at/main.php
// @include			http*://*.pardus.at/msgframe.php
// @include			http*://*.pardus.at/sendmsg.php*
// @include			http*://*.pardus.at/ship2ship_transfer.php?playerid=*
// @include			http*://*.pardus.at/news.php*
// @include			http*://*.pardus.at/messages_private.php*
// @include			http*://*.pardus.at/messages_alliance.php*
// @include			http*://*.pardus.at/combat_details.php*
// @include			http*://*.pardus.at/overview_ship.php
// @include			http*://*.pardus.at/overview_stats.php
// @include			http*://forum.pardus.at/index.php?act=Post*
// @include			http*://*.pardus.at/menu.php
// @include			http*://*.pardus.at/options.php
// @exclude			http*://forum.pardus.at/
// ==/UserScript==

/*		
	<--User Manual-->

		Directly below, you can configure all the links and their properties.
		
		All links have a "name", which determines the text that appears on them. Customize them to your liking!
		
		On the lines with LinksType, you can set either links or buttons, your choice.
		If you choose links, please specify either a border style for them or "". The style doesn't apply to buttons. Google "w3 link style" for the syntax of the style property of a link.
		
		To enabled (disable) a link or button, remove (add) the // that's in front of the line with the link.

	>--User Manual--<
*/

try {
	var buildings = "alliance_command_station|asteroid_mine|battleweapons_factory|brewery|chemical_laboratory|" +
	"clod_generator|dark_dome|droid_assembly_complex|drug_station|electronics_facility|energy_well|" +
	"fuel_collector|gas_collector|gem_merchant|handweapons_factory|leech_nursery|medical_laboratory|" +
	"millitary_outpost|nebula_plant|optics_research_center|plastics_facility|radiation_collector|" +
	"recyclotron|robot_factory|slave_camp|smelting_facility|space_farm|trade_outpost";
	var planet = "\/planet_";
	var starBase = "\/starbase_";
	var tradeOff = "_tradeoff\.png";
	var empty = "/ships/|/backgrounds/";

	function createDefs() {
		var defs = {
			"status":{
				"links":[
					// {"name":"Ship",				"url":"overview_ship.php"},
					// {"name":"Buildings",			"url":"overview_buildings.php"},
					// {"name":"Logs",				"url":"overview_tl.php"},
					// {"name":"Stats",				"url":"overview_stats.php"},
					// {"name":"Adv. Skills",		"url":"overview_advanced_skills.php"},
					{"name":"Jobs",				"url":"overview_jobs.php"},
					{"name":"Map",				"url":"overview_map.php"}
				],
				"linksType":{"type":"links", "style":"", "separator":" | "},
			},
			
			"commands":{
				"links":[
					{"name":"Ship Equipment",			"url":"ship_equipment.php",				"for":planet + "|" + starBase},
					{"name":"Trade with Planet",		"url":"planet_trade.php",				"for":planet},
					{"name":"Trade with StarBase",		"url":"starbase_trade.php",				"for":starBase},
					{"name":"Trade with Building",		"url":"building_trade.php",				"for":buildings, "notfor":tradeOff + "|" + planet + "|" + starBase},
					{"name":"Bulletin Board",			"url":"bulletin_board.php",				"for":planet + "|" + starBase},
					// {"name":"Bounties",					"url":"bounties.php",					"for":planet + "|" + starBase},
					// {"name":"ShipYard",					"url":"shipyard.php",					"for":planet + "|" + starBase},
					// {"name":"Crew",						"url":"crew_quarters.php",				"for":planet + "|" + starBase},
					// {"name":"Black Market",				"url":"blackmarket.php",				"for":planet + "|" + starBase},
					// {"name":"Faction Info",				"url":"faction.php",					"for":planet + "|" + starBase},
					// {"name":"Syndicate Info",			"url":"esteemed_pilots_syndicate.php",	"for":planet},
				],
				"linksType":{"type":"links", "style":"", "separator":"<br />"},
			},
			
			"ship":{
				"altShipTab":{"enabled":true},
				"healthDisplay":"absolute" // if the design breaks, change this to relative
			},
			
			"otherships":{
				"links":[
					{"name":"PM",				"url":"javascript:sendmsg('$pilotName');",							"newTab":true},
					{"name":"Trade",			"url":"ship2ship_transfer.php?playerid=$ID",						"newTab":false},
					{"name":"Attack",			"url":"ship2ship_combat.php?playerid=$ID",							"newTab":false},
					{"name":"GNN",				"url":"news.php?s=$pilotName&searchtype=pilot&search=Search",		"newTab":false},
					// {"name":"Alliance News",		"url":"news.php?s=$allianceName&searchtype=alliance&search=Search",	"newTab":false},
					// {"name":"Scan Cargo",		"url":"javascript: contrabandScan('$ID');",							"newTab":false},
					{"name":"Tag!",					"url":"javascript: tagThatDude('$ID');",							"newTab":false} // always false!
					],
				"linksType":{"type":"links", "style":"font-size:x-small;", "separator":" | "},
			},
			
			"msgbar":{
				"links":[
					// {"name":"Tools",			"url":"http://pardus.rukh.de/",													"newTab":true},
					{"name":"Nhyujm's Map",		"url":"http://mapper.pardus-alliance.com/$Uni/",								"newTab":true},
					{"name":"Alliance Forum",	"url":"http://lsaforum.forumotion.com/login",									"newTab":true,	"for":"artemis"},
					{"name":"Alliance Forum",	"url":"http://RatchFaz.pardus.at/404.set_your_link_first!",						"newTab":true,	"for":"orion"},
					// {"name":"Arkoan's Map",		"url":"http://unique.hobby-site.com/Pardus-Spy/ClusterReport?universe=$uni",	"newTab":true},
				],
				"universeSwitch":{"enabled":true},
				"linksType":{"type":"links", "style":"font-weight:bold;", "separator":" | "},
			},
			

			"forumSmilies":[
			"IP://chat/angry.png",						"[img]http://static.pardus.at/img/stdhq/chat/angry.png[/img]",					true,
			"IP://chat/blush.png",						"[img]http://static.pardus.at/img/stdhq/chat/blush.png[/img]",					true,
			"IP://chat/biowaste.png",					"[img]http://static.pardus.at/img/stdhq/chat/biowaste.png[/img]",				true,
			"IP://chat/credits_16x16.png",				"[img]http://static.pardus.at/img/stdhq/chat/credits_16x16.png[/img]",			true,
			"IP://factions/sign_eps_64x64.png",			"[img]http://static.pardus.at/img/stdhq/factions/sign_eps_16x16.png[/img]",		true,
			"IP://factions/sign_tss_64x64.png",			"[img]http://static.pardus.at/img/stdhq/factions/sign_tss_16x16.png[/img]",		true,
			// first the url of the image to show (does not need to be of correct size, IP:// means "from the current imagepack"), then the text you want to the button to add when clicked and finally whether to use it or not
			
			"use?",					true,	"forumSmilies"]
		};
		
		return defs;
	}
	
	if (GM_getValue('values') !== undefined) {
		var values = JSON.parse(GM_getValue('values'));
	}
	else {
		var values = createDefs();
	}
	
	if (location.href.indexOf(".pardus.at/options.php") !== -1) {
	
		// name to be displayed on the panel, followed by " Preferences" automatically
		// will also be assigned as the ID attribute of the panel
		var simpleName = "RatchFaz Commander Beta";
		
		// HTML to go into the panel, repeat the linebreak as often as needed to avoid a mess
		function writeHTML() {
			panel.innerHTML = "<div align='center'><font color='yellow'>Work in Progress!</font></div><br><table><tbody>"
			+ "<tr><td width='225px'>Alternate Ship tab</td><td width='225px'><input style='width: 100%;' type='button' id='altShipTab' onClick='toggleRFBool(values[\"ship\"][\"altShipTab\"],\"enabled\",this);' value='" + values['ship']['altShipTab']['enabled'].toString() + "'></td></tr>"
			+ "</tbody></table>"
			+ "<br><div align='center'><input type='button' onClick='saveRFPrefs();' value='Save'></div>"
			+ "<br><font color='yellow'>To put a long story short, the current version of the RatchFaz has an incomplete preferences storage system that currently even prevents them from being changed in any way other than through this console.<br>[technical bla bla]<br>Put simply, if you want to change any preferences, follow these steps:"
			+ "<br>-edit the script itself to change the preferences (sort of standard procedure by now)<br>-go to this page (or refresh it if you're already on it, the script must be reloaded)<br>-press the button below to write the changes you made in the script to the script's preferences memory</font>"
			+ "<br><br><div align='center'><input type='button' onClick='reinitiateRFPrefs();' value='Re-initiate Preferences'></div>";
		}
		
		// optional function to build your HTML via JS. The "return;" only serves to make it blank
		function buildHTML() {
			return;
		}
		
		// variables to be used in the panel
		unsafeWindow.values = values;
		
		// function that may be called by elements in the panel, copy as often as needed to add more (you must change the name, of course). The "return;" only serves to make it blank
		// the function is defined, called and executed locally (on the page itself) but somehow also has access to the GM_value commands of the script that makes the unsafeWindow call
		// try to give these functions names associated to your script to prevent interference with other elements calling a different function with the same name
		unsafeWindow.toggleRFBool = function(prefGroup,pref,element) {
			prefGroup[pref] = [true,false][[false,true].indexOf(prefGroup[pref])];
			element.setAttribute('value',prefGroup[pref].toString());
		}
		
		unsafeWindow.saveRFPrefs = function() {
			setTimeout(function() {
				GM_setValue('values',JSON.stringify(values));
			},1);
		}
		
		unsafeWindow.reinitiateRFPrefs = function() {
			setTimeout(function() {
				GM_setValue('values',JSON.stringify(createDefs()));
			},1);
		}
		
		// do not touch unless horrendously badly needed, uniformity is a must
		
		if (document.getElementById('empty') !== null) {
			var container = document.getElementById('empty');
			var title = container.getElementsByTagName('th')[0];
			var panel = container.getElementsByTagName('td')[0];
			
			container.removeAttribute('id');
		}
		else {
			var emptyTitle = "Empty Slot";
			var emptyPanel = "Other scripts will add their control panels here and on next lines.";
			
			var parent = document.getElementsByTagName('tbody')[3];
			parent.innerHTML +=   "<br><br><tr><td id='container' width='450' valign='top'><table width='100%' cellpadding='3' align='center'><tbody><tr><th id='title'></th></tr><tr><td id='panel'valign='top' align='left'></td></tr></tbody></table></td>"
					+ "<td width='40'>"
					+ "<td id='empty' width='450' valign='top'><table width='100%' cellpadding='3' align='center'><tbody><tr><th>" + emptyTitle + "</th></tr><tr><td valign='top' align='left'>" + emptyPanel + "</td></tr></tbody></table></td></tr>";
			
			var container = document.getElementById('container');
			var title = document.getElementById('title');
			var panel = document.getElementById('panel');
			
			container.firstChild.setAttribute('style',parent.getElementsByTagName('table')[0].getAttribute('style'));
			document.getElementById('empty').getElementsByTagName('tbody')[0].setAttribute('style',parent.getElementsByTagName('table')[0].getAttribute('style'));
			
			container.removeAttribute('id');
			title.removeAttribute('id');
			panel.removeAttribute('id');
		}
		
		title.innerHTML = simpleName + " Preferences";
		container.setAttribute('id',simpleName);
		writeHTML();
		buildHTML();
	}

	function getCenterTileSrc(){
		var table = document.getElementById('navtransition').getElementsByTagName('table')[0];
		if (table === undefined) {
			table = document.getElementById('nav').getElementsByTagName('table')[0];
		}
		
		var centerImageSrc = table.rows;
		
		centerImageSrc = centerImageSrc[Math.floor(centerImageSrc.length / 2)].cells;
		GM_log(centerImageSrc[Math.floor(centerImageSrc.length / 2)].innerHTML);
		centerImageSrc = centerImageSrc[Math.floor(centerImageSrc.length / 2)].getElementsByTagName('img')[0].getAttribute('src');
		return centerImageSrc;
	}

	function createLink(innerHTML, url, setting) {
		switch(setting["type"]) {
			case ("buttons"):
				link = document.createElement('input');
				link.setAttribute('value',innerHTML);
				link.setAttribute('type','button');
				if (setting["newTab"]) {
					link.setAttribute('onClick',"location.location.replace('" + url + "');");
				}
				else {
					link.setAttribute('onClick',"window.open('" + url + "');");
				}
				return link;
				
			case ("links"):
				link = document.createElement('a');
				link.innerHTML = innerHTML;
				link.setAttribute('href',url);
				if (setting["style"] !== undefined && setting["style"] !== "" && setting["style"] !== "none") {
					link.setAttribute('style',setting["style"]);
				}
				if (setting["newTab"] === true) {
					link.setAttribute('target',"_blank");
				}
				else {
					link.setAttribute('target',"main");
				}
				return link;
		}
	}

	function do_status(statusTab,settings) {
		if (settings === undefined) {
			settings = values["status"];
		}
		if (settings['links'].length > 0) {
			var div = document.createElement('div');
			div.setAttribute('style','margin-top: 7px; text-align:center');
			
			function createStatusLinks(setting) {
				var text = setting["name"];
				var url = setting["url"];
				return createLink(text, url, settings['linksType']);
			}
			
			for (i = 0;i < settings['links'].length;i++) {
				if (div.innerHTML.length > 0 && settings['linksType']["separator"] !== undefined) {
					div.innerHTML += settings['linksType']["separator"];
				}
				div.appendChild(createStatusLinks(settings['links'][i]));
			}
			statusTab.appendChild(div);
		}
	}

	function do_commands(commandsTab,settings){
		if (settings === undefined) {
			settings = values["commands"];
		}
		
		var centerSrc = getCenterTileSrc();
		
		function createCommands(setting) {
			var text = setting['name'];
			var url = setting["url"];
			return createLink(text, url, settings['linksType']);
		}
		
		var commandsBox = document.createElement('span');
		commandsTab.getElementsByTagName('a')[1].parentNode.insertBefore(commandsBox,commandsTab.getElementsByTagName('a')[1]);
		
		for (i = 0;i < settings['links'].length;i++) {
			if (centerSrc.match(new RegExp(settings['links'][i]["for"])) && centerSrc.match(new RegExp(settings['links'][i]["notfor"])) === null){
				commandsBox.appendChild(createCommands(settings['links'][i]));
				commandsBox.innerHTML += "<br />";
			}
		}
		if (commandsBox.innerHTML.length > 0) {
			commandsBox.innerHTML += settings['linksType']["separator"];
		}
		
		var box = document.getElementById('commands_content');
		if (box.getElementsByTagName('a')[0].getAttribute('href').match("building_management.php")) {
			for (var ii = 0;ii < box.getElementsByTagName('span')[0].getElementsByTagName('a').length;ii++) {
				if (box.getElementsByTagName('span')[0].getElementsByTagName('a')[ii].getAttribute('href').match("building_trade.php")) {
					box.getElementsByTagName('span')[0].removeChild(box.getElementsByTagName('span')[0].getElementsByTagName('a')[ii]);
					box.getElementsByTagName('span')[0].innerHTML = box.getElementsByTagName('span')[0].innerHTML.replace("<br><br>","");
				}
			}
		}
	}
	
	function do_ship(shipTab, settings) {
		if (settings["altShipTab"]["enabled"] === true) {
			shipTab = shipTab.getElementsByTagName('tbody')[0];
			var TRs = shipTab.childNodes;
			var armorIO = false;
			var shieldIO = false;
			
			var curArmor = 0;
			var maxArmor = 0;
			var curShield = 0;
			
			var curHull = parseInt(TRs[0].getElementsByTagName('font')[1].innerHTML);
			var maxHull = parseInt(TRs[0].getElementsByTagName('font')[2].innerHTML.replace(" / ",""));
			
			if (TRs.length === 4) {
				if (TRs[1].getElementsByTagName('font')[0].innerHTML === "Armor:") {
					armorIO = true;
					curArmor = parseInt(TRs[1].getElementsByTagName('font')[1].innerHTML);
					maxArmor = parseInt(TRs[1].getElementsByTagName('font')[2].innerHTML.replace(" / ",""));
				}
				else {
					shieldIO = true;
					curShield = parseInt(TRs[1].getElementsByTagName('font')[0].innerHTML);
				}
			}
			else {
				if (TRs.length === 5) {
					armorIO = true;
					curArmor = parseInt(TRs[1].getElementsByTagName('font')[1].innerHTML);
					maxArmor = parseInt(TRs[1].getElementsByTagName('font')[2].innerHTML.replace(" / ",""));
					
					shieldIO = true;
					curShield = parseInt(TRs[2].getElementsByTagName('font')[1].innerHTML);
				}
			}
			
			function d2h(d) {
				var result = d.toString(16);
				if (result.length === 1) {
					result = "0" + result;
				}
				return result;
			}
			
			// ff0000 red
			// ff8000 orange
			// 00ff00 green
			
			function color(ratio,type) {
				if (type === "rgb") {
					return "rgb(" + Math.ceil((1 - Math.abs((1 - ratio*2))))*255 + "," +  Math.ceil(ratio*255) + ",00)";
				}
				else {
					if (ratio <= 0.5) {
						var one = "ff";
					}
					else {
						var one = d2h(Math.ceil((1 - Math.abs((1 - ratio*2))))*255);
					}
					return "#" + one + d2h(Math.ceil(ratio*255)) + "00";
				}
			}
			
			var shipBox = document.createElement('tr');
			TRs[TRs.length - 2].parentNode.insertBefore(shipBox,TRs[TRs.length - 2]);
			shipBox.innerHTML = "<td>Ship Status:</td><td><div id='shield'><div id='armor'><div id='hull' align='center'><img id='shipImage' style='width: 40px; height: 40px;' src='" + document.getElementById('ship').getAttribute('src') + "'></div></div></div></td><td><table><tbody><tr><font id='hullPerc'></font></tr><tr><font id='armorPerc'></font></tr><tr><font color='#2c99eb'>" + curShield + "</font></tr></tbody></table></td>";
			
			function fetchById(id,element) {
				var res = document.evaluate('.//*[@id="'+id+'"]',element,null,XPathResult.ANY_TYPE,null);
				return res.iterateNext();
			}
			
			shipImage = fetchById('shipImage',shipTab);
			var hull = fetchById('hull',shipTab);
			var armor = fetchById('armor',shipTab);
			var shield = fetchById('shield',shipTab);
			var hullHealth = fetchById('hullPerc',shipTab);
			var armorHealth = fetchById('armorPerc',shipTab);
			
			shipImage.style.opacity = ["1","0.5"][parseInt(shipTab.getElementsByTagName('input')[0].getAttribute('onclick').match(/0|1/))];
			
			hull.style.padding = "5px";
			hull.style.border = "2px solid " + color(curHull/maxHull,"rgb");
			hullHealth.innerHTML = [Math.ceil((curHull/maxHull)*100) + "%",curHull + "/" + maxHull][["relative","absolute"].indexOf(settings["healthDisplay"])];
			hullHealth.setAttribute('color',color(curHull/maxHull),"rgb");
			
			armor.style.padding = "2px";
			armor.style.border = "2px solid " + color(curArmor/maxArmor,"rgb");
			armorHealth.innerHTML = [Math.ceil((curArmor/maxArmor)*100) + "%",curArmor + "/" + maxArmor][["relative","absolute"].indexOf(settings["healthDisplay"])];
			armorHealth.setAttribute('color',color(curArmor/maxArmor),"rgb");
			
			shield.style.padding = "2px";
			if (curShield !== 0) {
				shield.style.border = "2px solid #2c99eb";
			}
			else {
				shield.style.border = "none";
			}
			
			shipTab.removeChild(TRs[0]);
			if (armorIO === true && shieldIO === true) {
				shipTab.removeChild(TRs[0]);
				shipTab.removeChild(TRs[0]);
			}
			else {
				if ((armorIO === true && shieldIO === false) || (armorIO === false && shieldIO === true)) {
					shipTab.removeChild(TRs[0]);
				}
			}
			
			TRs[1].firstChild.setAttribute('colspan',3);
			TRs[2].firstChild.setAttribute('colspan',3);
		}
	}
	
	function do_otherShips(otherShipstab, settings, list) {
		unsafeWindow.tagThatDude = function(ID) {
			setTimeout(function() {
				GM_setValue("tagger",true);
				window.open("/ship2ship_transfer.php?playerid=" + ID);
			},1);
		}
		var ships = otherShipstab.getElementsByTagName('tr');
		var ID, pilotName, allianceName;
		function createPilotLink(setting){
			var url = setting['url'];
			var text = setting['name'];
			url = url.replace(/\$ID/,ID);
			url = url.replace(/\$pilotName/,pilotName);
			url = url.replace(/\$allianceName/,allianceName);
			return createLink(text, url, settings['linksType']);
		}
		
		for (var i = 0;i < ships.length;i++) {
			var a = ships[i].getElementsByTagName('a')[0];
			var ID = a.getAttribute('href').replace("main.php?scan_details=", "").replace("&scan_type=player", "").replace("javascript:scanId(", "").replace(', "player")',"");
			var pilotName = a.innerHTML;
			if (pilotName.match(NPCs) === null) {
				if (pilotName.match("<font")) {
					pilotName = pilotName.substring(pilotName.indexOf('>') + 1,pilotName.lastIndexOf('<'));
				}
				if (ships[i].getElementsByTagName('a')[1] !== undefined) {
					allianceName = ships[i].getElementsByTagName('a')[1].innerHTML;
				}
				else {
					allianceName = undefined;
				}
				
				ships[i].getElementsByTagName('td')[1].innerHTML += "<br />";
				for (var j = 0;j < settings['links'].length;j++) {
					if (allianceName !== undefined || settings['links'][j]["url"].match(/\$allianceName/) === null) {
						if (j > 0) {
							ships[i].getElementsByTagName('td')[1].innerHTML += settings["linksType"]["separator"];
						}
						ships[i].getElementsByTagName('td')[1].appendChild(createPilotLink(settings['links'][j]));
					}
				}
			}
		}
	}

	if (location.href.match("main.php")) {
		do_status(document.getElementById('status_content'), values["status"]);
		var local_updateStatus = unsafeWindow.updateStatus;
		if (local_updateStatus) {
			unsafeWindow.updateStatus = function(result) {
				try {
					local_updateStatus(result);
				}
				catch(error) {
					alert(error);
				}
				setTimeout(function() {
					try {
						do_status(document.getElementById('status_content'), values["status"]);
					}
					catch(error) {
						alert(error);
					}
				},1);
			}
		}

		do_commands(document.getElementById('commands_content'), values["commands"]);
		var local_updateCmd = unsafeWindow.updateCmd;
		if (local_updateCmd) {
			unsafeWindow.updateCmd = function(result) {
				try {
					local_updateCmd(result);
				}
				catch(error) {
					GM_log(error);
				}
				setTimeout(function() {
					try {
						do_commands(document.getElementById('commands_content'), values["commands"]);
					}
					catch(error) {
						GM_log(error);
					}
				},1);
			}
		}
		
		do_ship(document.getElementById('yourship_content'), values["ship"]);
		var local_updateShip = unsafeWindow.updateShip;
		if (local_updateShip) {
			unsafeWindow.updateShip = function(result) {
				try {
					local_updateShip(result);
				}
				catch(error) {
					GM_log(error);
				}
				setTimeout(function() {
					try {
						do_ship(document.getElementById('yourship_content'), values["ship"]);
					}
					catch(error) {
						GM_log(error);
					}
				},1);
			}
		}
		
		var NPCs = /(Bomber|Fighter) Squadron|Fuel Tanker|(|Mutated) Space Maggot|(|Mutated )Space Worm(| Albino)|(|Swarm of )Gorefang(|ling(|s))|Roidworm Horde|Exo Crab|Hidden Drug Stash|Slave Trader|(Lone|Escorted) Smuggler/;
		do_otherShips(document.getElementById('otherships_content'), values["otherships"], NPCs);
		var local_updateShips = unsafeWindow.updateShips;
		if (local_updateShips) {
			unsafeWindow.updateShips = function (result) {
				try {
					local_updateShips(result);
				}
				catch(error) {
					GM_log(error);
				}
				setTimeout(function() {
					try {
						do_otherShips(document.getElementById('otherships_content'), values["otherships"], NPCs);
					}
					catch(error) {
						GM_log(error);
					}
				},1);
			}
		}
		
	}

	if (location.href.match("msgframe.php")) {
		if (values['msgbar']['links'].length > 0) {
			function createCustomLinks(setting) {
				var text = setting["name"];
				var uni = location.hostname.split('.')[0];
				var Uni = uni.charAt(0).toUpperCase() + uni.substr(1);
				var url = setting["url"].replace(/\$uni/g, uni);
				var url = setting["url"].replace(/\$Uni/g, Uni);
				var carrier = setting["newTab"];
				link = createLink(text, url, values['msgbar']['linksType']);
				msgBar.appendChild(link);
			}
			var msgBar = document.getElementsByTagName('table')[0].rows[0].cells[2];
			msgBar.innerHTML+="<br />";
			for (i = 0; i < values['msgbar']['links'].length;i++) {
				if (values['msgbar']['links'][i]['for'] === undefined || new RegExp(values['msgbar']['links'][i]['for'],'i').test(location.hostname.split('.')[0])) {
					if (i > 0) {
						msgBar.innerHTML+=values['msgbar']['linksType']["separator"];
					}
					createCustomLinks(values['msgbar']['links'][i]);
				}
			}
		}
		if (values['msgbar']['universeSwitch']['enabled'] === true) {
			var uni = document.getElementById('universe');
			var uniName = uni.getAttribute('src');
			uniName = uniName.substring(uniName.lastIndexOf('/') + 1,uniName.length - 10);
			
			function createPic(name) {
				var uniPic = document.createElement('img');
				uniPic.setAttribute('onClick',"parent.location.href='http://www.pardus.at/index.php?section=account_play&universe=" + name.charAt(0).toUpperCase() + name.substring(1,name.length) + "'");
				uniPic.setAttribute('src','http://static.pardus.at/various/universes/' + name + "_16x16.png");
				uniPic.setAttribute('style',"width: 13px; height: 13px; border: 0; vertical-align: middle;");
				uniPic.setAttribute('title',"Quickly switch over to " + name.charAt(0).toUpperCase() + name.substring(1,name.length));
				return uniPic;
			}
			
			var orion = createPic("orion");
			var artemis = createPic("artemis");
			var pegasus = createPic("pegasus");
			
			if (uniName === "orion") {
				uni.parentNode.insertBefore(pegasus,uni.nextSibling);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni.nextSibling);
				uni.parentNode.insertBefore(artemis,uni.nextSibling);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni.nextSibling);
			}
			
			if (uniName === "artemis") {
				uni.parentNode.insertBefore(orion,uni);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni);
				uni.parentNode.insertBefore(pegasus,uni.nextSibling);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni.nextSibling);
			}
			
			if (uniName === "pegasus") {
				uni.parentNode.insertBefore(orion,uni);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni);
				uni.parentNode.insertBefore(artemis,uni);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni);
			}
		}
	}
	
	if (location.href.match("ship2ship_transfer.php")) {
		setTimeout(function() {
			var tag = GM_getValue("tagger",false);
			if (tag === true) {
				GM_setValue("tagger",false);
				document.getElementsByName('credits')[0].setAttribute('value',"1");
				document.getElementsByName('credits')[0].focus();
				document.getElementsByTagName('form')[0].setAttribute('onsubmit','setTimeout(function() {window.close();},100);');
			}
		},1);
	}

	if (location.href.match("sendmsg.php")) {
		if (location.href.match("to=undefined") === null) {
			for (var i = 0;i < document.images.length;i++) {
				if (document.images[i].getAttribute('src').match("/races/")) {
					var pic = document.images[i];
					break;
				}
			}
			var title = pic.getAttribute('title');
			pic.parentNode.innerHTML += "<br />Alliance: " + title.substring(title.indexOf(" - ") + 3)
		}
		else {
			document.getElementById('recipient2').focus();
		}
	}

	if (location.href.match("news.php")) {
		document.getElementsByTagName('input')[0].focus();
	}

	if (location.href.match("combat_details.php")) {
if (document.getElementsByTagName('input')[0] !== null) {
		document.getElementsByTagName('input')[0].focus();
}
	}

	if (location.href.match("overview_stats.php")) {
		function estimate(ID) {
			var rank = document.getElementById(ID).parentNode.nextSibling;
			var percentage = rank.getElementsByTagName('td')[0].getAttribute('width');
			rank.innerHTML += "<tr align=center><td>" + percentage + "%</td></tr>";
		}
		estimate('bar_milrank_current');
		estimate('competency_current');
	}

	if (location.href.match("overview_ship.php")) {
		for (var i = 0;i < document.images.length;i++) {
			if (document.images[i].getAttribute('src').match("/ships/")) {
				document.images[i].setAttribute('src',document.images[i].getAttribute('src').replace(new RegExp("(ships|96/ships|128/ships)"), "big").replace('.png','_big.png'));
			}
		}
	}

	if (location.href.match("messages_")) {
		document.getElementsByTagName('input')[0].focus();
		if (location.href.match("private")) {
			var PMs = document.getElementsByClassName('messagestyle');
			for (var i = 0;i < PMs.length;i++) {
				if (PMs[i].innerHTML.match("<b>Subject: DISTRESS CALL</b>") && PMs[i].innerHTML.match("The ship it is originating from is out of fuel.")) {
					PMs[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML = PMs[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML.replace("This is an automated distress call. The ship it is originating from is out of fuel. ","") + "<br><b><font color=red>All non-Fuel Tankers are asked to ignore this message!</b></font></b>";
				}
			}
		}
	}

	if (location.href.match("index.php?") && values['forumSmilies'][values['forumSmilies'].length - 2] === true) {
		var IPLocation = document.getElementById('logostrip').getElementsByTagName('img')[0].getAttribute('src').replace("forum/1/logo.jpg", "");
		var smilieBox = document.getElementsByClassName('pformleft')[1].getElementsByTagName('tr');
		if (smilieBox[0] === undefined) {
			smilieBox = document.getElementsByClassName('pformleft')[3].getElementsByTagName('tr');
		}
		var box = null;
		var smilie = null;
		var smilieLink = null;
		var smilieImage = null;
		for (i = 0;i < values['forumSmilies'].length - 3;i += 9) {
			box = document.createElement('tr');
			smilieBox[0].parentNode.insertBefore(box,smilieBox[smilieBox.length - 1]);
			for (ii = i;ii < 9 + i;ii += 3) {
				smilie = box.appendChild(document.createElement('td'));
				smilieLink = smilie.appendChild(document.createElement('a'));
				smilieImage = smilieLink.appendChild(document.createElement('img'))
				
				if (values['forumSmilies'][ii + 2] === true) {
					smilieImage.setAttribute('src',values['forumSmilies'][ii].replace("IP://",IPLocation));
					smilieImage.setAttribute('height','20px');
					smilieImage.setAttribute('width','20px');
					smilieLink.setAttribute('href','javascript: emoticon(\'' + values['forumSmilies'][ii + 1] + '\');');
				}
				else {
					smilieImage.setAttribute('src','http://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/500px-RedX.svg.png');
					smilieImage.setAttribute('height','20px');
					smilieImage.setAttribute('width','20px');
					smilieLink.setAttribute('href','javascript: emoticon("Don\'t click that one, noob!");');
				}
			}
		}
		if (document.getElementsByName('TopicTitle')[0] !== undefined) {
			if (document.getElementsByName('TopicTitle')[0].innerHTML === "") {
				document.getElementsByName('TopicTitle')[0].focus(); // buggy somehow
			}
			else {
				document.getElementsByName('Post')[0].focus();
			}
		}
		else {
			document.getElementsByName('Post')[0].focus();
		}
	}
}
catch(error) {
	if (error.toString().indexOf("TypeError: pic is undefined") === -1) {
		alert(error);
	}
}