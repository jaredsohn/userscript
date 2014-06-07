// ==UserScript==
// @name           fs-no-communism
// @namespace      http://userscripts.org/users/133663
// @description    Remove +Share Facebook links from formspring.
// @include        http://www.formspring.me/*
// ==/UserScript==

// lol no dotall flag in javascript
document.body.innerHTML = document.body.innerHTML.replace(/\n/g,'\ufffd').replace(/<a onclick="fspring\.fbShare(.*?)<\/a>/g, "<!-- Better dead than Red! -->").replace(/\ufffd/g,'\n');