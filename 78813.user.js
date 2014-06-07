// ==UserScript==
// @name           DeleteStar
// @namespace      Creshh
// @description    Entfernt die blinkenden Sterne im Ogame Redesign.
// @include        http://*.ogame.de/game/index.php?page=*
// ==/UserScript==


function delete2() 	{
	document.getElementById('star2').style.visibility = 'hidden';
			}

window.setTimeout(delete2,100);


function delete1() 	{
	document.getElementById('star1').style.visibility = 'hidden';
			}

window.setTimeout(delete1,100);


function delete0() 	{
	document.getElementById('star').style.visibility = 'hidden';
			}

window.setTimeout(delete0,100);