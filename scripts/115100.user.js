(function () {
// ==UserScript==
// @name           rapid8ers
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Rapid8.com Lite, min ads, fast download!
// @version        1.0
// @include        http://rapid8.com/
// @include        http://*.rapid8.com/
// @include        http://rapid8.com/index.php*
// @include        http://*.rapid8.com/index.php*
// @include        http://rapid8.com/stage2.php
// @include        http://*.rapid8.com/stage2.php
// @match          http://rapid8.com/
// @match          http://*.rapid8.com/
// @match          http://rapid8.com/index.php*
// @match          http://*.rapid8.com/index.php*
// @match          http://rapid8.com/stage2.php
// @match          http://*.rapid8.com/stage2.php
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function s(el,s){el.setAttribute('style',s);}

const yodUpdate = {
  script_id : 115100,
  script_version : '1.0',
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

function addStyle(css) {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    heads[0].appendChild(node);
  }
}

const mycss = "\
#_GINTERBG, .blazebut2 {display:none!important;}\
#yod_rapid8_wrapper {z-index:999999;max-width:500px;margin:10px auto;\
padding:10px;display:table;background-color:#EDF0F3;}\
.yod_footer {width:100%;clear:both;margin:10px auto;text-align:center}\
.yod_footer hr {background-color:#CAD6F2;height:1px;border:0; width:100%;}\
.yod_footer span {font-size:x-small;font-style:italic;margin:5px;display:block;}\
";

function Lite(el) {
  document.body.innerHTML = "";
  document.body.appendChild(el);
  document.body.addEventListener("DOMNodeInserted", doInject, false);
}

function doInject(ev) {
  var el = ev.target;
  if (el.parentNode.tagName !== 'BODY') return;
  ev.preventDefault();
  el.parentNode.removeChild(el);
  //s(el, "display:none!important;");
}

function doExec() {//
  var target, el, str;
  if (!(target = g('loadlngarea'))) target = c1(".//form[contains(@name,'dlform')]");
  if (target) {
    addStyle(mycss);

    str = "window.onbeforeunload=null;window.onunload=null;"

    if (el = c1(".//input[contains(@name,'dlurl2')]")) {
      el.removeAttribute("onmousedown");
    } else {
      str += "inputDLURL();";
    }
    el = document.createElement("script");
    el.innerHTML = str;
    document.body.appendChild(el);

    el = document.createElement("div");
    el.id ="yod_rapid8_wrapper";
    el.appendChild(target);
    el.innerHTML += '<div class="yod_footer"><hr />\
<span>Script Update ; \
<a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank">\
rapid8ers (' + yodUpdate['script_version'] + ')</a> - \
<a href="http://blog.krakenstein.net/" target="_blank">\
Official Web</a>\
</span></div>';

    Lite(el);
  }
}

usoUpdate();
doExec();
})();