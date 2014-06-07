// ==UserScript==
// @name           Bookworm
// @version        5
// @namespace      http://ellab.org/
// @description    Integrate aNobii, Hong Kong Public Library and books.com.tw. Features like searching Hong Kong Public Library online catalogue in aNobii pages. Auto filling the Hong Kong Public Library Book Suggestion form with information from books.com.tw
// @require        http://ellab-gm.googlecode.com/svn/tags/lib-utils-5/ellab-utils.js
// @resource       loading http://ellab-gm.googlecode.com/svn/tags/anobii-hkpl-3/loading.gif
// @resource       shadowAlpha http://ellab-gm.googlecode.com/svn/tags/anobii-hkpl-3/shadowAlpha.png
// @include        http://www.anobii.com/books/*
// @include        http://www.anobii.com/wishlist*
// @include        http://www.anobii.com/*/books*
// @include        http://www.anobii.com/*/wishlist*
// @include        http://www.anobii.com/search*
// @include        http://www.anobii.com/contributors/*
// @include        http://www.anobii.com/tags/*
// @include        http://www.anobii.com/news_neighbor*
// @include        http://webcat.hkpl.gov.hk/*
// @include        https://webcat.hkpl.gov.hk/*
// @include        https://www.hkpl.gov.hk/tc_chi/collections/collections_bs/collections_bs.html*
// @include        http://www.books.com.tw/exep/prod/booksfile.php?item=*
// ==/UserScript==

/*
Author: Angus http://angusdev.mysinablog.com/
              http://angusdev.blogspot.com/
              http://twitter.com/angusdev
Date:   2012-09-18

Version history:
5    18-Sep-2012    Issue #29 Search by subtitle	 
                    Issue #30 Cross check HKPL ISBN to avoid displaying the result of another book with same book name	
                    Issue #36 HKPL 2012 Jan revamp
                    Issue #37 Upgrade to Chrome Manifest version 2	 
4    09-Apr-2011    Issue #22 Fix the bug of inconsistent style search books.com.tw link
                    Issue #23 Fix the bug that show multiple search books.com.tw links
                    Issue #24 Link from books.com.tw to anobii
                    Issue #25 Display anobii rating in HKPL and Books.com.tw book detail page
                    Issue #28 Fix the bug of duplicated search HKPL link in Chrome 12
3    24-Mar-2011    Issue #8 Let user search partial book name if full name not found in hkpl
                    Issue #9 Show prev/next page when multiple result has more than 1 page
                    Issue #10 In HKPL search result, show list of libraries that has the book on shelf
                    Issue #13 In HKPL book detail page, show link to anobii book page using ISBN
                    Issue #17 Integrate HKPL book suggestion and books.com.tw for one click book suggestion
                    Issue #19 Fix the bug that didn't show the search HKPL link if viewing others bookshelf in gallery mode
                    Issue #20 Rename extension name to "Bookworm"
                    Issue #21 Show link to search books.com.tw if not found in HKPL
2    03-Mar-2010    Issue #3 Handle multiple results from hkpl
                    Issue #4 Fix the bug that search books with punctuation in their name usually return no result from HKPL
                    Issue #7 Fix the bug that search button does not show up in book detail page after anobii revamp
1    10-Nov-2009    Initial release
*/

(function(){

var utils = org.ellab.utils;
var extract = org.ellab.utils.extract;
var xpath = org.ellab.utils.xpath;
var xpathl = org.ellab.utils.xpathl;

var LANG = new Array();
LANG['SEARCH'] = '搜尋';
LANG['SEARCH_HKPL'] = '搜尋公共圖書館';
LANG['SEARCH_PREV'] = '上一頁';
LANG['SEARCH_NEXT'] = '下一頁';
LANG['NOTFOUND'] = '沒有紀錄';
LANG['FOUND1'] = '共 ';
LANG['FOUND2'] = ' 本，';
LANG['FOUND3'] = ' 本架上';
LANG['FOUND4'] = ' 個預約';
LANG['MULTIPLE'] = '多於一個結果';
LANG['PROCESSING'] = '正在處理/準備註銷';
LANG['SEARCH_BOOKS_TW'] = '搜尋博客來';
LANG['ERROR'] = '錯誤';
LANG['UNKNOWN'] = '錯誤';

LANG['GET_SUGGESTION'] = '填寫內容';
LANG['LOADING'] = '載入中...';
LANG['INVALID_SUGGESTION_URL'] = '不正確的 URL，只支援「博客來 http://www.books.com.tw」';

LANG['HKPL_SUGGESTION'] = '圖書館購書建議';

LANG['ANOBII_RATING'] = 'aNobii 評級';

var SUGGEST_COUNTRY = new Array();
SUGGEST_COUNTRY['TC'] = ['台灣', '香港', '中國'];

var HKPL_TEXT_ON_SHELF = '館內架上';
var HKPL_TEXT_CHECKED_OUT = '借出';
var HKPL_TEXT_IN_TRANSIT = '轉移中';
var HKPL_TEXT_CLOSED_STACK = '閉架';

var ONSHELF_LIB_REMOVE_REGEXP= [
  [/公共圖書館/g, ''],
  [/香港中央圖書館/g, '中央'],
  [/&LTscript>processData%28'.*'%29;&LT\/script>/g, function(m) { return eval('"\\u'+m.match(/%28'(.*)'%29/)[1]+'";'); } ],
  [/%[a-zA-Z0-9]{2}/g, function(m) { return unescape(m); } ]
];

var SEARCH_LINK_ID_PREFIX = 'bookworm-search-id-';
var SUPER_SEARCH_LINK_ID_PREFIX = 'bookworm-supersearch-id-';
var MULTI_RESULT_LAYER_ID_PREFIX = 'bookworm-multiple-id-';
var MULTI_RESULT_PREV_LINK_ID_PREFIX = 'bookworm-multiple-prev-';
var MULTI_RESULT_NEXT_LINK_ID_PREFIX = 'bookworm-multiple-next-';

var SEARCH_LINK_CLASS = 'bookworm-search-book-link'; // css class name for the search link
var SUPERSEARCH_LINK_CLASS = 'bookworm-supersearch-link'; // css class name for the super search link
var SEARCH_ADDINFO_CLASS = 'bookworm-search-addinfo'; // css class name for addition info on search result
var SEARCH_ADDINFO_BOOKS_TW_CLASS = 'bookworm-search-addinfo-books-tw'; // css class name for search books.tw
var SEARCH_ADDINFO_BOOKNAME_CLASS = 'bookworm-search-addinfo-bookname'; // css class name for additional book name
var MULTI_RESULT_LAYER_CLASS = 'bookworm-multiple-layer';
var MULTI_RESULT_SEARCH_INLINE_CLASS = 'bookworm-search-inline';

var GET_SUGGESTION_BUTTON_ID = 'bookworm-get-suggestion-button';

var SEARCH_ISBN_ATTR = 'bookworm-isbn';

var LOADING_IMG = utils.getResourceURL('loading', 'loading.gif');
var SHADOWALPHA_IMG = utils.getResourceURL('shadowAlpha', 'shadowAlpha.png');

var SESSION_ID_KEY = 'ellab-anobii-hkpl-session';
var g_domainPrefix = 'http://webcat.hkpl.gov.hk';
var g_pageType = '';  // indicates which page is in, used by different function to show different presentations
var g_loading = false;

var PAGE_TYPE_ANOBII = 1;
var PAGE_TYPE_HKPL_BOOK = 2;
var PAGE_TYPE_HKPL_SUGGESTION = 3;
var PAGE_TYPE_BOOKS_TW_BOOK = 4;

var DISPLAY_BOOK = 0;
var DISPLAY_SIMPLE = 1;
var DISPLAY_LIST = 2;
var DISPLAY_GALLERY = 3;
var DISPLAY_SHELF = 4;

var g_displayMode = DISPLAY_BOOK;

var SEARCH_TYPE_NAME = 1;
var SEARCH_TYPE_ISBN = 2;
var SEARCH_TYPE_URL = 3;

var SEARCH_RESULT_SINGLE = 1;
var SEARCH_RESULT_MULTI = 2;
var SEARCH_RESULT_NOTFOUND = 3;
var SEARCH_RESULT_ERROR = 4;

function DEBUG(msg) {
  if (typeof unsafeWindow != 'undefined' && unsafeWindow.console && unsafeWindow.console.log) unsafeWindow.console.log(msg); else if (typeof console != 'undefined' && console.log) console.log(msg);
}

function decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
    hex = '0' + hex;
  }

  return hex.toUpperCase();
}

