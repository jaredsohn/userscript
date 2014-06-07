// ==UserScript==
// @name           Google+ Lens
// @namespace      http://excu.se/greasemonkey
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
// ==/UserScript==

var gpluslens = function() {
  var indicator = "data:image/gif;base64,"+
            "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"+
            "OwAAAAAAAAAAAA==";
  function show(node,style) { node.style.display = style?style:'block'; }
  function hide(node) { node.style.display = 'none'; }
  function apply(set, update) { for (var s in update) set[s] = update[s]; }

  var frame = {
    x: 20, y: 20,
    loading: false,
    move: function(x,y) {
      this.x = x; this.y = y;
      this.shift();
    },
    shift: function() {
      var node = this.div
      var w = this.loading ? 64 : node.offsetWidth;
      var h = this.loading ? 64 : node.offsetHeight;
      var left = this.x+10;
      var top = this.y-h/2;
      if (left < 20) left = 20;
      else if (left+w > window.innerWidth-20) {
        if (this.x-w > 10) left = this.x - w - 10;
      }
      if (top < 20) top = 20;
      else if (top+h > window.innerHeight-20)
        top = window.innerHeight-20-h;

      apply(node.style, {left: left+'px', top: top+'px'});
    },
    load: function(src, title) {
      hide(frame.img);
      hide(frame.title);
      if (title) frame.title.innerHTML = title;
      else frame.title.innerHTML = "";
      this.loading = true;

      frame.img.src = src;
      apply (frame.div.style, {
        background: 'url('+indicator+') white no-repeat 50% 50%',
        height: '64px', width: '64px',
        minHeight: ''
      });

      show(frame.div);
    },
    onload: function() {
      apply (this.div.style, {
        background: 'white',
        minHeight: this.img.height+'px',
        height: '', width: this.img.width+'px'
      });
      this.loading = false;
      show(this.img);
      if (this.title.innerHTML)
        show(this.title);
      else
        hide(this.title);
      this.shift();
    }
  }
  function process() {
    if (! frame.div) {
      createlensframe(frame);
      frame.shift();
    }

    xpathmap (function (node) {
      var src = node.src.replace(/\bsz=[0-9]+/,'sz=200');
      tag (node, src, node.parentNode.title);
      node.parentNode.title = '';
    }, "//a/img[contains(@src,'photo.jpg')]");
    xpathmap (function (node) {
      var src = node.src.replace(/\bsz=[0-9]+/,'sz=200');
      tag (node, src, node.alt);
    }, "//img[contains(@src,'photo.jpg')]");
    xpathmap (function (node) {
      var src = node.src;
      var title = null;
      var proxy = src.match(/proxy\?url=([^&]*)/)
      if (proxy) {
        src = decodeURI(proxy[1]);
      } else {
        var tail = node.src.match(/\/[^\/]*$/);
        src = src.replace(/\/[wh][0-9]+\/[^\/]*$/,'/'+tail[0]);
        title = node.alt;
      }
      tag (node, src, title);
    }, "//div[contains(@data-content-type,'image/')]/img");
  }

  function tag(node, src, title) {
    if (node.lensTag)
      return;
    else
      node.lensTag = true;

    var x,y;
    var timer;
    var cancel = function(e) {
      window.clearTimeout (timer);
      hide(frame.div);
    }
    node.addEventListener ('mouseover', function(e) {
      x = e.clientX; y = e.clientY;
      timer = window.setTimeout (function () {
        frame.load (src, title);
        frame.move (x, y);
      }, 500);
    }, true);
    node.addEventListener ('mousemove', function(e) {
      frame.move (x = e.clientX, y = e.clientY);
    }, true);
    node.addEventListener ('click', cancel, true);
    node.addEventListener ('mouseout', cancel, true);
  }

  function xpathmap(fn, xpath) {
      var obj = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                              null);
      for (var i=0; i < obj.snapshotLength; i++){
        fn (obj.snapshotItem(i));
      }
  }

  function createlensframe(display) {
    var div = display.div = document.createElement('div');
    var img = display.img = document.createElement('img');
    var title = display.title = document.createElement('div');
    div.appendChild (img);
    div.appendChild (title);

    apply (div.style, {
      position: 'fixed', zIndex: 1203,
      top: '20px', left: '20px',
      border: '1px solid #d2d2d2',
      padding: '5px', display: 'none'
    });
    apply (title.style, {
      borderTop: '1px solid #d2d2d2',
      paddingTop: '5px', marginTop: '5px',
      textAlign: 'center'
    });

    img.addEventListener ('load', function() { frame.onload(); }, true);
    div.addEventListener ('mouseover', function() { hide (frame.div); }, true);

    document.body.appendChild(div);
  }

  function domlistener() {
    var ename = 'DOMSubtreeModified';
    var content = document.getElementById('content')
    content.removeEventListener(ename, domlistener, false);
    // add grace period to allow multiple changes before reacting.
    setTimeout (function() {
      process();
      content.addEventListener(ename, domlistener, false);
    }, 500);
  }

  var poller = setInterval (function() {
    // check periodically until 'content' div appears, which we'll use
    // for dom notifications.
    if (document.getElementById('content')) {
      clearInterval (poller);
      domlistener();
    }
  }, 500);
}();
