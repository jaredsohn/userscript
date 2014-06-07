// ==UserScript==
// @name LXR Includes Reference Search
// @description Creates links in LXR to search for files this file references.
// @include http://lxr.mozilla.org/*
// ==/UserScript==
(function() {
  // Get the markup element representing source code.
  var pre = document.getElementsByTagName("pre");
  if (pre.length) {
    pre = pre[0];
  } else {
    return;
  }

  // Determine the path for search links.
  const locationRE = /https?:\/\/.*\/(.*)\/source\/.*/;
  var locationMatch = locationRE.exec(location.href);
  if (locationMatch) {
    const path = "http://lxr.mozilla.org/" + locationMatch[1] + "/find?string=/";
  } else {
    return;
  }

  var result;

  // nsIDOMNodeFilter
  const filter = {
    /*   quote  protocol               path filename.extension quote */
    urlRE: /(['"])(?:resource|chrome):\/\/.*\/(.*\.[^'"]{1,10})\1/g,

    /**
     * Accept nodes referencing other files.
     *
     * @param aNode Text node to check for references.
     */
    acceptNode: function acceptNode(aNode) {
      // Exclude grandchildren of aNode.
      if (aNode.parentNode != pre) {
        return Components.interfaces.nsIDOMNodeFilter.FILTER_REJECT;
      }

      // #include, resource://, chrome://
      result = this.urlRE.exec(aNode.nodeValue);
      if (result) {
        return Components.interfaces.nsIDOMNodeFilter.FILTER_ACCEPT;
      }

      return Components.interfaces.nsIDOMNodeFilter.FILTER_REJECT;
    }
  };

  // Use walker to iterate through text nodes, range to wrap links.
  var walker = document.createTreeWalker(pre,
    Components.interfaces.nsIDOMNodeFilter.SHOW_TEXT,
    filter,
    true);
  var range = document.createRange();

  if (!walker.firstChild()) {
    return;
  };

  do {
    // Set range parameters.
    var text = walker.currentNode.nodeValue;
    var lookup = result[result.length - 1];
    var startOffset = text.indexOf(result[0]) + 1;
    var endOffset = startOffset + result[0].length - 2;

    range.setEnd(walker.currentNode, endOffset);
    range.setStart(walker.currentNode, startOffset);

    // Create link to search page.
    var hlink = document.createElement("a");
    hlink.setAttribute("href", path + lookup);

    // Insert link.
    // XXX surroundContents is busted!
    var docFrag = range.extractContents();
    hlink.appendChild(docFrag);
    range.insertNode(hlink);

  } while (walker.nextSibling());
})();
