// ==UserScript==
// @name           Hide Blip Recommendations
// @namespace      Morden - http://morden.blog.shinobi.jp
// @description    Hides recommendations on Blip.pl
// @include        http://blip.pl/*
// @include        https://blip.pl/*
// ==/UserScript==

document.getElementById("recommended-box").style.display = "none";