// ==UserScript==
// @name           Warez-BB.org code linker
// @namespace      http://userscripts.org/users/66015
// @include        http://www.warez-bb.org/*
// @include        http://warez-bb.org/*
// ==/UserScript==

var cells = document.getElementsByTagName("td");
var codeblocks = [];

for (var i in cells)
  if ( cells[i].className == "code" )
    codeblocks.push(cells[i]);

for (var i in codeblocks)
  codeblocks[i].innerHTML = codeblocks[i].innerHTML.replace(/(https?\:\/\/[^ ]*?)( |$)/gim, '<a href=\'$1\'>$1</a>$2');