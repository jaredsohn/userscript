// ==UserScript==
// @name       Manga Loader
// @namespace  http://userscripts.org/scripts/show/292462
// @version    0.2.8
// @description  Loads entire chapter into the page in a long strip format
// @updateURL http://userscripts.org/scripts/source/292462.meta.js
// @downloadURL http://userscripts.org/scripts/source/292462.user.js
// @copyright  2014+, fuzetsu
// @match http://www.batoto.net/read/*
// @match http://mangafox.me/manga/*/*/*
// @match http://readms.com/r/*/*/*/*
// @match http://g.e-hentai.org/s/*/*
// @match http://exhentai.org/s/*/*
// @match http://www.fakku.net/*/*/read*
// @match http://www.mangareader.net/*/*
// @match http://www.mangahere.com/manga/*/*
// @match http://www.mangapanda.com/*/*
// @match http://mangadeer.com/manga/*/*/*/*
// ==/UserScript==

// set to true for manga load without prompt
var BM_MODE = false;

var scriptName = 'Manga Loader';

/**
Sample Implementation:
{
    match: "http://domain.com/.*" // the url to react to for manga loading
  , img: '#image' // css selector to get the page's manga image
  , next: '#next_page' // css selector to get the link to the next page
  , numpages: '#page_select' // css selector to get the number of pages. elements like (select, span, etc)
  , curpage: '#page_select' // css selector to get the current page. usually the same as numPages if it's a select element
  , nextchap: '#next_chap' // css selector to get the link to the next chapter
  , prevchap: '#prev_chap' // same as above except for previous
  , wait: 3000 // how many ms to wait before auto loading (to wait for elements to load)

  Any of the CSS selectors can be functions instead that return the desired value.
}
*/

var implementations = [
    { // Batoto
        match: "http://www.batoto.net/read/.*"
      , img: '#comic_page'
      , next: '#full_image + a'
      , numpages: '#page_select'
      , curpage: '#page_select'
      , nextchap: 'select[name=chapter_select]'
      , prevchap: 'select[name=chapter_select]'
      , invchap: true
    }
  , { // MangaPanda
        match: "http://www.mangapanda.com/.*/[0-9]*"
      , img: '#img'
      , next: '.next a'
      , numpages: '#pageMenu'
      , curpage: '#pageMenu'
      , nextchap: 'td.c5 + td a'
      , prevchap: 'table.c6 tr:last-child td:last-child a'
  	}
  , { // MangaFox
        match: "http://mangafox.me/manga/.*/.*/.*"
      , img: '#image'
      , next: '.next_page'
      , numpages: 'select.m'
      , curpage: 'select.m'
      , nextchap: '#chnav p + p a'
      , prevchap: '#chnav a'
    }
  , { // MangaStream
        match: "http://readms.com/r/.*/.*/.*/.*"
      , img: '#manga-page'
      , next: '.next a'
      , numpages: function() {
        var lastPage = getEl('.subnav-wrapper .controls .btn-group:last-child ul li:last-child');
        return parseInt(lastPage.textContent.match(/[0-9]/g).join(''), 10);
      }
    }
  , { // MangaReader
        match: "http://www.mangareader.net/.*/.*"
      , img:'#img'
      , next: '.next a'
      , numpages: '#pageMenu'
      , curpage: '#pageMenu'
      , nextchap: 'td.c5 + td a'
      , prevchap: 'table.c6 tr:last-child td:last-child a'
    }
  , { // MangaHere
        match: "^http://www.mangahere.com/manga/.*/.*"
      , img: '#viewer img'
      , next: '.next_page'
      , numpages: 'select.wid60'
      , curpage: 'select.wid60'
      , nextchap: '#top_chapter_list'
      , prevchap: '#top_chapter_list'
      , wait: 2000
    }
  , { // MangaDeer
        match: "^http://mangadeer\.com/manga/.*/v[0-9]*/c[0-9]*/.*"
      , img: '.img-link > img'
      , next: '.page > span:last-child > a'
      , numpages: '#sel_page_1'
      , curpage: '#sel_page_1'
      , nextchap: function() {
          var ddl = getEl('#sel_book_1');
          var index = ddl.selectedIndex + 1;
          if(index >= ddl.options.length) return;
          var mangaName = window.location.href.slice(window.location.href.indexOf('manga/') + 6);
          mangaName = mangaName.slice(0, mangaName.indexOf('/'));
          return 'http://mangadeer.com/manga/' + mangaName + ddl.options[index].value + '/1';
      }
      , prevchap: function() {
          var ddl = getEl('#sel_book_1');
          var index = ddl.selectedIndex - 1;
          if(index < 0) return;
          var mangaName = window.location.href.slice(window.location.href.indexOf('manga/') + 6);
          mangaName = mangaName.slice(0, mangaName.indexOf('/'));
          return 'http://mangadeer.com/manga/' + mangaName + ddl.options[index].value + '/1';
      }
    }
  , { // GEH/EXH
        match: "http://(g.e-hentai|exhentai).org/s/.*/.*"
      , img: '.sni > a > img, #img'
      , next: '.sni > a, #i3 a'
    }
  , { // Fakku
        match: "^http://www.fakku.net/.*/.*/read#page=[0-9]*"
      , img: '.current-page'
      , next: '#image a'
      , numpages: '.drop'
      , curpage: '.drop'
    }
];

