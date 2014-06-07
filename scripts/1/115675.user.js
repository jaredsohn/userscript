// ==UserScript==
// @name	The West - ColorMe
// @namespace	http://userscripts.org/scripts/show/115675
// @description	Adds new features to the chat of The West
// @icon        http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license     GNU Lesser General Public License (LGPL)
// @copyright   2011, Y.
// @website     http://scripts-o-maniacs.leforum.eu
// @release     Claudiney Walter
// @author      Y.
// @translator	CWalter
// @include     http://*.the-west.*/game.php*
// @include     http://userscripts.org/scripts/review/115675*
// @include     http://userscripts.org/scripts/source/115675.meta.js*
// @version     1.9
//
// @history	1.9 Add support a new version of The West 1.35
// @history     1.8 Add Brasilian Portuguese(PT-BR)Translations, thanks CWalter
// @history	1.7 Maj updater + new position colorPanel 
// @history	1.6 corrections 
// @history	1.5 bug fixed
// @history	1.4 Whisper function improved: no need to toggle the colorpanel after using whisper button to get back your last color used. 
// @history	1.3 Test MAJ Safari
// @history	1.2 Test MAJ
// @history	1.1 SOM update & revision system added 
// @history	1.1 Bunch of new features : colored whisper + tw reports and player profils openable from the chat... 
// @history	1.1 ...New smiley panel added under the footer page, containing SOM smiley and tw smiley
// @history	1.1 Bug(fixed) : whisper used with manual /tell command not possible while CustomColor selected
// @history	1.0 converts submited text in fortbattle room red colored into uppercase and bold 
// @history	1.0 Converted pictures b64 Encoded
// @history	1.0 addition of contextual icons for whisper boutton and custom color boutton
// @history	1.0 basic automation of TW color command 
// ==/UserScript==

//-----------------------\/
// Pour la mise à jour
var url = window.location.href;

//Cas du script exécuté dans le jeu (ou fenêtre principale)
if (url.indexOf(".the-west.") != -1) {

	//Création d'une fonction globale pour tout le script
	(function(fonctionGZA){
		var documentGZA=document,scriptGZA=documentGZA.createElement("script");
		scriptGZA.type = "application/javascript";
		scriptGZA.textContent = "("+fonctionGZA.toString()+")()";
		(documentGZA.body||documentGZA.head||documentGZA.documentElement).appendChild(scriptGZA);
		scriptGZA.parentNode.removeChild(scriptGZA)
	})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	//MISE À JOUR
	var VERSION 			= "1.9" ;
	var NUMERO_SCRIPT		= "115675" ;
	var NB_HISTORY			= 7 ;
	var MENU_maj			= "GZA_" + NUMERO_SCRIPT + "_MAJ" ;
	var DELTA_maj 			= 24 * 3600 ; // 24 h en s
//-----------------------/\

//-----------------------\/

	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
//			return false ; //Pas de màj à vérifier
			return true ; //Pas de màj à vérifier
		}
		else
		{
			return true ;
		}
	}
	
	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
		if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
		var version_recuperee = unescape(contenu_iframe.data);
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT)	//vérifie si le message commence par le bon numéro de script
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version

			if (script_version != VERSION) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release

				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				//Boucle qui parcours les @history
				for (var i=0 ; i<tab_history.length ; i++)
				{
					ligne 				= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					version_history = version_history_full.split("|")[0];
					version_history_date = version_history_full.split("|")[1] || "";

					//Teste si la version a changée
					if (version_history != version_history_precedente)
					{
					if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						contenu_fenetre_history += "<TR><TD style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						nb_version_history_trouvee++ ;
						version_history_precedente = version_history ;
					}
					version_history_full=version_history_full.replace("|","\\|");
					var reg = new RegExp(version_history_full + "+\s*(.*)");
					texte_history = ligne.match(reg)[1];
					contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					
					if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";

					//Sort si le nb maximum d'historique est atteint
					if (nb_version_history_trouvee == NB_HISTORY) break ;
				}

				contenu_fenetre_history += "</TABLE></DIV>";
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				//Boutons du bas de la fenêtre
/*				var ferme_maj = "javascript:AjaxWindow.close('Mise_a_jour_" + NUMERO_SCRIPT + "');" ;
				contenu_fenetre_history += "<TABLE WIDTH=100%><TR>" ;
				contenu_fenetre_history += "<TD ALIGN='center'><SPAN><A onClick=\"" + ferme_maj + "\" CLASS='button_wrap button' href='http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js'><SPAN CLASS='button_left'></SPAN><SPAN CLASS='button_middle'>" + CHERCHER + "</SPAN><SPAN CLASS='button_right'></SPAN></SPAN></A></SPAN></TD>"
				contenu_fenetre_history += "<TD ALIGN='center'><SPAN><A CLASS='button_wrap button' href=\""+ ferme_maj + "\"><SPAN CLASS='button_left'></SPAN><SPAN CLASS='button_middle'>" + ANNULER + "</SPAN><SPAN CLASS='button_right'></SPAN><SPAN STYLE='clear: both;'></SPAN></A></SPAN></TD>" ;
				contenu_fenetre_history += "</TR></TABLE>" ;
*/
				//Affichage de la fenêtre
