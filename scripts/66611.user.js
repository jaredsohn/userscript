// ==UserScript==
// @name          Drudge Links 2
// @namespace     http://localhost
// @description   Removes the links.
// @include       http://www.drudgereport.com/*
// @include       http://www.drudgereportarchives.com/*
// @include       http://drudgereport.com/*
// ==/UserScript==

var src = document.body.innerHTML;

// Fix page height
src = src.replace(/height(.*)2500/gi,"height$1 0");

src = src.replace(/L I N K S +F I R S T +C O L U M N([\S\s]*?)SECOND COLUMN.*-->/i,"-->");
src = src.replace(/L I N K S +S E C O N D +C O L U M N([\S\s]*?)THIRD COLUMN.*-->/i,"-->");
src = src.replace(/L I N K S([\S\s]*?)Copyright.*Drudge Report/i,"");

document.body.innerHTML = src;
return;