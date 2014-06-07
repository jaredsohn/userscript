// ==UserScript==
// @name            Travian Quick Navigation v1.2b
// @author          mikrop
// @include 		http://s*.travian.*/berichte.php
// @include 		http://s*.travian.*/berichte.php?s=*
// @include 		http://s*.travian.*/berichte.php?newdid=*
// @include 		http://s*.travian.*/berichte.php?newdid=*&s=*		
// @include 		http://s*.travian.*/nachrichten.php
// @include 		http://s*.travian.*/nachrichten.php?s=*
// @include 		http://s*.travian.*/nachrichten.php?newdid=*
// @include 		http://s*.travian.*/nachrichten.php?newdid=*&s=*
// @version         Latest version 1.2b
// @description		        
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var URL = location.href;
var SERVER_NAME = getServerName();
var SEQUENCE = 20;

//---------------

function find(xpath, xpres) {
    var ret = document.evaluate(xpath, document, null, xpres, null);
    return (xpres) == XPFirst ? ret.singleNodeValue : ret;
}

/*
 * Vrací <sname>.travian<number>.<domain>/<*richte*>.*?newdid=*&s=<number>
 * nebo <sname>.travian<number>.<domain>/<*richte*>.*?s=<number> 
 */
function getFullServerName(){

	var re = /([\w]+[.]travian[\d]?.[\w]+\/[\w]+[.][\w]+)\?newdid=[\d]+[&]s=([\d]+)/i;
	var fsn = re.exec(URL);
		re = /([\w]+[.]travian[\d]?.[\w]+\/[\w]+[.][\w]+)\?s=([\d]+)/i;
	fsn = (fsn != null) ? fsn : re.exec(URL);
	return (fsn);
	
}

/*
 * Vrací <sname>.travian<number>.<domain>
 */
function getServerName() {
	var fullServerName = getFullServerName();
	var re = /([\w]+[.]travian[\d]?.[\w]+\/[\w]+[.][\w]+)/i;
	var serverName = (fullServerName != null) ? fullServerName : re.exec(URL);
	
	GM_log('serverName: ' + serverName[2]);
	
	return (serverName);
}	

/*
 * Vytvari navigaci
 * @min - minimalni referencni odkaz
 * @max - maximalni referencni odkaz
 * @ serverName regexArray
 */
function createNavigation(min, max) {
	
	var a = null;
	var navigation = window.document.createElement('span');
	var suffix = null;

	for (i=min; i<max; i+=10) {
		
		suffix = (i < (max - 10)) ? ' ' : null;
		
		if (i != SEQUENCE) {
		
			a = window.document.createElement('a');
			a.href = 'http://' + SERVER_NAME[1] + '?s=' + i;
			a.textContent = i + suffix;
			a.style.cursor = 'pointer';
			navigation.appendChild(a);
			
		}
		else {
			navigation.appendChild(document.createTextNode(i + suffix));
		}
		
	}	
	
	return (navigation);
	
}

function myNavigation() {
	
	var serverLen = SERVER_NAME.length;
	var navigation = null;
	
	var s = SERVER_NAME[2];
	SEQUENCE = (s != undefined) ? parseInt(s) : SEQUENCE;
	
	if (serverLen <= 2 || SEQUENCE < 20) {
		navigation = createNavigation(0, 50);
	} else {
		
		var min = (SEQUENCE - 20)
		var max = (SEQUENCE + 30);
		
		navigation = createNavigation(min, max);
		
	}	
	
	return (navigation);
	
}

(function() {

	var sampleXp = find("//form[@name='msg']/table/tbody", XPFirst);

	var chN = (location.href.indexOf('berichte.php') != -1) ? 2 : 4; // TODO: prepsat do metody  
	var parent = sampleXp.lastChild.childNodes[chN];
		parent.style.textAlign = 'center';
		parent.style.fontSize = 'x-small';

	var navigation = myNavigation(); 	

	var forward = parent.childNodes[1];
		forward.setAttribute('href', 'http://' + SERVER_NAME[1] + '?s=' + (SEQUENCE + 10));
	
	var back = parent.firstChild;
		back.setAttribute('href', 'http://' + SERVER_NAME[1] + '?s=' + (SEQUENCE - 10));
		back.parentNode.insertBefore(navigation, back.nextSibling);
	
})();
