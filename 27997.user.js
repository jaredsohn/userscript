// ==UserScript==
// @name OGame : Nombre de transporteurs
// @namespace http://userscripts.org/users/36331
// @description OGame : Affiche le nombre de transporteurs nécessaires pour remplir à moitié les ressources de la planète ou lune.
// @date 2008-05-12
// @creator Black Cat traducted by kobal
// @include http://uni*.ogame.*/game/index.php?page=messages*
// @exclude
// ==/UserScript==

(function(){

	var str_title = "Nombre de transporteurs nécessaires";
	var str_small_cargo = "Petits transporteurs";
	var str_large_cargo = "Grands transporteurs";

	function plunder(metal, crystal, deuterium, capacity) {
		/* 1/ On elimine du calcul la moitié du metal, cristal & deuterium de la planète
		   2/ On remplie le tiers de la capacité de fret des vaisseaux avec tout le metal disponible.
		   3/ Ensuite, on remplie la moitié de la capacité restante avec le plus de cristal disponible.
		   4/ Enfin, on bourre le deut dans ce qui reste.
		   5/ On remplie la moitié de la capacité disponible avec le metal
		   6/ on prend tout le cristal restant, dans la limite de la capacité biensur */

		var temp;
		var pl_metal = 0;
		var pl_crystal = 0;
		var pl_deuterium = 0;
		var pl_resources;

		// 1
		var rem_metal = Math.floor(metal/2);
		var rem_crystal = Math.floor(crystal/2);
		var rem_deuterium = Math.floor(deuterium/2);

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

	var rows = document.getElementById("content").getElementsByTagName("table")[1].getElementsByTagName("tbody")[0].childNodes;
	var isSpyReport = false;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if (row.nodeName.toLowerCase() == "tr") {
			if (isSpyReport) {
				var spyReport = row.getElementsByTagName("td")[1];
				if (spyReport.getElementsByTagName("table").length > 0) {
					var tableResources = spyReport.getElementsByTagName("table")[0];
					var metal = tableResources.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
					metal = parseInt(metal.replace(/\D/g, ''));
					var crystal = tableResources.getElementsByTagName("tr")[1].getElementsByTagName("td")[3].innerHTML;
					crystal = parseInt(crystal.replace(/\D/g, ''));
					var deuterium = tableResources.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
					deuterium = parseInt(deuterium.replace(/\D/g, ''));
					var pl_resources = Math.floor(metal/2) + Math.floor(crystal/2) + Math.floor(deuterium/2);
					var small_cargos = Math.ceil(pl_resources/5000);
					while (plunder(metal, crystal, deuterium, small_cargos*5000).sum() < pl_resources)
						small_cargos++;
					var large_cargos = Math.ceil(small_cargos/5);
					var pl_table = document.createElement("table");
					pl_table.style.width = "400";
					var pl_tbody = document.createElement("tbody");
					pl_table.appendChild(pl_tbody);
					var pl_r1 = document.createElement("tr");
					var pl_r1c1 = document.createElement("td");
					pl_r1c1.innerHTML = str_title;
					pl_r1c1.className = "c";
					pl_r1c1.setAttribute("colSpan","4");
					pl_r1.appendChild(pl_r1c1);
					pl_tbody.appendChild(pl_r1);
					var pl_r2 = document.createElement("tr");
					var pl_r2c1 = document.createElement("td");
					pl_r2c1.innerHTML = str_small_cargo;
					pl_r2.appendChild(pl_r2c1);
					var pl_r2c2 = document.createElement("td");
					pl_r2c2.innerHTML = small_cargos;
					pl_r2.appendChild(pl_r2c2);
					var pl_r2c3 = document.createElement("td");
					pl_r2c3.innerHTML = str_large_cargo;
					pl_r2.appendChild(pl_r2c3);
					var pl_r2c4 = document.createElement("td");
					pl_r2c4.innerHTML = large_cargos;
					pl_r2.appendChild(pl_r2c4);
					pl_tbody.appendChild(pl_r2);
					var nb_table = spyReport.getElementsByTagName("table").length;
					spyReport.insertBefore(pl_table, spyReport.getElementsByTagName("table")[nb_table-1].nextSibling);
				}
				isSpyReport = false;
			} else {
				if (row.getElementsByTagName("span")[0] && row.getElementsByTagName("span")[0].className == "espionagereport")
					isSpyReport = true;
			}
		}
	}
})();
