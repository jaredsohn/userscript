// ==UserScript==
// @name           	Finya_Compact
// @namespace           http://www.finya.de/
// @description         finya tweaks: Restyle the blocks to have a more compact view
// @include        	http://www.finya.de/*
// @include        	http://*.finya.de/*
// @include        	http://finya.de/*
// @version        	1.1 $Id$
// @license		New BSD
// ==/UserScript==


/**
 * move top banner
 */
var adsElem = document.getElementById('ad-globalleaderboard');
if ( adsElem )
{
    adsElem.parentNode.removeChild(adsElem);
}

/**
  * move right banner 
  */
var adsElem = document.getElementById('ad-globalsky');
if ( adsElem )
{
    adsElem.parentNode.removeChild(adsElem);
}

/**
  * online list to the right, top
  */
var onlineList = document.getElementById('list-online');
if ( onlineList ) {
	onlineList.style.left = '795px';
	onlineList.style.position = 'absolute';
	onlineList.style.top = '-185px';
	onlineList.style.zIndex = '25';
}

var pgElem = document.getElementById('pgcontent');
if ( pgElem ) {
	pgElem.style.top = '-20px';
}

var item = document.getElementById('profile-content')
if ( item ) {
	item.style.position = 'relative';
	item.style.top = '-20px';
}

