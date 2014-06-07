// ==UserScript==
// @name           Vironomica:Science license
// @namespace      virtonomica
// @description     расчет налога на продажу лицензий
// @version        1.2
// @include        http://igra.aup.ru/*/window/technology_market/bid/*/*/*/set
// @include        http://*virtonomic*.*/*/window/technology_market/bid/*/*/*/set
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
	// округленре до центов
	function getSumma( val ){
		return Math.round( val*100)/100;
	}
	// расчет налога
	function getString( price, min_price ){
		//alert( "base = [" + price + "]\npr = " + min_price);
		base = price;
		if ( 100*base < 100*min_price) base = min_price;
		//alert( "base = [" + base + "]");
		pr = 0.07*base;
		var nalog = getSumma(pr);
		var dohod = getSumma(price - nalog);
		
		var info = "";
		if (dohod <=0) info = "<b><font color=black>Не выгодная цена</font></b>";

		return "<table><tr><td>Базовая цена : <td align=rigth>" + numberFormat(Math.floor(min_price) ) + "<td>.<td>" + (Math.round(100* (min_price - Math.floor(min_price))  ) ) +"<tr><td>Цена : <td align=rigth><font color=black>" + numberFormat(Math.floor(price) ) + "</font><td>.<td><font color=black>" + (Math.round(100* (price - Math.floor(price))  ) ) +"</font><tr><td>Налог: <td align=right><font color=green>"+ numberFormat( Math.floor(nalog) )  + "</font><td>.<td><font color=green>" +  (Math.round(100* (nalog - Math.floor( nalog))  ) ) + "</font><tr><td>Доход: <td align=right><font color=green>" + numberFormat( Math.floor( dohod ) ) + "</font><td>.<td><font color=green>" +  (Math.round(100* (dohod - Math.floor( dohod ))  ) ) +  "</font></table>" + info ;
	}
	//alert( "start" );

	var qq =   $("div", $("div.ww_offertype_1").parent().parent().next() ).eq(0);

	var min_price = /([\D]+)*([\d\s]+\.*\d*)/.exec( qq.text() )[0].replace(/ /g, "");

	var prize = $("#min_price").val();

	qq.html( getString(prize, min_price) );

	var min_price = $("#min_price").val();
	$("#min_price").change( function() {
		//alert('change');
		this.value = Math.round(this.value*1000)/1000;
		//alert( "this.value = [" + this.value + "]");
		$("div", $("div.ww_offertype_1").parent().parent().next().eq(0) ).html( getString(this.value, prize) );
		//alert( "this.value = [" + this.value + "] prize=" + prize);
	});

	//alert( min_price );

	//alert(  qq.html() );

	//alert( "END" );
}

if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}
