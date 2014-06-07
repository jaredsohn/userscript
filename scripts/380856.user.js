// ==UserScript==
// @name        Virtonomica: CityLink
// @namespace   virtonomica
// @description Добавляет на гланвую страницу Мед.центров и Ресторанов возможность быстро посмотреть состояние розничного рынка по расходникам
// @include     http://*virtonomic*.*/*/globalreport/marketing/by_trade_at_cities/*
// @include     http://*virtonomic*.*/*/main/unit/view/*
// @include     http://*virtonomic*.*/*/window/unit/produce_change/*
// @version     0.20
// @grant       none
// ==/UserScript==
var run = function() {
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;

/**
 * записать данные в локальнео хранилище, с проверкой ошибок
 */
function ToStorage(name,  val)  {
	try {
		window.localStorage.setItem( name,  JSON.stringify( val ) );
	} catch(e) {
		console.log("Ошибка добавления переменной "+name +" в локальное хранилище");
	}
}


var wc_save = $("<td style='cursor:pointer;'><img title='Запомнить ИД городов' alt='Запомнить ИД городов' src='http://www.iconsearch.ru/uploads/icons/snowish/32x32/document-save-as.png' >&nbsp;").click( function() {
	//console.log('click');
	$("#out_text").text('wc_save');

	var fld = $('fieldset');
	if (fld.length == 0 ){
		$("#out_text").text('Что-то пошло не так [fieldset]').css('color', 'red');
		return;
	}
	var table = $('table:eq(1)', fld);
	if (table.length == 0 ){
		$("#out_text").text('Что-то пошло не так [table]').css('color', 'red');
		return;
	}
	var td = $('td', table);

	var select_1 = $('select', td.eq(0) );
	var el = $(':selected', select_1);
	if (el.text() != '') {
		$("#out_text").text('Выберите режим показа всех городов реалма').css('color', 'red');
		return;
	}

	var City_info = new Object();

	var select_3 = $('select', td.eq(4) );
	var opt = $('option', select_3);
	//str = '';
	for(var i=0; i< opt.length; i++){
		if ( opt.eq(i).text() == '') continue;
		if (City_info[ opt.eq(i).text() ] == null) City_info[ opt.eq(i).text() ] = new Object();
		City_info[ opt.eq(i).text() ]['link'] = opt.eq(i).val();
		//str+= opt.eq(i).val() + "=" + opt.eq(i).text()+ "<br>";
	}
	ToStorage('City_info', City_info);
	$("#out_text").html('Ссылки на города записаны в локальное хранилище').css('color','green');
});

//===================
// start point
//===================
var href = location.href;
// пропустить неправильные ссылки
exclude = ['finans_report', 'virtasement', 'city_market', 'consume', 'supply'];
for (i=0 ; i< exclude.length; i++){
  n = href.lastIndexOf( exclude[i] );
  if (n > 0 ) return;
}

// проверить что эта старница с рынком городов
n = href.lastIndexOf( 'by_trade_at_cities' );
if (n > 0) {
	// Добавить кнопку в меню
	var table = $("table.tabsub");
	$("td:eq(0)", table).before(wc_save);
	table.before('<div id=out_text style="float:left"></div>');
	return;
}
var department = '';
// проверить что это страница специализации
n = href.lastIndexOf( 'produce_change' );
if (n > 0) {
	department = '';
	// проверить тип по картинке
	var img = $('img', $('div.headerContainer') );
	//console.log(img.attr('src'));
	n = img.attr('src').lastIndexOf( 'medicine' );
	if (n < 0) {
		n = img.attr('src').lastIndexOf( 'restaurant' );
		if (n < 0) return;
		department = 'restaurant';
	} else {
		department = 'medicine';
	}
	
	$('div.unit_name').before('<div style="float:right;" id=type_data><img title="Запомнить специализации" alt="Запомнить специализации" src="http://www.iconsearch.ru/uploads/icons/snowish/32x32/document-save-as.png" style="cursor:pointer;"></div>');
	$('div.unit_name').append('<div id=out_text style="float:right;margin-left:8px;margin-bottom:4px;"></div>');	
	

	$('#type_data').click(function (){
		//console.log('click');  
		$('#out_text').html('department: '+department);

		// объект для хранения данных о расходниках
    		Med_info = JSON.parse( window.localStorage.getItem('Med_info') );
		if ( Med_info == null ) Med_info = new Object();

		var table = $('table.list');
		var name = $('td[width=150]', table);
		var td = $('td[width=150]', table).next().next();
		//console.log(tr);
		for(var i=0; i<td.length; i++){
			var type_name = name.eq(i).text();
			console.log( type_name );
			Med_info[ type_name ] = new Array();
			//console.log( td.eq(i) );
			var aref = $('img', td.eq(i) ).parent();
			//console.log('aref='+ aref.length);
			for(var k=0; k<aref.length; k++) {
				var d_href = aref.eq(k).attr('href');
				var d_id = /(\d+)/.exec(d_href)[0];
				//console.log( d_id );
				var d_img = $('img', aref.eq(k) );
				//console.log( d_img.attr('src') );

				var el = aref.eq(k).parent().parent().next();
				var d_num = /(\d+)/.exec( el.text() )[0];
				//console.log( d_num );				
				Med_info[ type_name ][k] = new Object();
				Med_info[ type_name ][k]['id'] = d_id;
				Med_info[ type_name ][k]['src'] = d_img.attr('src');
				Med_info[ type_name ][k]['dep'] = department;
				Med_info[ type_name ][k]['num'] = d_num;
				$('#out_text').html('department: ' +k + '=='+department);
				//console.log( d_id + ' : ' + d_img.attr('src') + ' [' + d_num + ']')
			}
		}
		//console.log( Med_info );
		ToStorage('Med_info', Med_info);
		$('#out_text').html('данные сохранены в локальное хранилище').css('color', 'green');
		//$('#out_text').html( JSON.stringify( Med_info ));

	});
}
// Это страница подразделения
//department = '';

// проверить что это медицина
var img= $('#unitImage img');
n = img.attr('src').lastIndexOf( 'medicine' );
if (n < 0) {
	n = img.attr('src').lastIndexOf( 'restaurant' );
	if (n < 0) return;
	department = 'restaurant';
} else {
	department = 'medicine';
}
	// это медицина или рестораны
	//console.log(img.attr('src'));

	// настройка ссылок на расходники
/*
	var Med_info = new Object();
	Med_info['Поликлиника'] = [
		// природные лекарства
		{id: '359861', src: 'img/products/24/mixture.gif', num: '1'},
		// синтектика
		{id: '359860', src: 'img/products/24/tablets.gif', num: '1'}
	];
	Med_info['Диагностический центр'] = [
		// мед.инструменты
		{id: '359856', src: 'img/products/24/thermometer.gif', num: '1'}
	];
	Med_info['Центр народной медицины'] = [
		// лекартсвенные травы
		{id: '359862', src: 'img/products/24/herbs.gif', num: '1'}
	];
	Med_info['Стоматологическая клиника'] = [
		// мед.инструменты
		{id: '359856', src: 'img/products/24/thermometer.gif', num: '1'},
		// природные лекарства
		{id: '359861', src: 'img/products/24/mixture.gif', num: '1'},
		// синтектика
		{id: '359860', src: 'img/products/24/tablets.gif', num: '1'}
	];
	Med_info['Больница'] = [
		// мед.инструменты
		{id: '359856', src: 'img/products/24/thermometer.gif', num: '10'},
		// гормональные препараты
		{id: '359859', src: 'img/products/24/hormonal.gif', num: '1'},
		// природные лекарства
		{id: '359861', src: 'img/products/24/mixture.gif', num: '3'},
		// синтектика
		{id: '359860', src: 'img/products/24/tablets.gif', num: '1'},
		// средства гигиены
		{id: '359863', src: 'img/products/24/hygiene.gif', num: '3'},
		// постельное белье
		{id: '312799', src: 'img/products/24/napery.gif', num: '1'},
	];
*/
	// Добавили див для служебных сообщений
	$('#mainContent').before('<div id=out_text style="color:white;float:left; margin-left:8px;margin-bottom:4px;"></div>');
	
	// объект для хранения данных о расходниках
 	Med_info = JSON.parse( window.localStorage.getItem('Med_info') );
	if ( Med_info == null ) {
		Med_info = new Object();
		console.log('Med_info error');
		$("#out_text").html('Ошибка чтения Med_info из локального хранилища<br>Попытатся поулчить данные для <b>Med_info</b> можно на странице смены специализации').css('color', 'yellow');
		return;
	}

	var el_str = $('div.officePlace').text();

	tmpl_begin = 'Расположение: ';
	n = el_str.lastIndexOf(tmpl_begin);
	if (n < 0) {
		$("#out_text").text('Ошибка в поиске местоположения').css('color', 'red');
		return;
	}
	el_str = el_str.substr(n+tmpl_begin.length, el_str.length - n - tmpl_begin.length);

	n = el_str.lastIndexOf('(');
	if (n < 0) {
		$("#out_text").text('Ошибка в поиске местоположения').css('color', 'red');
		return;
	}
	city_unit = el_str.substr(0, n-1);
	//console.log(el_str);

	// читаем данные из локального хранилища
	City_info = JSON.parse( window.localStorage.getItem('City_info') );
	if ( City_info == null ) {
		$("#out_text").html('Ошибка чтения City_info из локального хранилища<br>Попытатся поулчить данные для <b>City_info</b> можно по <a href=http://virtonomica.ru/vera/window/globalreport/marketing/by_trade_at_cities/359861>ссылке</a>').css('color', 'yellow');
		return;
	}

	var type = $('div.cheader div').text();
	console.log(type);
	if ( Med_info[type] == null) {
		$("#out_text").html('Отсутствуют данные о расходниках для специализации: '+ type + '<br>Попытатся поулчить данные можно на странице смены специализации').css('color', 'yellow');
		return;
	}
	console.log('---&&&---');
	var sel_type = '<select id=unit_type>';
	for(key in Med_info) {
		console.log( department + ' == ' + key + ' == ' + Med_info[ key ][0]['dep']);
		if ( Med_info[ key ][0]['dep'] != department) continue;
		sel_type+= '<option value="'+ key +'"';
		if (type==key) sel_type+= ' selected'
		sel_type+= '>'+ key + '</option>';
	}
	sel_type+= '</select>';
	sel_type+= '<div id=component>--</div>';
	//console.log(sel_type);
	$('div.competitionDescr').append("<div id=market_info style='float: right;color:grey;'></div><div>"+sel_type+"</div>");
	//$("#out_text").text('читаем данные из локального хранилища');

	function print_component(){
		var type = $('#unit_type').val();
		var str = '';
		for(var i=0; i< Med_info[type].length; i++) {
			if ( Med_info[type][i]['num'] > 1) str+= '<span style="margin:4px; border 1px solid #ccc">'+Med_info[type][i]['num'];
			str+= '<img class=ujs_control border=0 src="' +Med_info[type][i]['src'] + '" item=' + Med_info[type][i]['id'] + ' style="cursor:pointer;"> ';
			if ( Med_info[type][i]['num'] > 1) str+= '</span>';
		}
		$('#component').html(str);

		$('img.ujs_control').click(function(){
			item = $(this).attr('item');
			console.log('get_item('+ item + ')');
			console.log('city = ' + city_unit);
			// Реалм
			var realm = /^http:\/\/virtonomic[as]\.(\w+)\/(\w+)\/\w+\//.exec(location.href)[2];
			console.log(realm);
			var link = '/'+realm+ '/window/globalreport/marketing/by_trade_at_cities/'+ item + City_info[city_unit]['link'];
			console.log(link);

			var img = '<img style="float:left;" src=' + $(this).attr('src') + '>';

			$('#market_info').html('Запрашиваем данные...');
			$.get(link,function(data){
				$('#market_info').html('Разбираем данные...');

				var el = $('table.grid', data);
				var td = $('td', el);
				var price = td.eq(0).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace('$', '');
				price = parseFloat(price);
				//console.log(price);

				var quality = parseFloat( td.eq(2).text() );
				//console.log(quality);
				var n = City_info[city_unit]['link'].lastIndexOf('/');
				var my_img = '<a href='+link+'><img width="400px" style="float:left;clear:both;" src="/' +realm+'/graph/globalreport/marketing/product/' + item + '/'+  City_info[city_unit]['link'].substr(n+1, City_info[city_unit]['link'].length - n) +'"></a>';

				$('#market_info').html(img + '<table style="float:left;"><tr><td style="padding:0px">Цена местных:<td style="padding:0px;text-align: right;"> '+ price + '<tr><td style="padding:0px">Качество: <td style="padding:0px;text-align: right;"> ' + quality+ '</table>' + my_img);

				//console.log(graph);
			});

		});

	}
	print_component();
	$('#unit_type').change( print_component );


onsole.log('-----end of CityLink------');
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}