//				AjaxWindow.show("Mise_a_jour", undefined, NUMERO_SCRIPT, contenu_fenetre_history, {title:script_nom}, true);
/* new MessageBox({
	            title: "Mise_a_jour",
	            message: contenu_fenetre_history,
	            width: 480,
	            height: undefined,
	            options: [ ['ok'] ],
	            cancelOnOutsideClick: false
	        }).show();*/

//-----------Safari installer------------\/

	var funcIframeInstaller = function () {
		try{
		var n = this;	
		if (n.safari)	{//
				var top = (window.innerHeight - 350) / 2;
				var left = (window.innerWidth - 500) / 2;

				if ((document.getElementById('greaseSafari-installer'))) {
					$('greaseSafari-installer').setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);display:block;z-index:90000;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');
				}
			
		}else{
			//alert("else");
				location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";
			}
		}catch(e){}
	}
    showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", funcIframeInstaller], ["cancel"]]);			

//-----------Safari installer------------/\
				//Titre en centré
//				document.getElementById("window_Mise_a_jour_" + NUMERO_SCRIPT).getElementsByTagName("h2")[0].style.cssText = "text-align:center";

			}

			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	}
//-----------------------/\

function init(v) {
	/*Check for Opera*/
	if (!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
		return;
	} /*  Language Settings */
	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
	colorTxt.resourceBundle = colorTxt.getLanguage(lang);
	var xi =document.getElementById('chatwindow_msgs');
	var myNode = xi.firstChild;
	var counti=0;
	var OnNodeInserted = function () {
		if (document.getElementById('chatwindow_msgs').tBodies[0].rows.length > 5) {
		counti++;
			if (counti==3)	{
				colorTxt.d();
				counti=0;
			}
		}
	};
	if (myNode.addEventListener) {
		//DOMNodeInserted,DOMSubtreeModified
		myNode.addEventListener ('DOMNodeInserted', OnNodeInserted, false);
	}
	this.myVersion = v;
	this.lastTag='';
	this.lastColor = '';
	this.colorTag = 1;
	this.custColor = '';
	this.tellName = '';
	this.BFred = 0; /*color panel img*/
	this.CPButtonImg ='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' /*contextual imgs*/
	this.ctxImgElse = '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' /*Red Battle Fort icon*/
	this.ctxImgRBF = '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'
	this.imgNothing = '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'
	this.imgSomSm = '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'
/*
 "!:-?)!": "/images/chat/smiley_shoot.png",
 ":-?)": "/images/chat/smiley_smile.png",
 ":-?D": "/images/chat/smiley_laugh.png",
 ":-?(": "/images/chat/smiley_frown.png",
 ";-?)": "/images/chat/smiley_smirk.png",
 ":-?P": "/images/chat/smiley_tongue.png",
 ":-?p": "/images/chat/smiley_tongue.png",
 "-.-": "/images/chat/smiley_nc.png",
 "^_?^": "/images/chat/smiley_01.png",
 "o.?O": "/images/chat/smiley_oo.png",
 "o_O": "/images/chat/smiley_oo.png",
 "el pollo diablo!": "/images/chat/smiley_elpollodiablo.png",
 "!el pollo diablo": "/images/chat/smiley_elpollodiablo_mirror.png",
 "el pollo diablo\\?!": "/images/chat/smiley_elpollodiablo_front.png"

:hihi: :smile: :wink: :nodding: :lol: :razz: :rolleyes: :biggrin: :mrgreen: :evil:
:cool: :redface: :confused: :neutral: :hmm: :sad: :eek: :surprised: :mad: :grr:
:whistle:
*/
	this.twSm = {
	"!:-)!": "<img src='/images/chat/smiley_shoot.png' />",
	":-)": "<img src='/images/chat/smiley_smile.png' />",
	":-D": "<img src='/images/chat/smiley_laugh.png' />",
	":-(": "<img src='/images/chat/smiley_frown.png' />",
	";-)": "<img src='/images/chat/smiley_smirk.png' />",
	":-p": "<img src='/images/chat/smiley_tongue.png' />",
	"-.-": "<img src='/images/chat/smiley_nc.png' />",
	"^_^": "<img src='/images/chat/smiley_01.png' />",
	"o_O": "<img src='/images/chat/smiley_oo.png' />",
	"el pollo diablo!": "<img src='/images/chat/smiley_elpollodiablo.png' />",
	"!el pollo diablo": "<img src='/images/chat/smiley_elpollodiablo_mirror.png' />",
	"el pollo diablo\\?!": "<img src='/images/chat/smiley_elpollodiablo_front.png' />"
	};

	this.twTag ={
	"[player][/player]": "<img src='images/transparent.png' style='background-image:url(../images/bbcodes.png);background-position: -80px;height:20px;width:20px;margin:6px 1px;'>"/*,
	"[town][/town]": "<img src='images/transparent.png' style='background-image:url(../images/bbcodes.png);background-position: -100px;height:20px;width:20px;margin:6px 1px;'>",
	"[fort][/fort]": "<img src='images/transparent.png' style='background-image:url(../images/bbcodes.png);background-position: -120px;height:20px;width:20px;margin:6px 1px;'>"*/
	};
	this.somSm = {
	":hihi:": "<img src='http://img4.hostingpics.net/pics/555892hihi.gif' />",
	":smile:": "<img src='http://img4.hostingpics.net/pics/669468smile.gif' />",
	":wink:": "<img src='http://img4.hostingpics.net/pics/250140wink.gif' />",
	":nodding:": "<img src='http://img4.hostingpics.net/pics/611796nodding.gif' />",
	":lol:": "<img src='http://img4.hostingpics.net/pics/969660lol.gif' />",
	":razz:": "<img src='http://img4.hostingpics.net/pics/862387razz.gif' />",
	":rolleyes:": "<img src='http://img4.hostingpics.net/pics/578929rolleyes.gif' />",
	":biggrin:": "<img src='http://img4.hostingpics.net/pics/598461biggrin.gif' />",
	":mrgreen:": "<img src='http://img4.hostingpics.net/pics/119756mrgreen.gif' />",
	":evil:": "<img src='http://img4.hostingpics.net/pics/232892evil.gif' />",
	":cool:": "<img src='http://img4.hostingpics.net/pics/217491cool.gif' />",
	":redface:": "<img src='http://img4.hostingpics.net/pics/303489redface.gif' />",
	":confused:": "<img src='http://img4.hostingpics.net/pics/379267confused.gif' />",
	":neutral:": "<img src='http://img4.hostingpics.net/pics/876482neutral.gif' />",
	":hmm:": "<img src='http://img4.hostingpics.net/pics/143558hmm.gif' />",
	":sad:": "<img src='http://img4.hostingpics.net/pics/449684sad.gif' />",
	":eek:": "<img src='http://img4.hostingpics.net/pics/612315eek.gif' />",
	":surprised:": "<img src='http://img4.hostingpics.net/pics/862422surprised.gif' />",
	":mad:": "<img src='http://img4.hostingpics.net/pics/386271mad.gif' />",
	":whistle:": "<img src='http://img4.hostingpics.net/pics/969602whistle.gif' />",
	":grr:": "<img src='http://img4.hostingpics.net/pics/258456grrr.gif' />"
	};
	this.addColorButton();
	this.addColorPanel();
	this.addSmilePanel();
	var funcKeyColor = function (ev) {
		ev = new Event(ev);
		if (ev.code == 13) {
			colorTxt.a();
			document.focusing = undefined;
		}
	}
	$('chatwindow_say').addEvent('keydown', funcKeyColor);
	$('chatwindow_channelselect').setAttribute("onChange", "colorTxt.b();");
	this.infoScript();
}

