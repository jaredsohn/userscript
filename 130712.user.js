// ==UserScript==
// @license        http://creativecommons.org/licenses/by-nc/3.0/
// @name           Piriform update redirect
// @version        2.2.20120817
// @description    Get Piriform product (CCleaner, Defraggler, Recuva, Speccy) updates without jumping hoops
// @author         raina
// @namespace      http://userscripts.org/users/315152
// @include        http://www.piriform.com/ccleaner/download/*
// @include        http://www.piriform.com/ccleaner/update*
// @include        http://www.piriform.com/ccleaner/builds
// @include        http://www.piriform.com/defraggler/download/*
// @include        http://www.piriform.com/defraggler/update*
// @include        http://www.piriform.com/defraggler/builds
// @include        http://www.piriform.com/recuva/download/*
// @include        http://www.piriform.com/recuva/update*
// @include        http://www.piriform.com/recuva/builds
// @include        http://www.piriform.com/speccy/download/*
// @include        http://www.piriform.com/speccy/update*
// @include        http://www.piriform.com/speccy/builds
// ==/UserScript==

// ==License==
// This script is licensed under Creative Commons Attribution-NonCommercial 3.0
// Unported (CC BY-NC 3.0). See http://creativecommons.org/licenses/by-nc/3.0/
// for details. In short, you are allowed to share and adapt this work for
// noncommercial purposes, provided you credit me. Contact me for licensing to
// commercial use.
// ==/License==



var products = {
		'ccleaner'   : 'CCleaner',
		'defraggler' : 'Defraggler',
		'recuva'     : 'Recuva',
		'speccy'     : 'Speccy'
	},
	product = null,
	URLbase = 'http://www.piriform.com/',
	URL;



for (var i in products) {
	if (window.location.href.indexOf(i) > 0) {
		product = i;
		break;
	}
}



function redirect(target) {
	URL = URLbase + product + '/';
	if (target !== 'builds' && target !== 'update')
		URL += 'download/';
	URL += target;
	window.location.href = URL;
}



function changeRedirect(e) {
	localStorage.setItem(product, e.target.value);
	redirect(localStorage.getItem(product));
}



if (/\/update/.test(window.location.href) && localStorage.getItem(product) && localStorage.getItem(product) !== 'update' && document.getElementsByClassName('buttonDownload').length > 0)
	redirect(localStorage.getItem(product));



var div = document.createElement('div'),
	select = document.createElement('select'),
	options = {
		'update'   : 'nowhere',
		'builds'   : 'Builds page',
		'portable' : 'Portable build',
		'slim'     : 'Slim build',
		'standard' : 'Standard build'
	};

for (var build in options) {
	var option = document.createElement('option');
	option.value = build;
	if (localStorage.getItem(product) == build)
		option.setAttribute('selected', 'selected');
	option.textContent = options[build];
	select.appendChild(option);
	option = undefined;
}

select.addEventListener('change', changeRedirect, false);
select.setAttribute('style', 'font-size: 11px');

div.setAttribute('style', 'float: right; margin-left: 1ex; font-size: 11px');
div.appendChild(document.createTextNode('Update redirects to '));
div.appendChild(select);

document.getElementById('crumbs').appendChild(div);
