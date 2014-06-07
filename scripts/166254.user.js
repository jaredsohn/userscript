(function () {
// ==UserScript==
// @name          Yodtube
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   Youtube tuner
// @version       1.7
// @updateURL     https://userscripts.org/scripts/source/166254.meta.js
// @match         http://*.youtube.com/*
// @match         https://*.youtube.com/*
// @run-at        document-start
// ==/UserScript==

/*
Formats: http://en.wikipedia.org/wiki/YouTube
Eliminate Ads: http://userscripts.org/scripts/show/40361 @JoeSimmons
*/

const yodUpdate = {
  script_id : 166254,
  script_version : '1.7',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
  script_name : 'Yodtube'
}

var YOD = {};
YOD.$W = YOD.$YT = {};
YOD.$Init = false;
YOD.$Opera = window.opera || null;
YOD.$Ads = ['ad[0-9]?_', 'infringe', 'watermark'];
YOD.$Formats = {5: 'FLV|240p', 6: 'FLV|270p', 13: '3Gp|N/A', 17: '3Gp|144p', 18: 'Mp4|270p/360p', 22: 'Mp4|720p', 34: 'FLV|360p', 35: 'FLV|480p', 36: '3Gp|240p', 37: 'Mp4|1080p', 38: 'Mp4|3072p', 43: 'WebM|360p', 44: 'WebM|480p', 45: 'WebM|720p', 46: 'WebM|1080p', 82: 'Mp4|360p', 83: 'Mp4|240p', 84: 'Mp4|720p', 85: 'Mp4|520p', 100: 'WebM|360p', 101: 'WebM|360p', 102: 'WebM|720p', 120: 'FLV|720p'};
YOD.$Others = {};
YOD.$CSS = '\
#yodDLTable {width:98%;}\
#yodDLTable h2 {}\
#yodDLTable header,#yodDLTable footer {margin:0; border: 0; padding: 5px; background:#f7f7f7; border-bottom: solid 1px #fff;}\
#yodDLTable header:not(:first-of-type), #yodDLTable footer {border-top: solid 1px #fff;}\
#yodDLTable {margin: 20px auto 0;}\
#yodDLTable section {border: solid 1px #f7f7f7ddd; border-left: 0; border-right:0; padding: 3px 0!important;}\
#yodDLTable .yodRight {float:right;}\
#yodDLTable .desc {float:left;}\
#yodDLTable .yodDLRows span {display: inline-block;}\
#yodDLTable .yodDLRows {padding: 3px 0;color: #999;}\
.yodDLRows > span {margin-right: 10px;}\
.yodDLRows .yodDLCols1 {width: 25px;text-align: right;}\
.yodDLRows .yodDLCols2 {width: 200px;}\
.yodDLRows .yodDLCols3 {float: right;font-size: 11px;font-style:italic;}\
.yodDLRows:hover {background-color: #f7f7f7;}\
#yodDownloadButton a {color: #555; text-decoration: none}\
.yodHide {display: none !important;}\
#yodloadImg{max-height:16px;vertical-align: middle;}\
.fullplayer{margin-top: 20px!important;}\
#loadsrc {max-height:20px;}\
';

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate.script_id;
  const s_Redir = false;
  el = el ? el : document.body;
  if (el) {
    if (!document.getElementById(s_CheckUpdate)) {
      var s_gm = document.createElement('script'); s_gm.id = s_CheckUpdate; s_gm.type = 'text/javascript';
      s_gm.src = '//usoupdater.herokuapp.com/?id=' + yodUpdate.script_id + '&ver=' + yodUpdate.script_version;
      if (s_Redir) s_gm.src += '&redir=yes';
      el.appendChild(s_gm);
    }
  }
}

function URLToArray(url, ads) {
  var reg, request = {}, pairs = url.substring(url.indexOf('?') + 1).split('&');
  if (ads) reg = new RegExp('(' + YOD.$Ads.join('|') + ')', 'i');
  for (var i in pairs) {
    var pair = pairs[i].split('=');
    if (reg) {
      if (pair[0].match(/adaptive_fmts/i)) YOD.$Others = decodeURIComponent(pair[1]).split(',');
      if (pair[0].match(reg)) continue;
    }
    request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return request;
}

function ArrayToURL(array) {
  var pairs = [];
  for (var key in array) {
    if (array.hasOwnProperty(key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
    }
  }
  return pairs.join('&');
}

function reAttachEv(el, ev, fn) {
  el.removeEventListener(ev, fn); el.addEventListener(ev, fn);
}

function toggleClass(el, cn, force) {
  if (el.classList.contains(cn)) el.classList.remove(cn);
  else if (!force) el.classList.add(cn);
}

function getDownload() {
  if (el = c1('.//*[@id="yodDLTable"]')) {
    toggleClass(el, 'yodHide');
  }
  return false;
}

function toContent(el, h, s) {
  el.innerHTML += '\
<header>\
  <h2>' + h + '</h2>\
</header>\
<section>'
+ s +
'</section>\
';
}

function toRows(a) {
  var yType = a.desc.split(' / ');
  var tag = a.itag;
  var regx = "webm";
  if (window.chrome) regx += "|mp4";
  var reg = new RegExp('/(' + regx + ')', 'i');
  if (a.desc.match(reg)) tag = '<a class="toHTML5" href="javascript:void(0);">' + a.itag + '</a>';
  
  return '\
<p class="yodDLRows" data-stype="' + yType[0] + '">\
<span class="yodDLCols1">' + tag + '</span>\
<span class="yodDLCols2"><a href="' + a.aHref + '" target="_blank" class="yodDLLinks" title="' + a.title + '">' + a.aLabel + '</a></span>\
<span class="yodDLCols3">' + a.desc + '</span>\
</p>\
';
}

function toType(str) {
  return (str.match(/(audio|video)/i)[0]) || '';
}

function toDesc(str) {
  return str.replace(/(;\+|,\+)/g, ' / ').replace(/=/g, ' = ').replace(/"/g, '');
}

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return 'n/a';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function rePlayer(full) {
  if (!(side = c1('.//*[@id="watch7-sidebar"]'))) return;
  if (full) {
    side.className += " fullplayer";
    //document.cookie = 'wide=1';
  } else {
    //document.cookie = 'wide=';
    side.className = side.className.replace(/fullplayer/ig, "");
  }
}

function toHTML5(ev) {
  var source, el = ev.target, par = el.parentNode.parentNode, target = c1('.//*[@id="player"]');
  if (source = c1('.//*[@class="yodDLLinks"]', par)) {
    rePlayer(true);
    source = source.getAttribute('href');
    var type = par.getAttribute('data-stype'), tag = type.match(/(audio)/i) ? 'audio' : 'video';
    /*if (type.match(/(audio)/i)) {
      tag = 'audio';
      type = 'audio/x-m4a';
    }*/
    tag = 'video';
    var el = document.createElement(tag);
    el.setAttribute('controls', '');
    el.setAttribute('autoplay', '');
    el.setAttribute('preload', 'auto');
    el.setAttribute('loop', '');
    var source_el = document.createElement('source');
    source_el.setAttribute('src', source);
    source_el.setAttribute('type', type);
    el.appendChild(source_el);
    target.innerHTML = "";
    target.appendChild(el);
    //el.play();
    window.setTimeout(function(){
      el.play();
      el.duration = YOD.$W.ytplayer.config.args.length_seconds;
    }, 3000);
  }
  
  return false;
}

function parseHTML5() {
  var tag, rows = c2(".//*[@data-stype]");
  for (var r in rows) {
    if (tag = c1('.//*[@class="toHTML5"]', rows[r]))
      tag.addEventListener("click", toHTML5);
  }
}

function toDownload() {
  var el = document.createElement('div');
  el.id = 'yodDLTable';
  el.className = 'yodHide';

  var str = '';
  var array = YOD.$YT.vURLS.split(',');
  for (var key in array) {
    var ar = URLToArray(array[key]);
    try {
      var f = YOD.$Formats[ar.itag].split('|');
      var arr = [];
      arr.push(f[0], ar.quality, f[1]);
      var label = arr.join(' / ').toUpperCase();
      var arr2 = {
        itag: ar.itag,
        aLabel: label,
        aHref: decodeURIComponent(ar.url) + '&signature=' + ar.sig,
        desc: toDesc(ar.type),
        title: 'Format / Size / Scale'
      };
      str += toRows(arr2);
    } catch(e) {}
  }

  var mp3 = '<span class="yodRight">( <a href="http://www.youtube-mp3.org/#v=' + YOD.$YT.config_.VIDEO_ID + '" target="_blank" title="Download as Mp3">MP3</a> )</span>';
  toContent(el, 'Choose video formats ' + mp3, str);

  if (YOD.$Others.length) {
    str = '';
    for (var key in YOD.$Others) {
      var reg, request = {}, pairs = URLToArray(YOD.$Others[key]);
      var type, arr = [];
      if (type = toType(pairs.type)) {
        arr.push(type, bytesToSize(pairs.bitrate));
        if (pairs.size) arr.push(pairs.size);
        var label = arr.join(' / ').toUpperCase();
        var arr2 = {
          itag: pairs.itag,
          aLabel: label,
          aHref: decodeURIComponent(pairs.url),
          desc: toDesc(pairs.type),
          title: 'Format / Bitrate / Scale'
        };
        str += toRows(arr2);
      }
    }
    toContent(el, 'Extracted Video / Audio', str);
  }

  el.innerHTML += '\
<footer>\
  <span class="yodQdesc">' + yodUpdate['script_name'] + ' ; Ver <a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank" title="Script Home">\
' + yodUpdate['script_version'] + '</a></span>\
  <span class="yodRight"><a href="https://twitter.com/cecekpawon" target="_blank" title="Dev Page">@cecekpawon 2013</a></span>\
</footer>\
';

  var target;
  if (target = c1('.//*[@id="watch7-user-header"]')) {
    target.appendChild(el);
    parseHTML5();

    loadsrc = "data:image/gif;base64,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";
    
    dlimgsrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMZJREFUeNpi/P//PwM1AUt6ejpVDWTCIR4FxP+JwPzEGkh1F44aSEKyAWJRIA5EEzcjUn8CEH9H4n8BGfgaiCWAuJEMB01ANgyIPWFebgLiGgp8+hGI3YD4CHIYtgJxGZmGeQLxcVgYIoNuKN1FgmHOQHwWXyyDDC0gwrB36IbhSzYTgTgXj2GvsRlGKB1OAeIsHIaBIuACrnSID0wH4r9APBPJMAcgvkZJTpkFxClA/IKQYaRkvblArErIMFLz8hdiFAEEGADaii+ui79/hgAAAABJRU5ErkJggg==";

    if (target = c1('.//*[@id="watch-like-dislike-buttons"]')) {
      var el = document.createElement('span');
      el.innerHTML = '\
      <img id="yodloadImg" src="' + loadsrc + '" />\
      <button title="Toggle Download" class="yodHide yt-uix-button yt-uix-button-text yt-uix-tooltip" type="button" id="yodDownloadButton" data-button-toggle="true" role="button" data-tooltip-text="Toggle Download">\
        <img id="loadsrc" src="' + dlimgsrc + '" />\
      </button>';
      target.appendChild(el);
    }
  }
}

function removeAds(el) {
  var c = el.cloneNode(true);
  c.setAttribute('flashvars', ArrayToURL(URLToArray(c.getAttribute('flashvars'), 1)));
  el.parentNode.replaceChild(c, el);
}

function yodLoaded() {
  var el;
  if (el = c1('.//*[@id="yodDownloadButton"]')) {
    toggleClass(el, 'yodHide', true);
    toggleClass(el, 'yt-uix-button-toggled', true);
    reAttachEv(el, 'click', getDownload);
    if (el = c1('.//*[@id="yodloadImg"]', el.parentNode)) el.className = 'yodHide';
  }
}

function yodWatchTheDogs(ev) {
  try {
    var elmt = ev.target, cname = elmt.className || '';
    if (cname.match(/www/i)) {
      ev.currentTarget.removeEventListener(ev.type, arguments.callee, false);
      yodLoaded();
    }
  } catch (e) {}
}

function doStuff() {
  var el;
  if (el = c1('.//*[@id="movie_player"]')) {
    GM_addStyle(YOD.$CSS);
    removeAds(el);
    toDownload();
  }
  document.addEventListener('DOMNodeInserted', yodWatchTheDogs, false);
}

function doExec() {
  try {
    if (window.chrome && (unsafeWindow == window)) {
      YOD.$W = (function() {
        var el = document.createElement('a');
        el.setAttribute('onclick', 'return window;');
        return el.onclick();
      }());
    } else {
      YOD.$W = unsafeWindow;
    }

    if (typeof YOD.$W.yt === 'undefined') {
      window.setTimeout(doExec, 1000);
    } else {
      usoUpdate();
      YOD.$YT = YOD.$W.yt;
      YOD.$YT.vURLS = YOD.$W.ytplayer.config.args.url_encoded_fmt_stream_map;
      doStuff();
    }
  } catch(e) {}
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();