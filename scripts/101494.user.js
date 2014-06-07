// ==UserScript==
// @name           Restore Blogger navbar
// @namespace      http://stiell.org/
// @description    Restore Blogger navbar that's often hidden by spam blogs.
// @author         Stian Ellingsen
// @license        http://creativecommons.org/publicdomain/zero/1.0/
// @version        0.1
// @include        http://*.blogspot.com/*
// @include        http://*
// ==/UserScript==

var isNav = function(u) {
  return u.indexOf('http://www.blogger.com/navbar.g?') === 0;
}

// Sets style properties for an element, with important priority.
var setStyle = function(e, p) {
  for (k in p) e.style.setProperty(k, p[k], 'important');
};

// Overrides any attempt to hide the navbar using styles.
var mkVisible = function(f) {
  setStyle(f, { position: 'static', width: '100%', height: '30px',
    display: 'block', visibility: 'visible', opacity: '1' });
}

// Makes sure nothing is on top of the navbar.
var fix = function(f) {
  var w = document.createTreeWalker(document.documentElement, 1, null, false);
  var z = 0;
  while(w.nextNode())
    z = Math.max(z,
      Number(window.getComputedStyle(w.currentNode).zIndex) || 0);
  setStyle(f, { position: 'absolute', top: '0', left: '0', bottom: 'auto',
    right: 'auto', 'z-index': 1 + z });
}

// Look for the navbar iframe.
var f = document.getElementById('navbar-iframe');

// If not found even though this looks like a Blogger site, look harder.
// If found, make sure it's visible.
if (f == null && (location.hostname.substr(-13) === '.blogspot.com' ||
    document.head.innerHTML.indexOf(
      '<meta name="generator" content="Blogger" />') !== -1)) {
  const P = /<iframe [^>]+><\/iframe>/g;
  // Search text and comment nodes for the iframe code.
  var w = document.createTreeWalker(
    document.documentElement, 132, null, false);
  // Insert anything that looks like a navbar into a highlighted div.
  var e = document.createElement('div');
  mkVisible(e); setStyle(e, {border: '2px solid Red', height: 'auto'});
  while(w.nextNode()) {
    var m = w.currentNode.nodeValue.match(P) || [];
    for (var i = 0; i < m.length; i++) {
      e.innerHTML += m[i]; f = e.lastChild;
      // Check that this really is a navbar.
      if (f.id === 'navbar-iframe' && isNav(f.getAttribute('src') || ''))
        mkVisible(f);
      else
        e.removeChild(f);
    }
  }
  // Insert the highlighted div into the top of the body.
  document.body.insertBefore(e, document.body.firstChild);
  fix(e);
} else if (f != null && isNav(f.src)) {
  // Make the navbar and any parents visible.
  mkVisible(f);
  fix(f);
  while((f = f.parentNode) != document.body)
    mkVisible(f);
}