var log = function(msg, type) {
  type = type || 'log';
  if(type === 'exit') {
    throw scriptName + ' exit: ' + msg;
  } else {
    console[type](scriptName + ' ' + type + ': ', msg);
  }
};

var getEl = function(q, c) {
  return (c || document).querySelector(q);
};

var storeGet = function(key) {
  if(typeof GM_getValue === "undefined") {
    return localStorage.getItem(key);
  }
  return GM_getValue(key);
};

var storeSet = function(key, value) {
  if(typeof GM_setValue === "undefined") {
    return localStorage.setItem(key, value);
  }
  return GM_setValue(key, value);
};

var storeDel = function(key) {
  if(typeof GM_deleteValue === "undefined") {
    return localStorage.removeItem(key);
  }
  return GM_deleteValue(key);
};

var extractInfo = function(selector, mod, context) {
  if(typeof selector === 'function') {
    return selector();
  }
  var elem = getEl(selector, context)
    , option;
  mod = mod || {};
  if(elem) {
    switch (elem.nodeName.toLowerCase()) {
      case 'img':
        return elem.getAttribute('src');
      case 'a':
        return elem.getAttribute('href');
      case 'ul':
        return elem.children.length;
      case 'select':
        switch(mod.type) {
          case 'index':
            return elem.options.selectedIndex;
          case 'value':
            option = elem.options[elem.options.selectedIndex + (mod.val || 0)] || {};
            return option.value;
          default:
            return elem.options.length;
        }
        break;
      default:
        return elem.textContent;
    }
  }
};

var toStyleStr = function(obj) {
  var stack = []
    , key;
  for(key in obj) {
    if(obj.hasOwnProperty(key)) {
      stack.push(key + ':' + obj[key]);
    }
  }
  return stack.join(';');
};

var createButton = function(text, action, styleStr) {
  var button = document.createElement('button');
  button.textContent = text;
  button.onclick = action;
  button.setAttribute('style', styleStr || '');
  return button;
};

