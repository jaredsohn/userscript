// ==UserScript==
// @name           Xiaonei Auto Return Visits
// @namespace      http://userscripts.org/users/ts
// @description    人人网自动回访最近来访的用户
// @version        4.1.0
// @copyright      CC-BY-SA 3.0 / GNU GPL v3; 田生
// @include        http://www.renren.com/*
// @exclude        http://*.renren.com/*ajaxproxy.htm*
// @exclude        http://*.renren.com/*wtalk/ime.htm*
// @exclude        http://*.renren.com/SysHome.do* 
// @updateURL      https://tiansh.github.io/us-rr/xiaonei_auto_return_visits/xiaonei_auto_return_visits.meta.js
// @downloadURL    https://tiansh.github.io/us-rr/xiaonei_auto_return_visits/xiaonei_auto_return_visits.user.js
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// ==/UserScript==

(function () {

  if (window.top !== window.self) return;

  var Xarv = {
    'msg': {
      'init': '正在加载',
      'proc': '({count}) 正在回访',
      'done': '回访完成',
      'valiate': '需要验证码',
    },
    'time': 86400000,
    'maxtry': 3,
    'maxact': 16,
    'timeout': function () { return Math.random() * 500 + 500; },
  };
  var excludes = [];

  // 获取当前用户ID
  var myId = (function () {
    return [null,
      function () { return unsafeWindow.nx.user.id; },
      function () { return unsafeWindow.XN.user.id; },
      function () { return document.querySelector('.hd-name').href.match(/\d+/)[0]; },
      function () { return document.getElementById('userIdFP').value; }]
      .reduce(function (l, f) {
        if (l) return l;
        try { var id = Number(f()); if (!isNaN(id)) return id; } catch (e) { }
        return null;
      });
  }());
  if (!myId) return;

  // 显示的信息
  var log = (function () {
    var msg = null;
    try {
      // v7
      var ff = document.querySelector('#footprintBox h4').parentNode;
      if (!ff) throw '';
      msg = document.createElement('div'); msg.id = 'footReturnVisitMsg';
      msg.textContent = Xarv.msg.init;
      GM_addStyle([
        '#footprintBox:not(:hover) .option { display: none; }',
        '#footprintBox:hover #footReturnVisitMsg { display: none; }',
        '#footReturnVisitMsg { float: right; color: #CCC; font-size: smaller; }',
      ].join(''));
      ff.appendChild(msg);
    } catch (e) { }
    if (!msg) try {
      // v6
      var ff = document.getElementById('footForward');
      if (!ff) throw '';
      var msg = document.createElement('div');
      msg.innerHTML = Xarv.msg.init; msg.id = 'footReturnVisitMsg';
      GM_addStyle([
        '#footPrint:hover>div.side-item-body.clearfix>#footReturnVisitMsg',
        '{ display: none; }',
        '#footReturnVisitMsg { ',
          'display: block; position: absolute; top: 0; ',
          'right: 0; width: 128px; text-align: right; color: #CCC; ',
        '}'
      ].join(''));
      ff.parentNode.insertBefore(msg, ff);
    } catch (e) { }
    if (!msg) return;
    return function (count) {
      if (typeof count === 'string') msg.textContent = count;
      else if (!count) msg.textContent = Xarv.msg.done;
      else msg.textContent = Xarv.msg.proc.replace('{count}', count);
    };
  }());
  if (!log) return;

  // 检查是否需要回访某人，记录回访时间
  var visited = (function () {
    var newTexts = {};
    var key = 'visited' + myId;
    var getVisited = function () {
      try { return JSON.parse(GM_getValue(key, {})); }
      catch (e) { return {}; }
    };
    var check = function (id, text) {
      var visited = getVisited();
      var current = visited[id] || {};
      if (current.text === text) return false;
      newTexts[id] = text;
      var visitedDate = new Date(current.date);
      var time = new Date() - visitedDate;
      return isNaN(time) || time > Xarv.time;
    };
    var done = function (id) {
      var visited = getVisited();
      visited[id] = {
        'date': Number(new Date()),
        'text': newTexts[id],
      };
      GM_setValue(key, JSON.stringify(visited));
    };
    return {
      'check': check,
      'done': done,
    };
  }());

  // 回访
  var visit = (function () {
    var failHandler = null;
    var doneHandler = function (id, next) {
      visited.done(id);
      next();
    };
    var stop = function (msg) { log(msg); };

    // 回访一个人
    var act = function act(id, next) {
      var fail = failHandler.bind(this, id, next);
      var done = doneHandler.bind(this, id, next);

      GM_xmlhttpRequest({
        'method': 'GET',
        'url': 'http://www.renren.com/profile.do?id=' + id,
        'onload': function (resp) {
          var succ = false;
          try {
            var doc = new DOMParser().parseFromString(resp.responseText, 'text/html');
            var items = [
              '#cmFriends', '#friends', '#status-show',
              '#timeline', 'a[id^="addFriend_"]', '.access-denied'];
            succ = !!items.map(doc.querySelector.bind(doc))
              .reduce(function (x, y) { return x || y; });
            if (!succ) {
              if (doc.querySelector('form[name="valiateUserForm"]'))
                succ = Xarv.msg.valiate;
              if (doc.querySelector('#errorpage'))
                succ = null;
            }
          } catch (e) {}
          if (resp.responseText === '') succ = true;
          if (succ === true) done();
          else if (succ === false || succ === null) fail(succ === null);
          else stop(succ);
        },
        'onerror': fail,
      });
    };

    failHandler = (function () {
      var lastId = null, times = 0;
      return function (id, next, ta) {
        if (lastId !== id) lastId = id, times = 0;
        if (!ta) ++times;
        if (times > Xarv.maxtry) doneHandler(id, next);
        else act(id, next);
      };
    }());

    var queue = (function (callback) {
      var l = [], processing = false;
      var next = function () {
        l.shift(); log(l.length);
        if (l.length) setTimeout(function () {
          callback(l[0], next);
        }, Xarv.timeout());
        else processing = false;
      };
      var start = function () {
        if (processing) return;
        processing = true;
        callback(l[0], next);
      };
      var add = function () {
        l.push.apply(l, arguments); log(l.length);
        start();
      };
      return add;
    }(act));

    return queue;
  }());

  // 开始回访
  var doVisit = function (rvList) {
    visit.apply(visit, rvList);
  };

  // 检查列表
  var checkVisit = function (doVisit) {
    return function (friends) {
      var rvList = friends.filter(function (friend) {
        return visited.check(friend.guestId, friend.date);
      }).map(function (friend) { return friend.guestId; })
        .slice(0, Xarv.maxact);
      doVisit(rvList);
    };
  };

  // 获取列表
  var loadList = function (callback) {
    GM_xmlhttpRequest({
      'method': 'POST',
      'url': 'http://www.renren.com/footpointView',
      'onload': function (resp) {
        callback(JSON.parse(resp.responseText).visitList);
      }
    });
  };
  
  // 主程序在这里
  (function mina() {
    loadList(checkVisit(doVisit));
  }());

}());
