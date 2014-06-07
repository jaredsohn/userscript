// ==UserScript==
// @name Ogame : Cargos necessary
// @author Black Cat
// @description Ogame : Number of cargos necessary to transport all resources
// @include http://*/game/index.php?page=flotten1*
// @exclude	
// ==/UserScript==

(function(){

	var tab_resources = document.getElementById("resources").getElementsByTagName("tbody")[0];
	var elements = tab_resources.getElementsByTagName("tr")[2];
	
	var metal = elements.getElementsByTagName("td")[0].getElementsByTagName("font")[0].textContent;
	metal = parseInt(metal.replace(/\D/g, ''));

	var cristal = elements.getElementsByTagName("td")[1].getElementsByTagName("font")[0].textContent;
	cristal = parseInt(cristal.replace(/\D/g, ''));

	var deuterium = elements.getElementsByTagName("td")[2].getElementsByTagName("font")[0].textContent;
	deuterium = parseInt(deuterium.replace(/\D/g, ''));
	
	var total = metal + cristal + deuterium;
	
	//=============================================================
	// Put/Write the number of Small Cargo or Large Cargo necessary
	//=============================================================
	tab_resources.innerHTML += "<tr class='header'><td colspan=4 align='center' class='header'><b><font color='red'>"+parseInt(Math.ceil(total/5000))+" Petit transporteur / "+parseInt(Math.ceil(total/25000))+" Grand transporteur</font></b></td></tr>";

})();