(function () {
  "use strict";

// ==UserScript==
// @run-at      document-start
// @name        uso - Retry
// @namespace   http://userscripts.org/users/37004
// @description Auto-Refreshes current URI on USO when a non-200 response code is encountered.
// @copyright   2011+, Marti Martz (http://userscripts.org/users/37004)
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license     Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version     0.1.2
// @icon https://www.gravatar.com/avatar/e615596ec6d7191ab628a1f0cec0006d?r=PG&s=48&default=identicon

// @include /^https?://userscripts\.org(?::\d{1,5})?/?/

// @include http://userscripts.org/*

// @include https://userscripts.org/*

// ==/UserScript==

  let
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      min = 750,
      max = 5000,
      timeout = min + Math.round(Math.random() * (max - min)),
      blocking = false
  ;

  if (MutationObserver) {
    let observer = new MutationObserver(
      function (aMutations) {
        aMutations.forEach(
          function (aMutation) {
            if (!blocking) {
              switch (aMutation.type) {
                case "childList":
                  let xpr = document.evaluate(
                    "//title",
                    headNode,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                  );
                  if (xpr && xpr.singleNodeValue) {
                    blocking = true;
                    observer.disconnect();

                    let thisNode = xpr.singleNodeValue;

                    switch (thisNode.textContent) {
                      case "502 Bad Gateway":
                      case "503 Service Unavailable":
                      case "404 Not Found":
                        setTimeout(function () { location.reload(); }, timeout);
                        break;
                    }
                  }
                  break;
              }
            }
          }
        );
      }
    );

    let headNode = document.head || document.getElementsByTagName("head")[0];
    if (headNode) {
      let config = { childList: true };
      observer.observe(headNode, config);
    }
    else
      console.error("Failed to get headNode");
  }
  else
    console.error("MutationObserver does not exist");

})();
