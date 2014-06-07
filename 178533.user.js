// ==UserScript==
// @name	3GM Improvements
// @namespace	http://userscripts.org/users/munto
// @version	1.01
// @description	Améliore l'utilisation du jeu 3gm.fr
// @include	http://www.3gm.fr/game/*
// @include	http://3gm.fr/game/*
// @include	http://www.3e-guerre-mondiale.fr/game/*
// @include	http://3e-guerre-mondiale.fr/game/*
// @updateURL   http://userscripts.org/scripts/source/178533.meta.js
// @downloadURL http://userscripts.org/scripts/source/178533.user.js
// @icon        http://www.toopix.eu/userfiles/2db3da0e8a08e5dea3f2593eceef300c.png
// @grant	none
// ==/UserScript==

function reverse(s){
    return s.toString().split('').reverse().join('');
}

// Espacement des milliers, millions...
function spaceNumbers(num){
	return reverse(reverse(num).replace(/(.{3})/g, '$1 '));
}

(function(){
	// Tchat de l'alliance
	if(window.location.href.split('/')[4] == 'my_ally.php'){
		// Augmente la taille de la boite pour écrire un message
		$('textarea').css('height', '52px');
		// Adapte la taille du tchat à la hauteur du body
		$('.ally_right > .centre_content_texte > div').css('height', ($('.centre_content_texte').eq(1).height() - 20));
	}
	
	// Change le lien de la carte pour être pile sur le bord
	var current_base = $('#header_player_info .select_ins option:selected').text();
	var basename = $.trim(current_base.split("\n")[0]);
	var pos_brut = $.trim(current_base.split("\n")[1]);
	var pos = pos_brut.replace('[', '').replace(']', '').split('-');
	var f = 0;
	if(pos[0] - 4 < 100) { pos[0] = 100; f = 1; } else { pos[0] = pos[0] - 4; }
	if(pos[1] - 4 < 100) { pos[1] = 100; f = 1; } else { pos[1] = pos[1] - 4; }
	if(f){
		$('.menu').first().find('a[href="map.php"]').attr('href', 'map.php?x='+pos[0]+'&y='+pos[1]);
	}
	
	// Déplace la carte de 10 cases quand on clique sur les flèches
	if($('a[name="map"]').length == 1){
		var decalage = 10;
		var x = parseInt($('input[name=x]').val());
		var y = parseInt($('input[name=y]').val());

		$('.right').parent('a').attr('href', 'map.php?x=' + (x + decalage) + '&y=' + y + '#map');
		$('.left').parent('a').attr('href', 'map.php?x=' + (x - decalage) + '&y=' + y + '#map');
		$('.down').parent('a').attr('href', 'map.php?x=' + x + '&y=' + (y + decalage) + '#map');
		$('.up').parent('a').attr('href', 'map.php?x=' + x + '&y=' + (y - decalage) + '#map');
	}

	// Messagerie
	if($('#accueil_msg').length > 0){
		// Supprime automatiquement les messages de "retour de mission" et de livraison vers ou depuis un PA
		var chflag = 0;
		var basenames = new Array();
		var pseudo = $('#header_player_info div:last-child div:first-child > div').text().match('\\w+')[0];
		// Construction de la regex pour chaque base
		$('#header_player_info .select_ins option').each( function(){
			basenames.push($.trim($(this).text().split("\n")[0]));
		});
		var basereg = basenames.join('|');
		var matchreg = '(\\[(' + basereg + ')\\] (Retour|Cargaison de ' + pseudo + '|Livré chez ' + pseudo + '))';
		$('div[class^="conversation"]').each( function(){
			if($(this).find('div:eq(3)').text().match(matchreg)) {
				$('input[name="message_select['+$(this).attr('id')+']"]').click();
				chflag = 1;
			}
		});
		if(chflag == 1){
			var deletemsg = function(){ $('#del_selected').click(); };
			setTimeout(deletemsg, 1000);
		}

		// Ajout d'une checkbox pour sélectionner tous les messages
		if($('#titre_liste_msg').length > 0){
			$('#tri_objet').prepend('<span style="margin: 0 4px"><input type="checkbox" id="checkAll" /></span>');
			$('#tri_correspondant').css('line-height', '19px');
			$('#tri_date').css('line-height', '19px');

			$('#checkAll').click( function(){
				$('.btn_checkbox input[type="checkbox"]').click();
			});
		}
	}
	
	// Enregistrement des infos sur les forces armées
	if(window.location.href.split('/')[4] == 'troops.php'){
		if(localStorage.nbre_unites){
			var nbre_unites = JSON.parse(localStorage.nbre_unites);
		} else {
			var nbre_unites = new Object();
		}
		var unites = new Array();
		var capacite_transport = new Object();
		// Parcours toutes les unités
		$('div[id="informations_batiment"]').each( function(el){
			var unit_details = $(this).find('.centre_content_texte div:eq(0) div');
			var unit_name = $.trim(unit_details.eq(3).text()).replace(' ', '_');
			var unit_nb = $.trim(unit_details.eq(2).text());
			// Regroupement du nombre des unités
			if(!nbre_unites[unit_name]){
				nbre_unites[unit_name] = new Object();
			}
			nbre_unites[unit_name][pos_brut] = unit_nb;
			
			// Regroupement des capacités de transport
			capacite_transport[unit_name] = parseFloat($(this).find('table tr:eq(4) td').text());
			
			// Regroupe les caractéristiques de toutes les unités offensives
			unites[el] = { 'type' : unit_name };
			unites[el].carac = new Object();
			$(this).find('table tr:gt(0)').each( function(){
				unites[el].carac[$(this).find('th').text()] = parseFloat($(this).find('td').text());
			});
		});
		localStorage.nbre_unites		= JSON.stringify(nbre_unites);
		localStorage.capacite_transport = JSON.stringify(capacite_transport);
		localStorage.unites				= JSON.stringify(unites);
	}
	
	// Enregistrement des infos sur le système de défense
	if(window.location.href.split('/')[4] == 'defense.php'){
		if(localStorage.nbre_defenses){
			var nbre_defenses = JSON.parse(localStorage.nbre_defenses);
		} else {
			var nbre_defenses = new Object();
		}
		var defenses = new Array();
		// Parcours toutes les défenses
		$('div[id="informations_batiment"]').each( function(el){
			var unit_details = $(this).find('.centre_content_texte div:eq(0) div');
			var unit_name = $.trim(unit_details.eq(3).text()).replace(' ', '_');
			var unit_nb = $.trim(unit_details.eq(2).text());
			// Regroupement du nombre des unités
			if(!nbre_defenses[unit_name]){
				nbre_defenses[unit_name] = new Object();
			}
			nbre_defenses[unit_name][pos_brut] = unit_nb;
			
			// Regroupe les caractéristiques de toutes les défenses
			defenses[el] = { 'type' : unit_name };
			defenses[el].carac = new Object();
			$(this).find('table:last tr:gt(0)').each( function(){
				defenses[el].carac[$(this).find('th').text()] = parseFloat($(this).find('td').text());
			});
		});
		localStorage.nbre_defenses	= JSON.stringify(nbre_defenses);
		localStorage.defenses		= JSON.stringify(defenses);
	}
	
	// Ajout de la vue d'ensemble des unités offensives et défensives
	if($('.news_title_home').length > 0){
		if(localStorage.unites){
			var unites = JSON.parse(localStorage.unites);
			var nbre_unites = JSON.parse(localStorage.nbre_unites);
			var table_attack = '<table id="rank_table" style="font-weight: bold"><tr><th>Unités offensives</th><th>Nombre</th><th>Puissance</th><th>Blindage</th><th>Vitesse</th><th>Capacité</th><th>Embarquement</th><th>Conso</th></tr>';
			for(u in unites){
				table_attack += '<tr><th style="background:#2E2B24">'+ unites[u].type.replace('_', ' ') +'</th>'
								+ '<td>'+ nbre_unites[unites[u].type][pos_brut] +'</td>'
								+ '<td>'+ unites[u].carac['Puissance'] +'</td>'
								+ '<td>'+ unites[u].carac['Blindage'] +'</td>'
								+ '<td>'+ unites[u].carac['Vitesse'] +'</td>'
								+ '<td>'+ unites[u].carac['Capacité transport'] +'</td>'
								+ '<td>'+ unites[u].carac['Embarquement'] +'</td>'
								+ '<td>'+ unites[u].carac['Consommation'] +'</td></tr>'
								;
			}
			table_attack += '</table>';
			$('table#rank_table:last').after(table_attack);
		}
		
		if(localStorage.defenses){
			var defenses = JSON.parse(localStorage.defenses);
			var nbre_defenses = JSON.parse(localStorage.nbre_defenses);
			var table_defense = '<table id="rank_table" style="font-weight: bold"><tr><th>Unités défensives</th><th>Nombre</th><th>Puissance</th><th>Blindage</th></tr>';
			for(d in defenses){
				table_defense += '<tr><th style="background:#2E2B24">'+ defenses[d].type +'</th>'
								+ '<td>'+ nbre_defenses[defenses[d].type][pos_brut] +'</td>'
								+ '<td>'+ defenses[d].carac['Puissance'] +'</td>'
								+ '<td>'+ defenses[d].carac['Blindage'] +'</td></tr>'
								;
			}
			table_defense += '</table>';
			$('table#rank_table:last').after(table_defense);
		}
		$('table#rank_table').css({ 'width': 750, 'margin-bottom': 10 });
	}
	
	// Préparation des missions
	if($('#positionX').length > 0){
		// Centre le tableau des unités
		$('.rapport_th:first').parent().parent().css('width', '430px');
		
		// Affiche la capacité totale des troupes sélectionnées
		if(localStorage.capacite_transport){
			$('.rapport_vague_titre:eq(1)').before('<div style="margin: auto; text-align:center; padding-bottom: 10px;">Capacité totale des troupes : <span id="total_capacite_unite"></span></div>');
			var units = JSON.parse(localStorage.capacite_transport);
		
			function calculateTotal(){
				var total = 0;
				$('input[title="Nombre"]').each(function(){
					if($(this).val() == '') $(this).val(0);
					var curr = units[$(this).attr('id').substr(2)] * parseInt($(this).val());
					total += curr;
				});
				$("#total_capacite_unite").html(spaceNumbers(total));
			}

			$('input[title="Nombre"]').keyup(function(){
				calculateTotal();
			});
			$('.max_btn').click(function(){
				setTimeout(calculateTotal, 100);
			});
		}

		// Suppression de la base actuelle dans Accès Rapide
		$('#select_rapid_pa option').each( function(){
			if($(this).text() == basename){
				$(this).remove();
			}
		});

		// Ajout des cibles persos dans les accès rapides
		if(localStorage.cibles){
			var cibles = JSON.parse(localStorage.cibles);
			for(c in cibles){
				$('#select_rapid_pa').append('<optgroup label="'+c+'"></optgroup>');
				for(cc in cibles[c]){
					$('optgroup[label="'+c+'"]').append('<option id="'+cc+'" name="perso" class="res_value" value="'+cibles[c][cc]+'">'+cc+'</option>');
				}
			}
		}
		$('#select_rapid_pa').append('<option name="add" value=";">- Ajouter une cible -</option>');
		
		// Mémorisation des coordonnées déjà rentrées dans l'option d'ajout d'une cible
		$('#select_rapid_pa').click( function(){
			$(this).find('[name="add"]').val($('#positionX').val()+';'+$('#positionY').val());
		});
		
		$('#select_rapid_pa').change( function(){
			var option_name = $(this).find('option:selected').attr('name');
			if(option_name == undefined){				// Accès par défaut (PA)
				$('select[name="mission"]').find('option[value="transport"]').attr('selected', 'selected');
				$('#cible_form, #remove_cible').css('display', 'none');
			} else if(option_name == 'add'){			// Ajouter une cible
				$('#cible_form').css('display', 'block');
				$('#remove_cible').css('display', 'none');
			} else if(option_name == 'perso'){			// Cibles persos
				$('#remove_cible').css('display', 'inline');
				$('#cible_form').css('display', 'none');
			} else {									// Séparation des cibles persos (nom de la base)
				$('#cible_form, #remove_cible').css('display', 'none');
			}
		});
		
		// Création du formulaire pour ajouter et supprimer une cible
		$('#select_rapid_pa').parent().css('position', 'relative').append('<span id="remove_cible" title="Retirer cette cible" style="position: absolute; top: 4px; right: -10px; color: grey; font-size: 16px; font-weight: bold; cursor: pointer; display: none;">X</span>');
		$('.rapport_vague_titre:eq(1)').next().append('<div id="cible_form" style="width: 140px; margin: 10px auto 0px; display: none;"><div style="font-size: 0.8em; text-transform: uppercase; padding-bottom: 5px; color: cyan;">Nouvelle cible</div><div style="margin-bottom: 5px;"><input type="text" placeholder="Nom" id="cible_pseudo" class="input_ins" style="width: 120px; height: 14px; text-align:center"></div><div style="position: relative; width: 70px; float:left;"><span style="position: absolute; left: -30px; top: 5px; color: grey; cursor: pointer;" title="Copier les coordonnées du dessus" id="copy_coord">Copy</span><input type="text" placeholder="Secteur" id="cibleX" class="input_ins" style="width:50px;height: 14px; text-align:center"></div><div style="width:70px; float:left"><input type="text" placeholder="Région" id="cibleY" class="input_ins" style="width:50px;height: 14px; text-align:center"></div><div class="clear"></div><div id="groupes" style="position: relative; margin-top: 5px;"><span id="add_cible" class="msg_btn" style="position: absolute; padding: 3px; top: 1px; right: -45px; text-transform: none;">Ajouter</span></div><div><input type="text" placeholder="Nom du groupe" id="group_name" class="input_ins" style="width: 120px; height: 14px; text-align: center; margin-top: 5px; display: none;"></div></div>');
		$('#groupes').prepend('<span id="delete_group" style="position: absolute; color: grey; left: -36px; top: 5px; cursor: pointer; display: none;" title="Supprimer ce groupe">Suppr.</span><select id="group" class="select_ins" style="height: 22px;"><option name="nogroup" class="res_value">- Groupe -</option></select>');
		// Ajout de groupes dans la combobox
		if(cibles){
			for(g in cibles){
				$('#group').append('<option name="group" style="font-weight: bold">'+g+'</option>');
			}
		}
		$('#group').append('<option name="add_group"class="res_value">- Ajouter un groupe -</option>');
		
		$('#group').change( function(){
			var select_gpe_name = $(this).find('option:selected').attr('name');
			if(select_gpe_name == 'add_group'){
				$('#group_name').css('display', 'inline').focus();
				$('#delete_group').css('display', 'none');
			} else if(select_gpe_name == 'nogroup') {
				$('#delete_group').css('display', 'none');
				$('#group_name').css('display', 'none').val('');
			} else {
				$('#delete_group').css('display', 'inline');
				$('#group_name').css('display', 'none').val('');
			}
		});
		
		// Effet du bouton "Copy"
		$('#copy_coord').click( function(){
			$('#cibleX').val( $('#positionX').val() );
			$('#cibleY').val( $('#positionY').val() );
		});
		
		// Effet du bouton "Ajouter"
		$('#add_cible').click( function(){
			if(localStorage.cibles){
				var new_cible = JSON.parse(localStorage.cibles);
			} else {
				var new_cible = new Object();
			}
			
			var name = $.trim($('#cible_pseudo').val());
			var coordx = $.trim($('#cibleX').val());
			var coordy = $.trim($('#cibleY').val());
			var select_name = $('#group option:selected').attr('name');
			if(select_name == 'group'){
				var groupe = $('#group option:selected').val();
			} else if(select_name == 'nogroup'){
				var groupe = 'Cibles perso';
			} else {
				var groupe = $.trim($('#group_name').val());
			}
			
			if(name == ''){ alert('Veuillez donner un nom à votre cible'); }
			else if(coordx == '' || coordy == ''){ alert('Veuillez compléter les coordonnées de votre cible'); }
			else if(groupe == '') { alert('Veuillez donner un nom au groupe de votre cible'); }
			else {
				if(!new_cible[groupe]){
					new_cible[groupe] = new Object();
				}
				if(new_cible[groupe][name]){
					if(!confirm("Une cible portant ce nom existe déjà. Voulez-vous l'écraser ?")){
						return false;
					}
				}

				// Enregistrement de la cible
				new_cible[groupe][name] = coordx + ';' + coordy;
				localStorage.cibles = JSON.stringify(new_cible);

				// Ajout du groupe dans la liste des groupes
				if($('#group option[id="'+groupe+'"]').length == 0){
					$('#group option[name="add_group"]').before('<option id="'+groupe+'" name="group" style="font-weight: bold">'+groupe+'</option>');
					$('#group option[id="'+groupe+'"]').attr('selected', 'selected');
				}
				
				// Ajout de la cible dans les accès rapides ou modifie seulement ces coordonnées
				if($('optgroup[label="'+groupe+'"] #'+name).length == 0){
					if($('optgroup[label="'+groupe+'"]').length == 0){
						$('#select_rapid_pa option[name="add"]').before('<optgroup label="'+groupe+'"></optgroup>');
					}
					$('optgroup[label="'+groupe+'"]').append('<option id="'+name+'" name="perso" class="res_value" value="'+new_cible[groupe][name]+'">'+name+'</option>');
				} else {
					$('optgroup[label="'+groupe+'"] #'+name).val(new_cible[groupe][name]);
				}
				
				// Nettoyage après ajout d'une cible
				$('#group_name').css('display', 'none');
				$('#cible_pseudo, #cibleX, #cibleY, #group_name').val('');
				$('#delete_group').css('display', 'inline');
				$('#positionX').val(coordx);
				$('#positionY').val(coordy);
			}
		});
		
		// Supprimer une cible
		$('#remove_cible').click( function(){
			if(confirm('Vous allez supprimer la cible sélectionnée')){
				var cible_selected = $('#select_rapid_pa option:selected');
				var cible = cible_selected.attr('id');
				var group = cible_selected.parent('optgroup').attr('label');
				var cibles = JSON.parse(localStorage.cibles);
				delete cibles[group][cible];
				localStorage.cibles = JSON.stringify(cibles);
				cible_selected.remove();
				$('#positionX, #positionY').val('');
				$(this).css('display', 'none');
			}
		});
		
		// Supprimer un groupe
		$('#delete_group').click( function(){
			if(confirm("En supprimant ce groupe, vous supprimerez toutes les cibles qu'il contient.")){
				var group = $('#groupes option:selected').text();
				var cibles = JSON.parse(localStorage.cibles);
				delete cibles[group];
				localStorage.cibles = JSON.stringify(cibles);
				$('optgroup[label="'+group+'"]').remove();
				$('#groupes option:selected').remove();
				$(this).css('display', 'none');
			}
		});
		
		// Ajoute un drone par défaut pour une mission d'espionnage
		if(window.location.search.indexOf('m=espionnage') != -1 && $('#q_Drones-cyclopes').length > 0){
			$('#q_Drones-cyclopes').val(1);
		}
	}
	
	// Répartition des ressources pour un transport ou un ghost
	var reg = new RegExp('[.]', 'g');
	if($('#speed_pourcentage').length > 0){
		//Ajout des boutons min/max
		$('.res_bloc').each( function(){
			$(this).append('<div class="max_btn" style="color: grey; cursor: pointer;">Max</div>');
			$(this).append('<div class="min_btn" style="display: none;">Min</div>');
		});
		
		// Capacité maximum des troupes
		function getMaxi(){
			return parseInt($('.rapport_vague_titre').eq(1).next().text().split(' ').reverse()[0].replace(reg, ''));
		}
		
		// Total des ressources déjà réparties
		function getTotal(){
			var sum = 0;
			$('.res_value_input:not(:hidden)').each( function(){
				sum += ($(this).val() == '') ? 0 : parseInt($(this).val());
			});
			
			return sum;
		}
		
		// Affiche le total des ressources réparties
		function updateTotal(){
			var maxi = getMaxi();
			var total = getTotal();
			$('#current_res').html(total);
			if(total > maxi){
				$('#current_res').css('color', 'red');
			} else if(total == maxi) {
				$('#current_res').css('color', 'green');
			} else {
				$('#current_res').css('color', '#E6DEA0');
			}
		}
		
		// Set max ressources
		$('.max_btn').click( function(){
			// type de ressource
			var ress = $(this).parent().children(':first').attr('class');
			var capacity = getMaxi();
			// Ressource disponible
			var myress = parseInt($('#' + ress).text().replace(reg, ''));
			// Quantité des ressources déjà embarquées
			var total = getTotal();
			// Quantité de ressources encore possible à embarquer
			var remain = capacity - total;
			console.log(remain > 0);
			if(remain > 0){
				if(myress < remain){
					if(ress == 'res_alliage'){
						$(this).parent().children().eq(1).val(myress);
					} else {
						$(this).parent().children().eq(1).find('input').val(myress);
					}
				} else {
					if(ress == 'res_alliage'){
						$(this).parent().children().eq(1).val(remain);
					} else {
						$(this).parent().children().eq(1).find('input').val(remain);
					}
				}
				// Remplace le bouton Max par le bouton Min
				$(this).removeProp('style').css('display', 'none');
				$(this).next().removeProp('style').css({color: "grey", cursor: "pointer"});
				updateTotal();
			}
		});
		
		$('.min_btn').click( function(){
			// type de ressource
			var ress = $(this).parent().children(':first').attr('class');
			if(ress == 'res_alliage'){
				$(this).parent().children().eq(1).val(0);
			} else {
				$(this).parent().children().eq(1).find('input').val(0);
			}
			// Remplace le bouton Min par le bouton Max
			$(this).removeProp('style').css('display', 'none');
			$(this).prev().removeProp('style').css({color: "grey", cursor: "pointer"});
			updateTotal();
		});
		
		// Affichage du total des ressources déjà rentrées
		$('.res_bloc:last').after('<div class="clear"></div><div style="text-align:center; padding-top: 10px;">Ressources à envoyer : <span id="current_res" style="font-weight: bold;"></span></div>');

		// Affiche "En kilo" dans chaque input
		$('.res_value_input:not(:hidden)').each( function(){
			$(this).removeAttr('value').removeAttr('onclick').attr('placeholder', 'En kilo');
		});
		
		// Multiplication des ressources par 1000
		$('.res_value_input').change( function(){
			if($(this).val() == '') $(this).val(0);
			$(this).val(parseFloat($(this).val()) * 1000);
			updateTotal();
		});
		
		// Controle la quantité des ressources avant d'effectuer l'envoi
		if($.trim($('#temps_voyage').prev().text().split(':')[1]) == 'transport'){
			$('input[name="send2"]').click( function(event){
				event.stopPropagation();
				if(getMaxi() < getTotal()){
					if(!confirm("Vous essayez d'envoyer plus de ressources que vos unités peuvent en transporter.\nConfirmer l'envoi des troupes ?")){
						return false;
					}
				}
				$('form[action="mission.php"]').submit();
			});
		}
	}

	// Ajouter une indication sur le temps restant avant d'atteindre le plafond de l'entrepot
	$('.ressource_bloc .res_info').each( function(){
		if($(this).find('span').text() != 'Aucune information.'){
			// Récupère la valeur actuelle avec la capacité de l'entrepot
			var value = $(this).find('span:first').text().split('/');
			var current = parseInt(value[0].replace(reg, ''));
			var unite = value[1].substr(-1);
			switch(unite.toLowerCase()){
				case 'k':
					var facteur = 1000;
					break;
				case 'm':
					var facteur = 1000000;
					break;
				case 'g':
					var facteur = 1000000000;
					break;
			}
			var maxi = parseFloat(value[1].substr(0, (value[1].length - 1))) * facteur;
			// Quantité en plus par heure
			var ratio = parseInt($(this).find('div[style="color:white"]').text().replace(reg, ''));
			var temps = Math.round((maxi - current) / ratio * 3600);
			if(temps > 0){
				var timeToDisplay = tempsAffichage(temps);
				var maxElem = '<div style="color: red">Max atteint dans: ' + timeToDisplay + '</div>';
			} else {
				var maxElem = '<div style="color: red">Max déjà atteint</div>';
			}
			$(this).append(maxElem);
		}
	});
	
	// Affiche la quantité totale des ressources
	var res_tot = 0;
	$('.ressource_inf').each( function(){
		if($(this).attr('id') != 'res_energie'){
			res_tot = res_tot + parseInt($(this).text().replace(reg, ''));
		}
	});
	var new_elem = '<div class="ressource_bloc" style="width: 70px;">';
	new_elem += '<div style="height: 16px; padding-top: 22px;" ><b>Total</b></div>';
	new_elem += '<div><b>' + spaceNumbers(res_tot) + '</b></div>';
	$(new_elem).prependTo('#ressources');
	
	$('#ressources').css('width', '556px');
})();