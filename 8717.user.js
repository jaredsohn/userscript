// ==UserScript==
// @name          hatenab_with_twitter
// @namespace     http://zeromemory.sblo.jp/article/3751243.html
// @description   hatena bookmark with twitter.
// @include       http://b.hatena.ne.jp/add*
// @version       0.1.3
// Copyright (c) 2007 suVene All rights reserved.
// freely distributable under the terms of an MIT-style license.
// http://www.opensource.jp/licenses/mit-license.html
// ==/UserScript==

(function() {

  // --- user customize start ---
  var useTinyURL = true;
  // --- user customize end   ---

  var w = window;
  if (typeof unsafeWindow != 'undefined') { w = unsafeWindow; }
  function debug(arguments) { try{ w.console.log(arguments); } catch(e) {} }
  function error(arguments) { try{ w.console.error(arguments); } catch(e) {} }

  var f = document.getElementById('edit_form');
  var u = document.getElementsByName('url')[0];
  var t = document.getElementsByName('title')[0];
  var c = document.getElementById('comment');
  var submits = [];
  Array.forEach(f.getElementsByTagName('input'), function(e) { if (e.type == 'submit') { submits.push(e); } });

  if (!(f && u && t && c && (submits.length > 0))) { return; }


  var Twitter = function(){ this.init.apply(this, arguments); };

  Twitter.prototype.init = function(url, title, comment, handlers) {
    var self = this;

    this.url = url;
    this.title = title;
    this.comment = comment;
    this.handlers = handlers;

    this.handlers.forEach(function(s) { s.addEventListener('click', function() { self.post(); }, false) });

    this.insertPoint = this.getInitInsertPoint();
    this.chk = document.createElement('input');
    this.chk.type = 'checkbox';
    this.chk.checked = GM_getValue('hatenab_with_twitter_checked') || false;
    this.chk.addEventListener('click', function() { GM_setValue('hatenab_with_twitter_checked', (self.chk.checked ? true : false)); }, false);
    this.appendComponent(this.chk);
    this.appendComponent(document.createTextNode('with twitter?'));

  };

  Twitter.prototype.getInitInsertPoint = function() {
    return this.handlers[this.handlers.length-1]
  }

  Twitter.prototype.appendComponent = function(el) {
    this.insertPoint.parentNode.insertBefore(el, this.insertPoint.nextSibling);
    this.insertPoint = el;
  }

  Twitter.prototype.post = function() {
    if (!this.chk.checked) { return; }
    var message = 'Bookmarking : ' + this.comment.value + ' - ' + this.url + ' - "' + this.title.value + '"';

    GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://twitter.com/statuses/update.json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Twitter-Client': 'HatenaB with twitter',
        'X-Twitter-Client-Version': '0.1.2',
        'X-Twitter-Client-URL': 'http://zeromemory.info/gm_scripts/hatenab_with_twitter.xml'
      },
      data: 'status=' + encodeURIComponent(message)
    });
  };


  if (useTinyURL) {
    w.tinyurlHatenaBwithTwitterCallback = function(url) {
      new Twitter(url, t, c, submits);
    };
    var s = document.createElement('script');
    s.setAttribute('src', 'http://remysharp.com/tinyurlapi?callback=tinyurlHatenaBwithTwitterCallback&url=' + u.value);
    document.body.appendChild(s);
  } else {
      new Twitter(u.value, t, c, submits);
  }

})();
