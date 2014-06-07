// ==UserScript==

// @name            PaulGraham.com Text Width
// @namespace       http://csaba.dsl.pipex.com/greasemonkey
// @description     Changes the width of the text table column
// @include         http://paulgraham.com/*
// @include         http://www.paulgraham.com/*

// ==/UserScript==

// Hacked from http://sharedobject.org/greasemonkey/paulgraham.user.js

var tables = document.getElementsByTagName("table");
for(var i=0; i<tables.length; i++)
{
    tables[i].removeAttribute("width")
}

var tds = document.getElementsByTagName("td");
for(var j=0; j<tds.length; j++)
{
    tds[j].removeAttribute("width")
}
