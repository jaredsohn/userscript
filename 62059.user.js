// ==UserScript==
// @name           what.cd: styleswitcher
// @description    preview stylesheet changes in the settings
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

if (document.getElementById('userform')) {
	var style = Array.prototype.filter.call(
		document.getElementsByTagName('link'),
		function(link) link.getAttribute('rel') === 'stylesheet' // JS 1.8, function expression notation
	)[0];
	Array.prototype.forEach.call(
		document.getElementById('stylesheet').getElementsByTagName('option'),
		function (option) {
			option.addEventListener(
				'click',
				function () {
					style.setAttribute(
						'href',
						'static/styles/' + option.firstChild.data.toLowerCase().replace(' ', '_') + '/style.css')
				},
				true)
		})
}
