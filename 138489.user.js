// ==UserScript==
// @name          ekşi duyuru giriş linki
// @description   direkt ekşi sözlük sub-etha şeysine yönlendiren link koyar
// @include       http://www.eksiduyuru.com/*

// ==/UserScript==

var links = document.getElementsByTagName( 'a' );
var element;

for ( var i = 0; i < links.length; i++ ) {

    element = links[ i ];

    if ( element.href.indexOf( "http://www.eksiduyuru.com/index.php?s=1" ) == 0 ||  element.href.indexOf( "index.php?s=1" ) == 0 ||  element.href.indexOf( "/index.php?s=1" ) == 0 ) {

        element.href= "http://www.eksisozluk.com//sub_etha.asp?name=eksiduyuru";
    }
}