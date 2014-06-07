// ==UserScript==
// @name        MisterMV on ZeratoR for SGDQ
// @namespace   nico0807
// @include     http://www.eclypsia.com/fr/ZeratoR
// @include     http://webchat.quakenet.org/*
// @version     1
// ==/UserScript==

(function() {
         
	var ifrm = document.createElement('iframe');
	ifrm.setAttribute("src", "http://twitch.tv/chat/embed?channel=mistermv&amp;popout_chat=true");
    ifrm.setAttribute("frameborder", "0");
    ifrm.setAttribute("scrolling", "no");
    ifrm.setAttribute("id", "chat_embed");
    ifrm.setAttribute("height", "570");
    ifrm.setAttribute("width", "100%");



	var elmExtra = document.getElementById('ircui');
	elmExtra.parentNode.replaceChild(ifrm, elmExtra);
}
)();

