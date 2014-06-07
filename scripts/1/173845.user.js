// ==UserScript==
// @name         NucleaGame : changerColo
// @namespace    NucleaGame : changerColo
// @description	 Changer de colo avec les fleches haut et bas
// @author       Néo
// @version      0.3
// @date         2013-07-21 17h54
// @include      http://www.nucleagame.fr/uni1/game.php?page=*
// ==/UserScript==

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'changerColo',
	name: 'Changer de colo',
	version: '0.3',
	url: 'http://userscripts.org/scripts/source/173845.user.js',
	options: {}
}) );

var selectColo = getId('planetSelector');
var urlSrc = document.location.href.replace(/&cp=(\d+)/, '');

if
(
	!ansa.url.get.match(/page=galaxy/) 
	&& !ansa.url.get.match(/page=statistics/)
	&& !ansa.url.get.match(/page=messages/)
)
{
	document.addEventListener('keydown', changerPlanetesViaUpOrDown, false);
}
		
function changerPlanetesViaUpOrDown(event) // Permet de changer de planete quand la touche Left ou Right est pressé
{
	if(event.keyCode == 38) // Up
		if(selectColo != null && selectColo.selectedIndex > 0)
				 document.location.replace(urlSrc+'&cp='+selectColo.options[selectColo.selectedIndex-1].value);

	if(event.keyCode == 40) // Down
		if(selectColo != null && ( selectColo.selectedIndex < ( selectColo.length - 1) ) )
				 document.location.replace(urlSrc+'&cp='+selectColo.options[selectColo.selectedIndex+1].value);
}


