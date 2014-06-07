// ==UserScript==
// @name          Ikariam City View Modification
// @namespace     http://userscripts.org/users/nstroupr/
// @description   Modifies city view.
// @version       1.0.1
// @author        Nikolas Stroup
// @include       http://s*.*.ikariam.*/*
// ==/UserScript==

var mainview = document.getElementById('mainview');

if( !mainview.className.indexOf('phase') )
	mainview.className = 'phase30';