function encodeUTF8(s) {
  s = s.replace(/\r\n/g,'\n');
  var utftext = [];

  for (var i=0 ; i<s.length ; i++) {
    var c = s.charCodeAt(i);

    if (c < 2048) {
      utftext.push(s[i]);
    }
    else {
      utftext.push(decimalToHex((c >> 12) | 224, 2) +
                   decimalToHex(((c >> 6) & 63) | 128, 2) +
                   decimalToHex((c & 63) | 128, 2));
    }
  }

  return utftext;
}

// Traverse the node upward to find the nearest parent of the tag
function parent(node, tag) {
  if (!node) return node;

  if (!tag) return node.parentNode;

  node = node.parentNode;
  while (node) {
    if (node.tagName && node.tagName.toUpperCase() == tag.toUpperCase()) {
      return node;
    }
    node = node.parentNode;
  }
}

function processBookList() {
  g_displayMode = DISPLAY_BOOK;
  var res = xpathl("//div[@id='product_info']/div[@class='info']/h1[@class='title']");
  if (res.snapshotLength == 0) {
    res = xpathl("//table[@class='simple_list_view_container']//td[@class='title']//a");
    if (res.snapshotLength > 0) {
      g_displayMode = DISPLAY_SIMPLE;
    }
    else {
      res = xpathl("//ul[@class='item_text']//li[@class='title']//a");
      if (res.snapshotLength > 0) {
        g_displayMode = DISPLAY_LIST;
      }
      else {
        res = xpathl("//ul[@class='gallery_view_container']//li[@class='title']//a");
        if (res.snapshotLength > 0) {
          g_displayMode = DISPLAY_GALLERY;
        }
        // Not support shelf mode yet
        //else {
        //  res = xpathl("//ul[@class='shelf_view_container']//dt//a");
        //  if (res.snapshotLength > 0) {
        //    g_displayMode = DISPLAY_SHELF;
        //  }
        //}
      }
    }
  }

  for (var i=0; i<res.snapshotLength; i++) {
    var ele = res.snapshotItem(i);
    var matched = ele.innerHTML.match(/^\s*([^<]+)/);
    if (matched) {
      var bookName = matched[1].replace(/^s+/, '').replace(/\s+$/, '');

      var superSearchStartId = buildSuperSearch(ele, bookName, i, 0);

      switch (g_displayMode) {
        case DISPLAY_BOOK:
          var subtitle = xpath("../h2[@class='subtitle']", ele);
          break;
        case DISPLAY_LIST:
        case DISPLAY_GALLERY:
          var subtitle = xpath("../../li[@class='subtitle']", ele);
          break;
        case DISPLAY_SIMPLE:
          var subtitle = xpath("./span[@class='subtitle']", ele);
          break;
      }
      if (subtitle) {
        buildSuperSearch(subtitle, subtitle.textContent, i, superSearchStartId);
        subtitle.className += ' ' + SUPERSEARCH_LINK_CLASS;
      }

      var search = document.createElement('a');
      search.innerHTML = LANG['SEARCH_HKPL'];
      search.href = 'javascript:void(0)';
      search.className = SEARCH_LINK_CLASS;
      search.setAttribute('name', bookName);
      search.setAttribute('id', SEARCH_LINK_ID_PREFIX + i);
      attachSearchLinkListener(search);

      switch (g_displayMode) {
        case DISPLAY_BOOK:
          var isbn = xpath('//div[@id="product_details"]//span[text()="ISBN-13:"]');
          if (!isbn) {
            var isbn = xpath('//div[@id="product_details"]//span[text()="ISBN-10:"]');
          }
          if (isbn) {
            isbn = xpath('../strong', isbn);
            if (isbn) {
              isbn = extractISBN(isbn.textContent);
              if (isbn) {
                search.setAttribute(SEARCH_ISBN_ATTR, isbn);
              }
            }
          }
          search.setAttribute('style', 'float:right; color:#6a0;');
          search.className += ' subtitle';
          ele.appendChild(search);
          break;
        case DISPLAY_GALLERY:
          search.className += ' subtitle';
          var li = document.createElement('li');
          li.appendChild(search);
          var optionsLi = ele.parentNode.parentNode.getElementsByClassName('options');
          if (optionsLi && optionsLi.length) {
            optionsLi[0].style.position = 'static';
            ele.parentNode.parentNode.insertBefore(li, optionsLi[0]);
          }
          else {
            ele.parentNode.parentNode.appendChild(li);
          }
          break;
        case DISPLAY_LIST:
          var isbn = xpath('../../li[@class="details"]', ele);
          if (isbn) {
            isbn = extractISBN(isbn.textContent);
            if (isbn) {
              search.setAttribute(SEARCH_ISBN_ATTR, isbn);
            }
          }
        default:
          search.setAttribute('style', 'float:right; color:#6a0;');
          ele.parentNode.appendChild(search);
          break;
      }

      search = null;
    }
  }
}

