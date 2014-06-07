// ==UserScript==
// @name           WikiNoticeHide
// @description    wiki patch 10 Jule 2012
// @version        0.02
// @include        http://*.wikipedia.org/*
// @author	   xandros
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$(document).ready(
  function()
  {
$("#siteNotice").css({"display":"none"});
$("#mw-head,#mw-panel,#footer,#catlinks,#firstHeading,#bodyContent,#mw-dismissable-notice").css({"display":"block"});
}); 
