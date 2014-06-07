// ==UserScript==
// @name           nettbyll
// @namespace      lol
// @include        http://*nettby.no/search*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

$(document).ready(function(){
	
	var byll = "<input id='byll' type='button' value='Byll' class='button green rounded'>";	
	var param = "<input type='hidden' name='fredrik' value='sexy'>";
	var form = $("form[method='get']").append(byll);
	$("#byll").click(function(){$(form).append(param).submit()});
	
	if (window.location.href.indexOf("fredrik") != -1) {
		var profiles = $(".SEARCH_memberlist_member");
		var count = $(profiles).size();
		var next = $(".paginator a:last").attr("href");
		var i = 0, timer = setInterval(visit, 4500);
	}
	
	function visit() {
		var profile = $(profiles).eq(i++).addClass("rounded").css("background","#9fc54e");
		var url = "http://www.nettby.no" + $("a:first", profile).attr("href");
		if (i == count && count == 20) window.location = next; 
		else setTimeout(function(){GM_xmlhttpRequest({method: "get", url: url})}, 0);	
	}
	
});