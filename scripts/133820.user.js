// ==UserScript==
// @name           TwitChecker	
// @namespace      Twit
// @include     http://twiends.com/new

// ==/UserScript==
function oc(a) {

	var o = {};
	for(var i = 0;i<a.length;i++) {
		o[a[i]]='';
	}
	return o;
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function main () {
var j$ = jQuery.noConflict();
var user = j$('.loginBox').find('a[data-tooltip="sticky1"]').text();
var users = ['DellU_VA','DellU_MD','DellU_WV'];

if (user in oc(users)) {
j$('li[class^="tC "]').each(function() {
	var content = j$(this).find('p').text().split(/\s/)[1];
	var contentLink = j$(this).find('a[class="follow"]');
	var numSeeds = parseInt(content);
	if (numSeeds > 1) {
		var timeoutDuration = Math.floor(500+(Math.random()*(1000)));
		var timeoutID = window.setTimeout(function() {
			contentLink.click();
		}, timeoutDuration);
	}
});
var refreshDuration = Math.floor(15000+(Math.random()*(45000)));
var refreshID = window.setTimeout(function() {
	location.reload();
}, refreshDuration);
}
else {
	window.location = 'http://twiends.com/followers';
}
}

addJQuery(main);