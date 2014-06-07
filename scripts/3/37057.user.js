// ==UserScript==
// @name           Myspace Bulletin Title Rewrite
// @namespace      http://userscripts.org
// @include        http://bulletins.myspace.com/*
// ==/UserScript==

//var text = document.getElementById("ctl00_ctl00_cpMain_cpMain_BulletinRead_ltl_subject").textContent;
document.title = document.getElementById("ctl00_ctl00_cpMain_cpMain_BulletinRead_ltl_subject").textContent ;