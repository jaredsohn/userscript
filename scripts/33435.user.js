// ==UserScript==
// @name           Google Reader Panel Toggler Improved
// @description    Toggles the shared items panel on top left to save space of left sidebar. Also can toggle view sections footer.
// @namespace      http://frostware.wordpress.com
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==
var selectorsBox = null;
var selectorsToggler = null;
var treeBox = null;
var addBox = null;
var showTab = true;
var titleSet = false;
GM_registerMenuCommand('Show statistics', showStatistics);
GM_registerMenuCommand('Toggle viewer footer', toggleFooterContainer);


function getState() {return GM_getValue("showMenu", "");}
function setState(bool) {GM_setValue("showMenu", bool);	addToggle();}
function addToggle() {
	if(GM_getValue("totalToggles", "")) {
		var x = GM_getValue('totalToggles', '');
		x++;
		GM_setValue('totalToggles', x);
	}
}
function addScriptLoadings() {
	if(GM_getValue("totalScriptLoadings", "")) {
		var x = GM_getValue('totalScriptLoadings', '');
		x++;
		GM_setValue('totalScriptLoadings', x);
	}
}
function addTime() {
	if(GM_getValue("totalTime", "")) {
		var x = GM_getValue('totalTime', '');
		x += 10;
		GM_setValue('totalTime', x);
		setTimeout(addTime, 10000);
	}   
}              
function showStatistics(e) {
	var a = GM_getValue('totalToggles', '');
	var b = GM_getValue('totalScriptLoadings', '');
	var c = GM_getValue('totalTime', '');
	
	var cj = c % (3600*24*7);
	var cw = (c - cj) / (3600*24*7);
	cj = (c - (cw*3600*24*7)) % (3600*24);
	var cd = (c - (cw*3600*24*7) - cj) / (3600*24);
	cj = (c - (cw*3600*24*7) - (cd*3600*24)) % 3600;
	var ch = (c - (cw*3600*24*7) - (cd*3600*24) - cj) / 3600;
	cj = (c - (cw*3600*24*7) - (cd*3600*24) - (ch*3600)) % 60;
	var cm = (c - (cw*3600*24*7) - (cd*3600*24) - (ch*3600) - cj) / 60;
	var cs = (c - (cw*3600*24*7) - (cd*3600*24) - (ch*3600) - (cm*60));
	
	if(cw < 10) { cw = "0"+cw; } 
	if(cd < 10) { cd = "0"+cd; } 
	if(ch < 10) { ch = "0"+ch; }
	if(cm < 10) { cm = "0"+cm; } 	
	if(cs < 10) { cs = "0"+cs; }
	var x = 'Total script loadings: ' + b + '.\n' + 
			'Total toggles: ' + a + '.\n' +
			'Total run time: ' + cw + 'w ' + cd + 'd ' + ch + 'h ' + cm + 'm ' + cs + 's';
	alert(x);
}
function toggleSelectors() {
  	if (!selectorsBox || !selectorsToggler) {
		return;
	}
	if (getState() == false) {
		
		selectorsToggler.className = '';
		selectorsBox.style.display = '';
		addBox.style.display = '';
		resizeTreeBox();
		setState(true);
				
	} else if (getState() == true) {
		resizeTreeBox();	
		selectorsToggler.className = 'down';
		selectorsBox.style.display = 'none';
		addBox.style.display = 'none';
		setState(false);
			
	}
	
	
	if (typeof(unsafeWindow.gG) == 'function') {
		unsafeWindow.gG();
	}
}
function onSidebarToggle() {
	if (showTab == true) {
		// sidebar is to be hidden and the mini toggle icon is to be shown (google's handler gets called afterwards)
		selectorsToggler.style.display = 'none';
		showTab = false;
	} else {
		selectorsToggler.style.display = 'block';
	}
}
function install() {
	if(!GM_getValue('installed', '')) {
		GM_log('Installing Google Reader toggler.');
		GM_setValue('showMenu', true);
		GM_setValue('installed', true);
		GM_setValue('showFooter', true);
		GM_setValue('totalTime', 10);
		GM_setValue('totalScriptLoadings', 1);
		GM_setValue('totalToggles', 1);
		// add here GM_setValue('');
		GM_log('Installing completed!');
	}
}
function toggleFooterContainer() {
	GM_log('Toggling the footer start.');
	if(GM_getValue('showFooter', '') == true) {
		var a = document.getElementById('chrome-footer-container');
		//a.className += " hidden";
		a.style.display = 'none'
		GM_setValue('showFooter', false);
		
	} else if(GM_getValue('showFooter', '') == false) {
		var a = document.getElementById('chrome-footer-container');
		//a.className.replace(' hidden', '');
		a.style.display = '';
		GM_setValue('showFooter', true);
	}
	GM_log('Toggling the footer end.');
}
function resizeTreeBox () {
	var topLinks = document.getElementById('gbar');
	var googleLogo = document.getElementById('logo-container');
	var win = window.innerHeight;
	var topHeight = topLinks.clientHeight;
	var logoHeight = googleLogo.clientHeight;
	var selHeight = selectorsBox.clientHeight;
	var addHeight = addBox.clientHeight; 
	var togglerHeight = selectorsToggler.clientHeight;
	var x = null;
	if(getState() == false) {
		x = win - topHeight - logoHeight - selHeight - addHeight - togglerHeight - 58;
	} else {
		x = win - topHeight - logoHeight - togglerHeight - 53;
	}
	treeBox.style.height = x + "px";
}
function addStyle() {
	var style = '#selectors-toggler {display:block;height:7px;background:#FFFFFF url(http://i25.tinypic.com/300cs5d.jpg) no-repeat center center;}'
		+ '#selectors-toggler:hover {background-color:#F3F3F3;}'
		+ '#selectors-toggler.down {height:10px;background:#FFFFFF url(http://i32.tinypic.com/x5r143.jpg) no-repeat center center;}'
		+ '#selectors-toggler.down:hover {background-color:#F3F3F3;}';
	GM_addStyle(style);
}
function createSelectorsToggler() {
	var navBar = document.getElementById('nav');
	selectorsBox = document.getElementById('selectors-box');
	selectorsToggler = document.createElement('a');
	selectorsToggler.id = 'selectors-toggler';
	selectorsToggler.href = 'javascript:void(0);';
	navBar.insertBefore(selectorsToggler, document.getElementById('sub-tree-box'));
	treeBox = document.getElementById('sub-tree');
	addBox = document.getElementById('add-box');
	if(getState() == false) {
		selectorsToggler.className = 'down';
		selectorsBox.style.display = 'none';
		addBox.style.display = 'none';
	} 
	if (GM_getValue('showFooter', '') == false) {
		var a = document.getElementById('chrome-footer-container');
		//a.className += " hidden";
		a.style.display = 'none';
	}
}
window.addEventListener('load', function(e) {
	//installing script start
	install();
	//installing script end
		
	addScriptLoadings();
	setTimeout(addTime, 10000);
	addStyle();
	createSelectorsToggler();
	
	
	selectorsToggler.addEventListener('click', toggleSelectors, true);
	document.getElementById('nav-toggler').addEventListener('click', onSidebarToggle, true);
}, false);


