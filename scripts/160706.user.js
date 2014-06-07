// ==UserScript==
// @name           Crocuta:kvala_personal
// @namespace      virtonomica
// @description    Отображение максимального числа сотрудников, которое держит топ, а также максимальной технологии установленной в подразделении.
// @version        1.1
// @grant          none
// @include        http://*virtonomic*.*/*/main/unit/view/*
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/supply
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/manufacture
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/animals
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/sale
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/sale/offer
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/finans_report
// @exclude        http://*virtonomic*.*/*/main/unit/view/*/technology
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
	
	var mode='';
	$( 'img[src*="812223"]' ).each ( function()
	{
		mode='Crocuta';// алмазы 
	});
	//mode='Crocuta';// офисная мистика
	var type = getType();//'unknow';
	var k =getK(type);// 0;
	//alert(type);
	if((type=='unknow')||(k==0)) return;
	
	//////////////////////////////////	
	var total=getPersonalTotal();
	var cur_pers=getPersonal(type);
	var kv = getPlayerQual();
		
	// топ-3
	$("td:contains('Суммарное')").next().each(function() { 
		str = this.innerHTML;
		//kv = parseInt( str );		
		pers = calcPersonalTop3(kv, type);
		var pers_next=calcPersonalTop3(kv+1, type);
		var overload=Math.round(10000*total/pers)/100;
		 
		if(overload>105) font='red';
		else if(overload>100) font='blue';
		else font='green';
		
		var str=' <br><font color=' + font +'>Предельная нагрузка по квале: <b>';
		str+=pers+ '</b>'+' (на след.уровне: '+'<b>'+pers_next+'</b>'+')'; 
		//str+='</b>'; 
		str+='<br>Загрузка топ-3: <b> '+overload+' %</b>';
		if(overload<100) str+='<br>Свободно: <b>'+(pers-total)+'</b>';
		else str+='<br>Нехватка: <b>'+(total-pers)+'</b>';
		str+= '</b></font>';
		this.innerHTML = this.innerHTML +str;
		
	});
	
// Количество работников
 	var nofp=getPersonal(type);
	
// топ-1
	var kvp = 0;
	$("td:contains('Уровень квалификации')").next().each(function() { 
		str = this.innerHTML;
		kvp = parseFloat( str );
		
		emp_count = calcPersonalTop1(kv, kvp, type);
		emp_count_next = calcPersonalTop1(kv+1, kvp, type);
				
		var maxq=f2(calcQualTop1(kv,cur_pers, type));
		
		if(maxq<kvp) font='red';
		else font='green';		
		this.innerHTML = this.innerHTML + '(<font color='+font+'>Макс: <b>' + maxq + '</b></font>)';
		
		if(emp_count<nofp) font='red';
		else font='green';		
		this.innerHTML = this.innerHTML + '<br>(<font color='+font+'>Максимальное количество рабов: <b>' + (emp_count) + '</b></font>)';
		this.innerHTML = this.innerHTML + '<br>(<font color=gray>На квале ' + (kv+1) + ' (следующий уровень): <b>' + 	(emp_count_next) + '</b></font>)';
		
		if(type!='service'){
			
			var p5=Math.floor(pers/5);			
			var k5=calcQualTop1(kv,p5,type);			
			var e5=calcEqQualMax(k5);
			this.innerHTML = this.innerHTML + '<br>(<font color=olive>Special 05: <b>5 *' + p5 + '--'  + f2(k5) + '('+e5+')'+'</b></font>)';
			
			p5=Math.floor(pers/10);			
			k5=calcQualTop1(kv,p5,type);			
			e5=calcEqQualMax(k5);
			this.innerHTML = this.innerHTML + '<br>(<font color=olive>Special 10: <b>10*' + p5 + '--'  + f2(k5) + '('+e5+')'+'</b></font>)';
		}
		else{
			
			var p5=Math.floor(pers/6);			
			var k5=calcQualTop1(kv,p5,type);			
			var e5=calcEqQualMax(k5);
			this.innerHTML = this.innerHTML + '<br>(<font color=olive>Special 06: <b>6 *' + p5 + '--'  + f2(k5) + '('+e5+')'+'</b></font>)';
			
			p5=Math.floor(pers/12);			
			k5=calcQualTop1(kv,p5,type);			
			e5=calcEqQualMax(k5);
			this.innerHTML = this.innerHTML + '<br>(<font color=olive>Special 12: <b>12*' + p5 + '--'  + f2(k5) + '('+e5+')'+'</b></font>)';
		}
	});
