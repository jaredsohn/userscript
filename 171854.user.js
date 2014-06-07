// ==UserScript==
// @name        Reporting vGates sur Userscript
// @namespace   Reporting vGates sur Userscript
// @updateURL   https://userscripts.org/scripts/source/171854.meta.js
// @downloadURL https://userscripts.org/scripts/source/171854.user.js
// @include     http://10.92.252.131:8080/reporting/supstat/sites_cpe.php*
// @version     1
// ==/UserScript==

var GM_serveur='intranetstc.prod.ld:8113';
var GM_dossier='http://'+GM_serveur+'/macro/';

MakeCpeLink();

function MakeCpeLink() {

	$("table#tab-resultat tbody tr").each(function(){
		var TD_IP = $(this).find("td:eq(8)");
		var IP = TD_IP.text();
		var Offre = $(this).find("td:eq(3)").text();
		var CPE_Modele = $(this).find("td:eq(10)").text();
		var Nom_Client = $(this).find("td:eq(5)").text();

		$(this).find("td:eq(8)").replaceWith("<td><a></a></td>");


		var MonHREF = $(this).find("td:eq(8) a");
		MonHREF.text(IP);
		MonHREF.attr("id", "vGates");
		MonHREF.attr("target", "_blank");
		MonHREF.attr("href", GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+IP+'&typeCPE='+CPE_Modele+'&typeOffre='+encodeURIComponent(Offre)+'&NomClient='+encodeURIComponent(Nom_Client));

	});
}