function addColorButton() { /*test color btn*/
	var btnColorText = new Element('a', {
		'id': 'btnColorText',
		'title': '',
		'class': 'button_wrap button',
		styles: {
			'float': 'left'
		},
		href: 'javascript:colorTxt.toggle();'
	});
	btnColorText.innerHTML = '<img id="colorChangeImg" src="images/transparent.png"  width="12" height="12"' + 'style="background-image:url(data:image/png;base64,' + this.ctxImgElse + '); background-position:0px 0px">';
	btnColorText.addEvent('click', function () {
		$('chatwindow_say').focus();	});
	var parentDiv = $('chatwindow_say').parentNode;
	var pparentDiv = parentDiv.parentNode;
	pparentDiv.insertBefore(btnColorText, parentDiv);
}
function e() {
	
}
function addColorPanel() {
	var CPButton = ['', 'red', 'brown', 'blue2', 'tellName', 'blue', 'green', 'pink', 'purple', 'custColor','somSmile'];
	var colorPanelDIV = new Element('div', {
		'id': 'colorPanelDIV',
		'styles': {
			'display': 'none',
			'width': '128px',
			'height': '54px',
			'position': 'absolute',
			'top': '-50px',
			'left': '100px',
			'z-index': '5'
		}
	});
	var w = 0;
	var posx = 0;
	var posy = 0;
	colorPanelDIV.innerHTML = '';
	for (var i = 0; i < CPButton.length-1; i++) {
		var opt = CPButton[i];
		if ((i == 0) || (i == 5)) {
			w = 25;
		}
		else if ((i == 1) || (i == 2) || (i == 6) || (i == 7)) {
			w = 19;
		}
		else if ((i == 3) || (i == 8)) {
			w = 20;
		}
		else if ((i == 4) || (i == 9)) {
			w = 24;
		}
		if (i == 5) {
			posy = -27;
			posx = 0;
		}
		colorPanelDIV.innerHTML += '<a href="javascript:colorTxt.c(\'' + opt + '\');" >' + '<img id="idCPBoutton_' + opt + '" alt="" src="images/transparent.png" width="' + w + '" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.CPButtonImg + ');' + 'background-position:-' + posx + 'px ' + posy + 'px"></a>';
		posx = posx + w;
		if (i==4)	{
			colorPanelDIV.innerHTML +='<a href="javascript:colorTxt.c(\'somSmile\');" >' + '<img id="idCPBoutton_somSmile" alt="" src="images/transparent.png" width="20" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.imgSomSm + ');' + 'background-position:0px -27px"></a>';
		}
	}
