// ==UserScript==
// @name        Neopets: Shop Profit
// @namespace   userscripts.org
// @description Total Up Shop History
// @include     http://www.neopets.com/market.phtml?type=sales
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$total = 0;
$item = "0";
$total = Number($total);

$("tbody:contains('Buyer'):last tr").each(function(){
	if($(this).find('td:eq(3)').text() == "Price"){
	}
	else{
		$item = $(this).find('td:eq(3)').text();
		$item = $item.replace(' NP','');
		$item = $item.replace(',','');
		$item = Number($item);
		$total += $item;
	}
});

$total = $total.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");

$("tbody:contains('Buyer'):last tr:last td").prepend("<b>Profit Total: </b>" + $total + " NP");

// alert($total);