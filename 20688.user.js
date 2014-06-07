// ==UserScript==
// @name           Hack This Site! Level 11
// @author         scryes
// @namespace      all
// @description    Solves programming level 11 at www.hackthissite.org.
// @include        http://www.hackthissite.org/missions/prog/11/*
// @version        0.1
// @date           2008-01-19
// ==/UserScript==

var t = document.getElementsByTagName( 'td' )[14];
var d = document.getElementsByName( 'solution' )[0];

s = t.firstChild.nextSibling.nextSibling.nextSibling.data;
s = s.substr( 18 );
s = s.split( s[s.length-1] );

r = t.firstChild.nextSibling.nextSibling.nextSibling;
r = r.nextSibling.nextSibling.nextSibling.data;
r = r.substr( 7 );

for ( var i = 0; i < s.length - 1; i++ )
    d.value += String.fromCharCode(s[i] - r);