// ==UserScript==
// @name           Virtonomica: пагинтация
// @namespace      all
// @description    Увеличивает количество элементов на страницу до 50/100/250/500
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list*
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/*
// @include        http://virtonomic*.*/*/window/unit/equipment/*
// @include        http://virtonomic*.*/*/main/company/toplist*
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    var links = $('div.title:contains(Показывать по) + div > a');
    if (links.length != 6) {
        return;
    }

    var units = [[10,10], [25,25], [50,50], [100,100], [200,500], [400,1000]];
    var cookieName = /^\/\w+\/main\/company\/view\/\d+\/unit_list$/.test(location.pathname) ? 'mainUPP' : 'UPP';

    var upp = readCookie(cookieName);
    if (upp == null) {
        upp = 50;
    }

    $('span', links).removeClass('selected');
    
    links.each(function(i) {
        var a = $(this);
        var span = $('span', this);

        a.attr('href', a.attr('href').replace(units[i][0], units[i][1]));
        span.text(units[i][1]);

        if (units[i][1] == upp) {
            span.addClass('selected');
        }

    }).click(function() {
        var upp = $('span', this).text().trim();
        document.cookie = cookieName+"="+upp+"; path="+location.pathname;
    });
    
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);