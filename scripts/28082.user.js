// ==UserScript==
// @name           TWoP Reformat for Print
// @version        0.5
// @author         Maik Zumstrull <maik@zumstrull.net>
// @description    Changes the formatting of a TWoP recap page to be more suitable for printing. Works best in cooperation with TWoP Single Page Recaps.
// @namespace      http://greasemonkey.zumstrull.net/
// @include        http://www.televisionwithoutpity.com/show/*
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

function unlink (node) {
  node.parentNode.removeChild (node);
}

function replace_with_content (node) {
  while (node.firstChild) {
    node.parentNode.insertBefore (node.firstChild, node);
  }
  unlink (node);
}

function unlink_all (query) {
  var nodes = xpath_all (query);
  for (var i = 0; i < nodes.snapshotLength; i++) {
    unlink (nodes.snapshotItem (i));
  }
}

function replace_all_with_content (query) {
  var nodes = xpath_all (query);
  for (var i = 0; i < nodes.snapshotLength; i++) {
    replace_with_content (nodes.snapshotItem (i));
  }
}

function reformatForPrinting (event) {
  event.preventDefault ();

  if (ourlinkdiv) {
    unlink (ourlinkdiv);
  }

  unlink_all ("//link[@rel='stylesheet']");
  unlink_all ("//style");
  unlink_all ("//script");
  replace_all_with_content ("//a[@itxtdid]");

  while (document.body.attributes.length > 0) {
    document.body.removeAttributeNode (document.body.attributes[0]);
  }

  var title = xpath_first ("//div[starts-with (@class, 'title_recap')]/span");
  if (title) {
    var h1 = document.createElement ('h1');
    while (title.firstChild) {
      h1.appendChild (title.firstChild);
    }
    title = h1;
  }

  var grades = xpath_first ("//div[@class='report_card']/span");
  var byline = xpath_first ("//p[@class='byline']");
  if (grades && byline) {
    byline.appendChild (document.createTextNode (" | "));
    var gradetext = grades.textContent
      .replace (/\s+/g, " ")
      .replace (/Users/gi, "Users");
    byline.appendChild (document.createTextNode (gradetext));
  }

  if (!byline) {
    byline = xpath_first ("//div[@class='blog_header']/div[@class='author']");
  }

  var eptitle = xpath_first ("//span[starts-with (@class, 'headline_recap_title')]");
  if (eptitle) {
    var h2 = document.createElement ('h2');
    while (eptitle.firstChild) {
      h2.appendChild (eptitle.firstChild);
    }
    eptitle = h2;
  } else {
    eptitle = xpath_first ("//div[@class='blog_header']/h2");
  }

  unlink_all ("//div[@class='float_right']");
  unlink_all ("//div[@class='mondoex_page_head']");
  unlink_all ("//div[@id='sub_recap']");
  unlink_all ("//div[@id='tease']");
  unlink_all ("//p[not(node())]");

  var contentdiv = xpath_first ('//div[@id="main_content"]//div[@class="body_recap" or @class="blog_post"]');

  while (document.body.firstChild) {
    document.body.removeChild (document.body.firstChild);
  }

  if (title) {
    document.body.appendChild (title);
  }
  if (eptitle) {
    document.body.appendChild (eptitle);
  }
  if (byline) {
    document.body.appendChild (byline);
    document.body.appendChild (document.createElement ('hr'));
  }

  while (contentdiv.firstChild) {
    document.body.appendChild (contentdiv.firstChild);
  }
}

var ourlinkdiv;
{
  var link = document.createElement ('a');
  link.appendChild (document.createTextNode ("Reformat for Printing"));
  link.setAttribute ('href', '/');
  link.addEventListener ('click', reformatForPrinting, false);
  var div = document.createElement ('div');
  div.appendChild (link);
  ourlinkdiv = div;

  var author = xpath_first ("//div[@class='blog_header']/div[@class='author']");
  if (author) {
    author.parentNode.appendChild (div);
  }

  var rbody = xpath_first ('//div[@id="main_content"]//div[@class="body_recap"]');
  if ((document.body.id == 'shows_specific_recap') && rbody) {
    rbody.insertBefore (div, rbody.firstChild);
  }
}

