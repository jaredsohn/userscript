// ==UserScript==
// @name          Google Bar Links
// @version       1.0
// @namespace     http://www.vefun.is/
// @description	  Makes all links in the Google bar open in the same window instead of a new one 
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       https://plus.google.com/*
// @include       http://plus.google.com/*
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @include       https://docs.google.com/*
// @include       http://docs.google.com/*
// @include       https://picasaweb.google.com/*
// @include       http://picasaweb.google.com/*
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       http://www.google.com/calendar/*
// @include       https://www.google.com/calendar/*
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
    $("a.gbzt").each(function() {
        $(this).removeAttr("onclick").attr("target", "_self").bind("click", function() {
            if (window.top.location != location) {
                window.top.location.href = $(this).attr("href");
            }
        });
    });
}

addJQuery(main);