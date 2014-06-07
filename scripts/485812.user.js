// ==UserScript==
// @name           Reddit Font Readability for Windows
// @description    The name pretty much says it all. Font smoothing on Windows is crap. This is a workaround for comment and post readability.
// @namespace      bloqhead
// @include        http://www.reddit.com/*
// @version        1.0
// ==/UserScript==

function applyStyles(css) {
    var head, style, gfonts;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
	// Google Fonts
	gfonts = document.createElement("link");
	gfonts.rel = "stylesheet";
	gfonts.href= "http://fonts.googleapis.com/css?family=Droid+Sans:400,700";
	document.getElementsByTagName("head")[0].appendChild(gfonts);
	// Font styles
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerText = css;
	head.appendChild(style);
}

applyStyles('body { font-family: "Droid Sans", "sans-serif"; text-shadow: 0 0 1px rgba(0,0,0,0.2);' );
applyStyles('.usertext-body .md { font-size: 16px !important; }');
applyStyles('.link p.title a { font-size: 22px !important; }');