// ==UserScript==
// @name          Texts Replace DMCA
// @namespace     text/replacedmca
// @description   Replaces DMCA
// @include       http://leakforums.org*
// @include       http://www.leakforums.org*
// @version 	  1.2
// ==/UserScript==

var html = document.body.innerHTML;
html = html.replace( /www.leakforums.org\/dmca.php(.*?)/g, 'www.leakforums.org\/forumdisplay.php?fid=173' );
document.body.innerHTML = html;

var html = document.body.innerHTML;
html = html.replace( /DMCA<\/a><\/span>(.*?)/g, '<font color=\"#EE77CC\">Anime<\/a><\/span><\/font>' );
document.body.innerHTML = html;

var html = document.body.innerHTML;
html = html.replace( /netdna.leakforums.org\/images\/LeakForumsFour\/lf.png(.*?)/g, 'i.imgur.com\/h0GLkB7.png' );
document.body.innerHTML = html;