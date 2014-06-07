// ==UserScript==
// @name        Neopets: Reduce Shop Prices
// @namespace   userscripts.org
// @description Reduce prices in shop by specific percentage
// @include     http://www.neopets.com/market.phtml?*type=your*
// @include	http://www.neopets.com/market.phtml?type=your
// @include	http://www.neopets.com/market_your.phtml
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$total = 0;
$items = 0;
var debug = false;

$("input[name^='cost']").each(function(){
	$amount = $(this).parent().parent().find('td:eq(2)').text();
	$amount = Number($amount);
	$thisItem = 0;
	for(var i = 1;i <= $amount;i++){
		$thisItem = $thisItem + Number($(this).val());
	}
	$total = $thisItem + $total;
	$items++;
});

// alert($test);

$total = $total.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");

GM_log($total);
GM_log($items);

$("center:contains('Items Stocked')").append("<br>Total : <b>" + $total + " NP</b>");

// code to insert checkbox
// Round to nearest 100?<input type='checkbox' name='round' checked><br>

$("tbody:contains('Piccy'):last tr:contains('Remove All'):last").before("<tr><td colspan='8' bgcolor='#dddd77' align='center'><input type='text' value='10%' id='discount' size='3'><input type='button' value='Discount Prices' id='discountUpdate'></td></tr>");

// alert("Shop Total: "+$total+"NP");

$("#discountUpdate").click(function(){
	$discount = $('#discount').val();
	$discount = $discount.replace('%','');
	if($discount < 100){	
		$discount = $discount / 100;
		// check if checkbox is checked, if yes, round discount, if not, continue normally
		if(debug){GM_log($discount);}
		$("input[name^='cost']").each(function(){
			$currentPrice = $(this).val();
			if(debug){GM_log("Current: " + $currentPrice);}
			if($currentPrice != 0){
				$newPrice = Math.round($currentPrice - ($currentPrice * $discount));
				if(debug){GM_log("New (discounted by 10%): " + $newPrice);}
				$(this).val($newPrice);
			}
		});
		alert("Prices discounted! Remember to update the shop!");
	}else{
		alert("Please input a percent under 100");
	}
});