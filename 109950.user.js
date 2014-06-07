(function () {
// ==UserScript==
// @name           Adf.ly Clone Buster!
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Auto redirect link ads build with Adf.ly Clone soft
// @version        1.0
// @include        *
// ==/UserScript==

const yodUpdate = {
  script_id : 109950,
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

function urldecode(str){return unescape(decodeURIComponent(escape(str)));}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(urldecode(s));}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c3(cn,root){return c1(".//*[contains(@class,'"+cn+"')]",root);}

function doStuff(cmd) {
  if (usoUpdate()) {
    setTimeout(function(){doExec(cmd);}, 5000) //wait before continuing
  } else {
    doExec(cmd);
  }
}

function findStuff() {
  var url, val, packed, unpacked, st = "";
  if (!(packed = c1(".//script[contains(text(),'p,a,c,k,e,d')]"))) {
    unpacked = c1(".//script[contains(text(),'ajax.fly.php')]");
  }
  if (packed || unpacked) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    if (packed) {
      var ta = document.createElement('textarea');
      ta.value = eval(packed.textContent.trim().slice(4));
      val = ta.value;
    } else {
      val = unpacked.textContent;
    }
    url = regexx(val, /top\.location\.href\s?=\s?'([^\']+)/);
    if (isUrl(url)) {
      st = "top.location.href=unescape('"+url+"');";
    } else {
      url = regexx(val,/http:.*?ajax\.fly\.php/i);
      var aid = regexx(val,/aid\:(\d+)/i);
      var lid = regexx(val,/lid\:(\d+)/i);
      var oid = regexx(val,/oid\:(\d+)/i);
      st = "\
        $.post('"+url+"',{opt:'make_log',args:{aid:"+aid+",lid:"+lid+",oid:"+oid+",ref:''}},function(data) {\
          res=eval('('+data+')');if(url=res.message.url) top.location.href=unescape(url);\
        });\
      ";
      st += "function yod_rr(){$.post('"+url+"',{opt:'check_log',args:{lid:"+lid+",oid:"+oid+"}});}\
      setInterval(yod_rr,1000);";
    }
    s_gm.textContent = st;
    document.body.appendChild(s_gm);
  }
}

function doListen(ev) {
  if (/DIV/.test(ev.target.tagName)) {
    if (ev.target.className == "skip_btn") {
      findStuff();
    }
  }
}

function doExec(cmd) {
  findStuff();
  cmd.addEventListener("DOMNodeInserted", doListen, false);
}

var fly_head = c3('fly_head');
if (fly_head /*&& c3('fly_banner') && c3('fly_head_bottom') */&& c3('fly_frame')) {
  doStuff(fly_head);
}
})();