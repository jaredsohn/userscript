// ==UserScript==
// @name           Outil exile
// @version        1.6
// @include        http://genesis.exile.fr/*
// ==/UserScript==

var version = '1.6';

var head = document.getElementsByTagName('head')[0];

var jquery = document.createElement('script');
jquery.setAttribute('type', 'text/javascript');
jquery.setAttribute('src', 'http://maitreillusionniste.free.fr/script/fichiers/jquery_protected.js');
head.appendChild(jquery);

var jqueryUi = document.createElement('script');
jqueryUi.setAttribute('type', 'text/javascript');
jqueryUi.setAttribute('src', 'http://maitreillusionniste.free.fr/script/fichiers/jquery-ui.js');
head.appendChild(jqueryUi);

var CSS = document.createElement('link');
CSS.setAttribute('rel', 'stylesheet');
CSS.setAttribute('media', 'screen');
CSS.setAttribute('type', 'text/css');
CSS.setAttribute('href', 'http://maitreillusionniste.free.fr/script/fichiers/exile.css');
head.appendChild(CSS);

unsafeWindow.onload = function(){
	var $ = unsafeWindow.jQuery;
   $(function(){
		
		var listeOptions = {
			'soldats' : {
				'nom'		  : 'Soldats à former',
				'description' : 'Complète automatiquement le nombre de soldat à former dans l\'onglet Entraînement.',
				'defaut'	  : true,
				'options'	  : {
					'fixedMax' : {'description': 'Choisir un nombre maximum fixe de soldats sur les planètes', 'type': 'text'},
					'formation' : {'description': 'Prendre en compte les soldats en formation', 'type': 'checkbox', 'defaut': 'true'}
				}
			},
			'date' : {
				'nom'		  : 'Date de fin',
				'description' : 'Affiche les dates de fin des énènements.',
				'defaut'	  : true,
				'options'	  : {
					'vaisseaux' : {'description': 'Ne pas afficher les dates de fin de construction des vaisseaux sur la page d\'accueil', 'type': 'checkbox'}
				}
			},
			'vaisseauxAuSol' : {
				'nom'		  : 'Vaisseaux au sol',
				'description' : 'Affiche la somme des vaisseaux au sol dans l\'onglet Vaisseaux au sol.',
				'defaut'	  : true
			},
			'detruitsPerdus' : {
				'nom'		  : 'Flottes détruites et perdus',
				'description' : 'Affiche les PdP générés et signature dans l\'onglet Détruits/perdus (Flottes).',
				'defaut'	  : true
			},
			'masqueProduction' :{
				'nom'		  : 'Masque de production',
				'description' : 'Permet de fabriquer un groupement de vaisseau choisi en un seul clique via un masque de production.',
				'defaut'	  : true
			},
			'smile' :{
			    'nom'         : 'Description smile',
				'description' : 'Pour activer ou désactiver les nouveaux smiles.',

				'defaut'      : true
			},		
		};
	   $('#menu_options').after('<a href="#" class="menu lvl2" id="exilePP_menu_options"><span class="dot">·</span>Outil Exile (v'+version+')</a>');
		$('#exilePP_menu,#exilePP_menu_options').click(function(){
			$('#content').empty();
			$('#content').html('<table class="default" id="exilePP_options"><tr class="category"><td>Options de l&apos;Outil d&apos;exile</td></tr>\
					<tr class="item"><td><form id="form_options"></form></td></tr>\
					</table>');
			$('.selected').removeClass('selected');
			$('#exilePP_menu_options').addClass('selected');
			$.each(listeOptions, function(nom, data){
				$('#form_options').append('\
						<fieldset id="exilePP_'+nom+'">\
							<legend>\
								<input type="checkbox" name="exilePP_option_'+nom+'" id="exilePP_option_'+nom+'">\
								<label for="exilePP_option_'+nom+'">'+data.nom+'</label>\
							</legend>\
							<div>'+data.description+'<br />\
							</div>\
						</fieldset>');

				$('#exilePP_'+nom+' div').append('<br />');
				if(data.options)
				{
					$.each(data.options, function(opNom, opData){
						if(opData.type == 'text')
						{
							$('#exilePP_'+nom+' div').append('<label for="exilePP_option_'+nom+'_'+opNom+'">'+opData.description+' : </label>\
								<input type="text" name="exilePP_option_'+nom+'_'+opNom+'" id="exilePP_option_'+nom+'_'+opNom+'" /><br />');
							if(Option(nom+'.'+opNom) != undefined)
								$('#exilePP_option_'+nom+'_'+opNom).val(Option(nom+'.'+opNom));
							else if(opData.defaut)
								$('#exilePP_option_'+nom+'_'+opNom).val(opData.defaut);
						}
						else if(opData.type == 'checkbox')
						{
							$('#exilePP_'+nom+' div').append('\
								<input type="checkbox" name="exilePP_option_'+nom+'_'+opNom+'" id="exilePP_option_'+nom+'_'+opNom+'" />\
								<label for="exilePP_option_'+nom+'_'+opNom+'">'+opData.description+'</label><br />');
							if(Option(nom+'.'+opNom) == 'true' || (opData.defaut && Option(nom+'.'+opNom) != 'false'))
								$('#exilePP_option_'+nom+'_'+opNom).attr('checked', 'checked');
						}
					});
				}
				if(Option(nom) == 'true' || (data.defaut && Option(nom) != 'false'))
					$('#exilePP_option_'+nom).attr('checked', 'checked');
				else
					$('#exilePP_'+nom).addClass('disabled');
				
				$('#exilePP_option_'+nom).click(function(e){
					if(e.target.checked)
						$('#exilePP_'+nom).removeClass('disabled');
					else
						$('#exilePP_'+nom).addClass('disabled');
				});
			});
			
			// validation
			$('#form_options').append('<br /><input type="submit" value="Enregistrer" /><br />')
			$('#form_options').submit(function(e){
				$.each(listeOptions, function(nom, data){
					if($('#exilePP_option_'+nom+':checked').length != 0)
					{
						Option(nom, true);
						if(data.options)
							$.each(data.options, function(opNom, opData){
								if(opData.type == 'text')
									Option(nom+'.'+opNom, $('#exilePP_option_'+nom+'_'+opNom).val());
								else if(opData.type == 'checkbox')
									Option(nom+'.'+opNom, $('#exilePP_option_'+nom+'_'+opNom+':checked').length != 0);
							});
					}
					else
						Option(nom, false);
				});
				
				$('#form_options').append('<span id="exilePP_message">Options enregistrées</span>');
				setTimeout(function(){
					$('#exilePP_message').fadeOut('normal', function(){
						$(this).remove();
					});
				}, 1000);
				return false;
			});
		});
		if(Option('version') != version)
		{
			$.each(listeOptions, function(nom, data){
				if(Option(nom) == undefined)
					Option(nom, data.defaut);
				if(data.options)
					$.each(data.options, function(opNom, opData){
						if(Option(nom+'.'+opNom) == undefined && opData.defaut != undefined)
							Option(nom+'.'+opNom, opData.defaut);
					});
			});
			newVersion();
			Option('version', version);
		}
	});
	var Vaisseaux = {'Sonde': {'signature': 5, 'PdP': 0, 'type': 'u'},
			'Cargo I': {'signature': 80, 'PdP': 0, 'type': 'u'},
			'Cargo V': {'signature': 195, 'PdP': 0, 'type': 'u'},
			'Cargo X': {'signature': 375, 'PdP': 0, 'type': 'u'},
			'Barge d\'invasion': {'signature': 135, 'PdP': 0, 'type': 'u'},
			'Recolteur': {'signature': 85, 'PdP': 0, 'type': 'u'},
			'Vaisseau de colonisation': {'signature': 330, 'PdP': 0, 'type': 'u'},
			'Vaisseau de colonie minière': {'signature': 385, 'PdP': 0, 'type': 'u'},
			'D: Laboratoire': {'signature': 49, 'PdP': 0, 'type': 'u'},
			'D: Atelier': {'signature': 132, 'PdP': 0, 'type': 'u'},
			'D: Centre de recherche': {'signature': 539, 'PdP': 0, 'type': 'u'},
			'D: Caserne militaire': {'signature': 352, 'PdP': 0, 'type': 'u'},
			'D: Hangar à minerai': {'signature': 429, 'PdP': 0, 'type': 'u'},
			'D: Hangar à hydrocarbure': {'signature': 429, 'PdP': 0, 'type': 'u'},
			'D: Usine de synthèse': {'signature': 1980, 'PdP': 0, 'type': 'u'},
			'D: Caisse d\'énergie': {'signature': 0, 'PdP': 0, 'type': 'u'},
			'Vaisseau mère de combat': {'signature': 4500, 'PdP': 0, 'type': 't'},
			'Vaisseau radar': {'signature': 0, 'PdP': 0, 'type': 't'},
			'Vaisseau de brouillage': {'signature': 0, 'PdP': 0, 'type': 't'},
			'Chasseur': {'signature': 10, 'PdP': 1, 'type': 'm'},
			'Intercepteur': {'signature': 12, 'PdP': 1, 'type': 'm'},
			'Prédateur': {'signature': 12, 'PdP': 1, 'type': 'm'},
			'Corvette lourde': {'signature': 22, 'PdP': 2, 'type': 'm'},
			'Corvette à tir multiple': {'signature': 25, 'PdP': 2, 'type': 'm'},
			'Corvette d\'elite': {'signature': 30, 'PdP': 2, 'type': 'm'},
			'Frégate d\'assaut': {'signature': 70, 'PdP': 5, 'type': 'm'},
			'Frégate à missiles': {'signature': 125, 'PdP': 5, 'type': 'm'},
			'Frégate à canon ionique': {'signature': 145, 'PdP': 5, 'type': 'm'},
			'Croiseur': {'signature': 170, 'PdP': 10, 'type': 'm'},
			'Croiseur de combat': {'signature': 300, 'PdP': 10, 'type': 'm'},
			'Croiseur d\'élite': {'signature': 300, 'PdP': 10, 'type': 'm'}
	};
	var defautVaisseaux = function(){return {'Sonde': 0,
		'Cargo I': 0,
		'Cargo V': 0,
		'Cargo X': 0,
		'Barge d\'invasion': 0,
		'Recolteur': 0,
		'Vaisseau de colonisation': 0,
		'Vaisseau de colonie minière': 0,
		'D: Laboratoire': 0,
		'D: Atelier': 0,
		'D: Centre de recherche': 0,
		'D: Caserne militaire': 0,
		'D: Hangar à minerai': 0,
		'D: Hangar à hydrocarbure': 0,
		'D: Usine de synthèse': 0,
		'D: Caisse d\'énergie': 0,
		'Vaisseau mère de combat': 0,
		'Vaisseau radar': 0,
		'Vaisseau de brouillage': 0,
		'Chasseur': 0,
		'Intercepteur': 0,
		'Prédateur': 0,
		'Corvette lourde': 0,
		'Corvette à tir multiple': 0,
		'Corvette d\'elite': 0,
		'Frégate d\'assaut': 0,
		'Frégate à missiles': 0,
		'Frégate à canon ionique': 0,
		'Croiseur': 0,
		'Croiseur de combat': 0,
		'Croiseur d\'élite': 0
	};};
	$(function(){
		// soldats en formation
		if(document.location.pathname == '/game/training.asp' && Option('soldats') == 'true')
		{
			var data = $('#soldiers').parent().prev().text().match(/([0-9]+) \/ ([0-9]+)/);
			var max = data[2];
			var soldats = parseInt(data[1]);
			if(Option('soldats.formation') == 'true')
				$('td[colspan=5][align=left]:contains(Militaires)').next().each(function(i, e){
					soldats += parseInt($(e).text().substr(1));
				});
			if(parseInt(Option('soldats.fixedMax')) > 0)
				max = parseInt(Option('soldats.fixedMax'));
			$('#soldiers').val(max - soldats);
		}
		
		// date de fin
		if(Option('date') == 'true')
		{
			$('span[id^=cntdwn]').each(function(i, e){
				var data = [];
				if(data = $(e).text().match(/^(?:([0-9]+)j )?0?([0-9]{1,2}):0?([0-9]{1,2}):0?([0-9]{1,2})$/))
				{
					var sec = (parseInt(data[1])|0)*3600*24 + parseInt(data[2])*3600 + parseInt(data[3])*60 + parseInt(data[4]);
					var fin = new Date();
					var demain = new Date();
					demain.setDate(demain.getDate()+1);
					fin.setTime(fin.getTime() + sec*1000);
					var date = '';
					if(sec > 3600*24) // rouge
						var color = 'red';
					else if(sec > 3600*12) // rouge => jaune
						var color = 'rgb(255, '+Math.round(255-(sec-3600*12)*255/(3600*12))+', 0)';
					else if(sec > 600) // jaune => vert
						var color = 'rgb('+Math.round(sec*255/(3600*12))+', 255, 0)';
					else
						var color = 'transparent';
					if(fin.getDate() == demain.getDate() && fin.getMonth() == demain.getMonth())
					{
						date += 'Demain à ';
					}
					else if(fin.getDate() > demain.getDate() || fin.getMonth() != demain.getMonth())
					{
						jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
						date += jours[fin.getDay()] + ' à ';
					}
					date += (fin.getHours()<10?'0'+fin.getHours():fin.getHours())
						 + ':' + (fin.getMinutes()<10?'0'+fin.getMinutes():fin.getMinutes())
						 + ':' + (fin.getSeconds()<10?'0'+fin.getSeconds():fin.getSeconds());
					if(color != 'transparent')
						$(e).parent().append('<span style="color: '+color+'" class="exilePP_date"> '+date+'</span>');
				}
			});
			if(Option('date.vaisseaux') == 'true')
				$('#buildingsunderconstruction').find('td[width=50%]:eq(1)').find('.exilePP_date').remove();
		}
		
		
		// Vaisseaux au sol
		if(document.location.pathname == '/game/fleets-standby.asp' && Option('vaisseauxAuSol') == 'true')
		{
			var secteur = defautVaisseaux();
			var galaxie = defautVaisseaux();
			var total = defautVaisseaux();
			var lastCoord = $('#fleets .smallitem:eq(0) td:eq(0)').text().match(/([0-9]+).([0-9]+).[0-9]+/);
			var lastSecteur = $('#fleets .smallitem:eq(0)');
			var nbrSecteur = 0;
			var lastGalaxie = $('#fleets .smallitem:eq(0)');
			var nbrGalaxie = 0;
			$('#fleets table').removeAttr('width');
			$('#fleets .header').append('<td>Total par secteur</td><td>Total par galaxie</td><td>Total</td>');
			$('#fleets .smallitem').each(function(i, e){
				var coord = $(e).children(':eq(0)').text().match(/([0-9]+).([0-9]+).[0-9]+/);
				if(coord[2] != lastCoord[2])
				{
					$(lastSecteur).append('<td rowspan="'+nbrSecteur+'"></td>');
					var signTotal = {'u': 0, 't': 0, 'm': 0};
					var lastType = 'u';
					$.each(secteur, function(i2, e2){
						if(e2 != 0)
						{
							if(lastType != Vaisseaux[i2].type)
								$(lastSecteur).children(':last').append('<br />');
							$(lastSecteur).children(':last').append('<div>'+i2+'\
									x<span class="exilePP_vert">'+intFr(e2)+'</span>\
									(<span class="exilePP_jaune">'+intFr(Vaisseaux[i2].signature*e2)+'</span>)</div>');
							signTotal[Vaisseaux[i2].type] += Vaisseaux[i2].signature*e2;
							lastType = Vaisseaux[i2].type;
						}
					});
					$(lastSecteur).children(':last').append('<br /><div>Utilitaire: <span class="exilePP_jaune">'+intFr(signTotal.u)+'</span><br />\
							Tactique: <span class="exilePP_jaune">'+intFr(signTotal.t)+'</span><br />\
							Militaire: <span class="exilePP_jaune">'+intFr(signTotal.m)+'</span><br />\
							Total : <span class="exilePP_jaune">'+intFr(signTotal.u+signTotal.t+signTotal.m)+'</span></div>');
					nbrSecteur = 0;
					secteur = defautVaisseaux();
					lastSecteur = e;
				}
				if(coord[1] != lastCoord[1])
				{
					$(lastGalaxie).append('<td rowspan="'+nbrGalaxie+'"></td>');
					var signTotal = {'u': 0, 't': 0, 'm': 0};
					var lastType = 'u';
					$.each(galaxie, function(i2, e2){
						if(e2 != 0)
						{
							if(lastType != Vaisseaux[i2].type)
								$(lastGalaxie).children(':last').append('<br />');
							$(lastGalaxie).children(':last').append('<div>'+i2+'\
									x<span class="exilePP_vert">'+intFr(e2)+'</span>\
									(<span class="exilePP_jaune">'+intFr(Vaisseaux[i2].signature*e2)+'</span>)</div>');
							signTotal[Vaisseaux[i2].type] += Vaisseaux[i2].signature*e2;
							lastType = Vaisseaux[i2].type;
						}
					});
					$(lastGalaxie).children(':last').append('<br /><div>Utilitaire: <span class="exilePP_jaune">'+intFr(signTotal.u)+'</span><br />\
							Tactique: <span class="exilePP_jaune">'+intFr(signTotal.t)+'</span><br />\
							Militaire: <span class="exilePP_jaune">'+intFr(signTotal.m)+'</span><br />\
							Total : <span class="exilePP_jaune">'+intFr(signTotal.u+signTotal.t+signTotal.m)+'</span></div>');
					nbrGalaxie = 0;
					galaxie = defautVaisseaux();
					lastGalaxie = e;
				}
				$('div', e).each(function(i, e){
					var match = $(e).text().match(/(.+)\sx([0-9\s]+)/);
					secteur[match[1]] += parseInt(match[2].replace(/\s/g, ''));
					galaxie[match[1]] += parseInt(match[2].replace(/\s/g, ''));
					total[match[1]] += parseInt(match[2].replace(/\s/g, ''));
				});
				nbrSecteur++;
				nbrGalaxie++;
				lastCoord = coord;
			});
			
			$(lastSecteur).append('<td rowspan="'+nbrSecteur+'"></td>');
			var signTotal = {'u': 0, 't': 0, 'm': 0};
			var lastType = 'u';
			$.each(secteur, function(i2, e2){
				if(e2 != 0)
				{
					if(lastType != Vaisseaux[i2].type)
						$(lastSecteur).children(':last').append('<br />');
					$(lastSecteur).children(':last').append('<div>'+i2+'\
							x<span class="exilePP_vert">'+intFr(e2)+'</span>\
							(<span class="exilePP_jaune">'+intFr(Vaisseaux[i2].signature*e2)+'</span>)</div>');
					signTotal[Vaisseaux[i2].type] += Vaisseaux[i2].signature*e2;
					lastType = Vaisseaux[i2].type;
				}
			});
			$(lastSecteur).children(':last').append('<br /><div>Utilitaire: <span class="exilePP_jaune">'+intFr(signTotal.u)+'</span><br />\
					Tactique: <span class="exilePP_jaune">'+intFr(signTotal.t)+'</span><br />\
					Militaire: <span class="exilePP_jaune">'+intFr(signTotal.m)+'</span><br />\
					Total : <span class="exilePP_jaune">'+intFr(signTotal.u+signTotal.t+signTotal.m)+'</span></div>');
			
			$(lastGalaxie).append('<td rowspan="'+nbrGalaxie+'"></td>');
			var signTotal = {'u': 0, 't': 0, 'm': 0};
			var lastType = 'u';
			$.each(galaxie, function(i2, e2){
				if(e2 != 0)
				{
					if(lastType != Vaisseaux[i2].type)
						$(lastGalaxie).children(':last').append('<br />');
					$(lastGalaxie).children(':last').append('<div>'+i2+'\
							x<span class="exilePP_vert">'+intFr(e2)+'</span>\
							(<span class="exilePP_jaune">'+intFr(Vaisseaux[i2].signature*e2)+'</span>)</div>');
					signTotal[Vaisseaux[i2].type] += Vaisseaux[i2].signature*e2;
					lastType = Vaisseaux[i2].type;
				}
			});
			$(lastGalaxie).children(':last').append('<br /><div>Utilitaire: <span class="exilePP_jaune">'+intFr(signTotal.u)+'</span><br />\
					Tactique: <span class="exilePP_jaune">'+intFr(signTotal.t)+'</span><br />\
					Militaire: <span class="exilePP_jaune">'+intFr(signTotal.m)+'</span><br />\
					Total : <span class="exilePP_jaune">'+intFr(signTotal.u+signTotal.t+signTotal.m)+'</span></div>');
			
			$('#fleets .smallitem:eq(0)').append('<td rowspan="'+$('#fleets .smallitem').length+'"></td>');
			var signTotal = {'u': 0, 't': 0, 'm': 0};
			var lastType = 'u';
			$.each(total, function(i, e){
				if(e != 0)
				{
					if(lastType != Vaisseaux[i].type)
						$('#fleets .smallitem:eq(0) td:last').append('<br />');
					$('#fleets .smallitem:eq(0) td:last').append('<div>'+i+'\
							x<span class="exilePP_vert">'+intFr(e)+'</span>\
							(<span class="exilePP_jaune">'+intFr(Vaisseaux[i].signature*e)+'</span>)</div>');
					signTotal[Vaisseaux[i].type] += Vaisseaux[i].signature*e;
					lastType = Vaisseaux[i].type;
				}
			});
			$('#fleets .smallitem:eq(0) td:last').append('<br /><div>Utilitaire: <span class="exilePP_jaune">'+intFr(signTotal.u)+'</span><br />\
					Tactique: <span class="exilePP_jaune">'+intFr(signTotal.t)+'</span><br />\
					Militaire: <span class="exilePP_jaune">'+intFr(signTotal.m)+'</span><br />\
					Total : <span class="exilePP_jaune">'+intFr(signTotal.u+signTotal.t+signTotal.m)+'</span></div>');
		}
		
		// PdP et signature Détruit/perdu
		if(document.location.pathname == '/game/fleets-ships-stats.asp' && Option('detruitsPerdus') == 'true')
		{
			$('td[align=right]').css('text-align', 'center');
			var detruits = {'sign': 0, 'PdP': 0};
			var perdu = {'sign': 0, 'PdP': 0};
			$('#fleets_ships_stats .item').each(function(i, e){
				var nom = $('td:eq(0)', e).text();
				
				var nbrDetruits = parseInt($('td:eq(1)', e).text().replace(/\s/g, ''));
				$('td:eq(1)', e).append(' (<span class="exilePP_jaune">'+intFr(nbrDetruits*Vaisseaux[nom].signature)+'</span>)<br />'
						+'<span class="exilePP_vert">'+intFr(nbrDetruits*Vaisseaux[nom].PdP)+'</span><img src="http://img.exile.fr/items/-2.gif" />')
				detruits.sign += nbrDetruits*Vaisseaux[nom].signature;
				detruits.PdP  += nbrDetruits*Vaisseaux[nom].PdP;

				var nbrPerdu = $('td:eq(2)', e).text();
				$('td:eq(2)', e).append(' (<span class="exilePP_jaune">'+intFr(nbrPerdu*Vaisseaux[nom].signature)+'</span>)<br />'
						+'<span class="exilePP_vert">'+intFr(nbrPerdu*Vaisseaux[nom].PdP)+'</span><img src="http://img.exile.fr/items/-2.gif" />')
				perdu.sign += nbrPerdu*Vaisseaux[nom].signature;
				perdu.PdP  += nbrPerdu*Vaisseaux[nom].PdP;
			});
			$('#fleets_ships_stats tr:last td:eq(1)').append(' (<span class="exilePP_jaune">'+intFr(detruits.sign)+'</span>)<br />'
					+'<span class="exilePP_vert">'+intFr(detruits.PdP)+'</span><img src="http://img.exile.fr/items/-2.gif" />');
			$('#fleets_ships_stats tr:last td:eq(2)').append(' (<span class="exilePP_jaune">'+intFr(perdu.sign)+'</span>)<br />'
					+'<span class="exilePP_vert">'+intFr(perdu.PdP)+'</span><img src="http://img.exile.fr/items/-2.gif" />');
		}
		
		// Masque de production
		if(document.location.pathname == '/game/shipyard.asp' && Option('masqueProduction') == 'true')
		{
			$('<br /><input type="button" value="Créer le masque" />').click(function(){
				var vaisseaux = {};
				$('form input[type=text]').each(function(i, e){
					if(parseInt($(e).val()) > 0)
						vaisseaux[$(e).parent().prevAll('[align=left]').find('td:eq(0)').text()] = $(e).val();
				});
				if(vaisseaux != {})
				{
					var masques = JSON.parse(Data('masques') || '[]');
					masques.push(vaisseaux);
					Data('masques', JSON.stringify(masques));
					
					var html = '<tr valign="middle" align="right" class="item"><td nowrap="" align="left"><table class="clear" width="100%">';
					$.each(vaisseaux, function(nom, nombre){
						html += '<tr><td><a href="#"><b class="exilePP_masque">'+nom+'</b></a></td><td align="right">x'+nombre+'</td></tr>';
					});
					html += '</table></td><td colspan="4"></td><td align="center"><input type="button" value="Fabriquer les vaisseaux" /></td></tr>';
					html = $(html);
					$('input', html).click(function(){
						$.each(vaisseaux, function(nom, nombre){
							$('form b:contains('+nom+'):not(.exilePP_masque):eq(0)').parents('td[align=left]').nextAll(':last').find('input').val(nombre).keyup();
							setTimeout(function(){$('form').submit()}, 100);
						});
					});
					$('#exilePP_masques').after(html);
				}
			}).insertAfter('form input[type=submit]');
			
			if(Data('masques') != '[]')
				$('form table:eq(0) .header').after('<tr class="category" id="exilePP_masques"><td colspan="6">Masques de production</td></tr>');
			
			$.each(JSON.parse(Data('masques') || '[]'), function(i, vaisseaux){
				var html = '<tr valign="middle" align="right" class="item"><td nowrap="" align="left"><table class="clear" width="100%">';
				$.each(vaisseaux, function(nom, nombre){
					html += '<tr><td><a href="#"><b class="exilePP_masque">'+nom+'</b></a></td><td align="right">x'+nombre+'</td></tr>';
				});
				html += '</table></td><td colspan="4"></td><td align="center"><input type="button" value="Fabriquer les vaisseaux" /></td></tr>';
				html = $(html);
				$('input', html).click(function(){
					$.each(vaisseaux, function(nom, nombre){
						$('form b:contains('+nom+'):not(.exilePP_masque):eq(0)').parents('td[align=left]').nextAll(':last').find('input').val(nombre).keyup();
						setTimeout(function(){$('form').submit()}, 100);
					});
				});
				$('#exilePP_masques').after(html);
			});
		}
		if(document.location.pathname == '/game/chat.asp' && Option('smile') == 'true')
var Smileys={
	list:[],
	
	add:function() {
		for(var i=1; i<arguments.length; i++) this.list.push([arguments[0], arguments[i]]);
	},
	
	get:function(smiley) {
		for(var i=0; i<this.list.length; i++) if(this.list[i][1] == smiley)
		return this.list[i][0];
		return false;
	},
	
	isSmiley:function(word) {
		for(var i=0; i<this.list.length; i++) if(this.list[i][1] == word)
		return true;
		return false;
	}
}

Smileys.add('http://maitreillusionniste.free.fr/script/images/HC3.png', '^^\'', '^^"');
Smileys.add('http://maitreillusionniste.free.fr/script/images/GC3.png', '^^');
Smileys.add('http://maitreillusionniste.free.fr/script/images/confused-IC3.gif', ':s','=s',':S','=S');
Smileys.add('http://maitreillusionniste.free.fr/script/images/KC3.png', '-_-\'', '-_-"');
Smileys.add('http://maitreillusionniste.free.fr/script/images/JC3.png', '-_-');
Smileys.add('http://maitreillusionniste.free.fr/script/images/cry-MC3.png', ':cry:',':\'(');
Smileys.add('http://maitreillusionniste.free.fr/script/images/evil-NC3.png', ':evil:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/geek-QC3.png', ':geek:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/mrgreen-TC3.png', ':mrgreen:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/noel-UC3.png', ':noel:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/oo-VC3.png', ':Oo:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/redface-XC3.png', ':oops:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/shocked-YC3.png', ':shock:',':shocked:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/twisted-ZC3.png', ':twisted:');
Smileys.add('http://maitreillusionniste.free.fr/script/images/xd-0C3.png', 'xD', 'XD');
Smileys.add('http://maitreillusionniste.free.fr/script/images/envelope.gif', 'mp');

//Smileys.add('____________________________', '________');

old_formatLine = unsafeWindow.formatLine;
unsafeWindow.formatLine = function(author,line) {
	words = line.split(" ");
	mem = new Array();
	var j = 0;
	for(var i=0;i<words.length;i++) {
		if (Smileys.isSmiley(words[i]) && j < 3) {
			mem[j] = words[i];
			words[i] = '@'+j+'@';
			j = j + 1;
		}
	}
	line = words.join(' ');
	line = old_formatLine(author, line);
	words = line.split(" ");
	for(var i=0;i<words.length;i++) {
		if (words[i].match(/@([0-9]{1})@/)) {
			matches = words[i].match(/@([0-9]{1})@/);
			j = matches[1];
			words[i] = words[i].replace('@'+j+'@', '<img src="'+Smileys.get(mem[j])+'" class="smiley" alt="'+mem[j]+'" />');
		}
	}
	line = words.join(' ');
	return line;
}
	});
	Update($);
};

function intFr(val)
{
	return (''+(parseInt(val)|0)).split('').reverse().join('').replace(/(\d{3})/g, '$1 ').split('').reverse().join('').replace(/^\s+/, '');
}
function Option()
{
	if(Option.arguments.length == 1)
		return localStorage.getItem('option_'+Option.arguments[0]);
	else
		localStorage.setItem('option_'+Option.arguments[0], Option.arguments[1]);
}
function Data()
{
	if(Data.arguments.length == 1)
		return localStorage.getItem('data_'+Data.arguments[0]);
	else
		localStorage.setItem('data_'+Data.arguments[0], Data.arguments[1]);
}