// ==UserScript==
// @name           NZB Preset Searches
// @namespace      http://userscripts.org/users/156689
// @description    Adds a set of predifined searches to NZBIndex.nl
// @include        http://www.nzbindex.nl/search/*
// @include        http://www.nzbindex.nl/*
// ==/UserScript==

var links = document.createElement('div');

links.innerHTML = '<a href="http://nzbindex.nl/search/?q=&age=500&max=250&g[]=76&g[]=507&g[]=678&g[]=81&g[]=508&g[]=510&sort=agedesc&minsize=&maxsize=&poster=&nfo=&hidecross=1&complete=1&hidespam=0&hidespam=1&more=1">eBooks</a>' +
	'&nbsp;<a target="_blank" href="http://nzbindex.nl/rss/?g[]=76&g[]=507&g[]=678&g[]=81&g[]=508&g[]=510&age=500&sort=agedesc&complete=1&hidecross=1&max=250&more=1">(RSS)</a>' +
	' - ' +
	'<a href="http://nzbindex.nl/search/?q=&age=500&max=250&g[]=68&g[]=500&g[]=167&g[]=169&g[]=555&g[]=556&g[]=557&sort=sizedesc&minsize=&maxsize=&poster=&nfo=&hidecross=1&complete=1&hidespam=0&hidespam=1&more=1">Tunes</a>' +
	'&nbsp;<a target="_blank" href="http://nzbindex.nl/rss/?g[]=68&g[]=500&g[]=167&g[]=169&g[]=555&g[]=556&g[]=557&age=500&sort=agedesc&complete=1&hidecross=1&max=250&more=1">(RSS)</a>' +
	' - ' +
	'<a href="http://nzbindex.nl/search/?q=&age=500&max=250&g[]=16&g[]=472&g[]=487&g[]=490&g[]=54&g[]=493&g[]=495&g[]=66&g[]=499&g[]=69&g[]=642&g[]=444&g[]=117&g[]=123&g[]=122&g[]=125&g[]=150&g[]=152&g[]=741&g[]=537&sort=agedesc&minsize=500&maxsize=&poster=&nfo=&hidecross=1&complete=1&hidespam=0&hidespam=1&more=1">Movies</a>' +
	'&nbsp;<a target="_blank" href="http://nzbindex.nl/rss/?g[]=16&g[]=472&g[]=487&g[]=490&g[]=54&g[]=493&g[]=495&g[]=66&g[]=499&g[]=69&g[]=642&g[]=444&g[]=117&g[]=123&g[]=122&g[]=125&g[]=150&g[]=152&g[]=741&g[]=537&age=500&sort=agedesc&minsize=500&complete=1&hidecross=1&max=250&more=1">(RSS)</a>' +
	' - ' +
	'<a href="http://www.nzbindex.nl/search/?q=&age=500&max=250&g[]=12&g[]=61&g[]=60&g[]=90&g[]=514&g[]=86&g[]=88&g[]=515&g[]=744&g[]=756&g[]=755&g[]=747&g[]=87&g[]=525&g[]=129&g[]=443&g[]=153&g[]=547&g[]=193&g[]=195&g[]=736&g[]=197&g[]=672&g[]=200&g[]=199&g[]=748&g[]=730&g[]=683&g[]=745&g[]=578&g[]=724&g[]=746&g[]=680&g[]=384&g[]=429&sort=sizedesc&minsize=50&maxsize=&poster=&nfo=&hidecross=0&complete=1&hidespam=0&hidespam=1&more=1">Porn</a>' +
	'&nbsp;<a target="_blank" href="http://www.nzbindex.nl/rss/?g[]=12&g[]=61&g[]=60&g[]=90&g[]=514&g[]=86&g[]=88&g[]=515&g[]=744&g[]=756&g[]=755&g[]=747&g[]=87&g[]=525&g[]=129&g[]=443&g[]=153&g[]=547&g[]=193&g[]=195&age=500&sort=sizedesc&minsize=50&complete=1&hidecross=0&max=250&more=1">(RSS)</a>' +
	'';

//	Template
//	'<a href="">Porn</a>' +
//	'&nbsp;<a target="_blank" href="">(RSS)</a>' +
//	' - ' +

// insert it before the menu
var menu = document.getElementById( 'advanced' );
menu.parentNode.insertBefore( links, menu );