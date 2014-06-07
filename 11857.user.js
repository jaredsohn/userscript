// NewBB
// by psyched 07
// ==UserScript==
// @name           NewBB
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Text kann direkt mit BB formatiert werden
// @include        http://forum.mods.de/bb/*
// ==/UserScript==


var scripttext="function addbb(tag) {"+
                 "var tag1='['+tag+']';"+
                 "var tag2='[/'+tag+']';"+
                 "var input=document.getElementsByName('message')[0];"+
                 "input.focus();"+
                 "if(typeof input.selectionStart != 'undefined')"+
                 "{"+
                   "var start = input.selectionStart;"+
                   "var end = input.selectionEnd;"+
                   "var insText = input.value.substring(start, end);"+
                   "input.value = input.value.substr(0, start) + tag1 + insText + tag2 + input.value.substr(end);"+
                       "var pos;"+
                   "if (insText.length == 0) {"+
                     "pos = start + tag1.length;"+
                   "} else {"+
                     "pos = start + tag1.length + insText.length + tag2.length;"+
                   "}"+
                   "input.selectionStart = pos;"+
                   "input.selectionEnd = pos;"+
                 "}"+
               "}";

var script=document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.appendChild(document.createTextNode(scripttext));
document.getElementsByTagName('head')[0].appendChild(script);



var imgs=document.getElementsByTagName('img');
for (var i=0; i<imgs.length; i++) {
  if (imgs[i].src.match(/\/img\/buttons\/fett\.gif$/gi)) {
    imgs[i].setAttribute("onclick", "addbb('b');");
  }
  if (imgs[i].src.match(/\/img\/buttons\/u\.gif$/gi)) {
    imgs[i].setAttribute("onclick", "addbb('u');");
  }
  if (imgs[i].src.match(/\/img\/buttons\/code\.gif$/gi)) {
    imgs[i].setAttribute("onclick", "addbb('code');");
  }
  if (imgs[i].src.match(/\/img\/buttons\/kursiv\.gif$/gi)) {
    imgs[i].setAttribute("onclick", "addbb('i');");
  }
}