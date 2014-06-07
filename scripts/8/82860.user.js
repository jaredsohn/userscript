// ==UserScript==
// @name           New Yorker Single Page
// @namespace      newYorkerSinglePage
// @description    Show New Yorker stories in single page view
// @include        http://www.newyorker.com/*
// @author         Manish Vij
// @version			   1.1
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-08-02
// @lastupdated		 2011-02-06
// ==/UserScript==

var url = window.location.href;

if ( (url != 'http://www.newyorker.com/') && (url.indexOf('currentPage=') == -1) )
  if (url.indexOf('?') == -1)
    window.location.href += '?currentPage=all';
  else
    window.location.href += '&currentPage=all';