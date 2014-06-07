// ==UserScript==
// @name        tabs-reorder
// @namespace   yandex
// @description порядок сервисов Яндекса по твоему вкусу
// @include     http://*.yandex.ru/*
// @include     http://yandex.ru/*
// @version     1.1
// @require     http://yandex.st/jquery/1.7.2/jquery.js
// ==/UserScript==
//

// BEGIN user configuration
// desired order of tabs
var DESIRED = ["Поиск", "Картинки", "Карты", "Маркет", "Почта", "Словари", "Блоги", "Видео", "Новости"];
// END user configuration


// current tabs
// 'title' : { n : number, tab : $(e) }
var TABS_TITLE = {};
// n: { title: title, tab: $(e) }
var TABS_NUM   = {}; 

function reorder()
{
    // fill TABS_(TITLE|NUM)
    index_tabs();
    // remove missing tabs from DESIRED list
    var i = 0;
    while (i < DESIRED.length) {
        if (typeof TABS_TITLE[DESIRED[i]] == "undefined") {
            DESIRED.splice(i,1);
        }
        else {
            i++;
        }
    }
    // reorder them
    for (var i in DESIRED) { 
        var n = TABS_TITLE[DESIRED[i]].n;
        if (i != n) {
            swap_tabs(i, n);
            index_tabs();
        }
    }
}

function swap_tabs(i,n)
{
    var tmp = TABS_NUM[i].tab.html();
    TABS_NUM[i].tab.html(TABS_NUM[n].tab.html());
    TABS_NUM[n].tab.html(tmp);
}

function index_tabs()
{
    $('td.b-head-tabs__tab').each(function (i, e) {
        TABS_TITLE[$(e).text()] = {
            n: i,
            tab : $(e)
        };
        TABS_NUM[i] = {
            title : $(e).text(),
            tab : $(e)
        };
    });
}

$(document).ready(function (){
    reorder();
});


