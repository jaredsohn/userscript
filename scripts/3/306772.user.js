// ==UserScript==
// @name        Pager for me
// @namespace   qixinglu.com
// @description Good stuff
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @require     https://github.com/muzuiget/greasemonkey-scripts/raw/f65aa174999cc6c3f3660cb39efd9c818c7988b2/light_pager.user.js
// @include     http*://www.google.com/search?*
// @include     http*://www.1182.ee/*
// ==/UserScript==

var GLOBAL = {
    separate: true,
    loadingHTML: 'Loading：<a href="${url}">${current} / ${total}<a/>',
    loadedHTML: 'Page：<a href="${url}">${current} / ${total}<a/>',
    count: 280,
    height: 0.9
};
var SITES = [
{
    title: 'Google Search',
    url: 'http*://www.google.com/search?*',
    next: '#pnnext',
    content: '#center_col',
    style: '.lp-sep {' +
           '    width: 528px;' +
           '    margin-left: 128px;' +
           '    margin-bottom: 20px;' +
           '    background-color: #EBEFF9;' +
           '}',
    separateInside: false,
},
{
    title: '1182',
    url: 'http*://www.1182.ee/*',
    next: '.pn-next',
    content: 'div.companies-list',
    style: '.lp-sep {' +
           '    background-color: #DEF2C6;' +
           '    border-radius: 5px 5px 5px 5px;' +
           '}',
    separateInside: false,
}
];

var register_menus = function(control) {
    GM_registerMenuCommand('Start', control.start_paging, 's');
    GM_registerMenuCommand('Continue', control.continue_paging, 'c');
    GM_registerMenuCommand('Stop', control.stop_paging, 't');
};

var site = select_site(SITES);
if (site !== null) {
    setup_site_global(site, GLOBAL);
    var control = light_pager(site);
    register_menus(control);
}