// ==UserScript==
// @name        Zonowy SB
// @namespace   C:/tdm2.js
// @include     http://www.tdm.pl/chat/chat.php?uid=*
// @version     1
// ==/UserScript==

var sb = document.getElementById('bb_sbox_messages');
var msgI = document.getElementById('msgString');

msgI.style.width = (window.innerWidth-60)+'px';
sb.style.height = (window.parent.innerHeight-40)+'px';
sb.style.width = 'auto';