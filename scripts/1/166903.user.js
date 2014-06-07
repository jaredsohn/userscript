(function () {
// ==UserScript==
// @name          Off-CRX
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   Download chrome extensions for offline install [NON Chrome browser only!]
// @version       1.0
// @updateURL     https://userscripts.org/scripts/source/166903.meta.js
// @match         https://chrome.google.com/webstore/*
// @run-at        document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 166903,
  script_version : '1.0',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
  script_name : 'Off-CRX'
}

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}

function reAttachEv(el, ev, fn) {
  el.removeEventListener(ev, fn); el.addEventListener(ev, fn);
}

function reAttach() {
  var el, els = c2('.//div[contains(@id,"xodDL-")]');
  for (var a in els) {
    if (el = els[a]) {
      el.id = el.id.replace(/xodDL/, 'yodDL');
      reAttachEv(el, 'click', function() {
        var id;
        if (id = getID(this.id)) {
          id = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' + id + '%26uc';
          window.open(id, '_blank');
        }
        return false;
      });
    }
  }
}

function getID(str) {
  return str.match(/[a-z0-9]{30,}/i);
}

function doSnap(els, idx) {
  for (var a in els) {
    var elx;
    if (elx = els[a]) {
      var id, l, el, div;
      if (!(el = c1('.//div[@role="button"]', elx))) continue;
      if (c1('.//div[contains(@class,"yodDL")]', elx)) continue;
      if (!(id = idx)) {
        if (!(l = c1('.//a[contains(@href,"/detail/")]', elx))) continue;
        if (!(id = getID(l.href))) continue;
      }
      div = el.cloneNode();
      div.setAttribute('style', 'min-width:10px;margin-right:2px;');
      div.innerHTML = '<div class="webstore-z-A-n"><div id="xodDL-' + id + '" title="Direct Download!" class="yodDL webstore-z-A-G webstore-test-button-label">D</div></div>';
      el.parentNode.insertBefore(div, el);
    }
  }
}

function doStuff() {
  if (id = getID(window.location.pathname)) {
    doSnap(c2('.//div[contains(@class,"webstore-test-detail-dialog")]'), id);
  }
  doSnap(c2('.//div[contains(@class,"webstore-Bc-Cc")]'));
}

function doCollects() {
  doStuff();
  reAttach();
}

function doExec() {
  document.addEventListener('DOMNodeInserted', function (event) {
    try {
      var elmt = event.target, cname = elmt.className || '';
      if (cname.match(/menu/i)) {
        setTimeout(doCollects, 200);
      }
    } catch (e) {}
  }, false);
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();