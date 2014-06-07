var GMSU_meta_53683 = <><![CDATA[
// ==UserScript==
	// @name          Autoredirecteur
	// @namespace     http://userscripts.org/users/fullinterest
	// @author        full_interest
	// @source        http://userscripts.org/scripts/show/53683
	// @identifier		http://userscripts.org/scripts/source/53683.user.js
	// @description	  Redirection auto pour sites (3.4.8)
	// @version       3.4.8
// @require        http://userscripts.org/scripts/source/51513.user.js
// 51513 -> updatechecker
// @require        http://userscripts.org/scripts/source/55848.user.js
// 55848 -> Fonctions diverses (full_interest)
	// @include       http://www.poke-star.net/*
	// @include       http://fullinterest.site.voila.fr/*
	// @include       http://site.voila.fr/fullinterest/*
	// @include       http://www.jeuxvideo.com/*
	// @include       http://www.zebest-3000.com/*
	// @include       http://www.charme-du-jour.net/*
	// @include       http://www.allocine.fr/*
	// @include       http://free-mobile-games.mobilclub.org/*
	// @include       http://www.wallpaperez.info/*
	// @include       http://*startrekonline.com/splash?redir=*
	// @include       http://www.hebus.com/*
	// @include       http://*.google.*/images?*
	// @include       http://images.google.*/search*
	// @include       *.lemondedembr.com/pubs*/pubs*
	// @exclude       http://images.google.*/imgres*
	// @exclude       *.jpg
	// @exclude       *.png
// @uso:script     53683
// ==/UserScript==
]]></>;

if(location.href==window.parent.window.location){ //	Empèche l'éxécution du script sur les iframes et assimilés

//			index des redirections			

autoredir_exe_data={
	myURL : location.href,
	downloadlinker : function (URL) {
		if (typeof URL=="string") {return autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].download.link(URL)+"<br>"+autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].downloadinfo+"<br>"
	}},

//				Début fonction analyse de URL			
URLredirect : function(URL,type,returnName,obj_item) {
	var Num;
	for (name in autoredirecteurindex) {
	if (autoredirecteurindex.hasOwnProperty(name) === true){
	if(autoredirecteurindex[name].sourcepage && autoredirecteurindex[name].sourcepage.test(autoredir_exe_data.myURL)===false){return false};
	if (autoredirecteurindex[name].URL && autoredirecteurindex[name].URL.test(URL) == true) {
	if (VarCtrl.type_de(autoredirecteurindex[name].excepwords)=="array"){
	var lowURL=URL.toLowerCase();
	for (Num in autoredirecteurindex[name].excepwords) {
	if (lowURL.indexOf(autoredirecteurindex[name].excepwords[Num])!=-1){
	return false;}}}
	switch (VarCtrl.type_de(type)){
	case "array" :var type_test;for (Num in type) {if (autoredirecteurindex[name].type==type[Num]) {type_test=true;break;}}		break;
	case "number" :if(autoredirecteurindex[name].type === type || type ===-1) {type_test=true};		break;
	}
	if(returnName === true && type_test==true) {return name};
	if(autoredirecteurindex[name].applicable == false || type_test!==true){return false};
	if(typeof autoredirecteurindex[name].sourcepage=="undefined"){return autoredir_exe_data.URL_modifier(URL,name,obj_item)};
	}}}
	return false
},

