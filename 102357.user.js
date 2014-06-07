// ==UserScript==
// @name           [WOD]Filtrer le rapports de donjons
// @description    Filtrer vos rapports de donjon par héros, méchant, attaque, défense, buff..
// @namespace      world-of-dungeons.fr
// @include        *.world-of-dungeons.fr/wod/spiel//dungeon/report.php*
// @version        1.1.3
// @author         Atchoum
// @require        http://userscripts.org/scripts/source/102357.user.js?maxage=7&method=show
// ==/UserScript==

var updateButton;
var list_all_names = new Array();
var level1 = true;
var my_name;
var X,Y;

if (document.getElementsByName('level[1]')[0]) {updateButton = document.getElementsByName('level[1]');level1=false;}
else {if (document.getElementsByName('disabled')[0].value == 'Rapport') {updateButton = document.getElementsByName('disabled');}}

for(var i = 0; i < updateButton.length; i++ )	{
	if (updateButton[i].value != 'Rapport') {
	   var btn_vue_heros = document.createElement('input');
	   btn_vue_heros.setAttribute('type', 'button');
	   btn_vue_heros.setAttribute('class', 'button');
	   btn_vue_heros.setAttribute('name', 'filtrage_heros'+i);
	   btn_vue_heros.setAttribute('id', 'filtrage_heros'+i);
	   btn_vue_heros.setAttribute('value', 'Filtrage');
	   btn_vue_heros.addEventListener('click',montre_filtrage,false);
	   updateButton[i].parentNode.insertBefore(btn_vue_heros, updateButton[i].previousSibling);
	}
}

if (document.addEventListener){document.addEventListener("mousedown",catch_mouse, false);}
else if (document.attachEvent) {document.attachEvent("onmousedown",catch_mouse);}

my_name = getElementsByClass("changeHeroLink")[1];
my_name = my_name.firstChild.firstChild.alt;


