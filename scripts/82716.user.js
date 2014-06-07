// ==UserScript==
// @name           Wired full page
// @namespace      wiredFullPage
// @description    Redirect to full page version of Wired stories
// @include        *wired.com*
// @author			   Manish Vij
// @version			   1.0
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-07-31
// @lastupdated		 2010-07-31
// ==/UserScript==
var url = window.location.href;

if ( (url != "http://www.wired.com/magazine/") && (url.indexOf("\?pid=") == -1) && (url.indexOf("magazine") > -1) && (url.indexOf("all/1") == -1) )
  window.location.href += "all/1";