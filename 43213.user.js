// ==UserScript==
// @name           Last.fm Integration
// @namespace      shoecream@luelinks.net
// @description    Integrates Last.fm "Last Played" information into posts. Requires Firefox 3.
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        http://links.endoftheinter.net/linkme.php*
// @include        http://www.endoftheinter.net/editprofile.php*
// @include        http://endoftheinter.net/editprofile.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        https://links.endoftheinter.net/linkme.php*
// @include        https://www.endoftheinter.net/editprofile.php*
// @include        https://endoftheinter.net/editprofile.php*
// @version        11
// @changes        Workaround what appears to be a FF4 nsDOMImplementation::CreateDocument change
// ==/UserScript==

var Update = {};
Update.id         = 43213;
Update.curVersion = 11;
Update.callback = function () {
  if (Update.keys.version > Update.curVersion) {
    var upd = document.getElementById('lastfm-update');
    if (!upd) {
      UI.setMsg('Filler message for updating')
      upd = document.getElementById('lastfm-update');
    }
    upd.style.display = 'inline';
    upd.title = Update.keys.changes;
  }
};
Update.check = function () {
  if (!Update.id)         { return; }
  if (!Update.curVersion) { return; }
  if (Update.keys && Update.keys['version'])  { Update.callback(); }
  var url = 'http://userscripts.org/scripts/source/'+Update.id+'.meta.js';
  XHR.get(url, Update.onXHR);
}
Update.onXHR = function (response) {
  var splat = response.responseText.split(/[\r\n]/);
  var keys = {};
  for (i in splat) {
    if (!splat[i]) continue;
    var matches = splat[i].match(/@([\w:]+)\s+(.+)/);
    if (!matches) continue;
    keys[matches[1]] = matches[2];
  }
  // set update keys
  Update.keys = keys;
  if (keys['version'] && (keys['version'] != Update.curVersion)) {
    Update.callback();
  }
}
var XHR = {};
XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}
XHR.get = function (url, callback) {
  GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function (r) { XHR.createDoc(r, callback) }
    });
}
XHR.createQueryString = function (obj) {
  var ret = [];
  for (var i in obj) {
    ret.push([i, encodeURIComponent(obj[i])].join('='));
  }
  return ret.join('&');
}
var Prefs = {};
Prefs.freeze = function (key, obj) {
  GM_setValue(key, obj.toSource())
}
Prefs.thaw = function (key) {
  var obj = GM_getValue(key);
  // lol eval is dangerous xmfd
  return eval(obj);
}

// crockford
String.prototype.supplant = function (o) {
  return this.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};


function find_parent (dom, callback) {
  if (typeof callback != 'function') throw new TypeError();
  do {
    if (callback(dom.parentNode)) {
      return dom.parentNode;
    }
  } while (dom = dom.parentNode);
  return;
}

function find_children (dom, callback) {
  if (typeof callback != 'function') throw new TypeError();
  var stack = [];
  var children = dom.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (callback(children[i]))
      stack.push(children[i]);
    if (children[i].hasChildNodes()) {
      var newstack = find_children(children[i], callback);
      if (newstack.length) {
        // flatten the array
        for (var j = 0; j < newstack.length; j++) {
          stack.push(newstack[j]);
        }
      }
    }
  }
  return stack;
}

var nicetime = (function () {
    // make a closure to show off my prowess at programming
    var periods = [
    {name: 'millisecond', interval: 1000}, // 1000 ms in a second, etc
    {name: 'second', interval: 60},
    {name: 'minute', interval: 60},
    {name: 'hour', interval: 24},
    {name: 'day', interval: 7},
    {name: 'week', interval: 4.35},
    {name: 'month', interval: 12},
    {name: 'year', interval: 10},
    {name: 'decade', interval: Infinity}
    ];

    return function (time) {
      var now = new Date();
      var time = new Date(time);
      if (!time) return 'invalid date';
      if (now == time) {
        return 'just now';
      } else if (now > time) {
        var tense = 'ago';
      } else {
        var tense = 'from now';
      }
      var difference = Math.abs(now - time);
      for (var i = 0; i < periods.length; i++) {
        difference /= periods[i].interval;
        if (difference < periods[i + 1].interval) break;
      }

      difference = Math.round(difference);
      return [difference, periods[i + 1].name + (difference != 1 ? 's' : ''), tense].join(' ');
    }
  })();

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

// from MDC
if (!Array.prototype.map){
  Array.prototype.map = function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }
    return res;
  };
}

