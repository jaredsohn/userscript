// ==UserScript==
// @name           Сортировка по квале и зарплате
// @namespace      virtonomica
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list/employee
// @description    Сортировка по квале и зарплате
// @version        1.1
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;
var t=0;
var z=["<",">","=","all"];
$('table.list>tbody>tr:eq(1) th:contains("квалификация")').click(function(){
$(this).prop('textContent','квалификация '+z[t]);
$('table.list>tbody>tr:gt(2):not([id*="steward"]):not(:last)').each(function(){
var b=$('td>input[id*="employee_level"]',this).attr('value');
var a=$('td>input[id*="employee_level"]',this).parent().prop('textContent').replace(/[^\d\.]/g,'');
switch(z[t]){
case ">":a>b?$(this).css('display','table-row'):$(this).css('display','none');break;
case "<":a<b?$(this).css('display','table-row'):$(this).css('display','none');break;
case "=":a==b?$(this).css('display','table-row'):$(this).css('display','none');break;
case "all":$(this).css('display','table-row');break;}})
t+=1;t=t%4;
})
  t=0;
  z2=["<100%",">=100%",">150%","all"];
  $('table.list>tbody>tr:eq(1) th:contains("зарплата")').click(function(){
  $(this).prop('textContent','зарплата '+z2[t]);
  $('table.list>tbody>tr:gt(2):not([id*="steward"]):not(:last)').each(function(){
  var d=Math.round($('td>input[id*="base_salary"]',this).attr('value') * 100 ) / 100; // установленная ЗП
//  c=c*1;
  var c=parseFloat($('td:eq(6)',this).text().replace(' ', '')); // городская ЗП
//  d=d*1;
  switch(z2[t]){
  case ">=100%":c>=d?$(this).css('display','table-row'):$(this).css('display','none');break;
  case "<100%":c<d?$(this).css('display','table-row'):$(this).css('display','none');break;
  case ">150%":c>(d*1.5)?$(this).css('display','table-row'):$(this).css('display','none');break;
  case "all":$(this).css('display','table-row');break;}})
  t+=1;t=t%4;
  })
