// ==UserScript==
// @name          Redirect BusinessWeek to print version
// @namespace     businessweekRedirectToPrint
// @description   Redirect BusinessWeek stories to print version
// @include       *businessweek.com*
// @author			   Manish Vij
// @version			   1.0
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-07-31
// @lastupdated		 2010-07-31
// ==/UserScript==

var site = 'businessweek.com';
var link, startPos, newUrl;

link = window.location.href;

if ( (link.indexOf("content") > -1) && (link.indexOf("print") == -1) ){

  startPos = link.indexOf(site) + site.length;
  newUrl = link.substr(0, startPos) + "/print" + link.substr(startPos, link.length - 1);
  window.location.href = newUrl;
}