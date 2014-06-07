// ==UserScript==
// @name           CleanMovies
// @namespace      AJ
// @description    Remove movies older than a specific year
// @include        http://www.imdb.com/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function debug(log_txt) {
    if (console != undefined) {
        console.log(log_txt);
    }
}

// the guts of this userscript
function main() {
	$("div#main table tr td:nth-child(3)").each(
	function(){
		var str = $(this).text();
		var parts = str.match(/.*\((\d{1,4})\).*/);
		if (parts) {
	    	var year = parseInt(parts[1]);
		    if (year < 1980){
	       		$(this).parent().hide();
	    	}
	
		}
	});
}

// load jQuery and execute the main function
addJQuery(main);
