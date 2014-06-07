// ==UserScript==
// @name           Anime Xunlei
// @namespace      http://summerwxy.blogspot.com/
// @include        http://images.anime.xunlei.com/book/segment/*
// ==/UserScript==

(function() {
  function strSort(len) {
    var ary = new Array();
    for (var i = 0; i <= len; i++) {
      ary.push(new String(i));
    }
    return ary.sort();
  }

  Array.prototype.strIndexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return i;
      }
    }
  }

  var init = function() {
    var len = unsafeWindow.maxPage;
    var sort = strSort(len);
    var page = unsafeWindow.page;
    var maxPage = unsafeWindow.maxPage;

    var previousPage = (sort[page] > 1) ? sort.strIndexOf(parseInt(sort[page]) - 1) : sort.strIndexOf(1);
    var nextPage = (sort[page] < maxPage) ? sort.strIndexOf(parseInt(sort[page]) + 1) : sort.strIndexOf(maxPage);
    
    var pattern = /\/book\/segment\/\d+\/(\d+)\.html/;
    unsafeWindow.preLink.search(pattern);
    var true_prev_segment_id = RegExp.$1;
    unsafeWindow.nextLink.search(pattern);
    var true_next_segment_id = RegExp.$1;
    window.location.href.search(pattern);
    var this_segment_id = prev_segment_id = next_segment_id = RegExp.$1;

    if (sort[page] == 1) { // 剛好 page == 1 == sort[1] 成立, 否則原本是有 bug 的
      var pp = unsafeWindow.previousPage;
      var sa = strSort(pp);
      previousPage = sa.strIndexOf(pp);
      prev_segment_id = true_prev_segment_id;
    }
    
    if (sort[page] == maxPage) {
      nextPage = 1;
      next_segment_id = true_next_segment_id;
    }
    
    // 0_o's Url
    var nextUrl = 'http://images.anime.xunlei.com/book/segment/';
    nextUrl += Math.ceil(next_segment_id / 1000) + '/';
    nextUrl += next_segment_id + '.html?page=';
    nextUrl += nextPage + '#photobox';
    var prevUrl = 'http://images.anime.xunlei.com/book/segment/';
    prevUrl += Math.ceil(prev_segment_id / 1000) + '/';
    prevUrl += prev_segment_id + '.html?page=';
    prevUrl += previousPage + '#photobox';

    var ta = document.getElementsByClassName('pageOPT')[0].getElementsByTagName('a');
    var ba = document.getElementsByClassName('pageOPB')[0].getElementsByTagName('a');
    var pp = document.getElementById('prev');
    var np = document.getElementById('next');
    pp.href = ta[0].href = ba[0].href = prevUrl;
    np.href = ta[1].href = ba[1].href = nextUrl;
    
    var span1 = document.getElementsByClassName('pageOPT')[0].getElementsByTagName('span')[0];
    span1.innerHTML = span1.innerHTML + ' (' + sort[page] + ')';
    var span2 = document.getElementsByClassName('pageOPB')[0].getElementsByTagName('span')[0];
    span2.innerHTML = span2.innerHTML + ' (' + sort[page] + ')';

    document.body.style.backgroundColor = '#333';
    // document.title = '';
  };

  var timer;

  function run() {
    if (timer) {
      window.clearTimeout(timer);
    }
    var w = unsafeWindow;
    if (w.previousPage == null || w.nextLink == null || w.preLink == null || w.maxPage == null || w.page == null || w.maxPage == null) {
      timer = window.setTimeout(run, 100);      
      return;
    }
    init();
  }

  run();
})();