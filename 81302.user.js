// ==UserScript==
// @name OGame Redesign : Perfect Plunder Modded by Omega
// @namespace OGame Redesign : Perfect Plunder modifié et améliorée par Omega
// @description OGame : Affiche le nombre de Petits Transporteurs ou de Grands Transporteurs qui sont nécessaire pour obtenir la moitié des ressources de la planète/lune espionnée...
// @version 1.71
// @creator Black Cat & Omega
// @include http://*.ogame.*/game/index.php?page=*
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=messages*
// @include http://*.ogame.*/game/index.php?page=alliance*
// @exclude
// @require http://sizzlemctwizzle.com/updater.php?id=81302&days=1
// ==/UserScript==

(function(){
        var lang_script = "fr";
	var str_title = "Transporteurs Nécessaires";
	var str_small_cargo = "Petits Transporteur";
	var str_large_cargo = "Grands Transporteur";
	var str_small_cargo_max = "Capacités Petits Transporteur";
	var str_large_cargo_max = "Capacités Grands Transporteur";
	var str_title_res = "Approximation des Ressources Récupérables";
	var str_title_max = "Capacités de frets des transporteurs";
	var str_res_metal = "Métal";
	var str_res_crystal = "Cristal";
	var str_res_deuterium = "Deutérium";
	var str_res_total = "Total";
	var str_inf_pt = "Petits Transporteurs|Nombre de Petits Transporteurs nécessaires pour récupérér la totalité du butin";
	var str_inf_gt = "Grands Transporteurs|Nombre de Grands Transporteurs nécessaires pour récupérér la totalité du butin";
	var str_inf_pt_max = "|Capacité maximum de transports pour le nombre de Petits Transporteurs indiquée";
	var str_inf_gt_max = "|Capacité maximum de transports pour le nombre de Grands Transporteurs indiquée";
	var str_inf_total = "Total|Nombre total des ressources récupérables";
	var str_inf_metal = "Métal|Nombre total de métal récupérable";
	var str_inf_crystal = "Cristal|Nombre total de cristal récupérable";
	var str_inf_deuterium = "Deutérium|Nombre total de deutérium récupérable";
	var str_inf_effacer = "Effacer|Effacer ce rapport de combat";
	var str_inf_forum = "Forum|Accéder au forum des Alliances Unies";
	var str_inf_news = "News|Afficher les dernières News des Alliances Unies";
	var str_name_effacer = "Effacer"
	var str_name_forum = "Forum"
	var str_title_info = "Informations diverses";
	var str_version_title = "Version";
	var str_version = "1.71 Final";
	var str_inf_version = "Version|Version du script installée... Pensez a vérifier les mises a jours régulièrement ;)";
	var str_auteur_title = "Auteur";
	var str_auteur = "Omega";
	var str_inf_auteur = "Auteur|Personne ayant réalisée le script ;)";
	

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

	function showPlunder(content) {
		if (!document.getElementById(content)) return;

		var tables = document.getElementById(content).getElementsByTagName("table");
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
				pl_r2c1.className = "tipsTitle action";
				pl_r2c1.title = str_inf_pt;
				pl_r2.appendChild(pl_r2c1);
				var pl_r2c2 = document.createElement("td");
				pl_r2c2.innerHTML = format(small_cargos, 0, '.');
				pl_r2c2.className = "value";
				pl_r2.appendChild(pl_r2c2);
				var pl_r2c3 = document.createElement("td");
				pl_r2c3.innerHTML = str_large_cargo;
				pl_r2c3.className = "tipsTitle action";
				pl_r2c3.title = str_inf_gt;
				pl_r2.appendChild(pl_r2c3);
				var pl_r2c4 = document.createElement("td");
				pl_r2c4.innerHTML = format(large_cargos, 0, '.');
				pl_r2c4.className = "value";
				pl_r2.appendChild(pl_r2c4);
				pl_tbody.appendChild(pl_r2);
				//Ajout
				var pl_r2tit = document.createElement("tr");
				var pl_r2titc1 = document.createElement("th");
				pl_r2titc1.innerHTML = str_title_max;
				pl_r2titc1.className = "area";
				pl_r2titc1.colSpan = "6";
				pl_r2tit.appendChild(pl_r2titc1);
				pl_tbody.appendChild(pl_r2tit);
				var pl_r2max = document.createElement("tr");
				var pl_r2maxc1 = document.createElement("td");
				pl_r2maxc1.innerHTML = str_small_cargo_max;
				pl_r2maxc1.className = "tipsTitle action";
				pl_r2maxc1.title = format(Math.floor(metal/2) + Math.floor(crystal/2) + Math.floor(deuterium/2), 0, '.') + "/" + format(small_cargos*5000, 0, '.') + str_inf_pt_max;
				pl_r2max.appendChild(pl_r2maxc1);
				var pl_r2maxc2 = document.createElement("td");
				pl_r2maxc2.innerHTML = format(small_cargos*5000, 0, '.');
				pl_r2maxc2.className = "value";
				pl_r2max.appendChild(pl_r2maxc2);
				var pl_r2maxc3 = document.createElement("td");
				pl_r2maxc3.innerHTML = str_large_cargo_max;
				pl_r2maxc3.className = "tipsTitle action";
				pl_r2maxc3.title = format(Math.floor(metal/2) + Math.floor(crystal/2) + Math.floor(deuterium/2), 0, '.') + "/" + format(large_cargos*25000, 0, '.') + str_inf_gt_max;
				pl_r2max.appendChild(pl_r2maxc3);
				var pl_r2maxc4 = document.createElement("td");
				pl_r2maxc4.innerHTML = format(large_cargos*25000, 0, '.');
				pl_r2maxc4.className = "value";
				pl_r2max.appendChild(pl_r2maxc4);
				pl_tbody.appendChild(pl_r2max);
				var pl_r3 = document.createElement("tr");
				var pl_r3c1 = document.createElement("th");
				pl_r3c1.innerHTML = str_title_res;
				pl_r3c1.className = "area";
				pl_r3c1.colSpan = "6";
				pl_r3.appendChild(pl_r3c1);
				pl_tbody.appendChild(pl_r3);
				var pl_r4 = document.createElement("tr");
				var pl_r4c1 = document.createElement("td");
				pl_r4c1.innerHTML = str_res_metal;
				pl_r4c1.className = "tipsTitle action";
				pl_r4c1.title = str_inf_metal;
				pl_r4.appendChild(pl_r4c1);
				var pl_r4c2 = document.createElement("td");
				pl_r4c2.innerHTML = format(Math.floor(metal/2), 0, '.');
				if (metal/2 > 2500000 && metal/2 < 5000000)
				{
					pl_r4c2.setAttribute("style","color:#FFFF00;font-weight:bold;");
				}
				else if (metal/2 == 0)
				{
					pl_r4c2.setAttribute("style","color:#848484;font-weight:bold;");
				}
				else if (metal/2 > 5000000)
				{
					pl_r4c2.setAttribute("style","color:#FF0000;font-weight:bold;");
				}
				else
				{
					pl_r4c2.setAttribute("style","color:#00FF00;font-weight:bold;");
				}
				pl_r4c2.className = "value";
				pl_r4.appendChild(pl_r4c2);
				pl_tbody.appendChild(pl_r4);
				var pl_r4c3 = document.createElement("td");
				pl_r4c3.innerHTML = str_res_crystal;
				pl_r4c3.className = "tipsTitle action";
				pl_r4c3.title = str_inf_crystal;
				pl_r4.appendChild(pl_r4c3);
				var pl_r4c4 = document.createElement("td");
				pl_r4c4.innerHTML = format(Math.floor(crystal/2), 0, '.');
				if (crystal/2 > 2500000 && crystal/2 < 5000000)
				{
					pl_r4c4.setAttribute("style","color:#FFFF00;font-weight:bold;");
				}
				else if (crystal/2 == 0)
				{
					pl_r4c4.setAttribute("style","color:#848484;font-weight:bold;");
				}
				else if (crystal/2 > 5000000)
				{
					pl_r4c4.setAttribute("style","color:#FF0000;font-weight:bold;");
				}
				else
				{
					pl_r4c4.setAttribute("style","color:#00FF00;font-weight:bold;");
				}
				pl_r4c4.className = "value";
				pl_r4.appendChild(pl_r4c4);
				pl_tbody.appendChild(pl_r4);
				var pl_r5 = document.createElement("tr");
				var pl_r5c1 = document.createElement("td");
				pl_r5c1.innerHTML = str_res_deuterium;
				pl_r5c1.className = "tipsTitle action";
				pl_r5c1.title = str_inf_deuterium;
				pl_r5.appendChild(pl_r5c1);
				var pl_r5c2 = document.createElement("td");
				pl_r5c2.innerHTML = format(Math.floor(deuterium/2), 0, '.');
				if (deuterium/2 > 2500000 && deuterium/2 < 5000000)
				{
					pl_r5c2.setAttribute("style","color:#FFFF00;font-weight:bold;");
				}
				else if (deuterium/2 == 0)
				{
					pl_r5c2.setAttribute("style","color:#848484;font-weight:bold;");
				}
				else if (deuterium/2 > 5000000)
				{
					pl_r5c2.setAttribute("style","color:#FF0000;font-weight:bold;");
				}
				else
				{
					pl_r5c2.setAttribute("style","color:#00FF00;font-weight:bold;");
				}
				pl_r5c2.className = "value";
				pl_r5.appendChild(pl_r5c2);
				var pl_r5c3 = document.createElement("td");
				pl_r5c3.innerHTML = str_res_total;
				pl_r5c3.className = "tipsTitle action";
				pl_r5c3.title = str_inf_total;
				pl_r5.appendChild(pl_r5c3);
				var pl_r5c4 = document.createElement("td");
				pl_r5c4.innerHTML = format(Math.floor(pl_resources), 0, '.');
				if ((metal/2) + (crystal/2) + (deuterium/2) > 2500000 && (metal/2) + (crystal/2) + (deuterium/2) < 5000000)
				{
					pl_r5c4.setAttribute("style","color:#FFFF00;font-weight:bold;");
				}
				else if ((metal/2) + (crystal/2) + (deuterium/2) == 0)
				{
					pl_r5c4.setAttribute("style","color:#848484;font-weight:bold;");
				}
				else if ((metal/2) + (crystal/2) + (deuterium/2) > 5000000)
				{
					pl_r5c4.setAttribute("style","color:#FF0000;font-weight:bold;");
				}
				else
				{
					pl_r5c4.setAttribute("style","color:#00FF00;font-weight:bold;");
				}
				pl_r5c4.className = "value";
				pl_r5.appendChild(pl_r5c4);
				pl_tbody.appendChild(pl_r5);
				var pl_r6 = document.createElement("ul");
				pl_r6.className = "area";
				var pl_r6c1 = document.createElement("li");
				pl_r6c1.innerHTML = str_name_effacer;
				pl_r6c1.className = "tipsTitle action";
				pl_r6c1.id = "2";
				pl_r6c1.href = "#";
				pl_r6c1.title = str_inf_effacer;
				pl_r6.appendChild(pl_r6c1);
				pl_tbody.appendChild(pl_r6);
				var pl_r7 = document.createElement("tr");
				var pl_r7c1 = document.createElement("th");
				pl_r7c1.innerHTML = str_title_info;
				pl_r7c1.className = "area";
				pl_r7c1.colSpan = "6";
				pl_r7.appendChild(pl_r7c1);
				pl_tbody.appendChild(pl_r7);
				var pl_r8 = document.createElement("tr");
				var pl_r8c1 = document.createElement("td");
				pl_r8c1.innerHTML = str_version_title;
				pl_r8c1.className = "tipsTitle action";
				pl_r8c1.title = str_inf_version;
				pl_r8.appendChild(pl_r8c1);
				var pl_r8c2 = document.createElement("td");
				pl_r8c2.innerHTML = str_version;
				pl_r8c2.className = "value";
				pl_r8.appendChild(pl_r8c2);
				var pl_r8c3 = document.createElement("td");
				pl_r8c3.innerHTML = str_auteur_title;
				pl_r8c3.className = "tipsTitle action";
				pl_r8c3.title = str_inf_auteur;
				pl_r8.appendChild(pl_r8c3);
				var pl_r8c4 = document.createElement("td");
				pl_r8c4.innerHTML = str_auteur;
				pl_r8c4.className = "value";
				pl_r8.appendChild(pl_r8c4);
				pl_tbody.appendChild(pl_r8);
				//Fin
				parts[0].parentNode.insertBefore(pl_table, parts[parts.length-1]);
			}
		}
	}

	if (document.location.href.indexOf("page=showmessage") != -1) {
		showPlunder("messagebox");

	} else {
		var $;
		try { $ = unsafeWindow.$; }
		catch(e) { $ = window.$; }
		$(".mailWrapper").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=messages") == -1) return;
			if (settings.data.indexOf("displayPage") == -1) return;

			//var cat = settings.data.replace(/^.*displayCategory=([\d-]*).*$/,"$1");
			showPlunder("messageContent");
		});
	}
})();