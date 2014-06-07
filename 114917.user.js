// ==UserScript==
// @name           SaveShopInfo
// @namespace      Virtonomica
// @description    сохранить данные о ценах магазина в локальном хранилище
// @version        1.06
// @include        http://*virtonomic*.*/*/main/unit/view/*/trading_hall
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	/**
	* записать данные в локальнео хранилище, с проверкой ошибок
	*/
	function ToStorage(name,  val){
		try { 
			window.localStorage.setItem( name,  JSON.stringify( val ) );
		} catch(e) {
			out = "Ошибка добавления в локальное хранилище";
			//console.log(out);
		}
	}

	function getFromStorage(obj, id_shop){
		if (obj[id_shop] == null) return '';
		return JSON.stringify(obj[id_shop]);
	}

	function Save() {
		out = 'OK';
		//n = shop_time.length;

		var flag_save = false;

		var inp_sale = $("input[name*='productData[price]']");
		var td_sale = $("td:contains('$')");
		for (i=0; i<inp_sale.length; i++) {
			inp = inp_sale.eq(i);
			//td_pr = td_sale.eq(i*2);
			tr = inp.parent().parent();

			href = $("a[href*='by_trade_at_cities']", tr);
			if (href.attr('href') == null) continue;
			id_item = /(\d+)/.exec( href.attr('href') )[0];
			
			if (shop_price[id_shop] == null) shop_price[id_shop] = new Object();

			//console.log( "www " + td_pr.text() );

			shop_price[id_shop][ id_item ]  = inp.attr('value');

			if ( shop_transport[ id_shop ] == null ) shop_transport[id_shop] = new Object();
		
			td_pr = $("td", tr).eq(8);
			//console.log("TD_PR = " + td_pr.text());
			shop_transport[id_shop][ id_item ] = parseFloat( td_pr.text().replace('%', '').replace(' ','').replace(' ','').replace(' ','') );
		}
		if (inp_sale.length>0) {
			ToStorage('shop_price', shop_price);
			ToStorage('shop_transport', shop_transport);
			flag_save = true;
		}
		// Видимо это не магазина
		if (flag_save == false) return false;

        	var td = $("td:contains('%')");
		for (i=0; i< td.length; i++) {
			td_pr = td.eq(i+1);
			tr = td_pr.parent();

			href = $("a[href*='by_trade_at_cities']", tr);
			if (href.attr('href') == null) continue;
			id_item = /(\d+)/.exec( href.attr('href') )[0];
			//console.log(id_item);

			if (market[ id_shop ] == null) market[ id_shop ] = new Object();

			market[ id_shop ][ id_item ] = parseFloat( td_pr.text().replace('%', '') );
		}
		if (td.length > 0) {
			ToStorage('market', market);
			flag_save = true;
		}
		shop_time[ id_shop ] =  today ;
		//console.log(flag_save);

		ToStorage('shop_time', shop_time);

		$("#jsinfo").html("save: " + out );
		return true;
	}

	function View() {
		out = "LocalStorage:<br>";

		// выводим все что было в локальном хранилище по данному магазину
		out += "market = " + getFromStorage(market, id_shop) + "<br>";
		out += "shop_price = " + getFromStorage(shop_price, id_shop) + "<br>";
		out += "shop_transport =" + getFromStorage(shop_transport, id_shop) + "<br>";
		out += "shop_time =" + getFromStorage(shop_time, id_shop) ;

		$("#jsinfo").html( out );
	}

	function Clear() {
		out = "LocalStorage clear";
		// выводим все что было в локальном хранилище
		for (i=0; i<localStorage.length; i++) {
			localStorage.removeItem( localStorage[i] );
		}
		$("#jsinfo").html( out );
	}

	// Идентификатор подразделения
	var id_shop = /(\d+)/.exec(location.href)[0];

	// Время обнолвения данных о ценах
	shop_time = JSON.parse( window.localStorage.getItem('shop_time') );
	if (shop_time == null) shop_time = new Object();

	var d = new Date();
	today = d.getFullYear() + "." + d.getMonth() + "." +  d.getDate();

	// Объем рынка
	market = JSON.parse( window.localStorage.getItem('market') );
	if (market == null) market = new Object();

	// Цена продажи
	shop_price = JSON.parse( window.localStorage.getItem('shop_price') );
	if (shop_price == null) shop_price =new Object();

	// Цена в магазине
	shop_transport = JSON.parse( window.localStorage.getItem('shop_transport') );
	if ( shop_transport == null ) shop_transport = new Object();

	//console.log("End main");
	rc = Save();	
	// Если это не магазин, то и кнопки нам не нужны
	// а если и магазин без товара, то кнопки тоже не нужны
	if (rc == false) return;

	// кнопки
	 var save = $('<button id=bsave>save</button>').click(function() {
		Save();
	});
	 var view = $('<button id=bview>view</button>').click(function() {
		View();
	});
	 var clear = $('<button id=bview>clear local storage</button>').click(function() {
		Clear();
	});
	var out = '<td><span id=jsinfo style="color:yellow"></span>';
	var container = $('#topblock');
	container.append( $('<table><tr><td>').append("<font color=white>LocalStorage: </font>").append(save) .append('<td>').append(view) .append('<td>')/*.append(clear)*/.append(out) );

	Save();	
	//alert("end");
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 
