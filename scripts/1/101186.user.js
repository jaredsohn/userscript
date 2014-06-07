// ==UserScript==
// @name           Google Maps - Toggle Full-screen
// @namespace      maps.google.com
// @include        http://maps.google.com/*
// @version        2.0
// ==/UserScript==

GM_addStyle("#mclip {display: none !important;}");

var fs = false;
var sidebarWasOpen, windowHeight, windowWidth;

window.addEventListener("load", doOnLoad, false);

function doOnLoad(){

	var fs_div = document.createElement("div");
	var fs_a   = document.createElement("a");
	var fs_img = document.createElement("img");

	fs_div.id = "my-fullscreen-off";
	fs_div.setAttribute("style", "position: fixed; top: 0px; height: 19px; left: 50%; display: block; z-index: 100;background: white;width: 19px;border: 1px solid #999;&;box-shadow: 2px 2px 2px rgba(0,0,0,0.2);text-align: center;");
	fs_a.href = "javascript:void(0)";
	fs_a.addEventListener("click", toggleFullscreen, false);
	fs_img.className = "dropdown";
	fs_img.style.width = "15px";
	fs_img.style.height = "8px";
	fs_img.src = "//maps.gstatic.com/mapfiles/transparent.png";

	fs_a.appendChild(fs_img);
	fs_div.appendChild(fs_a);

	var a = document.createElement("a");
	var span = document.createElement("span");
	var icon = document.createElement("img");

	a.href = "javascript:void(0)"
	a.className = "kd-button permalink-button right small";
	span.innerHTML = "Full screen";
	span.id = "my-fullscreen-on";
	span.setAttribute("style", "margin-left: 5px;");
	span.className = "link-text";
	icon.className = "bar-icon";
	icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMQEw014nffmgAAADV0RVh0Q29tbWVudAAoYykgMjAwNCBKYWt1YiBTdGVpbmVyCgpDcmVhdGVkIHdpdGggVGhlIEdJTVCQ2YtvAAAB1klEQVQ4y52TO2iTURTHf/+bGzUVadMlSPEFcQgIgiCUKnYqFF9QxcnH4NDBKtXFQXBwSPma4KhgBsFBUALt4LNWUXRQcQ0tiiUtFkVqTVMVTUz7dfiS2LwccuDAhXPP7/7PuefIiUVvAP00ZwmcWNRt1pxY1LUl1O7+2xXoJ8O9AEgGcOm5+Kgi/i5xHABTrckY/UsGJJDE0/h+jFFNDaY6eUPAz4Xrb7yXZVDRTzkvaFlrsT7VB0gw5vSysT1AuKOVe69nkDwZd55/ZMfWdkLBAOPxg/hWKSn3YDx2AIBrg3sZfTVNKBjg/adFrDWEO9pYY31cOrELF/Hs6qFagORVLaBv3zYmpjNEtrRhZPgwu0BnJFy+566qvAywtnT0IH6/xfr8yIj1LevwWQsSwgVX9XpgkISRIfFggrmFP0x9zjI795PsrzwjL6eKv2JKcisB3edHkQzHrjxmciZDKv2d7ZuCbA61kkrP83byK0cuPwRgz9lkLcB1oXtwhMyPHOkvi5w7uhNJSOJkT4RUep5v2d90DSQbz8GyC7m/S9x3DnudKAIkMRbvY2nZ/f8glaxrIIkxwshzZOg8c7fuNtnq2W5kjeK2UCjcHI4PnW5ml/O5/K0VjtO5n1HbI70AAAAASUVORK5CYII=";

	a.addEventListener("click", toggleFullscreen, false);

	a.appendChild(icon);
	a.appendChild(span);

	var link = $("link");
	link.className = "kd-button permalink-button mid small";
	link.parentNode.appendChild(a);

	document.body.appendChild(fs_div);
}

function toggleFullscreen(e){

	var googleone = $("gb");
	var header = $("header");
	var ads = $("mclip");
	var sidebarToggle = $("panelarrow2");
	var fullscreenToggleOn  = $("my-fullscreen-on");
	var fullscreenToggleOff = $("my-fullscreen-off");

	fs = !fs;

	if(fs) sidebarWasOpen = sidebarToggle.className.indexOf("arrow-small") == -1

	toggle(googleone, fs);
	toggle(header, fs);
	toggle(ads, fs);
	toggle(fullscreenToggleOff, !fs);

	if(sidebarWasOpen && sidebarToggle) click(sidebarToggle);
	if(fullscreenToggleOn) fullscreenToggleOn.innerHTML = (fs)? "Exit full screen" : "Full screen";

	dispatchOnResize();
}

function toggle(node, condition){
	if(node) node.style.display = (condition)? "none" : "block";
}

function dispatchOnResize(){
	var element = window;
	var e = document.createEvent("HTMLEvents");
	e.initEvent("resize", true, false);
	element.dispatchEvent(e);
}

function click(element){
	var e = document.createEvent("MouseEvent");
	e.initEvent("click", true, true);
	element.dispatchEvent(e);
}

function $() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}

// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {

	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

}