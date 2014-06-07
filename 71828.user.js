// ==UserScript==
// @name           /b/ackwash reloaded
// @namespace      http://userscripts.org/users/64431
// @description    /b/ackwash + backlinks + inline quotes
// @include        http://*.4chan.org/*
// @include        http://4chanarchive.org/brchive/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @include        http://archive.easymodo.net/cgi-board.pl/*
// @include        http://green-oval.net/cgi-board.pl/*
// @copyright      2009, 2010, James Campos
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        5.5.2
// @compatibility  Firefox 3.5, Opera 10, Chrome 4, Uzbl git
// ==/UserScript==

//start preferences
const inline = 0;//inline quotes - 0 = never, 1 = front page, 2 = always
const backlinkify = true;//backlinks
const backtext = '>>%';//% = id of quoter
//end preferences

//todo - smarter xhr, backlinking on textboards, backlink highlighting

function inBefore(root, node) {
  root.parentNode.insertBefore(node, root);
}

function inAfter(root, node) {
  root.parentNode.insertBefore(node, root.nextSibling);
}

function remove(node) {
  node.parentNode.removeChild(node);
}

function tag(str) {
  return document.createElement(str);
}

//xxx - this is 2-3 times slower than native. don't use in loops
function create(css) {//create a structured dom node
  var nodes = css.split(' ');
  var root = c(nodes[0]);
  var current = root;
  for (var i = 1, l = nodes.length; i < l; i++) {
    var child = c(nodes[i]);
    current.appendChild(child);
    current = child;
  }
  return root;

  function c(css) {//lol private function. create single nodes
    var matches = css.match(/(\w+)(#\w+)?(\.\w+)?/);//xxx - only allows 0-1 classes
    var tag = matches[1];
    var id = matches[2];
    var className = matches[3];
    var node = document.createElement(tag);
    if (id)
      node.id = id.substring(1);
    if (className)
      node.className = className.substring(1);
    return node;
  }
}

function $(selector, root) {
  if (!root) root = document.body;
  return root.querySelector(selector);
}

function $$(selector, root) {
  if (!root) root = document.body;
  var result = root.querySelectorAll(selector);
  var a = []
  for (var i = 0, l = result.length; i < l; i++)
    a.push(result[i])
  return a
}

function x(xpath, root) {
  if (!root) root = document.body;
  return document.
    evaluate(xpath, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).
    singleNodeValue;
}

function X(xpath, root) {
  if (!root) root = document.body;
  var result = document.
    evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var a = [], item;
  while (item = result.iterateNext())
    a.push(item);
  return a;
}

//main
var cache = [];
var oldID, bwHeight, winHeight, winWidth;
const OFFSET_Y = 120;
const OFFSET_X = 45;
const FLIPPER = 400;

var server = location.hostname.match(/(\w+)?/)[0];
if (server == 'green')//green-oval
  server = 'archive';

const reply = /res|read|thread|archive\//.test(location.pathname);
//imageboard|textboard|4chanarchive+easymodo|suptgarchive
if (reply)
  var threadOP = location.href.match(/\d{2,}/)[0];
else if (server != 'dis')
  const checkOP = true;
const xpathOP =
  x("ancestor::div[@id]", $('td.reply')) ?//threading
    "ancestor::div[@id]" :
    "ancestor-or-self::td[@id]/ancestor::table[1]/preceding-sibling::*[@id][1]";

var bw = create('div#backwash_tooltip table tr td#backwash_tipcell');
bw.setAttribute('style',
  'display:none;' +
  'position:fixed;' +
  'border:1px solid #AAA;' +
  'background-color: inherit');
var bwtd = $('td', bw);
bwtd.style.padding = '10px';
document.body.appendChild(bw);

var getContent;
var insertSelector;
var postSelector;
switch(server) {
  case 'archive'://easymodo
    getContent = getEasymodo;
    insertSelector = reply ? 'a.js + a' : 'a.js';
    postSelector = 'td.reply, td.subreply';
    break;
  case 'dis'://text boards
    getContent = getTB;
    insertSelector = '';//todo
    postSelector = 'div.post';
    bw.style.backgroundColor = '#F0F0F0';
    break;
  default:
    getContent = getChan;
    insertSelector = 'span[id]';
    postSelector = 'td.reply';
    break;
}
$$(postSelector).forEach(wash);

document.body.addEventListener('DOMNodeInserted',
  function (e) {
    var target = e.target;
    if (target.nodeName == 'TABLE')
      wash($('td.reply', target));
  },
  true);

//funks
function wash(post) {
  var links = X(".//a[starts-with(text(), '>>')]", post);
  if (!links.length)
    return;
  if (checkOP)
    threadOP = x(xpathOP, post).id.match(/\d+$/)[0];
  var postID = post.id;
  oldID = null;
  links.forEach(function(link) {
    listenTo(link);
    if (!postID)
      return;//inlined quotes, but also textboard posts!
    var matches = link.href.match(/(\d+)?\D+([\d_]+)$/);
    if (!matches)
      return;//todo - check performance of try/catch instead
    var op = matches[1];
    var id = matches[2];
    if (id == threadOP)
      link.innerHTML += ' (OP)';
    else if (reply && (op != threadOP))
      link.innerHTML += ' (Duckroll?)';

    //add backlinks
    if (!backlinkify || (oldID == id))
      return;//don't add multiple backlinks when source and target are the same. not a rigorous check
    oldID = id;
    if (server == 'archive')
      id = 'p' + id;
    var target = document.getElementById(id);
    if (target) {
      var backlink = tag('a');
      backlink.className = 'backlink';
      listenTo(backlink);
      backlink.textContent = backtext.replace('%', postID);
      backlink.href = '#' + postID;
      var insertPoint = $(insertSelector, target);
      inAfter(insertPoint, backlink);
    }
  })
}

function listenTo(link) {
  link.addEventListener('click', click, true);
  link.addEventListener('mouseover', mouseover, true);
  link.addEventListener('mousemove', mousemove, true);
  link.addEventListener('mouseout', mouseout, true);
}

function click(e) {
  if (!inline || (inline == 1 && reply))
    return;

  e.preventDefault();
  var next = (server == 'dis') ? this.nextSibling : this.parentNode.nextSibling;
  if (next && next.nodeName == 'TABLE')
    remove(next);
  else if (this.className == 'backlink') {//we know there's a forwardpost
    var id = this.hash.substring(1);
    var target = document.getElementById(id);
    var tp = target.parentNode;
    if (tp.parentNode == this.parentNode) {
      tp.style.display = tp.style.display ? '' : 'none';
    } else {
      target.style.border = '1px dashed';
      var insertPoint = x('following-sibling::*[self::tr or self::blockquote or self::br]', this);
      inBefore(insertPoint, target.parentNode);//get tr so they stack on top of each other
      target.parentNode.style.display = '';//unhide filtered posts
    }
  } else {
    var table = create('table tr td');
    td = $('td', table);
    td.style.border = '1px dashed';
    var insertPoint = (server == 'dis') ? this : this.parentNode;
    inAfter(insertPoint, table);
    getContent(td, this);//hack - we don't want other scripts touching this, so add content after inserting
    wash(td);
  }
}

function mouseover() {
  getContent(bwtd, this);
  var input = $('input', bwtd);
  if (input)
    remove(input);
  if (this.className == 'backlink') {
    var postHash = '#' + this.parentNode.id;
    var links = X(".//a[starts-with(text(), '>>')]", bwtd);
    links.forEach(function (x) {
      if (x.hash == postHash)
        x.className = 'forwardlink';
    })
  }
  bw.style.display = '';
  bwHeight = bw.offsetHeight;//can i get this and position the div w/o displaying it first?
  winHeight = Math.min(document.documentElement.clientHeight, document.body.clientHeight);//easymodo + dis
  winWidth = Math.min(document.documentElement.clientWidth, document.body.clientWidth);
}

function getEasymodo(td, link) {
  var matches = link.href.match(/(post|thread|#).*?([\d_]+)$/);//ghost bros use _ in ids
  var type = matches[1];
  var id = 'p' + matches[2];//fucking easymodo
  switch (type) {
    case '#':
      var target = document.getElementById(id);
      td.innerHTML = target.innerHTML;
      break;
    case 'thread':
      if (reply) {
        var target = document.getElementById(id);
        td.innerHTML = target.innerHTML;
      } else {
        var url = link.href.match(/[^#]+/)[0];
        checkCache(td, id, url);
      } break;
    case 'post':
      if (reply)
        url = link.href;
      else {//assume that hidden post is in same thread so we can cache
        var op = x('ancestor::table/preceding-sibling::*[@id][1]', link).id.match(/\d+$/)[0];
        var url = link.href.replace(/post.+/, 'thread/' + op);
      }
      checkCache(td, id, url);
      break;
  }
}

function getTB(td, link) {
  var matches = link.href.match(/(.+\/)(?:\d+[-,])*(\d+)$/);
  var url = matches[1];
  var id = matches[2];
  var target = x('ancestor::div[@class="thread"]//span[@class="postnum"]/a[text()="' + id + '"]/ancestor::*[self::div or self::table][1]', link)
  if (target)
    td.innerHTML = target.innerHTML;
  else
    checkCache(td, id, url);
}

function getChan(td, link) {
  var matches = link.href.match(/(.+\/(\d+).*)?#(\d+)$/);
  var url = matches[1];
  var op = matches[2];
  var id = matches[3];
  
  if (op == id)
    matchOP(td, id, document.body.innerHTML, url);
  else {
    var target = document.getElementById(id);
    if (target)
      td.innerHTML = target.innerHTML;
    else
      checkCache(td, id, url);
  }
}

function checkCache(td, id, url, isOP) {
  var match = isOP ? matchOP : matchPost;
  for (var i in cache)
    if (url == cache[i].url) {
      var responseText = cache[i].responseText;
      break;
    }
  if (responseText) {//cached
    match(td, id, responseText);
    rewrite(td, url);
  } else//send a request
    xhr(td, id, url, isOP);
}

function xhr(td, id, url, isOP) {
  td.innerHTML = 'Loading ' + id + '...';
  var r = new XMLHttpRequest();
  r.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var responseText = this.responseText;
        cache.push({ url: url, responseText: responseText });
        if (td.innerHTML != 'Loading ' + id + '...')
          return;//we've moved on already
        var match = isOP ? matchOP : matchPost;
        match(td, id, responseText);
        rewrite(td, url);
        wash(td);//we need to manually wash b/c we're not inserting a table, just modifying one.
      } else {
        if (td.innerHTML != 'Loading ' + id + '...')
          return;//we've moved on already
        td.innerHTML = 'Error ' + this.status + ': ' + this.statusText;
      }
    }
  }
  r.open('get', url, true);
  r.send();
}

function rewrite(td, url) {//fixme - this should be in matchPost, but if I send a url to match() and it's an op, we get an infinite loop. awkward.
  if (server == 'dis')
    return;
  var links = X(".//a[starts-with(text(), '>>')]", td);
  links.forEach(function(link) {
    link.href = url + link.hash;
  });
}

function matchPost(td, id, responseText) {
  var body = tag('body');
  body.innerHTML = responseText;
  var xpath = (server == 'dis') ?
    ".//span[@class='postnum']/a[text()='" + id + "']/ancestor::div[1]" :
    './/*[@id="' + id + '"]';
  var target = x(xpath, body);
  if (target)
    td.innerHTML = target.innerHTML;
  else
    td.innerHTML = 'Post not found';
}

function matchOP(td, id, text, url) {
  var re = new RegExp('<span class="filesize">.+\n<input.+?name="' + id + '[^_][\\s\\S]+?<\/blockquote>', 'i')//[^_] for 4chanarchive
  var target = text.match(re);
  if (target)
    td.innerHTML = target[0];
  else if (url)
    xhr(td, id, url, true);
  else//shouldn't happen
    td.innerHTML = 'Post not found';
}

function mousemove(e) {
  var bwTop = e.clientY - OFFSET_Y;
  var bwBot = bwTop + bwHeight;
  bw.style.top =
    winHeight < bwHeight || bwTop < 0 ?
      '0px' :
    bwBot > winHeight ?
      winHeight - bwHeight + 'px' :
      bwTop + 'px';

  var x = e.clientX;
  if (x > winWidth - FLIPPER) {
    bw.style.left = ''
    bw.style.right = winWidth + OFFSET_X - x + 'px'
  } else {
    bw.style.right = ''
    bw.style.left = x + OFFSET_X + 'px'
  }
}

function mouseout() {
  bw.style.display = 'none';
}