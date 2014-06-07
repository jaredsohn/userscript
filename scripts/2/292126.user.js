// ==UserScript==
// @name           Virtonomica: расчет цены за ед. кач.
// @namespace      yatul
// @description    Цена за единицу качества
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// @version        0.2
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
    
    var minQP = -1;

    $('#mainTable tr').each(function() {
        if ($(this).attr('id')[0] != 'r') { return; }

        var cels = $('td', this);
        var price = parseFloat($(cels[8]).text().replace(/ /g, ''));
        var qual = parseFloat($(cels[9]).text().replace(/ /g, ''));

        if (isNaN(price) || isNaN(qual)) { return; }

        var qp = (price / qual).toFixed(2);
        if ((qp < minQP) || (minQP == -1)) {
            minQP = +qp;
        }
        $(cels[9]).html('<span style="color: #aaa" name="qp' + qp + '">(' + qp + '$)</span> ' + qual);
    });
    
    $('#mainTable tr [name="qp'+ minQP.toFixed(2) + '"]').closest("tr").css("background-color","rgb(200,500,100)");

}

// Хак, что бы получить полноценный доступ к DOM
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);