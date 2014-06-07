// ==UserScript==
// @name           Google Reader Share Panel Toggler
// @description    Toggles the shared items panel on top left to save space of left sidebar.
// @namespace      http://thinlight.org/
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==
var selectorsBox = null;
var selectorsToggler = null;

function toggleSelectors() {
	if (!selectorsBox || !selectorsToggler) {
		return;
	}
	
	if (selectorsBox.style.display == 'none') {
		selectorsToggler.className = '';
		selectorsBox.style.display = '';
	} else {
		selectorsToggler.className = 'down';
		selectorsBox.style.display = 'none';
	}
	if (typeof(unsafeWindow.gG) == 'function') {
		unsafeWindow.gG();
	}
}

function onSidebarToggle() {
	if (document.body.className.indexOf('hide-nav') > -1) {
		// sidebar is to be hidden and the mini toggle icon is to be shown (google's handler gets called afterwards)
		selectorsToggler.style.display = 'none';
	} else {
		selectorsToggler.style.display = 'block';
	}
}

window.addEventListener('load', function(e) {
	// add CSS styles for the toggler
	var style = '#selectors-toggler {display:block;height:7px;background:#FFFFFF url(http://i25.tinypic.com/300cs5d.jpg) no-repeat center center;}'
		+ '#selectors-toggler:hover {background-color:#F3F3F3;}'
		+ '#selectors-toggler.down {height:10px;background:#FFFFFF url(http://i32.tinypic.com/x5r143.jpg) no-repeat center center;}'
		+ '#selectors-toggler.down:hover {background-color:#F3F3F3;}';
	GM_addStyle(style);
	
	// create and insert the selectors toggler
	var navBar = document.getElementById('nav');
	selectorsBox = document.getElementById('selectors-box');
	selectorsToggler = document.createElement('a');
	selectorsToggler.id = 'selectors-toggler';
	selectorsToggler.href = 'javascript:void(0);';
	selectorsToggler.className = 'down';
	navBar.insertBefore(selectorsToggler, document.getElementById('add-box'));
	selectorsBox.style.display = 'none';
	selectorsToggler.addEventListener('click', toggleSelectors, true);
	
	// do something when the navigation sidebar toggler is clicked.
	document.getElementById('nav-toggler').addEventListener('click', onSidebarToggle, true);
}, false);
