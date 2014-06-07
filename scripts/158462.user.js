// ==UserScript==
// @name        Chrome Webstore Developer Dashboard fixes
// @description Fixes shortcomings in Chrome Webstore's dev dashboard (ratings & review)
// @namespace   Rob W
// @author      Rob Wu <gwnRob@gmail.com>
// @match       *://chrome.google.com/webstore/developer/dashboard*
// @match       *://chrome.google.com/webstore/developer/edit/*
// @match       *://chrome.google.com/webstore/detail/*
// @version     1.2
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

// See comment headers before each section to see what the script does.

try{



(function() { if (location.pathname.indexOf('/webstore/developer/dashboard') != 0) return;
function getStarSrc(value, floor) {
    // Full star  if value >= floor + 0.75
    // Half star  if value >= floor + 0.25
    // No   star  otherwise
    return value >= floor + 0.75 ? 
      // Full star
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAQAAADI+WwIAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAACXZwQWcAAAALAAAACgCF+qVAAAAAhUlEQVQI103NMQqCABgF4C+Fxg7QHDQ0JkFnaKqlKJBu4Np9hEDoBq2doCYP0B4UBKLYUKZvex+P/+9N/dJ3FXl9S9CopbF9U1pOkAgb3irVanOMlGqldeBoo9CmspMFOFmp/hzLmtuXzvrWvpwJFVJvLLqci8Qmzl8OhzBwcMdD6ilXfwAd9B9f78yTCQAAAABJRU5ErkJggg=='
      :
      value >= floor + 0.25 ?
      // Half star
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAQAAADI+WwIAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAJdnBBZwAAAAsAAAAKAIX6pUAAAACTSURBVAjXTY0xCsJAEEVfdiEgpPAWFpYTvMRWSioDwdIuh7GydbEIeAM7sU1lo42tR1CEdSzMJk4178H/H7qTVK4+A0URTNTMmZhVhEHXMK69/UEiS3Z0sOGOQqBMQAr2pABbgKDlujHQHlgQYpdWeRO7z/0Cj8swOcPyxvOEl/vXN/K2+kw5Zq4PipNR/E+Ft8IX7yMjsFUGo0cAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAAAElFTkSuQmCC'
      :
      // No star (with border)
      'data:image/gif;base64,R0lGODdhCgAJAIQAAGxubLS2tJSSlNTa3KSmpOTq7KyurISChHx6fMTGzKSipNza3KyqrOzy9LSytHRydLS6vJyanKSqrKyutISGhNze3PT2/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACgAJAAAFNKAlWs9oWsmRnCJiUGJjAZJiNIEilQmxNMCFBCIyCAaNQYRhEhQcFcLp8ThQTZKDzEKRiEIAOw=='
      // No star (without border)
      //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAQAAADI+WwIAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAACXZwQWcAAAALAAAACgCF+qVAAAAAo0lEQVQI1z2NMQrCQBRE32YxGFDwBGJnYZkll0ilpDISLO28k4lFwN7CTsTKSisbK8ELCJFI/BZJdn41j/kzSqiVuZ3r1yzeAAanoajpcOwsW2dxf+0yWGe6CaVzNmgY4VHyQKAiVsIlUlvc9otK4lXugNnJjKqlkpi86X6exIZfNztZBGhKUgr4hBZ3A3UX4ye/CYdeWHch7MOzJ9R3jFLt8we7izGyoi32iQAAAABJRU5ErkJggg=='
      ;
}
function setRating(targetElement, extensionID, ratingCount, ratingValue, _hasRunOnce) {
    if (ratingCount !== null) {
        targetElement.textContent = ratingCount;
        if (+ratingCount > 0) {
            targetElement.parentNode.style.color = 'black';
        }
    } else {
        console.warn('ratingCount is null!');
    }
    
    if (ratingValue !== null) {
        var avgRatingElem = document.querySelector('span[g\\:type=AverageStarRating][g\\:url*=' + extensionID + ']');
        if (avgRatingElem) {
            var starsElems = avgRatingElem.querySelectorAll('span[role=img] > img');
            var container;
            if (starsElems.length == 5) {
                container = starsElems[0].parentNode;
                for (var i=0; i<=4; ++i) {
                    // Hide original image and append new image
                    // Chrome webstore has a special treatment for the first five images
                    // so this is necessary (otherwise, the images would be reset on hover)
                    starsElems[i].style.display = 'none';
                    container.appendChild(new Image()).src = getStarSrc(+ratingValue, i);
                }
            } else if (starsElems.length === 0) {
                // Work-around for layout issue around 29 July
                container = avgRatingElem;
                for (var i=0; i<=4; ++i) {
                    container.appendChild(new Image()).src = getStarSrc(+ratingValue, i);
                }
            }
            if (container) container.title = ratingValue;
        }
    } else {
        console.warn('ratingValue is null!');
    }
    
    if (_hasRunOnce) return;
    // If the page loads slowly, Chrome overwrites the rating values.
    // To counter this, monitor the state of the ratingCount field
    // (example: Chrome may change "(0)" to "(00)" (note appended 0))
    var poller = setInterval(function() {
        if (targetElement.textContent !== ratingCount) {
            setRating(targetElement, extensionID, ratingCount, ratingValue, true);
            clearInterval(poller);
        }
    }, 200);
    setTimeout(function(){clearInterval(poller)}, 4000);
}
function fixRatingView() {
  [].forEach.call(document.querySelectorAll('span[g\\:type=NumRatings]'), function(numRatingElem) {
    var extensionID = /[?&]id=([^=]+)/.exec(numRatingElem.getAttribute('g:url'));
    if (!extensionID) return; // Webstore finally changed (hopefully fixing the bug), silently quit
    extensionID = extensionID[1];
    var targetElement = numRatingElem.firstElementChild || numRatingElem;
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://chrome.google.com/webstore/detail/' + extensionID,
        onload: function(response) {
            var ratingCount = /<meta itemprop="ratingCount" content="(\d+)"/.exec(response.responseText);
            var ratingValue = /<meta itemprop="ratingValue" content="([0-9.]+)"/.exec(response.responseText);
            if (ratingCount) ratingCount = ratingCount[1];
            if (ratingValue) ratingValue = ratingValue[1];
            if (ratingCount || ratingValue) {
                setRating(targetElement, extensionID, ratingCount, ratingValue);
            }
        }
    });
  });
}
if (document.readyState == 'complete')
    fixRatingView();
else
    document.addEventListener('DOMContentLoaded', fixRatingView);
})(); // End of dashboard stuff




