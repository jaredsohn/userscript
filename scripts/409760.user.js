// ==UserScript==
// @name        ExtFeedly
// @namespace   com.mixey.feedly
// @include     https://feedly.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require		http://jqueryjs.googlecode.com/svn-history/r6125/trunk/plugins/cookie/jquery.cookie.js
// @version     1
// @grant       none
// ==/UserScript==

(function () {	
    function init() {
		var item = $("<div>above all read</div>");
		item.css({
			"padding-left": "5px",			
			cursor: "pointer"
		});
		item.click(function(){			
			var token = jQuery.parseJSON($.cookie("session@cloud")).feedlyToken;			
			selectedId = $(this).parent().parent().find(':first-child').attr("data-inlineentryid");
			var markAsReadIds = [];
			$("#timeline .title.unread").each(function(){
				$(this).css("color", "gray");
				var unreadId = $(this).attr("data-inlineentryid");
				
				markAsReadIds.push(unreadId);
				console.log(unreadId);
				
				if (selectedId == unreadId) 
					return false;											
									
			});
			
			//console.log(markAsReadIds.join());								
			
			$.ajax({
				headers: {
					"$Authorization.feedly": "$FeedlyAuth",
					"Authorization": "OAuth " + token
				},
				type: 'POST',
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				url: "https://feedly.com/v3/markers",
				data: stringify({ "action": "markAsRead","type": "entries", "entryIds": markAsReadIds}),
				processData: false,
				success: onResponse,
				error: onResponseFail					
			});
		});
		
		$("#timeline .metadata").append(item);		
	}
	
	function onResponse(data) {						
			console.log("Success: " + data);
	}
	
	function onResponseFail(xhr, ajaxOptions, thrownError) {	
		console.log("Error: " + xhr.status + " " + thrownError);
	}
	
	function stringify (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string") obj = '"' + obj + '"';
			return String(obj);
		}
		else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof (v);
				if (t == "string") v = '"' + v + '"';
				else if (t == "object" && v !== null) v = stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	
	// HACK
	$(document).ready(function(){
		window.setTimeout(function(){
			init();
			$(".feedTitle").click(function(){
				window.setTimeout(init, 3000);
			});	
		}, 3000);
	});	
					
})(jQuery);