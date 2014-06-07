// ==UserScript==
// @name           Dead Awaken - Quick Attack Link
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/*
// ==/UserScript==

 var mall = document.evaluate( "//li[b[a[contains( @href, 'scr=mall' )]]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

 var a = document.createElement( 'a' );
 a.setAttribute( 'href', '/game.php?sec=fight&scr=mall&page=1&listLevel=0&listHealth=&listType=&sort=level&order=desc&r=94' );
 var b = document.createElement( 'b' );
 var li = document.createElement( 'li' );

 mall.parentNode.insertBefore( li, mall.nextSibling );
 li.appendChild( b );
 b.appendChild( a );
 a.appendChild( document.createTextNode('Quick Attack') );