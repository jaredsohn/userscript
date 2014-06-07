// ==UserScript==
// @name           Virtomomica:Techn salary
// @namespace      Virtonomica
// @description     Расчет цены продажи технологии
// @description     Быстрый ручной поиск отсекаемых предложений
// @version        1.0
// @include        http://igra.aup.ru/*/window/management_action/*/investigations/technology_sellers_info/*/*
// @include        http://*virtonomic*.*/*/window/management_action/*/investigations/technology_sellers_info/*/*
// ==/UserScript==
var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

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

    function calcSalary() {
	var salary = 0;
	var n = 0;
	var salary_all = 0;
	var n_all = 0;
	var table = $("table.list td[align='right']").each( function(){
		var color = $(this).css("color");	
		var val = $(this).text();
		var fl_val = /([\D]+)*([\d\s]+\.*\d*)/.exec(val)[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
		fl_val = parseInt(fl_val);
		//alert(fl_val);
		salary_all+= fl_val;
		n_all++;
		if ( color == "grey")  return;
		salary+= fl_val;
		n++;
	});
	//alert( table.length + " [n="+n+"] " + numberFormat(salary/n));
	$("#salary_all").text( numberFormat( Math.round(salary_all/n_all)) );
	$("#salary").text( numberFormat( Math.round(salary/n)) );
    }

    $("table.list td[align='right']").click( function() {
           var color = $(this).css("color");
	   var new_color = "black";
	   if (color == 'grey'){
		new_color = "black";
	   } else {
		new_color = "grey";
	   }	
	   $(this).css("color", new_color);
	   calcSalary();   
   });
   
   $("div.headerSeparator").parent().append("<table width=100%><tr><td>Средняя по всем :<td><span id=salary_all>&nbsp;</span>" 
     +"<tr><td>Средняя с учетом исключений:<td><span id=salary>&nbsp;</span></table>" );

    calcSalary();   
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);