URL_modifier : function(URL,name,obj_item){
		var addprotocole = function (URL) {return ((/(ftp|http|https)(?:\:\/\/.*)$/i.test(URL) == false) ? "http://":"") + URL + ((typeof autoredirecteurindex[name].after == "string")?autoredirecteurindex[name].after:"")}, gotoURL = new String(URL);

		if(typeof autoredirecteurindex[name].replace != "undefined") {
		switch (typeof autoredirecteurindex[name].replace) {
		case "function" : var functionReturn = autoredirecteurindex[name].replace(gotoURL);gotoURL = (typeof functionReturn=="string")?functionReturn:gotoURL;break;
		case "object" : gotoURL = gotoURL.replace(autoredirecteurindex[name].replace.de,autoredirecteurindex[name].replace.en);break;
		}
		return addprotocole(gotoURL);
	}
	if (typeof autoredirecteurindex[name].all == "string") {return addprotocole(autoredirecteurindex[name].all)};
	var myURLarray = autoredirecteurindex[name].URL.exec(URL);
	if (myURLarray != null) {
	if (myURLarray.length == 2) {
	return addprotocole(myURLarray[1]);
	}}
	return false;
},
myURL_modifier : function(name) {
	return autoredir_exe_data.URL_modifier(autoredir_exe_data.myURL,name);
},
//			Fin fonction analyse de URL			
}

autoredirecteurprefs = {
	language : "fr",
	prefHTML : {
		fr:{
			displaypref : "[Afficher / Masquer les pr&#0233;f&#0233;rences]",
			saveTexte : "Sauvegarder les préférences",
			download : "Télécharger !",
			downloadinfo : "Click Droit, 'Télécharger la cible du lien sous..'",
			updateTexte : "Vérifier les mise à jours",
			lastcheck : "Dernière vérification : ",
			reloadTexte : "Recharger la page"},
		en:{
			displaypref : "[Show / Hide preferences]",
			saveTexte : "Save the preferences",
			download : "Download !",
			downloadinfo : "Right Click, 'Download link as..'",
			updateTexte : "Check for update now",
			lastcheck : "Last update check : ",
			reloadTexte : "Reload page"},
		es:{
			displaypref : "[Mostrar/Ocultar preferencias]",
			saveTexte : "Actualizar las preferencias",
			download : "Descargar !",
			downloadinfo : "Haga clic derecho, 'Descargar como objetivo ..'",
			updateTexte : "Buscar actualizaciones ahora",
			lastcheck : "Última verificacion : ",
			reloadTexte : "Recargue página",
			masktextboutton:"Enmascare el texto de los botones de las preferencias."},
	},
	prefs : {
		prefautomask : true,
		zebestportail : false,
		autoclick : false,
		auto_reload_after_save : false,
		wallpaperezinfo : false,
		masktextboutton : false,
		googleimages : false
	},
	prefsinfo : {
		fr:{
			prefautomask : "Autoredirecteur : Masquer les pr&#0233;f&#0233;rences au chargement",
			zebestportail : "Zebest-3000 : Redirection page description du jeu vers le jeu",
			autoclick : "Equivaut (environ) à un clic automatique pour certains sites dont la redirection est dans un lien.",
			auto_reload_after_save : "Recharge automatique de page après sauvegarde des préférences du script.<br>Info : Les changement sont appliqués au prochain chargement de page.",
			wallpaperezinfo : "Page de téléchargement directement pour les liens des images.",
			masktextboutton : "Masquer le texte des bouttons des préférences.",
			googleimages : "Google Images : Aller directement à l'image."},
		en:{
			prefautomask : "Autoredirector: To mask the preferences on loading",
			zebestportail : "Zebest-3000 : Redirection from the page of description to the game",
			autoclick : "An equivalent (about) to an automatic click for certain sites the redirection of which is in a link.",
			auto_reload_after_save : "Automatic page reload after saving the preferences. Info : The changes are applied to next the loading of page.",
			wallpaperezinfo:"Go directly to download page for images links.",
			masktextboutton:"Mask the text of preferences buttons.",
			googleimages : "Google Images: Go directly to image."},
		es:{
			prefautomask : "Autoredirecteur: Encubrir las preferencias durante el cargamento",
			zebestportail : "Zebest-3000 : Cambio de dirección de la página de la descripción al juego",
			autoclick : "Un equivalente (casi) con un chasquido automático para ciertos sitios el cambio de dirección de los cuales está en un eslabón.",
			auto_reload_after_save : "Recarga automática de la página después de ahorrar las preferencias. Info : El cambio es aplicado después al cargamento de la página.",
			wallpaperezinfo:"Ir directamente a la página para descargar para las imágenes.",
			googleimages : "Google Imágenes : Ir directamente a la imagen."},
	},
}
if(typeof autoredirecteurprefs.prefHTML[getPageCtrl.navlanguage(1)]=="object"&& typeof autoredirecteurprefs.prefsinfo[getPageCtrl.navlanguage(1)]=="object"){autoredirecteurprefs.language=getPageCtrl.navlanguage(1)}
GM_log(getPageCtrl.navlanguage(1) + " détecté !");


