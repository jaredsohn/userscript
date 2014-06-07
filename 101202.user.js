// ==UserScript==
// @name           fucking-great-advice.ru
// @namespace      http://fucking-great-advice.ru
// @description    Lingvo prettifier for http://fucking-great-advice.ru/
// @include        http://fucking-great-advice.ru/*
// ==/UserScript==

var elements = [
        document.getElementsByTagName( 'h1' )[0],
        document.getElementById( 'advice' ),
        document.getElementById( 'advirt' )
    ],
    len = elements.length

while ( len-- )
    elements[ len ].innerHTML = elements[ len ].innerHTML.replace( /лять/g, 'лядь' )

