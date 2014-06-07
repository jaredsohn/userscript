// ==UserScript==
// @name         NucleaGame : inGalaxy
// @namespace    NucleaGame : inGalaxy
// @description	 Modifications de la page galaxie
// @author       Benoit485
// @version      0.2
// @date         2013-09-21 18H45
// @include      http://www.nucleagame.fr/uni*/game.php?page=galaxy*
// ==/UserScript==

/*
var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'inGalaxy',
	name: 'Galaxie',
	version: '0.1',
	url: 'http://userscripts.org/scripts/source/167299.user.js',
	options: {}
}) );
*/

document.addEventListener('keypress', cursorEvent, true);
nextReady = true;

function cursorEvent(event) 
{	
	if(!nextReady) return;
	
	switch(event.keyCode)
	{
		case 37 : unsafeWindow.galaxy_submit('systemLeft'); break;
		case 39 : unsafeWindow.galaxy_submit('systemRight'); break;
		case 38 : unsafeWindow.galaxy_submit('galaxyRight'); break;
		case 40 : unsafeWindow.galaxy_submit('galaxyLeft'); break;
	}

	nextReady = false;
}


