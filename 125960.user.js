// ==UserScript==
// @name           youtube horse_ebooks
// @author         JMSsss
// @namespace      http://userscripts.org/users/436277
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @include        https://youtube.com/watch?*
// ==/UserScript==
function getJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  var c=[];
  var numRand = Math.ceil(Math.random()*50);
    $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=horse_ebooks&count=400&callback=?",
        function(data) {
            $(".comment-text").each(function(index) {
                $(this).html("<div class=\"comment-text\" dir=\"ltr\"><p>" + data[numRand].text + "</p></div>");
                numRand = Math.ceil(Math.random()*(data.length-1));
            });
        });
}

getJQuery(main);