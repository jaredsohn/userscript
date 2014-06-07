// ==UserScript==
// @name           LL
// @namespace      AM
// @description    Afficher vos flottes d'avions en toute légèreté.
// @include        http://jumbojet.airlines-manager.com*
// @include        http://dream.airlines-manager.com*
// @include        http://tournament.airlines-manager.com*
// @exclude        http://*airlines-manager.com/programmation_vol_par_avion.php*
// @exclude        http://*airlines-manager.com/tableau_de_bord_ligne.php*
// @exclude        http://*airlines-manager.com/config_appareil*
// @exclude        http://*airlines-manager.com/program_prix.php*
// @exclude        http://*airlines-manager.com/switch_redir.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require        http://jumbojet.airlines-manager.com/js_b/encode_a.js
// @icon           http://jumbojet.airlines-manager.com/favicon.ico
// @version        1.8.3
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
	return;

//Variables globales.
var version  = '1.8.3',
	popup,
	pop,
	//[ida, "type", "nom", "config", date, fiabilité, utilisation]
	listeGlobal = [[],[],[]],
	lI = {},//Liste des index pour la liste global
	idc = 0,
	ida = 0,
	repairCost = {},
	host = (window.location.hostname).split('.')[0],
	placeMax = 0,
	planningOpened = false;
	
//Vérifie si l'idc est enregistré. Si non, appelle la fonction fetchIDC.
if (GM_getValue(host + '.idc', false)) {
	idc = GM_getValue(host + '.idc');
} else {
	fetchIDC();
	idc = GM_getValue(host + '.idc');
}

//Vérifie si l'ida est enregistré. Si non, appelle la fonction fetchIDA.
if (GM_getValue(host + '.ida', false)) {
	ida = GM_getValue(host + '.ida');
} else {
	fetchIDA();
	ida = GM_getValue(host + '.ida');
}
	
window.addEventListener('load', main, false);

//Méthode pour trier un tableau à deux dimensions
Array.prototype.multiSort = function (index) { 
	for (var i = 0, c = this.length; i < c; i++){
		var temp = this[i].splice(index,1,this[i][index]);
		this[i].unshift(temp[0]);
	}
	this.sort();
	for (var i = 0, c = this.length; i < c; i++){
		this[i].shift();
	}
	return this;
} 

//Méthode pour séparer un tableau à deux dimensions en un tableau de tableau à deux dimensions
Array.prototype.separate = function (index) { 
	var newArray = [[]],
		e = 0;
	for (var i = 0, c = this.length; i < c; i++){
		if ( (i != 0) && ( this[i].splice(index,1,this[i][index])[0] != this[i-1].splice(index,1,this[i-1][index])[0] ) ) {
			e++;
			newArray.push([]);
			newArray[e].push(this[i]);
		} else {
			newArray[e].push(this[i]);
		}
	}
	return newArray;
} 

//Ajoute une majuscule à la première lettre d'un texte
function majuscule (texte) {
	return texte.charAt(0).toUpperCase() + texte.slice(1);
}

//Genere un entier aleatoire dans l'intervalle donne
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//S'occupe d'augmenter le nombre de chiffre pour la macro rename
function zeroPad(num,count) {
	var numZeropad = num + '';
	while(numZeropad.length < count) {
		numZeropad = "0" + numZeropad;
	}
	return numZeropad;
}

//Formate un nombre en string avec séparateur de milliers.
function format(c, d) {
	while ((d = c.toString().replace(/(\d)([\d]{3})(\.|\s|\b)/, "$1 $2$3")) && d != c) {
		c = d;
	}
	return d;
}

//fonction pour comparer un nombre entre un interval
function compareNumber(critere, iValue) {
	var iMin = critere[0],
		iMax = critere[1];
	if (iMin == "" && iMax == "") {
		return true;
	}
	else if (iMin == "" && iValue <= parseFloat(iMax)) {
		return true;
	}
	else if (parseFloat(iMin) <= iValue && "" == iMax) {
		return true;
	}
	else if (parseFloat(iMin) <= iValue && iValue <= parseFloat(iMax)) {
		return true;
	}
	return false;
}

//fonction pour comparer du texte
function compareText(critere, text) {
	return (text.indexOf(critere) !== -1);
}

//Effectue les différentes opérations de manière synchrone
function recursive(obj) {
	if (typeof obj.start === 'undefined') {
		obj.start = false;
		$('span#planeTotal', pop).text(obj.list.length);
		$('span#actualPlane', pop).text(0);
		$('input[type="button"], input[type="radio"], select', pop).attr('disabled', true);
	}
	if (obj.list.length) {
		var delay = (typeof obj.delay !== "undefined") ? obj.delay : randInt(300, 2000);
		$('tr#tr' + obj.list[0], pop).addClass('background');
		
		obj.next = function() {
			$('tr#tr' + obj.list[0], pop).removeClass('background');
			obj.list.shift();
			$('tr#tr' + obj.list[0], pop).addClass('background');
			$('span#actualPlane', pop).text( parseInt( $('span#actualPlane', pop).text() ) +1);
			popup.setTimeout(function () { recursive(obj) }, delay );
		};

		popup.setTimeout(function () { obj.fn(obj) }, delay);
	} else {
		if (typeof obj.onfinish === 'function') {
			obj.onfinish();
		}
		$('input[type="button"], input[type="radio"], select', pop).removeAttr('disabled');
		wait();
		return;
	}
}

//Affiche ou enlève le texte de chargement
function wait() {
	if ($('#wait:visible', pop).length) {
		$('#wait', pop).hide();
	} else {
		$('#wait', pop).show();
	}
}

//Compte le nombre d'avions sélectionnés
function count (alliance) {
	$('span#select' + alliance, pop).text($('input[name="ch' + alliance + '"]:checked', pop).length);
}

//Log des messages
function logAction (message, color) {
	color = (typeof color !== 'undefined') ? color : 'black';
	$('div#logContent', pop).append('<font color="' + color + '">' + new Date().toLocaleTimeString() + ' - ' + message + '</font><br />');
	if ( $('input#autoScroll:checked', pop).length ) {
		$('div#logContent', pop).scrollTop( $('div#logContent', pop)[0].scrollHeight );
	}
}

//Envoie le formulaire pour renommer un avion
function rename (id, name, obj, alliance) {
	$.ajax({
		url: 'http://' + window.location.hostname + '/chg_immatriculation.php?i=' + id + '&n=' + escape(name) + '&d=1319376005140',
		type: 'post',
		async: false,
		success: function(data) {
			if (data == 'Immatriculation%20modifi%E9e%20avec%20succ%E8s.') {
				logAction(listeGlobal[alliance][lI[id][alliance]][2] + ' : renommé en ' + name + '.', 'green');
				$('tr#tr' + id + ' span.rename', pop).text(name);
				listeGlobal[alliance][lI[id][alliance]][2] = name;
			} else {
				logAction(listeGlobal[alliance][lI[id][alliance]][2] + ' : ' + unescape(data), 'red');
			}
			if (obj) {
				obj.next();
			}
		},
		dataType: 'text'
	});
}

