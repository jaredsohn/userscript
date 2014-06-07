// @name Blogspot Frame Bypass
// @description No more frames!
/*
// ==UserScript==
// @name           Blogspot Frame Bypass
// @description    No more frames!
// @namespace      http://userscripts.org/users/110203

// @include        http://*
// @version        0.0.1.a
// ==/UserScript==
---

var injectedframe = document.getElementById('injected-iframe');
injectedframe.parentElement.removeChild(injectedframe);
document.childNodes[1].childNodes[2].childNodes[2].innerHTML = '';