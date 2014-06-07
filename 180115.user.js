// ==UserScript==
// @name       Snobisthmus
// @namespace  http://scihuman.com/snobisthmus/
// @version    0.10
// @description Comments for Snob.ru now splendid. It's what you wished for and more!
// @updateUrl  https://s3.amazonaws.com/www.scientifichumanities.com/snobisthmus/Snobisthmus.tamper.js
// @downloadUrl  https://s3.amazonaws.com/www.scientifichumanities.com/snobisthmus/Snobisthmus.tamper.js
// @match      http://*.snob.ru/*/blog/*
// @copyright  2012+, scihuman.com, licenced under MIT licence: http://opensource.org/licenses/MIT
// @require    http://code.jquery.com/jquery-2.0.3.js
// @require    https://raw.github.com/DmitryBaranovskiy/raphael/50a7f8d55d266d144ae0f60c3eaf3fd2ae8fe3ac/raphael-min.js
//
// ==/UserScript==
// @run-at document-start

this.$ = this.jQuery = jQuery.noConflict(true);(function() {
  var $, Branch, Discussion, connect, delay, empty, exp, getOffset, isNum, po, type,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  $ = jQuery;

  type = function(obj) {
    return Object.prototype.toString.apply(obj).toLocaleLowerCase().replace(/\[|\]|object/g, '');
  };

  delay = function(ms, fn) {
    return setTimeout(fn, ms);
  };

  empty = function(o) {
    var i;
    switch (type(o)) {
      case "array":
      case "string":
        return o.length === 0;
      case 'object':
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = o.length; _i < _len; _i++) {
            i = o[_i];
            _results.push(0);
          }
          return _results;
        })()).length === 0;
      default:
        return true;
    }
  };

  isNum = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  Discussion = (function() {
    function Discussion(el, id) {
      var _ref, _ref1, _ref2;
      this.el = el != null ? el : null;
      this.id = id != null ? id : null;
      this.find = __bind(this.find, this);
      this.map = __bind(this.map, this);
      this.comments = [];
      if (this.el != null) {
        this.el = $(this.el);
        if (this.id == null) {
          this.id = this.el.attr('id');
        }
        this.parentId = ((_ref = this.el.find('.goToComment').first()) != null ? (_ref1 = _ref.attr('href')) != null ? (_ref2 = _ref1.split('/')) != null ? _ref2.pop() : void 0 : void 0 : void 0) || null;
      } else {
        this.parentId = null;
      }
    }

    Discussion.prototype.map = function(fn) {
      var comment, _i, _len, _ref, _results;
      _ref = this.comments;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        comment = _ref[_i];
        _results.push(fn(comment));
      }
      return _results;
    };

    Discussion.prototype.find = function(id) {
      var comment, x, _i, _len, _ref;
      if (this.id === id) {
        return this;
      } else {
        _ref = this.comments;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          comment = _ref[_i];
          if ((x = comment.find(id)) != null) {
            return x;
          }
        }
      }
      return null;
    };

    Discussion.prototype.isParentOf = function(comment) {
      return comment.parentId === this.id;
    };

    Discussion.prototype.add = function(comment) {
      var _ref;
      if ((_ref = this.find(comment.parentId)) != null) {
        _ref.append(comment);
      }
      return void 0;
    };

    Discussion.prototype.append = function(comment) {
      return this.comments.push(comment);
    };

    return Discussion;

  })();

  Branch = (function() {
    function Branch(discussion, template, el, align, connections) {
      var comment, i, len, te, _ref, _ref1;
      this.template = template != null ? template : '<div/>';
      this.el = el != null ? el : null;
      if (align == null) {
        align = 'middle';
      }
      if (connections == null) {
        connections = null;
      }
      if (this.el == null) {
        this.el = this.newEl('branch');
      }
      if (discussion.el != null) {
        this.el.append(discussion.el);
      }
      if (discussion != null) {
        if ((_ref = discussion.el) != null) {
          _ref.addClass('snobisthmus-align-' + align);
        }
      }
      if (connections == null) {
        connections = this.connections = [];
      }
      len = discussion.comments.length;
      this._endOfBlock = len !== 1;
      this._block = this._endOfBlock ? this.newBlock() : this.el;
      te = function(el) {
        return el.find('.text-comment');
      };
      _ref1 = discussion.comments;
      for (i in _ref1) {
        comment = _ref1[i];
        if (!isNum(i)) {
          continue;
        }
        if (discussion.el != null) {
          connections.push([te(discussion.el), te(comment.el)]);
        }
        this.append(new Branch(comment, this.template, (!this._endOfBlock ? this._block : void 0), this.alignFromIndex(i, len), connections));
      }
    }

    Branch.prototype.alignFromIndex = function(i, len) {
      switch (false) {
        case i !== len - 1:
          return 'top';
        case i !== 0:
          return 'bottom';
        default:
          return 'middle';
      }
    };

    Branch.prototype.append = function(branch) {
      if (this._block !== branch.el) {
        return this._block.append(branch.el);
      }
    };

    Branch.prototype.newBlock = function() {
      return this.newEl('tuft').appendTo(this.el);
    };

    Branch.prototype.newEl = function(className) {
      return $(this.template, {
        "class": ['snobisthmus', className].join('-')
      });
    };

    Branch.prototype.metaBlock = function() {
      return this._metaBlock != null ? this._metaBlock : this._metaBlock = newBlock();
    };

    return Branch;

  })();

  getOffset = function(el, origPos, scale) {
    var h, left, p, top, w;
    p = el.offset();
    w = parseInt(el.outerWidth() * scale);
    h = parseInt(el.outerHeight() * scale);
    top = parseInt(p.top - origPos.top);
    left = parseInt(p.left - origPos.left);
    return {
      top: top,
      left: left,
      midH: top + h / 2,
      rightSide: left + w,
      width: w,
      height: h
    };
  };

  po = function() {
    var k, l, o, os, v, _i, _len;
    os = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    l = "";
    for (_i = 0, _len = os.length; _i < _len; _i++) {
      o = os[_i];
      for (k in o) {
        v = o[k];
        if (o.hasOwnProperty(k)) {
          l += k + ": " + v + '; ';
        }
      }
    }
    return console.log(l);
  };

  connect = function(e1, e2, paper, origPos, scale) {
    var o1, o2;
    o1 = getOffset(e1, origPos, scale);
    o2 = getOffset(e2, origPos, scale);
    paper.path("M" + o1.rightSide + "," + o1.midH + "L" + o2.left + "," + o2.midH).attr({
      stroke: '#575757',
      "stroke-width": 2
    });
    return null;
  };

  exp = typeof module !== "undefined" && module !== null ? module.exports : void 0;

  if (exp != null) {
    exp.Discussion = Discussion;
    exp.Branch = Branch;
  } else {
    $(function() {
      var $window, bar, bt, container, discussion, drawIsthmus, genCss, paper, resize, scale, trunk, val, _fn, _i, _len, _ref,
        _this = this;
      paper = null;
      scale = 1;
      container = null;
      $window = $(window);
      $('.col2-person').remove();
      $('body').on('click', '.cc label', function() {
        var _this = this;
        return delay(1, function() {
          var box, offset, scroll, size;
          box = $(_this).parents('.addComment .formWrap').first();
          offset = box.offset();
          size = {
            h: box.height(),
            w: box.width()
          };
          scroll = {
            top: offset.top - 90,
            left: offset.left - 90
          };
          $('#addressBook_CC').css({
            left: offset.left + size.w,
            top: offset.top + size.h
          });
          return $window.scrollLeft(scroll.left);
        });
      });
      if (document.body.id === 'tinymce') {
        return;
      }
      drawIsthmus = function() {
        var d, el1, el2, offset, _i, _len, _ref, _ref1, _results;
        if (paper != null) {
          if (typeof paper.empty === "function") {
            paper.empty();
          }
        }
        if (paper != null) {
          if (typeof paper.remove === "function") {
            paper.remove();
          }
        }
        container.css({
          position: 'relative'
        });
        offset = container.offset();
        d = $(document);
        paper = Raphael(0, 0, d.width() - offset.left, d.height() - offset.top);
        $('svg:first').appendTo(container);
        _ref = trunk.connections;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], el1 = _ref1[0], el2 = _ref1[1];
          _results.push(connect(el1, el2, paper, offset, scale));
        }
        return _results;
      };
      genCss = function(name, val) {
        var o, p, _i, _len, _ref;
        o = {};
        _ref = '-webkit- -moz- -o- '.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          o["" + p + name] = val;
        }
        return o;
      };
      $('head').append("<style type=\"text/css\" id=\"snobisthmus-in-style\">svg {  z-index: -3333; }.snobisthmus-tuft {  display: table-cell !important;  vertical-align: middle !important; }.snobisthmus-align-middle {  vertical-align: middle !important; }.snobisthmus-align-top {  vertical-align: top !important; }.snobisthmus-align-bottom {  vertical-align: bottom !important; }.stuff-comments {  overflow: visible !important;  background: none !important; }.col1-person {  border: none !important; }.comment-item {  height: 0 !important; }.snobisthmus-crossed {  height: auto !important; }.media iframe {  max-width: 290px !important; }#addressBook_CC {  margin-left: -339px !important; }.snobisthmus-comment {  display: table-cell !important;  width: 300px !important;  padding: 15px !important; }  .snobisthmus-comment .addComment {    position: absolute;    top: 100%;    left: 0;    height: 0px !important;    margin-left: -45px !important; }    .snobisthmus-comment .addComment .textarea {      width: 400px !important; }  .snobisthmus-comment .wrapper-text {    overflow-y: auto !important;    width: 300px !important;    height: 300px !important; }  .snobisthmus-comment .comment-foto-author {    background: url(\"/i/new/thread/bg-avtar-comment-small.png\") no-repeat scroll 0 0 transparent !important;    position: absolute !important;    float: none !important;    right: 1px !important;    bottom: 1px !important;    width: 43px !important;    height: 41px !important; }    .snobisthmus-comment .comment-foto-author img {      width: 36px !important;      height: 36px !important; }  .snobisthmus-comment .text-comment {    margin-left: 0px !important; }.snobittons {  position: fixed;  bottom: 0;  background-color: white;  border-radius: 3px 0;  padding: 4px;  right: 0;  margin: 10;  z-index: 9999999; }  .snobittons:before {    content: \"Snobisthmus:\"; }  .snobittons button {    margin: 4px;    padding: 4px; }</style>");
      discussion = new Discussion();
      $('.comment-item').detach().each(function() {
        this.className += ' snobisthmus-crossed';
        return discussion.add(new Discussion($('<div class="snobisthmus-comment"/>').append(this), this.id));
      });
      trunk = new Branch(discussion);
      $('.comment-content .page').append(trunk.el);
      container = trunk.el.parent();
      trunk.el.css(genCss('transform-origin', '0 0'));
      resize = function(newScale) {
        var oldScale, w, x;
        oldScale = scale;
        scale = newScale;
        trunk.el.css(genCss('transform', "scale(" + newScale + ")"));
        w = $(window);
        x = $('<div/>').css({
          position: 'absolute',
          top: (w.scrollTop() - trunk.el.offset().top) / oldScale,
          left: (w.scrollLeft() - trunk.el.offset().left) / oldScale
        }).appendTo(trunk.el);
        drawIsthmus();
        return delay(10, function() {
          var scroll;
          scroll = x.offset();
          w.scrollTop(scroll.top);
          w.scrollLeft(scroll.left);
          return x.remove();
        });
      };
      bar = $('<div/>', {
        "class": 'snobittons'
      }).appendTo('body');
      bt = function(text) {
        return $('<button/>').text(text).appendTo(bar);
      };
      _ref = [100, 50, 30];
      _fn = function(val) {
        return bt(val + '%').click(function() {
          return resize(val / 100);
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        _fn(val);
      }
      $(window).resize(function() {
        return drawIsthmus();
      });
      return delay(500, function() {
        return drawIsthmus();
      });
    });
  }

}).call(this);