//Télécharge la page pour trouver la valeur d'un avion
function fetchValue (id, alliance, obj) {
	$.ajax({
		url: 'http://' + window.location.hostname + '/avion.php?vente=' + id + '&al=' + ((!alliance) ? '' : 1),
		async: false,
		type: 'get',
		success: function(data) {
			var value = parseInt((data.match(/vente: <\/u><\/b><br>(.*?) \$<br><b><u>Action/))[1].replace(/\s/g, '')),
				total = parseInt($('#calcPrice', pop).text());
			$('#calcPrice', pop).text(total + value);
			if (obj) { 
				obj.next();
			}
		},
		dataType: 'text'
	});
}

//Envoie le formulaire pour vendre un avion
function sell (id, alliance, obj) {
	$.ajax({
		url: 'http://' + window.location.hostname + '/avion.php?v=' + id + '&al=' + ((!alliance) ? '' : 1), 
		async: false,
		type: 'get',
		success: function(data) {
			logAction(listeGlobal[alliance][lI[id][alliance]][2] + ' : vendu avec succès.', 'green');
			$('tr#tr' + id, pop).remove();
			delete listeGlobal[alliance][lI[id][alliance]];
			if (obj) {
				obj.next();
			}
		},
		dataType: 'text'
	});	
}

//Télécharge la page pour trouver le prix d'une réparation et calcul le montant des réparations
function fetchPrice (id, alliance, cible, obj) {
	if (listeGlobal[alliance][ lI[id][alliance] ][5] < 100) {
		$.ajax({
			url: 'http://' + window.location.hostname + '/reparer_a.php?&id_c=' + idc + '&al=' + ((!alliance) ? '' : 1) + '&id_a=' + id,
			async: false,
			type: 'get',
			success: function(data) {
				var need = cible - listeGlobal[alliance][ lI[id][alliance] ][5],
					input = 3,
					total = parseInt($('#simulCost', pop).text());
				if (need > 10 && need <= 25) {
					input = 2;
				} else if (need > 25 && need <= 50) {
					input = 1;
				} else if (need > 50) {
					input = 0;
				}
				repairCost[id] = parseInt($('input[name="type_r"][onclick$="' + input + ')"]', data).val());
				$('#simulCost', pop).text( total + repairCost[id]);
				if (obj) { 
					obj.next();
				}
			},
			dataType: 'text'
		});	
	} else {
		if (obj) { 
			obj.next();
		}
	}
}

//Envoies le formulaire pour réparer un avion
function repair (idp, alliance, cible, obj) {
	if (typeof repairCost[idp] === 'undefined') {
		fetchPrice (idp, alliance, cible);
	}
	var need = cible - listeGlobal[alliance][ lI[idp][alliance] ][5],
		input = 10,
		newfiab = 0,
		type_r = repairCost[idp];
		if (need <= 0) {
			if (obj) {
				obj.next();
			}
			logAction(listeGlobal[alliance][lI[idp][alliance]][2] + ' : réparation inutile.', 'blue');
			return;
		} else if (need > 10 && need <= 25) {
			input = 25;
		} else if (need > 25 && need <= 50) {
			input = 50;
		} else if (need > 50) {
			input = 100;
		}
		newfiab = listeGlobal[alliance][ lI[idp][alliance] ][5] + input;
		newfiab = (newfiab > 100) ? 100 : newfiab;
	
	var url = 'http://' + window.location.hostname + '/reparation.php?' + 'id_a=' + idp + '&id_c=' + idc + '&tp=';
	url += (alliance) ? ida : '';
	url += '&nv_f=' + newfiab + '&type_r=' + type_r + '&nom_appareil=' + encodeA(listeGlobal[alliance][ lI[idp][alliance] ][2]) + '&d=' + new Date().getTime();
	
	$.ajax({
		url: url,
		async: false,
		type: 'post',
		success: function(data) {
			if (unescape(data).replace(/<\/?[^>]+(>|$)/g, "").indexOf('Demande validée') !== -1) {
				logAction(listeGlobal[alliance][lI[idp][alliance]][2] + ' : réparation de ' + input + '%, fiabilité maintenant de ' + newfiab + '% pour un coût de ' + format(type_r) + '$.', 'green');
				listeGlobal[alliance][ lI[idp][alliance] ][5] = newfiab;
				$('tr#tr' + idp + ' > td:eq(6) > span.repair', pop).text(newfiab);
				$('tr#tr' + idp + ' > td:eq(6)', pop).attr('style', 'background-color: rgb(' + (100 - newfiab) +'%,' + newfiab + '%,0%);');
			} else {
				logAction(listeGlobal[alliance][lI[idp][alliance]][2] + ' : une erreur est survenue lors de la réparation.', 'red');
			}
			if (obj) {
				obj.next();
			}
		},
		dataType: 'text'
	});
}

//Marquer un avion comme m'appartenant
function markAsMine(ida, alliance, apt, obj) {
	$.ajax({
		url: 'http://' + window.location.hostname + '/chg_immatriculation.php?i=' + ida + '&apt=' + apt + '&d=' + new Date().getTime(),
		async: false,
		type: 'post',
		success: function (response) {
			if ( (apt == 1) && (response.indexOf('signal%E9%20comme%20%E9tant%20en%20votre%20possession') > -1) ) {
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' est maintenant signalé comme vous appartenant.', 'green');
				if ( alliance == 2) {
					lI[ida][1] = listeGlobal[1].length;
					listeGlobal[1].push( listeGlobal[2][ lI[ida][2] ] );
					$('div.list2 tr#tr' + ida, pop).clone().appendTo( $('div.list1 tbody', pop) );
				}
			} else if ( (apt == 2) && (response.indexOf('signal%E9%20comme%20n%27%E9tant%20plus%20en%20votre%20possession') > -1) ) {
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' est maintenant signalé comme ne vous appartenant plus.', 'green');
				if ( alliance == 1) {
					delete listeGlobal[1][lI[ida][1]];
					delete lI[ida][1];
					$('div.list1 tr#tr' + ida, pop).remove();
				}
			}
			
			if (obj) {
				obj.next();
			}
		},
		dataType: 'text'
	});
}

//Envoies le formulaire pour configurer un appareil
function configure (ida, alliance, obj, config, options) {
	$.ajax({
		url: 'http://' + window.location.hostname + '/config_appareil2.php?idac=' + listeGlobal[alliance][lI[ida][alliance]][4] + '&n=1&is=' + ida, 
		async: false,
	});
	$.ajax({
		url: 'http://' + window.location.hostname + '/config_appareil2.php?idac=' + listeGlobal[alliance][lI[ida][alliance]][4] + '&is=' + ida, 
		data: {'idav': ida, 'info_config': config, 'info_option': options, 'nm_av': listeGlobal[alliance][lI[ida][alliance]][2]},
		type: 'post',
		async: false,
		success: function (response) {
			if (response.indexOf('Seule la direction') == -1) {
				var text = decodeA(config).replace(/;/g, '/');
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : configuration en ' + text + '.', 'green');
				$('tr#tr' + ida + ' td:eq(4)', pop).text(text);
			} else {
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : seule la direction peut valider une configuration.', 'red');
			}
			if ($('input#selectAsMine', pop).attr('checked') && alliance > 0) {
				markAsMine(ida, alliance, 1);
			}
			
			obj.next();
		},
		dataType: 'text'
	});
}

