// ==UserScript==
// @name           gestion des vols
// @namespace      AM
// @description    Prolongation et suppression des vols
// @author         Alceste
// @icon 		   http://jumbojet.airlines-manager.com/favicon.ico
// @exclude        http://*airlines-manager.com/avion.php?al=1&mm=2
// @include        http://*airlines-manager.com/avion.php?al=1&mm=1*
// @include        http://*airlines-manager.com/avion.php*
// @require        http://usocheckup.redirectme.net/94743.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// @require        http://cdn.jquerytools.org/1.2.5/form/jquery.tools.min.js
// @history        1.6 Optimisation de l'interface graphique
// @history        1.5 Script maintenant compatible avec chrome (et chromium): merci à TheGreatGig
// @history        1.4 Modification à 90 % du script, voir changelog complet
// @history        1.3 Accélération du script et correction de bugs
// @history        1.2 Accélération du script et correction des fautes d'orthographes
// @history        1.1 Correction de la faille de sécurité
// @history        1.0 Première sortie du script
// @version        1.6
// ==/UserScript==

window.addEventListener('load', main, false);

function main() {	
	$('head').append("<link href='http://fly-is-good.niloo.fr/skin1.css' type='text/css' rel='stylesheet'>");
	
	//variables globales
	var date = new Date(), mois = date.getMonth(), annee = date.getFullYear() + 1;
	var listeAvions = [], listeAvions2 = [], onOperation = false, planningOpened = false, curentOpe = 0;
	for (var i = 0, c = $("a[name]").length; i < c; i++) {
		listeAvions.push($("a[name]:eq("+i+")").attr('name'));
	}
	const nombreAvions = listeAvions.length;

	//fonctions de base: cherche élément a partir de leur class | ajoute une feuille de style
	jQuery.fn.getParent = function(num) {
		var last = this[0];
		for (var i = 0; i < num; i++) {
			last = last.parentNode;
		}
		return jQuery(last);
	};

	function writeResult(ida, message, divClass) {//ecrie le résultat d'une requête
		var elm = $('#imag'+ida).getParent(5);
		var nb = $("<div/>");
		
		nb.attr('class', divClass);
		nb.html('- ' + message);
		
		elm.before(nb);
	}

	function recursive(obj) {//veille à ce que les requêtes soient synchrones
		if (obj.list.length) {
			var e = obj.fn(obj.list[0]),
			onload = e.onload;

			obj.next = function() {
				listeAvions2.push(obj.list.shift());
				setTimeout(recursive, obj.delay, obj);
				updateOpe('avionActuel_', 1);
			};

			e.onload = function(xhr) {
				obj.response = xhr;
				onload(obj, obj.list[0]);
			}

			setTimeout(GM_xmlhttpRequest, obj.delay, e);
		} else {
			obj.onload(obj);
		}
	}

	function onFinish(obj){//opération termine
		listeAvions = listeAvions2.slice(0);
		listeAvions2 = [];
		
		var i = curentOpe;
		
		var end = new Date().getTime(), result = new Date(end - obj.start);
		var text = result.getUTCHours() != 0 ? result.getUTCHours() + ' heures ' : '';
		text += result.getUTCMinutes() != 0 ? result.getUTCMinutes() + ' minutes ' : '';
		text += result.getUTCSeconds() + ' secondes';
		
		$('#status_' + i).text('terminé en ' + text);
		
		curentOpe++;
		onOperation = false;
	}

	function createOpe(type) {//créer les informations sur l'opération en cours		
		var i = curentOpe;
		var newDiv = $('<div/>').attr({
			id: 'statOpe_' + i,
			class: 'newDiv'});
		
		if (type == 'supp') {
			var operation = 'Suppression',
				header = '<span id="nbVolsSupp_' + i + '">0</span> vols supprimés avec succès :<br />',
				texte = '- Les vols de <span class="divSuc" id="nbSupSuc_' + i + '">0</span> avions ont pu être supprimés avec succès<br />'
					+ '- Les vols de <span class="divErr" id="nbSupErr_' + i + '">0</span> avions n\'ont pas pu être supprimés<br />';
			
		} else {
			var operation = 'Programmation',
				header = '<span id="nbVolsProg_' + i + '">0</span> vols programmés avec succès :<br />',
				texte = '- Les vols de <span class="divSuc" id="nbProgSuc_' + i + '">0</span> avions ont été prolongés avec succès<br />'
					+ '- <span class="divEch" id="nbProgPlan_' + i + '">0</span> avions n\'ont pas de planning<br />'
					+ '- <span class="divErr" id="nbProgErr_' + i + '">0</span> erreurs sont survenues<br />';                
		}
		
		newDiv.html( 
			'<center>' +operation + ' des vols <span id="status_' + i + '">en cours: <span id="avionActuel_' + i + '">0</span>/' + nombreAvions + ' <img src="http://uppix.net/b/8/4/90325a30d883cb1e289c348482e80.gif" /></span></center><br />'
			+ '<div class="progress-bar-container"><span id="progress_'+i+'" class="progress-bar"></span></div>'
			+ header
			+ '<div style="margin-left:50px;">'
				+ texte
			+ '</div>');
			
		$('#divGestVols').append(newDiv);
	}

	function updateOpe(idSpan, addValue, boolId) {//modifie les informations sur l'opération en cours
		var i = curentOpe;
			
		$('#' + idSpan + i).text(parseInt($('#' + idSpan + i).text()) + addValue);
		if (idSpan == 'avionActuel_') {
			$('#progress_' + i).attr('style', 'width: ' + (parseInt($('#' + idSpan + i).text()) / nombreAvions) * 100 + "%");
		}
	}

	function suppVols(obj, ida) {//supprimer les vols
		var txt = obj.response.responseText, regex = new RegExp("<br\ /><br\ />(.*?) vol(s?) ont été supprimé(s?).<\/i>");
		var nbVolsSup = txt.match(regex);    
		nbVolsSup = parseInt(nbVolsSup[1], 10);
				
		if (nbVolsSup === 0) {
			writeResult(ida, 'Aucun vol n\'a été supprimé.', 'divErr');
			updateOpe('nbSupErr_', 1);
		} else {
			writeResult(ida, nbVolsSup +' vols ont été supprimés.', 'divSuc');
			updateOpe('nbVolsSupp_', nbVolsSup);
			updateOpe('nbSupSuc_', 1);
		}
		
		obj.next();
	}

	function preSuppVols(){//préparer avions pour suppression
		if (!onOperation) {
			onOperation = true;
			
			var premier_vol = $('#pvol').data("dateinput").getValue('d/m/yyyy');			
			var dernier_vol = $('#dvol').data("dateinput").getValue('d/m/yyyy');

			premier_vol = premier_vol.split("/");
			dernier_vol = dernier_vol.split("/");
		
			var delais = parseInt($('#delais').val());
		
			createOpe('supp');
		
			recursive({
				"delay" : delais,
				"start" : new Date().getTime(),
				"list" : listeAvions,
				"fn" : function(e) {
					var data = "date_dep_j1="+premier_vol[0]+"&date_dep_m1="+premier_vol[1]+"&date_dep_a1="+premier_vol[2]+"&date_dep_j2="+dernier_vol[0]+"&date_dep_m2="+dernier_vol[1]+"&date_dep_a2="+dernier_vol[2]+"&dest=";
				
					return {
						"url" : 'http://' + window.location.hostname + '/vider_avion.php?ida=' + e,
						"method" : "post",
						"headers" : {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						"data" : data,
						"onload" : suppVols
					};
				},
				"onload" : onFinish,
			});
		} else {
			alert('Veuillez patienter que la dernière opération se termine');
		}
	}

	function progVols(obj, ida) {//programmer des vols
		var data = obj.response.responseText, infvol = '';

		if (data.toLowerCase().indexOf("array") === -1){
			//GM_log(ida +"    "+data);
			if (data !== '' && data !== undefined){
				var h = data.split(';'), r = 0;
				while (h[r] !== '' && h[r] !== undefined){
					var h2 = h[r].split('i');                        
					var deb = parseInt(h2[1], 10);
					var infos = "=" + deb + "i" + deb + "i" + h2[0] + ".";                        
					infvol += infos;
					r++;
				}

				if (infvol !== '' || infvol !== null || infvol !== undefined){
					//GM_log(ida+"\n"+data+"\n"+infvol[i]);
					var datef = encodeURIComponent($('#date').data("dateinput").getValue('d/m/yyyy'));
					var post = "appareil=" + ida + "&datef=" + datef + "&infovol=" + encodeURIComponent(infvol) + "&planningmodele=0&repetition=4&signal=0&supvol=";

					GM_xmlhttpRequest({
						method: "POST",
						url: 'http://' + window.location.hostname + '/vol_present.php',
						data: post,
						headers: {
							"X-Requested-With": "XMLHttpRequest",
							"Content-Type": "application/x-www-form-urlencoded",
							"Accept": "*/*"
						},

						onload: function(program) {
							var reponse = program.responseText;                                

							if (reponse.indexOf("Aucun") === 0) {
								writeResult(ida, reponse, 'divErr');
								updateOpe('nbProgErr_', 1);
							} else {
								writeResult(ida, reponse, 'divSuc');                                                    

								var regex = new RegExp("^(.*?) vols"), nbVolsEnr = reponse.match(regex);
								nbVolsEnr = parseInt(nbVolsEnr[1], 10);
								
								updateOpe('nbVolsProg_', nbVolsEnr);
								updateOpe('nbProgSuc_', 1);    
							}
						}
					});
				} else {
					writeResult(ida, 'Une erreur s\'est produite.', 'divErr');
					updateOpe('nbProgErr_', 1);
				}
			} else {
				writeResult(ida, 'Aucun planning n\'a été trouvé.', 'divEch');
				updateOpe('nbProgPlan_', 1);
			}
		} else {
			writeResult(ida, 'Une erreur s\'est produite.', 'divErr');
			updateOpe('nbProgErr_', 1);
		}
		
		obj.next();
	}

	function preProgVols(){//preparer avions pour programmation
		if(!onOperation) {
			onOperation = true;
			
			if(!planningOpened) {
				planningOpened = true;
				GM_xmlhttpRequest({"method":"get","url":'http://' + window.location.hostname + '/programmation_vol_par_avion.php'});
			}
			
			
			var delais = parseInt($('#delais').val()), i = 1;
		
			createOpe('');
		
			recursive({
				"delay" : delais,
				"start" : new Date().getTime(),
				"list" : listeAvions,
				"fn" : function(e) {
					var datef = encodeURIComponent($('#date').data("dateinput").getValue('d/m/yyyy'));    
					var get = "chargementmodele=1&date_ac=&datef=" + datef + "&idap=" + e;    
				
					return {
						"url" : 'http://' + window.location.hostname + '/vol_present.php?' + get,
						"method" : "get",
						"headers" : {
							"X-Requested-With": "XMLHttpRequest",
							"Accept": "*/*"
						},
						"onload" : progVols
					};
				},
				"onload" : onFinish
			});
		} else {
			alert('Veuillez patienter que la dernière opération se termine');
		}
	}

	(function() {
		GM_log("Gestion des vols activé");
		
		var url = String(window.location);
		if ($('.grostitre')[2]){//affiche le bloc
			var div = $("<div/>");
			div.attr('id', 'divGestVols');
			
			div.html( 
				'<input id="Operations" value="0" type="hidden"/>'
				+ '<table width="100%">'
					+ '<tr><th><h3>Gestion des vols</h3></th></tr>'
					+ '<tr align="center"><td>'+ nombreAvions +' avions trouvés</td></tr>'
				+ '</table>'
				+ '<table width="100%" rules="cols">'
					+ '<tr>'
						+ '<th align="left">Sauvegarde prolongée</th>'
						+ '<th align="right">Suppression des vols</th>'
					+ '</tr>'
					+ '<tr>'
						+ '<td alig="left">'
							+ 'Semaine du : <br />'
							+ '<input type="date" id="date" class="date"/><br />'
						+ '</td>'
						+ '<td align="right">'
							+ 'Premier vol:<br />'
							+ '<input type="date" id="pvol" class="date"/><br />'
							+ 'Dernier vol:<br />'
							+ '<input type="text" id="dvol" class="date"/><br />'
						+ '</td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td alig="left">'
							+ '<input type="button" class="go_btn" id="sauv_pro" value="Sauvegarde prolongée" />'
						+ '</td>'
						+ '<td align="right">'
							+ '<input type="button" class="go_btn" id="sup_vol" value="Suppression des vols" />'
						+ '</td>'
					+ '</tr>'
				+ '</table><br />'
				+ '<div style="margin-left:auto;margin-right:auto;width:30%;">'
					+ 'Delais (en ms) <span class="question">'
						+ '<span>(?)</span>'
						+ '<em><span></span>Délais entre chaque requête en ms (1000 ms = 1 s)</em>'
					+ '</span> : <input id="delais" type="text" value="500" size="4"/>'
				+ '</div>');    
				
			$('.grostitre:eq(2)').after(div);
			$.tools.dateinput.localize("fr",  {
				months:        'janvier,f&eacute;vrier,mars,avril,mai,juin,juillet,ao&ucirc;t,' +
								'septembre,octobre,novembre,d&eacute;cembre',
				shortMonths:   'jan,f&eacute;v,mar,avr,mai,jun,jul,ao&ucirc;,sep,oct,nov,d&eacute;c',
				days:          'dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi',
				shortDays:     'dim,lun,mar,mer,jeu,ven,sam'
			});
			$('.date').dateinput({lang: 'fr', firstDay: 1, speed: 0, min: -1, format: 'd/m/yyyy', });
			$('#pvol').data("dateinput").setValue(0);
			$('#date').data("dateinput").setValue(0);
			$('#dvol').data("dateinput").setValue(new Date(annee, mois, date.getDate()));

			$('#sauv_pro').click(preProgVols, true);
			$('#sup_vol').click(preSuppVols, true);
		}
	})();	
}
