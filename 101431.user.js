// ==UserScript==
// @name           metalarea.org autologin
// @namespace      kalevil.metalarea
// @description    Metalarea.org autologin
// @include        http://metalarea.org/forum/index.php?act=Login*
// ==/UserScript==


setTimeout("document.forms[1].submit.name='submit_btn';", 100)
setTimeout("delete document.forms[1].submit", 200)
setTimeout("document.forms[1].submit()", 300)

