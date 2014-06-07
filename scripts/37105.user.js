// ==UserScript==
// @name           AntiManowar
// @namespace      http://2ch.ru/mu/antimanowar
// @description    Hides Manowar forcer's posts
// @include        http://2ch.ru/mu/*
// @include        http://www.2ch.ru/mu/*
// @encoding       utf-8
// ==/UserScript==

/*
  FORCED ANONYMITY LICENSE v1.0
  =============================
  This program is free software. Redistribution and use, with or without
  modification, are permitted provided that the following conditions are met:

    * Any redistributions must retain this notice.
    * The author and all contributors of this program must remain anonymous.

  As an exception, non-anonymous code modifications (contributions) to this
  program are allowed if the modification:

    * Fixes some secirity threat the program poses (security fixes).
    * Fixes some misbehavior which is generally considered extremely annoying.

  This program is distributed in hope that it will be useful
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

// Version history:
//  * 1.00: Initial version.
//  * 1.10: Added italics filtration && multiple tags handling.
//  * 1.20: Removes bold/italic decoration from thread opening posts.
//  * 1.30: Added word filtering.

// ALSO: Manowar sucks, Forcer-kun is ХУЙ and his mother is ШЛЮХА indeed.

if (location.hostname.indexOf('2ch.ru') != -1) {
  try {
    var filter = ["пидовк", "manowar", "корол", "воин", "мановар"]; // you can modify it

    var post;
    var posts = document.evaluate("//blockquote", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < posts.snapshotLength; i++) {
      post = posts.snapshotItem(i);

      var text = post.textContent.toLowerCase();
      var manowarish = false;
      for (var idx in filter) {
        if (text.indexOf(filter[idx]) != -1) {
          manowarish = true;
          break;
        }
      }

      var len = 0;
      var tags = document.evaluate("strong | em | p/strong | p/em", post, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var j = 0; j < tags.snapshotLength; j++)
        len += tags.snapshotItem(j).textContent.length;

      if (!manowarish && len < 20)
        continue;

      var node = post;
      while (node.tagName.toLowerCase() != "table" && node.tagName.toLowerCase() != "div")
        node = node.parentNode;

      if (node.tagName.toLowerCase() == "div") // first message -- just remove formatting
        for (var k = 0; k < tags.snapshotLength; k++)
          tags.snapshotItem(k).setAttribute ("style", "font-weight: normal !important; font-style: normal !important;");
      else // hide the whole post
        node.setAttribute ("style", "display: none !important;");
    }
  } catch(e) { ; }
}