// ==UserScript==
// @name           F1Time.com Autologin
// @namespace      http://userscripts.org/users/26666
// @include        http://www.f1time.com/index.php
// @include        http://www.f1time.com/
// ==/UserScript==

var _=document.getElementById("username"),$=document.getElementById("password");window.addEventListener("load",function(B){(function A(){_.focus();$.focus();if(_.value.length&&$.value.length)document.forms[0].submit();else window.setTimeout(A,500)})()},false)
