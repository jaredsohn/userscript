// ==UserScript==
// @name        Wikipedia Inline Footnotes
// @version     1.1
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.wikipedia
// @description Shows footnotes inline when clicked.
// @include     http://*.wikipedia.org/wiki/*
// ==/UserScript==

//Author contact info: Lukas Fragodt <lukas@fragodt.com>

//Copyright (C) 2006. Lukas Fragodt and contributor(s).
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

//Grab all anchors and attach click handler if they are footnotes.

function $x(p, context) {
    context = ( context ) ? context : document;
    var i, arr = [], xpr = document.evaluate( p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

function $( id ) {
    return document.getElementById( id );
}

var anchors = $x( '//a[@href[contains(.,"#_note-")]]' );

anchors.forEach( function( anchor ) {
    anchor.addEventListener( 'click', get_footnote, false );
});

function get_footnote( event ) {
    var anchor = event.target;
    var note_id = /.*#(.*)/.exec( anchor.href )[1];
    var node = document.createElement( 'span' );
    node.innerHTML = "(" + $( note_id ).innerHTML + ")";
    anchor.parentNode.insertBefore( node, anchor.nextSibling );
    
    anchor.parentNode.removeChild( anchor );

    event.preventDefault();
    event.stopPropagation();
}
