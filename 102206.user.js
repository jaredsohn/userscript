// ==UserScript==
// @name           Rllmuk Topic Pagination Tweak
// @namespace      https://github.com/insin/greasemonkey
// @description    Changes topic pagination links from 1-2-3-99 format to 1-97-98-99 format
// @include        http://rllmukforum.com/*
// @include        http://www.rllmukforum.com/*
// ==/UserScript==

/* Changelog
 * ---------
 * 2012-02-01 Updated for IPB 3.2.
 * 2011-05-03 Initial version.
 * -------------------------------------------------------------------------- */

// Don't do anything if we're not on a topic listing page
if (window.location.href.indexOf("module=search") == -1 &&
    window.location.href.indexOf("index.php?/forum") == -1) {
  return
}

var startIndexRE = /(\d+)$/

var paginators = document.querySelectorAll("ul.mini_pagination")

for (var i = 0, paginator; paginator = paginators[i]; i++) {
  var links = paginator.getElementsByTagName("a")
  if (links.length < 4) {
    // Nothing to do - less than 4 links
    continue
  }

  var lastPage = parseInt(links[3].textContent, 10)
  if (lastPage == 4) {
    // Nothing to do - pages 1-4 being displayed
    continue
  }

  // Determine number of posts per page from second link
  var postsPerPage = parseInt(startIndexRE.exec(links[1].href)[1], 10)

  // Set new page numbers and start indices on middle 2 links
  links[1].href = links[2].href.replace(startIndexRE, (postsPerPage * (lastPage - 3)))
  links[1].textContent = lastPage - 2
  links[1].title = "Go to page " + (lastPage - 2)
  links[2].href = links[2].href.replace(startIndexRE, (postsPerPage * (lastPage - 2)))
  links[2].textContent = lastPage - 1
  links[2].title = "Go to page " + (lastPage - 1)
}
