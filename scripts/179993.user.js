// ==UserScript==
// @name        Kvalas Virtonomics EN
// @namespace   Virtonomica
// @description Translation of Kvalas Script
// @include     http://*virtonomic*.*/*/main/unit/view/*
// @version     1
// @grant       none
// ==/UserScript==

var run = function() {

   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;

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

// Define the realm
var realm =   ['vera', 'anna', 'olga', 'lien', 'mary'];
// Ð£Ñ‡Ñ‚ÐµÐ¼ Ð¾ÑÐ¾Ð±ÑÐµÐ½Ð½Ð¾ÑÑ‚Ð¸ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´ÑÑ‚Ð²Ð° Ð¿Ð¾ Ñ€ÐµÐ°Ð»Ð¼Ð°Ð¼
var factory = [ 1,        2,        1,        1,       1 ];
var mine    = [ 1,        0.5,      1,        1,       1 ];

// Qualification Bonuses
var bonus = [
0, // 0 Mining
0, // 1 Livestock
0, // 2 Marketing
0, // 3 Science
0, // 4 Production
0, // 5 Agriculture
0, // 6 Commerce
0, // 7 Management
0, // 8 Fishing Industry
0, // 9 Services Sector
0, // 10 Restaurant
0  // 11 Medicine
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

// Search by image
function findType()
{
  var head = $("#unitImage");
  var img = $("img", head);
  link = img.attr('src');
  
  n = link.indexOf('animalfarm');
  if (n > 0) return "ferma";
  
  n = link.indexOf('orchard');
  if (n > 0) return "land";

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

  return "unknow";
}

if (type == 'unknow') type = findType();
//alert(type);

var k = 1;
// Manager Qualification
var kv = 0;
$("td:contains('Qualification of player')").next().each(function() { 
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
		default: return;
	}

	pers = getPersonal(kv, k);
        limit2  = Math.round(pers*1.25);
	var str =  '<span id=all_warrning_1><br>(Top 3 Limit: <b>' + numberFormat(pers) + '</b>)</span>';
        str+= '<span id=all_warrning_2><br>(125% Limit = ' + numberFormat( limit2 ) + ')</span>';
	if  (delta > 0) {
		pers2 = getPersonal(kv-delta, k);
		str+=', [No Bonuses: ' + numberFormat(pers2) + ']';
	}
        work = parseInt( $("td:contains('Total number of employees')").next().text().replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "") );
	
        this.innerHTML = this.innerHTML +str ;

        if (work > pers)  {
            $("#all_warrning_1").css('color', 'purple').css('font-weight', 'bold');
            $("td:contains('Qualification of player')").css('color', 'purple');
        }
        if (work >= limit2)  {
            $("#all_warrning_2").css('color', 'red').css('font-weight', 'bold');
            $("td:contains('Qualification of player')").css('color', 'red');
        }
});
var k = 1;
// Qualification of employees (offices)
var kvp = 0;
// Employees
$("td:contains('Qualification of employees')").next().each(function() { 
	str = this.innerHTML;
	kvp = parseFloat( str );

	delta = 0;
	switch ( type){
		case 'ferma': k = 1.5; delta = bonus[1]; break; // ++
		case 'fish': k = 2.5; delta = bonus[8]; break; // ++
		case 'land': k = 4; delta = bonus[5]; break; // ++
                case 'science': delta = bonus[3];break;  // ++
		case 'office': k = 0.2; delta = bonus[7]; break; // ++
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
		default: return;
	}

	emp_c = k*getEmploeeCount(kv, kvp);
	emp_count = Math.floor(emp_c);
	emp_c_next = k*getEmploeeCount(kv+1, kvp);
	emp_count_next = Math.floor(emp_c_next);
	

	if ($("td:contains('Number of workers')").length){
		work = parseInt( $("td:contains('Number of workers')").next().text().replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));
	}
	
	if ($("td:contains('Number of employees')").length){
		work = parseInt( $("td:contains('Number of employees')").next().text().replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));
	}
	
	limit2  = Math.round(emp_count*1.25);
    str = '<span id=unit_warning_2><br>(125% Limit = ' + numberFormat( limit2 ) + ')</span>';

	this.innerHTML = this.innerHTML + '<span id=unit_warning_1><br>(Top 1 Max: <b>' + numberFormat(emp_count) + '</b></span>)' + str;
	this.innerHTML = this.innerHTML + '<br><font color=gray>(With qualification ' + numberFormat(kv+1) + ' (the next level): <b>' + 	numberFormat(emp_count_next) + '</b>)</font>';

        if (work >= emp_count ){
            $("#unit_warning_1").css('color', 'purple').css('font-weight', 'bold');
            $("td:contains('Qualification of employees')").css('color', 'purple');
        }
        if (work >= limit2 ){
            $("#unit_warning_2").css('color', 'red').css('font-weight', 'bold');
            $("td:contains('Qualification of employees')").css('color', 'red');
        }

});

var k = 1;
// Qualification of scientists (labs)
var kvp = 0;
// Employees
$("td:contains('Qualification of scientists')").next().each(function() {
	str = this.innerHTML;
	kvp = parseFloat( str );

	delta = 0;
	switch ( type){
		case 'ferma': k = 1.5; delta = bonus[1]; break; // ++
		case 'fish': k = 2.5; delta = bonus[8]; break; // ++
		case 'land': k = 4; delta = bonus[5]; break; // ++
                case 'science': delta = bonus[3];break;  // ++
		case 'office': k = 0.2; delta = bonus[7]; break; // ++
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
		default: return;
	}

	emp_c = k*getEmploeeCount(kv, kvp);
	emp_count = Math.floor(emp_c);
	emp_c_next = k*getEmploeeCount(kv+1, kvp);
	emp_count_next = Math.floor(emp_c_next);
	

		
	work = parseInt( $("td:contains('Number of scientists')").next().text().replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));
    limit2  = Math.round(emp_count*1.25);
    str = '<span id=unit_warning_2><br>(125% Limit = ' + numberFormat( limit2 ) + ')</span>';

	this.innerHTML = this.innerHTML + '<span id=unit_warning_1><br>(Top 1 Max: <b>' + numberFormat(emp_count) + '</b></span>)' + str;
	this.innerHTML = this.innerHTML + '<br><font color=gray>(With qualification ' + numberFormat(kv+1) + ' (the next level): <b>' + 	numberFormat(emp_count_next) + '</b>)</font>';

        if (work >= emp_count ){
            $("#unit_warning_1").css('color', 'purple').css('font-weight', 'bold');
            $("td:contains('Qualification of scientists')").css('color', 'purple');
        }
        if (work >= limit2 ){
            $("#unit_warning_2").css('color', 'red').css('font-weight', 'bold');
            $("td:contains('Qualification of scientists')").css('color', 'red');
        }

});

var techn = 0;
var max_techn = 0;
$("td:contains('Technology level')").next().each(function() { 
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

	str = ' <br>(<font color=' + font +'>Maximum Technology: <b>' + numberFormat(max_techn) + '</b></font>)';
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