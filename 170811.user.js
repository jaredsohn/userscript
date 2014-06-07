// ==UserScript==
// @name        blackspot
// @namespace   http://flibusta.net/
// @description Flibusta Extension Tools
// @include     http://flibusta.net/*
// @include     http://www.flibusta.net/*
// @include     http://proxy.flibusta.net/*
// @include     http://mobile.flibusta.net/*
// @version     13
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_log
// ==/UserScript==

(function () {

var prefs = {
};

var options = {
  'FLEX_bl_on':                   {'id':   'flex-black-list-on',           'default': false},
  'FLEX_bl':                      {'id':   'flex-black-list'},
  'FLEX_replace':                 {'id':   'flex-replace',                 'default': true},
  'FLEX_bl_replacement':          {'id':   'flex-bl-replacement',          'default': 'herp derp',
                                   'convert': function (str) { return str.split(/\s+/); }
                                  },
  'FLEX_bleach':                  {'id':   'flex-bleach',                  'default': true},
  'FLEX_bl_color':                {'id':   'flex-bl-color',                'default': '#D3D3D3'},
  'FLEX_remove_links':            {'id':   'flex-remove-links',            'default': true},
  'FLEX_remove_multimedia':       {'id':   'flex-remove-multimedia',       'default': true},
  'FLEX_sort_order':              {'name': 'flex-sort-order',              'default': '0'},
  'FLEX_flatten_tree':            {'id':   'flex-flatten-tree',            'default': false},
  'FLEX_enhance_new_comments':    {'id':   'flex-enhance-new-comments',    'default': false},
  'FLEX_enhance_tracker':         {'id':   'flex-enhance-tracker',         'default': true},
  'FLEX_enhance_new_submissions': {'id':   'flex-enhance-new-submissions', 'default': true},
  'FLEX_bookmark_color':          {'id':   'flex-bookmark-color',          'default': '#FFB6C1'},
  'FLEX_enhance_genres':          {'id':   'flex-enhance-genres',          'default': true},
  'FLEX_genre_color':             {'id':   'flex-genre-color',             'default': '#556B2F'},
  'FLEX_hide_knapsack':           {'id':   'flex-hide-knapsack',           'default': false}
};

var GM = typeof GM_getValue === 'function' &&
  // Google Chrome
  (!GM_getValue.toString || GM_getValue.toString().indexOf('not supported') === -1);

if (!Array.prototype.max) {
  Object.defineProperty(Array.prototype, 'max', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function () {
      return Math.max.apply(null, this);
    }
  });
}

// Совместимость с Google Chrome

if (!Array.forEach) {
  Array.forEach = function(array, fn, scope) {
    for (var i = 0, len = array.length; i < len; i++) {
      fn.call(scope, array[i], i, array);
    }
  };
}

if (!String.trim) {
  String.trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || this.length;
      position = position - searchString.length;
      return this.lastIndexOf(searchString) === position;
    }
  });
}

if (!String.prototype.contains) {
  Object.defineProperty(String.prototype, 'contains', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString) {
      return this.indexOf(searchString) !== -1;
    }
  });
}

if (!Array.map) {
  Array.map = function(array, fn) {
    var result = [];
    for (var i = 0, len = array.length; i < len; i++) {
      result.push(fn(array[i]));
    }
    return result;
  }
}

// === Вспомогательные функции ============================================

function getval(name) {
  return GM ?
    GM_getValue(name) :
    localStorage.getItem(name);
}

function setval(name, value) {
  if (GM)
    GM_setValue(name, value);
  else
    localStorage.setItem(name, value);
}

function rmval(name) {
  if (GM)
    GM_deleteValue(name);
  else
    localStorage.removeItem(name);
}

function getbool(name, defaultValue) {
  var value = getval(name);
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'string':
      if (value === 'true')
        return true;
      else if (value === 'false')
        return false;
  }
  return defaultValue;
}

function squash(string_or_array) {
  return string_or_array.join ?
    string_or_array.join('\n') :
    string_or_array;
}

