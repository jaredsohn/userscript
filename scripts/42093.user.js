// ==UserScript==
// @name          Ppc layout enhancer
// @namespace     
// @include        http://www.tomshardware.com/fr/
// @include        http://www.tomshardware.com/fr/*
// @include        http://www.presence-pc.com/forum/*
// @include        http://www.presence-pc.com/forum/
// ==/UserScript==

document.getElementById('header-informations').innerHTML = "PPC !";


document.getElementsByTagName('head')[document.getElementsByTagName('head').length-1].innerHTML += "<link href=\"http://kodamas.net76.net/css/ppc.layout.enhancer.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />";