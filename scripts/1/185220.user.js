// ==UserScript==
// @name        Virtonomica:Снабжение
// @namespace   virtonomica
// @description Добавляет новые кнопки в "Розничный менеджер закупок"
// @include     http://*virtonomic*.*/*/main/company/view/*/unit_list/shop
// @include     http://*virtonomic*.*/*/main/company/view/*/unit_list/service
// @version     0.1
// @grant       none
// ==/UserScript==
var run = function() {

   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;
   var n = 0;

   var div_style= "style='float:left;border-radius:4px 4px 4px 4px; padding:8px; box-shadow:0 1px 3px 0 #999999; cursor:pointer; background:#DDD; text-align: center;margin-left:12px'";
   var div_1 = "<div id=set_1_1 "+ div_style +">по требованию</div>";
   //var div_2 = "<div "+ div_style +">еще кнопка</div>";
   $("table.list").before("<div id=s_toolbar style='border: 1px double #0184D0;border-radius:4px 4px 4px 4px;height:34px;width:100%'></div>");
   $("#s_toolbar").append(div_1)/*.append(div_2)*/;

   $("#set_1_1").click(function(){
	var tr = $("tr[id^='r']", $("#mainTable"));
	//console.log('tr=' +tr.length);
	for(var i=0; i<tr.length; i++){
	   //console.log(i);
	   var row = tr.eq(i);
	   // строка по одному магазину
	   var col = $("td[align='center']", row);
	   //console.log("col=" + col.length);
	   // Нет поставщика
	   if (col.length <= 3) continue;
	   var link = $(".pseudolink", row).eq(0);
	   //console.log('link=' +link.attr('onclick'));
	   link.click();
	}
   });

   //console.log('end снабжение за очки');
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}