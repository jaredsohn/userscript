// ==UserScript==
// @name           Ikariam -Open MMOGame
// @description    When you login to ikariam, script opens mmogame page.
// @include        http://s*.*.ikariam.*/index.php?action=loginAvatar&function=login
// @exclude        http://support*.ikariam.*/*
// @exclude        http://board*.ikariam.*/*
// ==/UserScript==

GM_openInTab("http://en.mmogame.com/");
