// ==UserScript==
// @name OGame Redesign : Suche Player& kordis modified by Fleety
// @description OGame : Suche Player& kordis modified by Fleety
// @date 2011-08-10
// @creator Black Cat/ modified by Fleety
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @include http://*.ogame.*/game/index.php?page=search*
// ==/UserScript==

(function(){

	var hostname = window.location.hostname;

	var default_player = {
			status: "",
			planets: [] //coords, planet_name, moon_size
		};

	function safeWrap(f) {
		return function() {
			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
		};
	}

	if (typeof uneval === 'undefined') {
		uneval = function(obj) {
			return JSON.stringify(obj);
		}
	}
	
	if (typeof GM_getValue === 'undefined') {
		GM_getValue = function(key, defaultValue) {
			var retValue = localStorage.getItem(key);
			if (!retValue) {
				retValue = defaultValue;
			}
			return retValue;
		}
	}
	
	if (typeof GM_setValue === 'undefined') {
		GM_setValue = function(key, value) {
			localStorage.setItem(key, value);
		}
	}

	if (typeof GM_deleteValue === 'undefined') {
		GM_deleteValue = function(key) {
			localStorage.removeItem(key);
		}
	}

	if (typeof unsafeWindow === 'undefined') {
		unsafeWindow = window;
	}

	if (document.location.href.indexOf("page=galaxy") != -1) {
		function cloneObject(what) {
			if (!what) return;
			if (typeof(what) != "object") return what;
			var clone;
			if ((what.constructor+'') == (Date+'')) return what;
			else if ((what.constructor+'') == (Array+'')) clone=[];
			else clone={};
			for (var i in what) {
				if (typeof(what[i]) != "object") clone[i]=what[i];
				else clone[i]=cloneObject(what[i]);
			}
			return clone;
		}

		var default_record = {
				planet: {name: ""},
				moon: {size: 0},
				player: {id: 0, status: ""}
			};

		unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
			if (settings.url.indexOf("page=galaxyContent") == -1) return;

			var ngalaxy = settings.data.replace(/^.*galaxy=(\d*).*$/,"$1");
			var nsystem = settings.data.replace(/^.*system=(\d*).*$/,"$1");

			var record = new Object();
			var rows = document.querySelectorAll("#galaxytable tr.row");
			for (var i = 0; i < rows.length; i++) {
				var pos = rows[i].querySelector("td.position").textContent;
				var planet = document.getElementById("planet" + pos);
				if (!planet) continue;
				record[pos] = cloneObject(default_record);
				record[pos].planet.name = planet.getElementsByClassName("spacing")[0].getElementsByClassName("textNormal")[0].textContent;
				var moon = document.getElementById("moon" + pos);
				if (moon) {
					var spans = moon.getElementsByTagName("span");
					var ms_span;
					var j = 0;
					do {
						ms_span = spans[j];
						j++;
					}while(ms_span && ms_span.id != "moonsize");
					if (ms_span) { record[pos].moon.size = parseInt(ms_span.innerHTML.replace(/\D/g, '')); }
				}
				var playername = rows[i].querySelector("td.playername");
				var link = playername.getElementsByTagName("a")[0];
				if (link) { record[pos].player.id = parseInt(link.getAttribute("rel").replace(/\D/g, '')); }
				var status = playername.getElementsByClassName("status")[0];
				if (status) {
					var spans = status.getElementsByTagName("span");
					for (var j = 0; j < spans.length; j++) {
						if (spans[j].childNodes[0].nodeType == 3) {
							if (record[pos].player.status != "") { record[pos].player.status += " "; }
							record[pos].player.status += spans[j].childNodes[0].nodeValue;
						}
					}
				}
			}

			var system = new Object();
			var isEmpty = true;
			for (var i in record) {
				system[i] = record[i].player.id;
				isEmpty = false;
			}

			var str_system = uneval(system);
			var str_old_system = GM_getValue(hostname + ".systems." + ngalaxy + "." + nsystem, uneval(new Object()));
			
			if (str_system != str_old_system) {
				if (isEmpty) {
					GM_deleteValue(hostname + ".systems." + ngalaxy + "." + nsystem);
				} else {
					GM_setValue(hostname + ".systems." + ngalaxy + "." + nsystem, str_system);
				}
				var old_system;
				eval("old_system = " + str_old_system);
				for (var i in old_system) {
					if (system[i] != old_system[i]) {
						//Suppression des planètes abandonnées
						var player;
						eval("player = " + GM_getValue(hostname + ".players." + old_system[i], uneval(default_player)));
						var coords = ngalaxy + ":" + nsystem + ":" + i;
						var j = 0;
						var shift = 0;
						var length = player.planets.length;
						while (j < length) {
							if (player.planets[j][0] == coords) {
								shift++;
								length--;
							}
							if (shift != 0 && j < length) {
								player.planets[j][0] = player.planets[j+shift][0];
								player.planets[j][1] = player.planets[j+shift][1];
								player.planets[j][2] = player.planets[j+shift][2];
							}
							j++;
						}
						if (length > 0) {
							player.planets.length = length;
							GM_setValue(hostname + ".players." + old_system[i], uneval(player));
						} else {
							GM_deleteValue(hostname + ".players." + old_system[i]);
						}
					}
				}
			}

			for (var i in record) {
				//Ajout et mise à jour des planètes
				var str_old_player = GM_getValue(hostname + ".players." + record[i].player.id, uneval(default_player));
				var player;
				eval("player = " + str_old_player);
				player.status = record[i].player.status;
				var coords = ngalaxy + ":" + nsystem + ":" + i;
				var index = player.planets.length;
				var j = 0;
				while (j < index) {
					if (player.planets[j][0] == coords) { index = j; }
					j++;
				}
				if (!player.planets[index]) { player.planets[index] = new Array(); }
				player.planets[index][0] = coords;
				player.planets[index][1] = record[i].planet.name;
				player.planets[index][2] = record[i].moon.size;
				var str_player = uneval(player);
				if (str_player != str_old_player) { GM_setValue(hostname + ".players." + record[i].player.id, str_player); }
			}
		}));
	}
	
	if (document.location.href.indexOf("page=search") != -1) {
		var session = window.location.href.replace(/^.*session=([^&]*).*$/,"$1");
		
		// fonction format sur http://www.toutjavascript.com
		function format(valeur,decimal,separateur) {
		// formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
			var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
			var val=Math.floor(Math.abs(valeur));
			if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
			var val_format=val+"";
			var nb=val_format.length;
			for (var i=1;i<4;i++) {
				if (val>=Math.pow(10,(3*i))) {
					val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
				}
			}
			if (decimal>0) {
				var decim=""; 
				for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
				deci=decim+deci.toString();
				val_format=val_format+"."+deci;
			}
			if (parseFloat(valeur)<0) {val_format="-"+val_format;}
			return val_format;
		}
		
		function sort_planets(a,b) {
			/(\d*):(\d*):(\d*)/.exec(a[0]);
			var galaxy1 = parseInt(RegExp.$1);
			var system1 = parseInt(RegExp.$2);
			var planet1 = parseInt(RegExp.$3);
			/(\d*):(\d*):(\d*)/.exec(b[0]);
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
		
		unsafeWindow.$("#ajaxContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
			if (settings.url.indexOf("page=search") == -1) return;
			var method = settings.data.replace(/^.*method=([\d-]*).*$/,"$1");
			if (method != "2") return;

			var ajaxContent = document.getElementById("ajaxContent");
			var table = ajaxContent.getElementsByTagName("table")[0];
			ajaxContent.style.overflow = "auto";
			var rows = table.getElementsByTagName("tr");
			for (var i = 1; i < rows.length; i++) {
				var cells = rows[i].getElementsByTagName("td");
				if (!cells[6]) continue;
				var player_id;
				var link = cells[6].getElementsByTagName("a")[0];
				if (!link) {
					player_id = 0;
				} else {
					/to=(\d*)/.exec(link.getAttribute("onclick"));
					player_id = parseInt(RegExp.$1);
				}
				var player;
				eval("player = " + GM_getValue(hostname + ".players." + player_id, uneval(default_player)));
				if (player.status != "") { cells[1].innerHTML += " (" + player.status + ")"; }
				var coords = cells[4].getElementsByTagName("a")[0].innerHTML.replace(/[^:\d]/g,'');
				
				//Ajout de la planète mère à la liste des planètes
				var index = player.planets.length;
				var j = 0;
				while (j < index) {
					if (player.planets[j][0] == coords) { index = j; }
					j++;
				}
				if (!player.planets[index]) { player.planets[index] = new Array(); }
				player.planets[index][0] = coords;
				player.planets[index][1] = cells[3].innerHTML;
				
				//Tri des planètes par ordre croissant des coordonnées
				player.planets.sort(sort_planets);
				
				cells[3].innerHTML = "";
				cells[4].innerHTML = "";
				for (var j = 0; j < player.planets.length; j++) {
					/(\d*):(\d*):(\d*)/.exec(player.planets[j][0]);
					var galaxy = RegExp.$1;
					var system = RegExp.$2;
					var planet = RegExp.$3;
					cells[3].innerHTML += (player.planets[j][0]==coords?"<span style='color:#55788F;'>":"") + player.planets[j][1] + (player.planets[j][0]==coords?"</span>":"") + "<br />";
					cells[4].innerHTML += "<a target='_parent' href='index.php?page=galaxy&no_header=1&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&session=" + session + "'>" + (player.planets[j][0]==coords?"<span style='color:#55788F;'>":"") + "[" + player.planets[j][0] + "]" + (player.planets[j][0]==coords?"</span>":"") + "</a>";
					if (player.planets[j][2] > 0) { cells[4].innerHTML += " <a href='#' title='Size: " + format(player.planets[j][2], 0, '.') + "'>M</a>"; }
					cells[4].innerHTML += "<br />";
				}
			}
		}));
	}
})();