// ==UserScript==
// @name           Gawker v10 Enhancements
// @namespace      http://jellyfishresources.com
// @description    Enhancements for the Gawker family of blogs.
// @include       http://gizmodo.com/*
// @include       http://i.gizmodo.com/*
// @include       http://lifehacker.com/*
// @include       http://io9.com/*
// @include       http://deadspin.com/*
// @include       http://valleywag.gawker.com/*
// @include       http://kotaku.com/*
// @include       http://fleshbot.com/*
// @include       http://defamer.gawker.com/*
// @include       http://gawker.com/*
// @include       http://tv.gawker.com/*
// @include       http://jalopnik.com/*
// @include       http://jezebel.com/*

// ==/UserScript==
// Should support chrome and firefox.

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}

addGlobalStyle(' \
	 .comment {font-family: sans-serif;} \
	 .p_0 .ctext	{color:#000;} \
	 .ctedit, .avatar_time  {font-size: 85%; line-height: 1.15em} \
	 .thread:hover, .thread:hover .comment:hover	{background-color: rgba(145,145,115,0.3)!important;} \
	 #rightwrapper {left: -450px;} \
	 #rightcontainer .post .tag {width:135px;}\
	 #rightcontainer .post .headline {width: 290px;}\
	 #rightcontainer {width:450px;}	\
	 #rightcontainer .wrap {width: 448px;}\
	 #rightcontainer .headline img {margin-right; 82px} \
 	 .thread .replies {margin-left: 35px;} \
	 .thread .replies .comment {border-top: solid 1px #a0a0a0; border-left: solid 1px #a0a0a0; margin-left: 0px; padding-left: 10px;}\
	 #main-container > .inner {float: right;} \
	 #container {width:633px;} \
	 #rightcontainer {position: relative; top: -47px;}');


/*
  Attaches script into page body and executes it via an anonymous function call.
    NOTES:
      Script can therefore reference variables on the page, but likewise cannot use Greasemonkey API methods
*/

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + myScript + ")();";

document.body.appendChild(script);

