// ==UserScript==
// @name           userscripts.org forums search fixer
// @description    Converts search terms to lower case to avoid the bug in searching on the forums.
// @namespace      znerp
// @include        http://userscripts.org/*
// @exclude        http://userscripts.org/users/*
// @exclude        http://userscripts.org/people/*
// @exclude        http://userscripts.org/settings*
// ==/UserScript==

document.getElementById("right").getElementsByTagName("form")[0].setAttribute("onSubmit", "this.q.value = this.q.value.toLowerCase()");
