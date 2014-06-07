// ==UserScript==
// @name           nicovideo Add nicotag links
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Add nicotag link at nicovideo's pages.
// @include        http://www.nicovideo.jp/*
// @require        http://mfp.xrea.jp/misc/greasemonkey/lib/nicovideoInfoInserter/nvii_20090510.js
// ==/UserScript==


Array.prototype.splitLength = function(split_len) {
  if(this.length < split_len)
    return [this];
  var array = [];
  var j = -1;
  for(var i = 0, len = this.length; i < len; i++) {
    if(i % split_len == 0) {
      j++;
      array[j] = [];
    }
    array[j].push(this[i]);
  }
  return array;
};

Date.prototype.toDateSpanString = function(date) {
  if(this < date)
    return date.toDateSpanString(this);
  var span = (this - date) / 1000;
  if(span < 60)
    return Math.floor(span + 0.5) + '秒';
  var minute = span / 60;
  if(minute < 60)
    return Math.floor(minute + 0.5) + '分';
  var hour = minute / 60;
  if(hour < 24)
    return Math.floor(hour + 0.5) + '時間';
  var day = hour / 24;
  if(day < 30)
    return Math.floor(day + 0.5) + '日';
  var month = day / 30;
  if(month < 12)
    return Math.floor(month + 0.5) + 'ヶ月';
  var year = month / 12;
  return Math.floor(year + 0.5) + '年';

};
Date.fromISO8601 = function(str) {
  var date = new Date();
  date.setISO8601(str);
  return date;
};
Date.prototype.setISO8601 = new function() {
  var regstr = "^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2})" +
    "(?:T([0-9]{2}):([0-9]{2})(?::([0-9]{2})(?:\.([0-9]+))?)?" +
    "(?:Z|(?:([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$";
  var regexp = new RegExp(regstr);
  return function (string) {
    var d = string.match(regexp);
    if(d == null)
      return;
    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[2]) { date.setMonth(d[2] - 1); }
    if (d[3]) { date.setDate(d[3]); }
    if (d[4]) { date.setHours(d[4]); }
    if (d[5]) { date.setMinutes(d[5]); }
    if (d[6]) { date.setSeconds(d[6]); }
    if (d[7]) { date.setMilliseconds(Number("0." + d[7]) * 1000); }
    if (d[8]) {
      offset = (Number(d[9]) * 60) + Number(d[10]);
      offset *= ((d[8] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));

    this.setTime(Number(time));
  };
};

var uncheckedLinks = [];
var show_nicotag_date = false;

function createLink(url) {
  if(url === undefined || !url.match(/watch\/(\w\w\d+)/))
    return null;

  var video_id = RegExp.$1;
  var link = document.createElement('a');
  link.textContent = 'nicotag';
  link.href = 'http://nicotag.jp/watch/' + video_id;
  var span = document.createElement('span');
  span.appendChild(document.createTextNode('['));
  span.appendChild(link);
  span.appendChild(document.createTextNode(']'));
  uncheckedLinks.push({elem: span, video_id: video_id});
  return span;
}

function createTagLink(tagname) {
  var link = document.createElement('a');
  var img = document.createElement('img');
  img.className = 'txticon';
  img.src = 'http://res.nicovideo.jp/img/common/icon/search.gif';
  img.alt = '';
  link.appendChild(img);
  link.appendChild(document.createTextNode('キーワード '));
  var strong = document.createElement('strong');
  strong.style.backgroundColor = '#ccc';
  strong.textContent = decodeURI(tagname);
  link.appendChild(strong);
  link.appendChild(document.createTextNode(' を含むタグが保管されている動画をニコタグで検索'));
  link.href = 'http://nicotag.jp/search/' + tagname;
  return link;
}

function createXSpan() {
  var span = document.createElement('span');
  span.style.padding = '0 2px';
  span.style.color = 'white';
  span.style.backgroundColor = 'red';
  span.style.fontWeight = 'bolder';
  span.textContent = '×';
  return span;
}

