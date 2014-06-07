{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           leemails\par
// @namespace      leemails\par
// @include        http://leemails.com/index.php?p=track&t=clic&cid=*\par
// ==/UserScript==\par
setTimeout('window.location.href=window.location.href.split(\\'cid=\\')[0]+\\'cid=0\\'+window.location.href.split(\\'cid=\\')[1]',31000);\par
}
