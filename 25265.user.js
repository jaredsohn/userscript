// ==UserScript==
// @name           Dead Awaken - Gavins Brains Market
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/*
// ==/UserScript==

 var swap = document.evaluate( "//li[b[a[contains( @href, 'sec=swap' )]]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

 var a = document.createElement( 'a' );
 a.setAttribute( 'href', '/game.php?sec=swap&scr=swapitems&itemId=10&page=1&r=13' );
 var b = document.createElement( 'b' );
 var li = document.createElement( 'li' );

 swap.parentNode.insertBefore( li, swap.nextSibling );
 li.appendChild( b );
 b.appendChild( a );
 a.appendChild( document.createTextNode('Gavins Brains Market') );