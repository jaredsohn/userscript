// ==UserScript==
// @name		NBA Video (Auto-hide)
// @namespace		nba@auto-hide.com
// @description		This automatically hides the videos on the game pages of NBA.com so the highlights don't play when all you want is the box score. The videos are still available and play when pressing the 'Show Video' button on the right.
// @include		http://www.nba.com/games*
// ==/UserScript==

setTimeout(function() {
	var elem = document.getElementById('Rnd1pick1-listen');
	elem.getElementsByTagName('img')[0].setAttribute('src','http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/gameinfo/nbaGIVideoShow.gif')
	elem.getElementsByTagName('img')[0].setAttribute('alt','Open the feature box');
	document.getElementById('Rnd1pick1').setAttribute('style','display: none');
},100);