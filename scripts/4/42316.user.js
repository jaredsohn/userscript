// ==UserScript==
// @name		sorteren2
// @description	sorteert het overzicht
// @author		mees
// @include	http://nl*.tribalwars.nl/game.php?*screen=overview_villages*
// ==/UserScript==

function c(){
	var a = document;
	
	if(window.frames.length>0) a = window.main.document;
	
	var b = a.createElement('script');
	
	b.type = 'text/javascript';
	b.src = 'http://legion.problemsolver.co.uk/SlowTarget/sort.js';
	
	a.getElementsByTagName('head')[0].appendChild(b);
}
	
c();