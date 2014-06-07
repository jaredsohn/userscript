//
// ==UserScript==
// @name           NoRadio
// @namespace      hwmHome
// @include        http://www.heroeswm.ru/*
// ==/UserScript==

var el_array = document.getElementsByTagName('a');

for( var i = 0; i < el_array.length; i++ )
{
  var sinner = el_array[i];
  if (sinner.href.indexOf('radio.heroeswm.ru/play.php') >= 0)
  {
	sinner.parentNode.removeChild(sinner);
    break;
	//Voila
  }
}

// ==/UserScript==