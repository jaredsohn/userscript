// ==UserScript==
// @name           Javascript Weblog - Fix Title
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Remove the javascript.webloginc.com from the title
// @include        http://javascript.weblogsinc.com/*
// ==/UserScript==

document.title = document.title.replace(/- javascript.weblogsinc.com/, "");


