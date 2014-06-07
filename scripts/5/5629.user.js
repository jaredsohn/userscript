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
/*
  --------------------------------------------------------------------
  WordPress Category Resizer
  --------------------------------------------------------------------

  * moves the category bar from the right sidebar to underneath the 
  post page
  * expands the categories to three evenly sized columns
  * removes category scrollbars (you can see all categories at once)
  * adds a link to the Save button after category editting
  */

// ==UserScript==
// @name          WordPress Category Resizer
// @namespace     http://engtech.wordpress.com/tools/wordpress/wpcatr/
// @description   Resizes Wordpress.com category sidebars
// @include       http://*/wp-admin/post.php?action=edit&post=*
// @include       http://*/wp-admin/post-new.ph*
// @version       1.0
// ==/UserScript==

/*
  2008/01/02 - v1.0
  - BUGFIX: newer versions of WordPress.com broke this script
  - BUGFIX: will run on any WordPress install, not just WordPress.com
  - BUGFIX: now works when you have less than three categories
  - added automatic update check
  - Tested with WordPress.com Jan/2007 and WordPress 2.3.2

  v0.03
  - old category position has a link to new categories location

*/

(function() {
  var version = "1.0";

  function checkUpdates(now) {
    autoUpdateFromUserscriptsDotOrg({
      name: 'WordPress Category Resizer',
	  url: 'http://userscripts.org/scripts/source/5629.user.js',
	  version: version,
	  check_now: now,
	  });
  }

  checkUpdates(false);


  var WPCATR_DEBUG = 0;
  var WPCATR_LINK = 0;
  var WPCATR_CLICK_SAVE = "<center><h1>click to go to save button</h1></center>";

  // Move the categorylist from the side bar to underneath the post box.
  var moremeta, advancedstuff;
  moremeta = document.getElementById('categorydiv');
  advancedstuff = document.getElementById('uploading');

  var wpcatr_jump = document.createElement('a');
  wpcatr_jump.id = "wpcatr_jump";
  wpcatr_jump.name = "wpcatr_jump";
  wpcatr_jump.innerHTML = "Go to Categories";
  wpcatr_jump.href = "#wpcatr_target";

  if (moremeta) {
    moremeta.parentNode.insertBefore(wpcatr_jump, moremeta.nextSibling);
  }


  if ((moremeta) && (advancedstuff)) {
    advancedstuff.parentNode.insertBefore(moremeta, advancedstuff.nextSibling);

    var autosave = document.getElementById('autosave');
    if (autosave) {
      var wpcatr_anchor = document.createElement('a');
      wpcatr_anchor.id = "wpcatr";
      wpcatr_anchor.name = "wpcatr_save";
      if (WPCATR_LINK) {
	wpcatr_anchor.innerHTML = "&nbsp;wpcatr";
	wpcatr_anchor.href = "http://internetducttape.com/tools/wordpress/wpcatr/";
	wpcatr_anchor.target = "_blank";
      }
      else {
	wpcatr_anchor.innerHTML = "&nbsp;";
      }
      autosave.parentNode.insertBefore(wpcatr_anchor, autosave.nextSibling);
    }

    // Create the link point for wpcatr_jump
    var jaxcat = document.getElementById('jaxcat');
    if (jaxcat) {
      var wpcatr_target = document.createElement('a');
      wpcatr_target.id = "wpcatr_target";
      wpcatr_target.name = "wpcatr_target";
      wpcatr_target.innerHTML = "&nbsp;";
      jaxcat.parentNode.insertBefore(wpcatr_target, jaxcat);
    }

    // Create a table for the new 3 column categories.
    var table = document.createElement('table');
    table.width = "100%";
    table.border = 0;
    var tr1 = document.createElement('tr');
    table.appendChild(tr1);
    var td1 = document.createElement('td');
    td1.vAlign = "top";
    td1.align = "left";
    tr1.appendChild(td1);
    var td2 = document.createElement('td');
    td2.vAlign = "top";
    td2.align = "left";
    tr1.appendChild(td2);
    var td3 = document.createElement('td');
    td3.vAlign = "top";
    td3.align = "left";
    tr1.appendChild(td3);

    if (autosave) {
      var tr2 = document.createElement('tr');
      var td4 = document.createElement('td');
      td4.colSpan = 4;
      td4.vAlign = "top";
      var wpcatr_link = document.createElement('a');
      wpcatr_link.id = "wpcatr_link_save";
      wpcatr_link.innerHTML = WPCATR_CLICK_SAVE;
      wpcatr_link.href = "#wpcatr_save";
      td4.appendChild(wpcatr_link);
      tr2.appendChild(td4);
      table.appendChild(tr2);
    }

    // Find the list of categories and insert the table before it.
    var categorylist = document.getElementById('categorychecklist');

    if (categorylist) {
      categorylist.parentNode.insertBefore(table, categorylist);

      // Because the UL categorylist is broken into uneven chunks, I need to 
      // break it into three columns as evenly as possible.

      var real_length = new Array(categorylist.childNodes.length);
      var i;
      var total = 0;
      for (i=0; i<categorylist.childNodes.length; i++) {
	real_length[i] = 0;
	if (categorylist.childNodes[i].nodeName == "LI") {
	  real_length[i] = listChildLength(categorylist.childNodes[i]);
	}
	total += real_length[i];
      }
      var first_split = Math.ceil(total / 3);
      var second_split = 2*first_split;
      var split_1 = 0;
      var split_2 = 0;
      var total_so_far = 0;
      for (i=0; i<real_length.length; i++) {
	total_so_far += real_length[i];
	if (split_1 == 0) {
	  if (total_so_far > first_split) {
	    split_1 = i;
	  }
	}
	if (split_2 == 0) {
	  if (total_so_far > second_split) {
	    split_2 = i;
	  }
	}
      }
      // Debugging, display how the algorithm parsed
      if (WPCATR_DEBUG) {
	var text = "<h1>WPCAT_DEBUG:</h1><br />";
	text += "categorylist has " + categorylist.childNodes.length + " children.<br />";
	for (i=0; i<categorylist.childNodes.length; i++) {
	  text += ", " + real_length[i];
	}
	text += "<br /><br />Total = " + total;
	text += "<br />first_split at "+first_split+", second_split at "+second_split;
	text = text + "<br>split_1 at "+split_1+", split_2 at "+split_2;

	var debug = document.createElement("P");
	debug.innerHTML = text;
	advancedstuff.parentNode.insertBefore(debug, advancedstuff.nextSibling);
      }

      // Create the new three-column category list.

      var categorylist1 = document.createElement('ul');
      var categorylist2 = document.createElement('ul');
      var categorylist3 = document.createElement('ul');

      for (i=0; i<split_1; i++) {
	if (categorylist.firstChild) { categorylist1.appendChild(categorylist.firstChild); }
      }
      for (i=split_1; i<split_2; i++) {
	if (categorylist.firstChild) { categorylist2.appendChild(categorylist.firstChild); }
      }
      for (i=split_2; i<real_length.length; i++) {
	if (categorylist.firstChild) { categorylist3.appendChild(categorylist.firstChild); }
      }

      td1.appendChild(categorylist1);
      td2.appendChild(categorylist2);
      td3.appendChild(categorylist3);

      if (categorylist.childNodes.length == 0) {
	categorylist.style.display = 'none';
      }
    }
  }

  // FINISHED!

  // Recursively determine the total number of LI elements under this
  // UL node.
  function listChildLength(child) {
    var length = 0;
    //    console.log("trying ",child.nodeName);
    if (child.nodeName == "LABEL") {
      length = 1;
    }
    else if ((child.nodeName == "UL") || (child.nodeName == "LI")) {
      var i;
      for (i=0; i<child.childNodes.length; i++) {
	// Recursively go down the list.
	length += listChildLength(child.childNodes[i]);
      }
    }
    return(length);
  }

  // SCRIPT CHECK FOR UPDATES
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
      if (SCRIPT.check_now == false) {
	if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;
      }

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
 })();

