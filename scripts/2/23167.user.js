// ==UserScript==
// @name           Unpaginate Helgon.net guestbook
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23167.user.js
// @description    Unpaginates paged sets incrementally on scrolling into view
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include        http://www.helgon.net/guestbook/guestbook.aspx*
// ==/UserScript==

var items = 'id("p")/preceding-sibling::table[1]/tbody/tr';
var page = scan();
//with(page) console.log("pane: %x\nnext: %x\ndest: %x", pane, next, dest);

document.addEventListener("scroll", maybeFetch, false);

function scan( doc ) {
  var me = $X('id("p")', doc||document);
  var curr = $X('a[following-sibling::text()[1][normalize-space(.)="]"]]', me);
  var prev = $X('preceding-sibling::a[1]', curr);
  var next = $X('following-sibling::a[1]', curr);
  return {
    pane: me,
    prev: prev,
    curr: curr,
    next: next,
    time: new Date,
    dest: $X('preceding-sibling::table[1]', me)
  };
}

function maybeFetch() {
  //console.info("maybeFetch()");
  var nth = $X("("+ items +")[last()]");
  var pos = coordsOf(nth);
  if (pos.y > pageYOffset + innerHeight * 1.5)
    return; // not preload time yet

  //console.info("off");
  document.removeEventListener("scroll", maybeFetch, false);
  var page = scan();
  if (!page.next) { // nothing more to fetch; unregister ourselves
    return;
  }

  wget(page.next.href, inject);
}

function coordsOf(node) {
  if (typeof node.offsetLeft == "undefined" && node.parentNode)
    return coordsOf(node.parentNode);
  var x = 0, y = 0, w = node.offsetWidth, h = node.offsetHeight;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while (node = node.offsetParent);
  return { x:x, y:y, w:w, h:h };
}

function inject(doc, url, xhr) {
  var curr = scan(doc);
  var took = curr.time - page.time;
  //console.log("got: %x\nurl: %x\nxhr: %x\nsec: %x", doc, url, xhr, took/1e3);
  var pane = page.pane;
  if (pane && curr.pane) {
    appendTo(curr.dest.childNodes, page.dest);
    purgeSiblingsFrom(page.curr.nextSibling);
    pane.appendChild(document.createTextNode(" "));
    appendSiblingsFrom(curr.curr, page.pane);
    page = scan();

    document.addEventListener("scroll", maybeFetch, false);
    //console.info("on");
  }
}

function appendTo(nodes, target) {
  var nodes = [].slice.call( nodes );
  while (nodes.length)
    target.appendChild(document.importNode(nodes.shift(), true));
}

function appendSiblingsFrom(node, target) {
  while (node) {
    var next = node.nextSibling;
    target.appendChild(document.importNode(node, true));
    node = next;
  }
}

function purgeSiblingsFrom(node) {
  var parent = node.parentNode;
  while (node) {
    var next = node.nextSibling;
    parent.removeChild(node);
    node = next;
  }
}