//Envoies le formulaire pour supprimer des vols
function suppVols (ida, premierVol, dernierVol, obj, alliance) {
	$.ajax({
		url: 'http://' + window.location.hostname + '/vider_avion.php?ida=' + ida, 
		data: {
			date_dep_j1: premierVol[0],
			date_dep_m1: premierVol[1],
			date_dep_a1: premierVol[2],
			date_dep_j2: dernierVol[0],
			date_dep_m2: dernierVol[1],
			date_dep_a2: dernierVol[2],
			dest: ''
		},
		type: 'post',
		async: false,
		success: function (response) {
			var nbVolsSup = parseInt((response.match(/<br\ \/><br\ \/>(.*?) vol(s?) ont été supprimé(s?).<\/i>/))[1]);
					
			if (nbVolsSup === 0) {
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : aucun vol n\'a été supprimé.', 'red');
				$('#nbSupErr', pop).text(parseInt($('#nbSupErr', pop).text()) + 1);
			} else {
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : ' + nbVolsSup +' vols ont été supprimés.', 'green');
				$('#nbVolsSupp', pop).text(parseInt($('#nbVolsSupp', pop).text()) + nbVolsSup);
				$('#nbSupSuc', pop).text(parseInt($('#nbSupSuc', pop).text()) + 1);
			}
			
			obj.next();
		},
		dataType: 'text'
	});
}

//Récupère et renvoie le planning des vols afin de les prolonger
function progVols (ida, datef, dateac, obj, alliance) {
	var modele = (dateac != '') ? '' : '1',
		modele2 = ($('input#planMod', pop).attr('checked')) ? 1 : 0;
	$.ajax({
		url: 'http://' + window.location.hostname + '/vol_present.php?chargementmodele=' + modele + '&date_ac=' + dateac + '&datef=' + datef + '&idap=' + ida, 
		type: 'get',
		async: false,
		success: function (data) {
			var infvol = '';
			
			if (data.toLowerCase().indexOf("array") === -1){
				if (data !== '' && typeof data !== "undefined"){
					var str = data.split(';'), str2 = '';
					str.pop();
					for (var i = 0, c = str.length; i < c; i++) {
						str2 = str[i].split('i');
						infvol += "=" + str2[1] + "i" + (parseInt(str2[1]) + 1) + "i" + str2[0] + ".";  
					}

					if (infvol !== '' || infvol !== null || typeof infvol !== "undefined"){
						$.ajax({
							url: 'http://' + window.location.hostname + '/vol_present.php',
							data: 'appareil=' + ida + '&datef=' + datef + '&infovol=' + encodeURIComponent(infvol) + '&planningmodele=' + modele2 + '&repetition=' + $('select#repetProgVols', pop).val() + '&signal=0&supvol=',
							type: 'post',
							async: false,
							headers: {
								"X-Requested-With": "XMLHttpRequest",
								"Content-Type": "application/x-www-form-urlencoded",
								"Accept": "*/*"
							},
							success: function (reponse) {
								if (reponse.indexOf("Aucun") === 0) {
									logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : ' + reponse, 'red');
									$('#nbProgErr', pop).text(parseInt($('#nbProgErr', pop).text()) + 1);
								} else {
									logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : ' + reponse, 'green');
									$('#nbVolsProg', pop).text(parseInt($('#nbVolsProg', pop).text()) + parseInt(reponse.match(/^(.*?) vols/)));
									$('#nbProgSuc', pop).text(parseInt($('#nbProgSuc', pop).text()) + 1);   
								}
							}
						});
					} else {
						//une erreur s'est produite
						logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : une erreur est survenue.', 'red');
						$('#nbProgErr', pop).text(parseInt($('#nbProgErr', pop).text()) + 1);
					}
				} else {
					//aucun planning n'a été trouvé
					logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : aucun planning n\'a été trouvé.', 'blue');
					$('#nbProgPlan', pop).text(parseInt($('#nbProgPlan', pop).text()) + 1);
				}
			} else {
				//une erreur s'est produite
				logAction(listeGlobal[alliance][lI[ida][alliance]][2] + ' : le planning contient des vols ne vous appartenant pas.', 'red');
				$('#nbProgErr', pop).text(parseInt($('#nbProgErr', pop).text()) + 1);
			}
			
			obj.next();
		},
		dataType: 'text'
	});
}

//Créer le rendu du corps des tableaux contenant la liste des appareils pour les deux types d'affichage
function renderTableContent (liste, e, alliance) {
	for (var i = 0, c = liste.length, nom = '', html = '', date; i < c; i++) {
		nom = (liste[i][2] == '') ? '-' : liste[i][2];
		date = new Date(liste[i][4]*1000);
		html += '<tr id="tr' + liste[i][0] + '">'
					+ '<td><input type="checkbox" id="' + liste[i][0] + '" value="' + liste[i][0] + '" name="ch' + alliance + '" planeType="' + e + '" /></td>'
					+ '<td><span class="stats click">' + liste[i][0] + '</span></td>'
					+ '<td>' + liste[i][1] + '</td>'
					+ '<td><span class="rename click">' + nom + '</span></td>'
					+ '<td>' + liste[i][3] + '</td>'
					+ '<td>' + zeroPad(date.getDate(), 2) + '-' + zeroPad(date.getMonth(), 2) + '-' + date.getFullYear() + '</td>'
					+ '<td style="background-color: rgb(' + (100-liste[i][5])+'%,' + liste[i][5] + '%,0%);"><span class="repair click">' + liste[i][5] + '</span></td>'
					+ '<td style="background-color: rgb(' + (100-liste[i][6])+'%,' + liste[i][6] + '%,0%);">' + liste[i][6] + '</td>'
				+ '</tr>';
	}
	
	return html;
}

