// searchobn.user.js
// version 1.0
// 2006-11-7
// Copyright (c) 2006, Eric Mariacher
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          Search Online Business Networking sites
// @namespace     http://mariacr.multimania.com/scripts
// @description	  Aggregate Searches from LinkedIn, OpenBC, Viaduc and ZoomInfo
// @include       http://search.live.com/*
// @version	  1.0
// ==/UserScript==
var searchString='zz';
var urls=[
	'http://www.linkedin.com/search?search=&sortCriteria=4&keywords=',
	'https://www.openbc.com/cgi-bin/search.fpl?op=usearch&universal=',
	'http://www.viaduc.com/recherche/resultat/?language=fr&searchBtn=Chercher&keywords=',
	'http://www.zoominfo.com/Search/PersonQuery.aspx?SearchType=simple&SearchBy=name&x=22&y=12&searchParameters='
];

var frameString='';

searchString=getSearchString().replace(' ','');
if(searchString.length>2) {
	// li_dbg("This is ZEVALUE I am looking for : "+searchString+'.['+searchString.length+'].');
	buildFrameSet();
}
// li_dbg(frameString);
outputToTab(frameString);

function outputToTab(str) {
	GM_openInTab("data:text/html;charset=UTF-8," + encodeURI(str));
}

function getSearchString(){
	var allinputs, thisElement; 
	allinputs = document.getElementsByTagName('input');
	for (var i = 0; i < allinputs.length; i++) {
		thisElement = allinputs[i];
		var id = thisElement.getAttribute("id");
		if(id=="q") {
			var zobi= thisElement.getAttribute("value").replace(' ','+');
			return zobi;
		} else {
		}
	}
	return '';
}

function buildFrameSet() {
	frameString = '<html><head><title>Biznet1 by Eric Mariacher</title><META content="Eric Mariacher" name=Author><META content="Eric Mariacher, LinkedIn, OpenBC, Viaduc, IBM, Logitech" name=KeyWords></head><frameset rows="';	
	for (var i = 0; i < urls.length; i++) {
		frameString = frameString.concat('10%,');
	}
	frameString = frameString.concat('1%">');
	
	for (var i = 0; i < urls.length; i++) {
		frameString = frameString.concat('<frame src="',urls[i],searchString,'">');
	}
	frameString = frameString.concat('<frame src="',advertise(),'"></frameset></html>');
}

function advertise() {
	var zeletter=searchString.substring(0,1);
	switch(zeletter) {
		case 'a': 
		case 'b': return 'http://www.viaduc.com/recherche/resultat/?language=fr&searchBtn=Chercher&keywords=Eric+Mariacher';
		case 'c': 
		case 'd': return 'https://www.openbc.com/cgi-bin/search.fpl?op=usearch&universal=Eric+Mariacher';
		case 'e': 
		case 'f': return 'http://www.zoominfo.com/Search/PersonQuery.aspx?SearchType=simple&SearchBy=name&x=22&y=12&searchParameters=Eric+Mariacher';
		case 'g': 
		case 'h': return 'http://www.technorati.com/search/Eric%20mariacher';
		case 'i': 
		case 'j': return 'http://www.google.ch/search?q=Eric+mariacher';
		case 'k': 
		case 'l': return 'http://search.yahoo.com/search?p=Eric+mariacher';
		case 'm': 
		case 'n': return 'http://www.ask.com/web?q=Eric+Mariacher';
		case 'o': 
		case 'p': return 'http://eric-mariacher.blogspot.com/';
		default: return 'http://www.linkedin.com/search?search=&sortCriteria=4&keywords=Eric+Mariacher';
	}
}

function li_dbg(str) {
	var date = new Date();
	GM_log(date+':'+str);
}



