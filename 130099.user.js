// ==UserScript==
// @name           Show Craigslist Thumbs
// @namespace      us.jkk.scripts
// @description    Show thumbs next to listings with pics
// @include        http://*.craigslist.tld/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


$(document).ready(function() {
  var img_w_max = 200;
  var img_h_max = 150;
  //$("<button>Show pics</button>").click(function(){
  $("p:visible span.p").siblings("a").each(function(i, link) {
    $("<span>[...]</span>")
    .insertAfter( $(link).siblings("span.p") )
    .load(link.href + " img", function() {
      $(link).siblings('span').children('img').load(function(){
        var $i = $(this);
        $i.css("border",  "1px solid black");
        $i.css("vertical-align", "middle");
        var w = $i.width();
        var h = $i.height();
        var xscale = (w <= img_w_max) ? 1.0 : (img_w_max/w);
        var yscale = (h <= img_h_max) ? 1.0 : (img_h_max/h);
        var scale = (xscale < yscale) ? xscale : yscale;
        $i.width(w*scale).height(h*scale);
        });
      });
    });
  //}).insertAfter("h4");
  });

   