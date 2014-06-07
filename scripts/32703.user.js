// ==UserScript==
// @name Blog.pl Auto-Captcha
// @description Automagicly inserts vaildiation code into input
// @author zimaq
// @version 1.1
// @include        http://*.blog.pl/komentarze/dodaj.php?nid=*
// ==/UserScript==

document.getElementById("www").value = document.getElementsByTagName("strong")[0].innerHTML;