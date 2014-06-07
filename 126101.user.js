// ==UserScript==
// @name          Hide YouTube Users
// @version       0.1
// @description   Remove annoying users from YouTube suggested videos
// @match         http://www.youtube.com/*
// @author        Matt Ashbourne
// ==/UserScript==

// Load jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// Hide spammers
function main() {
  var spammers = [
		'TheReplyGirl',
		'GirlsJustWannaReply',
		'MeganSpeaks',
		'LauraTickled',
                'scootagirl90'
  ];
    for (var i = 0; i < spammers.length; i++) {
      $("li:contains('"+spammers[i]+"')").remove();
  }
}

// load jQuery and execute the main function
addJQuery(main);