// ==UserScript==
// @name           Streampad
// @namespace      http://mywebsite.com/myscripts
// @description    Adds a Streampad player
// @include        *
// ==/UserScript==

	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var yscript = document.createElement('script');
	yscript.type = 'text/javascript';
	yscript.src = 'http://o.aolcdn.com/os_merge/?file=/streampad/sp-player.js&file=/streampad/sp-player-other.js&expsec=86400&ver=11&clicktext=Click%20to%20play%20all%20audio%20files&btncolor=white-gray';
	head.appendChild(yscript);  