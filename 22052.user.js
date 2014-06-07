// ==UserScript==
// @name           Dead Awaken - DP Market Link
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/*
// ==/UserScript==

 var swap = document.evaluate( "//li[b[a[contains( @href, 'sec=swap' )]]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

 var a = document.createElement( 'a' );
 a.setAttribute( 'href', '/game.php?sec=swap&scr=swapdonators&page=1&r=17' );
 var b = document.createElement( 'b' );
 var li = document.createElement( 'li' );

 swap.parentNode.insertBefore( li, swap.nextSibling );
 li.appendChild( b );
 b.appendChild( a );
 a.appendChild( document.createTextNode('Donator Pack Market') );