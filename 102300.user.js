// ==UserScript==
// @name           Market_analitics
// @namespace      virtonomica
// @description  consider different figures for the market city
// @description    v1.2 - Added display of pieces of goods from each vendor
// @description    v1.1 - Fixed bug in determine a share of local, unless they are in first place in the list
// @description    v1.03 - One unit showing the number of goods sold players
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
	var val = $("table th:contains('Local suppliers')").parent().parent();
	//alert( val.html() );
	// Price
	var pr = $("th:contains('Price')", val).parent();
	//alert(pr.html() );
	// ищем первый td
	var local_price = $("td:first", pr); // price of local
	var fl_local_price = /([\D]+)*([\d\s]+\.*\d*)/.exec(local_price.text())[2].replace(" ", "").replace(" ", "");

	var avg_price = $("td:last", pr);   // average price of all stores
	var fl_avg_price = /([\D]+)*([\d\s]+\.*\d*)/.exec(avg_price.text())[2].replace(" ", "").replace(" ", "");
	//alert( local_price.text() + " \n" + avg_price.text() );

	//alert( fl_local_price );

	//alert( 'start');
	var val2 = $("td:contains('Local suppliers')").eq(1).next().next();
	//alert( val2.html() );
	//var local_value = $("td", val2).eq(4); // Доля местных
	var local_value = $("td:contains('Local suppliers')").eq(1).next().next();
	//alert( "["+local_value.text() + "]");
	// Фикс на отсутстиве местных
	if (local_value.text() != "") { 
		var fl_local_value = /([\d\s]+\.*\d*)/.exec(local_value.text() )[1];
		//alert( fl_local_value );
	} else { fl_local_value = 0; }


	var market_value = $("td:contains('Market volume:')").parent();
	var out = $("td", market_value).eq(4);
	var fl_market_value = /([\D]+)*([\d\s]+\.*\d*)/.exec(out.text() )[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
	//alert(fl_market_value);

	$("td", market_value).eq(3).append("<br>").append("Market volume:");
	//alert(out.html() );
	var str = fl_market_value * fl_local_price;
	out.append("<br>").append( "<i><b>"+numberFormat (Math.round(str) ) + " </b></i>$");

	if ( fl_local_value >= 100) return;
	// цена игроков
	var pl_price = (fl_avg_price - fl_local_value*fl_local_price/100 )/(100 - fl_local_value)*100;
	pl_price = Math.round( pl_price*100)/100;
	$("td", market_value).eq(5).append("<br>").append("Price:").append("<br>").append("Sales volume:").append("<br><br>").append("Share:");

	var pl_size = Math.round ( fl_market_value* (100 - fl_local_value) * pl_price / 100 );
	var pl_count = Math.round ( fl_market_value* (100 - fl_local_value) /100 );

	var z = Math.round (100*pl_size / str)/100;
	$("td", market_value).eq(6).append("<br>").append("<i>" + pl_price + "</i> $").append("<br>").append("<b>" + numberFormat(pl_size) + "</b> $<br> (" +numberFormat(pl_count) +" pcs.)").append("<br>").append("<b>" + numberFormat(z) + "</b>"); 
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