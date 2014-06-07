// ==UserScript==
// @name          Texts Replace DMCA - Anime
// @namespace     text/replacedmca
// @description   Replaces DMCA link with Anime.
// @include        http://www.leakforums.org/*
// @include        https://leakforums.org/*
// @version 	  1.0
// ==/UserScript==

var html = document.body.innerHTML;
html = html.replace( /www.leakforums.org\/dmca.php(.*?)/g, 'www.leakforums.org\/forumdisplay.php?fid=173' );
document.body.innerHTML = html;

var html = document.body.innerHTML;
html = html.replace( /DMCA<\/a><\/span>(.*?)/g, '<font color=\"#EE77CC\">Anime<\/a><\/span><\/font>' );
document.body.innerHTML = html;