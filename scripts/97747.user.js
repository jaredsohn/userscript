// ==UserScript==
// @name           Change Ikariam Forum background
// @namespace      http://ikariam.com.netw.gr	
// @autor          A-thnanatos
// @description    Change Ikariam Forum background
// @include        http://board.*.ikariam.*/*
// @include        http://board.ikariam.*/*
// @include        http://support.ikariam.*/*
// @version        0.1
// ==/UserScript==

function BW(cssStyle) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssStyle;
    head.appendChild(style);
}

BW('.quoteBox .quoteHeader {background-color: #ebc182; border: 1px solid #ebc182; border-radius: 7px 7px 0 0;-webkit-border-radius: 7px 7px 0 0; -moz-border-radius: 7px 7px 0 0;}\n\
.quoteBox .quoteBody {border: 1px solid #ebc182; border-radius: 0 0 7px 7px;-webkit-border-radius: 0 0 7px 7px; -moz-border-radius: 0 0 7px 7px;}\n\
.quoteBox .quoteHeader h3 {color: #ebc182; font-style: italic;}\n\
.quoteBox .quoteHeader h3 a {color: #ebc182;}\n\
.quoteBox .quoteHeader h3 a:hover {color: #ebc182;}\n\
.quoteBox .quoteBody {background: #ebc182; color: #ebc182;}\n\
.quoteBox, spoiler, container-4, blockquote.wysiwygQuote {background:#ebc182;}\n\
body,html{background-image:url("../images/ikariam/footer.png")}');
