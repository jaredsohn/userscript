// Auto-Ressources Origins-return
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
// @name		Auto-Ressources Origins-return
// @description	Ce script permet de calculer la production et les ressources disponibles de toutes ses planetes et de les visualiser sur la page Salle de Controle. Attention il ne fonctionne qu'avec les univers v3
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
		$('progress').style.width = pourcentage+'%';
		$('progress').innerHTML = pourcentage+'%';
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

function parseNombre(string_nombre) {
var nombre;

var regex=/\./gi;
nombre=string_nombre.replace(regex,'');
nombre=parseFloat(nombre);

return nombre;
}

function affiche(objet_infos) {
	var code="<table>";
	var somme={'ressources' : {'fer':0,'or':0,'cri':0,'hyd':0}, 'production' : {'fer':0,'or':0,'cri':0,'hyd':0}};

	code=code+'<tr class="tabligne2"><td colspan="5">Ressources</td></tr>';
	code=code+'<tr class="tabligne1">';
	code=code+'<td> Plan&egrave;tes </td>';
	code=code+'<td align="center"> Fer </td>';
	code=code+'<td align="center"> Or </td>';
	code=code+'<td align="center"> Cristal </td>';
	code=code+'<td align="center"> Hydrog&egrave;ne </td>';
	code=code+'</tr>';
			
			for(var i=0;i<objet_infos.planetes.length;i++)
			{
				code=code+'<tr class="tabligne'+(((i & 1)=='0')?'2':'1')+'">';
				code=code+'<td>'+objet_infos.planetes[i].nom +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].ressources.fer+' </td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].ressources.or +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].ressources.cri +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].ressources.hyd +'</td>';
				code=code+'</tr>';
				somme.ressources.fer=somme.ressources.fer+objet_infos.planetes[i].ressources.fer;
				somme.ressources.or=somme.ressources.or+objet_infos.planetes[i].ressources.or;
				somme.ressources.cri=somme.ressources.cri+objet_infos.planetes[i].ressources.cri;
				somme.ressources.hyd=somme.ressources.hyd+objet_infos.planetes[i].ressources.hyd;
			}
			
	code=code+'<tr class="tabligne'+(((objet_infos.planetes.length & 1)=='0')?'2':'1')+'">';
	code=code+'<td>Total</td>';
	code=code+'<td align="center"> '+somme.ressources.fer+' </td>';
	code=code+'<td align="center"> '+somme.ressources.or +'</td>';
	code=code+'<td align="center"> '+somme.ressources.cri +'</td>';
	code=code+'<td align="center"> '+somme.ressources.hyd +'</td>';
	code=code+'</tr>';
	code=code+'<tr class="tabligne1"><td colspan="5" align="center">---</td></tr>';
	code=code+'<tr class="tabligne2"><td colspan="5">Production</td></tr>';
	code=code+'<tr class="tabligne1">';
	code=code+'<td> Plan&egrave;tes </td>';
	code=code+'<td align="center"> Fer </td>';
	code=code+'<td align="center"> Or </td>';
	code=code+'<td align="center"> Cristal </td>';
	code=code+'<td align="center"> Hydrog&egrave;ne </td>';
	code=code+'</tr>';
			
			for(var i=0;i<objet_infos.planetes.length;i++)
			{
				code=code+'<tr class="tabligne'+(((i & 1)=='0')?'2':'1')+'">';
				code=code+'<td>'+objet_infos.planetes[i].nom +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].production.fer+' </td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].production.or +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].production.cri +'</td>';
				code=code+'<td align="center"> '+objet_infos.planetes[i].production.hyd +'</td>';
				code=code+'</tr>';
				somme.production.fer=somme.production.fer+objet_infos.planetes[i].production.fer;
				somme.production.or=somme.production.or+objet_infos.planetes[i].production.or;
				somme.production.cri=somme.production.cri+objet_infos.planetes[i].production.cri;
				somme.production.hyd=somme.production.hyd+objet_infos.planetes[i].production.hyd;
			}
			
		code=code+'<tr class="tabligne'+(((objet_infos.planetes.length & 1)=='0')?'2':'1')+'">';
		code=code+'<td>Total</td>';
		code=code+'<td align="center"> '+somme.production.fer+' </td>';
		code=code+'<td align="center"> '+somme.production.or +'</td>';
		code=code+'<td align="center"> '+somme.production.cri +'</td>';
		code=code+'<td align="center"> '+somme.production.hyd +'</td>';
		code=code+'</tr>';
		code=code+"</table>";
		$('cdprod-status').innerHTML=$('cdprod-status').innerHTML+code;
}

function startCalculateur() {
	$('linkStartCalculateur').style.display = 'none';
	$('onprogress').style.display = 'block';
	getPlanetes();
}

function stopCalculateur() {
	$('cdprod-status').innerHTML = 'Status: Affichage des r&eacute;sultats (<span id="cdprod-reset" class="link" style="cursor: pointer;">Reset</span>)';
	pourcentage = 100;
	$('progress').style.width = pourcentage+'%';
	$('progress').innerHTML = pourcentage+'%';
	affiche(infos);
	$('cdprod-reset').addEventListener('click', resetCalculateur, false);
}

