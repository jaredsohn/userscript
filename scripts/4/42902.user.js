// ==UserScript==
// @name           Cancel Link protection
// @author         Wilker Lúcio
// @namespace      http://userscripts.org/users/wilkerlucio
// @description    Cancel the link protection for episodes
// @include        http://www.brazil-series.com*
// ==/UserScript==

var el = unsafeWindow.document.getElementById("epsd01");

if (el) {
  var links = el.getElementsByTagName("a");
  
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var fn = a.onclick.toString();
    var url = fn.match(/"(.*?)"/)[1];
    
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.onclick = function() {};
  }
};

//bring the events back
var desattach_from = [unsafeWindow, unsafeWindow.document, unsafeWindow.document.body];
var desattach_events = [
  'onkeydown',
  'onkeyup',
  'onkeypress',
  'oncontextmenu',
  'onmousedown',
  'onmouseup',
  'onselectstart'
];

for (var i = 0; i < desattach_from.length; i++) {
  var obj = desattach_from[i];
  
  for (var x = 0; x < desattach_events.length; x++) {
    var evt = desattach_events[x];
    
    obj[evt] = function() {return true;};
  }
}
