// ==UserScript==
// @name        Facebook Remove Feed Articles
// @description Removes articles from Feed.
// @include     https://facebook.com/home.php*
// @include     https://*.facebook.com/home.php*
// ==/UserScript==




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