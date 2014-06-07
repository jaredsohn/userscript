// ==UserScript==
// @name           Google+ Comment form hider
// @description   Fixes Google+ comment display
// @version        0.3
// @include        https://plus.google.com/*
// @match        https://plus.google.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var lock = false
setInterval(function() {
	if(!lock) {
		lock = true;
		$(".ncGWd .CPLjOe").each(function(){ 
			if($(this).find(".vix0xf").find(".sInvN").length > 0) {
				$(this).find(".vix0xf").css("display", "block");
				return; //already has comments
			}
			if($(this).attr("data-gpo")) return; //already done
			var time = "c"+(new Date().getTime());
			$(this).find(".vix0xf").css("display", "none").attr("id", time);
			$(this).find(".cWD3F").append('<div role="button" tabindex"0"="" class="c-wa-Da HPvmqf" aria-label="Comment on this post" style="width: 200px"><a href="#" onclick="document.getElementById("'+time+'").style.display = "block"; return false;">Comment</a></div>');
		});
	}
},  100);