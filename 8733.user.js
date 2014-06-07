// ==UserScript==
// @name        Facebook Direct Links
// @version     1.1
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.com.facebook
// @description Changes Facebook referred links to direct links.
// @htmldesc    <h3>Changes Facebook referred links to direct links.<h3>
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// ==/UserScript==

//Author contact info: Lukas Fragodt <lukas@fragodt.com>

//Copyright (C) 2006. Lukas Fragodt.
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

//Version History
//1.1 - 2007-07-08 - Modified to use XPath.
//1.0 - 2007-04-22 - Original.

function $x(p, context) {
    context = ( context ) ? context : document;
    var i, arr = [], xpr = document.evaluate( p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

var anchors = $x( '//a[@href[contains(.,"share_redirect.php")]]' );
anchors.forEach( function( anchor ) {
    anchor.href = anchor.href.replace( /.*\/share_redirect\.php\?h=\w*&url=(.*)&.*/, unescape(RegExp.$1) );
});
