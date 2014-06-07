// ==UserScript==
// @name           card on dev2.ostrovok.ru
// @namespace      dev2.ostrovok.ru
// @include        http*://*dev2.ostrovok.ru*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(function() {
	if (!$(".card-number-item:eq(0)").val()) {
		$(".card-number-item:eq(0)").val("4111");
	}
	if (!$(".card-number-item:eq(1)").val()) {
		$(".card-number-item:eq(1)").val("1111");
	}
	if (!$(".card-number-item:eq(2)").val()) {
		$(".card-number-item:eq(2)").val("1111");
	}
	if (!$(".card-number-item:eq(3)").val()) {
		$(".card-number-item:eq(3)").val("1112");
	}
	if (!$("#id_e_month").val()) {
		$("#id_e_month").val("12");
	}
	if (!$("#id_e_year").val()) {
		$("#id_e_year").val("50");
	}
	if (!$("#id_card_holder").val()) {
		$("#id_card_holder").val("TEST TESTOV");
	}
	if (!$("#id_secure_code").val()) {
		$("#id_secure_code").val("123");
	}
});