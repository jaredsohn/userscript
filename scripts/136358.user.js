// ==UserScript==
// @id             RBUATR
// @name           RBUATR
// @version        1.2
// @namespace      RBUATR
// @author         HG | Papa John
// @description    Remove Ban/Unban/Abuse/Tlist Reports
// @include        *hellsgamers.com/search.php?searchid=*
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
	$("a[href*='forums/72']").parent().parent().parent().parent().remove(); // Ban Requests
	$("a[href*='forums/226']").parent().parent().parent().parent().remove(); // Archieved Unban Requests
	$("a[href*='forums/73']").parent().parent().parent().parent().remove(); // Unban Requests
	$("a[href*='forums/227']").parent().parent().parent().parent().remove(); // Archieved Unban Requests
	$("a[href*='forums/74']").parent().parent().parent().parent().remove(); // Abuse Reports
	$("a[href*='forums/228']").parent().parent().parent().parent().remove(); // Archieved Abuse Reports
	$("a[href*='forums/96']").parent().parent().parent().parent().remove(); // Tlist Reports
	$("a[href*='forums/229']").parent().parent().parent().parent().remove(); // Archieved Tlist Reports
});
}

// load jQuery and execute the main function
addJQuery(main);