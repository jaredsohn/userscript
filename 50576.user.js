// ==UserScript==
// @name           Ikariam MiniChat
// @namespace      http://userscripts.org/scripts/show/50576
// @description    Añade un chat a la izquierda.Hecho por ILuShIoN , si es ilegal (consultar foro ikariam) no usar.
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @version        2.00
// ==/UserScript==



var DEBUG=false;
var DEBUG2=false;

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var version= '2.00';
var limit=40; //Número de mensajes displayed - to be configurados
var dlurl = 'http://userscripts.org/scripts/source/50576.user.js';
var dataServer="http://ikachat.tittero.it/";
var m1 = "ILuShIoN"; var m2 = "ETCHALECO";	var m3 = "MEDICI";
var lang={
  it: {	'send': 'Enviar',		'sh': 'Vis./Nasc.',		'msg': 'Escribir un mensaje',	'swap': 'cambia',
  	  	'cpub': 'Chat Server',	'cally': 'Chat Alianza',	'new': 'Nueva version',		'get': 'installar',
  	  	'pass': 'Password per accedere all\'Ally Chat',	'set': 'Impostare',				'noch': 'password non cambiata',
  	  	'errr': 'Password alleanza errata, inserirla nell\'Ambasciata',					'mesg': 'Mensaje...',
  	  	'newp': 'Definire nuova password per l\'Ally Chat',
  	  	'oldp': 'Inserire la vecchia password',
  	  	'setp': 'Inserire la nuova password',
  	  	'gopt': '<u>System</u>---Impossibile identificar. Per favore, apri la pagina delle <a href="index.php?view=options">opzioni</a>.---end:0:0:1',
  	  	'chok': 'Password dell\'Ally Chat cambiata per tutti gli utenti l\'alleanza',
  	  	'errp': 'Errore - cliccare su "Mostra citta\'" e riaprire questa finestra',
  	  	'wrng': 'Vecchia password errata. Se l\'avete persa, scrivete a '+m1+m2+m3,
  	  	'putm': 'Inserire un messaggio',
  	  	'repo': 'Riportare il messaggio come inopportuno?\nViene segnalato ai Moderatori con il tuo nome',
  	  	'reok': 'Messaggio segnalato. Grazie'
  	  		},
  en: {	'send': 'Enviar',			'sh': 'Mostrar',		'msg': 'Escribir un mensaje',		'swap': 'cambiar',
  	  	'cpub': 'Server Chat',	'cally': 'Chat alianza',	'new': 'Nueva version',			'get': 'instalar',
  	  	'pass': 'Password para acceder al chat de la alianza',			'set': 'Insertar password.',					'noch': 'Password no cambiada.',
  	  	'errr': 'La password es incorrecta, selecciona una en la Embajada',						'mesg': 'Mensaje...',
  	  	'newp': 'Nueva password para el chat de la alianza',
  	  	'oldp': 'Inserta password antigua',
  	  	'setp': 'Inserta nueva password',
  	  	'gopt': '<u>Sistema</u>---No has sido identificado, abre <a href="index.php?view=options">opciones</a> y vuelve al chat,asi cogere tus datos.',
  	  	'chok': 'La pass de la alianza ha sido cambiada.',
  	  	'errp': 'Error - Haz click en "Mostrar ciudad" y recarga la pagina',
		'wrng': 'Password antigua invalida. Si la olvidaste, escribe a '+m1+m2+m3,
  	  	'putm': 'Escribe un mensaje.',
  	  	'repo': 'Reporta el mensaje.',
  	  	'reok': 'Mensaje reportado. Gracias.'
  	  		},
  fr: {	'send': '>>>',			'sh': 'Montrer/Cacher',	'msg': 'Ecrivez ici',			'swap': 'modifier',
  	  	'cpub': 'Serveur Chat', 'cally': 'Ally Chat',	'new': 'Nouvelle version',		'get': 'installer',
  	  	'pass': 'MdP pour le Chat de l\'Alliance',		'set': 'Entrer le MdP',	'noch': 'Pas de modification',
  	  	'errr': 'Acc&eacute;s interdit, veuillez entrer le mot de passe dans votre Ambassade',		'mesg': 'Message...',
  	  	'newp': 'Choisir un nouveau MdP pour la chat de l\'alliance',
  	  	'oldp': 'Entrez l\'ancien MdP',
  	  	'setp': 'Entrez le nouveau MdP',
  	  	'gopt': '<u>System</u>---Identification Impossible, SVP ouvrez la page des <a href="index.php?view=options">options</a>---end:0:0:1',
  	  	'chok': 'Toutes les membres de l\'alliance ont ce nouveau MdP pour l\'Ally Chat',
  	  	'errp': 'Erreur - clicquez sur "Montrer ville" pour recharger le Chat',
		'wrng': 'L\'ancien MdP n\'est pas correct. Si vous l\'avez perdu, contactez '+m1+m2+m3,
  	  	'putm': 'Ecrire un message',
  	  	'repo': 'Voulez-vous reporter ce message?\nIl sera signalez au Moderateurs avec votre nom.',
  	  	'reok': 'Fait. Merci pour votre signalation',
  	  		},
}