function $x(path, root) {
  return document.evaluate(
    path,
    root||document,
    null,
    XPathResult.ANY_UNORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function $(path, root) {
  return (root||document).querySelector(path);
}

function $$(path, root) {
  return (root||document).querySelectorAll(path);
}

function $_(path, root) {
  var tempId = false;
  if (path.indexOf('@this') !== -1) {
    if (!root.id) {
      root.id = 'TMPID' + Math.random().toString().substr(2, 10);
      tempId = true;
    }
    path = path.replace(/@this/g, '#' + root.id);
  }
  var result = $(path);
  if (tempId) {
    root.removeAttribute('id');
  }
  return result;
}

function $attr(el, attr) {
  Array.forEach(Object.keys(attr), function (key) {
    switch (key) {
      case 'text':
        el.textContent = squash(attr[key]);
        break;
      case 'value':
        el.value = attr[key];
        break;
      case 'html':
        el.innerHTML = squash(attr[key]);
        break;
      default:
        el.setAttribute(key, attr[key]);
    }
  });
  return el;
}

function $event(el, events) {
  Array.forEach(Object.keys(events), function (key) {
    el.addEventListener(key, events[key], false);
  });
  return el;
}

function $el(tagName, attr, events) {
  var el = document.createElement(tagName);
  if (attr) $attr(el, attr);
  if (events) $event(el, events);
  return el;
}

function $toggle(elementArray) {
  Array.forEach(elementArray, function (el) {
    el.style.display = el.style.display === 'none' ? '': 'none';
  });
}

function $replace(oldNode, newNode) {
  oldNode.parentNode.replaceChild(newNode, oldNode);
  newNode.id = oldNode.id;
  return newNode;
}

function $wrap(tagName, attr, elements) {
  var container = $el(tagName, attr);
  var el = elements.shift();
  var parent = el.parentNode;
  var insertPoint = el.nextSibling;

  // добавляем первый элемент
  container.appendChild(el);

  // вставляем контейнер на его место
  parent.insertBefore(container, insertPoint);

  // добавляем в контейнер остальные элементы
  elements.forEach(function (el) {
    container.appendChild(el);
  });
  return container;
}

function $range(firstElement, lastElement) {
  var arr = [];
  var el = firstElement;
  while (el) {
    arr.push(el);
    if (el === lastElement)
      break;
    el = el.nextSibling;
  }
  return arr;
}

function $addClass(el, className) {
  var cls = el.getAttribute('class') || '';
  if (!(' ' + cls + ' ').contains(' ' + className + ' ')) {
    el.setAttribute('class', (cls + ' ' + className).trim());
  }
}

function $removeClass(el, className) {
  var cls = el.getAttribute('class') || '';
  if ((' ' + cls + ' ').contains(' ' + className + ' ')) {
    el.setAttribute('class', (' ' + cls + ' ').replace(' ' + className + ' ', ' ').trim());
  }
}

function $toggleClass(el, className) {
  var cls = el.getAttribute('class') || '';
  if (!(' ' + cls + ' ').contains(' ' + className + ' ')) {
    el.setAttribute('class', (cls + ' ' + className).trim());
  } else {
    el.setAttribute('class', (' ' + cls + ' ').replace(' ' + className + ' ', ' ').trim());
  }
}

function $hasClass(el, className) {
  var cls = el.getAttribute('class') || '';
  return (' ' + cls + ' ').contains(' ' + className + ' ');
}

// === Интерфейс ==========================================================

function createHtml() {
  var main = $el('div',
    {'id': 'flex-main',
     'html':
    [
    '<div id="flex-logo" title="«Чёрная метка»"></div>',
    '<div id="flex-window" style="display: none;">',
      '<div id="flex-window-head">«Чёрная метка»</div>',
      '<div id="flex-tab-bar">',
        '<div id="flex-tab-1" class="flex-tab selected">ЧС</div>',
        '<div id="flex-tab-2" class="flex-tab" style="display: none;">Фильтры</div>',
        '<div id="flex-tab-3" class="flex-tab">Улучшения</div>',
        '<div id="flex-tab-4" class="flex-tab">Инфо</div>',
      '</div>',
      '<div id="flex-tab-1-page" class="flex-tab-page selected">',
        '<div class="flex-heading">Чёрный список:',
          '<label><input type="checkbox" id="flex-black-list-on"/>Включить</label></div>',
        '<textarea rows="13" spellcheck="false" id="flex-black-list"></textarea>',
        '<div><label><input type="checkbox" id="flex-replace"/>Заменять реплики на:</label>',
             '<input type="text" id="flex-bl-replacement"/></div>',
        '<div><label><input type="checkbox" id="flex-bleach"/>Обесцвечивать</label>',
              '// Цвет: <input type="text" id="flex-bl-color"/></div>',
        '<div>Удалять <label><input type="checkbox" id="flex-remove-links">ссылки</label>',
                     '<label><input type="checkbox" id="flex-remove-multimedia">картинки и клипы</label></div>',
      '</div>',
      '<div id="flex-tab-2-page" class="flex-tab-page">',
        '<div class="flex-heading">Фильтры:',
          '<label><input type="checkbox" id="flex-filters-on" disabled="true"/>Включить</label></div>',
        '<textarea rows="13" spellcheck="false" id="flex-filter-list"></textarea>',
        '<div><label><input type="checkbox" id="flex-filter-replace"/>Заменять реплики на:</label>',
             '<input type="text" id="flex-filter-replacement"/></div>',
        '<div><label><input type="checkbox" id="flex-filter-bleach"/>Обесцвечивать</label>',
                '// Цвет: <input type="text" id="flex-filter-color"/></div>',
      '</div>',
      '<div id="flex-tab-3-page" class="flex-tab-page">',
        '<br/>',
        '<label><input type="checkbox" id="flex-flatten-tree"/>Дерево в плоский список</label>',
        '<div>',
          '<label><input type="radio" name="flex-sort-order" value="0"/>Сначала новые</label>',
          '<label><input type="radio" name="flex-sort-order" value="1"/>Сначала старые</label>',
        '</div>',
        '<br>',
        '<div>',
          '<label><input type="checkbox" id="flex-enhance-tracker"/>Скрытие топиков в трекере</label>',
        '</div>',
        '<div>',
          '<input id="flex-button-clear-hidden-pub" type="button" value="Очистить список"/>',
        '</div>',
        '<br>',
        '<div>',
          '<label><input type="checkbox" id="flex-enhance-new-comments"/>Навигация по новым комментариям</label>',
        '</div>',
        '<br>',
        '<div>',
          '<label><input type="checkbox" id="flex-enhance-new-submissions"/>Закладка в новых поступлениях</label>',
        '</div>',
        '<div>Цвет закладки: <input type="text" id="flex-bookmark-color"/></div>',
        '<br>',
        '<div>',
          '<label><input type="checkbox" id="flex-enhance-genres"/>Выделять жанры</label>',
          'цветом <input type="text" id="flex-genre-color"/>',
        '</div>',
        '<br>',
        '<div>',
          '<label><input type="checkbox" id="flex-hide-knapsack"/>Скрывать «рюкзачок»</label>',
        '</div>',
      '</div>',
      '<div id="flex-tab-4-page" class="flex-tab-page">',
        '<center><br>Версия: v13<br>Домашняя страница проекта:<br>',
        '<a href="http://code.google.com/p/blackspot">http://code.google.com/p/blackspot</a>',
        '</center>',
      '</div>',
      '<div id="flex-buttons">',
        '<input id="flex-button-save" type="button" value="Сохранить"/>',
        '<input id="flex-button-reset" type="button" value="Сброс"/>',
      '</div>',
    '</div>',
    '<div id="flex-hidden-comments"></div>',
    ]
  });
  document.body.appendChild(main);
}

function addStyle() {
  var style = $el('style',
    {'type': 'text/css',
     'text':
    [
    '#flex-logo {',
      'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATBAMAAACAfiv/AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAABPAAAATwFjiv3XAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAACFQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3XBkVwAAAAp0Uk5TABMYNYSK0tXb+vUkuVUAAABNSURBVAhbY2AgDERKFVRLBEAsxqxVzV2rEkFMllWrVq5atQTEZF8FAstBTFYwcymIydQFYjaBTbAEslYaoIkiqUUyAclcJNuQ3EAAAAC5ZCtlvvoIWAAAAABJRU5ErkJggg==") no-repeat scroll center center transparent;',
      'position: fixed;',
      'bottom: 0;',
      'right: 0;',
      'width: 24px;',
      'height: 24px;',
    '}',
    '#flex-window {',
      'position: fixed;',
      'bottom: 25px;',
      'right: 0;',
      'display: block;',
      'max-height: 95%;',
      'overflow: hidden;',
      'line-height: normal;',
      'color: white;',
    '}',
    '#flex-window-head {',
      'color: yellow;',
      'border-radius: 10px 10px 0 0;',
      'text-align: center;',
      'background: black;',
      '-moz-user-select: none; user-select: none;',
      'font: bold 12px Arial, Helvetica, sans-serif;',
      'margin-bottom: 2px;',
    '}',
    '.flex-heading {',
      'color: white;',
      'text-align: center;',
      '-moz-user-select: none; user-select: none;',
    '}',
    '#flex-black-list, #flex-filter-list {',
      'width: 100%;',
    '}',
    '#flex-bl-replacement, #flex-bl-color,',
    '#flex-filter-replacement, #flex-filter-color,',
    '#flex-bookmark-color, #flex-genre-color {',
      'width: 60px;',
    '}',
    '.flex-post-button-bar {',
      'float: right;',
      'z-index: 2147483647;',
    '}',
    '.flex-post-button-bar > * {',
      'display: inline-block;',
    '}',
    '.flex-button-show {',
      'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAAXNSR0IArs4c6QAAAGtJREFUCNdj3LV7z/VrVxkwgKaWNsPEiRP/YAMTJ05kQlar61aGzGVhYGD49/8/nI/MZoFQgRlrGBgYlBRNIYz1M0Kgcp8/fVzU5crAwGAT2nZkdRVEBCr37dt3uDnIbBS37FpYiMxlxOM/ALshP/h3L8uuAAAAAElFTkSuQmCC") no-repeat scroll center center transparent;',
      'width: 9px;',
      'height: 9px;',
    '}',
    '.flex-button-hide {',
      'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAAXNSR0IArs4c6QAAAEdJREFUCNdj3LV7z/VrVxkwgKaWNsv1a1czs7Iw5aZPm8bEgBvgk2NhYGD4/OljXNluZNFFXa5QOTgHi75v376TbB8jHv8BAIlfGifUK3cRAAAAAElFTkSuQmCC") no-repeat scroll center center transparent;',
      'width: 9px;',
      'height: 9px;',
    '}',
    '#flex-hidden-comments {',
      'display: none;',
    '}',
    '#flex-buttons {',
      'background-color: black;',
      'text-align: center;',
    '}',
    '.flex-tab {',
      'display: inline;',
      'color: white;',
      'background-color: black;',
      'border-bottom: 1px solid white;',
      'border-radius: 4px 4px 0 0;',
      'padding-left: 2px; padding-right: 2px;',
      'cursor: default;',
      '-moz-user-select: none; user-select: none;',
    '}',
    '.flex-tab.selected {',
      'border-bottom: none;',
      'color: yellow;',
    '}',
    '.flex-tab-page {',
      'font-size: 80%;',
      'background-color: black;',
      'color: white;',
      'display: none;',
      'min-width: 240px;',
      'font-family: "DejaVu Serif Condensed", serif;',
      'text-align: center;',
    '}',
    '.flex-tab-page.selected {',
      'display: block;',
    '}',
    '#flex-tab-bar {',
      'background-color: none;',
    '}',
    '.bleached > *:not(.quote-msg) {',
      'color: ' + prefs.bl_color + ';',
    '}',
    '.quote-msg.bleached > .quote-author {',
      'color: #393939;',
    '}',
    '#flex-bl-color, #flex-filter-color, #flex-bookmark-color {',
      'font-family: monospace;',
    '}',
    '.flex-replies {',
      'font-size: 80%;',
      'color: #393939 !important;',
    '}',
    '.flex-replies > .comma:last-child {',
      'display: none;',
    '}',
    '.reply-to:link, .flex-replies > a:link {',
      'color: #FF69B4;',
    '}',
    '.reply-to, .flex-replies > a {',
      'position: relative;',
    '}',
    '#flex-tooltip {',
      'border: 1px solid #393939;',
      'color: #393939;',
      'cursor: default;',
      'font-style: normal;',
      'font-size: 10px;',
      'padding: 5px;',
      'left: 0; top: 2em;',
      'min-width: 500px;',
      'position: absolute;',
      'background-color: #F5F5DC; /* beige */',
      'border-radius: 10px;',
      'z-index: 666;',
    '}',
    '.new {',
      'cursor: pointer;',
    '}',
    '#flex-hidden-publications th {',
      'text-align: center;',
    '}',
    '#flex-hidden-publications > thead {',
      'background-color: lightgray;',
    '}',
    '#flex-hidden-publications > tbody {',
      'display: none;',
    '}',
    '#flex-hidden-publications:hover > tbody {',
      'display: block;',
    '}',
    '.flex-button-hide, .flex-hidden > .flex-button-show {',
      'display: block;',
    '}',
    '.flex-button-show, .flex-hidden > .flex-button-hide {',
      'display: none;',
    '}'
    ]
  });
  document.head.appendChild(style);
}

function computeHeight() {
  var height = [4,3,2,1].map(function (n) {
    Array.forEach($$('.flex-tab-page.selected'), function (el) {
      $removeClass(el, 'selected');
    });
    var el = $('#flex-tab-' + n + '-page');
    $addClass(el, 'selected');
    return el.offsetHeight;
  }).max();
  // если вычислить высоту не удалось, используем значение по умолчанию
  height = height || 355;

  [1,2,3,4].forEach(function (n) {
    $('#flex-tab-' + n + '-page').style.height = height + 'px';
  });
}

function addGeneralListeners() {
  var flexWindow = $('#flex-window');
  $event($('#flex-logo'), {'click': function (event) {
    $toggle([flexWindow]);
    if (flexWindow.style.display !== 'none') {
      if (!$('#flex-tab-1-page').style.height) {
        computeHeight();
      }
      var ta = $('#flex-black-list');
      ta.focus();
      ta.selectionStart = ta.selectionLength = ta.value.length;
    }
  }});
  $event($('#flex-button-reset'), {'click': function () {
    Array.forEach($$('#flex-black-list, #flex-bl-replacement, #flex-bl-color, ' +
                  '#flex-filter-list, #flex-filter-replacement, #flex-filter-color'),
      function (el) { el.value = ''; });
    savePrefs();
  }});
  $event($('#flex-button-save'), {'click': function () {
    savePrefs();
    location.reload();
  }});
  $event($('#flex-button-clear-hidden-pub'), {'click': clearHiddenPublications});
  Array.forEach($$('.flex-tab'), function (el) {
    $event(el, {'click': tabClickListener});
  });
}

function tabClickListener(event) {
  var selectedId = event.target.id;
  Array.forEach($$('.flex-tab.selected, .flex-tab-page.selected'), function (el) {
    $removeClass(el, 'selected');
  });
  Array.forEach($$('#' + selectedId + ', #' + selectedId + '-page'), function (el) {
    $addClass(el, 'selected');
  });
}

function randomReplacement() {
  return prefs.bl_replacement[Math.floor(Math.random() * prefs.bl_replacement.length)];
}

function addButtons(parent, hideListener, unhideListener) {
    var unhideButton = $el('div',
          {'class': 'flex-button-show'},
          {'click': unhideListener}),
        hideButton = $el('div',
          {'class': 'flex-button-hide'},
          {'click': hideListener}),
        buttonBar = $el('div',
          {'class': 'flex-post-button-bar flex-hidden'});
    buttonBar.appendChild(unhideButton);
    buttonBar.appendChild(hideButton);
    parent.insertBefore(buttonBar, parent.firstChild);
}

function toggleButtons(parent) {
  $toggleClass($('.flex-post-button-bar', parent), 'flex-hidden');
}

function hide(el, origEl) {
  var id = Math.random().toString().substr(2, 10);
  el.id = 'herpderp' + id;
  origEl.id = 'derpherp' + id;
  $('#flex-hidden-comments').appendChild(origEl);
}

function unhide(el) {
  var id = el.id.replace(/^herpderp/, '');
  var origEl = $('#derpherp' + id);
  $replace(el, origEl);
  return origEl;
}

// === Настройки ==========================================================

function isBlacklisted(username) {
  return prefs.bl.indexOf(username) !== -1;
}

function loadPref(prefName) {
  var opt = options[prefName];
  var id = opt.id;
  var name = opt.name;
  var defaultValue = opt.default;
  var convert = opt.convert;

  var el = id ? $('#' + id) : $('[name="' + name + '"]');
  var val;
  switch (el.tagName) {
    case 'INPUT':
      switch (el.type) {
        case 'checkbox':
          val = getbool(prefName, defaultValue);
          el.checked = val;
          break;
        case 'text':
          val = getval(prefName) || defaultValue;
          el.value = val;
          break;
        case 'radio':
          val = getval(prefName) || defaultValue;
          $('[name="' + name + '"][value="' + val + '"]').checked = true;
          break;
      }
      break;
    case 'TEXTAREA':
      val = getval(prefName);
      if (!val) {
        val = [];
      } else {
        val = val.split(':');
      }
      el.value = val.join('\n');
      if (el.value) el.value += '\n';
      break;
  }
  prefs[prefName.replace(/^FLEX_/, '')] = convert ? convert(val) : val;
}

function savePref(prefName) {
  var opt = options[prefName];
  var id = opt.id;
  var name = opt.name;
  var convert = opt.convert;

  var el = id ? $('#' + id) : $('[name="' + name + '"]');
  var val;
  switch (el.tagName) {
    case 'INPUT':
      switch (el.type) {
        case 'checkbox':
          val = el.checked;
          break;
        case 'text':
          val = el.value;
          setval(prefName, val);
          break;
        case 'radio':
          val = $('[name="' + name + '"]:checked').value;
          setval(prefName, val);
          break;
      }
      setval(prefName, val);
      break;
    case 'TEXTAREA':
      val = el.value
              .split('\n')
              .map(String.trim)
              .filter(function (x) { return x !== ''; });
      setval(prefName, val.join(':'));
      break;
  }
  prefs[prefName.replace(/^FLEX_/, '')] = convert ? convert(val) : val;
}

function loadPrefs() {
  for (var name in options) {
    loadPref(name);
  }
}

function savePrefs() {
  for (var name in options) {
    savePref(name);
  }
}

// === Комментарии в блогах ===============================================

function getContainingComment(el) {
  return $x('ancestor::*[contains(concat(" ",@class," ")," comment ")]' +
            '/*[contains(concat(" ",@class," ")," content ")]', el);
}

function mangleBlogComment(el, doThis) {
  var count = 0;
  if (doThis && prefs.bleach) {
    $addClass(el, 'bleached');
    count++;
  }
  var children = el.childNodes;
  for (var i = 0, len = children.length; i < len; i++) {
    var child = children[i];
    switch (child.nodeType) {
      case Node.ELEMENT_NODE:
        if (doThis) {
          if ((child.tagName === 'A' && prefs.remove_links) ||
              (/^(IMG|IMAGE|OBJECT)$/.test(child.tagName) && prefs.remove_multimedia)) {
            child.parentNode.replaceChild($el(child.tagName), child);
            count++;
            continue;
          }
        }
        var do_ = doThis;
        switch (child.getAttribute('class')) {
          case 'quote-author':
          case 'watcher_node':
            continue;
          case 'quote-msg':
            var quoteAuthor = $x('*[@class="quote-author"]/em', child);
            if (!quoteAuthor) {
              do_ = false;
            } else {
              var username = quoteAuthor.textContent;
              do_ = isBlacklisted(username);
            }
            break;
        }
        count += mangleBlogComment(child, do_);
        break;
      case Node.TEXT_NODE:
        if (doThis && prefs.replace && /\S/.test(child.textContent)) {
          child.textContent = child.textContent.replace(/(\S+)/g, randomReplacement);
          count++;
        }
        break;
    }
  }
  return count;
}

function hideBlogComment(comment) {
  var el = $('.submitted > a', comment.parentNode);
  var username;
  if (el) {
    username = el.textContent;
  } else {
    el = $('.submitted', comment.parentNode);
    if (/пишет:$/.test(el.textContent)) {
      username = el.textContent.replace(/^.*?\d{2}:\d{2}:\d{2}\s+|\s+пишет:$/g, '');
    } else {
      username = el.textContent.replace(/^\s*Опубликовано\s+|\s+в [А-Я]{2}, \d{2}\/\d{2}\/\d{4}.*/g, '');
    }
  }
  var originalComment = comment.cloneNode(true);
  if (mangleBlogComment(comment, isBlacklisted(username)) > 0) {
    hide(comment, originalComment);
    return true;
  }
}

function hideBlogCommentEventListener(event) {
  var comment = getContainingComment(event.target);
  hideBlogComment(comment);
  toggleButtons(comment.parentNode);
}

function unhideBlogCommentEventListener(event) {
  var comment = getContainingComment(event.target);
  var originalComment = unhide(comment);
  toggleButtons(originalComment.parentNode);
}

// === Посты на форуме ====================================================

function getContainingPost(el) {
  return $x('ancestor::*[@class="forum-post-wrapper"]' +
            '//*[contains(concat(" ",@class," ")," content ")]', el);
}

function hideForumPost(post) {
  var path = 'ancestor::*[@class="forum-post-wrapper"]//*[contains(@class,"author-name")]';
  var el = $x(path + '/a', post);
  var username;
  if (el) {
    username = el.textContent;
  } else {
    el = $x(path, post);
    username = el.textContent.trim();
  }
  var originalPost = post.cloneNode(true);
  if (mangleBlogComment(post, isBlacklisted(username)) > 0) {
    hide(post, originalPost);
    return true;
  }
}

function hideForumPostEventListener(event) {
  var post = getContainingPost(event.target);
  hideForumPost(post);
  toggleButtons(post.parentNode);
}

function unhideForumPostEventListener(event) {
  var post = getContainingPost(event.target);
  var originalPost = unhide(post);
  toggleButtons(originalPost.parentNode);
}

// === Отзывы =============================================================

function getContainingReview(el) {
  return $x('ancestor::*[substring(@class,1,10) = "container_"]' +
            '/*[contains(concat(" ",@class," ")," content ")]', el);
}

function hideReview(review) {
  var originalReview = review.cloneNode(true);
  if (mangleBlogComment(review, true) > 0) {
    hide(review, originalReview);
    return true;
  }
}

function hideReviewEventListener(event) {
  var review = getContainingReview(event.target);
  hideReview(review);
  toggleButtons(review.parentNode)
}

function unhideReviewEventListener(event) {
  var review = getContainingReview(event.target);
  var originalReview = unhide(review);
  toggleButtons(originalReview.parentNode);
}

// === Топ-посты ==========================================================

function getContainingNode(el) {
  return $x('ancestor::*[@class="forum-post-wrapper" or @class="node"]' +
            '//*[contains(concat(" ",@class," ")," content ")]', el);
}

function hideNode(node) {
  var originalNode = node.cloneNode(true);
  if (mangleBlogComment(node, true) > 0) {
    hide(node, originalNode);
    return true;
  }
}

function hideNodeEventListener(event) {
  var node = getContainingNode(event.target);
  hideNode(node);
  toggleButtons(node.parentNode);
}

function unhideNodeEventListener(event) {
  var node = getContainingNode(event.target);
  var originalNode = unhide(node);
  toggleButtons(originalNode.parentNode);
}

// === Скрываем всё =======================================================

function hideAll() {
  var mobile = location.hostname === 'mobile.flibusta.net';

  // Топ-пост в блоге
  Array.forEach($$('#main > .node > .content'), function (node) {
    var el = $('.submitted a', node.parentNode);
    var username;
    if (el) {
      username = el.textContent;
    } else {
      el = $('.submitted', node.parentNode);
      username = el ? el.textContent.replace(/^.*?\s\d{4}\s+by\s+/, '') : null;
    }
    if (username && isBlacklisted(username) && hideNode(node)) {
      addButtons(
        node.parentNode,
        hideNodeEventListener,
        unhideNodeEventListener
      );
    }
  });

  // Топ-пост на форуме
  Array.forEach($$(
        mobile ? 'body > .top-post .content' : '#main > .top-post .content'
        ), function (node) {
    var path = 'ancestor::*[@class="forum-post-wrapper"]//*[contains(@class,"author-name")]';
    var el = $x(path + '/a', node);
    var username;
    if (el) {
      username = el.textContent;
    } else {
      el = $x(path, node);
      username = el ? el.textContent.trim() : null;
    }
    if (username && isBlacklisted(username) && hideNode(node)) {
      addButtons(
        node.parentNode,
        hideNodeEventListener,
        unhideNodeEventListener
      );
    }
  });

  // Комментарии в блоге
  Array.forEach($$('#comments .comment > .content'), function (comment) {
    if (hideBlogComment(comment)) {
      addButtons(
        comment.parentNode,
        hideBlogCommentEventListener,
        unhideBlogCommentEventListener
      );
    }
  });

  // Посты на форуме
  Array.forEach($$('#forum-comments .forum-post .content'), function (post) {
    if (hideForumPost(post)) {
      addButtons(
        post.parentNode,
        hideForumPostEventListener,
        unhideForumPostEventListener
      );
    }
  });

  // Отзывы
  Array.forEach($$(
        // правая панель
        '#block-librusec-polka .content [class^="container_"], ' +
        // остальные
        (mobile ?  'body > [class^="container_"]' : '#main > [class^="container_"]')
        ), function (review) {
    var el = $('a[href*="/polka/show/"]', review);
    var username = el ? el.textContent : null;
    if (username && isBlacklisted(username)) {
      var inner = $wrap('div', {},
        $range($x('br[1]', review).nextSibling, null)
        );
      var container = $wrap('div', {'class': 'content'},
        [inner]
        );
      addButtons(
        review,
        hideReviewEventListener,
        unhideReviewEventListener
      );
      hideReview(container);
    }
  });

  // Топ-пост в блоге (mobile.flibusta.net)
  if (mobile && location.pathname.startsWith('/node/')) {
    var el;
    el = $('body > .content-title');
    var from = el ? el.nextSibling : null,
    el = $('body > a[href*="/user/"]');
    var username;
    var to;
    if (el) {
      username = el.textContent;
      el = $('body > .watcher_node');
      to = el ? el.previousSibling : null;
    } else {
      el = $('body > ul.links a[href*="/blog/"]');
      username = el ? el.textContent.replace(/'s\s+блог$/, '') : null;
      el = $('body > ul.links');
      to = el ? el.previousSibling.previousSibling : null;
    }
    if (from && to && username) {
      var node = $wrap(
        'div', {'class': 'content'}, $range(from, to)
      );
      $wrap(
        'div', {'class': 'node'}, [node]
      );

      if (isBlacklisted(username) && hideNode(node)) {
        addButtons(
          node.parentNode,
          hideNodeEventListener,
          unhideNodeEventListener
        );
      }
    }
  }
}

// === Преобразование дерева в плоский список =============================

function flatten(root, replyTo) {
  var comments = [];
  var el = root.firstElementChild;
  var id;
  var parent;
  while (el) {
    if (el.tagName === 'A' && el.id) {
      id = el.id;
    } else {
      var cls = el.getAttribute('class');
      if (cls) {
        var padded = ' ' + cls + ' ';
        if (padded.contains(' comment ') || padded.contains(' forum-post ')) {
          var obj = {'id': id, 'comment': el, 'replyTo': replyTo};
          comments.push(obj);
          parent = obj;
        } else if (padded.contains(' indented ')) {
          comments.push.apply(comments, flatten(el, parent));
        }
      }
    }
    el = el.nextElementSibling;
  }
  return comments;
}

function postLinkMouseOverListener(event) {
  var source = event.target;
  var id = source.getAttribute('href').substr(1);
  var comment = $('#' + id).nextSibling;
  var tooltip = comment.cloneNode(true);
  Array.forEach($$('[id]', tooltip), function (el) {
    el.removeAttribute('id');
  });
  tooltip.id = 'flex-tooltip';
  source.appendChild(tooltip);

  var bottom = tooltip.offsetTop + tooltip.parentNode.offsetTop -
      (document.documentElement.scrollTop || document.body.scrollTop) + tooltip.offsetHeight;
  var windowHeight = document.documentElement.clientHeight;
  if (bottom > windowHeight) {
    tooltip.style.top = (-tooltip.offsetHeight) + 'px';
  }
}

function postLinkMouseOutListener(event) {
  var tooltip = $('#flex-tooltip');
  tooltip.parentNode.removeChild(tooltip);
}

function makeFlatListFromTree() {
  if ($('#comments, #forum-comments')) {
    var container = $('#comments, #forum-comments');
    var comments = flatten(container);
    var postform = $('#comments > .box, #forum-comments > .box');
    container.innerHTML = '';
    var postnum = 0;
    var re = new RegExp('^comment-');
    var cmp = prefs.sort_order == 0 ? 1: -1;
    comments.sort(function (a, b) {
      var a_ = parseInt(a.id.replace(re, '')),
          b_ = parseInt(b.id.replace(re, ''));
      if (a_ < b_) return cmp;
      if (a_ > b_) return -cmp;
      return 0;
    }).forEach(function (obj) {
      postnum++;
      var comment = obj.comment;
      container.appendChild($el('a', {'id': obj.id}));
      container.appendChild(comment);

      try {
        var pn = $('.post-num > a', comment);
        if (pn) pn.textContent = '#' + postnum;
        if (obj.replyTo) {
          var parent = obj.replyTo.comment;
          var replies = $('.flex-replies', parent);
          if (!replies) {
            replies = $el('div', {'class': 'flex-replies', 'text': 'Ответы: '});
            $('.content', parent).appendChild(replies);
          }
          var username = $('.submitted > a, .author-name > a', comment).textContent;
          var reply = $el('a', {'href': '#' + obj.id, 'text': username});
          var comma = $el('span', {'class': 'comma', 'text': ', '});
          if (prefs.sort_order != 0) {
            replies.appendChild(reply);
            replies.appendChild(comma);
          } else {
            var insertPoint = replies.firstElementChild;
            replies.insertBefore(comma, insertPoint);
            replies.insertBefore(reply, comma);
          }
          var replyToUsername = $('.submitted > a, .author-name > a', parent).textContent;
          var submitted = $('.submitted, .author-name', comment);
          var html = 'отвечает <a class="reply-to" href="#' + obj.replyTo.id + '">' + replyToUsername + '</a>:'
          if (/пишет:$/.test(submitted.innerHTML)) {
            submitted.innerHTML = submitted.innerHTML.replace(/пишет:$/, html);
          } else {
            submitted.innerHTML += ' ' + html;
          }
        }
      } catch (e) {
        GM_log(e);
      }
    });
    if (postform) container.appendChild(postform);
    Array.forEach($$('.reply-to, .flex-replies > a'), function (el) {
      $event(el, {'mouseover': postLinkMouseOverListener, 'mouseout': postLinkMouseOutListener});
    });
  }
}

function removeNewAnchors() {
  Array.forEach($$('a[href$="/view_new#new"]'), function (el) {
    el.href = el.href.substr(0, el.href.length - 4);
  });
}

// === Навигация по новым комментариям ====================================

function newMarkClickListener(event) {
  var source = event.target;
  var nextCommentId = /comment-\d+/.exec(source.getAttribute('class'));
  $('#' + nextCommentId).scrollIntoView();
}

function enhanceNewComments() {
  var comments;
  var marks = $$('.comment > .new');
  if (marks.length > 0) {
    comments = Array.map(marks, function (el) {
      return {'comment': el.parentNode, 'mark': el};
    });
  } else {
    marks = $$('.forum-post .new');
    comments = Array.map(marks, function (el) {
      var parent = el.parentNode;
      while (parent && !$hasClass(parent, 'forum-post'))
        parent = parent.parentNode;
      return {'comment': parent, 'mark': el};
    });
  }
  if (comments.length > 0) {
    var firstComment = comments[0].comment;
    if (!$('#new')) {
      firstComment.parentNode.insertBefore(
          $el('a', {'id': 'new'}),
          firstComment.previousSibling
          );
    }
    if (comments.length !== 1) {
      for (var i = 0, len = comments.length; i < len; i++) {
        var comment = comments[i].comment;
        var mark = comments[i].mark;
        if (i !== len - 1) {
          var nextComment = comments[i+1].comment;
          mark.innerHTML += '&nbsp;&#9660;'; // стрелка вниз
          $addClass(mark, nextComment.previousElementSibling.id);
        } else {
          mark.innerHTML += '&nbsp;&#9650;'; // стрелка вверх
          $addClass(mark, firstComment.previousElementSibling.id);
        }
        $event(mark, {'click': newMarkClickListener});
      }
    }
  }
}

// === Скрытие топиков в трекере ==========================================

function fixOddEvenClasses() {
  var num = 0;
  Array.forEach($$('#tracker > table > tbody > tr:first-child'), function (el) {
    while (el) {
      el.setAttribute('class', ++num % 2 === 0 ? 'even' : 'odd');
      el = el.nextElementSibling;
    }
  });
}

function getPublicationId(row) {
  var link = $('td > a:not([href^="/user/"]):not([href*="/view_new"])', row);
  if (link) {
    var href = link.getAttribute('href');
    var node = /^\/node\/(\d+)/.exec(href);
    if (node) {
      return node[1];
    } else {
      return href;
    }
  }
}

function hidePublication(row, pubId) {
  pubId = pubId || getPublicationId(row);
  $('#flex-hidden-publications > tbody').appendChild(row);
  var td = row.firstElementChild;
  $addClass(td, 'flex-hidden');
  fixOddEvenClasses();
  $('#flex-hidden-publications').style.display = '';
}

function unhidePublication(row, pubId) {
  pubId = pubId || getPublicationId(row);
  $('#tracker > table:not(#flex-hidden-publications) > tbody').appendChild(row);
  var td = row.firstElementChild;
  $removeClass(td, 'flex-hidden')
  fixOddEvenClasses();
  if (!$('#flex-hidden-publications > tbody > tr')) {
    $('#flex-hidden-publications').style.display = 'none';
  }
}

function hidePublicationClickListener(event) {
  var source = event.target;
  var row = source.parentNode.parentNode;
  var pubId = getPublicationId(row);
  hidePublication(row, pubId);

  var publications = getval('FLEX_hidden_publications');
  if (!publications) {
    publications = pubId;
  } else {
    if (!(':' + publications + ':').contains(':' + pubId + ':')) {
      publications += ':' + pubId;
    }
  }
  setval('FLEX_hidden_publications', publications);
}

function unhidePublicationClickListener(event) {
  var source = event.target;
  var row = source.parentNode.parentNode;
  var pubId = getPublicationId(row);
  unhidePublication(row, pubId);

  var publications = getval('FLEX_hidden_publications');
  if (publications) {
    if ((':' + publications + ':').contains(':' + pubId + ':')) {
      publications = publications
        .split(':')
        .filter(function (id) { return id !== pubId; })
        .join(':');
    }
  }
  setval('FLEX_hidden_publications', publications);
}

function isPublicationHidden(pubId) {
  var publications = getval('FLEX_hidden_publications') || '';
  return (':' + publications + ':').contains(':' + pubId + ':');
}

function clearHiddenPublications(event) {
  setval('FLEX_hidden_publications', '');
  Array.forEach($$('#flex-hidden-publications > tbody > tr'), function (row) {
    unhidePublication(row);
  });
  event.preventDefault();
}

function enhanceTracker() {
  var table = $('#tracker > table:not(.sticky-header)');

  var hidden = table.cloneNode(false);
  $attr(hidden, {'id': 'flex-hidden-publications',
                 'style': 'display: none;',
                 'html': '<thead><tr><th colspan="6">Скрытые публикации ' +
                         '<a href="#">(Удалить все)</a></th></tr></thead>' +
                          '<tbody></tbody>'
  });
  $event($('a', hidden), {'click': clearHiddenPublications});
  table.parentNode.insertBefore(hidden, table.nextSibling);

  var row = $('thead > tr', table);
  row.insertBefore($el('th', {'text': '*'}), row.firstChild);
  var tbody = $('tbody', table);
  Array.forEach($$('tr', tbody), function (row) {
    var pubId = getPublicationId(row);
    var td = row.insertBefore($el('td'), row.firstChild);
    if (pubId) {
      td.appendChild($el('div', {'class': 'flex-button-hide'},
                                {'click': hidePublicationClickListener}));
      td.appendChild($el('div', {'class': 'flex-button-show'},
                                {'click': unhidePublicationClickListener}));
      if (isPublicationHidden(pubId)) {
        hidePublication(row, pubId);
      }
    }
  });
}

// === Закладка в новых поступлениях ======================================

function enhanceNewSubmissions() {
  var bookmarks = (getval('FLEX_new_submissions_bookmark') || ':').split(':');
  var bookmark;
  if (location.search.startsWith('?page=')) {
    bookmark = bookmarks[0];
  } else {
    bookmark = bookmarks[1];
    var link = $('form[name="bk"] a[href^="/b/"]');
    setval('FLEX_new_submissions_bookmark', bookmark + ':' +
          /^\/b\/(\d+)/.exec(link.getAttribute('href'))[1]);
  }
  if (bookmark) {
    var a = $('a[href="/b/' + bookmark + '"]');
    if (a) a.style.backgroundColor = prefs.bookmark_color;
  }
}

// === Выделение жанров цветом ============================================

function enhanceGenres() {
  Array.forEach($$('a[href^="/g/"]'), function (el) {
    el.style.color = prefs.genre_color;
  });
}

// === Скрытие «рюкзачка» =================================================

function hideKnapsack() {
  var knapsack = $('#block-librusec-knapsack');
  if (knapsack) {
    knapsack.parentNode.removeChild(knapsack);
  }
  var sidebar = $('#sidebar-right');
  if (sidebar && !sidebar.firstElementChild) {
    sidebar.parentNode.removeChild(sidebar);
    var main = $('#main');
    if (main) main.style.marginRight = '0px';
  }
}

// === А теперь попробуем со всей этой фигнёй взлететь ====================

function execute() {
  createHtml();
  loadPrefs();
  addStyle();
  addGeneralListeners();
  if (prefs.bl_on) {
    hideAll();
  }
  if (prefs.hide_knapsack) {
    hideKnapsack();
  }
  if (location.pathname === '/tracker') {
    if (prefs.enhance_tracker) {
      enhanceTracker();
    }
    if (prefs.flatten_tree) {
      removeNewAnchors();
    }
  } else if (location.pathname === '/new' ||
             location.pathname.startsWith('/new/')) {
    if (prefs.enhance_new_submissions) {
      enhanceNewSubmissions();
    }
    if (prefs.enhance_genres) {
      enhanceGenres();
    }
  } else {
    if (prefs.flatten_tree) {
      makeFlatListFromTree();
    }
    if (prefs.enhance_new_comments) {
      enhanceNewComments();
    }
    var anchor = location.hash.startsWith('#') ?
                    location.hash.substr(1) :
                 location.href.endsWith('/view_new') ?
                    'new' : null;
    if (anchor) {
      setTimeout('document.getElementById("' +
        anchor +
        '").scrollIntoView();', 1);
    }
  }
}

if (/^(complete|interactive)$/.test(document.readyState)) {
  execute();
} else {
  $event(document, {'DOMContentLoaded': execute});
}

})();

// vim: et sw=2 sts=2 ai nosi
