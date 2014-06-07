// ==UserScript==
// @name          Washington Post full page view
// @namespace     washingtonPostFullPage
// @description   Directly link to the full page (print) version of Washington Post articles
// @include       http://*washingtonpost.com/*
// @version       2.0
// ==/UserScript==


// Work on links opened from sources other than washingtonpost.com

var url = window.location.href;

if ( /_story.html/.test(url) && !/_print.html/.test(url) && (url != "http://www.washingtonpost.com/") ) {

  url = url.replace('_story.html', '_print.html');
  window.location.href = url;
}
  

// Work on links opened from washingtonpost.com

var all, element;

all = document.getElementsByTagName('a');

for (i = 0; i < all.length; i++) {

    element = all[i];
    
    if ( /_story.html/.test(element.href) && !/_print.html/.test(element.href) )
      element.href = element.href.replace (/_story.html/g, '_print.html');
}