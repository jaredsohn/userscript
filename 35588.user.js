// ==UserScript==
// @id                  autoAccessAnalytics-us@erikvold.com
// @name		Auto Access Google Analytics
// @author		Erik Vold <erikvvold@gmail.com>
// @datecreated	2008-7-9
// @lastupdated	2010-09-28
// @namespace	autoAccessAnalytics
// @match		http://google.com/analytics/
// @match		http://google.com/intl/*/analytics/
// @match		http://google.ca/analytics/
// @match		http://google.ca/intl/*/analytics/
// @match		https://google.com/analytics/
// @match		https://google.com/intl/*/analytics/
// @match		https://google.ca/analytics/
// @match		https://google.ca/intl/*/analytics/
// @match		http://*.google.com/analytics/
// @match		http://*.google.com/intl/*/analytics/
// @match		http://*.google.ca/analytics/
// @match		http://*.google.ca/intl/*/analytics/
// @match		https://*.google.com/analytics/
// @match		https://*.google.com/intl/*/analytics/
// @match		https://*.google.ca/analytics/
// @match		https://*.google.ca/intl/*/analytics/
// @include		/https?:\/\/(?:www\.)?google\.com\/(intl\/[^\/]*\/)?analytics(\/.*)?/
// @include		http*://google.com/analytics/
// @include		http*://www.google.com/analytics/
// @include		http*://google.ca/analytics/
// @include		http*://www.google.ca/analytics/
// @include		http://www.google.com/intl/*/analytics/
// @version		1.3.6
// @description	   Auto presses the "Access Analytics" button, if it is displayed.
// @screenshot     http://s3.amazonaws.com/uso_ss/11252/large.png http://s3.amazonaws.com/uso_ss/11252/thumb.png
// @screenshot     http://erikvold.com/blog/images/posts/autoAccessGA.gif
// @icon http://aux.iconpedia.net/uploads/1246831917417792463.png
// @homepageURL    http://userscripts.org/scripts/show/35588
// ==/UserScript==

var ele = document.evaluate("//div[@id='ga-cob']//a",document,null,9,null).singleNodeValue;
if(ele) {
  window.location.replace(ele.href);
  if(typeof GM_notification != "undefined") GM_notification("Redirecting you to Google Analytics.");
}