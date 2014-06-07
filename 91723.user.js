// ==UserScript==
// @name           leemails
// @namespace      leemails
// @include        http://leemails.com/index.php?p=track&t=clic&cid=*
// ==/UserScript==
setTimeout('window.location.href=window.location.href.split(\'cid=\')[0]+\'cid=0\'+window.location.href.split(\'cid=\')[1]',31000);