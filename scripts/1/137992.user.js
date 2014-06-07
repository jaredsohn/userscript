// ==UserScript==
// @name        Light Pager Chinalist
// @namespace   qixinglu.com
// @description 内置中文网站的 Light Pager 自动翻页规则
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @require     https://github.com/muzuiget/greasemonkey-scripts/raw/f65aa174999cc6c3f3660cb39efd9c818c7988b2/light_pager.user.js
// @include     http://*.douban.com/*
// @include     http://tieba.baidu.com/p/*
// @include     http://bbs.tianya.cn/post-*.shtml
// ==/UserScript==

var GLOBAL = {
    separate: true,
    loadingHTML: '正在加载：<a href="${url}">${current} / ${total}<a/>',
    loadedHTML: '页数：<a href="${url}">${current} / ${total}<a/>',
    count: 9,
    height: 0.9
};
var SITES = [
{
    title: '豆瓣',
    url: 'http://*.douban.com/*',
    next: 'span.next a',
    content: 'div.article',
    position: '#content div.extra',
    hidden: 'div.article:not(.lp-first) table.infobox, ' +
            'div.article:not(.lp-first) div.block5, ' +
            'div.article:not(.lp-last) div.paginator ~ *',
    style: 'div.lp-sep { margin: 0 0 20px 0; }',
},
{
    title: '百度贴吧',
    url: 'http://tieba.baidu.com/p/*',
    next: 'li.l_pager a:contains("下一页")',
    content: 'div.core',
    style: 'div.lp-sep {' +
           '    margin: 10px 0 0 0;' +
           '    border: 1px solid #CCCCCC;' +
           '}',
},
{
    title: '天涯',
    url: 'http://bbs.tianya.cn/post-*.shtml',
    next: 'a.js-keyboard-next',
    content: 'div.atl-main',
}
];

var register_menus_cn = function(control) {
    GM_registerMenuCommand('开始翻页', control.start_paging, 's');
    GM_registerMenuCommand('继续翻页', control.continue_paging, 'c');
    GM_registerMenuCommand('停止翻页', control.stop_paging, 't');
};

var site = select_site(SITES);
if (site !== null) {
    setup_site_global(site, GLOBAL);
    var control = light_pager(site);
    register_menus_cn(control);
}

