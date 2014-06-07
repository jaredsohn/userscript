// Auto-Constructions Origins-return
// Cree le 03/02/2010
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
// @name		Auto-Constructions Origins-return
// @description	Ce script permet d'afficher les constructions en cours ainsi que leur date de fin sur les diff�rentes plan�tes. Attention il ne fonctionne qu'avec les univers v3
// @version 1.0
// @include	http://uni*.origins-return.fr/index.php?page=salleDeControle
// ==/UserScript==


var infos = {planetes: []};
var count = 0;
var keypla = 0;
var pourcentage = 0;
var pourcentmax = 0;
var timerid = null;
var version = '1.0.4';

function defilPourcent() {
	if(pourcentage < pourcentmax) {
		pourcentage++;
		$('progressCons').style.width = pourcentage+'%';
		$('progressCons').innerHTML = pourcentage+'%';
	} else {
		clearInterval(timerid);
		timerid = null;
	}
}

function startDefil(max) {
	if(timerid != null && max > pourcentage) {
		pourcentmax = max;
	} else if(max > pourcentage) {
		pourcentmax = max;
		timerid = setInterval(defilPourcent, 1);
	} else {
		return false;
	}
}

function $(element) {
	return document.getElementById(element);
}


function affiche(objet_infos) {
	var date=0;
	var actu=new Date();
	var futu=new Date();
	var code="<table>";
	code=code+'<tr class="tabligne1">';
	code=code+'<td> Plan&egrave;tes </td>';
	code=code+'<td align="center"> Batiment </td>';
	code=code+'<td align="center"> Date de fin </td>';
	code=code+'</tr>';
			
			for(var i=0;i<objet_infos.planetes.length;i++)
			{
				date=parseInt(objet_infos.planetes[i].construction.duree)+parseInt((actu.getTime())/1000);
				futu.setTime(date*1000);
				date=futu.toLocaleString();
				code=code+'<tr class="tabligne'+(((i & 1)=='0')?'2':'1')+'">';
				code=code+'<td>'+objet_infos.planetes[i].nom +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].construction.nom+' </td>';
				code=code+'<td align="center"> '+date+' </td>';
				code=code+'</tr>';
				date=0;
			}
		code=code+"</table>";
		$('cdcons-status').innerHTML=$('cdcons-status').innerHTML+code;
}

function startConstruc() {
	$('linkStartConstruc').style.display = 'none';
	$('onprogressConsCons').style.display = 'block';
	getPlanetes();
}

function stopConstruc() {
	$('cdcons-status').innerHTML = 'Status: Affichage des r&eacute;sultats (<span id="cdcons-reset" class="link" style="cursor: pointer;">Reset</span>)';
	pourcentage = 100;
	$('progressCons').style.width = pourcentage+'%';
	$('progressCons').innerHTML = pourcentage+'%';
	affiche(infos);
	$('cdcons-reset').addEventListener('click', resetConstruc, false);
}

function resetConstruc() {
	pourcentage = 0;
	$('progressCons').style.width = '0%';
	$('progressCons').innerHTML = '0%';
	$('cdcons-status').innerHTML = '';
	$('linkStartConstruc').style.display = 'block';
	$('onprogressConsCons').style.display = 'none';
}

function changeColonie() {
	$('cdcons-status').innerHTML = 'Status: Changement de colonie pour '+infos.planetes[keypla].nom;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					startDefil(Math.round((keypla+1)/infos.planetes.length/1.5*95+5));
					getConstruc(keypla);
				} else {
					$('cdcons-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdcons-status').innerHTML = 'La fonction getConstruc a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=ChangeColonie&salle=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('contenu=change_salle&affichageAJAX=ChangeColonie&salle=1&undefined&page_go=salleDeControle&idcolo='+infos.planetes[keypla].id);
}

function getConstruc() {
	$('cdcons-status').innerHTML = 'Status: R&eacute;cup&eacute;ration des constructions pour '+infos.planetes[keypla].nom;
	var regex1 = /<td colspan="2">(.*?) \(([0-9]+)\)<\/td>/;
	var regex2 = /<input type="hidden" id="lanceurChrono" value="(.*?):/;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					reponse = xhr.responseText;
					var constructnom = regex1.exec(reponse);
					var constructduree = regex2.exec(reponse);
					if(constructnom != null) {
						infos.planetes[keypla].construction = {'nom': constructnom[1]+' ('+constructnom[2]+')', 'duree':parseInt(constructduree[1])};
					} else {
						infos.planetes[keypla].construction = {'nom': 'Aucun', 'duree':0};;
					}
					
					startDefil(Math.round((keypla+1)/infos.planetes.length*95+5));
					if(keypla+1 <= infos.planetes.length-1) {
						keypla++;
						setTimeout(changeColonie, 1500);
					} else {
						setTimeout(stopConstruc, 1500);
					}
				} else {
					$('cdcons-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdcons-status').innerHTML = 'La fonction getConstruc a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=salleDeControle&salle=1&ajax=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(null);
}

function getPlanetes() {
	var regexplanetes = /<option.*? value="([0-9]{1,10})">(.*?)  \[(.*?):(.*?):(.*?)\]<\/option>/gm;
	$('cdcons-status').innerHTML = 'Status: R&eacute;cup&eacute;ration de vos plan&egrave;tes...';
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					reponse = xhr.responseText;
					while((tmpresult = regexplanetes.exec(reponse)) != null) {
						infos.planetes[count] = {'id': tmpresult[1], 'nom': tmpresult[2], 'gsp': tmpresult[3]+':'+tmpresult[4]+':'+tmpresult[5], 'construction': []};
						count++;
					}
					if(count > 0) {
						count = 0;
						startDefil(5);
						keypla = 0;
						setTimeout(changeColonie, 1500);
					}
				} else {
					$('cdcons-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdcons-status').innerHTML = 'La fonction getPlanetes a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('GET', 'index.php?page=salleDeControle&salle=1&ajax=1', true);
	xhr.send(null);
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
	element4.innerHTML = '<b>Constructions de l\'Empire</b>';
	element3.appendChild(element4);

	var element5 = document.createElement('tr');
	element5.className = 'tabligne1';
	var element6 = document.createElement('td');
	element6.style.padding = '3px';
	element6.style.textAlign = 'center';
	element6.innerHTML = '<span class="link" style="cursor: pointer;" id="linkStartConstruc">Lancer le Calcul</span>'+
						 '<div id="onprogressConsCons" style="display: none;">Calcul en cours, merci de rester sur cette page<div id="progressCons-container"><div style="width: 0%" id="progressCons">0%</div></div><span id="cdcons-status" style="font-size: 11px;"></span></div>';
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
	$('linkStartConstruc').addEventListener('click', startConstruc, false);
	GM_addStyle('#progressCons-container {\n\tborder: 1px solid #cccccc;\n\twidth: 250px;\n\tmargin: 7px auto 2px auto;\n\tpadding: 1px;\n\tbackground: #FFFFFF;\n}\n\n#progressCons {\n\tbackground-color: #ACE97C;\n\theight: 15px;\n\tfont: 11px Tahoma, sans-serif;\n\tcolor: #000000;\n\ttext-align: center;\n\toverflow: hidden;\n}');
	return true;
}

window.addEventListener("load", load, false); // on execute la fonction "load" qu'on a d?finie au dessus quand le chargement de la page est termin?.
