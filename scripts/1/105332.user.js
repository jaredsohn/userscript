// ==UserScript==
// @name           GrooveShark Theme
// @namespace      None
// @description    GrooveShark Theme
// @include http://*
// ==/UserScript==
	
	if(window.location.hash == "#/") {
	var elmDeleted = document.getElementById('theme_home');
		elmDeleted.parentNode.removeChild(elmDeleted);

	var elmTheme = document.createElement('div');
		elmTheme.id = 'elmTheme';
		elmTheme.innerHTML = '<img src="http://static.a.gs-cdn.net/themes/marines/assets/stage_background.jpg?ver=1.0" width="100%" height="100%">';
		var elmFoo = document.getElementById('sidebar_resize');
		elmFoo.parentNode.insertBefore(elmTheme, elmFoo);
		}