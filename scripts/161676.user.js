// ==UserScript==
// @name       TLC
// @namespace  http://sergeich0.lark.ru
// @version    0.0.2
// @description  TeedaLocationChecker - скрипт, делающий кликабельным поле "Локация" в меню персонажа
// @match      *teeda*users*
// @copyright  Sergeich0
// ==/UserScript==

(function (window, undefined) {  
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }
    if (~window.location.href.indexOf('teeda')) {
        var Loca = '';
        var Loc = document.getElementsByClassName('blue')[0].innerText;
        switch(Loc) {
            case 'Общий чат': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/chat/main">' + Loca + '</a>';
                break;
            case 'Торговый чат':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/chat/trade">' + Loca + '</a>';
                break;
            case 'Чат гильдии':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/chat/clan">' + Loca + '</a>';
                break;
            case 'Главная':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/game">' + Loca + '</a>';
                break;
            case 'Таверна': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/tavern">' + Loca + '</a>';
                break;
            case 'Охота': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/hunting">' + Loca + '</a>';
                break;
            case 'Территории': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/territory">' + Loca + '</a>';
                break;
            case 'Арена': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/arena">' + Loca + '</a>';
                break;
            case 'Окрестности':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/surroundings">' + Loca + '</a>';
                break;
            case 'Работа':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/craft">' + Loca + '</a>';
                break;
            case 'Почта': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/mail">' + Loca + '</a>';
                break;
            case 'Штурм': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/attack">' + Loca + '</a>';
                break;
            case 'Бои питомцев': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/petfight">' + Loca + '</a>';
                break;
            case 'Общение':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/forum">' + Loca + '</a>';
                break;
            case 'Аукцион': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/auction">' + Loca + '</a>';
                break;
            case 'Рынок':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/auction2">' + Loca + '</a>';
                break;
            case 'Базар':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/auction3">' + Loca + '</a>';
                break;
            case 'Скупщик':
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/knacker">' + Loca + '</a>';
                break;
            case 'Банк': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/money">' + Loca + '</a>';
                break;
            case 'Рейтинги': 
                Loca = document.getElementsByClassName('blue')[0].innerText;
                document.getElementsByClassName('blue')[0].innerHTML = '<a href="/ratings">' + Loca + '</a>';
                break;
            default: 
                break;
        }
    }
})(window);