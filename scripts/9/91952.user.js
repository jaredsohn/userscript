// ==UserScript==
// @name           Blogger Allow Save Password
// @namespace      limedaley.com
// @description    Blogger disables saving passwords
// @include        https://www.blogger.com/blogin*
// ==/UserScript==
var passwd = document.getElementById("f-Passwd");
if(passwd){
  passwd.setAttribute("autocomplete", "on");
}
