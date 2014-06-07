// ==UserScript==
// @name           Google Menu Extension
// @namespace      http://www.google.com
// @description    More tabs for the google main menu
// @include        http://google.*
// @include        http://www.google.*
// @exclude        *google.com/reviews*
// ==/UserScript==
(function() {
    var menu = document.getElementById('1a').parentNode;
	var pos = menu.childNodes[menu.childNodes.length - 1];

	var spacesTXT = "\u00a0\u00a0\u00a0\u00a0";

    var a = document.createElement('A');
	
	a.appendChild(document.createTextNode("Labs"));
	a.setAttribute('href', 'http://labs.google.com');
	a.setAttribute('class', 'q');
	menu.insertBefore(a, pos);

	if (!(menu.childNodes[menu.childNodes.length - 1].innerHTML))
	{
		var spaces = document.createTextNode(spacesTXT);
		menu.insertBefore(spaces, a);	
	}

    var a = document.createElement('A');

	a.appendChild(document.createTextNode("Mail"));
	a.setAttribute('href', 'http://gmail.google.com');
	a.setAttribute('class', 'q');
	menu.insertBefore(a, pos);

	var spaces = document.createTextNode(spacesTXT);
	menu.insertBefore(spaces, a);

	var spaces = document.createTextNode(spacesTXT);
	menu.insertBefore(spaces, pos);	

})();