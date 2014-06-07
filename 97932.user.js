// ==UserScript==
// @name           EuroGamer black skin v 1.0
// @namespace      http://eurogamer.it/*
// @description    Interfaccia grafica a tonalità di grigio con sfondo nero per eurogamer.
// @include        http://www.eurogamer.it/*
// @author	   demonbl@ck
// ==/UserScript==

//======J4GIFS-LIKE PAGE STYLE

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
	addGlobalStyle('.userName a { float:none !important;}');
	addGlobalStyle('.userName { float:none !important; clear: none !important; line-height: 25%;}');
	addGlobalStyle('.avatar { margin-top:10px !important;}');

//===== sfondo pagina 
	document.body.style.background="#000000";
	addGlobalStyle('#main { background-color: #000000;}');

//====== cambia colore ai link

	addGlobalStyle('a { color: #DDDDDD;}');
	addGlobalStyle('#links a { color: #000000 !important;}');
	addGlobalStyle('.pages a { color: #DDDDDD !important;}');
	addGlobalStyle('#forum-tabs a, #forum-tabs a:visited { color: #000000 !important;}');
	addGlobalStyle('.heading a,.heading span { color: #DDDDDD !important;}');
//eccezione per i link nei messaggi:

	addGlobalStyle('.message a, .message a:visited { color: #3333B3 !important; text-decoration: underline !important;}');

//eccezione per i link nella toolbar:

	addGlobalStyle('a.input { color: #FFFFFF !important; text-decoration: none !important;}');

//eccezione dell'eccezione (yo dawg i heard u liek exceptions)
	addGlobalStyle('a.me { color: #000000 !important; text-decoration: none !important;}');



//====== cambia colore ai tag "argomenti" "j4s" interessante ecc

	addGlobalStyle('h2,h1, .first { color: #DDDDDD !important;}');
	addGlobalStyle('.forumThreadList th { color: #DDDDDD !important; background-color: #222222 !important; border-left: none !important; border-top: 5px solid #000000; border-right: 5px solid #000000; border-bottom: 5px solid #000000;}');



//====== cambia colore agli sfondi dei messaggi


	addGlobalStyle('.forumThreadList tbody tr.strip1 td, .forumThreadList tbody tr.strip1 th { background-color: #333333 !important; border-top: none !important; border-left: none !important; border-right: 5px solid #000000; border-bottom: 5px solid #000000;}');

	addGlobalStyle('.forumThreadList tbody tr.strip2 td, .forumThreadList tbody tr.strip2 th { background-color: #222222 !important; border-top: none !important; border-left: none !important; border-right: 5px solid #000000; border-bottom: 5px solid #000000;}');

//	cambia colore al testo dei messaggi

	addGlobalStyle('.forumThreadList tbody tr.strip1 td, .forumThreadList tbody tr.strip1 th { color: #DDDDDD !important; }');

	addGlobalStyle('.forumThreadList tbody tr.strip2 td, .forumThreadList tbody tr.strip2 th { color: #DDDDDD !important; }');
//==== correzione bug bordi blu

	addGlobalStyle('tr.heading th{ border-bottom: 5px solid #000000 !important; border-top: none !important;}');

//===== colore del testo "messaggio cancellato/ignorato"
	addGlobalStyle('div.ignored{ color:#aa0000 !important; font-weight:bold !important;}');

//===== cambia colore ai quote, firme e pager al fondo + box users online + link delle pagine in thread multipagina


	addGlobalStyle('blockquote.quote{ display: block; color: #DDDDDD; border: 5px solid #000000; background-color: #1E1E1E;}');
	addGlobalStyle('div.sig {color: #dddddd; border-top: 2px solid #000000; }');
	addGlobalStyle('div.pager {color: #DDDDDD; background-color: #000000; border: 1px solid #DDDDDD;}');
	addGlobalStyle('#users-online {color: #DDDDDD; background-color: #000000; border: 1px solid #DDDDDD;}');
	addGlobalStyle('#users-online a,#users-online a:visited {color: #3333B3; background-color: #000000; border: none !important;}');
	addGlobalStyle('div.pages {color: #DDDDDD !important;}');
	addGlobalStyle('#phat-footer {background-color: #6c6c6c !important;}');
	addGlobalStyle('.links a,.links a:visited, .copyright a,.copyright a:visited {color: #3333b3 !important;}');
	addGlobalStyle('.reply {background-color: #6c6c6c !important; color: #000000 !important;}');
//===== cambia colore ai pulsanti

	addGlobalStyle('img.fTab-tleft,img.fTab-tright { width:0px !important; height: 0px !important; }');
	addGlobalStyle('.fTab {background: #757576 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('.submit {color:#000000 !important; background: #757576 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('a.backward {color:#000000 !important; background: #757576 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('a.forward {color:#000000 !important; background: #757576 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important;}');
	addGlobalStyle('form.inline-reply input {color:#000000 !important; background: #757576 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important; }');
	addGlobalStyle('input.button {color:#000000 !important; background: #757576 url(../img/forums/tabs/ftab-on-bg.gif) repeat-x top !important; margin: 0px 0px 0px 5px !important; border: 1px solid #000000 !important; }');
	addGlobalStyle('div.postOptions {color: #DDDDDD !important; background: #1B1B1B !important; border-left: 1px solid #AAAAAA !important; border-top: 1px solid #AAAAAA !important; border-right: 1px solid #DDDDDD !important; border-bottom: 1px solid #DDDDDD !important; margin-left: 150px; }');

//====== fine cambia colore








