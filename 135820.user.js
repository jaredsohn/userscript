// ==UserScript==
// @name           Password Viewer By - RN Hckr
// @namespace      http://www.rnhckr.com
// @description    Shows password fields as plain text when you pass the mouse over them.
// @include        *
// @author         RN Hckr
// ==/UserScript==

// Last updated on 2013-04-3

function show() {
	var inputs = document.getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type.toLowerCase() == 'password') {
			inputs[i].addEventListener('mouseover', function() { this.type='text'; }, true);
			inputs[i].addEventListener('mouseout', function() { this.type='password'; }, true);
		}
	}
}

var site = location.href.split('/')[2];

if (site.match(/login\.live\.com/)) { window.addEventListener('load', show, true); }
else { show(); }

function create_back_to_top() {
if(document.body){
	var a = document.createElement('span');
	a.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.rnhckr.com/\">RN Hckr</a>";
	var c = "opacity:0.7;position:fixed;text-align:right;right:0px;bottom:0px;z-index:50000;";
	c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 3px;color: MenuText;background-color: Menu;font-size:9pt;font-family:arial,sans-serif;cursor:pointer;";
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(a);
	}
};

if(self==top) create_back_to_top();