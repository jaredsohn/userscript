// ==UserScript==
// @name ougon-kouro helper
// @id ok_helper
// @namespace http://userscripts.org/scripts/review/108911
// @homepage http://userscripts.org/scripts/review/108911
// @description Useful for ougon-kouro users.
// @include http://*.ougon-kouro.com/main/*
// @match http://*.ougon-kouro.com/main/*
// @updateURL https://userscripts.org/scripts/source/108911.meta.js
// @version 2011.08.07
// ==/UserScript==

(function () {
  
  /* --- config --- */
  
  // true：艦隊討伐のログを隠す false：隠さずに濃い緑色にする
  const fleetlog = true;
  
  // true：ページタイトルに到着までの時間を表示 false：到着したときだけ表示
  const remainder = true;
  
  // true：港に到着したときや取引可能になったときAlertで通知する false：通知しない
  const notifier = true;
  
  // 世界・街・国チャットのNGネーム
  const ngName = '\\(´[・･]ω[・･]｀\\)';
  
  // 世界・街・国チャットのNGワード
  const ngWord = '^\\(´[・･]ω[・･]｀\\)';
  
  /* --- config --- */
  
  
  var $ = function (id) { return document.getElementById(id); }
  var logAS = logSS = logA = logW = logT = logC = unread = 0;
  var flagAS = flagSS = flagA = flagW = flagT = flagC = flagE = flagL = true;
  
  function checkLog(f) {
    if (!f && flagL) flagL = false;
    else if (f && !flagL) return;
    var checkFleetLog = function (e, n) {
        for (var i = n, len = e.snapshotLength; i < len; i++) {
          var ss = e.snapshotItem(i);
          if (ss && !/:\s/.test(ss.textContent) && /が.+の艦隊を討伐しました\s$/.test(ss.textContent)) {
            if (fleetlog) e.snapshotItem(i).style.display = 'none';
            else e.snapshotItem(i).style.color = 'green';
          }
        }
      };
    var checkNg = function (e, n, f) {
      var reN = new RegExp(ngName), reW = new RegExp(ngWord);
        for (var i = n, len = e.snapshotLength; i < len; i++) {
          var ss = e.snapshotItem(i);
          if (ss && ss.textContent) {
            var na = ss.textContent.slice(0, ss.textContent.indexOf(': '));
            var wo = ss.textContent.slice(ss.textContent.indexOf(': ') + 2);
            if ((ngName && reN.test(na)) || (ngWord && reW.test(wo))) e.snapshotItem(i).style.display = 'none';
          }
        }
      };
    var el = document.evaluate('id("chat_all")/li[@class="chat_system_item"]', document, null, 7, null);
    if (el) {
      if (flagAS) {
        flagAS = false;
        checkFleetLog(el, logAS);
        flagAS = true;
      }
      if (el.snapshotLength > logAS) logAS = el.snapshotLength;
    }
    var el = document.evaluate('id("chat_system")/li[@class="chat_system_item"]', document, null, 7, null);
    if (el) {
      if (flagSS) {
        flagSS = false;
        checkFleetLog(el, logSS);
        flagSS = true;
      }
      if (el.snapshotLength > logSS) logSS = el.snapshotLength;
    }
    var el = document.evaluate('id("chat_all")/li', document, null, 7, null);
    if (el) {
      if (flagA) {
        flagA = false;
        checkNg(el, logA, true);
        flagA = true;
      }
      if (el.snapshotLength > logA) {
        if (f) {
          unread += el.snapshotLength - logA;
          changeTitle('', '*' + unread);
        }
        logA = el.snapshotLength;
      }
    }
    var el = document.evaluate('id("chat_world")/li', document, null, 7, null);
    if (el) {
      if (flagW) {
        flagW = false;
        checkNg(el, logW);
        flagW = true;
      }
      if (el.snapshotLength > logW) logW = el.snapshotLength;
    }
    var el = document.evaluate('//ul[contains(translate(concat(" ", @id), "1234567890", ""), "chat_town_")]/li', document, null, 7, null);
    if (el) {
      if (flagT) {
        flagT = false;
        checkNg(el, logT);
        flagT = true;
      }
      if (el.snapshotLength > logT) logT = el.snapshotLength;
    }
    var el = document.evaluate('//ul[contains(translate(concat(" ", @id), "1234567890", ""), "chat_country_")]/li', document, null, 7, null);
    if (el) {
      if (flagC) {
        flagC = false;
        checkNg(el, logC);
        flagC = true;
      }
      if (el.snapshotLength > logC) logC = el.snapshotLength;
    }
    if (!flagL) flagL = true;
  }
  
  function checkArrivalTime() {
    var e1 = $('arrive'), e2 = $('remaining_time'), s = document.title;
    if (e1 && e2) {
      if (/^\[到着\]/.test(s)) return;
      if (e1.style.display != 'none') {
        changeTitle('[到着]');
        if (notifier) {
          var at = $('arrival_town');
          var mes = ((at && at.textContent) ? at.textContent + 'に' : '') + '到着しました！';
          alert(mes);
        }
      } else if (remainder) {
        var d1 = e2.textContent.split(':');
        if (d1 && d1.length == 3) {
          if (d1[1] > 0) {
            var d2 = Number(d1[0]) * 60 + Number(d1[1]);
            if (d2 > 1440) changeTitle('[' + Math.floor(d2 / 24 / 60) + '日]');
            else if (d2 > 120) changeTitle('[' + Math.floor(d2 / 60) + '時間]');
            else {
              if (d1[2] == 0) changeTitle('[' + d2 + '分]');
              else if (!/^\[/.test(s)) changeTitle('[' + (d2 + 1) + '分]');
            }
          } else if (e2.textContent == '00:00:00' && !/^\[0分\]/.test(s)) changeTitle('[0分]');
        }
      }
    }
  }
  
  function checkExchangeTime() {
    if (!notifier) return;
    var e = document.evaluate('id("market_area")//span[@id="remaining_time"]', document, null, 9, null).singleNodeValue;
    if (flagE && e && e.textContent && e.parentNode.style.display != 'none') {
      var d = e.textContent.split(':'), s = document.title;
      if (d && d.length == 3) {
        if (d[1] > 0) {
          if (d[2] == 0) changeTitle('[' + Number(d[1]) + '分]');
          else if (!/^\[/.test(s)) changeTitle('[' + (Number(d[1]) + 1) + '分]');
        } else if (d[0] == 0 && d[1] == 0 && d[2] == 0) {
          flagE = false;
          alert('取引可能になりました！');
        }
      }
    }
  }
  
  function changeTitle(t, u) {
    var s = document.title.split(' ');
    if (s[0] && s[1] && s[2]) {
      if (t) document.title = t + ' ' + s[1] + ' ' + s[2];
      else if (u) {
        if (u == '*0') document.title = s[0] + ' ' + s[2];
        else document.title = s[0] + ' ' + u + ' ' + s[2];
      }
    } else if (s[0] && s[1]) {
      if (/^\[/.test(s[0])) {
        if (t) document.title = t + ' ' + s[1];
        else if (u) {
          if (u == '*0') document.title = s[0] + ' ' + s[1];
          else document.title = s[0] + ' ' + u + ' ' + s[1];
        }
      } else if (/^\*\d/.test(s[0])) {
        if (t) document.title = t + ' ' + s[0] + ' ' + s[1];
        else if (u) {
          if (u == '*0') document.title = s[1];
          else document.title = u + ' ' + s[1];
        }
      }
    } else if (s[0]) {
      if (t) document.title = t + ' ' + s[0];
      else if (u) {
        if (u == '*0') document.title = s[0];
        else document.title = u + ' ' + s[0];
      }
    }
  }
  
  function check(f, e) {
    var t = (e && e.target) ? e.target.textContent : undefined;
    var id = (e && e.target && e.target.parentNode) ? e.target.parentNode.id : undefined;
    if (!f || (t && t != '\n' && id == 'chat_all')) checkLog(f);
    else if (f && t && id == 'remaining_time') {
      checkArrivalTime();
      checkExchangeTime()
    }
  }
  
  check(false);
  $('chat_btn').addEventListener('click', function(e) {
    unread = 0;
    changeTitle('', '*0');
  }, false);
  setTimeout(function() {
    document.addEventListener('DOMNodeInserted', function (e) {
      check(true, e);
    }, false);
  }, 100);
  
})();