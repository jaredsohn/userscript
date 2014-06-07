// ==UserScript==
// @name           Virtonomica.инфо | Список предприятий/Магазин/Снабжение: Корректировка закупки
// @namespace      Virtonomica.инфо
// @version        1.6
// @include        http://*virtonomic*.*/*/main/unit/view/*/supply
// ==/UserScript==

var run = function() {

// Версия минимального снабжения (прописать цифру 1)
var minimal = 1;
// особые условия закупки при занятии данной доли рынка
var limit = 80;

var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;


function SetAmount( up) {

	var n_row = 0;
	var change = 0;
	var up_count = 0;
	var down_count = 0;
	var prc_count = 0;
	$("tr.product_row").each( function() {
		var el_info = $("td:eq(3)", this);

		img = $("img[src*='/img/products']", this);

		//alert(" !!! " + img.attr("src") + "("+market[ img.attr("src") ] + ")" );

		// на складе
		var col =	parseInt ( $("tr td:contains('Количество')", this).next().text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') );
		//продано в магазине
		var sale =	parseInt ( $("tr td:contains('Продано')", this).next().text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') );
		// закуплено в этот ход
		var amount = parseInt ( $("td:eq(15)", this).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') );

		// поле для ввода количества заказываемого товара
		var input = $("input[name^='supplyContractData']:eq(1)", this);

		// если больше одного поставщика, то пропускаем
		var test = $("td[id^='name']",this).attr('id');
		pos = test.indexOf('_');
		pos2 = test.indexOf('_', pos+1);
		var id = test.substr(pos+1, pos2-pos -1);
		if ( gaMaterialProduct[ id ]['subRowCount'] > 1) {
			//нашли несколько строк
			return;
		}
		
		set = sale; // закупить то, что было продано

		// если нет двухкратного запаса
		if ( col/2 < sale)  {
			set = Math.round( sale*1.5);
		}
		if ( col < sale ) {
			set  = sale * up;
		}  else if ( col > sale*6) {
			// если продажи не существенные
			set = 0;
		}  else if ( col > sale*4) {
			// если запасы слишком большие
			set = Math.round( sale /2);
		} else if ( col > sale*3) {
			set = Math.round( sale *0.8);
		} else if ( col > sale*2) {
			set = Math.round( sale *0.95);
		} else if ( col > sale*1.5) {
			set = Math.round( sale *up / (col/ sale ) );
		} else if ( col > sale ) {
			set = Math.round( (up+1)*sale - col );
		}

		if( !( (sale == 0) && (amount==0) ) ) {
		// если на складе запас равен закупке, то значит, все что было продано, уменьшать нельзя
		if ( amount == col) {
			set = amount;
			if ( sale > amount) set = sale * up ; // если продали больше чем купили, то делаем запас на будущее
			if ( sale <= amount) set = amount * up;
		}
		// первая закупка
		if ((sale == 0) && (col == amount)){
			set = amount;
		}

		// Версия минимального снабжения
		if (minimal == 1){
			if ( sale == col) {
				if (sale <= amount) set = sale;
				if (sale > amount) set = Math.round(amount*1.25);
			}

			if (amount > sale) {
				if (col <= sale) {
				 	set = Math.round(sale*1.25);
					//alert("2 sale = " + sale);
				}
			}
			if (sale < col*0.8) {
				set1 = Math.round(sale*0.8);
				set2 = Math.round(set*0.8);
				if (set1 > set2) set = set2;
				else set = set1;
			}

			if (sale < col*0.5) {
				set1 = Math.round(sale*0.2);
				set2 = Math.round(set*0.2);
				if (set1 > set2) set = set2;
				else set = set1;
			}

			if ( amount == col) {
				set = Math.round(sale*1.25);
			}
		}


		if (limit > 0) {
			prc = market[ img.attr("src") ];
			if (prc > limit) {
				prc_count++;
				all = Math.round(100*sale/prc);
				// Не закупать больше рынка
				if (set > all*1.1) {
					set = Math.round(all*1.1);
				}  else  if ( (col+set -sale) > all*1.1 ) {
					// не держать запасов больше рынка
					set = Math.round(all*1.1 - col +sale);
					if (set <0) set = 0;
				} 
				// уменьшить прирост закупок до 25% если превышен лимит рынка
				if ( set/sale > 1.25) {
					set = Math.round(sale*1.25);
				}
			}
		}


		if (set != input.attr("value") ) {
			change++;
			if ( set > input.attr("value") ){
				up_count ++;
			} else {
				down_count ++;
			}
		}
		input.attr("value", set) ;	// пишем новое значение
		n_row++;
		}
	});
	$("#gossnab").append("Позиций автозакупки: " + n_row + " | Скорректировано: "+ change+ " (↑" + up_count + " ↓" + down_count+ ")");
	if ( (limit > 0) && (prc_count >0) ){
		$("#gossnab").append("  Большая доля рынка: " + prc_count+ "");
	}
}

function ClearAmount( ) {
	var n_row = 0;
	$("tr[id^='product_']").each( function() {
		var input = $("input[name^='supplyContractData']:eq(1)", this);
		input.attr("value", 0);
		n_row++;
	});
	$("#gossnab").append("Обнуленные позиции:: " + n_row );
}

function SetFactory( mode ) {
	var n_row = 0;
	$("tr[id^='product_row']").each( function() {
		// Требуется
		var require = parseInt ( $("tr td:contains('Требуется')", this).next().text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') );

		var warehouse = parseInt ( $("tr td:contains('Количество')", this).next().text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') );

		// поле для ввода количества заказываемого товара
		var input = $("input[name^='supplyContractData']:eq(1)", this);

		// если больше одного поставщика, то пропускаем
		var test = $("td[id^='name']",this).attr('id');
		pos = test.indexOf('_');
		pos2 = test.indexOf('_', pos+1);
		var id = test.substr(pos+1, pos2-pos -1);
		if ( gaMaterialProduct[ id ]['subRowCount'] > 1) {
			//нашли несколько строк
			return;
		}
		switch ( mode )
		{
		  case 1:
			set = require; // закупить то, что требуется
		    break;
		  case 2:
		    	set = 2 * require - warehouse;
			if (set < 0) set =0;
			if (warehouse < require) set = require;
		    break;
		}
		input.attr("value", set) ;	// пишем новое значение
		n_row++;
	});
	$("#gossnab").append("Позиций автозакупки: " + n_row );
}

var out = '<td><span id=gossnab style="color:yellow"></span>';

var input_clear = $('<button id=b_clear>Обнулить автозакупку</button>').click(function() {
		ClearAmount();
});


var img =  $("#unitImage").html();
img = img.substr(0,img.length-8);
// Проверить, что это магазин
if ( img =='<img src="/img/v2/units/shop') {
	// кнопки
	 var input_2 = $('<button id=b2>запас x2</button>').click(function() {
		SetAmount(2);
	});
	 var input_5 = $('<button id=b5>запас x4</button>').click(function() {
		SetAmount(4);
	});
	var container = $('#topblock');
	container.append( $('<table><tr>').append('<td>').append(input_2).append('<td>').append(input_5).append('<td>').append(input_clear).append( out)   );

	// найти "свободно"
	$("td[id^='free']").attr('title','Закупить весь остаток').live('dblclick', function(){ 
		var free = $(this).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') ; 
		var td = $("td[id^='quantityField']",  $(this).parent().parent().parent().parent().parent() ) ;
		var input = $("input[name^='supplyContractData']:eq(0)", td );
		input.attr("value", free) ;
	});

	var market = new Array();
	if (limit > 0) {
		// Формируем ссылку на торговый зал
		var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];
		//var id = /\/unit\/view\/(\d+)/.exec(location.href)[0];
		var id = /\/unit\/view\/(\d+)/.exec(location.href)[0];
		url = url + "main" + id + "/trading_hall";
		//alert(url);
	   	$.get(url, function(data) {
			//alert("read");
	        	var td = $("td:contains('%')", data);
			for (i=1; i< td.length; i++) {
				td_pr = td.eq(i);
				tr = td_pr.parent();
				img = $("img[src*='/img/products']", tr);
				market[ img.attr('src') ] = parseFloat( td_pr.text().replace('%', '') );
			}
	   	});
		//alert('post read');
	}

}
// Проверить не завод ли это 
if ( ( img  =='<img src="/img/v2/units/workshop')  || 
     ( img =='<img src="/img/v2/units/mill') ||
     ( img =='<img src="/img/v2/units/animalfarm')
){
	// кнопки
	 var input_100 = $('<button id=b100>1:1</button>').click(function() {
		SetFactory(1);
	});
	 var input_200 = $('<button id=b200>2:1</button>').click(function() {
		SetFactory(2);
	});

	var container = $('#topblock');
	container.append( $('<table><tr>').append('<td>').append(input_100) .append('<td>').append(input_200).append('<td>').append(input_clear).append( out)  );

}
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);