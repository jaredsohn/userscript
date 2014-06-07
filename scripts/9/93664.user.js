// ==UserScript==
// @name           SLO-TECH ONE-CLICK
// @description    Make full text of front page news items instantly available, without the need to load a new page
// @author         igor.kolar@gmail.com
// @require        http://code.jquery.com/jquery-1.4.2.min.js
// @include        http://slo-tech.com
// @version        1.0
// @namespace      www.slo-tech.com
// ==/UserScript==

/* find all news items, and their "read more" link
   change that link so that it loads the full text in the background, and sets it
   once done, the links starts behaving as normal
*/

$("div#content").find("p.read_more").each(function(index) {
	var url = "http://slo-tech.com" + $(this).find("a").attr("href") + "/0";
	var poster = $(this).parent().find("div.image");
	var wrapper = $(this).parent().find("div.besediloNovice");
	$(this).find("a").click(function() {			
//		alert("Polnim novico " + url);
		var a = $(this);
		$.get(url, function(html) {
			var from = html.indexOf('<div class="besediloNovice">');
			var to   = html.indexOf('<p class="comments">');
			var full = html.substring(from, to);
			full = full + "<br/><p>OH BTW .. HUŠ JE LEGENDA!</p>";

			$(poster).toggle();

			$(wrapper).html(full);
			$(a).unbind('click');
		});
		return false;
	});

});