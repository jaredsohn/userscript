// ==UserScript==
// @name			War Commander UI Cleaner
// @version			1.0
// @namespace		http://apps.facebook.com/
// @description		This extension installs War Commander on your Browser isolating it from FB UI
// @author			Filippo Baruffaldi (http://www.baruffaldi.info)
// @homepage		http://repository.baruffaldi.info

// @include			http://apps.facebook.com /warcommander/*
// @include			https://apps.facebook.com /warcommander/*
// @match           http://apps.facebook.com/warcommander/*
// @match           https://apps.facebook.com/warcommander/*
// ==/UserScript==

console.log('loadeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed');
var $ = document.getElementById;
var elements = [
'pagelet_bluebar',
'pagelet_channel',
'pagelet_dock',
'leftCol',
'rightCol',
'friends-back',
'social-media-bar',
'bottomContent'
];
var ID = window.setInterval(function(){
	if (elements.length <= 0) {
		window.clearInterval(ID);
		console.log('remooooooooooooooooooooooooooooooooooooved');
		return true;
	}
	console.log('let\'s check! '+parseInt(elements.length));
	for (var x=0; x<elements.length; x++) {
		try {
			$(elements[x]).parentNode.removeChild($(elements[x]));
			elements.splice(x, 1);
		} catch(e) {}
	}
}, 1000);