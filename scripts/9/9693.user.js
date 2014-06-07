// ==UserScript==
// @name          Switch phpBB direction
// @description   Adds a "Switch Direction" link to the post textarea in phpBB
// @include       http://forums.asat.org.il/*
// @include       http://*.hapetek.co.il/forums/*
// ==/UserScript==

script = "current_dir = document.post.message.style['direction'];";
script += "document.post.message.style['direction'] = ";
script += "(current_dir == 'ltr' ? 'rtl' : 'ltr'); return false";

link = "<a href=\"#\" onClick=\"" + script + "\">Switch direction</a>";

window.addEventListener("load", function(e) {
        document.getElementsByName("message")[0].parentNode.innerHTML += link;
}, false);