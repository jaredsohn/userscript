// ==UserScript==
// @name          html baidu hi editor
// @namespace     chrisyue
// @version       0.0.0
// @description   替换默认的百度空间编辑器为普通的文本输入框，使其可直接编辑html代码
// @include       http://hi.baidu.com/*
// @copyright     2010+, chrisyue
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function() {
  // it's not jquery, don't use it in your next project :)
  var $ = function(selector) {
    var ret = {
      each: function(fn) { // go $.each
        for (var i = 0, len = this.doms.length; i < len; i++) {
          fn(i, this.doms[i]);
        }
        return this;
      },
      appendTo: function($$) { // go $.appendTo
        if (typeof $$ === 'string') {
          $$ = $($$);
        }
        this.each(function(i, dom) {
          $$.doms[0].appendChild(dom);
        });
        return this;
      },
      append: function($$) { // go $.append
        var self = this;
        $$.each(function(i, dom) {
          self.doms[0].appendChild(dom);
        });
        return this;
      },
      prependTo: function($$) { // go $.prependTo
        if (typeof $$ === 'string') {
          $$ = $($$);
        }
        this.each(function(i, dom) { 
          if ($$.doms[0].firstChild) {
            $$.doms[0].insertBefore(dom, $$.doms[0].firstChild);
          } else {
            $$.doms[0].appendChild(dom);
          }
        });
        return this;
      },
      attr: function(key) { // go $.attr
        if (typeof key === 'string') {
          return this.doms[0][key] || this.doms[0].getAttribute(key);
        }
        this.each(function(i, dom) {
          for (var i in key) {
            dom.setAttribute(i, key[i]);
          }
        });
        return this;
      },
      val: function(value) { // go $.val
        if (typeof value === 'string') {
          this.each(function(i, dom) {
            dom.value = value;
          });
          return this;
        }
        return this.doms[0].value;
      },
      css: function(key) { // go $.css
        if (typeof key === 'string') {
          return this.doms[0].style[key];
        }
        this.each(function(i, dom) {
          for (var i in key) {
            dom.style[i] = key[i];
          }
        });
        return this;
      },
      hasClass: function(cls) { // go $.hasClass
        return this.doms[0].className.indexOf(cls) > -1;
      },
      addClass: function(cls) { // go $.addClass
        this.each(function(i, dom) {
          if (dom.className === '') {
            dom.className = cls;
          } else {
            if (dom.className.indexOf(cls) > -1) {
              return ;
            }
            dom.className += ' ' + cls;
          }
       });
        return this;
      },
      removeClass: function(cls) { // go $.removeClass
        this.each(function(i, dom) {
          var classes = dom.className.split(/\s+/);
          var idx = classes.indexOf(cls);
          if (idx > -1) {
            classes.splice(idx, 1);
          }
          dom.className = classes.join(' ');
        });
        return this;
      },
      removeAttr: function(attr) { // go $.removeAttr
        this.each(function(i, dom) {
          dom.removeAttribute(attr);
        });
        return this;
      },
      html: function(html) { // go $.html
        if (typeof html === 'string' || typeof html === 'number') {
          this.each(function(i, dom) {
            dom.innerHTML = html;
          });
          return this;
        }
        return this.doms[0].innerHTML;
      },
      bind: function(event, callback) { // go $.bind
        this.each(function(i, dom) {
          dom.addEventListener(event, callback, false);
        });
        return this;
      },
      unbind: function(event, callback) { // go $.unbind
        this.each(function(i, dom) {
          dom.removeEventListener(event, callback, false);
        });
      },
      width: function() { // go $.width
        return this.doms[0].clientWidth;
      },
      height: function() { // go $.height
        return this.doms[0].clientHeight;
      },
      outerWidth: function() { // go $.outerWidth
        return this.doms[0].offsetWidth;
      },
      outerHeight: function() { // go $.outerHeight
        return this.doms[0].offsetHeight;
      },
      offset: function() { // go $.offset
        return {
          top: this.doms[0].offsetTop,
          left: this.doms[0].offsetLeft
        };
      },
      position: function() { // go $.position
        return {
          top: this.doms[0].clientTop,
          left: this.doms[0].clientLeft
        };
      },
      prev: function() { // go $.prev
        var ret = [];
        for (var i = 0, len = this.doms.length; i < len; i++) {
          var pre = this.doms[i].previousSibling;
          pre && ret.push(pre);
        }
        if (ret.length) {
          return $(ret);
        }
      },
      next: function() { // go $.next
        var ret = [];
        for (var i = 0, len = this.doms.length; i < len; i++) {
          var next = this.doms[i].nextSibling;
          next && ret.push(next);
        }
        return $(ret);
      },
      insertAfter: function(target) { // go $.insertAfter
        if (typeof target === 'string') {
          target = $(target);
        }
        this.each(function(i, dom) {
          var t = target.doms[0];
          if (t.nextSibling) {
            t.parentNode.insertBefore(dom, t.nextSibling);
          } else {
            t.parentNode.appendChild(dom);
          }
        });
        return this;
      },
      insertBefore: function(target) { // go $.insertBefore
        if (typeof target === 'string') {
          target = $(target);
        }
        this.each(function(i, dom) {
          target.doms[0].parentNode.insertBefore(dom, target.doms[0]);
        });
        return this;
      },
      parent: function() { // go $.parent
        var ret = [];
        for (var i = 0, len = this.doms.length; i < len; i++) {
          var p = this.doms[i].parentNode;
          p && ret.push(p);
        }
        if (ret.length) {
          return $(ret);
        }
      },
      find: function(selector) { // go $.find
        var ret = [];
        if (typeof selector === 'string') {
          this.each(function(i, dom) {
            var rs = dom.querySelectorAll(selector);
            for (var i = 0, len = rs.length; i < len; i++) {
              ret.push(rs[i]);
            }
          });
        }
        return $(ret);
      },
      remove: function(selector) {
        if (selector) {
          this.each(function(i, dom) {
            var rs = dom.querySelectorAll(selector);
            for (var i = 0, len = rs.length; i < len; i++) {
              rs[i].parentNode.removeChild(rs[i]);
            }
          });
        } else {
          this.each(function(i, dom) {
            dom.parentNode.removeChild(dom);
          });
        }
      },
      eq: function(id) { // go $.eq
        var ret = this.doms[id];
        if (ret) {
          return $(ret);
        }
      },
      size: function() {
        return this.doms.length;
      }
    };
    // selector
    if (typeof selector === 'string') {
      if (selector.indexOf('<') === 0) {
        var tag = selector.replace(/^<|>$/g, '');
        ret.doms = [document.createElement(tag)];
      } else {
        ret.doms = document.querySelectorAll(selector);
      }
    } else if (typeof selector === 'object') {
      if (typeof selector.length === 'number') {
        ret.doms = selector;
      } else {
        ret.doms = [selector];
      }
    }
    return ret;
  };

  if ($('#holder').size()) {
    // hide the rich text editor
    $('#holder').css({
      display: 'none'
    });
    
    // show the real content holder
    $('<textarea>').attr({
      name: 'spBlogText',
      cols: '140',
      rows: '30'
    }).html($('#blogOldContent').html()).insertBefore('#holder');

    // remove the input tag
    $('#spBlogText').remove();

    // remove the onsubmit event from form
    $('#popFormSubmit').removeAttr('onsubmit');

    // the real submit button
    $('<input>').attr({
      type: 'submit', 
      value: '提交'
    }).css({
      width: '80px',
      height: '30px',
      fontSize: '10pt',
      color: '#666',
      fontWeight: 'bold'
    }).appendTo('#btn-box');

    $('#btn-box div.spblog-btn:first-child').remove().

    console.log('ok');
  }
})();
