// ==UserScript==
// @name           Web.de Select Login
// @namespace      web.de-select_login
// @description    Automatically selects the Login tab insead of the Search tab which is selected on the web.de index page by default
// @include        http://web.de/
// @include        http://www.web.de/
// ==/UserScript==


window.addEventListener(
	'load',
	function(){
		setTimeout(
			"select(document.getElementById('contentNavFreemail'));" +
			"document.getElementById('inpLoginUsername').focus()",
			1);
	}, 
	true);
