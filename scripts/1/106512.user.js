// ==UserScript==
// @name           only_my_techna
// @namespace      virtonomica
// @include        http://virtonomic*.*/*/main/unit/view/*/technology
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
//убрать лишние checkbox
$('table.list>tbody>tr:gt(1):not(.disabled)').each(function(){
if($('td:eq(1) a',this).prop('textContent').split(/\s*/)[1]!="0"){$('td:first div:first',this).empty()};})
//если установленная техна выше или равна максимально известной нам техне - убрать кнопку покупки, иначе выбрать самую высокую из наших
Number($('tr.disabled div').prop('textContent').replace(/[^\d\.]/g,''))>Number($('table.list>tbody input:last').attr('value'))?$('input.button160:last').css('display','none'):$('table.list>tbody input:last').click();
$('table.list>tbody input').change(function(){$('input.button160:last').css('display','table-row')});