var getViewer = function(prevChapter, nextChapter) {
  var viewerCss = toStyleStr({
        'background-color': 'black'
      , 'text-align': 'center'
      , 'font-family': 'calibri arial sans-serif'
    })
    , imagesCss = toStyleStr({
        'margin': '5px 0'
    })
    , navCss = toStyleStr({
        'text-decoration': 'none'
      , 'color': 'black'
      , 'background': 'linear-gradient(white, #ccc)'
      , 'padding': '3px 10px'
      , 'border': '1px solid #ccc'
      , 'border-radius': '5px'
    })
  ;
  // set up body and head
  document.body.innerHTML = '<div id="images" style="' + imagesCss + '"></div>';
  document.head.innerHTML = '';
  // and navigation
  var nav = (prevChapter ? '<a href="' + prevChapter + '" style="' + navCss + '" class="ml-chap-nav">Prev Chapter</a> ' : '') +
    '<a href="" style="' + navCss + '">Exit</a> ' +
    (nextChapter ? '<a href="' + nextChapter + '" style="' + navCss + '" class="ml-chap-nav">Next Chapter</a>' : '');
  document.body.innerHTML = nav + document.body.innerHTML;
  document.body.innerHTML += nav;
  // set the viewer css
  document.body.setAttribute('style', viewerCss);
  // set up listeners for chapter navigation
  document.addEventListener('click', function(evt) {
    if(evt.target.className.indexOf('ml-chap-nav') !== -1) {
      log('next chapter will autoload');
      storeSet('autoload', 'yes');
    }
  }, false);
  return getEl('#images');
};

var imageCss = toStyleStr({
      'max-width': '100%'
    , 'display': 'block'
    , 'margin': '3px auto'
});

var addImage = function(src, loc, callback) {
  var image = new Image();
  image.onerror = function() {
    log('failed to load ' + src);
    image.remove();
  };
  image.onload = callback;
  image.src = src;
  image.setAttribute('style', imageCss);
  loc.appendChild(image);
};

var loadManga = function(imp) {
  var url = extractInfo(imp.img)
    , nextUrl = extractInfo(imp.next)
    , numPages = extractInfo(imp.numpages)
    , curPage = extractInfo(imp.curpage, {type:'index'}) || 1
    , nextChapter = extractInfo(imp.nextchap, {type:'value', val: (imp.invchap && -1) || 1})
    , prevChapter = extractInfo(imp.prevchap, {type:'value', val: (imp.invchap && 1) || -1})
    , xhr = new XMLHttpRequest()
    , domParser = new DOMParser()
    , getPageInfo = function() {
      var page = domParser.parseFromString(xhr.response, 'text/html');
      try {
        // find image and append
        addImage(extractInfo(imp.img, null, page), loc);
        // find next link and load it
        loadNextPage(extractInfo(imp.next, null, page));
      } catch(e) {
        log('error getting details from next page, assuming end of chapter.');
      }
    }
    , loadNextPage = function(url) {
      if(++curPage > numPages) {
        log('reached "numPages" ' + numPages + ', assuming end of chapter');
        return;
      }
      if(lastUrl === url) {
        log('last url is the same as current, assuming end of chapter');
        return;
      }
      lastUrl = url;
      xhr.open('get', url);
      xhr.onload = getPageInfo;
      xhr.onerror = function() {
        log('failed to load page, aborting', 'error');
      };
      xhr.send();
    }
    , lastUrl, loc
  ;

  if(!url || !nextUrl) {
    log('failed to retrieve ' + (!url ? 'image url' : 'next page url'), 'exit');
  }

  loc = getViewer(prevChapter, nextChapter);

  addImage(url, loc);
  loadNextPage(nextUrl);

};

var pageUrl = window.location.href
  , btnLoadCss = toStyleStr({
      'position': 'fixed'
    , 'bottom': 0
    , 'right': 0
    , 'padding': '5px'
    , 'margin': '0 10px 10px 0'
    , 'z-index': '1000'
  })
  , btnLoad
;

var autoload = storeGet('autoload');
    
// clear autoload
storeDel('autoload');

log('starting...');

var success = implementations.some(function(imp) {
  if(imp.match && (new RegExp(imp.match, 'i')).test(pageUrl)) {
    // if running in bookmarklet mode just run the page
    if(BM_MODE || autoload) {
      setTimeout(loadManga.bind(null, imp),imp.wait || 0);
      return true;
    }
    // append button to dom that will trigger the page load
    btnLoad = createButton('Load Manga', function(evt) {
      loadManga(imp);
      this.remove();
    }, btnLoadCss);
    document.body.appendChild(btnLoad);
    return true;
  }
});

if(!success) {
  log('no implementation for ' + pageUrl, 'error');
}