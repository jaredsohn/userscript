// ==UserScript==
// @name           jump
// @namespace      http://www.plurk.com/
// @description    jump
// @include        http://www.plurk.com/*
// ==/UserScript==
//opera

(function () {
    var now= "";
    var time ="23:59:59";
    var date = new Date();
    
	var bar = document.getElementById('icon_friends').parentNode.parentNode;

	var buttom = document.createElement('Draw');
	buttom.setAttribute('id','Draw');
	buttom.innerHTML="<a title='show Draw' href='http://eva0.now.in/static/' target='_self'>Drawing</a>";
	bar.appendChild(buttom);
	
	
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);