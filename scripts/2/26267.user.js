// ==UserScript==
// @name          Periodically refresh Beanstalk Activity overview
// @namespace     http://www.dweebd.com/
// @description   Refreshes the Beanstalk overview page every 10 minutes
// @author        Duncan Beevers
// @homepage      http://www.dweebd.com/
// ==/UserScript==

(function () {
if (window.fluid && window.location.href.match(/beanstalkapp.com\/\w+[^\/]$/)) {
  var minutes = (60 * 1000);
  window.setTimeout(function() {
    window.location.reload();
  }, 10 * minutes );
}
})();