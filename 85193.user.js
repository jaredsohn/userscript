// ==UserScript==
// @name           Less Projects Tidy
// @description    Minor enhancements to the styling of certain elements
// @include        http://*.lessprojects.com/*
// @match          http://*.lessprojects.com/*
// ==/UserScript==

(function(){
	var config = {
		url: 'http://dl.dropbox.com/u/484455/screen.css'
	}
	var head = document.getElementsByTagName("head")[0],
		inject = document.createElement('style');

	inject.innerHTML = '@import url("' + config.url + '");';
	head.appendChild(inject);
})();