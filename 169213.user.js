// ==UserScript==
// @name Whom to follow for Twitter
// @author Thomas Steiner
// @namespace http://github.com/tomayac
// @run-at document-end
// @description This user script corrects Twitter's "Who to follow" to "Whom to follow".
// @include https://twitter.com/*
// @version 0.0.1
// @grant none
// ==/UserScript==

(function() {
  var blacklist = ['SCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'];
  // rules store
  var rules = [
    // "who to follow" to "whom to follow"
    {
      regexp: new RegExp('Who\\sto\\sfollow', 'gi'),
      replacement: 'Whom to follow'
    },
    // "who you follow" to "whom you follow"
    {
      regexp: new RegExp('who\\syou\\sfollow', 'gi'),
      replacement: 'whom you follow'
    }
  ];

  // applies all rules to the given text
  var applyRules = function(item) {
    // apply rules to each item
    if (Array.isArray(item)) {
      for (var i = 0, l = item.length; i < l; i++) {
        var textNode = item[i];
        // call yourself recursively
        textNode.textContent = applyRules(textNode.textContent);
      }
    } else {
      // apply all rules to item
      return rules.reduce(function(item, rule) {
        return item.replace(rule.regexp, rule.replacement);
      }, item);
    }
  };

  // gets all text nodes from the DOM tree starting from a given root
  var getAllTextNodes = function(root) {
    var walker = document.createTreeWalker(
        root, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (walker.nextNode()) {
      var parentNodeName = walker.currentNode.parentNode.nodeName;
      if (blacklist.indexOf(parentNodeName) === -1) {
        textNodes.push(walker.currentNode);
      }
    }
    return textNodes;
  };

  var run = function() {
    // initial processing
    applyRules(getAllTextNodes(document.body));
    document.title = applyRules(document.title);
  };
  run();

  var pathname = document.location.pathname;
  setInterval(function() {
    if (pathname !== document.location.pathname) {
      pathname = document.location.pathname;
      run();
    }
  }, 500);
})();