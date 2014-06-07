// ==UserScript==
// @name           Fix Google Search Redirect Links
// @description    Remove Google redirect in search result links to destination (removes url?url= and url?q=). Built on ping's scrub script.
// @include        http*://www.google.*/search?*
// @version        1.3
// ==/UserScript==

// Based on Obviously Scrub Google Redirect Links
// 20111108 Add url= replacing in additional sublinks, make replacing links not adding new, add advanced search to pagination
// 20120222 Add url?q= replacing
// 20121014 Remove SetTimeouts because of not working with NoScript, general cleanup
// 20130604 Enabled for all Google sites

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

    // getElementById doesn't find it till it is actually placed in the document tree

    var as = document.getElementsByTagName('a');
    on = [ 'onclick', 'onmousedown' ];
    for (i = 0; i < as.length; ++i) {
      for (k in on) {
        if (as[i].getAttribute(on) != null) {
          as[i].setAttribute(on, '');
        }
      }
    }
  }

  // Main code starts here

  // clear js attributes
  cleaner();

  // add a plain link to all the search links. NB the
  var redirectLinks = document.evaluate(
    "//a[@class='l' or starts-with(@class, 'l ') or contains(@href, 'url\?') and (contains(@href, 'url=') or contains(@href, 'q='))]"
    , document
    , null
    , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
    , null);

  var link, marker, href, reextract, m;

  // regexp for defeating /url?url= crap
  reextract = /.*(?:url|q)=((?:f|ht)tps?:.*?)&(sa|rct)/;

  if (typeof redirectLinks != 'undefined' && redirectLinks.snapshotLength > 0) {

    for (var i = 0; i < redirectLinks.snapshotLength; i++) {
      // the Google link
      link = redirectLinks.snapshotItem(i);
      // ping's JS remover
      link.removeAttribute('onmousedown');
      // get its target - defeat new /url?url= prefix
      m = reextract.exec(link.getAttribute('href'));
      if (m == null || m.length == 0) {
        href = link.getAttribute('href');
      } else {
        href = m[1];
      }
      // rewrite link pointing to that target
      href = decodeURIComponent(href); // remove special characters
      link.setAttribute('href', href);
    }
  } else {
    // GM_log("Didn't find any search links");
  }

  // find the search button
  var searchBtn = document.evaluate(
    "//input[@class='lsb']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
  if (typeof searchBtn != "undefined" && searchBtn != null) {
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
  var req, res, ret, rep, query, startq, startn, adv, type, uri;
    if (typeof pagers != 'undefined' && pagers.snapshotLength > 0) {
    res = /(start=)(\d+)&/;  // reg exp to catch start param
    req = /(q=.*?)&/;        // catch query terms
    ret = /(tbs=.*?)&/;      // catch advanced search
    rep = /(tbm=.*?)&/;      // catch type
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
      m = ret.exec(href);
      if (m == null || m.length == 0) {
        adv = '';
      } else {
        adv = m[1];
      }
      m = rep.exec(href);
      if (m == null || m.length == 0) {
        type = '';
      } else {
        type = m[1];
      }
      // make a new, very basic URI using only the search terms and the paging postion
      uri = "search?" + query + "&" + startq + ( adv != "" ? "&" + adv : "" ) + ( type != "" ? "&" + type : "" );
      link.setAttribute('href', uri);
    }
  }
  document.removeEventListener('unload', null, false);
}
)()