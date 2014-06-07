// ==UserScript==
// @name           Omerta Black Theme
// @namespace      Padr3_Naz1@hotmail.com
// @description    Omerta Black Theme by Padre
// @include        http://*barafranca.*/*
// @include        http://barafranca.gen.tr/*
// @include        http://*barafranca.gen.tr/*
// @include        http://barafranca.gen.tr*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function bgcolor(){
	dlp = document.location.pathname;
	if (dlp == '/mid.php' || dlp == '/mailbox.php' || dlp == '/pic.php' || dlp == '/right.php' || dlp == '/info.php' || dlp == '/menu.php'){
	addGlobalStyle('body {background-color: #000000 ! important; }');

	}
}


//addGlobalStyle('p { font-size: large ! important; }');

addGlobalStyle('#menu th, #info th {background-color: #000000 ! important; }');
addGlobalStyle('#marquee {background-color: #000000 ! important; }');
addGlobalStyle('a.menuLink {background-color: #000000 ! important; }');
addGlobalStyle('a.menuLink {border-bottom: 1px solid #000000 ! important; }');
addGlobalStyle('a.menuLink:hover {background-color: #000000 ! important; }');
addGlobalStyle('#menu th, #info th {color: #d4af37 ! important;}');
addGlobalStyle('#marquee a {color: #d4af37 ! important;}');
addGlobalStyle('#marquee {color: #d4af37 ! important;}');
addGlobalStyle('#menu td.container {background-color: #000000 ! important;}');
addGlobalStyle('#status .chat {background-color: #000000 ! important;}');
addGlobalStyle('#status .chat {border: 1px solid #000000 ! important;}');
addGlobalStyle('#menu td.container {border-bottom: 1px solid #000000 ! important;}');
addGlobalStyle('#menu th, #info th {border-bottom: 1px solid #1c0000 ! important;}');
addGlobalStyle('#marquee {border-bottom: 1px solid #000000 ! important;}');
addGlobalStyle('#marquee {border-top: 1px solid #000000 ! important;}');


bgcolor();