// ==UserScript==
// @name           Virtonomica: Зелёные машинки (for NOVATORS)
// @namespace      virtonomica
// @description    В торговом зале магазина добавляет "зелёные машинки" для заказа товара (по многочисленным просьбам NOVATORS) 
// @include        http://virtonomic*.*/*/main/unit/view/*/trading_hall
// ==/UserScript==

var run = function() 
{

    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;

    	$( 'table.grid tr.odd, table.grid tr.even' ).each( function() 
	{
        	var cells = $( 'td', this );

		var el = document.createElement("a");
		el.setAttribute( 'href', cells[4].firstElementChild.getAttribute( 'href' ) );
		el.setAttribute( 'onClick', cells[4].firstElementChild.getAttribute( 'onClick') );
		el.innerHTML = ' <img src="/img/supplier_add.gif" title="Выбрать поставщика" border="0" align="middle"/>';
		cells[0].appendChild( el );
    	});
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
