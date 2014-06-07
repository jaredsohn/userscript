// ==UserScript==

// @name        LootersHelper

// @namespace   http://looters.ru/*

// @description Counts total stats on each character in pvp

// @include     http://looters.ru/pvp.php*

// @include	http://looters.ru/fight.php*

// @include	http://looters.ru/dungeon.php*

// @include	http://looters.ru/invasion.php?r=*&a=fight

// @include	http://looters.ru/invasion.php?r=*&a=*&tour=

// @include	http://looters.ru/event.php?r=*&a=fight

// @include	http://looters.ru/clanwars.php*

// @grant	none

// @version     1.02

// ==/UserScript==

	var snapStats = document.evaluate("//*[@class='b-content']//*[@class='black-inner']//span[@class='inner-btn-right']",

		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var numStatsOwn = 0;

	var numStatsFoe = 0;
	var numStats = 'Сумма статов (';


	for (var i=0; i <= snapStats.snapshotLength - 1; i++) {

		var elm = snapStats.snapshotItem(i);

		if (elm.textContent.indexOf('vs') != -1) {
			var temp = new Array();
			temp = elm.textContent.split(' ');
			numStatsOwn += temp[0].substr(1, temp[0].length - 1)*1;
			numStatsFoe += temp[2].substr(0, temp[2].length - 2)*1;
		}
	}


	numStats += numStatsOwn + ' vs ' + numStatsFoe + ')';
	
	var elmNewContent = document.createElement('p');

//	elmNewContent.appendChild(document.createTextNode('Сумма статов (127000 vs 256000)'));

	elmNewContent.appendChild(document.createTextNode(numStats));

	var elmContent = document.evaluate("//*[@class='b-content']",

		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	elmContent.parentNode.insertBefore(elmNewContent, elmContent);