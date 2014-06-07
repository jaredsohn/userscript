// ==UserScript==
// @name           Javadoc redirecto to latest version
// @namespace      javadoc-emetello-latest-javadoc
// @version        1
// @description    Automatically redirects to the latest java documentation version (6)
// @include        http://java.sun.com/j2se/*
// ==/UserScript==


var paths = document.location.pathname.split('/');

if (paths && paths[2] && parseInt(paths[2]) > 0) {
	paths[1] = 'javase';
	paths[2] = '6';
	document.location = document.location.protocol + '//' + document.location.host + paths.join('/');
}