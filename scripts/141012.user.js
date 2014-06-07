// ==UserScript==
// @name          Remove All-Caps Craigslist Postings
// @description   Removes any posting on a Craigslist page that are all-caps
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http://*.craigslist.org/*
// ==/UserScript==

// Append some text to the element with id someText using the jQuery library.
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  	jQuery(function($) {
		$.each($("p.row"), function(i,item) {
			var posting = $(item).children("a");
	    		var title = $(item).children("a").text();
	     		title = title.replace(/[^a-zA-Z]/g, "").replace(/\s/g, "");
	     		if (title.search(/[a-z]/g) < 0) {
	        		console.log("Hid post with title: " + posting.text());
				$(item).remove();
			}
		});
	})(jQuery);
}

// load jQuery and execute the main function
addJQuery(main);