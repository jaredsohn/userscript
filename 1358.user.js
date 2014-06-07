// ==UserScript==
// @name          Edit This Journal
// @namespace     net.moeffju.dA
// @description	  Adds buttons to easily edit your journals
// @include       http://*.deviantart.com/
// @include       http://*.deviantart.com/journal/*
// ==/UserScript==

// ÃÂ© 2005 Matthias Bauer <http://moeffju.deviantart.com/>
// Licensed under the GNU General Public License, version 2 (and no later version)

(function() {

function nsByTag(elem, tagName) {
  while (elem = elem.nextSibling) {
    if (elem.tagName == tagName)
      return elem;
  }
  return null;
}

function fcByTag(elem, tagName) {
  if (!elem || !elem.firstChild) return null;
  elem = elem.firstChild;
  while (elem) {
    if (elem.tagName == tagName)
      return elem;
    elem = elem.nextSibling;
  }
  return null;
}

function nsWithClass(elem, className) {
  while (elem = elem.nextSibling) {
    if (hasClass(elem, className))
      return elem;
  }
  return null;
}

function init() {
  // Check whether we are on the user's own page.
  eval("var dm = " + document.getElementsByName("deviantMETA")[0].getAttribute('content'));
  if (!dm || !dm.username) return;
  if (document.location.href.substr(7, dm.username.length).toLowerCase() != dm.username.toLowerCase())
    return;
  
  if (document.editThisPostRun == 1) {
    alert('Already applied. Not running again.');
    return;
  }
  
  var divs = document.getElementsByTagName('DIV');
  var journals = new Array();
  
  // Get all journals
  for (var i = 0; i < divs.length; i++) {
    if (hasClass(divs[i], 'journal'))
      journals.push(divs[i]);
  }
  
  // Add [Edit] link
  for (var i = 0; i < journals.length; i++) {
    var s = fcByTag(journals[i], 'DIV');
    
    // Get journal ID
    var jid = fcByTag(nsWithClass(nsByTag(s, 'DIV'), 'section-foot'), 'A').href.replace(/.*\/(\d+)\/?$/, '$1');
    
    // Created link
    var el = document.createElement('A');
    el.href = 'http://my.deviantart.com/journal/edit/' + jid;
    el.textContent = '[Edit Post]';
    el.style.cssFloat = 'right';
    
    // Append link
    var h = fcByTag(s, 'P');
    s.insertBefore(el, h);
  }
  
  document.editThisPostRun = 1;

  return;
}

init();

})();