function montre_filtrage () {
	if (document.getElementById('heros_options')) {
		if (document.getElementById('heros_options').style.display == "none") {
			var ou_est_on = Y - document.body.scrollTop - 150;
			document.getElementById('heros_options').style.top = "3em";
			document.getElementById('heros_options').style.right = "0.3em";
			document.getElementById('heros_options').style.display = "";
			//alert(document.body.scrollTop + " / " + Y + " / " + X);
		} else 
			document.getElementById('heros_options').style.display = "none";
	} else {
		// on récupère tous les noms de amis, ennemis, npc et familiers
		list_all_names = get_names();

		// on crée la feuille d'options
		var class_heros_options = document.createElement('style');
		class_heros_options.type = 'text/css';
		class_heros_options.innerHTML = '.vue_heros_options {position: fixed;background-color: black;border: 1px solid white;padding: 0.5em;z-index: 9999;}';
		document.getElementsByTagName('head')[0].appendChild(class_heros_options);

		var class_heros_options = document.createElement('style');
		class_heros_options.type = 'text/css';
		class_heros_options.innerHTML = '.lst_heros {margin:0 0.2em;padding:0.2em 0.5em;}';
		document.getElementsByTagName('head')[0].appendChild(class_heros_options);

		var class_heros_options = document.createElement('style');
		class_heros_options.type = 'text/css';
		class_heros_options.innerHTML = '.lst_heros_inside {float:left; margin-right:0.5em;padding:0em;}';
		document.getElementsByTagName('head')[0].appendChild(class_heros_options);

		var class_heros_label = document.createElement('style');
		class_heros_label.type = 'text/css';
		class_heros_label.innerHTML = '.lst_heros_label {font-size: 14px;font-style: bold;color: #FFCF00;margin-right: 0.3em;}';
		document.getElementsByTagName('head')[0].appendChild(class_heros_label);

		var class_heros_label = document.createElement('style');
		class_heros_label.type = 'text/css';
		class_heros_label.innerHTML = '.lst_tous_aucun {font-size: 10px;font-style: bold;color: #FFCF00;width:100%;text-align:right;margin: 0;padding:0.1em 0;}';
		document.getElementsByTagName('head')[0].appendChild(class_heros_label);

		var heros_option = document.createElement("div");
		heros_option.setAttribute('class', 'vue_heros_options');
		heros_option.setAttribute('style', 'display:none;');
		heros_option.setAttribute('id', 'heros_options');
		document.body.appendChild(heros_option);

		/*var label_heros = document.createElement("span");
		label_heros.setAttribute('class', 'lst_heros_label');
		label_heros.appendChild(document.createTextNode("Bloc attaquants / défenseurs:"));

		heros_option.appendChild(label_heros);
		var slt_preliminaire = document.createElement( "select" );
		slt_preliminaire.setAttribute("name","voir_infos_AD");
		slt_preliminaire.setAttribute("id","voir_infos_AD");
		slt_preliminaire.setAttribute("style","margin-right: 1em;");

		var prelim_option1 = document.createElement("option");
		prelim_option1.appendChild(document.createTextNode("filtrer"));
		prelim_option1.setAttribute("value","1");
		slt_preliminaire.appendChild(prelim_option1);
	
		var prelim_option2 = document.createElement("option");
		prelim_option2.appendChild(document.createTextNode("complet"));
		prelim_option2.setAttribute("selected","selected");
		prelim_option2.setAttribute("value","2");
		slt_preliminaire.appendChild(prelim_option2);
	
		var prelim_option3 = document.createElement("option");
		prelim_option3.appendChild(document.createTextNode("cacher"));
		prelim_option3.setAttribute("value","3");
		prelim_option3.setAttribute("selected","selected");
		slt_preliminaire.appendChild(prelim_option3);
	  
		heros_option.appendChild(slt_preliminaire);*/

		var label_heros = document.createElement("span");
		label_heros.setAttribute('class', 'lst_heros_label');
		label_heros.appendChild(document.createTextNode("Tours Préliminaires:"));

		heros_option.appendChild(label_heros);
		var slt_preliminaire = document.createElement( "select" );
		slt_preliminaire.setAttribute("name","voir_tour_prelim");
		slt_preliminaire.setAttribute("id","voir_tour_prelim");

		var prelim_option1 = document.createElement("option");
		prelim_option1.appendChild(document.createTextNode("filtrer"));
		prelim_option1.setAttribute("value","1");
		slt_preliminaire.appendChild(prelim_option1);
	
		var prelim_option2 = document.createElement("option");
		prelim_option2.appendChild(document.createTextNode("complet"));
		prelim_option2.setAttribute("value","2");
		slt_preliminaire.appendChild(prelim_option2);
	
		var prelim_option3 = document.createElement("option");
		prelim_option3.appendChild(document.createTextNode("cacher"));
		prelim_option3.setAttribute("value","3");
		slt_preliminaire.appendChild(prelim_option3);
	  
		heros_option.appendChild(slt_preliminaire);
		
		heros_option.appendChild(document.createElement( "hr" ));

		var div_lst_players = document.createElement("div");
		div_lst_players.setAttribute('class', 'lst_heros');
		heros_option.appendChild(div_lst_players);

		var label_heros = document.createElement("span");
		label_heros.setAttribute('class', 'lst_heros_label');
		label_heros.appendChild(document.createTextNode("Héros du groupe"));
		
		div_lst_players.appendChild(label_heros);
		div_lst_players.appendChild(document.createElement( "br" ));
	
		var div_lst_players_inside = document.createElement("div");
		div_lst_players_inside.setAttribute('class', 'lst_heros_inside');
		div_lst_players.appendChild(div_lst_players_inside);

		var div_lst_players_inside2 = document.createElement("div");
		div_lst_players_inside2.setAttribute('class', 'lst_heros_inside');
		div_lst_players.appendChild(div_lst_players_inside2);

		var moitie_heros = Math.round(list_all_names['amis'].length / 2);
		for(var i = 0; i < list_all_names['amis'].length; i++) {
			var nom_nettoye = nettoyer_chaine(list_all_names['amis'][i]);
			var cb = document.createElement( "input" );
			cb.type = "checkbox";
			cb.id = "cb_" + nom_nettoye;
			cb.value = nom_nettoye;
			cb.checked = false;
			cb.addEventListener('click',cb_rules,false);
			
			var label_heros = document.createElement("label");
			label_heros.setAttribute("for","cb_" + nom_nettoye);
			var txt_heros = document.createTextNode(list_all_names['amis'][i]);
			label_heros.appendChild(txt_heros);

			if (i < moitie_heros) {
				div_lst_players_inside.appendChild(cb);
				div_lst_players_inside.appendChild(label_heros);
				div_lst_players_inside.appendChild(document.createElement( "br" ));
			} else {
				div_lst_players_inside2.appendChild(cb);
				div_lst_players_inside2.appendChild(label_heros);
				div_lst_players_inside2.appendChild(document.createElement( "br" ));
			}
		};

		var br_clear = document.createElement("br");
		br_clear.setAttribute("style","clear:both;");
		div_lst_players.appendChild(br_clear);

		var div_lst_players = document.createElement("div");
		div_lst_players.setAttribute('class', 'lst_heros');
		heros_option.appendChild(div_lst_players);

		var label_heros = document.createElement("span");
		label_heros.setAttribute('class', 'lst_heros_label');
		label_heros.appendChild(document.createTextNode("Npc"));
	
		div_lst_players.appendChild(label_heros);
		div_lst_players.appendChild(document.createElement( "br" ));

		if (list_all_names['npc'].length > 0) { 
			for(var i = 0; i < list_all_names['npc'].length; i++) {
				var nom_nettoye = nettoyer_chaine(list_all_names['npc'][i]);
				var cb = document.createElement( "input" );
				cb.type = "checkbox";
				cb.id = "cb_" + nom_nettoye;
				cb.value = nom_nettoye;
				cb.checked = false;
				cb.addEventListener('click',cb_rules,false);
				
				var label_heros = document.createElement("label");
				label_heros.setAttribute("for","cb_" + nom_nettoye);
				var txt_heros = document.createTextNode(list_all_names['npc'][i]);
				label_heros.appendChild(txt_heros);
				   
				div_lst_players.appendChild(cb);
				div_lst_players.appendChild(label_heros);
				div_lst_players.appendChild(document.createElement( "br" ));
			};
		} else {
			div_lst_players.appendChild(document.createTextNode("aucun npc"));
		}

		var div_lst_players = document.createElement("div");
		div_lst_players.setAttribute('class', 'lst_heros');
		heros_option.appendChild(div_lst_players);
		
		var label_heros = document.createElement("span");
		label_heros.setAttribute('class', 'lst_heros_label');
		label_heros.appendChild(document.createTextNode("Familiers"));

		div_lst_players.appendChild(label_heros);
		div_lst_players.appendChild(document.createElement( "br" ));

		if (list_all_names['familiers'].length > 0) { 
			for(var i = 0; i < list_all_names['familiers'].length; i++) {
				var nom_nettoye = nettoyer_chaine(list_all_names['familiers'][i]);
				var cb = document.createElement( "input" );
				cb.type = "checkbox";
				cb.id = "cb_" + nom_nettoye;
				cb.value = nom_nettoye;
				cb.checked = false;
				cb.addEventListener('click',cb_rules,false);
				
				var label_heros = document.createElement("label");
				label_heros.setAttribute("for","cb_" + nom_nettoye);
				var txt_heros = document.createTextNode(list_all_names['familiers'][i]);
				label_heros.appendChild(txt_heros);
				   
				div_lst_players.appendChild(cb);
				div_lst_players.appendChild(label_heros);
				div_lst_players.appendChild(document.createElement( "br" ));
			};
		} else {
			div_lst_players.appendChild(document.createTextNode("aucun familier"));
			div_lst_players.appendChild(document.createElement( "br" ));
		}

		var cb = document.createElement( "input" );
		cb.type = "checkbox";
		cb.id = "cb_groupe_tous_aucun";
		cb.checked = false;
		cb.addEventListener('click',cb_groupe_tous_aucun,false);
		
		var label_tous_aucun = document.createElement("label");
		label_tous_aucun.setAttribute("for","cb_groupe_tous_aucun");
		var txt_tous_aucun = document.createTextNode("Tous / Aucun");
		label_tous_aucun.appendChild(txt_tous_aucun);

		var div_tous_aucun = document.createElement("div");
		div_tous_aucun.setAttribute('class', 'lst_tous_aucun');
		div_lst_players.appendChild(div_tous_aucun);
		
		div_tous_aucun.appendChild(label_tous_aucun);
		div_tous_aucun.appendChild(cb);

		heros_option.appendChild(document.createElement( "hr" ));
		
		var div_lst_players = document.createElement("div");
		div_lst_players.setAttribute('class', 'lst_heros');
		heros_option.appendChild(div_lst_players);

		var label_heros = document.createElement("span");
		label_heros.setAttribute('class', 'lst_heros_label');
		label_heros.appendChild(document.createTextNode("Méchants"));

		div_lst_players.appendChild(label_heros);
		div_lst_players.appendChild(document.createElement( "br" ));

		if (list_all_names['ennemis'].length > 0) { 
			for(var i = 0; i < list_all_names['ennemis'].length; i++) {
				var nom_nettoye = nettoyer_chaine(list_all_names['ennemis'][i]);
				var cb = document.createElement( "input" );
				cb.type = "checkbox";
				cb.id = "cb_" + nom_nettoye;
				cb.value = nom_nettoye;
				cb.checked = false;
				cb.addEventListener('click',cb_rules2,false);
				
				var label_heros = document.createElement("label");
				label_heros.setAttribute("for","cb_" + nom_nettoye);
				var txt_heros = document.createTextNode(list_all_names['ennemis'][i]);
				label_heros.appendChild(txt_heros);
				   
				div_lst_players.appendChild(cb);
				div_lst_players.appendChild(label_heros);
				div_lst_players.appendChild(document.createElement( "br" ));
			};
		} else {
			div_lst_players.appendChild(document.createTextNode("aucun adversaire"));
		}

		var cb = document.createElement( "input" );
		cb.type = "checkbox";
		cb.id = "cb_ennemis_tous_aucun";
		cb.checked = false;
		cb.addEventListener('click',cb_ennemis_tous_aucun,false);
		
		var label_tous_aucun = document.createElement("label");
		label_tous_aucun.setAttribute("for","cb_ennemis_tous_aucun");
		var txt_tous_aucun = document.createTextNode("Tous / Aucun");
		label_tous_aucun.appendChild(txt_tous_aucun);

		var div_tous_aucun = document.createElement("div");
		div_tous_aucun.setAttribute('class', 'lst_tous_aucun');
		div_lst_players.appendChild(div_tous_aucun);
		
		div_tous_aucun.appendChild(label_tous_aucun);
		div_tous_aucun.appendChild(cb);
		//div_tous_aucun.appendChild(document.createElement( "br" ));

		heros_option.appendChild(document.createElement( "hr" ));

		var label_opt_AD = document.createElement("span");
		label_opt_AD.setAttribute('class', 'lst_heros_label');
		label_opt_AD.setAttribute('title', "option 'que les bufs' montre les buffs des 2 côtés et les options 'attaques & buffs' et 'défenses & buffs' que les buffs pour le côté en question");
		label_opt_AD.appendChild(document.createTextNode("Att / Déf / Buffs:"));

		heros_option.appendChild(label_opt_AD);

		var slt_AD = document.createElement( "select" );
		slt_AD.setAttribute("name","voir_AD");
		slt_AD.setAttribute("id","voir_AD");

		var prelim_option1 = document.createElement("option");
		prelim_option1.appendChild(document.createTextNode("que les attaques"));
		prelim_option1.setAttribute("value","1");
		slt_AD.appendChild(prelim_option1);
	
		var prelim_option2 = document.createElement("option");
		prelim_option2.appendChild(document.createTextNode("que les défenses"));
		prelim_option2.setAttribute("value","2");
		slt_AD.appendChild(prelim_option2);

		var prelim_option3 = document.createElement("option");
		prelim_option3.appendChild(document.createTextNode("que les buffs"));
		prelim_option3.setAttribute("value","3");
		slt_AD.appendChild(prelim_option3);

		var prelim_option4 = document.createElement("option");
		prelim_option4.appendChild(document.createTextNode("attaques & buffs"));
		prelim_option4.setAttribute("value","4");
		slt_AD.appendChild(prelim_option4);

		var prelim_option5 = document.createElement("option");
		prelim_option5.appendChild(document.createTextNode("défenses & buffs"));
		prelim_option5.setAttribute("value","5");
		slt_AD.appendChild(prelim_option5);
	
		var prelim_option6 = document.createElement("option");
		prelim_option6.appendChild(document.createTextNode("les trois"));
		prelim_option6.setAttribute("value","6");
		slt_AD.appendChild(prelim_option6);
	  
		heros_option.appendChild(slt_AD);

		heros_option.appendChild(document.createElement( "hr" ));
	
		var btn_heros_options = document.createElement('input');
		btn_heros_options.setAttribute('type', 'button');
		btn_heros_options.setAttribute('class', 'button');
		btn_heros_options.setAttribute('value', 'valider');
		btn_heros_options.setAttribute("style","width:33%;");
		btn_heros_options.addEventListener('click',gogogo,false);
		heros_option.appendChild(btn_heros_options);

		var btn_heros_options = document.createElement('input');
		btn_heros_options.setAttribute('type', 'button');
		btn_heros_options.setAttribute('class', 'button');
		btn_heros_options.setAttribute('title', 'revenir à la situation initiale');
		btn_heros_options.setAttribute('value', 'reset');
		btn_heros_options.setAttribute("style","width:33%;");
		btn_heros_options.addEventListener('click',annuler_filtre,false);
		heros_option.appendChild(btn_heros_options);

		var btn_heros_options2 = document.createElement('input');
		btn_heros_options2.setAttribute('type', 'button');
		btn_heros_options2.setAttribute('class', 'button');
		btn_heros_options2.setAttribute('title', "fermer la genêtre d'option");
		btn_heros_options2.setAttribute('value', 'fermer');
		btn_heros_options2.setAttribute("style","width:33%;");
		btn_heros_options2.addEventListener('click',cacher_filtrage,false);
		heros_option.appendChild(btn_heros_options2);

		// se rappelle lui-même pour se montrer maintenant qu'il est créé
		montre_filtrage();
	}
}
function gogogo (mouse_evt, bln_annule) {
	var opt_prelim = document.getElementById("voir_tour_prelim").value;
	var opt_AD = document.getElementById("voir_AD").value;
	//var opt_blocAD = document.getElementById("voir_infos_AD").value;
	var opt_heronames = new Array();
	var arr_ennemis = new Array();
	var arr_lst_selection = new Array();

	// Récupération des héros/npc/familiers/ennemis sélectionnés
	for (var cat in list_all_names) {
		for(var i = 0; i < list_all_names[cat].length; i++) {
			if (document.getElementById("cb_" + nettoyer_chaine(list_all_names[cat][i])).checked) {arr_lst_selection[arr_lst_selection.length] = list_all_names[cat][i];}
		}
	}

	// Retrouver la bonne table
	var tableList = getElementsByClass('content_table');
	tableList = level1?tableList[2]:tableList[0];

	tableList = tableList.getElementsByTagName('table');

	// Dans la liste des tables dans content_table, ne pas prendre la 1ère qui est la description
	for(var j = 1; j < tableList.length; j++ )	{
		/*if (tableList[j].className == "rep_status_table") {
			// on est dans les blocs AD
			var trList = tableList[j].getElementsByTagName('tr');
			for(var i = 1; i < trList.length; i++ )	{
				if (trList[i].getElementsByTagName('td')[1] && trList[i].getElementsByTagName('td')[1].className == "hero") {
					alert(trList[i].getElementsByTagName('td')[1].className + " / " + opt_blocAD);
					var effectOnLine = false;
					if (opt_blocAD == 1) {
						var td1 = trList[i].getElementsByTagName('td')[1];
						if (td1 && td1.getElementsByTagName('a')[0]) {
							var name_perso = td1.getElementsByTagName('a')[0].innerHTML;
							if (!in_array(name_perso, arr_lst_selection))	effectOnLine = true;
						}
					} else if (opt_blocAD == 3) {
						effectOnLine = true;
					}
					if (effectOnLine) {
						trList[i].setAttribute('style', 'display:none;');
						//trList[i+1].setAttribute('style', 'display:none;');
					} else {
						trList[i].setAttribute('style', 'display:;');
						//trList[i+1].setAttribute('style', 'display:;');
					}
				}
			}
		// Les bonnes tables pour les tours préliminaires et tours sont celles sans attributs Class
		} else*/ if (!tableList[j].className) {
			// On récupère toutes les lignes pour chacune ds bonnes tables
			var trList = tableList[j].getElementsByTagName('tr');
			for(var i = 0; i < trList.length; i++ )	{
				if (trList[i].getElementsByTagName('td')[1]) {
					var effectOnHero = false;
					var td0 = trList[i].getElementsByTagName('td')[0];

					if (bln_annule) {
						// demande d'annulation du filtre
						effectOnHero = true;
					} if (opt_prelim == 2 && !td0.getElementsByTagName('span')[0]) {
						// Si Tour préliminaire complet
						effectOnHero = true;
					} else if (!(opt_prelim == 3 && !td0.getElementsByTagName('span')[0])) {
						// Si tour préliminaire filtré et pour toutes les lignes d'actions
						// Récupératin du nom à gauche (attaquant / buffeur)
						var name_persoG;
						var bln_persoG_groupe = false;
						var td1 = trList[i].getElementsByTagName('td')[1];
						if (td1 && td1.getElementsByTagName('a')[0]) {
							var tmpA = td1.getElementsByTagName('a')[0];
							name_persoG = tmpA.innerHTML;
							if (!in_array(name_persoG, list_all_names["ennemis"])) bln_persoG_groupe = true;
						}

						// Récupération des noms à droite (défenseurs / buffés)
						var td2 = trList[i].getElementsByTagName('td')[2];
						var bln_persoD_groupe = false;
						var name_persoD = new Array();

						if (td2 && td2.getElementsByTagName('a')[0]){
							var tmpB = td2.getElementsByTagName('a');
							for(var k = 0; k < tmpB.length; k++ )	{
								name_persoD[name_persoD.length] = tmpB[k].innerHTML;
							}
							// cas spécial de 'soi-même' qui apparaît quand on se buff soi-même
							if (td2.innerHTML.indexOf("soi-même") >= 0) {
								for (var k = 0; k < name_persoD.length; k++ )	{
									if (name_persoD[k].indexOf("soi-même") >= 0) name_persoD[k] = name_persoG;
								}
							}

						// cas spécial où il n'y a qu'un 'soi-même à droite et donc aucun lien (<a>)
						} else if (td2 && td2.innerHTML.indexOf("soi-même") >= 0){
							name_persoD[0] = name_persoG;
						}
						
						// on regarde si la personne à droite fait partie du groupe
						if (name_persoD[0] && !in_array(name_persoD[0], list_all_names["ennemis"])) bln_persoD_groupe = true;

						// tour préliminaire (on est dans le cas du TP filtré)
						if (!td0.getElementsByTagName('span')[0]) {
							// On regarde s'il est à gauche
							if (in_array(name_persoG, arr_lst_selection)) {
								effectOnHero = true;
							} else {
								// On regarde s'il est à droite
								for(var k = 0; k < name_persoD.length; k++ )	{
									if (in_array(name_persoD[k], arr_lst_selection)) {
										effectOnHero = true;
										break;
									}
								}
							}
						// combats
						} else if (name_persoG && name_persoD && name_persoD.length > 0)  {
							var bln_est_a_D = false;
							// On regarde s'il est à droite
							for(var k = 0; k < name_persoD.length; k++ )	{
								if (in_array(name_persoD[k], arr_lst_selection)) bln_est_a_D = true;
							}
							// Si ce sont du groupe/adversaires à G et à D, on est dans les buffs
							if ((bln_persoG_groupe && bln_persoD_groupe) || (!bln_persoG_groupe && !bln_persoD_groupe)) {
								// Si la sélection est à gauche et que ce sont les attaques + buffs ou que les buffs qui sont demandés
								if (in_array(name_persoG, arr_lst_selection) && in_array(opt_AD, new Array(3, 4, 6))) {
									effectOnHero = true;
								// Si la sélection est à droite et que ce sont les défenses + buffs qui sont demandés
								} else if (bln_est_a_D && in_array(opt_AD, new Array(3, 5, 6))) {
									effectOnHero = true;
								}
							// S'il est à gauche et que ce sont les attaques ou tout qui sont demandées
							} else if (in_array(name_persoG, arr_lst_selection) && in_array(opt_AD, new Array(1, 4, 6)))	{
								effectOnHero = true;
							// S'il est à groite et que ce sont les défenses ou tout qui sont demandées
							} else if (bln_est_a_D && in_array(opt_AD, new Array(2, 5, 6))) {
								effectOnHero = true;
							}
						}
					}

					if (!effectOnHero) {
						trList[i].setAttribute('style', 'display:none;');
						trList[i+1].setAttribute('style', 'display:none;');
					} else {
						trList[i].setAttribute('style', 'display:;');
						trList[i+1].setAttribute('style', 'display:;');
					}
				}
			}
		}
	}
}
function annuler_filtre() {
	cb_rules();
	cb_rules2();

	gogogo(null, true);
}
function cb_rules () {
	for(var i = 0; i < list_all_names['ennemis'].length; i++) {document.getElementById("cb_" + nettoyer_chaine(list_all_names['ennemis'][i])).checked = false;}
	document.getElementById("cb_ennemis_tous_aucun").checked = false;
}
function cb_rules2 () {
	['amis', 'npc', 'familiers'].forEach(function(element, index, array) {
		for(var i = 0; i < list_all_names[element].length; i++) {document.getElementById("cb_" + nettoyer_chaine(list_all_names[element][i])).checked = false;}
	});
	document.getElementById("cb_groupe_tous_aucun").checked = false;
}
function cb_groupe_tous_aucun() {
	var bln_tous = document.getElementById("cb_groupe_tous_aucun").checked?true:false;
	['amis', 'npc', 'familiers'].forEach(function(element, index, array) {
		for(var i = 0; i < list_all_names[element].length; i++) {document.getElementById("cb_" + nettoyer_chaine(list_all_names[element][i])).checked = bln_tous;}
	});
	cb_rules();
}
function cb_ennemis_tous_aucun() {
	var bln_tous = document.getElementById("cb_ennemis_tous_aucun").checked?true:false;
	for(var i = 0; i < list_all_names['ennemis'].length; i++) {document.getElementById("cb_" + nettoyer_chaine(list_all_names['ennemis'][i])).checked = bln_tous;}
	cb_rules2();
}
function cacher_filtrage() {
	document.getElementById('heros_options').style.display = "none";
}
function get_names () {
	var nom;
	var bln_attaquant;
	var arr_noms = new Array();
	arr_noms['amis'] = new Array();
	arr_noms['npc'] = new Array();
	arr_noms['familiers'] = new Array();
	arr_noms['ennemis'] = new Array();
	var reg_nom=new RegExp("(\<img .*\>)");

	// on récupère les membres du groupe via la colonne "Mon Groupe" à droite
	var div_heronames = getElementsByClass('heroname');
	div_heronames.shift();
	div_heronames.forEach(function(element, index, array) {
		arr_noms['amis'][arr_noms['amis'].length] =  element.firstChild.innerHTML.replace(reg_nom, '');
	});

	// on récupère toutes les tables des défendeurs et attaquants
	var table_noms = getElementsByClass('rep_status_table');
	for(var i = 0; i < table_noms.length; i++ )	{
		// on check si on est dasn le tableau des défenseurs ou attaquant
		var str_quel_cote = table_noms[i].previousSibling.previousSibling;
		if (str_quel_cote.innerHTML.indexOf("Attaquant") >= 0) {bln_attaquant = true;} else {bln_attaquant = false;}
		
		var trList = table_noms[i].getElementsByTagName('tr');
		for(var j = 1; j < trList.length; j++ )	{
			var td = trList[j].getElementsByTagName('td')[1];
			if (td && td.getElementsByTagName('a')[0]) {
				nom = td.getElementsByTagName('a')[0].innerHTML;
				if (bln_attaquant) {
					// on est dans le tableaux des attaquants	
					if (nom && !in_array(nom, arr_noms['amis'])) {
						// ce n'est pas un des héros du groupe, donc c'est un npc ou familier
						// la familier à un 'appartient à' dans son texte 
						if (td.getElementsByTagName('span').length > 0 && td.innerHTML.indexOf('appartient') >= 0) {
							// c'est un familier
							if (!in_array(nom, arr_noms['familiers'])) arr_noms['familiers'][arr_noms['familiers'].length] =  nom;
						} else {
							// c'est un npc
							if (!in_array(nom, arr_noms['npc'])) arr_noms['npc'][arr_noms['npc'].length] =  nom;
						}
					}
				} else {
					// on est dans le tableaux des défenseurs
					if (nom && !in_array(nom, arr_noms['ennemis'])) arr_noms['ennemis'][arr_noms['ennemis'].length] =  nom;
				}
			}
		}
	}
	return arr_noms;
}
/*
 * Fonctions diverses et variées
 */
