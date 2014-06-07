// ==UserScript==
// @name            Facepunch Title Destroyer
// @namespace       http://*.facepunch.com/
// @description     Makes large titles less annoying without removing them completely.
// @include         http://www.facepunch.com/*
// @include         http://facepunch.com/*
// ==/UserScript==

// Note: Modified version of http://userscripts.org/scripts/show/132534

var titles = document.getElementsByClassName( "usertitle" );

for ( var i in titles )
{
    var t = titles[i];
    var f = t.getElementsByTagName( "font" );
    for ( var j in f ) { f[j].size = ""; f[j].bold = "1"; }
}