autoredirecteurindex = {
pokestar : {
	URL : /(?:www\.poke\-star\.net)(?:\/)?$/i,
	after : "sommaire.php",
	applicable : true,
	type : 1
},
full1 : {
	URL : /(?:fullinterest\.site\.voila\.fr)(?:\/)?$/i,
	after : "acceuil.html",
	applicable : true,
	type : 1
},
full2 : {
	URL : /(?:site\.voila\.fr\/fullinterest)(?:\/)?$/i,
	after : "acceuil.html",
	applicable : true,
	type : 1
},
jeuxvideocom : {
	URL : /(www\.jeuxvideo\.com\/?)$/i,
	after : "etajvbis.htm",
	applicable : true,
	type : 1
},
zebestportail : {
	URL : /(?:www\.zebest\-3000\.com\/portail\/jeu\-.*)$/i,
	after : "",
	applicable : false,
	type : 1,
	replace : {de : "portail",en : "jeux"},
	modifypage:function(){
		if (autoredirecteurindex.zebestportail.applicable === false) {
		var linkHTML = (getIdCtrl.$('h1_popup_game').innerHTML).link(autoredir_exe_data.myURL_modifier("zebestportail"));
		var zebest_presentation = getIdCtrl.$('presentation');
		getIdCtrl.removeElementById('h1_popup_game');
		zebest_presentation.innerHTML = "<H1>" + linkHTML + "</H1>" + zebest_presentation.innerHTML; }
	},
},
zebestjeu : {
	URL : /(files\.zebest\-3000\.com\/.*\.swf)$/i,
	applicable : true,
	type : 3,
},
charmedujourphoto : {
	URL : /(?:www\.charme\-du\-jour\.net\/photo\/.*)$/i,
	after : ".jpg",
	applicable : true,
	type : 1,
	analyseliens : "_blank",
	replace : {de : "photo",en : "var/img/original"}
},
allocine : {
	URL : /(?:www\.allocine\.fr\/pub\/interstitiel\/.*\?Redir=http%3A\/\/(.*)&.*)$/i,
	applicable : true,
	type : 1,
},
freemobilegames_mobilclub_linktogameDL : {
	URL : /(free\-mobile\-games\.mobilclub\.org\/games\/.*)$/i,
	applicable : true,
	type : 1,
	analyseliens : "_blank",
},
freemobilegames_mobilclub_gameDL : {
	URL : /(free\-mobile\-games\.mobilclub\.org\/redirect\/games\/\d{0,4})$/i,
	applicable : true,
	type : 4,
},
wallpaperezinfo:{
	URL : /(www\.wallpaperez\.info\/.*\/.*\.html)/i,
	applicable : false,
	type : 1,
	excepwords:["map","download"],
	analyseliens : "_blank",
	replace:function(theURL) {var reg=/(?:.*\/(.*)\.html)/i;var result=reg.exec(theURL);
		if (theURL.indexOf('map')==-1){if (result&&result!=null){return theURL.replace(result[1],"download/"+result[1])}}
		return theURL;
	},
},
startrekonline:{
	URL : /((?:www\.)?startrekonline\.com\/splash\?redir=.*)/i,
	applicable : true,
	type : 1,
	replace : {de : "splash?redir=",en : ""}
},
hebus_pubphp:{
	URL : /www\.hebus\.com\/publicite\.php\?url=..\/.*/i,
	applicable : true,
	type : 1,
	replace : {de : "publicite.php?url=../",en :""}
},
hebus_down_image : {
	URL : /(www\.hebus\.com\/image\-\d*\.html)/i,
	applicable : true,
	type : 2,
	modifypage:function(myURL){
		var downForm = getIdCtrl.$("telechargement-valider").parentNode;
		for(var name = 0; name <= downForm.attributes.length; name++ ) {
			if(downForm[name].type=="hidden"){
				if(downForm[name].value.toLowerCase().indexOf('://')!=-1) {getIdCtrl.$("shadow","class").innerHTML+=autoredir_exe_data.downloadlinker(downForm[name].value);}
	}	}	}
},
googleimages : {
	URL : /(?:.*\.google\..{0,3}\/imgres\?imgurl=(.*)&imgrefurl=.*)/,
	applicable : false,
	type : 1,
	analyseliens : "_blank",
	addlink: {
		linkURL : /(?:.*&imgrefurl=(.*)&usg=.*)/,
		text : "Site",
	},
},
"01netcom" : {
	URL : /(www\.01net\.com\/outils\/telecharger\/windows\/Bureautique\/telephonie\/fiches\/postele\d*\.html)/,
	applicable : true,
	type : 1,
	replace:function(URL){URL=URL.replace("outils/","");return URL.replace("postele","");},
},
lemondedembr : {
	URL : /(?:.*\.lemondedembr\.com\/pubs\/pubs.*)/,
	applicable : true,
	type : 1,
	replace:function(theURL) {
		return (document.getElementsByTagName("a")[0]).href;
	},
},
}
//fin de l'index

