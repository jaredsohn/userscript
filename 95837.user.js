// ==UserScript==
// @name           eRepublik Market Helper
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @namespace      http://userscripts.org/users/152186
// @description    eRepublik Market Helper
// @include			http://economy.erepublik.com/*/market/*
// ==/UserScript==

$(document).ready(function() {
	var tooltip = '<div id="itemToolTip%offerId%" class="simple_yellow" style="display:none;"><img src="http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png" class="tip" alt="" />%errorText%</div>';
	if( $("tbody td.m_buy:lt(1)").size()==0 ) { return; } // if cannot buy, then there is nothing to do
	var items = 5;
	var money = $("#large_sidebar .currency_amount a strong").text().toFloat();
	
	$("tbody td.m_stock:lt("+items+")").each(function() {
		var amount = $(this).html().toInt();
		var price = $("tbody td.m_stock:lt(1)").siblings(".m_price").text().toFloat();
		var offerId = $(this).siblings(".m_buy").children("a").attr("id");
		var maxAmount = Math.floor(money/price);

		$(this).empty().append('<a class="f_light_blue_new" title="" href="javascript:;"><span>'+amount+'</span></a>');

		var errorText = "Enough money for only "+maxAmount+" items";
		if( maxAmount<amount ) {
			$(this).append(tooltip.replace("%offerId%",offerId).replace("%errorText%",errorText));
			unsafeWindow.sidebar_tooltip($(this), "#itemToolTip"+offerId);
		} else { maxAmount=amount; }

		$(this).click(function() { $(this).siblings(".m_quantity").children("input").val(maxAmount); });
		$(this).dblclick(function() { executeOrder(maxAmount, offerId); });
	});
});

// UTILS
executeOrder = function(amount, offerId) {
	if (amount > 0 && offerId > 0) {
		$("#buyMarketOffer_offerId").val(offerId);
		$("#buyMarketOffer_amount").val(amount);
		$("#buyOffer").submit();
	}
}
console = function(str) { unsafeWindow.console.log(str); };
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
String.prototype.toInt = function() { return parseInt(this.trim()); }
String.prototype.toFloat = function() { return parseFloat(this.trim()); }
