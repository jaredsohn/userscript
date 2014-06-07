// ==UserScript==
// @name         4clean
// @namespace    http://userscripts.org/users/192057
// @description  Cleans up 4chan
// @version      1.2
// @run-at       document-end
// @include      http://boards.4chan.org/*
// @include      http://green-oval.net/cgi-board.pl/*
// @match        http://boards.4chan.org/*
// @match        http://green-oval.net/cgi-board.pl/*
// ==/UserScript==

var style;
style = document.createElement('style');
style.type = 'text/css';

function addGlobalStyle(css) {
   style.innerHTML = style.innerHTML + "\n" + css;
}

function parseGlobalStyle() {
   style.innerHTML = "/* 4clean css */\n" + style.innerHTML
   var head;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   head.appendChild(style);
}

//> Header

//logo
addGlobalStyle(".logo img { display:none; }");
addGlobalStyle(".logo { margin:-10px 0 33px; }");
addGlobalStyle(".logo { font-family:helvetica,sans; }");
addGlobalStyle(".logo span { font-size:48px; }");
addGlobalStyle(".logo b span { font-family:helvetica,sans; }");
//green-oval
addGlobalStyle("h1 { padding:13px 0 0; }");

//postarea
addGlobalStyle(".postarea { padding-left:0; }");
addGlobalStyle(".postarea form div { display:none; }"); //ad shit
addGlobalStyle(".postarea form table tr td div { display:block; }");

//rules
addGlobalStyle(".rules { display:none; }");


//> Threads

//borders
addGlobalStyle("hr { visibility:hidden; }");

//the '>>'
addGlobalStyle(".doubledash { display:none; }");

//> Footer
addGlobalStyle(".pages { padding:-10px 0 0; }");

//center
addGlobalStyle("#footer br { display:none; }");
addGlobalStyle("#footer center { display:none; }");


//> Parse
parseGlobalStyle();