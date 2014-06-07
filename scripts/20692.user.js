// ==UserScript==
// @name           NoMoreILovedIts
// @namespace      tag:OlafTheTroll@suicidegirls.com,2008-01-17
// @description    Hides "I loved it!" comments on SG sets.
// @include        http://suicidegirls.com/boards/The+Pictures/*
// ==/UserScript==

var thread = document.getElementById('thread');
var junk = [];
var lastCommentRemoved;
var k = 0;

for (var x = thread.firstChild; x != null; x = x.nextSibling) {
  var match = x.id != undefined && x.id.match(/boards([0-9]+)/)
  if (match) {
    lastCommentRemoved = false;
    var divs = x.getElementsByTagName('div');
    for (var i = 0; i < divs.length; ++i) {
      var elm = divs[i];
      if (elm.id.match(/commentContent.*/)) {
        var p = elm.getElementsByTagName('p')[0];
        if (p.childNodes.length == 1 &&
            p.firstChild.data.match(/^\s*I loved it!\s*$/)) {
          ++k;
          lastCommentRemoved = true;
          junk.push(x);
        }
      }
    }
  } else if (x.className == "commentSpacer" && lastCommentRemoved) {
    junk.push(x);
  } 
}

for (var i = 0; i < junk.length; ++i) {
  var elm = junk[i];
  thread.removeChild(elm);
}

if (k > 0) {
  var par = document.createElement("p");
  var text = document.createTextNode("NoMoreILovedIts removed " + k
                                     + " comments.");
  par.appendChild(text);
  par.style.padding = "2px;";
  par.style.background = "black;";
  par.style.color = "white;";
  thread.insertBefore(par, thread.firstChild);
}
