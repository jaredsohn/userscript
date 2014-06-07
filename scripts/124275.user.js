// ==UserScript==
// @name           XiaoNei Timer
// @description    人人网计时器
// @namespace      http://userscripts.org/scripts/show/124275
// @copyright      CC BY-SA 3.0 / GNU GPL 3
// @version        4.1.0
// @include        *://*.renren.com/*
// @exclude        *://*.renren.com/*ajaxproxy.htm*
// @exclude        *://*.renren.com/*wtalk/ime.htm*
// @exclude        *://*.renren.com/SysHome.do*
// @author         田生
// @updateURL      https://tiansh.github.io/us-rr/xiaonei_timer/xiaonei_timer.meta.js
// @downloadURL    https://tiansh.github.io/us-rr/xiaonei_timer/xiaonei_timer.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

var TODAY = '今天：';
var TOTAL = '总计：';
var TIMER = '计时器';
var MSG   = '珍爱生命，远离SNS！';
var ICON  = ['data:image/png;base64,',
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADAElEQVR4nH2SXUibZxiG7+/VJBrW',
  'NS52ttCDgtOlFoWyk9iOLEFwW6Q7kTLYykBSxJ7usNCuBz2RKYwxVoQOBhuhpLBusg10bPaHabca',
  'NZVs/tR0Lf71M9YYZ/y+9+d5dqKlLXUX3PAc3Pd19FjYhVgs5q2urq6RUirbtvMjIyN6t+4z9PT0',
  'tGSz2Z8cx9kkIjbG0Orqqj04OHi5s7Pz9V2HkUikfHh4+EsiIlNcYZn+nt1bX7N74zK7kwMsS/9y',
  'sVjc7O3tTTQ1NVk7u7KdI5lMftHc3HxGj12z9C+fg2ZvwjryNmghCxr+BvT3ryjfX+d5IxZvKxaL',
  'uaGhobsAIACgu7u7JRwOd+n0d9A3vwJtPgaUA60kSLlgWQKv5GC+PQMsT5d1dHR81t7efuCJIB6P',
  'f8wbeUvfuQpmBpwieEcgXUCWAGcDXO6F+fEiXt67NxiJvJUAAHHs2HFvbW1t1ExfB68vA846oBxA',
  'OTDShVEuWLkgLWHWbKh/MjD5h2hoaGhtbGwUIhh8pcbj8fipsAQ0xgHlgLfjrfSjbN8hGEPQxoIS',
  'FbDCp2Ds+whUBQ76fD6PkFIqImLWLmjuNli52xIX9McVUF0U+oNLkFW1UK5GafoOjOWBVpoAQNi2',
  'nS8UCnm8WgfLngFrCdIK2gBq9jbcSx9CTv4GN9IFbXkhlx+Aa17DwuJCbmtrS4nx8XE9Ojraz/VR',
  '0J79MCygjLUdAa0Y+s9roCtnoYQfVtM7YN9LGB8b689msyQAIJVKfVpSVOK281BUDu2vgTICRlRC',
  'kYCyfDC+AIy/Gt7WLszMTN9Lp9PJJ4+UyWRWg8Hgo6PRd9usujeFejAJtWbDE34fypFQGwWIIzFU',
  'njyHtS253tfX99HVVOqvZ165vr7e+uTChVNzc7n8ykqel6cmeP7WD/zw9595fm6G5xcWeej6jdlE',
  '4nTL0zsLz3HixHsHYrFoIhQ63BqoChzU2tDS0mIuMzHRn06nkwMDA4//V7BDKBQSFRUVHgBwHEdN',
  'TU3Ri3r/ATgVt5rj0cfYAAAAAElFTkSuQmCC',
].join('');

var $ = function (q) { return document.querySelector(q); };

var makeDOM = function (dom) {
  var d = document.createElement('div');
  d.innerHTML = dom;
  return d.firstChild;
};

var addCSS = (function () {
  $('head').appendChild(makeDOM('<style id="timer_css"></style>'));
  var d = $('#timer_css');
  return function (css) { d.innerHTML += css; };
}());

var editClassName = (function () {
  var editClass = function (obj, cls, isAdd) {
    var c = obj.className.split(/\s+/g);
    var index = c.indexOf(cls);
    if ( isAdd && index === -1) c[c.length] = cls;
    if (!isAdd && index !== -1) c[index] = '';
    var n = (' ' + c.join(' ') + ' ').replace(/\s+/g, ' ').slice(1, -1);
    obj.className = n;
  };
  return {
    'add': function (obj, cls) {
      editClass(obj, cls, true);
    },
    'del': function (obj, cls) {
      editClass(obj, cls, false);
    }
  }
}());

var showDetail = (function () {
  var displayed = {};
  var detail = null;
  return {
    'show': function (id, callback) {
      displayed[id] = true;
      callback();
    },
    'hide': function (id, callback) {
      displayed[id] = false;
      setTimeout(function () {
        var id;
        for (id in displayed) if (displayed[id]) return;
        callback();
      }, 500);
    }
  }
}());

