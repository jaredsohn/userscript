// ==UserScript==
// @name           Virtonomica:Доходы от продаж
// @namespace      virtonomica
// @description    Показ доходов от продаж
// @version        1.1
// @include        http://virtonomic*.*/*/window/unit/view/*/product_history/*/
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

	// Идентификатор подразделения
	var id_shop = /(\d+)/.exec(location.href)[0];

	// Идентификатор товара
	var id_item = /product_history\/(\d+)/.exec(location.href)[0];
	id_item = /(\d+)/.exec( id_item )[0];

//----------------------------------------------------
// Данные из локального хранилища
	// Цена в магазине
	shop_transport = JSON.parse( localStorage['shop_transport'] );
	if ( shop_transport == null ) shop_transport = new Object();
//----------------------------------------------------
	var selector = "table.list tr.even td, table.list tr.odd  td";
	$( selector ).each( function() {
		// номер столбаца
		var indx = $( selector ).index(this);
		indx = indx%5;
		switch (indx) {
			// количество
			case 1: {
				kol = new Number( $(this).text() );
				break;}
			// цена
			case 3: {
				price = new Number( $(this).text() );
				add = '';
				if ( shop_transport[ id_shop] != null){
					if ( shop_transport[ id_shop ][ id_item ] != null) {
						add = "<br><span title='Прибыль'>" 
						+"<font color=green>" + numberFormat( Math.floor(kol*(price- shop_transport[ id_shop ][ id_item ] ) ) ) + "</font></span>";
					}
				}
				$(this).append(  "<br><span title='Объем продаж'><font color=grey>" +numberFormat( Math.floor(kol*price) )+ "</font></span>" + add );
				break;}
		}
	});
	
}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);