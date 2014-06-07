// ==UserScript==
// @name           Virtonomica:Shtuk
// @namespace      virtonomica
// @version        1.0
// @description    расчет числа проданых штук (под конкурс)
// @include        http://virtonomica.ru/vera/*/unit/view/*
// ==/UserScript==
var run = function() {

   // объем рынка
   var market = 100000;

   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;


   var el = $("img[alt='Voodipesu']").parent().parent();
   var str = $("td:eq(5)", el);
   //alert(str.html() );
   var procent = parseFloat( str.text().replace(' %', '') );
   var amount = Math.round(procent * market/100);
   //alert(amount );
   //alt="Voodipesu"
   str.append("<br><font color=grey>"+ amount + "</font>");
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);