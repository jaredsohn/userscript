// ==UserScript==
// @name           GeoclubForumReplaceButton
// @description    Ersetzt den "aendern" Button
// @namespace      tag:info@lifesuche.de,2013:userscripts
// @include        http://forum.geoclub.de*
// @version        1.03
// @grant          none
// ==/UserScript==

var b=document.getElementsByTagName("body")[0];
b.innerHTML = (b.innerHTML).replace( /\.\/styles\/gc2013\/imageset\/de\/icon_post_edit\.gif/gi, 'http://www.lifesuche.de/icon_post_edit_red.gif' );
b.innerHTML = (b.innerHTML).replace( /href="\.\/posting\.php\?mode=edit/gi, 'onclick="return confirm(\'Beitrag wirklich &auml;ndern?\')" href="./posting.php?mode=edit' );