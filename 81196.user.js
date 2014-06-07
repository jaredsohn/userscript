(function () {
// ==UserScript==
// @name           4shared Media Shock!
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    4shared.com fast media grabber
// @version        1.7
// @include        http://www.4shared.com/audio/*
// @include        http://www.4shared.com/video/*
// @include        http://www.4shared.com/file/*
// @include        http://www.4shared.com/f/*
// @include        http://www.4shared.com/photo/*
// @include        http://www.4shared.com/document/*
// @include        http://search.4shared.com/q/*
// @match          http://www.4shared.com/audio/*
// @match          http://www.4shared.com/video/*
// @match          http://www.4shared.com/file/*
// @match          http://www.4shared.com/f/*
// @match          http://www.4shared.com/photo/*
// @match          http://www.4shared.com/document/*
// @match          http://search.4shared.com/q/*
// @exclude        http://openx.4shared.com/*
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function todes(s){var om=c2(s);if(om&&om[0])return om[0].value;}
function t(r){var l=c2(r);for(i=0;i<l.length;i++){l[i].href=l[i].href.replace(/4shared\.com\/(.*(document))\//g,'4shared.com/get/');}}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const yodUpdate = {
  script_id : 81196,
  script_version : '1.7',
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

function starter() {
  if (document.location.toString().split('search.4shared.com/')[1]) {
    t(".//div[contains(@class,'imgbox')]/a");
    t(".//div[contains(@class,'fname')]/h1/a");
  }
  else {
    var p, butt, fname, dl = '',
        dl2, loc = document.location.toString().split('www.4shared.com/')[1].split('/')[0].toLowerCase();

    if (loc == 'audio' || loc == 'video' || loc == 'file' || loc == 'f') {
      if (!(rightcols = c1(".//div[contains(@class,'rightColMargin')]"))) return;
      if (p = c1(".//object[contains(@data, 'static.4shared.com/flash/player/player.swf')]/param[@name='flashvars']")) {
        if (dl2 = decodeURIComponent(p.value).split('file=')[1].split('&')[0]) dl = dl2;
      }
      else if (p = g('ply')) dl = decodeURIComponent(p.getAttribute('flashvars')).split('file=')[1].split('&')[0];
      else if (g('music1')) {
        if (butt = g('pButton')) butt.firstElementChild.click();
        if (dl2 = todes("//object[@classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6']/param[@name='URL']")) dl = dl2;
      } else {
        if (dl2 = regexx(document.body.innerHTML, /getAudioHtml5Player\('([^\']+)/i)) dl = dl2;
      }
    }
    if (dl) {
      var div = document.createElement('div');
      div.setAttribute('style', 'width: 280px; margin: 5px 0px 10px 20px; -moz-border-radius: 5px; border-radius: 5px; background-color: #c71b00; padding: 10px; text-align: center;');
      div.innerHTML = '<a href="' + dl + '" target="_blank" style="color:#fff"><b>Download File</b></a>';
      rightcols.parentNode.insertBefore(div, rightcols);
    } else {
      if (dbtn = c1(".//a[contains(@class,'dbtn')]")) document.location = dbtn;
    }
  }
}

usoUpdate();
starter();
})();