// ==UserScript==
// @name LastSlacker
// @namespace http://lastslacker.com
// @description Load LastSlacker every time you visit Slacker.
// @include http://www.slacker.com/
// ==/UserScript==

function inject_lastslacker() {
  if (document.getElementById('lastslacker-bootstrap')) { /* Don't install twice */
    return;
  }
  var bootstrap = document.createElement('script');
  bootstrap.setAttribute('src', 'http://lastslacker.com/slacker/client/bootstrap.js?lastfm=1');
  bootstrap.setAttribute('type', 'text/javascript');
  bootstrap.setAttribute('id', 'lastslacker-bootstrap');
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(bootstrap);
}

function wait_for_player() {
  var iframe = document.getElementById('player');
  if (!iframe)
    return;

  /* When we get the event, the iframe will be 'this', but the lastslacker
   * script needs to run in the context of the main window.
   */
  var w = this;
  iframe.addEventListener('load', 
      function() { inject_lastslacker.call(w) },
      true);
}

document.body.addEventListener('load', wait_for_player, true);
