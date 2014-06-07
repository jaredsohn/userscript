// ==UserScript==
// @name           EuroGamer J4GIFS skin v 0.85 beta
// @namespace      http://eurogamer.it/*
// @description    Interfaccia grafica a tonalità di grigio per eurogamer, j4gifs-like
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

//===== sfondo pagina 
	document.body.style.background="#6c6c6c";


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
	addGlobalStyle('.forumThreadList th { color: #000000 !important; background-color: #AFAFAF !important; border-left: none !important; border-top: 5px solid #6c6c6c; border-right: 5px solid #6c6c6c; border-bottom: 5px solid #6c6c6c;}');



//====== cambia colore agli sfondi dei messaggi


	addGlobalStyle('.forumThreadList tbody tr.strip1 td, .forumThreadList tbody tr.strip1 th { background-color: #AFAFAF !important; border-top: none !important; border-left: none !important; border-right: 5px solid #6c6c6c; border-bottom: 5px solid #6c6c6c;}');

	addGlobalStyle('.forumThreadList tbody tr.strip2 td, .forumThreadList tbody tr.strip2 th { background-color: #A0A0A0 !important; border-top: none !important; border-left: none !important; border-right: 5px solid #6c6c6c; border-bottom: 5px solid #6c6c6c;}');


//===== cambia colore ai quote

	addGlobalStyle('blockquote.quote{ display: block; color: #000000; border-left: 5px solid #6c6c6c; border-right: 5px solid #6c6c6c; border-top: 5px solid #6c6c6c; border-bottom: 5px solid #6c6c6c; background-color: #BFBFBF;}');
	addGlobalStyle('div.sig {color: #000000;border-top: 2px solid #e8e8e8; }');
	addGlobalStyle('div.pager {color: #000000; background-color: #a0a0a0; border-left: 1px solid #fafafa; border-top: 1px solid #fafafa; border-right: 1px solid #fafafa; border-bottom: 1px solid #fafafa;}');
//====== fine cambia colore




