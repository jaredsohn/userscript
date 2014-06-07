// ==UserScript==
// @name           maddox
// @namespace      http://userscripts.org/users/33073/scripts
// @description    shows you Maddox's secret comments
// @include        http://www.thebestpageintheuniverse.net/*
// @include        http://thebestpageintheuniverse.net/*
// @include        http://maddox.xmission.com/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/<\!--([^(-->)]*)-->/g, "<span style='background: #ffff00; color: #000;'>$1</span>");