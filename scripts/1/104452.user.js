// ==UserScript==
// @name           Virtonomica:DinamicSalary
// @namespace      Virtonomica
// @description     Позволяет помечать города из списка
// @description     Клик по названию города помечает его зачеркиванием
// @description     Повторный клик снимает зачеркивание
// @version        1.1
// @include        http://*virtonomic*.*/*main/common/main_page/game_info/salary
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    //console.log('start');
    var table = $("table.list");
    var tr = $("tr", table);
    for(i=1; i<tr.length; i++) {
	td = $("td", tr.eq(i) ).eq(0);
	if (td.length== 0) continue;

	img = $('img', td);
	if (img.length != 1) continue;

	img.click( function() {
	   el = $(this).parent().parent();
           var decor = el.css("text-decoration");
	   //console.log(decor);
	   var new_decor = "none";
	   var new_color = "black";
	   if (decor != 'line-through'){
		new_decor = "line-through";
		new_color = "grey";
	   }	
	   el.css("text-decoration", new_decor);
	   el.css("color", new_color);
	});

    }	
    //console.log('end');

    table.before("<p>Клик мышкой по флажку слева от города делает строчку зачеркнутой.<br>Повторный клик снимает зачеркнутость.");

}


// Хак, что бы получить полноценный доступ к DOM >:]
if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 