function buildSuperSearch(ele, bookName, searchLinkId, superSearchStartId) {
  // build the super search link in original book name
  // in super search link, click on a word of the book name will search the partial book name up to that word
  // first split the book name to different search English word, number or other character
  var superSearchWords = [];
  var tmpBookName = utils.decodeHTML(bookName);
  while (tmpBookName) {
    var resSearchWord = tmpBookName.match(/^[a-zA-Z0-9]+/);
    if (resSearchWord) {
      superSearchWords.push(resSearchWord[0]);
    }
    else {
      resSearchWord = tmpBookName.match(/^\s+/);
      if (resSearchWord) {
        superSearchWords.push(resSearchWord[0]);
      }
      else {
        superSearchWords.push(tmpBookName[0]);
      }
    }
    tmpBookName = tmpBookName.substring(superSearchWords[superSearchWords.length-1].length);
  }

  var superSearchHTML = '';
  for (var j=0; j<superSearchWords.length; j++) {
    if (/^\s+$/.test(superSearchWords[j])) {
      // space, no link
      superSearchHTML += superSearchWords[j];
    }
    else {
      superSearchHTML += '<a id="'+ SUPER_SEARCH_LINK_ID_PREFIX + searchLinkId + '-' + (superSearchStartId + j) +'" href="javascript:void(0)">' + utils.encodeHTML(superSearchWords[j]) + '</a>';
    }
  }
  ele.innerHTML = ele.innerHTML.replace(bookName, superSearchHTML);
  for (var j=0; j<superSearchWords.length; j++) {
    var superSearch = document.getElementById(SUPER_SEARCH_LINK_ID_PREFIX + searchLinkId + '-' + (superSearchStartId + j));
    if (superSearch) {
      var searchPhrase = bookName.substring(0, j+1);
      var searchPhrase = superSearchWords.slice(0, j+1).join('');
      superSearch.setAttribute('name', searchPhrase);
      superSearch.setAttribute('title', LANG['SEARCH'] +' ' + searchPhrase);
      attachSearchLinkListener(superSearch);
    }
  }

  return superSearchWords.length;
}

function onClickSearch(searchLink) {
  if (g_loading) {
    return;
  }

  var originSearchLink = searchLink;
  var searchParam = { type:0, isbn:'', name:'' };

  if (searchLink.getAttribute('id')) {
    var searchId = searchLink.getAttribute('id').match('^' + SUPER_SEARCH_LINK_ID_PREFIX + '(\\d+)');
    if (searchId) {
      searchId = searchId[1];
      // check if it is a supersearch link, fake the program to the normal search link so the result will show on the normal search link
      searchLink = document.getElementById(SEARCH_LINK_ID_PREFIX + searchId);

      // remove the multi result of previous search
      var multipleLayer = document.getElementById(MULTI_RESULT_LAYER_ID_PREFIX + searchId);
      if (multipleLayer) {
        multipleLayer.parentNode.removeChild(multipleLayer);
      }
      // remove search books.com.tw link
      var list = searchLink.parentNode.getElementsByClassName(SEARCH_ADDINFO_CLASS);
      for (var i=list.length-1; i>=0; i--) {
        searchLink.parentNode.removeChild(list[i]);
      }
    }
  }

  searchLink.setAttribute('already-visited', 'true');
  g_loading = true;
  searchLink.innerHTML = '<img src="' + LOADING_IMG + '" border="0"/>';

  var bookName = searchLink.getAttribute('name');
  var searchName = originSearchLink.getAttribute('name');

  var isbn = originSearchLink.getAttribute(SEARCH_ISBN_ATTR);
  if (isbn) {
    searchParam.type = SEARCH_TYPE_ISBN;
    searchParam.isbn = isbn;
    var url = g_domainPrefix + '/search/query?match_1=PHRASE&field_1=isbn&term_1=' + isbn + '&theme=WEB';
  }
  else if (searchName) {
    searchParam.type = SEARCH_TYPE_NAME;
    searchParam.name = searchName;
    var url = g_domainPrefix + '/search/query?match_1=PHRASE&field_1=t&term_1=' + encodeURIComponent(searchName) + '&sort=dateBookAdded%3Bdescending&theme=WEB';
  }
  else if (originSearchLink.getAttribute('searchurl')) {
    searchParam.type = SEARCH_TYPE_URL;
    url = originSearchLink.getAttribute('searchurl');
  }

  DEBUG(url);
  if (url) {
    utils.crossOriginXMLHttpRequest({
      method: 'GET',
      url: url,
      onload: function(t) {
        g_loading = false;
        onLoadSearch(searchLink, t.responseText, url, searchParam, bookName);
      }
    });
  }
  else {
    // make a fake response to report error
    g_loading = false;
    onLoadSearch(searchLink, '', url);
  }
}

function moveMultipleResultLayer(divShadow, searchLink) {
  var minLeftMargin = 10;
  var minWidth = 300;
  var divWidth = 500;
  var divBorder = 0;
  var divPadding = 0;
  var shadowWidth = 6;
  var top = utils.calcOffsetTop(searchLink);
  top += searchLink.offsetHeight + shadowWidth + 6; // hardcode a vertical gap of 6px
  var left = utils.calcOffsetLeft(searchLink);
  left = left + shadowWidth + searchLink.offsetWidth - divWidth - divBorder * 2 - divPadding * 2;
  if (left < minLeftMargin) {
    divWidth = Math.max(minWidth, divWidth - (minLeftMargin - left));
    left = minLeftMargin;
  }

  divShadow.style.left = left + 'px';
  divShadow.style.top = top + 'px';

  var divContent = divShadow.getElementsByTagName('DIV')[0];
  if (divContent) {
      divContent.setAttribute('style',
                              'width:' + divWidth + 'px; padding:' + divPadding + 'px; background-color:white;' +
                              'margin:-' + shadowWidth + 'px ' + shadowWidth + 'px ' + shadowWidth + 'px -' + shadowWidth + 'px;' +
                              'border:' + divBorder + 'px solid grey;');
  }
}

