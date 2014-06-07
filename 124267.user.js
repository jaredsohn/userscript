// ==UserScript==
// @name           UniversFreebox
// @namespace      universfreebox
// @include        http://www.universfreebox.com/*
// ==/UserScript==

var js = document.createElement("script");
js.setAttribute("type", "text/javascript");
js.innerHTML = "$(document).ready(function() {$('#load_commentaires').click();});";
document.getElementsByTagName("body")[0].appendChild(js);