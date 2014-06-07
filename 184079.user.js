// ==UserScript==
// @name        Bilibili Radio Danmuku
// @namespace   http://userscripts.org/users/ts
// @description bilibili.tv 站点 CNR 音乐之声广播页面相关功能：侧栏弹幕颜色、弹幕桌面提示、页面评论、替换节目表、修复页面全屏
// @include     http://www.bilibili.tv/html/musicradio.html
// @include     http://bilibili.kankanews.com/html/musicradio.html
// @include     http://aod.cnr.cn/index.php?*
// @version     1.2
// @updateURL   https://tiansh.github.io/us-blbl/bilibili_radio_danmuku/bilibili_radio_danmuku.meta.js
// @downloadURL https://tiansh.github.io/us-blbl/bilibili_radio_danmuku/bilibili_radio_danmuku.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       unsafeWindow
// @copyright   GNU GPL v3, CC BY-SA 3.0
// @author      田生
// @run-at      document-start
// ==/UserScript==

/*

Bilibili Radio Danmuku
bilibili.tv 站点 CNR 音乐之声广播页面相关功能：侧栏弹幕颜色、弹幕桌面提示、页面评论、替换节目表、修复页面全屏

【功能】
  修改 bilibili.tv 站点 CNR 音乐之声页面
   * 对播放器右侧的历史弹幕增加显示颜色取消数量限制
   * 弹幕的桌面提示功能
   * 显示页面评论
   * 使用 CNR 网站的节目表替换下方的节目表
   * 修复页面全屏等问题
 
【桌面提示】
  桌面提示功能需要浏览器支持相应的接口。
  第一次运行脚本时需要点击视频右侧“评论”字样的横条，后根据浏览器要求给相应权限。脚本只有有桌面提示权限才能弹出桌面提示。

【兼容性】
  本脚本可以在以下浏览器上运行：
    * Firefox 浏览器 + GreaseMonkey 附加组件 （推荐）
    * Chrome 浏览器 + TamperMonkey 扩展程序 （桌面提示功能部分支持）
    * Opera 浏览器 + Violent monkey 扩展 （不支持桌面提示）
  推荐使用火狐浏览器以达到最好的效果。

【用户隐私】
  脚本在本地保存了您当前桌面提示的开关状况，这些信息可以被浏览器内的其他插件及用户查看。
  脚本申请了网络访问权限访问了 comment.bilibili.tv 用于获取弹幕信息。
  此外脚本还打开了 aod.cnr.cn 中音乐之声的页面，以显示节目单。
  脚本没有其他的网络访问。

【关于】
  GNU GPL v3 或 CC BY-SA 3.0

【其他】
  顺便一说，弹幕的英文一般意译成 Bullet Hell ，或者按照だんまく的罗马字转写译成 Danmaku 。
  至于这个脚本名字啥的，那个是 bilibili.tv 电台页面上给显示历史弹幕的那个框起的名字（class），别问我是啥意思。

*/

var aid = 481349;
var cid = 725823;

// 替换站点原来的函数
var wrapWindowFunction = function (functionName, actBefore, actAfter, actDefault) {
  var oldFunction = unsafeWindow[functionName];
  var run = function (func, self, arguments) {
    if (!func || func.constructor !== Function) return;
    try { return func.apply(self, arguments); }
    catch (e) { }
  };
  unsafeWindow[functionName] = function () {
    var haveDefault = true, ret;
    run(actBefore || null, this, arguments);
    if (run(actDefault || null, this, arguments) !== false)
      ret = oldFunction.apply(this, arguments);
    run(actAfter || null, this, arguments);
    return ret;
  };
};