// -- Esta parte ha sido obtenida de "Ocean Fill" utilidad  GM 
// -- Autor: ILuShIoN

GM_addStyle("#city #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img252.imageshack.us/img252/5873/bgcontent1.jpg);text-align:left;}");
GM_addStyle("#city #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img252.imageshack.us/img252/3175/bgfooter1.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#island #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#island #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#worldmap_iso #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");
// -- End of "Ocean fill" part --

GM_addStyle("ul#chLi a { display: inline; color: #F00; font-size: 8pt;}");

getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
  	  // alert(all[e].className);
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};

function getIkaDomain(s) {
	// I must get XX - there are 4 cases
	// 1) sNN.XX.ikariam.com
	// 2) sNN.ikariam.com.XX
	// 3) sNN.ikariam.co.XX
	// 4) sNN.ikariam.XX
	var ss = s.toLowerCase();
	var spl = ss.split(".");
	// quick & dirty... :)
	return (spl[1]!='ikariam' ? spl[1] : spl[spl.length-1]);
}

function getIkaServer(s) {
	return s.toLowerCase().split(".")[0];
}

var domain = getIkaDomain(top.location.host);
var server = getIkaServer(top.location.host);

var local='en';
if (domain=='fr' || domain=='it') local=domain;
var serdom = server+domain;

// definiamo le label
var lblShowStatus = "ss"+serdom;
var lblUser = "u"+serdom;
var lblAlly = "a"+serdom;
var lblLatest = "l"+serdom;
var lblTypePass = "tp"+serdom;

var ikaver = findIkaVersion();

var showStatus = GM_getValue(lblShowStatus,'block');

var listParts = "";
var playerName = "";

// find username and allyname - if possible...
	var playerName = GM_getValue(lblUser,'');
	var playerAllay = GM_getValue(lblAlly,'');
	if (DEBUG2) alert("not 0.3.0");
	// at the end I have: GM_getValue(lblUser) = username; GM_getValue(lblAlly) = allyname 
	// getting data from options.
	if (document.getElementById('options')!=null) {
		var userdata = document.getElementById("options_userData");		
		var f = userdata.getElementsByTagName("input");
		for (var i=0; i<f.length; i++) {
			if (f[i].name=="name") {
				playerName = f[i].value;
				GM_setValue(lblUser, playerName);
			}
		}
	}

	// Prueva en la embajada
	// TODO: if someone exits from an alliance, he must be removed from the alliance itself
	if (document.getElementById('embassy')!=null) {
		// I'm in the embassy
		// If I've not joined any alliance...
		if (document.getElementById("embassyMenu")==null) {
			playerAllay = '-';
			GM_setValue(lblAlly, playerAllay);
		} else {
			// usuarios en la alianza
			var mainview = document.getElementById("mainview");		
			var content = getElementsByClass(mainview,"content")[0];
			var f = content.getElementsByTagName("td")[0];
			if (f.innerHTML="["+f.title+"]:") { // ridondante
				playerAllay = f.title;
				GM_setValue(lblAlly, playerAllay);
			}
		}
	}
	
	// 
	if (playerName=='') {
		if (DEBUG2) alert ("utente sconosciuto");
	}
	if (playerAllay=='') {
		playerAllay='-';
		if (DEBUG2) alert ("ally sconosciuta/nessuna");
	}

