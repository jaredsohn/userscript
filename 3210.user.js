// ==UserScript==
// @name          Something Awful Forums Navigational Access Keys (0.1)
// @namespace     http://pablotron.org/
// @description   Add navigational access keys to the Something Awful Forums.  The default bindings are: alt-comma: previous page, alt-period: next page, alt-<: first page, alt->: last page.
// @include       http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

(function () {
  var key_map = {
    ',': 'previous page',
    '.': 'next page',
    '>': 'last page',
    '<': 'first page',
  };

  // add_key - add access key to anchor with specific title
  var add_key = function (key, title) {
    var i, e, links, links_len;

    // get links 
    links = document.evaluate(
      "//a[@title='" + title + "']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    // add access key to each link
    links_len = links.snapshotLength;
    for (i = 0; i < links_len; i++) {
      e = links.snapshotItem(i);
      e.setAttribute('accesskey', key);
    }

    // return number of links munged
    return links_len;
  }

  for (key in key_map) 
    add_key(key, key_map[key]);
})();
