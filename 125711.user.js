// ==UserScript==
// @name           ETI Dramalinks Ticker
// @namespace      pendevin
// @description    Shows you the happenings on the boards. Based on shoecream's Current Events script.
// @include        http://endoftheinter.net*
// @include        http://boards.endoftheinter.net*
// @include        https://endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// ==/UserScript==

// string utility function
String.prototype.format = function format () {
  var string = this;
  Array.prototype.forEach.call(arguments, function (e, i) {
      string = string.replace('{' + i + '}', e, 'g');
    });
  return string;
}

// from MDC 
if (!Array.prototype.map){
  Array.prototype.map = function(fun /*, thisp*/){
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++){
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
Dramalinks.string = '<b style="{4}">&nbsp;<a style="{4}" href="//wiki.endoftheinter.net/index.php/Dramalinks/current">{0}</a>:&nbsp;</b> <a id="ce-left" onclick="return false">&#8678;</a> <span id="ce-cur">{1}</span> of {2} <a id="ce-right" onclick="return false">&#8680;</a> <span id="ce-story">{3}</span>';
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
  return str.format(c[0], c[1]);
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
  if (!color) {
    ce.textContent = 'Error: Dramalinks color unavailable or unrecognized.';
    return;
  }

  // use old notation; we don't know what kind of crazy shit people are running 
  Dramalinks.stories = Array.prototype.map.call(
    stories.getElementsByTagName('li'),
    function (x) { return x.innerHTML; }
  );

  Dramalinks.color = color.textContent.replace(/[a-z]/, function (m) { return m.toUpperCase() })

  // store data here
  Prefs.freeze ('stories', Dramalinks.stories);
  Prefs.freeze ('color', Dramalinks.color);
  Prefs.freeze ('last', new Date());

  // create user display
  Dramalinks.update(0);

}

// loading code
var site =document.getElementsByClassName('menubar')[0];
var button=document.createElement('a');
button.href='http://wiki.endoftheinter.net/index.php?title=Dramalinks/current&action=render';
button.innerHTML='Drama';
site.appendChild(button);
var created = document.createElement('div');
created.innerHTML = '&#9762; Please stand by... &#9762;';
created.id = 'currentevents';
created.style.display='none';
site.appendChild(created);
var open=false
button.addEventListener('click',function(e){
		e.preventDefault();
		if(!open){
			unsafeWindow.console.log('open');
			created.style.display='block';
			site.style.height='41px';
			open=true;
		}
		else{
			unsafeWindow.console.log('close');
			created.style.display='none';
			site.style.height='19px';
			open=false;
		}
	},false);
getStories();

var css='\
		#currentevents{\
			position:fixed;\
			left:0px;\
			top:19px;\
		}\
		\
		#currentevents a{\
			float:none;\
			padding:0;\
			margin-left:0;\
		\
		#ce-left, #ce-right{\
			cursor:pointer;\
			font-weight:bold;\
		}\
		\
	';
GM_addStyle(css);