// техна
	var techn = 0;
	var max_techn = 0;
	$("td:contains('Уровень технологии')").next().each(function() { 
		str = this.innerHTML;
		techn = parseInt( str );
		max_techn = calcTechMax(kv);
		font = 'green';
		if ( max_techn < techn) {
			font = 'red';
		} 
		str = ' <br>(<font color=' + font +'>Максимальная технология: <b>' + (max_techn) + '</b></font>)';
		this.innerHTML = this.innerHTML + str;
	});
//оборудование
	var eq;
	var max_eq = 0;
	$("td:contains('Качество'):first").next().each(function() { 
		str = this.innerHTML;
		eq= parseFloat( str );
		max_eq = calcEqQualMax(kvp);
		
		if(eq>max_eq) font='red';
		else font = 'green';
		
		str = ' <br>(<font color=' + font +'>Макс.качество по персоналу: <b>' + (max_eq) + '</b></font>)';
		
		this.innerHTML = this.innerHTML + str;
	});
	///////////////////////////////////////////////////////////////////////////
	//Crocuta:VirtaLib
	//
	///////////////////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////////////////
	//function f2(val)
	//возвращает аргумент округлённым до 2-го знака
	///////////////////////////////////////////////////////////////////////////// 
	function f2(val){
		return Math.floor(100*val)/100;
	}//end f2()
	
	
	///////////////////////////////////////////////////////////////////////////
	//function getPlayerQual()
	//возвращает квалификацию игрока
	///////////////////////////////////////////////////////////////////////////// 
	function getPlayerQual(){
		return parseInt($('td.title:contains("Квалификация игрока")').next().text());
	}//end getPlayerQual()
	
	///////////////////////////////////////////////////////////////////////////
	//function calcPersonalTop3(q, type)
	// q - квалификация игрока
	// 
	//вычисляет максимальное кол-во работающих на предприятиях отрасли для заданной квалификации игрока (топ-3)
	///////////////////////////////////////////////////////////////////////////// 
	function calcPersonalTop3( q, type){
		return ((2*q*q + 6*q)*getK(type));
	}//end calcPersonalTop3()
	
	///////////////////////////////////////////////////////////////////////////
	//function calcPersonalTop1(q, qp,type)
	// q - квалификация игрока
	// qp -  квалификация персонала
	//вычисляет максимальное кол-во работающих с заданной квалификацией на предприятиии для заданной квалификации игрока (топ-1)
	///////////////////////////////////////////////////////////////////////////// 
	function calcPersonalTop1(q, qp,type){
		if((mode=='Crocuta')&&(type=='office')){return Math.floor(14*q*q/Math.pow(1.4, qp)/4.15);}
		return Math.floor(0.2*getK(type)*14*q*q/Math.pow(1.4, qp));
	}//end calcPersonalTop1()
	
	///////////////////////////////////////////////////////////////////////////
	//function calcQualTop1(q, p, type)
	// q - квалификация игрока
	// p -  численность персонала
	//вычисляет максимальное квалификацию работающих при заданных их численности и квалификации игрока (обратна calcPersonalTop1())
	///////////////////////////////////////////////////////////////////////////// 
	function calcQualTop1(q, p, type){		
		if(p==0) return 0.00;
		if((mode=='Crocuta')&&(type=='office')){return Math.log(14/4.15*q*q/p)/Math.log(1.4);}
		return Math.log(0.2*14*getK(type)*q*q/p)/Math.log(1.4);	
	}//end calcQualTop1()
	
	///////////////////////////////////////////////////////////////////////////
	//function calcTechMax(q)
	// q - квалификация игрока
	// 
	//вычисляет максимальный уровень технологии для заданной квалификации игрока
	///////////////////////////////////////////////////////////////////////////// 
	function calcTechMax(q){
		return Math.floor(10*Math.pow(q/0.0064, 1/3))/10 ;
	}//end calcTechMax()
	
	///////////////////////////////////////////////////////////////////////////
	//function calcEqQualMax(q)
	// qp - квалификация персонала
	// 
	//вычисляет максимальное качество оборудования/животных для заданной квалификации персонала
	///////////////////////////////////////////////////////////////////////////// 
	function calcEqQualMax( qp ){
		return Math.floor(100*Math.pow(qp, 1.5))/100 ;
	}//end calcEqQualMax
	
	///////////////////////////////////////////////////////////////////////////
	//function getPersonalTotal()
	//возвращает суммарное кол-во работающих в отрасли (топ-3)
	///////////////////////////////////////////////////////////////////////////// 
	function getPersonalTotal(){
	
		return parseInt($('td.title:contains("Суммарное")').next().text().replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''));
		
	}//end getPersonalTotal()
	
	///////////////////////////////////////////////////////////////////////////
	//function getType()
	//возвращает тип в виде строки  (по изображению)
	///////////////////////////////////////////////////////////////////////////// 
	function getType(){
		var img =  $("#unitImage").html();
		if(img=='') return 'unknown';
		img = img.substr(0,img.length-8);
		switch(img)
		{
			case('<img src="/img/v2/units/shop'):
				return 'shop';
				break;
			case('<img src="/img/v2/units/workshop'):
				return 'workshop';
				break;
			case('<img src="/img/v2/units/mill'):
				return 'mill';
				break;
			case('<img src="/img/v2/units/animalfarm'):
				return 'animalfarm';
				break;
			case('<img src="/img/v2/units/medicine'):
				return 'medicine';
				break;
			case('<img src="/img/v2/units/restaurant'):
				return 'restaurant';
				break;
			case('<img src="/img/v2/units/orchard'):
				return 'orchard';
				break;	
			case('<img src="/img/v2/units/farm'):
				return 'farm';
				break;	
			case('<img src="/img/v2/units/mine'):
				return 'mine';
				break;	
			case('<img src="/img/v2/units/lab'):
				return 'lab';
				break;		
			case('<img src="/img/v2/units/villa'):
				return 'villa';
				break;	
			case('<img src="/img/v2/units/warehouse'):
				return 'warehouse';
				break;	
			case('<img src="/img/v2/units/fishingbase'):
				return 'fishingbase';
				break;		
			case('<img src="/img/v2/units/office'):
				return 'office';
				break;	
			case('<img src="/img/v2/units/sawmill'):
				return 'sawmill';
				break;		
			case('<img src="/img/v2/units/service_light'):
				return 'service';
				break;	
			case('<img src="/img/v2/units/power'):
				return 'energy';
				break;				
			default:
				return 'unknown';
		}//end switch
	}//end getType()
	///////////////////////////////////////////////////////////////////////////
	//getK(type)
	//возвращает к для расчётов нагрузки по типу
	///////////////////////////////////////////////////////////////////////////
	function getK(type)
	{
		switch(type)
		{
			case('shop'):
			case('restaurant'):
			case('lab'):
				return 5;
				break;
			case('workshop'):			
			case('mill'):
			case('sawmill'):
				return 50;
				break;
			case('animalfarm'):
				return 7.5;
				break;
			case('medicine'):
			case('fishingbase'):
				return 12.5;
				break;			
			case('orchard'):				
			case('farm'):
				return 20;
				break;	
			case('mine'):
				return 100;
				break;			
			case('office'):
				//if(mode=='Crocuta') return 
				return 1;
				break;	
			case('service'):
				return 1.5;
				break;
			case('energy'):
				return 75.0;
				break;	
			case('villa'):	
			case('warehouse'):	
			case('unknown'):	
			default:
				return 0;
		}//end switch
	}//end getType()	
	///////////////////////////////////////////////////////////////////////////
	//getPersonal(type)
	//возвращает кол-во работников на предприятии (по типу)
	///////////////////////////////////////////////////////////////////////////
	function getPersonal(type)
	{
		var temp;
		switch(type)
		{
			case('lab'):
				temp='Количество учёных';
				break;
			case('workshop'):			
			case('mill'):
			case('mine'):
			case('fishingbase'):
			case('sawmill'):
			case('energy'):
				temp='Количество рабочих';
				break;
			case('animalfarm'):
			case('orchard'):				
			case('farm'):
				temp='Количество работников';				
				break;
			case('medicine'):
			case('office'):
			case('shop'):
			case('restaurant'):
			case('service'):
				temp='Количество сотрудников';				
				break;					
			case('villa'):	
			case('warehouse'):	
			case('unknown'):	
			default:
				temp='';
				break;
		}//end switch
		if(temp=='') return (-1); //error
		return parseInt($('td.title:contains('+temp+')').next().text().replace(' ','').replace(' ','').replace(' ',''));
	}//end getPersonal()	
	/////////////////////////////////////////////////////////////////////
	//end of Crocuta:VirtaLib
	/////////////////////////////////////////////////////////////////////
	
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 
