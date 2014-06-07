// ==UserScript==
// @name           Market_analitics
// @namespace      virtonomica
// @description  считаем разные циры для рынка города
// @description    v1.2 - Добавлен показ штук товара у каждого продавца
// @description    v1.1 - Исправлена ошибка в определнии доли местных, если они не на первом месте в списке
// @description    v1.03 - показ числа едениц товара, проданных игроками
// @version        1.2
// @include       http://*virtonomic*.*/*/main/globalreport/marketing/by_trade_at_cities/*
// @include       http://*virtonomic*.*/*/window/globalreport/marketing/by_trade_at_cities/*
// @include       http://igra.aup.ru/*/main/globalreport/marketing/by_trade_at_cities/*/*/*/*
// @include       http://igra.aup.ru/*/window/globalreport/marketing/by_trade_at_cities/*
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
	//alert( 'start');
	var val = $("table th:contains('Местные поставщики')").parent().parent();
	//alert( val.html() );
	// Цена
	var pr = $("th:contains('Цена')", val).parent();
	//alert(pr.html() );
	// ищем первый td
	var local_price = $("td:first", pr); // цена местных
	var fl_local_price = /([\D]+)*([\d\s]+\.*\d*)/.exec(local_price.text())[2].replace(" ", "").replace(" ", "");

	var avg_price = $("td:last", pr);   // средняя цена всех магазинов
	var fl_avg_price = /([\D]+)*([\d\s]+\.*\d*)/.exec(avg_price.text())[2].replace(" ", "").replace(" ", "");
	//alert( local_price.text() + " \n" + avg_price.text() );

	//alert( fl_local_price );

	//alert( 'start');
	var val2 = $("td:contains('Местные поставщики')").eq(1).next().next();
	//alert( val2.html() );
	//var local_value = $("td", val2).eq(4); // Доля местных
	var local_value = $("td:contains('Местные поставщики')").eq(1).next().next();
	//alert( "["+local_value.text() + "]");
	// Фикс на отсутстиве местных
	if (local_value.text() != "") { 
		var fl_local_value = /([\d\s]+\.*\d*)/.exec(local_value.text() )[1];
		//alert( fl_local_value );
	} else { fl_local_value = 0; }


	var market_value = $("td:contains('Объем рынка:')").parent();
	var out = $("td", market_value).eq(4);
	var fl_market_value = /([\D]+)*([\d\s]+\.*\d*)/.exec(out.text() )[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
	//alert(fl_market_value);

	$("td", market_value).eq(3).append("<br>").append("Емкость рынка:");
	//alert(out.html() );
	var str = fl_market_value * fl_local_price;
	out.append("<br>").append( "<i><b>"+numberFormat (Math.round(str) ) + " </b></i>$");

	if ( fl_local_value >= 100) return;
	// цена игроков
	var pl_price = (fl_avg_price - fl_local_value*fl_local_price/100 )/(100 - fl_local_value)*100;
	pl_price = Math.round( pl_price*100)/100;
	$("td", market_value).eq(5).append("<br>").append("Цена игроков:").append("<br>").append("Емкость игроков:").append("<br><br>").append("Доля:");

	var pl_size = Math.round ( fl_market_value* (100 - fl_local_value) * pl_price / 100 );
	var pl_count = Math.round ( fl_market_value* (100 - fl_local_value) /100 );

	var z = Math.round (100*pl_size / str)/100;
	$("td", market_value).eq(6).append("<br>").append("<i>" + pl_price + "</i> $").append("<br>").append("<b>" + numberFormat(pl_size) + "</b> $<br> (" +numberFormat(pl_count) +" ед.)").append("<br>").append("<b>" + numberFormat(z) + "</b>"); 
	//alert( pl_price );

	// показ штук у игроков
	var dat = $("table.grid ~ table");
	var pl_dat = $("table", dat).eq(0);
	var table = $("td", pl_dat);

	var index = 0;
	table.each( function(){
		if (index%6 == 4) {
			fl_str_value = /([\d\s]+\.*\d*)/.exec( $(this).text() )[1]
			//alert( $(this).html() );
			str_count = Math.round ( fl_market_value * fl_str_value /100);
			//alert( str_count );
			$(this).css("font-weight","bold");
			$(this).parent().append("<td> <font color=grey>" + numberFormat(str_count) + "</font>");
		}
		index++;
	});
	//alert( table.length );
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);