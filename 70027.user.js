// ==UserScript==
// @name           postcount
// @namespace      postcount
// @description    postcount
// @include        http://forum.onzin.com/*
// @include        http://www.onzin.com/*
// ==/UserScript==

document.body.innerHTML= document.body.innerHTML.replace(/<!--<img src=\"img\/pro.gif\" alt=\"Profiel\" title=\"Profiel\"\/>-->/g,"");
document.body.innerHTML= document.body.innerHTML.replace(/<!--/g,"");
document.body.innerHTML= document.body.innerHTML.replace(/--&gt;/g,"");