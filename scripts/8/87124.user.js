// ==UserScript==
// @name           Virtonomica:Lab Filter
// @namespace      virtonomica
// @version        0.52
// @description    Выделение тех лаборатоий, в которых надо нажать кнопки, что бы продолжить исследования
// @include        http://*virtonomic*.ru/*/main/company/view/*/unit_list
// @include        http://igra.aup.ru/*/main/company/view/*/unit_list
// @include        http://virtonomic*.*/*/main/company/view/*
// ==/UserScript==
var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;
  var n = 0;

function find_lab( mode ) {

	n = 0;
	find = input.val();
	$('td.u-e').each(function() {
		var show = 0;
		str = $(this).text();
		if ( str.length > 0) {
			pos_begin = str.indexOf('%');
			if ( pos_begin != -1){
				str1 = str.substr(0, pos_begin);
				pr = parseFloat(str1);
				str2 = str.substr(pos_begin+1);
				pos2 = str2.indexOf('.');
				st = parseInt( str2.substr(pos2+1) );
				lev = parseInt( str2.substr(0,pos2) );
			}
		}
		if (find == "4" ) $("div.st").show();
		else $("div.st").hide();
	
		switch( find ) {
			case "0": {
				$(this.parentNode).show();
				$("div.st").show();
				show = 1;
				$("div.st").show();
			break;}
		
			case "1": 
			case "4":{
				// начальная стадия исследований
				if ( ( pr == 0)  && ( pos2 == -1) ){ 
					show = 1;
					break;
				}
				// заверешена 1 стадия
				if  ( (st == 1) && (pr == 100) ){
					show = 1;
					//$(this.parentNode).show();
					break;
				}
				// завершена 2 стадия
				if  ( (st == 3) && (pr == 0) ){
					show = 1;
					break;
				}
				break;}

			case "2": {
				if ( ( pr > 90) && ( pr < 100) ) { 
					show = 1;
				} 
				break;}

			case "3": {
				if ( ( pr > 80) && ( pr < 90) ) { 
					show = 1;
				} 
				break;}
			case "10": {
				if ( ( pr > 0) && ( pr < 20) ) { 
					show = 1;
				} 
				break;}

			case "5": {
				if ( lev< 9) { 
					show = 1;
				} 
				break;}
			case "17": {
				if ( lev > 16) { 
					show = 1;
				} 
				break;}
		}
		if ( show == 0){
			$(this.parentNode).hide();
		} else {
			$(this.parentNode).show();
			$("div.st").show();
		}

  	});
}
	//var container = $('#mainContent tr:first > td:first');
	var container = $("td.u-l").parent().parent();

var panel = $("#extension_panel");
if ( panel.length  == 0 ) {
	// добавить панель, если её еще нет
	var ext_panel = "<div style='padding: 2px; border: 1px solid #0184D0; border-radius: 4px 4px 4px 4px; float:left; white-space:nowrap; color:#0184D0;'  id=extension_panel></div>";
	container.append( "<tr><td>" +ext_panel );
}

var input = $('<select>').append('<option value=0>&nbsp;</option>').append('<option value=5>техны ниже 9</option>').append('<option value=17>техны выше  16</option>').append('<option value=3>больше 80%</option>').append('<option value=2>больше 90%</option>').append('<option value=10>меньше 20%</option>').append('<option value=1>найти</option>').change( function() { find_lab(); }).append('<option value=4>найти (+заметки)</option>').change( function() { find_lab('' ); });

// Изучаемые технологии
labs = $("td.u-e");
var list = new Object();
var tag = 1;
for (i=0; i<labs.length; i++){
     str = labs.eq(i).html();
     n = str.lastIndexOf("</b>");
     if (n == -1) continue;
     name = str.substr(n+4, str.length);
     n = name.indexOf("</div>");
     name = name.substr(0, n);
     name.replace("\n", "").replace("\r", "");
 
     if ( list[name] != null) {
	list[name]++;
	continue;
     }
     list[name] = 1;
     //tag++;
}

// сортировка объекта как строки
function sortObj(arr){
    // Setup Arrays
    var sortedKeys = new Array();
    var sortedObj = {};
	 
    // Separate keys and sort them
    for (var i in arr){
        sortedKeys.push(i);
    }
    sortedKeys.sort();
	 
    // Reconstruct sorted obj based on keys
    for (var i in sortedKeys){
       sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
    }
    return sortedObj;
}
list = sortObj(list);

var Filter = $(" <select>").append('<option value=0>&nbsp;</option>').change( function(){
    search = $(this).val();

    $('td.u-e').each(function() {
	var show = 0;

     str = $(this).html();
     n = str.lastIndexOf("</b>");
     if (n == -1) return;
     name = str.substr(n+4, str.length);
     n = name.indexOf("</div>");
     name = name.substr(0, n);
     name.replace("\n", "").replace("\r", "");

     if (name == search ) show =1;


	if ( show == 0){
		$(this.parentNode).hide();
                // спрятать заметки
                $("div.st").hide();
	} else {
		$(this.parentNode).show();
		$("div.st").show();
	}
    });
});

for(name in list){
    str = '<option value="'+ name +'">'+ name;
    if ( list[name] > 1) str+= ' (' + list[name] + ')';
    str+= '</option>';
    Filter.append(str);
}

var labs = 1;
$("td.u-c[title!=Лаборатория]").each(function() {
	labs = 0;
});

if ( labs == 1) {
   $("#extension_panel").append('<br>Исследования: ').append(input).append(Filter);
}
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}