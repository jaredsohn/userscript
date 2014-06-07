(function () {
  "use strict";

// ==UserScript==
// @name          RFC 2606§3 - JavaScript Click Event Unit Test (Sandboxed)
// @namespace     http://userscripts.org/users/37004
// @description   Tests out addEventListener "click" in the Sandbox
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.0

// @include       http://www.example.com/*

// @grant         GM_log

// ==/UserScript==

  /**
   *
   * Check with about:config?filter=javascript.enabled toggled
   *
   */

  console.log('>');

  var thisNode = document.querySelector('h1');
  if (thisNode) {
    thisNode.addEventListener('click', function () {
      alert('You clicked this element with a textContent of: ' + thisNode.textContent);
    });
  }
  else {
    alert('Node not found');
  }

  console.log('<');

})();
