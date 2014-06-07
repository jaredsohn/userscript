(function () {
// ==UserScript==
// @name           TinyPaste Or Tny.cz [Kaum Ndaloe 2014]
// @namespace      http://kaumndaloe.blogspot.com
// @author         Kaum Ndaloe
// @icon            http://www.gravatar.com/avatar/bdb861650cd3b4a7be02052005302d6b.png
// @description    tinypaste.com auto Link, less banner!
// @version        1.3
// @updateURL      https://userscripts.org/scripts/source/116125.meta.js
// @match          http://*.tinypaste.com/*
// @match          http://*.tny.cz/*
// @run-at         document-start
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function urldecode(str){return unescape(decodeURIComponent(escape(str)));}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(urldecode(s));}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 116125,
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

function doListen(ev) {
  var tag, el = ev.target;

  if (tag = el.tagName) {
    switch (tag.toUpperCase()) {
      case "DIV":
        if (el.id && regexx(el.id, /(\w+){20,}/)) {
          ev.preventDefault();
          el.parentNode.removeChild(el);
        }
    }
    return false;
  }
}

function doExec() {
  const mycss = "\
#pastecontainer {width:98%!important;height:98%!important;z-index:999999!important;}\
#pastecontainer a[href*=\"getpaid.php\"], *[class*=\"bsap\"], *[id*=\"ads\"], #captcha_overlay {display:none!important}\
";
  addCS(mycss, 1, false, "yod_CSS");

  var content;
  if (content = g("thepaste")) {
    usoUpdate();

    content.innerHTML = content.textContent.
      replace(/((ftp|https?)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/gmi, '<a target="_blank" href="$1">$1</a>');
  }
}

document.addEventListener("DOMNodeInserted", doListen, false);
document.addEventListener("DOMContentLoaded", doExec, true);
})();