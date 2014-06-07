// ==UserScript==
// @name	Instapaper restyled
// @version	1.0
// @description Applies a modern interface to the Instapaper website.
// @include     http://*.instapaper.com/*
// @contributor Javascript and CSS help: Michael Bayer (http://twitter.com/_embee)
// @contributor Icon design: Mat (http://www.mat-u.com/)
// @contributor Original CSS replacement userscript: Jon Hicks (http://www.hicksdesign.co.uk)
// @contributor Idea to create a userstyle for Instapaper: Tim Van Damme (http://www.madebyelephant.com)
// ==/UserScript==

var settingCSS = new Array();
var cssfile = '';
settingCSS['http://www.instapaper.com/user'] = "http://www.unttld.co.uk/labs/instapaper-restyled/css/ip-restyled-user.css";
settingCSS['http://www.instapaper.com/'] = "http://www.unttld.co.uk/labs/instapaper-restyled/css/ip-restyled-start.css";

if(settingCSS[window.location]==undefined) {
	cssfile = 'http://www.unttld.co.uk/labs/instapaper-restyled/css/ip-restyled-basic.css' ;
} else {
	cssfile = settingCSS[window.location] ;	}

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = cssfile;
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);