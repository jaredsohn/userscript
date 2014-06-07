// ==UserScript==
// @name           Virtonomica: Посещаемость СУ, мед. цент-в, рест-в
// @author         XMaxikus & i____k____s
// @version        0.10
// @namespace      Virtonomica
// @description    Показывает максимум посетителей по количеству работников и процент посещаемости сферы услуг, медицинских центров, ресторанов
// @include        http://*virtonomic*.*/*/main/unit/view/*
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
	
	var type = getType();//'unknown';

    var d = 1;
    var ob; 
    var per;
    
// максмальное количество поситетилей по персоналу в ресторанах, сфере услуг, медицине
    if(type == 'restaurant' || type == 'service' || type == 'medicine') 
	$("td.title:contains('Количество посетителей')").next().each(function() 
        {
        var str = this.innerHTML;
        
        per = str.match(/\d[.\s\d]*(?=)/g);
        per = [per[0].replace(/[^\d\.]/g,''), per[1].replace(/[^\d\.]/g,'')];
        var SeichasPosov = per[0]; // записываем сколько сейчас посов
        
        ob = $("td:contains('Количество оборудования')").next().text();
        ob = ob.match(/\d[.\s\d]*(?=)/g);
        ob = [ob[0].replace(/[^\d\.]/g,''), ob[1].replace(/[^\d\.]/g,'')];
        
        var MaximumPosov = per[1]; // записываем максимум посов
		var	MaximumOborudVoobche = ob[1]; // записываем максимум оборудования, чтобы потом посчитать максимум сотр-ков
        
        var spec = $("td.title:contains('Специализация')").next().text();
        switch(spec)
		{
			// сфера услуг
            case('Фитнес'):
			case('Йога'):
			case('Бодибилдинг'):
			case('Группы здоровья'):
			case('Профессиональный спорт'):
			case('Скалолазание'):
				d = 5;
                break; // эта группа показывает разницу в соотношении: максимум оборуд-я/максимум сотр-ков
			case('Прачечная'):
			case('Химчистка'):
			case('Прачечная самообслуживания'):
				d = 10;
				break; // тоже самое (см. выше)
			default:
				d = 1;
		}//end spec

        var MaximumSotrudVoobche = MaximumOborudVoobche/d;
        var KolvoSotrudSeichas = $("td:contains('Количество сотрудников')").next().text();
        KolvoSotrudSeichas = KolvoSotrudSeichas.match(/\d[.\s\d]*(?=)/g);
        KolvoSotrudSeichas = [KolvoSotrudSeichas[0].replace(/[^\d\.]/g,'')];
        var MaximumPoPersonalu = KolvoSotrudSeichas[0]*(MaximumPosov/MaximumSotrudVoobche);
        var s = '<br>Макс. по персоналу: ' + MaximumPoPersonalu;
        
        s += '<br>Посещаемость: ' + ( procVal(MaximumPoPersonalu, SeichasPosov) ) + '%';
        
        this.innerHTML = str + s;
	});//end type

	/////////////////////////////////////////////////////////////////////////////
	//function getType()
	//возвращает тип в виде строки  (по изображению)
	///////////////////////////////////////////////////////////////////////////// 
	function getType(){
		var img =  $("#unitImage").html();
		if(img=='') return 'unknown';
		img = img.substr(0,img.length-8);
		switch(img)
		{
			case('<img src="/img/v2/units/medicine'):
				return 'medicine';
				break;
			case('<img src="/img/v2/units/restaurant'):
				return 'restaurant';
				break;
			case('<img src="/img/v2/units/service_light'):
				return 'service';
				break;			
			default:
				return 'unknown';
		}//end switch
	}//end getType()
	
	/////////////////////////////////////////////////////////////////////////////
	//function procVal(num, val)
	//возвращает процент от val по отношению к num (процент посещаемости от максимума)
	///////////////////////////////////////////////////////////////////////////// 
	function procVal(num, val){
		return Math.round(val/(num/100)*100)/100;
	}//end procVal()
	
	/*********************************************************************************/
	
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 
