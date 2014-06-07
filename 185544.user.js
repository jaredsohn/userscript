// ==UserScript==
// @name		MTGox Split Order and Distribute Randomly
// @namespace   none
// @author      vongesell@gmail.com
// @version     0.1
// @include     https://www.mtgox.com/trade
// @grant       none
// ==/UserScript==
 
// If you do not feel like setting this up as a user script you can
// copy and paste the code into a javascript console of your browser


// Defaults
var numorders    = 5; // number of orders
var pricepercent = 2; // price distribution percentage 


// Execute
function splitorder () {
	var ntrades    = parseFloat($("#split-buy-steps").val()) || numorders;
	var percent    = parseFloat($("#split-buy-pricepercent").val())/100 || pricepercent/100;
	
	var v          = tb.trade.getQuoteVars();
	if (v.rate <= 0) {
		alert("You must set the base rate/price for order.");
		return;
	}

	var rate_min   = parseFloat(v.rate) - parseFloat(v.rate) * percent / 2;
	var rate_max   = parseFloat(v.rate) + parseFloat(v.rate) * percent / 2;
	var total_left = v.total;
	
	var rates      = [];
	var volumes    = [];

	console.log("v.rate:",v.rate,"v.btc:",v.btc,"v.total:",v.total);
	for (var i = ntrades - 1; i >= 0; i--) {
		var rate   = Math.random() * (rate_max - rate_min) + rate_min;
		var volume = Math.random() * (total_left / rate);
		if (i == 0)
			/* last iteration -- use all remaining funds of order */
			volume = total_left / rate;

		var total_left = total_left - (volume * rate);
		total_left = total_left.toFixed(7); // grr

		volumes[i] = volume;
		rates[i]   = rate;

		console.log("rate: "+rates[i]+ " vol:" + volumes[i] + " cost:"+(volume * rate)+" leftover:" + total_left)
	}

	msg = "Will randomly distribute "+ntrades+" orders between "+rate_min+"-"+rate_max+":\n\n";
	msg += "[rate],  [amount],  [total cost]\n";
	for (var i = ntrades - 1; i >= 0; i--) {
		msg += ""+rates[i].toFixed(7)+",\t"+volumes[i].toFixed(7)+",\t"+(rates[i] * volumes[i]).toFixed(4)+"\n";
	}
	msg += "\nCancel and run again to change distribution.\n"

	if (confirm(msg)) {
		var _price  = $('.trade-price').val();
		var _amount = $('#trade-amount').val();
		for (var i = ntrades - 1; i >= 0; i--) {
			$('.trade-price').val(rates[i].toFixed(7));
			if ('BTC' === v.activeCurrency)
				$('#trade-amount').val(volumes[i]);
			else
				$('#trade-amount').val(volumes[i]*rates[i]);
			tb.trade.addOrder();
		}
		$('.trade-price').val(_price);
		$('#trade-amount').val(_amount);
	}
}


//
// UI
//

var markup = '\
	<div id="split-buy" style="width:100px; float:right;">\
	 <span class="buttonFlat orange right" name="" id="split-buy-btn" style="margin-top:10px; padding-top:6px">\
	  Split&nbsp;\
	  <a href="#" title="" target="_new" data-content="Splits buy or sell into <b>N</b> number of orders randomly distributed accross a BTC/FIAT price range determined by <b>%</b> and the price of your original order. Execution will present the orders to be placed and ask for confirmation. vongesell@gmail.com" data-original-title="Split Order" class="icon-question-sign iconHelp" style="font-size:13px"></a>\
	 </span>\
	 <input id="split-buy-steps" type=text maxlength=3 size=3 style="width:50px; margin-left:20px" value='+numorders+'> N<br>\
	 <input id="split-buy-pricepercent" type=text maxlength=3 size=3 style="width:50px; margin-left:20px" value="'+pricepercent+'"> %<br>\
	</div>';
$("#trade-market-quote").append(markup); // both work
$('.iconHelp').popover({animate: false, html: true, placement:'left'});
if (tb.trade.getOperation() === "market")
	$("#split-buy").hide();    	

$("select[name=operation]").live("change", function (e) {
    var isMarket = (tb.trade.getOperation() === "market");
    if (tb.trade.getOperation() === "market")
		$("#split-buy").hide();    	
    else
    	$("#split-buy").show();
});

$("#split-buy-btn").live("click", splitorder);
