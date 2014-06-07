// ==UserScript==
// @name        ur mem
// @namespace   dx
// @include     http://www.memrise.com/*
// ==/UserScript==
(function a(s,d,f,g,h) {if (s&&(s=s.firstChild)){do {if (s[g]==3&&!/^\s*$/.test(s[f]))
{s[f]=s[f].replace(RegExp(d.substr(3),'i'),d);}if (s[g]==1&&s){a(s,d,f,g,h)};}
while(s=s.nextSibling);}})(document.body, GM_info.script.name, "nodeValue", "nodeType");