function buildMultipleResult(searchLink, result) {
  DEBUG('buildMultipleResult');
  if (!result.booklist || result.booklist.length == 0) return;

  var html = '';
  for (var i=0;i<result.booklist.length;i++) {
    var book = result.booklist[i];
    var tr = '<tr>' +
             '<td><a href="' + book.bookURL + '" target="_blank">' + utils.encodeHTML(book.bookName) + '</a></td>' +
             '<td>' + book.onshelfTotal + LANG['FOUND3'] +
             (book.reserveCount?' ' + book.reserveCount + LANG['FOUND4']:'') +
             '</td>' +
             '<td>' + (book.publishYear || '&nbsp;') + '</td>' +
             '</tr>';
             //'<td><a style="white-space:nowrap; color:#6a0;" class="' + MULTI_RESULT_SEARCH_INLINE_CLASS + '" href="javascript:void(0);"' + ' searchurl="' + searchUrl + '">' + LANG['SEARCH'] + '</a></td>');

    html += tr;
  }

  if (html) {
    var searchLinkId = searchLink.getAttribute('id');
    var searchId = searchLinkId.match(/\d$/)[0];

    // add prev/next page link if needed
    if (result.totalPage > 1) {
      function createSearchInlineLink(id, url, page, text) {
        if (url.match(/pageNumber=\d+/)) {
          url = url.replace(/pageNumber=\d+/, 'pageNumber=' + page);
        }
        else {
          url = url + '&pageNumber=' + page;
        }
        return '<a style="white-space:nowrap; color:#6a0;" class="' + MULTI_RESULT_SEARCH_INLINE_CLASS + '" href="javascript:void(0);"' +
               (id?' id="' + id + '"':'') +
               ' searchurl="' + url + '">' + text + '</a>';
      }
      var prevHTML = result.currPage>1?createSearchInlineLink(MULTI_RESULT_PREV_LINK_ID_PREFIX + searchId, result.searchURL, result.currPage - 1, LANG['SEARCH_PREV']):'';
      var nextHTML = result.currPage<result.totalPage?createSearchInlineLink(MULTI_RESULT_NEXT_LINK_ID_PREFIX + searchId, result.searchURL, result.currPage + 1, LANG['SEARCH_NEXT']):'';
      var pagingHTML = '';
      var lastPageInPagingHTML = 0;
      // first 3 pages
      for (var i=1;i<=Math.min(3, result.totalPage);i++) {
        DEBUG(i);
        lastPageInPagingHTML = i;
        pagingHTML += '&nbsp;&nbsp;' + (result.currPage==i?i:createSearchInlineLink(MULTI_RESULT_PREV_LINK_ID_PREFIX + searchId, result.searchURL, i, i));
      }
      // middle 5 pages
      DEBUG('lastPageInPagingHTML='+lastPageInPagingHTML+'result.currPage-2='+(result.currPage-2)+',result.currPage+2='+(result.currPage+2)+',result.totalPage='+result.totalPage);
      var middlePagesStartPage = Math.max(4, result.currPage-2);
      for (var i=middlePagesStartPage;i<=Math.min(result.currPage+2, result.totalPage);i++) {
        DEBUG(i);
        if (i == middlePagesStartPage) {
          if (i == lastPageInPagingHTML+2) {
            // if that gap is only 1 page (e.g. 2 3 4 ... 6 7 8), we should show the page number instead of a elipsis symbol
            pagingHTML += '&nbsp;&nbsp;' + createSearchInlineLink(MULTI_RESULT_PREV_LINK_ID_PREFIX + searchId, result.searchURL, i-1, i-1);
          }
          else if (i > lastPageInPagingHTML+2) {
            pagingHTML += '&nbsp;&nbsp;...';
          }
        }
        lastPageInPagingHTML = i;
        pagingHTML += '&nbsp;&nbsp;' + (result.currPage==i?i:createSearchInlineLink(MULTI_RESULT_PREV_LINK_ID_PREFIX + searchId, result.searchURL, i, i));
      }
      // final 3 pages
      DEBUG('lastPageInPagingHTML='+lastPageInPagingHTML+'result.currPage+2='+(result.currPage+2)+',result.totalPage-2='+(result.totalPage-2)+',result.totalPage='+result.totalPage);
      var finalPagesStartPage = Math.max(result.currPage+3, result.totalPage-2);
      for (var i=finalPagesStartPage;i<=result.totalPage;i++) {
        DEBUG(i);
        if (i == finalPagesStartPage) {
          if (i == lastPageInPagingHTML+2) {
            // if that gap is only 1 page (e.g. 2 3 4 ... 6 7 8), we should show the page number instead of a elipsis symbol
            pagingHTML += '&nbsp;&nbsp;' + createSearchInlineLink(MULTI_RESULT_PREV_LINK_ID_PREFIX + searchId, result.searchURL, i-1, i-1);
          }
          else if (i > lastPageInPagingHTML+2) {
            pagingHTML += '&nbsp;&nbsp;...';
          }
        }
        pagingHTML += '&nbsp;&nbsp;' + (result.currPage==i?i:createSearchInlineLink(MULTI_RESULT_PREV_LINK_ID_PREFIX + searchId, result.searchURL, i, i));
      }
      if (prevHTML && nextHTML) {
        // add the space separater
        nextHTML = ' ' + nextHTML;
      }
      html = '<tr><td colspan="4">' + prevHTML + nextHTML + pagingHTML + '</td></tr>' + html;
    }

    // set td style
    html = html.replace(/<td([^>]*)>/ig, '<td$1 style="border:1px solid grey; padding:2px 4px 2px 4px; text-align:left;">');

    html = '<table width="100%">' + html + '</table>';

    // for some cases searchLink is not the original search link of that book (e.g. searchLink is 'Next')
    var originalSearchLink = document.getElementById(SEARCH_LINK_ID_PREFIX + searchId);
    // remove previous div if exists (e.g. searchLink is 'Next')
    var divShadow = document.getElementById(MULTI_RESULT_LAYER_ID_PREFIX + searchId);
    if (divShadow) {
      divShadow.parentNode.removeChild(divShadow);
      divShadow = null;
    }
    divShadow = document.createElement('div');
    divShadow.setAttribute('id', MULTI_RESULT_LAYER_ID_PREFIX + searchId);
    divShadow.className = MULTI_RESULT_LAYER_CLASS;
    divShadow.setAttribute('style',
                           'position:absolute; padding:0px; background:url(' + SHADOWALPHA_IMG + ') no-repeat right bottom;');

    divContent = document.createElement('div');
    divContent.innerHTML = html;

    // attach the click event of search link
    var searchRes = utils.getElementsByClassName(MULTI_RESULT_SEARCH_INLINE_CLASS, divContent);
    for (var i=0;i<searchRes.length;i++) {
      var search = searchRes[i];
      search.addEventListener('click', function(e) {
        if (e.target.getAttribute('already-visited')) {
          e.stopPropagation();
        }
        else {
          onClickSearch(e.target);
          e.stopPropagation();
          e.preventDefault();
        }
      }, false);
    }

    if (searchLinkId.match('^' + SEARCH_LINK_ID_PREFIX)) {
      searchLink.addEventListener('mouseover', function(e) {
        var searchId = e.target.getAttribute('id');
        if (searchId) {
          searchId = searchId.match(/\d$/);
          if (searchId) {
            searchId = searchId[0];
            var multipleLayer = document.getElementById(MULTI_RESULT_LAYER_ID_PREFIX + searchId);
            if (multipleLayer) {
              moveMultipleResultLayer(multipleLayer, e.target);
              multipleLayer.style.display = '';
            }
          }
        }
      }, false);
    }

    divShadow.appendChild(divContent);
    moveMultipleResultLayer(divShadow, originalSearchLink);
    document.body.appendChild(divShadow);
  }
}