document.addEventListener('DOMContentLoaded', function () {

  if (location.hostname.indexOf('bilibili') === -1) return;
  // 提示框左侧的logo
  var icon = ['data:image/png;base64,',
'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',
'RU5ErkJggg=='].join('');

  // 将颜色转换为字符串
  var colorToString = function (color) {
    color = Number(color).toString(16);
    while (color.length < 6) color = '0' + color;
    return color;
  };

  // 弹幕桌面提示
  (function desktopNotify() {
    var Notification = window.Notification;
    var title = document.querySelector('.danmuku th p');
    var notificationEnabled = GM_getValue('NotificationEnabled', false);
    var checkPermission = function () {
      var permission = Notification.permission;
      if (permission === 'default') return null;
      if (permission === 'granted') return true;
      if (permission === 'denied') return false;
    };
    var switchNotification = function () {
      notificationEnabled = !notificationEnabled;
      GM_setValue('NotificationEnabled', notificationEnabled);
    };
    (function showPermission() {
      var updateStatus = function () {
        var permission = checkPermission();
        if (permission === null) title.innerHTML = '评论 (点击允许桌面提示)';
        else if (permission === false) title.innerHTML = '评论 (桌面提示已禁用)';
        else if (notificationEnabled) title.innerHTML = '评论 (桌面提示已打开)';
        else title.innerHTML = '评论 (桌面提示已关闭)';
      };
      setInterval(updateStatus, 100);
      title.addEventListener('click', function () {
        var permission = checkPermission();
        if (permission === null) { Notification.requestPermission() }
        else {
          if (typeof permission === 'undefined') Notification.requestPermission();
          switchNotification(); updateStatus();
        }
      });
    }());
    var showNotify = function (msg, color) {
      var colorText = colorToString(color);
      var notification = new Notification(
        'bilibili Radio [#' + colorText + ']',
        { 'body': msg, 'icon': icon }
      );
      setTimeout(function () { notification.close(); }, 2500);
    };

    wrapWindowFunction('onPlayerComment', function (c, my) {
      if (notificationEnabled && !my) showNotify(c.text, c.color);
      var colorText = colorToString(c.color);
      return oldOnPlayerComment.apply(unsafeWindow, arguments);
    });
  }());

  // 替换侧边栏
  (function danmukuSideBar() {
    var anotherDanmuku = (function () {
      var danmuku = document.createElement('div');
      danmuku.className = 'brdDanmuku';
      document.querySelector('.danmukuWrapper').appendChild(danmuku);
      var addToDanmuku = (function () {
        return function (chat) {
          danmuku.appendChild(chat);
          if (danmuku.scrollTop > danmuku.scrollHeight - danmuku.clientHeight - 80)
            danmuku.scrollTop = danmuku.scrollHeight - danmuku.clientHeight;
        };
      }());
      var newDanmu = function (color, data, text) {
        var chat = document.createElement('div');
        var rgb = { 'r': color >> 16, 'g': color >> 8 & 255, 'b': color & 255 };
        var needShadow = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 < 0x30;
        var time = data, dig = function (n) { return (n < 10 ? '0' : '') + n; };
        time = dig(time.getHours()) + ':' + dig(time.getMinutes());
        chat.innerHTML = [
          '<div class="brdDanmu" style="',
            'color: #', colorToString(color), '; ',
            (needShadow ? 'text-shadow: #fff 0 0 1px, #fff 0 0 2px, #fff 0 0 4px, #fff 0 0 4px; ' : ''),
          '">', '<time>', time, '</time>',
            text.replace(/./g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }),
          '</div>'
        ].join('');
        addToDanmuku(chat.firstChild);
      }
      return { 'new': newDanmu };
    }());
    var timezone = (new Date()).toTimeString().match(/GMT([+\-][0-9]{4})/)[1];
    wrapWindowFunction('onPlayerComment', function (data, my) {
      var date = new Date(data.date.replace(' ', 'T') + timezone);
      anotherDanmuku.new(data.color, date, data.text)
    });
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': 'http://comment.bilibili.tv/' + cid + '.js',
      'onload': function (resp) {
        try {
          var r = JSON.parse(resp.responseText.replace(/^[^\(]*\(/, '').replace(/\)[^\)]*$/, ''));
          r.data.map(function (data) {
            var l = data.p.split(',');
            anotherDanmuku.new(Number(l[3]), new Date(Number(l[4] + '000')), data.s);
          });
        } catch (e) { }
      }
    });
  }());

  // 添加评论
  (function addCommon() {
    var common = document.createElement('div');
    common.innerHTML = [
      '<div class="common">',
        '<div class="sort"><i>评论列表</i></div>',
        '<div class="comm">',
    	    '<img src="http://static.hdslb.com/images/v2images/morecomm.gif" border="0" ',
            'class="comm_open_btn" onClick="var fb = new bbFeedback(\'.comm\', \'arc\');',
            'fb.show(', aid, ', 1);" style="cursor:pointer" />',
        '</div>',
      '</div>',
    ].join('');
    document.querySelector('.z').appendChild(common.firstChild);
  }());

  // 替换描述部分
  (function replaceDesc() {
    var des = document.querySelector('.music_radio_des');
    var rsd = document.querySelector('.radio_schedule');
    var showTimetable = function () {
      des.innerHTML = [
        '<iframe src="http://aod.cnr.cn/index.php?ItemId=13#bilibili_radio_danmuku" ',
          'width="980" height="272"></iframe>',
      ].join('');
      // 下部iframe样式
      GM_addStyle([
        '.music_radio_box { background-size: cover !important; width: 980px !important; }',
        '.music_radio_des { width: 980px !important; padding: 0 !important; margin: auto !important; }',
        '.music_radio_des iframe { border: none; overflow: hidden; }',
        '.z_top .z_header, .z, .widescreen .z { width: 980px; }',
        '.music_radio_des h2, .music_radio_des p, .music_radio_des .radio_schedule { display: none; }',
      ].join(''));
    };
    rsd.innerHTML = '<span>点击显示节目单</span>'; rsd.style.cursor = 'pointer';
    rsd.querySelector('span').addEventListener('click', showTimetable);
    GM_addStyle('.music_radio_des { height: 272px !important; }');
  }());

  // 禁用宽屏模式
  (function disableBiliAdjust() {
    var removeWideScreen = function () {
      document.body.className = document.body.className.split(' ')
        .filter(function (v) { return v !== 'widescreen'; }).join(' ');
    };
    wrapWindowFunction('biliAdjust', function () { removeWideScreen(); },
      null, function () { return false; });
    removeWideScreen();
  }());

});

