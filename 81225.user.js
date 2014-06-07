// ==UserScript==
// @name			Pardus Dark Fuelgauger
// @version			v3
// @namespace		marnick.leau@skynet.be
// @description		Small gadget that comes with the Pardus Dark UI pack.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/main.php
// @include			http*://*.pardus.at/ship_equipment.php?sort=drive
// @grant			GM_setValue
// @grant			GM_getValue
// ==/UserScript==

if (location.pathname.indexOf("/ship_equipment.php") != -1) {
	var table = document.getElementsByClassName('messagestyle')[0];
	if (table.getElementsByTagName('td').length !== 1) {
		GM_setValue("fed@" + location.hostname,[false,true][[6,9].indexOf(table.getElementsByTagName('a').length)]);
		var buttons = table.getElementsByTagName('input');
		for (var i = 7;i < buttons.length;i += 8) {
			if (buttons[i].getAttribute('class') !== "disabled") {
				GM_setValue("index@" + location.hostname,(++i)/8 - 1);
				break;
			}
			GM_setValue("index@" + location.hostname,-1);
		}
	}
}

if (location.pathname.indexOf("/main.php") != -1) {
	var index = GM_getValue("index@" + location.hostname,-1);
	if (index !== -1) {
		var drive, size;
		if (GM_getValue("fed@" + location.hostname,false)) {
			drive = ["Nuclear","Fusion","Enhanced Fusion","Ion","Anti-Matter","Enhanced Anti-Matter","Hyper","Interphased","Enhanced Interphased"][index];
			size = [2,3,4,3,6,7,8,9,10][index];
		} else {
			drive = ["Nuclear","Fusion","Ion","Anti-Matter","Hyper","Interphased"][index];
			size = [2,3,3,6,8,9][index];
		}
	
		function navscript() {
			var gauge = document.getElementById('tdStatusFuelImg').firstChild;
			var level = parseFloat(document.getElementById('fuel').innerHTML);
			
			var levelpx = Math.round(40*level/size);
			gauge.parentNode.style.backgroundImage = "url('" + gauge.src.replace("fuelgauge","fuelgauge_full") + "')";
			gauge.parentNode.style.backgroundRepeat = "no-repeat";
			gauge.parentNode.style.backgroundPosition = "center";
			gauge.parentNode.style.minWidth = "40px";
			gauge.parentNode.setAttribute('title',"Fuel level: " + level + "/" + size + ".00, drive: " + drive);
			gauge.setAttribute('src',gauge.getAttribute('src').replace("fuelgauge","fuelgauge_empty"));
			gauge.removeAttribute('title');
			gauge.style.height = "16px";
			gauge.style.width = (40 - levelpx) + "px";
			gauge.style.position = "relative";
			gauge.style.left = (levelpx/2) + "px";
		}
		
		unsafeWindow.addUserFunction(navscript);
		navscript();
	}
}