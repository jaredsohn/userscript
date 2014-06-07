// ==UserScript==
// @name           TWoP Change Title
// @version        0.4
// @author         Maik Zumstrull <maik@zumstrull.net>
// @description    Changes the page title for TWoP articles to something more meaningful than the near-useless default.
// @namespace      http://greasemonkey.zumstrull.net/
// @include        http://www.televisionwithoutpity.com/*
// ==/UserScript==

function xpath_first_rel (query, node) {
  var result = document.evaluate (
    query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  );
  if (result) {
    return result.singleNodeValue;
  } else {
    return null;
  }
}

function xpath_all_rel (query, node) {
  return document.evaluate (
    query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
}

function xpath_first (query) { return xpath_first_rel (query, document); }
function xpath_all (query) { return xpath_all_rel (query, document); }

/* Note:
 * I don't know how to retrieve this information without referring to the
 * unsafeWindow object. It doesn't seem to appear anywhere in an HTML context
 * in the page, just in that one snippet of JavaScript. Obviously, using
 * unsafeWindow is undesirable, but since this is a read-only access and I
 * immediately force-convert the result to a string, it should be safe enough.
 */
var articletype = "";
if (unsafeWindow.s != undefined) {
  articletype = String(unsafeWindow.s.prop3);
}

if (location.href == 'http://www.televisionwithoutpity.com/index.php') {
  document.title = 'Television Without Pity';
}

if (xpath_first ("//li[@class='selected']/a[.='OVERVIEW']")) {
  var showname = xpath_first ('//h1');
  if (showname) { showname = showname.textContent; }
  document.title = "TWoP: " + showname + " Overview Page";
}

if (xpath_first ("//li[@class='selected']/a[.='RECAPS']")) {
  var showname = xpath_first ('//h1');
  if (showname) { showname = showname.textContent; }
  document.title = "TWoP: " + showname + " Recaps Page";
}

if (xpath_first ("//div[@class='report_card']")) {
  var showname = xpath_first ('//span[@class="header_recap"]');
  if (showname) { showname = showname.textContent; }
  var headline = xpath_first ("//span[starts-with (@class, 'headline_recap_title')]");
  if (headline) { headline = headline.textContent; }

  var byline = xpath_first ("//p[@class='byline']");
  var seasonstring = "";
  if (byline) {
    byline = byline.textContent;
    var season = /Season (\d+)/(byline);
    var episode = /Episode (\d+)/(byline);
    if (season && episode) {
      seasonstring = " " + season[1] + "-" + episode[1];
    }
  }

  var typestring = "";
  if (articletype.search (/^(?:Recap(?:let)?|Weecap)$/) >= 0) {
    typestring = " " + articletype;
  }

  var newpagetitle =
    "TWoP: " +
    showname +
    seasonstring +
    typestring +
    " - " +
    headline
  ;

  document.title = newpagetitle;
}
