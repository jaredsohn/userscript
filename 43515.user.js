// ==UserScript==
// @name           Geizhals Bilder+Filter
// @namespace      http://userscripts.org/users/82228
// @description    Zeigt Produktbilder in den Listen an und fügt einen optionalen "Müllfilter" hinzu.
// @version        0.10
// @include        http://geizhals.at/*
// @include        http://geizhals.eu/*
// @resource       jQuery http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var inject = <><![CDATA[

var toggleFilter = function() {
	var doHide = ( $("#junkToggle").val() != "true" );
	var rows = $("#content_table tbody tr").filter(".t1, .t2");
	
	if (doHide) {
		rows.filter(function() {
			var cols = $(this).find("td").slice(-5, -2);
			return (isNaN(parseInt(cols.eq(0).text())) || parseInt(cols.eq(1).text()) < 2 || cols.eq(2).find("img").length == 0);
		}).hide();
	} else {
		rows.show();
	}
	
	rows.not(":hidden").each(function(i) {
		this.setAttribute("class", (i % 2 == 0) ? "t1" : "t2");
	});
	
	$("#junkToggle")
		.text(doHide ? "Müll einblenden" : "Müll ausblenden")
		.val(doHide ? "true" : "false");
};

(function() {
	var link = $("<a />")
		.attr("id", "junkToggle")
		.attr("href", "javascript:void(0)")
		.click(toggleFilter)
		.css("float", "left")
		.css("margin", "2px")
		.text("Müll ausblenden")
		.val("false")
	
	$("#content_table").before(link);
	$("#xf_div").after(link);
	$("div.blaettern nobr").before(link);
	
	if (getcookie && getcookie("vspix") === "") {
		$("#pixonoff input[value=on]").attr("checked", "checked");
		if (btn_pix_on) btn_pix_on();
	}
})();

]]></>;


if (document.getElementById("content_table")) {
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.innerHTML = GM_getResourceText('jQuery') + inject.toString();
	document.getElementsByTagName("head")[0].appendChild(script);
}