//			Préférences					

//Vérification des préférences actuelles

for (name in autoredirecteurprefs.prefs) {
if (typeof GM_getValue(name) !== "boolean") {
GM_log(name + " invalide, ou inexistant ! (Remplacement...)");
GM_setValue(name,autoredirecteurprefs.prefs[name]);}
//			Récup préf enregistrées
autoredirecteurprefs.prefs[name] = GM_getValue(name);
if(typeof autoredirecteurindex[name] == "object"){autoredirecteurindex[name].applicable = autoredirecteurprefs.prefs[name];}
}

//			Anciennes preférences GM_deleteValue( name as String)
GM_deleteValue("redirjeutogame");GM_deleteValue("PrefsStored");GM_deleteValue("analyseliens");GM_deleteValue("megaupload_auto");

//			Mises à jours des préférences par "Commandes de scripts"

//			Mise à jours				
GMSU.init(53683);			//Usage GMSU.init(int scriptID, optional boolean force, optional boolean depForce)
GMSU.setCheckInterval(2);	//Usage setCheckInterval(int days)
GMSU.setLang("fr");			//Usage GMSU.setLang(string lang)
//			Fin mise à jour				

//			Fonction GM_registerMenuCommand( commandName, commandFunc, accelKey, accelModifiers, accessKey )
function autoredirupdater () {
var name;
for (name in autoredirecteurprefs.prefs) {var id = name + "_check";GM_setValue(name,getIdCtrl.$(id).checked);}
if (autoredirecteurprefs.prefs.auto_reload_after_save===true) {location.reload()};}
GM_registerMenuCommand("Autoredir - update pref", autoredirupdater);

