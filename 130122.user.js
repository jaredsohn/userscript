// ==UserScript==
// @name MLive Kittens
// @version 1.0
// @author Matt Slack
// @description Replaces MLive comments with images of kittens. Revised from http://userscripts.org/scripts/show/130018
// @include http://www.mlive.com/*/index.ssf/*
// ==/UserScript==

// Chrome does not support @require
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function placeKittens() {

    $(".comment .text_container").each(function(i, e){
        if ($(e).height() > 100){ h = $(e).height() } else { h = 100 }
        $(e).html('<img src="http://placekitten.com/g/' + $(e).width() + '/' + h + '">');
    });

}

addJQuery(placeKittens);

