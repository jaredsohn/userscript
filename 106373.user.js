// ==UserScript==
// @name           HWM_sell_res
// @namespace      http://userscripts.org/users/zeptor
// @description    HWM mod - sell resources for production
// @include        http://www.heroeswm.ru/object-info.php*
// ==/UserScript==

// to sell something specific only - comment all other lines but latest
// to sell base resources - uncomment requred line
// third parameter is minimum price to sell

var items2sell = [
 [" Kozha", '8', 184],
 [" Mifrilovaya Ruda ", '77', 467],
 [" Volshebniy poroshok ", '11', 2078],
 [" Mifril ", '55', 3334],
 [" Nickel ", '10', 1703],
 [" Stal ", '9', 763],
// [" Derevo ", '1', 185],
// [" Ruda ", '2', 185],
// [" Rtut ", '3', 365],
// [" Sera ", '4', 365],
// [" Kristally ", '5', 365],
// [" Samotsvety ", '6', 365],
 [" Stub, don't comment!", '0', 0]
];

process();


function process() {
	var input_all = document.getElementsByTagName( 'input' ) ;
	for (var i=0; i < input_all.length; i++){
		var el = input_all[i];
		if (el.name == 'res_id') {
			var price = el.parentNode.parentNode.parentNode.childNodes[2].innerHTML;
			for (var k=0; k < items2sell.length; k++) {
				if (el.value == items2sell[k][1] && (new Number(price).valueOf() >= items2sell[k][2]) ) {
					var formEl = el.parentNode;
					var formChildren = formEl.elements;
					for (var j=0; j< formChildren.length; j++) {
						el = formChildren[j];
						if (el.name == 'count') {
							el.value = '20';
							formEl.submit();
							return;
						}
					}
				}
			}
		}
	}
}