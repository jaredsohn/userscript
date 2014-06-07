// ==UserScript==
// @name           HIP Extended
// @author         Antoine Verney (@lebartok)
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @namespace      http://mediatheque.mairie-saintnazaire.fr/
// @description    Script permettant l'enrichissement du catalogue de la Médiathèque de Saint-Nazaire (HIP4+)
// @include        http://mediatheque.mairie-saintnazaire.fr/*
// ==/UserScript==

/*
Note : ce script est largement inspiré de "Sudoc plus" (http://userscripts.org/scripts/review/60741) réalisé par Sylvain Machefert (@symac)
*/

permalink();
notice_plus();

//----------------------------------------------------------
// Ajout d'un permalien + boutons de partage
//----------------------------------------------------------
function permalink() {
	var link = document.getElementsByTagName("input")[64].value;
	link = link.replace(" ", "");
	link = link.replace(new RegExp(".awdid=.","i"), '');
	link = link.replace(new RegExp("[a-z]+","g"), '');
	
	var full_link = 'http://mediatheque.mairie-saintnazaire.fr/uPortal/Initialize?uP_reload_layout=true&uP_tparam=props&uP_sparam=activeTab&activeTab=2&showBrief=true&link=full' + link + '&currentPosition=0&searchTargetId=16';
	
	if ((link != "<Péé")&&(link != "")&&(link != "MOTSCLES")) {
		// Affichage Permalien
		newtd = document.createElement("td");
		newtd.id = 'permalien';
		newtd.innerHTML = '&nbsp;&nbsp;<img src="http://antoinev.alwaysdata.net/link.png"/> <a target="_blank" href="' +full_link+'">Permalien</a><br /><br />';
		document.getElementsByTagName("table")[19].appendChild(newtd);
		}
}

//----------------------------------------------------------
// Enrichissement des notices bib (couverture, renvois)
//----------------------------------------------------------
function notice_plus() {
	var serveur='http://antoinev.alwaysdata.net/cover.php?action=couv&isbn=';
	var isbn = document.getElementsByTagName("table")[21].rows[3].cells[1].textContent;
	isbn = isbn.replace(new RegExp("[^(0-9X)]", "g"), '');
	isbn = isbn.replace("()", "");
		
	GM_xmlhttpRequest({
	method: 'GET',
	url: serveur+isbn,
	onload: function(responseDetails) {
	if (responseDetails.responseText != "") {
	    var cover = responseDetails.responseText;
				
				// Affichage de la couverture Amazon
				if (cover != "") {
					newtd = document.createElement("td");
					newtd.id = 'couv';
					newtd.style.padding = '0px 70px 0px 30px';
					newtd.style.font = 'large';
					newtd.innerHTML = '<center><br /><br /><img border="0" style="box-shadow: 0.5px 0.5px 1px 0.5px;" src="' + cover + '"/><br/><p style="padding-top:2px; margin:0; font-size:0.7em;">source: <a target="_blank" href="http://www.amazon.fr">Amazon</a></p></center>';
					document.getElementsByTagName("table")[19].rows[0].appendChild(newtd);
				}
			
				// Affichage des renvois Google livres, Librarything, Sudoc
				newtd = document.createElement("td");
				newtd.id = 'renvois';
				newtd.innerHTML = '<br /><p>&nbsp;&nbsp;Rechercher ce document sur : <a target="_blank" href="http://www.sudoc.abes.fr/DB=2.1/CMD?ACT=SRCHA&IKT=7&SRT=RLV&TRM=' + isbn + '"><img border="0" align="absmiddle" src="http://antoinev.alwaysdata.net//logo_sudoc.png"/></a>&nbsp;&nbsp;<a target="_blank" href="http://books.google.com/books?vid=ISBN' + isbn + '"><img border="0" align="texttop" src="http://antoinev.alwaysdata.net//logo_books.png"/></a></p>';
				document.getElementsByTagName("table")[20].appendChild(newtd);
				
			
    	}	
	}
	});
	
}

//----------------------------------------------------------
// Gestion des versions du script
//----------------------------------------------------------
var SUC_script_num = 94622; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('Une nouvelle version du script "'+script_name+'." est disponible\nVoulez-vous l\'installer maintenant (conseillé) ?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

updateCheck(0);