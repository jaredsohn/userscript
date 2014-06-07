// ==UserScript==
// @name 		   Google Reader Conpact
// @author 		   necenzurat
// @description    Google Reader Conpact
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// @version        1.2
// ==/UserScript==
(function() {
var style = document.createElement( "style" );
style.appendChild( document.createTextNode("@import url( https://raw.github.com/cognitivebits/Cognitive-Bits-Public-Scripts/master/GReaderCompactUserCSS.css );") );
document.getElementsByTagName( "body" ).item(0).appendChild( style );
})();