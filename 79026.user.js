(function () {
// ==UserScript==
// @name          IDWS Download Helper
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   IDWS / Indowebster (www.indowebster.com) Download Helper
// @version       3.7
// @match         http://*.indowebster.com/download*
// @run-at        document-start
// ==/UserScript==

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function isUrl(s){return /^((ftp|https?):\/\/)+([\w\d\.]+([\w]{2,6})?)/ig.test(decodeURIComponent(s.trim()));}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const yodUpdate = {
  script_id : 79026,
  script_version : '3.7',
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
  const s_Redir = true;
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

function go(b, t) {
  var dl = t ? b.href : b.parentNode.href;
  if (isUrl(dl)) document.location = dl;
}

function fetch(e) {
  if (e.target.tagName !== 'A') return;
  return go(e.target, 1);
}

function yodstamp() {
  window.document.title = "[+] IDWS Download Helper // Silahkan Tunggu";
}
  
function doStuff() {
  usoUpdate();
  var l, b, loc = document.location.toString();
  if (regexx(loc, /\/downloads\//i)) {
    if (b = c1(".//strong[@id='filename']")) {
      yodstamp();
      b.parentNode.addEventListener("DOMNodeInserted", fetch, false);
      var s = document.createElement('script');
      s.innerHTML = "window.stop();s=3;startCount();";
      document.body.appendChild(s);

      setTimeout(function(){
        if (b.parentNode.href) go(b);
        else {
          if (l = regexx(document.body.innerHTML, /(\$\.post.*?)function/gmi)) {
            var s = document.createElement('script');
            s.innerHTML = l + "(u){window.stop();window.location=u;});";
            document.body.appendChild(s);
          }
        }
      }, 5000);
    }
  } else {
    if (b = c1(".//div/a/input[contains(@class,'r3')]")) {
      yodstamp();
      go(b);
    }
  }
}

document.addEventListener("DOMContentLoaded", doStuff, true);
})();