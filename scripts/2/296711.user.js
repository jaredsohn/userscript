// Copyright 2013 Marco Trevisan (Treviño) <mail@3v1n0.net>
//
// This program is free software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License version 3, as published
// by the Free Software Foundation.
//
// ==UserScript==
// @name        RaiNews HTML5
// @namespace   html5.rainews.it
// @description Use HTML5 video tags for RAINEWS videos
// @include     http*://www.rainews.it/*
// @version     1
// @icon        http://www.rainews.it/dl/rainews/favicon.ico
// @grant       none
// ==/UserScript==

// Load jquery if needed and once done, call the provided callback
function addJQuery(callback)
{
  if (this.$)
  {
    callback();
    return;
  }

  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "this.$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
  var player_div = $("div#Player");

  if (player_div)
  {
    var width = player_div.width();
    var height = player_div.height();
    var src = $("head meta[name=videourl]").attr("content");

    if (src && src.length > 0 && src.search("rtmp://") < 0)
    {
      player_div.replaceWith('<video width="'+width+'" height="'+height+'" controls><source src="'+src+'" type="video/mp4"></video>');
    }
  }
});