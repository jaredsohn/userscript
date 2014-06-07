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
// @name           Friend Feed Show Names
// @namespace      http://internetducttape.com
// @description    Show the usernames as well as full names on the friend and public timelines
// @include        http://friendfeed.com*
// @exclude        http://friendfeed.com/setting*
// @exclude        http://friendfeed.com/account*
// @version        0.11
// ==/UserScript==

var friendfeedshownames_version = 0.11;

(function() {
  // Script updates itself every two weeks.
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Show Names',
	url: 'http://userscripts.org/scripts/source/25832.user.js',
	version: friendfeedshownames_version,
	});

  window.IDT_SHOW_NAMES = function() {
    unsafeWindow.jQuery('.l_popup').each(function() {
					   if (-1 == this.textContent.indexOf('/')) {
        this.textContent = this.textContent + this.pathname;
     }
					 });
  }

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { window.IDT_SHOW_NAMES(); }
  }
  jquery_wait();
  addFilter(window.IDT_SHOW_NAMES);

    function addFilter(func, i) {
      i = i || 4;
      if (window.AutoPagerize && window.AutoPagerize.addFilter) {
	window.AutoPagerize.addFilter(function (nodes) {
					func();
				      });
      }
      else if (i > 1) {
	setTimeout(arguments.callee, 1000, func, i - 1);
      }
      else {
	(function () {
	  func(document);
	  setTimeout(arguments.callee, 200);
	})();
      }
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