var LastFM = new function () {
  var me = this; // because I don't know how 'this' works
  me.artist = '';
  me.track = '';
  me.time = '';
  var enabled = false;
  var updating = false;
  var lastupdate = 0; // dates are objects but compared as integers
  var timer = 0; // timers are integers
  var nameregex = /^[a-z][_a-z0-9\-]{1,14}$/i;
  var urlregex = /http:\/\/www\.last\.fm\/user\/([a-zA-Z][_A-Za-z0-9\-]{1,14})\/?/;

  function getUrl(usr) {
    if (!usr) {
      usr = getUsername();
      if (!usr)
        return;
    }
    return 'http://www.last.fm/user/' + usr;
  }

  function getFeedUrl(usr) {
    if (!usr) {
      usr = getUsername();
      if (!usr)
        return;
    }
    var root = 'http://ws.audioscrobbler.com/2.0/?';
    var obj = {
      api_key: 'addb8c198ad0dbd0380d5d42cdfdda02',
      method: 'user.getrecenttracks',
      limit: 1,
      user: usr,
      cachebust: Date.now() // non standard
    }
    return root + XHR.createQueryString(obj);
  }

  var getUsername = function getUsername() {
    var matched = Page.message.defaultValue.match(urlregex);
    if (matched && matched[1]) {
      return matched[1];
    }
    return;
  }

  function canUpdate() {
    // tells us if we can update or not.
    if (!enabled) return false;
    if (updating) return false;
    if (!getUsername()) {
      UI.setMsg('No Last.fm URL detected.');
      return false;
    }
    if (new Date() - lastupdate > 1000 * 60 * 2) { // 2 minutes
      return true;
    }
    return false;
  }

  function update (skipcheck) {
    if (skipcheck || canUpdate()) {
      updating = true;
      UI.setMsg('Updating...');
      XHR.get(getFeedUrl(), updateCB);
      Update.check();
    } else {
    }
  }
  // alias this because i'm too lazy to change code
  this.update = update;

  function format() {
    var format = Prefs.thaw('lastfm-format');
    if (!format) format = '{artist} - {track} ({time})';
    if (Page.message.defaultValue.split('\n').length - 1 > 2) {
      // 2 line sig
      format = format.replace(/\\n/g, ' ');
    } else {
      format = format.replace('\\n', '\n');
      format = format.replace(/\\n/g, ' ');
    }
    var link = getUrl().match(/http:\/\/(.*)/)[1];
    return format.supplant({
        artist: me.artist,
        track: me.track,
        time: me.time,
        link: link
      });
  }

  function updateCB(r) {
    lastupdate = new Date();
    updating = false;
    var lfm = r.doc.getElementsByTagName('lfm')[0];
    if (lfm.getAttribute('status') === 'ok') {
      me.artist = lfm.getElementsByTagName('artist')[0].textContent;
      me.track = lfm.getElementsByTagName('name')[0].textContent;
      var track = lfm.getElementsByTagName('track')[0];
      if (track.getAttribute('nowplaying') === 'true') {
        me.time = 'just now';
      } else {
        var date = lfm.getElementsByTagName('date')[0].getAttribute('uts');
        me.time = nicetime(date * 1000); // they use seconds, we use ms
      }
      UI.setUrl(me.artist, '-', me.track, '(' + me.time + ')');
      if (Prefs.thaw('lastfm-format') != '{artist} - {track} ({time})') {
        UI.setMsg(getUsername(), '(custom):');
      } else {
        UI.setMsg(getUsername() + ': ');
      }
      clearTimeout(timer);
      timer = setTimeout(update, 1000 * 60 * 2); // 2 minutes
    } else {
      var error = lfm.getElementsByTagName('error')[0];
      UI.setMsg('Error code', error.getAttribute('code'), error.textContent);
    }
  }

  this.enable  = function enable() {
    if (/quickpost-expanded/.test(document.getElementsByTagName('body')[0].className)) {    
      enabled = true;
      update();    
    } else {
      enabled = false;
    }
  };
  this.disable = function disable() {
    enabled = false;
  };

  me.rewrite = function rewrite(textbox) {
    if (!textbox) textbox = Page.message;
    var str = format();
    var url = getUrl();
    var index = textbox.value.lastIndexOf(url);
    if (index < 0) return;
    var before = textbox.value.substring(0, index);
    var after = textbox.value.substring(index + url.length);
    var newtxt = before + str + after;
    textbox.readOnly = false;
    textbox.value = newtxt;
    textbox.readOnly = true;
  }
};

