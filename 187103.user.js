// ==UserScript==
// @name Sensationalism Blocker
// @namespace	senBlock
// @description	Blocks sensational websites. jQuery loader by Erik Vergobbi Vold & Tyler G. Hicks-Wright
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @match		http://*.facebook.com/*
// @match		https://*.facebook.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// @version 0.24

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	blockedsites = [
		"viralnova",
		"upworthy",
		"faithit",
		"thoughtcatalog",
		"christianpost",
		"thesmartlocal"
	];
	setInterval(function() {
	  	jQ("._5pb3._5dec:not(.senBlockChecked)").each(function() {
	  		theThis = jQ(this)
			url = theThis.attr("href");
			theThis.addClass("senBlockChecked");
			jQ.each(blockedsites, function(index, val) {
				if (url.indexOf(val) != -1) {
					theThis.addClass("isBlocked").parents("._5uch._5jmm._5pat").css("display", "none");
					console.log("This should block " + url);
				}
			});
		});
	}, 500);
}

addJQuery(main);
// ==/UserScript==