colorPanelDIV.innerHTML +='<a href="javascript:colorTxt.c(\'nothing\');" >' + '<img id="idCPBoutton_nothing" alt="" src="images/transparent.png" width="20" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.imgNothing + ');' + 'background-position:0px 0px"></a>';
		
	var pDiv = $('chatwindow_say').parentNode;
	var ppDiv = pDiv.parentNode;
	ppDiv.insertBefore(colorPanelDIV, pDiv);
}

function addSmilePanel() {
	
	var smilePanelDIV = new Element('div', {
		'id': 'smilePanelDIV',
		'styles': {
			'display': 'none',
			'width': '90px',
			'height': '100px',
			'position': 'absolute',
			'top': '360px',
			'left': '11px',
			'z-index': '5'
		}
	});
	var i,j,k;
	smilePanelDIV.innerHTML = '';

	for (i in this.somSm) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + i + '\');" >' + this.somSm[i] + '</a>';
	}	
	for (j in this.twSm) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + j + '\');" >' + this.twSm[j] + '</a>';
	}	
	for (k in this.twTag ) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + k + '\');" >' + this.twTag[k] + '</a>';
	}
	var refNode = $('abdorment_left');
	//ppDiv.insertAfter(smilePanelDIV, pDiv);
	refNode.parentNode.insertBefore(smilePanelDIV, refNode.nextSibling);
}

function addSmToTxt(txt)	{
	var currentTxt = $('chatwindow_say').value;
	currentTxt += txt;
	$('chatwindow_say').value = currentTxt;
	$('chatwindow_say').focus();
	
}

