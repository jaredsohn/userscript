// ==UserScript==
// @name           500px Stat Ratios
// @version        0.1
// @description    This script uses the Likes/Favorites/Comments counters to calculate some further statistics: the ratios with respect to the 'Views' counter (within the statistics box). This shall give you an idea how "effective" a photographer is with his profile.
// @copyright      BottleNick
// @include        http://500px.com/*
// @exclude        http://500px.com/photo/*
// @exclude        http://500px.com/fresh*
// @exclude        http://500px.com/popular
// @exclude        http://500px.com/editors
// @exclude        http://500px.com/upcoming
// @exclude        http://500px.com/stories
// @exclude        http://500px.com/blog
// @exclude        http://500px.com/market*
// @exclude        http://500px.com/upgrade
// @grant          none

// @history        0.1 Initial version
// ==/UserScript==


stats = document.getElementById('showstats');

if (stats !== "-1") {
	stats.setAttribute('style', 'width: 180px');
	
	var statvalues = stats.getElementsByTagName("div")[1];
	statvalues.setAttribute('class', 'left');
	
	var rateRow = document.createElement('div');
	rateRow.setAttribute('class', 'left clearafter');
	
	stats.appendChild(rateRow);
	
	//console.debug(stats);
	
	var views = statvalues.children[0].getAttribute('title');
	var likes = statvalues.children[2].getAttribute('title');
	var faves = statvalues.children[4].getAttribute('title');
	var comments = statvalues.children[6].getAttribute('title');
	
	var rat0 = document.createElement('span');
	var rat1 = document.createElement('span');
		rat1.innerHTML = Math.round(views / likes);
	var rat2 = document.createElement('span');
		rat2.innerHTML = Math.round(views / faves);
	var rat3 = document.createElement('span');
		rat3.innerHTML = Math.round(views / comments);
	
	rateRow.appendChild(rat0);
	rateRow.appendChild(document.createElement('br'));
	rateRow.appendChild(rat1);
	rateRow.appendChild(document.createElement('br'));
	rateRow.appendChild(rat2);
	rateRow.appendChild(document.createElement('br'));
	rateRow.appendChild(rat3);

}