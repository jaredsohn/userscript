// ==UserScript==
// @name 		PennerGame Profile
// @description 		Zeigt schlaues Zeug im Profil an (Pennergame Profile Script für pennergame 4.0)
// @namespace 		http://userscripts.org/scripts/show/64556
// @version 		2.1.1
// @include			http://*.pennergame.de/*
// @exclude			http://board.pennergame.de/*
// @exclude			http://*.pennergame.de/logout/*
// @exclude			http://*.pennergame.de/login/*
// @exclude			http://*.pennergame.de/logout/*
// @exclude			http://*.pennergame.de/
// @exclude			http://dontknow.me/*
// ==/UserScript==

/*
Pennergame Profile: GreaseMonkey Script
Copyright (c) 2009, null
Released under the BEERWARE license

1. TODO
1.a) Really nice to have
- Wut-Warnung
1.b) Action-Links
- Waschen auf 100%
- Betrinken auf 2.5 (evtl. mit Plunder), w. m. mit dyn. Bier-Kauf
- Essen (w. m. mit dyn Brot-Kauf)
- Plunder Wechseln
- 10min Sammeln (oder 1h bei Konz)
1.c) Ideas
- Bande: neuer Shoutbox/Forum-Eintrag-Warner
- nichts anzeigen bei 503-response
- BK-Warnung
- Angriff-Warnung
- Warnung bei BK und nicht max ATT/DEF
- mark current page in forum/shoutbox
1.d) Improvements
- check sammeln not available
- return to last page after sammeln
- rewrite pennername if angriff-captcha failed

2. DONE
2.a) Must have
- Sauberkeit
- Spenden
- ATT/DEF (Logos)
- Plunder: Details
- Haustier (Stats)
2.b) Really nice to have
- Waffe
- Eigenheim
- Weiterleitungs-Pause auf 0 (bei PG-internen Links)
2.c)
- Alles Geld in BK einzahlen
2.d) Settings
- Move around, saved
- collapse button
- Funktionen ausschalten, saved

3. Open Questions/Problems

4. code-snippets
*/

//resource vars
var pgp_Resources = new Object();
pgp_Resources['url_H'] = 'http://www.pennergame.de/';
pgp_Resources['url_B'] = 'http://berlin.pennergame.de/';
pgp_Resources['url_K'] = 'http://koeln.pennergame.de/';
pgp_Resources['url_M'] = 'http://muenchen.pennergame.de/';;
pgp_Resources['overview_H'] = 'http://www.pennergame.de/overview/';
pgp_Resources['overview_B'] = 'http://berlin.pennergame.de/overview/';
pgp_Resources['overview_K'] = 'http://koeln.pennergame.de/overview/';
pgp_Resources['overview_M'] = 'http://muenchen.pennergame.de/overview/';
pgp_Resources['stockplunder_H'] = 'http://www.pennergame.de/stock/plunder/';
pgp_Resources['stockplunder_B'] = 'http://berlin.pennergame.de/stock/plunder/';
pgp_Resources['stockplunder_K'] = 'http://koeln.pennergame.de/stock/plunder/';
pgp_Resources['stockplunder_M'] = 'http://muenchen.pennergame.de/stock/plunder/';
pgp_Resources['gang_H'] = 'http://www.pennergame.de/gang/';
pgp_Resources['gang_B'] = 'http://berlin.pennergame.de/gang/';
pgp_Resources['gang_K'] = 'http://koeln.pennergame.de/gang/';
pgp_Resources['gang_M'] = 'http://muenchen.pennergame.de/gang/';
pgp_Resources['activitesbottle_H'] = 'http://www.pennergame.de/activities/';
pgp_Resources['activitesbottle_B'] = 'http://berlin.pennergame.de/activities/';
pgp_Resources['activitesbottle_K'] = 'http://koeln.pennergame.de/activities/';
pgp_Resources['activitesbottle_M'] = 'http://muenchen.pennergame.de/activities/';
pgp_Resources['redirect_H'] = 'http://www.pennergame.de/redirect/';
pgp_Resources['redirect_B'] = 'http://berlin.pennergame.de/redirect/';
pgp_Resources['redirect_K'] = 'http://koeln.pennergame.de/redirect/';
pgp_Resources['redirect_M'] = 'http://muenchen.pennergame.de/redirect/';
pgp_Resources['einzahlen_H'] = 'http://www.pennergame.de/gang/cash/add/';
pgp_Resources['einzahlen_B'] = 'http://berlin.pennergame.de/gang/cash/add/';
pgp_Resources['einzahlen_K'] = 'http://koeln.pennergame.de/gang/cash/add/';
pgp_Resources['einzahlen_M'] = 'http://muenchen.pennergame.de/gang/cash/add/';
pgp_Resources['checksum_H'] = '5833';
pgp_Resources['checksum_B'] = '2980';
pgp_Resources['checksum_K'] = '5833';
pgp_Resources['checksum_M'] = '5833';
pgp_Resources['maxspenden_H'] = '50';
pgp_Resources['maxspenden_B'] = '20';
pgp_Resources['maxspenden_K'] = '50';
pgp_Resources['maxspenden_M'] = '50';

