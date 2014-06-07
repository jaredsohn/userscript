// ==UserScript==
// @name          Digg Navigational Access Keys (0.1)
// @namespace     http://pablotron.org/
// @description   Add navigational access keys (NAK) to Digg.  By default, previous is alt-comma and next is alt-period.
// @include       http://*digg.com/*
// ==/UserScript==

(function () {
  var DiggNAK = {
    // enable debugging output?
    debug: false,

    // list of key matches
    keys : [
      { key: ',', regex: /Previous/ },
      { key: '.', regex: /Next/ },
    ],

    /*
     * xpath - return the elements matching the given XPath query.
     */
    xpath: function (path) {
      return document.evaluate(
        path, 
        document, 
        null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
        null
      );
    },

    /*
     * init - add list of accesskeys to anchor with specific title
     */
    init: function (key_matches) {
      var i, j, e, m, links, links_len, key_matches_len;

      // get size of key matches array
      key_matches_len = key_matches.length;

      // get links 
      links = this.xpath("//a[@class='nextprev']");

      // add access key to each link
      links_len = links.snapshotLength;
      for (i = 0; i < links_len; i++) {
        e = links.snapshotItem(i);

        // iterate over key matches and check each one; if the regex
        // matches the element, then apply the associated access key
        for (j = 0; j < key_matches_len; j++) {
          m = key_matches[j];

          if (e.innerHTML.match(m.regex))
            e.setAttribute('accesskey', m.key);
        }
      }

      // return number of links munged
      return links_len;
    },
  };

  // add links
  var num_keys = NAK.DiggNAK.init(DiggNAK.keys);

  // if debugging is enabled, then print out result message
  if (DiggNAK.debug) 
    alert('NAK-Digg Debug: keys = ' + num_keys);
})();
