// ==UserScript==
// @name		DeviantART Chat Frame
// @namespace	http://ampersand-design.org
// @description	A dAmn chat frame with simultaneous browsing.
// @include		http://*.deviantart.com*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version		1.5 (Beta)
// ==/UserScript==

$(document).ready(function() {
	if(window.location.hash.indexOf("chatframe") != -1) {
		var url = window.location.hash.substring(window.location.hash.indexOf("-") + 1);
		
		$("body").remove();
			
		$("html").attr({"style" : "background:none;"})
			.append($("<frameset />")
				.attr({"rows" : "*, 150px"})
				.append($("<frame />").attr({"id" : "content-frame"}))
				.append($("<frame />").attr({"id" : "chat-frame"})));
		
		$("#content-frame").attr({"src" : url})
			.load(function() {
				$("#chat-frame").attr({"src" : "http://chat.deviantart.com/chat/help#minimal"});
			});
	}
	
	var flag = $("<td />");
	var flag = $("<td />").attr({"id" : "oh-menu-flag"})
		.addClass("oh-hasbutton")
		.addClass("oh-keep")
		.append($("<a />").attr({"id" : "flaglink"})
			.addClass("oh-l")
			.attr({"title" : "Chat Frame"})
			.css({"right" : "-5px",
				"overflow" : "hidden",
				"cursor" : "pointer"})
			.append($("<i />")
				.addClass("icon")
				.addClass("h-icon")
				.attr({"style" : "background-image:url(data:image/gif;base64,R0lGODlhPgBQALMNAMz/ZszMzMzMZsxmM5nMzJnMmZnMM5mZmWaZmWaZZmaZM2ZmZgAAAP///wAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE4RjYyQjM0M0YyMEVDQUQzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5RjgxQ0NDRTRCRTExRTFBQjM1ODNERDIzQURBRkE3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5RjgxQ0NCRTRCRTExRTFBQjM1ODNERDIzQURBRkE3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjgwMTE3NDA3MjA2ODExOEY2MkIzNDNGMjBFQ0FEMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOEY2MkIzNDNGMjBFQ0FEMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAA0ALAAAAAA+AFAAAAT/sMlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar85FIrGgabmc7+LLYIBZYrK5a9Gqt2UAwJxyw82JciBAr2jNcXMMcnJ9Jn95DHt6e3wJFnkCg4RyBnKSZyV5BIqNewWNaxV5AwwCpwIGqqgGhiR5B52fBaB7nI8Uf6WqvL2tuCV/sQTEtAXEBAWuEqQMvr6iJrAMxgUH1sbRE83PvQrLItPVB+S05Mu6zqoK699lwCTC1NYI5AgIZeDcrQwK7luZNDHAd24gPjwBmTEo9S7RFjYp8hzE0xBim2ZcxLRAtEbjBowWM13kGRlyQzp4Ljii5IBxRp4F4D7mW9kiUUwNXxKmBFgSi8+fQIMKHUq0qNGjSJMqXbokAgA7) !important;"})));
	
	$("#overhead").find("#oh-menu-friends").before(flag);
	
	if($.browser.mozilla ? top == self : parent.location.href == self.location.href) {
		flag.find(".icon").addClass("i1");
		
		$("#flaglink").click(function(event) {
			event.preventDefault();
			
			window.location = "http://help.deviantart.com/" + "#chatframe" + "-" + window.location.href;
		})
	} else {
		flag.find(".icon").addClass("i2");
		
		$("#flaglink").click(function(event) {
			event.preventDefault();
			
			window.parent.location = window.location;
		});
		
		if($("#dAmn-Chatbox").length != 0 && window.location.hash == "#minimal") {
			var style = $("<style />").attr({"type" : "text/css" })
				.html("#overhead-collect{display:none;}" + "\n"
					+ "body {padding-top:0px !important;}" + "\n"
					+ "html, body, #output, #dAmn-Chatbox, #window {height:100% !important;}" + "\n"
					+ ".damn-lo-row-top {display:none;}" + "\n"
					+ ".damnc-tabbar-outer {display:block !important;}");
			
			$("head").append(style);
		} else if($.browser.mozilla) {
            window.parent.location.hash = "#chatframe" + "-" + window.location.href;
        }
	}
});