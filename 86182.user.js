(function () {
// ==UserScript==
// @name           vidxden.com (formerly divxden.com) downloader
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    Video Auto downloader for vidxden.com (formerly divxden.com)
// @include        http://www.vidxden.com/*
// @match          http://www.vidxden.com/*
// @version        1.4
// @run-at         document-start
// ==/UserScript==

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const script_id = 86182;
const script_version = '1.4';

function usoUpdate(el) {
  el = el ? el : document.body;
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.tk/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

function starter(){
  var freebutt = c1('.//input[contains(@name,"method_free")]');
  if (freebutt) {
    freebutt.click();
  } else {
    var packed, textarea, tab, dummy, fsrc, div;
    if (
      (packed = c1('.//script[contains(text(),"p,a,c,k,e,d")]')) &&
      (textarea = c1('.//textarea')) &&
      (tab =  c1('.//table[contains(@class,"result_slot")]'))) {
        textarea.value = eval(packed.textContent.slice(4));
        dummy = textarea.value;
        if (!(fsrc = regexx(dummy, /src="([^\"]+)/i)))
          fsrc = regexx(dummy, /file','([^\']+)/i);
        if (fsrc) {
          textarea.value = fsrc;
          div = document.createElement('div');
          div.id = 'down_note';
          div.innerHTML = '<span style="font-size: 27px!important; font-weight: bold;">-[ <a href="' + fsrc + '">\
          Download Video</a> ]-</span><br /><br />\
          more scripts ; <a href="http://krakenstein.cz.cc" target="_blank">krakenstein.cz.cc</a><br /><br /><br />';
          tab.parentNode.insertBefore(div, tab);
        }
    }
  }
}

starter();
usoUpdate();
})();