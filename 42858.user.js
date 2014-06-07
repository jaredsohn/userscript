// ==UserScript==
// @name           Travian support 0.1
// @namespace      ru.kirilloid.travian
// @include        http://s*.travian.ru/nachrichten.php
// ==/UserScript==

if (document.getElementById('receiver')) {
	reciever_nick = document.getElementById('receiver').value;
	document.getElementById('message').value =
		"Здравствуйте, " + reciever_nick + "\n\n" + "С уважением, служба поддержки." +
		document.getElementById('message').value;
}