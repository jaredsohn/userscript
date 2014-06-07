// ==UserScript==
// @name           Easily scroll to the TOP/BOTTOM of a page, instantly- on any website.
// @namespace      phishle
// @description    Adds 2 opaque arrow icons in the bottom, right-hand corner of your web browser to easily scroll to the TOP/BOTTOM of a page, instantly- on any website. Tested and verified to work with Firefox and Google Chrome.
// @include        *showthread*
// @include        *thread*
// @include        *forumdisplay*
// @include        *?page=*
// @include        *?pg=*
// @include        *?results=*
// @include        */forum/*
// @include        */forums/*
// @include        *forum*
// @include        *forums*
// ==/UserScript==
function create_up() {
	if(document.body){
		var up = document.createElement('span');
		up.innerHTML = "<img src='http://img32.imageshack.us/img32/4803/44576505.png' width='32px' height='32px' />";
		var upsty = "opacity:0.7;position:fixed;text-align:right;right:42px;bottom:0px;z-index:50000;";
		up.style.cssText = upsty;
		up.addEventListener('mouseover', function(){ up.style.opacity = 1; }, false);
		up.addEventListener('mouseout', function(){ up.style.opacity = 0.5; }, false);
		up.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
		document.body.appendChild(up);
	}
};
if(self==top) create_up();
function create_down() {
	if(document.body){
		var down = document.createElement('span');
		down.innerHTML = "<img src='http://img252.imageshack.us/img252/1414/downhv.png' width='32px' height='32px' />";
		var dosty = "opacity:0.7;position:fixed;text-align:right;right:0px;bottom:0px;z-index:50000;";
		down.style.cssText = dosty;
		down.addEventListener('mouseover', function(){ down.style.opacity = 1; }, false);
		down.addEventListener('mouseout', function(){ down.style.opacity = 0.5; }, false);
		down.addEventListener('click', function(){ window.scrollTo(0, document.body.scrollHeight); }, false);
		document.body.appendChild(down);
	}
};
if(self==top) create_down();