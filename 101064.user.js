// ==UserScript==
// @name			Pardus Armor GraphX
// @version			v5
// @namespace		marnick.leau@skynet.be
// @description		Displays your armor values in a cooler way.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/main.php
// @include			http*://*.pardus.at/ship_equipment.php?sort=shield
// @include			http*://*.pardus.at/options.php
// @grant			GM_addStyle
// @grant			GM_setValue
// @grant			GM_getValue
// ==/UserScript==

// <!-- User variables -->

var percentages = true; // true to show percentages, false for absolute values and maximums

// <!-- End of user variables -->

// <!-- Standard variables -->

var script = {
	"name":"Pardus Armor GraphX",
	"id":8484409176484853,
	"version":4,
	"imghost":"http://s1135.photobucket.com/albums/m626/TheRealFaziri/Pardus/",
	"datahost":"http://dl.dropbox.com/u/3357590/GM%20Scripts/",
}

script.imgpath = script.name + "/";
script.datapath = script.name.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

// <!-- Global variables -->

var uni = document.location.hostname.match(/orion|artemis|pegasus/i)[0].toLowerCase();
var universes = ["orion","artemis","pegasus"];

// <!-- End of global variables -->

if (location.href.indexOf("/main.php") !== -1) {
	GM_addStyle("#PAGship {height: 64px; width: 64px;}");
	
	function hexcolor(ratio) {
		/*
		red 	ff0000
		orange	ff8000
		green	00ff00
		*/
		
		var color = ["","","00"];
		
		if (ratio < 50) {
			color[0] = "ff";
		} else {
			color[0] = ((100 - ratio)*2*2.55).toString(16).split(".")[0];
		}
		
		color[1] = (2.55*ratio).toString(16).split(".")[0];
		
		if (color[0].length === 1) {
			color[0] = "0" + color[0];
		}
		if (color[1].length === 1) {
			color[1] = "0" + color[1];
		}
		
		return color.join("");
	}
	
	var shieldIndex = GM_getValue("index@" + location.hostname,-1);
	var uni = GM_getValue("uni@" + location.hostname,false);
	
	var navscript = function() {
		if (document.getElementById("PAG" + script.id) === null) {
			var values = [0,0,0,0,0];
			var ids = ["Hull","HullMax","Armor","ArmorMax","Shield"];
			for (var i = 0;i < values.length;i++) {
				if (document.getElementById("spanShip" + ids[i]) !== null) {
					values[i] = parseInt(document.getElementById("spanShip" + ids[i]).innerHTML);
				}
			}
			
			var shield, shieldMax;
			if (values[4] === 0 || shieldIndex == -1) {
				shield = "none";
				shieldMax = 1;
			} else {
				if (uni) {			
					shieldMax = [60,120,270,420,660,120,270,400,630,870,840,870,630,840][shieldIndex];
				} else {
					shieldMax = [120,270,420,660][shieldIndex];
				}
				shield = "3px solid rgba(100,200,230," + values[4]/shieldMax + ")";
			}
			if (values[2] !== 0) {
				var armorratio = Math.round(values[2]/values[3]*100);
			} else {
				var armorratio = 0;
			}
			if (values[0] !== 0) {
				var hullratio = Math.round(values[0]/values[1]*100);
			} else {
				var hullratio = 0;
			}
			
			if (percentages === false) {
				var numbers = [values[2] + "/" + values[3],values[0] + "/" + values[1]];
			} else {
				var numbers = [armorratio + "%",hullratio + "%"];
			}
			
			var container = document.createElement('table');
			container.id = "PAG" + script.id;
			container.innerHTML = "<tbody><tr><td><div id=\"PAGShield\" style=\"border: " + shield + "; padding: 3px;\"><div id=\"PAGArmor\" style=\"border: 3px solid #" + hexcolor(armorratio) + "; padding: 3px;\"><div id=\"PAGHull\" style=\"border: 3px solid #" + hexcolor(hullratio) + "; padding: 3px;\"><img style=\"opacity: " + ["1","0.5"][["Cloak (AP: 100)","Uncloak"].indexOf(document.getElementById('yourship_content').getElementsByTagName('input')[1].value)] + ";\" id=\"PAGship\" src=\"" + document.getElementById('ship').src + "\"></td><td><table><tbody><tr><td id=\"PAGShieldnumber\" title='" + values[4] + " / " + shieldMax + "' style=\"color: #64c8e6;\">" + Math.round(values[4]/shieldMax*100) + "%</td></tr><tr><td id=\"PAGArmornumber\" title='" + values[2] + " / " + values[3] + "' style=\"color: #" + hexcolor(armorratio) + ";\">" + numbers[0] + "</td></tr><tr><td id=\"PAGHullnumber\" title='" + values[0] + " / " + values[1] + "' style=\"color: #" + hexcolor(hullratio) + ";\">" + numbers[1] + "</td></tr></tbody></table></td></tr></tbody>";
			var box = document.getElementById('yourship_content').getElementsByTagName('tbody')[0];
			for (var i = 0;i < 3;i++) {
				box.childNodes[i].style.display = "none"
			}
			box.insertBefore(container,box.lastChild.previousSibling);
		}
	}
	
	unsafeWindow.addUserFunction(navscript);
	navscript();
}

if (location.pathname.indexOf("/ship_equipment.php") != -1) {
	var table = document.getElementsByClassName('messagestyle')[0];
	if (table.getElementsByTagName('td').length !== 1) {
		GM_setValue("uni@" + location.hostname,[false,true][[4,14].indexOf(table.getElementsByTagName('a').length)]);
		
		var buttons = table.getElementsByTagName('input');
		for (var i = 8;i < buttons.length + 1;i += 8) {
			if (buttons[i - 1].getAttribute('class') !== "disabled") {
				GM_setValue("index@" + location.hostname,i/8 - 1);
				break;
			}
			GM_setValue("index@" + location.hostname,-1);
		}
	}
}