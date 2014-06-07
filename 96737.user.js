// ==UserScript==
// @name           WebWallBoard
// @namespace      namespace
// @description    Change look of wallboard
// @include        http://navqtc/WebWallboard*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('table').removeAttr("border")
.removeAttr("cellpadding");


$('tr').find('td:eq(5)').css({"color":"red",
	"padding": "0 5px",
	"font-size": "larger"
});

$('tr:first-child').remove();


function changeBG() {
	var queue1 = $('tr:eq(1)').find('td:eq(5)').html() * 1;
	var queue2 = $('tr:eq(2)').find('td:eq(5)').html() * 1;
	var queue3 = $('tr:eq(3)').find('td:eq(5)').html() * 1;
	var queue4 = $('tr:eq(4)').find('td:eq(5)').html() * 1;
	var queue5 = $('tr:eq(5)').find('td:eq(5)').html() * 1;
	var queue6 = $('tr:eq(6)').find('td:eq(5)').html() * 1;

	var productTotals = queue1 + queue2 + queue3 + queue4 + queue5 + queue6;

	var color;
	var fontColor;

if (productTotals == 1 || productTotals == 2) {
		color = 'green';
		fontColor = 'white';
	} else if (productTotals == 3 || productTotals == 4) {
		color = 'FFFF12';
	} else if (productTotals > 4) {
		color = 'FF3003';
		fontColor = 'black';
	} else {
		color = '';
		fontColor = 'black';
	}
	$('body').css({"background-color":color,"color":fontColor});
}

window.onLoad = changeBG();