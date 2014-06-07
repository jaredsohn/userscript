// ==UserScript==
// @name           kvala_personal
// @namespace      virtonomica
// @description    Отображение максимального числа сотрудников, которое держит топ, а также максимальной технологии установленной в подразделении.
// @description    Displays the maximum number of employees, which keeps the top and the maximum technology installed in the unit.
// @version        1.7
// @include        http://*virtonomic*.*/*/main/unit/view/*
// @include        http://igra.aup.ru/*/*/unit/view/*
// ==/UserScript==

var run = function() {

   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;

   // определяем интерфейс
   var lang = 'undef';
   var bt_logout = $("li[class='icon menulogout']");
   var logout_string = bt_logout.attr('title');
   if (logout_string == 'Выход') {
	lang = 'Ru';
   } else if(logout_string == 'Logout') {
	lang = 'En';
   } 
   console.log(lang);
   if ( lang == 'undef') {
        alert('Unsupported language for userscript "kvala_personal"');
	return;
   } 

   // Строки зависимые от языка
   // language definitions
   var Seting = new Object();
   Seting['Ru'] = new Object();
   Seting['En'] = new Object();

   // exactly as display in interface
   Seting['Ru']['Qualification of player'] = "Квалификация игрока";
   Seting['En']['Qualification of player'] = "Qualification of player";

   // exactly as display in interface
   Seting['Ru']['Total number of employees'] = "Суммарное количество подчинённых";
   Seting['En']['Total number of employees'] = "Total number of employees";

   // free form
   Seting['Ru']['Limit on qualification'] = "Предельная нагрузка по квале";
   Seting['En']['Limit on qualification'] = "Limit on qualification";

   // free form
   Seting['Ru']['bonus'] = "запас";
   Seting['En']['bonus'] = "bonus";

   // free form
   Seting['Ru']['without bonus'] = "без бонусов";
   Seting['En']['without bonus'] = "without bonus";

   // exactly as display in interface
   Seting['Ru']['Qualification of employees'] = "Уровень квалификации";
   Seting['En']['Qualification of employees'] = "Qualification of employees";

   // exactly as display in interface
   Seting['Ru']['Number of employees'] = "Количество";
   Seting['En']['Number of employees'] = "Number of";

   // free form
   Seting['Ru']['maximum'] = "Максимальное количество работников";
   Seting['En']['maximum'] = "Maximum number of employees";

   // free form
   Seting['Ru']['on Qualification'] = "На квале";
   Seting['En']['on Qualification'] = "on Qualification";

   // free form
   Seting['Ru']['next'] = "следующий уровень";
   Seting['En']['next'] = "next level";

   // exactly as display in interface
   Seting['Ru']['Technology level'] = "Уровень технологии";
   Seting['En']['Technology level'] = "Technology level";

   // free form
   Seting['Ru']['maximum technology'] = "Максимальная технология";
   Seting['En']['maximum technology'] = "Maximum of technology";

   // exactly as display in interface
   Seting['Ru']['Total area'] = "Общая площадь земли";
   Seting['En']['Total area'] = "Total area";

   // exactly as display in interface
   Seting['Ru']['Farm size'] = "Размер фермы";
   Seting['En']['Farm size'] = "Farm size";


function getPersonal( kv, k){
	return parseInt( (9.7*kv*kv + 41.5*kv - 48)* k);
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
0, // 7 Управление
0, // 8 промысловое хозяйство
0, // 9 фитнес
0, // 10 рестораны
0, // 11 медицина 
0   // 12 энергетика
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

$("td:contains('" + Seting[lang]['Farm size'] +"')").each(function() { 
	type = 'ferma';
});

$("td:contains('" + Seting[lang]['Total area'] +"')").each(function() { 
	type = 'land';
});

// поиск по картинке
function findType()
{
  var head = $("#unitImage");
  var img = $("img", head);
  link = img.attr('src');

  n = link.indexOf('restaurant');
  if (n > 0) return "restaurant";

  n = link.indexOf('service_light');
  if (n > 0) return "fitness";

  n = link.indexOf('medicine');
  if (n > 0) return "medicine";

  n = link.indexOf('fishingbase');
  if (n > 0) return "fish";

  n = link.indexOf('lab');
  if (n > 0) return "science";

  n = link.indexOf('workshop');
  if (n > 0) return "factory";

  n = link.indexOf('shop');
  if (n > 0) return "shop";

  n = link.indexOf('office');
  if (n > 0) return "office";

  n = link.indexOf('mill');
  if (n > 0) return "mill";

  n = link.indexOf('mine');
  if (n > 0) return "mine";

  n = link.indexOf('power');
  if (n > 0) return "power";

  return "unknow";
}

if (type == 'unknow') type = findType();
//alert(type);

var k = 1;
// Квалификация игрока
var kv = 0;
$("td:contains('" + Seting[lang]['Qualification of player'] + "')").next().each(function() { 
	str = this.innerHTML;
	kv = parseInt( str );

	delta = 0;
	switch ( type){
		case 'ferma': k = 1.5; delta = bonus[1]; break; // ++
		case 'fish': k = 2.5;  delta = bonus[8]; break; // ++
		case 'land': k = 4;  delta = bonus[5]; break; // ++
                case 'science': delta = bonus[3];break; // ++
		case 'office': k = 0.2; delta = bonus[7];; break; // ++
		case 'shop': delta = bonus[6];break; // ++
		case 'restaurant': delta = bonus[10];break; // ++
		case 'fitness': k=0.3; delta = bonus[9];break; // ++
                case 'medicine': k = 2.5;  delta = bonus[11]; break; // ++
		case 'mine': {
			k = 20; // ++
                        if ( my_relam_index > -1){
				k = k * mine[ my_relam_index ];
			}
                       delta = bonus[0];
                       break;}
		case 'mill':
		case 'factory':  {
			k = 10; // ++
			if ( my_relam_index > -1){
				k = k * factory[ my_relam_index ];
			}
			delta = bonus[4];
			break;}
		case 'power': {
			k = 7.5; 
			delta = bonus[12]; 
			break;}
		default: return;
	}

	//console.log("kv= "+ kv + ", k = " +k);
	pers = getPersonal(kv, k);
        limit2  = Math.round(pers*1.2);
	var str =  '<span id=all_warrning_1><br>('+Seting[lang]['Limit on qualification']+': <b>' + numberFormat(pers) + '</b>)</span>';
        str+= '<span id=all_warrning_2><br>(20% '+ Seting[lang]['bonus'] +' = ' + numberFormat( limit2 ) + ')</span>';
	if  (delta > 0) {
		pers2 = getPersonal(kv-delta, k);
		str+=', [' + Seting[lang]['without bonus'] +': ' + numberFormat(pers2) + ']';
	}
        work = parseInt( $("td:contains('" + Seting[lang]['Total number of employees'] +"')").next().text().replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "") );
	
        this.innerHTML = this.innerHTML +str ;

        if (work > pers)  {
            $("#all_warrning_1").css('color', 'purple').css('font-weight', 'bold');
            $("td:contains('"+Seting[lang]['Qualification of player']+"')").css('color', 'purple');
        }
        if (work >= limit2)  {
            $("#all_warrning_2").css('color', 'red').css('font-weight', 'bold');
            $("td:contains('"+Seting[lang]['Qualification of player']+"')").css('color', 'red');
        }
});
var k = 1;
// Квалификация работников
var kvp = 0;
function process_employees( str, num_workers_string){
	//str = this.innerHTML;
	kvp = parseFloat( str );
	//console.log(str);
	//console.log(type);
	delta = 0;
	switch ( type){
		case 'ferma': k = 1.5; delta = bonus[1]; break; // ++
		case 'fish': k = 2.5; delta = bonus[8]; break; // ++
		case 'land': k = 4; delta = bonus[5]; break; // ++
                case 'science': delta = bonus[3];break;  // ++
		case 'office': k = 0.2; delta = bonus[7];; break; // ++
		case 'shop': delta = bonus[6];break; // ++
		case 'restaurant': delta = bonus[10];break; // ++
		case 'fitness': k=0.3; delta = bonus[9];break; // ++
		case 'mine': k=20; delta = bonus[0];break;
                case 'medicine': k = 2.5;  delta = bonus[11]; break; // ++
		case 'mill':
		case 'factory':  {
			k = 10; 
			if ( my_relam_index > -1){
				k = k * factory[ my_relam_index ];
			}
			delta = bonus[4];
			break;}
		case 'power': {
			k = 15; 
			delta = bonus[12]; 
			break;}
		default: return str;
	}

	emp_c = k*getEmploeeCount(kv, kvp);
	emp_count = Math.floor(emp_c);
	emp_c_next = k*getEmploeeCount(kv+1, kvp);
	emp_count_next = Math.floor(emp_c_next);

        work = parseInt( $("td:contains('"+num_workers_string+"')").next().text().replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "") );
        limit2  = Math.round(emp_count*1.2);
        temp = '<span id=unit_warning_2><br>(20% '+ Seting[lang]['bonus'] +' = ' + numberFormat( limit2 ) + ')</span>';

	str = str + '<span id=unit_warning_1><br>(' + Seting[lang]['maximum'] +': <b>' + numberFormat(emp_count) + '</b></span>)' + temp;
	str = str + '<br>(<font color=gray>' + Seting[lang]['on Qualification']+' '  + numberFormat(kv+1) + ' ('+ Seting[lang]['next'] +'): <b>' + numberFormat(emp_count_next) + '</b></font>)';

	//console.log("work = " +work + " " + emp_count);
        if (work >= emp_count ){
            $("#unit_warning_1").css('color', 'purple').css('font-weight', 'bold');
            $("td:contains('"+Seting[lang]['Qualification of employees']+"')").css('color', 'purple');
        }
        if (work >= limit2 ){
            $("#unit_warning_2").css('color', 'red').css('font-weight', 'bold');
            $("td:contains('"+Seting[lang]['Qualification of employees']+"')").css('color', 'red');
        }

	return str;
}

// работников
var flag = false;
// fix fir english interface
$("td:contains('Workers qualification')").next().each(function() { 
	//console.log("process_employees 1");
	this.innerHTML = process_employees(this.innerHTML, "Number of");
	flag = true;
});
if (flag == false) {
	$("td:contains('"+Seting[lang]['Qualification of employees']+"')").next().each(function() { 
		//console.log("process_employees 0");
		this.innerHTML = process_employees(this.innerHTML, Seting[lang]['Number of employees'] );
	});
}

var techn = 0;
var max_techn = 0;
$("td:contains('" + Seting[lang]['Technology level'] +"')").next().each(function() { 
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

	str = ' <br>(<font color=' + font +'>' + Seting[lang]['maximum technology'] +': <b>' + numberFormat(max_techn) + '</b></font>)';
	if (delta > 0){
		max_techn2 = getMaxTech(kv-delta);
		str+= 	' [' + numberFormat(max_techn2) + ']';
	}
	this.innerHTML = this.innerHTML + str;
});

}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 
