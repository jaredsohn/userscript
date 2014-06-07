// ==UserScript==
// @name   Center the new RPS layout 
// @namespace  http://www.rockpapershotgun.com/
// @description  The new layout is positioned slightly to the left, which I don't care for. This script shifts everything back to the center.
// @include http://*.rockpapershotgun.com/*
// ==/UserScript==

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', alignPlz, false);
} else {
    window.onload = alignPlz;
}

function alignPlz() {
	document.getElementById('header-content').setAttribute('style','margin-left : auto; margin-right : auto; float : none; width : 960px');
	document.getElementById('menu-main-container').setAttribute('style','margin-left : auto; margin-right : auto; float : none');
	document.getElementById('menu-utility').setAttribute('style','margin-right : 0px');
	document.getElementById('menu-utility-container').setAttribute('style','float : right; margin-right : 0px');
	document.getElementById('footer-content').setAttribute('style','margin-left : auto; margin-right : auto; float : none');
	
	var sidebar = document.querySelector('div#sidebar');
	var sbWidth = sidebar.offsetWidth;
	sidebar.setAttribute('style','float : right;display:inline-block')
	var contentWidth = document.getElementById('content').offsetWidth;
	document.getElementById('content').setAttribute('style','margin-left : auto; margin-right : auto; float : none; width : ' + (contentWidth-sbWidth) + 'px');
	document.getElementById('page').setAttribute('style','margin-left : ' + (sbWidth/2) + 'px; margin-right : ' + (-sbWidth/2)+ 'px; float : none; width : ' + (contentWidth-sbWidth) + 'px; display:inline-block');
	var page = document.querySelector('#page-wrapper');
	page.appendChild(sidebar);
}