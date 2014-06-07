// ==UserScript==
// @name	New York Times (NYT) Sanity
// @namespace	http://www.thehuey.com/blog/
// @description	Changes NYT article source to stop the doubleclick dictionary popup -- modifies code included in  altClickToSearch.js
// @include http://*.nytimes.com/*
// ==/UserScript==

/* Works for FF 3.
// comments welcome: puzzlesolutions@gmail.com
*/

location.href = 'javascript:(' + encodeURI(uneval(
  function () {
  var mytimer = setInterval(function() {
    if (window.LaunchWBQuery) {
	document.removeEventListener('dblclick', window.ActivateAnswers, true);
    	window.LaunchWBQuery = function () {};
        clearInterval(mytimer);
    } else {
    clearInterval(mytimer);
    }
  }, 200);
  }
)) + ')();';