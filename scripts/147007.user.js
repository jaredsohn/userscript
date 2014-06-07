// ==UserScript==
// @name       Tweet Status Linker
// @namespace  http://twitter.com/foooomio
// @version    1.2.1
// @description  Add link to tweet status page to Favstar
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
  
  var css = "#fs-feed-list .fs-about-tweet img { margin: 0px 3px 3px 0px; }\
             #fs-feed-list .fs-about-tweet a { text-decoration: none; }";
  
  function createTwitterLink(path) {
    return $('\
      <a href="https://twitter.com/' + path + '" target="_blank">\
      <img src="http://assets0.favster.fm/assets/1x-loose/twitter_16x16-bef4d65847594ef2fd540f354e315185.png">\
      </a>');
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
    var date, dates, max, path, link;
    
    dates = $("#fs-feed-list").find(".fs-date");
    for(max = dates.length; pointer < max; pointer++) {
      date = dates[pointer];
      
      path = date.href.match(/\w+\/status\/\d+/);
      link = createTwitterLink(path);
      
      link.prependTo(date.parentNode);
    }
  }
  
  addCSS(css);
  initialize();
  main();
});