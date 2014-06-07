// ==UserScript==
// @name           ciscodir
// @namespace      http://wwwin-tools.cisco.com/dir/*
// @include        http://wwwin-tools.cisco.com/dir/details/*
// @description    Cisco Dir will add a xmpp: chat link on the directory page
// ==/UserScript==

var main, newElement;
main = document.getElementsByTagName("a");

function add_xmpp(r,dm) {
  var new_xmpp = document.createElement("chat");
  var newCode= '| <b><a href="xmpp:' + dm + '@cisco.com">Chat</a></b>';
  new_xmpp.innerHTML=newCode
  doit = document.getElementsByTagName("a")[r];
  doit.parentNode.insertBefore(new_xmpp, null);
  return;
}

for (var i = 1; i < main.length; i++) {
    var doc = main[i];
    var str = String(doc);
    var patt1 = /mailto:(([A-Za-z0-9]){1,8})@cisco.com$/i;
    if (str.match(patt1)){
    var dm = str.match(patt1)[1];
    add_xmpp(i,dm);
    }    
}