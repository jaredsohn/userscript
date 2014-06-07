// ==UserScript==
// @name           Kvala_info
// @namespace      virtonomica
// @version        1.96
// @description    Расширенная информация об опыте в Квалификации
// @include        http://*virtonomic*.*/*/main/user/privat/persondata/knowledge
// @include        http://igra.aup.ru/*/main/user/privat/persondata/knowledge
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   	$ = win.$;

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

	// получить строку с показателем успешности роста
	// Kn  -  уровень квалификации
	// kv_up - прирост квалы
	// kv0 - квала без штрафа
	function getOptimal( kn, kv_up, kv0){
		if ( isNaN(kv_up) ) {
			kv_up = 0;
			return "&nbsp;";
		}
		// максимально возможный прирост
		var max = 0.9999409*Math.pow(kn, -0.569406) ;
		// коррекция на штрафа
		var delta = kn-kv0-1;
		if (delta > 0) {
			kv_up *= Math.pow(1.05, delta );
		}
		var ups = Math.floor( (kv_up * 10) / (max *10) );
		
		return "<font color=darkblue>" + ups + "%</font>";
	}
	// сколько пересчетов до роста
	// exp - текущее значение опыта по квалификации
	// up - текущий прирост квалы
	function getLastDays( exp,  up) 
	{
		if ( isNaN(up) ) {
			return "&nbsp;";
		}
		var last = 100 - exp;
		var days = last / up;
		return Math.ceil( days);
	}	

	//
	// Число дней на изучение без штрафа
	//
	function getLastDays2(exp,  up, kv, kv0) 
	{
		if ( isNaN(up) ) {
			return "";
		}
		if (kv0 == undefined) return "";
		if (kv0 == 0 ) return "";

		var delta = kv-kv0-1;
		if (delta <= 0) return "";

		var last = 100 - exp;
		var x = Math.pow(1.05, delta );

		var days = last / up / x;

		return Math.ceil( days);
	}

	function getPenalty( kv, kv0) {
		if (kv0 == undefined) return "";
		if (kv0 == 0 ) return "";

		var delta = kv-kv0-1;
		//console.log("delta=" + kv + " - " + kv0 + " = " + delta);
		if (delta <= 0) return "<b>" + kv0 + "</b><br>";

		var x = 1/Math.pow(1.05, delta );
		ret =  Math.round(x*10000) /100;
		return  "<b>" + kv0 + "</b><br><font color=darkblue>" +ret + "%</font>";
	}
	
   	//alert('RUN');
	var i = 0;
	// Массив с данными по квалификациям
	//var know = new Array;
	//i = 0;
	//$("input", $("tr.odd") ).each(function() {
	//	 know[i] = $(this).attr('value');
	//	i++;
	//});

	// меняем цвет прироста
	$("tr.odd td:last-child").css("color","DeepPink");

	// имя пользователя
	var UserName= $("#fio").text();
	// Реалм
	var realm = /^http:\/\/virtonomic[as]\.(\w+)\/(\w+)\/\w+\//.exec(location.href)[2];
	// Идентификационная строка блока записей
	var idx_string = realm + "_" + UserName;

	// ищем текущее значение опыта
	var form = $("form[name='useForm']");
	//console.log("TABLE = " + form.length);

	// названия квалификаций
	var kval_name = $("span[id^='info_']").parent();
	// массив соответсий порядку квалификаций их ИД
	var kv_link = new Array;
	// Цикл по всем квалификациям
	i = 0;
	for (var key in gaKnowledgeLevel) {
	    	kv_link[i] = key;
		i++;
	}

	// число квалификаций
	var nkval = kval_name.length;  

	var i = 0;
	var k = 0;
	var exp = new Object();
	var ncol = $( "tr.odd td", form ).length / nkval ;
	// Ищем текущий опыт по квалификациям
	$( "tr.odd td", form ).each(function() {
		var indx = i;	     	// номер столбца
		indx = indx%ncol;		// номер колонки
		if ( indx == 5)  {
			key = kv_link[k];
			exp[ key ] = parseFloat( $(this).text() );
			k++;
		}
		i++;
	});

	kvala_save = JSON.parse( window.localStorage.getItem('kvala_save') );
   	if ( kvala_save == null ) kvala_save = new Object();
	if ( kvala_save[idx_string] == null ) kvala_save[idx_string]  = new Object();
	// временный код - чистим хранилище от старых данных
	for (var key in kvala_save) {
	    	if (key<10) delete kvala_save[key];
	}

	i = 0;
	// массив с данными по приросту
	var up = new Object();
	$("tr.odd td:last-child", form ).each(function() {
		key = kv_link[i];
		up[ key ] = parseFloat(this.innerHTML);
		str = getOptimal( gaKnowledgeLevel[ key ], up[ key ], kvala_save[ idx_string ][ key ] );
		$(this).parent().append( "<td id=up_"+ key +">" + str + "");
		// сколько пересчетов до роста
		str = "<td id=day_" + key + " help='";
		d = getLastDays2(  exp[ key ] , up[ key ], gaKnowledgeLevel[ key ], kvala_save[ idx_string ][ key ] );
		if (d != "") {
			str+= "Число дней до изучения при отсутсвии штрафа: " + d ;
		} 
		str+= "'>"  + getLastDays(  exp[ key ] , up[ key ] ) ; 

		$(this).parent().append( str );
		i++;
	});

	$("tr.odd td:first-child", form ).append("<br>");
	// меняем фон строк в таблице с параметрами
	$("tr.odd").css("background-color", "Gainsboro");
	// меняем цвета кнопок в квалификации
	$("input", $("tr.odd", form ) ).css("background-color", "DimGray").css("color","gold");

	//----------------------------------------
	// Работа с сохранением данных о последних апах квалы
	//----------------------------------------
	//var test_str = "[";
	//for(i=0; i<nkval; i++) {
	//   	if ( kvala_save[idx_string][i] == null ) kvala_save[idx_string][i] = 1;
	//	test_str += kvala_save[idx_string][i] + " ";
	//}
	//test_str += "]";
	// отладочное сообщение
	//alert(test_str);

	// Добавляем иконку в начале каждой строки
	el = 	$("td[id^='title_']");
	var i= 1;
	for(k=0; k< el.length; k++) {
		var txt = "<br><h3>Сохраняем данные о квалификации</h3><br>";
		key = kv_link[ k ];
		val = gaKnowledgeLevel[ key ];
		//console.log( "----[" + key + "]=" + val);
		if ( kvala_save[ idx_string ][ key ] == undefined) kvala_save[ idx_string ][ key ] = 0;
		if ( kvala_save[ idx_string ][ key ] > 1) val = kvala_save[ idx_string ][ key ];
		//console.log("[" + kvala_save[ idx_string ][ key ] + "]");
		txt += "Введите значение квалификации, <br>которая была после последнего улучшения за очки:<br><center><input id=kv_value_" + key + " value=" + val +" style='background:white'></input>";
		txt += "<br><br><img src=http://www.iconsearch.ru/uploads/icons/ultimategnome/48x48/stock_export.png id=kv_btn_"+key+" help=" +key+" title='Запомнить в локальном хранилище' style='cursor:pointer'><br><br></center>";
		var div_form = "<div id=kv_set_" +key+" style='padding:8px; background: none repeat scroll 0% 0% rgb(223, 223, 223); z-index: 1002; position: absolute; border: 1px solid rgb(0, 0, 0); display: none;'>" + txt + "</div>";
		el.eq(k).before("<img help=" + key + " src=http://www.iconsearch.ru/uploads/icons/musthave/48x48/settings.png style='cursor:pointer'>" );
		el.eq(k).before(div_form);
		el.eq(k).before("<td align=center><span id=kv_info_" + key + " >" + getPenalty( gaKnowledgeLevel[ key ],  kvala_save[ idx_string ][ key ] ) + "</span>");
	}

	// функция клика по иконке
	var img = $("img[help]");
	img.click( function() {
		n_kv = $(this).attr('help');
		str = "#kv_set_" + n_kv;
		$(str).toggle();
	});

	// сохранить значение квалы в хранилище и спрятать окошко
	$("img[id^='kv_btn_']").click( function() {
		n_kv = $(this).attr('help');
		kvala_save[idx_string][n_kv] = $("#kv_value_" +n_kv).attr('value');
		$("#kv_info_" + n_kv).html( kvala_save[idx_string][n_kv] );
		ToStorage('kvala_save', kvala_save);
		$("#kv_set_" + n_kv).hide();

		str = getPenalty( gaKnowledgeLevel[n_kv],  kvala_save[idx_string][n_kv] );
		$("#kv_info_" + n_kv). html(  str );

		str = getOptimal( gaKnowledgeLevel[ n_kv ], up[ n_kv ], kvala_save[idx_string][ n_kv ] );
		$("#up_"+ n_kv).html( str );

		d = getLastDays2(  exp[ n_kv ] , up[ n_kv ], gaKnowledgeLevel[ n_kv ], kvala_save[ idx_string ][ n_kv ] );
		str = '';
		if (d != '') str = "Число дней до изучения при отсутсвии штрафа: " + d ;
		$("#day_" + n_kv).attr('help', str );

	});

	// рисуем шапку
	var table = $("#avaliablePointCountToLearn").parent().next();

	var helpbar = "<br><div style='background:#DFDFDF; z-index:2; position:absolute;" 
	+ "border:solid 1px #000000; display: none; padding:8px; " 
	+ "border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 3px 0 #999999;' "
	+ "id='helpbar'><span id=helpbar_text>&nbsp;</span></div>";

	var my_header = "<th help='Задать последнею квалификацию,<br>не имеющую штрафа'>Квал."; 
	my_header+= "<th help='Запомненная квалификация и размер штрафа на рост.<br>(100% означает, что штраф отсутсвует)'>Штраф";
	my_header+= "<th help='Текущий опыт и его рост'>Опыт";
	my_header+= "<th>&nbsp;<th>&nbsp;<th>&nbsp;<th>Описание";
	my_header+= "<th help='текущее значение опыта'>Опыт";
	my_header+= "<th help='текущий прирост опыта'>Рост";
	my_header+= "<th help='Идеальность роста<br>(с учетом действующего штрафа)'>Идеал";
	my_header+= "<th help='Число дней до увеличения уровня квалификации'>Дни";
	$("tr:eq(0)",table).before( my_header );

	//$("#avaliablePointCountToLearn").append(" <span id=xy>")
	table.before( helpbar );

	var wr = $("#wrapper");
	mx = 0;
	//alert( $("td[help]").length );

	$("th,td[help]").mouseover( function() {
		str = $(this).attr('help');
		if (str != undefined) {
			if (str == '') return;
			$("#helpbar").show();

			// размеры экрана
			w = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth));
			//h = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight));

			newx = mx +20 - wr.position().left ;
			newy = my + 12;
			

			//$("#helpbar_text").html( str + "<br>MX=" + mx + "<br>newx=" + newx + "<br>W=" +w + "<br>WRAPER="  + wr.position().left );
			$("#helpbar_text").html( str );

			wdiv = $("#helpbar").width();
			if (wdiv < 160) {
				document.getElementById("helpbar").style.width = '160px';
				wdiv = 160;
			}
			
			if ( (newx + wdiv  ) > (w - wr.position().left) ) newx = w - $("#helpbar").width() - wr.position().left-20;

			document.getElementById("helpbar").style.left = newx + 'px';
			document.getElementById("helpbar").style.top = newy + 'px';

			//alert( wdiv );
		}
	});
	$("th,td[help]").mouseout( function() {
		$("#helpbar").hide();
	});
	$(document).mousemove( function(e) {
		mx = e.pageX;
		my = e.pageY;
	});
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 
