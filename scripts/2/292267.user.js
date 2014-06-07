// ==UserScript==
// @name         Userscripts.org filter by title
// @version      0.3
// @description  Filters userscripts.org scripts and forum-threads by title- and author-conditions.
// @updateURL    http://userscripts.org/scripts/source/292267.meta.js
// @downloadURL  http://userscripts.org/scripts/source/292267.user.js
// @match        http://*.userscripts.org/*
// @include      http://*.userscripts.org/*
// @match        https://*.userscripts.org/*
// @include      https://*.userscripts.org/*
// @grant        none
// @license      CC 1.0 (Public Domain) - http://creativecommons.org/publicdomain/zero/1.0/
// ==/UserScript==

(function() {
  
  var hideAll = true;
  var hide = {
    forums: {
      spam: hideAll,
      uppercase: hideAll
    },
    scripts: {
      spam: hideAll,
      uppercase: hideAll
    }
  };
  
  var separator = ' _!{}.-=+/|"\'\\][@#$%^&*()<>?:;';
  var enclosedSplit = ',';
  
  /* First matching filter gets used (so it's possible to define whitelist-filter).
   * A filter may contain:
   *   'style'          - string                                - style to use if filter matches
   *   'upperOnly'      - boolean                               - whether to filter titles in UPPERCASE only
   *   'authors'        - [string,regexp]                       - authors to match
   *   'begins', 'ends' - [string]                              - match titles beginning/ending with any of given strings
   *   'contains'       - [string,regexp,[string,regexp,[...]]] - strings/regexps/arrays to filter if found/matched. The array-depth alternates between OR (any stmt matches) and AND (each stmt matches) starting with OR
   *   'enclosed'       - {string: string}                      - filter titles that contain any of the keys (splitted by variable enclosedSplit) enclosed in any of appropriate characters or line-start/-end
   *   'lowerCase'      - object                                - may contain 'enclosed','begins','ends','contains' for the lower-cased title
   */ 
  
  /***********************
   * FORUM THREAD FILTER *
   ***********************/
  
  var filterForums = [
    { // author-whitelist
      style: 'background-color:rgba(0,255,0,0.05);',
      authors: ['Jesse Andrews']
    },
    { // spam-filter
      style: hide.forums.spam ? 'display:none;' : 'background-color:rgba(0,0,0,0.3); opacity:0.4;',
      contains: [/L[i\|]VE/, 'EnJOY', 'W@tcH', '@@@'],
      lowerCase: {
        begins:   ['watch ', '{{'],
        enclosed: {'kitchen': separator + 's', 'free,sale': separator},
        contains: [['live', 'stream'], ['watch', 'season'], ['download', 'movie']],
      }
    },/*
    { // personal spam-filter
      style: hide.scripts.spam ? 'display:none;' : 'background-color:rgba(0,0,0,0.1); opacity:0.5;',
      contains: ['т', 'п', 'и', 'к', 'э', 'ж', 'ű', 'é', 'ő', 'í', 'Đ', 'Ầ', 'Á', 'Ổ', 'ó'],
      lowerCase: {
        enclosed: {'facebook,fb,torrent,unfriend': separator, 'friend': separator + 's'}
      }
    },*/
    { // UPPERCASE-filter
      style: hide.forums.uppercase ? 'display:none;' : 'background-color:rgba(0,0,0,0.05); opacity:0.3;',
      upperOnly: true
    }
  ];
  
  /*****************
   * SCRIPT FILTER *
   *****************/
  
  // 'author' attribute gets ignored since authors are not contained in DOM
  var filterScripts = [
    { // spam-filter
      style: hide.scripts.spam ? 'display:none;' : 'background-color:rgba(0,0,0,0.3); opacity:0.4;',
      contains: [/(^|\s)\[\d+\](\s|$)/],
      lowerCase: {
        enclosed: {'crack,cracker,generator,emulator,jailbreak': separator, 'pokemon,hack,cheat,password,key,keygen': separator + 's'},
        contains: [['auto', 'follower'], ['free', ['premium', 'download']], ['credit', 'card'], ['watch', ['full', 'free', 'download']], '↨']
      }
    },/*
    { // personal spam-filter
      style: hide.scripts.spam ? 'display:none;' : 'background-color:rgba(0,0,0,0.1); opacity:0.5;',
      enclosed: {'DoA': separator},
      contains: ['т', 'п', 'и', 'к', 'э', 'ж', 'ű', 'é', 'ő', 'í', 'Đ', 'Ầ', 'Á', 'Ổ', 'ó', 'ч', 'г', 'л', 'н', 'ы', 'ń'],
      lowerCase: {
        enclosed: {'facebook,fb,torrent,unfriend,like,autolike,autoadd,ads,hentai,manga': separator, 'friend,handy': separator + 's'},
        contains: ['torrent']
      }
    },*/
    { // UPPERCASE-filter
      style: hide.scripts.uppercase ? 'display:none;' : 'background-color:rgba(0,0,0,0.05); opacity:0.3;',
      upperOnly: true
    }
  ];
  
  var endsWith =   function (input, str) { var lI = input.lastIndexOf(str); return lI >= 0 && lI == input.length-str.length; },
      beginsWith = function (input, str) { return input.indexOf(str) == 0; },
      contains =   function (input, str) { if (str instanceof RegExp) return str.test(input); else return input.indexOf(str) >= 0; };
  function checkEnclosed(input, filter) {
    for (var key in filter.enclosed) {
      if (input == key)
        return true;
      var splitted = key.split(enclosedSplit);
      for (var k = 0; k < splitted.length; k ++) {
        var search = splitted[k];
        if(search) {
          if (search == input)
            return true;
          // each separator-combination
          for (var i = 0; i < filter.enclosed[key].length; i ++) {
            var s1 = filter.enclosed[key][i];
            if (s1)
              if (beginsWith(input, search + s1) || endsWith(input, s1 + search))
                return true;
              else if (contains(input, s1 + search))
                for (var j = 0; j < filter.enclosed[key].length; j ++) {
                  var s2 = filter.enclosed[key][j];
                  if (s2 && contains(input, s1 + search + s2))
                    return true;
                }
          }
        }
      }
    }
    return false;
  }
  function checkOR(input, array) {
    for (var i = 0; i < array.length; i ++) {
      var obj = array[i];
      if (obj instanceof Array) {
        if (checkAND(input, obj))
          return true;
      } else if (contains(input, obj))
        return true;
    }
    return false;
  }
  function checkAND(input, array) {
    for (var i = 0; i < array.length; i ++) {
      var obj = array[i];
      if (obj instanceof Array) {
        if (!checkOR(input, obj))
          return false;
      } else if (!contains(input, obj))
        return false;
    }
    return true;
  }
  function checkContains(input, filter) {
    return filter.contains && checkOR(input, filter.contains);
  }
  function checkFilter(input, filter) {
    if (filter.begins)
      for (var i = 0; i < filter.begins.length; i ++)
        if (beginsWith(input, filter.begins[i]))
          return true;
    if (filter.ends)
      for (var i = 0; i < filter.ends.length; i ++)
        if (endsWith(input, filter.ends[i]))
          return true;
    if (checkEnclosed(input, filter))
      return true;
    return checkContains(input, filter);
  }
  function checkAuthors(author, authors) {
    for (var i = 0; i < authors.length; i ++) {
      var a = authors[i];
      if ((a instanceof RegExp && a.test(author)) || a == author)
        return true;
    }
  }
  function getsFilteredBy(text, textL, author, filter) {
    if (filter.upperOnly && text == text.toUpperCase())
      return true;
    if (filter.authors && checkAuthors(author, filter.authors))
      return true;
    if (checkFilter(text, filter) || (filter.lowerCase && checkFilter(textL, filter.lowerCase)))
      return true;
    return false;
  }
  function getFilterStyle(filterArr, element, authorEl) {
    var text = element.innerText || element.textContent;
    if (element.hasAttribute('title'))
      text = element.getAttribute('title');
    var author = authorEl ? (authorEl.innerText || authorEl.textContent).substr(3) : '';
    var textL = text.toLowerCase();
    for (var f = 0; f < filterArr.length; f ++) {
      var filter = filterArr[f];
      if (getsFilteredBy(text, textL, author, filter))
        return filter.style;
    }
    return '';
  }
  function applyFilterArray(filterArr, selector) {
    var entries = document.querySelectorAll(selector);
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i],
          row = e;
      while(row && row.nodeName != 'TR')
        row = row.parentNode;
      var author = row.querySelector('.author');
      row.setAttribute('style', getFilterStyle(filterArr, e, author));
    }
  }
  
  applyFilterArray(filterForums,  '.entry-title');
  applyFilterArray(filterScripts, '.script-meat>a.title');
  
})();