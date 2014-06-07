(function () {
// ==UserScript==
// @name           Sobat Ganool
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    ganool.com auto Links!
// @version        2.2
// @match          http://*.ganool.com/*
// @match          http://ganool.com/*
// @run-at         document-start
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function regexx(s,rg,a){var rs;if(rs=s.match(rg)){return a?rs:rs[1]?rs[1]:rs[0]||rs;}}
function d64(data){
var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var out="",c1,c2,c3,e1,e2,e3,e4;for(var i=0;i<data.length;){e1=tab.indexOf(data.charAt(i++));
e2=tab.indexOf(data.charAt(i++));e3=tab.indexOf(data.charAt(i++));e4=tab.indexOf(data.charAt(i++));
c1=(e1<<2)+(e2>>4);c2=((e2&15)<<4)+(e3>>2);c3=((e3&3)<<6)+e4;out+=String.fromCharCode(c1);
if(e3!=64)out+=String.fromCharCode(c2);if(e4!=64)out+=String.fromCharCode(c3);}return out;}
function urlencode(str) {
  return encodeURIComponent(str).replace(/!|'|\(|\)|\*|%20/g, function(x) {
		return {
			"!":	"%21", "'":	"%27", "(":	"%28", ")":	"%29", "*":	"%2A", "%20":	"+"
		}[x];
	});
}

const yodUpdate = {
  script_id : 116122,
  script_version : '2.2',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
  script_name : 'Sobat Ganool'
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

const mycss = "\
#uripno,#pateni,#floating_banner_top,#ad2_inline {display:none!important}\
#yodFrameParent {padding: 10px; color: #333;background-color: white; margin: 50px auto;}\
#yodFrameParent a {color: #206496;} #yodFrameParent a:hover {color: #2885CA;}\
#yodFrameParent > div {clear:both; margin-bottom: 10px;}\
.rounded10 {-webkit-border-radius: 10px;-khtml-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;}\
.rounded3 {-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px; border: 1px solid #CCC;}\
#copyleft {font-weight: bold;}\
#yodError {text-align: center; color: #c30303;}\
.yodShow {display: block !important;}\
.yodHide {display: none !important;}\
#yodSubSearch_div {text-align: center !important;}\
.yodLoading {height: 50px; clear:both; background: #FFF \
url('data:image/gif;base64,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\
wAAAAAAAAAAAA==') no-repeat bottom center; text-align: center; font-size: 11px; font-style: italic;}\
#yodIMDB_div, #yodSub_div, #yodMHReload_div {text-align: center; font-weight: bold;}\
#yodIMDB_butt, #yodSub_butt , #yodReMH_butt {padding: 5px 0; border: 1px solid #CCC; cursor: pointer;}\
#yodIMDB_butt:hover, #yodSub_butt:hover, #yodReMH_butt:hover {background-color: #CCC;}\
.yodIMDBTbl {width: 100%; text-align: left;}\
.yodIMDBTbl * {vertical-align: top;}\
.yodIMDBTbl th {text-align: right;}\
.res {clear:both; padding: 5px; max-height: 200px; overflow-x: hidden; overflow-y: auto;}\
.res::-webkit-scrollbar {width: 10px; background-color: #CCC;}\
.res::-webkit-scrollbar-thumb {background-color: #E9E9E9;}\
.res::-webkit-scrollbar, .res::-webkit-scrollbar-thumb {overflow: visible; border-left: solid 1px #CCC;}\
.subs {margin: 0 -15px!important}\
.subs li {color: #333!important; padding: 5px 15px!important; border-bottom: solid 1px #CCC !important;}\
.subs li:last-child {border-bottom: none !important;}\
.subs li a:last-child {color:green !important;}\
.subs li a[href*=\"/english/\"] {color:#00878c !important;}\
.subs li a[href*=\"/indonesian/\"] {color:#dc0178 !important;}\
#cse-search-results iframe {height:500px !important;}\
#yodPaste2 > div {padding: 3px 0 !important;}\
#yodPaste2 div:not(:last-child) {border-bottom: solid 1px #CCC !important;}\
#yodPaste2 .MHSuccess {color:green !important;}\
#yodPaste2 .MHError {color:#dc0178 !important;}\
";

var yod_runScript = function() {
  g = function(id) {if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
  c1 = function(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
  c2 = function(_q,_el){
    var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
    while (el=els.iterateNext())res.push(el);return res;
  }
  regexx = function(s,rg,a){var rs;if(rs=s.match(rg)){return a?rs:rs[1]?rs[1]:rs[0]||rs;}}

  yodFrameParent = g('yodFrameParent');
  yodIMDB_butt = g('yodIMDB_butt');
  yodIMDB_res = g('yodIMDB_res');
  yodSub_butt = g('yodSub_butt');
  yodSub_res = g('yodSub_res');
  yod_Paste = g('yodPaste');
  yod_Paste2 = g('yodPaste2');
  yodTitle = g('yodTitle');
  yodPaste2_load = g('yodPaste2_load');
  yodReMH_butt = g('yodReMH_butt');


  doErrMsg = function(msg) {
    if (!msg) return;
    var target = g('yodError');
    var str = target.innerHTML;
    str += "<br />" + msg;
    target.innerHTML = str.trim().replace(/^<br\s?\/?>/i, "");
  }

  finish = function(el, msg) {
    if (c = c1(".//div[@class='yodLoading']", el)) {
      el.removeChild(c);
    }

    doErrMsg(msg);
  }

  MHCount = function(ev, c, p, ld) {
    if (el = ev.target) {
      els = c2(".//span[contains(@class, 'MHLink')]", p);
      if (!yod_Paste2.className && p.innerHTML) yod_Paste2.className = "res rounded3";
      if (els.length == c) {
        ld.className = "yodHide";
        if (c1(".//span[contains(@class, 'MHError')]", p)) {
          yodReMH_butt.className = yodReMH_butt.className.replace(/(yodHide|yodShow)/, "yodShow");
        } else {
        }
      }
    }
  }

  yodGetMediahide = function(mhides) {
    yod_Paste2.className = "";
    if (!mhides) {
      yodReMH_butt.className = yodReMH_butt.className.replace(/(yodHide|yodShow)/, "yodHide");
      yod_Paste2.innerHTML = "";
      var txta;
      if (txta = g("yodTxta")) {
        mhides = txta.value.split("|");
      }
    }
    for (a in mhides) {
      var rr = "";
      var ux, u = mhides[a];
      if (ux = regexx(u, /\?([a-z0-9]+)/i)) {
        yodPaste2_load.className = "yodShow";
        FlyJSONP.post({
          myvar: u,
          url: 'http://mediahide.com/get.php?do=getlink',
          parameters: {
            url: ux,
          },
          success: function(data, myvar) {
            var mf = (data.req && data.req.toString().match(/http/)) ? data.req : 'error';
            var dl = (data.link && data.link.toString().match(/http/)) ? data.link : 'error';
            var cl = (mf.match(/http/) && dl.match(/http/)) ? "Success" : "Error";
            rr = "<span class=\"MHLink MH" + cl + "\">" + cl + ":</span> " + mf + " | " + dl;
          },
          error: function (errorMsg, myvar) {
            rr = "<span class=\"MHLink MHError\">Error:</span> " + myvar;
          },
          complete: function () {
            yod_Paste2.innerHTML += ("<div>" + rr + "</div>").replace(/((ftp|https?)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/gmi, '<a target="_blank" href="$1" class="MHLink">$1</a>');

          }
        });
      }
    }
  }

  yodPaste = function(dat) {
    var r, t = "";

    if (
      (typeof dat !== "object") ||
      (!(r = dat.query.results)) ||
      (!(r = r.result)) ||
      (r.error) ||
      (!(r.paste))
    ) return finish(yod_Paste, "Error ; Get Tinypaste links");


    var rp = r.paste
      .replace(/(do not.*\r\n+)/gmi, "")
      .replace(/(\[.*?\]+)/gm, "")
      .replace(/((ftp|https?)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/gmi, '<a target="_blank" href="$1">$1</a>')
      .replace(/(\r\n+)/gm, "<br />");

    setTimeout(function(){
      if (mhides = regexx(r.paste, /(https?\:\/\/(www\.)?mediahide\.com.+)[^\r\n]/gmi, 1)) {
        yod_Paste2.addEventListener("DOMNodeInserted",
          function(ev){
            MHCount(ev, mhides.length, this, yodPaste2_load);
          }, false
        );

        FlyJSONP.init({});

        var txta = document.createElement("textarea");
        txta.setAttribute('style', 'display:none');
        txta.value = mhides.join("|");
        txta.id = "yodTxta";
        document.body.appendChild(txta);

        yodGetMediahide(mhides);
      }
    }, 3000);

    t = r.title.trim();
    yodTitle.innerHTML += (t && (!regexx(t, /^null$/))) ? t : "Untitled";
    yod_Paste.className = "res rounded3";
    yod_Paste.innerHTML = rp;

    yodTitle.className = "yodShow";
    return finish(yod_Paste);
  }

  CreateDetailView = function(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '<table class="yodIMDBTbl"><tbody>';

    for (var i = 0; i < array.length; i++) {
      var row = 0;
      for (var index in array[i]) {
        var val;
        if (
          (!(val = array[i][index])) ||
          (regexx(val, /^n\/a/i))
        ) continue;

        switch (index.trim().toLowerCase()) {
          case 'id':
            val = '<a href="http://www.imdb.com/title/' + val + '/" target="blank"' +
            'title="Go to IMDB">' + val + '</a>';
            break;
          case 'poster':
            if (regexx(val, /http/)) {
              val = '<a href="' + val + '" target="blank"' +
              'title="Copy URL and Paste in some new (tab) browser window to access.">' +
              val.substring(0, Math.min(40, val.length)) +
              '..</a>';
            }
            break;
        }

        str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';
        str += '<th scope="row">' + index + '</th>';
        str += '<td> : </td>';
        str += '<td>' + val + '</td>';
        str += '</tr>';
        row++;
      }
    }

    str += '</tbody></table>';

    return str;
  }

  yodIMDB = function(dat) {
    if (
      (typeof dat !== "object") ||
      (!(r = dat.Title))
    ) {
      yodIMDB_butt.className = "yodHide";
      return finish(yodIMDB_res, "Error ; Get IMDB Infos");
    }

    yodIMDB_res.innerHTML = CreateDetailView([dat]);
    yodIMDB_res.className = "yodShow res rounded3";
    return finish(yodIMDB_res);
  }

  yodSub = function(dat) {
    if (
      (typeof dat !== "object") ||
      (!(r = dat.value.items))
    ) {
      yodSub_butt.className = "yodHide";
      return finish(yodSub_res, "Error ; Get IMDB Infos");
    }

    var s = "";
    for (i in r) {
      v = unescape(r[i].description)
      .replace(/[\r\n\t]/g,'')
      .replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
      if (l = regexx(v, /(<a.*?<\/a>)/gmi, 1)) {
        s += '<li>' + l.join(' by ') + '</li>';
      }
    }

    if (s) {
      yodSub_res.innerHTML = '<ul class="subs">' + s + '</ul>';
      yodSub_res.className = "yodShow res rounded3";
      return finish(yodSub_res);
    }

    yodSub_butt.className = "yodHide";
    return finish(yodSub_res, "Error ; No Subtitles");

  }
}

function hasClass(el, cn) {
  return (el.className + " ").indexOf(cn) >= 0;
}

function gTP(h) {
  var s = d64("aHR0cDovL3F1ZXJ5LnlhaG9vYXBpcy5jb20vdjEvcHVibGljL3lxbD9xPXNlbGVjdCUyMColMjBmcm9tJTIwanNvbiUyMHdoZXJlJTIwdXJsJTNEJ2h0dHAlM0ElMkYlMkZ0aW55cGFzdGUuY29tJTJGYXBpJTJGZ2V0Lmpzb24lM0ZwYXNzd29yZCUzRGdhbm9vbC5jb20lMjZpZCUzRA==");
  s += h;
  s += d64("JyZmb3JtYXQ9anNvbiZlbnY9c3RvcmUlM0ElMkYlMkZkYXRhdGFibGVzLm9yZyUyRmFsbHRhYmxlc3dpdGhrZXlzJmNhbGxiYWNrPXlvZFBhc3Rl");
  return s;
}

function gIMDB(h) {
  var s = d64("aHR0cDovL3d3dy5pbWRiYXBpLmNvbS8/dG9tYXRvZXM9dHJ1ZSZjYWxsYmFjaz15b2RJTURCJmk9");
  s += h;
  return s;
}

function gMHide(h, r) {
  var s = d64(h);
  return s;
}

function gSub(h) {
  var s = d64("aHR0cDovL3BpcGVzLnlhaG9vLmNvbS9waXBlcy9waXBlLnJ1bj9faWQ9NmE2NDA1ZWMxNjJjZDM0YmZlYzNjMGMyOGUxOWZjODQmX2NhbGxiYWNrPXlvZFN1YiZfcmVuZGVyPWpzb24=");
  s += "&rnd=" + rnd();
  s += "&url=" + h;
  return s;
}

function rnd() {
  today = new Date();
  seed = today.getTime();
  seed = (seed * 9301 + 49297) % 233280;
  return seed / (233280.0);
}

function loading(el, str) {
  var div = document.createElement("div");
  div.innerHTML = "Loading " + str + " ..";
  div.className = "yodLoading";
  el.appendChild(div);
}


function doGet(id, url, str) {
  var target = g(id);
  if (!target.innerHTML) {
    loading(target, str);
    addCS(url, false, true, "yod_" + id);
  }
  var cn = target.className.replace(/\s?(yodShow|yodHide)/, "");
  target.className = cn + " " + (!(hasClass(target, "yodShow")) ? "yodShow" : "yodHide");
}

function doListen(ev) {
  var tag, el = ev.target;

  if (yod_frun && c1(".//a[contains(@class,'feed-link')]")) doExec();

  if (tag = el.tagName) {
    switch (tag.toUpperCase()) {
      case "SCRIPT":
        if (
          ((el.id && regexx(el.id, /yod/)) || (el.src && regexx(el.src, /(ganool|googlecode|blogger|yahooapis|pipes\.|dropbox\.)/)))
        ) return false;
        break;
      case "IFRAME":
        if (
          (el.name && regexx(el.name, /googleSearchFrame/))
        ) return false;
        //
        break;
      case "DIV":
        if (!(el.tagName === "DIV" && el.id && (
          regexx(el.id, /FB/)
          || regexx(el.id, /^ad/)
        ))) return false;
        break;
      default:
        return;
    }

    ev.preventDefault();
    el.parentNode.removeChild(el);
    return false;
  }
}

function doExec(e) {
  if (e && regexx(e.target.documentURI, /fbc_channel/)) return;
  if (g("yod_CSS")) return;

  yod_frun = false;

  addCS(mycss, 1, false, "yod_CSS");
  addCS(gMHide("aHR0cDovL2RsLmRyb3Bib3guY29tL3UvODU5MDU1OS91c28vZmx5anNvbnAubWluLmpz"), false, true, "yod_xhr");

  usoUpdate();

  var parafs = c2(".//div[contains(@class,'post-body')]");

  for (i=0; i<parafs.length; i++) {
    var a, mid, mids, subURL;
    var p = parafs[i];
    var c = p.innerHTML;

    if (mids = regexx(c, /(http:\/\/(www\.)?imdb\.com.*?\/tt\d{1,}(?:\/|)+)/ig)) {
      mid = regexx(mids, /(tt\d+)/ig);
      c = c.replace(mids, '<a href="' + mids + '" target="_blank">' + mids + '</a>');
      p.innerHTML = c;
    }

    if (i >= 1) continue;

    if (a = c1(".//a[contains(@href,'subscene.com/')]", p)) {
      var subURL = encodeURIComponent(a.href);
    } else {
      // cari sub
    }

    if (a = c1(".//a[contains(@href,'tinypaste.com/')]", p)) {
      var hash = regexx(a.href, /tinypaste\.com\/([^'"]+)/);
      var nodePar = document.createElement("div");
      nodePar.id = "yodFrameParent";
      nodePar.className = "rounded10";
      nodePar.innerHTML = '\
<div id="copyleft">\
Dipersembahkan oleh ; \
<a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank" title="Script Home">\
' + yodUpdate['script_name'] + ' (' + yodUpdate['script_version'] + ')</a>\
 // <a href="http://www.indomeeting.net/" target="_blank" title="Dev Page">Dani Santana Blog</a>\
</div>\
<div id="yodTitle" class="yodHide"><b>Judul ;</b> </div>\
<div id="yodError"></div>\
<div id="yodIMDB_div"></div>\
<div id="yodIMDB_res"></div>\
<div id="yodSub_div"></div>\
<div id="yodSubSearch_div" class="yodHide"></div>\
<div id="yodSub_res"></div>\
<div id="yodPaste"><div class="yodLoading">Loading Tinypaste ..</div></div>\
<div id="yodPaste2_load" class="yodHide"><div class=\"yodLoading\">Loading Mediahide ..</div></div>\
<div id="yodPaste2"></div>\
<div id="yodMHReload_div"><div class="rounded3 yodHide" id="yodReMH_butt" onclick="javascript:yodGetMediahide();">RELOAD MEDIAHIDE</div></div>\
\
';

      p.parentNode.insertBefore(nodePar, p.nextElementSibling);

      var el = document.createElement("div");
      el.innerHTML = "- No IMDB Info -";
      if (mid) {
        el.className = "rounded3";
        el.id = "yodIMDB_butt";
        el.innerHTML = "IMDB";
        el.addEventListener("click", function() { doGet("yodIMDB_res", gIMDB(mid), "Imdb"); }, true);
      }
      g('yodIMDB_div').appendChild(el);

      if (mid) {
        var el = document.createElement("div");
        el.innerHTML = '- No Subtitle -';
        var t = "";
        if (t = c1(".//h3[@class='post-title entry-title']/a", p.parentNode)) {
          t = urlencode(regexx(t.innerHTML, /^(.+)\(\s?\d{4,}/).trim());
        }
        var yodSubSearch_div = g('yodSubSearch_div');
        yodSubSearch_div.innerHTML += ' Search Subtitle ; \
        <a href="http://subscene.com/filmsearch.aspx?q=' + t + '" target="_blank">Subscene</a> - \
        Podnapisi ( \
        <a href="http://www.podnapisi.net/en/ppodnapisi/search?sJ=2&sK=' + t + '" target="_blank">EN</a> - \
        <a href="http://www.podnapisi.net/en/ppodnapisi/search?sJ=54&sK=' + t + '" target="_blank">INA</a> \
        )';
        yodSubSearch_div.className = "yodShow";
        if (subURL) {
          el.className = "rounded3";
          el.id = "yodSub_butt";
          el.innerHTML = "SUBSCENE";
          el.addEventListener("click", function() { doGet("yodSub_res", gSub(subURL), "Subscene"); }, true);
        }
        g('yodSub_div').appendChild(el);
      }

      addCS("(" + yod_runScript + ")();", false, false, "yod_runScript");
      addCS(gTP(hash), false, true, "yod_JSPaste");
    }
  }
}

// start INJECT
var yod_frun = true;
document.cookie = "ads=yod;";
document.addEventListener("DOMNodeInserted", doListen, false);
})();