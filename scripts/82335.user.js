// ==UserScript==
// @include http://habrahabr.ru/*
// @include http://*.habrahabr.ru/*
// @name	Habrahabr my quick links
// @version	1.1
// @date	07/26/2010
// @author	GreLI
// ==/UserScript==

if(document.querySelector) {
(function () {
	function addLinks(){
		var base_url,
		    panel_user = document.querySelector('.habrauser');

		if ( !(panel_user && (base_url = panel_user.href)) ) return;

		var panel = document.querySelector('.panel-personal');
		if (panel) panel.style.width = '38%';

		var insertion = document.createElement('SPAN');
		insertion.innerHTML = ' — <a href="'+base_url+'blog/">блог</a>, <a href="'+base_url+'comments/">комментарии</a>';
		insertion.style.fontSize = '.92em';
		panel_user.parentNode.insertBefore(insertion, panel_user.nextSibling);
	}

	addLinks();
})();
}