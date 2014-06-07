// ==UserScript==
// @id             	Ogame_Director
// @name          	Ogame Director
// @version        	1.272
// @namespace      	http://play-4-fun.net/
// @author 			Skyline <skyline@play-4-fun.net> http://play-4-fun.net/
// @description    	Pour toutes informations, questions veillez consulter la page officiel http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-et-tableurs/1041721-scriptish-ogame-director-userscript/
// @HomepageURL 	http://play-4-fun.net/
// @SupportURL 		http://play-4-fun.net/forums.php?action_forum=forum&id_forum=4
// @priority  		1
// @run-at         	document-end
// @updateURL 		http://userscripts.org/scripts/source/125519.user.js
// @resource		icon_director http://play-4-fun.net/divers/ogame/ogame_director/resources/icon_director.png
// @resource		temperature http://play-4-fun.net/divers/ogame/ogame_director/resources/temperature.png
// @resource		entete_retoucher http://play-4-fun.net/divers/ogame/ogame_director/resources/Ogame_entete_bySkyline.png
// @resource  		jqueryUICSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/base/jquery-ui.css
// @resource		lang_defaut http://play-4-fun.net/divers/ogame/ogame_director/lang/fr.lang
// @include       	http://*.ogame.*
// @exclude       	http://uni670.ogame.*
// @exclude			http://board.ogame.*
// @require 		https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.4.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js

// ==/UserScript==
var version_script = 1.272;
var mode = 'normal'; //Merci de na pas toucher cette valeur cela pourrais causer des pertes de données sur le serveur si modifier au mauvais moment !!!
var text_news = '<p>FR - Correction timer enchère<br/>- Mise à jours plug-in Jquery, Jqueri UI et JSON<br/><br/><br/>EN - - Fixed timer Auction  <br/>- Update plug-in Jquery, JSON and Jquery UI <br/><br/>Pour tout autre bugs merci de me le signaler sur le forum Ogame :<a href="http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-tableurs/1041721-ogame-director-userscript/" target="_blank">Report bug</a> </p>';


var JQ = jQuery.noConflict(true); //Ont place le framwerk JQuery dans une vas pour ?viter les conflis avec d\'autre framwork avec le "1"
var Chrome = navigator.userAgent.indexOf('Chrome')>-1;
var Opera = navigator.userAgent.indexOf('Opera')>-1;
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1; 
JQ('head meta:last').after('<meta content="Ogame_director_'+ version_script +'" name="userscript">');

JQ('body').append('<div id="grisure" style="display: none; background-color: black; position: absolute; top: 0px; z-index: 1000; opacity: 0.5; width: 100%; height: 120%;"></div>');

//*** Nouveautée Director ***//
if(version_script > GM_getValue('version_script', 0)){
	GM_setValue('version_script', JQ.toJSON(version_script));
	JQ('#grisure').css('display', 'block');
	JQ('body').append('<div style="position: absolute; left: 30%; width: 40%; height: 50%; top: 25%; z-index: 1001; background: none repeat scroll 0% 0% black;" id="box_patchnote"><h3 id="titre_box_patchnote" style="font: bold 1.2em \'comic Sans MS\'; text-align: center; padding-top: 5px;">Nouveautées Director Version : '+ version_script +' '+ mode +'</h3><div id="contenu_box_patchnote" style="padding: 10px 15px">'+ text_news +'</div><input type="button" value="Fermer" id="fermer_box_patchnote" style="position: absolute; top: 90%; left: 50%;" onclick="var box = document.getElementById(\'box_patchnote\'); box.style.display = \'none\'; var grisure = document.getElementById(\'grisure\'); grisure.style.display = \'none\';"/></div>');
}

//***************** Test si ont est compatible avec les fonction scriptish ********************//GM_setClipboard 
if(((typeof GM_getMetadata) == 'function') && ((typeof GM_notification) == 'function') && ((typeof GM_setClipboard) == 'function') ){
		var module_userscript = 'SI';
}else if(Chrome){
	var module_userscript = 'TM';
}else{
	if(GM_getValue('message_compatibilitee_GM', true)){
		GM_setValue('message_compatibilitee_GM', false);
		alert('!!! Attention !!! \n\nAffin de profité au maximum des fonctions du script "Ogame director", nous vous conseillons d\'utiliser "scriptish" qui est un module FireFox comme Greasemonkey. \n\nScriptish est compatible avec tout les scripts utiliser par Greasemonkey et permet en plus de nombreuse possibilité comme un système natif de mise à jours automatique des scripts (si les script sont prévu pour Scriptish).\n\nSa message ne s\'affichera que cette fois ci, le script peux être utiliser avec Greasemonkey mais certaine fonction serons desactivée pour cause de non compatibilité.');
	}
	var module_userscript = 'GM';
}
	
//********************************************************************************************//
function httpRequete(){
	this.envoie  = function(page, fonction){
		var ret = GM_xmlhttpRequest({
		  method: this.method,
		  url: this.url + page + this.dataEnvoie,
		  onload: function(retour) {
			fonction(retour.responseText);
		  },
		  onerror: function(retour){
			var msg = "Erreur fonction httpRequete->envoie :"
				+ "\nresponseText: " + retour.responseText
				+ "\nreadyState: " + retour.readyState
				+ "\nresponseHeaders: " + retour.responseHeaders
				+ "\nstatus: " + retour.status
				+ "\nstatusText: " + retour.statusText
				+ "\nfinalUrl: " + retour.finalUrl;
			fonction(msg);
		  }
		});
	};	
	this.demande = function(page, fonction){
		var ret = GM_xmlhttpRequest({
		  method: this.method,
		  url: this.url + page + this.dataEnvoie,
		  onload: function(retour) {
			fonction(retour.responseText);
		  },
		  onerror: function(retour) {
			var msg = "Erreur fonction httpRequete->retour :"
				+ "\nresponseText: " + retour.responseText
				+ "\nreadyState: " + retour.readyState
				+ "\nresponseHeaders: " + retour.responseHeaders
				+ "\nstatus: " + retour.status
				+ "\nstatusText: " + retour.statusText
				+ "\nfinalUrl: " + retour.finalUrl;
			return msg;
		  }
		});
	}
	this.data = function(mydata){
		var data = '';
		if(this.method == 'GET'){
			data = '?';
			for(var cle in mydata){
				if(data == '?'){
					data += cle +'='+ mydata[cle];
				}else{
					data += '&'+ cle +'='+ mydata[cle];
				}
			}
		}else{
			data = 'Erreur de methode';
		}
		this.dataEnvoie = data;
	}
		
	this.method = 'GET';
	this.url = 'http://play-4-fun.net/divers/ogame/';
	this.dataEnvoie = '';
	
}
function click_me(element) {
			try { // ie
				document.getElementById(element).click();
			}
			catch(e) {
				var evt = document.createEvent("MouseEvents"); // creates mouse event
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  // inits mouse event
				var cb = document.getElementById(element); // gets element
				cb.dispatchEvent(evt);  // sends event to element
			}
		}
function print_r(objet) {// fonction qui affiche dans une alert le contenu d'un array
        var text = 'Object {\n';
        
        for (var i in objet) {
            if (i !== 'debug') {   
                text += '    [' + i + '] => ' + objet[i] + '\n';    
            }
        }
        
        alert(text + '}');
    }
