// ==UserScript==
// @name           Mips.tv fix
// @namespace      http://userscripts.org/users/422290
// @description    stops mips.tv sending you to the website when you click the stream
// @include        http://www.mips.tv/player/embedplayer.php*
// ==/UserScript==

function code() {
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.background = 'rgba(1,1,1,0)';
	div.style.zIndex = "999";
	div.style.width = '100%';
	div.style.height = (window.innerHeight - 20) + 'px';
	div.style.top = '0px';
	div.style.left = '0px';
	document.body.appendChild(div);	
}

function inject(func) {
	var elm = document.createElement('script');
	elm.type = "text/javascript";
	elm.innerHTML = "("+func+")();";
	document.body.appendChild(elm);
}

inject(code);