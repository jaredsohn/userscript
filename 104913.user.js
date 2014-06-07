// ==UserScript==
// @name           null
// @namespace      cat
// @include        http://pastebin.com/*
// @description    null
// ==/UserScript==
if(document.body.innerHTML.indexOf('download.php')>1) {
document.body.innerHTML = document.body.innerHTML.replace("/download.php","http://localhost/download.php");
}