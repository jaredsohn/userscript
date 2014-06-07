// ==UserScript==
// @name           WarstormBot
// @namespace      warstorm
// @copyright      © Layane
// @license        Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
// @version        2.5
// @include        http://www.warstorm.com/challenges*
// @include        http://www.warstorm.com/battle/winnings*
// @include        http://www.warstorm.com/battle/view/*
// ==/UserScript==

//--------------------------------------------------------------------------------\\
// Configuracion

var THINK_INTERVAL = 5000;
var MAX_SELECTED_DESKS = 2;
var ORDERED_SQUADS = false;

//--------------------------------------------------------------------------------\\
// Constantes

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;			//Primer elemento
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		//Lista de elements
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		//terador de elementos
var version = '2.4';
var updateURL = 'http://userscripts.org/scripts/source/62241.user.js';
var webPage = 'http://userscripts.org/scripts/show/62241';
//--------------------------------------------------------------------------------\\

var maxDesk = GM_getValue("MAX_SELECTED_DESKS", MAX_SELECTED_DESKS);

GM_registerMenuCommand("[WS] Use 1 squad",  function (e) { changeMaxDesk(1); });
GM_registerMenuCommand("[WS] Use 2 squads", function (e) { changeMaxDesk(2); });
GM_registerMenuCommand("[WS] Use 3 squads", function (e) { changeMaxDesk(3); });
GM_registerMenuCommand("[WS] Use 4 squads", function (e) { changeMaxDesk(4); });
GM_registerMenuCommand("[WS] Use 5 squads", function (e) { changeMaxDesk(5); });
GM_registerMenuCommand("[WS] Use 6 squads", function (e) { changeMaxDesk(6); });

//--------------------------------------------------------------------------------\\
// Bot

if (document.location.href == 'http://www.warstorm.com/battle/winnings') {
	setTimeout("document.location.href  = 'http://www.warstorm.com/challenges'", THINK_INTERVAL);
	return;
}

if (document.location.href.match('^http:\/\/www\.warstorm\.com\/battle\/view\/*') != null) {
	setTimeout("document.location.href  = 'http://www.warstorm.com/challenges'", THINK_INTERVAL);
	return;
}


var idTimer = 0;
var idRemain = 0;
var remmainTime = 0;

function doThink () {

	if ($('automatch_limit') != null) {
		
		//Vemos el tiempo que queda
		var reg = new RegExp('[0-9]+', 'gi');		
		var res = $("automatch_limit").textContent.trim().match(reg);
		
		var minutes = 0;
		var seconds = 0;
		
		if (res.length == 3) {
			var minutes = convertInt(res[1]);
			var seconds = convertInt(res[2]);
		}
		else {
			var seconds = convertInt(res[1]);
		}
		
		var elapse = (minutes)*60000 + seconds*1000;
		
		remainTime = elapse;
		setInterval(showRemain,1000);
		
		if (idTimer != 0) clearInterval(idTimer);
		setTimeout('window.location.reload()', elapse);

		updScript();

		return;
	}
	
	if ($('automatch_redirecting').style.display == 'block' || $('automatch_looking_found').style.display == 'block') {
		fireEvent($('automatch_watch'), 'click');
		return;
	}
	
	if ($('automatch_squads').style.display == 'block') {
		GM_log("WsBot: Waiting queque...");

		if (ORDERED_SQUADS) {
			fireEvent($('ordered_squads_checkbox'), 'click');
		}

		var xdecks = $x('//div[@id="automatch_slider"]//img',XPList);
		
		var i = 1;
		 xdecks.forEach(function(deck) {
			if (i <= maxDesk) fireEvent(deck,'click');
			i++;
		});
		
		fireEvent($('automatch_confirm'), 'click');
		return;
	}
	
	if ($('automatch_welcome').style.display != 'none') {
		GM_log("WsBot: Selecting decks...");
		fireEvent($('automatch_enter'), 'click');
		return;
	}
}

function showRemain() {
	remainTime = remainTime - 1000;
	GM_log("WsBot [" +  (remainTime / 60000).toFixed(1) + "m]");
}

idTimer = setInterval(doThink, THINK_INTERVAL);
doThink();

//--------------------------------------------------------------------------------\\
// Funciones auxiliares

function $(p)  {
	return document.getElementById(p);
}

//Greasespot wiki snipets

function $x() {
	var x='',          // default values
	node=document,
	type=0,
	fix=true,
	i=0,
	toAr=function(xp){      // XPathResult to array
		var final=[], next;
		while(next=xp.iterateNext())
			final.push(next);
		return final
	},
	cur;
	while (cur=arguments[i++])      // argument handler
		switch(typeof cur) {
			case "string":x+=(x=='') ? cur : " | " + cur;continue;
			case "number":type=cur;continue;
			case "object":node=cur;continue;
			case "boolean":fix=cur;continue;
		}
	if (fix) {      // array conversion logic
		if (type==6) type=4;
		if (type==7) type=5;
	}
	if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
	if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
	var temp=document.evaluate(x,node,null,type,null); //evaluate!
if (fix)
	switch(type) {                              // automatically return special type
		case 1:return temp.numberValue;
		case 2:return temp.stringValue;
		case 3:return temp.booleanValue;
		case 8:return temp.singleNodeValue;
		case 9:return temp.singleNodeValue;
	}
	return fix ? toAr(temp) : temp;
}

// simple event firing function
// http://jehiah.cz/archive/firing-javascript-events-properly
function fireEvent(element,event){
    if (document.createEventObject){
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}

function convertInt(p) {
	if (p) {
		return parseInt(p);
	}
	return 0;
}

function changeMaxDesk(n) {
	GM_setValue("MAX_SELECTED_DESKS", n);
	maxDesk = n;
}

//update script (by Richard Gibson, changed by ms99)
function updScript() {
	if (!GM_getValue) return;
	GM_xmlhttpRequest({
		method: 'GET',
		url: updateURL + '?source', //don't increase the 'installed' count; just checking
		onload: function(result) {
			if (result.status != 200) return;
			if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
			nv = RegExp.$1;
			if (nv == TB3O.version) {
				return;
			} else if (nv < TB3O.version) {
				alert('You may have a beta version (v' + version + ') ?!');
				return;
			} else if (window.confirm('A new version of the script is available (v ' + nv + ')!\n\nUpdate script now ?\n')) window.location.href = webPage;
		}});
};