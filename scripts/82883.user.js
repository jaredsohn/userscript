// ==UserScript==
// @name           Kvala_info
// @namespace      virtonomica
// @version        1.0
// @description    Расширенная информация об опыте в Квалификации (chrome fix). Исходная версия: http://userscripts.org/scripts/review/73200
// @include        http://virtonomica.*/*/main/user/privat/persondata/knowledge
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   	$ = win.$;

        function getNumber(str, alert, label) {
           str = str.trim();
           if (str.length == 0) {
              if (alert) { alert(label + ": String is empty!"); }
              return 0;
           }

           var num = parseFloat(str);

           if (typeof num != "number") {
              alert(label + ': Unable to parse string "' + str + '"');
              return 0;
           }

           return num;
        }

	// получить строку с показателем успешности роста
	// Kn  -  уровень квалификации
	// kv_up - прирост квалы
	function getOptimal( kn, kv_up){


		// максимально возможный прирост
		var max = 0.9999409*Math.pow(kn, -0.569406);
		var ups = Math.floor( (kv_up * 10) / (max *10) );

		return "<font color=darkblue>" + ups + "%</font>";
	}


	// сколько пересчетов до роста
	// exp - текущее значение опыта по квалификации
	// up - текущий прирост квалы
	function getLastDays( exp,  up) {

                if (up == 0) {
                   return "&#8734;";
                }

		var last = 100 - exp;
		var days = last / up;
		return Math.ceil( days);
	}	

	var i = 0;
	// Массив с данными по квалификациям
	var know = new Array;
	i = 0;
	$("input", $("tr.odd") ).each(function() {
		 know[i] = getNumber($(this).attr('value'), true, 'know #' + i);
		i++;
	});

	// меняем цвет прироста
	$("tr.odd td:last-child").css("color","DeepPink");

	// ищем текущее значение опыта
	var i = 0;
	var k = 0;
	var exp = new Array;
	$( "tr.odd td" ).each(function() {
		var indx = i;	     	// номер столбаца
		indx = indx%7;		// номер колонки
		if ( indx == 5)  {
			//alert ( indx + " = " +$(this).text() );
			exp[ k ] = getNumber($(this).text(), false, 'exp #' + k);
			k++;
		}
		i++;
	});

	i = 0;
	// массив с данными по приросту
	var up = new Array;
	$("tr.odd td:last-child").each(function() {
		up[i] = getNumber( this.innerHTML, false, 'up #' + i);
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

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);