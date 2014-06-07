// ==UserScript==
// @name			Facepunch Avatar Restoration
// @description		        Makes avatars work again for blues
// @include			http://*.facepunch*.com/*
//
// ==/UserScript==

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

function main() {
	var url,
	member,
	time = new Date().getTime(),
	timestamp = time - time % 86400;
	$(".userinfo").each(function (i) {
		url = $(this).find("#userdata").children("a").attr("href");
		member = parseInt(url.replace("members/",""));
		$(this).find("#userdata").children("a").html("<img src='/avatar/"+member+".png"' />");
		
	});
	
	
	
}

addJQuery(main);