function resetCalculateur() {
	pourcentage = 0;
	$('progress').style.width = '0%';
	$('progress').innerHTML = '0%';
	$('cdprod-status').innerHTML = '';
	$('linkStartCalculateur').style.display = 'block';
	$('onprogress').style.display = 'none';
}

function changeColonie() {
	$('cdprod-status').innerHTML = 'Status: Changement de colonie pour '+infos.planetes[keypla].nom;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					startDefil(Math.round((keypla+1)/infos.planetes.length/1.5*95+5));
					getResProd(keypla);
				} else {
					$('cdprod-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdprod-status').innerHTML = 'La fonction getResProd a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=ChangeColonie&salle=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('contenu=change_salle&affichageAJAX=ChangeColonie&salle=1&undefined&page_go=salleDeControle&idcolo='+infos.planetes[keypla].id);
}

function getResProd() {
	$('cdprod-status').innerHTML = 'Status: R&eacute;cup&eacute;ration des ress. & product. pour '+infos.planetes[keypla].nom;
	var regexressources = /<tr style=".*?"><td align="center"><div class='.*?'>(.*?)<\/span><\/td><td align="center"><div class='.*?'>(.*?)<\/span><\/td><td align="center"><div class='.*?'>(.*?)<\/span><\/td><td align="center"><div class='.*?'>(.*?)<\/span><\/td>/m;
	var regexproduction = /<td><b>Total :<\/b><\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>/m;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					reponse = xhr.responseText;
					var ress = regexressources.exec(reponse);
					if(ress != null) {
						infos.planetes[keypla].ressources = {'fer': parseNombre(ress[1]), 'or': parseNombre(ress[2]), 'cri': parseNombre(ress[3]), 'hyd': parseNombre(ress[4])};
					} else {
						throw 'Impossible de recuperer les ressources';
					}
					
					var prod = regexproduction.exec(reponse);
					if(prod != null) {
						infos.planetes[keypla].production = {'fer': parseNombre(prod[1]), 'or': parseNombre(prod[2]), 'cri': parseNombre(prod[3]), 'hyd': parseNombre(prod[4])};
					} else {
						throw 'Impossible de recuperer la production';
					}
					startDefil(Math.round((keypla+1)/infos.planetes.length*95+5));
					if(keypla+1 <= infos.planetes.length-1) {
						keypla++;
						setTimeout(changeColonie, 1500);
					} else {
						setTimeout(stopCalculateur, 1500);
					}
				} else {
					$('cdprod-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdprod-status').innerHTML = 'La fonction getResProd a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=Production&salle=1&ajax=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(null);
}

function getPlanetes() {
	var regexplanetes = /<option.*? value="([0-9]{1,10})">(.*?)  \[(.*?):(.*?):(.*?)\]<\/option>/gm;
	$('cdprod-status').innerHTML = 'Status: R&eacute;cup&eacute;ration de vos plan&egrave;tes...';
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					reponse = xhr.responseText;
					while((tmpresult = regexplanetes.exec(reponse)) != null) {
						infos.planetes[count] = {'id': tmpresult[1], 'nom': tmpresult[2], 'gsp': tmpresult[3]+':'+tmpresult[4]+':'+tmpresult[5], 'ressources': [], 'production': []};
						count++;
					}
					if(count > 0) {
						count = 0;
						startDefil(5);
						keypla = 0;
						setTimeout(changeColonie, 1500);
					}
				} else {
					$('cdprod-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdprod-status').innerHTML = 'La fonction getPlanetes a retourn&eacute; une exception: <br /> '+ e;
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
	element4.innerHTML = '<b>Production et ressources de l\'Empire</b>';
	element3.appendChild(element4);

	var element5 = document.createElement('tr');
	element5.className = 'tabligne1';
	var element6 = document.createElement('td');
	element6.style.padding = '3px';
	element6.style.textAlign = 'center';
	element6.innerHTML = '<span class="link" style="cursor: pointer;" id="linkStartCalculateur">Lancer le Calculateur</span>'+
						 '<div id="onprogress" style="display: none;">Calcul en cours, merci de rester sur cette page<div id="progress-container"><div style="width: 0%" id="progress">0%</div></div><span id="cdprod-status" style="font-size: 11px;"></span></div>';
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
	$('linkStartCalculateur').addEventListener('click', startCalculateur, false);
	GM_addStyle('#progress-container {\n\tborder: 1px solid #cccccc;\n\twidth: 250px;\n\tmargin: 7px auto 2px auto;\n\tpadding: 1px;\n\tbackground: #FFFFFF;\n}\n\n#progress {\n\tbackground-color: #ACE97C;\n\theight: 15px;\n\tfont: 11px Tahoma, sans-serif;\n\tcolor: #000000;\n\ttext-align: center;\n\toverflow: hidden;\n}');
	return true;
}

window.addEventListener("load", load, false); // on execute la fonction "load" qu'on a d?finie au dessus quand le chargement de la page est termin?.
