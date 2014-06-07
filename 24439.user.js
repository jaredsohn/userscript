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
// @name           Friend Feed Reshare Any Link
// @namespace      http://InternetDuctTape.com
// @description    ReShare any link on Friend Feed on *ANY* other service (using add2any.com)
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @version        0.2
// ==/UserScript==

var friendfeedreshare_version = "0.2";

(function() {
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed Reshare Any Link',
      url: 'http://userscripts.org/scripts/source/24439.user.js',
      version: friendfeedreshare_version,
      });

  window.IDT_POPUP_CALLBACKS = window.IDT_POPUP_CALLBACKS || [];

  window.IDT_POPUP_CALLBACKS.push(
				  {l:"Reshare original link", 
				      attrs:{'class':"noframe", href:'#'},
				      onclick:function (e) {
				      $ = unsafeWindow.$;
				      var link = $(e.currentTarget.parentNode.parentNode.menulink).parents('.entry').find('.main');
				      if ( link.html() ) {
					var href = 'http://www.addtoany.com/bookmark?linkname='+encodeURIComponent( link.html() )+'&linkurl='+encodeURIComponent( link.attr('href') );
					GM_openInTab(href);
				      }
				      else {
					alert("This service cannot be shared.");
				      }
				    }});

  // Hackery and Trickery abound. Create a callback wrapper that will dynamically
  // add links to the "More options" dropdown menu.

  if ('function' != typeof(unsafeWindow.origSetPopupMenu)) {
    if ('undefined' != typeof(window.IDT_POPUP_CALLBACKS)) {
      unsafeWindow.origSetPopupMenu = unsafeWindow.setPopupMenu;
      unsafeWindow.setPopupMenu = function(B, E) {
	window.IDT_POPUP_CALLBACKS.forEach(function(cb) {
					     B.push(cb);
					   });
	unsafeWindow.origSetPopupMenu(B, E);
      };
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


