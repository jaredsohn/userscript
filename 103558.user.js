// ==UserScript==
// @name           Tools_Ogame_Detail_Flotte_VG
// @namespace      monkey
// @version        2.06
// @author         MonkeyIsBack
// @include        http://*.ogame.*/game/index.php?page=overview*
// ==/UserScript==

// MODIFIEZ ICI POUR CHANGER CERTAINES OPTIONS !!! 0 => non      1 => oui
var afficherTableauRessources = 1;
var afficherEnBas = 0;

var box = document.getElementById('eventboxContent');
box.setAttribute("style","display: block;");
var session = unsafeWindow.session;
var $ = unsafeWindow.$;

$("#eventboxContent").slideDown('fast');

var lettreUni = location.href.split('uni')[1].split('.')[0];
var ressourcesEnVol = false;
var chargements = {};
function number_format(number, decimals, dec_point, thousands_sep) {
	// http://phpjs.org/functions/number_format:481
	number = (number+'').replace(',', '').replace(' ', '');
	var n = !isFinite(+number) ? 0 : +number, 
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;        };
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    }
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}    return s.join(dec);
}
function parseFlotte () {
	if (document.getElementsByClassName('FlotteInfoIci').length > 0) {
		$.get(document.getElementsByClassName('FlotteInfoIci')[0].getAttribute('href'), function(resp, e, i) {
			var allTD = document.getElementsByTagName('td');
			var currentElement;
			for (var i = 0; i < allTD.length; i++) {
				if (allTD[i].getAttribute('href') && allTD[i].getAttribute('href') == this.url) {
					currentElement = allTD[i];
				}
			}
			
			var respTable = document.createElement('div');
				respTable.innerHTML = resp;
			if (currentElement.getAttribute('dataJ') == 'joueur') {
				var ListeVaisseaux = '';
				for (var i = 1; i < respTable.getElementsByTagName('tr').length; i++) {
					if(respTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getAttribute('colspan') == '2') break;
					
					ListeVaisseaux += '<span style="color:#8866EE">';
					ListeVaisseaux += respTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerHTML;
					ListeVaisseaux += '</span>';
					ListeVaisseaux += '<span style="color:#77AAFF"> ';
					ListeVaisseaux += respTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML;
					ListeVaisseaux += '</span>';
					if (i < respTable.getElementsByTagName('tr').length - 6  || resp.indexOf('Chargement:') == -1 && i < respTable.getElementsByTagName('tr').length - 1) 
					ListeVaisseaux += '<br />';
				}
				
				var TDVaisseaux = document.createElement('span');
					TDVaisseaux.style.textAlign = 'left';
					TDVaisseaux.style.fontSize = '9px';
					TDVaisseaux.innerHTML = ListeVaisseaux;

				currentElement.appendChild(TDVaisseaux);
				
				if(respTable.getElementsByTagName('th')[1] && !currentElement.parentNode.getAttribute('nePasAfficherRessources')) {
					var currentMetal = respTable.getElementsByTagName('th')[1].parentNode.nextSibling.nextSibling.getElementsByTagName('td')[1].innerHTML;
					var currentCristal = respTable.getElementsByTagName('th')[1].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('td')[1].innerHTML;
					var currentDeut = respTable.getElementsByTagName('th')[1].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('td')[1].innerHTML;

					if(currentMetal + currentCristal + currentDeut != '000') {
						ressourcesEnVol = true;
						
						var currentDestination = currentElement.parentNode.getAttribute('destination');
						if(!currentElement.parentNode.getAttribute('nePasCompterRessources')) {
							if (!chargements[currentDestination]) {
								chargements[currentDestination] = [];
								chargements[currentDestination][0] = 0;
								chargements[currentDestination][1] = 0;
								chargements[currentDestination][2] = 0;
							}
							if(currentMetal != '0') {
								if(currentMetal.indexOf('.') != -1) {
									chargements[currentDestination][0] += parseInt(currentMetal.split('.').join(''));
								} else {
									chargements[currentDestination][0] += parseInt(currentMetal);
								}
							}
							if(currentCristal != '0') {
								if(currentCristal.indexOf('.') != -1) {
									chargements[currentDestination][1] += parseInt(currentCristal.split('.').join(''));
								} else {
									chargements[currentDestination][1] += parseInt(currentCristal);
								}
							}
							if(currentDeut != '0') {
								if(currentDeut.indexOf('.') != -1) {
									chargements[currentDestination][2] += parseInt(currentDeut.split('.').join(''));
								} else {
									chargements[currentDestination][2] += parseInt(currentDeut);
								}
							}
						}
						currentMetal = (currentMetal != '0') 		? 'métal : <span style="color:#6699EE">' + currentMetal + '</span> ' : '';
						currentCristal = (currentCristal != '0') 	? 'cristal : <span style="color:#6699EE">' + currentCristal + '</span> ' : '';
						currentDeut = (currentDeut != '0') 			? 'deut : <span style="color:#6699EE">' + currentDeut + '</span>' : '';
						
						var TDChargement = document.createElement('td');
							TDChargement.style.textAlign = 'right';
							TDChargement.style.fontSize = '9px';
							TDChargement.style.color = '#7755DD';
							TDChargement.style.whiteSpace = 'nowrap';
							TDChargement.style.width = '1%';
							TDChargement.setAttribute('colspan', '6');
							TDChargement.style.borderRight = '1px solid rgba(34, 51, 102, 0.5)';
							TDChargement.style.borderTop = '0px';
							TDChargement.innerHTML = currentMetal + currentCristal + currentDeut;
						var newTRChargement = document.createElement('tr');
							newTRChargement.appendChild(TDChargement);
							TDVaisseaux.parentNode.setAttribute('rowspan', '2');
							if(currentElement.parentNode.getAttribute('trajet') && currentElement.parentNode.getAttribute('trajet') == 'retour') {
								TDChargement.parentNode.className = 'trajetRetour';
							}
						currentElement.parentNode.parentNode.insertBefore(newTRChargement, currentElement.parentNode.nextSibling);
						currentElement.parentNode.getElementsByTagName('td')[0].style.borderBottom = '0px';
						currentElement.parentNode.getElementsByTagName('td')[1].style.borderBottom = '0px';
						currentElement.parentNode.getElementsByTagName('td')[2].style.borderBottom = '1px solid rgba(34, 51, 102, 0.7)';
						currentElement.parentNode.getElementsByTagName('td')[3].style.borderBottom = '1px solid rgba(34, 51, 102, 0.8)';
						currentElement.parentNode.getElementsByTagName('td')[4].style.borderBottom = '1px solid rgba(34, 51, 102, 0.9)';
						currentElement.parentNode.getElementsByTagName('td')[5].style.borderBottom = '1px solid rgba(34, 51, 102, 1)';
					}
				}
			}
			
			currentElement.className = 'FlotteInfoLoaded';
		});
		
		document.getElementsByClassName('FlotteInfoIci')[0].className = 'FlotteInfoLoading';
		window.setTimeout(parseFlotte, 0);
	} else {
			if (document.getElementsByClassName('FlotteInfoIci').length == 0 && document.getElementsByClassName('FlotteInfoLoading').length == 0) {

			addGlobalStyle('table#eventContent td:last-child {border-right: 1px solid #223366;}');
			
			if	(ressourcesEnVol && afficherTableauRessources == 1) {
				var newTR = document.createElement('tr');
				var newTD = document.createElement('td');
					newTD.setAttribute('colspan', '7');
					newTD.style.textAlign = 'center';
					newTD.style.padding = '0px';
					newTD.style.paddingTop = '10px';
					newTD.style.border = '0px';
					newTD.style.background = 'none';
					
				var tableRessEnVol = document.createElement('table');
				tableRessEnVol.style.borderCollapse = 'collapse';
				
				var trRessTitre = document.createElement('tr');
				var trRessMetal = document.createElement('tr');
				var trRessCristal = document.createElement('tr');
				var trRessDeut = document.createElement('tr');
				var trRessSomme = document.createElement('tr');
				
				tableRessEnVol.appendChild(trRessTitre);
				tableRessEnVol.appendChild(trRessMetal);
				tableRessEnVol.appendChild(trRessCristal);
				tableRessEnVol.appendChild(trRessDeut);
				tableRessEnVol.appendChild(trRessSomme);
				
				var totalMetal = 0;
				var totalCristal = 0;
				var totalDeut = 0;
				var totalSomme = 0;
				
				var tdRessTitre = document.createElement('td');
				var tdMetalTitre = document.createElement('td');
				var tdCristalTitre = document.createElement('td');
				var tdDeutTitre = document.createElement('td');
				var tdSommeTitre = document.createElement('td');
				
				tdRessTitre.appendChild(document.createTextNode('Destination'));
				tdRessTitre.style.fontWeight = 'bold';
				tdMetalTitre.appendChild(document.createTextNode('Métal'));
				tdCristalTitre.appendChild(document.createTextNode('Cristal'));
				tdDeutTitre.appendChild(document.createTextNode('Deut'));
				tdSommeTitre.appendChild(document.createTextNode('Somme'));
				
				tdRessTitre.style.borderRight = '1px solid rgba(34, 51, 102,1)';
				tdMetalTitre.style.borderRight = '1px solid rgba(34, 51, 102, 1)';
				tdCristalTitre.style.borderRight = '1px solid rgba(34, 51, 102, 1)';
				tdDeutTitre.style.borderRight = '1px solid rgba(34, 51, 102, 1)';
				tdSommeTitre.style.borderRight = '1px solid rgba(34, 51, 102, 1)';
				tdRessTitre.style.fontSize = '10px';
				tdMetalTitre.style.fontSize = '10px';
				tdCristalTitre.style.fontSize = '10px';
				tdDeutTitre.style.fontSize = '10px';
				tdSommeTitre.style.fontSize = '10px';
				
				trRessTitre.appendChild(tdRessTitre);
				trRessMetal.appendChild(tdMetalTitre);
				trRessCristal.appendChild(tdCristalTitre);
				trRessDeut.appendChild(tdDeutTitre);
				trRessSomme.appendChild(tdSommeTitre);
				
				for (i in chargements) {
					
					var newTDDest = document.createElement('td');
					var newTDMetal = document.createElement('td');
					var newTDCristal = document.createElement('td');
					var newTDDeut = document.createElement('td');
					var newTDSomme = document.createElement('td');
					newTDDest.appendChild(document.createTextNode(i));
					newTDMetal.appendChild(document.createTextNode(number_format(chargements[i][0], 0, '.', '.')));
					totalMetal += chargements[i][0];
					newTDCristal.appendChild(document.createTextNode(number_format(chargements[i][1], 0, '.', '.')));
					totalCristal += chargements[i][1];
					newTDDeut.appendChild(document.createTextNode(number_format(chargements[i][2], 0, '.', '.')));
					totalDeut += chargements[i][2];
					newTDSomme.appendChild(document.createTextNode(number_format(chargements[i][0] + chargements[i][1] + chargements[i][2], 0, '.', '.')));
					totalSomme += chargements[i][0] + chargements[i][1] + chargements[i][2];
					
					newTDDest.style.borderLeft = '1px dashed rgba(34, 51, 102,1)';
					newTDMetal.style.borderLeft = '1px dashed rgba(34, 51, 102, 1)';
					newTDCristal.style.borderLeft = '1px dashed rgba(34, 51, 102, 1)';
					newTDDeut.style.borderLeft = '1px dashed rgba(34, 51, 102, 1)';
					newTDSomme.style.borderLeft = '1px dashed rgba(34, 51, 102, 1)';
					newTDDest.style.fontSize = '10px';
					newTDMetal.style.fontSize = '9px';
					newTDCristal.style.fontSize = '9px';
					newTDDeut.style.fontSize = '9px';
					newTDSomme.style.fontSize = '10px';
				
					trRessTitre.appendChild(newTDDest);
					trRessMetal.appendChild(newTDMetal);
					trRessCristal.appendChild(newTDCristal);
					trRessDeut.appendChild(newTDDeut);
					trRessSomme.appendChild(newTDSomme);
					
				}
				
				var newTDDest = document.createElement('td');
				var newTDMetal = document.createElement('td');
				var newTDCristal = document.createElement('td');
				var newTDDeut = document.createElement('td');
				var newTDSomme = document.createElement('td');
				
				newTDDest.style.fontWeight = 'bold';
				newTDDest.style.fontSize = '10px';
				newTDMetal.style.fontSize = '10px';
				newTDCristal.style.fontSize = '10px';
				newTDDeut.style.fontSize = '10px';
				newTDSomme.style.fontSize = '10px';
				
				newTDDest.appendChild(document.createTextNode('Total'));
				newTDMetal.appendChild(document.createTextNode(number_format(totalMetal, 0, '.', '.')));
				newTDCristal.appendChild(document.createTextNode(number_format(totalCristal, 0, '.', '.')));
				newTDDeut.appendChild(document.createTextNode(number_format(totalDeut, 0, '.', '.')));
				newTDSomme.appendChild(document.createTextNode(number_format(totalSomme, 0, '.', '.')));
				
				trRessTitre.appendChild(newTDDest);
				trRessMetal.appendChild(newTDMetal);
				trRessCristal.appendChild(newTDCristal);
				trRessDeut.appendChild(newTDDeut);
				trRessSomme.appendChild(newTDSomme);
				
				newTDDest.style.borderLeft = '1px solid rgba(34, 51, 102,1)';
				newTDMetal.style.borderLeft = '1px solid rgba(34, 51, 102, 1)';
				newTDCristal.style.borderLeft = '1px solid rgba(34, 51, 102, 1)';
				newTDDeut.style.borderLeft = '1px solid rgba(34, 51, 102, 1)';
				newTDSomme.style.borderLeft = '1px solid rgba(34, 51, 102, 1)';
				
				newTD.appendChild(tableRessEnVol);
				newTR.appendChild(newTD);
				document.getElementById('eventListWrap').getElementsByTagName('tbody')[0].appendChild(newTR);
				for (var i = 0; i < tableRessEnVol.getElementsByTagName('td').length; i++) {
					tableRessEnVol.getElementsByTagName('td')[i].style.padding = '1px';
				}
			}
		} else {
			// on attends que les requêtes ajax soient toutes achevées, alors on redemande la fonction qui check les className
			window.setTimeout(function(){
				parseFlotte();
			}, 100);
		}
	}
}

