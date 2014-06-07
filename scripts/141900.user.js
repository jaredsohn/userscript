// ==UserScript==
// @name           Virtonomica: Кабинет мэра
// @namespace      virtonomica
// @description    Добавлем статистику по городу на страницу мэра
// @version        1.01
// @include     http://igra.aup.ru/*/main/politics/mayor/*
// @include     http://*virtonomic*.*/*/main/politics/mayor/*
// @grant	none
// ==/UserScript==

var run = function() {

var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

function numberFormat (number) {
          number += '';
          var parts = number.split('.');
          var int = parts[0];
          var dec = parts.length > 1 ? '.' + parts[1] : '';
          var regexp = /(\d+)(\d{3}(\s|$))/;
          while (regexp.test(int)) {
          int = int.replace(regexp, '$1 $2');
          }
          return int + dec;
}

	var info1 = $("#subHeader");

	// Базовое население города
	var el = $("td:contains('Население')", info1).next();
	var base_population = parseInt( el.text().replace("тыс. чел.",'').replace(" ",'').replace(" ",'').replace(" ",'').replace(" ",'') );
	console.log("base_population = " +base_population 	);

	// средняя зарплата
	el = $("td:contains('Средняя зарплата в городе')", info1).next();
	var salary = parseFloat( el.text().replace("$",'').replace(" ",'').replace(" ",'').replace(" ",'').replace(" ",'') );
	console.log("salary = " +salary 	);

	// уровень безработицы
	el = $("td:contains('Уровень безработицы')", info1).next();
	var unemployed = parseFloat( el.text().replace("%",'').replace(" ",'').replace(" ",'').replace(" ",'').replace(" ",'') );
	console.log("unemployed = " +unemployed );

	// Всего жителей агломерации
	var info2 = $("#mainContent");
	el = $("table", info2).eq(1);
	elp = $("th", el);
	//console.log(elp.html());
	var all_population = parseInt( elp.text().replace("тыс. чел.",'').replace(" ",'').replace(" ",'').replace(" ",'').replace(" ",'') );

	console.log("all_population = " +all_population );

	var str = "<div style='PADDING: 3px; BORDER-BOTTOM: 2px solid #699E26; BACKGROUND-COLOR: #EAEEBA; FONT-SIZE:13px; COLOR: navy; '>";

	str+= "<table >";

	ext = all_population - base_population;
	if (ext > 0) {
		pr = Math.round(10000*ext/all_population)/100;
		str+= "<tr><td>Приезжие<td align=right>" +( pr) + "%<td>&nbsp;&nbsp;<td align=right>" + numberFormat(ext*1000);
	}

	var row = $("div", el);
	for (var i=0; i< row.length; i++){
		var temp = row.eq(i).prop('title');
		console.log( temp );

		var fl_pr = parseFloat( /( [\d\s]+\.*\d*)/.exec( temp )[1].replace(" ",'') );
		text = temp.substr(0, temp.length - 7);
		str+= "<tr><td>" + text + "<td align=right>" + fl_pr + "%<td>&nbsp;&nbsp;<td align=right>" ;
		str+= numberFormat( Math.round( all_population * fl_pr *10 ) );
		console.log( text + "=" +fl_pr );
	}
	str+= "</table>";

	str+= "</div>";

	el.after(str);

	console.log("End");
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 