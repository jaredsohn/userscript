// ==UserScript==
// @name De-Widen Team Liquid Forum Posts
// @description Restores forum threads on Team Liquid to roughly the same width as before, for increased readability and for use at relatively low resolutions.
// @include http://www.teamliquid.net/forum/viewmessage.php*
// ==/UserScript==

// Assertions
function AssertException(msg) { this.message = message; }
AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.msg;
}

function assert(exp, msg) {
  if (!exp) {
    alert('Assertion failed: '+msg);
    throw new AssertException(msg);
  }
}

// Util
function topx(x) {
  return String(x) + 'px';
}

function frompx(s) {
  return Number(s.replace('px',''));
}

// Main code
var WIDE_POST_WIDTH = 742;
var POST_WIDTH = 604;
var WIDTH_DIFF = WIDE_POST_WIDTH - POST_WIDTH;

// De-widen page switcher
var page_switcher = null;
var tds = document.getElementsByTagName('td');
for (var i = 0; i < tds.length; ++i) {
  var td = tds[i];
  if (Number(td.width) == 522 && td.align.toLowerCase() == 'right') {
    page_switcher = td;
  }
}
page_switcher.width -= WIDTH_DIFF;


// De-widen posts
var posts = [];
var tds = document.getElementsByTagName('td');
for (var i = 0; i < tds.length; ++i) {
  var td = tds[i];
  if (td.className == 'forumPost') {
    posts.push(td);
  }
}

var table = null;
for (var i = 0; i < posts.length; ++i) {
  var post = posts[i];
  var inner_table = post;
  for (var j = 0; j < 3; ++j) {
    inner_table = inner_table.parentNode;
  }
  assert(inner_table.tagName.toLowerCase() == 'table',
         'Failed to find inner table: ' + inner_table.tagName);

  inner_table.style.width = topx(frompx(inner_table.style.width) - WIDTH_DIFF);

  var outer_table = inner_table;
  for (var j = 0; j < 4; ++j) {
    outer_table = outer_table.parentNode;
  }
  assert(outer_table.tagName.toLowerCase() == 'table',
         'Failed to find outer table: '+outer_table.tagName);

  outer_table.width -= WIDTH_DIFF;
  table = outer_table;
}


// De-widen reply box (if thread is open)
var reply_area = document.getElementById('reply_area');
if (reply_area != null) {
  reply_area.style.width = topx(frompx(reply_area.style.width) - WIDTH_DIFF);
  var table = reply_area;
  for (var j = 0; j < 5; ++j) {
    table = table.parentNode;
  }
  assert(table.tagName.toLowerCase() == 'table',
         'Failed to find reply-box table: '+table.tagName);
  table.width -= WIDTH_DIFF;
}


// De-widen surrounding box
var inner_big_table = null;
if (table != null) {
  for (var j = 0; j < 4; ++j) {
    table = table.parentNode;
  }
  assert(table.tagName.toLowerCase() == 'table',
         'Failed to find enclosing table: '+table.tagName);
  table.width -= WIDTH_DIFF;

  var td = table;
  for (var j = 0; j < 5; ++j) {
    td = td.parentNode;
  }
  assert(td.tagName.toLowerCase() == 'td',
         'Failed to find enclosing td: '+td.tagName);
  td.style.width = topx(frompx(td.style.width) - WIDTH_DIFF);

  table = td;
  for (var j = 0; j < 3; ++j) {
    table = table.parentNode;
  }
  assert(table.tagName.toLowerCase() == 'table',
         'Failed to find other enclosing table: '+table.tagName);
  table.width -= WIDTH_DIFF;

  for (var j = 0; j < 8; ++j) {
    table = table.parentNode;
  }
  assert(table.tagName.toLowerCase() == 'table',
         'Failed to find big table: '+table.tagName);
  table.width -= WIDTH_DIFF;
  inner_big_table = table;

  for (var j = 0; j < 4; ++j) {
    table = table.parentNode;
  }
  assert(table.tagName.toLowerCase() == 'table',
         'Failed to find other big table: '+table.tagName);
  table.width = table.width -= WIDTH_DIFF;
}


// Move the banner ad.
var divs = document.getElementsByTagName('div');
var ad = null;
for (var i = 0; i < divs.length; ++i) {
  var div = divs[i];

  var pat = /.*_container/;
  var matches = div.id.match(pat);
  if (matches && div.style.width.toLowerCase() == '732px') {
    ad = div;
    break;
  }
}
assert(ad != null, 'There\'s no ad');
for (var j = 0; j < 2; ++j) {
  ad = ad.parentNode;
}
assert(ad.tagName.toLowerCase() == 'div',
       'Failed to find ad div: '+ad.tagName);
ad.parentNode.removeChild(ad);

var ad_parent = inner_big_table.parentNode;
ad_parent.insertBefore(ad, inner_big_table);


// Fix OLD POST images.
var oldposts = [];
var imgs = document.getElementsByTagName('img');
for (var i = 0; i < imgs.length; ++i) {
  var img = imgs[i];
  if (img.alt == 'Old Post') {
    oldposts.push(img);
  }
}

for (var i = 0; i < oldposts.length; ++i) {
  var div = oldposts[i].parentNode;

  // The width is computed from something. I don't know what.
  DIV_HACK_WIDTH = 732 - WIDTH_DIFF;
  div.style.width = topx(DIV_HACK_WIDTH);
}
