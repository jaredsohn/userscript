// ==UserScript==
// @name           Twitter - Undo tweet
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.3
// @date           2010071912
// ==/UserScript==

var $ = unsafeWindow.$;

var color = "lime"; // hotpink
var count = 5000;

var btn = $("#tweeting_button");
var dummy =
$('<span id="twBtnDummy" tabindex="2">').css({
  "outline": "none",
  "position": "absolute",
  "width": btn.outerWidth()+1,
  "height": btn.outerHeight()+1
})
.append($('<span id="twMeter">').css({
  "-moz-border-radius": "5px 0 0 5px",
  "background-color": color,
  "position": "absolute",
  "height": btn.outerHeight()+1,
  "opacity": "0.5"
}))
.bind("click keydown", function(e) {
  if (e.type === "click" || e.keyCode === 13)
    if ($(this).hasClass("_started"))
      $("#twMeter", $(this)).stop().css("width", 0);
    else
      $("#twMeter", $(this))
        .animate({width: btn.outerWidth()+1},
          count, "linear", function() { btn.click(); $(this).css("width", 0); });
    $(this).toggleClass("_started");
});

btn.before(dummy).keydown(function(e){
  if (e.keyCode === 13)
    $("#twMeter").stop().css("width", 0).parent().toggleClass("_started");
});