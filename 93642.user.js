// ==UserScript==
// @name           Qualification
// @namespace      virtonomica
// @version        1.32
// @description    Расширенная информация об опыте в Квалификации
// @include        http://*virtonomic*.*/*/main/user/privat/persondata/knowledge
// @include        http://igra.aup.ru/*/main/user/privat/persondata/knowledge
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   	$ = win.$;

	// получить строку с показателем успешности роста
	// Kn  -  уровень квалификации
	// kv_up - прирост квалы
	function getOptimal( kn, kv_up){
		if ( isNaN(kv_up) ) {
			kv_up = 0;
			return "&nbsp;";
		}
		// максимально возможный прирост
		var max = 0.9999409*Math.pow(kn, -0.569406);
		var ups = Math.floor( (kv_up * 10) / (max *10) );

		return "<font color=darkblue>" + ups + "%</font>";
	}
	// сколько пересчетов до роста
	// exp - текущее значение опыта по квалификации
	// up - текущий прирост квалы
	function getLastDays( exp,  up) {
		if ( isNaN(up) ) {
			return "&nbsp;";
		}
		var last = 100 - exp;
		var days = last / up;
		return Math.ceil( days);
	}	

   	//alert('RUN');
	var i = 0;
	// Массив с данными по квалификациям
	var know = new Array;
	i = 0;
	$("input", $("tr.odd") ).each(function() {
		 know[i] = $(this).attr('value');
		i++;
	});

	// меняем цвет прироста
	$("tr.odd td:last-child").css("color","DeepPink");

	// ищем текущее значение опыта
	var i = 0;
	var k = 0;
	var exp = new Array;
	var ncol = $( "tr.odd td" ).length / 8;
	$( "tr.odd td" ).each(function() {
		var indx = i;	     	// номер столбца
		indx = indx%ncol;		// номер колонки
		if ( indx == 5)  {
			//alert ( indx + " = " +$(this).text() );
			exp[ k ] = parseFloat( $(this).text() );
			k++;
		}
		i++;
	});

	i = 0;
	// массив с данными по приросту
	var up = new Array;
	$("tr.odd td:last-child").each(function() {
		up[i] = parseFloat(this.innerHTML);
		str = getOptimal( know[i], up[i] );
		$(this).parent().append( "<td>" + str + "");
		// сколько пересчетов до роста
		$(this).parent().append( "<td>" + getLastDays(  exp[ i ] , up[ i ] ) + "");
		i++;
	});

	$("tr.odd td:first-child").append("<br>");
	// меняем фон строк в таблице с параметрами
	$("tr.odd").css("background-color", "Gainsboro");
	// меняем цвета кнопок в квалификации
	$("input", $("tr.odd") ).css("background-color", "DimGray").css("color","gold");

}

if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}