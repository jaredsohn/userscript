// ==UserScript==
// @name          Facebook - auto logout
// @namespace     http://supunpraneeth.blogspot.com
// @description	  Facebook - auto logout
// @homepage      http://supunpraneeth.blogspot.com
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @match       http://facebook.com/*
// @match       https://facebook.com/*
// @match      http://*.facebook.com/*
// @match       https://*.facebook.com/*
// ==/UserScript==

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



    
setTimeout("document.getElementById('logout_form').submit();", 10000);
