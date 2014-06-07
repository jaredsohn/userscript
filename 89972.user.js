// ==UserScript==
// @name           max_tehna_lab
// @namespace      http://virtonomic*.*/*/main/unit/view/*
// @include        http://virtonomic*.*/*/main/unit/view/*
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
$('table.infoblock>tbody>tr:first td:contains("Размер лаборатории")').each(function(){
aaa=$(this).next();
var txt=(aaa.prop('textContent')).match(/\d+/);
switch(txt[0]){
case "700":var ttt=aaa.prop('textContent')+"(все техны)";
						aaa.prop('textContent',ttt);break;
case "300":var ttt=aaa.prop('textContent')+"(1-18 техна)";
						aaa.prop('textContent',ttt);break;						
case "100":var ttt="(1-13 техна)"+aaa.prop('textContent');
						aaa.prop('textContent',ttt);break;						
case "30":var ttt=aaa.prop('textContent')+"(1-8 техна)";
						aaa.prop('textContent',ttt);break;						
case "10":var ttt=aaa.prop('textContent')+"(1-4 техна)";
						aaa.prop('textContent',ttt);break;	
						}})