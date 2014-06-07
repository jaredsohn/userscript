// ==UserScript==
// @name        Virtomomica: IC
// @namespace   virtonomica
// @description Индикативные цены - парсинг и отображение
// @include     http://virtonomica.ru/*/main/geo/countrydutylist/*
// @include     http://virtonomica.ru/*/main/unit/view/*/sale
// @version     0.1
// ==/UserScript==
var run = function() {
	//---------------------------------------------------------------------
	// работа с локальным хранилищем
	//---------------------------------------------------------------------
	/**
	* записать данные в локальнео хранилище, с проверкой ошибок
	*/
	function ToStorage(name,  val)
	{
	    try {
	       window.localStorage.setItem( name,  JSON.stringify( val ) );
	    } catch(e) {
	       out = "Ошибка добавления в локальное хранилище";
	       //console.log(out);
	    }
	}

	function getFromStorage(obj, id_shop)
	{
	    if (obj[id_shop] == null) return '';
	    return JSON.stringify(obj[id_shop]);
	}
	//---------------------------------------------------------------------
	// end of работа с локальным хранилищем
	//---------------------------------------------------------------------
	var wc_info = $("<div id=p_info></div>");

	// Проверим ссылку что это игровое поле
	var href = location.href;
	console.log( href );
	if (href.indexOf('countrydutylist') > 0) {
		console.log('parsing....');
		var  wc_parsing = $("<li><div id=parsing style='float:left;cursor:pointer; color: white;'> <img title='Запомнить ИЦ' alt='Запомнить ИЦ' src='http://www.iconsearch.ru/uploads/icons/snowish/32x32/document-save-as.png'> </div>");
		
		var container = $('#topblock').next();
		container = $("li:last", container).prev().parent();
		container.append( wc_parsing ) ;

		$("table.list").before( wc_info );

		$("#parsing").click( function() {
			ic_array = new Object();

			table = $("table.list");
			//console.log('table = ' + table.length);
			tr = $("tr.odd, tr.even", table);
			//console.log('tr = ' + tr.length);
			for (i=0; i<tr.length; i++){
				td = $("td > img", tr.eq(i) );
				//console.log('td = ' + td.length);
				for(j=0; j< td.length; j++){
					src = td.eq(j).attr('src');
					//console.log( src );
					name = td.eq(j).parent().next().text();
					//console.log( name );
					ic = td.eq(j).parent().next().next().next().next().text();
					ic = parseFloat( ic.replace('$', '').replace(' ', '').replace(' ', '').replace(' ', '') );
					//console.log( ic );
					ic_array[ src ] = new Object();
					ic_array[ src ][ 'name' ] = name;
					ic_array[ src ][ 'ic' ] = ic;
				}
	
			}

			//console.log( JSON.stringify( ic_array ) ); 
			ToStorage('ic_array', ic_array );
			$("#p_info").html("Запомнили значения ИЦ").css('color', 'green');

		});
	}
	console.log('start IC');

	$("table.grid").before( wc_info );

	//  Все остальные страницы
	ic_array = JSON.parse( window.localStorage.getItem('ic_array') );
	if ( ic_array == null ) {
		ic_array = new Object();
		$("#p_info").html("Не удалось получить значения ИЦ из локального хранилища").css('color', 'red');
	} else{
		//$("#p_info").html( JSON.stringify( ic_array ) );
	}

	// снабжение
	if (href.indexOf('sale') > 0) {

		table = $("table.grid");
		
		tr = $("tr.odd, tr.even", table);
		console.log('tr = ' + tr.length);
		for (i=0; i<tr.length; i++){
			td = $("td > a > img", tr.eq(i) );
			if ( td.length == 2) td = td.eq(1);
			else td = td.eq(0);

			//console.log("td= " + td.parent().html() );
			src = td.attr('src');
			console.log(  JSON.stringify( ic_array[src] ) );
			if ( ic_array[src] == null ) {
				$("#p_info").append("<br>" + td.attr('alt') + " - нет данных по ИЦ").css('color', 'red');
				continue;
			}
			inp = $("input[name^='storageData']", tr.eq(i) );
			if (inp.length == 3) inp = inp.eq(1);

			console.log("inp = " + inp.length);
			inp.before( "ИЦ: " + ic_array[src]['ic'] + "$<br>" );
			//td.parent().next().next().next().next().next().before( "ИЦ: " + ic_array[src]['ic'] + "$<br>" );
		}
	}

	console.log('end IC');
}
if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}