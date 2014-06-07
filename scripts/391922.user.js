// ==UserScript==
// @name        bilibili Player NO SSL
// @description 使用 HTTP 页面显示 bilibili 的播放器而不是使用 HTTPS 页面，适用于一些因故不能访问 HTTPS 的情况。
// @updateURL   https://tiansh.github.io/us-blbl/bilibili_player_no_ssl/bilibili_player_no_ssl.meta.js
// @downloadURL https://tiansh.github.io/us-blbl/bilibili_player_no_ssl/bilibili_player_no_ssl.user.js
// @include     /^http://([^/]*\.)?bilibili\.kankanews\.com(/.*)?$/
// @include     /^http://([^/]*\.)?bilibili\.tv(/.*)?$/
// @version     1.3
// @copyright   MIT License
// @author      田生
// @run-at      document-start
// @grant       unsafeWindow
// ==/UserScript==

// 参数：第一个参数为对应的函数名（String，如"ping"、"getCid"）
//      后面的若干个参数为传给这个函数的参数
var rbb = function () {
  if (!unsafeWindow.replaceBilibiliBofqi) unsafeWindow.replaceBilibiliBofqi = [];
  unsafeWindow.replaceBilibiliBofqi.push(Array.apply(Array, arguments));
  return unsafeWindow.replaceBilibiliBofqi.constructor.name !== 'Array';
};

var bilibili = {
  'url': {
    'av': [
      'http://www.bilibili.tv/video/av',
      'http://bilibili.kankanews.com/video/av',
      'http://acg.tv/av',
    ],
  }
};

// 显示链接
var addLink = (function () {
  var noSSL = null;
  var init = function () {
    var d = document.createElement('div');
    d.innerHTML = ['<div id="bilibili-player-no-ssl">',
      '<a target="_blank" href="#"></a>',
    '</div>'].join('');
    document.querySelector('.alist').appendChild(d.firstChild);
    noSSL = document.querySelector('#bilibili-player-no-ssl a');
  }
  return function (href, innerHTML) {
    if (!noSSL) init();
    var a = document.createElement('a'); a.href = href;
    if (noSSL.href !== a.href) noSSL.href = href;
    if (noSSL.innerHTML !== innerHTML) noSSL.innerHTML = innerHTML;
  };
}());

// 从URL中截取aid(av), pid号
var videoPage = function (href, nullpage) {
  var aid, pid;
  if (typeof href !== 'string') return null;
  if (!bilibili.url.av.map(function (h) { return href.indexOf(h) === 0; })
    .reduce(function (x, y) { return x || y; })) return null;
  if (!(aid = Number(href.replace(/^[^#]*av(\d+).*$/, '$1')))) return null;
  pid = Number(href.replace(/^[^#]*av\d+\/index_(\d+)\.html(\?.*)?(#.*)?$/, '$1')) || null;
  if (!nullpage && pid === null) pid = 1;
  return { 'aid': aid, 'pid': pid };
};

// 主程序
var mina = function () {
  var prefix = 'https://secure.bilibili.tv/secure,';
  var id = videoPage(location.href);
  if (!id) return false;
  var player = document.querySelector('#bofqi .player');
  if (player && player.src.indexOf(prefix) === 0) {
    var arg = player.src.slice(prefix.length);
    addLink('http://static.hdslb.com/play.swf?' + arg, '非加密链接播放器');
  } else {
    addLink('http://static.hdslb.com/miniloader.swf?aid=' + id.aid + '&page=' + id.pid, '非加密连接播放器（miniloader）');
  }
};

document.addEventListener('DOMContentLoaded', mina);
rbb('replaced', mina);
