// ==UserScript==
// @id             registrano.com-Total@scriptish
// @name           Registrano自動加總
// @version        1.1
// @namespace      demoshop
// @author         http://demo.tc
// @description    將 Registrano 的代收金額加總
// @include        https://registrano.com/events/*/invoices
// @include        https://www.registrano.com/events/*/invoices
// @run-at         document-end
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js
// ==/UserScript==
   
   var total=0;
   $("#invoice-report tr:not(:first)").each(function(index,domEle){
   var current=$(domEle);
   var p=current.find("td:eq(3)").text().replace("$","");
    if(isNaN(p)==false)
    {
    total+=parseInt(p,10);
    }
   });
   $("<li class='ui-tabs-selected'><a href='#'><span>總金額：$ "+mformat(total)+"</span></li>")
   .appendTo("#events-tab");
   
	function mformat(num){
		num = num + "";
		var re = /(-?\d+)(\d{3})/;
		while (re.test(num)) {
			num = num.replace(re, "$1,$2");
		}
		return num;
	}