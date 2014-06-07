// ==UserScript==
// @name OGame : GEREKLI NAKLIYE
// @namespace http://userscripts.org/users/36331
// @description OGame : GEZEGENDEN TUM MADENI KALDIRMAK ICIN GEREKEN NAKLIYE GEMILERI
// @date 2008-01-05
// @creator Black Cat edit:doominsert
// @include http://uni*.ogame.*/game/index.php?page=flotten1*
// @exclude
// ==/UserScript==

(function(){

	var tab_resources = document.getElementById("resources").getElementsByTagName("tbody")[0];
	var elements = tab_resources.getElementsByTagName("tr")[2];
	
	var metal = elements.getElementsByTagName("td")[0].getElementsByTagName("font")[0].innerHTML;
	metal = parseInt(metal.replace(/\D/g, ''));

	var cristal = elements.getElementsByTagName("td")[1].getElementsByTagName("font")[0].innerHTML;
	cristal = parseInt(cristal.replace(/\D/g, ''));

	var deuterium = elements.getElementsByTagName("td")[2].getElementsByTagName("font")[0].innerHTML;
	deuterium = parseInt(deuterium.replace(/\D/g, ''));
	
	var total = metal + cristal + deuterium;
	
	//=============================================================
	// Put/Write the number of Small Cargo or Large Cargo necessary
	//=============================================================
	var row = document.createElement("tr");
	row.className = "header";
	var cell = document.createElement("td");
	cell.setAttribute("colSpan","5");
	cell.setAttribute("align","left");
	cell.className = "header";
	tab_resources.appendChild(row);
	row.appendChild(cell);
	cell.innerHTML = "<b><font color='red'>"+parseInt(Math.ceil(total/5000))+" Kucuk Nakliye VEYA "+parseInt(Math.ceil(total/25000))+" Buyuk nakliye</font></b>";

})();
