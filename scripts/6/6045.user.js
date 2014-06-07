// ==UserScript==
// @name        Facebook Remove Feed Articles
// @version     1.1
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.facebook
// @description Removes articles from Feed.
// @include     http://facebook.com/home.php*
// @include     http://*.facebook.com/home.php*
// ==/UserScript==

//Author contact info: Lukas Fragodt <lukas@fragodt.com>

//Copyright (C) 2006. Lukas Fragodt and contributor(s).
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 fo the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

//Version History
//1.0   -            - Original release.
//1.1   - 2007-04-10 - Now removes 'ad_capsule' divs.

function getElementsByClassRegExp (element, className) {
  var elements = document.getElementsByTagName(element);
  var retVal = new Array();
  for (var i = 0; i < elements.length; i++) {
    if (className.exec(elements[i].className)) {
      retVal.push(elements[i]);
    }
  }
  return retVal;
}

function removeArticles() {
//Loops through all feed items and removes articles.
   var feedItems = getElementsByClassRegExp( 'div', /^feed_item\ clearfix\ ad_capsule$/ );
   for ( var i = 0; i < feedItems.length; i++ ) {
         feedItems[i].style.display = 'none';
   }
}

removeArticles();
