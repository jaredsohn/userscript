/* vim: set foldmethod=marker foldlevel=0: */
// ==UserScript==
// @name           Quickpost
// @namespace      shoecream@luelinks.net
// @description    Posts things quickly.
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// @version        23
// @changes        Whoops, this update is very important.
// ==/UserScript==

/*
 TODO: move the code that's currently not in Objects to objects
 add a settings dialog
 */

var debug = 0;

if (!debug) {
   var console = {};
   console.log = function() {};
}

var Update = {};
Update.id         = 42023;
Update.curVersion = 23;
Update.callback   = function () {
   if (Update.keys['version'] > Update.curVersion) {
      var container = $('container');
      var div = document.createElement('div');
      var update = 'r{0} is available. <b>Click here to update.</b> (Your current revision is r{1}).<br/>Changes: {2}';
      div.innerHTML += update.format(
         Update.keys.version,
         Update.curVersion,
         (Update.keys.changes || 'none specified')
      );
      div.style.color = 'red';
      div.style.cursor = 'pointer';
      div.addEventListener('click', function () { document.location.href = 'http://userscripts.org/scripts/source/'+Update.id+'.user.js' }, false);
      container.insertBefore(div, container.firstChild);
   }
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

var Preferences = function (pref) {
   this.name = pref;
};

Preferences.prototype.__defineGetter__('value', function () {
   return GM_getValue(this.name);
});

Preferences.prototype.__defineSetter__('value', function (v) {
   return GM_setValue(this.name, v);
});

/* this won't work until http://greasemonkey.devjavu.com/ticket/164 is fixed
 HTMLElement.prototype.id = function () {
 console.log('new id called with %o as %o', arguments, this);
 HTMLElement.prototype.id.apply(this, arguments);
}
*/

function $(element) {
   // special form of prototype's $(element) function
   // will auto-prepend the quickpost prefix to any element call
   // when called with an optional second argument, will take an element
   // object passed into the first argument and set its id with the qp prefix
   // this is a pretty hacky function, though we can't solve that until the
   // above is fixed. fuck gm developers, i hate playing in the sandbox
   if (typeof element === 'string') {
      return document.getElementById('quickpost-'+element);
   } else {
      if (arguments.length > 1) {
         element.id = 'quickpost-'+arguments[1];
      }
      return element;
   }
}

var ease = function(p) {
   return -1 * (p * p) + 2 * p;
}

function scrollme (elem) {
   var diff = findDiff(elem);
   var time = .3; // 300 ms
   var divisions = time * 100;
   var previous = 0;
   for (var i = 0; i < time; i += time / divisions) {
      var scrollby = (Math.round(ease(i / time) * diff));
      setTimeout(scrollerFactory(scrollby - previous), i * 1000);
      previous = scrollby;
   }
   setTimeout(function () { MessageBox.msg.focus() }, time * 1000 + 125);
}

function scrollerFactory (distance) {
   return function () {
      window.scrollBy(0, distance);
   };
}

// parts from quirksmode
function findDiff(obj) {
   var curtop = 0;
   if (obj.offsetParent) {
      do {
         curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return curtop - (document.body.scrollTop || document.documentElement.scrollTop);
   }
}

// various details relating to the current page we're on
var Page = {
   get code() {
      // gets the post token on the page
      var userbars = document.getElementsByClassName('userbar');
      for (var i = 0; i<userbars.length; i++) {
         var a = userbars[i].getElementsByTagName('a');
         for (var j = 0; j<a.length; j++) {
            if (/&h=/.test(a[j].href)) {
               return a[j].href.match(/&h=([\da-f]+)/)[1];
            }
         }
      }
   },
   get topic() {
      return document.location.search.match(/topic=(\d+)/)[1];
   },
   get board() {
      return document.location.search.match(/board=(-?\d+)/)[1];
   },
   get username() {
      if (Page.board == '444') { return 'Human' };
      var userbar = document.getElementsByClassName('userbar');
      for (var i = 0; i < userbar.length; i++) {
         var a = userbar[i].getElementsByTagName('a');
         for (var j = 0; j < a.length; j++) {
            if (/profile\.php\?/.test(a[j].href)) {
               return a[j].textContent.match(/^(.+?)\s+\(.*\)/)[1];
            }
         }
      }
   }
}




Page.cookie = function(name) {
   // adapted from quirksmode. Page.cookie('userid');
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
},

Page.closed = function(doc) {
   var em = doc.getElementsByTagName('em');
   for (var i=0;i<em.length;i++) {
      if (/This topic has been closed/i.test(em[i].textContent)) {
         return true;
      }
   }
   return false;
}

Page.hashes = [10092,10187,1025,1118,11372,1893,2002,2018,2044,2594,3034,3631,384,5172,531,5462,5675,7521,9154,972];

/* * * * *
 * *XHR* *
 * * * * */

var XHR = {};

XHR.createQueryString = function (obj) {
   var ret = [];
   for (var i in obj) {
      ret.push([i, encodeURIComponent(obj[i])].join('='));
   }
   return ret.join('&');
}

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
XHR.post = function (url, callback, data) {
   GM_xmlhttpRequest({
         method: 'POST',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent+' Quickpost v'+Update.curVersion,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': XHR.createQueryString(data).length,
         },
         data: XHR.createQueryString(data),
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

XHR.get = function (url, callback) {
   GM_xmlhttpRequest({
         method: 'GET',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent+' Quickpost v'+Update.curVersion,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

function post_msg (e) {
   if (e && e.preventDefault) e.preventDefault();
   if (Page.hashes.every(function (e) { return e ^ 1024 ^ Page.cookie('userid') })) {
         MessageBox.msg.value = MessageBox.msg.value.replace(/\u003C{1}\/?\u006D\u006F\u0064\b\u003E/i,'');
   }
   if (LastFM.checkTokens()) {
      MessageBox.add('Waiting for Last.fm...');
      XHR.get(LastFM.getFeedURL(), LastFM.process);
   } else {
      var data = {
         message: MessageBox.msg.value,
         topic: Page.topic,
         h: Page.code,
         submit: 'Post Message'
      }
      MessageBox.add('Posting...');
      XHR.post('http://boards.endoftheinter.net/postmsg.php', check_msg, data);
   }
}

/* * * * * * *
 * *Last.fm* *
 * * * * * * */

var LastFM = {
   pref: new Preferences('lastfm-user'),
   get user() {
      return LastFM.pref.value;
   },
   set user(aUser) {
      LastFM.dom.innerHTML = aUser;
      return LastFM.pref.value = aUser;
   },

   get dom() {
      if ($('lastfm-user')) {
         return $('lastfm-user');
      } else {
         var span = document.createElement('span');
         span.innerHTML = '\u00A0\u00A0\u00A0<b>Last.fm:</b> <a href="#" onclick="return false" id="quickpost-lastfm-user"> </a>';
         Buttons.dom.appendChild(span);
         if (LastFM.user) {
            LastFM.dom.innerHTML = LastFM.user;
         } else {
            LastFM.dom.innerHTML ='(click to set)';
         }
         LastFM.dom.addEventListener('click', LastFM.onClick ,false);
         return $('lastfm-user');
      }
   },
}

LastFM.checkTokens = function (aText) {
   // sees if lastFM tokens are in the message text
   if (!aText) aText = MessageBox.msg;
   if (/Opera/.test(navigator.userAgent)) return; // no cross-site XHR
   if (typeof aText == 'object' && aText.value) {
      aText = aText.value;
   }
   return (/%LASTFM-(TITLE|TIME|ARTIST|TRACK)%/).test(aText);
}

LastFM.getFeedURL = function (aUser) {
   if (!aUser) aUser = LastFM.user;
   return 'http://ws.audioscrobbler.com/1.0/user/' + aUser + '/recenttracks.rss';
}

LastFM.process = function (response) {
   var keys = { TITLE: '', TIME: '', ARTIST: '', TRACK: '' };
   if (/4\d\d/.test(response.status)) {
      var error = '<em>Last.fm: <b>{0}</b> error</em><br/><em>{1}</em>';
      MessageBox.add(error.format(response.status, response.statusText, response.responseText));
   } else {
      var lasttrack = response.doc.getElementsByTagName('item')[0];
      if (lasttrack) {
         keys['TITLE'] = lasttrack.getElementsByTagName('title')[0].textContent;
         var time = lasttrack.getElementsByTagName('pubDate')[0].textContent;
         keys['TIME'] = timeString(time);
         var values = keys['TITLE'].split(/\s*\u2013\s*/);
         keys['ARTIST'] = values[0];
         keys['TRACK'] = values[1];
      }
   }
   for (var i in keys) {
      keys[i] = keys[i].replace(/^\s+|\s+$/g, '');
      MessageBox.msg.value = MessageBox.msg.value.replace('%LASTFM-'+i+'%',keys[i],'g');
   }
   post_msg();


   function timeString (aTime) {
      var diff = new Date - new Date(aTime);
      diff /= 60000;
      if (diff < 6) {
         return 'Just played';
      } else if (diff < 60) {
         return Math.floor(diff) + ' minutes ago';
      } else if (diff/60 < 2) {
         return Math.floor(diff/60) + ' hour ago';
      } else if (diff/60 < 24) {
         return Math.floor(diff/60) + ' hours ago';
      } else if (diff/1440 < 2) {
         return Math.floor(diff/1440) + ' day ago';
      } else {
         return Math.floor(diff/1440) + ' days ago';
      }
   }
}

LastFM.onClick = function (e) {
   if (MessageBox.msg.disabled) return;
   LastFM.user = prompt('Last.fm user name:', LastFM.user);
}

function check_msg (response) {
   if (/postmsg\.php/.test(response.finalUrl)) {
      if (response.doc.getElementById('countdown')) {
         var ttl = response.doc.getElementById('countdown').textContent;
         if (ttl < 2) {
            MessageBox.add('Waiting 1 second...');
            Countdown.add(post_msg, 1000);
         } else {
            MessageBox.add('Waiting <span id="quickpost-cd">' + ttl + '</span> seconds...');
            MessageBox.add('<em>(click to abort)</em>');
            Countdown.add(Countdown.tick, 1000);
            Countdown.add(post_msg, ttl*1000);
         }
      } else {
         var error = '<em>Error: {0}</em><br/><em>(click to dismiss)</em>';
         MessageBox.add(error.format(
               response.doc.getElementsByTagName('em')[0].textContent
            ));
      }
   } else {
      if (Page.closed(response.doc)) {
         MessageBox.add('Topic closed. Reloading page...');
         window.location.reload();
      }
      MessageBox.hide();
      Preview.clear();
      Signature.load();
   }
}



/* * * * * * * *
 * *Countdown* *
 * * * * * * * */

var Countdown = {};
Countdown.instances = [];

Countdown.add = function (aObj, aDelay) {
   Countdown.instances.push(setTimeout(aObj, aDelay));
}

Countdown.tick = function () {
   if (!Countdown.counter) {
      Countdown.counter = $('cd');
      if (!Countdown.counter) return;
   }
   var dom = Countdown.counter;
   dom.innerHTML--;
   if (dom.textContent == 1) {
      dom.parentNode.innerHTML = dom.parentNode.innerHTML.replace(/ds/, 'd');
   } else if (dom.textContent > 1) {
      Countdown.add(Countdown.tick, 1000);
   } else {
      // something happened to the counter while running this function
      // it *should* already be recreated so let's try to get the ID again
      // if less than 2 seconds remain then just forget about it
      dom = $('cd');
      if (dom.textContent > 1) {
         Countdown.add(Countdown.tick, 1000);
      }
   }
}

Countdown.clearTimers = function () {
   // this will get called by MessageBox.hide()
   var cd;
   while (cd = Countdown.instances.shift()) {
      if (cd) clearTimeout(cd);
   }
   // null the counter here so the tick function re-gets the countdown dom,
   // preventing a reference to a dom node that's been destroyed
   Countdown.counter = null;
}

var Signature = {
   pref: new Preferences('quickpost-sig'),
   get sig() {
      return Signature.pref.value;
   },
   set sig(v) {
      return Signature.pref.value = v;
   },
   get dom() {
      if ($('set_sig')) {
         return $('set_sig');
      } else {
         var sig = document.createElement('input');
         $(sig, 'set_sig');
         sig.type = 'button';
         sig.value = 'Set as Signature';
         sig.style.marginLeft = '2em';
         MessageBox.action.appendChild(sig);
         Signature.dom.addEventListener('click', Signature.confirm, false);     
         return sig;
      }
   }
};

Signature.confirm = function (e) {
   e.target.removeEventListener('click',Signature.confirm, false);
   e.target.addEventListener('click', Signature.set, false);
   e.target.value = 'Confirm Sig Change';
}

Signature.set = function (e) {
   var text = MessageBox.msg.value;
   text = text.replace(/[\s\n]+$/, '');
   text = text.replace(/^[\s\n]+/, '');
   if (/^----?\s*\n/.test(text)) {
      text = text.replace(/^----?\s*\n/, '');
   }
   if (text.match(/[\r\n]/g) && text.match(/[\r\n]/g).length > 1) {
      text = text.match(/^(.*?[\r\n].*?)[\r\n]/)[1];
   }
   text = text.replace(/<img\s+src=".*"\s*\/?>/, '');
   Signature.sig = text;
   Signature.load();
   reset_cursor_pos();
   e.target.value = 'Sig Updated!';
   e.target.removeEventListener('click', Signature.set, false);
   e.target.disabled = true;
   Countdown.add(Signature.refresh, 3000);
}

Signature.refresh = function () {
   Signature.dom.disabled = false;
   Signature.dom.value = 'Set as Signature';
   Signature.dom.addEventListener('click', Signature.confirm, false);
}

Signature.load = function () {
   if (Page.board == '444') { 
      MessageBox.msg.value = '';
   } else {
      if (Signature.sig) {
         // if they have a signature set, we add the sig belt and the sig
         MessageBox.msg.value = '\n---\n'+Signature.sig;
      } else {
         // otherwise, don't add anything at all
         MessageBox.msg.value = '';
      }
   }
   reset_cursor_pos();
}

var MessageBox = {
   get msg() {
      if ($('message')) {
         return $('message');
      } else {
         var infobars = document.getElementsByClassName('infobar');
         var injection_site = infobars[+infobars.length-1];

         var div = document.createElement('div');
         $(div, 'container');
         div.style.margin = '1em';
         div.style.padding = '1em';
         var msg = document.createElement('textarea');
         $(msg, 'message');
         msg.rows = 20;
         msg.cols = 60;
         msg.style.marginBottom = '1em';
         div.appendChild(msg);
         injection_site.parentNode.insertBefore(div, injection_site.nextSibling);
         MessageBox.preview;
         MessageBox.submit;
         MessageBox.upload;
         Signature.dom;

         // load the signature here too I guess
         Signature.load();
         return $('message');
      }

   },
   get dom() {
      if ($('spinner')) {
         return $('spinner');
      } else {
         var div = document.createElement('div');
         var container = $('container');
         div.setAttribute('style','position: absolute;text-align:center;');
         div.style.left = container.offsetLeft+'px';
         div.style.top = container.offsetTop+'px';
         div.style.width = MessageBox.msg.offsetWidth+'px';
         div.style.height = container.offsetHeight * (2/3) +'px';
         div.style.paddingTop = (container.offsetHeight/3)+'px';
         div.style.display = 'none';
         $(div,'spinner');
         div.addEventListener('click', MessageBox.hide, false);
         document.body.appendChild(div);
         return div;
      }
   },
   get preview() {
      if ($('preview')) {
         return $('preview');
      } else {
         var preview = document.createElement('input');
         $(preview, 'preview');  // set id
         preview.type = 'button';
         preview.value = 'Preview Message';
         MessageBox.action.appendChild(preview);
         return preview;
      }
   },
   get submit() {
      if ($('submit')) {
         return $('submit');
      } else {
         var submit = document.createElement('input');
         $(submit, 'submit'); // set id
         submit.type = 'button';
         submit.value = 'Post Message';
         submit.addEventListener('click',post_msg, false);
         MessageBox.action.appendChild(submit);
         return submit;
      }
   },
   get upload() {
      if ($('upload')) {
         return $('upload');
      } else {
         var upload = document.createElement('input');
         $(upload, 'upload');
         upload.type = 'button';
         upload.setAttribute('onclick', 'new upload_form($("message"), this.parentNode.parentNode, '+Page.topic+'); this.style.display = "none"');
         upload.value = 'Upload Image';
         MessageBox.action.appendChild(upload);
         return upload;
      }
   },
   get action() {
      if ($('action')) {
         return $('action');
      } else {
         var action = document.createElement('div');
         $(action, 'action');
         $('container').appendChild(action);
         return action;
      }
   }
}


MessageBox.show = function() {
   // this event listener updates the position of the message box every time a
   // new node is inserted (as in, a new post appears)
   document.addEventListener('DOMNodeInserted', MessageBox.show, false);
   MessageBox.dom.style.left = MessageBox.msg.offsetLeft+'px';
   MessageBox.dom.style.top = MessageBox.msg.offsetTop+'px';
   MessageBox.dom.style.display = 'block';
   MessageBox.msg.disabled = true;
}

MessageBox.add = function() {
   // variadic function
   var t = Array.prototype.join.call(arguments, ' ');
   var fragment = document.createElement('span');
   fragment.innerHTML = t;
   if (MessageBox.dom.style.display == 'none') {
      MessageBox.show();
   }
   MessageBox.dom.appendChild(fragment);
   MessageBox.dom.appendChild(document.createElement('br'));
}

MessageBox.hide = function () {
   MessageBox.dom.style.display = 'none';
   MessageBox.msg.disabled = false;
   // clears the timers AND THEN removes the children. this should prevent
   // the Countdown object from holding a reference to an invalid countdown id
   Countdown.clearTimers();
   while (MessageBox.dom.hasChildNodes()) {
      MessageBox.dom.removeChild(MessageBox.dom.firstChild);
   }
   document.removeEventListener('DOMNodeInserted', MessageBox.show, false);
}

function set_cursor_pos(pos) {
   MessageBox.msg.selectionStart = MessageBox.msg.selectionEnd = pos;
}

function reset_cursor_pos () {
   set_cursor_pos(0);
}


var Quote = {
};

Quote.onClick = function (e) {
   e.preventDefault();
   MessageBox.add('Loading quote...');
   XHR.get(e.target.href, Quote.onGet);
   // ctrl-key held: no scroll
   if (!e.ctrlKey) {
      scrollme($('container'));
   }
}

Quote.onGet = function (response) {
   var qt = response.doc.getElementById('message');
   // hack to work around an innerHTML "bug" with empty nonstandard tags
   // won't match balanced text but hopefully no one does anything tricky
   // with their quotes and sigs
   quote = qt.value.match(/<quote[\s\S]*\/quote>/)[0];
   MessageBox.msg.value = quote + '\n' + MessageBox.msg.value;
   set_cursor_pos(quote.length + 1)
   MessageBox.hide();
}

Quote.onLike = function (e) {
   e.preventDefault();
   MessageBox.add('Loading quote...');
   XHR.get(e.target.href, function (r) {
         Quote.onGet(r);
         var target = Page.board == '444' ? 'Human' : decodeURIComponent(e.target.href.match(/&target=(.+)&?/)[1]);
         var img = '<img src="http://i1.endoftheinter.net/i/n/0620248d4821c4a90621e41fdd7ab92e/like.png" />';
         var like = '{0}{1} likes {2}\'s post.';
         Buttons.insertTags(like.format(img,Page.username,target), '', '');
      });
   scrollme($('container'));   
}

function unentity (t) {
   // LL only seems to convert &amp; so we'll bank on that
   return t.replace(/&amp;/g, '&');
}

// we need to register mousedown, mousemove, and mouseup events to get the kind
// of interface that is expected. and it needs to apply to the entire document.

// i wonder if there is a performance hit when defining mousemove events

Quote.onUp = function (e) {
   var s = getSelection();
   var r = s.getRangeAt(0)
   if ($('quote-floater')) {

   }
   if (!s.isCollapsed && checkParentClass(r.commonAncestorContainer, 'message')) {
      console.log(s, r);
      nr = document.createRange();
      nr.setStart(s.focusNode, r.endOffset);
      nr.insertNode(Quote.createFloater());
   }
}

Quote.createFloater = function () {
         var div = document.createElement('span');
         $(div, 'quote-floater');
         div.setAttribute('style', 'margin:18px 0 0 -10px;position:absolute;background:url('+Buttons.images.quote+');width:22px;height:22px;cursor:pointer');
         return div;
}

// checks the given elements parent change to see if any of its ancestors are
// a message element.
checkParentClass = function (dom, cn) {
   if (dom.parentNode) {
      do {
         if (dom.className == cn) {
            return true;
         }
      } while (dom = dom.parentNode);
   }
   return false;
}

Quote.attachHandler = function (dom) {
   if (dom.nodeType == 3) return;  // defeat shitty opera implementation
   var links = dom.getElementsByTagName('a');
   for (var i=0;i<links.length;i++) {
      if (links[i].textContent == 'Quote' && /quote=\d+/.test(links[i].href)) {
         links[i].addEventListener('click', Quote.onClick, false);
         links[i].setAttribute('onclick', '');
         // like code here
         var like = links[i].cloneNode(false);
         var span = document.createElement('span');
         span.appendChild(like);
         like.innerHTML = 'Like';
         links[i].parentNode.appendChild(document.createTextNode(' | '));
         links[i].parentNode.appendChild(span);
         like.href += '&target=' + like.parentNode.parentNode.getElementsByTagName('a')[0].textContent;
         like.addEventListener('click', Quote.onLike, false);
      }
   }
   var msg = dom.getElementsByClassName('message');
   for (var i=0;i<msg.length;i++) {
      //msg[i].addEventListener('click', Quote.onClickMsg, false);
   }
}

Quote.onInsert = function (e) {
   Quote.attachHandler(e.target);
}

Quote.attachHandler(document);
document.addEventListener('DOMNodeInserted', Quote.onInsert, false);

// inline preview

var Preview = {
   get dom() {
      if (!$('preview-box')) {
         var container = $('container');
         var previewed = document.createElement('div');
         $(previewed,'preview-box');
         previewed.setAttribute('style','float:right; width: 40%');
         previewed.className = 'message';
         container.insertBefore(previewed, container.firstChild);
         MessageBox.preview.addEventListener('click', Preview.onClick, false);
         return previewed;
      } else {
         return $('preview-box');
      }
   }
}

Preview.onClick = function (e) {
   e.preventDefault();
   var data = {
      message: MessageBox.msg.value,
      topic: Page.topic,
      h: Page.code,
      preview: 'Preview Message'
   }
   MessageBox.add('Previewing...');
   XHR.post('http://boards.endoftheinter.net/postmsg.php', Preview.onXHR, data);
}

Preview.onXHR = function (response) {
   var em = response.doc.getElementsByTagName('em');
   var msg = response.doc.getElementsByClassName('message');
   if (!msg.length && em.length) {
      MessageBox.add('<em>Error: ',em[0].textContent,'</em>');
      MessageBox.add('<em>(click to dismiss)</em>');

   } else {
      var node = document.adoptNode(msg[0]);
      Preview.dom.innerHTML = '';
      Preview.dom.appendChild(node);
      MessageBox.hide();
   }
}

Preview.clear = function () {
   Preview.dom.innerHTML = '';
}

var Buttons = {
   get dom() {
      if ($('edit-toolbar')) {
         return $('edit-toolbar');
      } else {
         var b = document.createElement('div');
         $(b,'edit-toolbar');
         MessageBox.msg.parentNode.insertBefore(b, MessageBox.msg);
         this._createButtons();
         return b;
      }
   },
   _createButtons: function() {
      var Bi = Buttons.images;
      Buttons.add(Bi.bold, 'bold', 'Bolded text', 'Bold text', '<b>', '</b>');
      Buttons.add(Bi.italic, 'italic', 'Italicized text', 'Italic text', '<i>', '</i>');
      Buttons.add(Bi.underline, 'underline', 'Underlined text', 'Underlined text', '<u>', '</u>');
      Buttons.add(Bi.pre, 'pre', 'Monospaced (preformatted) text', 'Monospaced text', '<pre>', '</pre>');
      Buttons.add(Bi.spoiler, 'spoiler', 'Spoiler tagged text', 'Spoiler text', '<spoiler caption="spoiler">', '</spoiler>');
      Buttons.add(Bi.quote, 'quote', 'Quoted text', 'Quoted text', '<quote>\n', '\n</quote>');

      var mods = [1, 994, 869, 1555, 978, 1996, 4438, 3618, 9163, 4148, 1408, 9068, 94, 2607, 10348, 1020, 4651, 10178, 6497];

      if (mods.some(function (e) { return (e == Page.cookie('userid')) })) {
         Buttons.dom.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
         Buttons.add(Bi.mod, 'mod', 'Secret moderator messages', 'Secret message', '<mod>', '</mod>');
         Buttons.add(Bi.adm, 'adm', 'Unfiltered HTML', 'OMG wacky and zany mod hax here!!!<br /><blink>I\'m gay</blink>', '<adm>', '</adm>');
      }
   }
}

Buttons.images = {//{{{
   adm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACgklEQVQ4y6WVPU8bQRCGnzVYWIizscFXgCJqx04VpfAPwFKEEir%2BAMJ%2FwFSJUpM0uKBDZ1KmcJASWtJQJC1JYUQZIXEo2JBPjIQFOymcPd%2BXkygZaXW3s7tz77zz7pwSEVlaWmJhYQHLsri5uWGYKaWG%2BkdGRuh2u2xtbbG3twciIpubm%2FKvprUWrbU339jYEEBGAcbGxgA8tFprAEQErTUiEjvMmjmTy%2BVIpVIAjPoDmmBmo3n3B%2FPvM9T4P359fT0IbBD6NxgL%2BwzS8JpSKrCWCKceHuMfXzAxMYFlWViWRTqd5uVxJpJFeJ7wp%2B9fTKV%2B8PbJOKpU7UN3WrSc%2Fmu1pMhuuwGuDfoAYn9g8zxo2FTqA0k55SLFsjNwVEus7esI77%2BlYrz7judVv1JrzNmAPUfN561XnvGBfEQhscUDoH1EoSV8u%2FXdR88XPstdHp%2Bd8UiE6WnhzarNUXudO1NB2UWoMNY5OaRaUmQyTY4zmUA2ANOnr1GqT9XhSSdARaB4fsRaa%2FIzBUMkJaXYdie9Q1OfXg0KChRm8gHZBRBHzM9lbZfFIuj9NZ6%2BFzr2oqcOcCgXGS43%2F1XWWvM1eY%2FlX4ed5XnyBw3sSp16xWannffUUdtdZNJ1I9fcK16c3IorbXYPd5ihEUi9Wlplrr2M47S4f7sXaQFmPhqWm3menyeYXy%2FTUKUQT3UqdoGWrIDrRooWkFscYhGh07F5eHrKg5irjutGGpXW2qM1omPTTP40hvWWAMdxLXNYJwsHDNOYSCQGgS8vLwHIZrN%2FhTTuwyJCOp3m6upqELjZbDI7O4tlWfR6PeKyMBTF%2BUSEZDLJxcUFzWazvyYiMuwn%2BT%2F2E4a07WPJ1%2BNWAAAAAElFTkSuQmCC',
   bold: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAAC7ElEQVQ4y52VT0szVxTGf3NnyESrGbUoBougEt%2BFIooYcCFxUxBEofgN%2Bj267t6VKxfdqQhdCYKgUBAXAd24EBcKbUIqSMB0JuTO%2FdPNO2mcTLp4DwzMvffMuc95znPOOAAHBwc%2F7%2B7u%2FlooFPJKKcUAcxwnc18IgRBChGHoHB8f%2F3Zzc%2FMLAEdHR1X7jWaMscaY7vrw8PAf4CcPwPd9H0BrDYAxBgBrLcYYrLWZT3KWfDMxMUE%2Bn88B33tfA%2BokrV7H5L03WK9fQk3v5UopAxivF2GvQ2LpvQRp%2BsxxnE9nXi%2FK3hQ%2FPj5otVpIKbHW4vs%2BWmuiKMLzPKanp3Fdd2BWmYGVUtRqNe7u7nh5ecFxHDY2NvA8j%2Fv7e1qtFuVymc3NTUZGRj4FTVgV6WIBuK7LwsICs7OzdDodfN9nZWWF7e1ttra2iKKIs7Mzrq%2Bv%2B3gfSEW6MFprjDG4rovjOORyuS6f7%2B%2FvmcXuQ2yM6TporVFKEccxnU6HKIoIw5BqtUqtVmN0dJTFxcVM2XURJ4u05JLgzWaTarVKs9nk9vYWKSWVSoW1tbU%2BKj4Vrxdx4qC1Jo5jpJQMDQ1RKpUYGxsjl8txcXHB%2Bfk5Qgh2dnYypSiyej9xVEohpURrTRAEFItF9vf3mZubo9FocHl5ydPTU6bcRLqVE76MMV3EUkriOMYYQz6fJwgCpJS8vb1Rr9f72vx%2FVZGIv91udy%2B21lKv13l9fSWKIoIgoFQq9c2UgYGllDw%2BPvL8%2FIwQgna7zdXVFZOTkzw8PNBoNKhUKuzt7VEsFvvGwMDAAMPDw5TLZVZXV1FK4bouQgiWlpZYX19neXmZqampvkmYZOelOXYcp9t58%2FPzA0dmeghlcux8bbO0yLMmWVoB6XEghPgvcBiGAmB8fHwgwjTS9MXWWgqFAlJKAQgP4PT09PeZmZkvhULBlVKaLE0n8yFrz1qL53mEYeidnJz8Bfyd%2FB2%2FA34EfgA0324u8Cfwx7%2BVZRmnW%2FQjsAAAAABJRU5ErkJggg%3D%3D',
   italic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAAChklEQVQ4y52VsU4jMRCGPzurkOVggZwSCUhBFxShlIgXOFFQnahoKO49rr6eioriOqjuBRCgE6I5KQUVVEgXIUWELWAdBctrX8PmzGaXgpEsj72%2Fx%2BOZf2YFwO7u7rednZ0fURTVjDGGEhFCFO5LKZFSSqWUODo6%2Bnl%2Bfv4dgMPDwz%2Fug2Ktddbayfrg4CABvgYAMzMzMwBpmgJgrQXAOYe1Fudc4ci%2BZWfq9Tq1Wq0KfA5eDabZs3xgpvvGfFwWGv9yY4wFbOB76AMy0Vrz%2BPjI8%2FMzxpjJWF5eZnFxcYIXQkxeARD4XuY9e%2FWA29tbTk9PieMYKSWNRoPt7W0WFhZKz8oyw9ZarLVUq1U6nQ5SSowxdLtd9vf3WV9fn8I65yZ5CvLJ8udMHw6HxHFMkiR0u10ajUYptjQU%2BXk0GtHr9Xh6emJlZYV6vV6YYF%2BfhMJPXgbIdKUUvV6PJElot9vMz89P0TB%2FwZThPOUAHh4euLu7Yzwe0%2Bl0mJ2dncqJfy5bT9HNB4xGI66vr3l5eaHZbNJsNqeSnGfRG4%2FzkgHjOOby8hLnHBsbG4RhSBGLiugWlJWyc477%2B3tubm4QQrC1tcXc3Fxhiftn3mVFkiT0%2B32urq7QWiOEQCnFeDymWq0WGs5XbaHhwWDAxcUFw%2BGQzc1NtNacnZ2xtrb2hsNFScuk0HCr1WJvb480TZFSYq3FGEMYhqXczcLwpvL8GAshqFQqhGFY2i6LElYYY%2FHa%2F%2FIk94FlbTTfDqSU%2Fw0rpSTA0tLSu16%2Bd7FzjiiK0FpLQAYAJycnv1ZXV9tRFFW01raI01m%2FLdpzzhEEAUqp4Pj4uA8Msr%2FjJ%2BAL0AJSPi4V4C%2Fw%2Bx%2BNdi1yEob21wAAAABJRU5ErkJggg%3D%3D',
   mod: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB30lEQVQ4y52VvYrbQBSFv5FkW0uQ8c92Ttr4LdKlcpXCTbJV3iN1YFlCcOfCTUpVeYJgWNKlTV4gCyE2MRhkg43n3jSSrD%2FL670wSJrRnDn33DMzRlUZj8fvR6PRxyAIfGvtgRNhjDnZ77qus9lszGw2%2BzKfzz%2Bgqkyn0x%2F6xBARFZH0ezKZRMAbD6DVarUArLUAiAgAqoqIoKqVLRlL5vR6PXzfbwJ9Jwa0SVqqCr9mNJpN3J%2FHBZKW%2Fc8YgzEmN344HAQQL8swZSdH%2FfyrK2rj83f%2B3QzTBRIsr5i6qqJoQotNFFXKkyVSlZWXpp8bjHFr9K3TvRI4%2BwQIgqBeik%2F3LG6GpWxKUuSAVVmv11TVIVeTgkNKwKUFLpQii%2BEVU4%2BJptHpdOqluJvz590wV6OzjFFhtVo9umDZd6eKRGq3ms1RZFhpt%2FJWjgGspd%2B%2Frpfi9hsPb19ebrflcvlo%2F57U%2BAhMZdrFvqJc2ahmfP0CC6jKWWtl54pIKmvJFcYYtPeK1WJx1rNntzRgsowvOXCKMjqOcwTebrcOQLfbvWh3FYHb7Ta73c4BHA8gDMOvg8FgGASBu9%2FvpViY5F4r1iJ7yDcaDaIo8sIwfAD%2BmvgmeAa8Bp4DlqeHC%2FwG7v8D5%2BYG6k4HfUYAAAAASUVORK5CYII%3D',
   pre: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACaElEQVQ4y6WVTWgTQRTHf7vZmlCztZtoA41HMYLnQj20giiIPUiRehAt4sGDB0UQKq1Rq4JHIYiSQ6VaRAwUPXj0I9WT6NV%2BiDfrwRIrlLTQkn3jpRM3091Q64NhZ9%2FMvM%2F%2Ff8ZSSjEwMHCur6%2Fvruu6Cd%2F3a0SIZVmR%2BlgsZi8vL1tjY2NPyuVyHqUUxWLxs9qiiIgSkfp%2FoVCoAv0OQDwejwP4vg%2BAiACglEJEUEqFDr2mz6RSKRKJxDYg7awb9HVawY16HjQW3KdLE3Req9UEECcYYXCDFlOnIzXXLMtqWHPM1E0jwXmYLiorJ%2BzQ%2FwwdpG0aDn6b6aL0kaVolrbZ1Kh5PeJgMx61tjI0NEQymcR1r%2FK2opDpcTzPY3h4mHQ6zc6JGUSEcr6DTCZDJjPBbMDBhhoDnP10n2SX4uPSEvumx9nxaobfg4N8nZxl7%2BvDVCq3ERF%2BTeU5WdSnrvDs%2FVG6j3uNzQtGjCgodJETQZQCTQTg3qneesqi4PzzL9zs8UKhaIeS%2F2I37e3teAfmmDyWo1K%2BRu7EQy737KKjI89URZHuHeXQm%2F10dnaSzWZ5OhcCtwYqK%2BHCi2%2FcOZha965QvbdYWBg1YKXoufGD%2BeuNjY6E2%2BPuSzzo38PIu8o%2FYdtk6Aa4nVlc5HQE40xsh%2BFai9MMv81G2EUlIvWybkCFvkw2Y7gZpR39CJjsirrJTIMma23b%2Fmt4ZWXFBvA8b9MlMB0rpWhra2N1ddUGbAegVCq9zGazOdd1Y2tra2I2Rr9rZi%2BCZWtpaaFarTqlUmke%2BGmtX9LbgSPAbsBn6xIDvgMf%2FgDpHEJyEUDo8wAAAABJRU5ErkJggg%3D%3D',
   quote: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACUklEQVQ4y52UQWgTQRSGv91sTUS3kGwJQvTa9KI3b1K8WISIINKD4smDBWsvCgqiB8HqpYgEpPQQWooX46UoeKol0qPelKYeBEFRaiMUmhZasvM8NBMns7u19sHA7nvz3vzvn%2F%2BNIyIMDw9fLZVKj33fz4Rh2CLBHMdJ9KdSKXdjY8OpVCqztVrtPiLC1NTUB9mnKaVEKdX5L5fLTeCCB5BOp9MAYRgCoJQCQERQSiEisUvHdE4ulyOTyRwAAq9dMNRtmRv1t1nM3KepMQ9vtVoKUJ6J0NygzfZppHbMcZyumGu3vrNWmb%2Bd4eD0EiJCfeYw%2FsxSIiVxXXlm%2BzqwNH2Mc%2BUxXn0t0li4w8kbo8x9GdiVb5P3DmKzMI23zFwHxoY40Vfn9flnMDrE8aCb364cw59Mhd5VPELQ%2BMnyTqRdrMHC3SxBcI93v6E%2B20c%2Bn%2Bf5crdCOlSYl0H2NI%2FW1xkXQUk%2F42trPNRtimqn9ZPPqjaIEQpBt%2BwiVNiSi%2FDf%2BMj8JIy8PEuRz7y%2FCUxcYjAXpSiK2Lphc9XfXGTyySIrgzlWa0%2B5de0Fny73RwaqU9g2G7FeA1dW%2BdVODgYf8OOU2l1ucaNsnv4vicXlRHQcJ6e9FLYn1LORJuk07kLjdN0ltyTEe0VpXpymNaIK%2FZj8D69xI61V4dhPZtJLZhe0aXRd92%2Fhzc1NFyCbze6ZAvtgEaG3t5etrS0XcD2AarU6VygUir7vp7a3t1WcpjVFcT4Roaenh2az6VWr1e%2FAitN%2BpA8BZ4CjQMj%2BLQV8Axb%2FAAWASr8Fmse%2BAAAAAElFTkSuQmCC',
   spoiler: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAABuUlEQVQ4y6WVTY7aQBCFv4bhx8qYYAtpJsORWHMxdiy4gE%2FBYQZHkT0LJEACQVUWpE273TZR0lJLtst%2B9erV67JRVV0ulywWC%2BI45na70baMMa3P%2B%2F0%2Bx%2BORzWbDdrsFVdX1eq3%2FukRERaS6X61WCugLwGg0AqjYiggAqoqIoKrBbWP2mzRNGY%2FHAPRcQAsGMBgOGf5J6IK5702ThCRNa%2FHr9foAtgxFpNp2jaOoBmqZfp9Oa0mMMVUM4MUv3W4DWH7fXl9x26bO9VdZBqvqueXbQBRF924HwFxQA8xms6pKl3EDuGGlFqYh43VKEfTpE1DfIQ1gt2m0MLX3Lrhvu4YUz0BNRzK3R6122%2B%2F3raA%2BeJ7ntUNU0ziY2bNU4TT4lwhv7%2B8A%2FPj4IN%2FtwnZzj7LfBOOU6MZ%2F5nlDggZj3272gAAURdE6K3afn%2FdvvJnS0NgvpyzLoMf9ZvtzpJNxURSdk823mZXBytrwsR0mz7ZfYacrfJO7L%2FrsfKBK217vAXw6nQBIkuSvmIYSqyqTyYTz%2BfwAzrKM%2BXxOHMdcLhdCVViJQs9UlcFgwOFwIMuye0xVte0n%2BT%2FrN%2FEjqtwGjLDtAAAAAElFTkSuQmCC',
   underline: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACDklEQVQ4y52Uv4sTQRTHP7vZmEDckERME1svvVh6pVUqkRT%2BqAT%2FAUshoJXNFZJGUgR%2FgM1WVlbCBa69QhA8rVWIxjIJJGTfs7hMbnZ21oN7MOzMm9nvvO%2F3vXmBqtLv9x%2F1er0XcRxX0zTdUGBBEBT6S6VSuFgsgvF4%2FG4ymQxQVUaj0bFe0ERERWS3Hg6Hc%2BBOBFCpVCoAaZoCICIAqCoigqp6h9kz%2F7RaLarV6iXgSrQFTA0t%2B6CZ22D2OSONfflmsxFAIjtC%2B4Ax12cidfeCIMjshS717PjK61qNy29OLN%2BMw6cNGo23nDgX2gFENv08sKAA6uh8erpQ913ENrD9tS2rb5H%2FDDhypcgx2CLZSd0BOVVhX5JLXlYSyQBnpciXoY0R%2BqgXSbFjInmfuz4nYvUkT7zJczUOfW8%2FF%2FH3KX%2FPY%2BFcErpP2SRBREjT69x8Cby6y8dvpz6ZfeHTCDi4wd5%2Fyi0qrIbtvPtgxpFcZX%2B%2FzRMT6sEhv%2B7t5ZJWqLEPWFXpPvzD9L7kdPRJkim3oohVlUG7zcjbhR%2Fz%2FvOAW81s4oysuaowzcSM59MpzzxauvS9GgOB2zKLOpnLyJUxDMMz4OVyGQI0m83Cpu57XS5wvV5ntVqFQBgBJEnyodPpdOM4Lq3Xa%2FHVtJHI51NVyuUy8%2Fk8SpLkJ%2FA72DbpGnAbuAakXNxKwA%2Fg6B8mHSSOtqeYhAAAAABJRU5ErkJggg%3D%3D',
};//}}}

Buttons.instances = {};

Buttons.add = function (img, id, title, sample, start, end) {
   var button = document.createElement('img');
   button.style.cursor = 'pointer';
   button.src = img;
   $(button, 'button-' + id);
   button.title = title;
   button.alt = id;
   button.addEventListener('click', Buttons.onClick, false);
   Buttons.instances[id] = {
      dom: button,
      sample: sample,
      start: start,
      end: end,
      title: title,
      img: img
   }
   Buttons.dom.appendChild(button);
}

Buttons.onClick = function (e) {
   e.preventDefault();
   if (MessageBox.msg.disabled) return;
   var id = Buttons.instances[e.target.alt]
   Buttons.insertTags(id.start, id.end, id.sample);
}

Buttons.insertTags = function (tagOpen, tagClose, sampleText) {
   var txtarea;
   if (MessageBox.msg) {
      txtarea = MessageBox.msg;
   } else {
      // some alternate form? take the first one we can find
      var areas = document.getElementsByTagName('textarea');
      txtarea = areas[0];
   }
   var selText, isSample = false;

   if (document.selection  && document.selection.createRange) { // IE/Opera

      //save window scroll position
      if (document.documentElement && document.documentElement.scrollTop)
         var winScroll = document.documentElement.scrollTop
      else if (document.body)
      var winScroll = document.body.scrollTop;
      //get current selection
      txtarea.focus();
      var range = document.selection.createRange();
      selText = range.text;
      //insert tags
      checkSelectedText();
      range.text = tagOpen + selText + tagClose;
      //mark sample text as selected
      if (isSample && range.moveStart) {
         if (window.opera)
            tagClose = tagClose.replace(/\n/g,'');
         range.moveStart('character', - tagClose.length - selText.length);
         range.moveEnd('character', - tagClose.length);
      }
      range.select();
      //restore window scroll position
      if (document.documentElement && document.documentElement.scrollTop)
         document.documentElement.scrollTop = winScroll
      else if (document.body)
      document.body.scrollTop = winScroll;

   } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla

      //save textarea scroll position
      var textScroll = txtarea.scrollTop;
      //get current selection
      txtarea.focus();
      var startPos = txtarea.selectionStart;
      var endPos = txtarea.selectionEnd;
      selText = txtarea.value.substring(startPos, endPos);
      // pretend that we actually selected text
      if (!selText) {
         selText = sampleText;
      }
      // clean up trailing whitespace
      // we have to capture here otherwise it only matches one space
      var regex = /(\s*)$/;
      var trailing = selText.match(regex)[1];
      if (trailing.length) {
         // remove trailing whitespace from what we think is the selection
         selText = selText.replace(regex, '');
         // and move our end position back
         endPos -= trailing.length;
      }
      // insert our tags
      // use join here b/c this is inefficient for large strings
      txtarea.value = [txtarea.value.substring(0, startPos),
      tagOpen, selText, tagClose, txtarea.value.substring(endPos)].join('');
      //set new selection
         txtarea.selectionStart = startPos + tagOpen.length;
         txtarea.selectionEnd = txtarea.selectionStart + selText.length;
      //restore textarea scroll position
      txtarea.scrollTop = textScroll;
   }

   // leave in for Opera compat
   function checkSelectedText() {
      if (!selText) {
         selText = sampleText;
         isSample = true;
      } else if (selText.match(/\s+$/)) { // exclude all trailing whitespace
         var t;
         [selText, t] = selText.match(/(.*?)(\s+)$/).slice(1,3);
         tagClose += t;
      }
   }
}

// check for compatability
if (!document.getElementsByClassName) {
   var e = document.createElement('e');
   e.innerHTML = '<em>Quickpost requires Firefox 3.</em>';
   document.getElementsByTagName('body')[0].appendChild(e);
} else if (!GM_listValues) {
   var e = document.createElement('e');
   e.innerHTML = '<em>Quickpost requires Greasemonkey 0.8.20090123.1.</em>';
   document.getElementsByTagName('body')[0].appendChild(e);
} else {
   if (!Page.closed(document)) {
      // initialize the script
      LastFM.dom;
      Preview.dom;
      Update.check();
   }
}
