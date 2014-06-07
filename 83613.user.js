// ==UserScript==
// @name           ClickyVisitorLocation
// @namespace      7null.com/GM_scripts
// @description    rips flag title, which is city/state and adds to table 
// @include        http://getclicky.com/user/stats/visitors*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js");
	script.addEventListener('load', function () {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
	document.body.appendChild(script);
}
function main() {
$('.tableborder tr img[src*="flag"]').each(function(){
   //$(this).closest('td').css('border', '2px solid red');
$(this).nextAll('td:first').css('border', '2px solid red');
   $(this)
    .closest('td')
    .nextAll('td:last')
    .html($(this).attr('title'));
});
}
addJQuery(main);