//			Fin préférences				

	//			Début redirection		
	var gotoURL = autoredir_exe_data.URLredirect(autoredir_exe_data.myURL,1), name = autoredir_exe_data.URLredirect(gotoURL,1,true);
	if (gotoURL !== false) {GM_log("URL : " + name + " detecté");document.location = gotoURL;}
	//		Fin redirections		

	//			Analyse des embed			
	var arrayembed = document.embeds;
	for (myembed in arrayembed) {
	var embed = arrayembed[myembed], name = autoredir_exe_data.URLredirect(embed.src,3,true,embed);
	if (name !== false) {
	GM_log('Embed : ' + name);
	var link=document.createElement('p');link.style.fontSize="12px";
	link.innerHTML=autoredir_exe_data.downloadlinker(embed.src);
	embed.parentNode.appendChild(link);
	} }
	//			Fin analyse					

	//			Analyse de liens			

	var links = document.links, num, subname;
	for (num in links) {
	//		Changement de lien		
	var gotoURL = autoredir_exe_data.URLredirect(links[num].href,1,false,links[num]);
	if (gotoURL !== false) {
		var ancien_lien = links[num].href, name = autoredir_exe_data.URLredirect(links[num].href,1,true,links[num]);
		if (autoredirecteurindex[name].addlink && VarCtrl.type_de(autoredirecteurindex[name].addlink.linkURL)=="regexp"){
			var newNode = document.createElement('a');
			newNode.href=unescape(autoredirecteurindex[name].addlink.linkURL.exec(ancien_lien)[1]);
			newNode.target="_blank";
			var newText = document.createTextNode(autoredirecteurindex[name].addlink.text)
			newNode.appendChild(newText);
			links[num].parentNode.appendChild(newNode);
		}
		GM_log("href : " + name + " détecté");
		links[num].href = gotoURL;
	if (typeof autoredirecteurindex[name].analyseliens === "string") {links[num].target=autoredirecteurindex[name].analyseliens};
	}
	//			~"Auto-Click"		

	if (autoredirecteurprefs.prefs.autoclick === true) {
	var gotoURL = autoredir_exe_data.URLredirect(links[num].href,4,false,links[num]);
	if (gotoURL !== false) {
	GM_log("href-autoclick : " + autoredir_exe_data.URLredirect(links[num].href,4,true) + " détecté");
	document.location = gotoURL;
	}}
	}

	//			Modification des pages		
	if (autoredir_exe_data.URLredirect(autoredir_exe_data.myURL,2)!=false){
		GM_log("Modifier page : " + autoredir_exe_data.URLredirect(autoredir_exe_data.myURL,2,true) + " détecté");
		if (typeof autoredirecteurindex[name].modifypage == "function"){autoredirecteurindex[name].modifypage(autoredir_exe_data.myURL);}
	}
	//			Fin analyse				

	var name = autoredir_exe_data.URLredirect(autoredir_exe_data.myURL,-1,true);
	if (name !== false) {
		if (typeof autoredirecteurindex[name].modifypage == "function" && autoredirecteurindex[name].type!=2){autoredirecteurindex[name].modifypage(autoredir_exe_data.myURL);}
	}
	//Ecrit une balise <div> pour y mettre par la suite la ou les cases à cocher



	if (typeof getIdCtrl.$('autoredirecteur').innerHTML=="undefined") {
		var autoredir_pref = document.createElement('div');
		autoredir_pref.id = 'autoredirecteur';
		autoredir_pref.innerHTML="<TABLE WIDTH=30% BORDER=2 CELLPADDING=0 CELLSPACING=0 STYLE=\"page-break-before: always; page-break-inside: avoid; background-color : #FDFDB8; color : black; font-size: 13px; position: fixed;z-index: 99; bottom : 0%; right : 0%;\"><TR><TD WIDTH=100% VALIGN=TOP><center id='autoredir_contenu'><b><a href=\"http://userscripts.org/scripts/show/53683\" target=\"_blank\">Autoredirecteur</a></b> <a href=\"javascript:getIdCtrl.ShowMaskById('autoredir_preferences_contenu');\">"+autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].displaypref+"</a></center></TD></TR></TABLE><br>";
		document.getElementsByTagName('body')[0].appendChild(autoredir_pref);
		//		Fin écriture balise

	//Ecrit le tableau dans la page les options de préferences
	var autoredir_contenu = getIdCtrl.$('autoredir_contenu');
	if (typeof autoredir_contenu.innerHTML!="undefined") {
	//			Contenu
	var autoredir_preferences_contenu=document.createElement('div');
	autoredir_preferences_contenu.id="autoredir_preferences_contenu";
	autoredir_preferences_contenu.style.marginLeft= "2pt";autoredir_preferences_contenu.style.marginRight= "2pt";

	for (name in autoredirecteurprefs.prefs) {
	var checked=(autoredirecteurprefs.prefs[name] === false)?"":" checked=\"checked\"";
	autoredir_preferences_contenu.innerHTML+="<P STYLE=\"border: 2px ridge; text-align: left; margin-bottom:3pt;\"><input id=\""+name+"_check\" type=\"checkbox\""+checked+">  " + autoredirecteurprefs.prefsinfo[autoredirecteurprefs.language][name] + "</P>";
	}
	date = VarCtrl.dateToString(new Date(eval(GM_getValue('GMSU_lastCheck'))),'jj\/mm\/aa HH:MM:SS');
	autoredir_preferences_contenu.innerHTML+="<P ID='autoredir_bottom'>"+autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].lastcheck + date + ((autoredirecteurprefs.prefs.masktextboutton==false)?"<br>":" ")+"</p>";
	autoredir_contenu.appendChild(autoredir_preferences_contenu);
	if(autoredirecteurprefs.prefs.prefautomask == true) {getIdCtrl.ShowMaskById('autoredir_preferences_contenu')};

	var autoredir_bottom = getIdCtrl.$('autoredir_bottom');
	var autoredir_saveButton = document.createElement('button');
	autoredir_saveButton.id = 'autoredir_saveButton';
	autoredir_saveButton.innerHTML+="<IMG src='data:image/png;base64,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'></IMG>"+((autoredirecteurprefs.prefs.masktextboutton==false)?autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].saveTexte:"");
	/* autoredir_preferences_contenu */autoredir_bottom.appendChild(autoredir_saveButton);
	autoredir_saveButton.addEventListener('click', autoredirupdater, true);

	var autoredir_reloadButton = document.createElement('button');
	autoredir_reloadButton.id = 'autoredir_reloadButton';
	autoredir_reloadButton.innerHTML+="<IMG src='data:image/png;base64,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'></IMG>"+((autoredirecteurprefs.prefs.masktextboutton==false)?autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].reloadTexte:"");
	autoredir_bottom.appendChild(autoredir_reloadButton);
	autoredir_reloadButton.addEventListener('click', function(){location.reload()}, true);

	var autoredir_updateButton = document.createElement('button');
	autoredir_updateButton.id = 'autoredir_updateButton';
	autoredir_updateButton.innerHTML+="<IMG src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLHQ4dOYaxkAoAAAWDSURBVEjHrZV7jJTVGcZ/53y32ZlhdmbZWVZWWIjuqjTdChvhH9qASzZRoKRdBW3AYIsJvSSk2KRtGk0j9Y+mNrGKFkpNm2KUku72EhFrKVAhVkALYQXUhYW9sbe5MTPfXL7b6R8DrVjamtYnOTknJ+95nve857zvK7gRWhbC2EmAer64vYvmBe2alEm/artUiqP0//Y0p/a8AfDVZYKfHlZ85bMaLxzx/4VK3FAg0tygbd7/s6aW23saoyFMoRBK4AWKouuRLZfJjJ0ZUxfe+gmvbP3Rq9+aufXep9I7qzsitrXZ/i8Ca3+xfv7SB3av6Qgp3UBM5RX5isD1IFDg+1CtQjZfVrfFMyI7MZV9dHqFvahjSWTWhv3tQOrDdPI68k1/emzV+o27+75mqSUdCEeBi8A0IVrnkTSLJESGmFFg42ds8csvtbB0yacTMTI3m5qMp15eNdw1l9tvLPDgS2tWrVzxRN9qmKwKcex9SNs1C8uEUEQndOUi6xbNYOcX6ujpbKTvPLTFM8RCUMiMirCUod9vv//Md7tZfo1WuybUvOHnf92zwbI+CIR45TRMXqkF0DTAsiCkK7SGmUwNDmOHG5ksK0xNIIsf0HpxF9aMFsqlnLCEzvJlizdW04P9b15wz9VusOm1Tas74/EJTYh9/TCehQAwDKizro46QTisU6mPcWEoheMLyh4wfpJINErIkEgB+dykKIwPqS09d/QCn9IBYrNu/XpTWKmD7woxPAW+qnltGbXwVOwiZdclHDExYxEGB6doaoqh6SatU/upiyTQDYFSkorjMTJygoNn3QtAXgfMaH2yYyIncHJQ9mph0SUYGlRKJe6bGzA7HmHS9hguGTRrO5mT+AaHMy1EM29Sd1MCoUmCQFKy82jCFa/2s1eXjOtAc8jQmMyDZoDUQUrQZG02dMWBYRdrIobERGhwT3oHTfVRjr0laRGX0c3ZoGoOOdWUGpikcOg9XgQ8CbqulKJYAcf7SIIo0DSdYqlCyIKqp/ALo9Q7OTh2iIe7FIm7umvMOvhuEaWK4sgAfwaGrn5TL+86ZRw3IPBB+UAAStUEpnIVutvjXM565Cs+WuYcVjgMdh6O/A4tZKE0DQRUK9OkC/DMAV4A7Gt5kCoXUrbv+fg+BAGoAIKra0N5bNlzhqpfIu1AW7YXwjPBL5G6dBZ/4DxCAn4Fz82pg+8xAJy4Lg9E+4p58WRrp6kb6BI0KdC1mnokEiZmwdvHjzNWEHxHPU6iIQ6VNKlshrMXU1h+BUu6pK7kxNod8rlbkmpfungtk80IpcPPPJ8pFnGqDq4jcB2F54DrgGFPs6ChzOr7VtKelMwSIyB0VDXL27k2ttW9Tu+5EAPDI+roeZktO8He9yf++ZYavgvZSxOlmxa21TfO6dClhhQaUgikAr8wzpPGeiK6Q7ls0l35FSKcRNiXeXLoEcSt9zLYuE7tO5UWhw/1P52y6fUDgutrUTSJ++L6hwYHT08VCllVskuUC2Wu5EpUXIvzbxzjc8lRti07iivDKCfPdB5uu3Mxj62cQWAPiNf+VnzqxDBPOB7ujcv1I/th1z0x68t9786/5c453185g7vmRdE1k7FtGq3NDTQsWEhIC/CGjnNopInhxb3qub8MiJP7fv28ONP3TQXOf24485fCxaPE7v/xy2t71jzghWLMTDSqNa9Hxdy4w6UJj7bWZpLmhNpy6vNi93jnaPH4H76njb+z2wfFx8NVzbmdXVb3t7eb63YMvrR1tjr3A9SiruVq18O6GvohqqG55Vmgnnl3839j72YOPP0gZ4GFQGtPJ9uAm/mkcOBRdt19B49r8h/9AyE+0g3/DbSPYxQySPzmHf6oFNMf2lafiPfPPgSALiD0v5z/O9YuXkBVKdNNAAAAAElFTkSuQmCC'></IMG>"+((autoredirecteurprefs.prefs.masktextboutton==false)?autoredirecteurprefs.prefHTML[autoredirecteurprefs.language].updateTexte:"");
	autoredir_bottom.appendChild(autoredir_updateButton);
	autoredir_updateButton.addEventListener('click', function(){GMSU.init(53683,true,true)}, true);
	} else {GM_log("Preferences DIV introuvable")};
	}
}//		Fin du Empèche l'éxécution du script sur les iframes et assimilés
