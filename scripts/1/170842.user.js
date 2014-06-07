// ==UserScript==
// @name           tvmuse.eu redo mega script
// @namespace      Trevor Rudolph
// @description    This script will show all search results form tvmuse.eu on the episode list and it bypasses the link page and goes straight to the video.
// @match          http://www.tvmuse.eu/tv-shows/*/season_*/episode_*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @version        0.11
// ==/UserScript==

var patt1=/(http:\/\/www.tvmuse.eu\/tv-shows\/).*(\/season_)\d(\/episode_)\d(\/)(#)?$/
if (patt1.test(window.location.href)) {
$("head").append('<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>');
tablesearch = $("#table_search");
tabbar = $(".tabs").children();
tabbar.eq(1).remove();
tabbar.eq(0).find("span").html("All search results");
allbutton = $(".btn_all_results");
var url = window.location.origin + allbutton.attr("onclick").match(/'(.*?)'/)[1];
$.ajax({
  	url: url,
  	success:function(data){
		var found = $(data).find("#table_search", data).html();
		tablesearch.html(found);
		$("#s-more").parent().remove();
		changelinks();
  	}
});

function changelinks() {
	var mainul = tablesearch.children();
	var freeli = $(".i_flag_free").size();
	var paidli = mainul.size() - freeli;
	for (var i=0;i<freeli;i++) {
		alink = mainul.eq(i+paidli).find("a").eq(0);
		var base64str = alink.attr("onclick").match(/'(.*?)'/)[1];
		var sourceurl = "http://www.tvmuse.eu/gateway.php?data=" + base64str;
		alink.removeAttr("onclick");
		alink.attr("target", "_blank");
		alink.attr("href", sourceurl);
		var x = true;
	}
	allbutton.removeAttr("onclick")
	allbutton.click(function() {
		$('html, body').animate({scrollTop: $('.i_flag_free').eq(0).parents().eq(2).offset().top}, 500);
	});
	$(".btn_all_results").attr("onclick", "$('html, body').animate({scrollTop: $('.i_flag_free').eq(0).parents().eq(2).offset().top}, 500);");
}

}