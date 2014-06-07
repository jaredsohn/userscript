// ==UserScript==
// @name           Fix Ikariam Board
// @namespace      BlackWidow
// @autor          Black Widow (M-19)
// @version        0.0.9
// @homepage	   ikareports.com
// @description    Correction of style of an ikariam-forum (a background, citations, containers, spoiler, etc.)...
// @include        http://board.*.ikariam.gameforge.com/*
//
// @history        0.0.9 small corrections
// @history        0.0.8 small corrections in editor, containers and more....
// @history        0.0.7 small corrections
// @history        0.0.6 correction of style + code Is rewritten and arranged
// @history        0.0.5 the code Is rewritten and arranged
// @history        0.0.4 small corrections (WebKit, Mozilla 3.xx)
// @history        0.0.3 small corrections
// @history        0.0.2 small corrections
// @history        0.0.1 идея и первая реализация (1 сигарета затрат)
// ==/UserScript==

function BW(cssStyle) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssStyle;
    head.appendChild(style);
};

BW('.quoteBox .quoteHeader {background-color: #d7b283; border: 1px solid #d7b283; border-radius: 7px 7px 0 0;-webkit-border-radius: 7px 7px 0 0; -moz-border-radius: 7px 7px 0 0;}\n\
.quoteBox .quoteBody {background: #ffffdd; color: #837e6e; border: 1px solid #d7b283; border-radius: 0 0 7px 7px;-webkit-border-radius: 0 0 7px 7px; -moz-border-radius: 0 0 7px 7px;}\n\
.quoteBox .quoteHeader h3 {color: #fff; font-style: italic; text-shadow: 0.1em 0.1em 0.2em red;}\n\
.quoteBox .quoteHeader h3 a {color: #0053a6; text-shadow: 0.1em 0.2em 0.2em white;}\n\
.quoteBox .quoteHeader h3 a:hover {color: #ae00ae; text-shadow: 0.1em 0.2em 0.2em white;}\n\
.messageTitle {color: #ff0000; text-shadow: 0.1em 0.2em 0.2em white;}\n\
.message h4 {color: #ff0000; text-shadow: 0.1em 0.2em 0.2em white;}\n\
.resizeImage, .quoteBox, spoiler, container-4, blockquote.wysiwygQuote {background:#f6ebbd;}\n\
.messageLeft, .messageContent .messageContentInner {background:#f6ebbd;}\n\
.userPanel a, body, legend {color: #635f54;}\n\
.messageInner, .container-1 fieldset {background:#f6ebbd;}\n\
.mceToolbar, .subTabMenu ul li, .tabMenuContent container-1, .activeSubTabMenu {background:#f6ebbd;}\n\
.subTabMenu div.containerHead {background:#f6ebbd;}\n\
fieldset legend {color: #7e0d0a; text-shadow: 0.1em 0.2em 0.2em white; background:#f6ebbd; border: 1px solid #d7b283;}\n\
#main {background:#f6ebbd;}\n\
body,html{background-image:url("http://ru.ikariam.gameforge.com/img/pt-water-top.jpg");background-repeat:repeat-x;background-position:0px 0px;}');