// ==UserScript==
// @name        Nyaa Extreme Redux
// @namespace Original by Vietconnect with additional code by ssimon98
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js  
// @include     http*://*.nyaa.*/*
// @version     2.1
// ==/UserScript==

// Append global style
var globalstyle = document.createElement('link');
globalstyle.rel = 'stylesheet';
globalstyle.type = 'text/css';
globalstyle.href = 'https://dl.dropboxusercontent.com/u/161626803/Nyaa.css';
document.getElementsByTagName('head')[0].appendChild(globalstyle);

    // default sort by seeds
    if ((window.location.href.indexOf("page=search") > -1 || window.location.href.indexOf("page") == -1) && window.location.href.indexOf("sort") == -1) {
        var thing = window.location.href.indexOf("?")>-1?'&':'?';
        window.location.replace(window.location + thing + "sort=2");
        redirecting = true;
    }
 
 // Remove title prefix
document.title = document.title.replace('NyaaTorrents >> ', '')

 // Main
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