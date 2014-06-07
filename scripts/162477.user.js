// ==UserScript==
// @name        DTD scout numbers option
// @namespace   rulesy-dtd
// @include     http://d2n.duskdawn.net*
// @description Adds an option to show/hide scout sense numbers separately from zombie numbers
// @version     1
// ==/UserScript==

window.addEventListener('load', init, false);

function init() {

	unsafeWindow.createCookie = function(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	unsafeWindow.toggleScoutNumbers = function(checked) {
		var markers = document.getElementsByClassName('scout_sense_marker');
		if (markers.length > 0) {
			for (var i = 0; i < markers.length; i++) {
				markers[i].style.display = checked ? 'block' : 'none';
			}
		}
		unsafeWindow.createCookie('toggle_scout_numbers', (checked ? 'true' : 'false'), 30);
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	var checked = (readCookie('toggle_scout_numbers') != 'false');

	var html = '<input onclick="toggleScoutNumbers(this.checked)" type="checkbox"';
	if (checked) {
		html += ' checked="checked"';
	}
	html += '" id="toggle_scout_numbers">&nbsp;<img src="http://data.die2nite.com/gfx/icons/item_vest_on.gif">&nbsp;Show scout sense numbers';

	var p = document.createElement('p');
	p.innerHTML = html;

	var zombieNumbersP = document.getElementById('toggle_zombie_numbers').parentNode;
	zombieNumbersP.parentNode.insertBefore(p, zombieNumbersP.nextSibling);

	unsafeWindow.toggleScoutNumbers(checked);
}

