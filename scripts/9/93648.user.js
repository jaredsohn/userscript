// ==UserScript==
// @name           virtonomica: Расчет окупаемости обучения
// @namespace      virtonomica
// @description    Расчет окупаемости обучения
// @version        1.0
// @include        http://virtonomic*.*/*/window/unit/employees/education/*
// ==/UserScript==

var run = function() {

	// "округляем" зарплату на 1 сотую вверху
	function getSalary( sal) {
		return (Math.floor(sal *100) +1)/100;
	}

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	var n = 0;
	$("table.list td:contains(Средняя зарплата в городе)").append($("<span>").text("Окупаемость").attr({title:'Окупаемость'}).click(function(){
     
    
	var my_salary = new Number($("#salary").val());
	var my_salary_0 = my_salary; 

	var kv =/([\D]+)([\d\s]+\.*\d*)/.exec($("table.list td:contains(Текущий:)").text())[2].replace(" ", "");  //квала сейчас
	/.+\n(\D+)([\d\s]+\.*\d*).+\n(\D+)([\d\s]+\.*\d*)/.exec($("table.list td:contains(В среднем по городу:)").text())[2].replace(" ", ""); 
	var avg_kv = new Number(RegExp.$2.replace(" ", ""));//квала города
	var find_kv = new Number(RegExp.$4.replace(" ", "")); //требуемая квала.
	
	var ob_kv = $("#apprisedEmployeeLevel").text().replace(" ", ""); //квала после образования
	var period=$("#unitEmployeesData_timeCount").val(); //сколько периодов учить
	var kol_ob=$("#unitEmployeesData_employees").val(); // сколько человек обучается
	var price_ob=$("#totalCost_complite").text().replace(" ", "").replace(" ", "").replace("$", "") ;
	//$("#totalCost_complite").val();// полная стоимость обучения
	
	var kol_sotr =new Number($($("td",$("table.list tr:contains(Количество сотрудников)"))[0]).text().replace(" ", "")); //количество сотрудников
	var price_d=$("td",$("table.list tr:contains(Зарплата)")).text().replace(" ", "").replace("$", "");//зарплата сейчас
	
	var price_avg=/([\D]+)([\d\s]+\.*\d*)/.exec($("table.list td:contains(Средняя зарплата в городе)").text())[2].replace(" ", "");// зарплата в городе
	
	
	//высчитываем какая зарплата будет после обучения при ныненшней квалификации работников
	var Sreq = price_d;
	var k = price_d/price_avg;
        var k1 = k*k;
        if(k <= 1){
          b = (ob_kv/k1);
          Sreq = Math.sqrt(kv/b)*price_avg;
          // если зарплата превысила среднею
          if( Sreq/price_avg > 1){
            b = b / avg_kv;
            b = 2 * Math.pow(0.5, b);
            Sreq = (Math.pow(2, kv/avg_kv)*b - 1)*price_avg;
          }
        } else {
          b = (k+1)/Math.pow(2, ob_kv/avg_kv);
          Sreq = (Math.pow(2, kv/avg_kv)*b - 1)*price_avg;
          // если зарплата стала меньше средней;
          if(Sreq/price_avg < 1){
            b = avg_kv * Math.log(b/2)/Math.log(0.5);
            Sreq = Math.sqrt(kv/b)*price_avg;
          }
        }
        
        // блокировка от потери обученности
        if (Sreq/price_avg <= 0.80){
          Sreq = Math.floor(0.80 * price_avg) + 1;
        }
		var viigr=price_ob/(price_d-Sreq)/kol_sotr;

		
		$("table.list td:contains(Ожидаемые расходы на зарплату)").append($("<span>").text(" Окупаемость: "+ viigr.toFixed(4)).css({'color':'rgb(256,0,0)'}));
}));

    $("span",$("table.list td:contains(Средняя зарплата в городе)")).css({fontSize:'75%',margin:'3px', padding:'2px', border:'1px solid #2222ff', borderRadius:'3px', cursor:'pointer'}).hover(function () {this.style.color = 'red';},function () {this.style.color = 'black';});

}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);