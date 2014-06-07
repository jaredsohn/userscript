// ==UserScript==
// @name           Zakonczenie zbierania puszek
// @namespace      Przypomnienie o zakonczeniu zbierania puszek
// @include        http://www.menelgame.pl/*
// ==/UserScript==


/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


var funkcja;
var wpis = document.getElementById('counter2').innerHTML;
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
	alert('Zbieranie puszek zostało zakończone!');
	clearInterval(funkcja);
}