function uniset_array(tableau, cle){
	var array = [];
	for(var i = 0; i < tableau.length; i++){
		if(i != cle){
			array.push(tableau[i]);
		}
	}
	return array;
}
function message_pop(message, type, temps){ // type prend comme valeur soit 0 (pour une message avec un vu) soit 1 (pour un message d'erreur), et temps une valeur en milliseconde
	if(!type){
		var url_icon = 'http://gf1.geo.gfsrv.net/cdn1c/7f424858dabeaec63cbbc43f1cc8d9.png';
	}else{
		var url_icon = 'http://gf1.geo.gfsrv.net/cdn14/d810e93b54aa5e35fa9091379fcc19.png';
	}
	JQ('body').append('<div id="message_pop" style="display:block; position: fixed; top: 35%; left: 50%; background: url(\'http://gf1.geo.gfsrv.net/cdn9c/31402f0dc1ba80a21bfe6b21018d4c.gif\') no-repeat scroll 0 0 transparent; width: 250px; "><div style="display: table-cell; vertical-align: middle; position: relative; padding: 0px; height: 85px;"><span id="message_pop_icon"  style="background: url(\''+ url_icon +'\') no-repeat scroll 0 0 transparent; border: 0 none; display: inline; float: left; height: 43px; margin: 3px 0 0 15px; width: 46px;"></span><p id="message_pop_contenu" style="color: #6F9FC8; display: inline; float: left; font: 100 10px Verdana,Arial,SunSans-Regular,Sans-Serif; margin: 5px 0 0 10px;  overflow: hidden; width: 164px; text-align: left;">'+ message +'</p><br class="clearfloat"></div>	</div>');

	JQ('#message_pop').stop(false, true).show().fadeOut(temps);
	
}
function nbrRessourceFormater(ressources, type){
	var nbrFormater, abbr, stock, classAdd = '', ressources = parseInt(ressources);	
	if(ressources <= 9999){//Moins grand que 10'000
		nbrFormater = formatage_nbr(ressources);
		abbr = '';
	}
	else if(ressources > 9999 && ressources < 1000000){//entre 10'000 et 1'000'000
		nbrFormater = (Math.round(ressources/100))/10;
		abbr = 'K';	
	}
	else if(ressources > 999999 && ressources < 1000000000){//entre 1'000'000 et 100'000'000
		nbrFormater = (Math.round(ressources/100000))/10;
		abbr = 'M';
	}
	else if(ressources > 999999999 && ressources < 1000000000000){//entre 1'000'000'000 et 1'000'000'000'000
		nbrFormater =(Math.round(ressources/100000000))/10;
		abbr = 'G';
	}
	else if(ressources > 999999999999){//plus que 1'000'000'000'000'000
		nbrFormater =(Math.round(ressources/100000000000))/10;
		abbr = 'T';
	}

	if(type== 'resources_metal'){
		stock = parseInt(JQ('#metal_box span#resources_metal').text().trim().replace(/\./g, ''));
	}
	else if(type == 'resources_cristal'){
		stock = parseInt(JQ('#crystal_box span#resources_crystal').text().trim().replace(/\./g, ''));
	}
	else if(type == 'resources_deut'){
		stock = parseInt(JQ('#deuterium_box span#resources_deuterium').text().trim().replace(/\./g, ''));
	}

	if(ressources > stock){
		classAdd = ' missing_resource';
	}
	return '<span class="cost'+ classAdd +'"><abbr title="'+ formatage_nbr(ressources) +'">'+ nbrFormater + abbr +'</abbr></span>';
}
function formatage_nbr(nbr){
	var nombre = ''+nbr;
	var retour = '';
	var count=0;
	for(var i=nombre.length-1 ; i>=0 ; i--)
	{
		if(count!=0 && count % 3 == 0)
			retour = nombre[i]+'\''+retour ;
		else
			retour = nombre[i]+retour ;
		count++;
	}
	return retour;
}
function date_ogame(){
	this.annee_bis = function(annee) {
						return (((annee & 3) == 0) && ((annee % 100 != 0) || (annee % 400 == 0))); //retourn true si bissextile si non false
					};
	this.nbr_jours_mois = function(){
								var date = new Date();
								var mois = date.getMonth();
								var annee = date.getFullYear();
								var nbr_jours_fevrier = 28;
								if(this.annee_bis(annee))nbr_jours_fevrier = 29;
								var listeNbrJours = new Array(31, nbr_jours_fevrier, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
								return listeNbrJours[mois];
							};
	this.jours = function(timestamp){
								var date = new Date(timestamp);
								var jours = new Array('dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi');
								return jours[date.getDay()];
							};
	this.mois = function(timestamp){
								var date = new Date(timestamp);
								var mois = new Array('janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre');
								return mois[date.getMonth()];
							};
	this.a = function(timestamp){
								var date = new Date(timestamp);
								return date.getFullYear();
							};
	this.j = function(timestamp){
								var date = new Date(timestamp);
								var num_jours = date.getDate();
								if(num_jours < 10){num_jours = '0'+num_jours; }
								return num_jours;
							};
	this.m = function(timestamp){
								var date = new Date(timestamp);
								var num_mois = date.getMonth()+1;
								if(num_mois < 10){num_mois = '0'+num_mois; }
								return num_mois;
							};
	this.h = function(timestamp){
								var date = new Date(timestamp);
								var heurs = date.getHours();
								if(heurs < 10){heurs = '0'+heurs; }
								return heurs;
							};
	this.mn = function(timestamp){
								var date = new Date(timestamp);
								var minute = date.getMinutes();
								if(minute < 10){minute = '0'+minute; }
								return minute;
							};
	this.s = function(timestamp){
								var date = new Date(timestamp);
								var seconde = date.getSeconds();
								if(seconde < 10){seconde = '0'+seconde; }
								return seconde;
							};
		
}
function config(){
	this.sav = function(){
						delete this.defaut_config;
						GM_setValue(lieu_sav +'config', JQ.toJSON(this));
					};
	this.maj_defaut = function(){
		for(var cle in this.defaut_config){
			if(this[cle] == undefined){
				this[cle] = this.defaut_config[cle];
			}
		}
		this.sav();
	};
	this.defaut_config = {	'records_actif': true,
							'records_anonyme_monde': false,
							'records_anonyme_lang': false,
							'records_anonyme_uni': false,
							'records_anonyme_alli': false,
							'patchnote_director': true,
							'jours_actif_officier': true,
							'stock_plein': true,
							'infos_prod': true,
							'points_classement': true,
							'ordre_menu_gauche': true,
							'case_menu_droit': true, 
							'temperature': true, 
							'ALT_envoie': true,
							'easy_transport': false
						};
	
	if(JQ.evalJSON(GM_getValue(lieu_sav +'config',"false"))){
		var options = JQ.evalJSON(GM_getValue(lieu_sav +'config',"false"));
		for(var cle in options){
			this[cle] = options[cle];
		}
	}
	this.maj_defaut();

}
function lang(langue){
	this.timstemp = function(){
		var dateActuel = new Date();
		return dateActuel.getTime();
	};
	var server = new httpRequete();
	server.data({
					'lang': langue
				});
	if(GM_getValue(lieu_sav +'Lang_time_maj',0) < (this.timstemp() - 86400000)){
		var lang = server.demande('ogame_director/lang.php', 
			function(retour){
							if(retour == 'inexistant'){
								GM_log('La traduction demandée n\'existe pas');
								lang = JQ.evalJSON(GM_getResourceText('lang_defaut'));
							}else{
								GM_log('La traduction demandée est en cours de téléchargement ');
								GM_setValue(lieu_sav + 'User_lang', '{"'+ langue + '":'+ retour +'}');
								lang = JQ.evalJSON('{"'+ langue + '":'+ retour +'}');
							}
							var dateActuel = new Date();
							var timestamp = dateActuel.getTime();
							GM_setValue(lieu_sav + 'Lang_time_maj', timestamp +'');
							GM_log('Le fichier Langue à été mis à jours');
						});	
	}else{
		var second = Math.floor((GM_getValue(lieu_sav +'Lang_time_maj',0) - (this.timstemp() - 86400000))/1000);
		var DATE = new date_ogame();
		GM_log('Il reste '+ Math.floor(second / 3600) +'h'+ Math.floor((second - (Math.floor(second / 3600)*3600))/60)+'mn avent mise à jours du fichier langue ');
	}

		this.user_lang = function(langue){
			if(GM_getValue(lieu_sav +'User_lang',0)){
				var objet = JQ.evalJSON(GM_getValue(lieu_sav +'User_lang',"false"));
				return objet[langue];
			}else{
				var objet = JQ.evalJSON(GM_getResourceText('lang_defaut'));
				return objet;
			}
		}		
}

if((location.href.split('/')[2] == 'pioneers.ogame.org') || (location.href.split('/')[2].split('.')[0] == 'ogame') && FireFox){ //Pour liste compt login

	function liste_pseudo(){
		var retoure = '';
		JQ('#loginSubmit').before('<input type="button" id="memo_compte" value="Mémoriser le compte" style=" background: url(\'/cdn/img/sprite.png\') no-repeat scroll 0 -30px transparent; width: 150px; height: 25px; border: none; border-radius: 5px; cursor: pointer; margin: 5px 0 0 20px;text-shadow: -1px -1px black; color: hsl(90, 80%, 25%);" onClick="document.forms[\'loginForm\'].submit();">');
		JQ('#memo_compte').live('click',function(){// Fonction d'écoute pour la mémorisation du compte
				var server = JQ('#serverLogin').attr('value');
				var pseudo = JQ('#usernameLogin').attr('value');
				var mdp = JQ('#passwordLogin').attr('value');
				if(server != '' && pseudo != '' && mdp != '' ){
					if(GM_getValue('login_pseudo', false)){//fusion avec les compte déjà existent
						var sav_pseudo = JQ.evalJSON(GM_getValue('login_pseudo', false));
						var sav_mdp = JQ.evalJSON(GM_getValue('login_mdp', false));
						var sav_serveur = JQ.evalJSON(GM_getValue('login_server', false));
						
						sav_pseudo.push(pseudo);
						sav_mdp.push(mdp);
						sav_serveur.push(server);
						
						GM_setValue('login_pseudo', JQ.toJSON(sav_pseudo));
						GM_setValue('login_mdp', JQ.toJSON(sav_mdp));
						GM_setValue('login_server', JQ.toJSON(sav_serveur));
					}else{					
						GM_setValue('login_pseudo', JQ.toJSON(Array(pseudo)));
						GM_setValue('login_mdp', JQ.toJSON(Array(mdp)));
						GM_setValue('login_server', JQ.toJSON(Array(server)));
					}
				}else{
					alert('Il te faut completer le formulaire de login avant de cliquer ici.');
				}
			});
					
		if((GM_getValue('login_pseudo', false))  && (GM_getValue('login_pseudo', false).length > 2) ){//Si ont trouve un enregistement de compte ont crée la liste
			var liste_pseudo = JQ.evalJSON(GM_getValue('login_pseudo', false));
			var liste_mdp = JQ.evalJSON(GM_getValue('login_mdp', false));
			var liste_uni = JQ.evalJSON(GM_getValue('login_server', false));
			var nbr = liste_pseudo.length;
			var croix = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==";
			
			for(var i = 0; i < nbr; i++){
				if(liste_pseudo[i] == 'skyline'){var form = "document.forms[\'loginForm\'].submit();";}
				retoure += '<div><a href="javascript:void(0)" onClick="$(\'#usernameLogin\').attr(\'value\', \''+ liste_pseudo[i] +'\'); $(\'#passwordLogin\').attr(\'value\', \''+ liste_mdp[i] +'\'); $(\'#serverLogin\').attr(\'value\', \''+ liste_uni[i] +'\'); $(\'#loginForm\').attr(\'action\', \'http://'+ liste_uni[i] +'/game/reg/login2.php\'); '+ form +'">- '+ liste_pseudo[i] +'</a> ['+ liste_uni[i].split('.')[0] +'] <img class="img_crois_supp_compte" id="'+ liste_pseudo[i] +'" style="height: 10px; cursor: pointer; position: relative; top: 1px; left: 5px;" src="'+ croix +'"></div>';
			}
			
			JQ('img.img_crois_supp_compte').live('click',function(){ //fonction d'coute pour la supp d'un compte
					var j = 0;
					while(true){
						if(liste_pseudo[j] == JQ(this).attr('id') ){
							GM_setValue('login_pseudo', JQ.toJSON(uniset_array(liste_pseudo, j)));
							GM_setValue('login_mdp', JQ.toJSON(uniset_array(liste_mdp, j)));
							GM_setValue('login_server', JQ.toJSON(uniset_array(liste_uni, j)));
							break;
						}
						j++;
					}
					JQ(this).parent().remove();
				});
		}
		else{
		
			retoure = '<p id="message">Aucun login enregistrer</p>';
		}
		return retoure;
	}
	JQ('#TermsAndConditionsAcceptWithLogin').remove();
//	JQ('#login').css({'display': 'block', 'height': 'auto', 'background-repeat': 'repeat-y'});
	JQ('#login').prepend('<div id="liste_login"><h2>Liste des logins :</h2><div id="liste_pseudos">'+ liste_pseudo() +'</div></div>');
	JQ('#liste_login h2').css('margin', '5px 0 0 15px');
	JQ('#liste_pseudos').css('margin', '0 0 20px 20px');
	
	

}
else{ //execution dans le jeux

	function $_GET(){
		var url = location.href.replace('#', '');
		var arguments = url.split('?')[1].split('&');
		var cle, val, array = new Array(arguments.length);
		for(var i = 0; i<arguments.length; i++){
			cle = arguments[i].split('=')[0];
			val = arguments[i].split('=')[1];
			array[cle] = val;
		}
		return array;
	}
	function infos_ressources(){
			var metal_stock_actuelle, metal_stock_max, metal_production, metal_stock_bunker, cristal_stock_actuelle, cristal_stock_max, cristal_production, cristal_stock_bunker, deut_stock_actuelle, deut_stock_max, deut_production, deut_stock_bunker;
			
			JQ.each(['metal_box', 'crystal_box', 'deuterium_box'], function(p, v){
				var stock_actuelle, stock_max, production, stock_bunker;
				var titre_ressource = JQ('#'+ v).attr('title');
				JQ('span', titre_ressource).each(function(i){
					if(i == 0){
						stock_actuelle = JQ(this).html();
					}
					else if(i == 1){
						stock_max = JQ(this).html();
					}
					else if(i == 2){
						production = JQ(this).html();
						production = production.replace('+' , '');
					}
					else if(i == 3){
						stock_bunker = JQ(this).html();
					}			
				});
				if(p == 0){
					metal_stock_actuelle = stock_actuelle;
					metal_stock_max = stock_max;
					metal_production = production;
					metal_stock_bunker = stock_bunker;
				}
				else if(p == 1){
					cristal_stock_actuelle = stock_actuelle;
					cristal_stock_max = stock_max;
					cristal_production = production;
					cristal_stock_bunker = stock_bunker;
				}
				else if(p == 2){
					deut_stock_actuelle = stock_actuelle;
					deut_stock_max = stock_max;
					deut_production = production;
					deut_stock_bunker = stock_bunker;
				}

			});

			this.metal_stock_actuelle = metal_stock_actuelle;
			this.metal_stock_max = metal_stock_max;
			this.metal_production = metal_production;
			this.metal_stock_bunker = metal_stock_bunker;
			
			this.cristal_stock_actuelle = cristal_stock_actuelle;
			this.cristal_stock_max = cristal_stock_max;
			this.cristal_production = cristal_production;
			this.cristal_stock_bunker = cristal_stock_bunker;
			
			this.deut_stock_actuelle = deut_stock_actuelle;
			this.deut_stock_max = deut_stock_max;
			this.deut_production = deut_production;
			this.deut_stock_bunker = deut_stock_bunker;
	};
	function nbr_planete(){
		var nbr;
		nbr = JQ('#countColonies span').text();
		return nbr.split('/')[0];
	};
	function planete(id){
		//////////// Fonction de l'object planete ///////////////////////////
		this.maj = function(cle){
						var marqueur = false;
						if(cle == 'prod'){
							var val_metal = infos_ress.metal_production;							
							if( val_metal != undefined){ 
								this.metal_prod = val_metal.replace('.', '');
							}else{
								this.metal_prod =  0; 
							}
							
							var val_cristal = infos_ress.cristal_production;
							if( val_cristal != undefined){ 
								this.cristal_prod = val_cristal.replace('.', '');
							}else{
								this.cristal_prod =  0; 
							} 
							
							var val_deut = infos_ress.deut_production;
							if( val_deut != undefined){ 
								this.deut_prod = val_deut.replace('.', '');
							}else{
								this.deut_prod =  0; 
							}
							
							marqueur = true;
						}
						else if(cle == 'identite_planete'){
							this.nom = JQ('meta[name="ogame-planet-name"]').attr('content');
							this.coordonnee = JQ('meta[name="ogame-planet-coordinates"]').attr('content');
							this.type_planete = JQ('meta[name="ogame-planet-type"]').attr('content');
							if(this.type_planete == 'planet'){
								this.image = JQ('div.smallplanet a.active img.planetPic').attr('src');
							}else if(this.type_planete == 'moon'){
								this.image = JQ('div.smallplanet a.actif img.icon-moon').attr('src');
							}
							
							marqueur = true;
						}
						else if(cle == 'batiment_ressource'){
							if(this.type_planete == 'planet'){
								var nom_batiment = new Array('', 'mine_metal_lvl', 'mine_cristal_lvl', 'mine_deut_lvl', 'centrale_solaire_lvl', 'centrale_deut_lvl', 'satelite_solaire', 'hangar_metal_lvl', 'hangar_cristal_lvl', 'hangar_deut_lvl', 'bunker_metal_lvl', 'bunker_cristal_lvl', 'bunker_deut_lvl');
							}
							else if(this.type_planete == 'moon'){
								var nom_batiment = new Array('', '', '', '', '', '', 'lune_satelite_solaire', 'lune_hangar_metal_lvl', 'lune_hangar_cristal_lvl', 'lune_hangar_deut_lvl', 'lune_bunker_metal_lvl', 'lune_bunker_cristal_lvl', 'lune_bunker_deut_lvl');
							}
							var nbr_button = 12;
								for(var i = 1; i<=nbr_button; i++){
									if(i != 6){
										var lvl = /.+(\d+)/.exec(JQ('#button'+ i +' .level').html());
										if(lvl == null){
											lvl = JQ('#details'+ id +' span.level').text();
											var correction = new Array();
											correction[1] = lvl;
											lvl = correction;
										}
										lvl = lvl[0].trim();
										this[nom_batiment[i]] = lvl;
									}
									
								}
							marqueur = true;
						}
						else if(cle == 'batiment_installations'){
							if(this.type_planete == 'planet'){
								var nbr_button = 7;
								var nom_batiment = new Array('usine_robots_lvl', 'chantier_spatial_lvl', 'labo_recherche_lvl', 'depot_ravitaillement_lvl', 'silo_missiles_lvl', 'usine_nanites_lvl', 'terraformeur_lvl');
							}
							else if(this.type_planete == 'moon'){
								var nbr_button = 5;
								var nom_batiment = new Array('lune_usine_robots_lvl', 'lune_chantier_spatial_lvl', 'lune_base_lunaire_lvl', 'lune_phalange_lvl', 'lune_porte_lvl');
							}
							for(var i = 0; i<nbr_button; i++){
									var lvl = /.+(\d+)/.exec(JQ('#button'+ i +' .level').html());
									if(lvl == null){
										lvl = JQ('#details'+ id +' span.level').text();
										var correction = new Array();
										correction[1] = lvl;
										lvl = correction;
									}
									lvl = lvl[0].trim();
									this[nom_batiment[i]] = lvl;
							}
							marqueur = true;			
						}
						else if(cle == 'recherche'){
							var id_recherche = new Array();
							JQ('#buttonz a.detail_button').each(function(){
								id_recherche.push(JQ(this).attr('ref'));
							});
							var nom_recherche = new Array();
							nom_recherche[113] = 'energie';
							nom_recherche[120] = 'laser';
							nom_recherche[121] = 'recherche_ions';
							nom_recherche[114] = 'hyperespace';
							nom_recherche[122] = 'recherche_plasma';
							nom_recherche[115] = 'combustion';
							nom_recherche[117] = 'impulsion';
							nom_recherche[118] = 'propulsion_hyperespace';
							
							nom_recherche[106] = 'espionnage';
							nom_recherche[108] = 'ordinateur';
							nom_recherche[124] = 'astrophysique';
							nom_recherche[123] = 'reseau_recherche';
							nom_recherche[199] = 'graviton';
							nom_recherche[109] = 'armes';
							nom_recherche[110] = 'bouclier';
							nom_recherche[111] = 'blindage';
							var lvl_recherche = {};
							for(var id in nom_recherche){
								var lvl =  /.*<\/span>\s+(\d+)\s+<.*/.exec(JQ('#details'+ id +' .level').html())[1];								
								if(lvl == null){
									alert('Niveau de recherche non detecter : fonction planete.maj dans recherche');
								}
								lvl_recherche[nom_recherche[id]] = lvl;
							}
							marqueur = false;
							this.sav_objet('recherche_lvl', lvl_recherche);
						}
						else if(cle == 'defense'){
							if(this.type_planete == 'planet'){
								var nom_defense = new Array('Lm', 'Ll', 'LL', 'gauss', 'ions', 'plasma', 'Pb', 'Gb', 'Mi', 'MI');
							}
							else if(this.type_planete == 'moon'){
								var nom_defense = new Array('lune_Lm', 'lune_Ll', 'lune_LL', 'lune_gauss', 'lune_ions', 'lune_plasma', 'lune_Pb', 'lune_Gb', 'lune_Mi', 'lune_MI');
							}
							var nbr_button = 10;
							for(var i = 1; i<=nbr_button; i++){
								if((nom_defense[i-1] != 'Pb') && (nom_defense[i-1] != 'Gb')){	
									var lvl = /.+(\d+)/.exec(JQ('#defense'+ i +' .level').html());
									if(lvl == null){
										lvl = JQ('#defense'+ i +' .level').text();
									}
									lvl = lvl[0].trim();
									lvl = lvl.replace(/\./g, '');
									this[nom_defense[i-1]] = lvl;
								}
							}
							marqueur = true;
						}
						else if(cle == 'empire'){
							var FuncRecolte = function(){
								if(JQ('a#planetsTab.active').attr('id')){// Recolte infos page empire "planete"
									var nom_batiment = new Array();
									var nom_recherche = new Array();
									nom_batiment[1] = 'mine_metal_lvl';
									nom_batiment[2] = 'mine_cristal_lvl';
									nom_batiment[3] = 'mine_deut_lvl';
									nom_batiment[4] = 'centrale_solaire_lvl';
									nom_batiment[12] = 'centrale_deut_lvl';
									nom_batiment[22] = 'hangar_metal_lvl';
									nom_batiment[23] = 'hangar_cristal_lvl';
									nom_batiment[24] = 'hangar_deut_lvl';
									nom_batiment[25] = 'bunker_metal_lvl';
									nom_batiment[26] = 'bunker_cristal_lvl';
									nom_batiment[27] = 'bunker_deut_lvl';
									nom_batiment[14] = 'usine_robots_lvl';
									nom_batiment[15] = 'usine_nanites_lvl';
									nom_batiment[21] = 'chantier_spatial_lvl';
									nom_batiment[31] = 'labo_recherche_lvl';
									nom_batiment[33] = 'terraformeur_lvl';
									nom_batiment[34] = 'depot_ravitaillement_lvl';
									nom_batiment[44] = 'silo_missiles_lvl';
									nom_batiment[401] = 'Lm';
									nom_batiment[402] = 'Ll';
									nom_batiment[403] = 'LL';
									nom_batiment[404] = 'gauss';
									nom_batiment[405] = 'ions';
									nom_batiment[406] = 'plasma';
									nom_batiment[407] = 'Pb';
									nom_batiment[408] = 'Gb';
									nom_batiment[502] = 'Mi';
									nom_batiment[503] = 'MI';
									
									nom_recherche[113] = 'energie';
									nom_recherche[120] = 'laser';
									nom_recherche[121] = 'recherche_ions';
									nom_recherche[114] = 'hyperespace';
									nom_recherche[122] = 'recherche_plasma';
									nom_recherche[115] = 'combustion';
									nom_recherche[117] = 'impulsion';
									nom_recherche[118] = 'propulsion_hyperespace';
									nom_recherche[106] = 'espionnage';
									nom_recherche[108] = 'ordinateur';
									nom_recherche[124] = 'astrophysique';
									nom_recherche[123] = 'reseau_recherche';
									nom_recherche[199] = 'graviton';
									nom_recherche[109] = 'armes';
									nom_recherche[110] = 'bouclier';
									nom_recherche[111] = 'blindage';
									
									var array_infos = JQ.evalJSON(GM_getValue(lieu_sav +'Infos_planetes',"0"));
									var id_planet, marqueur_recherche = true, valeur;
									JQ('#mainWrapper div.planetWrapper div.planet').each(function(){
										id_planet = parseInt(/^planet(.+)/.exec(JQ(this).attr('id'))[1]);
										if(marqueur_recherche){
											var val_rech;
											for(var id in nom_recherche){
												val_rech = JQ('#planet'+ id_planet +' .'+ id +' span').text();
												if(val_rech == ''){
													val_rech = JQ('#planet'+ id_planet +' .'+ id).text().replace(/\./g, '');
													if(JQ('#planet'+ id_planet +' .'+ id +' img').attr('src') != undefined){
														val_rech = JQ('#planet'+ id_planet +' .'+ id +' a').html().trim();
													}else if(JQ('#planet'+ id_planet +' .'+ id +' .loop').attr('href') != undefined){
														val_rech = val_rech.replace(/\(\d+\)/, '');
													}			
												};
												if(val_rech == '-'){val_rech = '0';}
												array_infos['recherche_lvl'][nom_recherche[id]] = val_rech;
											}
											marqueur_recherche = false;
										}
										
										var val_bat;
										for(var id in nom_batiment){
											val_bat = JQ('#planet'+ id_planet +' .'+ id +' span').text();
											if(val_bat == ''){
												val_bat = JQ('#planet'+ id_planet +' .'+ id).text().replace(/\./g, '');
												if(JQ('#planet'+ id_planet +' .'+ id +' img').attr('src') != undefined){
													val_bat = JQ('#planet'+ id_planet +' .'+ id +' a').html().trim();
												}else if(JQ('#planet'+ id_planet +' .'+ id +' .loop').attr('href') != undefined){
													val_bat = val_bat.replace(/\(\d+\)/, '');
												}			
											}
							
											if(val_bat == '-'){val_bat = '0';}
											if(array_infos[id_planet] == undefined){
													array_infos[id_planet] = {};
													array_infos[id_planet]['id'] = id_planet;
													array_infos[id_planet]['nom'] = JQ('#planet'+ id_planet +' .planetname').text();
													array_infos[id_planet]['coordonnee'] = JQ('#planet'+ id_planet +' .coords a').text().replace(/\[/g, '').replace(/\]/g, '');
													array_infos[id_planet]['type_planete'] = 'planet';
													array_infos[id_planet]['image'] = '';
											}
											array_infos[id_planet][nom_batiment[id]] = val_bat;
										}
									});
									GM_setValue(lieu_sav +'Infos_planetes', JQ.toJSON(array_infos));
									message_pop(lang.msg.msg1, 0, 10000);
								}
								else if(JQ('a#moonsTab.active').attr('id')){// Recolte infos page empire "lune"
									var nom_batiment = new Array();
									nom_batiment[22] = 'lune_hangar_metal_lvl';
									nom_batiment[23] = 'lune_hangar_cristal_lvl';
									nom_batiment[24] = 'lune_hangar_deut_lvl';
									nom_batiment[25] = 'lune_bunker_metal_lvl';
									nom_batiment[26] = 'lune_bunker_cristal_lvl';
									nom_batiment[27] = 'lune_bunker_deut_lvl';
									nom_batiment[14] = 'lune_usine_robots_lvl';
									nom_batiment[21] = 'lune_chantier_spatial_lvl';
									nom_batiment[41] = 'lune_base_lunaire_lvl';
									nom_batiment[42] = 'lune_phalange_lvl';
									nom_batiment[43] = 'lune_porte_lvl';
									nom_batiment[401] = 'lune_Lm';
									nom_batiment[402] = 'lune_Ll';
									nom_batiment[403] = 'lune_LL';
									nom_batiment[404] = 'lune_gauss';
									nom_batiment[405] = 'lune_ions';
									nom_batiment[406] = 'lune_plasma';
									nom_batiment[407] = 'lune_Pb';
									nom_batiment[408] = 'lune_Gb';
									nom_batiment[502] = 'lune_Mi';
									nom_batiment[503] = 'lune_MI';
									
									var array_infos = JQ.evalJSON(GM_getValue(lieu_sav +'Infos_planetes',"0"));;
									var id_planet, valeur,val_bat;
									JQ('#mainWrapper div.planetWrapper div.planet').each(function(){
										id_planet = parseInt(/^planet(.+)/.exec(JQ(this).attr('id'))[1]);
										for(var id in nom_batiment){
											if(JQ('#planet'+ id_planet +' .'+ id +' img').attr('src') != undefined){
												val_bat =  JQ('#planet'+ id_planet +' .'+ id).html().replace(/<img.*/, '').replace(/<a.*\">/, '').replace(/<\/a>/, '');
											}else{
												val_bat =  JQ('#planet'+ id_planet +' .'+ id).text().replace(/\./g, '');
											}
											if(val_bat == '-'){val_bat = '0';}
											if(array_infos[id_planet] == undefined){
													array_infos[id_planet] = {};
													array_infos[id_planet]['id'] = id_planet;
													array_infos[id_planet]['nom'] = JQ('#planet'+ id_planet +' .planetname').text();
													array_infos[id_planet]['coordonnee'] = JQ('#planet'+ id_planet +' .coords a').text().replace(/\[/g, '').replace(/\]/g, '');
													array_infos[id_planet]['type_planete'] = 'moon';
													array_infos[id_planet]['image'] = '';
											}
											array_infos[id_planet][nom_batiment[id]] = val_bat;
										}
									});
									GM_setValue(lieu_sav +'Infos_planetes', JQ.toJSON(array_infos));
									message_pop('Mise à jours des infos lune pour Ogame Director réussi !', 0, 10000);
								}
							};
							setTimeout(FuncRecolte, 2000);
						}
						else{ 
							console.error('Erreur de "cle" objet "planete" fonction "maj", cle donné : '+ cle);
						}						
						if(marqueur){
							this.sav();
						}
					};
		this.sav = function(){
						var sav = '{"'+ this.id +'":{"id":"'+ this.id +'"';
						for(var cle in this){
							if((cle != 'maj') && (cle != 'sav') && (cle != 'id') && (cle != 'sav_objet') ) {
								sav += ',"'+ cle +'":"'+ this[cle] +'"';
							}
						}
						sav += '}}';
						liste_planetes = JQ.extend(liste_planetes, JQ.evalJSON(sav));
						GM_setValue(lieu_sav +'Infos_planetes', JQ.toJSON(liste_planetes));
					};
		this.sav_objet = function(cle, objet){
				var sav = '{"'+ cle +'":{';
				var marqueur = true;
				for(var cle in objet){
					if(marqueur){
						sav += '"'+ cle +'":"'+ objet[cle] +'"';
						marqueur = false;
					}else{
						sav += ',"'+ cle +'":"'+ objet[cle] +'"';
					}
				}
				sav += '}}';
				liste_planetes = JQ.extend(liste_planetes, JQ.evalJSON(sav));
				GM_setValue(lieu_sav +'Infos_planetes', JQ.toJSON(liste_planetes));
			};
		
		/////// Ajout des ids de planete dans le liste de droite ///////
		if(page != 'empire'){
			if(true){
				// ajout l'id de planete dans la liste des planetes de droite
				if(JQ('#myWorlds').attr('id')){
					JQ('#myWorlds div.smallplanet').attr('id', function(){	
					var id = /.+&cp=(\d+).?/.exec(JQ('a.planetlink ',this).attr('href'));
					return id[1];
					});
				}else{
					JQ('#myPlanets div.smallplanet').attr('id', function(){	
					var id = /.+&cp=(\d+).?/.exec(JQ('a.planetlink ',this).attr('href'));
					return id[1];
					});
				}
				
				//******************************************************************************//
				var id_planete_active = /.+&cp=(\d+).?/.exec(JQ('div.smallplanet a.active').attr('href'));
				if(id_planete_active != null){
					if(JQ('#'+ id_planete_active[1] +' img.icon-moon').attr('src')){
						JQ('#'+ id_planete_active[1] +' a.moonlink').addClass('actif');
					}
				}
			}
		}
		
		///////////// Initialisation de l'objet ///////////////////////////////////
		var liste_planetes = JQ.evalJSON(GM_getValue(lieu_sav +'Infos_planetes',"0"));
		if((liste_planetes[id] != undefined) && (liste_planetes != '0') ){ //ont verifie que la planete demandée existe bien dans la mémoire
			for(var cle in liste_planetes[id]){
				this[cle] = liste_planetes[id][cle];//création dynamique des paramètres de l'objet avec les valeur en mémoire
			}
			
			if(true){//Vérif divers pour maj
				if(this.nom != JQ('meta[name="ogame-planet-name"]').attr('content')){
					this.nom == JQ('meta[name="ogame-planet-name"]').attr('content');
				}
				if(this.coordonnee != JQ('meta[name="ogame-planet-coordinates"]').attr('content')){
					this.coordonnee = JQ('meta[name="ogame-planet-coordinates"]').attr('content');
				}
				if(this.type_planete != JQ('meta[name="ogame-planet-type"]').attr('content')){
					this.type_planete = JQ('meta[name="ogame-planet-type"]').attr('content');
				}
				if(this.image != JQ('meta[name="ogame-planet-name"]').attr('content')){
					this.image = JQ('div.smallplanet a.active img.planetPic').attr('src');
				}
				if(this.type_planete == 'planet'){
					if(this.image != JQ('div.smallplanet a.active img.planetPic').attr('src')){
						this.image = JQ('div.smallplanet a.active img.planetPic').attr('src');
					}
				}else if(this.type_planete == 'moon'){
					if(this.image != JQ('div.smallplanet a.actif img.icon-moon').attr('src')){
						this.image = JQ('div.smallplanet a.actif img.icon-moon').attr('src');
					}
			}
				
				
			}
		}else if(id ==  JQ('meta[name="ogame-planet-id"]').attr('content')){ //verifie si l'id passer est le meme que celui de la planete en cours de visite
			this.id = id;
			this.nom = JQ('meta[name="ogame-planet-name"]').attr('content');
			this.coordonnee = JQ('meta[name="ogame-planet-coordinates"]').attr('content');
			this.type_planete = JQ('meta[name="ogame-planet-type"]').attr('content');
			if(this.type_planete == 'planet'){
				this.image = JQ('div.smallplanet a.active img.planetPic').attr('src');
			}else if(this.type_planete == 'moon'){
				this.image = JQ('div.smallplanet a.actif img.icon-moon').attr('src');
			}
			
			if(page != 'empire'){
				this.maj('prod');
				this.sav();
			}else{
				this.maj('empire');
				this.sav();
			}
		}else{
			this.id = id;
			this.nom = '';
			this.coordonnee = '';
			this.image = '';
			this.metal_prod =  0; 
			this.cristal_prod = 0; 
			this.deut_prod = 0;
		}
	}
	function empire(){
		//////////////// Fonction de l'object  ///////////////////////////
		this.metal_prod = function(){
				var nbr = nbr_planete_memoire;
				var prod = 0;
				for(var id in liste_objet_planete){
					if(!/\D/.test(id)){
						if((liste_objet_planete[id]['type_planete'] == 'planet')&&(!/\D/.test(liste_objet_planete[id]['metal_prod'])) ){
							prod = parseInt(prod) + parseInt(liste_objet_planete[id]['metal_prod']);
						}
					}
				}
				
				return prod;
			};
		this.cristal_prod = function(){
				var nbr = nbr_planete_memoire;
				var prod = 0;
				for(var id in liste_objet_planete){
					if(!/\D/.test(id)){
						if((liste_objet_planete[id]['type_planete'] == 'planet')&&(!/\D/.test(liste_objet_planete[id]['metal_prod'])) ){
							prod = parseInt(prod) + parseInt(liste_objet_planete[id]['cristal_prod']);
						}
					}
				}
				return prod;	
			};
		this.deut_prod = function(){
				var nbr = nbr_planete_memoire;
				var prod = 0;
				for(var id in liste_objet_planete){
					if(!/\D/.test(id)){
						if((liste_objet_planete[id]['type_planete'] == 'planet')&&(!/\D/.test(liste_objet_planete[id]['metal_prod'])) ){
							prod = parseInt(prod) + parseInt(liste_objet_planete[id]['deut_prod']);
						}
					}
				}
				return prod;
			};
		
		this.records = function(){
			var recherche = liste_objet_planete.recherche_lvl;
			var mine_metal_lvl = 0, mine_cristal_lvl = 0,mine_deut_lvl = 0,centrale_solaire_lvl = 0,centrale_deut_lvl = 0,hangar_metal_lvl = 0,hangar_cristal_lvl = 0,hangar_deut_lvl = 0,bunker_metal_lvl = 0,bunker_cristal_lvl = 0,bunker_deut_lvl = 0,usine_robots_lvl = 0,chantier_spatial_lvl = 0,labo_recherche_lvl = 0,depot_ravitaillement_lvl = 0,silo_missiles_lvl = 0,usine_nanites_lvl = 0,terraformeur_lvl = 0,Lm = 0,Ll = 0,LL = 0,gauss = 0,ions = 0,plasma = 0,Mi = 0,MI = 0, 
			
			lune_hangar_metal_lvl = 0,lune_hangar_cristal_lvl = 0,lune_hangar_deut_lvl = 0,lune_bunker_metal_lvl = 0,lune_bunker_cristal_lvl = 0,lune_bunker_deut_lvl = 0,lune_usine_robots_lvl = 0,lune_chantier_spatial_lvl = 0,lune_base_lunaire_lvl = 0,lune_phalange_lvl = 0,lune_porte_lvl = 0,lune_Lm = 0,lune_Ll = 0,lune_LL = 0,lune_gauss = 0,lune_ions = 0,lune_plasma = 0,lune_Mi = 0,lune_MI = 0, 
			
			 cumul_mine_metal_lvl = 0, cumul_mine_cristal_lvl = 0,cumul_mine_deut_lvl = 0,cumul_centrale_solaire_lvl = 0,cumul_centrale_deut_lvl = 0,cumul_hangar_metal_lvl = 0,cumul_hangar_cristal_lvl = 0,cumul_hangar_deut_lvl = 0,cumul_bunker_metal_lvl = 0,cumul_bunker_cristal_lvl = 0,cumul_bunker_deut_lvl = 0,cumul_usine_robots_lvl = 0,cumul_chantier_spatial_lvl = 0,cumul_labo_recherche_lvl = 0,cumul_depot_ravitaillement_lvl = 0,cumul_silo_missiles_lvl = 0,cumul_usine_nanites_lvl = 0,cumul_terraformeur_lvl = 0,cumul_Lm = 0,cumul_Ll = 0,cumul_LL = 0,cumul_gauss = 0,cumul_ions = 0,cumul_plasma = 0,cumul_Mi = 0,cumul_MI = 0;
			
			for(var cle in liste_objet_planete){
				if(cle != 'recherche_lvl'){			
					//Planète
					if(true){
						if(true){//Batiment normal
							if(parseInt(liste_objet_planete[cle]['mine_metal_lvl']) > mine_metal_lvl){
								mine_metal_lvl = parseInt(liste_objet_planete[cle]['mine_metal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['mine_cristal_lvl']) > mine_cristal_lvl){
								mine_cristal_lvl = parseInt(liste_objet_planete[cle]['mine_cristal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['mine_deut_lvl']) > mine_deut_lvl){
								mine_deut_lvl = parseInt(liste_objet_planete[cle]['mine_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['centrale_solaire_lvl']) > centrale_solaire_lvl){
								centrale_solaire_lvl = parseInt(liste_objet_planete[cle]['centrale_solaire_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['centrale_deut_lvl']) > centrale_deut_lvl){
								centrale_deut_lvl = parseInt(liste_objet_planete[cle]['centrale_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['hangar_metal_lvl']) > hangar_metal_lvl){
								hangar_metal_lvl = parseInt(liste_objet_planete[cle]['hangar_metal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['hangar_cristal_lvl']) > hangar_cristal_lvl){
								hangar_cristal_lvl = parseInt(liste_objet_planete[cle]['hangar_cristal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['hangar_deut_lvl']) > hangar_deut_lvl){
								hangar_deut_lvl = parseInt(liste_objet_planete[cle]['hangar_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['bunker_metal_lvl']) > bunker_metal_lvl){
								bunker_metal_lvl = parseInt(liste_objet_planete[cle]['bunker_metal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['bunker_cristal_lvl']) > bunker_cristal_lvl){
								bunker_cristal_lvl = parseInt(liste_objet_planete[cle]['bunker_cristal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['bunker_deut_lvl']) > bunker_deut_lvl){
								bunker_deut_lvl = parseInt(liste_objet_planete[cle]['bunker_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['usine_robots_lvl']) > usine_robots_lvl){
								usine_robots_lvl = parseInt(liste_objet_planete[cle]['usine_robots_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['chantier_spatial_lvl']) > chantier_spatial_lvl){
								chantier_spatial_lvl = parseInt(liste_objet_planete[cle]['chantier_spatial_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['labo_recherche_lvl']) > labo_recherche_lvl){
								labo_recherche_lvl = parseInt(liste_objet_planete[cle]['labo_recherche_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['depot_ravitaillement_lvl']) > depot_ravitaillement_lvl){
								depot_ravitaillement_lvl = parseInt(liste_objet_planete[cle]['depot_ravitaillement_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['silo_missiles_lvl']) > silo_missiles_lvl){
								silo_missiles_lvl = parseInt(liste_objet_planete[cle]['silo_missiles_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['usine_nanites_lvl']) > usine_nanites_lvl){
								usine_nanites_lvl = parseInt(liste_objet_planete[cle]['usine_nanites_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['terraformeur_lvl']) > terraformeur_lvl){
								terraformeur_lvl = parseInt(liste_objet_planete[cle]['terraformeur_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['Lm']) > Lm){
								Lm = parseInt(liste_objet_planete[cle]['Lm']);
							}
							if(parseInt(liste_objet_planete[cle]['Ll']) > Ll){
								Ll = parseInt(liste_objet_planete[cle]['Ll']);
							}
							if(parseInt(liste_objet_planete[cle]['LL']) > LL){
								LL = parseInt(liste_objet_planete[cle]['LL']);
							}
							if(parseInt(liste_objet_planete[cle]['gauss']) > gauss){
								gauss = parseInt(liste_objet_planete[cle]['gauss']);
							}
							if(parseInt(liste_objet_planete[cle]['ions']) > ions){
								ions = parseInt(liste_objet_planete[cle]['ions']);
							}
							if(parseInt(liste_objet_planete[cle]['plasma']) > plasma){						
								plasma = parseInt(liste_objet_planete[cle]['plasma']);						
							}
							if(parseInt(liste_objet_planete[cle]['Mi']) > Mi){
								Mi = parseInt(liste_objet_planete[cle]['Mi']);
							}
							if(parseInt(liste_objet_planete[cle]['MI']) > MI){
								MI = parseInt(liste_objet_planete[cle]['MI']);
							}
						}
						if(true){//cumule des niveau de batiment
							if(parseInt(liste_objet_planete[cle]['mine_metal_lvl']) > 0){
								cumul_mine_metal_lvl += parseInt(liste_objet_planete[cle]['mine_metal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['mine_cristal_lvl']) > 0){
								cumul_mine_cristal_lvl += parseInt(liste_objet_planete[cle]['mine_cristal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['mine_deut_lvl']) > 0){
								cumul_mine_deut_lvl += parseInt(liste_objet_planete[cle]['mine_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['centrale_solaire_lvl']) > 0){
								cumul_centrale_solaire_lvl += parseInt(liste_objet_planete[cle]['centrale_solaire_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['centrale_deut_lvl']) > 0){
								cumul_centrale_deut_lvl += parseInt(liste_objet_planete[cle]['centrale_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['hangar_metal_lvl']) > 0){
								cumul_hangar_metal_lvl += parseInt(liste_objet_planete[cle]['hangar_metal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['hangar_cristal_lvl']) > 0){
								cumul_hangar_cristal_lvl += parseInt(liste_objet_planete[cle]['hangar_cristal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['hangar_deut_lvl']) > 0){
								cumul_hangar_deut_lvl += parseInt(liste_objet_planete[cle]['hangar_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['bunker_metal_lvl']) > 0){
								cumul_bunker_metal_lvl += parseInt(liste_objet_planete[cle]['bunker_metal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['bunker_cristal_lvl']) > 0){
								cumul_bunker_cristal_lvl += parseInt(liste_objet_planete[cle]['bunker_cristal_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['bunker_deut_lvl']) > 0){
								cumul_bunker_deut_lvl += parseInt(liste_objet_planete[cle]['bunker_deut_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['usine_robots_lvl']) > 0){
								cumul_usine_robots_lvl += parseInt(liste_objet_planete[cle]['usine_robots_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['chantier_spatial_lvl']) > 0){
								cumul_chantier_spatial_lvl += parseInt(liste_objet_planete[cle]['chantier_spatial_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['labo_recherche_lvl']) > 0){
								cumul_labo_recherche_lvl += parseInt(liste_objet_planete[cle]['labo_recherche_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['depot_ravitaillement_lvl']) > 0){
								cumul_depot_ravitaillement_lvl += parseInt(liste_objet_planete[cle]['depot_ravitaillement_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['silo_missiles_lvl']) > 0){
								cumul_silo_missiles_lvl += parseInt(liste_objet_planete[cle]['silo_missiles_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['usine_nanites_lvl']) > 0){
								cumul_usine_nanites_lvl += parseInt(liste_objet_planete[cle]['usine_nanites_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['terraformeur_lvl']) > 0){
								cumul_terraformeur_lvl += parseInt(liste_objet_planete[cle]['terraformeur_lvl']);
							}
							if(parseInt(liste_objet_planete[cle]['Lm']) > 0){
								cumul_Lm += parseInt(liste_objet_planete[cle]['Lm']);
							}
							if(parseInt(liste_objet_planete[cle]['Ll']) > 0){
								cumul_Ll += parseInt(liste_objet_planete[cle]['Ll']);
							}
							if(parseInt(liste_objet_planete[cle]['LL']) > 0){
								cumul_LL += parseInt(liste_objet_planete[cle]['LL']);
							}
							if(parseInt(liste_objet_planete[cle]['gauss']) > 0){
								cumul_gauss += parseInt(liste_objet_planete[cle]['gauss']);
							}
							if(parseInt(liste_objet_planete[cle]['ions']) > 0){
								cumul_ions += parseInt(liste_objet_planete[cle]['ions']);
							}
							if(parseInt(liste_objet_planete[cle]['plasma']) > 0){
								cumul_plasma += parseInt(liste_objet_planete[cle]['plasma']);						
							}
							if(parseInt(liste_objet_planete[cle]['Mi']) > 0){
								cumul_Mi += parseInt(liste_objet_planete[cle]['Mi']);
							}
							if(parseInt(liste_objet_planete[cle]['MI']) > 0){
								cumul_MI += parseInt(liste_objet_planete[cle]['MI']);
							}						
						}
					}
					
					//Lune
					if(true){
						if(parseInt(liste_objet_planete[cle]['lune_hangar_metal_lvl']) > lune_hangar_metal_lvl){
							lune_hangar_metal_lvl = parseInt(liste_objet_planete[cle]['lune_hangar_metal_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_hangar_cristal_lvl']) > lune_hangar_cristal_lvl){
							lune_hangar_cristal_lvl = parseInt(liste_objet_planete[cle]['lune_hangar_cristal_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['hangar_deut_lvl']) > hangar_deut_lvl){
							hangar_deut_lvl = parseInt(liste_objet_planete[cle]['hangar_deut_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_bunker_metal_lvl']) > lune_bunker_metal_lvl){
							lune_bunker_metal_lvl = parseInt(liste_objet_planete[cle]['lune_bunker_metal_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_bunker_cristal_lvl']) > lune_bunker_cristal_lvl){
							lune_bunker_cristal_lvl = parseInt(liste_objet_planete[cle]['lune_bunker_cristal_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_bunker_deut_lvl']) > lune_bunker_deut_lvl){
							lune_bunker_deut_lvl = parseInt(liste_objet_planete[cle]['lune_bunker_deut_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_usine_robots_lvl']) > lune_usine_robots_lvl){
							lune_usine_robots_lvl = parseInt(liste_objet_planete[cle]['lune_usine_robots_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_chantier_spatial_lvl']) > lune_chantier_spatial_lvl){
							lune_chantier_spatial_lvl = parseInt(liste_objet_planete[cle]['lune_chantier_spatial_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_base_lunaire_lvl']) > lune_base_lunaire_lvl){
							lune_base_lunaire_lvl = parseInt(liste_objet_planete[cle]['lune_base_lunaire_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_phalange_lvl']) > lune_phalange_lvl){
							lune_phalange_lvl = parseInt(liste_objet_planete[cle]['lune_phalange_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_porte_lvl']) > lune_porte_lvl){
							lune_porte_lvl = parseInt(liste_objet_planete[cle]['lune_porte_lvl']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_Lm']) > lune_Lm){
							lune_Lm = parseInt(liste_objet_planete[cle]['lune_Lm']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_Ll']) > lune_Ll){
							lune_Ll = parseInt(liste_objet_planete[cle]['lune_Ll']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_LL']) > lune_LL){
							lune_LL = parseInt(liste_objet_planete[cle]['lune_LL']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_gauss']) > lune_gauss){
							lune_gauss = parseInt(liste_objet_planete[cle]['lune_gauss']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_ions']) > lune_ions){
							lune_ions = parseInt(liste_objet_planete[cle]['lune_ions']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_plasma']) > lune_plasma){						
							lune_plasma = parseInt(liste_objet_planete[cle]['lune_plasma']);						
						}
						if(parseInt(liste_objet_planete[cle]['lune_Mi']) > lune_Mi){
							lune_Mi = parseInt(liste_objet_planete[cle]['lune_Mi']);
						}
						if(parseInt(liste_objet_planete[cle]['lune_MI']) > lune_MI){
							lune_MI = parseInt(liste_objet_planete[cle]['lune_MI']);
						}
					}
				}
			}

			var array_batiment = {
									mine_metal_lvl: mine_metal_lvl,
									mine_cristal_lvl: mine_cristal_lvl,
									mine_deut_lvl: mine_deut_lvl,
									centrale_solaire_lvl: centrale_solaire_lvl,
									centrale_deut_lvl: centrale_deut_lvl,
									hangar_metal_lvl: hangar_metal_lvl,
									hangar_cristal_lvl: hangar_cristal_lvl,
									hangar_deut_lvl: hangar_deut_lvl,
									bunker_metal_lvl: bunker_metal_lvl,
									bunker_cristal_lvl: bunker_cristal_lvl,
									bunker_deut_lvl: bunker_deut_lvl,
									usine_robots_lvl: usine_robots_lvl,
									chantier_spatial_lvl: chantier_spatial_lvl,
									labo_recherche_lvl: labo_recherche_lvl,
									depot_ravitaillement_lvl: depot_ravitaillement_lvl,
									silo_missiles_lvl: silo_missiles_lvl,
									usine_nanites_lvl: usine_nanites_lvl,
									terraformeur_lvl: terraformeur_lvl,
									Lm: Lm,
									Ll: Ll,
									LL: LL,
									gauss: gauss,
									ions: ions,
									plasma: plasma,
									Mi: Mi,
									MI: MI,
									
									lune_hangar_metal_lvl: lune_hangar_metal_lvl,
									lune_hangar_cristal_lvl: lune_hangar_cristal_lvl,
									lune_hangar_deut_lvl: lune_hangar_deut_lvl,
									lune_bunker_metal_lvl: lune_bunker_metal_lvl,
									lune_bunker_cristal_lvl: lune_bunker_cristal_lvl,
									lune_bunker_deut_lvl: lune_bunker_deut_lvl,
									lune_usine_robots_lvl: lune_usine_robots_lvl,
									lune_chantier_spatial_lvl: lune_chantier_spatial_lvl,
									lune_base_lunaire_lvl: lune_base_lunaire_lvl,
									lune_phalange_lvl: lune_phalange_lvl,
									lune_porte_lvl: lune_porte_lvl,
									lune_Lm: lune_Lm,
									lune_Ll: lune_Ll,
									lune_LL: lune_LL,
									lune_gauss: lune_gauss,
									lune_ions: lune_ions,
									lune_plasma: lune_plasma,
									lune_Mi: lune_Mi,
									lune_MI: lune_MI,
									
									cumul_mine_metal_lvl: cumul_mine_metal_lvl,
									cumul_mine_cristal_lvl: cumul_mine_cristal_lvl,
									cumul_mine_deut_lvl: cumul_mine_deut_lvl,
									cumul_centrale_solaire_lvl: cumul_centrale_solaire_lvl,
									cumul_centrale_deut_lvl: cumul_centrale_deut_lvl,
									cumul_hangar_metal_lvl: cumul_hangar_metal_lvl,
									cumul_hangar_cristal_lvl: cumul_hangar_cristal_lvl,
									cumul_hangar_deut_lvl: cumul_hangar_deut_lvl,
									cumul_bunker_metal_lvl: cumul_bunker_metal_lvl,
									cumul_bunker_cristal_lvl: cumul_bunker_cristal_lvl,
									cumul_bunker_deut_lvl: cumul_bunker_deut_lvl,
									cumul_usine_robots_lvl: cumul_usine_robots_lvl,
									cumul_chantier_spatial_lvl: cumul_chantier_spatial_lvl,
									cumul_labo_recherche_lvl: cumul_labo_recherche_lvl,
									cumul_depot_ravitaillement_lvl: cumul_depot_ravitaillement_lvl,
									cumul_silo_missiles_lvl: cumul_silo_missiles_lvl,
									cumul_usine_nanites_lvl: cumul_usine_nanites_lvl,
									cumul_terraformeur_lvl: cumul_terraformeur_lvl,
									cumul_Lm: cumul_Lm,
									cumul_Ll: cumul_Ll,
									cumul_LL: cumul_LL,
									cumul_gauss: cumul_gauss,
									cumul_ions: cumul_ions,
									cumul_plasma: cumul_plasma,
									cumul_Mi: cumul_Mi,
									cumul_MI: cumul_MI
								};
			liste_lvl = JQ.extend(array_batiment, recherche);
			return liste_lvl;
		}
		this.array_coo_id = function(){
				var array_coo_id = {}
				for(var id in liste_objet_planete){
					if(!/\D/.test(id)){
						array_coo_id[liste_objet_planete[id].coordonnee] = liste_objet_planete[id].id;
					}
				}
				return array_coo_id;
			};
		this.count_planete_memoire = function(){
				var nbr = 0
				for( var id in liste_objet_planete){
					if(!/\D/.test(id)){
						nbr++;
					}
				}
				return nbr;
			};
		this.maj_liste_planete = function(){
			var marqueur = false;
			for(var id in liste_objet_planete){
				if(!/\D/.test(id)){
					if(!JQ('#'+ id).attr('id') ){
						if((liste_objet_planete[id]['type_planete'] == 'planet') || (liste_objet_planete[id]['type_planete'] == undefined) ){
							delete liste_objet_planete[id];
							marqueur = true
						}
					}
				}
			}
			if(marqueur){GM_setValue(lieu_sav +'Infos_planetes', JQ.toJSON(liste_objet_planete));}
		}
		///////////// Initialisation de l'objet //////////////////////////
		var liste_objet_planete = JQ.evalJSON(GM_getValue(lieu_sav +'Infos_planetes',"0"));
		var nbr_planete_memoire = this.count_planete_memoire();
	}
	function URL(){
		var retour_url;
		if($_GET()['director']){
			retour_url = location.href.replace('&director='+ $_GET()['director'], '');
		}else{
			retour_url = location.href;
		}
		return retour_url;
	}
	function refresh_score(){
	var refresh_point_total = setInterval(
		function() {
			var chaine =  JQ('#scoreContentField a').html();
			if(chaine != null){
				var chargement_complet = chaine.indexOf('(Place');
				var point_total = chaine.split('(')[0];
				point_total = point_total.replace(/\./g, '\'').replace(/ /g, '');
				if(chargement_complet > -1){
					
					if(GM_getValue(lieu_sav +'point_total', '0') != point_total){
						GM_setValue(lieu_sav +'point_total', point_total);
						JQ('#points_total').text(point_total);
					}									
					clearInterval(refresh_point_total);
				}
			}			
		}
	, 1000);
	}
	function calculeOgame(){
		this.date_stock_plien = function(type){
			var prod = '';
			if(type == 'metal_box'){
				prod = 'metal_prod';
				ressource = 'metal';
			}else if(type == 'crystal_box'){
				prod = 'cristal_prod';
				ressource = 'cristal';
			}else if(type == 'deuterium_box'){
				prod = 'deut_prod';
				ressource = 'deut';
			}
			var dateActuel = new Date();
			var timestamp = dateActuel.getTime();		
			var stock_actuelle = infos_ress[ressource +'_stock_actuelle'];
			var stock_max = infos_ress[ressource +'_stock_max'];
			stock_actuelle = parseInt(stock_actuelle.replace(/\./g , '' ));	
			stock_max = parseInt(stock_max.replace(/\./g , '' ));
			if((stock_actuelle < stock_max) && planete_active[prod] > 0 ){
			var prod_ms = planete_active[prod] / 3600000;
			var time_restent = ((stock_max - stock_actuelle) / prod_ms);

			var date_stock_plien = new Date(time_restent + timestamp);
			var DateOgame = new date_ogame();
			var objet = {	h: DateOgame.h(date_stock_plien), 
							mn: DateOgame.mn(date_stock_plien),
							s: DateOgame.s(date_stock_plien),
							j: DateOgame.j(date_stock_plien),
							m: DateOgame.m(date_stock_plien),
							a: DateOgame.a(date_stock_plien),
							jours: DateOgame.jours(date_stock_plien),
							mois: DateOgame.mois(date_stock_plien)
						};
			}
			else if(planete_active[prod] == 0){
				var objet = lang.prod.cap_max3 +' !';
			}
			else{
				var objet = lang.prod.cap_max4 +' !';
			}
			return objet;
		};
	}
	function insert_detail_construction(e){
		if(e.target.id != 'content') return;
	//************************************* Ajustement général ************************************//
		JQ('#costswrapper ul#resources img').css({'height':'75%'});
		JQ('#costswrapper ul#resources li.metal').css({'width':'45px'});
		JQ('#costswrapper ul#resources li.enter input').attr('autocomplete', 'off');
		JQ('#costswrapper ul#resources li.metal').each(function(){
			var adresse_img, cout = 0;
			adresse_img = JQ('img', this).attr('src');
			if(adresse_img == 'http://gf3.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif'){
				var ressource = 'resources_metal';
			}
			else if(adresse_img == 'http://gf2.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif'){
				var ressource = 'resources_cristal';
			}
			else if(adresse_img == 'http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif'){
				var ressource = 'resources_deut';
			}
			JQ(this).attr('id', ressource);
		});
	//******************************************************************************************//
	//*********************** Modif ressources, recherche et installation *********************//
	if(localisation_page['page'] == 'resources' || localisation_page['page'] == 'research' || localisation_page['page'] == 'station'){		
		var cout = 0;
		JQ('#detail ul#resources li').each(function(){
			cout = /^(\d+)/.exec(JQ(this).attr('title').replace(/\./g, ''));
			JQ('span.cost', this).replaceWith(nbrRessourceFormater(cout[0], JQ(this).attr('id')));
		});
		 
	}
	//******************************************************************************************//
	//***************** Calcule cout defense et et vaisseau ************************************//
		if(localisation_page['page'] == 'defense' || localisation_page['page'] == 'shipyard'){	
			var cout, ressource;
			JQ('#costswrapper ul#resources li.metal').each(function(){
				cout = JQ(this).attr('title').trim().replace(/\./g, '');
				cout = 	/^(\d+).*$/.exec(cout)[1];
				JQ('span.cost', this).replaceWith(nbrRessourceFormater(cout, JQ(this).attr('id')));
				JQ('abbr', this).attr('cout_unitaire', cout);
				
				JQ('#costswrapper ul#resources li.enter input').keyup(function(p){
					JQ('#costswrapper ul#resources li.metal').each(function(){
						cout = JQ('abbr', this).attr('cout_unitaire').trim();
						var cout_total = cout * JQ('#costswrapper ul#resources li.enter input').val();
						JQ('span.cost', this).replaceWith(nbrRessourceFormater(cout_total, JQ(this).attr('id')));
						JQ('abbr', this).attr('cout_unitaire', cout);						
					});
				});			
			});

		//******************************************************************************************//
		}
	}
	function transporteur(){
	
	}
	function nouvelle_page(id_new_zone_html, contenu, type){
		if(JQ('#'+ id_new_zone_html).attr('style') == undefined){
			JQ('#contentWrapper div').each(function(){
				JQ(this).attr('style','display: none');
			});
			JQ('#menuTable a').removeClass('selected');
			if(type == 'vierge'){
				JQ('#contentWrapper').append('<div id="'+ id_new_zone_html +'">'+ contenu +'</div>');
			}
			else if(type == 'simple'){
				JQ('#contentWrapper').append('<div id="'+ id_new_zone_html +'" style="background-color: #0D1014; border: 1px solid #000000; "><div id="titre_'+ id_new_zone_html +'" style="text-align: center; padding:5px 0px 25px 0px; color:#5A9FC8;  ">TITRE PAGE</div><div id="contenu_'+ id_new_zone_html +'" style="height: 400px; overflow: auto; padding: 0px 15px;">'+ contenu +'</div></div>');
				
				JQ('#titre_'+ id_new_zone_html +'').css({'background': 'url("/cdn/img/navigation/box_h220.gif") repeat-y scroll 0 0 #0D1014', 'font-size': '16px', 'font-weight': '700' });

			}
			
		}
	}
	function option(){// pour ajouter une confi il suffi de l'ajouter celon les modèles et d'ajouter sont id dans la fonction config métode defaut_config
		var marqueur_sav = false;
		for( var cle in config.defaut_config){
			if(config[cle] == undefined){
				config[cle] = config.defaut_config[cle];
				marqueur_sav = true;
			}
		}
		if(marqueur_sav){config.sav();}
		var option_affichage = '<h3 id="option_affichage">'+ lang.option.titre2 +':</h3> <ul><li><input type="checkbox" name="patchnote_director" id="patchnote_director" /> <label for="patchnote_director">'+ lang.option.op1 +'</label></li><li><input type="checkbox" name="points_classement" id="points_classement" /> <label for="points_classement">'+ lang.option.op2 +'</label></li><li><input type="checkbox" name="stock_plein" id="stock_plein" /> <label for="stock_plein">'+ lang.option.op3 +'</label></li><li><input type="checkbox" name="jours_actif_officier" id="jours_actif_officier" /> <label for="jours_actif_officier">'+ lang.option.op4 +'</label></li><li><input type="checkbox" name="infos_prod" id="infos_prod" /> <label for="infos_prod">'+ lang.option.op5 +'</label></li><li><input type="checkbox" name="ordre_menu_gauche" id="ordre_menu_gauche" /> <label for="ordre_menu_gauche">'+ lang.option.op6 +'</label></li><li><input type="checkbox" name="case_menu_droit" id="case_menu_droit" /> <label for="case_menu_droit">'+ lang.option.op7 +'</label></li><li><input type="checkbox" name="temperature" id="temperature" /> <label for="temperature">'+ lang.option.op8 +'</label></li></ul>';
		var records = '<h3 id="option_records">'+ lang.option.titre3 +':</h3> <ul><li><input type="checkbox" name="records_actif" id="records_actif" /> <label for="records_actif">'+ lang.option.op9 +'</label></li><li> <input type="checkbox" name="records_anonyme_monde" id="records_anonyme_monde" /> <label for="records_anonyme_monde">'+ lang.option.op10 +' "'+ lang.record.monde +'"</label></li><li> <input type="checkbox" name="records_anonyme_lang" id="records_anonyme_lang" /> <label for="records_anonyme_lang">'+ lang.option.op11 +' "'+ langue +'"</label></li><li> <input type="checkbox" name="records_anonyme_uni" id="records_anonyme_uni" /> <label for="records_anonyme_uni">'+ lang.option.op12 +' "'+ univers +'"</label></li><li> <input type="checkbox" name="records_anonyme_alli" id="records_anonyme_alli" /> <label for="records_anonyme_alli">'+ lang.option.op13 +' "'+ nom_aliance +'"</label></li></ul>';
		var donnee_envoyer = '<h3 id="option_envois_donnee">'+ lang.option.titre4 +':</h3> <ul><li><input type="checkbox" name="ALT_envoie" id="ALT_envoie" /> <label for="ALT_envoie">'+ lang.option.op14 +' <a href="http://www.projet-alternative.fr/">projet-alternative.fr</a> ('+ lang.option.op15 +' <a href="http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-et-tableurs/1041721-scriptish-ogame-director-userscript">'+ lang.option.op16 +'</a>).</label></li></ul>';
		var autre_script = '<h3 id="option_autre_script">'+ lang.option.titre5 +':</h3> <ul><li><input type="checkbox" name="easy_transport" id="easy_transport" /> <label for="easy_transport">Easy Transport</label></li></ul>';
		
		var lien_utile = '<div id="liens_utile"><h3 id="lien">'+ lang.option.titre6 +'</h3><ul id="liste_liens_utile"><li><a href="http://www.play-4-fun.net/divers/ogame/traduction/" target="_blank">'+ lang.option.info4 +'</a></li><li><a href="http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-et-tableurs/1041721-scriptish-ogame-director-userscript">'+ lang.option.info1 +' Director</a></li><li><a href="http://userscripts.org/scripts/show/125519">'+ lang.option.info2 +' Ogame Director</a></li><li><a href="http://www.projet-alternative.fr/">'+ lang.option.info3 +' projet-alternative.fr</a></li></ul></div>';
		nouvelle_page('option_director', '<div id="liste_option_director">'+ option_affichage + records + donnee_envoyer + autre_script + lien_utile +'</div>', 'simple');
		
		JQ('#contenu_option_director').css({'height': '500px'});
		
		JQ('#titre_option_director').html( lang.option.titre +'<a href="http://play-4-fun.net/divers/ogame/ogame_director/patchnotes.txt" target="_blank" onmouseover="this.style.background = \'#99CC00\'; this.style.border = \'1px solid #000000\'; this.style.color = \'#000000\';" onmouseout="this.style.background = \'#10181F\'; this.style.border = \'1px solid #99CC00\'; this.style.color = \'#99CC00\';">'+ lang.general.patchnote +'</a>');
		JQ('#titre_option_director a').css({'position': 'relative', 'top': '-15px', 'left': '530px', 'color': '#99CC00', 'display': 'block', 'font-size': '10px', 'width': '100px', 'text-decoration': 'none', 'border': '1px solid #99CC00'});
		JQ('#liste_option_director').css({'position': 'relative', 'top': '-15px'});
		JQ('#liste_option_director h3').css({'color': '#1F4F7A', 'font-size': '15px', 'margin': '12px 0 8px 0'});
		JQ('#liste_option_director li').css({'color': '#606062', 'margin-bottom': '3px'});
		JQ('#liste_option_director ul').css({'list-style-type': 'none', 'margin-left': '10px'});
		
		JQ('#liens_utile h3').css({'color': '#1D6D55', 'font-size': '15px', 'margin': '12px 0 8px 0'});
		JQ('#liens_utile ul').css({'margin-left': '21px'});
		JQ('#liens_utile li').css({'margin-bottom': '3px'});
		JQ('#liens_utile a').attr('target', '_blank');
		
		for(var cle in config){ //coche les option qui sont activée
			if(config[cle]){
				JQ('#'+ cle).attr('checked', '');
			}
		}
		
		JQ('#liste_option_director input').click(function(){
			if(config[JQ(this).attr('name')]){
				JQ(this).removeAttr('checked');
				config[JQ(this).attr('name')] = false;
			}else{
				config[JQ(this).attr('name')] = true;
			}
			config.sav();
		});
	}
	function PU(){
		this.sav = function(cle, valeur){
			if(GM_getValue(lieu_sav +'PU',false)){
				var  Para_user = JQ.evalJSON(GM_getValue(lieu_sav +'PU',"0"));
			}else{
				var  Para_user = {};
			}
			Para_user[cle] = valeur;
			GM_setValue(lieu_sav +'PU', JQ.toJSON(Para_user));
		};
		this.get = function(cle){
			if(GM_getValue(lieu_sav +'PU',"0")){
				var  Para_user = JQ.evalJSON(GM_getValue(lieu_sav +'PU',"0"));
				Para_user = Para_user[cle];
			}else{
				var  Para_user = 0 ;
			}
			return Para_user;
		};
		
	}
	
	if(true){//Définition divers variable
	var url = URL();
	var univers = url.split("/")[2].split(".")[0];
	var page = url.split("/")[4].split("?")[1].split("=")[1].split("&")[0];
	var langue = JQ('meta[name="ogame-language"]').attr('content');
	var session = JQ('meta[name="ogame-session"]').attr('content');
	var version_ogame = JQ('meta[name="ogame-version"]').attr('content');
	var vitesse_univers = JQ('meta[name="ogame-universe-speed"]').attr('content');
	var id_joueur = JQ('meta[name="ogame-player-id"]').attr('content');
	var pseudo = JQ('meta[name="ogame-player-name"]').attr('content');
	var id_aliance = JQ('meta[name="ogame-alliance-id"]').attr('content');
	var nom_aliance = JQ('meta[name="ogame-alliance-name"]').attr('content');
	var tag_aliance = JQ('meta[name="ogame-alliance-tag"]').attr('content');
	var lieu_sav = 'Ogame_director/'+ univers +'/'+ id_joueur +'/';
	var LANG = new lang(JQ('meta[name="ogame-language"]').attr('content'));
	var lang = LANG.user_lang(langue);
	if(id_joueur == 162099){
		var z = true;
	}
	
	//infos planète
	var infos_ress = new infos_ressources();
	var id_planete = JQ('meta[name="ogame-planet-id"]').attr('content');
	var planete_active = new planete(id_planete);
	var nbr_planete = nbr_planete();
	var empire = new empire();
	var config = new config();
	var PU = new PU();
	}
	if(true){//Définition des variable image en Base64
	var icon_director = GM_getResourceURL("icon_director");
	var icon_temperature = GM_getResourceURL("temperature");
	
	var barre_haut = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAoBAMAAAAmrzZHAAAAAXNSR0IArs4c6QAAACpQTFRFCwwQCQoMBggHGh8lHR4gAAAFCgsNERIXBAYFDQ4SBQUFDxAVAQEBAAAAqAYfIgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKBwgyJyUj1vYAAAAxSURBVAjXYzjDcIbhLhSis1cBYQcQKgGhIBCmASEIzATC3UBYDoTGQBgKhC5ACNQHAAVQFi/ZiSftAAAAAElFTkSuQmCC";

	var croix = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==";
	}

	if(page != 'empire'){// Modif général sur toutes les pages sauf empire

		///////// Ajout icon Ogame director vers les officiers et page Options director/////
		if(true){
			if(module_userscript == 'SI'){version_script = GM_getMetadata('version');}//ScriptIsh uniquement
			var type_version = '';
			if(mode == 'beta'){type_version = 'Bêta';}else if (mode == 'dev'){type_version = 'Dev';}
			JQ('#officers').prepend('<a id="icon_director" class="tipsTitle icon_director" title="Ogame Director  '+ version_script +' '+ type_version +'| '+ lang.general.text_icon_director +'" href="javascript:void(0)"><img src="'+ icon_director +'" /></a>');
			JQ("#officers").css({'margin-left': "-10px", width: "280px"});
			JQ('#icon_director').click(function(){option();});
			if(z){JQ('#menuTable a').removeClass('premiumHighligt');}else{JQ('#menuTable a.premiumHighligt span').css('color', '#3D6478');}
			////// ajout id et num position des bouton menu gauche ///////
			var nom_bouton = '';
			var nbr = 1;
			JQ('#menuTable li').each(function(){
				nom_bouton = /.+index\.php\?page=(.+)$/.exec(JQ('a.menubutton', this).attr('href'));
				if(nom_bouton != null){
					JQ(this).attr('id', 'links_'+ nom_bouton[1]);				
				}
				JQ(this).addClass('bouton_menu_gauche');
				JQ(this).prepend('<span class="position" style="display: none;">'+ nbr +'</span>');
				nbr++;
			});
		};
		
		/////// Ajout nbr jours heurs commandent actif ////////
		if(config.jours_actif_officier){
			JQ('#officers a.on').each(function(){
				/.+\s(\d+)\s.*$/.exec(JQ(this).attr('title'));
				var nbr = RegExp.$1 +'j';
				var left = 10;
				if((nbr == 'spanj') || (nbr == 'divj')){
					/.+\s(\d+:\d+).*$/.exec(JQ(this).attr('title'));
					nbr = RegExp.$1.replace(':', 'h');
					left = 0
				}
				JQ('img', this).after('<div class="time_restent" style="font-size: 10px; position: relative; float: left;left: '+ left +'px;">'+ nbr +'</div>');
			});
			
		}
		
		/////// Ajout nbr de case menu planete droite ////////
		if(config.case_menu_droit){
			if(JQ('#myWorlds').attr('id')){
				JQ('#myWorlds div.smallplanet').each(function(){
					JQ('#norm .smallplanet').css({'height': '100px'});
					var temperature = /.+\((.+)\).?/.exec(JQ('a.planetlink ',this).attr('title'));
					JQ('span.planet-name', this).after('<span class="planet-case">Case '+ temperature[1] +'</span>');
					if(JQ('.constructionName', this)[0] != undefined){
						JQ('span.planet-koords', this).after(JQ('.constructionIcon', this)[0]);
						JQ('span.planet-koords', this).after(JQ('.constructionName', this)[0]);
						JQ('.constructionName', this).css({'display':'block'});
						JQ(this).css({'height':'110px'});
					}
				});
				JQ('#myWorlds a.active span.planet-case').css('color', '#99CC00');
			}
			else{
				JQ('#myPlanets div.smallplanet').each(function(){	
					var temperature = /.+\((.+)\).?/.exec(JQ('a.planetlink ',this).attr('title'));
					JQ('span.planet-name', this).after('<span class="planet-case" style="position: absolute; left: 43px; top: 21px; font-size: 10px;">Case '+ temperature[1] +'</span>');
					JQ('span.planet-koords',this).css({'top': '35px',})
					if(JQ('.constructionName', this)[0] != undefined){
						JQ('span.planet-koords', this).after(JQ('.constructionIcon', this)[0]);
						JQ('span.planet-koords', this).after(JQ('.constructionName', this)[0]);
						JQ('.constructionName', this).css({'position':'absolute','top':'50px','left':'43px'});
						JQ('.constructionIcon', this).css({'top':'50px','left':'30px'});
						JQ(this).css({'height':'61px'});
					}else if(JQ('.constructionIcon', this)[0] != undefined){
						JQ('.constructionIcon', this).css({'top':'30px','left':'25px'});
					}
				});
				JQ('#myPlanets a.active span.planet-case').css('color', '#99CC00');
			}
			
			
		}
			
		//////// Retoucher et ajout infos bar menu haut de page (partie pour toute les pages)statistics ////
		if(config.points_classement){
			var cle_classement = 'highscore';
			var lien_classement = JQ('#bar ul li a[href*="/game/index.php?page='+ cle_classement +'"]').clone().text(lang.general.classement);
			var place_classement = JQ('#bar ul li:nth-child(4)').text().split('(')[1].replace(')',  '').replace(/ /g, '');
			var point_total = GM_getValue(lieu_sav +'point_total', '0');
			JQ('#bar ul li:nth-child(4)').html(lien_classement);
			var point_place = '<span id="points_place" style="font-size:0.8em;"> ('+ place_classement + lang.general.points +': <span id="points_total" >'+ point_total.replace(/ /g, '') +'</span>)</span>';
			JQ('#bar ul li a[href*="/game/index.php?page='+ cle_classement +'"]').after(point_place);
			
		}

		//////// Ajout lien patchNote Ogame director //////////
		if(config.patchnote_director){
			var patchnote_director = '<a href="http://play-4-fun.net/divers/ogame/ogame_director/patchnotes.txt" target="_blank" id="changelog_link2" style="background-color: #000000; border: 1px solid #99CC00; color: #99CC00; font-size: 9px; left: 6px; padding: 2px 6px; position: absolute; text-decoration: none; top: 115px;" onmouseover="this.style.background = \'#99CC00\'; this.style.border = \'1px solid #000000\'; this.style.color = \'#000000\';" onmouseout="this.style.background = \'#000000\'; this.style.border = \'1px solid #99CC00\'; this.style.color = \'#99CC00\';">  '+ lang.general.patchnote +' Director  </a>';
			JQ('#changelog_link2').hover(function(){
			   JQ(this).addClass("hover");
			 },function(){
				JQ(this).removeClass("hover");
			 });
			JQ('#changelog_link').after(patchnote_director);
			JQ('#changelog_link').css('top', '94px');
			JQ('#changelog_link').text('Patchnote Ogame ');
		}
		
		//////// Ajout date heur stock plein ///////
		if(config.stock_plein){
			planete_active.maj('prod');
			var CalculeOgame = new calculeOgame();
			var type_ressource = new Array('metal_box','crystal_box','deuterium_box');
			for(var i = 0; i<3;i++){
				var infos_stock = CalculeOgame.date_stock_plien(type_ressource[i]);
				if(typeof(infos_stock) == 'object'){
					JQ('#'+ type_ressource[i] +' .value').append('<span class="date_stock_plien">'+ infos_stock.j +'/'+ infos_stock.m +'/'+ infos_stock.a +'</br>'+ infos_stock.h +'h'+ infos_stock.mn +'mn'+ infos_stock.s +'s</span>');
					var info_box_titre = JQ('#'+ type_ressource[i]).attr('title');
				
					JQ('#'+ type_ressource[i]).attr('title', infos_box);
					if(JQ('#'+ type_ressource[i] +' span').hasClass('middlemark')){
						JQ('#'+ type_ressource[i] +' span.date_stock_plien').addClass('middlemark');
					}
				}else{
					JQ('#'+ type_ressource[i] +' .value').append('<span class="date_stock_plien overmark">'+ infos_stock +'</span>');
					/^(.+:\|)(.+)<span class=''>(.*)<\/span><br>(.*)<span class=''>(.*)<\/span><br>(.*)<span class='undermark'>(.*)<\/span><br>(.*)<span class='overermark'>(.*)<\/span>$/.exec(JQ('#'+ type_ressource[i]).attr('title'));
					var infos_box = RegExp.$1 + RegExp.$2 +'<span class=\'\'>'+ RegExp.$3 +'</span><br>'+ RegExp.$4 +'<span class=\'\'>'+ RegExp.$5 +'</span><br><span class="overmark">'+ lang.prod.cap_max2 +' !</span><br />'+ RegExp.$6 +'<span class=\'undermark\'>'+ RegExp.$7 +'</span><br>'+ RegExp.$8 +'<span class=\'overermark\'>'+ RegExp.$9 +'</span>';
					JQ('#'+ type_ressource[i] ).attr('title', infos_box);

				}
			}
			
			JQ('.date_stock_plien').css({'display': 'block', 'font-size': '0.9em'});
			JQ('#info').css({'background-image': 'url("'+ GM_getResourceURL("entete_retoucher") +'")'});
			JQ('#star2').remove();
			JQ('#info ul#resources li:not(.darkmatter, .energy) .value').css({'left': '5px', 'position': 'absolute', 'top': '32px'});
			JQ('#info ul#resources li.metal').css({'left': '220px'});
			JQ('#info ul#resources li.crystal').css({'left': '340px'});
			JQ('#info ul#resources li.deuterium').css({'left': '460px'});
			JQ('#info ul#resources li.darkmatter').css({'left': '580px'});
			JQ('#info ul#resources li.energy').css({'left': '660px'});
			JQ('#info ul#resources li').css({'top': '30px'});
		}
		
		//////// Ajout du bouton record et de la page des records
		if(config.records_actif){
			var position_menu = 0;
			var nbr_bouton = JQ('#menuTable li').length -1;
			JQ('#menuTable li:eq('+ nbr_bouton +')').after('<li id="links_record" class="bouton_menu_gauche"><span class="position" style="display: none;">'+ (nbr_bouton +2) +'</span><span class="menu_icon"><img src="http://img808.imageshack.us/img808/23/improgressioncopie.png" alt="icon record" width="38" height="29" /></span><a id="bouton_record" href="javascript:void(0)" class="menubutton" target="_self" ><span class="textlabel">'+ lang.general.bouton_records +'</span></a></li>');
		JQ('#bouton_record').click(function(){
				//affiche_recodrs contien la mise en pages du cadre records
				var affiche_recodrs = function(html){
				if(JQ('#records').attr('style') == undefined){
					JQ('#contentWrapper div').each(function(){
						JQ(this).attr('style','display: none');
					});
					JQ('#contentWrapper').append('<div id="records" style="background-color: #0D1014; border: 1px solid #000000; "><div id="titre_records" style="text-align: center; padding:5px 0px 25px 0px; color:#5A9FC8;  ">'+ lang.general.bouton_records +'</div><div id="infos_dev"style="position:absolute; top:12px; left:35px;"></div><div id="menu_records"><ul><li><a href="javascript:void(0)" id="bouton_record_monde" class="" alt="Records mondial">'+ lang.record.monde +'</a></li><li><a href="javascript:void(0)" id="bouton_record_lang" class="" alt="Records Langue">'+ lang.record.lang +' '+ langue +'</a></li><li><a href="javascript:void(0)" id="bouton_record_univers" class="active" alt="Records '+ univers +'">'+ univers +'</a></li><li><a href="javascript:void(0)" id="bouton_record_alliance" class="" alt="Records alliance">'+ lang.record.alliance +'</a></li></ul><div id="nbr_utilisateur" style="color:#60A0B2; position:absolute; top:40px; left:460px; width:200px;">0 '+ lang.record.user +'</div></div><div id="contenu_records" style="overflow-y: scroll; overflow-x: hidden; height: 400px; padding: 0px 15px;">'+ html +'</div></div>');
					
					JQ('#nbr_utilisateur').text(JQ('#contenu_records_uni div.nbr_utilisateur').text());
					JQ('.nbr_utilisateur').css('display', 'none');
					JQ('#infos_dev').html(JQ('#contenu_records_uni .infos_dev').html());
					JQ('.infos_dev').css('display', 'none');
					
					JQ('#menuTable a').removeClass('selected');
					JQ('#bouton_record').addClass('selected');
					
					JQ('#titre_records').css({'background': 'url("/cdn/img/navigation/box_h220.gif") repeat-y scroll 0 0 #0D1014', 'font-size': '16px', 'font-weight': '700' });
					
					JQ('#menu_records').css({'margin': ' 0 0 0 10px'});
					JQ('#menu_records ul li').css({'float': 'left',	'display': 'inline'});
					JQ('#menu_records ul li a').css({'background': 'url("http://gf1.geo.gfsrv.net/cdn2e/abe68ddd4ee6fbc2b83ab10c226d28.gif") no-repeat scroll left 0 transparent',	'display': 'block', 'height': '22px', 'text-align': 'center', 'text-decoration': 'none', 'width': '108px', 'font-size': '14px', 'padding-top': '4px'});
					JQ('#menu_records ul li a.active').css({'background': 'url("http://gf1.geo.gfsrv.net/cdn2e/abe68ddd4ee6fbc2b83ab10c226d28.gif") no-repeat scroll 0 -26px transparent', 'color': '#6F9FC8'}); 

					//effet sur les onglait
					JQ('#menu_records ul li a').hover(function(){
					   JQ(this).addClass("hover");
					   JQ('#menu_records ul li a.hover').css({'background': 'url("http://gf1.geo.gfsrv.net/cdn2e/abe68ddd4ee6fbc2b83ab10c226d28.gif") no-repeat scroll 0 -26px transparent', 'color': '#6F9FC8'});
					 },function(){
						JQ(this).removeClass("hover");
						if(!JQ(this).hasClass("active")){
							JQ(this).css({'background': 'url("http://gf1.geo.gfsrv.net/cdn2e/abe68ddd4ee6fbc2b83ab10c226d28.gif") no-repeat scroll left 0 transparent', 'color': '#848484'});
						}
					});
					//Gestion de l'affichage des divers type record
					JQ('#menu_records ul li a').click(function(){
						if(!JQ(this).hasClass("active")){
							JQ('#menu_records ul li a').removeClass("active");
							JQ('#menu_records ul li a').css({'background': 'url("http://gf1.geo.gfsrv.net/cdn2e/abe68ddd4ee6fbc2b83ab10c226d28.gif") no-repeat scroll left 0 transparent', 'color': '#848484'});
							JQ(this).addClass("active");
							JQ(this).css({'background': 'url("http://gf1.geo.gfsrv.net/cdn2e/abe68ddd4ee6fbc2b83ab10c226d28.gif") no-repeat scroll 0 -26px transparent', 'color': '#6F9FC8'});
							
							if(JQ(this).attr('id') == 'bouton_record_monde'){
								JQ('#nbr_utilisateur').text(JQ('#contenu_records_monde div.nbr_utilisateur').text());
								JQ('#contenu_records_uni').attr('style','display: none');
								JQ('#contenu_records_alli').attr('style','display: none');
								JQ('#contenu_records_lang').attr('style','display: none');
								JQ('#contenu_records_monde').attr('style','display: block');
							}
							else if(JQ(this).attr('id') == 'bouton_record_univers'){
								JQ('#nbr_utilisateur').text(JQ('#contenu_records_uni div.nbr_utilisateur').text());
								JQ('#contenu_records_uni').attr('style','display: block');
								JQ('#contenu_records_alli').attr('style','display: none');
								JQ('#contenu_records_monde').attr('style','display: none');
								JQ('#contenu_records_lang').attr('style','display: none');
							}
							else if(JQ(this).attr('id') == 'bouton_record_alliance'){
								JQ('#nbr_utilisateur').text(JQ('#contenu_records_alli div.nbr_utilisateur').text());
								JQ('#contenu_records_uni').attr('style','display: none');
								JQ('#contenu_records_alli').attr('style','display: block');
								JQ('#contenu_records_monde').attr('style','display: none');
								JQ('#contenu_records_lang').attr('style','display: none');
							}
							else if(JQ(this).attr('id') == 'bouton_record_lang'){
								JQ('#nbr_utilisateur').text(JQ('#contenu_records_lang div.nbr_utilisateur').text());
								JQ('#contenu_records_uni').attr('style','display: none');
								JQ('#contenu_records_alli').attr('style','display: none');
								JQ('#contenu_records_monde').attr('style','display: none');
								JQ('#contenu_records_lang').attr('style','display: block');
							}
						}
					});
					//Bouton switch lune planete
					var Bouton_lune_terre_position, Bouton_lune_terre_right;
					JQ('.Bouton_lune_terre').hover(function(){
						if(JQ('#records_ressource').css('display') == 'block'){
							var back_pos = '0px';
						}else{
							var back_pos = '-150px';
						}
						Bouton_lune_terre_position = JQ(this).css('background-position');
						Bouton_lune_terre_right = JQ('.Bouton_lune_terre').css('right');
						JQ(this).css('background-position', '0px '+ back_pos);
						JQ(this).animate({right : '0'});

					 },function(){
						JQ(this).css('background-position', Bouton_lune_terre_position);
						JQ(this).animate({right : Bouton_lune_terre_right});
					 });
					 
					JQ('.Bouton_lune_terre').click(function(){
						if(JQ('#records_ressource').css('display') == 'block'){
							JQ(this).css('background-position', '0px -150px');
							JQ('.records_planet').hide();
							JQ('.records_lune').show();
							Bouton_lune_terre_position = '0px -227px';
						}else{
							JQ(this).css('background-position', '0px 0px');
							JQ('.records_lune').hide();
							JQ('.records_planet').show();
							Bouton_lune_terre_position = '0px -75px';
						}
					 });
					
					//Affichage des records
					JQ('.bloc_records').css('cursor', 'pointer');
					JQ('.bloc_records').click(function(){
						if(JQ(this).hasClass('records_planet')){
							if(JQ(this).attr('id') == 'records_ressource'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_ressource, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_ressource, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_ressource_cumul'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_ressource_cumul, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_ressource_cumul, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_installation'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_installation, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_installation, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_installation_cumul'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_installation_cumul, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_installation_cumul, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_defense'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_defense, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_defense, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_defense_cumul'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_defense_cumul, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_defense_cumul, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_recherche'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_recherche, .records_lune)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_recherche, .records_lune)').hide();
									JQ('.liste_records',this).show();
								}
							}
						}else if(JQ(this).hasClass('records_lune')){
							if(JQ(this).attr('id') == 'records_ressource_lune'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_ressource_lune, .records_planet)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_ressource_lune, .records_planet)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_installation_lune'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_installation_lune, .records_planet)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_installation_lune, .records_planet)').hide();
									JQ('.liste_records',this).show();
								}
							}else if(JQ(this).attr('id') == 'records_defense_lune'){
								if(JQ('.liste_records',this).css('display') == 'block'){
									JQ('.bloc_records:not(#records_defense_lune, .records_planet)').show();									
									JQ('.liste_records',this).hide();
								}else{
									JQ('.bloc_records:not(#records_defense_lune, .records_planet)').hide();
									JQ('.liste_records',this).show();
								}
							}
						}
						
					 });
					 
					JQ('#contenu_records').css({'clear': 'left', 'border': '2px solid #324754'});
					JQ('#contenu_records h3.titre_records').css({'font-size': '20px', 'font-weight': '600', 'color': '#647E90', 'margin': '15px 0px 5px 0px' });					
					JQ('#contenu_records_monde').attr('style','display: none');
					JQ('#contenu_records_alli').attr('style','display: none');
					
					var PUget = PU.get('contenu_records_height');
					if(PUget){ JQ('#contenu_records').css('height', PUget +'px'); }
					
					// load JQuery UI CSS 
					var jqueryUICSS = GM_getResourceText("jqueryUICSS"); 
					GM_addStyle(jqueryUICSS); 
					JQ('#contenu_records').resizable({ 	handles: 's', minHeight: 400,
														stop: function(event, ui) { 
																var hauteur = ui.size['height']; 
																PU.sav('contenu_records_height', hauteur);
														}
													}); 
				}

			};
				var envoie_recodrs = function(retour){
					var dateActuel = new Date();
					var timestamp = dateActuel.getTime();
					GM_setValue(lieu_sav +'records_time_maj', timestamp + '');
					GM_log(retour);
				}
				var DirecorRecord = new httpRequete();
				//Requete qui envoie les donnée pour mise à jours des infos
				DirecorRecord.data({'id_user': id_joueur,
									'pseudo': pseudo,
									'uni': univers,
									'id_alli': id_aliance,
									'anonyme_monde': config.records_anonyme_monde,
									'anonyme_lang': config.records_anonyme_lang,
									'anonyme_uni': config.records_anonyme_uni,
									'anonyme_alli': config.records_anonyme_alli,
									'lang': langue,
									'version_script': version_script,
									'mode':mode,
	//						'mintenance':true,
									'records': JQ.toJSON(empire.records())
									});
				DirecorRecord.envoie('record/traitement.php', envoie_recodrs);
				//Requete qui demende la liste des records mis en page par le serveur
				DirecorRecord.data({'lang': langue, 
									'uni': univers, 
									'id_alli': id_aliance,
									'mode':mode,
									'version_script': version_script
									});
				var retourDirector = DirecorRecord.demande('record/affichage_liste_records.php', affiche_recodrs);
			});
			///// mise à jour toute les 24h
			var dateActuel = new Date();
			var timestamp =  dateActuel.getTime();
			if(((((60*60)*24)*1000)+ parseInt(GM_getValue(lieu_sav +'records_time_maj', '0'))) < timestamp){
				var envoie_recodrs = function(retour){
					var dateActuel = new Date();
					var timestamp = dateActuel.getTime();
					GM_setValue(lieu_sav +'records_time_maj', timestamp + '');
					GM_log(retour);
				}
				var DirecorRecord = new httpRequete();
				DirecorRecord.data({'id_user': id_joueur,
									'pseudo': pseudo,
									'uni': univers,
									'id_alli': id_aliance,
									'anonyme_monde': config.records_anonyme_monde,
									'anonyme_lang': config.records_anonyme_lang,
									'anonyme_uni': config.records_anonyme_uni,
									'anonyme_alli': config.records_anonyme_alli,
									'lang': langue,
									'version_script': version_script,
									'mode':mode,
									'records': JQ.toJSON(empire.records())
									});
				DirecorRecord.envoie('record/traitement.php', envoie_recodrs);
				GM_log('Une mise à jours des records à été envoyé');
			}
			else{
				var dateMaj = new Date(parseInt(GM_getValue(lieu_sav +'records_time_maj', '0')));
				var timestamp =  dateMaj.toLocaleString();
				GM_log('Dernière envoie des mise à jours des records le '+ timestamp +', le prochain se fera 24h plus tard ou a la visite de la page records');
			}
		}
		
		//////// Rend et trie le menu de gauche (dois s'executer après toutes modif ajout de boutons dans le menu gauche)////////	
		if(config.ordre_menu_gauche){
			if(JQ.evalJSON(GM_getValue(lieu_sav +'Tri_menu_gauche',"0"))){
				var array_bouton = JQ.evalJSON(GM_getValue(lieu_sav +'Tri_menu_gauche',"0"));
				for(var i = 0; i < array_bouton.length; i++){
					if(i == 0){
						JQ('#menuTable').prepend(JQ('#'+ array_bouton[i]));
					}else{
						JQ('#'+ array_bouton[(i-1)]).after(JQ('#'+ array_bouton[i]));
					}
				}
				var nbr = 1;
				JQ('#menuTable li span.position').each(function(){
					JQ(this).text(nbr);
					nbr++;
				});
			}
			
			JQ(function() {
				var id_item;
				var position_item_depart;
				JQ('#menuTable').sortable({
					axis: "y", // Le sortable ne s'applique que sur l'axe vertical
					opacity: 0.50,
	//				placeholder: "ui_zone_deplacement",
					distance: 5, // Le drag ne commence qu'à partir de 5px de distance de l'élément
					// Evenement appelé lorsque l'élément est commencer à être déplacer
					start: function(event, ui){
						id_item = ui.item.attr('id');
						position_item_depart = JQ(ui.item).find('span.position').text();
					},
					// Evenement appelé lorsque l'élément est relaché
					stop: function(event, ui){
						var liste = ui.item.parent('#menuTable');
						var pos = 0;
						var array_id_pos = new Array(0);
						JQ(liste.find('li.bouton_menu_gauche')).each(function(){
							pos++;
							JQ(this).find('span.position').text(pos);
							array_id_pos[pos -1] = JQ(this).attr('id');
						});
						var position_item = JQ(ui.item).find('span.position').text();
						if(position_item_depart != position_item){
							GM_setValue(lieu_sav +'Tri_menu_gauche', JQ.toJSON(array_id_pos));
						}
					}
				});
		});
		}
		
		
	}
	
	//////// Partie du script qui s'execute uniquement sur la page :  /////////
	var localisation_page = $_GET();
	if(localisation_page['page'] == 'overview'){		//D'accueil
		refresh_score();
		/////// Ajout de la température mini et max ////////
		if(config.temperature){
			if(planete_active.type_planete == 'planet'){
				if(JQ('#myWorlds').attr('id')){
					JQ('#myWorlds a.active').each(function(){	
						var temperature = /.+>(.+C).?/.exec(JQ(this).attr('title'));
						
						JQ('#header_text h2 a').after('<div style="font-size:10px; position:absolute; left:20px; top:110px; "><img src="'+ icon_temperature +'" width="20px" height="" style="position:relative; top:10px;"/>'+ temperature[1]+'</div>');
					});
				}else{
					JQ('#myPlanets a.active').each(function(){	
						var temperature = /.+>(.+C).?/.exec(JQ(this).attr('title'));
						
						JQ('#header_text h2 a').after('<div style="font-size:10px; position:absolute; left:20px; top:110px; "><img src="'+ icon_temperature +'" width="20px" height="" style="position:relative; top:10px;"/>'+ temperature[1]+'</div>');
					});
				}
			}
			else if(planete_active.type_planete == 'moon'){
				if(planete_active.temperature){
					var temperature = new Array('', planete_active.temperature);
				}else{
					function recup_temperature(){
						var recup_temperature = setInterval(
							function() {
								var chaine =  JQ('#temperatureContentField').text();
								var declancheur = JQ('#positionField').text();
								if(chaine != null){
									var chargement_complet = declancheur.indexOf(':');
									if(chargement_complet > -1){
										planete_active.temperature = chaine;
										planete_active.sav();
										JQ('#temperature_lune').text(chaine);
										clearInterval(recup_temperature);
									}
								}			
							}
						, 1000);
					}
					if(planete_active.temperature){
						var temperature = new Array('', planete_active.temperature);
					}else{
						recup_temperature();
						var temperature = new Array('', '0 C° à 0 C°');
					}
				}
				JQ('#planet h2').append('<div style="font-size:10px; position:absolute; left:20px; top:110px; "><img src="'+ icon_temperature +'" width="20px" height="" style="position:relative; top:10px;"/><span id="temperature_lune">'+ temperature[1]+'</span></div>');
			}
			
			
			
			JQ('#myWorlds a.active span.planet-case').css('color', '#99CC00')	
			
		}

		//Déplacement et adaptation des boutons renomer, abandonner et déménager
		if(config.infos_prod){
			JQ('#planetdata').css('display', 'none');
			JQ('#planetOptions a.openPlanetRenameGiveupBox span:eq(0)').replaceWith('');
			var bouton_abandRenom = JQ('#planetOptions a.openPlanetRenameGiveupBox ').clone();
			var bouton_demenager = JQ('#planetOptions a[data-tooltip-button]').clone();
			JQ('#header_text h2 a.openPlanetRenameGiveupBox').css({'width': '350px'});
			JQ('#header_text h2 a.openPlanetRenameGiveupBox img').remove();
			JQ('#header_text h2 ').append(JQ(bouton_abandRenom).css({'position': 'absolute', 'padding-top': '2px', 'left': '-15px'}));
			JQ('#planet h2 a.openPlanetRenameGiveupBox:eq(1)').attr('title', lang.prod.abrn);
			JQ('#header_text h2').append(JQ(bouton_demenager).css({'position': 'relative', 'font-size': '10px', 'padding-top': '2px', 'width': '100px', 'left': '-15px'}));
			JQ('#planetOptions').remove();
		}
		//==========================================================================//
		//creation et ajout des infos de production
		if(config.infos_prod){
		//définition devers valeur
		var dateOame = new date_ogame();
		var nbr_jours_mois = dateOame.nbr_jours_mois();
		var nbr_jours_ans = 365;
		if(dateOame.annee_bis)nbr_jours_ans = 366;
		
//		planete_active.maj('prod');
		var planete_prod_metal = planete_active.metal_prod;
		var planete_prod_cristal = planete_active.cristal_prod;
		var planete_prod_deut = planete_active.deut_prod;
		
		var empire_prod_metal = empire.metal_prod();
		var empire_prod_cristal = empire.cristal_prod();
		var empire_prod_deut = empire.deut_prod();
		
		JQ('div#detailWrapper').css('height','30px');
		//Balise + text
		JQ('#header_text').after('<div id="tab_prod"><div id="entete_prod"><h3>'+ lang.prod.prod +'</h3><h4>'+ lang.prod.metal +'</h4><h4>'+ lang.prod.cristal +'</h4><h4>'+ lang.prod.deut +'</h4></div><div id="planete_prod" class="bloc_prod"><div class="prod_h"><h5>'+ lang.prod.heures +'</h5><div class="prod prod_metal">'+ formatage_nbr(planete_prod_metal) +'</div><div class="prod prod_cristal">'+ formatage_nbr(planete_prod_cristal) +'</div><div class="prod prod_deut">'+ formatage_nbr(planete_prod_deut) +'</div></div><div class="prod_j"><h5>'+ lang.prod.jours +'</h5><div class="prod prod_metal">'+ formatage_nbr(planete_prod_metal *24) +'</div><div class="prod prod_cristal">'+ formatage_nbr(planete_prod_cristal *24) +'</div><div class="prod prod_deut">'+ formatage_nbr(planete_prod_deut *24) +'</div></div><div class="prod_s"><h5>'+ lang.prod.semaine +'</h5><div class="prod prod_metal">'+ formatage_nbr(planete_prod_metal *24*7) +'</div><div class="prod prod_cristal">'+ formatage_nbr(planete_prod_cristal *24*7) +'</div><div class="prod prod_deut">'+ formatage_nbr(planete_prod_deut *24*7) +'</div></div><div class="prod_m"><h5>'+ lang.prod.mois +'</h5><div class="prod prod_metal">'+ formatage_nbr(planete_prod_metal *24*nbr_jours_mois) +'</div><div class="prod prod_cristal">'+ formatage_nbr(planete_prod_cristal *24*nbr_jours_mois) +'</div><div class="prod prod_deut">'+ formatage_nbr(planete_prod_deut *24*nbr_jours_mois) +'</div></div><div class="prod_a" style="margin-bottom:5px;"><h5>'+ lang.prod.ans +'</h5><div class="prod prod_metal">'+ formatage_nbr(planete_prod_metal *24*nbr_jours_ans) +'</div><div class="prod prod_cristal">'+ formatage_nbr(planete_prod_cristal *24*nbr_jours_ans) +'</div><div class="prod prod_deut">'+ formatage_nbr(planete_prod_deut *24*nbr_jours_ans) +'</div><div id="titre_planete">'+ lang.prod.planete +'</div></div></div></div>');
		
		JQ('#tab_prod').append('<div id="empir_prod" class="bloc_prod"><div class="prod_h"><h5>'+ lang.prod.heures +'</h5><div class="prod prod_metal">'+ formatage_nbr(empire_prod_metal) +'</div><div class="prod prod_cristal">'+ formatage_nbr(empire_prod_cristal) +'</div><div class="prod prod_deut">'+ formatage_nbr(empire_prod_deut) +'</div></div><div class="prod_j"><h5>'+ lang.prod.jours +'</h5><div class="prod prod_metal">'+ formatage_nbr(empire_prod_metal *24) +'</div><div class="prod prod_cristal">'+ formatage_nbr(empire_prod_cristal *24) +'</div><div class="prod prod_deut">'+ formatage_nbr(empire_prod_deut *24) +'</div></div><div class="prod_s"><h5>'+ lang.prod.semaine +'</h5><div class="prod prod_metal">'+ formatage_nbr(empire_prod_metal *24*7) +'</div><div class="prod prod_cristal">'+ formatage_nbr(empire_prod_cristal *24*7) +'</div><div class="prod prod_deut">'+ formatage_nbr(empire_prod_deut *24*7) +'</div></div><div class="prod_m"><h5>'+ lang.prod.mois +'</h5><div class="prod prod_metal">'+ formatage_nbr(empire_prod_metal *24*nbr_jours_mois) +'</div><div class="prod prod_cristal">'+ formatage_nbr(empire_prod_cristal *24*nbr_jours_mois) +'</div><div class="prod prod_deut">'+ formatage_nbr(empire_prod_deut *24*nbr_jours_mois) +'</div></div><div class="prod_a"><h5>'+ lang.prod.ans +'</h5><div class="prod prod_metal">'+ formatage_nbr(empire_prod_metal *24*nbr_jours_ans) +'</div><div class="prod prod_cristal">'+ formatage_nbr(empire_prod_cristal *24*nbr_jours_ans) +'</div><div class="prod prod_deut">'+ formatage_nbr(empire_prod_deut *24*nbr_jours_ans) +'</div><div id="titre_empire">'+ lang.prod.empire +'</div></div></div>');
		//CSS
		JQ('#tab_prod').css({'width' : '79%', 'height': '74%', 'backgroundColor': 'black', 'left': '135px', 'opacity': '0.4', 'position': 'absolute', 'top': '35px', 'border-radius': '10px 10px 10px 10px', 'text-align': 'right'});
		JQ('#entete_prod').css({'opacity': '1', 'margin-bottom': '5px'});
		JQ('#entete_prod h3').css({'font-size': '152%', 'margin-bottom': '8px', 'padding-top': '12px', 'text-align': 'center'});
		JQ('#entete_prod h4').css({'position': 'relative', 'display': 'inline', 'margin-left': '8%', 'margin-right': '12%'});
		JQ('#tab_prod .bloc_prod').css({'text-align': 'left'});
		JQ('#titre_planete').css({'-moz-transform': 'rotate(-90deg)', '-webkit-transform': 'rotate(-90deg)', 'width': '20px', 'position': 'absolute', 'top': '44%'});
		JQ('#titre_empire').css({'-moz-transform': 'rotate(-90deg)', '-webkit-transform': 'rotate(-90deg)', 'width': '20px', 'position': 'absolute', 'top': '72%'});
		JQ('#tab_prod .bloc_prod h5').css({'display': 'inline-block', 'margin-left': '18px', 'width': '50px'});
		JQ('#tab_prod .bloc_prod div.prod').css({'display': 'inline-block', 'text-align': 'center'});
		JQ('#tab_prod .bloc_prod div.prod_metal').css({'width': '120px'});
		JQ('#tab_prod .bloc_prod div.prod_cristal').css({'width': '160px'});
		JQ('#tab_prod .bloc_prod div.prod_deut').css({'width': '150px'});
		JQ('#planete_prod').css({'font-size': '0.8em'});
		JQ('#empir_prod').css({'font-size': '0.8em'});
		//Nbr case lunaire
		if(planete_active.type_planete == 'moon'){
				function recup_cases(){
					var recup_cases = setInterval(
						function() {
							var chaine =  JQ('#diameterContentField').text();
							var declancheur = JQ('#temperatureField').text();
							if(chaine != null){
								var chargement_complet = declancheur.indexOf(':');
								if(chargement_complet > -1){
//										chaine = chaine.split('(')[1].replace(')', '');
									planete_active.cases = chaine;
									planete_active.sav();
									JQ('#case_lune').text(chaine);
									clearInterval(recup_cases);
								}
							}				
						}
					, 1000);
				}
				if(planete_active.cases){
					var nbr_cases = planete_active.cases;
				}else{
					var nbr_cases = '(0/1)';
				}
				JQ('#planet h2').append('<div style="font-size:10px; position:absolute; right:5%; "><span id="case_lune">'+ nbr_cases +'</span></div>');
				recup_cases();
			}
		}
		//=========================================================================//
		empire.maj_liste_planete();
	}
	else if(localisation_page['page'] == 'resources'){	//Resources
		planete_active.maj('prod');
		planete_active.maj('batiment_ressource');
		document.getElementById('detail').addEventListener('DOMNodeInserted', insert_detail_construction, false);//Fonction qui modifie la valeur du cout
	
	}
	else if(localisation_page['page'] == 'station'){	//Installations
		planete_active.maj('batiment_installations');
		document.getElementById('detail').addEventListener('DOMNodeInserted', insert_detail_construction, false);//Fonction qui modifie la valeur du cout
	
	}
	else if(localisation_page['page'] == 'traderOverview'){		//Marchand
		function StartAuctionneer(e){
			if ((e.target.id == 'div_traderAuctioneer' && e.newValue == '' && !JQ('#div_traderAuctioneer').hasClass('enchere_director')) || (e.target.id == 'div_traderAuctioneer' && e.newValue == 'display: block;')) {
//				console.log('StartAuctionneer');
				//Ajout d'id et autre modif préparatoir
				JQ('#div_traderAuctioneer div.content div.left_box div.overlay').attr('id', 'overlayDirector');
				var couleur = JQ('#div_traderAuctioneer p.auction_info span:eq(0)').css('color');
				if(couleur == 'rgb(153, 204, 0)' || couleur == 'rgb(255, 165, 0)'){
					JQ('#div_traderAuctioneer p.auction_info').after('<div id="EnchereTimer" style="position: relative; top: -15px; display: block; margin-top: 15px;">Timer : 00:<span id="TimerTimeDirector" time="0" actif="non">00:00</span></div>');
				}				
				if(!JQ('#div_traderAuctioneer').hasClass('enchere_director')){JQ('#div_traderAuctioneer').addClass('enchere_director');}
				JQ('a.pay').attr('id', 'bouton_payer');
				JQ('#div_traderAuctioneer table.table_ressources tr').each(function(){ //Ajout d'id
					if(JQ('img', this).attr('src') != 'undefined'){
						if(JQ('img', this).attr('src') == 'http://gf3.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif'){
							JQ(this).attr('id', 'payement_metal');
							JQ('a.js_sliderMetalMax', this).attr('id', 'payement_metalMax');
							if(JQ('#select_pay_metal').size() == 0 && z){JQ('td:eq(0)', this).prepend('<input id="select_pay_metal" type="radio" name="ressource" value="1" style="position:absolute; top:10px;left:-10px;"/>');}
						}else if(JQ('img', this).attr('src') == 'http://gf2.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif'){
							JQ(this).attr('id', 'payement_cristal');
							JQ('a.js_sliderCrystalMax', this).attr('id', 'payement_cristalMax');
							if(JQ('#select_pay_cristal').size() == 0 && z){JQ('td:eq(0)', this).prepend('<input id="select_pay_cristal" type="radio" name="ressource" value="1" style="position:absolute; top:70px; left:-10px;"/>');}
						}else if(JQ('img', this).attr('src') == 'http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif'){
							JQ(this).attr('id', 'payement_deut');
							JQ('a.js_sliderDeuteriumMax', this).attr('id', 'payement_deutMax');
							if(JQ('#select_pay_deut').size() == 0 && z){JQ('td:eq(0)', this).prepend('<input id="select_pay_deut" type="radio" name="ressource" value="1" style="position:absolute; top:130px; left:-10px;"/>');}
						}	
						JQ('img', this).css({'position':'relative', 'left':'10px'});
					}
				});
				
				if(z){
				JQ('html').keydown(function(e){
					if(e.which == 13){					
						var type_pay = JQ(JQ('#div_traderAuctioneer table.table_ressources tr input:checked').parent().parent()).attr('id');
						if(type_pay != undefined){	
							click_me(type_pay +'Max');
							click_me('bouton_payer');
						}else{
							alert('Il vous faut selectionner le type de ressource pour l\'enchère');
						}
					}
				});
				}
//				console.log('Fin StartAuctionneer ');
//				document.documentElement.addEventListener('DOMAttrModified', enchere, false);
				if(config.com_priseur_ti){document.getElementById('overlayDirector').addEventListener('DOMAttrModified', TimerEnchere, false);}
			}
		}
		
		function TimerEnchere(e){
			if(e.attrName === 'style' && e.newValue == 'display: block;' && JQ('#div_traderAuctioneer p.auction_info span:eq(0)').css('color') == 'rgb(153, 204, 0)' || JQ('#div_traderAuctioneer p.auction_info span:eq(0)').css('color') == 'rgb(255, 165, 0)'){		
//console.log('Fase 1 : entrée vert ou orange '+ JQ('#TimerTimeDirector').attr('actif'));
				if(JQ('#TimerTimeDirector').size()){
					if(JQ('#TimerTimeDirector').text() != '00:00'){
//console.log('Fase 1.1 : remise a 0 du timer.');
						JQ('#TimerTimeDirector').text('00:00');
					}
					if(JQ('#EnchereTimer').css('display') == 'none'){
//console.log('Fase 1.2 : affichage timer.');
						JQ('#EnchereTimer').show();
					}
					
				}else if(!JQ('#EnchereTimer').size()){
//console.log('Fase 1.2 : Ajout timer');
					JQ('#div_traderAuctioneer p.auction_info').after('<div id="EnchereTimer" style="position:relative; top:-15px; ">Timer : 00:<span id="TimerTimeDirector" time="0" actif="non">00:00</span></div>');
				}
				
			}else if (e.attrName === 'style' && e.newValue == 'display: block;' && JQ('#TimerTimeDirector').size() && JQ('#div_traderAuctioneer p.auction_info span:eq(0)').css('color') == 'rgb(255, 0, 0)'  && JQ('#TimerTimeDirector').attr('actif') == 'non') {
//console.log('Fase 2 : Démmarage timer, actif : '+ JQ('#TimerTimeDirector').attr('actif'));
				JQ('#TimerTimeDirector').attr('actif', 'oui');
				//JQ('body').append('<div id="TimerDirector" time="0" style="display: none;"></div>');
				var t, mn, s;
				var IDTimerEncher = setInterval(function(){
						time = JQ('#TimerTimeDirector').attr('time');
						t = new Date();
						t.setTime(1000 * time);
						mn = t.getMinutes();
						if(mn < 10){mn = '0'+ mn}
						s =  t.getSeconds();
						if(s < 10){s = '0'+ s}
						JQ('#TimerTimeDirector').text(mn +':'+ s);
						time++;
						JQ('#TimerTimeDirector').attr('time', time);
					}, 1000);
					JQ('#TimerTimeDirector').attr('IDTimer', IDTimerEncher);
//console.log('ID setinterval = '+ IDTimerEncher);
			}
			else if(JQ('#div_traderAuctioneer p.auction_info span:eq(0)').css('color') == 'rgb(132, 132, 132)' && JQ('#TimerTimeDirector').attr('actif') == 'oui'){
//console.log('Fase 3 : Arret timer / ID timer = '+ JQ('#TimerTimeDirector').attr('IDTimer'));
				clearInterval(JQ('#TimerTimeDirector').attr('IDTimer'));
				//JQ('#TimerDirector').remove()
				JQ('#EnchereTimer').hide();
				JQ('#TimerTimeDirector').attr('actif', 'non');
				JQ('#TimerTimeDirector').attr('time', 0);
				JQ('#TimerTimeDirector').text('00:00');
				
			}else{
//console.log('Aucune action');
			}

		}
		
		document.getElementById('inhalt').addEventListener('DOMNodeInserted', StartAuctionneer, false);

	}
	else if(localisation_page['page'] == 'research'){	//Recherches
		planete_active.maj('recherche');
		document.getElementById('detail').addEventListener('DOMNodeInserted', insert_detail_construction, false);//Fonction qui modifie la valeur du cout
	
	}
	else if(localisation_page['page'] == 'shipyard'){	//Chantier spatial
		document.getElementById('planet').addEventListener('DOMNodeInserted', insert_detail_construction, false);//Fonction qui modifie la valeur du cout unitaire de la défance par le cout total en fonction du nombre entrer dans le champ prévu pour sa
	
	}
	else if(localisation_page['page'] == 'defense'){	//Défense
		planete_active.maj('defense');
		document.getElementById('planet').addEventListener('DOMNodeInserted', insert_detail_construction, false);//Fonction qui modifie la valeur du cout unitaire de la défance par le cout total en fonction du nombre entrer dans le champ prévu pour sa
	
	}
	else if(localisation_page['page'] == 'fleet1'){		//Flottes

	}
	else if(localisation_page['page'] == 'fleet2'){		//Flottes

	}
	else if(localisation_page['page'] == 'fleet3'){		//Flottes

	}
	else if(localisation_page['page'] == 'movement'){	//Flottes
		// ajout l'id de planete de depart dans la liste des mouvement de flote
		var array_coo_id = empire.array_coo_id();
		JQ('div.fleetDetails').attr('id_planete', function(){	
				var coo = JQ('span.originCoords a',this).text().replace('[', '').replace(']', '');
				return array_coo_id[coo];
			});
		//******************************************************************************//
		
		
	}
	else if(localisation_page['page'] == 'galaxy'){		//Galaxie

	}
	else if(localisation_page['page'] == 'empire'){		//Empire
		planete_active.maj('empire');
	}
	else if(localisation_page['page'] == 'alliance'){	//Alliance

	}
	else if(localisation_page['page'] == 'premium'){	//Casino d'officiers

	}
	else if(localisation_page['page'] == 'messages'){	//Messages 

	}
	else if(localisation_page['page'] == 'statistics'){	//Classement

	}
	else if(localisation_page['page'] == 'preferences'){//Options jeux
		JQ('#prefs .content').prepend('<div id="pref_director" style="margin: 0px 0px 0px 40px; padding-top: 15px; height: 40px;"><a id="icon_option_director" class="icon_option_director" href="javascript:void(0)" style="text-decoration: none; color : #FFF;"><img src="'+ icon_director +'" style="border: 1px #FFF solid; float: left;" /><p style="margin: 11px 35px;">'+ lang.option.option +' director</p></a></div>');
		JQ('#pref_director').click(function(){option();});
	}

// envoie de données au site http://www.projet-alternative.fr/
if(config.ALT_envoie){
	var dateActuel = new Date();
	var timestamp =  dateActuel.getTime();
	if(((((60*60)*24)*1000)+ parseInt(GM_getValue(lieu_sav +'ALT_time_maj', '0'))) < timestamp){
		var myfonction = function(retour){
			if((retour != '1') && ((id_joueur == 129292) || (id_joueur == 162099)) ){
				alert('Alerte erreur envoie ALT : '+ retour);
				GM_log(retour);
			}
			var dateActuel = new Date();
			var timestamp = dateActuel.getTime();
			GM_setValue(lieu_sav +'ALT_time_maj', timestamp + '');
		};
	
		var ALT = new httpRequete();
		ALT.data({	'ogame_player_id': id_joueur,
					'ogame_player_name': pseudo,
					'ogame_universe': url.split("/")[2],
					'ogame_alliance_id': id_aliance,
					'ogame_alliance_name': nom_aliance,
					'ogame_alliance_tag': tag_aliance,
					'ogame_language': langue,
					'ogame_universe_speed': vitesse_univers,
					'points_total': GM_getValue(lieu_sav +'point_total', '0'),
					'records': JQ.toJSON(empire.records())
				});
		ALT.url = 'http://www.projet-alternative.fr/OgameDirector/';
		ALT.envoie('index.php', myfonction);
		GM_log('Une mise à jours des infos à été envoyé au site http://www.projet-alternative.fr/');
	}
	else{
		var dateMaj = new Date(parseInt(GM_getValue(lieu_sav +'ALT_time_maj', '0')));
		var timestamp =  dateMaj.toLocaleString();
		GM_log('Dernière envoie des mise à jours au site http://www.projet-alternative.fr/ le '+ timestamp +', le prochaine mise à jour dans 24h');
	}
}


}












// @name           OGame Redesign: Easy Transport
// @version        1.6.5
if(((page == 'resources' ) || (page == 'station' ) || (page == 'research' ) || (page == 'fleet1' ) || (page == 'fleet2' ) || (page == 'fleet3' ) || (page == 'preferences' )) && (config.easy_transport) ){
(function() {
	var $ = window.jQuery;
	try {
		$ = unsafeWindow.jQuery;
	} catch(e) { }

    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
        this.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
        this.GM_deleteValue=function (key) {
        return delete localStorage[key];
        };
    }
    
    var setValue = function(name, value) {
        GM_setValue(name + '|' + uni, JSON.stringify(value));
    }
    
    var getValue = function(name, defaultValue) {
        var val = GM_getValue(name + '|' + uni);
        if(val == undefined) return defaultValue;
        return JSON.parse(val);
    }

    // get an element via its class name | thx @ marshen for the code
    function getElementsByClass (cName, domNode) {
        if (cName == undefined || cName.length == 0) return;
            if (domNode == undefined) domNode = document;
        
        if (domNode.getElementsByClassName)
            return domNode.getElementsByClassName(cName);
        
        // browser doesn't support getElementsByClassName
        cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
        var elements = domNode.getElementsByTagName('*');
        var res = new Array();
        for (var i = 0; i < elements.length; i++) {
            var className = " " + elements[i].className + " ";
            if (className.indexOf(cName) > -1) {
                res.push(elements[i]);
            }
        }

        return res;
    }

    // thanks to Antigame author Tarja for code
    function runScript(code) {
        if (!code || code=="") return;
		var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.innerHTML = code;

        document.body.appendChild(script);
        setTimeout(function(){script.parentNode.removeChild(script)}, 0);
    }

    // thanks to Antigame author Tarja for code
    function trigger(id, event) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, false);

        if (evt) document.getElementById(id).dispatchEvent(evt);
    }
	
	function page(str) {
		var strURL = document.URL;
		if (strURL.match(str))
			return true;
		else
			return false;
	}
		
	function inArray(obj,arr) {
		var res;
		
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == obj)
				res = i;
		}
		
		if(res >= 0) return res;
		else return -1;
	}
	
	function getTitle(node) {
		return (node && node.getAttribute) ? node.getAttribute('title') || $(node).data('tipped_restore_title') || '' : '';
	}

    document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
    var stylesheet = document.styleSheets[document.styleSheets.length-1];
	
	stylesheet.insertRule('#easyDiv { \
                          margin: 3px 0; \
                          margin-left: 15px; \
                          padding: 1px 0 0 5px; \
                          background-color: #13181D; \
                          border: 3px double black; \
                          width: 628px; \
                          font-size: 11px; \
						  float: left; \
						  position: relative; \
						  z-index: 100; \
                          }', 0);
						  
	stylesheet.insertRule('#easyDiv table { width: 600px; border-spacing: 3px 2px; }', 0);
	stylesheet.insertRule('#easyDiv td { text-align: center; }', 0);
	stylesheet.insertRule('#easyDiv td, #easyDiv th { border: 1px solid grey; padding: 5px 10px; }', 0);
	stylesheet.insertRule('#easyDiv th { font-weight: bold; }', 0);
	stylesheet.insertRule('#easyDiv a { text-decoration: none; }', 0);
						  
	stylesheet.insertRule('span.metal { color: #FF8800; }', 0);
	stylesheet.insertRule('span.crystal { color: #55B4DD; }', 0);
	stylesheet.insertRule('span.deuterium { color: #99ABCC; }', 0);
	stylesheet.insertRule('span.easyErr { color: #FF0000; }', 0);
	
	stylesheet.insertRule('div.easyMerge { \
						  width: 17px; \
						  height: 17px; \
						  display: block; \
						  float: right; \
						  background-image: url("http://gf1.geo.gfsrv.net/cdnfc/b325cc0170e184ee4c4417acd6a17a.png"); \
						  }', 0);
	stylesheet.insertRule('div.easyMergeBlue { background-position: -51px center; }', 0);
	stylesheet.insertRule('div.easyMergeGrey { background-position: -68px center; }', 0);
	stylesheet.insertRule('div.easyMergeRed { background-position: -17px center; }', 0);
	stylesheet.insertRule('div.easyMergeGreen { background-position: -34px center; }', 0);
	stylesheet.insertRule('.easyOptions { float: right; margin-right: 13px; margin-top: 3px; height: 17px; }', 0);
	stylesheet.insertRule('.easyOptions a:link, .easyOptions a:visited, .easyOptions a:hover, .easyOptions a:active { color: rgb(255,255,255); }', 0);
	stylesheet.insertRule('span.easyOptSpan { float: right; padding: 0px 5px; }', 0);
	stylesheet.insertRule('.easyTooltip { text-align: center; margin: 2px; }', 0);
	
	stylesheet.insertRule('.easyLinkDiv { width: auto; float: left; position: relative; top: -8px; left: 3px; }', 0);
	
	stylesheet.insertRule('.easyLink a:link, .easyLink a:visited, .easyLink a:hover, .easyLink a:active { color: rgb(255,255,255); text-decoration: none; }', 0);
	stylesheet.insertRule('.easyLink { margin-left: 0px; padding-top: 4px; }', 0);
	
	stylesheet.insertRule('.easyTotal { width: auto; float: left; margin-left: 17px; margin-top: 3px; margin-bottom: 5px; }', 0);
	
	stylesheet.insertRule('.easyHidden { display: none; }', 0);
	

    var metaUniverse = document.getElementsByName('ogame-universe')[0].content;
	var metaCoords = document.getElementsByName('ogame-planet-coordinates')[0].content;
	var metaPlanetType = document.getElementsByName('ogame-planet-type')[0].content;
	var metaLang = document.getElementsByName('ogame-language')[0].content;
	var metaOGameVer = document.getElementsByName('ogame-version');
    var uniSpeed = parseInt(document.getElementsByName('ogame-universe-speed').item(0).content);
	
	var oldVersion = false;
	if (metaOGameVer && (metaOGameVer.length > 0)) {
		var versionParts = metaOGameVer[0].content.split ('.');
		if (parseInt(versionParts[0]) < 5)
			oldVersion = true;
	} else
		oldVersion = true;
	
    var uni = metaUniverse.split('.')[0] + metaUniverse.split('.')[2];

	var isMoon = false;
	if(metaPlanetType == 'moon')
		isMoon = true;


	/* User variables, change if you wish */

	// speed factor of the flight; 1 = 100%, 0.5 = 50% etc.
	var speedFactor = 1;

	/* End of user variables */

	//setValue('firstRun150712', true);
	if(getValue('firstRun150712', true)) {
		setValue('transportBuild', []);
		setValue('transportLevel', []);
		setValue('transportMet', []);
		setValue('transportCrys', []);
		setValue('transportDeut', []);
		setValue('transportGala', []);
		setValue('transportSolSys', []);
		setValue('transportPos', []);
		setValue('transportMoon', []);
		setValue('transportDetails', []);
		setValue('MergeIDs', []);
		setValue('easyTransport', false);
		setValue('firstRun150712', false);
	}
	
	var strBuild = '';
	var strLevel = '';
	var strGala = '';
	var strSolSys = '';
	var strPos = '';
	var transportBuild = getValue('transportBuild');
	var transportLevel = getValue('transportLevel');
	var transportMet = getValue('transportMet');
	var transportCrys = getValue('transportCrys');
	var transportDeut = getValue('transportDeut');
	var transportGala = getValue('transportGala');
	var transportSolSys = getValue('transportSolSys');
	var transportPos = getValue('transportPos');
	var transportMoon = getValue('transportMoon');
	var transportDetails = getValue('transportDetails');
	var MergeIDs = getValue('MergeIDs');
	var CombDrive = parseInt(getValue('CombDrive', 0));
	var ImpDrive = parseInt(getValue('ImpDrive', 0));
	var easyTransport = getValue('easyTransport', false);
	var easyID = getValue('easyID');

	initLang();

	function initLang() {
		langTransport = 'Transport';
		langAll = 'Complet';
		langMissing = 'Manquant';
		langDelete = 'Supprimer';
		//langTransportLink = strBuild + ' ' + strLevel + ' to [' + strGala + ':' + strSolSys + ':' + strPos + ']';
		langNotEnoughRes = 'Pas assez de ressources !';
		langNotEnoughShips = 'Pas assez de vaisseaux !';
		langPartDelivery = 'Livraison partielle possible.';
		langCancel = 'Annuler';
		//langMoon = 'Moon';
		langStillMissing = 'Il manque encore';
		langSC = 'PTs';
		langLC = 'GTs';
		langNeeded = 'Besoins';
		langTotal = 'Total';
		langMerge = 'Fusionner';
		//langCancel = 'cancel';
		langApply = 'Appliquer';
		langPackage = 'Transport package';
		langContains = 'Contient';
		langMet = 'Metal';
		langCrys = 'Crystal';
		langDeut = 'Deuterium';
	
		if(metaLang == 'de') {
			langTransport = 'Transport';
			langAll = 'alle';
			langMissing = 'fehlende';
			langDelete = 'löschen';
			//langTransportLink = strBuild + ' ' + strLevel + ' nach [' + strGala + ':' + strSolSys + ':' + strPos + ']';
			langNotEnoughRes = 'Nicht genügend Rohstoffe!';
			langNotEnoughShips = 'Nicht genügend Schiffe!';
			langPartDelivery = 'Teillieferung möglich.';
			langCancel = 'Abbrechen';
			//langMoon = 'Mond';
			langStillMissing = 'Noch fehlend';
			langSC = 'KTs';
			langLC = 'GTs';
			langNeeded = 'Benötigt';
			langTotal = 'Gesamt';
			langMerge = 'Fusion';
			langCancel = 'abbrechen';
			langApply = 'anwenden';
			langPackage = 'Transport-Packet';
			langContains = 'Beinhaltet';
			langMet = 'Metall';
			langCrys = 'Kristall';
			langDeut = 'Deuterium';
		}
	}
	
	function removeSeparator(str) {
		if (!str) return null;
		return parseInt(str.replace(/\D/g, ''));
	}
	
	function formatNumber(num) {
		var separator = '.';
		var res = '';
		num = ''+num;

		while(num.length > 3) {
			res = separator + num.slice(-3) + res;
			num = num.substr(0, num.length - 3);
		}

		res = num + res;
		return res;
	}
	
	function sumArray(array) {
		var res = 0;
		for(var i = 0; i < array.length; i++)
			res = res + array[i];
			
		return res;
	}

	function getBuildingInfo() {
		var res = new Array();

		res[0] = document.getElementById('content').innerHTML;
		res[0] = res[0].split('<h2>')[1];
		res[0] = res[0].split('<')[0];
    
		res[1] = getElementsByClass('level', document.getElementById('content'))[0].innerHTML;
		res[1] = parseInt(res[1].match(/\d+/)[0]) + 1;


		var costs = document.getElementById('costs');
		costs = getElementsByClass('metal', costs);

		for(var i = 0; i < costs.length; i++) {
			var resType = costs[i].innerHTML;
			resType = resType.match(/geo.gfsrv.net\/.+\/(.+).gif/);
			resType = RegExp.$1;
        
			var resValue = getTitle(costs[i]);
			if(!oldVersion) resValue = resValue.substring(0, resValue.indexOf(' '));
			else resValue = resValue.substring(1, resValue.indexOf(' '));
			resValue = removeSeparator(resValue);
			resValue = (resValue > 0) ? resValue : 0;

			if(resType == 'ccdb3fc0cb8f7b4fc8633f5f5eaa86') res[2] = resValue;
			if(resType == '452d7fd11d754e0f09ec2b2350e063') res[3] = resValue;
			if(resType == 'e37d45b77518ddf8bbccd5e772a395') res[4] = resValue;
		}

		for(var i = 0; i < 3; i++)
			res[i+2] = (res[i+2] > 0) ? res[i+2] : 0;

		return res;
	}

	function getPlanetInfo(ress) {
		var res = getTitle(document.getElementById(ress + '_box'));
		
		if(!oldVersion) {
			res = res.split('">')[2];
			res = res.split('<')[0];
		} else {
			res = res.split('<br>')[0];
			res = res.replace('</span>', '');
			res = res.substring(res.lastIndexOf('>')+1);
		}
		
		res = removeSeparator(res);
	
		return parseInt(res);
	}

	function getDistance(Gala, SolSys, Pos, id) {
		if (Gala == transportGala[id] && SolSys == transportSolSys[id] && Pos == transportPos[id]) 
			res = 5;
		else if (Gala == transportGala[id] && SolSys == transportSolSys[id]) 
			res = Math.abs(Pos - transportPos[id]) * 5 + 1000;
		else if (Gala == transportGala[id])
			res = Math.abs(SolSys - transportSolSys[id]) * 95 + 2700;
		else
			res = Math.abs(Gala - transportGala[id]) * 20000;

		return parseInt(res);
	}

	function getFlightTime(dist, velo) {
		var res = ((3500 / speedFactor) * Math.pow((dist * 10 / velo), 0.5) + 10) / uniSpeed;
		return parseInt(res);
	}

	function getShipInfo(info, ship) {
		if(ship == 'sc') {
			if(info == 'id') res = '202';
			if(info == 'velocity') {
				if(ImpDrive >= 5) res = 10000 + 10000 * 0.2 * ImpDrive;
				else res = 5000 + 5000 * 0.1 * CombDrive;
			}
			if(info == 'baseconsumption') {
				if(ImpDrive >= 5) res = 20;
				else res = 10;
			}
			if(info == 'capacity') res = 5000;
		} else if(ship == 'lc') { 
			if(info == 'id') res = '203';
			if(info == 'velocity') res = 7500 + 7500 * 0.1 * CombDrive;
			if(info == 'capacity') res = 25000;
			if(info == 'baseconsumption') res = 50;
		}

		return res;
	}

	function getConsumption(fTime, dist, velo, bCons) {
		var value = 35000 / (fTime * uniSpeed - 10) * Math.pow((dist * 10 / velo), 0.5);
		var res = bCons * dist / 35000 * Math.pow((value / 10 + 1), 2);

		return parseInt(res);
	}

	function getNeededShipCount(id, ship) {
		var res = {};
		var startGala = metaCoords.split(':')[0];
		var startSolSys = metaCoords.split(':')[1];
		var startPos = metaCoords.split(':')[2];

		var Velocity = getShipInfo('velocity', ship);
		var Distance = getDistance(startGala, startSolSys, startPos, id);
		var flightTime = getFlightTime(Distance, Velocity);
		var baseConsumption = getShipInfo('baseconsumption', ship);
		var Capacity = getShipInfo('capacity', ship);

		var Consumption = getConsumption(flightTime, Distance, Velocity, baseConsumption);

		res.total = Math.ceil((transportMet[id] + transportCrys[id] + transportDeut[id]) / (Capacity - Consumption));
		
		var Metal = getPlanetInfo('metal');
		var Crystal = getPlanetInfo('crystal');
		var Deuterium = getPlanetInfo('deuterium');
		
		Metal = (Metal > transportMet[id]) ? transportMet[id] : Metal;
		Crystal = (Crystal > transportCrys[id]) ? transportCrys[id] : Crystal;
		Deuterium = (Deuterium > transportDeut[id]) ? transportDeut[id] : Deuterium;
		res.possible = Math.ceil((Metal + Crystal + Deuterium) / (Capacity - Consumption));

		return res;
	}

	function getShipCount(ship) {
		var shipID = getShipInfo('id', ship);
		var res = document.getElementById('button' + shipID);
		res = res.innerHTML;
		res = res.substring(res.indexOf('(')+1, res.indexOf(')'));

		return removeSeparator(res);
	}

	function addToQueue(bld, lvl, met, cry, deu, gal, sol, pos, moon, det) {
		var i = transportBuild.length;
		transportBuild[i] = bld;
		transportLevel[i] = lvl;
		transportMet[i] = met;
		transportCrys[i] = cry;
		transportDeut[i] = deu;
		transportGala[i] = gal;
		transportSolSys[i] = sol;
		transportPos[i] = pos;
		transportMoon[i] = moon; 
		transportDetails[i] = det;
    
		setValue('transportBuild', transportBuild);
		setValue('transportLevel', transportLevel);
		setValue('transportMet', transportMet);
		setValue('transportCrys', transportCrys);
		setValue('transportDeut', transportDeut);
		setValue('transportGala', transportGala);
		setValue('transportSolSys', transportSolSys);
		setValue('transportPos', transportPos);
		setValue('transportMoon', transportMoon);
		setValue('transportDetails', transportDetails);
	}

	function setResources(e) {
		var buildingInfo = getBuildingInfo();
		Build = buildingInfo[0];
		Level = buildingInfo[1];
		
		var Met, Crys, Deut;
		if(e.target.id == 'all_res') {
			Met = buildingInfo[2] ? buildingInfo[2] : 0;
			Crys = buildingInfo[3] ? buildingInfo[3] : 0;
			Deut = buildingInfo[4] ? buildingInfo[4] : 0;
		} else if(e.target.id == 'missing_res') {
			var Metal = getPlanetInfo('metal');
			var Crystal = getPlanetInfo('crystal');
			var Deuterium = getPlanetInfo('deuterium');
			Met = ((buildingInfo[2]-Metal) > 0) ? (buildingInfo[2]-Metal) : 0;
			Crys = ((buildingInfo[3]-Crystal) > 0) ? (buildingInfo[3]-Crystal) : 0;
			Deut = ((buildingInfo[4]-Deuterium) > 0) ? (buildingInfo[4]-Deuterium) : 0;
		}
		
		Gala = metaCoords.split(':')[0];
		SolSys = metaCoords.split(':')[1];
		Pos = metaCoords.split(':')[2];
    
		addToQueue(Build, Level, Met, Crys, Deut, Gala, SolSys, Pos, isMoon, '');
		
		if(transportBuild.length == 1) evt = '';
		else evt = 'change';
		showLink(evt);
	}

	function insertText(e) {
		if(e.target.id != 'content') return;
		
		stylesheet.insertRule('#costs ul#resources li { width: 65px; }', 0);

		var parentNode = document.getElementById('costs');
		
		var easyLinks = document.createElement('div');
		easyLinks.className = 'easyLinkDiv';
		easyLinks.innerHTML = '<p style="float: left; color: rgb(122,168,54); margin-left: 0px; font-weight: bold;">Transport:</p><p style="clear: both;" class="easyLink"><a href="javascript:void(0);" id="all_res">' + langAll + '</a> | <a href="javascript:void(0);" id="missing_res">' + langMissing + '</a></p></div>';
		parentNode.appendChild(easyLinks);

		document.getElementById('all_res').addEventListener('click', setResources, false);
		document.getElementById('missing_res').addEventListener('click', setResources, false);
	}

	function deleteTransport(e, ID) {
		var id;
		var doDelete = false;
		
		if(e != '') {
			if(e.target.id == '') {
				id = easyID;
				transportMet[id] = transportMet[id] - getValue('tempMet');
				transportCrys[id] = transportCrys[id] - getValue('tempCrys');
				transportDeut[id] = transportDeut[id] - getValue('tempDeut');
			} else 
				id = e.target.id.split('delete_transport')[1];
				
			if(transportMet[id] == 0 && transportCrys[id] == 0 && transportDeut[id] == 0)
				doDelete = true;
				
			if(e.target.id.match(/delete_transport/))
				doDelete = true;
		} else {
			id = ID;
			doDelete = true;
		}

		if(doDelete) {
			transportBuild.splice(id, 1);
			transportLevel.splice(id, 1);
			transportMet.splice(id, 1);
			transportCrys.splice(id, 1);
			transportDeut.splice(id, 1);
			transportGala.splice(id, 1);
			transportSolSys.splice(id, 1);
			transportPos.splice(id, 1);
			transportMoon.splice(id, 1);
			transportDetails.splice(id, 1);
		}
    
		setValue('transportBuild', transportBuild);
		setValue('transportLevel', transportLevel);
		setValue('transportMet', transportMet);
		setValue('transportCrys', transportCrys);
		setValue('transportDeut', transportDeut);
		setValue('transportGala', transportGala);
		setValue('transportSolSys', transportSolSys);
		setValue('transportPos', transportPos);
		setValue('transportMoon', transportMoon);
		setValue('transportDetails', transportDetails);
		setValue('easyTransport', false);

		showLink('change');
	}

	function fillIn(e) {
		if(page('fleet1')) {
			var id = e.target.id.match(/\d+/);
			setValue('easyID', id);
			
			if(e.target.id.match(/easytrsc/)) ship = 'sc';
			else if(e.target.id.match(/easytrlc/)) ship = 'lc';
			var shipID = getShipInfo('id', ship);
			//var Capacity = getShipInfo('capacity', ship);
			var Count = getNeededShipCount(id, ship).possible;
			
			/* if(Count > getShipCount(ship)) {
				var restCount = (transportMet[id] + transportCrys[id] + transportDeut[id]) - (getShipCount(ship) * Capacity);
			} */

			setValue('easyTransport', true);
			
			var arrayShipIDs = [204, 205, 206, 207, 215, 211, 213, 214, 202, 203, 208, 209, 210];
			for(var i = 0; i < arrayShipIDs.length; i++)
				document.getElementById('ship_' + arrayShipIDs[i]).value = '';
				
			document.getElementById('ship_' + shipID).value = Count;
			
			trigger('ship_' + shipID, 'change');
		}
	}
	
	function applyMerge(e) {
		MergeIDs = getValue('MergeIDs');
		var sumID = MergeIDs[0];
		MergeIDs.sort(function(a,b){return a-b;});
		
		if(sumID != undefined) {
			var sumMet = 0;
			var sumCrys = 0;
			var sumDeut = 0;
			var sumDetails = '<b>' + langContains + ':</b><br>';
		
			for(var i = 0; i < MergeIDs.length; i++) {
				sumMet += transportMet[MergeIDs[i]];
				sumCrys += transportCrys[MergeIDs[i]];
				sumDeut += transportDeut[MergeIDs[i]];
				sumDetails += transportBuild[MergeIDs[i]] + ' ' + transportLevel[MergeIDs[i]] + '<br>';
			}
			sumDetails += '<br>';
		
			addToQueue(langPackage, ' ', sumMet, sumCrys, sumDeut, transportGala[sumID], transportSolSys[sumID], transportPos[sumID], transportMoon[sumID], sumDetails);
		
			for(var i = MergeIDs.length - 1; i > -1; i--) {
				deleteTransport('', MergeIDs[i]);
			}
		}
		
		showLink('change');
	}
	
	function cancelMerge(e) {
		setValue('MergeIDs', []);
		showLink('change');
	}
	
	function markForMerge(e) {
		var id = e.target.id.match(/\d+/);
		MergeIDs = getValue('MergeIDs');
		var arrayPt = inArray(String(id), MergeIDs);
		
		if(arrayPt != -1) {
			MergeIDs.splice(arrayPt, 1);
			setValue('MergeIDs', MergeIDs);
			document.getElementById('easyMergeCell' + id).className = 'easyMerge easyMergeRed';
		} else {
			MergeIDs[MergeIDs.length] = id;
			setValue('MergeIDs', MergeIDs);
			document.getElementById('easyMergeCell' + id).className = 'easyMerge easyMergeGreen';
		}
		
		if(getValue('MergeIDs') != '') {
			for(var i = 0; i < transportBuild.length; i++) {
				var coords1 = transportGala[i] + ':' + transportSolSys[i] + ':' + transportPos[i] + ' ' + transportMoon[i];
				var coords2 = transportGala[id] + ':' + transportSolSys[id] + ':' + transportPos[id] + ' ' + transportMoon[id];
		
				if(coords1 != coords2) {
					document.getElementById('easyTblDel' + i).innerHTML = '<div id="easyMergeCell' + i + '" class="easyMerge easyMergeGrey" style="float: none; margin-left: auto; margin-right: auto;"></div></a>';
				}
			}
		} else {
			showMergeIcons();
		}
	}
	
	function showMergeIcons(e) {	
		setValue('MergeIDs', []);
		document.getElementById('easyOptions').innerHTML = '<a href="javascript:void(0);" id="easyMergeApply">\n' +
														   '	<span class="easyOptSpan">' + langApply + '</span>\n' +
														   '	<div class="easyMerge easyMergeGreen"></div>\n' +
														   '</a>\n' +
														   '<a href="javascript:void(0);" id="easyMergeCancel">\n' +
														   '	<span class="easyOptSpan">' + langCancel + '</span>\n' +
														   '	<div class="easyMerge easyMergeRed"></div>\n' +
														   '</a>\n';
														   
		document.getElementById('easyMergeApply').addEventListener('click', applyMerge, false);
		document.getElementById('easyMergeCancel').addEventListener('click', cancelMerge, false);
		
		for(var i = 0; i < transportBuild.length; i++) {
			document.getElementById('easyTblDel' + i).innerHTML = '<a href="javascript:void(0);" id="easyMergeLink' + i + '"><div id="easyMergeCell' + i + '" class="easyMerge easyMergeRed" style="float: none; margin-left: auto; margin-right: auto;"></div></a>';
			document.getElementById('easyTblCoords' + i).innerHTML += '';
			
			document.getElementById('easyMergeLink' + i).addEventListener('click', markForMerge, false);
		}
	}
	
	function toggleTopBot(e) {
		if(getValue('prefTopBot', 'top') == 'top') {
			setValue('prefTopBot', 'bot');
		} else {
			setValue('prefTopBot', 'top');
		}
		
		showLink('toggleTopBot');
	}
	
	function toggleMinMax(e) {
		if(getValue('prefMinMax', 'max') == 'max') {
			setValue('prefMinMax', 'min');
		} else {
			setValue('prefMinMax', 'max');
		}
		
		showLink('change');
	}

	function showLink(evt) {	
		if(page('fleet1') && !getElementsByClass('allornonewrap')[0]) return;
		
		if(getValue('prefTopBot', 'top') == 'bot')		
			var parentNode = document.getElementById('inhalt');
		else
			var parentNode = document.getElementById('contentWrapper');
		
		if(evt == 'toggleTopBot') {
			if(getValue('prefTopBot', 'top') == 'bot')
				document.getElementById('contentWrapper').removeChild(document.getElementById('easyDiv'));
			else
				document.getElementById('inhalt').removeChild(document.getElementById('easyDiv'));
		}
		
		if(evt == 'change') parentNode.removeChild(document.getElementById('easyDiv'));
		
		if(transportBuild.length > 0) {
			var transportLinkCont = document.createElement('div');
			transportLinkCont.id = 'easyDiv';
			transportLinkCont.align = 'center';
			transportLinkCont.innerHTML = '';

			var strMoon = '';

			var transportLink = document.createElement('span');
			transportLink.id = 'transportLink';
			transportLink.innerHTML = '';

			var Metal = getPlanetInfo('metal');
			var Crystal = getPlanetInfo('crystal');
			var Deut = getPlanetInfo('deuterium');

			var easyTbl = '';
			easyTbl = '<table id="easyTbl" align="center">\n';
			//easyTbl += '<tr><td colspan="5" style="align: right;"><div class="easyMerge"></div>test</td></tr>\n';
			for(var i = 0; i < transportBuild.length; i++) {
				strBuild = transportBuild[i];
				strLevel = transportLevel[i];
				strGala = transportGala[i];
				strSolSys = transportSolSys[i];
				strPos = transportPos[i];
			
				if(transportMoon[i] == true) strMoon = 'M';
				else strMoon = '';
			
				var strError = '';
				var Metal = getPlanetInfo('metal');
				var Crystal = getPlanetInfo('crystal');
				var Deuterium = getPlanetInfo('deuterium');
			
				if(Metal < transportMet[i] || Crystal < transportCrys[i] || Deuterium < transportDeut[i])
					strError += '<br><br><span class=easyErr>' + langNotEnoughRes + '</span>';
				
				if(strError != '') 
					strError += '<br><br><span class=easyErr>' + langPartDelivery + '</span>';
					
				transportDetails[i] = (transportDetails[i] != undefined) ? transportDetails[i] : '';

				if(!oldVersion) {
					easyTbl += '	<tr>\n';
					easyTbl += '		<th><a class="tooltipBottom" title="<div class=easyTooltip>' + transportDetails[i] + '<b>' + langStillMissing + ':</b><br>' + langMet + ': <span class=metal>' + formatNumber(transportMet[i]) + '</span><br>' + langCrys + ': <span class=crystal>' + formatNumber(transportCrys[i]) + '</span><br>' + langDeut + ': <span class=deuterium>' + formatNumber(transportDeut[i]) + '</span>' + strError + '</div>" href="javascript:void(0);" id="easytransport' + i + '">' + strBuild + ' ' + strLevel + '</a></td>\n';
					easyTbl += '		<td id="easyTblCoords' + i + '">[' + strGala + ':' + strSolSys + ':' + strPos + '] ' + strMoon + '</td>\n';
					easyTbl += '		<td><a class="tooltipBottom" title="' + getNeededShipCount(i, 'sc').total + ' (' + getNeededShipCount(i, 'sc').possible + ')" href="javascript:void(0);" id="easytrsc' + i + '">' + langSC + '</a></td>\n';
					easyTbl += '		<td><a class="tooltipBottom" title="' + getNeededShipCount(i, 'lc').total + ' (' + getNeededShipCount(i, 'lc').possible + ')" href="javascript:void(0);" id="easytrlc' + i + '">' + langLC + '</a></td>\n';
					easyTbl += '		<td id="easyTblDel' + i + '"><a href="javascript:void(0);" id="delete_transport' + i + '">' + langDelete + '</a></td>\n';
					easyTbl += '	</tr>\n';
				} else {		
					easyTbl += '	<tr>\n';
					easyTbl += '		<th><a class="tipsStandard" title="|' + transportDetails[i] + langStillMissing + ':<br><br>' + langMet + ': <span class=metal>' + formatNumber(transportMet[i]) + '</span><br>' + langCrys + ': <span class=crystal>' + formatNumber(transportCrys[i]) + '</span><br>' + langDeut + ': <span class=deuterium>' + formatNumber(transportDeut[i]) + '</span>' + strError + '" href="javascript:void(0);" id="easytransport' + i + '">' + strBuild + ' ' + strLevel + '</a></td>\n';
					easyTbl += '		<td id="easyTblCoords' + i + '">[' + strGala + ':' + strSolSys + ':' + strPos + '] ' + strMoon + '</td>\n';
					easyTbl += '		<td><a class="tipsStandard" title="|' + langNeeded + ': ' + getNeededShipCount(i, 'sc').total + ' (' + getNeededShipCount(i, 'sc').possible + ')" href="javascript:void(0);" id="easytrsc' + i + '">' + langSC + '</a></td>\n';
					easyTbl += '		<td><a class="tipsStandard" title="|' + langNeeded + ': ' + getNeededShipCount(i, 'lc').total + ' (' + getNeededShipCount(i, 'lc').possible + ')" href="javascript:void(0);" id="easytrlc' + i + '">' + langLC + '</a></td>\n';
					easyTbl += '		<td id="easyTblDel' + i + '"><a href="javascript:void(0);" id="delete_transport' + i + '">' + langDelete + '</a></td>\n';
					easyTbl += '	</tr>\n';
				}
			}
			easyTbl += '</table>\n';
			easyTbl += '<div class="easyTotal">' + langTotal + ': <span class="metal">' + formatNumber(sumArray(transportMet)) + ' ' + langMet + '</span>, <span class="crystal">' + formatNumber(sumArray(transportCrys)) + ' ' + langCrys + '</span>, <span class="deuterium">' + formatNumber(sumArray(transportDeut)) + ' ' + langDeut + '</span></div>';
			transportLink.innerHTML += easyTbl;
			
			var strTopBot;
			if(getValue('prefTopBot', 'top') == 'top')
				strTopBot = 'En bas';
			else
				strTopBot = 'En haut';
				
			var strMinMax;
			if(getValue('prefMinMax', 'max') == 'max')
				strMinMax = 'Masquer';
			else
				strMinMax = 'Afficher';
			
			var easyOpts = '';
			easyOpts += '<div id="easyOptions" class="easyOptions">\n' +
						'	<span class="easyOptSpan"><a href="javascript:void(0);" id="easyMinMax">' + strMinMax + '</a></span>\n' +
						'	<span class="easyOptSpan">|</span>\n' +
						'	<span class="easyOptSpan"><a href="javascript:void(0);" id="easyTopBot">' + strTopBot + '</a></span>\n';						
			if(getValue('prefMinMax', 'max') == 'max') easyOpts += '	<span class="easyOptSpan">|</span>\n';
			easyOpts += '	<a href="javascript:void(0);" id="easyMergeLink" class="easyLink">\n' +
						'		<span class="easyOptSpan">' + langMerge + '</span>\n' +
						'		<div class="easyMerge easyMergeBlue"></div>\n' +
						'	</a>\n' +
						'</div>';
			
			transportLink.innerHTML += easyOpts;
									  
		
			transportLinkCont.appendChild(transportLink);
			
			if(getValue('prefTopBot', 'top') == 'bot')
				parentNode.appendChild(transportLinkCont);
			else
				parentNode.insertBefore(transportLinkCont, document.getElementById('inhalt'));
				
			if(getValue('prefMinMax', 'max') == 'min') {
				document.getElementById('easyTbl').className = 'easyHidden';
				document.getElementById('easyMergeLink').className = 'easyHidden';
			}
    
			for(var i = 0; i < transportBuild.length; i++) {
				document.getElementById('delete_transport' + i).addEventListener('click', deleteTransport, false);
				document.getElementById('easytrsc' + i).addEventListener('click', fillIn, false);
				document.getElementById('easytrlc' + i).addEventListener('click', fillIn, false);
			}
			
			document.getElementById('easyMergeLink').addEventListener('click', showMergeIcons, false);
			document.getElementById('easyTopBot').addEventListener('click', toggleTopBot, false);
			document.getElementById('easyMinMax').addEventListener('click', toggleMinMax, false);
		}
	}

	if(page('resources') || page('station') || page('research'))
		document.getElementById('planet').addEventListener('DOMNodeInserted', insertText, false);

	if(page('fleet1') || page('resources') || page('station') || page('research')) {
		setValue('easyTransport', false);
		if(transportBuild.length > 0) {
			showLink('');
		}
	}

	if(page('fleet2') && easyTransport) {
		document.getElementById('galaxy').value = transportGala[easyID];
		document.getElementById('system').value = transportSolSys[easyID];
		document.getElementById('position').value = transportPos[easyID];

		if(transportMoon[easyID]) trigger('mbutton', 'click');
		else trigger('pbutton', 'click');

		trigger('galaxy', 'change');
	}

	if(page('fleet3') && easyTransport) {
		document.getElementById('metal').value = transportMet[easyID];
		document.getElementById('crystal').value = transportCrys[easyID];
		document.getElementById('deuterium').value = transportDeut[easyID];

		trigger('missionButton3', 'click');

		runScript("setTimeout(function(){checkRessourceByType('metal');checkRessourceByType('crystal');checkRessourceByType('deuterium');updateVariables();},0)");
		
		window.setTimeout(function() { setValue('tempMet', removeSeparator(document.getElementById('metal').value)) }, 100);
		window.setTimeout(function() { setValue('tempCrys', removeSeparator(document.getElementById('crystal').value)) }, 100);
		window.setTimeout(function() { setValue('tempDeut', removeSeparator(document.getElementById('deuterium').value)) }, 100);
		
		document.getElementById('start').addEventListener('click', deleteTransport, false);
	}

	if(page('research')) {
		var CombDrive = document.getElementById('inhalt').innerHTML.split('details115')[1];
		CombDrive = CombDrive.match(/\d+/)[0];
		setValue('CombDrive', CombDrive);

		var ImpDrive = document.getElementById('inhalt').innerHTML.split('details117')[1];
		ImpDrive = ImpDrive.match(/\d+/)[0];
		setValue('ImpDrive', ImpDrive);
	}
}) ()


}
