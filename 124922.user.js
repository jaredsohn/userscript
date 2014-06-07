// Version 1.5 - 2012.02.02. - Cs - 12:34:56
// Copyright 2011 - fgzita
//
// ==UserScript==
// @name		Zeroo szamlalo elindulas jelzo
// @namespace	Zeroo game
// @description	Jelez, ha lehet csokkenteni
// @include	http://www.zeroo.hu/index*
// ==/UserScript==

$ = unsafeWindow.jQuery;
var jel = document.getElementById('countdownbutton').style.display;
if (jel == 'block') { alert("          ----->   E L I N D U L T !!!   <-----") };
var sec = Math.floor(Math.random()*10+10);
setTimeout(function() { document.location.reload(); } , sec * 1000);
