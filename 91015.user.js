// ==UserScript==
// @name           Virtonomica:Labs Info
// @namespace      Virtonomica
// @version        1.22
// @description    Дополнительная информация по лаборатории
// @include        http://*virtonomic*.*/*/main/unit/view/*/investigation
// @include        http://*virtonomic*.*/*/main/corporation/villas
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

	function TrimStr(s) {
		s = s.replace( /^\s+/g, '');
		return s.replace( /\s+$/g, '');
	}

	function getDays( days ){
		d = days%10;

		switch( d ){
			case 1: return (days + " день"); 
			case 2: 
			case 3: 
			case 4: 
				return (days + " дня"); 
			default : return (days + " дней"); 
		}
		
	}
	//alert("start");

	function getLabsInfo() {
		var info = $("<div id=labs_info></div>");
		$("table.infoblock").before( info );

		//  Все остальные страницы
		science_villa = JSON.parse( window.localStorage.getItem('science_villa') );
		if ( science_villa == null ) {
			science_villa = new Object();
			$("#labs_info").html("Не удалось получить список научных вилл из локального хранилища").css('color', 'red');
		} else{
			//$("#labs_info").html( JSON.stringify( science_villa ) );
			console.log(science_villa);
		}

		// Число ученых
		var works = $("td:contains('Учёных на проекте')").next().text().replace(" ","").replace(" ","");
		// Сколько ученых надо
		var el_req = $("td:contains('требуется учёных')");
		var str = el_req.text();
		var pos = str.indexOf( ":" );
		var req = parseInt( str.substr(pos+1).replace(" ","").replace(" ","") );
		var power = works/req;

		el_req.append( " <font color=green>" + (Math.ceil(works/req*1000)/10) + "%</font>" );

		// Число недель для текущей стадии
		var weeks = $("td:contains('Текущая стадия длится')").next().text();
		if (weeks > 0) {
			// Элемент для вывода информации
			var el = $("td.progress_bar:eq(1)").next();
			// Текущий процент
			var procents = parseFloat( el.text() );
	
			var up = procents/weeks;
			var last = Math.ceil( (100 -  procents)/up);

			el.parent().parent()
			.append("<tr><td colspan=2>средний прирост: " + (Math.ceil( 1000*up )/1000) + "%")
			.append("<tr><td colspan=2>прогнозируется заверешние работ через <font color=green>" + getDays(last) + "</font>");
		}

		// поиск гипотез
		form = $("form[action*='investigation']");
		console.log("form.length = " + form.length);
		//if (form.length != 2 ) return;
	
		tr = $("tr[onclick^='hypotesisSelect']", form.eq(0) );
		console.log("tr.length = " + tr.length);

		// ищем регион
		div = $("div.officePlace");
		region = $("a", div).eq(2);
		console.log("reg = " + region.text() );

		kv = 1.0;
		if ( typeof( science_villa[ region.text() ] ) != "undefined" ){
			kv = science_villa[ region.text() ];
			$("#labs_info").html( "Эффект виллы: " + kv ).css('color', 'magenta');
		}
		// Экологический стандарт-100
		var eko = $("div:contains('Экологический стандарт – 100')");
		if (eko.length > 0) {
			kv+= 1.15;
			$("#labs_info").append(" ЭКО-100");
		}
		// считаем ускорение
		//1,4286*(1-0,3/B9)
		k = kv*1.4286*(1 - 0.3/power);

		for (i=0; i<tr.length; i++){
			td = $("td", tr.eq(i) );
			pr = parseFloat(td.eq(2).text().replace("%", "").replace(" ", "").replace(" ", "") );
			days = parseFloat(td.eq(3).text().replace(" ", "").replace(" ", "") );

			console.log(pr + " = " +days + " == "  + k);
			td.eq(3).append( " <span title='" + (Math.ceil(days/k*10)/10)+"'><font color=maroon>(" + (Math.ceil(days/k)/1) + ")</font></span>");
	        }
		//console.log(form.eq(1).html());
	}

	function getVillaInfo(){
		console.log('parsing....');
		var info = $("<div id=labs_info></div>");
		var  labs_parsing = $("<li><div id=parsing style='float:left;cursor:pointer; color: white;'> <img title='Запомнить научные виллы' alt='Запомнить научные виллы' src='http://www.iconsearch.ru/uploads/icons/snowish/32x32/document-save-as.png'> </div>");

		var container = $('#topblock').next();
		container = $("li:last", container).prev().parent();
		container.append( labs_parsing ) ;

		$("table.unit-list").before( info );

		$("#parsing").click( function() {
			list = $("img[src*='181155111025.gif'], img[src*='182031111025.gif'], img[src*='140822111026.gif'], img[src*='182149111025.gif'], img[src*='140038111027.gif']");
			// 181155111025.gif = 1%
			// 182031111025.gif = 3%
			// 140822111026.gif = 9%

			science_villa = new Object();

			reg = 0;
			console.log('list = ' + list.length);
			for (i=0; i<list.length; i++){
				img = list.eq(i);
				src = img.attr('src');
				k = 1;
				// Сарай
				if ( src.indexOf('181155111025.gif') > 0 ) k = 1.01;
				// палатка
				if ( src.indexOf('182031111025.gif') > 0 ) k = 1.03;
				// Дом
				if ( src.indexOf('182149111025.gif') > 0 ) k = 1.07;
				// Вилла
				if ( src.indexOf('140822111026.gif') > 0 ) k = 1.09;
				// Дворец
				if ( src.indexOf('140038111027.gif') > 0 ) k = 1.20;

				tr = img.parent().parent();
				td = $("td", tr).eq(0);
				region = $("i", td);

				console.log(k + " = " + region.text() + " = " + reg + " = " + science_villa[ region.text() ]);
				if ( typeof( science_villa[ region.text() ] ) != "undefined" ){
					if (science_villa[ region.text() ] >= k ) continue;
				}
				science_villa[ region.text() ]  = k;
				reg++;
			
			}
			ToStorage('science_villa', science_villa );
			console.log(science_villa);
			$("#labs_info").html("Запомнили научные виллы: " + list.length + ", регионов: " + reg).css('color', 'green');
			console.log('.....end');
		});

	}

	// Проверим ссылку что это игровое поле
	var href = location.href;
	console.log( href );
	if (href.indexOf('villas') > 0) {
		getVillaInfo();
	} else {
		getLabsInfo();
	}
	console.log('finish');

}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}