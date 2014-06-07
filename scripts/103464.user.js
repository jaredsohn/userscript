// ==UserScript==
// @name           Virtonomica:30People
// @namespace      Virtonomica
// @description    30 населений города
// @description    расчет и показ 30 населений города
// @version        1.0
// @include        *virtonomic*.*/*/main/unit/view/*/virtasement
// ==/UserScript==
var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

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



	var input = $('<button>').append('View 30').click( function() {
		var people = $("input[name='advertData[population]']").val();
		var fl_val = /([\D]+)*([\d\s]+\.*\d*)/.exec(people)[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
		fl_people = parseInt(fl_val);
		fl_people*=30;
		$("#out_p").text( numberFormat(fl_people) );

	});

	$("table.tabsub").after(input).after('<div id=out_p>');

}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);