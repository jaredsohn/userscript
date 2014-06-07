// ==UserScript==
// @name           Mall Run Link
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/*
// ==/UserScript==

var mall = document.evaluate( "//li[b[a[contains( @href, 'scr=mall' )]]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var a = document.createElement( 'a' );
a.setAttribute( 'href', '/game.php?sec=mall&scr=malldiff' );
var b = document.createElement( 'b' );
var li = document.createElement( 'li' );

mall.parentNode.insertBefore( li, mall.nextSibling );
li.appendChild( b );
b.appendChild( a );
a.appendChild( document.createTextNode('Mall Run') );