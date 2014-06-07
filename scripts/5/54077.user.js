// ==UserScript==
// @name           BlipFM
// @namespace      http://lmaa.tumblr.com/userscripts
// @description    BlipFM @dditions
// @include        http://blip.fm/home
// ==/UserScript==
var usericons = document.getElementsByClassName("icon miniuser");
for (var i = 0; i < usericons.length; i++) {
  var child = usericons[i].firstChild;
  for (var j = 0; child != usericons[i].lastChild; child = child.nextSibling) {
    if(child.nodeName.toUpperCase() == "A") {
      child.setAttribute("onClick", "javascript:msg = document.getElementById('messageDiv'); if (msg.style.display == 'block') { node =  document.getElementById('message'); start = node.selectionStart; end = node.selectionEnd; node.value = node.value.substring(0,start)+'@"+child.getAttribute("title")+"'+node.value.substring(end); return false; } else { return true; }");
    }
  }
}
