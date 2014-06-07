// Perfect Markup
// version 0.9c951267
// 2008-07-26
// Copyright (c) 2008, konfuze <konfuzr@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name		Perfect Markup
// @include		file://*
// ==/UserScript==

//-------------------------------- main code

	//overlayOpacity [0..10]
	var overlayOpacity = "5";

	var overlayW, overlayH;

	var overlay = ce("div");
	sa(overlay, "id", "pmOverlay");
	document.body.appendChild(overlay);

	var overlayImg = ce("img");
	sa(overlayImg, "id", "pmOverlayImg");

	overlay.appendChild(overlayImg);

	var ua = navigator.userAgent.toLowerCase();

	var isIE = (ua.indexOf("msie") != -1 && ua.indexOf("opera") == -1);
	var isSafari = (ua.indexOf("safari") != -1);

	if( doDisplay() == "" ) {
		doDisplay("block");
	}
	
	opacitee = isIE ? "filter: progid:DXImageTransform.Microsoft.Alpha(opacity=" + overlayOpacity + "0);" : "opacity: " + overlayOpacity * 0.1 + ";";

	addGlobalStyle(
		"#pmOverlay {" +
		"	display: " + doDisplay() + ";" +
		"	position: absolute;" +
		"	top: 0;" +
		"	left: 0;" +
		"	width: 100%;" +
		"	" + opacitee +
		"}"
	);

	var customCss = ce("link");
	sa(customCss, "type", "text/css");
	sa(customCss, "rel", "stylesheet");
	sa(customCss, "href", "pmarkup.css");

	document.getElementsByTagName('head')[0].appendChild(customCss);

	var keyEvent = (isIE || isSafari) ? "keydown" : "keypress";

	// add hotkeys
	addEvent(document, keyEvent, function (event) {

						event = event || window.event;
						var key = event.keyCode || event.which;

						// Shift + Space to show / hide overlay
						if (event.shiftKey && (key == 32)) {
							(doDisplay() == "none") ? doDisplay("block") : doDisplay("none");
							
							if(event.preventDefault) event.preventDefault();
							event.returnValue = false;

							return true;
						}

						// Ctrl + Enter - resize window to size of layout
						if (event.ctrlKey && (key == 13)) {
							window.resizeTo(overlayW, overlayH);
						}
					}
	);	

	setLayoutImage("layout.gif");
	setLayoutImage("layout.png");
	setLayoutImage("layout.jpg");

//-------------------------------- functions

// routines
function ge(id) {
	return document.getElementById(id);
}

function ce(tag) {
	return document.createElement(tag);
}

function sa(el, attr, val) {
	el.setAttribute(attr, val);
}

// crossbrowser addEventListener
function addEvent(obj, event, handler) {
	if(obj.addEventListener)
		obj.addEventListener(event, handler, false);
	else if(obj.attachEvent('on' + event, handler));
}

function addGlobalStyle(css) {

	if(!isIE) {
		var globalStyle = ce("style");
		sa(globalStyle, "type", "text/css");
		
		var cssText = document.createTextNode(css);
		globalStyle.appendChild(cssText);

		document.getElementsByTagName('head')[0].appendChild(globalStyle);
	} else {
		var cssDiv = ce("div");

		/* dirty IE hack */
		cssDiv.innerHTML = '<form></form><style type="text/css">' + css + '</style>';
	
		document.body.appendChild(cssDiv);
	}
}

function setLayoutImage(src) {
	var img = new Image();

	addEvent(img, "load", function () {overlayImg.src = src; overlayW = img.width; overlayH = img.height; });

	img.src = src;
}

// window.name storage routine
function doDisplay(val) {
	if(val) {
		overlay.style.display = val;
		window.name = val;
	}

	return window.name;
}