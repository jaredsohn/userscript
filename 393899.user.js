// ==UserScript==
// @name        pikaramenos
// @namespace   https://userscripts.org/users/89240
// @include     http://www.eldiario.es/
// @include     https://www.eldiario.es/
// @include     http://www.eldiario.es
// @include     https://www.eldiario.es
// @require     http://static1.eldiario.es/static/EDIDiario/js/lib/jquery-1.8.0.min.js
// @version     1
// @grant       none
// ==/UserScript==

var badDivs = $("div.md-news-main:contains('Pikara')");
badDivs = badDivs.add( $('a[href^="/micromachismos"]').parent().closest('div.md-news-main') );
badDivs = badDivs.add( $("div.md-advertisement") );

//badDivs.css( "border", "2px solid red" );

badDivs.remove ();
