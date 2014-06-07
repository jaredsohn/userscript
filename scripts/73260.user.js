// ==UserScript==
// @name           post-counts
// @namespace      http://userscripts.org/users/133663
// @description    Uses data from Fuuka archiver to display tripfriend post-counts
// @include        http://boards.4chan.org/jp/*
// @include        http://boards.4chan.org/a/*
// @include        http://boards.4chan.org/m/*
// @include        http://boards.4chan.org/tg/*
// ==/UserScript==

var board = /http:\/\/boards\.4chan\.org\/([^\/]+)/.exec(window.location.href)[1];
var easyurl = 'http://archive.easymodo.net/cgi-board.pl/' + board + '/reports/new-tripfriends';
var cookiekey = 'post-counts-' + board + '-dat';
var cookiekeyset = 'post-counts-' + board + '-set';
var arrposts = new Array();
var arrjoins = new Array();

function fetchpostcounts() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: easyurl,
		onload: function(response) {
			var triptable = new Array();
			triptable = response.responseText.split(/\<td\>/);
			for (var i = 11; i < triptable.length; i+=3){
				if (/\<span class="postertrip"\>(.+)\<\/span\>/.test(triptable[i])){
					var trip = /\<span class="postertrip"\>(.+)\<\/span\>/.exec(triptable[i])[1];
					arrjoins[trip] = /(\d{4})/.exec(triptable[i+1])[1];
					arrposts[trip] = /(\d+)/.exec(triptable[i+2])[1];
				}
			}
			var ctext = "";
			for (var j in arrposts) {
				ctext = ctext + "_t" + j + "_p" + arrposts[j] + "_j" + arrjoins[j] + "\n";
			}
			var timex = new Date().getDate();
			GM_setValue(cookiekey, ctext);
			GM_setValue(cookiekeyset, timex);
		}
	});
}

function cookietoarray() {
	var ctext = GM_getValue(cookiekey, false);
	if (!ctext){
		fetchpostcounts();
	} else {
		var timey = new Date();
		if (timey.getDate() != GM_getValue(cookiekeyset, 0)) {
			fetchpostcounts();
		} else {
			var sctext = new Array();
			sctext = ctext.split("\n");
			for (var j = 0; j < sctext.length-1; j++){
				var trip = /_t(.+)_p/.exec(sctext[j])[1];	
				arrposts[trip] = /_p(.+)_j/.exec(sctext[j])[1];
				arrjoins[trip] = /_j(.+)/.exec(sctext[j])[1];
			}
		}
	}
}

cookietoarray();

var trippers = new Array;
trippers = getElementsByAttribute(document,"span","class","postertrip");
for (var i in trippers){
	var addthis = document.createElement('span');
	if ((!arrjoins[trippers[i].innerHTML])||(arrjoins[trippers[i].innerHTML]>2009)||(arrposts[trippers[i].innerHTML]<500)) {
		addthis.innerHTML = '&nbsp;Newfriend';
		addthis.setAttribute('style','color: red;font-weight: bold');
	} else {
		addthis.innerHTML = '&nbsp;' + arrposts[trippers[i].innerHTML] + ' posts';
		addthis.setAttribute('style','color: black;font-weight: bold');
	}
	insertAfter(trippers[i].parentNode,addthis,trippers[i]);
}

// Generic code - I can't believe Javascript doesn't have this!
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
    }}} return arrReturnElements;
}
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}