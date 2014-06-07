// ==UserScript==
// @name        jQuery Anywhere
// @namespace   https://userscripts.org/users/476432
// @description Load jQuery in any page that doesn't already load it.
// @include     *.*
// @version     1.0
// ==/UserScript==

var jQueryAnywhere = function() {

  // Remove the listener that called this function.
  document.removeEventListener("load",jQueryAnywhere,true);

  // If jQuery is already loaded by the page, we won't do anything.
  if (typeof unsafeWindow.jQuery == 'undefined') {
    
    // We'll check for conflicting libraries and use .noConflict() if needed.
    jQueryNoConflict = false;
    if (typeof unsafeWindow.$ == 'function') {
      jQueryNoConflict = true;
    }

    // This function will load a script and add it to the document.
    function getScript(url, success) {
      
      // Create the new element.
      var script = document.createElement('script');
      script.src = url;

      // We'll be appending to <head>
      var head = document.getElementsByTagName('head')[0];

      var done = false;

      // Attach events for when the script is loaded.
      script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
          done = true;
          // Call the callback function.
          success();
          // Clean up.
          script.onload = script.onreadystatechange = null;
          head.removeChild(script);
        };
      };
      // Append the new script element.
      head.appendChild(script);
    };

    // Call the getScript function with a URL for jQuery and a callback function.
    getScript('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', function() {
      // If jQuery fails to load, we give up quietly.
      if (typeof unsafeWindow.jQuery != 'undefined') {
        // If we detected a conflicting library, call .noConflict().
        if (jQueryNoConflict) {
          unsafeWindow.jQuery.noConflict();
        }
      }
    });

  };

};

/*
 * We'll insert jQuery after the page has fully loaded. If the page is going
 * to load jQuery on it's own, we want to give it that opportunity, and this
 * script by itself won't do anything that requires jQuery to be loaded any
 * earlier.
 */
document.addEventListener("load",jQueryAnywhere,true);
