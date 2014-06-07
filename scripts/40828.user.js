// ==UserScript==
// @name           OkCupid quick tab switching
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/40828.user.js
// @description    Makes it quicker to switch back and forth between the About, Pictures, Tests, Journal and Compare tabs on OkCupid after they have loaded once.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include        http://www.okcupid.com/profile/*
// ==/UserScript==

var nav_xpath = '//ul[contains(@class,"navigation")]';
var nav = $X(nav_xpath);
var nodes = [];
var debug = typeof this.nodes == "object";
if (debug) unsafeWindow.q = this;
if (is_handled_tab()) {
  nodes[current_tab_no()] = $x('following-sibling::*', nav);
  nav.addEventListener("click", change_tab, true);
  // make other places in the page that links these tabs have the same effect:
  listen_on_non_nav();
}

function listen_on_non_nav() {
  nav_links().forEach(function(a, n) {
    if (!is_handled_tab(n)) return;
    //console.log(n, a);
    for each (var link in [].slice.call(document.links))
      if ((a != link) && url_eq(a.href, link.href)) {
	//console.log(link);
	link.addEventListener("click", non_nav_change_tab, true);
      }
  });
}

function current_tab_no() {
  return $X('count(li[contains(@class,"current")]/preceding-sibling::li)', nav);
}

function is_handled_tab(number) {
  return [1,1,1,1,0,1][number || current_tab_no()];
}

function nav_links() {
  return $x('li/a', nav);
}

function url_eq(a, b) {
  function norm(x) {
    return x.replace(/\/$/, "");
  }
  return norm(a) == norm(b);
}

// proxy event handler that fake-forwards the click event to the navbar link
function non_nav_change_tab(e) {
  var a = $X('ancestor-or-self::a', e.target);
  for each (var link in nav_links())
    if (url_eq(a.href, link.href)) {
      var event = { target: link };
      event.__proto__ = e;
      change_tab(event);
      break;
    }
}

function change_tab(e) {
  if (e.button || e.altKey || e.shiftKey || e.metaKey) return;
  var old_num = current_tab_no();
  var new_tab = $X('ancestor-or-self::li[1]', e.target);
  var old_tab = $x('li', nav)[old_num];
  if (old_tab == new_tab) return;
  add_class("current", new_tab);
  sub_class("current", old_tab);
  if (!is_handled_tab()) return;
  var new_num = current_tab_no();

  nodes[old_num].forEach(hide);
  if (nodes[new_num]) {
    nodes[new_num].forEach(show);
  } else {
    var a = unsafeWindow.a = $X('ancestor-or-self::a', e.target);
    wget$x(a.href, inject_page, nav_xpath + '/following-sibling::* | //style',
	   !!"GM", !!"div");
  }
  e.preventDefault();
  e.stopPropagation();
}

function inject_page(page, url, doc) {
  if (debug) unsafeWindow.d = doc;
  nodes[current_tab_no()] = page;
  page.forEach(append);
}

function append(node) {
  nav.parentNode.appendChild(node);
}

function add_class(name, node) {
  return node.className = sub_class(name, node) +" "+ name;
}

function sub_class(name, node) {
  return node.className = node.className.replace(" " + name, "");
}

function hide(node) {
  node.style.display = "none";
}

function show(node) {
  node.style.display = "";
}
