// ==UserScript==
// @date           2008-05-17
// @name			HWM: Auction tax
// @version		0.13
// @author		xo4yxa
// @namespace		http://hwm.xo4yxa.ru/js/auctiontax/
// @description    shows the cost of a lot without the tax
// @include        http://www.heroeswm.ru/auction_new_lot.php
// @include        http://www.lordswm.com/auction_new_lot.php
// ==/UserScript==

var url_cur = location.href ;

var e0 = getI( "//input[@name='price']" ).snapshotItem(0) ;

var e1 = document.createElement( 'span' );
e1.innerHTML =  0 ;
e1.style.fontWeight = 'bold' ;
e0.parentNode.insertBefore( e1 , e0.nextSibling ) ;

if( url_cur.match(/heroeswm\.ru/) )
{
	e0.parentNode.insertBefore( document.createTextNode( ' \u0441 \u0443\u0447\u0451\u0442\u043e\u043c \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0438: ' ) , e0.nextSibling ) ;
} else
{
	e0.parentNode.insertBefore( document.createTextNode( ' after tax paid: ' ) , e0.nextSibling ) ;
}

e0.addEventListener( "change", tax , true );
e0.addEventListener( "keyup", tax , true );
e0.addEventListener( "focus", tax , true );

function tax()
{
	e1.innerHTML = e0.value == 1 ? 1 : ( e0.value < 50 ?  Math.floor( e0.value * 0.99 ) : Math.round( e0.value * 0.99 ) ) ;
}

function getI( xpath )
{
	return document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}