// yuppieeeee .... depurar algunos disparos. Si se lee aquí, ustedes son curiosos:)
if (DEBUG2) alert (GM_getValue(lblUser)+"/"+GM_getValue(lblAlly));
if (DEBUG) alert (1);

// no se establece
if (!GM_getValue(serdom))
	GM_setValue(serdom, '@PUBLIC');  

if (DEBUG2) alert(GM_getValue(serdom));

var su = document.createElement('img');
var giu = document.createElement('img');
var dop = document.createElement('img');
var lop = document.createElement('img');
var lcl = document.createElement('img');
var freccia = (showStatus=='none' ? giu : su);

// icons
lop.src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0D%00%00%00%0D%08%03%00%00%00E5%14N%00%00%00%07tIME%07%D9%03%1D%13%26%01%B6%8F%BCN%00%00%00%09pHYs%00%00%1E%C1%00%00%1E%C1'
	   +'%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%0FPLTE%80%80%80%C6%C6%C6%00%00%00%FF%FF%FFBBBx%92%06%C2%00%00%00%01tRNS%00%40%E6%D8f%00%00%009IDATx%DA%7D%8EQ%0A%000%08B%D3%ED'
	   +'%FEg%5E%CEQ%3F1A%E8%11f%11%83%205%90%2CD%8E%E9%A6k\'j%07n%89%3E%03.%D3%8B%7CHU%5D%E6%A3%18%1E%3C7%A1%00%AC%05Li%20%00%00%00%00IEND%AEB%60%82';
lcl.src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0D%00%00%00%0D%08%03%00%00%00E5%14N%00%00%00%07tIME%07%D9%03%1D%13%25%15%87x%3B%F0%00%00%00%09pHYs%00%00%1E%C1%00%00%1E%C1'
	   +'%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%0FPLTE%80%80%80%FF%FF%00%00%00%00%FF%FF%FFBBB%D7%94%01(%00%00%00%01tRNS%00%40%E6%D8f%00%00%005IDATx%DAc%60%C0%00%8C%20%80%E0'
	   +'011%C1%B9%8C%40%26%10%23x%0Cp%1E%23T%8E%11*%C5%02%02L0%1E3%B1%3C%90u%08%0B%19%19Q%1C%03%07%004%AB%00%A6%7F!%86%C2%00%00%00%00IEND%AEB%60%82';

giu.src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%09%08%03%00%00%00%D3%BA%26%1F%00%00%00%07tIME%07%D9%03%0F%16%12%0Af%AC%CB%CE%00%00%00%09pHYs%00%00%1E%C1%00%00'
       +'%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%06PLTE%00%00%00%00%C0%00n%9Dn%81%00%00%00%01tRNS%00%40%E6%D8f%00%00%00!IDATx%DAc%60%60%60%60%04%01%06%08%C0%CAfD%00%24'
       +'%0E%92%0C%A6%5E%06%24%26%90%03%26%01%0Cf%004%D3%BC_%3F%00%00%00%00IEND%AEB%60%82';
su.src ='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%09%08%03%00%00%00%D3%BA%26%1F%00%00%00%07tIME%07%D9%03%0F%16%16%23%40r%96%A6%00%00%00%09pHYs%00%00%1E%C1%00%00'
	   +'%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%06PLTE%00%00%00%C0%00%004%C8%2F%8F%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%25IDATx%DAc%60%00%01F%068%60ddDb%C28%8C%8Cp%0E'
	   +'%23%23%9C%C3%C8%88%C4AQ%8F%95%0D%00%09%F6%004%B7%C0a2%00%00%00%00IEND%AEB%60%82';
