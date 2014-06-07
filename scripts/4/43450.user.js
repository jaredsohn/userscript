// ==UserScript==
// @name           eBay Forums Visited Links For Manual IE Custom CSS
// @namespace      http://iescripts.org/view-scripts-568p1.htm
// @description    IE7 IE8 Browser EBay Forum Content Photo Hover Rip Manual method custom Css. 
// @include        http://forums.ebay.com/*
// ==/UserScript==

/* Can use the same method for the Maxthon browser for the css */

(function() {

/* Fix for the date visited links to work better not perfect */
document.body.innerHTML = document.body.innerHTML.replace(/>a</g, '');

/* Start Css style sheet */
var cssStylesheet  = '';

/* Additional link colors for threads - not in user.css as it would be global, this makes it site specific using this script */
cssStylesheet += 'a:link {color:blue !important;}';
cssStylesheet += 'a:visited {color:navy !important;}';
cssStylesheet += 'a:hover {color:darkgreen !important;}';

/* To use a background image can remove the double // and then replace between the double quotes the location and img */
/* Could also, if a lightweight background image, use body, table, td */
//cssStylesheet += 'body {background-image: url("C:/");}';

/* Use IE7Pro code to implement the above css style sheet - method utilized from http://www.iescripts.org/view-styles-172p1.htm */
PRO_addStyle(cssStylesheet, document);

})();