function a(c) {
	var tx = '';
	var cmdTw = ['/tell', '/topic', '/clear', '/logout', '/hide', '/show', '/ignorelist', '/ignore', '/unignore', '/rights', '/color', '/help', '/?'];
	var tabColor = ['/900*', '', '/007', '/700', '/031', '/321', '/704', '/409', '/608', '/tell'];
	var changeRedBold = -1;
	if (this.BFred == 1) {
		changeRedBold = 1;
	}
	var currentTag = $('chatwindow_say').value;

	var skipTag = -1;
	if (currentTag.charAt(0) == '/') {
		if ((currentTag.indexOf(cmdTw[0]) == '0') && (currentTag.indexOf(":") != '-1')) {
			skipTag = currentTag.indexOf(":");
		} else {
			for (var k = 1; k < cmdTw.length; k++) {
				if (currentTag.substring(0, cmdTw[k].length) == cmdTw[k].substring(0, cmdTw[k].length)) {
					skipTag = 1;
				}
			}
		}
	}
	if (this.colorTag != 9)
		if (this.colorTag != 10)
			this.lastColor = tabColor[this.colorTag];

	switch (this.colorTag) {
	case 1:
		tx = $('chatwindow_say').value;
		break;
	case 2:
		if (skipTag != 1) {
			tx = currentTag.substring(0, skipTag + 1);
			tx += tabColor[2];
			tx += currentTag.substring(skipTag + 1, currentTag.length);
		}
		break;
	case 3:
		if (changeRedBold == 1) {
			tx = currentTag.substring(0, skipTag + 1);
			tx += tabColor[0];
			tx += currentTag.substring(skipTag + 1, currentTag.length).toUpperCase();
			tx += '*';
		} else {
			tx = currentTag.substring(0, skipTag + 1);
			tx += tabColor[3];
			tx += currentTag.substring(skipTag + 1, currentTag.length);
		}
		break;
	case 4:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[4];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 5:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[5];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 6:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[6];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 7:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[7];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 8:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[8];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 9:
		tx = tabColor[9]+' ' + this.tellName + ':' + this.lastColor;
		tx += $('chatwindow_say').value;
		break;
	case 10:
		this.lastColor = this.custColor;
		tx = currentTag.substring(0, skipTag + 1);
		tx += this.custColor;
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	}
	if (skipTag != 1) {
			$('chatwindow_say').value = tx;
	}
}

function b() {
	var selectedTwRoom = $('chatwindow_channelselect').options[$('chatwindow_channelselect').selectedIndex].value;
	var roomTwException = ['room_maneuver', 'room_fortbattle'];
	if ((selectedTwRoom.indexOf(roomTwException[0]) != '-1') || (selectedTwRoom.indexOf(roomTwException[1]) != '-1')) {
		this.BFred = 1;
		if (this.colorTag == 3) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgRBF + ")");
			$('colorChangeImg').setAttribute("width", "18px");
			$('colorChangeImg').setAttribute("height", "11px");
		}
	} else {
		this.BFred = 0;
		$('colorChangeImg').setAttribute("width", "12px");
		$('colorChangeImg').setAttribute("height", "12px");
		if (this.colorTag == 3) $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-12px 0px");
	}
}

function c(tag, from) {
	$('colorChangeImg').setAttribute("width", "12px");
	$('colorChangeImg').setAttribute("height", "12px");
	$('btnColorText').setAttribute("href", "javascript:colorTxt.toggle();");
	switch (tag) {
	case 'blue':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-60px 0px");
		this.colorTag = 2;
		break;
	case 'red':
		if (this.BFred == 0) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-12px 0px");
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgRBF + ")");
			$('colorChangeImg').setAttribute("width", "18px");
			$('colorChangeImg').setAttribute("height", "11px");
		}
		this.colorTag = 3;
		break;
	case 'green':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-72px 0px");
		this.colorTag = 4;
		break;
	case 'brown':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-24px 0px");
		this.colorTag = 5;
		break;
	case 'pink':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-82px 0px");
		this.colorTag = 6;
		break;
	case 'blue2':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-36px 0px");
		this.colorTag = 7;
		break;
	case 'purple':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-96px 0px");
		this.colorTag = 8;
		break;
	case 'tellName':
		this.tellName = prompt("Inserir um nome de jogador:");
		if ((this.tellName == null) || (this.tellName == '')) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
			this.colorTag = 1;
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-48px 0px");
			this.colorTag = 9;
			$('btnColorText').setAttribute("href", "javascript:colorTxt.c('"+this.lastTag+"','tell');");
		}
		break;
	case 'custColor':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
		if(from == 'tell') {
			this.custColor=this.lastColor;
		} else {
			this.custColor ='/'+ prompt("Inserir um código de cor:");
		}
		if ((this.custColor == null) || (this.custColor == '')) {
			this.colorTag = 1;
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-108px 0px");
			this.colorTag = 10;
		}
		break;
	case 'nothing':
		colorTxt.infoScript();
		break;
	case 'somSmile':
		colorTxt.togglePS();
		break;
	default:
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
		this.colorTag = 1;
	}
	if ((tag != 'somSmile') && (tag != 'nothing')){
		if (tag != 'tellName')
			this.lastTag=tag;
		if(!from || from != 'tell'){
			colorTxt.toggle();
			$('chatwindow_say').focus();
		}
	}
}

