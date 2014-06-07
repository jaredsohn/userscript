// ==UserScript==
// @name Close Me
// @description Close the current window if its URL matches one of the specified string.
// @run-at document-start
// @include *
// ==/UserScript==

(function() {
  var sites = [
    // Add domains for windows to close here. For example:
    // 'annoyingad.com',
    // 'anotherad.com'
  ]
  
  sites.forEach(function(site) { if ( window.location.hostname.match(site) ) window.close() })
})()
