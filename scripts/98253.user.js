// ==UserScript==
// @name            Virtonomica:GosSnab
// @namespace      virtonomica
// @version        1.28papa
// @include        http://*virtonomic*.*/*/main/unit/view/*/supply
// @include        http://igra.aup.ru/*/main/unit/view/*/supply
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

function SetAmount( up) {

	var n_row = 0;
	var change = 0;
	var up_count = 0;
	var down_count = 0;
	$("tr.product_row").each( function() {
		var el_info = $("td:eq(3)", this);

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

		// если нет запаса
		if ( col <= sale)  {
			set = Math.round( sale*1.1);
		}
		
		// если запасы большие
		if ( col > sale*1.5) {
			set = Math.round( sale *0.85);
		}
		// если запасы очень большие
		if ( col > sale*2) {
			set = Math.round( sale *0.7);
		}
		// если запасы огромны
		if ( col > sale*3) {
			set = 1;
		}
		// если на складе запас равен закупке, то значит, все что было продано, уменьшать нельзя
		if ( amount == col) {
			set = amount;
			if ( sale > amount) set = Math.round ( sale * up) ; 

// если продали больше чем купили, то делаем запас на будущее
			if ( sale <= amount) set = Math.round ( amount * up);

		}
		// первая закупка
		if ((sale == 0) && (col == amount)){
			set = amount;
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
	});
	$("#gossnab").append("Изменено: "+ change+ " из " + n_row + " ("+ up_count + "↑ + " + down_count+ "↓)");

	//alert ($("form[name='supplyContractForm']").html() );//.submit();
	//$("input[name='applyChanges]'").click();
	//alert($("input[name='applyChanges]'").html());
}
function SetFactory( mode ) {
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
	});
}

var img =  $("#unitImage").html();
img = img.substr(0,img.length-8);

// Проверить, что это магазин
if ( img =='<img src="/img/v2/units/shop') {
	// кнопки
	 var input_2 = $('<button id=b2>Автозакупка</button>').click(function() {
		SetAmount(1.1);
	});
	 
	var container = $('#topblock');
	container.append( $('<table><tr>').append('<td>').append(input_2).append('<td>').append('<td><span id=gossnab style="color:yellow"></span>')  );

	// найти "свободно"
	$("td[id^='free']").attr('title','Закупить весь остаток').live('dblclick', function(){ 
		var free = $(this).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '') ; 
		var td = $("td[id^='quantityField']",  $(this).parent().parent().parent().parent().parent() ) ;
		var input = $("input[name^='supplyContractData']:eq(0)", td );
		input.attr("value", free) ;
	});
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
	container.append( $('<table><tr>').append('<td>').append(input_100) .append('<td>').append(input_200) );

}
}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
