// ==UserScript==
// @name Twitter Search - Highlight unread tweets
// @description Highlight unread tweets in search.twitter.com. / Twitter Searchで検索したとき未読のツイートを色分けします。
// @namespace http://userscripts.org/scripts/show/74085
// @homepage http://userscripts.org/scripts/show/74085
// @include http://search.twitter.com/search*
// @include https://search.twitter.com/search*
// @match http://search.twitter.com/search*
// @match https://search.twitter.com/search*
// @version 2011-04-02
// ==/UserScript==

(function() {

if (typeof localStorage != 'object') return;
var q, old_id, new_id;
var $ = function (id) {
  return document.getElementById(id);
};

var init = function () {
  if (arguments.callee.done) return;
  arguments.callee.done = true;
  document.addEventListener('AutoPagerize_DOMNodeInserted', function (e) {
    highlight(e.target);
  }, false);
  document.addEventListener('click', function (e) {
    clickEvt(e);
    document.removeEventListener('click', clickEvt, true);
  }, true);
  document.addEventListener('keyup', function(e) {
    if (!/^input|^textarea/i.test(e.target.tagName)) {
      if (e.keyCode == 90 & e.ctrlKey && e.shiftKey) removeCache();
    }
  }, false);
  setKeyword();
  highlight(document);
  try {
    GM_registerMenuCommand('[Twitter Search - Highlight unread tweets] - delete cache', removeCache);
  } catch(er) {}
};

var setKeyword = function () {
  q = location.href;
  if (!q.match(/q=.+/)) {
    q = undefined;
    return;
  }
  q = q.slice(q.indexOf('q=') + 2);
  if (q.match(/&/)) q = q.slice(0, q.indexOf('&'));
  if (q.match(/#/)) q = q.slice(0, q.indexOf('#'));
  q = decodeURIComponent(q);
  q = encodeURIComponent(q);
};

var setOldID = function (str) {
  old_id = undefined;
  var id = (str) ? str : q;
  try {
    var d = (localStorage.getItem('TSHut_data')) ? JSON.parse(localStorage.getItem('TSHut_data')) : [];
  } catch (er) {
    var d = [];
  }
  loop: for (var i = 0; i < d.length; i++) {
    for (var k in d[i]) {
      if (k == id && id) {
        old_id = d[i][k];
        break loop;
      }
    }
  }
};

var setNewID = function (str) {
  if (!str) return;
  try {
    var d = (localStorage.getItem('TSHut_data')) ? JSON.parse(localStorage.getItem('TSHut_data')) : [];
  } catch (er) {
    var d = [];
  }
  var b = true,
    ob = {};
  new_id = str;
  loop: for (var i = 0; i < d.length; i++) {
    for (var k in d[i]) {
      if (k == q) {
        ob[k] = str;
        d.splice(i, 1);
        d.push(ob);
        b = false;
        break loop;
      }
    }
  }
  for (var i = 0; i < d.length; i++) {
    if (JSON.stringify(d[i]) == '{}') {
      d.splice(i, 1);
      i--;
    }
  }
  if (b) {
    ob[q] = str;
    d.push(ob);
    while (d.length > 20) d.shift();
  }
  localStorage.setItem('TSHut_data', JSON.stringify(d));
};

var clickEvt = function (e) {
  if (e.target.className.match(/prev|next/)) {
    localStorage.setItem('TSHut_temp', new_id);
    setNewID(old_id);
  }
};

var highlight = function (node) {
  var tmp_id, e = document.evaluate('//div[@class="info"]/a[@class="lit"]', node, null, 7, null);
  if (!e.snapshotLength > 0 || !q) return;
  for (var i = 0; i < e.snapshotLength; i++) {
    if (e.snapshotItem(i) && e.snapshotItem(i).parentNode.lastChild.previousSibling.className != 'tag') {
      tmp_id = e.snapshotItem(i).href;
      break;
    }
  }
  if (tmp_id) tmp_id = tmp_id.slice(tmp_id.lastIndexOf('/') + 1);
  if (tmp_id != new_id) {
    if (!old_id) setOldID();
    if (!location.href.match(/&page=[2-9]&|&page=\d{2,}&/)) {
      setNewID(tmp_id);
    } else if (localStorage.getItem('TSHut_temp')) {
      setNewID(localStorage.getItem('TSHut_temp'));
    }
  }
  for (var i = 0, id, p, ss, elm; i < e.snapshotLength; i++) {
    ss = e.snapshotItem(i);
    id = ss.href.slice(ss.href.lastIndexOf('/') + 1);
    if (id == old_id) {
      if (i > 0) e.snapshotItem(i - 1).parentNode.parentNode.style.borderBottom = '4px solid #F0F078';
      else e.snapshotItem(i).parentNode.parentNode.style.borderTop = '4px solid #F0F078';
      break;
    } else if (ss.parentNode.parentNode.tagName == 'LI' && ss.parentNode.lastChild.previousSibling.className != 'tag') ss.parentNode.parentNode.style.backgroundColor = '#FFFFF0';
  }
};

var removeCache = function () {
  if (confirm('[Twitter Search - Highlight unread tweets]\n\nDelete cache ?')) {
    if (localStorage.getItem('TSHut_q')) localStorage.removeItem('TSHut_q');
    if (localStorage.getItem('TSHut_data')) localStorage.removeItem('TSHut_data');
    if (localStorage.getItem('TSHut_temp')) localStorage.removeItem('TSHut_temp');
  }
};

init();

})();