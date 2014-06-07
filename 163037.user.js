// ==UserScript==
// @name        Adchieve - MacroFilterTest
// @namespace   https://secure.adchieve.com/
// @include     https://secure.adchieve.com/account/45/macro/
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @version     1
// ==/UserScript==

$(document).ready(function() {
	$(".user_menu").html("<input type='text' name='listfilter' class='listfilter' id='listfilter' onkeydown=\"filterList()\">");

	

	$('#listfilter').keydown(function() {
		$(".datatable tr").hide();
		$(".datatable tr:contains("+ $('#listfilter').val() +")").show();
		//$(".datatable tr td:eq(1):contains("+ $('#listfilter').val() +")").parent().show();
		//$("tr td:eq(1):contains('-')").parent().addClass("highlight");
		
		setInterval(getData,600000000000000000);
	});
	

});