//
// - Put extensions in a fixed order
// - Scroll to it
// - Wrap header in link to same page
// - Update # links where possible
// - Compact layout
//
(function() { if (location.pathname.indexOf('/webstore/developer/dashboard') != 0) return;
    function renderBoxes() {
        var items = document.querySelectorAll('#cx-dev-dash > .cx-dev-dash-item');
        var i = items.length;
        if (i < 2) {
            console.log('COUNT(.cx-dev-dash-items) = ' + i);
            return;
        }
        var nextSibling = items[i-1].nextSibling;
        var parentNode = items[0].parentNode;
        var nodes = [];
        var item;
        while (i--) {
            item = items[i];
            nodes.push({
                title: item.querySelector('h2').textContent.trim(),
                node: item
            });
        }
        nodes.sort(function(x, y) {
            return x.title.localeCompare(y.title);
        });
        while ( (item = nodes.shift()) ) {
            parentNode.insertBefore(item.node, nextSibling);
        }
        
        document.getElementById('cx-dev-dash-head').scrollIntoView();
        
        // Wrap link
        var h2 = document.querySelector('.cx-dev-dash-name h2');
        if (h2) {
            var a = document.createElement('a');
            a.href = location.href;
            h2.insertBefore(a, h2.firstChild);
            a.appendChild(a.nextSibling);
        }
        
        // Change # urls
        [].forEach.call(document.querySelectorAll('a[href*="#"][onclick*="return false"]'), function(a) {
            var id, type, s_onclick = a.getAttribute('onclick');
            var match = s_onclick.match(/performAction\(\s*(["'])([a-z]{32})\1\s*,\s*(["'])(\w+)\3/);
            if (match) {
                id = match[2];
                type = match[4];
            } else if ( (match = s_onclick.match(/cxViewAppSupport\(\s*(["'])([a-z]{32})\1\s*/)) ) {
                id = match[2];
                type = '_support';
            } else {
                return;
            }
            var url;
            switch (type) {
                case 'EDIT':
                    url = 'https://chrome.google.com/webstore/developer/edit/' + id;
                break;
                case '_support':
                    url = 'https://chrome.google.com/webstore/developer/support/' + id;
                break;
            }
            if (url) {
                a.onclick = function() {};
                a.href = url;
            }
        });
    }
if (document.readyState == 'complete')
    renderBoxes();
else
    document.addEventListener('DOMContentLoaded', renderBoxes);
// Compact styles
GM_addStyle([
'#cx-dev-dash .cx-box.cx-dev-dash-item {',
'  padding: 5px',
'}',
'.cx-title h2 {',
'  font-size: 13px;',
'  white-space: pre;',
'}',
'.cx-rating {',
'  width: 100px;',
'}',
'.cx-rating, .cx-rating + .cx-dev-dash-action {',
'  float: left;',
'}'
].join('\n'));
})();



//
// Allow scrolling "Promo tile preview"
//
(function() { if (location.pathname.indexOf('/webstore/developer/edit/') != 0) return;
  GM_addStyle([
// Override .cx-dialog{position:fixed; for a particular dialog}
'#id-tile-preview.cx-dialog {position:absolute;}'
].join('\n'));
/* https://chrome.google.com/webstore/jserror?script=...&error&line=Not%20available
[Anonymous](object, object)
[Anonymous](object, Could not find an expected div css-pixel..., undefined)
[Anonymous](object, Could not find an expected div css-pixel...)
[Anonymous](object)
g()
[end]
context.log-level:SEVERE
context.message:Could not find an expected div css-pixel-resolution-test*/
  var d = document.createElement('div');
  d.className = 'css-pixel-resolution-test';
  (document.body||document.documentElement).appendChild(d);
})();



//
// Enable reviewing / rating of extensions
//

(function() { if (location.pathname.indexOf('/webstore/detail') != 0) return;
var s = document.createElement('script');
s.textContent = '(' + function() {

  // A wealth of information about the internal APIs can be derived from the unit tests and the source code:
  // http://src.chromium.org/svn/trunk/src/chrome/test/data/extensions/api_test/webstore_private/
  // http://src.chromium.org/svn/trunk/src/chrome/browser/extensions/api/webstore_private/
  // Management API:
  // http://developer.chrome.com/extensions/management.html

  if (window.chrome) {
    console.log('The global chrome object is already defined! Aborted script.');
    return;
  }
  var chrome = window.chrome = {};

  // Minimal implementation of chrome.Event
  chrome.Event = function(opt_eventName) {
    this.eventName_ = opt_eventName;
    this.listeners_ = [];
  };
  chrome.Event.prototype = {
    addListener: function(cb) {
      typeof cb == 'function' && this.listeners_.push(cb);
    },
    removeListener: function(cb) {
      var index = this.listeners_.indexOf(cb);
      if (cb != -1) this.listeners_.splice(index, 1);
    },
    dispatch: function(varargs) {
      varargs = varargs ? [].slice.call(varargs) : [];
      this.listeners_.slice(0).forEach(function(cb) {
          try {
            cb.apply(null, varargs);
          } catch (e) {
            window.console && console.error && console.error('chrome.Event.dispatch error: ' + e);
          }
      });
    }
  };

  chrome.management = {};
  chrome.management.onInstalled = new chrome.Event('management.onInstalled');
  chrome.management.onUninstalled = new chrome.Event('management.onUninstalled');
  chrome.management.onEnabled = new chrome.Event('management.onEnabled');
  chrome.management.onDisabled = new chrome.Event('management.onDisabled');
  chrome.management.getAll = function(callback) {
    var result = [];
    var currentExtensionID = location.pathname.match(/\/([a-z]{32})(\/|$)/);
    if (currentExtensionID) crx(currentExtensionID[1]);
    callback(result);
    
    // Shortcut for defining "installed" extensions
    function crx(id) {
      result.push({id: id}); // <-- Partial implementation of "ExtensionInfo" type
    }
  };
  chrome.management.uninstall = function(id, opt_options, opt_callback) {
    var extensionInfo = {id: id}; // <-- Partial implementation
    chrome.management.onUninstalled.dispatch(extensionInfo);
  };
  chrome.management.launchApp = function() {
    notImplemented('chrome.management.launchApp');
  };

  chrome.webstorePrivate = {};
  chrome.webstorePrivate.beginInstallWithManifest3 = function(details, callback) {
    notImplemented('chrome.webstorePrivate.beginInstallWithManifest3');
  };
  chrome.webstorePrivate.completeInstall = function(id, callback) {
    notImplemented('chrome.webstorePrivate.completeInstall');
  };
  chrome.webstorePrivate.getBrowserLogin = function(callback) {
    var result = {login: ""};
    callback(result);
  };

  chrome.csi // Can be implemented using performance API. Not necessary

  function notImplemented(method) {
    alert(method + ' is not implemented\n' + Error().stack);
    //throw Error(method + ' is not implemented');
  }
} + ')()'; // End of s.textContent = ...;
(document.head||document.documentElement).appendChild(s);
s.parentNode.removeChild(s);

})(); // End of extension page fix
  



} catch(e){console.error(e);console.trace();}
