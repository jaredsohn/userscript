// ==UserScript==
// @name        Salon.com Remove Topic Links
// @version     1.0
// @author      Mike Jarvis, ripping off the fine work of Lukas Fragodt
// @namespace   lukas.fragodt.salon
// @description Removes category links from Salon.com articles.
// @include     http://www.salon.com/*
// ==/UserScript==


//Copyright (C) 2007.Mike Jarvis and contributor(s).
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

function $(id) {
    return document.getElementById( id );
}

function $x(p, context) {
    context = ( context ) ? context : document;
    var i, arr = [], xpr = document.evaluate( p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 

null);
    for ( i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

var ilinks = $x( '//a[@href[contains(.,"http://dir.salon.com/topics/")]]', $('article_body') );



//Replace all topic links with their innerHTML
ilinks.forEach( function( ilink ) {
    if(ilink.parentnode.parentnode.parentnode.id!="top_navbar"
    {
    	var ptext = document.createElement( 'span' );
	ptext.innerHTML = ilink.innerHTML;
	ilink.parentNode.insertBefore( ptext, ilink );
    	ilink.parentNode.removeChild( ilink );
    }
});