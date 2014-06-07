// ==UserScript==
// @name OGame Redesign : Robo Perfecto
// @namespace http://userscripts.org/users/36331
// @description OGame : Muestra cuantas naves pequeñas o grandes de carga necesitaras para robar la mitad de lo que hay en el planeta o luna.
// @date 2009-09-01
// @creator Black Cat y traducido por Battousai
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=messages*
// @exclude
// ==/UserScript==

(function(){

	var str_title = "Robo Perfecto";
	var str_small_cargo = "Pequeña de Carga";
	var str_large_cargo = "Grande de Carga";

	function plunder(metal, crystal, deuterium, capacity) {
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

	function showPlunder () {
		var content;
		if (document.location.href.indexOf("=showmessage") != -1) {
			content = document.getElementById("messagebox");
		} else {
			content = document.getElementById("messageContent");
		}
		if (!content) return;

		var tables = content.getElementsByTagName("table");
		if (!tables[0] || tables[0].getAttribute("done50680") == "done") return;
		tables[0].setAttribute("done50680","done");

		for (var i=0; i<tables.length; i++) {
			if (tables[i].className == "material spy") {
				var parts = tables[i].parentNode.getElementsByTagName("table");
				var metal = parts[1].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML;
				metal = parseInt(metal.replace(/\D/g, ''));
				var crystal = parts[1].getElementsByTagName("tr")[0].getElementsByTagName("td")[3].innerHTML;
				crystal = parseInt(crystal.replace(/\D/g, ''));
				var deuterium = parts[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
				deuterium = parseInt(deuterium.replace(/\D/g, ''));
				var pl_resources = Math.floor(metal/2) + Math.floor(crystal/2) + Math.floor(deuterium/2);
				var small_cargos = Math.ceil(pl_resources/5000);
				while (plunder(metal, crystal, deuterium, small_cargos*5000).sum() < pl_resources)
					small_cargos++;
				var large_cargos = Math.ceil(small_cargos/5);
				var pl_table = document.createElement("table");
				pl_table.cellPadding = "0";
				pl_table.cellSpacing = "0";
				pl_table.className = "fleetdefbuildings spy";
				var pl_tbody = document.createElement("tbody");
				pl_table.appendChild(pl_tbody);
				var pl_r1 = document.createElement("tr");
				var pl_r1c1 = document.createElement("th");
				pl_r1c1.innerHTML = str_title;
				pl_r1c1.className = "area";
				pl_r1c1.colSpan = "6";
				pl_r1.appendChild(pl_r1c1);
				pl_tbody.appendChild(pl_r1);
				var pl_r2 = document.createElement("tr");
				var pl_r2c1 = document.createElement("td");
				pl_r2c1.innerHTML = str_small_cargo;
				pl_r2c1.className = "key";
				pl_r2.appendChild(pl_r2c1);
				var pl_r2c2 = document.createElement("td");
				pl_r2c2.innerHTML = format(small_cargos, 0, '.');
				pl_r2c2.className = "value";
				pl_r2.appendChild(pl_r2c2);
				var pl_r2c3 = document.createElement("td");
				pl_r2c3.innerHTML = str_large_cargo;
				pl_r2c3.className = "key";
				pl_r2.appendChild(pl_r2c3);
				var pl_r2c4 = document.createElement("td");
				pl_r2c4.innerHTML = format(large_cargos, 0, '.');
				pl_r2c4.className = "value";
				pl_r2.appendChild(pl_r2c4);
				pl_tbody.appendChild(pl_r2);
				parts[0].parentNode.insertBefore(pl_table, parts[parts.length-1]);
			}
		}
	}
	setInterval(showPlunder,1000);

})();
