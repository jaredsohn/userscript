// ==UserScript==
// @name        bilibili Small Window Auto Player FullWin
// @description bilibili视频页面上，缩放浏览器窗口到小窗口时自动将播放器页面全屏
// @namespace   http://userscripts.org/users/ts
// @include     /^http://([^/]*\.)?bilibili\.kankanews\.com(/.*)?$/
// @include     /^http://([^/]*\.)?bilibili\.tv(/.*)?$/
// @updateURL   https://tiansh.github.io/us-blbl/bilibili_small_window_auto_player_fullwin/bilibili_small_window_auto_player_fullwin.meta.js
// @downloadURL https://tiansh.github.io/us-blbl/bilibili_small_window_auto_player_fullwin/bilibili_small_window_auto_player_fullwin.user.js
// @version     1.2
// @copyright   MIT License
// @author      田生
// @run-at      document-end
// @grant       unsafeWindow
// ==/UserScript==

// 参数：第一个参数为对应的函数名（String，如"ping"、"getCid"）
//      后面的若干个参数为传给这个函数的参数
var rbb = function () {
  if (!unsafeWindow.replaceBilibiliBofqi) unsafeWindow.replaceBilibiliBofqi = [];
  unsafeWindow.replaceBilibiliBofqi.push(Array.apply(Array, arguments));
  return unsafeWindow.replaceBilibiliBofqi.constructor.name !== 'Array';
};

// http://tombigel.github.io/detect-zoom/detect-zoom.min.js
// WTFPL / MIT License
// 将所有window修改为了unsafeWindow以兼容油猴的运行环境
(function (root, ns, factory) { "use strict"; "undefined" != typeof module && module.exports ? module.exports = factory(ns, root) : "function" == typeof define && define.amd ? define(function () { return factory(ns, root) }) : root[ns] = factory(ns, root) })(unsafeWindow, "detectZoom", function () { var devicePixelRatio = function () { return unsafeWindow.devicePixelRatio || 1 }, fallback = function () { return { zoom: 1, devicePxPerCssPx: 1 } }, ie8 = function () { var zoom = Math.round(100 * (screen.deviceXDPI / screen.logicalXDPI)) / 100; return { zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio() } }, ie10 = function () { var zoom = Math.round(100 * (document.documentElement.offsetHeight / unsafeWindow.innerHeight)) / 100; return { zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio() } }, webkitMobile = function () { var deviceWidth = 90 == Math.abs(unsafeWindow.orientation) ? screen.height : screen.width, zoom = deviceWidth / unsafeWindow.innerWidth; return { zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio() } }, webkit = function () { var important = function (str) { return str.replace(/;/g, " !important;") }, div = document.createElement("div"); div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0", div.setAttribute("style", important("font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;")); var container = document.createElement("div"); container.setAttribute("style", important("width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;")), container.appendChild(div), document.body.appendChild(container); var zoom = 1e3 / div.clientHeight; return zoom = Math.round(100 * zoom) / 100, document.body.removeChild(container), { zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio() } }, firefox4 = function () { var zoom = mediaQueryBinarySearch("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4); return zoom = Math.round(100 * zoom) / 100, { zoom: zoom, devicePxPerCssPx: zoom } }, firefox18 = function () { return { zoom: firefox4().zoom, devicePxPerCssPx: devicePixelRatio() } }, opera11 = function () { var zoom = unsafeWindow.top.outerWidth / unsafeWindow.top.innerWidth; return zoom = Math.round(100 * zoom) / 100, { zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio() } }, mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) { function binarySearch(a, b, maxIter) { var mid = (a + b) / 2; if (0 >= maxIter || epsilon > b - a) return mid; var query = "(" + property + ":" + mid + unit + ")"; return matchMedia(query).matches ? binarySearch(mid, b, maxIter - 1) : binarySearch(a, mid, maxIter - 1) } var matchMedia, head, style, div; unsafeWindow.matchMedia ? matchMedia = unsafeWindow.matchMedia : (head = document.getElementsByTagName("head")[0], style = document.createElement("style"), head.appendChild(style), div = document.createElement("div"), div.className = "mediaQueryBinarySearch", div.style.display = "none", document.body.appendChild(div), matchMedia = function (query) { style.sheet.insertRule("@media " + query + "{.mediaQueryBinarySearch " + "{text-decoration: underline} }", 0); var matched = "underline" == getComputedStyle(div, null).textDecoration; return style.sheet.deleteRule(0), { matches: matched } }); var ratio = binarySearch(a, b, maxIter); return div && (head.removeChild(style), document.body.removeChild(div)), ratio }, detectFunction = function () { var func = fallback; return isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI) ? unsafeWindow.navigator.msMaxTouchPoints ? func = ie10 : "orientation" in unsafeWindow && "string" == typeof document.body.style.webkitMarquee ? func = webkitMobile : "string" == typeof document.body.style.webkitMarquee ? func = webkit : navigator.userAgent.indexOf("Opera") >= 0 ? func = opera11 : unsafeWindow.devicePixelRatio ? func = firefox18 : firefox4().zoom > .001 && (func = firefox4) : func = ie8, func }(); return { zoom: function () { return detectFunction().zoom }, device: function () { return detectFunction().devicePxPerCssPx } } });

