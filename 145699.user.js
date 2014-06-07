// ==UserScript==
// @name       Favotter-ize
// @namespace  http://twitter.com/foooomio
// @version    1.2.1
// @description  Favotter-like decorating
// @include    http://favstar.fm/*
// @include    http://*.favstar.fm/*
// @license    MIT License
// ==/UserScript==

(function(d, func){
  var h = d.getElementsByTagName("head")[0];
  var s = d.createElement("script");
  s.textContent = "(" + func.toString() + ")(jQuery);";
  h.appendChild(s);
})(document, function($) {
  
  var css = '\
    .fav2, .fav2 > .username { \
      color: #009900 !important; \
      font-size: 19px !important; \
      font-weight: bold !important; \
    } \
    .fav3, .fav3 > .username { \
      color: #660099 !important; \
      font-size: 20px !important; \
      font-weight: bold !important; \
    } \
    .fav5, .fav5 > .username { \
      color: #FF0000 !important; \
      font-size: 24px !important; \
      font-weight: bold !important; \
    } \
    .award, .award > .username { \
      color: #FFBB00 !important; \
      font-size: 24px !important; \
      font-weight: bold !important; \
    }';
  
  function getMetaModel(tweet) {
    return JSON.parse($(".fs-tweet-meta", tweet).attr("data-model"));
  }
  
  function getCount(tweet) {
    var model = getMetaModel(tweet);
    var count = { favs: 0, retweets: 0, awards: 0 };
    
    for(var i = 0; i < model.length; i++) {
      var type = model[i].type;
      count[type] = model[i].total;
    }
    return count;
  }
  
  function colorLevel(c) {
    if(c.awards > 0) {
      return "award";
    }
    
    if(c.favs >= 5) {
      return "fav5";
    } else if(c.favs >= 3) {
      return "fav3";
    } else if(c.favs === 2) {
      return "fav2";
    }
    
    return "";
  }
  
  function addCSS(css) {
    var h = document.getElementsByTagName("head")[0];
    var s = document.createElement("style");
    s.type = "text/css";
    s.textContent = css;
    h.appendChild(s);
  }
  
  function initialize() {
    var fl;
    fl = $("#fs-feed-list").on("DOMNodeInserted", handler);
    
    function handler(e) {
      if(e.target.tagName.toUpperCase() !== "LI")
        return;
      
      fl.off("DOMNodeInserted", handler);
      setTimeout(function() {
        main();
        fl.on("DOMNodeInserted", handler);
      }, 50);
    }
  }
  
  var pointer = 0;
  function main() {
    var max, tweet, tweets, count, color;
    
    tweets = $("#fs-feed-list").find(".fs-tweet");
    for(max = tweets.length; pointer < max; pointer++) {
      tweet = tweets[pointer];
      
      count = getCount(tweet);
      color = colorLevel(count);
      
      $(tweet).find(".fs-tweet-text").addClass(color);
    }
  }
  
  addCSS(css);
  initialize();
  main();
  
});