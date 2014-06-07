// ==UserScript==
// @name           Google Pixelfehler
// @author         LSDCrawler
// @description    Einen coolen, peppigen Pixelfehler fuer dein Google!
// @include        http://google.ch/*
// @include        http://*google.ch/*
// @include        http://www.google.ch/*
// @include        http://www.*google.ch/*
// @include        https://mail.google.com/*
// ==/UserScript==
document.body.innerHTML += '<div id="jaja" style="position:fixed;top:300px;left:700px;background:red;z-index:10000;height:1px;width:1px;"></div>';

document.getElementById("jaja").addEventListener("mouseover", function() {
				alert("Super! Du hast den Pixelfehler doch noch gefunden!");
				alert("Ich hoffe, dass du ihn mit Groesster Sorgfalt behandelst!");
},false);