function infoScript() {
	var url1 = 'http://scripts-o-maniacs.leforum.eu';
	var url2 = 'http://forum.the-west.fr/showthread.php?t=13200&highlight=script';
	var hrefStr = 'mailto:claudineywalter@gmail.com';
	var somMsg;
	if ((window.location.hostname.substr(0, window.location.hostname.search(/\./)))=='.br8.br10.') {
		hrefStr = 'mailto:claudineywalter@gmail.com';
	}else{
		hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:1529435},\'1529435\');';
	}
	var Author = '<a href=\"' + hrefStr + '\">CWalter</a>';
	if ((window.location.hostname.substr(0, window.location.hostname.search(/\./))).indexOf("fr") != '-1') {
		somMsg ='<span style="color:#000066; text-align:center;"><b>Les fonctionnalités du chat vous sont proposées par [SOM]. Venez nous voir <a href=\"' +url1+ '\" target="_blank">ici</a> ou <a href=\"' +url2+ '\" target="_blank">la </a>pour plus de scripts. Enjoy!</b><br><i>Version : '+this.myVersion +' Auteur : '+Author+ '</i></span>'; 	
	}else{
		somMsg ='<span style="color:#000066; text-align:center;"><b>Recursos de bate-papo são fornecidos pelo [SOM]. Conheça-nos <a href=\"' +url1+ '\" target="_blank">Aqui</a>. Mais scripts com  pacote de idioma <a href=\"' +url2+ '\" target="_blank">Aqui</a>. Divirta-se!.</b><br><i>Versão: '+this.myVersion +' Autor: ' +Author+ '</i></span>'; 
	}	
	chatcontrol.addTextLine("system",""+somMsg+"");
}

function substr_count(str, seek) {
	return ((str.length - str.split(seek).join("").length) / seek.length);
}

function d() {
	var id1, id2, label, urlimg;
	var x = document.getElementById('chatwindow_msgs').tBodies[0].rows;
	var lastRow = x.length - 1;
	var loopStop = 0;
	var protocol = '';
	var curTxt = '';
	var openP, closeP, openF, closeF, openT, closeT, openR, closeR;

	var z;
	//correction (not optimum) the line number change in real time this update the right line..
	for (var i = 0; i <= lastRow; i++) {
	 	curTxt = x[i].innerHTML;
		//player<a href="javascript:parent.AjaxWindow.show('profile',{player_name:encodeURIComponent(&quot;yannph&quot;)},&quot;yannph&quot;);">yannph</a>
		openP = colorTxt.substr_count(curTxt, '[player]');
		closeP = colorTxt.substr_count(curTxt, '[/player]');
		if ((openP != '0') && (closeP != '0')) {
			for (var j = 0; j < openP; j++) {
				label = curTxt.substring(curTxt.indexOf("[player]") + 9, curTxt.indexOf("[/player]"));
				curTxt = curTxt.substring(0, curTxt.indexOf("[player]")) + '<a href="javascript:parent.AjaxWindow.show(\'profile\',{player_name:encodeURIComponent(&quot;' + label + '&quot;)},&quot;' + label + '&quot;);">' + label + '</a>' + curTxt.substring(curTxt.indexOf("[/player]") + 10, curTxt.length);
			}
		}
/*
		//town<a href="javascript:parent.AjaxWindow.show('town',{town_id:29},'804_227');">Black ℜock</a>
		openT = colorTxt.substr_count(curTxt, '[town]');
		closeT = colorTxt.substr_count(curTxt, '[/town]');
		if ((openT != '0') && (closeT != '0')) {
			for (var j = 0; j < openT; j++) {
				label = curTxt.substring(curTxt.indexOf("[town]") + 6, curTxt.indexOf("[/town]"));
				curTxt = curTxt.substring(0, curTxt.indexOf("[town]")) + '<a href="javascript:parent.AjaxWindow.show(\'town\',{town_id:29},'804_227');">' + label + '</a>' + curTxt.substring(curTxt.indexOf("[/town]") + 7, curTxt.length);
			}
		}
		//forts <a href="javascript:parent.AjaxWindow.show('fort',{fort_id:72},'806_226');">ℜock Union</a>
		openF = colorTxt.substr_count(curTxt,'[fort]');
		closeF = colorTxt.substr_count(curTxt,'[/fort]');
		if ((openF != '0') && (closeF != '0')) {
		for (var k=0; k<openF;k++)	{
			label = curTxt.substring(curTxt.indexOf("[fort]") + 6, curTxt.indexOf("[/fort]"));
 			curTxt = curTxt.substring(0, curTxt.indexOf("[fort]")) + '<a href="javascript:parent.AjaxWindow.show(\'fort\',{fort_id:72},'806_226');">' + label + '<a>' + curTxt.substring(curTxt.indexOf("[/fort]") + 7, curTxt.length);
	 	}
*/
		//reports links
		openR = colorTxt.substr_count(curTxt, '[report=');
		closeR = colorTxt.substr_count(curTxt, '[/report]');
		if ((openR != '0') && (closeR != '0')) {
			for (var k = 0; k < openR; k++) {
				id1 = curTxt.substring(curTxt.indexOf("[report=") + 8, curTxt.indexOf("[report=") + 8 + 8);
				id2 = curTxt.substring(curTxt.indexOf("[report=") + 16, curTxt.indexOf("[report=") + 16 + 10);
				label = curTxt.substring(curTxt.indexOf("[report=") + 27, curTxt.indexOf("[/report]"));
				curTxt = curTxt.substring(0, curTxt.indexOf("[report=")) + '<a class=\'public_report_link\' href=\'javascript:Reports.show(' + id1 + ', "' + id2 + '");\'>[' + label + ']</a>' + curTxt.substring(curTxt.indexOf("[/report]") + 9, curTxt.length);
			}
		}
		//smileys 
		for (z in this.somSm) {
			if (curTxt.indexOf(z)!='-1') {
				curTxt = curTxt.replace(new RegExp(z.replace(/([\)\.\^\(])/g, "\\$1"), "g"), "" + this.somSm[z] + "");
			}
		}
		x[i].innerHTML = curTxt;
	}
}	
	