function parseSearchHKPLResult(t) {
  DEBUG('parseSearchHKPLResult');

  var bookName, onshelfTotal, reserveCount, bookURL, publishYear, onshelfLib;

  onshelfTotal = extract(t, '<span class="availabilityTotal">', '</span>');
  if (onshelfTotal) {
    onshelfTotal = onshelfTotal.match(/\d+/);
    if (onshelfTotal) {
      onshelfTotal = parseInt(onshelfTotal[0], 10);
    }
  }
  onshelfTotal = onshelfTotal || 0;

  reserveCount = extract(t, '<span class="requestCount" dir="ltr">', '</span>');
  if (reserveCount) {
    reserveCount = reserveCount.match(/\d+/);
    if (reserveCount) {
      reserveCount = parseInt(reserveCount[0], 10);
    }
  }
  reserveCount = reserveCount || 0;

  publishYear = extract(t, '<div class="itemFields">', '</table>');
  if (publishYear) {
    // skip first td, which is the publisher
    publishYear = extract(publishYear, '<td class="label" dir="ltr">');
    if (publishYear) {
      // 2nd td is publish year
      publishYear = extract(publishYear, '<td class="label" dir="ltr">');
      if (publishYear) {
        publishYear = publishYear.match(/<span dir="ltr">([^<]+)<\/span>/);
        if (publishYear) {
          publishYear = publishYear[1];
        }
      }
    }
  }

  var t = extract(t, '<div class="recordNumber">');
  var booklink = t.match(/<a href=\"..(\/lib\/item\?id=chamo\:\d+&amp;theme=WEB)\".*>([^<]+)<\/a>/);

  if (booklink) {
    bookURL = g_domainPrefix + booklink[1];
    bookName = booklink[2];
  }

  var availLocDiv = extract(t, '<div class="search-availability">', '</div>');
  if (availLocDiv) {
    var availLocRes = availLocDiv.match(/<span class="availabilityLocation" dir="ltr">([^<]+)<\/span>\s*<span class="availabilityCount" dir="ltr">([^<]+)<\/span>/g);
    if (availLocRes) {
      onshelfLib = [];
      for (var i=0;i<availLocRes.length;i++) {
        var library = availLocRes[i].match(/<span class="availabilityLocation" dir="ltr">([^<]+)<\/span>\s*<span class="availabilityCount" dir="ltr">([^<]+)<\/span>/);
        if (library) {
          var libname = library[1];
          var libcount = library[2].match(/\d+/);
          libcount = libcount?parseInt(libcount, 10):0;

          for (var j=0 ; j<ONSHELF_LIB_REMOVE_REGEXP.length ; j++) {
            libname = libname.replace(ONSHELF_LIB_REMOVE_REGEXP[j][0], ONSHELF_LIB_REMOVE_REGEXP[j][1]);
          }
          onshelfLib.push({name:libname, count:libcount});
        }
      }
    }
  }

  return { bookName:bookName, onshelfTotal:onshelfTotal, reserveCount:reserveCount, bookURL:bookURL, publishYear:publishYear, onshelfLib:onshelfLib };
}

// attache the click event to the search link and super search link
function attachSearchLinkListener(a) {
  a.addEventListener('click', function(e) {
    if (e.target.getAttribute('already-visited')) {
      e.stopPropagation();
    }
    else {
      onClickSearch(e.target);
      e.stopPropagation();
      e.preventDefault();
    }
  }, false);
}

function onLoadSearch(searchLink, t, url, searchParam, bookName) {
  DEBUG('onLoadSearch:type=' + searchParam.type + ',url=' + url);

  var searchResult = { status:0, searchURL:url, resultCount:0, currPage:0, totalPage:0, itemsPerPage:0, booklist:[] };
  var oldt = t;
  var forceNotFound = false;

  var resultCountDiv = extract(t, '<div class="resultCount">');
  if (resultCountDiv) {
    resultCountDiv = resultCountDiv.match(/\d+/);
    if (resultCountDiv) {
      searchResult.resultCount = parseInt(resultCountDiv[0], 10);
    }
  }
  DEBUG('resultCount=' + searchResult.resultCount);

  if (searchResult.resultCount > 0) {
    if (searchParam.type == SEARCH_TYPE_ISBN) {
      // double verify the search term is originally search
      var res = t.match(/<span class="searchValue" title=\"([0-9|xX]+)\">/);
      if (!res || !isEqualISBN(res[1], searchParam.isbn)) {
        // somehow it is redirect to another isbn
        forceNotFound = true;
      }
    }

    // parse paging information
    var currPageRes = url.match(/&pageNumber=(\d+)/);
    searchResult.currPage = currPageRes?parseInt(currPageRes[1], 10):1;
    var itemsPerPageRes = extract(t, '<select id="search-pagesize"', '</select>');
    if (itemsPerPageRes) {
      itemsPerPageRes = itemsPerPageRes.match(/<option selected=\"selected\" value=\"(\d+)\">/);
      if (itemsPerPageRes) {
        searchResult.itemsPerPage = parseInt(itemsPerPageRes[1], 10);
        searchResult.totalPage = Math.ceil(searchResult.resultCount / searchResult.itemsPerPage);
      }
    }
  }

  if (forceNotFound || searchResult.resultCount == 0) {
    // not found
    searchLink.innerHTML = LANG['NOTFOUND'];

    // not found and not in gallery display mode, show link to search books.com.tw
    // it is ugly to show the link in shelf display mode
    if (bookName && g_displayMode != DISPLAY_GALLERY) {
      var a = document.createElement('a');
      a.innerHTML = LANG['SEARCH_BOOKS_TW'];
      a.href = 'javascript:void(0)';
      a.setAttribute('bookname', bookName);
      a.className = searchLink.className + ' ' + SEARCH_ADDINFO_CLASS + ' ' + SEARCH_ADDINFO_BOOKS_TW_CLASS;
      a.addEventListener('click', function(e) {
        var form = document.createElement('form');
        form.action = 'http://search.books.com.tw/exep/prod_search.php';
        form.method = 'get';
        form.target = '_blank';
        var hidden = document.createElement('input');
        hidden.name = 'cat';
        hidden.value = 'BKA';
        form.appendChild(hidden);
        hidden = document.createElement('input');
        hidden.name = 'key';
        hidden.value = bookName;
        form.appendChild(hidden);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      }, false);
      searchLink.parentNode.appendChild(a);
    }
  }
  else if (searchResult.resultCount == 1) {
    // single result
    searchResult.status = SEARCH_RESULT_SINGLE;

    var parsed = parseSearchHKPLResult(t);
    if (parsed) {
      if (parsed.onshelfLib && parsed.onshelfLib.length) {
        var onshelfLibString = '';
        for (var i=0;i<parsed.onshelfLib.length;i++) {
          if (parsed.onshelfLib[i].count) {
            onshelfLibString += (onshelfLibString?', ':'') + parsed.onshelfLib[i].name + (parsed.onshelfLib[i].count > 1?'('+ parsed.onshelfLib[i].count + ')':'');
          }
        }
        searchLink.title = onshelfLibString;
      }

      searchLink.innerHTML = parsed.onshelfTotal + LANG['FOUND3'] +
                             (parsed.reserveCount?' ' + parsed.reserveCount + LANG['FOUND4']:'');

      // show the book name if it is search by name, in case the result is incorrect
      if (searchParam.type == SEARCH_TYPE_NAME) {
        var div = document.createElement('div');
        div.innerHTML = parsed.bookName;
        div.title = utils.decodeHTML(parsed.bookName);
        div.className = searchLink.className + ' ' + SEARCH_ADDINFO_CLASS + ' ' + SEARCH_ADDINFO_BOOKNAME_CLASS;
        searchLink.parentNode.appendChild(div);
      }

      // the link should point to the book instead of serach result
      url = parsed.bookURL;
    }
  }
  else if (searchResult.resultCount > 1) {
    searchResult.status = SEARCH_RESULT_MULTI;

    searchLink.innerHTML = LANG['MULTIPLE'];

    var t = extract(oldt, '<li class="record">');
    while (t) {
      var parsed = parseSearchHKPLResult(t);
      if (parsed) {
        searchResult.booklist.push(parsed);
      }
      t = extract(t, '<li class="record">');
    }

    // page links
    var t = extract(oldt, '<div class="pageLinks">', '</div>');
  }
  else {
    searchLink.innerHTML = LANG['UNKNOWN'];
  }

  DEBUG(searchResult);
  searchLink.href = url;
  searchLink.target = '_blank';
  if (searchResult.status == SEARCH_RESULT_MULTI) {
    buildMultipleResult(searchLink, searchResult);
  }
}

function extractISBN(s) {
  var isbn = s.match(/\s*([0-9]{9,13}X?)/);
  if (isbn) {
    isbn = isbn[1];
    if (isValidISBN(isbn)) {
      return isbn;
    }
  }

  return null;
}

function calcISBNCheckDigit(isbn) {
  if (isbn && (isbn.length == 9 || isbn.length == 10)) {
    var total = 0;
    for (var i=0 ; i<9 ; i++) {
      total += (i+1) * parseInt(isbn[i], 10);
    }
    total = total % 11;
    return (total==10)?'X':(''+total);
  }
  else if (isbn && (isbn.length == 12 || isbn.length == 13)) {
    var total = 0;
    for (var i=0 ; i<12 ; i++) {
      total += (i%2?3:1) * parseInt(isbn[i], 10);
    }
    total = 10 - total % 10;
    total = total==10?0:total;
    return ''+total;
  }
  else {
    return '';
  }
}

function isValidISBN(isbn) {
  if (typeof isbn == 'undefined' || !isbn || (isbn.length != 10 && isbn.length != 13)) {
    return false;
  }

  var checkDigit = calcISBNCheckDigit(isbn);
  return (checkDigit && checkDigit == isbn[isbn.length-1]);
}

function isbn10To13(isbn) {
  if (typeof isbn == 'undefined' || !isbn || isbn.length != 10) {
    return '';
  }

  var isbn13 = '978' + isbn.substring(0, 9);
  return isbn13 + calcISBNCheckDigit(isbn13);
}

function isEqualISBN(a, b) {
  DEBUG('isEqualISBN ' + a + ', ' + b);
  if (typeof a == 'undefined' || typeof b == 'undefined' || !a || !b || !isValidISBN(a) || !isValidISBN(b)) {
    return false;
  }

  if (a.length == b.length) {
    return a == b;
  }
  if (a.length == 10) {
    a = isbn10To13(a);
    DEBUG('isEqualISBN a converted to ' + a);
  }
  if (b.length == 10) {
    b = isbn10To13(b);
    DEBUG('isEqualISBN b converted to ' + b);
  }

  return a == b;
}

function testISBNFunctions() {
  var failCase = [];
  function assertValid(a) {
    if (!isValidISBN(a)) {
      failCase.push(a + ' should be valid');
    }
  }
  function assertNotValid(a) {
    if (isValidISBN(a)) {
      failCase.push(a + ' should be invalid');
    }
  }
  function assertEqual(a, b) {
    if (!isEqualISBN(a, b)) {
      failCase.push(a + ' and ' + b + ' should be equal');
    }
  }
  function printResult() {
    if (failCase.length > 0) {
      alert(failCase.join('\n'));
    }
    else {
      alert('Test complete');
    }
  }

  assertValid('9570518944');
  assertValid('9789570518948');
  assertValid('9573324237');
  assertValid('9789573324232');
  assertValid('9866702588');
  assertValid('9789866702587');
  assertValid('9579016089');
  assertValid('9789579016087');

  assertNotValid('978957901608');
  assertNotValid('1234567890');
  assertNotValid('1234567890123');

  assertEqual('9570518944', '9789570518948');
  assertEqual('9573324237', '9789573324232');
  assertEqual('9866702588', '9789866702587');
  assertEqual('9579016089', '9789579016087');
  assertEqual('9789570518948', '9570518944');
  assertEqual('9789573324232', '9573324237');
  assertEqual('9789866702587', '9866702588');
  assertEqual('9789579016087', '9579016089');

  printResult();
}

function hkplAddAnobiiLink() {
  var res = xpathl("//div[@id='itemView']/div[@class='itemFields']/table/tbody/tr/td[2]");
  for (var i=0 ; i<res.snapshotLength ; i++) {
    addAnobiiLink(res.snapshotItem(i), true);
  }
}

function booksTWAddAnobiiLink() {
  var res = xpath("//div[@id='pr_data']//span[text()='ISBN：']/../dfn[2]");
  if (res) {
    addAnobiiLink(res, false);
  }
}

function addAnobiiLink(ele, showCover) {
  var isbn = extractISBN(ele.textContent);
  if (isbn) {
    var loading = document.createElement('img');
    loading.src = LOADING_IMG;
    loading.setAttribute('style', 'vertical-align:middle;margin-left:5px;');
    ele.appendChild(loading);
    utils.crossOriginXMLHttpRequest({
      method: 'GET',
      url: 'http://iapp2.anobii.com/InternalAPI/html/iapp2/search/search-book?keyword=' + isbn + '&page=1&itemPerPage=1',
      onload: function(t) {
        ele.removeChild(loading);
        if (t.status == 200) {
          try {
            var obj = utils.jsonParse(t.responseText);
            if (obj && obj[0].totalRecord > 0) {

              obj = obj[0];
              var bookId = obj.resultFinal[0].encryptItemId;
              ele.innerHTML = '<a href="http://www.anobii.com/books/' + obj.resultFinal[0].encryptItemId + '" target="_blank">' +
                              (showCover?'<img src="' + obj.resultFinal[0].imageUrl.replace('type=1', 'type=3') + '"/><br/>':'') +
                              ele.textContent.replace(/\s+$/g,'') + '</a><img src="http://static.anobii.com/favicon.ico" style="vertical-align:middle;margin-left:5px;' +
                              (showCover?'margin-top:5px;':'') +
                              '"/>';
              addAnobiiRating(ele, bookId);
            }
          }
          catch (err) {
            ele.innerHTML = isbn + ' ' + LANG['ERROR'];
          }
        }
      }
    });
  }
}

function addAnobiiRating(ele, bookId) {
  var loading = document.createElement('img');
  loading.src = LOADING_IMG;
  loading.setAttribute('style', 'vertical-align:middle;margin-left:5px;');
  ele.appendChild(loading);
  utils.crossOriginXMLHttpRequest({
    method: 'GET',
    url: 'http://iapp2.anobii.com/InternalAPI/html/iapp2/item/book?itemId=' + bookId + '&description=0',
    onload: function(t) {
      ele.removeChild(loading);
      if (t.status == 200) {
        var obj = utils.jsonParse(t.responseText);
        if (obj && obj.length > 0) {

          obj = obj[0];
          if (obj.totalOwner > 0) {
            var rating = '';
            if (obj.averageRate > 0) {
              var rateInt = parseInt(obj.averageRate, 10);
              var ratePtFive = (obj.averageRate == rateInt)?0:1;
              for (var i=0; i<rateInt; i++) {
                rating += '<img src="http://static.anobii.com/anobi/live/image/star_self_1.gif" width="10" height="10"/>';
              }
              if (ratePtFive) {
                rating += '<img src="http://static.anobii.com/anobi/live/image/star_self_05.gif" width="10" height="10"/>';
              }
              for (var i=rateInt+ratePtFive; i<5; i++) {
                rating += '<img src="http://static.anobii.com/anobi/live/image/star_self_0.gif" width="10" height="10"/>';
              }
            }
            rating += ' (' + obj.totalRatePerson + '/' + obj.totalOwner + ')';
            if (g_pageType == PAGE_TYPE_HKPL_BOOK) {
              var parentTr = parent(ele, 'tr');
              if (parentTr) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<tr valign="CENTER"><td width="20%" valign="top"><strong>' + LANG['ANOBII_RATING'] + '</strong>' +
                               '<td valign="top">' + rating + '</td></tr>';
                parentTr.parentNode.insertBefore(tr, parentTr.nextSibling);
              }
            }
            else if (g_pageType == PAGE_TYPE_BOOKS_TW_BOOK)  {
              var parentLi = parent(ele, 'li');
              if (parentLi) {
                var li = document.createElement('li');
                li.innerHTML = LANG['ANOBII_RATING'] + ':<span>' + rating +  '</span>';
                parentLi.parentNode.insertBefore(li, parentLi.nextSibling);
              }
            }
          }
        }
      }
    }
  });
}

function _hkplSuggestion_booksTW(t) {
  if (t && t.responseText) {
    t = t.responseText;
  }
  else {
    return;
  }

  t = extract(t, '<div class="prd001">');

  DEBUG(t);

  var res = xpath("//form[@name='entryform1']//input[@value='Book']");
  if (res) {
    res.checked = true;
  };

  res = extract(t, '<span>', '</span>');
  document.getElementById('title').value = res?res:'';
  // <a href="http://search.books.com.tw/exep/prod_search.php?key=%AA%BB%CC&f=author">Author Name</a>
  res = t.match(/<a href=\"[^\"]*f=author\">([^<]+)/);
  document.getElementById('author').value = res?res[1]:'';
  // <a href="http://www.books.com.tw/exep/pub_book.php?pubid=xxx">publisher</a>
  res = t.match(/<a href=\"[^\"]*pub_book\.php\?pubid=[^\"]*\">([^<]+)/);
  document.getElementById('publisher').value = res?res[1]:'';

  t = extract(t, 'pub_book.php?pubid=');
  res = extract(t, '<dfn>', '</dfn>');
  document.getElementById('place').value = res?res:'';

  res = t.match(/<span>ISBN[^<]*<\/span><dfn>([0-9|x|X]+)<\/dfn>/);
  if (res) {
    document.getElementById('isbn').value = res[1];
    xpath("//form[@name='entryform1']//input[@value='ISBN']").checked = true;
  }
}

function _hkplSuggestion_onClick() {
  if (g_loading) {
    return;
  }

  var address0 = document.getElementById('address0');
  if (!address0) {
    return;
  }
  var url = address0.value;
  if (/^https?:\/\/[^\/]*\.books\.com\.tw/.test(url)) {
    g_loading = true;
    document.getElementById(GET_SUGGESTION_BUTTON_ID).value = LANG['LOADING'];
    utils.crossOriginXMLHttpRequest({
      method: 'GET',
      url: url,
      overrideMimeType: 'text/html; charset=big5',
      onload: function(t) {
        g_loading = false;
        _hkplSuggestion_booksTW(t);
        document.getElementById(GET_SUGGESTION_BUTTON_ID).value = LANG['GET_SUGGESTION'];
      }
    });
  }
  else {
    alert(LANG['INVALID_SUGGESTION_URL']);
  }
}

function hkplSuggestion() {
  var place = document.getElementById('place');
  if (place) {
    var suggestCountry = SUGGEST_COUNTRY['TC'];
    for (var i=0; i<suggestCountry.length; i++) {
      var a = document.createElement('a');
      a.innerHTML = suggestCountry[i];
      a.href = 'javascript:void(0)';
      a.setAttribute('style', 'margin-left:10px;');
      a.setAttribute('value', suggestCountry[i]);
      a.addEventListener('click', function(e) {
        place.value = e.target.getAttribute('value') + ' ' + place.value;
      }, false);
      place.parentNode.appendChild(a);
    }
  }

  var address0 = document.getElementById('address0');
  if (address0) {
    var input = document.createElement('input');
    input.setAttribute('id', GET_SUGGESTION_BUTTON_ID);
    input.type = 'button';
    input.value = LANG['GET_SUGGESTION'];
    input.addEventListener('click', function(e) {
      _hkplSuggestion_onClick(e);
    }, false);
    address0.parentNode.appendChild(input);

    if (/autofill=1$/.test(document.location.href)) {
      if (document.referrer) {
        address0.value = document.referrer;
        _hkplSuggestion_onClick();
      }
    }
  }
}

function booksTWAddHKPLSuggestionLink() {
  var res = xpath("//ul[@class='prf003']");
  if (res) {
    var li = document.createElement('li');
    var button = document.createElement('button');
    button.innerHTML = LANG['HKPL_SUGGESTION'];
    button.addEventListener('click', function(e) {
      var form = document.createElement('form');
      form.action = 'https://www.hkpl.gov.hk/tc_chi/collections/collections_bs/collections_bs.html';
      form.method = 'get';
      form.target = '_blank';
      var hidden = document.createElement('input');
      hidden.name = 'autofill';
      hidden.value = '1';
      form.appendChild(hidden);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }, false);
    li.appendChild(button);
    res.appendChild(li);
  }
}

// main

// temp solution for Issue #28 Duplicated search HKPL link in Chrome 12
if (typeof(document) != 'undefined' && document.body && document.body.getAttribute('bookworm-loaded')) {
  return;
}
else {
  document.body.setAttribute('bookworm-loaded', 'true');
}

if (/anobii\.com/.test(document.location.href)) {
  g_pageType = PAGE_TYPE_ANOBII;

  if (typeof(GM_addStyle) != 'undefined') {
    GM_addStyle('.gallery_view .shelf dl { padding-bottom:0px !important; } \
                 a.bookworm-search-book-link:link { color:#6a0; } \
                 .gallery_view .bookworm-search-book-link { display:block; background:none; padding-left:0px; } \
                 .bookworm-supersearch-link.subtitle a:link { color:black; } \
                 .bookworm-supersearch-link.subtitle a:hover { color:#039; } \
                 .simple_list_view .shelf .title .bookworm-supersearch-link.subtitle a { font-weight:normal; } \
                 .bookworm-search-addinfo { clear:both; float:right; } \
                 .title a.bookworm-search-addinfo-books-tw:link, .list_view .title:hover a.bookworm-search-addinfo-books-tw, #product_info .info a.bookworm-search-addinfo-books-tw { color:#6a0; } \
                 .bookworm-search-addinfo-bookname { font-weight:normal; overflow:hidden; text-overflow:ellipsis; width:100px; white-space:nowrap; } \
                 .gallery_view .bookworm-search-addinfo-bookname: { width:100%; }');
  }

  document.body.addEventListener('click', function(e) {
    var res = utils.getElementsByClassName(MULTI_RESULT_LAYER_CLASS);
    for (var i=0;i<res.length;i++) {
      res[i].style.display = 'none';
    }
  }, false);

  processBookList();
}
else if (/\/lib\/item\?id=chamo\:\d+/.test(document.location.href)) {
  g_pageType = PAGE_TYPE_HKPL_BOOK;

  hkplAddAnobiiLink();
}
else if (/collections_bs/.test(document.location.href)) {
  g_pageType = PAGE_TYPE_HKPL_SUGGESTION;

  hkplSuggestion();
}
else if (/booksfile\.php/.test(document.location.href)) {
  g_pageType = PAGE_TYPE_BOOKS_TW_BOOK;

  booksTWAddHKPLSuggestionLink();
  booksTWAddAnobiiLink();
}

})();