(function () {
  // 测边栏样式
  GM_addStyle([
    '.danmukuWrapper .danmuku { width: 100%; height: 25px; }',
    '.danmukuWrapper .danmuku tr:nth-child(n+2) { display: none; }',
    '.brdDanmuku { width: 100%; height: 320px; background: black; overflow-y: scroll; word-wrap: break-word; } ',
    '.brdDanmuku time { opacity: 0.6; } .brdDanmuku time::after { content: " "; }',
  ''].join('\n'));
}());

// 嵌入的iframe
(function () {
  if (location.hostname !== 'aod.cnr.cn') return;
  if (self === top) return;
  if (location.hash !== '#bilibili_radio_danmuku') return;
  GM_addStyle([
    '* { display: none; }',
    'html, body, .wrapper, #player {',
      'display: block; background: none; border: none; ',
      'width: 980px; height: 272px; overflow: hidden;',
      'margin: 0; padding: 0',
    '}',
  ].join(''));
}());

// 修理播放器相关功能
document.addEventListener('DOMContentLoaded', function fixBofqi() {
  // 添加脚本
  var scripts = [
    'http://static.hdslb.com/js/page.arc.js',
    'http://static.hdslb.com/js/video.min.js',
  ];
  var loadScript = function (url) {
    var s = document.createElement('script');
    s.src = url;
    document.querySelector('head').appendChild(s);
    return s;
  };
  scripts = scripts.map(loadScript);
  // 移除旧的播放器
  (function () { try {
    var embed0 = document.querySelector('.music_radio_box .embed_box embed');
    embed0.parentNode.removeChild(embed0);
  } catch (e) { }; }());
  // 添加新的播放器
  var bofqi = document.createElement('div');
  bofqi.innerHTML = ['<div class="scontent" id="bofqi">',
    '<embed height="350" width="400" class="player" ',
      'pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" ',
      'allowFullScreenInteractive="true" AllowScriptAccess="always" rel="noreferrer" ',
      'flashvars="cid=', cid, '&aid=', aid, '" src="http://static.hdslb.com/live-play.swf" ',
      'type="application/x-shockwave-flash" allowfullscreen="true" quality="high">',
    '</embed>',
  '</div>'].join('');
  var des = document.querySelector('.music_radio_des');
  des.parentNode.insertBefore(bofqi.firstChild, des);
  GM_addStyle([
    '#bofqi { margin: -470px 390px 120px 190px; float: left; }',
    '.dami { display: none; }',
    '.danmukuWrapper { margin-left: 400px; }'
  ].join(''));
  // 处理全屏
  scripts[0].addEventListener('load', function () {
    var doFullScr = function () {
      var ret = !document.querySelector('#bofqi .move');
      return ret;
    };
    wrapWindowFunction('player_fullwin', (function () {
      var player = document.querySelector('#bofqi .player');
      var bofqi = document.querySelector('#bofqi');
      var oldOffY = 0;
      return function (fullscr, inTimeout) {
        if (fullscr) {
          if (!doFullScr()) {
            oldOffY = scrollY;
            scrollTo(undefined, 0);
            // 因为前面的scrollTo触发onscroll的相关事件
            // 这里只要setTimeout延迟为0就可以调度到onscroll后面
            setTimeout(function () { unsafeWindow.player_fullwin(true, true); }, 0);
          } else {
            if (!inTimeout) oldOffY = scrollY;
            bofqi.style.width = '100%';
            bofqi.style.height = '100%';
            player.style.width = '100%';
            player.style.height = '100%';
          }
        } else {
          bofqi.style.width = '400px';
          bofqi.style.height = '350px';
          player.style.width = '400px';
          player.style.height = '350px';
          // 和上面一样～
          setTimeout(function () { scrollTo(undefined, oldOffY); }, 0);
        }
      };
    }()), null, function (fullscr) {
      return !fullscr || doFullScr();
    });
    unsafeWindow.player_fullwin(false);
  });
  // 定位浮动播放器
  var rat = document.createElement('div');
  rat.innerHTML = [
    '<div class="rat" style="opacity:0!important">',
      '<div class="sort"><i>评分&推荐</i></div>',
      '<div class="arc_r_box" id="arc_r_box"></div>',
    '</div>',
  ].join('');
  var common = document.querySelector('.common');
  common.parentNode.appendChild(rat.firstChild);
});
