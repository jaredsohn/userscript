// ==UserScript==
// @name	Alternative search engines
// @description	Adds search on other sites for google, bing, yandex, nigma, wolfram-alpha and ru-wiki
// @namespace	http://userscripts.org/scripts/show/88083
// @version	2012.12.23
// @include	http://www.google.com*
// @include	https://www.google.com*
// @include	http://www.google.ru*
// @include	https://www.google.ru*
// @include	http://www.wolframalpha.com*
// @include	http://www3.wolframalpha.com*
// @include	http://yandex.ru*
// @include	http://nigma.ru*
// @include	http://www.bing.com*
// @include	http://ru.wikipedia.org/w/*
// @include	http://nova.rambler.ru/*
// @include	http://rambler.ru/*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function () {

var SEARCH_ON = '\u0418\u0441\u043a\u0430\u0442\u044c \u043d\u0430:';
var POSITION = 'left'; //'left','right'

var ENGINES = {
    //Yahoo: 'http://search.yahoo.com/search?p=',
    //Baidu: 'http://www.baidu.com/s?wd=',
    \u042f\u043d\u0434\u0435\u043a\u0441: 'http://yandex.ru/yandsearch?text=',
    Google: 'http://www.google.com/search?q=',
    Bing: 'http://www.bing.com/search?q=',
    WolframAlpha: 'http://www3.wolframalpha.com/input/?i=',
    //Rambler: 'http://nova.rambler.ru/search?query=',
    Nigma: 'http://nigma.ru/?s=',
    //Twitter: 'http://www.twitter.com/search?q=',
    Wikipedia: 'http://ru.wikipedia.org/w/index.php?search=',
};

var PLACEHOLDER_SELECTORS = '#resultStats, .sb_count, .b-wordstat__text, .searchresults b, #ext_link, #sidebar, .b-global-wrapper';
var INPUT_FIELD_SELECTORS = '.lst, .b-form-checkbox__checkbox, #searchText, #gbqfq, #query, #i, #sb_form_q, .b-search-block__form_left_input';

var results = document.querySelector(PLACEHOLDER_SELECTORS);
if (!results) return;

var div = document.getElementById('oeid');
if (!div) {
    div = document.createElement('div');
    div.id = 'oeid';
    div.style.display = 'inline-block'
    div.style.paddingRight = '10px';
    div.style.paddingBottom = '3px';
    div.style.color = '#737373';
    div.style.fontFamily = 'Calibri, Sans-serif';
    div.style.fontSize = '11px';
    div.style.textAlign = POSITION;
    div.style.zIndex = '10000';
    results.insertBefore(div, results.firstChild);
}

var links = '';
for (var engine in ENGINES) {
    links = links + ",  <a href=\'javascript:void(0)\' onclick=\"javascript:var q;if((q=document.querySelector(\'"+INPUT_FIELD_SELECTORS+"\')).value.length>2){;window.open(\'" + ENGINES[engine] + "\'+encodeURIComponent(q.value))};\">" + engine + "</a>";
}

div.innerHTML = '<b>'+SEARCH_ON+'</b> '+links.slice(3);
}, false);