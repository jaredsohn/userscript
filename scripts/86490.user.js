// ==UserScript==
// @name juick.originalformating
// @description Show original message formating corrupted by stupid web interface
// @namespace http://juick.com
// @include http://juick.com/*
// ==/UserScript==

var is_post = (document.getElementById("content").innerHTML.indexOf("Replies") != -1);

if(is_post){
	var msg = document.querySelector("div.msgtxt");
	if(msg){
		var link = document.querySelector("div.msginfo small a");
		
		if(link){
			var set_orig_fmt = document.createElement("a");

			set_orig_fmt.appendChild(document.createTextNode(" original formating"));
			set_orig_fmt.href = "#";
			set_orig_fmt.addEventListener("click", function(evt){
				var original = document.createElement("pre")
				var html = msg.innerHTML.replace(/<br>/g, "");

				original.innerHTML = html;
				msg.parentNode.replaceChild(original, msg);
				set_orig_fmt.style.display = "none";

				evt.preventDefault();
				evt.stopPropogation();
				return false;
			});
			link.parentNode.insertBefore(set_orig_fmt, link.nextSibling); //insert after
		}
	}
}
