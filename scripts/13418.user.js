// ==UserScript==
// @name					No Digg Sidebar
// @namespace			http://www.outshine.com/
// @description		On Digg, removes the sidebar.
// @include				*digg.com/*
// @exclude				*digg.com/users/*
// @exclude				*digg.com/settings*
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2007-09-05.
Updated on 2008-05-15.
Version: 2.1.0
*/
if ((document.location.pathname.indexOf('/settings') !== 0) && (document.location.pathname.indexOf('/users/') !== 0)) {
	wrapperDiv = document.getElementById('wrapper');
	divArray = wrapperDiv.childNodes;
	for (var i = divArray.length - 1; i > -1; i--) {
		if (divArray[i].nodeType == 1) {
			if (divArray[i].className.indexOf('sidebar') != -1) {
			   sidebarDiv = divArray[i];
			}
			else if (divArray[i].className.indexOf('main') != -1) {
			   mainDiv = divArray[i];
			}
		}
	}
	if ((sidebarDiv.getAttribute('class') == 'sidebar') && (mainDiv.getAttribute('class') == 'main')) {
		wrapperDiv.removeChild(sidebarDiv);
		var css = document.createElement('style');
		css.setAttribute('id', 'digg_alternative');
		document.getElementsByTagName('head')[0].appendChild(css);
		var da = document.getElementById('digg_alternative');
		da.sheet.insertRule('.main {margin-right: 0px !important;}', 0);
	}
}
