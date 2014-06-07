/*

How to Install a Greasemonkey Script
====================================

- You need the Firefox web browser - Download and install
  http://www.mozilla.com/en-US/firefox/

- You need to install Greasemonkey - How-To
  http://internetducttape.com/2007/08/23/howto-install-firefox-extensions-screenshots/

- Install this script - How-To
  http://internetducttape.com/2007/08/24/howto-use-firefox-greasemonkey-userscripts-screenshots/

*/


/*
What Does This Script Do?

Userscripts.org Rank by Popularity changes the icons in search results to give a quick indication of how popular a script is. This makes it easier to wade through search results to find the most popular scripts.

For screenshots see:
http://userscripts.org/scripts/show/11676

*/
// ==UserScript==
// @name           Userscripts.org Rank by Popularity
// @namespace      http://internetducttape.com
// @description    Makes more popular userscripts jump out
// @version        0.3
// @include        http://userscripts.org/*
// ==/UserScript==


(function() {
   autoUpdateFromUserscriptsDotOrg({
     name: 'Userscripts.org Rank by Popularity',
 	url: 'http://userscripts.org/scripts/source/11676.user.js',
 	version: "0.3",
 	});

  rankPopular();
 })();

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function rankPopular() {
  var rows = $x("/html/body/div[2]/div/table/tbody/tr");
  // /html/body/div[@class='container']/div[@class='content']/table[@class='wide']/tbody/tr");
  rows.forEach(function(r) {
		 // /html/body/div[2]/div/table/tbody/tr[14]/td[4]
		   var tds = $x(".//td", r);
		   if (tds.length >= 3) {
		     var installs = tds[3].innerHTML;
		     installs = parseInt(installs, 10);
		     var multiplier = 0;
		     if (installs > 150) {
		       multiplier = 1;
		     }
		     if (installs > 350) {
		       multiplier = 2;
		     }
		     if (installs > 600) {
		       multiplier = 3;
		     }
		     if (installs > 1100) {
		       multiplier = 4;
		     }
		     if (installs > 5000) {
		       multiplier = 5;
		     }
		     // /html/body/div[2]/div/table/tbody/tr[2]/td/a/img
		     var icon = $x(".//td/a/img", r);
		     if (icon.length > 0) {
		       if (multiplier == 0) {
			 icon[0].parentNode.removeChild(icon[0]);
		       }
		       else {
			 for (var i=2; i<multiplier; i++) {
			   var icon2 = icon[0].cloneNode(false);
			   insertAfter(icon2, icon[0]);
			 }
		       }
		     }
		   }
	       });
}


function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

// Auto Update script
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
