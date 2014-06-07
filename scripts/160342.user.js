// ==UserScript==
// @name             AchievementCounter [GW]
// @description      Счетчик достижений
// @include          http://www.ganjawars.ru/info.ach.php?id=*
// @version          0.2
// @author           Jimmy Banditto
// @license          GPL v3
// @namespace        http://www.ganjawars.ru/info.php?id=611489
// ==/UserScript==

(function() {
    root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

//    var GradientURI = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%2C%00%00%00%05%08%06%00%00%00%FF%A9%D1%3F%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00FIDATX%C3%ED%D4A%0A%C0%20%0C%04%C0%D5%FF%FF9%BD%EBA(%B4%10%9C%01%2F%09%86%40%60G*5*Y_%B2%D7N%BD7%7F%BE%E8u%DE%E3%8FY%EE%E1%1E%5D%F7%98%01hB%60%01%02%0B%40%60%01%D7z%00f%03%01%17w%AFpn%00%00%00%00IEND%AEB%60%82';
    var GradientURI = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%2C%00%00%00%03%08%06%00%00%00)%F02%22%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%01%1AIDATH%C7%EDVQ%0A%C3%20%0CM%60%17%D8%F7%AEQ%D8%A9z%E4%DEb%13%0A%B2%EC%A3%B5%D5%C4h%942%18H%7F%D4%D8%97%97%97%A4%0D%FA%8F%7F%3B%EFV%00%00%02%02%D8%16%90%EC%2B%B6%7D%8F%C79%81%7C%2F%EC%89%B2k%E1%8F%D9%82%0F%CE%A3%95%A7%E0%B0%DB%A3%7B%B8%85p%E2d1%CE8Q%E5%A0%F8%AAq%89%0E%80%B6%07%0B%FE%C1%A4%3B%B3%87%B3(NT%DF%CB%E8%5D%CAk)%7F%3C6%0BW3'Rt%CAh%1Ar-%F2%D6%A1a%89%93%A6k%8C%A7%DAJ%FA%A6%BC%B1%A5%16%CC%BEI%E6%AD%A4W%C4%13-%BDY%D3%98%D2%8B0%3D%26%B89%EF%D6%E5%B5%DC%93%02%A24%09D%24lQ%91%082GA%93h%8A%2C%26%F7%99%F3%CFE%B6b%9Ax%F3%E6%C9%C4%D0%8A)%3ED%0CS%D3%F7J%DE%3D9%EC%E5%5D%CCY%25%BF-z%5BkF%C3%14%7B%03%E6%2Fx%D7j%EF2%DE%C4~%3AW%F4%BD%82i%ADuk%DF%CF%CF%D9%E3%98%B0%C6%845%26%AC1a%FD%CB%84%F5%05%03%E95z%CD%B6%B1%1A%00%00%00%00IEND%AEB%60%82";

    function SetCookie()
    {
        var expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        root.document.cookie = 'acData=' + curData.join(':') + '; expires=' + expires.toGMTString() + '; path=/';
    }

    function GetCookie()
    {
        var results = root.document.cookie.match('(^|;) ?acData=([^;]*)(;|$)');
        if(results)
            return(results[2]);
        else
            return false;
    }

    function ResetCounter()
    {
        if(confirm("Вы уверены?")) {
            // Сохраняем текущие значения и обнуляем счетчики
            SetCookie();
            Counters = root.document.getElementsByClassName('acCounter');
            for(var i = 0; i < Counters.length; i++)
                Counters[i].innerHTML = '';
        }
    }

    // Это наши достижения?
    var Self = /id\=(\d+)/.exec(root.location.href)[1] == /id\=(\d+)/.exec(root.document.getElementsByTagName('nobr')[0].innerHTML)[1];

    if(Self) {
        // Если наши, то делаем линк для сброса счетчиков...
        acReset = root.document.createElement('a');
        acReset.href = '#';
        acReset.style.fontSize = '6px';
        acReset.innerHTML = '[сбросить счетчики]';
        acReset.addEventListener('click', ResetCounter, false);
        root.document.getElementsByTagName('center')[0].innerHTML += ' ';
        root.document.getElementsByTagName('center')[0].appendChild(acReset);

        // ... и запрашиваем кукисы
        var acData = GetCookie() ? GetCookie().split(':') : false;
    }

    // Рисуем графики
    var Graph, curData = [];
    Font = root.document.getElementsByTagName('font');
    for(var i = 0; i < Font.length; i++)
        if(Font[i].innerHTML.indexOf('выполнено') != -1)
        {
            // Получаем данные
            Data = /(\d+)\%.*\((.+)\ из/.exec(Font[i].innerHTML);

            // График
            Meter = root.document.createElement('div');
            Meter.style.width = 3 * Data[1] + 'px';
            Meter.style.height = '3px';
            Meter.style.backgroundImage =  'url("' + GradientURI + '")';;

            Font[i].parentNode.insertBefore(Meter, Font[i]);
            Font[i].parentNode.removeChild(Font[i].nextSibling);

            // Если наше, добавляем счетчики
            if(Self) {
                Counter = root.document.createElement('p');
                Counter.className = 'acCounter';
                Counter.style.margin = '0';
                Counter.style.fontSize = '8px';
                Counter.style.color = 'red';
                Counter.style.cssFloat = 'right';
                var Co = acData ? Data[2] - acData.shift() : 0;
                Counter.innerHTML = Co ? Co : '';
                Font[i].parentNode.insertBefore(Counter, Font[i]);
                curData.push(Data[2]);
            }
        }

    // Сохраняем текущие значения, если кукисы пусты
    if(Self)
        if(!acData)
            SetCookie();
})();
