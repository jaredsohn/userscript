// ==UserScript==
// @author	   Yukin
// @name           two_pixiv
// @include        http://www.pixiv.com/works/*
// @version 0.1
// @describe       add link @ pixiv.com to pixiv.net 
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
	script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
			}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var comurl = document.location.href;
	var neturl = comurl.replace(/\.com\/works\//, ".net/member_illust.php?mode=medium&illust_id=");
	//alert(neturl);
	var comment = $("div[class='section work-caption']");
	//alert(comment.html());
	comment.append("<p></p>");
	comment.append('<p><a href='+neturl+'>*NYA! to page@pixiv.net</a></p>');
	//alert(comment.html());
}

// load jQuery and execute the main function
addJQuery(main);
