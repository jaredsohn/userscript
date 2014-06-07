// ==UserScript==
// @name           Some text changes(CSM)
// @description    Change the text for some places
// @include        http://www.cs-manager.com/csm/*
// @include        http://www.cs-manager.com/*
// @include        http://www.cs-manager.com/
// @include        http://www.cs-manager.com
// ==/UserScript==

var nnm = document.getElementById("shortcuts");
nnm.innerHTML = nnm.innerHTML.replace(/Set this as home/gi,"<i>set this as home<\/i>");

var clan = document.getElementById("clanpress");
clan.innerHTML = clan.innerHTML.replace(/No press/gi,"");
