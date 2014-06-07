// ==UserScript==
// @name GMail,_basic_HTML_reply_improved
// @namespace Yonatan Yoshpe
// @description Improve the usability of GMail basic HTML (reply and compose areas).  Larger textarea size, and font-size.
// @include        https://mail.google.com/mail/u/0/h/*
// @grant       none
// ==/UserScript==

var w = document.body.clientWidth * .8;
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.qr textarea { font-size: 125% !important; width: ' + w + 'px !important }' +
    'div.msg { font-size: 110% !important; }' +
    '.compose .mi { font-size: 125% !important; width: ' + w + 'px !important }';
document.getElementsByTagName("HEAD")[0].appendChild(link);