//mouse-move vars
var pgp_movedragok = false;
var pgp_movey,pgp_movex,pgp_moved,pgp_movedy,pgp_movedx;

//other vars
var pgp_IDcount = 0;
var pgp_location = '_H';
if(document.URL.indexOf('berlin.pennergame.de')!=-1){
	pgp_location = '_B';
}
else if(document.URL.indexOf('koeln.pennergame.de')!=-1){
	pgp_location = '_K';  
}
else if(document.URL.indexOf('muenchen.pennergame.de')!=-1){
	pgp_location = '_M';  
}

// START:	FUNCTIONS	*****************************************************************************
//Hamburg or Berlin?
function pgp_getResource(resource){
	return pgp_Resources[resource+pgp_location];
}

//var name for Hambur or Berlin
function pgp_getVar(varName){
	return varName+pgp_location;
}

//trim function
function pgp_trim(str) {
  // Erst führende, dann Abschließende Whitespaces entfernen
  // und das Ergebnis dieser Operationen zurückliefern
  return str.replace (/^\s+/, '').replace (/\s+$/, '');
}

//get checksum
function pgp_checksum(string)	{
	var checksum = 0;
	var checksumChar = 0;
	//checksum by charcode
	for(var i=0;i<string.length;i++)	{
		checksum+=parseInt(string.charAt(i));
	}
	//checksum by charcode
	for(var i=0;i<string.length;i++)	{
		checksumChar+=string.charCodeAt(i);
	}
	return checksum * checksumChar;
}

//common output function
function pgp_constructTR(oTR, label, value)	{
	oTR.innerHTML = '<td>'+label+'</td><td>'+value+'</td><td style="cursor:pointer;" id="pgp_hideTR_'+pgp_IDcount+'">X</td>';
	//add event handler
	document.getElementById('pgp_hideTR_'+pgp_IDcount).addEventListener('click', pgp_hide, false);
	//raise counter
	pgp_IDcount++;
}

//string search by substrings, leaving stringEnd away returns until end of string
function pgp_substringSearch(string, stringStart, stringEnd, bIncluding){
	//opt params
	if(arguments.length<4)	bIncluding=false;
	var start = string.indexOf(stringStart) + stringStart.length;
	if(arguments.length<3)	{
		var end = string.length-1;
	} else {
		var end = string.indexOf(stringEnd, start);
		if(bIncluding)	end+=stringEnd.length;
	}
	if(bIncluding)	start-=stringStart.length;
	return string.substring(start, end);
}

//cuts substring out of string, returns new string
function pgp_substringCutOut(string, substring)	{
	if(string.indexOf(substring)!=-1)	{
		return string.substring(0, string.indexOf(substring)) + string.substring(string.indexOf(substring)+substring.length);
	}	else	{
		return string;
	}
}