var updateTimer = (function () {
  var today = [], total = [];
  var TIMER_TODAY = 'timer_today';
  var TIMER_TOTAL = 'timer_total';
  var TIMER_LAST_DATE = 'timer_last_date';
  var getTimeData = function (key) {
    var time = Number(GM_getValue(key), null);
    if (isNaN(time)) time = 1;
    return time;
  };
  var flushTimer = function () {
    var formatTime = function (t) {
      var twoDigit = function (n) {
        if (n < 10) return '0' + n;
        return '' + n;
      };
      var s = t % 60;
      var m = Math.floor(t / 60) % 60;
      var h = Math.floor(t / 3600);
      return [h, m, s].map(twoDigit).join(':');
    };
    var setVal = function (val) {
      return function (obj) {
        if (obj instanceof HTMLElement) obj.innerHTML = val;
        else if (obj instanceof Function) obj(val);
      };
    };
    var timer = [TIMER_TODAY, TIMER_TOTAL].map(getTimeData).map(formatTime);
    today.map(setVal(timer[0]));
    total.map(setVal(timer[1]));
  };
  var clock = function (next) {
    var timer = [TIMER_TODAY, TIMER_TOTAL].map(getTimeData);
    var date = new Date();
    var date_str = '' + date.getFullYear() + date.getMonth() + date.getDay();
    var last_date = GM_getValue(TIMER_LAST_DATE, null)
    if (timer[1] < timer[0]) GM_setValue(TIMER_TOTAL, timer[0]);
    if (last_date !== date_str) {
      GM_setValue(TIMER_LAST_DATE, date_str);
      GM_setValue(TIMER_TODAY, timer[0] = 0);
    };
    if (next) {
      GM_setValue(TIMER_TODAY, ++timer[0]);
      GM_setValue(TIMER_TOTAL, ++timer[1]);
    };
    flushTimer();
  };
  setInterval(function () { try {
    if (document.hasFocus()) clock(true); 
  } catch (e) {} }, 1000);
  return function (todayList, totalList) {
    today = todayList; total = totalList;
    clock(false);
  };
}());

