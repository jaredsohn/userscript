
// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Rails Stacktrace TextMate Linker
// @namespace     http://diveintogreasemonkey.org/download/
// @description   make your stack trace lines open in TextMate
// @include       http://localhost*
// ==/UserScript==


if (nodes = document.querySelectorAll("#traces code")) {
  for (var i=0, node; node = nodes[i++];) {
    var newHtml = [],
        lines = node.innerHTML.split(/\n/);
        
    for (var i=0, line; line = lines[i]; i++){
      var parts       = line.split(":in "),
          pathAndLine = parts[0].split(":");    
      newHtml.push("<a href='txmt://open?url=file://", pathAndLine[0], "&amp;line=", pathAndLine[1], "&amp;column=1'>", line, "</a>\n");
    }
    node.innerHTML = newHtml.join("");
  }

}