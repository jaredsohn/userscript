// ==UserScript==
// @name           Nowy wykop.pl - szerokość 90% / width 90%
// @namespace      wykop.pl
// @description    Szerokość strony 90%
// @include        http://*.wykop.pl/*
// @include        http://wykop.pl/*
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


    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
        $("#sidebar script").remove();
        sidebar = $("#sidebar");
        $(sidebar).parent().prepend( $(sidebar) );

addGlobalStyle('#content { float: none !important;  min-width:800px !important; margin-right: 320px !important; width:auto !important; }');
addGlobalStyle('#sidebar { float:right !important; width:300px !important; }');
addGlobalStyle('.wrapper { width: 90% !important; }');
addGlobalStyle('.content_show { display: block !important; }');
addGlobalStyle(' #body-container .wrapper ul.comments-list > li blockquote {width:95% !important;} ');
addGlobalStyle('* {clear:none !important;}');
addGlobalStyle('#header-container .wrapper ul#main-menu li#main-list{clear:both !important;}');
addGlobalStyle('#header-container .wrapper ul#main-menu li#sub-list{clear:both !important;}');


    }