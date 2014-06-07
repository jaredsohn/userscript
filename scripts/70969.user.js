// ==UserScript==
// @name           Virtonomica: расчет цены за ед. кач.
// @namespace      virtonomica
// @description    Цена за единицу качества
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    $('#mainTable tr').each(function() {
        if ($(this).attr('id')[0] != 'r') { return; }

        var cels = $('td', this);
        var price = parseFloat($(cels[8]).text().replace(' ', ''));
        var qual = parseFloat($(cels[9]).text().replace(' ', ''));

        if (isNaN(price) || isNaN(qual)) { return; }

        var qp = (price / qual).toFixed(2);
        $(cels[9]).html('<span style="color: #aaa">(' + qp + '$)</span> ' + qual);
    });

}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);