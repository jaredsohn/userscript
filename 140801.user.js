// ==UserScript==
// @name           Пробный
// @description    Тест
// @include        http://virtonomic*.*/*/main/unit/view/*/sale
// ==/UserScript==

var run = function() {
    $('form:eq(0) table tr[class]').each(function() {
        var sel = $('select:eq(0)', this);
        var price = $('input.money:eq(0)', this);
        var ssTd = $('td:contains(Себестоимость)', this).get(2);
        var ss = parseFloat($('td:eq(5)', ssTd).text());
        if (isNaN(ss)) { ss = 0 }
       
        var button1 = $('<input type="button" value="+% Go">');
        var button2 = $('<input type="number" value="10">');
        var nazproz = parseFloat($('td:eq(5)', button2).text());
        var but1 = $('<button>$1</button>');
        var but2 = $('<button>сс</button>');

        sel.before(but2).before(but1).before(button2).before(button1);
  
        button1.click(function() {
            price.val(ss+ss*(nazproz/100));
            return false;
        });

        button2.click(function() {  
            nazproz = parseFloat($('td:eq(5)', button2).text());
            return false;
        });

        but1.click(function() {
            price.val(1);
            return false;
        });

        but2.click(function() {
            price.val(ss);
            return false;
        });
    });
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.getElementsByTagName("head")[0].appendChild(script);