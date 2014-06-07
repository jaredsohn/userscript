// ==UserScript==
// @name       FB Offensive ads
// @namespace  http://www.facebook.com/
// @version    1.0
// @description  All ads are offensive
// @match      https://www.facebook.com/*
// @match      http://www.facebook.com/*
// @copyright  2012, Atsushi Nagase
// ==/UserScript==

window.top != window.self || window.fbOffensiveAds || function(elements, classes, e, i, a, ref, role, tabIndex, text, done){
  setInterval(function() {
    elements = document.querySelectorAll("a[ajaxify]");
    done = false;
    for(i=0;i<elements.length;i++) {
      a = elements[i];
      ref = a.getAttribute("ajaxify");
      if(/^\/ajax\/emu\/end\.php.+/.test(ref)) {
        role = a.getAttribute("role");
        tabIndex = parseInt(a.getAttribute("tabindex"));
        classes = (a.className||"").split(" ");
        if((classes.indexOf("uiCloseButton") != -1 && classes.indexOf("selected") == -1)||(role=="menuitem"&&tabIndex==0)) {
          e = document.createEvent("MouseEvent");
          e.initEvent("click", true, true);
          a.dispatchEvent(e);
          done = true;
        }
      }
    }
    if(done) return;
    elements = document.querySelectorAll("form.fbEmuForm input[name='ed[choice]'][value='2']");
    for(i=0;i<elements.length;i++) {
      a = elements[i];
      e = document.createEvent("MouseEvent");
      e.initEvent("click", true, true);
      a.dispatchEvent(e);
      done = true;
    }
    if(done) return;
    elements = document.querySelectorAll(".fbEmuHideThanks");
    for(i=0;i<elements.length;i++) {
      a = elements[i].parentNode.parentNode;
      a.parentNode.removeChild(a);
    }
  }, 100);
  window.fbOffensiveAds = true;
}();