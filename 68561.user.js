// Auto-Cartographie Origins-return
// Cree le 02/02/2010
// Auteur : Sphera
// License: GNU General Public License
//
// --------------------------------------------------------------------
//
// Ceci est un user script Greasemonkey.
//
// Pour l'utiliser vous devez intallez Greasemonkey disponible ici http://www.greasespot.net/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Auto-Cartographie Origins-return
// @description	Ce script permet de creer une carte des univers. Attention il ne fonctionne qu'avec les univers v3
// @version 1.0
// @include	http://uni*.origins-return.fr/index.php?page=salleDeControle
// ==/UserScript==

var galaxie_active = 1;
var systeme_actif = 1;
var nombre_systemes=3000;
var nombre_galaxies=5;
var pourcentage = 0;
var pourcentmax = 100;
var attente = 0;
var version = '1.0.0';

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}

function affiche(tableau){
	document.getElementById("pub").innerHTML = "<TABLE bgcolor=\"#FFFFFF\"><TR><TD ALIGN=center ><A HREF=# OnClick=\"history.go(0)\" >Fermer</A><table border=1 style=\" color: #000;\">"+tableau+"</table></TD></TR></TABLE>"; 
}

function defilPourcent() {
	if(pourcentage <= pourcentmax && galaxie_active<=nombre_galaxies) {
		pourcentage=systeme_actif*(100/nombre_systemes);
		$('progresscarte').style.width = pourcentage+'%';
		$('progresscarte').innerHTML = pourcentage+'%';
                if(systeme_actif==nombre_systemes)
                {
					if(galaxie_active==nombre_galaxies)
						{
							stopCarte();
						}
					else
						{
							galaxie_active++;
							systeme_actif=1;
							setTimeout(getSysteme,500);
						}				
				
                }
				else
				{
					systeme_actif++;
					setTimeout(getSysteme,500);
				}
		

	} else {
		stopCarte();
	}
}

function $(element) {
	return document.getElementById(element);
}

function startCarte() {
	$('linkStartCarte').style.display = 'none';
	$('onprogresscarte').style.display = 'block';
	$('stockage').style.display='none';
	getSysteme();
}

function stopCarte() {
	$('cdcarte-status').innerHTML = 'Status: Carte créée (<span id="cdprod-reset" class="link" style="cursor: pointer;">Reset</span>)';
	pourcentage = 100;
	$('progresscarte').style.width = pourcentage+'%';
	$('progresscarte').innerHTML = pourcentage+'%';
	affiche($('stockage').innerHTML);
	$('cdprod-reset').addEventListener('click', resetCarte, false);
}

function resetCarte() {
	pourcentage = 0;
	$('progresscarte').style.width = '0%';
	$('progresscarte').innerHTML = '0%';
	$('cdcarte-status').innerHTML = '';
	$('stockage').innerHTML = '';
	$('linkStartCarte').style.display = 'block';
	$('onprogresscarte').style.display = 'none';
}

function saveSysteme(infos_systeme) {
	var code='<tr><td colspan="7" align="center">---</td></tr>';
	for(var i=0;i<infos_systeme.planete.length;i++)
	{

	code=code+'<tr><td>'+infos_systeme.planete[i].galaxie+'</td><td>'+infos_systeme.planete[i].systeme+'</td><td>'+infos_systeme.planete[i].position+'</td><td>'+infos_systeme.planete[i].nomplanete+'</td><td>'+infos_systeme.planete[i].joueur+'</td><td>'+infos_systeme.planete[i].alliance+'</td><td>'+infos_systeme.planete[i].etat+'</td></tr>';
	}
	$('stockage').innerHTML=$('stockage').innerHTML+code;
}

function getSysteme() {

	var systeme={planete:[]};
	$('cdcarte-status').innerHTML = 'Status: R&eacute;cup&eacute;ration du systeme n°'+systeme_actif;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {

					$('traitement').innerHTML=xhr.responseText;
					var traitement=$('traitement');
					var lignes=traitement.getElementsByTagName('tr');
					for(var i=0;i<lignes.length;i++)
					{
					var colonnes=getElementsByAttribute(lignes[i],'td', 'align', 'center' );
						if(colonnes.length==5 && colonnes[0].innerHTML!='Pos')
						{	
							var span=colonnes[4].getElementsByTagName('span');
							var etat=(span.length>1)?span[1].innerHTML:'';
							var alliance=span[0].innerHTML;
							var regex=/pseudo=(.+)/;
							var nom=regex.exec(colonnes[4].getElementsByClassName('link')[0].href)[1];	
							systeme.planete[systeme.planete.length]={'galaxie':galaxie_active,'systeme':systeme_actif,'position':colonnes[0].innerHTML,'alliance':alliance,'joueur':nom,'nomplanete':colonnes[3].innerHTML,'etat':etat};
						}
					}
					saveSysteme(systeme);
					
					defilPourcent();
					
				} else {
					$('cdcarte-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdcarte-status').innerHTML = 'La fonction getSysteme a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=Capteurs&nores=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('contenu=contenusr&affichageAJAX=Capteurs&galaxie='+galaxie_active+'&systeme='+systeme_actif+'&boutton=oui&submit=Afficher');

}


function load() {

	var element = document.createElement('tr');
	var element2 = document.createElement('td');
	element2.innerHTML = '<br />';
	element.appendChild(element2);

	var element3 = document.createElement('tr');
	element3.className = 'tabligne2';
	var element4 = document.createElement('td');
	element4.align = 'center';
	element4.className = 'Categorie';
	element4.innerHTML = '<b>Cartographie de l\'univers</b>';
	element3.appendChild(element4);

	var element5 = document.createElement('tr');
	element5.className = 'tabligne1';
	var element6 = document.createElement('td');
	element6.style.padding = '3px';
	element6.style.textAlign = 'center';
	element6.innerHTML = '<span class="link" style="cursor: pointer;" id="linkStartCarte">Lancer la création de la carte</span>'+
						 '<div id="onprogresscarte" style="display: none;">Calcul en cours, merci de rester sur cette page<div id="progresscarte-container"><div style="width: 0%" id="progresscarte">0%</div></div><span id="cdcarte-status" style="font-size: 11px;"></span></div><div id="traitement" style="display: none;">blabla</div><table id="stockage" border="1"></table><DIV ID=pub STYLE="position:absolute;top:0;left:0;z-index:10"></DIV>';
	element5.appendChild(element6);

	var annonce = document.getElementsByTagName('td');
	for (var i = 0; i < annonce.length; i++) {
		if(annonce[i].className == 'Categorie' && annonce[i].innerHTML.search('<b>Annonce ') != -1) {
			annonce[i].parentNode.parentNode.insertBefore(element, annonce[i].parentNode);
			element.parentNode.insertBefore(element3, element);
			element3.parentNode.insertBefore(element5, element);
			break;
		}
	}
	$('linkStartCarte').addEventListener('click', startCarte, false);
	GM_addStyle('#progresscarte-container {\n\tborder: 1px solid #cccccc;\n\twidth: 250px;\n\tmargin: 7px auto 2px auto;\n\tpadding: 1px;\n\tbackground: #FFFFFF;\n}\n\n#progresscarte {\n\tbackground-color: #ACE97C;\n\theight: 15px;\n\tfont: 11px Tahoma, sans-serif;\n\tcolor: #000000;\n\ttext-align: center;\n\toverflow: hidden;\n}');
	return true;
}

window.addEventListener("load", load, false); // on execute la fonction "load" qu'on a d?finie au dessus quand le chargement de la page est termin?.