// START:	MOVE-FUNCTIONS
function pgp_mousedown(e){
	var target = document.getElementById('pgp_SpanLay');
	if (target.className == "pgp_dragclass"){
//		if (window.opera){
//			document.getElementById("Q").focus();
//		}
		pgp_movedragok = true;
//		target.style.zIndex = n++;
		pgp_moved = target;
		pgp_movedx = parseInt(target.style.left+0);
		pgp_movedy = parseInt(target.style.top+0);
		pgp_movex = e.clientX;
		pgp_movey = e.clientY;
		document.addEventListener('mousemove', pgp_mousemove, false);
		return false;
	}
}

function pgp_mouseup(e){
	pgp_movedragok = false;
	document.removeEventListener('mousemove', pgp_mousemove, false);
	//save values
	GM_setValue(pgp_getVar('layTop'), parseInt(pgp_moved.style.top));
	GM_setValue(pgp_getVar('layLeft'), parseInt(pgp_moved.style.left));
}

function pgp_mousemove(e){
	if (!e) e = window.event;
	if (pgp_movedragok){
		pgp_moved.style.top  = pgp_movedy + e.clientY - pgp_movey + "px";
		pgp_moved.style.left = pgp_movedx + e.clientX - pgp_movex + "px";
		return false;
	}
}

//collapse display
function pgp_showAll(e)	{
	//get next TR
	var aTR = document.getElementById('pgp_TRheader').parentNode.getElementsByTagName("tr");
	//change visibility of all but 1st
	for(var i=1;i<aTR.length;i++)	{
		//save visibility
		GM_setValue(pgp_getVar(aTR[i].id), true);
	}
	//reload & write all data
	pgp_fWriteAll();
}

//show element
function pgp_show(id)	{
	document.getElementById(id).style.visibility = 'visible';
}

//hide element
function pgp_hide(ev)	{
	var oNode;
	if (!ev) var ev = window.event;
	if (ev.target) oNode = ev.target;
	else if (ev.srcElement) oNode = ev.srcElement;
	oNode = oNode.parentNode;
	oNode.style.visibility = 'collapse';
	//save visibility
	GM_setValue(pgp_getVar(oNode.id), false);
}
// END:		MOVE-FUNCTIONS

//wrapper for GM_xmlhttpRequest, avoids relaoding current url
function pgp_GM_xmlhttpRequestWrapper(resource, oFunction){
	if(document.URL==resource)	{
		//avoid re-loading current page
		oFunction(document.documentElement.innerHTML);
	} else {
		GM_xmlhttpRequest({
			method: 'GET',
			url: resource,
			onload: function(responseDetails){ oFunction(responseDetails.responseText) }
		});
	}
}

//eval gang-data
var pgp_fEvalGang = function(responseText){
	//evaluate gang-id
	var gang = pgp_substringSearch(responseText, '/profil/bande:', '/');
	var checksum = pgp_checksum(gang);
	//do nothing if not in good company ;-)
	if(!checksum==pgp_getResource('checksum')){	return false;	}
	//check WiWi
	if(responseText.indexOf('Wirtschaftswunder ist aktiv!')!=-1)	{
		var th = document.getElementById('pgp_THinfo');
		th.style.backgroundColor=pgp_layTHBGColor_wiwu;
		th.innerHTML='WiWu aktiv!';
	}
	//show
	document.getElementById('pgp_SpanLay').style.display='';
};

