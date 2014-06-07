// ==UserScript==
// @name           Metrobloggen - Resizing Editor
// @namespace      http://www.metrobloggen.se/codler
// @description    Resizing Editor
// @include        http://www.metrobloggen.se/*
// @include        http://metrobloggen.se/*
// ==/UserScript==

if(document.getElementById("body___Frame")) {
document.getElementById("body___Frame").height="340"; //Default:340
document.getElementById("body___Frame").width="525"; // Default:525
}