function toggle() {
		var ele = document.getElementById("colorPanelDIV");
		if (ele.style.display == "block") {
			ele.style.display = "none";
		}
		else {
			ele.style.display = "block";
			this.bold = 0;
			this.cmdTW = '';
		}
}
function togglePS() {
	var elePS = document.getElementById("smilePanelDIV");
	if (elePS.style.display == "block") {
		elePS.style.display = "none";
		$('idCPBoutton_somSmile').setAttribute("style", "background-image:url(data:image/png;base64," + this.imgSomSm+ ");background-position:0px -27px");
	}
	else {
		elePS.style.display = "block";
		$('idCPBoutton_somSmile').setAttribute("style", "background-image:url(data:image/png;base64," + this.imgSomSm+ ");background-position:0px 0px");
	}
}

function getString(key, param) {
	var str = $defined(colorTxt.resourceBundle[key]) ? colorTxt.resourceBundle[key] : key;

	if ($defined(param)) {
		if (!(param instanceof Array)) {
			param = new Array(param);
		}
		for (var i = 0; i < param.length; i++) {
			str = str.replace('%' + (i + 1), param[i]);
		}
	}
	return str;
};

function getLanguage(lang) {
	res = new Array();
	res['en'] = {
		'text.about': 'set your message about',

		'author': 'Author:'
	};
	return (res[lang] != null ? res[lang] : res['en']);
}
//-----------------------\/
			if (maj_a_verifier())
			{
				//Test safari
				var navigateur = navigator.userAgent.toLowerCase();
//alert("test");
				//Initialisation de la variable
				var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

				//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
				var chrome = navigateur.indexOf("chrome") + 1 ;
				if (!chrome)
				{
					safari = navigateur.indexOf("safari") + 1 ;
					if (safari)
					{
						var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
					}
				}

				//
				//IFRAME
				//

				//Écriture dans une iframe le contenu de la source de l'en-tête du script
				var source_script=document.createElement('iframe');

				source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
				source_script.setAttribute('style', 'display:none;');
				//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
				source_script.src = scr_script ;

				document.body.appendChild(source_script);
				// Fin de la génération de l'iframe

				// fix for iframe bad content loading
				var f=document.getElementsByTagName("iframe");
				for(var i=0;i<f.length;i++){
					if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
					else f[i].src=f[i].src+"#";
				}

				//Ajout d'un évènement pour récupérer le contenu de l'iframe
				window.addEventListener('message', trait_ret_iframe, true);
			}
