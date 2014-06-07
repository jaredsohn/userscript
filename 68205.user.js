// ==UserScript==
// @name           Google Domain Switcher
// @namespace      null
// @description    Add a dropdown menu for Google's domain name
// @include        http://*.google.*/*
// ==/UserScript==

var domains = ['com','cn','de','es','fr','it','co.jp'];
var menu = window.document.createElement("select");
var searchbutton = window.document.evaluate("//input[@name='hl']", window.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

domains.forEach(
	function(domain)
	{
		var option = window.document.createElement('option');
		option.value = window.document.URL.replace(/.google.([a-z]+)(\.*)([a-z]*)\//, '.google.'+domain+'/');
		var current = (RegExp.$1)? RegExp.$1 : 'en';
		option.innerHTML = domain;
		if (current == domain)
			option.selected = true;
		menu.appendChild(option);
		menu.addEventListener("change", function (e) { window.location = e.target.value; }, true);
		menu.setAttribute("id", "menu");
		menu.setAttribute("style", "margin-left: 5px;");
		searchbutton.parentNode.appendChild(menu);
	}
);




