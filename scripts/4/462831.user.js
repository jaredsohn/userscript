// ==UserScript==
// @name        Replace Tucao Player
// @namespace   http://userscripts.org/users/ts
// @description 恢复吐槽 (tucao.cc) 播放器为原始播放器
// @include     http://www.tucao.cc/play/h*
// @version     0.1
// @grant       GM_xmlhttpRequest
// @copyright   GNU GPL v3, CC BY-SA 3.0
// @author      田生
// @run-at      document-start
// ==/UserScript==

var cosmos = function () {

  // 获取当前页面mid
  var getCurrentMid = function (href) {
    if (!href) href = location;
    if (typeof href !== 'string') href = href.href;
    if (typeof href !== 'string') return null;
    var a = document.createElement('a'); a.href = href;
    mid = a.pathname.match(/h(\d+)/)[1]
    try { mid += '_' + a.hash.match(/#(\d+)/)[1]; }
    catch (e) { mid += '_1'; }
    return mid;
  };

  var parseUrl = function (url) {
    var a = document.createElement('a'); a.href = url;
    var args = {};
    a.search.slice(1).split('&').map(function (l) {
      l = l.split('='); if (l.length !== 2) return;
      args[unescape(l[0])] = unescape(l[1]);
    });
    return args;
  };

  var replacePlayer = function (pid) {
    if (!document.querySelector('#player')) {
      if (document.querySelector('#player_x'))
        document.querySelector('#player_x').id = 'player';
      else {
        var p = document.createElement('div'); p.id = 'player';
        document.querySelector('#play_ren').appendChild(p);
      };
    }
    var s;
    if (pid.indexOf('qq') != -1) s = '<iframe height="452" width="964" src="https://ssl06.tucao.cc/player.php?" scrolling="no" border="0" frameborder="no" framespacing="0"></iframe>';
    else s = '<embed height="452" width="964" src="http://www.tucao.cc/player.swf?2013.12.10" type="application/x-shockwave-flash" quality="high" allowfullscreen="true" flashvars="." allowscriptaccess="always" AllowNetworking="all"></embed>';
    s = s.replace(/(src=\"https.*?php\?|flashvars=\").*?\"/ig, '$1' + pid + '"');
    document.querySelector('#player').innerHTML = s;
  };

  // 通过mini播放器的地址获取mid对应的视频地址
  var getPidByMini = function (mid, onsucc, onerror) {
    if (!onerror) onerror = function () { };
    GM_xmlhttpRequest({
      'method': 'HEAD',
      'url': '/mini/' + mid + '.swf',
      'onload': function (resp) {
        var url = resp.finalUrl;
        url = url.replace(/(&|\/)autostart=[^&]*&?/, '$1')
          .replace(/(&|\/)state=[^&]*&?/, '$1')
          .replace(/&$/, '').match(/\?(.*)/)[1];
        onsucc(url);
      },
      'onerror': onerror
    });
  };

  if (document.querySelector('#player')) return;
  getPidByMini(getCurrentMid(), replacePlayer);

};

if (!document.body) document.addEventListener('DOMContentLoaded', cosmos);
else setTimeout(cosmos, 0);

