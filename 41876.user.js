// ==UserScript==
// @name           redbox
// @namespace      redbox
// @include        http://img.4chan.org/b/*
// ==/UserScript==

redbox = document.getElementsByTagName('blockquote');
var i = 0



while (i<=redbox.length) {
if (redbox[i].innerHTML.match("Open this image")=="Open this image")
{
redbox[i].innerHTML="";

}
i++;
}