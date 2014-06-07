// version 1.3 BETA!
// 2011-07-14
// ==UserScript==
// @name  BBC Urdu Font Changer
// @namespace     http://chaoticity.com/how-to-change-font-on-the-bbc-urdu-website/
// @copyright 2011+, Awais Athar
// @license (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @description   Changes font of the BBC Urdu website
// @match  http://*.bbc.co.uk/urdu/*
// @include  http://*.bbc.co.uk/urdu/*
// @match http://*.bbc.co.uk/*/urdu/*
// @include http://*.bbc.co.uk/blogs/urdu/*
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

addGlobalStyle('#blq-main ,#blq-footlinks a ,h1, h2, h3, h4, h5, h6, th, .bodytext p.ingress, #blq-foot .lang-tg,#blq-foot .lang-ps,#blq-foot .lang-ar ,.blq-rst *, .blq-rst input, .blq-rst a:link, .blq-rst a:visited ,.lastupdated ,  #email-us .validate input[type="text"], .validate textarea , #email-us .validate .submit, #email-us .validate .reset,.list .teaser .title,.li-dropdown input,.li-dropdown select, .blq-clearfix, div#blq-content input, div#blq-content input#comment-submit, div#blq-content textarea, .content, .post, .bookmark, .datestamp, a   { font-family: "Alvi Nastaleeq v1.0.0","Alvi Nastaleeq","Fajer Noori Nastalique","Jameel Noori Nastalieeq", Tahoma !important; } #blq-nav-main a {font-family:Arial, Sans serif  !important;;');