//write overview-data
var pgp_fWriteOverview = function(responseText){
	//write Sauberkeit
	if(GM_getValue(pgp_getVar('pgp_TRoverviewSauber'), true))	{
		var sauber = pgp_substringSearch(responseText, 'Sauberkeit: ', '%');
		pgp_constructTR(document.getElementById('pgp_TRoverviewSauber'), 'Sauberkeit:', sauber+'%');
		pgp_show('pgp_TRoverviewSauber');
	}
	//write Spenden
	if(GM_getValue(pgp_getVar('pgp_TRoverviewSpenden'), true))	{
		var spenden = pgp_substringSearch(responseText, 'Du hast heute ', ' Spenden');
		pgp_constructTR(document.getElementById('pgp_TRoverviewSpenden'), 'Spenden:', spenden+'/'+pgp_getResource('maxspenden'));
		pgp_show('pgp_TRoverviewSpenden');
	}
	//write Waffe
	if(GM_getValue(pgp_getVar('pgp_TRoverviewWaffe'), true))	{
		var content = pgp_substringSearch(responseText, '<h4>Deine Waffe</h4>');
		var name = pgp_substringSearch(content, '<li>', '</li>');
		var content = pgp_substringSearch(content, '<span');
		var detail = pgp_substringSearch(content, '>', '</span>');
		pgp_constructTR(document.getElementById('pgp_TRoverviewWaffe'), name, 'ATT'+detail);
		pgp_show('pgp_TRoverviewWaffe');
	}
	//write Eigenheim
	if(GM_getValue(pgp_getVar('pgp_TRoverviewEH'), true))	{
		var content = pgp_substringSearch(responseText, '<h4>Dein Eigenheim</h4>');
		var name = pgp_substringSearch(content, '<li>', '</li>');
		var content = pgp_substringSearch(content, '<span');
		var detail = pgp_substringSearch(content, '>', '</span>');
		pgp_constructTR(document.getElementById('pgp_TRoverviewEH'), name, 'DEF'+detail);
		pgp_show('pgp_TRoverviewEH');
	}
	//write ATT+DEF
	if(GM_getValue(pgp_getVar('pgp_TRoverviewAttDef'), true))	{
		var content = pgp_substringSearch(responseText, 'ATT:');
		content = pgp_substringSearch(content, '>');
		content = pgp_substringSearch(content, '>');
		var att = pgp_substringSearch(content, '>', '<');
		content = pgp_substringSearch(content, 'DEF:');
		content = pgp_substringSearch(content, '>');
		content = pgp_substringSearch(content, '>');
		var def = pgp_substringSearch(content, '>', '<');
		var total = parseInt(att)+parseInt(def);
		pgp_constructTR(document.getElementById('pgp_TRoverviewAttDef'), '<img height="10" src="http://media.pennergame.de/img/att.png">+<img height="10" src="http://media.pennergame.de/img/def.png"/>:', att+'+'+def+'&nbsp;('+total+')');
		pgp_show('pgp_TRoverviewAttDef');
	}
	
	//write Haustier
	if(GM_getValue(pgp_getVar('pgp_TRoverviewTier'), true))	{
		var content = pgp_substringSearch(responseText, '<h4>Freunde zum Pennergame einladen</h4>');
		var nameHT = pgp_substringSearch(content, '<h4>', '</h4>');
		content = pgp_substringSearch(content, '<img');
		var imgHT = '<img src="' + pgp_substringSearch(content, 'src="', '"') + '" width="45" />'
		content = pgp_substringSearch(content, '<ul');
		var statsHT = '<ul>'+pgp_substringSearch(content, '>', '</ul>')+'</ul>';
		pgp_constructTR(document.getElementById('pgp_TRoverviewTier'), imgHT, '<span style="text-decoration:underline;">'+nameHT+'</span>'+statsHT);
		pgp_show('pgp_TRoverviewTier');
	}
}

//write stock-plunder-data
var pgp_fWriteStockPlunder = function(responseText){
	//write plunder
	if(GM_getValue(pgp_getVar('pgp_TRplunder'), true))	{
		var content = pgp_substringSearch(responseText, '<h3>Angelegt</h3>');
		var plunder = pgp_substringSearch(content, '<h4>', '</h4>');
		var plunder = plunder.split('> ');
		var plunderImg = plunder[0]+'>';
		var plunderTxt = plunder[1];
		var content = pgp_substringSearch(content, '</h4>');
		var stats = '<ul>'+pgp_substringSearch(content, '>', '</ul>')+'</ul>';
		pgp_constructTR(document.getElementById('pgp_TRplunder'), plunderImg, '<span style="text-decoration:underline;">'+plunderTxt+'</span>'+stats);
		pgp_show('pgp_TRplunder');
	}
};

