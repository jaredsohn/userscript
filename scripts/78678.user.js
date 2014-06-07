// ==UserScript==
// @name           eMagnat
// @namespace      emagnat
// @description    Buys a lot of money :P
// @include        http://www.erepublik.com/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @author		   mobster1930
// ==/UserScript==

var xChangeImage = '<br><br><a id="buy_all" href="http://www.emagnat.com/buyall" style="display: inline; position:relative; left: 328px; top: -20px;"><img src="http://www.erepublik.com/images/modules/treasuremap/small_star.png"/>&nbsp;&nbsp;Buy all (first offer)&nbsp;&nbsp;</a>';

window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		Main();
	}
},100);}, false);

function Main()
{
	// Check are we on the monetary market page
	if(document.documentElement.innerHTML.search('<title>Monetary Market') != -1)
	{
		AddMMBuyAll();
		CatchClicks();		
	}
}

function CatchClicks() {	
	document.addEventListener('click', function(event) {
		if(event.target.href == "http://www.emagnat.com/buyall")
		{
			event.stopPropagation();
    		event.preventDefault();
			// <span class="special" id="initial_amount_3787008">6</span> <span class="currency">GOLD</span>
			var amounts = $("*[id*=initial_amount]");
			var buy_how_much = $(".ammount:first");
			buy_how_much.val(amounts[0].innerHTML);
			
			// <input type="button" onclick="acceptOffer_onClick(this);" class="marketbtn" value="Buy" id="submit_form_accept_3787008">
			var buttons = $("*[id*=submit_form_accept]:first").trigger('click');
		}
	}, true);
}

function AddMMBuyAll() {	
	$("#filters").append(xChangeImage);
	if (typeof unsafeWindow.$j == 'undefined')
		window.setTimeout(AddMMBuyAll, 100);
	else {
		unsafeWindow.$j("body").ajaxSuccess(function(ev, request, settings) {
			window.setTimeout(function() {
				var sell_currency = $('#sell_currency').val();
				var buy_currency = $('#buy_currency').val();
				if ($("#sell_currencies_selector a[id='" + buy_currency + "']").size() != 0)
				{
					if (settings.url.match(/selectAccount/) && !settings.url.match(/listMyOffers/))
					{
						$("#filters").append(xChangeImage);
					}
				}
			}, 100);
		});	
	}
}
