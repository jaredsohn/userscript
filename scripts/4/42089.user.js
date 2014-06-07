// ==UserScript==
// @name          Page Reloader
// @description   Refreshes the page after some time
// @include       *
// @exclude
// @namespace     
// ==/UserScript==

(function() 
{
  const DELAY = 4 * 60 * 1000; // 21 minutes in milliseconds

  var lastaction = (new Date()).getTime();
  setInterval(function check() 
  {
    if(lastaction + DELAY < (new Date()).getTime()) 
    {
      location.reload();
      lastaction = lastaction * 10; // give the browser time to load the page
    }
  }, 30);

  function updateTime() 
  {
    lastaction = (new Date()).getTime();
  }

})();
//pagereloader.user.js