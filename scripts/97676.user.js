// ==UserScript==
// @name           EuroGamer tgm skin v 0.99 beta
// @namespace      http://eurogamer.it/*
// @description    Interfaccia grafica tgm-like per eurogamer, v 0.99 beta
// @include        http://www.eurogamer.it/*
// @author	   demonbl@ck
// ==/UserScript==

//======TGM-LIKE PAGE STYLE

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	addGlobalStyle('small.status {color: #BB0000 !important; font-size: 120%; position: relative; top: 5px;}');

//===== sfondo pagina 
	document.body.style.background="#273556";
// bluetto 1 bfd2f3
// bluetto 2 a5b5d9
// sfondo blu scuro #273556

//====== cambia colore ai link

	addGlobalStyle('a { color: #000000;}');
	addGlobalStyle('#links a { color: #000000 !important;}');
	addGlobalStyle('.pages a { color: #000000 !important;}');
	addGlobalStyle('#forum-tabs a, #forum-tabs a:visited { color: #000000 !important;}');
	addGlobalStyle('.heading a,.heading span { color: #000000 !important;}');
//eccezione per i link nei messaggi:

	addGlobalStyle('.message a, .message a:visited { color: #000080 !important; text-decoration: underline !important;}');

//eccezione per i link nella toolbar:

	addGlobalStyle('a.input { color: #FFFFFF !important; text-decoration: none !important;}');

//eccezione dell'eccezione (yo dawg i heard u liek exceptions)
	addGlobalStyle('a.me { color: #000000 !important; text-decoration: none !important;}');



//====== cambia colore ai tag "argomenti" "j4s" ecc

	addGlobalStyle('h2 { color: #000000 !important;}');
	addGlobalStyle('.forumThreadList th { color: #000000 !important; background-color: #a5b5d9 !important; border: 1px solid #000000 !important;}');



//====== cambia colore agli sfondi dei messaggi


	addGlobalStyle('.forumThreadList tbody tr.strip1 td, .forumThreadList tbody tr.strip1 th { background-color: #bfd2f3 !important; border: 1px solid #000000;}');

	addGlobalStyle('.forumThreadList tbody tr.strip2 td, .forumThreadList tbody tr.strip2 th { background-color: #bfd2f3 !important; border: 1px solid #000000;}');

//==== correzione bug bordi blu

	addGlobalStyle('tr.heading th{ border-bottom: 5px solid #6c6c6c !important; border-top: none !important;}');

//===== cambia colore ai quote, firme e pager al fondo

	addGlobalStyle('blockquote.quote{ display: block; color: #000000; border-left: 1px solid #000000; border-right: 1px solid #6c6c6c; border-top: 1px solid #000000; border-bottom: 1px solid #6c6c6c; background-color: #a5b5d9;}');
	addGlobalStyle('div.sig {color: #000000;border-top: 2px solid #000000; }');
	addGlobalStyle('div.pager {color: #000000; background-color: #a5b5d9; border: 1px solid #000000;}');
	addGlobalStyle('#users-online {background: #a5b5d9 !important; border: 1px solid #000000 !important; }');
//===== cambia colore ai pulsanti

	addGlobalStyle('img.fTab-tleft,img.fTab-tright { width:0px !important; height: 0px !important; }');
	addGlobalStyle('.fTab {background: #a5b5d9 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('.submit {color:#000000 !important; background: #a5b5d9 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('a.backward {color:#000000 !important; background: #a5b5d9 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('a.forward {color:#000000 !important; background: #a5b5d9 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('form.inline-reply input {color:#000000 !important; background: #a5b5d9 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important; }');
	addGlobalStyle('input.button {color:#000000 !important; background: #a5b5d9 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important; }');
	addGlobalStyle('div.postOptions {background: #a5b5d9 !important; border-left: 1px solid #000000 !important; border-top: 1px solid #000000 !important; border-right: 1px solid #727272 !important; border-bottom: 1px solid #727272 !important; margin-left: 150px; }');

//====== fine cambia colore








