// ==UserScript==
// @name           Current Events
// @namespace      shoecream@luelinks.net
// @description    Shows you the happenings on the boards
// @include        http://*.endoftheinter.net*
// @include        https://*.endoftheinter.net*
// @include        http://endoftheinter.net*
// @include        https://endoftheinter.net*
// @exclude        http://wiki.endoftheinter.net*
// @exclude        https://wiki.endoftheinter.net*
// @version        12
// @changes        Handle unknown colors.
// ==/UserScript==

var Update = {};
Update.id         = 45598;
Update.curVersion = 12;
Update.callback   = function () {
  Dramalinks.newVersion = true;
  Dramalinks.string = '<a href="http://userscripts.org/scripts/source/'+Update.id+'.user.js" title="'+Update.keys.changes+'">Update!</a> ' + Dramalinks.string;
}

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

// string utility function
String.prototype.format = function format () {
  var string = this;
  Array.prototype.forEach.call(arguments, function (e, i) {
      string = string.replace('{' + i + '}', e, 'g');
    });
  return string;
}

// from MDC 
if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisp*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
  };
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

// adds an extra 'doc' property to the response object that contains
// the document element of the response
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

var Prefs = {};

Prefs.freeze = function (key, obj) {
  GM_setValue(key, obj.toSource())
}

Prefs.thaw = function (key) {
  var obj = GM_getValue(key);
  // lol eval is dangerous xmfd
  return eval(obj);
}

var Dramalinks = {};
Dramalinks.string = '<b style="{4}">&nbsp;<a style="{4}" href="//wiki.endoftheinter.net/index.php/Dramalinks/current">{0}</a>:&nbsp;</b> <a id="ce-left" style="cursor:pointer;font-weight:bold" onclick="return false">&#8678;</a> <span id="ce-cur">{1}</span> of {2} <a id="ce-right" style="cursor:pointer;font-weight:bold" onclick="return false">&#8680;</a> <span id="ce-story">{3}</span>';
Dramalinks.timeout = null;

Dramalinks.update = function (index) {
  var ce = document.getElementById('currentevents');
  ce.innerHTML = Dramalinks.string.format
  (
    Dramalinks.color,
    index + 1,
    Dramalinks.stories.length,
    Dramalinks.stories[index],
    makecolors(Dramalinks.color)
  );
  // 1 story means we don't need to update anything
  if (Dramalinks.stories.length > 1) {
    Dramalinks.addEventListeners();
  }

}

Dramalinks.addEventListeners = function () {
  var ce = document.getElementById('currentevents');
  var prev = document.getElementById('ce-left');
  var next = document.getElementById('ce-right');
  prev.addEventListener('click', function (e) { Dramalinks.prev() }, false);
  next.addEventListener('click', function (e) { Dramalinks.next() }, false);
  clearTimeout(Dramalinks.timeout);
  Dramalinks.timeout = setTimeout(function() { Dramalinks.next() }, 6000);
  ce.addEventListener('mouseover', function (e) { clearTimeout(Dramalinks.timeout); }, false);
  ce.addEventListener('mouseout', function(e) {
      clearTimeout(Dramalinks.timeout);
      Dramalinks.timeout = setTimeout(function() { Dramalinks.next()}, 6000)
    }, false);
}

Dramalinks.prev = function () {
  var cur = document.getElementById('ce-cur').textContent - 1;      
  var p = (cur - 1) % Dramalinks.stories.length;
  if (p < 0) { p = Dramalinks.stories.length - 1 };   
  Dramalinks.update(p);
}

Dramalinks.next = function () {
  var cur = document.getElementById('ce-cur').textContent - 1;   
  var n = (cur + 1) % Dramalinks.stories.length;
  Dramalinks.update(n);
}

function makecolors (color) {
  var str = 'background-color: {0}; color: {1}';
  var table = {
    white: ['white', 'black'],
    green: ['#31C365', 'black'],
    blue: ['#8CEFFD', 'black'],
    yellow: ["yellow", 'black'],
    orange: ["#FFC848", 'black'],
    red: ["#FF5353", 'black'],
    black: ['black', 'white'],
    kermit: ["#D881ED", 'black; border: 1px solid black']
  }
  var c = table[color.toLowerCase()];
  if (c) {
    return str.format(c[0], c[1]);
  } else {
    return str.format('white', 'black');
  }
}

function getStories () {
  // checkes to see if we need new stories and calls XHR.get if necessary
  var timeout = 60000; // 1 minute
  var now = new Date();
  var then = Prefs.thaw('last');
  if (timeout > now - then) {
    Dramalinks.stories = Prefs.thaw('stories');
    Dramalinks.color = Prefs.thaw('color');
    Dramalinks.update(0);
  } else {
    XHR.get('http://wiki.endoftheinter.net/index.php?title=Dramalinks/current&action=render&x-time=' + Date(), onGet)
  }

  // create display
  // Dramalinks.update(0); /* can't do this here do to async */

  // auto refresh after like 5 minutes. probably won't interact poorly with
  // other tabs...
  setTimeout(function() {
      clearTimeout(Dramalinks.timeout);         
      document.getElementById('currentevents').innerHTML = '&#9762; Please stand by... &#9762;';
      getStories();
    }, 300000);  
}

function onGet (r) {
  var ce = document.getElementById('currentevents');  
  if (r.responseText == 'wiki brb') {
    ce.textContent = 'Error: The wiki is currently unavailable.';
    return;
  }
  var stories = r.doc.getElementById('dramalinks-stories');
  if (!stories) {
    ce.textContent = 'Error: Dramalinks stories unavailable or not present.';
    return;
  }
  var color = r.doc.getElementById('dramalinks-color');
  if (color) {
    Dramalinks.color = color.textContent.replace(/[a-z]/, function (m) { return m.toUpperCase() });
  } else {
    console.log('Error: Dramalinks color unavailable or unrecognized.');
    Dramalinks.color = 'Unknown';
  }

  Dramalinks.stories = [].map.call(
    stories.getElementsByTagName('li'),
    function (x) { return x.innerHTML; }
  );


  // store data here
  Prefs.freeze ('stories', Dramalinks.stories);
  Prefs.freeze ('color', Dramalinks.color);
  Prefs.freeze ('last', new Date());

  // create user display
  Dramalinks.update(0);
}

// loading code
var site = document.getElementsByTagName('h1')[0];
if (site) {
  var created = document.createElement('div');
  created.innerHTML = '&#9762; Please stand by... &#9762;';
  created.id = 'currentevents';
  created.setAttribute('style','position:absolute; left:1em;');
  if (document.body.className == 'classic') { created.style.left = '13em' };
  site.parentNode.insertBefore(created,site);
  getStories();
  Update.check();
}