//Créer le rendu des tableaux contenant la liste des appareils
function table(liste, alliance) {	
	$('div[class^="list"]', pop).css('display', 'none');
	$('div.list' + alliance, pop).css('display', 'block');
	
	var e = 1,
		c = liste.length,
		html = c + ' avions trouvés, <span id="select' + alliance + '">0</span> avions sélectionnés<br />';
	
	if ( parseInt($('input[name=affichage]:checked', pop).val()) ) {
		liste = liste.slice(0).multiSort(1);
		liste = liste.separate(1);
		var e = liste.length;
		
		html += '<input type="checkbox" name="chAll' + alliance + '" id="selectAll' + alliance + '" value="-1" /><label for="selectAll' + alliance + '">Tout sélectionner</label><br /><br />'
		
		for (var j = 0; j < e; j++) {
			html += liste[j].length + ' ' + liste[j][0][1] + '<br />'
				+ '<table border="1" class="liste">'
					+ '<thead>'
						+ '<tr>'
							+ '<th style="width:40px;"><input type="checkbox" name="chAll' + alliance + '" value="' + j + '" /></th>'
							+ '<th>ID</th>'
							+ '<th>Type</th>'
							+ '<th>Nom</th>'
							+ '<th style="width:130px;">Config</th>'
							+' <th style="width:130px;">Date</th>'
							+' <th style="width:100px;">Fiabilité</th>'
							+' <th style="width:100px;">Utilisation</th>'
						+ '</tr>'
					+ '</thead>'
					+ '<tbody>';
			html += renderTableContent(liste[j], j, alliance);
			html += '</tbody></table><br />';
		}
	} else {
		html += ''
			+ '<table border="1" class="liste">'
				+ '<thead>'
					+ '<tr>'
						+ '<th style="width:40px;"><input type="checkbox" name="chAll' + alliance + '" value="' + e + '" /></th>'
						+ '<th>ID</th>'
						+ '<th>Type</th>'
						+ '<th>Nom</th>'
						+ '<th style="width:130px;">Config</th>'
						+' <th style="width:130px;">Date</th>'
						+' <th style="width:100px;">Fiabilité</th>'
						+' <th style="width:100px;">Utilisation</th>'
					+ '</tr>'
				+ '</thead>'
				+ '<tbody>';
				
		html += renderTableContent(liste, e, alliance);
		
		html += '</tbody></table><br /></div>';	
	}
	
	$('div.list' + alliance, pop).html(html);
	$('input[name="chAll' + alliance + '"]', pop).change(function() {
		var input = $(this),
			selector = (input.val() == "-1" ) ? 'input[name="ch' + alliance + '"]' : 'input[name="ch' + alliance + '"][planeType="' + input.val() + '"]';
		if (input.is(':checked')) {
			$(selector, pop).attr("checked", true);
		} else {
			$(selector, pop).attr("checked", false);
		}
		count(alliance);
	});
	$('input[name="ch' + alliance + '"]', pop).change(function() {
		count(alliance);
	});
	$('div.list' + alliance + ' span.rename', pop).click(function(e) {
		wait();
		var newName = popup.prompt('Nouveau nom ?', e.target.textContent);
		if (newName && newName != e.target.textContent) {
			rename($(this).parent().parent().attr('id').slice(2), newName, false, alliance);
		}
		wait();
	});
	$('div.list' + alliance + ' span.stats', pop).click(function(e) {
		window.open( 'http://' + window.location.hostname + '/stat_avion.php?ida=' + $(this).parent().parent().attr('id').slice(2) );
	});
	$('div.list' + alliance + ' span.repair', pop).click(function(e) {
		wait();
		if (!$('div#macroRepair:visible', pop).length) {
			$('div#macroRepair', pop).show();
		}
		$('#simulCost', pop).text('0');
		repair ($(this).parent().parent().attr('id').slice(2), alliance, parseFloat($('#fiabiCible', pop).val()), {next: function() { return; } });
		$('#simulCost', pop).text( format( parseInt( $('#simulCost', pop).text() ) ) + ' $' );
		wait();
	});
	wait();
}

