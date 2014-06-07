// ==UserScript==
// @name           Digg View Key Shortcut
// @namespace      http://starsky51.googlepages.com/digg_view_key_shortcut.user
// @description    Captures single press of the 'v' button and activates digg article link. Based on Matt Garrett's accesskey script (http://userscripts.org/scripts/show/11429).
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

window.addEventListener('keydown', diggKeyboardShortcuts, false);

function diggKeyboardShortcuts (e) {
  var ev = e||event;
  var key = ev.which||ev.keyCode;
  if (key == 86) { //'v' key
    if (document.activeElement.type != "textarea" && getElementsByClassName('story-item-title')[0]) { // Check that a comment isn't being entered
      location.href = getElementsByClassName('story-item-title')[0].getElementsByTagName('a')[0].href;
      e.preventDefault(); //Prevent quick find box popping up
    }
  }
}

function getElementsByClassName(classname) {
    var node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
	    if(re.test(els[i].className))a.push(els[i]);
    return a;
}