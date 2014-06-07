// ==UserScript==
// @name           dossergame-chat
// @namespace      phoenix85
// @description    Samo za clanove "Omerta"-bande
// @include        http://*dossergame.co.uk*
// @exclude        http://*dossergame.co.uk/change_please/*
// ==/UserScript==

var abstand_von_rechts = '1030px';

document.getElementById('copy').innerHTML = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="700" height="550" name="chat" FlashVars="id=58814761&rl=Serbian" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=58814761">Go Large!</a></small><br>';
// Copyright by Dossergame-"Omerta"-gang    |     www.error.gs