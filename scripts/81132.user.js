// ==UserScript==
// @name           Virtonomica: делитель в снабжении
// @description 
// @include        http://virtonomic*.*/*/window/unit/supply/multiple/*
// @include        http://igra.aup.ru/*/window/unit/supply/multiple/*
// ==/UserScript==

var run = function() {
    var countEl = $('span:contains("Кол-во")');
    var per = readCookie('per');
    var div = 1;

    if (per == null) {
        per = 30;
    }

    var read = function(el) {
        return parseInt($(el).text().replace(/[^\d]/g, ''));
    }

    var count = read(countEl);
    
    var calc = function() {
        div = Math.floor(count/per);
        $('#js-div').val(sayNumber(div));
    }

    var perEl = $('<span style="padding-left: 10px;"><b>Div:</b> <input id="js-div"  size="7" /> / <input id="js-per" size="1" value="' + per + '" /></span>');

    countEl.after(perEl);

    $('#js-div').change(function() {
        div = parseInt($(this).val().replace(/[^\d]/g, ''));
        per = count/div;
        $('#js-per').val(per);
        createCookie('per', per, 365);
        calc();
    });

    $('#js-per').change(function() {
        per = parseInt($(this).val());
        createCookie('per', per, 365);
        calc();
    });

    calc();

    window.checkUncheckUnit = function(o)
	{
		$('#'+ o.id +'_qty').attr({disabled : !o.checked, value : o.checked ? div : 0 }).focus();
		showresult(o.form);
	}
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.getElementsByTagName("head")[0].appendChild(script);
