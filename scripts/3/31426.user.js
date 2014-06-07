// ==UserScript==
// @name           nicovideo Show All Ranks
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Show all rankings at once.
// @include        http://www.nicovideo.jp/ranking/*
// ==/UserScript==

const $DEBUG = false;

function log() {
  if(!$DEBUG)
    return;
  if(unsafeWindow.console && unsafeWindow.console.log)
    unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
  else
    Array.forEach(arguments, GM_log);
}

var queryArray = location.search.substring(1).split('&');
var originalQuery = queryArray
  .filter(function(s) { return s != 'show_all'; }).join('&');
var isShowAll = queryArray
  .some(function(s) { return s == 'show_all'; });
var originalURL = (location.search.length > 0)
  ? location.href.slice(0, -location.search.length)
  : location.href;
var [, rank_url_prefix, original_rank_type, rank_span, rank_category] =
  originalURL.match(
    new RegExp(
      '(http://\w+\\.nicovideo\\.jp/ranking)/([^/]+)/([^/]+)/([^/]+)\\??.*$'));

var filters = [];
if(typeof window.NicovideoShowAllRanks == 'undefined') {
  window.NicovideoShowAllRanks = {};
  window.NicovideoShowAllRanks.addFilter = function(f) {
    filters.push(f);
  };
}

Array.find = function(array, cond, thisp) {
  var hit;
  if(arguments.length < 3)
    thisp = array;

  Array.some(
    array,
    function(elem, i, a) {
      if(cond.call(thisp, elem, i, a)) {
        hit = arguments[0];
        return true;
      }
      return false;
    });
  return hit;
};
Array.prototype.find =
  function(cond, thisp) { return Array.find(this, cond, thisp); };



