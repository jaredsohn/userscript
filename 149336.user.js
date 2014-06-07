// ==UserScript==
// @name Collapse Kayako Response
// @namespace https://gist.github.com
// @version 0.3.1
// @include http://imatrixsupport.com/staff/index.php*
// @grant Sandbox
// ==/UserScript==

//  Licensed under the MIT license: http://opensource.org/licenses/MIT

// Enable or disable GreaseMonkey function, GM_log
var GM_Debug = 0;

// Access jQuery as loaded by Kayako
var $ = unsafeWindow.jQuery;

if (!GM_Debug) {
  var GM_log = function() {
  };
}
// If FireBig is active, send GM log events to FB.
if (unsafeWindow.console && GM_Debug) {
  var GM_log = unsafeWindow.console.log;
}

GM_log("Running collapse kayako response script"); // Debug

// Don't run on frames or iframes.
if (window.top !== window.self) {
  return;
}

waitForKeyElements(".ticketpostcontainer", addIcon);

function addIcon($el) {
  var curElement = $el.get(0);
  var p = document.createElement('p');
  var a = document.createElement('a');
  var span = document.createElement('span');
  var strong = document.createElement('strong');
  GM_log("Node: " + curElement.className); // Debug

  var node = curElement.getElementsByClassName('ticketpostbarname');
  var posterName = node[0].textContent;
  GM_log("Poster Name: " + node[0].textContent); // Debug

  node = curElement.getElementsByClassName('ticketbarcontents');
  var postDate = node[0].textContent;
  GM_log("Post Date: " + node[0].textContent); // Debug

  styleLink(a);
  styleParagraph(p);
  styleSpan(span);
  styleStrong(strong);

  p.appendChild(a);
  p.appendChild(span);
  $('p').attr('class', 'collapseResponse');
  
  a.appendChild(document.createTextNode('-'));
  a.addEventListener("click", toggle, false);

  span.appendChild(strong);
  span.appendChild(document.createTextNode(" (" + postDate + ")"));
  $('span').attr('class', 'collapseToolTip');

  strong.appendChild(document.createTextNode(' ' + posterName));

  curElement.parentNode.insertBefore(p, curElement);
  GM_log("Inserting element"); // Debug

  function toggle(e) {
    if (this.firstChild.nodeValue === '-') {
      this.parentNode.nextSibling.style.display = 'none';
      this.firstChild.nodeValue = '+';
      this.nextSibling.style.display = 'inline';
    } else {
      this.parentNode.nextSibling.style.display = 'block';
      this.firstChild.nodeValue = '-';
      this.nextSibling.style.display = 'none';
    }
    e.preventDefault();
  }

  function styleLink(a) {
    a.href = '#';
    a.style.fontWeight = 'bold';
    a.style.background = '#F6F1E7';
    a.style.border = '1px solid #cccccc';
    a.style.color = '#B24C58';
    a.style.textDecoration = 'none';
    a.style.width = '15px';
    a.style.height = '15px';
    a.style.textAlign = 'center';
    a.style.fontSize = '100%';
    a.style.margin = '0 5px 5px 8px';
    a.style.cssFloat = 'left';
    a.style.display = 'block';
    a.style.lineHeight = '13px';
  }

  function styleParagraph(p) {
    p.style.margin = '0 0 0 0';
    p.style.lineHeight = '16px';
    p.style.clear = 'both';
    p.style.height = '15px';
  }

  function styleSpan(span) {
    span.style.display = 'none';
    span.style.color = '#666666';
  }

  function styleStrong(strong) {
    strong.style.color = '#B24C58';
  }

}

/*
 * waitForKeyElements(): A utility function, for Greasemonkey scripts,
 * that detects and handles AJAXed content.
 */
function waitForKeyElements(selectorTxt,
/*
 * Required: The jQuery selector string that
 * specifies the desired element(s).
 */
actionFunction,
/*
 * Required: The code to run when elements are
 * found. It is passed a jNode to the matched
 * element.
 */
bWaitOnce,
/*
 * Optional: If false, will continue to scan for
 * new elements even after the first match is
 * found.
 */
iframeSelector
/*
 * Optional: If set, identifies the iframe to
 * search.
 */
) {
  var targetNodes, btargetsFound;

  if ( typeof iframeSelector == "undefined")
    targetNodes = $(selectorTxt);
  else
    targetNodes = $(iframeSelector).contents().find(selectorTxt);

  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true;
    /*
     * Found target node(s). Go through each and act if they
     * are new.
     */
    targetNodes.each(function() {
      var jThis = $(this);
      var alreadyFound = jThis.data('alreadyFound') || false;

      if (!alreadyFound) {
        //  Call the payload function.
        var cancelFound = actionFunction(jThis);
        if (cancelFound)
          btargetsFound = false;
        else
          jThis.data('alreadyFound', true);
      }
    });
  } else {
    btargetsFound = false;
  }

  // Get the timer-control variable for this selector.
  var controlObj = waitForKeyElements.controlObj || {};
  var controlKey = selectorTxt.replace(/[^\w]/g, "_");
  var timeControl = controlObj[controlKey];

  // Now set or clear the timer as appropriate.
  if (btargetsFound && bWaitOnce && timeControl) {
    // The only condition where we need to clear the timer.
    clearInterval(timeControl);
    delete controlObj[controlKey]
  } else {
    // Set a timer, if needed.
    if (!timeControl) {
      timeControl = setInterval(function() {
        waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector);
      }, 500);
      controlObj[controlKey] = timeControl;
    }
  }
  waitForKeyElements.controlObj = controlObj;
}