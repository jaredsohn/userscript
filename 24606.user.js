/*
	FriendFeed Show Domains
	http://ffapps.com/showdomains
*/

// ==UserScript==
// @name           FriendFeed Show Domains
// @namespace      http://ffapps.com/showdomains
// @description    Displays the domain name for all shared links
// @include        http://friendfeed.com/*
// @version        0.1
// ==/UserScript==

var ffshowdomains_version = "0.1";

const FFSD_DOMAINS_TO_EXPAND = {
	"feeds.feedburner.com": "feedburner - ",
	"feeds.gawker.com": "gawker - "
};

const FFSD_DOMAINS_TO_IGNORE = {
	"youtube.com": "",
	"seesmic.com": "",
	"yelp.com": "",
	"last.fm": "",
	"pownce.com": ""
};

(function() {

  autoUpdateFromUserscriptsDotOrg({
    name: 'FriendFeed Show Domains',
		url: 'http://userscripts.org/scripts/source/24606.user.js',
		version: ffshowdomains_version,
	});

	function ff_show_domains() {
		$("a.main").each(function() {
			var uri = $(this).attr('href').replace('www.','').split('/');
			var domain = uri[2];
			if (domain in FFSD_DOMAINS_TO_EXPAND) {
				domain = FFSD_DOMAINS_TO_EXPAND[domain] + uri[4];
			}
			if (!(domain in FFSD_DOMAINS_TO_IGNORE)) {
				$(this).after('<span style="color:gray;font-size:11px;">&nbsp;&nbsp;(' + domain + ')</span>');
			}
		});
	}

  function lets_jquery() {
		ff_show_domains();
	}

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; lets_jquery(); }
  }

  jquery_wait();

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