// ==UserScript==
// @name          imenu-skip
// @namespace     http://userscripts.org/users/kawaz
// @description   ime.nuをスキップしてURLに飛ぶ
// @include       http://ime.nu/*
// ==/UserScript==
location.replace(document.querySelector("a").href);