// ==UserScript==
// @name        iks:kvala_personal_obuchenie
// @namespace   virtonomica
// @description Отображение квалификации при обучении.
// @include     http://*virtonomic*.*/*/window/unit/*/education/*
// @version     1.0
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
    
    $("th:contains('Уровень обучения')").next().each(function() {
        var str = this.innerHTML;
        var kvOb = str.match(/\d[.\s\d]*/g);
        this.innerHTML = str + '<br><font color="gray">Квалификация для 1 дня обучения: <b>'+kvOb[0]+' - ('+kvOb[3]+' - '+kvOb[0]+') = ' + ( Math.round( (kvOb[0]-(kvOb[3]-kvOb[0]))*100 )/100 ) + '</font></b>';
	});

}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}