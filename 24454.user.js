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

  --------------------------------------------------------------------
*/

// ==UserScript==
// @name           Friend Feed Even More Expander
// @namespace      http://internetducttape.com
// @description    Expands all of the '5 more ...' links on Friend Feed
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @version        0.3
// ==/UserScript==

var friendfeedevenmore_version = "0.3";

(function() {
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Even More Expander',
	url: 'http://userscripts.org/scripts/source/24454.user.js',
	version: friendfeedevenmore_version,
	});
  function clickhandler_wait() {
    if(typeof unsafeWindow.clickHandlers == 'undefined') { window.setTimeout(clickhandler_wait,100); }
    else {
      addFilter(function (node) {
		  //		  		  console.log( "expanding mores", unsafeWindow.$(node).find('a.l_more') );
		  //		  		  unsafeWindow.$(node).find('a.l_more').parents('div.entries').css('border','1px solid red');
		  unsafeWindow.$(node).find('a.l_more').each( function() {								
								unsafeWindow.clickHandlers.more( unsafeWindow.$(this) );		  
							      });
		});
    }
  }
  clickhandler_wait();

 })();

function addFilter(func, i) {
	i = i || 4;
	// Have to wait until the Fixer is loaded, otherwise the entry count will be screwed up.
	if (typeof window.IDT_FF_PAGERIZATION_FIXER == 'undefined') {
	  setTimeout(arguments.callee, 200, func, i);
	}
	else if (window.AutoPagerize && window.AutoPagerize.addFilter) {
	  //	  console.log("Check if other fixer is loaded: ", window.IDT_FF_PAGERIZATION_FIXER);
	  func(document);
	  //      console.log("adding filter for even more expander");
	  window.AutoPagerize.addFilter(function (nodes) {
						func(unsafeWindow.$(nodes[0]).parents('.feed'));
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