dop.src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%03%00%00%00E%8E%C6%FE%00%00%00%07tIME%07%D9%03%0F%17(%08%AC%C9%1E%AC%00%00%00%09pHYs%00%00%1E%C1%00%00%1E'
       +'%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09PLTE%80%80%80%CC%EE%AA%EE%CC%EEn%82r%20%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%40IDATx%DAu%D0A%0A%00%40%08%02%C0%F4%FF%8F'
       +'%DE%3D%95%95y%8A!%0C%8A%D00vHgt%C6%1C4%CEx%EC%B9%BE%1F%EC%BB(%2BJ%13%C2%E8%C5%88!%1C%7B%B6O%EF64%BF%EC%F6%00%B0)%00%D0%EE%E6%CE%A6%00%00%00%00IEND%AEB%60%82';

// we make the box
// TODO: on right-to-left writing it is not working well. Sorry for .co.il players :/
var title = (GM_getValue(serdom)=="@PUBLIC" ? lang[local]['cpub'] : lang[local]['cally']);
var color = (GM_getValue(serdom)=="@PUBLIC" ? "#ECE" : "#CEA");
var title;
var color;
var altro="";


if (GM_getValue(serdom)=="@PUBLIC") {
	title = lang[local]['cpub'];
	var alleanza = GM_getValue(serdom)+serdom;
	var tagpasswd = 'pass'+alleanza;
	var passwd = GM_getValue(lblTypePass,'0');
	var lucch = (passwd=='3' ? lcl.src : (passwd=='0' ? "" : lop.src));
	altro = '<img id="chLucchetto" src="'+ lucch + '" style=\"display: none; top: 6px; right: 15px; position: absolute;\" />';
	color = "#ECE";
} else {
	// TODO: put lock
	var alleanza = GM_getValue(serdom)+serdom;
	var tagpasswd = 'pass'+alleanza;
	var passwd = GM_getValue(lblTypePass);
	altro = '<img id="chLucchetto" src="'+(passwd!='3' ? lop.src : lcl.src) + '" style=\"display: block; top: 6px; right: 15px; position: absolute;\" />';
	// var altro="";
	title = lang[local]['cally'];
	color = "#CEA";
}
var baseElements = '<h3 class="header">';
    baseElements += '<span id="chAllayLink" style="text-align:left; left: 1em; position:absolute"><a href="javascript:void(0)" id="chCambia"><img id="chImgCambia" src="'+dop.src+'" alt="' + lang[local]['swap'] + '" border="0" style="padding-top: 2px; text-align: left; left:0px; border-left: 0px: margin-left:0px;" /></a></span>';
    baseElements += '<span id="chScriptName" style="text-align:center; overflow:auto;">'+title+'</span>';
    baseElements += '<span id="chIconify" style="right: 1em; position:absolute"><a href="#" id="chIconify"><img id="sugiu" src="'+freccia.src+'" alt="' + lang[local]['sh'] + '" border="0" style="padding-top:8px" /></a>'+altro+'</span>'    
    baseElements += '</h3><div id="chMessagesListBox" style="width:240px;height:145px; padding:1px 0;font-size:12px; margin-left: 6px; display:'+showStatus+'">';
    baseElements += '<div id="chMessagesList" style="height: 140px;overflow:auto;margin-right: 2em;border: 1px solid #CB9B6B; font-size:8pt; background-color:'+color+'; text-align:left;"></div></div>';
    baseElements += '<input type="text" name="chatbarText" id="chatbarText" value="'+lang[local]['mesg']+'" style="margin-left: 1em; margin-top: 0; margin-bottom:0; width:140px; font-size:9pt;"';
    baseElements += ' onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" ';
    baseElements += ' onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" />';
    baseElements += '<input type="button" class="button" id="chSendMessage" value="' + lang[local]['send'] + '" style="margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:1px" />\n';
    baseElements += '<div id="chNewVer" style="margin-left:1em"></div>';
    baseElements += '<div class="footer" />';
    baseElements += '<style>\n#chLi li { margin: 0px; }\na#chIconify, a#chCambia, #chNewVer a {text-align: left; display:inline; }\n</style>\n';

var dom = GM_getValue(serdom);

if (DEBUG) alert (20);
// function encode
function swapAlly() {
	// var dom = GM_getValue(serdom);
	// alert(serdom+":"+dom);
	if (dom=='@PUBLIC') {
		dom=playerAllay;
	}
	else {
		dom='@PUBLIC';
	}
	GM_setValue(serdom,dom);
	displayData("loading");
	window.setTimeout(getChatData,0,true);
	var title = (dom=="@PUBLIC" ? lang[local]['cpub'] : lang[local]['cally']);
	var color = (dom=="@PUBLIC" ? "#ECE" : "#CEA");
	var lucchetto = (dom=="@PUBLIC" ? "none" : "block");
	document.getElementById("chScriptName").innerHTML=title;
	document.getElementById("chMessagesList").style.backgroundColor=color;
	document.getElementById("chLucchetto").style.display=lucchetto;
}

// TODO: to be completed :)
function whereToShow() {
	if (document.getElementById('information')!=null &&
		document.getElementById('island')==null) return 'information';
	if (document.getElementById('buildingUpgrade')!=null) return 'buildingUpgrade';
	if (document.getElementById('infocontainer')!=null) return 'infocontainer';
	if (document.getElementById('backTo')!=null) return 'backTo';
	if (document.getElementById('viewMilitaryImperium')!=null) return 'viewMilitaryImperium';
	if (document.getElementById('viewDiplomacyImperium')!=null) return 'viewDiplomacyImperium';
	if (document.getElementById('viewResearchImperium')!=null) return 'viewResearchImperium';
	if (document.getElementById('viewCityImperium')!=null) return 'viewCityImperium';
	return null;
}

function reportMessage(id) {
	var urlReq = dataServer+'reportMessage.php?id='+id
			   + '&u=' + encodeURIComponent(GM_getValue(lblUser,''));
	// GM_log("getChatData: urlreq vale "+urlReq);
	// alert(urlReq);
 	GM_xmlhttpRequest( {
    	'method': 'GET',
    	'url': urlReq,
 		'headers': { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' },
    	'onload': function(responseDetails) { alert(lang[local]['reok']+"\n[tick:"+responseDetails.responseText+"]"); }
  	});
}

// asks asynchronously data to show
function getChatData(force) {
	if (GM_getValue(lblUser,'')=='') {
		displayData(lang[local]['gopt']);
		return;
	}
	if (whereToShow()==null) return;
	var alleanza = GM_getValue(serdom)+serdom;
	var tagpasswd = 'pass'+alleanza;
	var urlReq = dataServer+'getChatDataD.php?limit=' 
	           + limit 
			   + '&a=' + encodeURIComponent(alleanza) 
			   + '&p=' + encodeURIComponent(GM_getValue(tagpasswd,''));
	if (!force) urlReq += '&l=' + GM_getValue(lblLatest,'-1');
	// GM_log("getChatData: urlreq vale "+urlReq);
	// alert(urlReq);
 	GM_xmlhttpRequest( {
    	'method': 'GET',
    	'url': urlReq,
 		'headers': { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' },
    	'onload': function(responseDetails) { displayData(responseDetails.responseText); }
  	});
}

if (DEBUG) alert (30);
// sends asynchronously message to server, to save it. If it is possible... ;-)
function postChatData(message) {
	if (GM_getValue(lblUser,'')=='') {	
		getChatData(true);
		return;
	}

  var alleanza = GM_getValue(serdom)+serdom;
  var tagpasswd = 'pass'+alleanza;
  var postParam = 'n=' + encodeURIComponent(playerName) 
                + '&c=' + encodeURIComponent(message) 
  				+ '&a=' + encodeURIComponent(alleanza) 
  				+ '&p=' + encodeURIComponent(GM_getValue(tagpasswd,''));
  GM_xmlhttpRequest({
  	'method': 'POST',
    'url': dataServer+'sendChatDataC.php',
    'headers': { 'Content-type': 'application/x-www-form-urlencoded' },
    'data': postParam,
	'onload': function(res) { getChatData(true); }
  });
}

// sends asynchronously passwd to server, to save it. If it is possible... ;-)
// TODO: remove passwd from chat
function changeAllyPassword(oldp, newp) {
	var alleanza = GM_getValue(serdom)+serdom;
	var tagpasswd = 'pass'+alleanza;
	var urlReq = dataServer+'savePasswdC.php?' 
			   + 'a=' + encodeURIComponent(alleanza) 
			   + '&o=' + encodeURIComponent(oldp)
			   + '&n=' + encodeURIComponent(newp);

	// GM_log("changeAllyPassword: urlreq vale "+urlReq);
 	GM_xmlhttpRequest( {
    	'method': 'GET',
    	'url': urlReq,
 		'headers': { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' },
    	'onload': function(responseDetails) { displayChPassResult(responseDetails.responseText); }
  	});
}

if (DEBUG) alert (40);
// function called in case of save...
function chSendMessage() {
  var chMessage = document.getElementById("chatbarText");
  if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)
  	return alert(lang[local]['msg']);
  postChatData(chMessage.value);
}

function getNewVersion(zversion) {
	return lang[local]['new']+': '+zversion+' - <a href="'+dlurl+'">'+lang[local]['get']+'</a>';
}

// shows results of passwd save
function displayChPassResult(passText) {
	// alert("Ritorna: '"+passText+"'");
	passText = passText.substring(0,2);
	if (passText=='ok')
		alert(lang[local]['chok']);
	if (passText=='ko')
		alert(lang[local]['wrng']);
}

// finds game version (returns "0.3.0" or "0.3.1")
function findIkaVersion() {
	var gtool = document.getElementById("GF_toolbar");
	var cver = getElementsByClass(gtool, "version")[0];
	var iver = getElementsByClass(cver, "textLabel")[0].innerHTML;
	return iver;
}

// data decoder - *ORRIBILE* da rifare con REST o JSON
// TO BE REWRITE (needs "protocol" changement)
function displayData(chatText) {
  // GM_log("chatText: arriva [" + chatText + "]");
  if (chatText=='') return
  var results = chatText.split('---');
  var unordList = '<ul id="chLi">';
  // algoritmo TERRIBILE, TODO rivedere
  if (results.length > 2) {
  	for(i=0; i < results.length - 2; i=i+2) { //goes through the result one message at a time
  		if (trim(results[i])=="<u>System</u>" && trim(results[i+1])=="wrong password")
  			results[i+1]=lang[local]['errr'];
  		unordList += "<li><b>" + trim(results[i]) + "</b> " + results[i+1] + "</li>\n"; //inserts the new content into the page
    }
    unordList += '</ul>\n';
  }
  // arrivano (almeno) due valori: uno è la versione, l'altro è l'ultimo id dei messaggi.
  // Se l'id è maggiore dell'ultimo che l'utente ha visto, chiede la chatwin.
  // Serve a risparmiare traffico (sic!). Es: "end:0.9:2663:1"
  // un terzo dato indica se il risultato (ally chat) era coperto da password:
  // 0=server chat; 1=ally no pass; 2=ally+passwd err; 3=ally+passwd ok
  var otherData = results[results.length-1].split(':');
  zversion = otherData[1];
  // TODO: finire qui la gestione della chiavetta
  var tipopass=otherData[3];
  // alert(dom+":"+tipopass);
  if (tipopass!=null && dom!="@PUBLIC" && dom!=undefined) GM_setValue(lblTypePass,tipopass);
  // TODO: qui sappiamo se la chat ha una passwd o no
  
  if(document.getElementById('ikachat') == null) {
    var divContainer = document.createElement('div');
    divContainer.setAttribute('id','ikachat');
    divContainer.innerHTML = baseElements;
    document.getElementById(whereToShow()).appendChild(divContainer);
    document.getElementById('chMessagesList').appendChild(document.createElement("p"));
  }
  var chl = document.getElementById('chMessagesList');
  if (otherData.length==1) unordList = "<div align='center'>"+otherData+"</div>";
  chl.firstChild.innerHTML = unordList;
  chl.scrollTop = chl.scrollHeight;
  // alert('zv:'+zversion+' v:'+version);
  if (zversion>version) 
  	document.getElementById('chNewVer').innerHTML=getNewVersion(zversion);

  if (otherData.length>2)
  	  GM_setValue(lblLatest,otherData[2]); 
}

// let's go straight
function startChat() {
  getChatData(false);
  // refresh every 12 seconds (er... server charge 20% lighter:-/)
  window.setTimeout(startChat, 12000);
}

// TODO review this in next release (move links on the left?)
if (document.getElementById("embassyMenu")!=null) {
	if (document.getElementById('embassy')!=null) setupPassword();
	if (document.getElementById('embassyEditAlly')!=null) setupAllyPassword();
}


// -------- Start -------
getChatData(true);
window.setTimeout(startChat, 10000);
// -----------------------

// add an eventlistener to send button
document.addEventListener('click',function(event) {
  var tid = event.target.id;
  if (tid=='chSendMessage') {
    var chMessage = document.getElementById("chatbarText");
    if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)
  	  return alert(lang[local]['putm']);
    postChatData(chMessage.value);
    document.getElementById("chatbarText").value = document.getElementById("chatbarText").defaultValue;
  } else 
  if(tid=='chIconify' || tid=='sugiu'){
    if(document.getElementById('chMessagesListBox').style.display != 'none') {
      document.getElementById('chMessagesListBox').style.display = 'none';
      document.getElementById('sugiu').src = giu.src
      window.setTimeout(GM_setValue, 0, lblShowStatus,'none');
      //document.getElementById('chIconify').innerHtml = "Show";
    } else {
      document.getElementById('chMessagesListBox').style.display = 'block';
      document.getElementById('sugiu').src = su.src
      var chl = document.getElementById('chMessagesList');
      chl.scrollTop = chl.scrollHeight;
      window.setTimeout(GM_setValue, 0, lblShowStatus,'block');
      //document.getElementById('chIconify').innerHtml = "Hide";
    }
  } else
  if (tid=='chCambia' || tid=='chImgCambia' ) {
  	  swapAlly();
  }
}, true);

//////////////////////Add Enter Button Functionality////////////////////
// thanks to Harilaos Kominis for suggestion
document.addEventListener('keyup', function (e) {
  	if(e.target.id == 'chatbarText' && e.keyCode == 13) {
  		chSendMessage();
  		document.getElementById('chatbarText').value = document.getElementById('chatbarText').defaultValue;
  		document.getElementById('chatbarText').blur();
  	}
}, false);


if (DEBUG) alert (50);

unsafeWindow.setChPasswd = function(elem,sd) {
	// alert(sd);
	if (sd=="-" || sd=="@PUBLIC" || sd=="" || sd==null) {
		alert(lang[local]['errp']);
		return;
	} 
    var alleanza = sd+serdom;
	var tagpasswd = 'pass'+alleanza;
	var e=prompt(lang[local]['set']); 
	if (!e || e=='')
		alert(lang[local]['noch']); 
	else {
		window.setTimeout(GM_setValue,0,tagpasswd,e);
	    // elem.innerHTML=e;
	    window.setTimeout(getChatData,200,true);
	}
}

// TODO: more clean
// report message function
unsafeWindow.rep = function(id) {
	if (confirm(lang[local]['repo']))
		window.setTimeout(reportMessage,200,id);
}

unsafeWindow.setNewPasswd = function(elem,sd) {
	// alert(sd);
	if (sd=="-" || sd=="@PUBLIC" || sd=="" || sd==null) {
		alert(lang[local]['errp']);
		return;
	} 
    var alleanza = sd+serdom;
	var tagpasswd = 'pass'+alleanza;
	var op = prompt(lang[local]['oldp']);
	var np = prompt(lang[local]['newp']);

	if (!np || np=='') 
		alert(lang[local]['noch']);
	else {
		window.setTimeout(GM_setValue,0,tagpasswd,np);		
		window.setTimeout(changeAllyPassword,100,op,np);
	}
}

if (DEBUG) alert (60);
function setGeneralPasswd(type, uma) {
	var descTable = document.getElementById('mainview').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
	var trOut = document.createElement("tr");
	
	var tdOut1 = document.createElement("td");
	tdOut1.setAttribute("class","desc");
	tdOut1.innerHTML = lang[local][uma];

	var tdOut2 = document.createElement("td");
	var hIn = document.createElement("input");
	hIn.setAttribute("type", "password");
	hIn.setAttribute("value", GM_getValue('chPasswd',''));
	// tdOut2.appendChild(hIn);

	var hSub = document.createElement("input");
	hSub.setAttribute("type", "button");
	hSub.setAttribute("value", "Ok");
	hSub.setAttribute("id", "chSetup");
	hSub.setAttribute("class", "button");

	var hLink = document.createElement("a");
	hLink.setAttribute("href", "javascript:void(0)");
	hLink.setAttribute("onClick", type+"(this,'"+GM_getValue(lblAlly)+"')");
	hLink.innerHTML = lang[local]['set'];
	tdOut2.appendChild(hLink);

	trOut.appendChild(tdOut1);
	trOut.appendChild(tdOut2);
	descTable.appendChild(trOut);
}

// called ony if we are in the embassy page
function setupPassword() {
	setGeneralPasswd('setChPasswd','pass');
}

// called only if we can setup ally tag ;)
function setupAllyPassword() {
	setGeneralPasswd('setNewPasswd','newp');
}

if (DEBUG) alert (70);

// merci beaucoup 
function cbf(e) {
	var m1 = "sampi";
	var m2 = "sa@gm";
	var m3 = "ail.com";
	alert("Ikariam MiniChat ver. "+version+" [14.May.09]\nhttp://ikariam.norsam.org/\nSamuele Manfrin (write me in it/en/fr), "+m1+m2+m3);
	alert( ""
		  +"1.00: it works worldwide :-) Added moderation (required by some Ikariam GAs). Better user/ally recognition. Enter key sends a message\n"
		  +"0.99: activated 0.3.1 compatibility (option page and Embassy page must be opened to be recognised); changed css for background\n"
		  +"0.98: moved (temporarily?) to new server\n"
		  +"0.97: leader can set ally password from Edit Alliance page; added lock icon; fixed wrong ally detection\n"
		  +"0.96: solved encoding bugs, island username errors, password change\n"
		  +"0.95: solved icon alignment, wrong username on spyed village, added msgs time; optimized server-side procedures\n"
	      +"0.94: solved island problems, chat disappearing; arrow preserved, special chars stripped\n"
	      +"0.93: enabled chat everywhere (still some layout problems)\n"
	      +"0.92: fixed icons and Alpha server new user problems\n"
	      +"0.91: fixed compatibility with Ikariam all-in-one embassy tool\n"
	      +"0.9: fixed bug about password save\n"
		  +"0.8: reduced data transit introducing id in metadata\n"
	      +"0.7: introduced password for ally chat\n"
	);
}

GM_registerMenuCommand('MiniChat Info',cbf);