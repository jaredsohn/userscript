// ==UserScript==
// @name           terkepek a mo.hu oldalra
// @include        https://*magyarorszag.hu/*
// @version			1.0.1
// ==/UserScript==

//maps az intezmenyekbe
if (typeof(document.getElementsByClassName("infoText2")[0]) != 'undefined') {

	if (document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.search("<br>") != '-1') {
		var int_cim = document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.substr(document.getElementsByClassName("infoText2")[0].	getElementsByTagName("span")[0].innerHTML.search("<br>")+4, document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.search("</strong>")-document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.search("<br>")-4);
		
		var gmap = document.createElement("img");
		gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+int_cim+'&zoom=15&size=224x224&markers=color:blue|'+int_cim+'&sensor=false';
		gmap.alt = int_cim;
		document.getElementsByClassName("infoText2")[0].appendChild(gmap);
		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		gmap.addEventListener("click", goGmap, false);
	} 
		
}

//maps a hivatalkeresobe
if (document.getElementById("fld1a") != null) {
  if (document.getElementById("fld1a").name == 'instituteId' && document.getElementsByClassName("list")[0] != null) {
	var lista = document.getElementsByClassName("list")[0].getElementsByTagName("li");
	for (var i=0; i<lista.length; i++) {
		var hkereso_cim = lista[i].getElementsByTagName("p")[0].getElementsByTagName("strong")[0].textContent;

		var hkereso_gmap = document.createElement("img");
		hkereso_gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+hkereso_cim+'&zoom=15&size=424x224&markers=color:blue|'+hkereso_cim+'&sensor=false';
		hkereso_gmap.alt = hkereso_cim;
		lista[i].getElementsByTagName("p")[0].appendChild(hkereso_gmap);
		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		hkereso_gmap.addEventListener("click", goGmap, false);
	}
  }	
}

//maps a bal oldali hivatakeresobe
if (document.getElementById("frmOfficeSearch") != null) {
  if (typeof(document.getElementById("frmOfficeSearch").getElementsByClassName("infoText")[0]) != "undefined") {
	var hivatallista = document.getElementById("frmOfficeSearch").getElementsByClassName("infoText");
	for (var i=0; i<hivatallista.length; i++) {
		var balhivatalkereso_cim = hivatallista[i].innerHTML.split("<br>", 3);
		var balhivatalkereso_cim_gmap = document.createElement("img");
		balhivatalkereso_cim_gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+balhivatalkereso_cim[1]+'&zoom=15&size=224x224&markers=color:blue|'+balhivatalkereso_cim[1]+'&sensor=false';
		balhivatalkereso_cim_gmap.alt = balhivatalkereso_cim[1];
		balhivatalkereso_cim_gmap.class = "gmap";

		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		balhivatalkereso_cim_gmap.addEventListener("click", goGmap, false);
		
		hivatallista[i].appendChild(balhivatalkereso_cim_gmap);		
	}
  }
}