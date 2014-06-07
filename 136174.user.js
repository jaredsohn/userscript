// ==UserScript==
// @id             YRVR
// @name           YRVR
// @version        1.0
// @namespace      YRVR
// @author         HG | Papa John
// @description    No Embedded Recomendations on youtube
// @include        *www.youtube.com*
// @run-at         document-end
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.7.1.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $(document).ready(function(){
	setInterval(function(){
		$(".feed-item-rec-reason-text").parents(".feed-item-container").parent().remove();
	}, 1000);
});
}

// load jQuery and execute the main function
addJQuery(main);