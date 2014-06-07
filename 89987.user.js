// ==UserScript==
// @name qiq.ru no banners
// @description qiq.ru adds remover
// @match http://qiq.ru/*
// @include http://qiq.ru/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
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

// the guts of this userscript
function main() {
  jQuery("div[id^='MarketGid']").hide();
  jQuery("div[id^='Teaser_Block']").hide();    
  jQuery("div[id^='rtn']").hide();    
  jQuery("div[id^='rdm']").hide();    
  jQuery('iframe').hide();
  jQuery('.teaser').hide();
}

// load jQuery and execute the main function
addJQuery(main);