// ==UserScript==
// @name           virtonomica:Зарплаты
// @namespace      virtonomica
// @description    Облегчение установки зарплат
// @description    - установка зарплаты по требуемой квалификации
// @description    - установка зарплаты по среднегородской
// @description    - увеличение зарплаты на 1%
// @description    - установка зарплаты по произвольной квалификации
// @version        1.42
// @include        http://virtonomic*.*/*/window/unit/employees/engage/*
// @include        http://igra.aup.*/*/window/unit/employees/engage/*
// ==/UserScript==

var run = function() {

	// "округляем" зарплату на 1 сотую вверху
	function getSalary( sal) {
		return (Math.floor(sal *100) +1)/100;
	}

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	var n = 0;

	var my_salary = new Number($("#salary").val());
	var my_salary_0 = my_salary; 

	//настройки под интерфейс
	// 0 -русский
	// 1- английский
	var i_find =    ['Отдел кадров', 'HR'];
	var i_salary = ['Средняя зарплата', 'Average city salary'];
	var i_kv =       ['требуется', 'required'];

	// определяем интерфейс
	var type_interface = 0;
	for( i=0; i<i_find.length; i++){
		 $("div.required_employee:contains('"+ i_find[i] + "')").each( function() {	type_interface = i;	});
	}

	var current_kv = $("#apprisedEmployeeLevel").text();

	var prize = /([\D]+)([\d\s]+\.*\d*)/.exec($("table.list td:contains(" + i_salary[type_interface] +")").text())[2].replace(" ", "");

	/(\d+\.*\d+)\D*(\d+\.*\d+)/.exec($("span:contains(" + i_kv[type_interface] + ")").text() );
	var avg_kv = new Number(RegExp.$1);
	var find_kv = new Number(RegExp.$2); 

  var container = $('div.headerSeparator');

  var input_95 = $('<button id=b_kv title="Выставить зарплату по квалификации">1:1</button>').click(function() {
//если зп < 100% то требуемая_зп = КОРЕНЬ(треб_квала/базовая_квала)*городская_зп	
// y = 2* (0.5)^base
	current_kv = $("#apprisedEmployeeLevel").text();
	//prize = /([\D]+)([\d\s]+\.*\d*)/.exec($("table.list td:contains(" + i_salary[type_interface] +")").text())[2].replace(" ", "");
	my_salary = new Number($("#salary").val());

//	/(\d+\.*\d+)\D*(\d+\.*\d+)/.exec($("span:contains(" + i_kv[type_interface] + ")").text() );
//	var avg_kv = new Number(RegExp.$1);
//	var find_kv = new Number(RegExp.$2); 

	k = my_salary/prize;
	k1 = k*k;
//	alert("k="+ k);
	if ( k < 1) {
//		alert("k 1 current_kv = " + current_kv + " find_kv = " + find_kv + " prize = " + prize);
		base = (current_kv/k1) ;
		val = Math.sqrt(find_kv/base)*prize;
//		alert ("val = " + val);
		// если зарплата превысила среднею
		limit = val / prize;
		if ( limit > 1) {
//			alert("fix 1");
			base = base / avg_kv;
			base = 2 * Math.pow(0.5, base);
			val = (Math.pow(2, find_kv/avg_kv)*base - 1)*prize ;
		}
	}
	else {
//		alert("k 2");
		base = (k+1)/Math.pow(2, current_kv/avg_kv);
		val = (Math.pow(2, find_kv/avg_kv)*base - 1)*prize ;
		// если зарплата стала меньше средней
		limit = val / prize;
		if ( limit < 1) {
//			alert("fix 2");
			base = avg_kv * Math.log(base/2)/ Math.log(0.5);
			val = Math.sqrt(find_kv/base)*prize;
		}
	}
	// блокировка от потери обученности
	limit = val / prize;
	if ( limit <= 0.80 ){
		val = Math.floor(0.80* prize) +1;
	}
	val = getSalary(val);
	$('#salary').prop('value', val );
	appriseEmployeeLevel();
  });

  var input_100 = $('<button id=b100>100%</button>').click(function() {
	$('#salary').prop('value', prize);
	appriseEmployeeLevel();
  });

  var input_plus = $('<button title="Увеличить зарплату на 1%">+1%</button>').click(function() {
	val = getSalary ( $('#salary').val() * 1.01 );
	$('#salary').prop('value', val);
	appriseEmployeeLevel();
  });
  var input_ret = $('<button title="Вернуть зарплату, которая стоит">Ret</button>').click(function() {
	$('#salary').prop('value', my_salary_0);
	appriseEmployeeLevel();
  });

var input_f = $("<input> ").prop({type: 'text', value: '', size: '6'}).change(function() {
	temp = find_kv;
	find_kv = this.value;
	$("#b_kv").click();
	find_kv = temp;
});

  container.append( $('<table><tr>').append('<td>').append(input_95).append('<td>').append(input_f).append('<td>').append(input_plus).append('<td>').append(input_100).append('<td>').append(input_ret) );
}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);