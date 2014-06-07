// ==UserScript==
// @name           Colorier ligne event list chromeV1
// @namespace      Snaquekiller
// @version 0.5
// @include        http://*.ogame.*/game/index.php?page=over*
// @exclude http://*.ogame.*/game/index.php?page=buddies*
// @exclude http://*.ogame.*/game/index.php?page=notices*
// @exclude http://*.ogame.*/game/index.php?page=search*
// @exclude http://*.ogame.*/game/index.php?page=combatreport*
// @exclude http://*.ogame.*/game/index.php?page=jump*
// @exclude http://*.ogame.*/game/index.php?page=phalanx*
// @exclude http://*.ogame.*/game/index.php?page=techtree*
// @exclude http://*.ogame.*/game/index.php?page=techinfo*
// @exclude http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude http://*.ogame.*/game/index.php?page=show*
// ==/UserScript==
(function (unsafeWindow) {
// rajouter ligne 2260 			pointsFleet : GM_getValue(nomScript+"pointFlotte"+coordPM+serveur,''),	

/** Ceux qui veulent mettre le script que sur la vue générale changer **/
// @include        http://*.ogame.*/game/index.php?page=*
/** par **/
//@include        http://*.ogame.*/game/index.php?page=over*

/*** option temporaire ***/{
var bas = false;//metre true pour l'afficher en bas

	/** couleur de texte pour les differentes missions **/
	var color_transporter = '#3C563C';//couleur pour transporter
	var color_attaquer = '#CC2C3F';//couleur pour attaquer
	var color_detruire = '#E27616';//couleur pour detruire
	var color_expedition = '#3518BA';//couleur pour expedition
	var color_stationner = '#3B6650';//couleur pour stationner
	var color_exploiter = '#225B3F';//couleur pour exploiter
	var color_coloniser = '#31B2F7';//couleur pour coloniser
	var color_espionner = '#F4A824';//couleur pour espionner
	var color_attaque_grp = '#840A18';//couleur pour attaque groupe
	var color_defense_grp = '#1980E8';//couleur pour defense groupe

	var color_transport_allier = '#C18F03';
	var color_attaque_enemie = '#F90E16';
	var color_attaque_grp_enemie = '#C6676A';
	var color_stationner_allier = '#8767C6';
	var color_détruire_enemie = '#754D3C';
	var color_espionner_enemie = '#AD994A';
	var autre_css = "font-weight:bolder;";//css pour attaque, attaque grouper, et détruire enemie//text-decoration:blink;
	
	var opacity_retour = '0.5';// opacité de la ligne retour

	/** tableau de base **/
	var color_metal = '#7F1616;';
	var color_cristal = '#165A7F';
	var color_deut = '#1C871B';
	var color_point_vol = '#1B7A87';
	var color_pourcent = '#661B87';
	var color_nombre = '#871B61';

	/** autre tableau **/
	var tableau_info_plus = "none";//none pour pas afficher et block pour afficher
	var tableau_head_color = "#404444";
	var tableau_premiere_colone = "#727C7C";
	var tableau_autre_colone = "#6F996E";
}
/*** fin option ****/
var box = document.getElementById('eventboxContent');
box.setAttribute("style","display: block;");
var session = unsafeWindow.session;
var serveur = location.href.split('/')[2];
				//http://uni102.ogame.fr/game/css/01style.css  link 1
var numero_uni = document.getElementsByTagName('link')[1].href.split('/uni')[1].split('.ogame.')[0];

var nombre_planette_surcombien = document.getElementById('countColonies').getElementsByTagName('span')[0].innerHTML.split('/');
if(parseInt(nombre_planette_surcombien[0]) >= parseInt(nombre_planette_surcombien[1])){
var planette_colonisable = false;
}else{var planette_colonisable = true;}

	if(unsafeWindow.ifcDATA){//merci vulca pour infocompte
		var DATA = unsafeWindow.ifcDATA;
		var nb_point_flotte = parseInt(DATA.info.pointsFleet.replace( /[^0-9-]/g, ""));
	}
	
	function addPoints(nombre){
		if (nombre == '?') {return nombre;} 
		else if (nombre==0) {return nombre;} 
		else 
		{
			var signe = '';
			if (nombre<0)
			{
				nombre = Math.abs(nombre);
				signe = '-';
			}
			var str = nombre.toString(), n = str.length;
			if (n <4) {return signe + nombre;} 
			else 
			{
				return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
			}
		}
	}
	
function afficher_info(metal_sc, cristal_sc, deut_sc, point_total_sc, nb_total_sc, type_mission, coordonee_rajout){

		if(!document.getElementById('metal_sc_f')){
		var text_de_base = '<style type="text/css"> .metal_sc_m, .cristal_sc_m, .deut_sc_m{background-color:'+ tableau_autre_colone +';}'
				+' #tableau_mission, #tableau_coord{text-align: center;border: 2px inset #1B2323;position:relative;left:15%;width:70%;border-collapse:separate;}'
				+' .mission_sc, .coordonee_sc{background-color:'+ tableau_premiere_colone +';}'
				+'</style>'		
				+'<br/><span style="color:'+ color_metal +';">Metal : </span> <span id="metal_sc_f">0</span>'
				+'  \n<span style="color:'+ color_cristal +';">Cristal : </span> <span id="cristal_sc_f">0</span>'
				+'  \n<span style="color:'+ color_deut +';">Deut : </span> <span id="deut_sc_f">0</span>'
				+'  \n<br/><span style="color:'+ color_point_vol +';">Point en vol : </span> <span id="point_sc_f">0</span>'
				+'  \n<span style="color:'+ color_pourcent +';">Pourcentage : </span> <span id="pourc_sc_f">0</span>'
				+'  \n<span style="color:'+ color_nombre +';">Nombre de vaisseau : </span> <span id="nb_total_sc_f">0</span>'
				+'<span id="array_deja_fait" style="display:none;"></span><br/><br/>'
				+'<a href="#" id="plus_info"> Plus dinfo</a><br/><div id="tableau_anexe"><table id="tableau_coord">'
					+'<tr style="background-color:'+ tableau_head_color +';"><th>Coordonée</th><th>Métal</th><th>Cristal</th><th>Deut</th></tr></table><br/>'
				+'<table id="tableau_mission">'
					+'<tr style="background-color:'+ tableau_head_color +';"><th>Missions</th><th>Métal</th><th>Cristal</th><th>Deut</th></tr></table><br/></div>';
			var div_final = document.createElement('div');
			div_final.setAttribute('style','display:block;background:url("http://'+serveur+'/game/img/layout/eventList-body.gif") repeat-y scroll 5px 0px;background-color: transparent;background-clip: border-box;background-origin: padding-box;background-size: auto auto;');
			div_final.setAttribute('id','final_sc');
			div_final.innerHTML = text_de_base;
			document.getElementById('eventboxContent').getElementsByTagName('div')[0].insertBefore(div_final, document.getElementById('eventboxContent').getElementsByTagName('div')[0].getElementsByTagName('div')[1]); // On l'affiche
			
			document.getElementById('tableau_anexe').style.display = tableau_info_plus;
			document.getElementById('plus_info').addEventListener("click", function(event) 
			{
				var cellule = document.getElementById('tableau_anexe');
				if (cellule.style.display == 'none'){cellule.style.display = 'block';}
				else {cellule.style.display = 'none';}
			}, true);
		}

		{/***** tableau de base, point , metal cristal deut  total ***/
			var array_nb_point = document.getElementById('array_deja_fait').innerHTML;
			var nb_total_metal = parseInt(document.getElementById('metal_sc_f').innerHTML.replace(/[^0-9-]/g, ""));
			var nb_total_cristal = parseInt(document.getElementById('cristal_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			var nb_total_deut = parseInt(document.getElementById('deut_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			var nb_total_point = parseInt(document.getElementById('point_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			var nb_total_vaisseau = parseInt(document.getElementById('nb_total_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
				
					// on recupere les info infocomptes					
					if(unsafeWindow.ifcDATA){
						var DATA = unsafeWindow.ifcDATA;
						var nb_point_flotte = parseInt(DATA.info.pointsFleet.replace( /[^0-9-]/g, ""));
					}else{var nb_point_flotte = 1;}
										
					nb_total_metal = nb_total_metal + parseInt(metal_sc);
					document.getElementById('metal_sc_f').innerHTML = addPoints(nb_total_metal);
					
					nb_total_cristal = nb_total_cristal + parseInt(cristal_sc);
					document.getElementById('cristal_sc_f').innerHTML = addPoints(nb_total_cristal);
					
					nb_total_deut = nb_total_deut + parseInt(deut_sc);
					document.getElementById('deut_sc_f').innerHTML = addPoints(nb_total_deut);
					
					nb_total_point = nb_total_point + parseInt(point_total_sc);
					document.getElementById('point_sc_f').innerHTML = addPoints(nb_total_point);
					
					if(nb_point_flotte != 1){document.getElementById('pourc_sc_f').innerHTML = (Math.round((nb_total_point/nb_point_flotte)*1000))/10;}
					else{document.getElementById('pourc_sc_f').innerHTML = '?';}
					
					nb_total_vaisseau = nb_total_vaisseau + parseInt(nb_total_sc);	
					document.getElementById('nb_total_sc_f').innerHTML = addPoints(nb_total_vaisseau);
		}
		
		/**** tableau par rapport au coordonée et par rapport au mission ***/

		type_mission = type_mission.split('|')[1];
		var type_mission2 = type_mission.replace(/\s/g,"_");
		var coordonee_rajout2 = coordonee_rajout.replace(/[\[\]:]/g,"_");
		if(metal_sc != 0 || cristal_sc != 0 || deut_sc != 0){
			if(!document.getElementById(type_mission2)){
				var a_rajouter_au_div = '<td class="mission_sc" >'+ type_mission +'</td>'
				+'<td class="metal_sc_m">'+ addPoints(metal_sc) +'</td><td class="cristal_sc_m">'+ addPoints(cristal_sc) +'</td><td class="deut_sc_m">'+ addPoints(deut_sc) +'</td>';
				var tr_intermediaire = document.createElement('tr');
					tr_intermediaire.setAttribute('id', type_mission2);
					tr_intermediaire.innerHTML = a_rajouter_au_div;
				document.getElementById('tableau_mission').appendChild(tr_intermediaire);
			}
			else{
				var met_interm = parseInt(document.getElementById(type_mission2).getElementsByClassName('metal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var cri_interm = parseInt(document.getElementById(type_mission2).getElementsByClassName('cristal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var deut_interm = parseInt(document.getElementById(type_mission2).getElementsByClassName('deut_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
			
				document.getElementById(type_mission2).getElementsByClassName('metal_sc_m')[0].innerHTML = addPoints(metal_sc + met_interm);
				document.getElementById(type_mission2).getElementsByClassName('cristal_sc_m')[0].innerHTML = addPoints(cristal_sc + cri_interm);
				document.getElementById(type_mission2).getElementsByClassName('deut_sc_m')[0].innerHTML = addPoints(deut_sc + deut_interm);
			}
			
			if(!document.getElementById(coordonee_rajout2)){
				var a_rajouter_au_div2 = '<td class="coordonee_sc">'+ coordonee_rajout +'</td>'
				+'<td class="metal_sc_m">'+ addPoints(metal_sc) +'</td><td class="cristal_sc_m">'+ addPoints(cristal_sc) +'</td><td class="deut_sc_m">'+ addPoints(deut_sc) +'</td>';
				
				var tr_intermediaire2 = document.createElement('tr');
					tr_intermediaire2.setAttribute('id', coordonee_rajout2);
					tr_intermediaire2.innerHTML = a_rajouter_au_div2;
				document.getElementById('tableau_coord').appendChild(tr_intermediaire2);
			}
			else{
				var met_interm2 = parseInt(document.getElementById(coordonee_rajout2).getElementsByClassName('metal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var cri_interm2 = parseInt(document.getElementById(coordonee_rajout2).getElementsByClassName('cristal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var deut_interm2 = parseInt(document.getElementById(coordonee_rajout2).getElementsByClassName('deut_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
			
				document.getElementById(coordonee_rajout2).getElementsByClassName('metal_sc_m')[0].innerHTML = addPoints(metal_sc + met_interm2);
				document.getElementById(coordonee_rajout2).getElementsByClassName('cristal_sc_m')[0].innerHTML = addPoints(cristal_sc + cri_interm2);
				document.getElementById(coordonee_rajout2).getElementsByClassName('deut_sc_m')[0].innerHTML = addPoints(deut_sc + deut_interm2);
			}
		}
	}

function recupere_info_title(serveur, url, session, type_mission, coordonee_rajout){
		var $ = unsafeWindow.$;
		var serveur = location.href.split('/')[2];
		var session = unsafeWindow.session;
		$.get('http://'+ serveur +'/game/index.php?page=eventListTooltip&session='+ session +'&ajax=1&eventID='+ url, function(resp, e, i){
				var respTable = document.createElement('div');
				respTable.innerHTML = resp;
				var respTable_tr = respTable.getElementsByTagName('tr');
				var point_total = 0;
				var nb_total = 0;		
				var metal = 0;
				var cristal = 0;
				var deut = 0;
				vari = {
					pt: 'Petit transporteur:',gt: 'Grand transporteur:',cle: 'Chasseur léger:',clo: 'Chasseur lourd:',cro: 'Croiseur:',vb: 'Vaisseau de bataille:',vc: 'Vaisseau de colonisation:',rec: 'Recycleur:',esp: 'Sonde d`espionnage:',bb: 'Bombardier:',sat: 'Satellite solaire',dest: 'Destructeur:',edlm: 'Étoile de la mort:',tra: 'Traqueur:',
				}
				
				//on est dans la partie vaiseaux
				var vaisseau_perte = new Array('4', '12', '4', '10', '29', '60', '40', '18', '1' ,'90', '125', '10000', '85');
				var vaisseau = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.dest, vari.edlm, vari.tra);
				for(var u=1; u<(respTable_tr.length -4);u++){
					var type_vaisseau = respTable_tr[u].getElementsByTagName('td')[0].innerHTML;
					if(type_vaisseau != '&nbsp;'){
						for(var k=0; k<vaisseau.length ; k++)
						{
							if(type_vaisseau == vaisseau[k])
							{
								var nb_vaisseau_type = respTable_tr[u].getElementsByTagName('td')[1].innerHTML.replace( /[^0-9-]/g, "");
								point_total = point_total + parseInt(vaisseau_perte[k])*parseInt(nb_vaisseau_type);
								nb_total = nb_total + parseInt(nb_vaisseau_type);
							}
						}
					}
				}
				metal = metal + parseInt(respTable_tr[(u+1)].getElementsByTagName('td')[1].innerHTML.replace( /[^0-9-]/g, ""));
				cristal = cristal + parseInt(respTable_tr[(u+2)].getElementsByTagName('td')[1].innerHTML.replace( /[^0-9-]/g, ""));
				deut = deut + parseInt(respTable_tr[(u+3)].getElementsByTagName('td')[1].innerHTML.replace( /[^0-9-]/g, ""));	

				afficher_info(metal, cristal, deut, point_total, nb_total, type_mission, coordonee_rajout);					
		});
	}
	
function parseResponse(txt) {
	var elm = document.createElement('div');
		elm.innerHTML = txt;
		
		if(elm.getElementsByClassName("eventFleet")){
			var eventFleet = elm.getElementsByClassName("eventFleet");		
			var nbdetailfleet = "";
			var id_deja_fait = "";
			for(i=0 ; i< eventFleet.length ; i++){
				{/** on met a 10px chaque ligne **/
					eventFleet[i].getElementsByClassName("arrivalTime")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("missionFleet")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("originFleet")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("coordsOrigin")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("detailsFleet")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("destFleet")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("destCoords")[0].style.fontSize = '10px';
					eventFleet[i].getElementsByClassName("countDown")[0].style.fontSize = '10px';
				}
				
				var elem = eventFleet[i];
				var titre = elem.getElementsByClassName('tipsTitle')[0].title;
				var url = parseInt(elem.id.split('eventRow-')[1]);	
				var coordone_origin = elem.getElementsByClassName('coordsOrigin')[0].getElementsByTagName('a')[0].innerHTML;	
				var dest_origin = elem.getElementsByClassName('destCoords')[0].getElementsByTagName('a')[0].innerHTML;	
				
				if(titre =='Propre flotte|Exploiter'){
					 elem.setAttribute('style',"color:"+ color_exploiter +";font-weight:bold;");
				}else if(titre =='Propre flotte|Exploiter (R)'){
					recupere_info_title(serveur, url, session, titre, coordone_origin);
					elem.setAttribute('style',"color:"+ color_exploiter +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
					 
				else if(titre =='Propre flotte|Transporter'){
					id_deja_fait = id_deja_fait +";"+ url;
					recupere_info_title(serveur, url, session, titre, dest_origin);
					elem.setAttribute('style',"color:"+ color_transporter +";font-weight:bold;");
				}else if(titre =='Propre flotte|Transporter (R)'){
					if(id_deja_fait.indexOf((url-1)) == -1){
						id_deja_fait = id_deja_fait +";"+ url;
						recupere_info_title(serveur, url, session, titre, coordone_origin);
					}
					elem.setAttribute('style',"color:"+ color_transporter +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
				
				else if(titre =='Propre flotte|Stationner'){
					recupere_info_title(serveur, url, session, titre, dest_origin);
					elem.setAttribute('style',"color:"+ color_stationner +";font-weight:bold;");
				}else if(titre =='Propre flotte|Stationner (R)'){
					recupere_info_title(serveur, url, session, titre, coordone_origin);
					elem.setAttribute('style',"color:"+ color_stationner +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
				
				else if(titre =='Propre flotte|Coloniser'){					
					elem.setAttribute('style',"color:"+ color_coloniser +";font-weight:bold;");
					if(planette_colonisable == true){
						id_deja_fait = id_deja_fait +";"+ url;
						recupere_info_title(serveur, url, session, titre, dest_origin);
					}
				}else if(titre =='Propre flotte|Coloniser (R)'){
					if(id_deja_fait.indexOf((url-1)) == -1){
						id_deja_fait = id_deja_fait +";"+ url;					
						recupere_info_title(serveur, url, session, titre, coordone_origin);
					}
					elem.setAttribute('style',"color:"+ color_coloniser +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
				
				else if(titre =='Propre flotte|Attaquer'){
					elem.setAttribute('style',"color:"+ color_attaquer +";font-weight:bold;");
				}else if(titre =='Propre flotte|Attaquer (R)'){
					recupere_info_title(serveur, url, session, titre, coordone_origin);
					elem.setAttribute('style',"color:"+ color_attaquer +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
				
				else if(titre =='Propre flotte|Expédition'){
					elem.setAttribute('style',"color:"+ color_expedition +";font-weight:bold;");
				}else if(titre =='Propre flotte|Expédition (R)'){
					recupere_info_title(serveur, url, session, titre, coordone_origin);
					elem.setAttribute('style',"color:"+ color_expedition +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
				
				else if(titre =='Propre flotte|Détruire'){
					elem.setAttribute('style',"color:"+ color_detruire +";font-weight:bold;");
				}else if(titre =='Propre flotte|Détruire (R)'){
					recupere_info_title(serveur, url, session, titre, coordone_origin);
					elem.setAttribute('style',"color:"+ color_detruire +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
			
				
				else if(titre =='Propre flotte|Espionner'){
					elem.setAttribute('style',"color:"+ color_espionner +";font-weight:bold;");
				}else if(titre =='Propre flotte|Espionner (R)'){
					 elem.setAttribute('style',"color:"+ color_espionner +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
			
				else if(titre.indexOf('Défense') != -1){
					 elem.setAttribute('style',"color:"+ color_defense_grp +";font-weight:bold;");
				}else if(titre =='Propre flotte|Attaque groupée (R)'){
					recupere_info_title(serveur, url, session, titre, coordone_origin);
					elem.setAttribute('style',"color:"+ color_attaque_grp +";font-style:italic;font-weight:normal;opacity:"+ opacity_retour +";");}
					
				else if(titre =='Flotte neutre|Transporter'){
					elem.setAttribute('style',"color:"+ color_transport_allier +";font-weight:bold;");
				}else if(titre == 'Flotte ennemi|Attaquer'){
					elem.setAttribute('style',"color:"+ color_attaque_enemie +";"+autre_css+";");
				}else if(titre == 'Flotte ennemi|Espionner'){
					elem.setAttribute('style',"color:"+ color_espionner_enemie +";font-weight:bold;");
				}else if(titre == 'Flotte ennemi|Attaque groupée'){
					elem.setAttribute('style',"color:"+ color_attaque_grp_enemie +";"+autre_css+";");
				}else if(titre == 'Flotte ennemi|Détruire'){
					elem.setAttribute('style',"color:"+ color_détruire_enemie +";"+autre_css+";");
				}else if(titre == 'Flotte neutre|Stationner chez cet allié'){
					elem.setAttribute('style',"color:"+ color_stationner_allier +";font-weight:bold;");
				}

				/*** recupere le pseudo du joueur si flotte allié/enemie**/

				if(eventFleet[i].getElementsByClassName("sendMail")[0].getElementsByTagName('a')[0]){				
					var pseudo = eventFleet[i].getElementsByClassName("sendMail")[0].getElementsByTagName('a')[0].title.split('message à ')[1];
					var pseudo_rajouter ='<br/> <a href="http://www.war-riders.de/fr/'+numero_uni +'i/details/player/'+ pseudo+'" target="_blank" class="a_war_rider">'+pseudo +'</a>';
					var span_pseudo = document.createElement('span');
						span_pseudo.innerHTML = pseudo_rajouter;
						if(titre.indexOf('Propre flotte') == -1){
							eventFleet[i].getElementsByClassName("originFleet")[0].appendChild(span_pseudo);
						}else{
							eventFleet[i].getElementsByClassName("destFleet")[0].appendChild(span_pseudo);
						}
				}
			}
		}		
		if(elm.getElementsByClassName("allianceAttack")){
			var allianceAttack = elm.getElementsByClassName("allianceAttack");		
			var nbdetailfleet = "";
			var id_deja_fait = "";
			for(i=0; i< allianceAttack.length ; i++){
				{/** on met a 10px chaque ligne **/
					allianceAttack[i].getElementsByClassName("arrivalTime")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("missionFleet")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("originFleet")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("coordsOrigin textBeefy")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("detailsFleet")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("destFleet")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("destCoords")[0].style.fontSize = '10px';
					allianceAttack[i].getElementsByClassName("friendly textBeefy")[0].style.fontSize = '10px';
				}
				
				var elem2 = allianceAttack[i];
				var titre = elem2.getElementsByClassName('tipsTitle')[0].title;
				var url = parseInt(elem2.id.split('eventRow-')[1]);	
								
				if(titre.indexOf('|Attaque groupée') != -1){
					 elem2.setAttribute('style',"color:"+ color_attaque_grp +";font-weight:bold;");
				}	
			}
		}	
	return elm.innerHTML;
}
	
var $ = unsafeWindow.$;
unsafeWindow.jQuery("#eventboxContent").slideDown('fast');
if (typeof unsafeWindow.loadEvents.loaded == 'undefined') {//aller merci monkey pour sa fonction.
	$("#eventboxContent").html('<img height="16" width="16" src="img/ajax-loader.gif" />');
	$.get('/game/index.php?page=eventList&session=' + session + '&ajax=1', function(response) {
		$("#eventboxContent").html(parseResponse(response));
		$("#eventHeader .close_details").click(unsafeWindow.toggleEvents);
		unsafeWindow.loadEvents.loaded = true;
	}); 
}
unsafeWindow.checkEventList = function(){}
unsafeWindow.initAjaxEventbox();
unsafeWindow.initAjaxEventbox = function(){};

if(bas == true){// merci benneb
	var eventboxContent = document.getElementById('eventboxContent');
	var contentWrapper = document.getElementById('contentWrapper');
	contentWrapper.removeChild(eventboxContent);
	contentWrapper.appendChild(eventboxContent);
}
})(window);
