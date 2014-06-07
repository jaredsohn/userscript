// ==UserScript==
// @name        Add any links to Flickr "You" submenu
// @namespace   Bushman.K
// @description Lets you to add any desired link to "You" submenu of Flickr global navigation bar
// @include     http://www.flickr.com/*
// @include     https://www.flickr.com/*
// @include     https://secure.flickr.com/*
// @version     1
// ==/UserScript==
	var div_you_panel = document.getElementById('you-panel');
	var as=div_you_panel.getElementsByTagName('a');
	var first_link=as[0];
	var href= first_link.toString();
	var uls = div_you_panel.getElementsByTagName('ul')
	var ul = uls[0];
// Collections	
	var container = document.createElement("li");
	container.setAttribute("class", "gn-subnav-item");
	var link='<a href="'+href+'collections/" >Collections</a>';
	container.innerHTML = link;
	ul.appendChild(container);
// Archives
	var container = document.createElement("li");
	container.setAttribute("class", "gn-subnav-item");
	var link='<a href="'+href+'archives/" >Archives</a>';
	container.innerHTML = link;
	ul.appendChild(container);
// Tags
	var container = document.createElement("li");
	container.setAttribute("class", "gn-subnav-item");
	var link='<a href="'+href+'tags/" >Tags</a>';
	container.innerHTML = link;
	ul.appendChild(container);
// Popular
	var container = document.createElement("li");
	container.setAttribute("class", "gn-subnav-item");
	var link='<a href="'+href+'popular-interesting/" >Popular</a>';
	container.innerHTML = link;
	ul.appendChild(container);