function nettoyer_chaine(chaine) {
 var norm = new Array('À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï', 'Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','Þ','ß', 'à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','ý','þ','ÿ',' ',"'",'"',"!",'&','-','@','#','$',',',';',':','=');
 var spec = new Array('A','A','A','A','A','A','A','C','E','E','E','E','I','I','I','I', 'D','N','O','O','O','0','O','O','U','U','U','U','Y','b','s', 'a','a','a','a','a','a','a','c','e','e','e','e','i','i','i','i','d','n','o','o','o','o','o','o','u','u','u','u','y','y','b','y','_','_','_','_','_','_','_','_','_','_','_','_','_');
 if (chaine && chaine!= "") {	return preg_replace (norm, spec, chaine); }
}
function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) el[j++] = tags[i];
	} 
	return el;
} 
function preg_replace (array_pattern, array_pattern_replace, my_string)  {
	var new_string = String (my_string);
	for (i=0; i<array_pattern.length; i++) {
		var reg_exp= RegExp(array_pattern[i], "gi");
		var val_to_replace = array_pattern_replace[i];
		new_string = new_string.replace (reg_exp, val_to_replace);
	}
	return new_string;
}
function in_array (needle, haystack, argStrict) {
  var key = '', strict = !! argStrict;
  if (strict) {
  	for (key in haystack) {if (haystack[key] === needle) {return true;}}
  } else {
    for (key in haystack) {if (haystack[key] == needle) {return true;}}
  }
  return false;
}
function catch_mouse(e) {
	if (!e) e= event;
	X= e.pageX;
  Y= e.pageY;
}