var pageInit = (function () {
  var inits = {
    'www_6': function () {
      var pos = $('.nav-main');
      var dp = $('#navDropMenuHolder');
      if (!pos || !dp) return false;
      var menu = makeDOM([
        '<div class="menu">',
          '<div id="timerMenuActive" class="menu-title">',
            '<a id="timerMenu" href="#timer">',
              '<span class="menu-title-text">--:--:--</span>',
            '</a>',
          '</div>',
        '</div>',
      ''].join(''));
      addCSS('.nav-main #timerMenuActive { width: 108px; text-align: center; }');
      addCSS('.nav-main #timerMenu { padding: 0 15px; }');
      pos.appendChild(menu);
      var drop = makeDOM([
        '<div id="navTimerDropMenu" class="nav-drop-menu nav-drop-menu-profile">',
          '<div class="nav-drop-menu-item">',
            '<img class="icon" src="', ICON, '" /> ', TODAY, '<span id="timer_today">--:--:--</span>',
          '</div>',
          '<div class="nav-drop-menu-item">',
            '<img class="icon" src="', ICON, '" /> ', TOTAL, '<span id="timer_total">--:--:--</span>',
          '</div>',
          '<div class="nav-drop-menu-item"><strong>', MSG, '</strong></div>',
        '</div>',
      ''].join(''));
      dp.appendChild(drop);
      addCSS('#navTimerDropMenu { position: absolute; top: -1px; width: 160px; }');
      addCSS('#timer_today, #timer_total { display: inline; }');
      var show = function (id) { return function () {
        showDetail.show(id, function () {
          editClassName.add(menu, 'menu-title-active');
          editClassName.add(drop, 'nav-drop-menu-active');
          drop.style.left = menu.offsetLeft + 'px';
        });
      }; };
      var hide = function (id) { return function () {
        showDetail.hide(id, function () {
          editClassName.del(menu, 'menu-title-active');
          editClassName.del(drop, 'nav-drop-menu-active');
        });
      }; };
      ['menu', 'drop'].map(function (s) {
        var o = {'menu': menu, 'drop': drop}[s];
        o.addEventListener('mouseover', show(s));
        o.addEventListener('mouseout' , hide(s));
      });
      menu.onclick = function () { return false; };
      updateTimer([$('#timer_today'), $('#timerMenu .menu-title-text')], [$('#timer_total')]);
      return true;
    },
    'www7': function () {
      var right = $('.nx-right');
      if (!right) return false;
      var t = makeDOM(['<div class="side-item timerSideItem">',
        '<div class="side-item-header">',
          '<h3>', TIMER, '</h3>',
        '</div>',
        '<div class="side-item-body">',
          '<svg class="timerImage" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 64 64" xml:space="preserve">',
            '<circle cx="32" cy="32" r="30" stroke="#666" stroke-width="4" fill="none" />',
            '<path id="timerHour" d="" stroke="#333" stroke-width="4" fill="none" />',
            '<path id="timerMinute" d="" stroke="#333" stroke-width="2" fill="none" />',
            '<path id="timerSecond" d="" stroke="#333" stroke-width="1" fill="none" />',
            '<path id="timerLabel" d="" stroke="#666" stroke-width="2" fill="none" />',
          '</svg>',
          '<ul>',
            '<li>', TODAY, '<span id="timer_today">--:--:--</span></li>',
            '<li>', TOTAL, '<span id="timer_total">--:--:--</span></li>',
            '<li>', MSG,'</li>',
          '</ul>',
        '</div>',
      '</div>'].join(''));
      addCSS([
        '.timerSideItem ul { margin: 4px 15px 10px 90px; }',
        '.timerSideItem li { font-size: 12px; line-height: 22px; }',
        '.timerSideItem .timerImage { float:left; margin:5px 10px 5px 20px; display:block; }',
      ].join(''));
      t.querySelector('#timerLabel').setAttribute('d', Array(12).join(',').split(',').map(function (x, i) {
        var rot = i / 12 * 2 * Math.PI;
        var x1 = 32 + Math.sin(rot) * 24, x2 = Math.sin(rot) * 8;
        var y1 = 32 - Math.cos(rot) * 24, y2 = -Math.cos(rot) * 8;
        return ['M', x1, y1, 'l', x2, y2].join(' ');
      }).join(' '));
      right.insertBefore(t, right.firstChild);
      var hand = ['#timerHour', '#timerMinute', '#timerSecond']
        .map(function (x) { return t.querySelector(x); });
      var len = [16, 20, 24];
      var updateTimerImage = function (s) {
        var time = s.split(':').map(Number), rot = [];
        rot[2] = time[2] / 60;
        rot[1] = (time[1] + rot[2]) / 60;
        rot[0] = (time[0] + rot[1]) / 12;
        hand.forEach(function (hand, i) {
          var x = Math.sin(rot[i] * 2 * Math.PI) * len[i];
          var y = -Math.cos(rot[i] * 2 * Math.PI) * len[i];
          hand.setAttribute('d', 'M 32 32 l ' + x + ' ' + y);
        });
      };
      updateTimer([$('#timer_today'), updateTimerImage], [$('#timer_total')]);
      return true;
    },
    'mt': function () {
      var nc = $('ul#news_center');
      if (!nc) return false;
      nc.className = '';
      var t = makeDOM(['<div class="dp"><ul class="timer_ul">',
        '<li class="m_head"><strong>', MSG, '</strong></li>',
        '<li><a class="timer_line"><span>', TODAY, '</span><span id="timer_today">--:--:--</span></a></li>',
        '<li><a class="timer_line"><span>', TOTAL, '</span><span id="timer_total">--:--:--</span></a></li>',
      '</ul></div>'].join(''));
      addCSS('.timer_ul { border-bottom: 1px solid #E9F2F8; }');
      addCSS(['nav .dp li a.timer_line { ',
        'background-image: url(', ICON, ');',
        'background-position: 14px 12px;',
      '}'].join(''));
      nc.parentNode.appendChild(t);
      t.appendChild(nc.parentNode.removeChild(nc));
      updateTimer([$('#timer_today')], [$('#timer_total')]);
      return true;
    },
    '3g': function () {
      var pmenu = $('#logo a[href^="http://3g.renren.com/"]');
      var pdrop = $('#logo+.sec.nav');
      if (!pmenu || !pdrop) return false;
      var menu = makeDOM('<a herf="#timer" id="timer_text">--:--:--</a>');
      var drop = makeDOM(['<div id="timer_drop">',
        TODAY, '<span id="timer_today">--:--:--</span> | ',
        TOTAL, '<span id="timer_total">--:--:--</span><br />',
        '<strong>', MSG, '</strong>',
      '</div>'].join(''));
      addCSS('#timer_text { color: #FFF; position: relative; top: -6px; left: 16px; cursor: pointer; }');
      addCSS('#timer_drop { display: none; } #timer_drop.show { display: block; }');
      menu.onclick = function () {
        if (drop.className === 'show') drop.className = ''; else drop.className = 'show';
        return false;
      };
      pmenu.parentNode.appendChild(menu);
      pdrop.parentNode.insertBefore(drop, pdrop);
      updateTimer([$('#timer_today'), $('#timer_text')], [$('#timer_total')]);
      return true;
    }
  };
  return function () {
    var i;
    for (i in inits) if (inits[i]()) return i;
    return false;
  };
}());

(function () {
  var pageType = pageInit();
  if (!pageType) return;
}());
