(function () {
// ==UserScript==
// @name           Fly-Ads-Fly (adf.ly / 9.bb / u.bb) auto Redirect
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    adf.ly / 9.bb auto Redirect
// @version        2.1
// @include        http://adf.ly/*
// @include        http://9.bb/*
// @include        http://u.bb/*
// @include        http://j.gs/*
// @include        http://q.gs/*
// @match          http://adf.ly/*
// @match          http://9.bb/*
// @match          http://u.bb/*
// @match          http://j.gs/*
// @match          http://q.gs/*
// ==/UserScript==

const yodUpdate = {
  script_id : 89322,
  script_version : '2.1',
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
      sSrc += '&redir=yes';
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
function urldecode(str){return unescape(decodeURIComponent(escape(str)));}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(urldecode(s));}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function go(url){
  if (!isUrl(url)) return;
  var doc = document.top ? document.top : document;
  //alert(url);
  doc.location = url;
}

function doStuff() {
  if (usoUpdate()) {
    setTimeout(doExec, 50000) //wait before continuing
  } else {
    doExec();
  }
}

function doExec() {
  document.cookie = "PHPSESSID=";
  var a, rgx;
  var head = urldecode(document.head.innerHTML);

  if (
      (rgx = regexx(head, /l\.php\?url=([^\']+)/)) ||
      (rgx = regexx(head, /#skip_button.*href',\s?'([^\']+)/)) ||
      (rgx = regexx(head, /url\s?=\s?'([^\']+)/)) ||
      (g('adfly_bar') &&  (rgx = regexx(head, /self\.location.*=.*(http.*?)'/)))
    ) {
      return go(rgx);
  }

  if (rgx = regexx(urldecode(document.location.href), /\d+\/(http.*?)$/i)) {
    return go(rgx);
  }

  if (rgx = regexx(urldecode(document.location.href), /\/locked\/\d+\//i)) {
    if (a = c1(".//a", g('continue'))) {
      if (!(/^(https?)/.test(a.href))) a.href = document.location.host + a.href;
      go(a.href);
    }
  }
}

doStuff();
})();