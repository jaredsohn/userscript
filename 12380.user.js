// ==UserScript==
// @name          funP no iframe
// @author        wctang <wctang@gmail.com>
// @include       http://funp.com/*
// @include       http://www.hemidemi.com/bookmark/*
// @description   Remove iframe feature in funP, HemiDemi.
// @version       0.2
//
// Change Log
// ==========
// v0.1 08/07/03 Add HemiDemi
// v0.1 07/09/19 Create.
//
// ==/UserScript==

(function() {

var outwin = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;

function rt() { return true; }

function create_lnk(lnk) {
  var prev = outwin.document.createElement('a');
  prev.innerHTML = '[p]';
  prev.style.fontSize='small';
  prev.href = lnk.href;
  prev.onclick = lnk.onclick;
  lnk.parentNode.appendChild(prev);
  lnk.onclick = rt;
}

function clear_iframe() {
  var els = outwin.document.getElementsByTagName('div');
  for(var i in els) { var el = els[i];
    if(el && !el.r) {
      if(el.className == 'title') {
        var lks = el.getElementsByTagName('a');
        if(lks[0]) create_lnk(lks[0]);
      } else if(el.className == 'thumbnail') {
        var lks = el.getElementsByTagName('a');
        if(lks[0]) lks[0].removeAttribute('onclick');
      }
      el.r=1; 
    }
  }
  var els = outwin.document.getElementsByTagName('li');
  for(var i in els) { var el = els[i];
    if(el && !el.r) {
      if(el.className == 'title') {
        var lks = el.getElementsByTagName('a');
        if(lks[0]) create_lnk(lks[0]);
      } else if(el.className == 'collapsable') {
        var lks = el.getElementsByTagName('a');
        if(lks[1]) create_lnk(lks[1]);
      }
      el.r=1; 
    } 
  }
}

function clear_run() {
  try {
    clear_iframe();
  }catch(e){}
  setTimeout(clear_run,500);
}



function clear_hemi() {
  var els = outwin.document.getElementsByTagName('a');
  for(var i in els) { var el = els[i];
    if(el.className == 'title') {
      el.removeAttribute('onclick');
    }
  }
}



var isfunp = /^http:\/\/(?:www.*\.)?funp\.com(?:\/.*)?$/;
var ishemi = /^http:\/\/(?:www.*\.)?hemidemi\.com\/bookmark(?:\/.*)?$/;


if(isfunp.exec(location.href)) {
  setTimeout(clear_run,100);
} else if(ishemi.exec(location.href)) {
  
  clear_hemi();
}

})();