//write activities-bottle-data
var pgp_fWriteActivitiesBottle = function(responseText){
	//write sammeln
	if(GM_getValue(pgp_getVar('pgp_TRoverviewSammeln'), true))	{
		//form-submit
		var formSammeln = pgp_substringSearch(responseText, 'Pfandflaschen sammeln:');
		formSammeln = pgp_substringSearch(formSammeln, '<form', '</form>');
		//get select
		formSammeln = pgp_substringSearch(formSammeln, '<select');
		var formSammeln = pgp_substringSearch(formSammeln, '<option', '</option>', true);
		formSammeln = '<form id="pgp_FormSammeln" method="get"><select id="pgp_SelSammeln">' + formSammeln + '</select>';
		formSammeln += '<span style="cursor:pointer;" id="pgp_GoSammeln">GO</span></form>';
		pgp_constructTR(document.getElementById('pgp_TRoverviewSammeln'), 'Sammeln:', formSammeln);
		document.getElementById('pgp_GoSammeln').addEventListener('click',pgp_fDoSammeln,false);
		pgp_show('pgp_TRoverviewSammeln');
	}
}

//check if sammeln-post execution
function pgp_fCheckSammeln()	{
	if(GM_getValue(pgp_getVar('doSammeln'),false))	{
		pgp_fDoSammeln();
	}
}

//START:	js-code for Sammeln
function pgp_fDoSammeln()	{
	//do post
	if(document.URL.indexOf(pgp_getResource('activitesbottle'))==-1)	{
		GM_setValue(pgp_getVar('doSammeln'),true);
		top.location.href=pgp_getResource('activitesbottle');
	} else	{
		GM_setValue(pgp_getVar('doSammeln'),false);
		document.getElementsByName('Submit2')[0].click();
	}
}
//END:		js-code for Sammeln

//write/show Bandenkasse einzahlen
var pgp_fWriteBKeinzahlen = function()	{
	//write sammeln
	if(GM_getValue(pgp_getVar('pgp_TReinzahlenBK'), true))	{
		//get current cash
		var cash = document.documentElement.innerHTML;
		cash = pgp_substringSearch(cash, 'Klicke hier, um zur Finanzübersicht zu kommen');
		cash = pgp_substringSearch(cash, '>', '<');
		cash = '€' + pgp_substringSearch(cash, '€', ',');
		pgp_constructTR(document.getElementById('pgp_TReinzahlenBK'), 'B-Kasse:', '<span id="pgp_AeinzahlenBK" style="cursor:pointer">'+cash+' einzahlen</span>');
		document.getElementById('pgp_AeinzahlenBK').addEventListener('click',pgp_fDoeinzahlenBK,false);
		pgp_show('pgp_TReinzahlenBK');
	}
}

//execute BK-einzahlen
function pgp_fDoeinzahlenBK()	{
	//get current cash
	var cash = document.documentElement.innerHTML;
	cash = pgp_substringSearch(cash, 'Klicke hier, um zur Finanzübersicht zu kommen');
	cash = pgp_substringSearch(cash, '>', '<');
	cash = pgp_substringSearch(cash, '€', ',').replace(/\./, '');
	GM_xmlhttpRequest({
		method: "post",
		url: pgp_getResource('einzahlen'),
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI('f_money='+cash+'&f_comment=&Submit=Einzahlen'),
		onload: function(responseDetails) { top.location.href=document.URL; }
	});
}


