// ==UserScript==
// @name          twit_since
// @namespace     http://twitter.com/hirorock
// @description   TwitterAcountCheck.
// @include       http*://twitter.com/*
// @version       0.1.3
// ==/UserScript==
JSON_INIT(function(){
	$.ajax({
		type: "GET",
		url: "http://twitter.com/users/show.json",
		cache: false,
		data: "screen_name=" + $("head meta[name='page-user-screen_name']").attr("content"),
		dataType: "jsonp",
		async: true,
		success: function(j){
			var since_txt = j.lang == "ja" ? "Tweet歴":"SINCE";
			var since = new Date(Date.parse(j.created_at));
			$("#profile ul.about.vcard.entry-author").append('<li><span class="label">' + since_txt + '</span> ' + (since.getFullYear()) + "/" + (Number(since.getMonth() + 1)) + "/" + (since.getDate()) + '</li>');
		},	
		error: function(xhr, ajaxOptions, thrownError) {
			//console.log('Error');
		},
		complete: function() {			
			//console.log("complate");
		}
	});
});
function JSON_INIT(fun){
	if(typeof(document.getElementsByName("page-user-screen_name")[0].content) != "string" || 2 != location.pathname.split("/").length ) return false;
	var script = document.createElement('script');
	script.type = 'application/javascript';
	script.textContent = '(' + fun.toString() + ')()';
	document.body.appendChild(script);
}