// ==UserScript==
// @name           Unpaginate Google search results
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/.user.js
// @description    Unpaginates google search results on scrolling into view
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include        http://www.google.com/search?*
// ==/UserScript==

var items = 'id("res")/div/div[@class="g"]';
var next = 'id("nn")/parent::a';
var pane = 'id("navbar")';
listen();

function listen() {
  document.addEventListener("scroll", maybeFetch, false);
  //console.info("on");
  maybeFetch();
}

function deafen() {
  document.removeEventListener("scroll", maybeFetch, false);
  //console.warn("off");
}

function lastItem() {
  return $X("("+ items +")[last()]");
}

function maybeFetch() {
  //console.info("maybeFetch()");
  var nth = lastItem();
  if (nth && coordsOf(nth).y > pageYOffset + innerHeight * 1.5)
    return; // not preload time yet

  deafen(); // only one xhr at a time
  var more = $X(next);
  if (more) // fetch (and reregister unregistered scroll listener)
    wget(more.href, inject);
}

function coordsOf(node) {
  if (typeof node.offsetLeft == "undefined" && node.parentNode)
    return coordsOf(node.parentNode);
  var x = 0, y = 0;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while (node = node.offsetParent);
  return { x:x, y:y };
}

function inject(doc, url, xhr) {
  var thisNav = $X(pane);
  var nextNav = $X(pane, doc);
  var target = lastItem().parentNode;
  appendTo($x(items, doc), target);
  thisNav.parentNode.replaceChild(
    document.importNode(nextNav, true),
    thisNav
  );
  listen();
}

function appendTo(nodes, target) {
  var nodes = [].slice.call( nodes );
  while (nodes.length)
    target.appendChild(document.importNode(nodes.shift(), true));
}
