// ==UserScript==
// @name           kval_sort
// @namespace      virtonomica
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list/employee
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;
var t=0;
var z=["<",">","=","all"];
$('table.list>tbody>tr:eq(1) th:contains("квалификация")').click(function(){
$(this).prop('textContent','квалификация '+z[t]);
$('table.list>tbody>tr:gt(2):not([id*="steward"]):not(:last)').each(function(){
var b=parseFloat($('td>input[id*="employee_level"]',this).attr('value'));
var a=parseFloat($('td>input[id*="employee_level"]',this).parent().prop('textContent').replace(/[^\d\.]/g,''));
switch(z[t]){
case ">":a>b?$(this).css('display','table-row'):$(this).css('display','none');break;
case "<":a<b?$(this).css('display','table-row'):$(this).css('display','none');break;
case "=":a==b?$(this).css('display','table-row'):$(this).css('display','none');break;
case "all":$(this).css('display','table-row');break;}})
t+=1;t=t%4;
})
