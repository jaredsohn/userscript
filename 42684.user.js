// ==UserScript==
// @name           New Woot Helper
// @namespace      http://www.nivler.com?greasemonkey
// @description    Since the new woot, i haven't seen a helper yet
// @include        http://www.woot.com/
// ==/UserScript==

/**
	How often do you want to refresh the page? in seconds
**/
var REFRESH_TIME = 5; 

(function() 
{
	var wootOff = false;
	var title = false;
	if (document.getElementsByClassName('soldOut').length) { 
		wootOff = true;	
		title = 'soldOut';
	}
	var progress = document.getElementsByClassName('wootOffProgressBarValue');
	if (progress && progress[0]) { // we're in baby
		wootOff = true;
		progress = progress[0].style.width;
		title = progress;
	} 
	if (wootOff) {
		var wtitle = document.getElementsByTagName('h2')[0].innerHTML;
		var wprice = document.getElementsByTagName('h3')[0].innerHTML;
		document.title = '[' + title + '] ' + wprice + ' - ' + wtitle;
		window.setTimeout(function(){ location.href = location.href; }, REFRESH_TIME * 1000);
	}
})();
