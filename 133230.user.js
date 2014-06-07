// ==UserScript==

// @author       	Bassta ( burnandbass[at]gmail[dot]com )
// @name         	Block zamunda.net adds/banners
// @version 		1.2.7
// @namespace    	com.bassta
// @include      	*zamunda.net*
// @description  	Removes adds from zamunda.net, the torrent tracker website looks nice and clean!

// ==/UserScript==

/*
	
	
*/

function addJQuery(callback) {
  	var script = document.createElement("script");
  	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  	script.addEventListener('load', function() {
    	var script = document.createElement("script");
    	script.textContent = "(" + callback.toString() + ")();";
    	document.body.appendChild(script);
  	}, false);
  	document.body.appendChild(script);
}

function app() {
	$('iframe[src*="ads.zamunda.net"]').remove();
	$('object:has(embed)').remove();
	$("a[href*='javascript:decision']").each(function(){
		var tempHref = $(this).attr("href");
		tempHref = tempHref.replace( /javascript:decision('Потвърждавам, че имам навършени 18 години','/g, "" );
		tempHref = tempHref.substring(0, tempHref.length-1);
		$(this).attr("href", tempHref);
	});
}


addJQuery(app);