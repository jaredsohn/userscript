// ==UserScript==
// @name           Bitcoin-OTC Filter
// @namespace      n/a
// @include      http://bitcoin-otc.com/vieworderbook.php*
// @include      http://www.bitcoin-otc.com/vieworderbook.php*
// ==/UserScript==

// http://joanpiedra.com/jquery/greasemonkey/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; jQuery_loaded(); }
}
GM_wait();

function jQuery_loaded() {
	$("table.orderbookdisplay tr").first().children().css("vertical-align", "top");
	$("table.orderbookdisplay tr").first().children().next().next().next().first()
		.append("<br><br><select id='filter_type'><option></option><option value='BUY'>BUY</option><option value='SELL'>SELL</option></select>");

	var pricemax = 0;
	$("table.orderbookdisplay tr").next().children().next().next().next().next().next().next().next().next().next().prev().prev().each(function() {
		if (parseFloat($(this).text()) > pricemax) pricemax = parseFloat($(this).text());
	});
	$("table.orderbookdisplay tr").first().children().next().next().next().next().next().next().next().first()
		.append("<br><span style='white-space:nowrap;'>min:<select id='filter_pricemin'><option></option></select></span>")
		.append("<br><span style='white-space:nowrap;'>max:<select id='filter_pricemax'><option></option></select></span>");
	for (x=0;x<=pricemax;) {
		$("select#filter_pricemin").append("<option value='"+x.toFixed(2)+"'>"+x.toFixed(2)+"</option>");
		$("select#filter_pricemax").append("<option value='"+x.toFixed(2)+"'>"+x.toFixed(2)+"</option>");
		if (x.toFixed(2) < 1) x=x+0.01;
		else if (x.toFixed(2) < 10) x=x+0.1;
		else if (x.toFixed(2) < 100) x++;
		else if (x.toFixed(2) < 1000) x=x+10;
		else if (x.toFixed(2) < 10000) x=x+100;
		else if (x.toFixed(2) < 100000) x=x+1000;
		else x=x+10000;
	}

	$("table.orderbookdisplay tr").first().children().next().next().next().next().next().next().next().next().first()
		.append("<br><br><select id='filter_currency'><option></option><option value='EUR'>EUR</option><option value='LREUR'>LREUR</option><option value='LRUSD'>LRUSD</option><option value='MBEUR'>MBEUR</option><option value='MBUSD'>MBUSD</option><option value='MONEYPAK'>MONEYPAK</option><option value='MTGUSD'>MTGUSD</option><option value='PPEUR'>PPEUR</option><option value='PPUSD'>PPUSD</option><option value='PXGAU'>PXGAU</option><option value='USD'>USD</option></select>");

	$("select#filter_type").click(function() { filter(); }).keyup(function() { $("select#filter_type").click(); });
	$("select#filter_pricemin").click(function() { filter("pricemin"); }).keyup(function() { $("select#filter_pricemin").click(); });
	$("select#filter_pricemax").click(function() { filter("pricemax"); }).keyup(function() { $("select#filter_pricemax").click(); });
	$("select#filter_currency").click(function() { filter(); }).keyup(function() { $("select#filter_currency").click(); });

	filter_css();
}

function filter(w) {
	var filterval = "";
	$("table.orderbookdisplay tr").next().each(function(index) {
		$(this).show();
		if ($("select#filter_type").val() != "") {
			filterval = $(this).children().next().next().next().first().text();
			if (filterval.toUpperCase() != $("select#filter_type").val().toUpperCase()) $(this).hide();
		}
		if ($("select#filter_pricemin").val() != "" || $("select#filter_pricemax").val() != "") {
			filterval = $(this).children().next().next().next().next().next().next().next().first().text();
			var filter_pricemin = ($("select#filter_pricemin").val() == "") ? 0 : parseFloat($("select#filter_pricemin").val());
			var filter_pricemax = ($("select#filter_pricemax").val() == "") ? Infinity : parseFloat($("select#filter_pricemax").val());
			if (w == "pricemin" && filter_pricemax < filter_pricemin) $("select#filter_pricemax").val(filter_pricemin);
			else if (w == "pricemax" && filter_pricemin > filter_pricemax) $("select#filter_pricemin").val(filter_pricemax);
			if (parseFloat(filterval) < filter_pricemin || parseFloat(filterval) > filter_pricemax) $(this).hide();
		}
		if ($("select#filter_currency").val() != "") {
			filterval = $(this).children().next().next().next().next().next().next().next().next().first().text();
			if (filterval == "PGAU") filterval = "PXGAU";
			if (filterval.toUpperCase() != $("select#filter_currency").val().toUpperCase()) $(this).hide();
		}
	});
}

function filter_css() {
	$("body").css("background-color", "#FFFFFF").css("color", "#000000");
	$("table.orderbookdisplay").css("margin-left", "0px").css("margin-right", "0px").css("width", "100%");
	$("td").css("padding", "0px").css("padding-left", "2px").css("padding-right", "2px");
}