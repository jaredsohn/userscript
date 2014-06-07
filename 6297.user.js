// ==UserScript==
// @name           Ehrensenf Download Link
// @namespace      net.moeffju.gm.uifix.ehrensenf.dllink
// @description    Immediately show the Download link at Ehrensenf
// @include        http://www.ehrensenf.de/*
// @include        http://ehrensenf.de/*
// ==/UserScript==

if (var dllink = document.getElementById('downloadLink')) { dllink.style.visibility = 'visible'; }
