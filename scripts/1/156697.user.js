// ==UserScript==
// @name       Auction Direct show all pics
// @namespace  harry
// @version    0.2.1
// @include    http://www.auctiondirectusa.com/vehicle-details/*

// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
	
	script.addEventListener('load', function() {
		var s1 = document.createElement("script");
		s1.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(s1);
	}, false);
			
	document.body.appendChild(script);
}

function main() {
	var links = $('div.thumbnail > a');
	var imgs = [];
	links.each(function() {
		imgs.push('<img src="' + $(this).attr('href') + '" border="0" style="margin:10px;"/>');
	});
	var bod = $("body");
	var zdiv = $('<div style="text-align:center;"></div>');
	for (var i=0; i < imgs.length; i++) {
		zdiv.append(imgs[i]);
		//zdiv.append("&nbsp; &nbsp;");
	}
	bod.append(zdiv);
};

// load jQuery and execute the main function
addJQuery(main);