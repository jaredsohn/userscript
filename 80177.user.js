(function () {
// ==UserScript==
// @name           kapan(rabi)lagi
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    kapanlagi.com AdsBusters PRO 2010
// @version        1.3
// @include        http://*.kapanlagi.com/*
// @include        http://kapanlagi.com/*
// @match          http://*.kapanlagi.com/*
// @match          http://kapanlagi.com/*
// @run-at         document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 80177,
  script_version : '1.3',
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
  const s_Redir = false;
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      if (s_Redir) sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function addCS(str, css, link, id) {
  if (g(id)) return;
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement(css ? "style" : "script");
    if (id) node.id = id;
    node.type = css ? "text/css" : "text/javascript";
    if (link) node.src = str;
    else node.appendChild(document.createTextNode(str));
    heads[0].appendChild(node);
  }
}


// start INJECT
var cooks = ["sawAd=;", "expandbanner=;", "AdDisplay=;"];
for (a in cooks) {
  //alert(cooks[a]);
  document.cookie = cooks[a];
}

function doload(e) {
  addCS("$(\"#v5-footer\").next().html('').css('display','none');OA_show=function(){return false;}", false, false, "yod_JS1");
}

function doExec(e) {
  const mycss = "\
#v5-topframe, #v5-bottomframe, #v5-leaderboard, #v5-popup, div[id^=beacon], div[id^=v5-showcase], #v5-marcommpromotion, #v5-mobilepromotion {display:none!important}\
#v5-container {padding:0!important} #v5-footer {padding-bottom:0!important}\
";

  addCS(mycss, 1, false, "yod_CSS");
  document.addEventListener("load", doload, true);
  if (b = g('v5-container')) usoUpdate(b);
}

if (rg = document.location.href.toString().match(/\/takeover.html\?(http.*)$/)) {
  document.location.replace(rg[1]);
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();