function startOpe(inputId) {
	var	alliance = parseInt($('div:visible[class^="list"]', pop).attr('class').charAt(4)),
		checked = [];
	switch (inputId) {
		case 'startRename':
			if ($('#replaceName1', pop).val().length && $('#replaceName2', pop).val().length) {
				var toReplace = $('#replaceName1', pop).val(),
					replace = $('#replaceName2', pop).val(),
					name = '';
				
				if (toReplace != replace) {
					$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
						checked.push(parseInt($(this).val()));
					});
					
					recursive({
						'list' : checked,
						'fn' : function (obj) {
							name = $('tr#tr' + obj.list[0] + ' td:eq(3)', pop).text().replace(toReplace, replace);
							if (name != $('tr#tr' + obj.list[0] + ' span.rename', pop).text()) {
								rename(obj.list[0], name, obj, alliance);
							} else {
								obj.next();
							}
						}		
					});	
				} else {
					alert('Vous devez saisir deux valeurs différentes pour la recherche.');
					wait();
				}
			} else if ($('#macroPas', pop).val().length && $('#macroMin', pop).val().length && $('#macroName', pop).val().length &&  $('#macroNum', pop).val().length) {
				var pas = parseInt($('#macroPas', pop).val()),
					i = parseInt($('#macroMin', pop).val()),
					macro = $('#macroName', pop).val(),
					nbChif = parseInt($('#macroNum', pop).val()),
					id = 0,
					name = '';
					
				$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
					checked.push(parseInt($(this).val()));
				});
				
				recursive({
					'list' : checked,
					'fn' : function (obj) {
						id = obj.list[0];
						name = (macro.indexOf('{x}') != -1) ? macro.replace('{x}', zeroPad(i, nbChif)) : macro;
						i = i + pas;
						if (name != $('tr#tr' + id + ' span.rename', pop).text()) {
							rename(id, name, obj, alliance);
						} else {
							obj.next();
						}
					}
				});
			} else {
				alert('Vous n\'avez pas rempli tous les champs');
			}
		break;
		
		case 'startCalcPrice':
			$('#calcPrice', pop).text('0');
					
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				checked.push(parseInt($(this).val()));
			});
				
			recursive({
				'list' : checked,
				'fn' : function (obj) {
					fetchValue(obj.list[0], alliance, obj);
				},
				'onfinish' : function() {				
					$('#calcPrice', pop).text( format( parseInt( $('#calcPrice', pop).text() ) ) + ' $' );					
				}
			});
		break;
		
		case 'startSell':
			if (popup.confirm('Voulez-vous vraiment revendre ces appareils ?')) {
				$('#calcPrice', pop).text('0');
						
				$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
					checked.push(parseInt($(this).val()));
				});
				
				recursive({
					'list' : checked,
					'fn' : function (obj) {
						fetchValue(obj.list[0], alliance);
						sell(obj.list[0], alliance, obj);
					},
					'onfinish' : function() {				
						$('#calcPrice', pop).text( format( parseInt( $('#calcPrice', pop).text() ) ) + ' $' );	
						count();				
					}
				});				
			}
		break;
		
		case 'startSimul':
			$('#simulCost', pop).text('0');
					
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				checked.push(parseInt($(this).val()));
			});
				
			recursive({
				'list' : checked,
				'fn' : function (obj) {
					fetchPrice(obj.list[0], alliance, parseFloat($('#fiabiCible', pop).val()), obj);
				},
				'onfinish' : function() {				
					$('#simulCost', pop).text( format( parseInt( $('#simulCost', pop).text() ) ) + ' $' );					
				}
			});
		break;
		
		case 'startRepair':
			$('#simulCost', pop).text('0');
					
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				checked.push(parseInt($(this).val()));
			});
			
			recursive({
				'list' : checked,
				'fn' : function (obj) {
					repair(obj.list[0], alliance, parseFloat($('#fiabiCible', pop).val()), obj);
				},
				'onfinish' : function() {				
					$('#simulCost', pop).text( format( parseInt( $('#simulCost', pop).text() ) ) + ' $' );					
				}
			});
		break;
		
		case 'startSelect':
			var criteres = [[true, [$('#selectByID1', pop).val(), $('#selectByID2', pop).val()], 0],
							[false, $('#selectByType', pop).val(), 1],
							[false, $('#selectByName', pop).val(), 2],
							[true, [$('#selectByFiabi1', pop).val(), $('#selectByFiabi2', pop).val()], 5],
							[true, [$('#selectByUtil1', pop).val(), $('#selectByUtil2', pop).val()], 6]							
							],
				fn = {true : compareNumber, false : compareText};

			$('input[name="ch' + alliance + '"]', pop).attr("checked", false);
			
			var i = (typeof lI[criteres[1][0][alliance]] !== "undefined") ? lI[criteres[1][0][alliance]] : 0,
				c = (typeof lI[criteres[1][1][alliance]] !== "undefined") ? lI[criteres[1][1][alliance]] : listeGlobal[alliance].length;
			
			for (var selector = [''], bool = false, g = 0, h = 0; i < c; i++) {	
				for (var j = 0, d = criteres.length; j < d; j++) {					
					if ( criteres[j][0] ) {
						if ( (!criteres[j][1][0].length) && (!criteres[j][1][1].length) ) {
							continue;
						}
					} else {
						if ( !criteres[j][1].length ) {
							continue;
						}
					}
					
					if ( fn[criteres[j][0]]( criteres[j][1], listeGlobal[alliance][i][criteres[j][2]] ) ) {
						bool = true;
						continue;
					} else {
						bool = false;
						break;
					}
				}
				if (bool) {
					selector[h] += 'input#' + listeGlobal[alliance][i][0] + ', ';
					bool = false;
					g++;
					if (g > 350) {
						g = 0;
						h++;
						selector.push('');
					}
				}
			}

			for (var i = 0; i <= h; i++) {
				$(selector[i].slice(0, -1), pop).attr('checked', true);
			}			
			
			count(alliance);		
			wait();	
		break;
		
		case 'startConfig':
			var type = '';
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				if (!checked.length) {
					type = $('tr#tr' + $(this).val() + ' td:eq(2)', pop).text();
				} else {
					if ($('tr#tr' + $(this).val() + ' td:eq(2)', pop).text() != type) {
						type = false;
						popup.alert('Vous devez selectionner des avions du même type.');
						return false;
					}
				}
				checked.push(parseInt($(this).val()));
			});
			if (!type && checked.length) {
				wait();
				logAction('Vous devez selectionner des avions du même type pour la configuration.', 'red');
				break;
			} else if (!checked.length) {
				wait();
				logAction('Aucun avion sélectionné pour la configuration.', 'blue');
				break;
			}

			$.ajax({
				url: 'http://' + window.location.hostname + '/config_appareil2.php?idac=' + listeGlobal[alliance][lI[checked[0]][alliance]][4] + '&n=1&is=' + checked[0], 
				async: false,
				type: 'get',
				success: function(data) {
					placeMax = parseInt( (data.match(/window\['place_max_total'\]=(\d+);/))[1] );
					var html = '<input type="button" value="Tout sélectionner" name="selectOptionsAll" /> <input type="button" value="Rien sélectionner" name="selectOptionsNone" /><table><tbody><tr>',
						l = 0;
					$('input[name^="ption"]', data).each(function() {
						var id = 'o' + $(this).attr('name'),
							text = $(this).parent().text(),
							check = (typeof $(this).attr('checked') !== 'undefined') ? 'checked="checked"' : '';
						if (l === 3) {
							l = 0;
							html += '</tr><tr>'
						}
						html += '<td><input type="checkbox" ' + check + ' value="' + id + '" id="' + id + '" name="options" /><label for="' + id + '">' + text + '</label></td>';
						l++;
					});
					$('#configOptions', pop).html('</tr></tbody></table>' + html);
					$('input[name^="selectOptions"]', pop).click(function (e) {
						if ($(this).attr('name').indexOf('All') != -1) {
							$('input:checkbox[name="options"]', pop).attr("checked", true);
						} else {
							$('input:checkbox[name="options"]', pop).attr("checked", false);							
						}
					});
					logAction(type + ' : informations pour la configuration récupérées.', 'green');
				},
				dataType: 'html'
			});

			var config = listeGlobal[alliance][lI[checked[0]][alliance]][3].split('/'),
				evt = document.createEvent("HTMLEvents");
				
			evt.initEvent("change", true, true);

			$('#blocConfig', pop).css('display', 'block');
			$('#configEco', pop).attr('max', placeMax).val(parseInt(config[0]));
			pop.getElementById('configEco').dispatchEvent(evt);
			$('#configBiz', pop).attr('max', Math.floor(placeMax/1.8)).val(parseInt(config[1]));
			pop.getElementById('configBiz').dispatchEvent(evt);
			$('#configFir', pop).attr('max', Math.floor(placeMax/4.2)).val(parseInt(config[2]));
			pop.getElementById('configFir').dispatchEvent(evt);

			$('#plRest', pop).text(placeMax - Math.floor(parseInt($('#configEco', pop).val()) + parseInt($('#configBiz', pop).val())*1.8 + parseInt($('#configFir', pop).val())*4.2));

			wait();
		break;
		
		case 'startApplyConfig':
			var config = encodeA($('#configEco', pop).val() + ';' + $('#configBiz', pop).val() + ';' + $('#configFir', pop).val()),
				options = '',
				type = '';
				
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				if (!checked.length) {
					type = $('tr#tr' + $(this).val() + '" td:eq(2)', pop).text();
				} else {
					if ($('tr#tr' + $(this).val() + '" td:eq(2)', pop).text() != type) {
						type = false;
						popup.alert('Vous devez selectionner des avions du même type.');
						return false;
					}
				}
				checked.push(parseInt($(this).val()));
			});
			if (!type && checked.length) {
				wait();
				logAction('Vous devez selectionner des avions du même type pour la configuration.', 'red');
				break;
			} else if (!checked.length) {
				wait();
				logAction('Aucun avion sélectionné pour la configuration.', 'blue');
				break;
			}
				
			$('input:checked[name="options"]', pop).each(function () {
				options += $(this).val() + ';';
			});
			
			options = encodeA(options);
			
			recursive({
				'list' : checked,
				'fn' : function (obj) {
					configure (obj.list[0], alliance, obj, config, options);
				}
			});
		break;
		
		case 'startSuppVol':
			var premierVol = $('#pvol', pop).val().split("/"),			
				dernierVol = $('#dvol', pop).val().split("/");
				
			$('#nbVolsSupp, [id^="nbSup"]', pop).text(0);
				
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				checked.push(parseInt($(this).val()));
			});		
			
			recursive({
				'list' : checked,
				'fn' : function (obj) {
					suppVols (obj.list[0], premierVol, dernierVol, obj, alliance);
				}
			});				
		break;
		
		case 'startProgVol':
			var datef = encodeURIComponent($('input#semaineDu', pop).val()),
				dateac = ($('select#planning', pop).val() == '0') ? encodeURIComponent($('input#aSemaineDu', pop).val()) : '';	
			
			if(!planningOpened) {
				planningOpened = true;
				$.ajax({url: 'http://' + window.location.hostname + '/programmation_vol_par_avion.php', async: false});
			}
			
			if ($('#planning', pop).val() !== 'a') {
				$('span#nbVolsProg, span[id^="nbProg"]', pop).text(0);
			
				$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
					checked.push(parseInt($(this).val()));
				});	
				
				recursive ({
					'list' : checked,
					'fn' : function (obj) {
						progVols (obj.list[0], datef, dateac, obj, alliance);
					}
				});	
			} else {
				logAction('Veuillez sélectionner le type de planning à utiliser comme source (semaine précédent ou planning modèle).', 'red');
				wait();
			}
		break;
	
		case 'startMarkAsMine':
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				checked.push(parseInt($(this).val()));
			});	
			
			recursive ({
				'list' : checked,
				'fn' : function (obj) {
					markAsMine (obj.list[0], alliance, 1, obj)
				}
			});	
		break;
		
		case 'startMarkAsNotMine':
			$('input:checked[name="ch' + alliance + '"]', pop).each(function () {
				checked.push(parseInt($(this).val()));
			});	
			
			recursive ({
				'list' : checked,
				'fn' : function (obj) {
					markAsMine (obj.list[0], alliance, 2, obj)
				}
			});	
		break;
	}
}

