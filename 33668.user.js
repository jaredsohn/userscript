// ==UserScript==
// @name          Gmail Full Width
// @author        Raffles
// @namespace     http://ratherodd.com/
// @description   When viewing a message/conversation, the advertising box on the right is removed and messages and reply box occupy the full width available. Long titles are optionally truncated.
// @include       http*://mail.google.tld/mail/*
// ==/UserScript==

var truncate = true;

var getStyle = function(el, s) {
  var val = parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue(s), 10);
  return isNaN(val) ? false : val;
}

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) return;
  GM_addStyle('.om {top:auto !important; left:auto !important; right:4px !important; position:absolute;}');
  var fic, l, tt, msgs, mhc, rh = document.getElementById('rh');
  if (rh) {
    rh.style.display = 'none'; //can't use GM_addStyle for rh and fic because they're already inline styles
    fic = document.getElementById('fic');
    if (fic) {
      fic.style.marginRight = '0';
      window.setTimeout(function() {
        if (!rh) rh = document.getElementById('rh');
        if(!fic) fic = document.getElementById('fic');
        if (!rh || !fic) return;
        fic.style.marginRight = '0';
        l = document.getElementById('ap');
        tt = document.getElementById('tt');
        msgs = document.getElementById('msgs');
        window.setTimeout(function() { // fix toggleFixedFont script duplication of item
          var ff = document.evaluate('//div[@class="ar"]/span/img[starts-with(@src, "data:")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          if (ff && ff.snapshotLength > 0) ff.snapshotItem(0).parentNode.parentNode.removeChild(ff.snapshotItem(0).parentNode);
        }, 400);
        window.setTimeout(function() {
          tt.style.cssFloat = 'left';
          var of = document.getElementById('of');
          var oftr = of.getElementsByTagName('tr')[0];
          if (of && oftr) {
            oftr.style.display = 'none';
            var cbrn = document.evaluate('//td[@class="cbrn"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (cbrn && cbrn.snapshotLength > 0) {
              cbrn = cbrn.snapshotItem(0);
              of.style.width = 100 + 'px';
              cbrn.appendChild(of);
              cbrn.style.verticalAlign = 'top';
              //of.style.borderLeft = '1px solid #CCC';
              of.style.padding = '0 4px';
              of.style.marginTop = '4px';
            }
          }
          fic.insertBefore(l, msgs);
          rh.parentNode.removeChild(rh);
          l.style.cssFloat = 'right';
          l.style.paddingTop = '0';
          l.style.width = 'auto';
          Array.forEach(l.childNodes, function(a) {
            a.style.marginRight = '10px';
          });
          var ar = document.evaluate('//div[@id="ap"]/descendant::*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          for (var i = 0; i < ar.snapshotLength; i++) {
            ar.snapshotItem(i).style.cssFloat = 'left';
          }
          msgs.style.clear = 'both';
          var mw = getStyle(msgs, 'width');
          var ttb = tt.firstChild.firstChild;
          var ttw = mw - getStyle(l, 'width') - 40;
          if (truncate && getStyle(tt, 'width') > ttw) {
            var ell = document.createElement('b');
            ell.appendChild(document.createTextNode('...'));
            ell.style.position = 'absolute';
            ell.style.left = (ttw + 10) + 'px';
            tt.firstChild.insertBefore(ell, ttb.nextSibling);
            fic.style.position = 'relative';
            ttb.style.width = ttw + 'px';
            ttb.style.position = 'absolute';
            ttb.style.left = '10px';
            ttb.style.paddingLeft = '5px';
            ttb.style.overflow = 'hidden';
            ttb.style.backgroundColor = 'white';
            ttb.style.zIndex = '4';
            ttb.style.whiteSpace = 'nowrap';
            ttb.addEventListener('mouseover', function() {
              ttb.style.width = (mw - 8) + 'px';
              ttb.style.whiteSpace = 'normal';
              ttb.style.borderBottom = '2px solid #CCC';
              ttb.style.paddingBottom = '4px';
            }, false);
            ttb.addEventListener('mouseout', function() {
              ttb.style.width = ttw + 'px';
              ttb.style.whiteSpace = 'nowrap';
              ttb.style.borderBottom = '';
              ttb.style.paddingBottom = '';
            }, false);
          }
        }, 10);
      }, 10); // apparently necessary for some people's Gmail
    }
  }
}, false);