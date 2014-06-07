// ==UserScript==
// @name           galaxyupdater
// @namespace      abc
// @include        http://*.ogame.*/game/index.php?page=galaxy&session=*
// ==/UserScript==


(function(){
	function start() {
		isActive = true;
		last38 = false;
		setTimeout("submitOnKey(39)",0);
	}

	var isActive = false;
	var last38;

	function Galaxy() {
		var table = document.getElementById("galaxyContent").getElementsByTagName("table")[0];
		if (!table || table.getAttribute("done54644") == "done") return;
		table.setAttribute("done54644","done");

		if (isActive) {
			var galaxy = parseInt(document.getElementsByName("galaxy")[0].value);
			var system = parseInt(document.getElementsByName("system")[0].value);
			var timeMin = 2000;
			var timeMax = 2500;
			var time = Math.random()*(timeMax-timeMin)+timeMin;
			if (galaxy == 1 && last38 == true) {
				isActive = false;
			} else if (system == 1 && last38 == false) {
				last38 = true;
				setTimeout("submitOnKey(38)",time);
			} else {
				last38 = false;
				setTimeout("submitOnKey(39)",time);
			}
		} else {
			var cell = document.getElementById("galaxyheadbg2").getElementsByTagName("th")[0];
			cell.title = "Galaxy Return";
			cell.style.cursor = "pointer";
			cell.addEventListener("click",start,false);
		}
	}
	document.getElementById("galaxyContent").innerHTML; //check
	setInterval(Galaxy,100);
})();