// ==UserScript==
// @name         jQuery For Chrome (A Cross Browser Example)
// @namespace    jQueryForChromeExample
// @include      *
// @author       Erik Vergobbi Vold & Tyler G. Hicks-Wright
// @description  This userscript is meant to be an example on how to use jQuery in a userscript on Google Chrome.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function main() {
    var url = document.location.href;
	var isDetailPage = function(str) 
	{ 
		var reg = /^http:\/\/a.m.tmall.com\/i\d+\.htm$/; 
		return reg.test(str);
	}
	var isPayConfirmPage = function(str) 
	{ 
		var reg = /^http:\/\/buy.m.tmall.com\/buy\/confirm_order.htm/; 
		return reg.test(str);
	}
	if(isDetailPage(url))
	{
		alert(1);
		var $color = $("label[class='info ui-more']");
		alert(2);
		if($color.length>0)
		{
			alert(3);
			$color.click();
			alert(4);
			$("div[class='items'] > label:first").click();
			alert(5);
			$("form").submit();
		}
		//$("button[class='btn buy']").click();
	}
}

// load jQuery and execute the main function
addJQuery(main);