// 主程序
var mina = function () {

  var bilibili = {
    'player': {
      'maxWidth': 480,
      'maxHeight': 360,
      'floatWidth': 320,
      'floatHeight': 240,
    },
    'url': {
      'iframe': {
        'secure': 'https://secure.bilibili.tv/secure,',
        'ssl': 'https://ssl.bilibili.tv/secure,',
      },
      'flash': [
        'https://static-s.bilibili.tv/play.swf',
        'https://static-s.bilibili.tv/live-play.swf',
        'http://static.hdslb.com/play.swf',
        'http://static.hdslb.com/live-play.swf',
      ],
    },
  };

  var updateSize = null;

  // 检查是否是原生播放器
  var isBilibiliBofqi = function (doc) {
    var any = function (arr) { return arr.reduce(function (x, y) { return x || y; }); };
    if (any(bilibili.url.flash.map(function (flash) {
      return !!doc.querySelector('#bofqi embed[src="' + flash + '"]');
    }))) return true;
    if (any(Object.keys(bilibili.url.iframe).map(function (iframe) {
      return !!doc.querySelector('#bofqi iframe[src^="' + bilibili.url.iframe[iframe] + '"]');
    }))) return true;
    return false;
  };

  // 当用户点击了页面全屏按钮时触发相应的事件
  var playerFullwinTrigger = (function () {
    if (!unsafeWindow.player_fullwin) return false;
    var trigger = [];
    var player_fullwin = null;
    var add = function (f) { trigger.push(f); return f; };
    var current = null;
    add.init = function () {
      player_fullwin = unsafeWindow.player_fullwin;
      trigger.unshift(player_fullwin);
      current = function () {
        var self = this, arg = arguments;
        trigger.map(function (f) {
          try { f.apply(self, arg); } catch (e) { }
        });
      };
      unsafeWindow.player_fullwin = current;
    }
    add.init();
    add.update = function () {
      if (unsafeWindow.player_fullwin !== current) add.init();
    };
    add.act = unsafeWindow.player_fullwin;
    return add;
  }());

  if (!playerFullwinTrigger) return;

  // 记录当前页面全屏的状态
  var currentStatus = (function () {
    var savedStatus = null;
    var trigger = playerFullwinTrigger(function (isFullwin) {
      savedStatus = !!isFullwin;
      setTimeout(updateSize, 1000);
    });
    return function () { return savedStatus; };
  }());

  // 检查页面的缩放
  var resized = (function () {
    var fullScrAuto = false;
    var lastPageYOffset = null;
    return function (isSmall) {
      if (isSmall && !currentStatus()) {
        if (lastPageYOffset === null) {
          lastPageYOffset = window.pageYOffset;
          window.scrollTo(window.pageXOffset, 0);
        }
        setTimeout(function () {
          playerFullwinTrigger.act(true);
          fullScrAuto = true;
        }, 0);
      } else if (!isSmall && currentStatus() && fullScrAuto) {
        console.log('down lastPageYOffset: %d', lastPageYOffset);
        if (lastPageYOffset !== null) {
          window.scrollTo(window.pageXOffset, lastPageYOffset);
          lastPageYOffset = null;
        }
        setTimeout(function () {
          playerFullwinTrigger.act(false);
          fullScrAuto = false;
        });
      }
    };
  }());

  // 监听窗口缩放的事件
  var updateSize = function () {
    if (!isBilibiliBofqi(document)) return;
    var zoom = unsafeWindow.detectZoom.zoom() || 1;
    resized(innerHeight * zoom < bilibili.player.maxHeight ||
      innerWidth * zoom < bilibili.player.maxWidth);
  }

  // 处理Replace bilibil bofqi中替换了av1时的情况
  var replacedTrigger = function () {
    playerFullwinTrigger.update();
    playerFullwinTrigger.act(false);
    setTimeout(updateSize, 0);
  };

  (function () {
    updateSize();
    window.addEventListener('resize', updateSize);
    rbb('replaced', replacedTrigger);
  }());

  // 限制浮动播放器在页面缩放之后其大小不超过会显示进度条的尺寸
  var updateZoom = (function () {
    var style = document.createElement('style'); style.className = 'stylish';
    document.querySelector('head').appendChild(style);
    var update = function () {
      var zoom = (unsafeWindow.detectZoom.zoom() + 0.01) || 1;
      var width = bilibili.player.floatWidth;
      var height = bilibili.player.floatHeight;
      // 如果尺寸过大则改小
      if (width * zoom > bilibili.player.maxWidth ||
        height * zoom > bilibili.player.maxHeight) {
        width = Math.floor((bilibili.player.maxWidth - 1) / zoom);
        height = Math.floor((bilibili.player.maxHeight - 1) / zoom);
      }
      style.innerHTML = [
        '.z #bofqi.float { width: ', width, 'px !important; }',
        '.z #bofqi.float .move { width: ', width, 'px !important; }',
        '.z #bofqi.float .player { width: ', width, 'px !important; height: ', height, 'px !important; }',
      ].join('');
    };
    update();
    return update;
  }());

  window.addEventListener('resize', updateZoom);

  return true;
};

if (!mina())
  rbb('added', function tryInit() {
    if (!mina()) setTimeout(tryInit, 10);
  });
