(function () {
// ==UserScript==
// @name           vivanews xstripper
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    vivanews.com AdsBusters PRO 2010
// @require        http://sizzlemctwizzle.com/updater.php?id=81975
// @include        http://vivanews.com/*
// @include        http://*.vivanews.com/*
// @match          http://vivanews.com/*
// @match          http://*.vivanews.com/*
// @version        1.3
// ==/UserScript==

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function h(id,c){
  el=g(id);if(el!==null&&el.tagName!=='STYLE'){
  if(c)el.innerHTML='<!--www.krakenstein.cz.cc-->';
  else{if(el.parentNode)el.parentNode.removeChild(el);else s(el,'display:none');}}
}
function c(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el||document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function mh(e,r){if(r&&g(r)==null)return;var l=c2(e,g(r));for(i=0;i<l.length;i++)h(l[i]);}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const script_id = 81975;
const script_version = '1.3';

function usoUpdate(el) {
  el = el ? el : document.body;
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.cz.cc/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

function injectAfter(el, par) {
  return par.parentNode.insertBefore(el, par.nextElementSibling);
}

var cright = '', right = c2('.//div[contains(@id,"blokWadah")]', g('bodyRight'));

if (right.length) {
  for (i = 0; i < right.length; i++) {
    cright += right[i].parentNode.innerHTML;
  }
  g('bodyRight').innerHTML = '<div id="blokRight">' + cright + '</div>';
}

h(c('.//iframe', g('header')));
h('MAX_bottomframe');

if (document.location.toString().split('www.vivanews.com/')[0]) {
  mh(".//div[contains(@id,'ads_')]", 'irightblock');
  mh(".//iframe", 'irightblock');
  h('adv_right');
}

var player, vsrc, div;

if (player = g('vivaplayer-small')) {
  if (vsrc = regexx(decodeURIComponent(player.innerHTML), /fvideo=([^\&]+)/i)) {
    if (isUrl(vsrc)) {
      div = document.createElement('div');
      div.innerHTML = '-[ <b><a href="' + vsrc + '" target="_blank">Download Video</a></b> ]-';
      div.id = 'yod_vivanews_DownloadVideo';
      injectAfter(div, player);
      div = document.createElement('div');
      div.className = 'reset10';
      injectAfter(div, player);
    }
  }
}
usoUpdate();
})();