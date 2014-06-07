// ==UserScript==
// @name         NucleaGame : changerColo
// @namespace    NucleaGame : changerColo
// @description	 Changer de colo avec les fleches haut et bas [NucleaGame's scripts string]
// @author       Benoit485
// @version      0.4
// @date         2013-09-21 19H00
// @include      http://www.nucleagame.fr/uni*/game.php
// @include      http://www.nucleagame.fr/uni*/game.php?cp=*
// @include      http://www.nucleagame.fr/uni*/game.php?page=*
// ==/UserScript==

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'changerColo',
	name: 'Changer de colo',
	version: '0.4',
	url: 'http://userscripts.org/scripts/source/167290.user.js',
	options: {}
}) );

var skipMoons = true;

var selectColo = getId('planetSelector');
if(skipMoons) var selectRemoveMoons = document.createElement('select');
else var selectRemoveMoons=selectColo;
var urlSrc = document.location.href.replace(/&cp=(\d+)/, '').replace(/\?cp=(\d+)/, '');
if(urlSrc.indexOf('?')>-1) urlSrc=urlSrc+'&'; else urlSrc=urlSrc+'?';

if
(
	!ansa.url.get.match(/page=galaxy/) 
	&& !ansa.url.get.match(/page=statistics/)
	&& !ansa.url.get.match(/page=messages/)
)
{
	document.addEventListener('keydown', changerPlanetesViaUpOrDown, false);
}

if(skipMoons)
{
	for(var i=0, j=selectColo.length; i<j; i++)
	{
		if(!selectColo.options[i].text.match(/\(Lune\)/) )
		{
			var option = document.createElement('option');
			option.text = selectColo.options[i].text;
			option.value = selectColo.options[i].value;
			if(selectColo.selectedIndex==i) option.selected=true;
			selectRemoveMoons.appendChild(option);
		}
	}
}
		
			
function changerPlanetesViaUpOrDown(event) // Permet de changer de planete quand la touche Left ou Right est pressé
{
	if(event.keyCode == 38) // Up
		if(selectRemoveMoons != null && selectRemoveMoons.selectedIndex > 0)
				 document.location.replace(urlSrc+'cp='+selectRemoveMoons.options[selectRemoveMoons.selectedIndex-1].value);

	if(event.keyCode == 40) // Down
		if(selectRemoveMoons != null && ( selectRemoveMoons.selectedIndex < ( selectRemoveMoons.length - 1) ) )
				 document.location.replace(urlSrc+'cp='+selectRemoveMoons.options[selectRemoveMoons.selectedIndex+1].value);
}


