// ==UserScript==
// @name           Younggay Chat Autologout
// @namespace      Alles
// @include        http://*younggay.de/community/chat/index.php
// ==/UserScript==

//Event auf <body> Tag setzen
document.getElementsByTagName('body')[0].setAttribute( "onbeforeunload" , 'ajaxChat.logout();' );