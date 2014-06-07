// ==UserScript==
// @name           NeoGAF: AusGAF Tab
// @version        0.0.8
// @namespace      http://www.neogaf.com/forum/
// @match        http://www.neogaf.com/forum/*
// ==/UserScript==

// CHROME AND FIREFOX COMPATIBLE

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	$(".forum-tabs").append("<li class=''><a href='http://www.neogaf.com/forum/showthread.php?t=502324&goto=newpost'>AusGAF</a></li>");
	$(".forum-tabs").append("<li class=' child'><a href='http://www.neogaf.com/forum/subscription.php'>Subscriptions</a></li>");
}

addJQuery(main);

