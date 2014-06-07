// ==UserScript==
// @name           Google Reader Favicons in Post Headers
// @description    Adds a favicon to the "from Some Blog Name" line when viewing entries from more than one feed in Google Reader. Makes it easier to tell what feed an entry is from. Will only retrieve icons from feeds you follow (e.g. not "Explore" feeds) for technical reasons. Compatible with Firefox and WebKit (Chrome, Safari, Fluid.app).
// @namespace      http://henrik.nyh.se
// @include        http://www.google.tld/reader/*
// ==/UserScript==

addStyle(
  " .entry-source-title { background: url(http://s2.googleusercontent.com/s2/favicons?domain=&alt=feed) no-repeat top left; padding-left: 18px !important } " +
  " .collapsed .entry-source-title { width: 10em !important } "
);

var feedToFavicon = {};
buildFeedToFavicon();

document.addEventListener('DOMNodeInserted', setFaviconOnEntries, false);

// Get feed and favicon info from the "Subscriptions" tree in the sidebar.
function buildFeedToFavicon() {
  var links = $A(document.getElementById('sub-tree').getElementsByClassName("link"));

  var url, favicon, title;
  links.forEach(function(link) {
    url = link.href;
    if (url.indexOf('/reader/view/feed') !== -1) {
      favicon = link.children[0].style.cssText.match(/url\((.*?)\)/)[1];
      title = link.children[1].title.replace(/ \(\d+\)$/, '');
      // Map titles because collapsed "List" view doesn't have URLs.
      feedToFavicon[title] = favicon;
      // Map URLs as they are more unique than titles and never truncated.
      feedToFavicon[url] = favicon;
    }
  });  
}


function setFaviconOnEntries(event) {
  var t = event.target;
  var c = t.className;
  var source, favicon, isExpandedEntry, isExpandingEntry;
  isExpandedEntry = c.indexOf("entry ") === 0;  // In "Expanded" view, or collapsed entry in "List" view.
  isExpandingEntry = c == "entry-container";    // In "List" view, just expanded this entry.
  if (isExpandedEntry || isExpandingEntry) {  
    
    source = t.getElementsByClassName('entry-source-title')[0];
    favicon = feedToFavicon[source.href || source.innerText];
    
    if (favicon) {
      source.style.backgroundImage = 'url('+favicon+')';
    }    
  }
}


// For non-Firefox browsers.
function addStyle(css) {
  var s = document.createElement('style');
  s.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(s);
}

// Turn a collection into a proper array.
function $A(list) {
  return Array.prototype.slice.call(list);
}