var Page = new function() {
  var me = this;
  me.handleEvent = function (e) {
    if (e.target != window) return;
    LastFM.enable();
  }

  me.quickpost = document.getElementsByClassName('quickpost');
  if (me.quickpost.length) {
    me.quickpost = me.quickpost[0];
    me.canvas = me.quickpost.getElementsByClassName('quickpost-canvas')[0];
    me.body = me.canvas.getElementsByClassName('quickpost-body')[0];
    me.message = me.quickpost.getElementsByTagName('textarea')[0];
    window.addEventListener('focus', me, true);
    window.addEventListener('blur', me, true);
    me.quickpost.addEventListener('click', LastFM.enable, false);
    // workaround for http://wiki.greasespot.net/0.7.20080121.0_compatibility    
    me.message.addEventListener('focus', function (e) {
        setTimeout(function () { LastFM.enable() }, 0);
      }, false)
  } else {
    me.quickpost = null;
    if (/#lastfm-help/.test(location.hash)) {
      var table = document.getElementsByTagName('table')[0];
      var sig = find_children(table, function (dom) {
          if (dom.nodeName === 'TD' && dom.textContent === 'Signature')
            return true;
        })[0];
      var textbox = sig.parentNode.getElementsByTagName('textarea')[0];
      var helpdiv = document.createElement('div');
      helpdiv.id = 'lastfm-help';
      // GM_getValue instead of Prefs.thaw because this used the old system
      var lastuser = GM_getValue('lastfm-user');
      if (!lastuser) lastuser = 'example';
      helpdiv.innerHTML = 'In your signature, include your Last.fm profile link.<br>For example: <u>http://www.last.fm/user/<b>' + lastuser + '</b></u>';
      helpdiv.style.color = 'red';
      textbox.parentNode.appendChild(helpdiv);
    }
  }
}


var UI = new function () {
  var me = this;
  var ui;
  var msg;
  var url;
  var help;

  function createUI() {
    if (ui) return;
    var span = document.createElement('span');
    span.id = 'lastfm-ui';
    span.setAttribute('style', 'position: relative; right: -1em');
    span.innerHTML = '<b>Last.fm<a id="lastfm-update" href="http://userscripts.org/scripts/source/43213.user.js" style="display:none">(updates available!)</a>:</b> <span id="lastfm-msg"></span> <a id="lastfm-url" onclick="return false"></a> <a id="lastfm-help"></a>';
    Page.body.appendChild(span);
    ui = span;
    msg = document.getElementById('lastfm-msg');
    url = document.getElementById('lastfm-url');
    help = document.getElementById('lastfm-help');
    help.textContent = '(help)';
    help.href = '//endoftheinter.net/editprofile.php#lastfm-help';
    me.setMsg('Last.fm loading...');
    url.href = '#';
    url.title = 'Click to set a custom format';
    url.addEventListener('click', urlClick, false);
    var post = find_children(Page.quickpost, function (dom) {
        if (dom.name == 'post' && dom.type == 'submit') return true;
      });
    if (post[0]) {
      registerPostHandlers(post[0]);
    }
    var preview = find_children(Page.quickpost, function (dom) {
        if (dom.name == 'preview' && dom.type == 'submit') return true;
      });
    if (preview[0]) {
      preview[0].addEventListener('click', onPreview, false);
    }
  }

  var onPost = new function() {
    var save;
    function doPost () {
      LastFM.rewrite(Page.message);
      LastFM.update(true);      
    }
    this.handleEvent = function onPost_handleEvent (e) {
      switch (e.type) {
      case 'mousedown':
        save = e.target;
        break;
      case 'mouseup':
        if (save == e.target)
          doPost();
        break;
      case 'keypress':
        if (e.keyCode == 13 || e.charCode == 32)
          doPost();
        break;
      }
    }
  };

  function onPreview(e) {
    function onPreviewInsert(e) {
      // preview is made using async-post.php which isn't instant
      if (e.target && e.target.className == 'quickpost-buttons') {
        document.removeEventListener('DOMNodeInserted', onPreviewInsert, false);
        var post = find_children(e.target, function (dom) {
            if (dom.value == 'Post Message') return true;
          });
        registerPostHandlers(post[0]);
      }
    }    
    document.addEventListener('DOMNodeInserted', onPreviewInsert, false);
  }


  function registerPostHandlers(node) {
    // Quickpost registers on click. DOM mouse event firing order is 
    // mousedown - mouseup - click. We need to be a split second faster than
    // quickpost so we register on mouseup instead of click          
    node.addEventListener('mousedown', onPost, false);
    node.addEventListener('mouseup', onPost, false);
    node.addEventListener('keypress', onPost, false);
  }

  function urlClick(e) {
    e.preventDefault();
    var result = prompt("You're setting a custom Last.fm format string. Here are the tokens you can use and example results:\n{artist} - Coldplay\n{track} - Parachutes\n{time} - 2 minutes ago\n{link} - http://www.last.fm/user/example\n\nYou can also include a line break with \\n, as long as your sig is only one line long.\nIf you want to go back to the default, simply leave the text box below blank.", (Prefs.thaw('lastfm-format') || "{artist} - {track} ({time})"));
    if (result !== null) {
      Prefs.freeze('lastfm-format', (result || "{artist} - {track} ({time})"));
    }
  }

  this.setMsg = function setMsg(/* variadic */) {
    var message = Array.prototype.join.call(arguments, ' ');
    if (!ui) createUI();
    if (!msg) createUI(); // hurr
    msg.textContent = message;
  }

  this.setUrl = function(/* variadic */) {
    var message = Array.prototype.join.call(arguments, ' ');
    if (!ui) createUI();
    if (!url) createUI();
    url.textContent = message;
  }
}
