/*
--------------------------------------------------------------------
  How to Install a Greasemonkey Script
--------------------------------------------------------------------

- You need the Firefox web browser - Download and install
  http://www.mozilla.com/en-US/firefox/

- You need to install Greasemonkey - How-To
  http://internetducttape.com/2007/08/23/howto-install-firefox-extensions-screenshots/

- Install this script - How-To
  http://internetducttape.com/2007/08/24/howto-use-firefox-greasemonkey-userscripts-screenshots/

*/

// ==UserScript==
// @name           Friend Feed Tweak Refresh Rate
// @namespace      http://internetducttape.com
// @description    Tweak the refresh rate for Friend Feed
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/setting*
// @exclude        http://friendfeed.com/account*
// @version        0.1
// ==/UserScript==


var friendfeedtweakrefresh_version = 0.1;

(function() {
  // Script updates itself every two weeks.
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Tweak Refresh Rate',
	url: 'http://userscripts.org/scripts/source/25341.user.js',
	version: friendfeedtweakrefresh_version,
	});

  window.IDT_TWEAK_REFRESH = function(value) {
    if(typeof unsafeWindow.autoRefresher == 'undefined') {
      window.setTimeout(function() { window.IDT_TWEAK_REFRESH(value); }, 100);
    }
    else {
      unsafeWindow.autoRefresher.refreshInterval = value;
    }
  };

  function tweak_refresh_ui() {
    var value = 0;
    while (value < 2) {
      value = parseInt(prompt("How often do you want Friend Feed to auto-refresh?\n\n\nEnter the number minutes (minimum of 2 minutes)", 2));
      if (value < 2) {
	alert("You must enter a number greater than 2 minutes.");
      }
    }
    var tweak_value = 60000*value;
    GM_setValue('IDT_TWEAK_REFRESH_VALUE', tweak_value)
    window.IDT_TWEAK_REFRESH(tweak_value);
  };


  GM_registerMenuCommand('Friend Feed: Tweak Refresh Rate', tweak_refresh_ui); 
  var tweak_value = GM_getValue('IDT_TWEAK_REFRESH_VALUE', 0);
  if (tweak_value < 120000 ) {
    tweak_refresh_ui();
  }
  else {
    window.IDT_TWEAK_REFRESH(tweak_value);
  }
 })();


function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   name: 'RSS+Atom Feed Subscribe Button Generator',
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}
