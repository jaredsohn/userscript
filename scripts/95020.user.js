// ==UserScript==
// @name           Thread Updater
// @author         bob23646
// @namespace      http://bob23646.deviantart.com/
// @description    updates threads after set amount of seconds
// @include        http*://boards.4chan.org/*/res/*
// ==/UserScript==

(function() {
  var $, $$, _a, _b, _c, _d, autoStart, autoUpdate, autoUpdateF, div, favDead, favDeadHalo, favHalo, favNormal, favicon, head, inBefore, input, inputs, interval, intervalI, intervalId, l, mousedown, mousemove, mouseup, move, onloadUpdater, parseResponse, position, r, replace, scroll, setValue, tag, threadUpdate, timerF, unread, updateFavicon, updater, x;
  //utility funks
  x = function x(path, root) {
    root = root || document.body;
    return document.evaluate(path, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  };
  $ = function $(selector, root) {
    root = root || document.body;
    return root.querySelector(selector);
  };
  $$ = function $$(selector, root) {
    var _a, _b, _c, _d, node, result;
    root = root || document.body;
    result = root.querySelectorAll(selector);
    //magic that turns the results object into an array:
    _a = []; _c = result;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      node = _c[_b];
      _a.push(node);
    }
    return _a;
  };
  inBefore = function inBefore(root, el) {
    return root.parentNode.insertBefore(el, root);
  };
  tag = function tag(el) {
    return document.createElement(el);
  };
  replace = function replace(root, el) {
    return root.parentNode.replaceChild(el, root);
  };
  position = function position(el) {
    var id, left, top;
    id = el.id;
    (left = GM_getValue(("" + (id) + "Left"))) ? (el.style.left = left) : (el.style.right = '0px');
    if ((top = GM_getValue(("" + (id) + "Top")))) {
      el.style.top = top;
      return el.style.top;
    } else {
      el.style.bottom = '0px';
      return el.style.bottom;
    }
  };
  //movement
  mousedown = function mousedown(e) {
    var div;
    div = this.parentNode;
    move.div = div;
    move.divX = div.offsetLeft;
    move.divY = div.offsetTop;
    move.clientX = e.clientX;
    move.clientY = e.clientY;
    move.bodyX = document.body.clientWidth;
    move.bodyY = document.body.clientHeight;
    window.addEventListener('mousemove', mousemove, true);
    return window.addEventListener('mouseup', mouseup, true);
  };
  mousemove = function mousemove(e) {
    var div, left, realX, realY, top;
    div = move.div;
    realX = move.divX + (e.clientX - move.clientX);
    // x + dx
    left = realX < 20 ? 0 : realX;
    if (move.bodyX - div.offsetWidth - realX < 20) {
      div.style.left = '';
      div.style.right = '0px';
    } else {
      div.style.left = left + 'px';
      div.style.right = '';
    }
    realY = move.divY + (e.clientY - move.clientY);
    // y + dy
    top = realY < 20 ? 0 : realY;
    if (move.bodyY - div.offsetHeight - realY < 20) {
      div.style.top = '';
      div.style.bottom = '0px';
      return div.style.bottom;
    } else {
      div.style.top = top + 'px';
      div.style.bottom = '';
      return div.style.bottom;
    }
  };
  mouseup = function mouseup() {
    var id;
    id = move.div.id;
    GM_setValue(("" + (id) + "Left"), move.div.style.left);
    GM_setValue(("" + (id) + "Top"), move.div.style.top);
    window.removeEventListener('mousemove', mousemove, true);
    return window.removeEventListener('mouseup', mouseup, true);
  };
  //setup
  move = {};
  unread = [];
  r = null;
  interval = null;
  intervalId = null;
  //godammit moot
  head = $('head', document);
  if (!(favicon = $('link[rel="shortcut icon"]', head))) {
    ///f/
    favicon = tag('link');
    favicon.rel = 'shortcut icon';
    favicon.href = 'http://static.4chan.org/image/favicon.ico';
    head.appendChild(favicon);
  }
  favNormal = favicon.href;
  favHalo = /ws/.test(favNormal) ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR4XrWRQQoAIQwD+6L97j7Ih9WTQQxhDqJQCk4Mranuvqod6LgwawSqSuUmWSPw/UNlJlnDAmA2ARjABLYj8ZyCzJHHqOg+GdAKZmKPIQUzuYrxicHqEgHzP9g7M0+hj45sAnRWxtPj3zSPAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAABmzDP///8AAABet0i+AAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=';
  favDeadHalo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWUlEQVR4XrWSAQoAIAgD/f+njSApsTqjGoTQ5oGWPJMOOs60CzsWwIwz1I4PUIYh+WYEMGQ6I/txw91kP4oA9BdwhKp1My4xQq6e8Q9ANgDJjOErewFiNesV2uGSfGv1/HYAAAAASUVORK5CYII=';
  favDead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAAD/AAA9+90tAAAAAXRSTlMAQObYZgAAADtJREFUCB0FwUERxEAIALDszMG730PNSkBEBSECoU0AEPe0mly5NWprRUcDQAdn68qtkVsj3/84z++CD5u7CsnoBJoaAAAAAElFTkSuQmCC';
  if (typeof GM_deleteValue === 'undefined') {
    this.GM_setValue = function GM_setValue(name, value) {
      value = (typeof value)[0] + value;
      return localStorage.setItem(name, value);
    };
    this.GM_getValue = function GM_getValue(name, defaultValue) {
      var type, value;
      if (!(value = localStorage.getItem(name))) {
        return defaultValue;
      }
      type = value[0];
      value = value.substring(1);
      if (type === 'b') {
        return value === 'true';
      } else if (type === 'n') {
        return Number(value);
      } else {
        return value;
      }
    };
    this.GM_addStyle = function GM_addStyle(css) {
      var style;
      style = tag('style');
      style.type = 'text/css';
      style.textContent = css;
      return $('head', document).appendChild(style);
    };
  }
  //funks
  onloadUpdater = function onloadUpdater() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, br, i, id, input, inputs, l, newReplies, replies, reply, stat, table, timer;
    stat = $('#status');
    timer = $('#timer');
    if (this.status === 404) {
      stat.textContent = '404';
      stat.className = 'error';
      clearInterval(intervalId);
      timer.textContent = '';
      inputs = $$('input', updater);
      _b = inputs;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        input = _b[_a];
        input.disabled = true;
      }
      updateFavicon(true);
      return null;
    }
    _d = parseResponse(this.responseText);
    replies = _d[0];
    br = $('br[clear]');
    id = x('preceding::td[1]', br).id || 0;
    newReplies = [];
    l = replies.length - 1;
    if (l > -1) {
      _f = l; _g = 0;
      for (_e = 0, i = _f; (_f <= _g ? i <= _g : i >= _g); (_f <= _g ? i += 1 : i -= 1), _e++) {
        replies[i].id > id ? newReplies.push(replies[i]) : null;
      }
    }
    l = newReplies.length;
    stat.textContent = ("+" + l);
    if (l) {
      newReplies.reverse();
      unread = unread.concat(newReplies);
      _i = newReplies;
      for (_h = 0, _j = _i.length; _h < _j; _h++) {
        reply = _i[_h];
        table = x('ancestor::table', reply);
        inBefore(br, table);
      }
      stat.className = 'new';
      updateFavicon();
      window.addEventListener('scroll', scroll, true);
      document.title = document.title.replace(/\d+/, unread.length);
    } else {
      stat.className = '';
    }
    timer.textContent = ("-" + interval);
    return timer.textContent;
  };
  threadUpdate = function threadUpdate() {
    var timer;
    r == undefined ? undefined : r.abort();
    r = new XMLHttpRequest();
    r.onload = onloadUpdater;
    r.open('GET', location.href, true);
    r.send();
    timer = $('#timer');
    timer.textContent = 0;
    return timer.textContent;
  };
  timerF = function timerF() {
    var time, timer;
    timer = $('#timer');
    time = Number(timer.textContent) + 1;
    timer.textContent = time;
    if (time === 0) {
      return threadUpdate();
    }
  };
  autoUpdateF = function autoUpdateF() {
    if (this.checked) {
      intervalId = setInterval(timerF, 1000);
      $('#timer').textContent = ("-" + interval);
      return $('#timer').textContent;
    } else {
      return clearInterval(intervalId);
    }
  };
  setValue = function setValue() {
    var timer;
    if (this.type === 'checkbox') {
      return GM_setValue(this.name, this.checked);
    } else {
      interval = Number(this.value) || 30;
      GM_setValue('Interval', interval);
      timer = $('#timer');
      if (!r) {
        timer.textContent = ("-" + interval);
        return timer.textContent;
      }
    }
  };
  parseResponse = function parseResponse(responseText) {
    var body, opbq, replies;
    body = tag('body');
    body.innerHTML = responseText;
    replies = $$('td.reply', body);
    opbq = $('blockquote', body);
    return [replies, opbq];
  };
  updateFavicon = function updateFavicon(dead) {
    var clone;
    clone = favicon.cloneNode(true);
    dead ? (clone.href = unread.length ? favDeadHalo : favDead) : (clone.href = unread.length ? favHalo : favNormal);
    replace(favicon, clone);
    favicon = clone;
    return favicon;
  };
  scroll = function scroll() {
    var bodyY;
    bodyY = document.body.clientHeight;
    while (unread.length) {
      if (unread[0].getBoundingClientRect().bottom > bodyY) {
        //bottom of reply is below screen. top: 0, down: positive y
        return null;
      }
      unread.shift();
      document.title = document.title.replace(/\d+/, unread.length);
    }
    updateFavicon();
    return window.removeEventListener('scroll', scroll, true);
  };
  //main
  GM_addStyle(' \
#updater { \
padding: 5px; \
} \
#updater span.new { \
background: lime; \
} \
#updater:not(:hover) *:not(span) { \
display: none; \
} \
#qr, #updater { \
position: fixed; \
border: 1px solid; \
} \
#qr > div, #updater { \
text-align: right; \
} \
');
  updater = tag('div');
  updater.id = 'updater';
  updater.className = 'reply';
  position(updater);
  updater.innerHTML = ' \
<div>Updater</div> \
<label>Auto Start<input type="checkbox" name="Auto Start"></label><br> \
<label>Auto Update<input type="checkbox" name="Auto Update"></label><br> \
<label>Interval (s) <input size="2" maxlength="4" name="Interval"></label><br> \
<span id="status">Thread Updater</span> <span id="timer"></span><br> \
';
  document.body.appendChild(updater);
  div = $('div', updater);
  div.addEventListener('mousedown', mousedown, true);
  div.className = 'move';
  inputs = $$('input', updater);
  _b = inputs;
  for (_a = 0, _c = _b.length; _a < _c; _a++) {
    input = _b[_a];
    input.addEventListener('change', setValue, true);
  }
  _d = inputs;
  autoStart = _d[0];
  autoUpdate = _d[1];
  intervalI = _d[2];
  interval = GM_getValue('Interval', 30);
  intervalI.value = interval;
  autoUpdate.addEventListener('change', autoUpdateF, true);
  if (GM_getValue('Auto Start')) {
    autoStart.checked = true;
    autoUpdate.checked = true;
    autoUpdateF.call(autoUpdate);
  }
  input = tag('input');
  input.type = 'button';
  input.value = 'Update Now';
  input.addEventListener('click', threadUpdate, true);
  updater.appendChild(input);
  unread = $$('td.reply');
  updateFavicon();
  l = unread.length;
  document.title = ("(" + l + ") ") + document.title;
  scroll();
  return window.addEventListener('scroll', scroll, true);
})();
