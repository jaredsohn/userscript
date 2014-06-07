// ==UserScript==
// @name           QuickSearch
// @namespace      http://chofter.com/apps
// @description    Provides a very quick way to search Google, with results shows as you type.  Just click Ctrl-Alt-F and start typing! To search just the site you're on, press Ctrl-Alt-S. To search some text on a page, just highlight it and press Ctrl-Alt-F.
// @include        http://*
// @include        https://*
// ==/UserScript==

var body = document.getElementsByTagName("body")[0];
var triggerKey = "F";
var siteTriggerKey = "S";
var version = "1.2";

document.addEventListener("keyup", function(evt){
  if(evt.ctrlKey && evt.altKey) {
    var ch = String.fromCharCode(evt.keyCode);

    if (ch == triggerKey) {
      var g=document.createElement("script");
      g.src="http://www.chofter.com/apps/QuickSearch/index.php?version=1.2" ;
      document.getElementsByTagName("head")[0].appendChild(g);
    } else if (ch == siteTriggerKey) {
      var g=document.createElement("script");
      g.src="http://www.chofter.com/apps/QuickSearch/index.php?version=1.2&samesite=true";
      document.getElementsByTagName("head")[0].appendChild(g);
    } else {
      console.log("ch = ", ch);
    }
  }
}, true);