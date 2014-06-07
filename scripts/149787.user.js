// ==UserScript== 
// @name           https:// youtube embed
// @namespace      by gala PROBLEM?
// @description    https:// youtube embed
// @include        https://ncore.cc/torrents.php
// @include        https://ncore.nu/torrents.php
// ==/UserScript== 
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}
exec(function() {
$.getScript("https://raw.github.com/brandonaaron/livequery/master/jquery.livequery.js", function() {

		$("object").livequery(function() {
		var url = $(this).children("embed").attr("src");
		var newurl = url.replace("http", "https");
		$(this).children("param[name=\"movie\"]").val(newurl);
		$(this).children("embed").attr("src",newurl);
		var ht = $(this).html();
		$(this).html(ht);
		 });
       
 });
 });