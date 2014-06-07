// ==UserScript==

// @name           PopSci.com Cleaner

// @namespace      http://www.popsci.com/
// @description    Cleans Popsci.com of ads and unnecessary junk.

// @include        *.popsci.com/*
// @version	   1.0
// @author	   Bleh7777
// @website	   http://blockheadbleh.googlepages.com/index.html
// @license	   http://sam.zoy.org/wtfpl/


// ==/UserScript==

window.addEventListener("load", function(e) {
	GM_addStyle("#header { background-position: 0px -121px;height: 115px}");
	var rem = new Array(6);
	rem[0] = 'header_row1';
	rem[1] = 'footer_ad';
	rem[2] = 'block-block-3';
	rem[3] = 'copy';
	rem[4] = 'rights';
	rem[5] = 'block-popsci-global_ofie';
	for (var i = 0; i < rem.length; i++)
	{
		var item = document.getElementById(rem[i]);
		if(item)
			item.parentNode.removeChild( item );
	}
	/*var remSp = new Array(3);
	remSp[0] = getElementsByStyleClass( 'ad' );
	remSp[1] = getElementsByStyleClass( 'bonnierlogo' );
	remSp[2] = getElementsByTitle( 'Drupal web development by pingVision' );
	for (var i = 0; i < remSp.length; i++)
	{
		for(var j = 0; j < remSp[i].length; j++)
			remSp[i][j].parentNode.removeChild( remSp[i][j] );
	}*/
	remove = getElementsByStyleClass( 'ad' );
	for (var i = 0; i < remove.length; i++)
		remove[i].parentNode.removeChild( remove[i] );
	remove = getElementsByStyleClass( 'bonnierlogo' );
	for (var i = 0; i < remove.length; i++)
		remove[i].parentNode.removeChild( remove[i] );
	remove = getElementsByTitle( 'Drupal web development by pingVision' );
	for (var i = 0; i < remove.length; i++)
		remove[i].parentNode.removeChild( remove[i] );
}, false);

function getElementsByStyleClass (className) {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	var elements = new Array();
	for (var e = 0; e < all.length; e++)
		if (all[e].className == className)
			elements[elements.length] = all[e];
	return elements;
}
function getElementsByTitle (title) {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	var elements = new Array();
	for (var e = 0; e < all.length; e++)
		if (all[e].title == title)
			elements[elements.length] = all[e];
	return elements;
}