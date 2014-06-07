// ==UserScript==
// @name		Google Webmaster Auto Expand The Navigation
// @author		Erik Vold
// @datecreated	2009-10-03
// @lastupdated	2009-10-03
// @namespace	gwebmasterAutoExpandNavigation
// @include		http://www.google.com/webmasters/tools/*
// @include		https://www.google.com/webmasters/tools/*
// @include		http://google.com/webmasters/tools/*
// @include		https://google.com/webmasters/tools/*
// @version		0.1
// @description	Automatically expands the Google Webmaster navigiation menu.
// ==/UserScript==

var gwebmasterAutoExpandNavigation={};
gwebmasterAutoExpandNavigation.run=function(){
	var menu=document.getElementById( 'menu' );
	if(!menu) return;
	var expandables=menu.getElementsByClassName('group');
	for(var i=0;i<expandables.length;i++){
		if(expandables[i].getAttribute('class').match(/(^|\s)open(\s|$)/i)) continue;
		expandables[i].setAttribute('class',expandables[i].getAttribute('class')+' open');
	}
	return;
};
// try to run the userscript
gwebmasterAutoExpandNavigation.run();