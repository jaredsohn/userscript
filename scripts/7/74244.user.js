// ==UserScript==
// @name           Warez-BB.org link compiler
// @namespace      http://takeouttactics.com
// @include        http://www.warez-bb.org/*
// @include        http://warez-bb.org/*
// ==/UserScript==

var cells = document.getElementsByTagName("td");
var codeblocks = [];
var output = "";

for (var i in cells)
  if ( cells[i].className == "code" )
    codeblocks.push(cells[i]);

for (var i in codeblocks){
  output += codeblocks[i].innerHTML.replace(/(https?\:\/\/[^ ]*?)( |$)/gim, '<a href=\'$1\'>$1</a>$2') + "<br\>"; 
  codeblocks[i].innerHTML = "See above";
}

codeblocks[0].innerHTML = "<br\>----------- Compiled Link List -----------<br\>" + output + "<br\>----------- End List -----------<br\>" + codeblocks[0].innerHTML;