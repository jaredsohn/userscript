// ==UserScript==
// @name        Tieba Translucent Old Post
// @namespace   http://github.com/tiansh
// @include     http://tieba.baidu.com/*
// @version     1.1
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at      document-start
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {

  // 检查是否是新版界面
  var isNew = !document.querySelector('#thread_list_table');

  // 获取帖子tid（String）
  var getTid = isNew ? (function (li) {
    return li.querySelector('a[href^="/p/"]').href.match(/(\d+)/)[1];
  }) : (function (tr) {
    return tr.getAttribute('tid');
  });

  var lastTid = (function () {
    // 比较两个数字大小
    var maxInt = function (a, b) {
      if (a.length > b.length) return a;
      if (b.length > a.length) return b;
      if (a > b) return a;
      return b;
    };
    var checkTid;
    var update = function (l) {
      var lastTid = GM_getValue('lastTid', "0");
      lastTid = l.map(getTid).concat([lastTid]).reduce(maxInt);
      GM_setValue('lastTid', lastTid);
      // 隐藏比我看到的最新的tid小5e7的帖子
      checkTid = (lastTid.slice(0, -7) - 5) + lastTid.slice(-7);
    };
    var inRange = function (tid) {
      return maxInt(tid, checkTid) === checkTid
    };
    return { 'update': update, 'inRange': inRange };
  }());

  // 帖子列表
  var postList = isNew ? (function () {
    return Array.apply(Array,
      document.querySelectorAll('.j_thread_list:not([tieba_jing_translucent])'));
  }) : (function () {
    return Array.apply(Array,
      document.querySelectorAll('#thread_list_table tr[tid]:not([tieba_jing_translucent])'));
  });

  // 更新帖子透明度
  var updateOpacity = function () {
    var list = postList();
    lastTid.update(list);
    list.map(function (post) {
      post.setAttribute('tieba_jing_translucent',
        lastTid.inRange(getTid(post)) ?  'translucent' : 'normal');
    });
  };

  updateOpacity();
  setInterval(updateOpacity, 1000);

});

GM_addStyle([
  '.j_thread_list:not([tieba_jing_translucent]), ',
  '.j_thread_list[tieba_jing_translucent="translucent"],',
  '#thread_list_table tr[tid]:not([tieba_jing_translucent]),',
  '#thread_list_table tr[tid][tieba_jing_translucent="translucent"] {',
    'opacity: 0.4 !important;',
  '}',
  '.j_thread_list:not([tieba_jing_translucent]) .threadlist_detail , ',
  '.j_thread_list[tieba_jing_translucent="translucent"] .threadlist_detail  {',
    'display: none !important;',
  '}',
].join(''));