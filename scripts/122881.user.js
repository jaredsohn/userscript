// ==UserScript==
// @name           Tf2tp Item History Links
// @namespace      userscripts.mattie.net
// @include        http://tf2tp.com/*
// @require 	   https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js
// ==/UserScript==

(function(){

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var prefix = '<div style="display:inline-block;font-size:8pt;text-align:center;"><a target="_blank" href="http://www.tf2items.com/item/';
	var suffix = '">H</a></div>';
	try
	{
		$(".tradeItems .itemSized:visible, .offerItems .itemSized:visible").each( function () { $(prefix+$(this).attr('data-itemid')+suffix).insertAfter($(this)); });
	}
	catch(e)
	{
		console.log(e)
	}
}

// load jQuery and execute the main function
addJQuery(main);
})();
