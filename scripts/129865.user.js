// ==UserScript==
// @name            Toss CenturyLink Redirect
// @author          Paul Baker le Salt Shaker
// @namespace       https://github.com/SonOfLysander
// @description     CenturyLink users have to suffer through redirections whenever that user enters a correctly formed url that still 404's. This script re-redirects the user to Google (or any other searchengine of their choosing).
// @license         Creative Commons Attribution License 3.0
// @version	        0.78
// @include         http://webhelper.centurylink.com/*
// @include         *webhelper.centurylink.com/*
// @released        2012-4-1
// @updated         2012-4-1
// @compatible      Greasemonkey
// ==/UserScript==

//Change this variable to change your favorite search engine.
//You can go lower down the page to add any other engine you want.
// 1 = Google, 2 = Bing (ew), 3 = yahoo
var pickYourSearchEngine = 1;
//Changing this value to "false" will redirect all searches on CenturyLink done, even if they
//where intentionally started by the user
var dontRedirectManualSearches = false;

var redirectedUrl = document.location.search;
var theAttempt = redirectedUrl.substring(redirectedUrl.indexOf("origURL=")+8, redirectedUrl.indexOf("&r="));
if (theAttempt.localeCompare("?search") == 0 || theAttempt.localeCompare("?queryb") == 0)
{
  if (dontRedirectManualSearches == true)
  {
    return false;
  }
  //I don't know why you would be doing a manual search via CenturyLink, but if you are doing this
  //on your own then I'll let you do your thing.
  theAttempt = redirectedUrl.substring(redirectedUrl.indexOf("querybox=")+9, redirectedUrl.indexOf("&submit"));
}
//now for the fun stuff.
switch(pickYourSearchEngine)
{
case 1:
  window.location = "http://www.google.com/search?as_q=" + theAttempt;
  break;
case 2:
  window.location = "http://www.bing.com/search?q=" + theAttempt;
  break;
case 3:
  window.location = "http://search.yahoo.com/search;_ylt=?p=" + theAttempt;
  break;
default:
  window.location = "http://www.google.com/search?as_q=" + theAttempt;
  break;
}