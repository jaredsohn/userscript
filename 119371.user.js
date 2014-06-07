// ==UserScript==
// @name           Anti Netabare
// @namespace      http://netaba.re
// @description    Anti Netabare
// @version        0.1
// @include        http://bgm.tv/*
// @include        http://bangumi.tv/*
// @include        http://chii.in/*
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

function chophand() {
  $('span[style$="background-color:#555;color:#555;border:1px solid #555;"]').html('剧透死全家哦～☆');
}

addJQuery(chophand);