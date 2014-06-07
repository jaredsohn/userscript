// ==UserScript==
// @name       Go to Search Field	
// @namespace  http://*.imdb.com
// @version    0.1
// @description  Set focus to the search field on page load
// @match      http://*.imdb.com/*
// @match      http://*.kickass.to/*
// @match      https://*.facebook.com/*
// @match      http://*.rottentomatoes.com/*    

// @copyright  2014, @mihneawalker
// ==/UserScript==
currentURL = window.location.hostname;
//alert(window.location.hostname);

switch (currentURL)
{
    case "www.imdb.com":
		document.getElementById("navbar-query").focus();
        break;
    case "kickass.to":
        document.getElementById("search_box").focus();
        break;
    case "www.rottentomatoes.com":
        document.getElementById("mini_searchbox").focus();
        break;
   /* case "www.facebook.com", "facebook.com":
        document.getElementById("u_0_9").focus();
        break;*/
}