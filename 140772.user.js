// ==UserScript==
// @name           Virtonomica: быстрая установка цены
// @description    быстрая установка цены
// @include        http://virtonomic*.*/*/main/unit/view/*/sale
// ==/UserScript==



var run = function() {

function numberFormat (number) {
        number += '';
        var parts = number.split('.');
        var int = parts[0];
        var dec = parts.length > 1 ? '.' + parts[1] : '';
        var regexp = /(\d+)(\d{3}(\s|$))/;
        while (regexp.test(int)) {
            int = int.replace(regexp, '$1 $2');
        }
        return int + dec;
}
    $('form:eq(0) table tr[class]').each(function() {
        var sel = $('select:eq(0)', this);
        var price = $('input.money:eq(0)', this);
        var ssTd = $('td:contains(Себестоимость)', this).get(2);
        var ss = parseFloat($('td:eq(5)', ssTd).text());
        if (isNaN(ss)) { ss = 0 }

        var but1 = $('<button>$1</button>');
        var but2 = $('<button>сс</button>');
        var but3 = $('<button>10</button>');
        var but4 = $('<button>20</button>');

        sel.before(but4).before(but3).before(but2).before(but1);

        but1.click(function() {
            price.val(1);
            return false;
        });

        but2.click(function() {
            price.val(ss);
            return false;
        });

        but3.click(function() {
            price.val(numberFormat(ss*1.1));
            return false;
        });   

        but4.click(function() {
            price.val(numberFormat(ss*1.2));
            return false;
        });   
    });
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.getElementsByTagName("head")[0].appendChild(script);