function parseResponse (txt) {
	var elm = document.createElement('div');
		elm.innerHTML = txt;
	
	var listeSpans = elm.getElementsByTagName('span');
	for (var i = 0; i < listeSpans.length; i++){
		if(listeSpans[i].getAttribute('href')) {
			var newTD = document.createElement('td');
				newTD.className = 'FlotteInfoIci';
				newTD.style.textAlign = 'right';

			if(listeSpans[i].getAttribute('title').indexOf('fédération') == -1) {
				newTD.setAttribute('dataJ', 'joueur');
			}
			newTD.setAttribute('href', listeSpans[i].getAttribute('href'));
			listeSpans[i].parentNode.parentNode.appendChild(newTD);
		}
	}
	
	var listeTRs = elm.getElementsByTagName('tr');
	for (var i = 0; i < listeTRs.length; i++) {
		// on ne modifie pas les lignes AG
		if(listeTRs[i].getElementsByTagName('td')[0]) {

			// Fusion des cellules du compteur & de l'heure d'arrivée
			var TDHeure = document.createElement('td');
			var spanHeure = document.createElement('span');
				spanHeure.className = listeTRs[i].getElementsByTagName('td')[0].className;
				spanHeure.id = listeTRs[i].getElementsByTagName('td')[0].id;
				
				TDHeure.appendChild(spanHeure);
				TDHeure.appendChild(document.createElement('br'));
				TDHeure.innerHTML += listeTRs[i].getElementsByTagName('td')[1].innerHTML;
			listeTRs[i].replaceChild(TDHeure, listeTRs[i].getElementsByTagName('td')[0]);
			listeTRs[i].removeChild(listeTRs[i].getElementsByTagName('td')[1]);

			// Affichage du type de Mission (texte, statut & image)
			var TDMission = listeTRs[i].getElementsByTagName('td')[1];
			var currentMissionTooltip = listeTRs[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0].getAttribute('title');
			var currentMissionImageSrc = listeTRs[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0].src;
			
			if (currentMissionTooltip.indexOf('Propre flotte|') != -1) {
				currentMissionTooltip = currentMissionTooltip.split('Propre flotte|')[1];
				TDMission.style.color = '#4af74d';
			} else if (currentMissionTooltip.indexOf('Flotte neutre') != -1) {
				currentMissionTooltip = currentMissionTooltip.split('Flotte neutre|')[1];
				TDMission.style.color = 'orange';
			} else if (currentMissionTooltip.indexOf('Flotte ennemi') != -1) {
				currentMissionTooltip = currentMissionTooltip.split('Flotte ennemi|')[1];
				TDMission.style.color = 'red';
			} else if (currentMissionTooltip.indexOf('Attaque groupée') != -1) {
				if (spanHeure.className.indexOf('friendly') != -1) {
					currentMissionTooltip = currentMissionTooltip.split('|').join('<br />');
					TDMission.style.color = '#4af74d';
				} else {
					currentMissionTooltip = currentMissionTooltip.split('|').join('<br />');
					TDMission.style.color = '#ff3333';
				}
			}
			listeTRs[i].setAttribute('currentMissionType', currentMissionTooltip);
		
			TDMission.innerHTML = currentMissionTooltip + ' <img src="'+currentMissionImageSrc+'" />';
			
			// Fusion de la case nom & coord de la planète de départ
			if(listeTRs[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0]) {
				if(listeTRs[i].getElementsByTagName('td')[2].getElementsByTagName('span')[0]) {
					listeTRs[i].getElementsByTagName('td')[3].innerHTML = '<span style="font-size:10px">' + listeTRs[i].getElementsByTagName('td')[2].getElementsByTagName('span')[0].getAttribute('title').split('|')[1] + '</span><br />' + listeTRs[i].getElementsByTagName('td')[3].innerHTML;
				} else {
					listeTRs[i].getElementsByTagName('td')[3].innerHTML = '<span style="font-size:10px">' + listeTRs[i].getElementsByTagName('td')[2].innerHTML + '</span><br />' + listeTRs[i].getElementsByTagName('td')[3].innerHTML;
				}
			}
			listeTRs[i].removeChild(listeTRs[i].getElementsByTagName('td')[2]);
			
			// Fusion de la case nombre de vaisseaux & Fleche trajet
			var TDTrajet = listeTRs[i].getElementsByTagName('td')[3];

			if (listeTRs[i].lastChild.getAttribute) {
				listeTRs[i].setAttribute('FlotteID', listeTRs[i].lastChild.getAttribute('href').split('ID=')[1]);
				if (listeTRs[i].getElementsByTagName('td')[4].className == 'icon_movement') {
					TDTrajet.innerHTML = '<span style="color:#00ff00">A -></span> <br />' + TDTrajet.innerHTML;
				} else {
					TDTrajet.innerHTML = '<span style="color:lightblue"><- R</span> <br />' + TDTrajet.innerHTML;
					listeTRs[i].setAttribute('trajet', 'retour');
					listeTRs[i].className = listeTRs[i].className + ' trajetRetour';
					// les ID de missions sont à la suite lors du lancement d'une expé, on repère les expéditions au retour,
					// on regarde si dans les missiosn précédentes une d'elle a l'ID d'en dessous, si oui on rajoute le (E)
					if (listeTRs[i].getAttribute('currentMissionType') == 'Expédition (R)') {
						for (var j = 0; j < i; j++) {
							if(parseInt(listeTRs[j].getAttribute('FlotteID')) == parseInt(listeTRs[i].getAttribute('FlotteID')) -1) {
								listeTRs[j].getElementsByTagName('td')[1].innerHTML = listeTRs[j].getElementsByTagName('td')[1].innerHTML.split('Expédition').join('Expédition (E)');
							}
						}
					}
					if (listeTRs[i].getAttribute('currentMissionType').indexOf('(R)')) {
						for (var j = 0; j < i; j++) {
							if(parseInt(listeTRs[j].getAttribute('FlotteID')) == parseInt(listeTRs[i].getAttribute('FlotteID')) -1) {
								if(listeTRs[j].getAttribute('currentMissionType') == 'Transporter' || listeTRs[j].getAttribute('currentMissionType') == 'Coloniser') {
									listeTRs[i].setAttribute('nePasAfficherRessources', 'true');
								}
								listeTRs[i].setAttribute('nePasCompterRessources', 'true');
							}
						}
					}
				}
			} else {
				listeTRs[i].setAttribute('MIP', 'true');
			}
				listeTRs[i].removeChild(listeTRs[i].getElementsByTagName('td')[4]);

			// Fusion de la case nom & coord de la planète d'arrivée
			if(listeTRs[i].getElementsByTagName('td')[5].getElementsByTagName('a')[0]) {
				if(listeTRs[i].getElementsByTagName('td')[4].getElementsByTagName('span')[0]) {
					listeTRs[i].getElementsByTagName('td')[5].innerHTML = '<span style="font-size:10px">' + listeTRs[i].getElementsByTagName('td')[4].getElementsByTagName('span')[0].getAttribute('title').split('|')[1] + '</span><br />' + listeTRs[i].getElementsByTagName('td')[5].innerHTML;
				} else {
					listeTRs[i].getElementsByTagName('td')[5].innerHTML = '<span style="font-size:10px">' + listeTRs[i].getElementsByTagName('td')[4].innerHTML + '</span><br />' + listeTRs[i].getElementsByTagName('td')[5].innerHTML;
				}
			}
			listeTRs[i].removeChild(listeTRs[i].getElementsByTagName('td')[4]);
			
			// définition des destinations pour le calcul des ressources en vol
			if(listeTRs[i].getAttribute('trajet') && listeTRs[i].getAttribute('trajet') == 'retour') {
				listeTRs[i].setAttribute('destination', listeTRs[i].getElementsByTagName('td')[2].innerHTML.split('target="_top">')[1].split('<')[0])
			} else {
				listeTRs[i].setAttribute('destination', listeTRs[i].getElementsByTagName('td')[4].innerHTML.split('target="_top">')[1].split('<')[0])
			}
			
			// ajout du lien war riders et affichage direct du pseudonyme dans la case envoyer un message
			if(listeTRs[i].getElementsByTagName('td')[6].getElementsByTagName('a')[0] && listeTRs[i].getElementsByTagName('td')[6].getElementsByTagName('a')[0].getAttribute('title')) {
				var pseudoCible = listeTRs[i].getElementsByTagName('td')[6].getElementsByTagName('a')[0].getAttribute('title').split('message à ')[1];
				var lienWarRiders = document.createElement('a');
					lienWarRiders.href = 'http://www.war-riders.de/fr/' + lettreUni + '/details/player/' + pseudoCible;
					lienWarRiders.setAttribute('target', '_blank');
				var imageWarRiders = document.createElement('img');
					imageWarRiders.src = 'http://www.war-riders.de/img/favicon.ico';
					imageWarRiders.style.width = '16px';
					imageWarRiders.style.height = '16px';
				lienWarRiders.appendChild(imageWarRiders);
				listeTRs[i].getElementsByTagName('td')[6].appendChild(lienWarRiders);
				listeTRs[i].getElementsByTagName('td')[6].innerHTML += '<br /><span style="font-size:9px; color:#5588dd">' + listeTRs[i].getElementsByTagName('td')[6].getElementsByTagName('a')[0].getAttribute('title').split('message à ')[1] + '</span>';
			}

			// Fusion des cases espionner et envoyer un message, 
			if(listeTRs[i].getElementsByTagName('td')[5].getElementsByTagName('a')[0]) {
				listeTRs[i].getElementsByTagName('td')[6].innerHTML = listeTRs[i].getElementsByTagName('td')[5].innerHTML + listeTRs[i].getElementsByTagName('td')[6].innerHTML;
			} 
			listeTRs[i].removeChild(listeTRs[i].getElementsByTagName('td')[5]);
		}
	}
	elm.getElementsByTagName('link')[0].parentNode.removeChild(elm.getElementsByTagName('link')[0]);
	
	return elm.innerHTML;
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#eventboxContent {width: 667px; margin:0px;}');
addGlobalStyle('#eventListWrap {width: 667px; margin:0px;}');
addGlobalStyle('#contentWrapper {width: 667px; margin:0px;}');
addGlobalStyle('#eventHeader {display: none;}');
addGlobalStyle('table#eventContent .odd {background: none;}');
addGlobalStyle('table#eventContent tr.trajetRetour td {background: rgb(25, 30, 35);}');

addGlobalStyle('table#eventContent {border-collapse: collapse; background: none; margin:0px; margin-bottom:6px; margin-top:3px;}');
	
	
addGlobalStyle('table#eventContent td {'
						+ 'background-color: #000000;'
						+ 'border-top: 1px solid #223366;'
						+ 'border-bottom: 1px solid #223366;'
						+ 'padding: 3px;'
						+ 'padding-bottom: 5px;'
						+ 'margin:0px;'
						+ 'white-space:nowrap;'
						+ 'width:1%;}');

addGlobalStyle('table#eventContent td:first-child {'
						+ 'border-left: 1px solid #223366;}');

addGlobalStyle('#eventFooter {'
						+ 'display: none;}');


if (typeof unsafeWindow.loadEvents.loaded == 'undefined') {
	$("#eventboxContent").html('<img height="16" width="16" src="img/ajax-loader.gif" />');
	$.get('/game/index.php?page=eventList&session=' + session + '&ajax=1', function(response) {
		$("#eventboxContent").html(parseResponse(response));
		window.setTimeout(parseFlotte, 0);
		$("#eventHeader .close_details").click(unsafeWindow.toggleEvents);
		unsafeWindow.loadEvents.loaded = true;
	}); 
}
if(afficherEnBas == 1) {
	// merci benneb lolol
	var eventboxContent = document.getElementById('eventboxContent');
	var contentWrapper = document.getElementById('contentWrapper');
	contentWrapper.removeChild(eventboxContent);
	contentWrapper.appendChild(eventboxContent);
}
unsafeWindow.checkEventList = function(){}
unsafeWindow.initAjaxEventbox();
unsafeWindow.initAjaxEventbox = function(){};
