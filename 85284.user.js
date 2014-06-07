// ==UserScript==
// @name           Vanity Fair single page view
// @namespace      vanityfairSinglePage
// @description    Always show Vanity Fair stories in single page view
// @include        *vanityfair.com*
// @author         Manish Vij
// @version			   1.1
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-09-02
// @lastupdated		 2011-05-09
// ==/UserScript==

var url = window.location.href;

if (url != 'http://www.vanityfair.com/') {

  if (url.indexOf('currentPage=') == -1) {

    if (url.indexOf('?') == -1)
      window.location.href += '?currentPage=all';
    else
      window.location.href += '&currentPage=all';
      
  } else if (url.indexOf('currentPage=all') == -1){

    var newUrl = url;
    
    newUrl = newUrl.replace(/currentpage=\d/i, 'currentPage=all');
    window.location.href = newUrl;
  }
}