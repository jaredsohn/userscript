// ==UserScript==
// @name           Teevee poser highlighter
// @namespace      Plasbot
// @description    Highlights fake Teevee poster on binsearch
// ==/UserScript==
var links = document.getElementsByTagName( 'a' );
var element;

for ( var i = 0; i < links.length; i++ ) {

    element = links[ i ];

    if ( element.href.indexOf( "teevee%404u.tv+%28teevee%29" ) > 0 ) {

        element.style.color = "#ff0000";
        element.style.backgroundColor = "#ffffcc";
    }
//	    if ( element.href.indexOf( "teevee+%3Ct4%404u.net%3E" ) > 0 ) {
//
//        element.style.color = "#ff0000";
//        element.style.backgroundColor = "#ffffcc";
//    }
}