function createDateSpan(dateText, now) {
  var date = Date.fromISO8601(dateText);
  var time_span = now - date;

  var span = document.createElement('span');
  span.style.padding = '0 2px';

  const DAY = 24 * 3600 * 1000;
  span.style.backgroundColor =
    time_span < 7 * DAY ? 'transparent'
    : time_span < 14 * DAY ? '#b9b9f7'
    : time_span < 30 * DAY ? '#7c7cf7'
    : time_span < 60 * DAY ? '#3e3ef7'
    : '#0000f7';

  span.style.color =
    time_span < 30 * DAY ? 'black' : 'white';

  span.style.fontWeight = '';
  span.textContent = date.toDateSpanString(now);
  return span;
};

function addNicotagStatus() {
  var elems = {};
  uncheckedLinks.map(
    function(link) {
      if(elems[link.video_id] === undefined)
        elems[link.video_id] = [];
      elems[link.video_id].push(link.elem);
      return link.video_id;
    }).splitLength(20).forEach(
    function(ids_array, idx) {
      var options = {
        method: 'GET',
        url: 'http://www.nicotag.jp/api/getvideosinfo/last_keep/'
          + ids_array.join(','),
        headers: {
          'User-Agent':
          'Mozilla/5.0 Greasemonkey; nicovideo Add nicotag Links'
        },
        onload: parseResponse
      };
      setTimeout(function() { GM_xmlhttpRequest(options); }, idx * 1000);
    });
  uncheckedLinks = [];

  function parseResponse(response) {
    // xml宣言を除去
    // https://developer.mozilla.org/ja/E4X
    var xml = new XML(
      response.responseText.replace(
          /^<\?xml\s+version\s*=\s*([\"\'])[^\1]+\1[^?]*\?>/,
        ""));

    var now = new Date();
    for each(var video in xml..video) {
      var video_id = video.video_id.text();
      var span = (video.last_keep.length())
        ? createDateSpan(video.last_keep.text(), now)
        : createXSpan();
      elems[video_id].forEach(
        function(elem) {
          if(span.parentNode)
            span = span.cloneNode(true);
          elem.appendChild(document.createTextNode(' '));
          elem.appendChild(span);
        });
    }
  }
}

function addToggleButton(parent) {
  var label = document.createElement('label');
  var input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener(
    'change',
    function() {
      show_nicotag_date = input.checked;
      if(show_nicotag_date)
        addNicotagStatus();
    },
    false);
  label.appendChild(input);
  label.appendChild(document.createTextNode('ニコタグの最終保管時刻を表示する'));
  var p = document.createElement('p');
  p.className = 'TXT12';
  p.appendChild(label);
  parent.appendChild(p);
}



var PageType = NicovideoInfoInserter.PageType;
var PointType = NicovideoInfoInserter.PointType;

NicovideoInfoInserter.addInsertHandler(
  createLink,
  PageType.ANY_PAGE,
  PointType.AROUND_MOVIE ^ PointType.AROUND_THUMB
    | PointType.THUMB_2COL_LEFT | PointType.THUMB_4COL_TOP
);

NicovideoInfoInserter.addPagerizeHandler(
  function() {
    if(show_nicotag_date)
      addNicotagStatus();
  });

if(PageType.test(PageType.THUMB_PAGE ^ PageType.ANY_SEARCH)) {
  var xpath = document.evaluate(
    'id("PAGEBODY")//p[contains(concat(" ", @class, " "), " TXT12 ")]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if(xpath != null);
    addToggleButton(xpath.singleNodeValue);
}

if(PageType.test(PageType.ANY_SEARCH)) {
  var contents = document.getElementsByClassName('content_672');
  if(contents.length != 0) {
    var list = contents[0];
    do {
        list = list.previousSibling;
    } while(list.nodeType != 1);
    var link_container = document.createElement('p');
    link_container.className = 'TXT12';
    link_container.appendChild(createTagLink(PageType.currentPageParam));
    list.appendChild(link_container);
    if(PageType.test(PageType.THUMB_PAGE))
      addToggleButton(list);
  }
}