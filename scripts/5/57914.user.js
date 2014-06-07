// ==UserScript==
// @name           Facebook secure
// @namespace      QAZXSWEDCVFRTGBNHYUJMKIOLP
// @description    Forces facebook to use secure connection
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
    // This will be executed onLoad
    // Append some text to the element with id #someText using the jQuery library.
    $("a[href^='http://'][href*=.facebook.com]").live("click", function(){
      //$(this).after("<p>Another paragraph!</p>");
      window.location.href = $(this).attr("href").replace(/^http:/, 'https:');
      return false;
    });
    $("form[action^='http://'][action*=.facebook.com]").each(function(){
    	$(this).attr("action", $(this).attr("action").replace(/^http:/, 'https:'));	
    });
}());


if(window.location.href.match(/^http:/)){
 window.location.href = window.location.href.replace(/^http:/, 'https:');
}
