// ==UserScript==
// @name          f7u12 Alt Text in Comments for Chrome & FireFox
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Automatically displays any title text on images in comments on the the f7u12 subreddit.
// @author        phevans
// @author        josh_bubs
// @include       http://www.reddit.com/r/fffffffuuuuuuuuuuuu/comments/*
// @include       http://*.reddit.com/r/fffffffuuuuuuuuuuuu/comments/*
// @run-at document-start
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
$(".md a").each(function(){
	if($(this).attr("title")!="")
	{
		$(this).wrap("<span'></span>");
		$(this).parent().html($(this).parent().html() + "<span style='background-color:skyblue;border:1px solid black;font-weight:bold;padding:0 4px 0 4px;'>" + $(this).attr("title") + "</span>");
	}
})
}

// load jQuery and execute the main function
addJQuery(main);