// ==UserScript==
// @name           4chanc
// @namespace      chan
// @include        http://boards.4chan.org/b*
// @include        http://boards.4chan.org/v*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQuery.noConflict();

	jQuery("a[class=quotejs]").each(function() {	
		if(jQuery(this).html() == "No.") {
			jQuery(this).next().html(jQuery(this).attr("href").split('#')[1]);
		}
	}); 
}

addJQuery(main);