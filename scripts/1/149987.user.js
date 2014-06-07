// ==UserScript==
// @name           55ch x Updater
// @namespace      aeosynth
// @description    Updates threads.
// @version        1.5.2
// @copyright      2010, James Campos
// @license        MIT; http://en.wikipedia.org/wiki/Mit_license
// @include        http://www.55ch.org/*/res/*
// ==/UserScript==

//THIS USERSCRIPT IS COMPLETELY MADE BY JAMES CAMPOS
//IT WAS JUST ADAPTED TO WORK ON DIFFERENT WEBSITES

// Copyright (c) 2010 James Campos

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

(function() {
  var $, $$, AEOS, BOARD, _i, _ref, aa, autoUpdate, changeCheckbox, changeInterval, checkboxListener, config, favDead, favDeadHalo, favHalo, favNormal, favicon, head, inBefore, intervalId, isDead, key, m, makeOptions, makeRow, makeUpdater, n, onloadUpdater, parseResponse, r, replace, request, scroll, timerF, toggleVerbose, unread, updateFavicon, x;
  var __hasProp = Object.prototype.hasOwnProperty;
  config = {
    'Verbose': true,
    'Update Title': true,
    'Auto Start': false,
    'Interval': 30
  };
  AEOS = {
    init: function() {
      if (typeof GM_deleteValue === 'undefined') {
        window.GM_setValue = function(name, value) {
          value = (typeof value)[0] + value;
          return localStorage.setItem(name, value);
        };
        window.GM_getValue = function(name, defaultValue) {
          var type, value;
          if (!(value = localStorage.getItem(name))) {
            return defaultValue;
          }
          type = value[0];
          value = value.substring(1);
          switch (type) {
            case 'b':
              return value === 'true';
            case 'n':
              return Number(value);
            default:
              return value;
          }
        };
        window.GM_addStyle = function(css) {
          var style;
          style = document.createElement('style');
          style.type = 'text/css';
          style.textContent = css;
          return document.getElementsByTagName('head')[0].appendChild(style);
        };
      }
      return GM_addStyle('\
            div.dialog {\
                border: 1px solid;\
            }\
            div.dialog > div.move {\
                cursor: move;\
            }\
            div.dialog label,\
            div.dialog a {\
                cursor: pointer;\
            }\
        ');
    },
    makeDialog: function(id, position) {
      var dialog, left, top;
      dialog = document.createElement('div');
      dialog.className = 'reply dialog';
      dialog.id = id;
      switch (position) {
        case 'topleft':
          left = '0px';
          top = '0px';
          break;
        case 'topright':
          left = null;
          top = '0px';
          break;
        case 'bottomleft':
          left = '0px';
          top = null;
          break;
        case 'bottomright':
          left = null;
          top = null;
          break;
      }
      left = GM_getValue("" + (id) + "Left", left);
      top = GM_getValue("" + (id) + "Top", top);
      if (left) {
        dialog.style.left = left;
      } else {
        dialog.style.right = '0px';
      }
      if (top) {
        dialog.style.top = top;
      } else {
        dialog.style.bottom = '0px';
      }
      return dialog;
    },
    move: function(e) {
      var div;
      div = this.parentNode;
      AEOS.div = div;
      AEOS.dx = e.clientX - div.offsetLeft;
      AEOS.dy = e.clientY - div.offsetTop;
      AEOS.width = document.body.clientWidth - div.offsetWidth;
      AEOS.height = document.body.clientHeight - div.offsetHeight;
      document.addEventListener('mousemove', AEOS.moveMove, true);
      return document.addEventListener('mouseup', AEOS.moveEnd, true);
    },
    moveMove: function(e) {
      var bottom, div, left, right, top;
      div = AEOS.div;
      left = e.clientX - AEOS.dx;
      if (left < 20) {
        left = '0px';
      } else if (AEOS.width - left < 20) {
        left = '';
      }
      right = left ? '' : '0px';
      div.style.left = left;
      div.style.right = right;
      top = e.clientY - AEOS.dy;
      if (top < 20) {
        top = '0px';
      } else if (AEOS.height - top < 20) {
        top = '';
      }
      bottom = top ? '' : '0px';
      div.style.top = top;
      return (div.style.bottom = bottom);
    },
    moveEnd: function() {
      var div, id;
      document.removeEventListener('mousemove', AEOS.moveMove, true);
      document.removeEventListener('mouseup', AEOS.moveEnd, true);
      div = AEOS.div;
      id = div.id;
      GM_setValue("" + (id) + "Left", div.style.left);
      return GM_setValue("" + (id) + "Top", div.style.top);
    }
  };
  x = function(path, root) {
    root || (root = document.body);
    return document.evaluate(path, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  };
  $ = function(selector, root) {
    root || (root = document.body);
    return root.querySelector(selector);
  };
  $$ = function(selector, root) {
    var _i, _len, _ref, _result, node, result;
    root || (root = document.body);
    result = root.querySelectorAll(selector);
    _result = []; _ref = result;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _result.push(node);
    }
    return _result;
  };
  inBefore = function(root, el) {
    return root.parentNode.insertBefore(el, root);
  };
  replace = function(root, el) {
    return root.parentNode.replaceChild(el, root);
  };
  n = function(tag, properties) {
    var element;
    element = document.createElement(tag);
    if (properties) {
      m(element, properties);
    }
    return element;
  };
  m = function(element, properties) {
    var _ref, key, val;
    _ref = properties;
    for (key in _ref) {
      if (!__hasProp.call(_ref, key)) continue;
      val = _ref[key];
      (element[key] = val);
    }
    return element;
  };
  AEOS.init();
  GM_addStyle('\
    #updater {\
        padding: 5px;\
        position: fixed;\
        border: 1px solid;\
        text-align: right;\
    }\
    #updater label {\
        cursor: pointer;\
    }\
    #updater span.new {\
        background: lime;\
    }\
    #updater:not(:hover) > *:not(:first-child) {\
        display: none;\
    }\
    #updater input[type="text"] {\
        width: 50px;\
    }\
    .move {\
        cursor: move;\
    }\
    span.error {\
        color: red;\
    }\
');
  _ref = config;
  for (key in _ref) {
    if (!__hasProp.call(_ref, key)) continue;
    _i = _ref[key];
    config[key] = GM_getValue(key, config[key]);
  }
  _ref = location.pathname.substring(1).split('/');
  BOARD = _ref[0];
  unread = [];
  r = null;
  intervalId = null;
  head = $('head', document);
  if (!(favicon = $('link[rel="shortcut icon"]', head))) {
    favicon = n('link', {
      rel: 'shortcut icon',
      href: 'http =//static.4chan.org/image/favicon.ico'
    });
    head.appendChild(favicon);
  }
  favNormal = favicon.href;
  favHalo = /ws/.test(favNormal) ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR4XrWRQQoAIQwD+6L97j7Ih9WTQQxhDqJQCk4Mranuvqod6LgwawSqSuUmWSPw/UNlJlnDAmA2ARjABLYj8ZyCzJHHqOg+GdAKZmKPIQUzuYrxicHqEgHzP9g7M0+hj45sAnRWxtPj3zSPAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAABmzDP///8AAABet0i+AAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=';
  favDeadHalo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWUlEQVR4XrWSAQoAIAgD/f+njSApsTqjGoTQ5oGWPJMOOs60CzsWwIwz1I4PUIYh+WYEMGQ6I/txw91kP4oA9BdwhKp1My4xQq6e8Q9ANgDJjOErewFiNesV2uGSfGv1/HYAAAAASUVORK5CYII=';
  favDead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAAD/AAA9+90tAAAAAXRSTlMAQObYZgAAADtJREFUCB0FwUERxEAIALDszMG730PNSkBEBSECoU0AEPe0mly5NWprRUcDQAdn68qtkVsj3/84z++CD5u7CsnoBJoaAAAAAElFTkSuQmCC';
  isDead = false;
  parseResponse = function(responseText) {
    var body, replies;
    body = n('body', {
      innerHTML: responseText
    });
    replies = $$('td.reply', body);
    return replies;
  };
  onloadUpdater = function() {
    var _j, _len, _ref2, _ref3, br, id, info, input, inputs, l, newReplies, replies, reply, table, timer;
    info = $('#info');
    timer = $('#timer');
    if (this.status === 404) {
      isDead = true;
      m(info, {
        textContent: '404',
        className: 'error'
      });
      timer.textContent = '';
      clearInterval(intervalId);
      inputs = $$('#updater input');
      _ref2 = inputs;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        input = _ref2[_j];
        input.disabled = true;
      }
      inputs = $$('input[type="submit"]');
      _ref2 = inputs;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        input = _ref2[_j];
        m(input, {
          disabled: true,
          value: '404'
        });
      }
      updateFavicon();
      if (config['Update Title']) {
        l = unread.length;
        document.title = ("(" + (l) + ") /" + (BOARD) + "/ - 404");
      }
      return null;
    }
    if (this.status === 0) {
      info.textContent = 'retry';
      timer.textContent = '-1';
      return null;
    }
    br = $('br[clear]');
    id = ((typeof (_ref3 = ((_ref2 = x('preceding::td[@id][1]', br)))) === "undefined" || _ref3 === null) ? undefined : _ref3.id) || 0;
    newReplies = [];
    replies = parseResponse(this.responseText);
    replies.reverse();
    _ref2 = replies;
    for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
      reply = _ref2[_j];
      if (reply.id <= id) {
        break;
      }
      newReplies.push(reply);
    }
    l = newReplies.length;
    if (config['Verbose']) {
      info.textContent = ("+" + (l));
    }
    if (l === 0) {
      info.className = '';
    } else {
      if (config['Verbose']) {
        info.className = 'new';
      }
      newReplies.reverse();
      unread = unread.concat(newReplies);
      _ref2 = newReplies;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        reply = _ref2[_j];
        table = x('ancestor::table', reply);
        inBefore(br, table);
      }
      updateFavicon();
      if (config['Update Title']) {
        window.addEventListener('scroll', scroll, true);
        document.title = document.title.replace(/\d+/, unread.length);
      }
    }
    return (timer.textContent = ("-" + (config['Interval'])));
  };
  request = function() {
    var timer;
    (typeof r === "undefined" || r === null) ? undefined : r.abort();
    r = new XMLHttpRequest();
    r.onload = onloadUpdater;
    r.open('GET', location.href, true);
    r.send();
    timer = $('#timer');
    return (timer.textContent = 0);
  };
  timerF = function() {
    var time, timer;
    timer = $('#timer');
    time = Number(timer.textContent) + 1;
    timer.textContent = time;
    if (time === 0) {
      return request();
    } else if (time > 10) {
      request();
      return ($('#info').textContent = 'retry');
    }
  };
  updateFavicon = function() {
    var clone;
    clone = favicon.cloneNode(true);
    if (isDead) {
      clone.href = unread.length ? favDeadHalo : favDead;
    } else {
      clone.href = unread.length ? favHalo : favNormal;
    }
    replace(favicon, clone);
    return (favicon = clone);
  };
  scroll = function() {
    var bodyY;
    bodyY = document.body.clientHeight;
    while (unread.length) {
      if (unread[0].getBoundingClientRect().bottom > bodyY) {
        return null;
      }
      unread.shift();
      document.title = document.title.replace(/\d+/, unread.length);
    }
    updateFavicon();
    return window.removeEventListener('scroll', scroll, true);
  };
  autoUpdate = function() {
    var info, timer;
    timer = $('#timer');
    info = $('#info');
    if (this.checked) {
      intervalId = setInterval(timerF, 1000);
      return (timer.textContent = ("-" + (config['Interval'])));
    } else {
      clearInterval(intervalId);
      timer.textContent = '';
      return (info.textContent = 'Thread Updater');
    }
  };
  toggleVerbose = function() {
    return ($('#timer').style.display = config['Verbose'] ? '' : 'none');
  };
  changeCheckbox = function() {
    config[this.name] = this.checked;
    GM_setValue(this.name, this.checked);
    switch (this.name) {
      case 'Verbose':
        return toggleVerbose();
      case 'Auto Update':
        return autoUpdate.call(this);
    }
  };
  changeInterval = function() {
    var timer, value;
    value = Number(this.value) || 30;
    this.value = value;
    GM_setValue('Interval', value);
    config['Interval'] = value;
    timer = $('#timer');
    return parseInt(timer.textContent) > 0 ? (timer.textContent = "-$value") : null;
  };
  makeOptions = function(id, obj) {
    var _j, _k, _len, _ref2, _ref3, box, type, value;
    box = n('div', {
      id: id,
      className: 'reply'
    });
    position(box);
    _ref2 = obj;
    for (type in _ref2) {
      if (!__hasProp.call(_ref2, type)) continue;
      _j = _ref2[type];
      _ref3 = obj[type];
      for (_k = 0, _len = _ref3.length; _k < _len; _k++) {
        value = _ref3[_k];
        box.appendChild(makeRow(type, value));
      }
    }
    document.body.appendChild(box);
    return box;
  };
  makeRow = function(type, value) {
    var _j, _len, _ref2, div, el, input, label, span;
    div = n('div');
    if (type === 'bar') {
      div.className = 'move';
      div.addEventListener('mousedown', AEOS.move, true);
      _ref2 = value;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        el = _ref2[_j];
        span = n('span', {
          id: el
        });
        div.appendChild(span);
        div.appendChild(document.createTextNode(' '));
      }
      return div;
    }
    input = n('input', {
      name: value,
      type: type
    });
    if (type === 'button') {
      input.value = value;
      input.addEventListener('click', request, true);
      div.appendChild(input);
      return div;
    }
    if (type === 'checkbox') {
      input.checked = config[value];
      input.addEventListener('change', changeCheckbox, true);
    } else {
      input.value = config[value];
      input.addEventListener('change', changeInterval, true);
    }
    label = n('label', {
      textContent: value
    });
    label.appendChild(input);
    div.appendChild(label);
    return div;
  };
  checkboxListener = function() {
    return this.name === 'Auto Update' ? autoUpdate.call(this) : GM_setValue(this.name, this.checked);
  };
  makeUpdater = function() {
    var _j, _len, _ref2, box, checkbox, checked, html, updater;
    updater = AEOS.makeDialog('updater', 'bottomright');
    html = "<div class=move><span id=info></span> <span id=timer></span></div>";
    _ref2 = ['Update Title', 'Verbose', 'Auto Start', 'Auto Update'];
    for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
      box = _ref2[_j];
      key = box === 'Auto Update' ? 'Auto Start' : box;
      checked = config[key] ? 'checked' : '';
      html += ("<div><label>" + (box) + "<input type=checkbox name='" + (box) + "' " + (checked) + "></label></div>");
    }
    html += "<div><label>Interval<input type=text></label></div>";
    html += "<div><input type=button value='Update Now'></div>";
    updater.innerHTML = html;
    _ref2 = $$('input[type=checkbox]', updater);
    for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
      checkbox = _ref2[_j];
      checkbox.addEventListener('click', checkboxListener, true);
    }
    $('input[type=button]', updater).addEventListener('click', request, true);
    return document.body.appendChild(updater);
  };
  makeUpdater();
  toggleVerbose();
  aa = $('#updater input[name="Auto Update"]');
  autoUpdate.call(aa);
  if (config['Update Title']) {
    unread = $$('td.reply');
    updateFavicon();
    document.title = ("(" + (unread.length) + ") ") + document.title;
    scroll();
    window.addEventListener('scroll', scroll, true);
  }
}).call(this);