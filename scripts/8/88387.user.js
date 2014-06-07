// ==UserScript==
// @name           Darkfleet Autopilot
// @namespace      DFAP
// @description    Darkfleet-Autopilot und Auto-Item-Aufheber. Fliegt automatisch eine festgelegte Route und hebt alles auf, was ihm in den Weg kommt.
// @include        http://uni1.darkfleet.de/darkfleet/internal/map.php
// @include        http://uni1.darkfleet.de/darkfleet/internal/map.php*
// @include        http://uni1.darkfleet.de/darkfleet/internal/fight.php
// @include        http://uni1.darkfleet.de/darkfleet/internal/fight.php*
// @include        http://uni1.darkfleet.de/darkfleet/internal/main.php
// @include        http://uni1.darkfleet.de/darkfleet/internal/main.php*
// ==/UserScript==
var cur_page = document.location.href;
cur_page = cur_page.substr(cur_page.lastIndexOf("/") + 1);
cur_page = cur_page.substr(0,cur_page.indexOf("."));
if(cur_page == "main" || cur_page == "fight") {
	var c = 0;
	function hasdone() {
		c -= 1;
                 if(c == 0) {
			document.location.href = "http://uni1.darkfleet.de/darkfleet/internal/main.php";
                 }
         }
         function re() {
		document.location.href = "http://uni1.darkfleet.de/darkfleet/internal/main.php";
         }
	function main_init() {
         	if(document.body.innerHTML.indexOf("mindestens 10 Energiepunkte um einen Angriff durchzuführen.") > -1) {
                 	setTimeout(re,5000);
                 }else{
         		var l = document.getElementsByTagName("a");
                 	for(var i = 0;i < l.length;i++) {
                 		if(l[i].innerHTML == "Asteroiden-Material abbauen") {
                         		if(unsafeWindow.parent.frames[7].wielang >= 150) {
                                 	        unsafeWindow.location.href=l[i].href;
                                 	}else{
						setTimeout(function() {unsafeWindow.location.href=l[i].href},(150 - unsafeWindow.parent.frames[7].wielang) * 1000)
                                 	}
                                		break;
                         	}
                         	if(l[i].innerHTML == "Nehmen") {
                         		var ul = l[i].href;
                                 	if(ul.substr(0,7) != "http://") {
                                 		ul = "http://uni1.darkfleet.de/darkfleet/internal/" + ul;
                                 	}
					GM_xmlhttpRequest({
						method: 'GET',
						url: ul,
						headers: {
							'Accept': '*/*',
						},
						onload: function(responseDetails) {
                                         		hasdone();
						}
					});
                                 	c -= -1;
                         	}
                 	}
                 }
         }
}else if(cur_page == "map") {
	function showmapcoords() {
		var f = window.open("","MapList","");
                 f.document.write("<h2 style='color:white;'>Koordinaten</h2><span style='color:white;'>");
         	var coords = new Array();
         	var globe_entries = localStorage.getItem("map_coords2");
                 if(globe_entries != "null" && globe_entries != null) {
                 	globe_entries = globe_entries.split("|");
                 	for(var i = 0;i < globe_entries.length;i++) {
				var data = globe_entries[i].split(";");
				if(typeof(coords[data[0]]) == "undefined" || coords[data[0]].length == 0 || coords[data[0]] == "") {
					coords[data[0]] = new Array();
                                 }
				coords[data[0]][data[1]] = data[2];
                                 f.document.write("Position X: " + data[0] + " Y: " + data[1] + " = " + data[2] + "<br>");
                 	}
                 }
                 f.document.write("</span>");
         }
	function map_init() {
         	var coords = new Array();
         	var globe_entries = localStorage.getItem("map_coords2");
                 if(globe_entries != "null" && globe_entries != null) {
                 	globe_entries = globe_entries.split("|");
                 	for(var i = 0;i < globe_entries.length;i++) {
				var data = globe_entries[i].split(";");
				if(typeof(coords[data[0]]) == "undefined" || coords[data[0]].length == 0 || coords[data[0]] == "") {
					coords[data[0]] = new Array();
                                 }
				coords[data[0]][data[1]] = data[2];
                 	}
                 }
                 var s = document.createElement("a");
                 s.href = "javascript:void(0)";
                 s.innerHTML = "Posis";
                 s.style.paddingLeft = "5px";
                 s.addEventListener("click",showmapcoords,true);
                 document.getElementsByTagName("div")[0].getElementsByTagName("p")[0].appendChild(s);
		var current_pos = document.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML;
                 current_pos = current_pos.substring(current_pos.indexOf("</a>") + 5);
		current_pos = current_pos.substring(current_pos.indexOf("X:") + 3);
                 var x = current_pos.substring(0,current_pos.indexOf(" ")).replace(".","");
		current_pos = current_pos.substring(current_pos.indexOf("Y:") + 3);
                 var y = current_pos.substring(0,current_pos.indexOf("<")).replace(".","");

                 x -= 3;
                 y -= 3;

                 var tabelle = document.getElementById("mapTable").getElementsByTagName("table")[0].getElementsByTagName("tr");

                 var cu = 0;
                 for(var o_y = y;o_y < y + 7;o_y++) {
                 	var trelem = tabelle[cu];
                 	var cu2 = 0;
                 	for(var o_x = x;o_x < x + 7;o_x++) {
				var tdelem = trelem.getElementsByTagName("td")[cu2];
                                 var t = tdelem.getAttribute("background");
                                 t = t.substring(t.lastIndexOf("/") + 1);
                                 t = t.substring(0,t.indexOf("."));
                                 if(t.indexOf("space") <= -1) {
                                 	if(typeof(coords[o_x]) == "undefined" || coords[o_x].length == 0 || coords[o_x] == "") {
						coords[o_x] = new Array();
                                         }
                                         coords[o_x][o_y] = t;
                                 }
                                 cu2 += 1;
                 	}
                         cu += 1;
                 }

                 var save_buffer = "";
		for(var i in coords) {
                 	for(var j in coords[i]) {
                         	var entry = i + ";" + j + ";" + coords[i][j];
				if(save_buffer != "") {
					save_buffer += "|";
                                 }
                                 save_buffer += entry;
                         }
                 }
                 localStorage.setItem("map_coords2",save_buffer);
                 var current_route = localStorage.getItem("current_route");
                 if(current_route == null || current_route == "null") {
			current_route = 0;
                 }
                 var cr = current_route - (0 - 1);
                 if(cr >= route.length) {
			cr = 0;
                 }
                 localStorage.setItem("current_route",cr);
		setTimeout(function() {eval("unsafeWindow.Move" + route[current_route] + "()")},15000);
		setTimeout(function() {eval("unsafeWindow.Move" + route[current_route] + "()")},175000);
         }
}
// Hier wird die Reihenfolge festgelegt, welche stets wiederholt wird.
// Route für Flug um Heimatplaneten. Ausgehend von 2 Feldern links hoch vom Heimatplaneten aus.
var route = new Array(
	"Right",
	"Right",
	"Right",
	"Right",
         "Down",
         "Left",
         "Left",
         "Left",
         "Left",
         "Down",
	"Right",
	"Right",
	"Right",
	"Right",
         "Down",
         "Left",
         "Left",
         "Left",
         "Left",
         "DownRight",
	"Right",
	"Right",
	"Right",
	"UpLeft",
	"UpLeft",
	"UpLeft",
	"UpLeft"
);
if(typeof(main_init) != "undefined") {
	window.addEventListener("load",main_init,true);
}
if(typeof(map_init) != "undefined") {
	window.addEventListener("load",map_init,true);
}