// ==UserScript==
// @name           LetitbitGoToHell
// @namespace      3
// @include        http://letitbit.net/*
// ==/UserScript==

window.addEventListener('load', function () {
	if (document.getElementById('countdown')) {
		document.getElementById('countdown').style.display='none';
		document.getElementById('links').style.display='block';
		window.clearInterval(action);
	}

	if (document.getElementById('mainFrame')) {
		var el = document.getElementById('mainFrame');
		el.parentNode.removeChild(el);
	}
	},
 	true
);