//-----------------------/\
var colorTxtFuncs = ['init', 'c', 'a', 'b', 'substr_count', 'd', 'toggle', 'getLanguage', 'getString', 'addColorButton', 'addColorPanel', 'togglePS', 'addSmilePanel', 'addSmToTxt', 'infoScript' ];

var colorTxt_script = document.createElement('script');
colorTxt_script.type = 'text/javascript';
colorTxt_script.text = 'if(window.colorTxt == undefined) {\n';
colorTxt_script.text += '  window.colorTxt = new Object();\n';

for (var i = 0; i < colorTxtFuncs.length; i++) {
	var colorTxtFunc = colorTxtFuncs[i];
	colorTxt_script.text += '  colorTxt.' + colorTxtFunc + ' = ' + eval(colorTxtFunc.toString()) + '\n';
};
colorTxt_script.text += '  colorTxt.init('+VERSION+');\n';
colorTxt_script.text += '}';
document.body.appendChild(colorTxt_script);
//-----------------------\/
	})

//-----------Safari installer------------\/
			var n = this;
			if (n.safari) { 
				if (!(document.getElementById('gsID'))) {
					var gsiSrc =n.safari.extension.baseURI;
					var headID = document.getElementsByTagName("head")[0];         
					var greaseScript = document.createElement('script');
					greaseScript.type = 'text/javascript';
					greaseScript.id = 'gsID';
					greaseScript.src = gsiSrc + 'js/grease_dialog.js';
					headID.appendChild(greaseScript);
				}
				if (!(document.getElementById('greaseSafari-installer'))) {
				//////////////////////////////////////////////////////////////////////////////////////////////////////
				//
				// DÉCLARATION SCRIPT NUMBER POUR SAFARI
				//
				//////////////////////////////////////////////////////////////////////////////////////////////////////
					var scpNum = "115675";
				//////////////////////////////////////////////////////////////////////////////////////////////////////
				 	var iframeSafariInstaller = document.createElement('iframe');
					var href = "http://userscripts.org/scripts/source/"+scpNum+".user.js";
					iframeSafariInstaller.name = 'greaseSafari-installer'+scpNum+'';
					iframeSafariInstaller.id = 'greaseSafari-installer';
					iframeSafariInstaller.src = n.safari.extension.baseURI + 'grease.html';
					document.body.appendChild(iframeSafariInstaller);

					iframeSafariInstaller.onload = function () {
					var data = {
							type: '.user.js',
							original: 'http://userscripts.org/scripts/review/'+scpNum+'',
							src: href
						};
						sendRequest(data, install_response, "NinjaKit.install");
					};
					var top = (window.innerHeight - 350) / 2;
					var left = (window.innerWidth - 500) / 2;
					iframeSafariInstaller.setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);display:none;z-index:90000;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');
				}
			}

function install_response(meta) {
	window.onmessage = function (evt) {
		if (evt.data.type === 'install') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'install',
					meta: meta
				}, installed_response);
			}
		} else if (evt.data.type === 'view_source') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'view_source',
					meta: meta
				});
			}
			installed_response();
		} else if (evt.data.type === 'cancel') {
			installed_response();
		} else if (evt.data.type === 'end') {
			installed_response();
		}
	};
}

function installed_response(meta) {
	document.body.removeChild(iframeSafariInstaller);
	iframeSafariInstaller = null;
}
//-----------Safari installer------------/\

}
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(fonctionGZA2){
		var documentGZA2=document,scriptGZA2=documentGZA2.createElement("script");
		scriptGZA2.type = "application/javascript";
		scriptGZA2.textContent = "("+fonctionGZA2.toString()+")()";
		(documentGZA2.body||documentGZA2.head||documentGZA2.documentElement).appendChild(scriptGZA2);
		scriptGZA2.parentNode.removeChild(scriptGZA2)
	})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	var NUMERO_SCRIPT	= "115675" ;

	/////////////////////////////////////////////////////////
	//
	// FONCTIONS
	//
	/////////////////////////////////////////////////////////

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}

	/////////////////////////////////////////////////////////
	//
	// PROGRAMME PRINCIPAL
	//
	/////////////////////////////////////////////////////////

	envoi_info();
	})
}
//-----------------------/\