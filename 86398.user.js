(function () {
// ==UserScript==
// @name           Duckload(new) - auto downloader
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    New Duckload.com auto downloader
// @version        1.5
// --------------------------------------------------------------[ FF ]-
// @include        http://www.duckload.com/*
// ----------------------------------------------------------[ CHROME ]-
// @match          http://www.duckload.com/*
// ==/UserScript==

const script_id = 86398;
const script_version = '1.5';

var loc = document.location.toString();

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}
function h(id,c){el=g(id);if(el!==null && el.tagName!=='STYLE'){if(c)el.innerHTML='<!--www.krakenstein.cz.cc-->';
else{if(el.parentNode)el.parentNode.removeChild(el);else s(el,'display: none; visibility: hidden;');}}}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);}
function regexx(s,rg){var rs;if(rs=s.match(rg))return rs[1];}

function usoUpdate(el) {
  el = el ? el : document.body;
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.cz.cc/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

// Additional Ads Remover
h('nstream_left', true); h('nstream_right', true); h('layer_box', true);
var free = g('show_free');
if (free) {
  // Page with time-wait
  var nstream;
  if (nstream = g('nstream')){
    var script_f = document.createElement('script');
    script_f.textContent = 'function check(yodbutt){\
    return yodbutt.is(\':hidden\');}\
    function dodiv(){\
    var yodbutt=$("#show_free");if (check(yodbutt))check(yodbutt);\
    else{return $("#form").submit();}setTimeout(\'dodiv()\',10);}\
    dodiv();';
    document.body.appendChild(script_f);
    var els = document.getElementsByClassName('pricing');
    if (els.length) {
      var div = document.createElement('div');
      div.id = 'down_note'; div.className = 'pricing_table_top';
      div.innerHTML = 'Please wait, your download will begin automatically..';
      s(div, 'color: #C00; font-size: 18px!important; font-weight: bold; \
      margin: 5px auto !important; text-align: center;');
      els[0].parentNode.insertBefore(div, els[0]);
    }
  }
} else {
  // Page with Stream Player / Download
  var str, finalurl, nstream_middle = g('nstream_middle');
  if (nstream_middle) {
    str = nstream_middle.innerHTML;
    var player, divx;
    if (player = g('player')) {
      s(player, 'display: block !important;'); if (divx = g('divx')) s(divx, 'display: none !important;');
      var finalurl = regexx(player.innerHTML, /src="([^\"]+)/);
      if (isUrl(finalurl)) {
        var stream_publish, div = document.createElement('div');
        div.setAttribute('style', 'text-align:center; margin: 20px 0 10px;');
        div.innerHTML = '<span style="font-size: 27px!important; font-weight: bold;">\
          -[ <a href="' + finalurl + '">Download Video</a> ]-</span><br />\
          more scripts ; <a href="http://krakenstein.cz.cc" target="_blank">krakenstein.cz.cc</a>';
        if (stream_publish = g('stream_publish')) stream_publish.parentNode.insertBefore(div, stream_publish);
      }
    }
  }
}

usoUpdate();
})();