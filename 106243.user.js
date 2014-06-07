// ==UserScript==
// @name           Cutthroat Ikariam
// @namespace      http://s*.ikariam.*/*
// @description    Make your city look like a pirate cove!
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// ==/UserScript==

   var URL= "http://nizarnizario.dr-ho.org/";
                          
GM_addStyle("#city #container .phase1                                           {background-image:url("+URL+"city.jpg)}");