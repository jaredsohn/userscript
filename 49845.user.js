// ==UserScript==
// @name           absnet
// @version        1.0
// @namespace      http://userscripts.org/users/91654
// @description    Add a nice horizontal line on the separators.
// @author         Zmetser
// @e-mail         zmetser@gmail.com
// @include        http://www.absolutionet.hu/*
// ==/UserScript==

var separator = document.getElementsByClassName('seperator');

for (var i=0, len=separator.length; i<len; i++)
  {
    var line = document.createElement('div');
    line.style.position   = "absolute";
    line.style.top        = "8px";
    line.style.left       = "3px";
    line.style.width      = "724px";
    line.style.height     = "3px";
    line.style.background = "#0F354F";
    
    separator[i].style.position = "relative";
    separator[i].appendChild(line);
    console.log(separator[i]);
  }