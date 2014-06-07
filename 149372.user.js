// ==UserScript==
// @name Twitter Direct Message Modal Username Linker
// @namespace http://davidtsai.net78.net/
// @description Links the @usernames in Twitter's Direct Message modal to twitter.com/username
// @include http://twitter.com/*
// @include https://twitter.com/*
// @version 1.0.3
// ==/UserScript==

function dt_tdmmul($){
	setInterval(function(){
		$("#dm_dialog small.username s").remove();
		$("#dm_dialog small.username").each(function(){
			var username = $(this).html();
			$(this).html('<a href="/' + username + '">@' + username + '</a>');
			$(this).click(function(e){
				window.location = '/' + username;
				e.stopPropagation();
			});
			$(this).removeClass("username");
		});
	}, 1000);
}
var s = document.createElement("script");
s.textContent = String(dt_tdmmul) + "\dt_tdmmul(jQuery);";
document.head.appendChild(s);
document.head.removeChild(s);
