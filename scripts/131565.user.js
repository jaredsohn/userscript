// ==UserScript==
// @name           xhamster access through ip
// @namespace      xhamster.ip
// @include        http://88.208.16.168/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.0.2
// ==/UserScript==

if(typeof $ == "undefined"){
	addJQuery(convertDnsNameToIp);
}
else{
	convertDnsNameToIp();
}

// to use jquery in chrome
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function convertDnsNameToIp(){
	$('a').each(function(){
		var aEl = $(this);
		var newUrl = aEl.attr("href").replace("xhamster.com","88.208.16.168");
		aEl.attr("href", newUrl);
	});
	var searchFormEl = $('form[name=searchForm]');
	var newFormUrl = searchFormEl.attr("action").replace("xhamster.com","88.208.16.168");
	searchFormEl.attr("action", newFormUrl);
}
