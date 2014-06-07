// ==UserScript==
// @name           ShouldIRetweet
// @namespace      erlichmen.org/twitter
// @include        http://twitter.com/
// @version        1.4
// ==/UserScript==


var script ='\
function scan() {\
    var rt = $(".retweet-link:not(.retweet-should-modified)");\
    rt.each(function(i) {\
      var parent = $(this).parents(".hentry:first");\
\
      var from = $("#me_name").text();\
      var to = parent.find(".screen-name:first").text();\
\
      var text = document.createTextNode("(Should I?)");\
\
      var shouldLink = $("<a></a>");\
      shouldLink.addClass("should-retweet");\
      shouldLink.css("direction", "ltr");\
      shouldLink.css("text-align", "left");\
      shouldLink.css("margin-left", "0.25em");\
      shouldLink.attr("href", "http://shouldirt.com/" + from + "/" + to);\
      shouldLink.attr("target", "_new");\
\
      shouldLink.html(text);\
      $(this).parent().append(shouldLink);\
\
      $(this).addClass("retweet-should-modified");\
  });\
};\
scan();\
// Anytime the timeline changes\
$("body").bind("timeline-changed", scan);'

var GM_Script = document.createElement('script');
GM_Script.type = 'text/javascript';
GM_Script.text = script;
document.getElementsByTagName('head')[0].appendChild(GM_Script);

