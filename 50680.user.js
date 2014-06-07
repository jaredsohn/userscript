// ==UserScript==
// @name OGame: Perfect Plunder
// @namespace http://userscripts.org/users/36331
// @description OGame: Displays how many small transporters or large transporters needed to raid the planet or moon
// @version 5.4
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?page=messages*
// @require http://userscripts.org/scripts/source/163042.user.js
// @run-at document-end
// ==/UserScript==

var strFunc = (function(){
	var str_title = "Perfect Plunder";
	var str_small_cargo = "Small Transporter";
	var str_large_cargo = "Large Transporter";
	var locData = localStorage.getItem("localization.data");
	if (locData) {
		locData = JSON.parse(locData);
		str_small_cargo = locData.techs["202"];
		str_large_cargo = locData.techs["203"];
	}

	var plunder = function(metal, crystal, deuterium, coeff, capacity) {
		/* 1/ On élimine du calcul la moitiée du métal, cristal et deutérium de la planète
		   2/ On remplit le tiers de la capacité de fret des vaisseaux avec tout le métal disponible
		   3/ Ensuite, on remplit la moitiée de la capacité restante avec le plus de cristal disponible
		   4/ Enfin, on bourre le deut dans ce qu'il reste
		   5/ On remplit la moitiée de la capacité disponible avec le métal
		   6/ On prend tout le cristal restant, dans la limite de la capacité bien sûr */

		var temp;
		var pl_metal = 0;
		var pl_crystal = 0;
		var pl_deuterium = 0;
		var pl_resources;

		// 1
		var rem_metal = Math.floor(metal * coeff);
		var rem_crystal = Math.floor(crystal * coeff);
		var rem_deuterium = Math.floor(deuterium * coeff);

		// 2
		temp = Math.min(Math.ceil(capacity/3), rem_metal);
		pl_metal += temp;
		rem_metal -= temp;
		capacity -= temp;

		// 3
		temp = Math.min(Math.ceil(capacity/2), rem_crystal);
		pl_crystal += temp;
		rem_crystal -= temp;
		capacity -= temp;

		// 4
		temp = Math.min(capacity, rem_deuterium);
		pl_deuterium += temp;
		rem_deuterium -= temp;
		capacity -= temp;

		// 5
		temp = Math.min(Math.ceil(capacity/2), rem_metal);
		pl_metal += temp;
		rem_metal -= temp;
		capacity -= temp;

		// 6
		temp = Math.min(capacity, rem_crystal);
		pl_crystal += temp;
		rem_crystal -= temp;
		capacity -= temp;

		pl_resources = new Array(pl_metal, pl_crystal, pl_deuterium);
		return pl_resources;
	}

	Array.prototype.sum = function() {
		var sum = 0;
		for (var i=0; i<this.length; i++)
			sum += this[i];
		return sum;
	}

	var addDots = function(nb) {
		nb = nb + "";
		while (/\d{4}/.test(nb)) {
			nb = nb.replace(/(\d+)(\d{3})/,"$1.$2");
		}
		return nb;
	}

	var showPlunder = function(tables) {
		for (var i=0; i<tables.length; i++) {
			var spans = tables[i].getElementsByTagName("th")[0].getElementsByTagName("span");
			var status = "";
			var rank = "";
			if (spans.length == 1) {
				status = spans[0].className;
			} else if (spans.length == 2) {
				rank = spans[0].className;
				status = spans[1].className;
			}
			var coeff;
			if (rank.indexOf("rank_bandit") != -1) {
				coeff = 1;
			} else if (status.indexOf("honorableTarget") != -1) {
				coeff = 0.75;
			} else {
				coeff = 0.5;
			}
			var resourcesItems = tables[i].getElementsByClassName("item");
			var metal = resourcesItems[0].nextElementSibling.innerHTML;
			metal = parseInt(metal.replace(/\D/g, ''));
			var crystal = resourcesItems[1].nextElementSibling.innerHTML;
			crystal = parseInt(crystal.replace(/\D/g, ''));
			var deuterium = resourcesItems[2].nextElementSibling.innerHTML;
			deuterium = parseInt(deuterium.replace(/\D/g, ''));
			var pl_resources = Math.floor(metal * coeff) + Math.floor(crystal * coeff) + Math.floor(deuterium * coeff);
			var small_cargos = Math.ceil(pl_resources/5000);
			while (plunder(metal, crystal, deuterium, coeff, small_cargos*5000).sum() < pl_resources)
				small_cargos++;
			var large_cargos = Math.ceil(small_cargos/5);
			var pl_table = document.createElement("table");
			pl_table.cellPadding = "0";
			pl_table.cellSpacing = "0";
			pl_table.className = "fleetdefbuildings spy plunder";
			var pl_tbody = document.createElement("tbody");
			pl_table.appendChild(pl_tbody);
			var pl_r1 = document.createElement("tr");
			var pl_r1c1 = document.createElement("th");
			pl_r1c1.innerHTML = str_title + " " + (coeff * 100) + "%";
			pl_r1c1.className = "area plunder";
			pl_r1c1.colSpan = "4";
			pl_r1.appendChild(pl_r1c1);
			pl_tbody.appendChild(pl_r1);
			var pl_r2 = document.createElement("tr");
			var pl_r2c1 = document.createElement("td");
			pl_r2c1.innerHTML = str_small_cargo;
			pl_r2c1.className = "key plunder";
			pl_r2.appendChild(pl_r2c1);
			var pl_r2c2 = document.createElement("td");
			pl_r2c2.innerHTML = addDots(small_cargos);
			pl_r2c2.className = "value plunder";
			pl_r2.appendChild(pl_r2c2);
			var pl_r2c3 = document.createElement("td");
			pl_r2c3.innerHTML = str_large_cargo;
			pl_r2c3.className = "key plunder";
			pl_r2.appendChild(pl_r2c3);
			var pl_r2c4 = document.createElement("td");
			pl_r2c4.innerHTML = addDots(large_cargos);
			pl_r2c4.className = "value plunder";
			pl_r2.appendChild(pl_r2c4);
			pl_tbody.appendChild(pl_r2);
			tables[i].parentNode.insertBefore(pl_table, tables[i].parentNode.getElementsByClassName("defenseattack")[0]);
		}
	}

	$(document).ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=messages") != -1) {
			if (settings.data.indexOf("displayPage") == -1) return;

			//var cat = settings.data.replace(/^.*displayCategory=([\d-]*).*$/,"$1");
			showPlunder(document.getElementById("messageContent").getElementsByClassName("material spy"));
		}

		if (settings.url.indexOf("page=showmessage") != -1) {
			$(".overlayDiv > .showmessage").each(function(){
				var tables = this.getElementsByClassName("material spy");
				if (tables.length > 0) {
					if ($(this).hasClass("plunder")) return;
					$(this).addClass("plunder");

					showPlunder(tables);
				}
			});
		}
	});
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);

