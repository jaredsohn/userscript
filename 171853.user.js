// ==UserScript==
// @name        	RefCPE vGates sur Userscript
// @namespace   	RefCPE vGates sur Userscript
// @updateURL           https://userscripts.org/scripts/source/171853.meta.js
// @downloadURL         https://userscripts.org/scripts/source/171853.user.js
// @include     	http://refcpe-prod.private.sfr.com:7190/cpe/recherche
// @include     	http://refcpe-prod.private.sfr.com:7190/interface/show/*

// @version     	1
// ==/UserScript==

// alert(jQuery(document).jquery);

var GM_serveur='intranetstc.prod.ld:8113';
var GM_dossier='http://'+GM_serveur+'/macro/';

var first = true;

setInterval(WaitRechercheCPE,500);

function WaitRechercheCPE() {

	if ( $("table#resultat").size() == 0 ) return;
  	else if (first){
    	first = false;
		MakeCpeLink();
	}
	else if ($("a#vGates").size() == 0){
		MakeCpeLink();
	}
}


function MakeCpeLink() {

	$("tbody[role='alert'] tr").each(function(){
		var TD_IP = $(this).find("td:eq(8)");
		var IP = TD_IP.text();
		var Offre = $(this).find("td:eq(5)").text();
		var CPE_Modele = $(this).find("td:eq(9)").text();
		var Nom_Client = $(this).find("td:eq(2)").text();

		$(this).find("td:eq(8) div").replaceWith("<a></a>");

		var MonHREF = $(this).find("td:eq(8) a");
		MonHREF.text(IP);
		MonHREF.attr("id", "vGates");
		MonHREF.attr("target", "_blank");
		MonHREF.attr("href", GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+IP+'&typeCPE='+CPE_Modele+'&typeOffre='+encodeURIComponent(Offre)+'&NomClient='+encodeURIComponent(Nom_Client));

	});
}