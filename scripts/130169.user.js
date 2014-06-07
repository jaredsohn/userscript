// ==UserScript==
// @name mk-highlight-high-cost
// @namespace http://mk.pisem.net/greasemonkey/
// @description This script highlights "cost" which is greater then "sell price".
// @include http://virtonomica.ru/*/main/unit/view/*/trading_hall
// ==/UserScript==

/*
    [http://wiki.greasespot.net/DOMContentLoaded]

    The code in a Greasemonkey user script gets invoked when the
    DOMContentLoaded event fires which happens when the DOM (HTML content of
    the page) is loaded.

    Simple speaking Greasemonkey user script is executed _after_ any other
    (embedded or external) script referenced by the page.
*/

//GM_log("'mk-...' started");

function fixNumber(s)
{
    return s.replace(/[^.0-9]/g, '');
}

var price_name_regexp = /^productData\[price\]\[\{[0-9,]+\}\]$/;

var inputs = document.getElementsByTagName('input');
//GM_log("inputs.length=" + inputs.length);
for (var input_index = 0; input_index < inputs.length; ++input_index) {
    var input = inputs[input_index];
    var input_name = input.name;
    if (price_name_regexp.test(input_name)) {
	//GM_log("matched");
	//GM_log("input_index=" + input_index + " input_name='" + input_name + "' input_name.match(price_name_regexp)='" + input_name.match(price_name_regexp) + "'");

	var price = parseFloat(fixNumber(input.value));

	var price_td = input.parentNode;
	var cost_td = price_td.previousElementSibling;
	var cost = parseFloat(fixNumber(cost_td.textContent));
	//GM_log("cost=" + cost + " price='" + price + "'");

	if (price <= cost) {
	    var span = document.createElement('span');
	    span.textContent = cost_td.textContent;
	    cost_td.replaceChild(span, cost_td.childNodes[0]);

	    //span.style.color = "#FF00FF"; // Fuchsia
	    span.style.color = "red";
	    //span.style.color = "green";
	}
    }
}

//GM_log("'mk-...' finished");
