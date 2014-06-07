// ==UserScript==
// @name           Metroid Database Forum Tweaks
// @namespace      http://moonbase.rydia.net/software/mdb-tweaks
// @description    Theme Tweaks for the MDb Forum
// @include        http://metroid-database.com/forum/*
// @include        http://www.metroid-database.com/forum/*
// ==/UserScript==

(function () {

function addStyleBlock(content) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = "text/css";
  style.appendChild(document.createTextNode(content));
  head.appendChild(style);
}

function findNodes(predicate, relative_to) {
  var nodes = [];
  var result = document.evaluate(predicate, relative_to, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  node = result.iterateNext();
  while (node) {
    nodes.push(node);
    node = result.iterateNext();
  }
  return nodes;
}

function findLastNode(predicate, relative_to) {
  var nodes = findNodes(predicate, relative_to);
  if (nodes.length == 0) {
    return null;
  } else {
    return nodes[nodes.length-1];
  }
}

function findFirstNode(predicate, relative_to) {
  return document.evaluate(predicate, relative_to, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function updateNodes(predicate, relative_to, do_update) {
  var nodes = findNodes(predicate, relative_to);
  for (var i = 0; i < nodes.length; i++) {
    do_update(nodes[i]);
  }
}

function rememberMe() {
  var predicate = "id('wrapheader')//span[text()='Remember me']/text()";
  var node = findFirstNode(predicate, document);
  if (node) {
    node.data = "Remember me?";
  }
}

function underlineLinks() {
  addStyleBlock('a { text-decoration: underline !important; }');
}

function replaceImageURL(old_url, new_url) {
  // TODO: quote old_url in predicate
  var predicate = "//img[@src='" + old_url + "']";
  updateNodes(predicate, document, function (image) {
    image.src = new_url;
  });
}

function fixInternalLinks() {
  var predicate = "//a[starts-with(@href, 'http://mdb.classicgaming.gamespy.com')]";
  updateNodes(predicate, document, function (link) {
    link.href = link.href.replace(/mdb\.classicgaming\.gamespy/, "www.metroid-database");
  });
  predicate = "//a[starts-with(@href, 'http://metroid-database.com')]";
  updateNodes(predicate, document, function (link) {
    link.href = link.href.replace(/metroid-database/, "www.metroid-database");
  });
  predicate = "//a[starts-with(@href, 'http://www.metroid-database.com/forum/viewtopic.php?p=')]";
  updateNodes(predicate, document, function (link) {
    link.href = link.href.replace(/#([0-9]+)$/, "#p$1");
  });
}

function addPostLinks() {
  updateNodes("//a[starts-with(@name, 'p')]", document, function (post_anchor) {
    var post_title = findFirstNode("../..//td[@class='gensmall']/div[1]", post_anchor);
    if (post_title) {
      post_number = parseInt(post_anchor.name.replace(/^p/, ""));
      post_url = "http://www.metroid-database.com/forum/viewtopic.php?p=" + post_number + "#p" + post_number;
      span = document.createElement("span");
      span.appendChild(document.createTextNode(" ("));
      link = document.createElement("a");
      link.href = post_url;
      link.appendChild(document.createTextNode("link"));
      span.appendChild(link);
      span.appendChild(document.createTextNode(")"));
      post_title.appendChild(span);
    }
  });
}

function isNewPostsPage() {
  var location = String(window.location);
  return location.match(/search.php\?search_id=newposts(&|$)/);
}

function addUnreadLinks() {
  var is_new_posts_page = isNewPostsPage();
  var hidden_count = 0;

  updateNodes("//a[@class='topictitle']", document, function (topic_link) {
    var span = document.createElement("span");
    topic_link.parentNode.insertBefore(span, topic_link.nextSibling);

    var last_link = findFirstNode("../..//img[contains(@src, 'topic_latest.gif')]", topic_link);
    if (last_link == null) {
        return;
    }
    last_link = last_link.parentNode;

    var last_page_link = findLastNode("..//a[contains(@href, '&t=')]", topic_link);

    // add [last] link to last post in a thread
    span.appendChild(document.createTextNode(" ["));
    var link = document.createElement("a");
    link.href = last_link.href;
    link.appendChild(document.createTextNode("last"));
    span.appendChild(link);
    span.appendChild(document.createTextNode("]"));

    var new_image = findFirstNode("../..//img[contains(@src, 'new.gif') or contains(@src, 'new_hot.gif')]", topic_link);
    if (new_image != null) {
      // add [unread] link to a thread with new posts
      var last_href = last_page_link.href;
      span.appendChild(document.createTextNode(" ["));
      var link = document.createElement("a");
      link.href = last_href + "#unread";
      link.appendChild(document.createTextNode("unread"));
      span.appendChild(link);
      span.appendChild(document.createTextNode("]"));
    } else if (is_new_posts_page) {
      // on the "new posts" search page, hide threads that don't have new posts!
      findFirstNode("ancestor::tr", topic_link).style.display = 'none';
      hidden_count++;
    }
  });

  if (is_new_posts_page && hidden_count > 0) {
    // make note of hidden posts in result count
    var search_counts = findLastNode("//div[@class='gensmall']/span[@class='nav']/../text()", document);
    search_counts.textContent = search_counts.textContent.replace(/matches \]/, "matches, hid " + hidden_count + " already read ]");
  }
}

function moveReportLinks() {
  updateNodes("//a[contains(@href, 'report.php')]/..", document, function (div) {
    div.align = "left";
  });
}

function hideSpoilers() {
  updateNodes("//span[@style='color: black;' or @style='color: rgb(0, 0, 0);' or @style='color: #000000;']", document, function (span) {
    span.style.background = "black";
  });
}

rememberMe();
hideSpoilers();
underlineLinks();
fixInternalLinks();
addPostLinks();
addUnreadLinks();
moveReportLinks();

})()
