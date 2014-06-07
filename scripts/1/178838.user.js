// ==UserScript==
// @name       I Do Not Know Any Of You
// @namespace  http://github.com/colindean
// @version    0.1
// @description  Provides a small button on LinkedIn that clicks the little "I don't know you" X on each person card on the People You May Know page
// @match      http://www.linkedin.com/people/pymk*
// @copyright  2013, Colin Dean
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

function doIt() {
  $("a[class='close']","ul.people-card li.card").each(function(i,e) { e.click() });
}

function drawWidget(){
  $("body").append('<div id="know-noone-box"><a href="#" id="know-noone">I do not know any of these people</a></div>');
  $("#know-noone-box").css({
      "position":"fixed",
      "left":"0",
      "bottom":"0",
      "z-index":"99",
      "background":"red",
      "padding":"0.3em"
  });
  $("#know-noone").css({"color":"white"}).click(doIt);
}

$(document).ready(function() {
    console.log("know-noone initalizing...");
	drawWidget();
});