function addAllRankLink() {
  var tr = document.evaluate(
      'id("ranking-name")/following-sibling::div' +
      '/table/tbody/tr/td[1]/table[2]/tbody/tr',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(isShowAll) {
    Array.forEach(
      tr.getElementsByTagName('a'),
      function(a) {
        a.className = 'switch_1';
      });
  }
  var td = document.createElement('td');
  var a = document.createElement('a');
  a.href = originalURL + '?show_all';
  a.className = 'switch_' + ((isShowAll)? '0' : '1');
  var div = document.createElement('div');
  div.textContent = "全部";
  div.className = 'switch';
  // a の子要素に div が含まれるうんこみたいなマークアップ
  a.appendChild(div);
  td.appendChild(a);
  tr.appendChild(td);
}


function changeHref() {
  function addQuery(link) { link.href += '?show_all'; }
  var tr = document.evaluate(
    'id("ranking-name")/following-sibling::div' +
      '/table/tbody/tr/td[1]/table[1]/tbody/tr',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  Array.forEach(tr.getElementsByTagName('a'), addQuery);
  Array.forEach(
    document.getElementById('ranking_categories').getElementsByTagName('a'),
    addQuery);
  var button = document.evaluate(
    'id("PAGEBODY")' +
    '//input[@type = "button"][@value = "このランキングを標準にする"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(button)
    button.setAttribute(
      'onclick',
      button.getAttribute('onclick')
        .replace('location.pathname', '(location.pathname + location.search)'));
}


function changePageStyle() {
  GM_addStyle(
    '#ranking_categories { position: absolute; right: 99%; }\
    #ranking_categories:hover { right: auto;}\
    #ranking-name, #ranking-name + p, .switch_bg {\
      width: 960px; margin: auto auto; }\
    #PAGEHEADER { width: 960px; margin: auto auto; }');

  document.body.style.width = '100%';
  document.getElementById('ranking-name').lastChild.textContent = '全部入りランキング';

  var category_td = document.getElementById('ranking_categories').parentNode;
  category_td.removeAttribute('width');

  var rank_td = nextElement(category_td);
  rank_td.parentNode.setAttribute('width', '100%');
  rank_td.parentNode.parentNode.parentNode.setAttribute('width', '100%');

  var add_td = nextElement(rank_td);
  add_td.parentNode.removeChild(add_td);

  return rank_td;
}

function getRankTable(type, span, category, query, callback) {
  GM_xmlhttpRequest(
    {
      method: 'GET',
      url: [rank_url_prefix, type, span, category].join('/') + '?' + query,
      headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey; nicovideo Show All Ranks' },
      onload: function(response) {
        var body = Array.find(
          document.createRange()
            .createContextualFragment(response.responseText).childNodes,
          function(child) {
            return (child.id == 'PAGEBODY');
          });
        if(!body)
          return;
        var td = document.evaluate(
          'descendant::div[@id="ranking_categories"]' +
            '/../following-sibling::td[1]',
          body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(td == null)
          return;
        callback(td);
      }
    });
}

function toJpType(type) {
  switch(type) {
  case 'mylist': return 'マイリスト';
  case 'view': return '再生';
  case 'res': return 'コメント';
  }
  return type;
}

var convertText =
  (function() {
     const space_regex = /　+/g;
     const str_regex = /([^"<> ]{8})(?=[^"<> ]{8})/g;
     return function(elem) {
       if(!elem)
         return;
       elem.innerHTML =
         elem.innerHTML.replace(space_regex, ' ')
         .replace(str_regex, '$1<wbr>');
     };
   })();

function createTableHeader(type) {
  var th = document.createElement('th');
  th.textContent = toJpType(type);
  th.setAttribute('width', '34%');
  th.style.fontSize = '30px';
  th.style.textAlign = 'center';
  return th;
}


function convertThumb(td, width) {
  td.width = '33%';
  td.style.verticalAlign = 'top';
  var thumbs = Array.slice(td.getElementsByClassName('thumb_frm'));
  thumbs.forEach(
    function(thumb, idx) {
      thumb.style.width = '';
      thumb.getElementsByTagName('table')[0].removeAttribute('width');
      thumb.getElementsByClassName('data')[0]
        .getElementsByTagName('div')[0].style.width = '';
      var h3 = thumb.getElementsByTagName('h3')[0];
      convertText(h3.getElementsByTagName('a')[0]);
      convertText(nextElement(h3));
    });
  return thumbs;
}

var rank_tr_width;
function convertTable(rank_td, query) {
  var rank_tr = rank_td.parentNode;
  var header_tr = document.createElement('tr');
  header_tr.appendChild(document.createElement('td'));
  rank_tr.parentNode.insertBefore(header_tr, rank_tr);

  if(rank_tr_width === undefined)
   rank_tr_width =
    parseInt(getComputedStyle(rank_tr.parentNode, '').width);

  convertThumb(rank_td, rank_tr_width);

  header_tr.appendChild(createTableHeader(original_rank_type));

  var rank_types = ['mylist', 'view', 'res'].filter(
    function(t) { return t != original_rank_type; });
  function updateRank(type, callback) {
    getRankTable(
      type, rank_span, rank_category, query,
      function(td) {
        try {
          convertThumb(td, rank_tr_width);
          filters.forEach(function(f) { f(td); });
          header_tr.appendChild(createTableHeader(type));
          rank_tr.appendChild(td);
        } finally {
          if(typeof callback == 'function')
            callback();
        }
      });
  }
  updateRank(rank_types[0], function() { updateRank(rank_types[1]); });
}

addAllRankLink();

if(isShowAll) {
  changeHref();
  var rank_td = changePageStyle();
  convertTable(rank_td, originalQuery);
  var page_idx = parseInt(
    (originalQuery.split('&')
     .find(
       function(q) { return q.indexOf('page=') == 0; }
     ) || 'page=1').substring('page='.length), 10);
  if (window.AutoPagerize !== undefined)
    window.AutoPagerize.addFilter(
      function(rank_thumbs) {
        var tr = document.createElement('tr');
        tr.appendChild(document.createElement('td'));
        var td = document.createElement('td');
        rank_thumbs.forEach(
          function(thumb) {
            td.appendChild(thumb);
          }
        );
        setTimeout(
          function() {
            tr.appendChild(td);
            var df = document.createDocumentFragment();
            df.appendChild(tr);
            convertTable(td, 'page=' + (++page_idx));
            rank_td.parentNode.parentNode.appendChild(df);
          }, 0);
      });
}


function nextElement(elem) {
  do {
    elem = elem.nextSibling;
  } while(elem && elem.nodeType != 1);
  return elem;
}
function previousElement(elem) {
  do {
    elem = elem.previousSibling;
  } while(elem && elem.nodeType != 1);
  return elem;
}
