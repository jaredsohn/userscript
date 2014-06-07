// ==UserScript==
// @name       BetterTube
// @namespace  Erekohn
// @author	   Erekohn
// @version    1.0
// @description  Restores the old YouTube Header. Recommended for use with Better Watch Page.
// @copyright  © 2013 Erekohn
// @match      http://*/*
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// @include	   http://youtube.com/*
// @include	   https://youtube.com/*
// @include	   http://www.youtube.com/*
// @include	   https://www.youtube.com/*
// @include	   http://youtube.com/user/*
// @include	   https://youtube.com/user/*
// @include	   http://www.youtube.com/user/*
// @include	   https://www.youtube.com/user/*
// ==/UserScript==

function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);
}

headerstyle = "#yt-masthead a.yt-uix-button:hover { text-decoration:underline; }#masthead-search .search-btn-component, #masthead-search .search-btn-component .start { border-left: 0; }body a.yt-uix-button .yt-uix-button-content { color: #994800 !important;  } .yt-uix-button-group .yt-uix-button { margin-right: 0px; border-radius: 3px; margin-top: 3px; } .yt-uix-button-group .end { display:none; } #yt-masthead a.yt-uix-button { line-height: 23px; background:url(http://s.ytimg.com/yt/img/master.gif) 0px -175px #FED81C !important; border:1px solid #ECC101 !important; font-weight:bold !important; height:23px !important; color: #994800; text-shadow:none !important; font-size:12px !important; padding:0 6px !important; }#yt-masthead-user { margin-top: 9px; } #yt-masthead-dropdown.reversed { border-bottom-color: #03c; } #yt-masthead-dropdown { border-top-color: #03c; } #yt-masthead-user .yt-masthead-user-icon { display: none; } #yt-masthead-user-displayname { cursor: pointer; color: #03c; font-size: 13px; font-weight: bold; } #yt-masthead-container { width: 970px !important; margin: 0 auto !important; margin-bottom: -5px !important; border-bottom-color: #ccc !important; background: transparent !important; } body{background: white !important; text-shadow: none !important;} #yt-masthead #logo-container { position: relative; } #logo-container { margin-left: 0px !important; margin-right: 16px !important; margin-top: -2px !important; } .site-left-aligned #yt-masthead-container{ background: white !important;}#yt-masthead #masthead-search-terms { height: 25px; } .gsib_a { background: white; padding-left: 2px;  padding-right: 2px; height: 1.38462em;  margin-top: 1px; margin-bottom: 1px; border-color: #666;} #yt-masthead #search-btn {  line-height: 13px; opacity: 1; font-size: 12px; height: 25px; background: #c6d7f3 url(http://i.imgur.com/EodX9My.png) repeat-x center -1602px; color: #039; border-color: #a0b1dc; border-radius: 3px; margin-left: 4px; vertical-align: top; zoom: 1;} #masthead-search.consolidated-form #masthead-search-terms label { border: 1px solid #999; background: white;} #masthead-search .search-btn-component .yt-uix-button-content { text-indent: -13px; opacity: 1; background: none; } .hitchhiker-enabled #masthead-search .search-btn-component .yt-uix-button-content { background: none;} #masthead-search { width: 406px; padding: 0.15385em 0.23077em; margin: 0.23077em 0 0 0; line-height: 2.07692em; white-space: nowrap; background: #eaeaea; border: 1px solid #ccc; -moz-border-radius: 3px;  -webkit-border-radius: 3px; border-radius: 3px; padding: 2px; height: 25px;} #masthead-search .search-btn-component, #masthead-search .search-btn-component .start { border-left: 1px; } #masthead-search .search-btn-component{ border-left: 1px; } #yt-masthead #search-btn:hover { text-decoration: underline; } .gsib_b { display:none; } #masthead-search-terms input { font-size: 13px;}";
insertCSS(headerstyle);

// ==/UserScript - Change Logo==

function rm(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
document.getElementById('logo').id = 'logox';
document.getElementById("logox").src = "http://i.imgur.com/ELGILt3.jpg";

rm('#logo{display:none;}.content-region{display:none;}');

// ==/UserScript- Main Screen==

document.getElementById("page").style.display="none";

	function injectCSS() {

		var headTag = document.getElementsByTagName("head")[0].innerHTML;	
		var newCSS = headTag + '<link rel="stylesheet" type="text/css" href="http://plaku.com/bytui/bytui.css" />';
		document.getElementsByTagName('head')[0].innerHTML += newCSS;
	}
	 
	//Overwrite some of youtube's css
	injectCSS();
	
	loadJQ();
		
	// a function that loads jQuery and calls a callback function when jQuery has finished loading
	function loadJQ() {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://plaku.com/bytui/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		loadJQCookie();
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	function loadJQCookie() {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://plaku.com/bytui/jquery.cookie.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		loadMain();
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	function loadMain() {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://plaku.com/bytui/bytui.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}