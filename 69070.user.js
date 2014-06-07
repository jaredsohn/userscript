// ==UserScript==
// @name           Formspring.me++
// @namespace      #aVg
// @include        http://www.formspring.me/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
GM_addStyle("#profilePhoto{max-width:350px;margin-top:20px;} #profileUser {width:100%!important} #profile {margin:0!important}");
var p = document.getElementById("profilePhoto");
p.src = p.src.replace(/_thumb/, "");
p.removeAttribute("width");
p.addEventListener("click", function() {
	GM_openInTab(this.src);
}, false);