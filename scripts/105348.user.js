// ==UserScript==
// @name           kvala_personal
// @namespace      virtonomica
// @description    Отображение максимального числа сотрудников, которое держит топ, а также максимальной технологии установленной в подразделении.
// @version        1.5
// @include        http://*virtonomic*.*/*/main/unit/view/*
// @include        http://igra.aup.ru/*/*/unit/view/*
// @include        http://game.kiev-job.com.ua/*/*/unit/view/*
// ==/UserScript==

function getPersonal( kv, k){
	return parseInt( (10*kv*kv + 30*kv)* k);
}
function getEmploeeCount(kv, kve)
{
	return Math.floor(14*kv*kv/Math.pow(1.4, kve));
}
function getMaxTech( kv ){
	return Math.floor(10*Math.pow(kv/0.0064, 1/3))/10 ;
}
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

var run = function() {

   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;

// Определяем реалм
var realm =   ['vera', 'anna', 'olga', 'lien', 'mary'];
// Учтем особсенности производства по реалмам
var factory = [ 1,        2,        1,        1,       1 ];
var mine    = [ 1,        0.5,      1,        1,       1 ];

// наши бонусы по квалификации
var bonus = [
0, // 0 Добыча
0, // 1 Животноводство
0, // 2 Маркетинг
0, // 3 наука
0, // 4 Производство
0, // 5 Сельское хозяйство
0, // 6 Торговля
0  // 7 Управление
];

var str = "" + window.location;
var my_realm = 'unknown';
var my_relam_index = -1;
for (i=0; i< realm.length; i++){
	rc = str.search("/"+ realm[i] +"/");
	if ( rc == -1 ) continue;
	my_realm = realm[i];
	my_relam_index = i;
	break;
}

var type = 'unknow';

$("td:contains('Размер фермы')").each(function() { 
	type = 'ferma';
});

$("td:contains('Общая площадь земли')").each(function() { 
	type = 'land';
});

$("td:contains('Размер лаборатории')").each(function() { 
	type = 'science';
});

$("td:contains('Размер офиса')").each(function() { 
	type = 'office';
});

$("td:contains('Размер мельницы')").each(function() { 
	type = 'mill';
});

$("td:contains('Торговая площадь')").each(function() { 
	type = 'shop';
});

$("td:contains('Размер завода')").each(function() { 
	type = 'factory';
});

$("td:contains('Размер шахты')").each(function() { 
	type = 'mine';
});


var k = 1;
var kv = 0;
$("td:contains('Квалификация игрока')").next().each(function() { 
	str = this.innerHTML;
	kv = parseInt( str );

	delta = 0;
	switch ( type){
		case 'ferma': k = 1.5; delta = bonus[1]; break;
		case 'land': k = 4; delta = bonus[5]; break;
                case 'science': k = 1; delta = bonus[3];break;
		case 'office': k = 0.2; delta = bonus[7];; break;
		case 'shop': delta = bonus[6];break;
		case 'mine': k = 20;{
                        if ( my_relam_index > -1){
				k = k * mine[ my_relam_index ];
			}
                       delta = bonus[0];
                       break;}
		case 'mill':
		case 'factory':  {
			k = 10; 
			if ( my_relam_index > -1){
				k = k * factory[ my_relam_index ];
			}
			delta = bonus[4];
			break;}
		default: return;
	}

	pers = getPersonal(kv, k);
	var str =  ' <br>(<font color=red>Предельная нагрузка по квале: <b>' + numberFormat(pers) + '</b></font>)';
	if  (delta > 0) {
		pers2 = getPersonal(kv-delta, k);
		str+=' [' + numberFormat(pers2) + ']';
	}
	
this.innerHTML = this.innerHTML +str;
});
var k = 1;
var kvp = 0;
// работников
$("td:contains('Уровень квалификации')").next().each(function() { 
	str = this.innerHTML;
	kvp = parseFloat( str );

	delta = 0;
	switch ( type){
		case 'ferma': k = 1.5; delta = bonus[1]; break;
		case 'land': k = 4; delta = bonus[5]; break;
                case 'science': k = 1; delta = bonus[3];break;
		case 'office': k = 0.2; delta = bonus[7];; break;
		case 'shop': delta = bonus[6];break;
		case 'mine':k = 20; delta = bonus[0];break;
		case 'mill':
		case 'factory':  {
			k = 10; 
			if ( my_relam_index > -1){
				k = k * factory[ my_relam_index ];
			}
			delta = bonus[4];
			break;}
		default: return;
	}

	emp_c = k*getEmploeeCount(kv, kvp);
	emp_count = Math.floor(emp_c);
	emp_c_next = k*getEmploeeCount(kv+1, kvp);
	emp_count_next = Math.floor(emp_c_next);
	this.innerHTML = this.innerHTML + '<br>(<font color=red>Максимальное количество рабов: <b>' + numberFormat(emp_count) + '</b></font>)';
	this.innerHTML = this.innerHTML + '<br>(<font color=gray>На квале ' + numberFormat(kv+1) + ' (следующий уровень): <b>' + 	numberFormat(emp_count_next) + '</b></font>)';
});

var techn = 0;
var max_techn = 0;
$("td:contains('Уровень технологии')").next().each(function() { 
	str = this.innerHTML;
	techn = parseInt( str );
	max_techn = getMaxTech(kv);
	switch ( type ){
		case 'ferma':  delta = bonus[1]; break;
		case 'land': delta = bonus[5]; break;
                case 'science':  delta = bonus[3];break;
		case 'office':  delta = bonus[7]; break;
		case 'shop': delta = bonus[6];break;
		case 'mine':delta = bonus[0];break;
		case 'mill':
		case 'factory':  
			delta = bonus[4];break;
		default: delta = bonus[4];
	}

	font = 'grey';
	if ( max_techn != techn) {
		font = 'red';
	} 

	str = ' <br>(<font color=' + font +'>Максимальная технология: <b>' + numberFormat(max_techn) + '</b></font>)';
	if (delta > 0){
		max_techn2 = getMaxTech(kv-delta);
		str+= 	' [' + numberFormat(max_techn2) + ']';
	}
	this.innerHTML = this.innerHTML + str;
});

}

if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}