//Ouvre la popup et gére les événments
function openWindow() {
	popup = window.open('about:blank', 'LiteList','width=' + screen.width + ',height=' + screen.height + ',scrollbars=yes');
	pop = popup.document;
	
	var date = new Date(), mois = date.getMonth() + 1, annee = date.getYear() + 1900, annee2 = annee + 1, today = zeroPad(date.getDate(), 2) + '/' + zeroPad(mois, 2) + '/' + annee, tomorrow = zeroPad(date.getDate(), 2) + '/' + zeroPad(mois, 2) + '/' + annee2;
	
	//Ecrie le rendu de la page
	pop.write( '<!DOCTYPE>'
		+ '<html>'
		+ '<head>'
			+ '<link href="favicon.ico" type="image/x-icon" rel="SHORTCUT ICON">'
			+ '<style>'
				+ '.click {cursor: pointer;text-decoration: underline;}'
				+ 'table.liste {margin-left:auto;margin-right:auto;border:1px solid;width:100%;border-collapse:collapse;}'
				+ 'table.liste td  {text-align: center;}'
				+ 'tr.background td {background-color: #8888FF!IMPORTANT;}'
				+ '.divSuc{color: green;}'
				+ '.divEch{color: blue;}'
				+ '.divErr{color: red;}'
			+ '</style>'
			+ '<title>Lite List v' + version + '</title>'
		+ '</head>'
		+ '<body>'
		+ '<div style="text-align: center;">'
			+ '<h3>Lite List v' + version + '</h3>'
			+ 'idc : <span id="IDC">' + idc + '</span> <input type="button" value="Actualiser" id="findIDC" /><br />'
			+ 'ida : <span id="IDA">' + ida + '</span> <input type="button" value="Actualiser" id="findIDA" /><br /><br />'
			+ 'Afficher les <select id="changeList">'
				+ '<option value="a">-- Veuillez sélectionner</option>'
				+ '<option value="0">appareils personnels</option>'
				+ '<option value="1">appareils de l\'alliance vous appartenant</option>'
				+ '<option value="2">tous les appareils de l\'alliance</option>'
			+ '</select><br />'
			+ '<input type="radio" id="affG" name="affichage" value="0" checked="checked"/><label for="affG">Liste globale </label>'
			+ '<input type="radio" id="affS" name="affichage" value="1"/><label for="affS">Séparer les appareils par type</label><br />'
			+ '<input type="button" id="forceUpdate" value="Forcer l\'actualisation de la page" /><br />'
			+ '<div style="text-align: left;">'
				+ 'Opérations :<br />'
				+ '<span class="hideDiv click" divTarget="macroSelect">- Sélectionner</span><br />'
				+ '<div id="macroSelect" style="display:none;margin-left: 20px;">'
					+ 'Cette macro permet en toute simplicité de sélectionner plusieurs appareils à partir de nombreux critères. Vous pouvez laisser un champ vide pour qu\'il ne soit pas pris en compte.<br />'
					+ '<table><tbody>'
					+ '<tr>'
						+ '<td>ID allant de </td>'
						+ '<td><input type="number" id="selectByID1" placeholder="0" size="6" /> à <input type="number" id="selectByID2" placeholder="5000" size="6" /></td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td>Type contenant :</td>'
						+ '<td><input type="text" id="selectByType" placeholder="Airbus" size="20" /></td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td>Nom contenant :</td>'
						+ '<td><input type="text" id="selectByName" placeholder="Alc" size="20" /></td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td>Fiabilité allant de </td>'
						+ '<td><input type="number" id="selectByFiabi1" placeholder="0" size="6" /> à <input type="number" id="selectByFiabi2" placeholder="100" size="6" /></td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td>Utilisation allant de </td>'
						+ '<td><input type="number" id="selectByUtil1" placeholder="0" size="6" /> à <input type="number" id="selectByUtil2" placeholder="100" size="6" /></td>'
					+ '</tr>'
					+ '<tr><td colspan="2"><input type="button" id="startSelect" value="Sélectionner à partir de ces critères"/></td></tr>'
					+ '</tbody></table>'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="macroRename">- Renommer</span><br />'
				+ '<div id="macroRename" style="display:none;margin-left: 20px;">'
					+ 'Vous avez la possibilité d\'utiliser une macro afin de renommer les appareils sélectionner. Cette macro fonctionne avec une variable {x} qui peut être incrémenter du pas choisi (le pas peut être négatif) à partir du x minimum. Le nombre de chiffres permet quant à lui d\'écrire la variable avec plusieurs chiffres. Exemple : 007.<br />'
					+ '<table><tbody><tr><td>Macro : </td><td><input type="text" id="macroName" placeholder="test-{x}-alkd" size="10" /></td></tr>'
					+ '<tr><td>Pas   : </td><td><input type="text" id="macroPas" placeholder="1" size="10" /></td></tr>'
					+ '<tr><td>xMin  : </td><td><input type="text" id="macroMin" placeholder="666" size="10" /></td></tr>'
					+ '<tr><td>Nombre de chiffres : </td><td><input type="text" id="macroNum" placeholder="1" size="10" /></td></tr>'
					+ '<tr><td colspan="2">Vous avez également la possibilité d\'effectuer une recherche dans le nom des avions pour le remplacer par une valeur.</td></tr>'
					+ '<tr><td>Rechercher : </td><td><input type="text" id="replaceName1" placeholder="AAA" size="10" /></td></tr>'
					+ '<tr><td>Remplacer par :</td><td><input type="text" id="replaceName2" placeholder="BBB" size="10" /></td></tr></tbody></table>'
					+ '<input type="button" id="startRename" value="Renommer !" />'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="macroRepair">- Réparer</span><br />'
				+ '<div id="macroRepair" style="display:none;margin-left: 20px;">'
					+ 'La réparation de vos appareils via un contrat peut être désavantageuse selon le type d\'appareils que vous utilisez. Cette macro permet en toute simplicité de réparer les appareils sélectionnés. La fiabilité ciblé permet de choisir jusqu\' quelle fiabilité devront atteindre vos appareils pour que la macro s\'arrête. Vous avez également la possibilité de calculer le coût des réparations avant de lancer la macro.<br />'
					+ 'Fiabilité ciblée : <input type="text" id="fiabiCible" value="100" size="10" /><br />'
					+ '<input type="button" id="startSimul" value="Calculer le coût des réparations" /><br />'
					+ 'Les réparations vous coûteront : <span id="simulCost">0 $</span><br />'
					+ '<input type="button" id="startRepair" value="Réparer les appareils sélectionnés !" />'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="macroConfigure">- Configurer</span><br />'
				+ '<div id="macroConfigure" style="display:none;margin-left: 20px;">'
					+ 'Ce module peut configurer ou reconfigurer plusieurs appareils d\'un <b>même type</b> en quelques clicks.<br />'
					+ '<input type="button" id="startConfig" value="Commencer la configuration" />'
					+ '<div id="blocConfig" style="display:none;"><br /><br />'
						+ 'Quelle configuration voulez-vous appliquer à vos appareils ?<br />'
						+ '<table>'
							+ '<tr>'
								+ '<td>Classe économique : </td>'
								+ '<td><input id="configEco" class="rangeConfig" type="range" step="1" min="0" value="0" style="width: 750px;" /></td>'
								+ '<td id="configEcoNow">0</td>'
							+ '</tr>'
							+ '<tr>'
								+ '<td>Classe business : </td>'
								+ '<td><input id="configBiz" class="rangeConfig" type="range" step="1" min="0" value="0" style="width: 750px;" /></td>'
								+ '<td id="configBizNow">0</td>'
							+ '</tr>'
							+ '<tr>'
								+ '<td>Classe affaire : </td>'
								+ '<td><input id="configFir" class="rangeConfig" type="range" step="1" min="0" value="0" style="width: 750px;" /></td>'
								+ '<td id="configFirNow">0</td>'
							+ '</tr>'
						+ '</table><br />'
						+ '<div id="configOptions"></div><br />'
						+ '<input type="checkbox" id="selectAsMine" checked="checked"><label for="selectAsMine">Sélectionner ces appareils comme m\'appartenant.</label><br />'
						+ 'Places restantes : <span id="plRest">0</span><br />'
						+ 'Coût de la config : <span id="configCost">0 $</span><br />'
						+ '<input type="button" id="startApplyConfig" value="Configurer !" /><br />'
					+ '</div>'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="macroSell">- Revendre</span><br />'
				+ '<div id="macroSell" style="display:none;margin-left: 20px; color: red;">'
					+ 'Attention, la revente d\'appareils dans votre flotte personnelle est complément irréversible !! <br />'
					+ 'Avant la revente de vos avions, vous avez la possibilité de calculer combien ils valent.<br />'
					+ '<input type="button" id="startCalcPrice" value="Calculer la valeur des avions selectionnés" /><br />'
					+ 'Vos avions valent : <span id="calcPrice">0 $</span><br />'
					+ '<input type="button" id="startSell" value="Revendre les appareils sélectionnés !" />'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="suppVol">- Supprimer des vols</span><br />'
				+ '<div id="suppVol" style="display:none;margin-left: 20px;">'
					+ 'Ce module permet de supprimer les vols de vos appareils sur une période donnée. La suppression des vols ne détruits pas vos plannings modèles.<br />'
					+ '<table><tbody>'
						+ '<tr><td>Premier vol : </td><td><input type="text" id="pvol" class="date" value="' + today + '"/></td></tr>'
						+ '<tr><td>Dernier vol : </td><td><input type="text" id="dvol" class="date" value="' + tomorrow + '"/></td></tr>'
					+ '</tbody></table><br />'
					+ '<input type="button" id="startSuppVol" value="Commencer la supression" /><br /><br />'
					+ 'Résultat : <br />'
					+ '<div style="margin-left: 20px;">'
						+ '- En tout, <span id="nbVolsSupp" class="divSuc">0</span> vols ont été supprimés.<br />'
						+ '- Les vols de <span class="divSuc" id="nbSupSuc">0</span> avions ont pu être supprimés.<br />'
						+ '- Les vols de <span class="divErr" id="nbSupErr">0</span> avions n\'ont pas pu être supprimés.<br />'
					+ '</div><br />'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="sauvPro">- Sauvegarde prolongée</span><br />'
				+ '<div id="sauvPro" style="display:none;margin-left: 20px;">'
					+ 'La sauvegarde prolongée permet de prolonger les plannings de vos vols à partir des plannings modèles ou à partir d\'une date passée.<br />'
					+ 'Charger d\'après : '
					+ '<select id="planning">'
						+ '<option value="a">-- Veuillez sélectionner</option>'
						+ '<option value="0">Une semaine précédente</option>'
						+ '<option value="1">Planning-Modèle</option>'
					+ '</select><br />'					
					+ '<table><tbody>'
						+ '<tr><td>Semaine du : </td><td><input type="text" id="semaineDu" class="date" value="' + today + '"/></td></tr>'
						+ '<tr id="hiddenTr" style="visibility: hidden;"><td>A partir de la semaine : </td><td><input type="text" id="aSemaineDu" class="date" value="' + today + '"/></td></tr>'
						+ '<tr><td>Répétition : </td><td><select id="repetProgVols">'
							+ '<option value="0">Pas de répétition</option>'
							+ '<option value="1">1 semaines</option>'
							+ '<option value="2">2 semaines</option>'
							+ '<option value="3">3 semaines</option>'
							+ '<option value="4" selected="selected">4 semaines</option>'
						+ '</select></td></tr>'
					+ '</tbody></table><br />'
					+ '<input type="checkbox" id="planMod" /><label for="planMod">Enregistrer en tant que Planning-modèle</label><br /><br />'
					+ '<input type="button" id="startProgVol" value="Commencer la prolongation des vols" /><br /><br />'
					+ 'Résultat : <br />'
					+ '<div style="margin-left: 20px;">'
						+ '- En tout, <span id="nbVolsProg" class="divSuc">0</span> vols ont été enregistrés.<br />'
						+ '- Les vols de <span class="divSuc" id="nbProgSuc">0</span>  avions ont été prolongés.<br />'
						+ '- <span class="divEch" id="nbProgPlan">0</span> avions n\'ont pas de planning.<br />'
						+ '- <span class="divErr" id="nbProgErr">0</span> erreurs sont survenues.<br />'
					+ '</div>'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="divMark">- Selectionner des appareils comme vous appartenant</span><br />'
				+ '<div id="divMark" style="display:none;margin-left: 20px;">'
					+ 'Marquer un appareil comme vous appartenant ou pas pour les avions d\'alliance.<br />'
					+ '<input type="button" value="Marquer comme m\'appartenant" id="startMarkAsMine" /><br />'
					+ '<input type="button" value="Marquer comme ne m\'appartenant plus" id="startMarkAsNotMine" />'
				+ '</div>'
				+ '<span class="hideDiv click" divTarget="divLog">- Journal</span><br />'
				+ '<div id="divLog" style="display:none;margin-left: 20px;">'
					+ 'Le journal contient toutes les actions que vous avez effectuées durant la session. Il vous sera utile en cas de problèmes.<br />'
					+ '<input type="checkbox" id="autoScroll" checked="checked" /><label for="autoScroll">Auto-scroll</label>'
					+ '<div id="logContent" style="width:855px; height:163px; overflow:auto; border:1px solid black;border-radius:5px;"></div>'
				+ '</div>'
			+ '</div><br />'
			+ '<span id="wait" style="display:none;color:red;">Veuillez patienter. <span id="actualPlane">0</span>/<span id="planeTotal">0</span></span><br /><br />'
			+ '<div class="list0"></div>'
			+ '<div class="list1"></div>'
			+ '<div class="list2"></div>'
		+ '</div>'
		+ '</body></html>');


	//Change la liste des avions
	$("select#changeList", pop).change(function () {
		if ($(this).val() != 'a') {
			wait();
			popup.setTimeout(function() { getPage (parseInt($("#changeList", pop).val()), true) }, 50);
		}
	});
	
	//Change le mode de programmation
	$('select#planning', pop).change(function () {
		if ($(this).val() == '0') {
			$('tr#hiddenTr', pop).css('visibility', 'visible');
		} else {
			$('tr#hiddenTr', pop).css('visibility', 'hidden');
		}
	});
	
	//Actualise la liste
	$('#forceUpdate', pop).click(function () {
		if ($("#changeList", pop).val() != 'a') {
			wait();
			popup.setTimeout(function() { getPage (parseInt($("#changeList", pop).val()), true) }, 50);
		}
	});
	
	//Gére l'affichage ou non des blocs des opérations
	$('span.hideDiv', pop).click(function (e) {
		var divTarget = 'div#' + $(this).attr('divtarget');
		if ($(divTarget + ':visible', pop).length) {
			$(divTarget, pop).hide();
		} else {
			$(divTarget, pop).show();
		}
	});
	
	//Modifie les informations necessaires à la configuration
	$('.rangeConfig', pop).change(function(e) {
		$('#' + $(this).attr('id') + 'Now', pop).text($(this).val());
		$('#plRest', pop).text(placeMax - Math.floor(parseInt($('#configEco', pop).val()) + parseInt($('#configBiz', pop).val())*1.8 + parseInt($('#configFir', pop).val())*4.2));
		$('#configCost', pop).text(format(parseInt($('#configEco', pop).val())*15000 + parseInt($('#configBiz', pop).val())*50000 + parseInt($('#configFir', pop).val())*95000) + ' $');
	});
	
	//Actualise l'IDC pour les compagnies ayant reset
	$('input#findIDC', pop).click(function (e) {
		fetchIDC ();
		idc = GM_getValue(host + '.idc');
		$('#IDC', pop).text(idc);
	});
	
	//Actualise l'IDA pour les compagnies ayant changé
	$('input#findIDA', pop).click(function (e) {
		fetchIDA ();
		ida = GM_getValue(host + '.ida');
		$('#IDA', pop).text(ida);
	});
	
	//Attribue les événements pour les différentes macros
	$('input[id^="start"]:button', pop).click(function (e) {
		var id  = $(this).attr('id');
		wait();
		popup.setTimeout(function() { startOpe(id) }, 50);
	});
	
	//Change le type d'affichage
	$('input[name="affichage"]', pop).change(function () {
		if ($("#changeList", pop).val() != 'a') {
			wait();
			popup.setTimeout(function() { table(listeGlobal[parseInt($("#changeList", pop).val())], parseInt($("#changeList", pop).val()) ) }, 50 );
		}
	});
	
	popup.stop();
	popup.focus();
	unsafeWindow.onbeforeunload = function (e) {
		var e = e || window.event;  
		  
		if (e) {  
			e.returnValue = 'Si vous fermez ou changez de page, Lite List ne fonctionnera plus.';  
		}  

		return "Si vous fermez ou changez de page, Lite List ne fonctionnera plus.";
	};
	window.onunload = function() {
		popup.close();
	};
	popup.onunload = function() {
		unsafeWindow.onbeforeunload = null;
	};
}

