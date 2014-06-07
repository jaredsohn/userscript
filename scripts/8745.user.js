// ==UserScript==
// @name          masuda_tree
// @namespace     http://zeromemory.sblo.jp/article/3137038.html
// @description   make tree for trackback of anonymaous diary.
// @include       http://anond.hatelabo.jp/*
// @version       0.3.0
// Copyright (c) 2007 suVene All rights reserved.
// freely distributable under the terms of an MIT-style license.
// http://www.opensource.jp/licenses/mit-license.html
// ==/UserScript==

(function() {

  var trackbackExprRoot = '//div[@class="refererlist"]/ul';
  var anonyUrlExpr = new RegExp('^http://anond\.hatelabo\.jp/[0-9]{9,}');
  var $break = new Object();
  var counter = 0;
  var firefox = false;
  var w = window;
  if (typeof unsafeWindow != 'undefined') { firefox = true; w = unsafeWindow; }
  if (!location.href.match(anonyUrlExpr)) { return; }

  function debug(arguments) { try { w.console.log(arguments); } catch(e) {} }
  function error(arguments) { try { w.console.error(arguments); } catch(e) {} }

  Function.prototype.bind = function() {
    var __method = this, args = $A(arguments), object = args.shift();
    return function() {
      return __method.apply(object, args.concat($A(arguments)));
    }
  }

  function $A(iterable) {
    if (!iterable) return [];
    if (iterable.toArray) {
      return iterable.toArray();
    } else {
      var results = [];
      for (var i = 0; i < iterable.length; i++)
        results.push(iterable[i]);
      return results;
    }
  }

  function createAafterIcon(a) {
    try {
      var buf = a.href;
      a.href = a.href.replace(/^http:\/\/b.hatena.ne.jp\/entry\//, '');
      w.BookmarkCommentViewer.createAafterIcon(a);
      a.href = buf;
    } catch(e) { error(e); }
  }

  function $X(context, expr) {
    try {
      return document.evaluate(expr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    } catch(e) { error(e); throw e; }
  }

  function $XEach(context, expr, func) {
    var r = $X(context, expr);
    for (var i = 0; i < r.snapshotLength; i++) try { func(r.snapshotItem(i)) } catch(e) { if (e != $break) { throw e } };
  }

  var AnonyDiary = function() { this.init.apply(this, arguments); };

  AnonyDiary.prototype.init = function(contextNode, pageUrl) {
    this.isRoot = (contextNode == document) ? true : false;
    this.contextNode = contextNode;
    this.pageUrl = pageUrl;
  }

  AnonyDiary.prototype.load = function(url, id) {
    GM_xmlhttpRequest({
      method : 'GET',
      url : url,
      onload : this.loadHandler.bind(this, id)
    });
  }

  AnonyDiary.prototype.loadHandler = function(body, res) {
    debug('loadHandler:' + this);
    var r = res.responseText;
    // if (r.match(/(<div class="day">(\n|\r|.)*)<\/div>(?:(\n|\r|.)*?)<\/div>(?:(\n|\r|.)*?)<div id="footer">/)) {
    // if (r.match(/<\/h3>((\n|\r|.)*<p class="sectionfooter">(?:(\n|\r|.)*?)<\/p>)/)) {
    if (r.match(/<\/h3>((\n|\r|.)*)<p class="sectionfooter">/)) {
      var text = RegExp.$1;
      body.innerHTML = text;
    }
  }

  AnonyDiary.prototype.discoveryTrackback = function() {
    debug('discoveryTrackback:');
    var trackback = $X(this.contextNode, trackbackExprRoot).snapshotItem(0);
    if (!trackback) { return; }
    $XEach(trackback, 'li', function(item) {
      var a = $X(item, "a").snapshotItem(0);
      var bicon = $X(item, "a").snapshotItem(1);

      if (a != null && a.getAttribute("href").match(anonyUrlExpr)) {
        var body = $X(item, "div[@class='box-curve']/p").snapshotItem(0);
        if (!body) { throw $break }

        debug(body);
        body.innerHTML = '';
        body.id = "body_" + counter++;
        createAafterIcon(bicon);

        setTimeout(function() {
          this.load(a.getAttribute("href"), body)
        }.bind(this), 10);
      }
    }.bind(this));
    this.isDicovery = true;
  }

  w.anonyDiary = new AnonyDiary(document, location.href);
  w.anonyDiary.discoveryTrackback();

})();
