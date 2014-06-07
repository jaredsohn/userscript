// ==UserScript==
// @name           Obviously Scrub Google Redirect Links
// @description    Removes the Google redirect in search result links, and adds an extra plain link so you can be sure it's done it. Built on ping's scrub script
// @include        http://www.google.com/search?*
// @include        http://www.google.co.uk/*
// @include        https://www.google.co.uk/*
// ==/UserScript==

// 20101108 use encodeURIComponent so + in queries works properly
// 20101115 Non-redirecting pager links now working
// 20101118 New pager links now more robust
// 20101123 Use 'location hack' to delete Google's variables. Also remove useless attempts to remove event listeners
// 20101207 Bug fix: URLs for pager links got progressively more mangled if they had escapes in. Fixed. Also make pager links bigger and centred.

// Please note, this is a development, pre-alpha version of the script
// which still generates trace output and is subject to constant change


(function() {

  function doOurSearch() {
    // This function will be set as the click event of our search button
    // get the contents of the search box
    var box = document.evaluate( "//input[@class='lst']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    box = document.forms.namedItem('tsf').elements.namedItem('q');
    if (typeof box != 'undefined') {
      // load a new search page using the terms in the search box
      var uri = "search?q=" + encodeURIComponent(box.value);
      window.location = uri;
    }
  }

  function cleaner() {
    var n, i, a, on, k;

    // do not remove any timeouts, etc, until our footer has been inserted (I'm not sure if timeout removal works anyway)
    // the check for existence of an element with the 'id' of our footer works because, although the footer exists from the start,
    // getElementById doesn't find it till it is actually placed in the document tree

    var as = document.getElementsByTagName('a');
    on = [ 'onclick', 'onmousedown' ];
    for (i = 0; i < as.length; ++i) {
      for (k in on) {
        if (as[i].getAttribute(on) != null) {
          as[i].setAttribute(on, '');
          GM_log("Set an " + k + " attribute off");
        }
      }
    }
    n = (typeof window.LastTimeout == "undefined" ? 0 : window.LastTimeout);
    var dummy = window.setTimeout('', 10000);
    for (i = n; i <= dummy; ++i) {
      window.clearTimeout(i);
    }
    window.LastTimeout = dummy;
    GM_log('Called clearTimeout on timeouts ' + n + ' to ' + dummy);

    n = (typeof window.LastInterval == "undefined" ? 0 : window.LastInterval);
    dummy = window.setInterval('', 10000);
    for (i = n; i <= dummy; ++i) {
      window.clearInterval(i);
    }
    window.LastInterval = dummy;
    GM_log('Called clearInterval on intervals ' + n + ' to ' + dummy);
//     var s;
//     for (var k in window) {
//       s = s + k + ": " + window[k] + ", ";
//     }
//    GM_log(s);
    for (i = 0; i < window.Delenda.length; ++i) {
      try {
        // use the 'location hack' to set window[window.Delenda[i] to 0.
        location.href = ( "javascript:" + "window[\"" + window.Delenda[i] + "\"] = 0; void(0)" + "" );
// the below does not work due to the sandbox
//        window[window.Delenda[i]] = 0;
      } catch(err) {
        GM_log('Whoah ' + err.description + ' deleting ' + window.Delenda[i]);
      }
    }

    //reschedule ourselves
    window.setTimeout(cleaner, 10000);
  }

  function showOurFooter() {
    var iframe;
    // show the replacement footer we made, if the Google footer has appeared yet
  var did = document.getElementById('foot');
  if (! !did) {
    try {
      did.parentNode.replaceChild(newfooter, did);
//       iframe = document.createElement("iframe");
//       did.parentNode.replaceChild(iframe, did);
//       iframe.setAttribute("width", "600px");
//       iframe.contentDocument.body.appendChild( document.createTextNode( "Pager links" ));
//       iframe.contentDocument.body.appendChild(newfooter);
    } catch(e) {
      GM_log("Could not add our footer, " + e.message);
    }
  } else {
    // try again later
    window.setTimeout(showOurFooter, 3000);
  }
  }

// Main code starts here
  window.Delenda = [ 'google', 'mbtl', 'gbar', 'wgjp', 'gbar', 'rwt', '_gjp', '_gjuc', '_gjwl' ];

// immediately clear all timeouts and intervals (reschedules itself - see above)
  window.setTimeout(cleaner, 0);

// add a plain link to all the search links. NB the
	var redirectLinks = document.evaluate(
		"//a[@class='l' or starts-with(@class, 'l ')]"
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);

  var link, marker, href, reextract, m;

  // regexp for defeating /url?q= crap
  reextract = /.*(https?:.*?)&(sa|rct)/;

	if (typeof redirectLinks != 'undefined' && redirectLinks.snapshotLength > 0) {
    GM_log("Found " + redirectLinks.snapshotLength + " links");

		for (var i = 0; i < redirectLinks.snapshotLength; i++) {
// the Google link
      link = redirectLinks.snapshotItem(i);
// ping's JS remover
			link.setAttribute('onmousedown','');
// make it italic as a warning not to click it
      link.style.fontStyle = 'italic';
// get its target - defeat new /url?q= prefix
      m = reextract.exec(link.getAttribute('href'));
      if (m == null || m.length == 0) {
        href = link.getAttribute('href');
      } else {
        href = m[1];
      }
// make a new link pointing to that target
      marker = document.createElement('a');
      marker.setAttribute('href', href);
      marker.setAttribute('class', 'obviously');
// add it to the heading which encloses the Google link
      link.parentNode.appendChild(marker);
// put some text between the G link and our link
      link.parentNode.insertBefore(document.createTextNode(' >>> ') , marker);
// put the URL into our new link as text
      marker.appendChild(document.createTextNode(href));
      //GM_log("Done link " + i + ": " + href);
		}
	} else {
    GM_log("Didn't find any search links");
  }

// find the search button
  var searchBtn = document.evaluate(
    "//input[@class='lsb']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
  if (typeof searchBtn != "undefined") {
// replace it with a new button of our own
    ourBtn = document.createElement('input');
    ourBtn.setAttribute('type', 'button');
    ourBtn.setAttribute('value', 'Search');
    ourBtn.addEventListener('click', doOurSearch, true);
    searchBtn.parentNode.replaceChild(ourBtn, searchBtn);
  }

// find the paging and Next/prev links
  var pagers = document.evaluate(
		"//a[@class='fl' or @id='pnprev' or @id='pnnext']"
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
// and turn them into proper links that reload the page. We put the links in our own footer
  newfooter = document.createElement('div');
  var req, res, query, startq, startn, uri, id, newpager, newfooter, oldfooter, qid, linktext, iframe;
	if (typeof pagers != 'undefined' && pagers.snapshotLength > 0) {
    res = /(start=)(\d+)&/;  // reg exp to catch start param
    req = /(q=.*?)&/;       // do. do. to catch query terms
		for (i = 0; i < pagers.snapshotLength; i++) {
      link = pagers.snapshotItem(i);
      href = link.getAttribute('href');
      m = res.exec(href);
      if (m == null || m.length == 0) {
        continue;
      } else {
        startq = m[1] + m[2];
        startn = m[2];
      }
      m = req.exec(href);
      if (m == null || m.length == 0) {
        continue;
      } else {
        query = m[1];
      }
      // make a new pager link
      newpager = document.createElement('a');
      qid = link.getAttribute('id');
      if (qid != null && qid.indexOf('pn') == 0) {
        linktext = ( qid == 'pnprev' ? 'Prev' : 'Next' );
      } else {
        linktext = startn;
      }
      newpager.appendChild( document.createTextNode(" - " + linktext));
      // make a new, very basic URI using only the search terms and the paging postion
      uri = "search?" + query + "&" + startq;
      newpager.setAttribute('href', uri);
      newpager.setAttribute('class', 'obviously_page');
      newpager.style.fontSize = '12pt';
      // replace Google's pager link with our new one
      newfooter.appendChild(newpager);
      newfooter.setAttribute('id', 'obviously_footer');
      newfooter.style.textAlign = 'center';
    }
    // we don't replace Google's footer with ours yet because it probably doesn't exist yet. Our timeout will do it
/*    oldfooter = document.evaluate(
      "//div[@class='tsf-p']",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null).singleNodeValue;
    oldfooter.parentNode.replaceChild(oldfooter, newfooter);
*/
     window.addEventListener("load", showOurFooter, false);
     //window.setTimeout(showOurFooter, 500);
  }
  document.removeEventListener('unload', null, false);
}
)()
