// ==UserScript==
// @name           Zakonczenie ataku
// @namespace      Przypomnienie o zakonczeniu ataku
// @include        http://www.menelgame.pl/*
// @include        http://www.dossergame.co.uk/*
// ==/UserScript==


/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


var funkcja;
var wpis = document.getElementById('counter1').innerHTML;
if (wpis.match('-/-') || wpis.match('00:00'))
{
	return;
}

if (wpis.split(':').length == 3)
{
	var g = wpis.split(':')[0] * 3600;
	var m = wpis.split(':')[1] * 60;
	var s = wpis.split(':')[2] * 1;
	var czas = (g + m + s) * 1000;
} else {
	var m = wpis.split(':')[0] * 60;
	var s = wpis.split(':')[1] * 1;
	var czas = (m + s) * 1000;
}

funkcja = setInterval(test, czas);

function test()
{
	alert('Atak został zakończony!');
	clearInterval(funkcja);
}