function pgp_fWriteAll()	{
	//show/write BK-einzahlen
	pgp_fWriteBKeinzahlen();
	
	// check for post sammeln
	pgp_fCheckSammeln();
	
	//write activites-bottle
	pgp_GM_xmlhttpRequestWrapper(pgp_getResource('activitesbottle'), pgp_fWriteActivitiesBottle);

	// write overview-content
	pgp_GM_xmlhttpRequestWrapper(pgp_getResource('overview'), pgp_fWriteOverview);

	// write plunder-content
	pgp_GM_xmlhttpRequestWrapper(pgp_getResource('stockplunder'), pgp_fWriteStockPlunder);
}

//redirect function
function pgp_redirect()	{
	var url = document.documentElement.innerHTML;
	url = pgp_substringSearch(url, 'http-equiv="refresh"');
	url = pgp_substringSearch(url, 'URL=', '"');
	//check for internal url
	if(url.indexOf(pgp_getResource('url'))==0)	{
		top.location.href=url;		
	}
}
// END:		FUNCTIONS	*****************************************************************************

//START:	specific site handling
//redirect site
if(document.URL.indexOf(pgp_getResource('redirect'))==0)	{
	pgp_redirect();
//normal sites
}	else	{
	//layout vars
	var pgp_layTop = GM_getValue(pgp_getVar('layTop'), '0');
	var pgp_layLeft = GM_getValue(pgp_getVar('layLeft'), '0');
	var pgp_layWidth = 250;
	var pgp_layBorderWidth = 0;
	var pgp_layBorderColor = 'black';
	var pgp_layBGColor = '#FFFFFF';
	var pgp_layTHBGColor = '#EEEEEE';
	var pgp_layTHBGColor_wiwu = '#000055';
	var pgp_layOpacity = 2.0;

	// write layout
	var pgp_layDiv = document.createElement('div');
	pgp_layDiv.innerHTML += '<span id="pgp_SpanLay" class="pgp_dragclass" style="z-index:999;display:none;position:absolute;top:'+pgp_layTop+'px;left:'+pgp_layLeft+'px;width:'+pgp_layWidth+'px;font-size:x-small;-moz-border-radius:20px;opacity:'+pgp_layOpacity+';border:'+pgp_layBorderWidth+'px solid '+pgp_layBorderColor+'; background-color:'+pgp_layBGColor+';padding:5px 5px 0px 5px;"><table style="width:100%;"><tr id="pgp_TRheader"><th id="pgp_THinfo" colspan="2" style="cursor:move;background-color:'+pgp_layTHBGColor+';color:white;">&nbsp;</th><th id="pgp_THsettings" style="background-color:'+pgp_layTHBGColor+';color:grey;"><span id="pgp_SPANcollapse" style="cursor:pointer;">&dArr;</span></th></tr><tr style="visibility:collapse;" id="pgp_TRoverviewSauber"/><tr style="visibility:collapse;" id="pgp_TRoverviewSammeln"/><tr style="visibility:collapse;" id="pgp_TReinzahlenBK"/><tr style="visibility:collapse;" id="pgp_TRoverviewSpenden"/><tr style="visibility:collapse;" id="pgp_TRoverviewAttDef"/><tr style="visibility:collapse;" id="pgp_TRoverviewWaffe"/><tr style="visibility:collapse;" id="pgp_TRoverviewEH"/><tr style="visibility:collapse;" id="pgp_TRoverviewTier"/><tr style="visibility:collapse;" id="pgp_TRplunder"/></table></span>';
	document.body.appendChild(pgp_layDiv);

	//register event-handlers
	document.getElementById('pgp_THinfo').addEventListener('mousedown', pgp_mousedown, false);
	document.getElementById('pgp_THinfo').addEventListener('mouseup', pgp_mouseup, false);
	document.getElementById('pgp_SPANcollapse').addEventListener('click', pgp_showAll, false);
	
	//load & write all
	pgp_fWriteAll();
	
	//eval gang-content
	pgp_GM_xmlhttpRequestWrapper(pgp_getResource('gang'), pgp_fEvalGang);
}
//END:		specific site handling