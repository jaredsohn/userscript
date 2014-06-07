// ==UserScript==
// @name           eRepublik MM Offers Finder
// @description    Finds Offers with a given peg
// @version        0.1
// @namespace      http://www.erepublik.com/en/exchange*
// @include        http://www.erepublik.com/en/exchange*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$(document).ready(function() {
	$('<span id="find_offers_val" style="position: relative; top: 40px; font-weight: bold;">Total Value</span>')
		.appendTo("div.core").click(function(){
			desired = prompt("Peg value you want to calculate?");
			catchEmAll(1,desired);
		});
});
total_amount = 0;
catchEmAll = function(page,desired){
	var url = "http://www.erepublik.com/en/exchange/listOffers?select_page=select&buy_currency_history_id=buy_currencies%3D24&sell_currency_history_id=sell_currencies%3D62&account_type=citizen-&action_path=listOffers&page=page%3D";
	all_offer_ids = [];
	$.ajax({
		async: true,
		type: "GET",
		url: url + page,
		dataType: "html",
		success: function(html) {
			offers = $("input[type=hidden][value=GOLD]",html);

			stoploop = false;
			$(offers).each(function(index,element){

				offer_attr_id = $(element,html).attr('id');
				split_offer_attr = offer_attr_id.split("_");

				offer_id = split_offer_attr[4];
				offer_rate = $("#offer_exchange_rate_"+offer_id,html).val();
				offer_amount = $("#initial_amount_"+offer_id,html).html();

				all_offer_ids.push(offer_id);

				if (offer_rate == desired){
					total_amount = total_amount + parseInt(offer_amount);
				}
				else{
					stoploop = true;
				}
			});

			page++;
			console.log("Page "+page+": " + total_amount);
			if (stoploop || page > 25)
				displayOut(total_amount);
			else
				catchEmAll(page,desired);
		}
	});
}

displayOut = function(total_amount){
	console.log("Final: " + total_amount);
	alert("Total = " + total_amount);
	$("#find_offers_val").html(total_amount)
		.click(function(){return false;});

}