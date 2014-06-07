// ==UserScript==
// @name           loldaaa
// @namespace      lol
// @include      
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// @require        http://nettbyll.net/gm/update.js
// ==/UserScript==

var ver = "1104";

$(document).ready(function(){
		
	var byll = "<input id='byll' type='button' value='Byll' class='button green rounded'>";	
	var param = "<input type='hidden' name='fredrik' value='sexy'>";
	var form = $("form[method='get']").append(byll);
	$("#byll").click(function(){$(form).append(param).submit()});
	
	checkVer(ver, function(){
		var update = "<marquee><a href='http://nettbyll.net/oppdater-nettbyll-gm/' style='color: red'>Det finnes en ny versjon av Nettbyll GM. Oppdater nå!</a></marquee>";
		$("#GLOB_content").prepend(update);
	});
	
	if (window.location.href.indexOf("fredrik") != -1) {
		var profiles = $(".SEARCH_memberlist_member");
		var count = $(profiles).size();
		var next = $(".paginator a:last").attr("href");
		var i = 0, timer = setInterval(visit, 500);
	}
	
	function visit() {
		var profile = $(profiles).eq(i++).addClass("rounded").css("background","#9fc54e");
		if (i == count && count == 20) window.location = next; 
		else $.get("http://www.nettby.no" + $("a:first", profile).attr("href"));
	}
		
});