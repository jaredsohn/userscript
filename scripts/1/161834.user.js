// ==UserScript==
// @name           Virtonomica: Подсветка в отчете по производству
// @namespace      virtonomica
// @include        http://virtonomic*.*/*/main/company/view/*/sales_report/by_produce
// @description    Подсветка по качу производства относительно среднереалмового в отчете по производству
// @version        1.0
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;



$('div#mainContent span.c_qty:gt(1)').each(function(){
var b=parseFloat($(this).next().prop('textContent'));
var a=parseFloat($(this).next().next().prop('textContent'));
$(this).next().css('color','green');
if(a>b) $(this).next().css('color','red'); 
})
 