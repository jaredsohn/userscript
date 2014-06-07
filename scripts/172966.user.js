// ==UserScript==
// @name           ballp.it motto hider
// @namespace      ballpit
// @description    Hyper-trivial userscript to hide the "where hardons collide" motto on ballp.it.  You know, in case you ever want to view the page in public.
// @include        http://ballp.it/*
// @include        http://www.ballp.it/*
// @version        0.1
// @copyright      2013 Stumbledrunk Fumbleboom
// @license        BSD License, http://opensource.org/licenses/BSD-2-Clause.  COMMENSE THE JIGGLIN'
// @supported      Firefox 3.5+, Chrome 4+
// ==/UserScript==


var header = document.getElementById("header");

if (header != null) {
    header.style.backgroundImage = "none";
}


