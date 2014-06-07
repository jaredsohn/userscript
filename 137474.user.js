// ==UserScript==
// @name          Price Variation
// @description    Price History 
// @namespace      userscripts
// @include        http://www.amazon.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var width=500;
var height = 300;

$(document).ready(function () {
	var element = $(':input[name="ASIN"]');
        var arr = document.domain.split(".");
        var country = arr[arr.length - 1];
	if (element) {
		var asin = $.trim(element.attr("value"));
		var link = "<a  target='blank' href='http://"+country+".camelcamelcamel.com/product/" + asin + "'><img src='http://charts.camelcamelcamel.com/"+country+"/" + asin + "/amazon.png?force=1&zero=0&w="+width+"&h="+height+"&desired=false&legend=1&ilt=1&tp=all&fo=0' /></a>";
		$("#olpDivId").append("<div id='camelcamelcamel' style='margin-top: 20px; margin-left: -20px'>" + link + "</div>");
	}
});