// ==UserScript==
// @name           Snow Beast FINDER!!!
// @description    Auto-finds the snow beast
// @include        http://www.neopets.com/games/cliffhanger/cliffhanger.phtml*
// @include        http://www.neopets.com/winter/adventcalendar.phtml
// ==/UserScript==

var minTime = 1; // lower bounds for random time
var maxTime = 3; // upper bounds for random time

var reloadTime = ((maxTime - minTime) * Math.random() + minTime) * 1000;


if(document.body.innerHTML.indexOf('Snow Beast will be waiting') != -1) {
	alert('Found');
}

else if(document.body.innerHTML.indexOf('Winter Random Event') != -1) {
	if (document.body.innerHTML.indexOf('Advent Calendar') != -1) {
		var redirect = 'http://www.neopets.com/games/cliffhanger/cliffhanger.phtml';		
	}
	else {
		var redirect = 'http://www.neopets.com/winter/adventcalendar.phtml';
	}

	window.location = redirect;
}

else { 
	window.setTimeout(function(){window.location.reload();},reloadTime);
}

return;
