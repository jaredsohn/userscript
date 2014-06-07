// ==UserScript==
// @name          Google++
// @namespace     http://www.5isharing.com/
// @version       2.0.0
// @description   Ready for the Google++ 2.0
// @include       http://*.google.*
// @include       https://*.google.*
// @copyright     2009+, chrisyue
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function() {
  // CONST
  var unsafeWindow = this['unsafeWindow'] || window;
  var ver = '2.0.0';
  var keyword = document.getElementsByName('q')[0].value;
  // check if has working greasemonkey api
  var storageHandler = (function() {
    if (GM_setValue) {
      GM_setValue('test', 1);
      if (GM_getValue('test')) {
        return 'greasemonkey'
      }
    }
    if (localStorage) {
      return 'localStorage';
    }
    return 'cookie';
  })();
  // check the gradient css engine;
  var cssGradientEngine = (function() {
    var div = document.createElement('div');

    div.style.background = '-moz-linear-gradient(top, #000, #fff)';
    div.style.background = '-webkit-gradient(linear, left top, left bottom, from(#000), to(#fff))';
    if (div.style.background.indexOf('moz') === 1) {
      return 'gecko';
    }
    if (div.style.background.indexOf('webkit') === 1) {
      return 'webkit';
    }
    return false;
  })();
  // check remote xhr method
  var remoteXhrMethod = (function() {
    if (GM_xmlhttpRequest) {
      return 'greasemonkey';
    }
  })();

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
  // go util
  var util = {
    rgbAdd: function(rgb, num) {
      var ret = [];
      for (var i = 0, len = rgb.length; i < len; i++) {
        var tmp = +rgb[i] + num;
        if (tmp > 255) {
          tmp = 255;
        } else if (tmp < 0) {
          tmp = 0;
        }
        ret.push(tmp);
      }
      return ret;
    },
    createLoadingImage: function() {
      if (!this.addedLoadingImageCss) {
        gm.css('.gpp-loadingImage { opacity: .7 }');
        this.addedLoadingImageCss = true;
      }
      return $('<img>').attr({
        'alt': 'loading',
        'src': resource.loadingImage
      }).addClass('gpp-loadingImage');
    },
    // common containers are used for containning loading image and tips, warning, etc
    createModuleFrameCommonContainer: function() {
      if (!this.addedModuleFrameCommonContainerCss) {
        gm.css('.gpp-moduleFrameCommonContainer { text-align: center; }');
        this.addedModuleFrameCommonContainerCss = true;
      }
      return $("<p>").addClass('gpp-moduleFrameCommonContainer');
    },
    createModuleFrame: function(title) {
      if (!this.addedModuleFrameCss) {
        gm.css('.gpp-moduleFrame {\
          width: 300px;\
          background: #fff;\
          margin-bottom: 10px;\
          border: 1px solid rgba(255,255,255,0.3);\
          -moz-box-shadow: 0 1px 4px #000;\
          -webkit-box-shadow: 0 1px 4px #000;\
        }\
        .gpp-moduleFrame > h3 {\
          background: -moz-linear-gradient(top, #fff, #ccc);\
          background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ccc));\
          margin: 0;\
          padding: 5px;\
          font-weight: bold;\
          color: #333;\
        }\
        #gsr .gpp-moduleFrame a:link {\
          color:#11c;\
        }\
        #gsr .gpp-moduleFrame a:visited {\
          color:#a0b;\
        }\
        #gsr .gpp-moduleFrame a:active {\
          color:#c11;\
        }');
        this.addedModuleFrameCss = true;
      }
      var frame = $('<div>').addClass('gpp-moduleFrame');
      var header = $('<h3>').html(title).appendTo(frame);
      return frame.appendTo(myRSBar.getElm());
    },
    //
    createModuleFrameWithContainer: function(title) {
      return this.createModuleFrame(title)
        .append(this.createModuleFrameCommonContainer().append(this.createLoadingImage()))
    }
  };
  
  // go gm api
  var gm = {
    get: (function() {
      if (storageHandler === 'greasemonkey') {
        return function(key, def) {
          return GM_getValue(key, def);
        };
      } else if (storageHandler === 'localStorage') {
        return function(key, def) {
          var ret = localStorage.getItem(key);
          if (ret === undefined || ret === null) {
            return def;
          } else {
            return ret;
          } 
        }
      }
    })(),
    set: (function() {
      if (storageHandler === 'greasemonkey') {
        return function(key, val) {
          GM_setValue(key, val);
        };
      } else if (storageHandler === 'localStorage') {
        return function(key, val) {
          localStorage.setItem(key, val);
        };
      }
    })(),
    log: (function() {
      if (console.log) {
        return function(msg) {
          console.log(msg);
        };
      }
    })(),
    css: (function() {
      if (GM_addStyle) {
        return function(rule) {
          GM_addStyle(rule);
        }
      } else {
        return function(rule) {
          $('<style>').attr({'type': 'text/css'})
            .html('<![CDATA[' + rule + ']]>')
            .appendTo('head');
        }
      }
    })(),
    xhr: (function() {
      if (remoteXhrMethod === 'greasemonkey') {
        return function(xhr) {
          GM_xmlhttpRequest(xhr);
        }
      }
    })()
  };

  // go dict main
  var DICT = {
    // en
    en: [
    ],

    zh: [
    ]
  };
  // go lang
  var LANG = (function() {
    var text = $('input[name=btnG]').val();
    switch (text) {
      case 'Search':
        return 'en';
      default:
        return 'en';
    }
  })();
  // go __
  var __ = function(en) {
    if (LANG === 'en' || !DICT[LANG]) return en;
    var idx = DICT.en.indexOf(en);
    if (idx > -1) {
      var tr = DICT[LANG][idx];
      if (tr) {
        return tr;
      }
    }
    return en;
  };

  // go shadow
  var shadow = {
    getElm: function() {
      if (!this.inst) {
        this.addCss();
        this.inst = this.createElm();
      }
      return this.inst;
    },
    addCss: function() {
      gm.css('.gpp-shadowBox {\
        position: fixed;\
        z-index: 200;\
      }\
      #gpp-cfg-shadow {\
        background: #fff;\
        opacity: .6;\
        position: fixed;\
        z-index: 100;\
        top: 0px;\
        left: 0px;\
        width: ' + screen.availWidth + 'px;\
        height: ' + screen.availHeight + 'px;\
      }');
    },
    show: function() {
      this.getElm().removeClass('gpp-hidden');
      this.centerBox();
      return this;
    },
    hide: function() {
      var shadow = this.getElm().addClass('gpp-hidden');
      if (this.callback) {
        shadow.unbind('click', this.callback);
        delete this.callback;
      }
      return this;
    },
    createElm: function() { // this will only run once
      return $('<div>').attr({'id': 'gpp-cfg-shadow'}).appendTo('body');
    },
    click: function(callback) { // go shadow.click
      this.callback = callback;
      this.getElm().bind('click', this.callback);
      return this;
    },
    setBox: function(box) {
      this.box = box;
      return this;
    },
    centerBox: (function() {
      var html = document.documentElement;
      return function() {
        if (this.box) {
          this.box.css({
            top: html.clientHeight / 2 
              - this.box.height() / 2 
              + 'px',
            left: html.clientWidth / 2 
              - this.box.width() / 2 
              + 'px'
          });
        } else {
          gm.log('No box been set');
        }
        return this;
      };
    })()
  };
  // go myRSBar
  var myRSBar = {
    getElm: function() {
      if (!this.inst) {
        this.addCss();
        this.inst = this.createElm();
      }
      return this.inst;
    },
    createElm: function() {
      return $('<div>').attr({
        'id': 'gpp-rsBar'
      }).insertAfter('#center_col');
    },
    addCss: function() {
      gm.css('#gpp-rsBar {\
        width: 302px;\
        padding: 0 10px;\
        position: absolute;\
        top: 0;\
        right: 0;\
      }\
      #center_col {\
        margin-right: 324px;\
        border-right: 1px solid #d3e1f9;\
      }');
    }
  };

  // go cfgWidget
  var cfgWidget = {
    // go cfgWidget.number
    addNbCss: function() {
      gm.css('.gpp-cfg-minus, .gpp-cfg-screen, .gpp-cfg-plus {\
        float: left;\
        text-align: center;\
      }\
      .gpp-cfg-minus, .gpp-cfg-plus {\
        padding: 0 10px;\
        background: -moz-linear-gradient(top, #555, #111);\
        background: -webkit-gradient(linear, left top, left bottom, from(#555), to(#111));\
        color: #fff;\
        text-shadow: 0 -1px 0 #000;\
        cursor: pointer;\
        position: relative;\
        top: -1px;\
      }\
      .gpp-cfg-minus:hover, .gpp-cfg-plus:hover {\
        background: -moz-linear-gradient(top, #f70, #a40);\
        background: -webkit-gradient(linear, left top, left bottom, from(#f70), to(#a40));\
        text-shadow: 0 0 2px #fff;\
      }\
      .gpp-cfg-minus:active, .gpp-cfg-plus:active {\
        background: -moz-linear-gradient(top, #555, #111);\
        background: -webkit-gradient(linear, left top, left bottom, from(#555), to(#111));\
        text-shadow: 0 -1px 0 #000;\
        top: 0px;\
      }\
      .gpp-cfg-screen {\
        width: 40px;\
        background: -moz-linear-gradient(top, #fff, #eee 40%, #ccc 40%, #ddd);\
        background: -webkit-gradient(linear, left top, left bottom, from(#fff), color-stop(40%, #eee), color-stop(40%, #ccc), to(#ddd));\
        position: relative;\
        top: -1px;\
      }\
      .gpp-cfg-minus {\
        -moz-border-radius: 10px 0 0 10px;\
        -webkit-border-radius: 10px 0 0 10px;\
      }\
      .gpp-cfg-plus {\
        -moz-border-radius: 0 10px 10px 0;\
        -webkit-border-radius: 0 10px 10px 0;\
      }\
      .gpp-cfg-numberTuner {\
        float: left;\
        -moz-border-radius: 10px;\
        -webkit-border-radius: 10px;\
        -moz-box-shadow: 0 0 4px #000;\
        -webkit-box-shadow: 0 0 4px #000;\
        background: #333;\
      }');
    },
    number: function(id, val, min, max) {
      if (!this.addedNbCss) {
        this.addNbCss();
        this.addedNbCss = true;
      }
      if (typeof min !== 'number') min = 1;
      if (typeof max !== 'number') max = 999;
      var container = $('<div>').addClass('gpp-cfg-numberTuner')
        .attr({'id': 'gpp-' + id}); // add this to make disable work
      var set = setting[id];
      // minus
      var mns = $('<div>').appendTo(container).bind('click', function(e) {
        var self = $(this);
        var dsp = self.next();
        var num = parseInt(dsp.html());
        if (num > min) {
          num--;
          set.val = num;
          dsp.html(num);
        }
        cfgWidget.handleRelieds(set);
        set.changed = true;
      }).addClass('gpp-cfg-minus').html('-'); 
      // display
      var dsp = $('<div>').appendTo(container).html(val).addClass('gpp-cfg-screen'); 
      // plus
      var pls = $('<div>').appendTo(container).bind('click', function() {
        var self = $(this);
        var dsp = self.prev();
        var num = parseInt(dsp.html());
        if (num < max) {
          num++;
          set.val = num;
          dsp.html(num);
        }
        cfgWidget.handleRelieds(set);
        set.changed = true;
      }).addClass('gpp-cfg-plus').html('+'); 
      this.disable(id, container);

      return container;
    },
    // go cfgWidget.choice
    addChoicesCss: function() {
      gm.css('.gpp-cfg-choiceContainer {\
        float: left;\
        -moz-border-radius: 10px;\
        -webkit-border-radius: 10px;\
        -moz-box-shadow: 0 1px 2px #000;\
        -webkit-box-shadow: 0 1px 2px #000;\
        background: #999;\
      }\
      .gpp-cfg-choiceContainer div {\
        float: left;\
        padding: 0px 8px;\
        cursor: pointer;\
        margin: 0 1px 0 0;\
        color: #fff;\
        text-shadow: 0 -1px 0 #000;\
        background: -moz-linear-gradient(top, #555, #111);\
        background: -webkit-gradient(linear, left top, left bottom, from(#555), to(#111));\
      }\
      .gpp-cfg-choiceContainer div:first-child {\
        -moz-border-radius: 10px 0 0 10px;\
        -webkit-border-radius: 10px 0 0 10px;\
        margin-left: 0;\
      }\
      .gpp-cfg-choiceContainer div:last-child {\
        -moz-border-radius: 0 10px 10px 0;\
        -webkit-border-radius: 0 10px 10px 0;\
        margin-right: 0;\
      }\
      .gpp-cfg-choiceContainer div.gpp-cfg-selected {\
        text-shadow: 0 0 2px #fff;\
        background: -moz-linear-gradient(top, #55f, #369);\
        background: -webkit-gradient(linear, left top, left bottom, from(#55f), to(#369));\
        -moz-box-shadow: 0 0 2px #55f;\
        -webkit-box-shadow: 0 0 2px #55f;\
      }\
      .gpp-cfg-choiceContainer div:not(.gpp-cfg-selected):hover {\
        text-shadow: 0 0 2px #fff;\
        background: -moz-linear-gradient(top, #f70, #a40);\
        background: -webkit-gradient(linear, left top, left bottom, from(#f70), to(#a40));\
        -moz-box-shadow: 0 0 2px #f70;\
        -webkit-box-shadow: 0 0 2px #f70;\
      }\
      .gpp-cfg-choiceContainer div:not(.gpp-cfg-selected):active {\
        text-shadow: 0 -1px 0 #000;\
        background: -moz-linear-gradient(top, #555, #111);\
        background: -webkit-gradient(linear, left top, bottom top, from(#555), to(#111));\
        position: relative;\
        top: 1px;\
        -moz-box-shadow: 0 0 0 #000;\
        -webkit-box-shadow: 0 0 0 #000;\
      }');
    },
    choices: function(id, val, choices) {
      if (!this.addedChoicesCss) {
        this.addChoicesCss();
        this.addedChoicesCss = true;
      }
      var container = $('<div>').addClass('gpp-cfg-choiceContainer')
        .attr({'id': 'gpp-' + id}); // add this to make disable work
      var cur;
      for (var cid in choices) {
        var choice = choices[cid];
        var div = $('<div>').html(choice).attr({'gpp-cfg-choiceVal': cid});
        if (cid == val) {
          div.addClass('gpp-cfg-selected');
          cur = div;
        }
        var set = setting[id];
        div.appendTo(container).bind('click', function() {
          var self = $(this);
          cur && cur.removeClass('gpp-cfg-selected');
          cur = self;
          cur.addClass('gpp-cfg-selected');
          set.val = cur.attr('gpp-cfg-choiceVal');
          cfgWidget.handleRelieds(set);
          set.changed = true;
        });
      }
      this.disable(id, container);
      return container;
    },
    bool: (function() {
      var choices = {'1': __('Yes'), '0': __('No')};
      return function(id, val) {
        return cfgWidget.choices(id, val, choices);
      };
    })(),
    // go colorpicker
    colorpicker: (function() {
      var colors = [[], [], [], [], [], []];
      for (var i = 0, j = 255; i < 256; i += 16, j = 255 - i) {
        colors[0].push([255, i, 0]);
        colors[1].push([j, 255, 0]);
        colors[2].push([0, 255, i]);
        colors[3].push([0, j, 255]);
        colors[4].push([i, 0, 255]);
        colors[5].push([255, 0, j]);
      }
      gm.css('.gpp-cfg-colorpickerTable {\
        -moz-box-shadow: 0 1px 2px #000;\
        -webkit-box-shadow: 0 1px 2px #000;\
        float: left;\
        margin-right: 10px;\
      }\
      .gpp-cfg-colorpicker .gpp-cfg-numberTuner {\
        color: #fff;\
        text-shadow: 0 -1px 0 #000;\
      }\
      .gpp-cfg-colorpicker .gpp-cfg-screen {\
        width: 80px;\
      }\
      #gpp-cfg-content .gpp-cfg-colorpickerTable td {\
        width: 1px;\
        height: 18px;\
        padding: 0;\
      }');
      var changeColor = function(self, set) {
        set.val = self.attr('gpp-rgb');
        self.parent().parent().next().find('.gpp-cfg-screen').css({
          background: self.css('background')
        }).html(set.val);
        set.changed = true;
      };
      var rgbAdd = function(self, set, add) {
        var scr = self.parent().find('.gpp-cfg-screen');
        var rgb = scr.html().split(',');
        for (var i = 0, len = rgb.length; i < len; i++) {
          var tmp = +rgb[i] + add;
          if (tmp > 255) {
            tmp = 255;
          } else if (tmp < 0) {
            tmp = 0;
          }
          rgb[i] = tmp;
        }
        rgb = rgb.join(',');
        scr.html(rgb);
        scr.css({
          background: 'rgb(' + rgb + ')'
        })
        set.val = rgb;
        set.changed = true;
      };
      return function(id, val) {
        var isMousedown = false; 
        var set = setting[id];
        var div = $('<div>').addClass('gpp-cfg-colorpicker')
          .attr({'id': 'gpp-' + id}); // add this to make disable work
        var table = $('<table>').attr({
          'cellpadding': '0',
          'cellspacing': '0'
        }).addClass('gpp-cfg-colorpickerTable').bind('mousedown', function() {
          isMousedown = true;
        }).appendTo(div);
        $('body').bind('mouseup', function() {
          isMousedown = false;
        });
        var tr = $('<tr>').appendTo(table);
        for (var i = 0, len = colors.length; i < len; i++) {
          for (var j = 0, len2 = colors[i].length; j < len2; j++) {
            var rgb = colors[i][j].join(',');
            $('<td>').attr({'gpp-rgb': rgb}).css({
              'background': 'rgb(' + rgb + ')'
            }).appendTo(tr).bind('mouseover', function() {
              if (!isMousedown) return ;
              changeColor($(this), set);
            }).bind('mousedown', function() {
              changeColor($(this), set);
            });
          }
        }
        var container = $('<div>').addClass('gpp-cfg-numberTuner')
          .appendTo(div);
        // minus
        var mns = $('<div>').appendTo(container).bind('click', function(e) {
          rgbAdd($(this), set, -3);
        }).addClass('gpp-cfg-minus').html(__('-')); 
        // display
        var dsp = $('<div>').appendTo(container).css({
          background: 'rgb(' + val + ')'
        }).addClass('gpp-cfg-screen').html(val); 
        // plus
        var pls = $('<div>').appendTo(container).bind('click', function() {
          rgbAdd($(this), set, 3);
        }).addClass('gpp-cfg-plus').html(__('+')); 
        this.disable(id, div);
        return div;
      };
    })(),
    // go cfgWidget.text
    text: function(id, val) {
      val = val || '';
      var set = setting[id];
      var ret = $('<textarea>').bind('blur', function() {
        var self = $(this);
        set.val = self.val();
        set.changed = true;
      }).attr({
        'cols': '30',
        'rows': '5'
      }).val(val);
      return ret;
    },
    disable: function(id, container) {
      var set = setting[id];
      if (set.disabled && set.disabled()) {
        container.addClass('gpp-cfg-disabled');
      }
    },
    handleRelieds: function(set) {
      for (var rid in set.relied) {
        var relied = set.relied[rid];
        if (relied.disabled()) {
          $('#gpp-' + rid).addClass('gpp-cfg-disabled');
        } else {
          $('#gpp-' + rid).removeClass('gpp-cfg-disabled');
        }
      }
    }
  };

  // go configuration
  var cfg = {
    // go cfg.btn 
    btn: (function() { // must run, so .. run at once and only once
      var btn = $('<div>').attr({
        'id': 'gpp-cfg-cfgBtn'
      }).addClass('gpp-btn').html('G++').bind('click', function() {
        cfg.show();
      });
      // go css cfgBtn
      gm.css('#gpp-cfg-cfgBtn {\
        background: -moz-linear-gradient(top, #56c, #233);\
        background: -webkit-gradient(linear, left top, left bottom, from(#56c), to(#233));\
        position: absolute;\
        z-index: 20;\
        top: 2px;\
        left: 410px;\
      }\
      #gpp-cfg-cfgBtn:hover {\
        background: -moz-linear-gradient(top, #67f, #367);\
      }\
      #gpp-cfg-cfgBtn:active {\
        background: -moz-linear-gradient(top, #45b, #122);\
        top: 3px;\
      }');
      return btn;
    })(),
    // go cfg.createcontent
    createContent: function() {
      var dl = $('<dl>').attr({'id': 'gpp-cfg-content'}).addClass('gpp-shadowBox');
      for (var cid in group) {
        var com = group[cid];
        cfg.createDt(com).appendTo(dl);
        cfg.createDd(com).appendTo(dl);
      }
      cfg.dts[0].addClass('gpp-cfg-currentTab');
      // go cfg.about
      var dtAbout = $('<dt>').html(__('About')).addClass('gpp-clickable').bind('click', function() {
        cfg.dtSwitch($(this));
      }).appendTo(dl);
      var ddAbout = $('<dd>').html('about').appendTo(dl);

      return dl;
    },
    // go cfg.createDt
    dts: [],
    createDt: function(com) {
      var dt = $('<dt>').html(com.name).addClass('gpp-clickable').bind('click', function() {
        cfg.dtSwitch($(this));
      });
      cfg.dts.push(dt);
      return dt;
    },
    // go cfg.dtSwitch
    dtSwitch: (function() {
      var cur;
      var cls = 'gpp-cfg-currentTab';
      return function(dt) {
        cur || (cur = cfg.dts[0]);
        if (dt.hasClass(cls)) return ;
        cur.removeClass(cls);
        cur = dt;
        cur.addClass(cls);
      };
    })(),
    // go cfg.createDd
    createDd: function(com) {
      var dd = $('<dd>');
      $('<p>').html(com.desc).appendTo(dd);
      var ul = $('<ul>').appendTo(dd);
      var i = 0;
      for (var mid in com.groupLv2) {
        i++;
        var mod = com.groupLv2[mid];
        var divId = 'gpp-' + mid;
        var li = this.createLi(mod).appendTo(ul).attr({
          'gpp-to': '#' + divId
        });
        var div = $('<div>').appendTo(dd).addClass('gpp-cfg-tableContainer gpp-hidden').attr({'id': divId});
        var table = this.createTable(mod).appendTo(div);
        if (i === 1) {
          li.addClass('gpp-cfg-currentSubTab');
          div.removeClass('gpp-hidden');
        }
      }
      return dd;
    },
    // go cfg.createLi
    createLi: function(mod) {
      var li = $('<li>').html(mod.name).addClass('gpp-btn').bind('click', function(e) {
        cfg.liSwitch($(this));
      });
      return li;
    },
    // go cfg.liSwitch
    liSwitch: (function() {
      var cls = 'gpp-cfg-currentSubTab';
      return function(li) {
        if (li.hasClass(cls)) return;
        var cur = li.parent().find('.' + cls);
        cur.removeClass(cls);
        $(cur.attr('gpp-to')).addClass('gpp-hidden');

        li.addClass(cls);
        $(li.attr('gpp-to')).removeClass('gpp-hidden');
      };
    })(),
    // go cfg.createTable
    createTable: function(mod) {
      var table = $('<table>');
      for (var pid in mod.groupLv3) {
        var part = mod.groupLv3[pid];
        this.createTr(part.name).appendTo(table);
        for (var sid in part.setting) {
          var set = part.setting[sid];
          this.createTr(set).appendTo(table);
        }
      }
      return table;
    },
    // go cfg.createTr
    createTr: function(param) {
      var tr = $('<tr>');
      if (typeof param === 'string') {
        $('<th>').attr({'colspan': '2'}).html(param).appendTo(tr);
      } else {
        $('<td>').html(param.name).appendTo(tr);
        $('<td>').append(param.html()).appendTo(tr);
      }
      return tr;
    },
    // go cfg.createbtnContainer
    createBtnContainer: function() {
      var btnContainer = $('<div>').attr({'id': 'gpp-cfg-btnContainer'});
      var ok = $('<div>').attr({
        id: 'gpp-cfg-okBtn'
      }).html('OK').addClass('gpp-btn').appendTo(btnContainer).bind('click', function() {
        for (var sid in setting) {
          var set = setting[sid];
          if (set.changed) {
            gm.set('gpp-' + sid, set.val);
          }
          location.reload();
        }
      });
      var cc = $('<div>').attr({
        'id': 'gpp-cfg-cancelBtn'
      }).addClass('gpp-btn').html('Cancel').bind('click', function() {
        cfg.hide();
      }).appendTo(btnContainer);
      return btnContainer;
    },
    // go cfg.initData
    initData: function() {
      for (var i in group) {
        group[i].groupLv2 = {}; 
      }
      for (var i in groupLv2) {
        groupLv2[i].groupLv3 = {};
        groupLv2[i].group.groupLv2[i] = groupLv2[i];
      }
      for (var i in groupLv3) {
        groupLv3[i].setting = {};
        groupLv3[i].groupLv2.groupLv3[i] = groupLv3[i];
      }
      for (var i in setting) {
        setting[i].id = i;
        setting[i].relied = {};
        setting[i].groupLv3.setting[i] = setting[i];
        if (setting[i].rely) {
          setting[setting[i].rely].relied[i] = setting[i];
        }
      }
    },
    // go cfg.addCfgCss
    addCfgCss: function() {
      gm.css('#gpp-cfg-content {\
        width: 560px;\
        background: #fff;\
        -moz-box-shadow: 0 5px 10px #111;\
        -webkit-box-shadow: 0 5px 10px #111;\
        font-family: Tahoma, Helvetica, Arial, Sans-serif;\
        margin: 0;\
        color: #222;\
      }\
      #gpp-cfg-content dt {\
        font-size: 16px;\
        letter-spacing: 3px;\
        padding: 5px 10px;\
        background: -moz-linear-gradient(top, #48c, #246);\
        background: -webkit-gradient(linear, left top, left bottom, from(#48c), to(#246));\
      }\
      #gpp-cfg-content dt:hover {\
        background: -moz-linear-gradient(top, #5af, #369);\
        background: -webkit-gradient(linear, left top, left bottom, from(#5af), to(#369));\
      }\
      #gpp-cfg-content dt:active {\
        background: -moz-linear-gradient(top, #369, #123);\
        background: -webkit-gradient(linear, left top, left bottom, from(#369), to(#123));\
      }\
      #gpp-cfg-content dt.gpp-cfg-currentTab {\
        text-shadow: 0 0 2px #fff;\
      }\
      #gpp-cfg-content dd {\
        font-size: 15px;\
        margin: 0;\
        padding: 5px 10px;\
        height: 260px;\
        background: -moz-linear-gradient(top, #999, #fff 5%, #def);\
        background: -webkit-gradient(linear, left top, left bottom, from(#999), color-stop(5%, #fff), to(#def));\
      }\
      #gpp-cfg-content dt:not(.gpp-cfg-currentTab) + dd {\
        display: none;\
      }\
      #gpp-cfg-btnContainer {\
        position: fixed;\
        z-index: 150;\
        background: #fff;\
        -moz-border-radius: 12px 12px 0 0;\
        -moz-box-shadow: 0 5px 10px #333;\
        padding: 0 10px;\
      }\
      #gpp-cfg-btnContainer div {\
        text-align: center;\
        float: left;\
        margin: 5px;\
        width: 60px;\
      }\
      #gpp-cfg-okBtn {\
        background: -moz-linear-gradient(top, #393, #131);\
        background: -webkit-gradient(linear, left top, left bottom, from(#393), to(#131));\
      }\
      #gpp-cfg-cancelBtn {\
        background: -moz-linear-gradient(top, #933, #311);\
        background: -webkit-gradient(linear, left top, left bottom, from(#933), to(#311));\
      }\
      #gpp-cfg-okBtn:hover {\
        background: -moz-linear-gradient(top, #2e2, #292);\
        background: -webkit-gradient(linear, left top, left bottom, from(#2e2), to(#292));\
      }\
      #gpp-cfg-cancelBtn:hover {\
        background: -moz-linear-gradient(top, #e22, #922);\
        background: -webkit-gradient(linear, left top, left bottom, from(#e22), to(#922));\
      }\
      #gpp-cfg-okBtn:active {\
        background: -webkit-gradient(linear, left top, left bottom, from(#393), to(#131));\
      }\
      #gpp-cfg-cancelBtn:active {\
        background: -webkit-gradient(linear, left top, left bottom, from(#933), to(#311));\
      }\
      #gpp-cfg-content dd > p {\
        margin: 0;\
        float: left;\
        width: 100%;\
        line-height: 20px;\
      }\
      #gpp-cfg-content ul {\
        list-style: none;\
        width: 150px;\
        float: left;\
      }\
      #gpp-cfg-content li {\
        margin: 10px 10px 10px 5px;\
        background: -moz-linear-gradient(top, #369, #123);\
        background: -webkit-gradient(linear, left top, left bottom, from(#369), to(#123));\
      }\
      #gpp-cfg-content li.gpp-cfg-currentSubTab, #gpp-cfg-content li:hover {\
        background: -moz-linear-gradient(top, #55f, #369);\
        background: -webkit-gradient(linear, left top, left bottom, from(#55f), to(#369));\
        text-shadow: 0 0 2px #fff;\
      }\
      #gpp-cfg-content li:active {\
        background: -moz-linear-gradient(top, #369, #123);\
        background: -webkit-gradient(linear, left top, left bottom, from(#369), to(#123));\
        text-shadow: 0 -1px 0 #000;\
      }\
      .gpp-cfg-tableContainer {\
        float: left;\
        padding: 6px 0;\
        height: 220px;\
        overflow-y: scroll;\
      }\
      .gpp-cfg-tableContainer table {\
        border-left: 1px solid #aaa;\
      }\
      #gpp-cfg-content th, #gpp-cfg-content td {\
        padding: 2px 6px;\
        line-height: 18px;\
        font-size: 13px;\
        text-align: left;\
      }\
      #gpp-cfg-content th {\
        background: #acf;\
      }\
      #gpp-cfg-content td:first-child {\
        background: #def;\
      }\
      #gpp-cfg-content td:last-child {\
        background: #eee;\
      }\
      .gpp-cfg-disabled {\
        opacity: .5;\
      }');
    },
    // go cfg.show
    show: function() {
      if (!this.showed) {
        this.initData();
        this.addCfgCss();
        this.content      = this.createContent().appendTo('body');
        this.btnContainer = this.createBtnContainer().appendTo('body');
        this.showed = true;
      } else {
        this.content.removeClass('gpp-hidden');
        this.btnContainer.removeClass('gpp-hidden');
      }
      shadow.click(this.hide).setBox(this.content).show();
      var pos = this.content.offset();
      this.btnContainer.css({
        top: pos.top 
          - this.btnContainer.height() + 'px',
        left: pos.left 
          + this.content.width() 
          - this.btnContainer.outerWidth() - 1 + 'px'
      });
    },
    // go cfg.hide
    hide: function() {
      shadow.hide();
      cfg.content.addClass('gpp-hidden');
      cfg.btnContainer.addClass('gpp-hidden');
    }
  };

  // go group
  var group = {
    looks: {
      name: __('Looks and Feel'),
      desc: __('Beautify and enhance your search result interface')
    },
    enhancement: {
      name: __('Search Result Enhancement'),
      desc: __('Bring more useful data when you search')
    },
    miscellaneous: {
      name: __('Miscellaneous'),
      desc: __('Powertoys which make searching more fun')
    }
  };

  // go groupLv2
  var groupLv2 = {
    // go layout
    layout: {
      group: group.looks,
      name: __('Layout')
    },
    // go shape
    rs: {
      group: group.looks,
      name: __('Search results')
    },
    otherUi: {
      group: group.looks,
      name: __('Others')
    },
    advancedUi: {
      group: group.looks,
      name: __('Advanced')
    },
    // go other search engine 
    searches: {
      group: group.enhancement,
      name: __('Multi-search')
    },
    cleaner: {
      group: group.miscellaneous,
      name: __('Cleaner')
    },
    rsEnrichment: {
      group: group.enhancement,
      name: __('Result enrichment')
    },
    otherRs: {
      group: group.enhancement,
      name: __('Other result'),
    }
  };

  // go groupLv3
  var groupLv3 = {
    // go cols
    cols: {
      name: __('Multi-column'),
      groupLv2: groupLv2.layout
    },
    leftSidebar: {
      name: __('Left sidebar'),
      groupLv2: groupLv2.layout
    },
    rightSidebar: {
      name: __('Right sidebar'),
      groupLv2: groupLv2.layout
    },
    searchbar: {
      name: __('Search Bar'),
      groupLv2: groupLv2.layout
    },
    rsBorder: {
      name: __('Border'),
      groupLv2: groupLv2.rs
    },
    rsFont: {
      name: __('Font'),
      groupLv2: groupLv2.rs
    },
    rsColor: {
      name: __('Color'),
      groupLv2: groupLv2.rs
    },
    rsImage: {
      name: __('Image'),
      groupLv2: groupLv2.rs
    },
    background: {
      name: __('Background'),
      groupLv2: groupLv2.otherUi
    },
    font: {
      name: __('Font'),
      groupLv2: groupLv2.otherUi
    },
    userstyle: {
      name: __('User style'),
      groupLv2: groupLv2.advancedUi
    },
    adCleaner: {
      name: __('Ad remover'),
      groupLv2: groupLv2.cleaner
    },
    imageRs: {
      name: __('Image'),
      groupLv2: groupLv2.rsEnrichment
    },
    ses: { // search engines
      name: __('Search engines'),
      groupLv2: groupLv2.searches
    },
    morePicture: {
      name: __('Pictures'),
      groupLv2: groupLv2.otherRs
    },
    moreVideo: {
      name: __('Videos'),
      groupLv2: groupLv2.otherRs
    },
    moreDefinition: {
      name: __('Definitions'),
      groupLv2: groupLv2.otherRs
    },
    moreMessage: {
      name: __('Real-time messages'),
      groupLv2: groupLv2.otherRs
    }
  }

  // go setting
  var setting = {
    // go cols setting
    colsNb: {
      name: __('Columns'),
      groupLv3: groupLv3.cols,
      val: gm.get('gpp-colsNb', '1'),
      html: function() { 
        // i'd like it to be a function because it shouldn't run at start
        // and if it's not a function, 'this.val' is undefined
        return cfgWidget.number(this.id, this.val, 1);
      }
    },
    // go setting.colsOrder
    colsOrder: {
      name: __('Order'),
      groupLv3: groupLv3.cols,
      val: gm.get('gpp-colsOrder', '2'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, 
          {'1': __('Left to right'), '2':__('Top to bottom')}
        );
      },
      rely: 'colsNb',
      disabled: function() {
        return setting[this.rely].val == '1';
      }
    },
    // go setting.autoHideLeftSidebar
    autoHideLeftSidebar: {
      name: __('Auto hide'),
      groupLv3: groupLv3.leftSidebar,
      val: gm.get('gpp-autoHideLeftSidebar', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    },
    // go setting.autoHideRightSidebar
    autoHideRightSidebar: {
      name: __('Auto hide'),
      groupLv3: groupLv3.rightSidebar,
      val: gm.get('gpp-autoHideRightSidebar', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    },
    // go setting.fixedSearchbar
    fixedSearchbar: {
      name: __('Fixed on top'),
      groupLv3: groupLv3.searchbar,
      val: gm.get('gpp-fixedSearchbar', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    },
    // go setting.rsShadow
    rsShadow: {
      name: __('Shadow'),
      groupLv3: groupLv3.rsBorder,
      val: gm.get('gpp-rsShadow', '0'),
      html: function() {
        return cfgWidget.number(this.id, this.val, 0);
      }
    },
    // go setting.rsRadius
    rsRadius: {
      name: __('Radius'),
      groupLv3: groupLv3.rsBorder,
      val: gm.get('gpp-rsRadius', '0'),
      html: function() {
        return cfgWidget.number(this.id, this.val, 0);
      }
    },
    // go setting.rsBorderWidth
    rsBorderWidth: {
      name: __('Width'),
      groupLv3: groupLv3.rsBorder,
      val: gm.get('gpp-rsBorderWidth', '0'),
      html: function() {
        return cfgWidget.number(this.id, this.val, 0);
      }
    },
    // go setting.rsFontSize
    rsFontSize: {
      name: __('Size'),
      groupLv3: groupLv3.rsFont,
      val: gm.get('gpp-rsFontSize', '0'),
      html: function() {
        return cfgWidget.number(this.id, this.val, -5);
      }
    },
    // go setting.rsFontEffect
    rsFontEffect: {
      name: __('Effect'),
      groupLv3: groupLv3.rsFont,
      val: gm.get('gpp-rsFontEffect', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('Default'),
          '2': __('Engraved'),
          '3': __('Shadow'),
          '4': __('Blur')
        });
      }
    },
    // go setting.rsColorMethod
    rsColorMethod: {
      name: __('Method'),
      groupLv3: groupLv3.rsColor,
      val: gm.get('gpp-rsColorMethod', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('Schema'),
          '2': __('Random'),
          '3': __('Random dark')
        });
      }
    },
    // go setting.rsColorSchema
    rsColorSchema: {
      name: __('Schema'),
      groupLv3: groupLv3.rsColor,
      val: gm.get('gpp-rsColorSchema', '255,255,255'),
      html: function() {
        return cfgWidget.colorpicker(this.id, this.val);
      },
      rely: 'rsColorMethod',
      disabled: function() {
        return setting[this.rely].val != '1';
      }
    },
    // go setting.rsColorEffect
    rsColorEffect: {
      name: __('Effect'),
      groupLv3: groupLv3.rsColor,
      val: gm.get('gpp-rsColorEffect', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('Normal'),
          '2': __('Gradient'),
          '3': __('Aqua'),
        });
      }
    },
    // go setting.rsImageStyle
    rsImageStyle: {
      name: __('style'),
      groupLv3: groupLv3.rsImage,
      val: gm.get('gpp-rsImageStyle', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('Default'),
          '2': __('Glass frame')
        });
      }
    },
    // go setting.backgroundColor
    backgroundColor: {
      name: __('Color'),
      groupLv3: groupLv3.background,
      val: gm.get('gpp-backgroundColor', '255,255,255'),
      html: function() {
        return cfgWidget.colorpicker(this.id, this.val);
      }
    },
    // go setting.backgroundEffect
    backgroundEffect: {
      name: __('Effect'),
      groupLv3: groupLv3.background,
      val: gm.get('gpp-backgroundEffect', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('Normal'),
          '2': __('Gradient')
        });
      }
    },
    // go setting.fontColorSchema
    fontColorSchema: {
      name: __('Color'),
      groupLv3: groupLv3.font,
      val: gm.get('gpp-fontColorSchema', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('Default'),
          '2': __('Reverse')
        });
      }
    },
    // go setting.css
    css: {
      name: __('CSS'),
      groupLv3: groupLv3.userstyle,
      val: gm.get('gpp-css', ''),
      html: function() {
        return cfgWidget.text(this.id, this.val);
      }
    },
    // go setting.sponsoredLinks
    sponsoredLinks: {
      name: __('Sponsored links'),
      groupLv3: groupLv3.adCleaner,
      val: gm.get('gpp-sponsoredLinks', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    },
    // go setting.favicon
    favicon: {
      name: __('Favicon'),
      groupLv3: groupLv3.imageRs,
      val: gm.get('gpp-favicon', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    },
    // go setting.preview
    preview: {
      name: __('Preview'),
      groupLv3: groupLv3.imageRs,
      val: gm.get('gpp-preview', '1'),
      html: function() {
        return cfgWidget.choices(this.id, this.val, {
          '1': __('None'),
          '2': 'googlepreview',
          '3': 'thumbshots'
        });
      }
    },
    // go setting.ses
    ses: { // search-engines
      name: __('Code'),
      groupLv3: groupLv3.ses,
      val: gm.get('gpp-ses', '{'
        + 'name: "Yahoo",'
        + 'query: "http://search.yahoo.com/search?p={gpp-keyword}",'
        + 'show: 0,'
        + 'favicon: "http://search.yahoo.com/favicon.ico"'
      + '},{'
        + 'name: "Bing",'
        + 'query: "http://www.bing.com/search?q={gpp-keyword}",'
        + 'show: 0,'
        + 'favicon: "http://www.bing.com/favicon.ico"'
      + '}'),
      html: function() {
        return cfgWidget.text(this.id, this.val);
      }
    },
    // go setting.flickr
    flickr: {
      name: __('Flickr'),
      groupLv3: groupLv3.morePicture,
      val: gm.get('gpp-flickr', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    },
    // go setting.wikipedia
    wikipedia: {
      name: __('Wikipedia'),
      groupLv3: groupLv3.moreDefinition,
      val: gm.get('gpp-wikipedia', '0'),
      html: function() {
        return cfgWidget.bool(this.id, this.val);
      }
    }
  };

  // go resource
  var resource = {
    // loading image
    loadingImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAB\
      XAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcWE\
      QkEgj5FeAAACRZJREFUaN7tWH2MXUUV/52ZuXPvfe/t2+9d3nYptZSWQqBSTEE+asBoUkBDYtR\
      /DFjFVExTRCkoUlqDSWusoECg2ogfDSohgAGhUiTQEIRQypcC1ihJW7vL9mt33+e9c2fm+Mc+4\
      NEQoduy1WR/ycm7uffNnfO753fOnBlgGtOYxjSOJehwByz72mW3GGMuU0qylApSShaCQETvvJD\
      oA8xBIAAMAGACIyNBK39y6883HY4/6nAJ7Nq186RGknWFOkQYBwiDEEqJ9/CTm861uvtuVkwT9\
      4UgWOtdvVaecbj+HDaBjy86+1ud3R0Xz5w5Gx85cTYKuTx0GEJJCc8O3gOCBKQkCKUAFmBv4dj\
      BZQ7MHm8FiUjAWIPKeAVvvrlv86eXXLLuQydQa9RGdE2jUauiUWuAQDCZQahDBGEEHUWQRGB+J\
      wokNRQxlAKczZAkDZg0BQjIMotavYZGozI0mRwQhzvgh+tvH7dZVnfOw3sPZkYYhsgX2hEIBec\
      sjDHIslZLYU2KzKTw7BFFMdo7OqF1CDBPyItoz2QIqEmlPvNW6+wSgKADDakCWGvAzGAPgLmZn\
      c0IAAD8xDUJeHiQJERRDqkxsDaDNebFKSOglLonTZMlnj1ICDjnITCh77elw4emdLM4kQcRQVi\
      CJQtJAs671z/3xcsemhIJAQAJutd6W2skdbD3gPfwTaed83DOwXsH5xycs3DOgtmDiKGUQhRqB\
      EEAIQTqjSq89esnuw5MisB13/tBnTw/kNZrgCCUK2UMD/0bEIRCIY84HyEMNYJAIQgU4jhCoVB\
      A0kjw0gvb8evf/BIbNtwK5yzSNN3T09uzabIE1GQHGpNeVa2WL3SZGfjjg/djy2OPItQaxWI7S\
      gMzMDg4iIGBQTAz/rHjdezY8XeUy2VIKWBSg8uXXoFatVz31n7ltLMWZ1O2Erfit5t+tqi/r3/\
      zrFknda1cuQIMQAoJ75syYj+xUEkBKRWICJkx6O7twapVa2rlsbGLF5x57tYpbSUOxYP3333yj\
      NLg5qG9I7M23HEbtNaQUoJbspiI4NkjyzL09PTh2ytXloXHp05ZsOi5Ke+F3gtPbHlAHzdw/HU\
      739j13Y133RG3FdrR3dMDKSWc9xgbHcX+Awew+Pzz6xdc+MnbAyHWn7bwnH3HpJn7b9jx2ks56\
      92X/3D/fSuee/aZeXGcQy2p4YwFC2uLL1i8Zv680386Y+bs7GjOedQIPPnYg1pr/aWOrq5L47h\
      wdrla6V19w3dw6qmnY/mKqzA6evCvWZr+zll758KzPjH2P0Vgy8P3XdnV3bOqvaOrJISAUgpxL\
      sbmhx+BzTJc9NnPIKk3kJkUqUkOWGtvOONj5204GnOrI3L8kXulMdnG9s6upd29fRBCQgoJBsN\
      bxsDgDIyPjYFAkFJB5CSCONddL4/f+dL2p0sfPfPc1UdKQBzJ4H37DmxoK3Qs7e7pQ6A0SEwkr\
      fMeGTtEUYw4juCshfcO3jkwM/KFAnSgb3x5+9NXHTMCt92y9iIlgq929vQAguCdn3DQe7BnwDn\
      koxyU1nDewXsP37zPHgjzOQgZ3LLt2a2XHxMCSojvF9rbSEoJMIPZTRgYzBOtdq1WQVJvNJ8z0\
      LzvmAHHkFKSlPLOp7Y+2jGlBH609saSUGqhjnJgz/Ce4TzAnpsR8CACxspjqNWrmOj3mvsHeLC\
      3YO8hpQQJGVtjL59SAt7hC1IpEYc5MGNCOjShb8++uQoLlCvjSJMUUlBLzaOW9rq5UxZYOqUEr\
      HeXKCWhlHzPWkxECIIAB/cfQJo2IKQCCXrXP0VzaiEEBMkFD9x796IpzAE+S6gAPHGs0HRaQkq\
      JMAxRaCtg/74RPPHkn7Ft23PIbIZCWxviXA5aaygpW2aeKLGO8PkpWQfWrLpGSakKihQgACkFo\
      ihCrpDHvpERbH/+ebywfRv++ca/EMchyuPj+MbXr8DME07AnBPnYO68eZh/8qloay+i0WjAGAM\
      mBjs3OCUEpFTduTgmrTWiMIQOI2ze/BCe+cvTGB4eQhznMGNwEPNPng8iAoPhnEN5fBxPPfUkH\
      n98C6x16O/vw7IrV2DguBLqjRriON8/GQLycAecNOeEb5bHqxdWqhUcHB3FY4/+Ca+88jKkCtD\
      e0YlCsR0AIcsMkjRBmqaw1kIqhWKxA7lcAW3FdngPvPq3VyCUws5du/Hm0FB+8Pieu1988dXqh\
      9YLLbngnFO6jut7dWTvQcRxiDgKkcvlEEUhhJDvnMZx84pbDzL4XWd2zAxnXXP/7KGUhJDix7+\
      46/fXHDUJ3XTTTbR7926xc+dOMTw8LF57Y2j3eX19l5ZKfbNNYnRi0qhS2Rc550OAI0CERAiJK\
      CCSSkohhRJCCUlKBQiCwAeBclprF0fahVpbHUY2CAKOwij51aZ7bgOora+v186dO9fNmTPHz5o\
      1y61Zs4bfNwLLli2jgwcP0sjIiNi7dy+NjY2JRqNBxhghhBBSysAYEyRJEgDQACIAYcuvAhA0Z\
      SmbFY5aTlV802zTTNNSAAmAlIQw+VzOGmNSY0wGwGutOY5j39nZyf39/b5UKvne3l7euHEjfyA\
      JrV69WlSrVTk0NCT37Nkj9u/fL4eHh6X3PnDOBd572XReAVDMLJiZAAgiEk35OABMRExEroWEF\
      UJYIYTN5XJZqVTy/f39dmBgwJdKJdtoNPzNN9/MR1SFRkdHuVqtcpIkzjnHzjmWUrpyueycc+a\
      QLy4O+fKtEUAzAgzAtVoURVwsFr1zzhtjuNFouHK5jLa2tqOTxMuXLxe1Wk1UKhUaGxsT4+PjV\
      C6XRaVSQbVapWq1Krz3aHGeDnk3H0oiDEMuFApcKBS4ra2NOzo6fLFY5M7OTl8sFjmfz/v169f\
      zUatCV199NaVpSvV6XaRpSk3HKUkSJElCSZKQMYaMMW9XliYpEBGUUlBKQWuNpq45iiKO4xiFQ\
      oHDMPRRFL1Nat26dXzUyygAXH/99ZQkCWq1GtXrdXLOkZvYqJAxhpxzsNaCmemt0klEkFKylBJ\
      KKdZag4i4SYrz+Txrrfn99P6h7YnXrl1LWZYhyzK0EEIrASEEpJSslEIQBNBa49prr2VMYxrTm\
      Mb/Nf4DQzWWhfRUYi0AAAAASUVORK5CYII="
  };
  
  // go coms
  var com = {
    // go com.cols
    cols: {
      enabled: +setting.colsNb.val > 1,
      run: function() {
        // top-to-bottom
        if (setting.colsOrder.val === '2') {
          return ; // need only css
        }
        // left-to-right
        var cnt = +setting.colsNb.val;
        var containers = $('.gpp-container');
        var cols = this;
        containers.each(function(i, dom) {
          var cur = $(dom);
          var tr = $('<tr>');
          if (cur.attr('id') != 'ires') {
            var td = $('<td>').attr({'colspan': cnt}).appendTo(tr).addClass('gpp-container');
            td.html(cur.html());
            cols.getTable().append(tr);
            cur.addClass('gpp-hidden').removeClass('gpp-containers');
          } else {
            cols.handleResults(cur, cnt);
          }
        });
      },
      getTable: function() {
        if (!this.table) {
          var cnt = +setting.colsNb.val;
          this.table = $('<table>').attr({'cellspacing': '15'}).addClass('gpp-cols');
          var colgroup = $('<colgroup>').attr({
            'span': cnt
          }).appendTo(this.table);
          var w = 100 / cnt;
          for (var i = 0; i < cnt; i++) {
            $('<col>').attr({
              'width': w + '%'
            }).appendTo(colgroup);
          }
        }
        return this.table;
      },
      addCss: function() {
        if (setting.colsOrder.val === '2') { // top-to-bottom
          gm.css('#ires > ol {\
            -moz-column-count: ' + setting.colsNb.val + '\
          }');
        } else {
          gm.css('.gpp-rs {\
            vertical-align: top;\
          }\
          #res {\
            padding: 0;\
          }\
          #res > *:first-child {\
            margin-top: 0;\
          }\
          table.gpp-cols {\
            position: relative;\
            top: -10px;\
          }\
          #center_col {\
            padding: 0;\
          }\
          .gpp-rs ul {\
            list-style: none;\
          }');
        }
      },
      handleResults: function(res, cnt) { // only for left-to-right
        var rs = $('#ires > ol > li');
        var table = this.getTable();

        var colsNum = 1, curTr;
        rs.each(function(i, dom) {
          var li = $(dom);
          if (li.hasClass('gpp-rs')) {
            if (colsNum === 1) {
              curTr = $('<tr>').appendTo(table);
            }
            $('<td>').html(li.html()).appendTo(curTr).addClass('gpp-rs');
            li.removeClass('gpp-rs');
            if (colsNum === cnt) {
              colsNum = 1;
            } else {
              colsNum++;
            }
          } else {
            $('<tr>').append(
              $('<td>').attr({'colspan': cnt}).html(li.html())
            ).appendTo(table).addClass('gpp-tip');
            li.removeClass('gpp-tip');
            colsNum = 1;
          }
        });
        var ires = $('#ires');
        table.insertBefore(ires);
        ires.addClass('gpp-hidden');
      }
    },
    // go com.background
    background: {
      // always enable, default is white
      enabled: true,
      addCss: function() {
        var eff = setting.backgroundEffect.val,
          color = setting.backgroundColor.val;

        var bgcolor;
        if (eff === '1') {
          bgcolor = 'rgb(' + color + ')';
        } else {
          colors = color.split(',');
          var from = util.rgbAdd(colors, 30).join(','),
            to = util.rgbAdd(colors, -30).join(',');
          switch (cssGradientEngine) {
            case 'gecko':
              bgcolor = '-moz-linear-gradient(top, rgb(' + from + '), rgb(' + to + '))';
              break;
            case 'webkit':
              bgcolor = '-webkit-gradient(linear, left top, left bottom, from(rgb(' + from + ')), to(rgb(' + to + ')))';
              break;
            default:
              bgcolor = 'rgb(' + colors + ')';
          }
        }
        // .gac_xxx is google auto complete
        gm.css('body {\
          background:' + bgcolor + ';\
        }\
        #logo, #nav span {\
          opacity: .2;\
        }\
        .gac_od, .gac_id, .gac_m, .gbm {\
          background: rgb(' + color + ') !important;\
          border-width: 0 !important;\
        }\
        .gac_od, .gbm {\
          -moz-box-shadow: 0 1px 4px #000;\
        }\
        .gac_b {\
          color: #222;\
        }\
        .goog-date-picker {\
          color: #222;\
        }\
        #tbd, #hidden_modes, #gog, #leftnav {\
          background: transparent;\
        }');
      }
    },
    // go com.fontColorSchema
    fontColorSchema: {
      enabled: setting.fontColorSchema.val !== '1',
      addCss: function() {
        // if default do nothing
        // else
        gm.css('body {\
          color: #ddd;\
        }\
        #gsr a:link {\
          color: #dd1\
        }\
        .gb1:link, .gb2:link, .gb3:link, .gb4:link {\
          color: #dd1 !important;\
        }\
        #guser {\
          color: #ddd;\
        }\
        #gsr a:visited {\
          color: #11c;\
        }\
        #gsr a:active {\
          color: #fff;\
        }\
        a > em {\
          color: #f91;\
        }\
        a.gb1:active, a.gb2:active, a.gb3:active, a.gb4:active {\
          color: #fff !important;\
        }');
      }
    },
    // go com.userstyle
    userstyle: {
      enabled: !!setting.css.val,
      addCss: function() {
        gm.css(setting.css.val);
      }
    },
    // go com.autoHideLeftSidebar
    autoHideLeftSidebar: {
      enabled: +setting.autoHideLeftSidebar.val,
      addCss: function() {
        gm.css('#leftnav {\
          z-index: 100;\
          width: 151px !important;\
          left: -142px;\
          -moz-box-shadow: 0 1px 5px #000;\
          -webkit-box-shadow: 0 1px 5px #000;\
          -moz-border-radius: 0 10px 10px 0;\
          -webkit-border-radius: 0 10px 10px 0;\
          background: rgba(' + setting.backgroundColor.val + ', 0.9);\
        }\
        #leftnav:hover {\
          left: 0px;\
        }\
        #center_col {\
          margin-left: 10px;\
        }');
      },
      run: function() {
        $('#cnt').removeAttr('style');
      }
    },
    // go com.autoHideRightSidebar
    autoHideRightSidebar: {
      enabled: +setting.autoHideRightSidebar.val,
      hasRhs: (function() {
        return !!$('#rhs').size();
      })(),
      addCss: function() {
        var css = '#cnt {\
          max-width: none;\
        }\
        #center_col {\
          margin-right: 10px;\
        }';
        if (this.hasRhs) {
          css += '#rhs {\
            width: 18px;\
            border: 0;\
            overflow: hidden;\
            position: absolute;\
            top: 0;\
            right: 0;\
          }\
          #rhs_block {\
            width: 264px;\
            background: rgba(' + setting.backgroundColor.val + ', 0.9);\
            -moz-box-shadow: 0 1px 5px #000;\
            -webkit-box-shadow: 0 1px 5px #000;\
            -moz-border-radius: 10px 0 0 10px;\
            -webkit-border-radius: 10px 0 0 10px;\
            margin: 5px;\
            padding-left: 5px;\
            padding-top: 5px;\
          }\
          #rhs:hover {\
            width: 264px;\
          }';
        }
        gm.css(css);
      },
      run: function() {
        if (this.hasRhs) {
          $('#rhs').removeAttr('style');
          $('#rhs_block').removeAttr('style');
        }
      }
    },
    // go com.fixedSearchbar
    fixedSearchbar: {
      enabled: +setting.fixedSearchbar.val,
      addCss: function() {
        gm.css('#gog, #sfcnt, #subform_ctrl {\
          position: fixed;\
          background: rgba(' + setting.backgroundColor.val + ', .9);\
        }\
        #gog {\
          width: 100%;\
          z-index: 11;\
          left: 0;\
          top: 0;\
        }\
        #guser, #gbar{\
          padding: 1px 0;\
        }\
        #gbar nobr, #guser nobr {\
          line-height: 22px;\
        }\
        #gpp-cfg-cfgBtn {\
          position: fixed;\
        }\
        #sfcnt {\
          z-index: 10;\
          left: 0;\
          top: 25px;\
          padding: 18px 0;\
          width: 100%;\
          -moz-box-shadow: 0 1px 5px #000;\
        }\
        #subform_ctrl {\
          z-index: 10;\
          width: 600px;\
          top: 88px;\
          min-height: 0;\
          background: transparent;\
        }\
        body {\
          margin-top: 115px;\
        }');
      },
      run: function() {
        $('#sfcnt').removeAttr('style');
      }
    },
    // go com.rsShadow
    rsShadow: {
      enabled: +setting.rsShadow.val > 0,
      addCss: function() {
        gm.css('.gpp-rs {\
          -moz-box-shadow: 0 1px ' + setting.rsShadow.val + 'px #000;\
          -webkit-box-shadow: 0 1px ' + setting.rsShadow.val + 'px #000;\
        }');
      }
    },
    // go com.rsRadius
    rsRadius: {
      enabled: +setting.rsRadius.val > 0,
      addCss: function() {
        var radius = +setting.rsRadius.val;
        var css = '-moz-border-radius: ' + radius + 'px;'
          + '-webkit-border-radius: ' + radius + 'px;';
        var padd = 5;
        if (radius / 2 > 5) {
          padd = Math.ceil(radius / 2);
        }
        css += 'padding: ' + padd + 'px ' + padd * 2 + 'px;';
        gm.css('.gpp-rs {' + css + '}');
      }
    },
    // go com.rsBorderWidth
    rsBorderWidth: {
      enabled: +setting.rsBorderWidth.val > 0,
      addCss: function() {
        gm.css('.gpp-rs { border: ' + setting.rsBorderWidth.val + 'px solid rgba(100, 100, 100, .2) }');
      }
    },
    // go com.rsFontSize
    rsFontSize: {
      // always run, default is title: 16, content: 13
      enabled: true,
      addCss: function() {
        var content = 13,
          title = 16,
          add = +setting.rsFontSize.val;
        // add
        content += add; 
        title += add;
        gm.css('.gpp-rs * {\
          font-size: ' + content + 'px\
        }\
        .gpp-rs .r * {\
          font-size: ' + title + 'px;\
        }');
      }
    },
    // go com.rsFontEffect
    rsFontEffect: {
      enabled: true,
      addCss: function() {
        var css = '', 
          css2 = '', 
          fontEffect = setting.rsFontEffect.val;
        switch (fontEffect) {
          case '2':
            css += 'text-shadow: 0 -1px 0 #000;';
            break;
          case '3':
            css += 'text-shadow: 1px 1px 1px #333;';
            break;
          case '4':
            css += 'text-shadow: 0 0 1px #555;';
            break;
        }
        if (fontEffect === '2') {
          css += 'color: #ddd;';
          css2 += '.gpp-rs a:link {\
            color:#dd1;\
          }\
          .gpp-rs em {\
            color:#f91;\
          }\
          .gpp-rs a:visited {\
            color:#11c;\
          }\
          .gpp-rs cite {\
            color:#0c0;\
          }\
          .gpp-rs a:active {\
            color:#fff !important;\
          }';
        } else {
          css += 'color: #222;';
          css2 += '#gsr .gpp-rs a:link {\
            color:#11c;\
          }\
          #gsr .gpp-rs em {\
            color:#c11;\
          }\
          #gsr .gpp-rs a:visited {\
            color:#a0b;\
          }\
          #gsr .gpp-rs a:active {\
            color:#c11 !important;\
          }';
        }
        gm.css('.gpp-rs {' + css + '}' + css2);
      }
    },
    // go com.rsImageStyle
    rsImageStyle: {
      enabled: setting.rsImageStyle.val !== '1',
      addCss: function() {
        gm.css('.gpp-rs a > img, .gpp-rs td > img {\
          padding: 2px;\
          border: 0;\
          -moz-box-shadow: 0 1px 5px #000;\
          -webkit-box-shadow: 0 1px 5px #000;\
          background: rgba(255, 255, 255, .3);\
        }');
      }
    },
    // go com.rsBackground
    rsBackground: {
      // always run, default color is white
      enabled: true,
      colors: {},
      bgCss: function(rgb, eff) {
        switch (eff) {
          case '2': 
            var from = util.rgbAdd(rgb, 30).join(','),
              to = [+rgb[0] - 35, +rgb[1] - 15, rgb[2] - 30]; // more green
            switch (cssGradientEngine) {
              case 'gecko':
                return '-moz-linear-gradient(top, rgb(' + from + '), rgb(' + to + '))';
              case 'webkit':
                return '-webkit-gradient(linear, left top, left bottom, from(rgb(' + from + ')), to(rgb(' + to + ')))';
              default:
                return 'rgb(' + rgb.join(',') + ')';
            }
          case '3':
            var from = util.rgbAdd(rgb, 50).join(','),
              stop1 = util.rgbAdd(rgb, 10).join(','),
              stop2 = util.rgbAdd(rgb, -40).join(','),
              to = [+rgb[0] - 5, +rgb[1] + 15, rgb[2]]; // more green
              switch (cssGradientEngine) {
                case 'gecko':
                  return '-moz-linear-gradient(top,'
                    + 'rgb(' + from + '),'
                    + 'rgb(' + stop1 + ') 40%,'
                    + 'rgb(' + stop2 + ') 40%,'
                    + 'rgb(' + to + '))';
                case 'webkit':
                  return '-webkit-gradient(linear, left top, left bottom,'
                    + 'from(rgb(' + from + ')),'
                    + 'color-stop(40%, rgb(' + stop1 + ')),'
                    + 'color-stop(40%, rgb(' + stop2 + ')),'
                    + 'to(rgb(' + to + ')))';
                default:
                  return 'rgb(' + rgb.join(',') + ')';
              }
          default:
            return 'rgb(' + rgb.join(',') + ')';
        }
      },
      addCss: function() {
        if (setting.rsColorMethod.val === '1') {
          gm.css('.gpp-rs { background:' 
            + this.bgCss(setting.rsColorSchema.val.split(','), setting.rsColorEffect.val) 
            + '; }');
        }
      },
      run: function() {
        var mth = setting.rsColorMethod.val;
        var eff = setting.rsColorEffect.val;
        if (mth !== '1') {
          var self = this;
          var colors = this.colors;
          $('.gpp-rs:not(.gpp-rainbow)').each(function(i, dom) {
            var cur = $(dom);
            cur.addClass('gpp-rainbow');
            var tld = self.getTld(cur.find('.r a').attr('hostname'));
            if (!colors[tld]) {
              var tmp = [];
              for (var i = 0; i < 3; i++) {
                var tmp2 = parseInt(Math.random() * 80);
                if (mth == '2') { // light
                  tmp2 += 170;
                }
                tmp.push(tmp2);
              }
              colors[tld] = tmp;
            }          
            var color = colors[tld];
            cur.css({'background': self.bgCss(color, eff)});
          })
        }
      },
      getTld: function(hostname) {
        // a very easy way, not very accurate
        var hostParts = hostname.split(".");
        if (hostParts.length < 3) return hostname;
        // this info must be no mistake 'cause it is from wikipedia
        var gTLD = ["aero", "asia", "cat", "coop", "int", "com", "net", "org", "gov", "edu", 
              "biz", "info", "name", "jobs", "mil", "mobi", "museum", "pro", "tel", "travel"];
        var rootDomain = hostParts[hostParts.length - 2] + "."
                 + hostParts[hostParts.length - 1];
        if (gTLD.indexOf(hostParts[hostParts.length - 2]) >= 0) {
          rootDomain = hostParts[hostParts.length - 3] + "." 
                 + rootDomain;
        }
        return rootDomain;
      }
    },
    sponsoredLinks: {
      enabled: +setting.sponsoredLinks.val,
      run: function() {
        gm.css('#tads {display: none}');
      }
    },
    // go com.favicon
    favicon: {
      enabled: +setting.favicon.val,
      addCss: function() {
        gm.css('.gpp-rs img.gpp-favicon {\
          width: 16px;\
          height: 16px;\
          margin: 0 6px 0 0;\
          position: relative;\
          font-size: 9px;\
          top: 2px;\
        }');
      },
      run: function() {
        var self = this;
        $('.gpp-rs .r > a').each(function(i, dom) {
          var a = $(dom);
          var protocol = a.attr('protocol');
          var host = a.attr('hostname');
          var domain = protocol + '//' + host;

          $('<img>').attr({
            'alt': 'fav',
            'width': 16,
            'src': domain + '/favicon.ico'
          }).insertBefore(a).addClass('gpp-favicon');
        });
      }
    },
    // go com.preview
    preview: {
      enabled: setting.preview.val !== '1',
      addCss: function() {
        gm.css('a.gpp-preview {\
          display: block;\
          float: left;\
          margin: 2px 8px 2px 0;\
          text-align: center;\
        }\
        a.gpp-preview img {\
          display: block;\
          overflow: hidden;\
        }\
        .gpp-rs:after {\
          content: " ";\
          display: block;\
          clear: both;\
          height: 1px;\
        }');
      },
      run: function() {
        var self = this;
        var siteId = setting.preview.val;
        $('.gpp-rs .r > a').each(function(i, dom) {
          var a = $(dom);
          var protocol = a.attr('protocol');
          var host = a.attr('hostname');
          var domain = protocol + '//' + host;

          var prevLink = $('<a>').attr({
            'href': a.attr('href'),
            'target': '_blank'
          }).addClass('gpp-preview').insertBefore(a.parent());

          var src, width, height;
          if (siteId === '2') { // googlepreview.com
            // get the servername
            var s = domain.match(/:\/\/www\.(\w)|:\/\/(\w)/);
            s = s[1] || s[2];
            src = 'http://' + s + '.googlepreview.com/preview?s=' + domain;
            width = 111; height = 82;
          } else if (siteId === '3') { // thumbshots.org
            src ='http://open.thumbshots.org/image.pxf?url=' + domain; 
            width = 120; height = 90;
          }
          $('<img>').attr({
            'alt': host,
            'src': src,
            'width': width,
            'height': height
          }).appendTo(prevLink);
        });
      }
    },
    // go com.ses
    ses: {
      enabled: !!setting.ses.val,
      addCss: function() {
        gm.css('.gpp-sesContainer2 .gpp-sesIco {\
          margin-right: 8px;\
          position: relative;\
          top: 3px;\
        }\
        .gpp-sesContainer .gpp-sesIco {\
          padding: 3px;\
        }\
        .gpp-sesIco {\
          border: 0;\
        }\
        .gpp-sesContainer {\
          position: absolute;\
          right: 20px;\
        }\
        .gpp-sesContainer2 {\
          list-style: none;\
          padding: 0;\
          margin: 0 0 10px;\
        }');
      },
      getSesContainer: function() {
        if (!this.sesContainer) {
          this.sesContainer = this.createSesContainer();
        }
        return this.sesContainer;
      },
      createSesContainer: function() {
        return $('<div>').addClass('gpp-sesContainer').appendTo('#sfcnt');
      },
      getSesContainer2: function() {
        if (!this.sesContainer2) {
          this.sesContainer2 = this.createSesContainer2();
        }
        return this.sesContainer2;
      },
      createSesContainer2: function() {
        return $('<ul>').appendTo(myRSBar.getElm()).addClass('gpp-sesContainer2');
      },
      engines: function() {
        return eval('[' + setting.ses.val + ']');
      },
      run: function() {
        var engines = this.engines();
        for (var i = 0, len = engines.length; i < len; i++) {
          var link = $("<a>").addClass('gpp-sesLink').attr({
            'href': engines[i].query.replace('{gpp-keyword}', encodeURIComponent(keyword)),
            'target': "_blank"
          });
          var ico  = $("<img>").attr({
            'alt': "fav",
            'src': engines[i].favicon || "http://" + engines[i].query.split('/')[2] + "/favicon.ico"
          }).addClass('gpp-sesIco');

          if (engines[i].show) {
            link.html(__("Go to %engine%").replace('%engine%', '<em>' + engines[i].name + '</em>'));

            $("<li>").append(ico)
              .append(link)
              .appendTo(this.getSesContainer2()); 
          } else {
            link.append(ico).appendTo(this.getSesContainer());
          }
        }
      }
    },
    // go com.flickr
    flickr: {
      enabled: +setting.flickr.val,
      addCss: function() {
        gm.css('.gpp-moduleFramePager {\
          float: right;\
          font-size: 9pt;\
        }\
        .gpp-moduleFrame a.gpp-flickr {\
          background: #fff;\
          display: block;\
          float: left;\
          width: 75px;\
          height: 75px;\
          overflow: hidden;\
        }\
        .gpp-moduleFrame a.gpp-flickr img {\
          border: 0;\
          font-size: 9px;\
          overflow: hidden;\
          vertical-align: middle;\
        }\
        .gpp-moduleFramePager a {\
          margin: 4px;\
        }\
        .gpp-moduleFrame:after {\
          content: " ";\
          display: block;\
          clear: both;\
        }');
      },
      run: function() {
        this.frame = util.createModuleFrame(__('Flickr'));
        this.showData(1);  // first run
      },
      showData: function(page) {
        var frame  = this.frame;
        var header = frame.find('h3');
        // clear paging container, it will be recreated later..
        if (header.find('div').size()) {
          header.find('div').remove();
        }
        while (header.next().size()) { // clear the result ..
          header.next().remove()
        }
        util.createModuleFrameCommonContainer()
          .append(util.createLoadingImage())
          .appendTo(frame);
        // flickr api params
        // @link http://www.flickr.com/services/api/flickr.photos.search.html
        var param = [];
        param.push("method=flickr.photos.search");
        param.push("api_key=bfedfb888337696dd2a44fa89b6eab88");
        param.push("text=" + encodeURIComponent(keyword));
        param.push("sort=relevance");
        param.push("per_page=16");
        param.push("page=" + page);
        param.push("format=json");
        param.push("nojsoncallback=1");
        
        var api_url = "http://api.flickr.com/services/rest?" + param.join("&");

        var request = {
          method: 'GET',
          url: api_url,
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
          },
          onload: function(response) {
            frame.find('.gpp-moduleFrameCommonContainer').remove();
            var data = eval("(" + response.responseText + ")");
            if (data.photos.total == 0) { // No any photo ...
              util.createModuleFrameCommonContainer()
                .html(__("No related pictures"))
                .appendTo(frame);
              return;
            }
            
            if (data.photos.pages > 1) { // If there are more than 1 pages ..
              var divPage = $("<div>").addClass('gpp-moduleFramePager').prependTo(header);
              
              if ( 1 < page ) { // If current page is not first
                $("<a>").attr({
                  'href': '#gpp-goToPrev',
                  'title': __("Prev"),
                }).html("&lt;").bind('click', function(e) {
                  com.flickr.showData(page - 1);
                  e.preventDefault();
                }).appendTo(divPage);
              }
              var current = $("<span>").html(page).appendTo(divPage);
              if (data.photos.pages > page) { // If current page is not last
                var next = $("<a>").attr({
                  'href': '#gpp-goToNext',
                  'title': __("Next")
                }).html("&gt;").bind('click', function(e) {
                  com.flickr.showData(page + 1);
                  e.preventDefault();
                }).appendTo(divPage);
              }
            }
            var images = data.photos.photo;
            for (var i = 0; i < images.length; i++) {
              var src = "http://farm" + images[i].farm
                + ".static.flickr.com/" + images[i].server
                + "/" + images[i].id + "_" + images[i].secret
                + "_s.jpg";
              var url = "http://www.flickr.com/photos/" + images[i].owner
                + "/" + images[i].id;
              var img = $("<img>").attr({
                'alt': images[i].title,
                'src': src
              });
              var link = $("<a>").attr({
                'href': url,
                'target': '_blank'
              }).addClass('gpp-flickr').append(img).appendTo(frame);
            }
          }
        };
        gm.xhr(request);
      }
    },
    // go com.wikipedia
    wikipedia: {
      enabled: +setting.wikipedia.val,
      addCss: function() {
        gm.css('.gpp-wikipedia {\
          background: #fff url(http://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png) right bottom no-repeat;\
        }\
        .gpp-wikipedia ul {\
          list-style-image: url(http://en.wikipedia.org/favicon.ico);\
          margin: 10px 10px 40px 35px;\
          padding: 0;\
        }\
        .gpp-wikipedia a {\
          position: relative;\
          top: -3px;\
        }');
      },
      run: function() {
        var frame = util.createModuleFrameWithContainer(__('Wikipedia'));
        gm.xhr({
          method: 'GET',
          url: 'http://' + __('en') 
            + '.wikipedia.org/w/api.php?action=opensearch&search=' 
            + encodeURIComponent(keyword),
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
          },
          onload: function(response) {
            frame.find('.gpp-moduleFrameCommonContainer').remove();
            var rs = eval("(" + response.responseText + ")")[1];
            var len = rs.length;
            if (len) {
              frame.addClass('gpp-wikipedia');
              var ul = $('<ul>').appendTo(frame);
              for (var i = 0; i < len; i++) {
                $('<li>').append($('<a>').attr({
                  'href': 'http://' + __('en') + '.wikipedia.org/wiki/' + rs[i]
                }).html(rs[i])).appendTo(ul);
              }
            } else {
              frame.append(util.createModuleFrameCommonContainer().html(__('No related definition')));
            }
          }
        });
      }
    }
  };

  // go app
  var app = {
    // go init environment
    initEnv: function() {
      // go css app
      gm.css('.gpp-clickable, .gpp-btn {\
        color: #fff;\
        text-shadow: 0 -1px 0 #222;\
        cursor: pointer;\
      }\
      .gpp-clickable:hover, .gpp-btn:hover {\
        text-shadow: 0 0 2px #fff;\
      }\
      .gpp-clickable:active, .gpp-btn:active {\
        text-shadow: 0 -1px 0 #111;\
      }\
      .gpp-btn {\
        font: 13px/18px Tahoma, Helvetica, Arial, sans-serif;\
        -moz-box-shadow: 0 1px 2px #000;\
        -webkit-box-shadow: 0 1px 2px #000;\
        padding: 0 10px;\
        -moz-border-radius: 10px;\
        -webkit-border-radius: 10px;\
        text-align: center;\
      }\
      .gpp-btn:active {\
        -moz-box-shadow: 0 1px 1px #000;\
        -webkit-box-shadow: 0 1px 1px #000;\
        position: relative;\
        top: 1px;\
      }\
      .gpp-hidden {\
        display: none;\
      }');
      // go init rs
      $('#ires > ol > li.g').addClass('gpp-rs');
      $('#res > *').addClass('gpp-container').each(function(i, dom) {
        var cur = $(dom);
        (cur.css('display') == 'none' || cur.hasClass('hd') || !cur.html()) 
          && cur.removeClass('gpp-container');
      });
    },
    // go init configuration
    initCfg: function() {
      cfg.btn.appendTo('body');
    },
    // go execute
    exec: function() {
      for (var i in com) {
        var c = com[i];
        if (c.enabled) {
          c.addCss && c.addCss();
          c.run && c.run();
        }
      }
    },
    // go isFirstRun
    isFirstRun: (function() {
      return !gm.get('gpp-runned');
    })(),
    // go firstRun
    firstRun: function() {
      gm.set('gpp-runned', true);
      gm.css('#gpp-firstrun-panel {\
        background: #fff;\
        -moz-box-shadow: 0 5px 10px #111;\
        width: 400px;\
        height: 340px;\
        text-align: center;\
        padding: 10px;\
      }\
      #gpp-firstrun-panel ul {\
        width: 250px;\
        margin: 20px auto;\
        list-style: none;\
      }\
      .gpp-quickConfig {\
        margin: 10px auto;\
        line-height: 22px;\
        background: #16d;\
        background: -moz-linear-gradient(top, #16f, #069);\
      }\
      .gpp-quickConfig:hover {\
        background: #19f;\
        background: -moz-linear-gradient(top, #27f, #09a);\
      }\
      .gpp-quickConfig:active {\
        background: #16d;\
        background: -moz-linear-gradient(top, #16f, #069);\
      }');
      var panel = $('<div>').addClass('gpp-shadowBox').attr({id: 'gpp-firstrun-panel'});
      $('<h4>').html(__('Hello, it seems you are the first time to use Google++'))
        .appendTo(panel);
      $('<p>').html(__('To use this script, you can click the "G++" button at the top of the page to config by yourself.'))
        .appendTo(panel);
      $('<p>').html(__('Or click one of the options below for a quick config'))
        .appendTo(panel);
      // only run in firstrun functions
      var closeThisPanel = function() {
        shadow.hide();
        panel.addClass('gpp-hidden');
      };
      var applySettings = function(config) {
        for (var key in config) {
          gm.set('gpp-' + key, config[key]);
        }
        location.reload();
      };
      // buttons, options
      var options = $('<ul>');
      $('<li>').addClass('gpp-quickConfig gpp-btn').html(__("Simple and clean"))
        .appendTo(options).bind('click', function() {
          closeThisPanel();
          applySettings({
            autoHideLeftSidebar: '1',
            autoHideRightSidebar: '1',
            sponsoredLinks: '1',
            favicon: '1',
            preview: '2'
          });
        });
      $('<li>').addClass('gpp-quickConfig gpp-btn').html(__("Classic G++"))
        .appendTo(options).bind('click', function() {
          closeThisPanel();
          applySettings({
            autoHideLeftSidebar: '1',
            autoHideRightSidebar: '1',
            sponsoredLinks: '1',
            favicon: '1',
            preview: '2',
            colsNb: '2',
            colsOrder: '1',
            rsRadius: '10',
            rsBorderWidth: '1',
            rsColorMethod: '2'
          });
        });
      $('<li>').addClass('gpp-quickConfig gpp-btn').html(__("Full featured"))
        .appendTo(options).bind('click', function() {
          closeThisPanel();
          applySettings({
            autoHideLeftSidebar: '1',
            autoHideRightSidebar: '1',
            sponsoredLinks: '1',
            favicon: '1',
            preview: '2',
            colsNb: '2',
            colsOrder: '2',
            rsShadow: '5',
            rsRadius: '10',
            rsColorMethod: '3',
            fixedSearchbar: '1',
            rsFontSize: '-1',
            rsFontEffect: '2',
            rsColorEffect: '3',
            rsImageStyle: '2',
            backgroundColor: '80,80,80',
            backgroundEffect: '2',
            fontColorSchema: '2',
          });
        });
      $('<li>').addClass('gpp-quickConfig gpp-btn').html(__("No pre-config, I'll do it myself"))
        .appendTo(options).bind('click', function() {
          closeThisPanel();
          cfg.show();
        });
      options.appendTo(panel);
      // options end, show tip
      $('<p>').html(__('Always remember that you can config almost every single detail by clicking the G++ button at the top of the page'))
        .appendTo(panel);

      panel.appendTo($('body'));
      shadow.setBox(panel).click(function() {
        closeThisPanel();
      }).show();
    },
    // go run 
    run: function() {
      this.initEnv();
      this.initCfg();
      this.exec();
      if (this.isFirstRun) {
        this.firstRun();
      }
    }
  };
  // go app.run()
  if ($('.g').size()) {
    app.run();
  } else {
    addEventListener('DOMNodeInserted', app.run, false);
  }
})();
