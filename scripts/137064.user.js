// ==UserScript==
// @name        Sukebei Nyaa Extreme
// @namespace   Vietconnect
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js  
// @include     http://sukebei.nyaa.se/*
// @version     1.3
// ==/UserScript==

var makeOutLinkNewTab = function() {
	$("a[href*='http://']:not([href*='"+location.hostname+"'])").attr("target","_blank");
}
makeOutLinkNewTab();

if($(".tlist tr.tlistrow").length > 0) {
	$(".tlist tr.tlistrow").after("<tr class='preview-row'><td colspan=8>loading...</td></tr>");
	$(".tlist tr.tlistrow").each(function() {
		if($(this).find(".tlistsn").text() < 2 || ($(this).find(".tlistsn").text() < 5 && $(this).find(".tlistln").text() < 10)) {
			$(this).find(".tlistname a").css("color", "#A3A2A2");
			var row = $(this).next(".preview-row").remove();
		} else {		
			var	url = $(this).find(".tlistname a").attr("href");
			var row = $(this).next(".preview-row").find("td");
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function(response) {
					row.html($(response.responseText).find(".viewdescription"));
					makeOutLinkNewTab();
				}
			});
		}
	});
}
