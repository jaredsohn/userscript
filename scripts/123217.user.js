// ==UserScript==
// @name           QuickSearch
// @namespace      http://chofter.com/apps
// @description    Provides a very quick way to search Google, with results shows as you type.  Just click Ctrl-Alt-W and start typing! To search just the site you're on, press Ctrl-Alt-Q. To search some text on a page, just highlight it and press Ctrl-Alt-Q.
// @include        http://*
// @include        https://*
// ==/UserScript==

var body = document.getElementsByTagName("body")[0];
var triggerKey = "W";
var siteTriggerKey = "Q";
var version = "1.1";

document.addEventListener("keyup", function(evt){
  if(evt.ctrlKey && evt.altKey) {
    var ch = String.fromCharCode(evt.keyCode);

    if (ch == triggerKey) {
      var g=document.createElement("script");
      g.src="http://www.chofter.com/apps/QuickSearch" ;
      document.getElementsByTagName("head")[0].appendChild(g);
    } else if (ch == siteTriggerKey) {
      var g=document.createElement("script");
      g.src="http://www.chofter.com/apps/QuickSearch?samesite=true";
      document.getElementsByTagName("head")[0].appendChild(g);
    } else {
      console.log("ch = ", ch);
    }
    
  	
  }
}, true);