// ==UserScript==
// @name           TradeMe Quick Sort
// @namespace      http://userscripts.org/users/124800
// @description    Instantly applies sort/filter options when selected. No more clicking "Go".
// @include        http://www.trademe.co.nz/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$("select").bind("change", function() {
	if ($(this).attr("name") == "sort_order" || $(this).attr("name") == "filter") {
		this.form.submit();
	}
});

$("select").each(function() {
	$("input:submit",this.form).each(function() {
		if ($(this).val() == " Go " || $(this).val() == "Go") {
			$(this).css("display","none");
		}
	});
});