//Télécharge la page des avions
function getPage (alliance, force) {
	if (listeGlobal[alliance].length && !force) {
		var affichage = parseInt($('input[name=affichage]:checked', pop).val());
		if ( (affichage && $('div.list' + alliance + ' table.liste', pop).length > 1) || (!affichage && $('div.list' + alliance + ' table.liste', pop).length == 1) ) {
			$('div[class^="list"]', pop).hide();
			$('div.list' + alliance, pop).show();
			wait();
		} else {
			table(listeGlobal[alliance].slice(0), alliance);
		}
	} else {	
		var url = 'http://' + window.location.hostname + '/avion.php';
		url += (alliance) ? '?al=1&mm=' + alliance : '';
		
		$.ajax({
			url: url, 
			async: false,
			type: 'get',
			cache: false,
			beforeSend : function(xhr) {
				xhr.overrideMimeType('text/html; charset=ISO-8859-1');
			},
			success: function (data) {
				var regex = /<div id='(.*?)no' style='color:[^"]*'>(.*?) <a href='javascript:void\(0\);' [^"]*<input type=text name='[^"]*' value="(.*?)" maxlength=13>[^"]* sièges \((.*?)\)<br>[^"]*<b><u>Date D'achat:<\/u><\/b><\/td><td>[^"]*<\/td><\/tr>[^-]*onclick="param\('config_appareil\.php\?idac=(.*?)&n=[^-]*Fiabilité :<\/u><\/b><\/td><td>(.*?) %[^"]*Utilisation<\/u><\/b><\/td><td valign=bottom>(.*?)%<\/td><\/tr>/g,
					match,
					liste = [],
					i = 0;
					
				while (match = regex.exec(data)) {
					match.shift();
					liste.push([parseInt(match[0]), match[1], match[2], match[3], parseInt(match[4]), parseFloat(match[5]), parseInt(match[6])]);
					lI[match[0]] = (typeof lI[match[0]] !== "undefined") ? lI[match[0]] : [];
					lI[match[0]][alliance] = i;
					i++;
				}
				listeGlobal[alliance] = liste;	
					
				table(liste, alliance);
			},
			dataType: 'html'
		});
	}
}

//Trouve l'IDC d'une compagnie
function fetchIDC () {
	$.ajax({
		url: 'http://' + window.location.hostname + '/panel2.php', 
		async: false,
		type: 'get',
		success: function(data) {
			GM_setValue(host + '.idc', parseInt(data.match(/idc=(.*?)'/)[1]));
		},
		dataType: 'text'
	});
}

//Trouve l'IDA d'une alliance
function fetchIDA () {
	$.ajax({
		url: 'http://' + window.location.hostname + '/alliance.php', 
		async: false,
		type: 'get',
		success: function(data) {
			if ( data.match(/ida=(.*?)'/)[1] !== null ) {
				GM_setValue(host + '.ida', parseInt( data.match(/ida=(.*?)'/)[1] ));
			} else {
				GM_setValue(host + '.ida', 'sans alliance' );
			}
		},
		dataType: 'text'
	});
}

//Affiche le lien pour ouvrir la popup
function main() {	
	GM_log("Liste moi ca !!");
	
	if ($('#rubriques').length) {
		$('#rubriques').append('<a id="linkTab" href="#" class="a_link"><div class="icone_rubrique ic_nn_IE"><span class="icone_avion pour_tte_icone backsprite"></span>LL</div></a>');
			
		$('#linkTab').click(function (e) {
			e.preventDefault();
			openWindow();
		});
	} else {
		return;
	}
}
