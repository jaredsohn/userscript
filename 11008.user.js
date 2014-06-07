// ==UserScript==
// @name          Amazon NYPL_BCCLS Linky
// @namespace     
// @description	  This script inserts three icons under the book title, which link to two libaries and one price comparison site respectively.
// @include       http://*.amazon.*
// @date          2005-12-04
// @version       0.2
// @GM_version    0.6.4

/* BEGIN LICENSE BLOCK
This is modified version of ChenXin's original script. Only change being the url. Copyright (C) 2005 Chenxin Li

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

// ==/UserScript==

(

function() {
  mainmatch = window.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
      var other = document.createElement('span');
	  var s = '</br><a title="Compare Prices at BookFinder4U" href="http://www.bookfinder4u.com/compare.aspx?isbn=' + isbn + '">';
	  s += '<img src="http://www.osirusonline.com/bookfinder4u.gif" style="border: 0pt none ; margin: 0pt 0pt 0pt 2px; padding: 0pt; vertical-align: middle;" width=106 height=27 alt="BookFinder4U"></a>';
	  other.innerHTML = s;
	  
	  var hollis_link = document.createElement('a');
   	  hollis_link.setAttribute('href', 'http://leopac.nypl.org/ipac20/ipac.jsp?index=ISBN&term=' + isbn);
   	  hollis_link.setAttribute('title', 'Lookup this book at NYPL');
   	  hollis_link.innerHTML 
	   	= '<img src="http://www.nypl.org/research/chss/ehon/images/nypl2.gif"'
      	+ ' style="border: 0; margin: 0px 0 0 2px; padding: 0; vertical-align: middle"'
      	+ ' alt="Harvard icon" />';
      	
      var mln_link = document.createElement('a');
   	  mln_link.setAttribute('href', 'http://web2.bccls.org/web2/tramp2.exe/do_keyword_search/log_in?setting_key=BCCLS&servers=1home&index=default&query=' + isbn);
   	  mln_link.setAttribute('title', 'Lookup this book at BCCLS Library Network');
   	  mln_link.innerHTML 
	   	= '<img src="http://www.bccls.org/2005-bccls-logo.gif"'
      	+ ' style="border: 0; margin: 0px 0 0 2px; padding: 0; vertical-align: middle"'
      	+ ' alt="MLN icon" width=124 height=27 />';
      	
      header.parentNode.insertBefore(hollis_link, header.nextSibling);
      header.parentNode.insertBefore(mln_link, header.nextSibling);
      header.parentNode.insertBefore(other, header.nextSibling);
    }
  } 
}
)();

