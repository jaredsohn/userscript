// ==UserScript==
// @name           word highlight
// @namespace      http://ss-o.net/
// @description    keywords highlight for Google Search and All
// @include        http://*
// @version        1.0.10
// ==/UserScript==

//console.time("highlight");
(function _word_hightlight(loaded){
  var word_hightlight = _word_hightlight;
  if (!loaded && window.opera && document.readyState == 'interactive') {
    document.addEventListener('DOMContentLoaded', function(){
      loaded = true;
      word_hightlight(true);
    }, false);
    window.addEventListener('load', function(){
      if (!loaded)
        word_hightlight(true);
    }, false);
    return;
  }
  if (document.contentType && !/html/i.test(document.contentType))
    return;

  // keybinds
  var KEY_NEXT = 'n';
  var KEY_PREV = 'N';
  var KEY_SEARCH = 'C-/';

  // open new tabs?
  var TARGET_BLANK = false;

  var isOpera = !!this.opera,
    isFirefox = !!this.Components,
    isChromium = !!this.chromium,
    isSafari = this.getMatchedCSSRules && !isChromium;
  var UP_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAQ0lEQVR42mNgGAjw+vXr/yBMSB1RAGYYVQxFN4wiQ3EZRpahhAwjyVBChpBkKCHNJBlKSBMhTFXDUAwlpIhUzEBtAABtjZyQ3YVdfgAAAABJRU5ErkJggg==';
  var DOWN_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAPElEQVR42q3PsQkAMAwDQe2/qoaIK3UhRuEfXPqwJTrbhxwURS+9ff+N6tW2XGFpQyosoVhCsYRiCcXaBhIFnJBtuvEqAAAAAElFTkSuQmCC';

  var PRE = 'wordhighlight', ID_PRE = PRE + '_id';
  var STYLE_CLASS = '0123456789'.split('').map(function(a,i){return PRE + '_word'+i;});
  var STYLE_COLOR = ['#FFFF80','#99ccff','#ff99cc','#66cc66','#cc99ff','#ffcc66','#669999','#cc9966','#999999','#cc6699'];
  var setuped = false;
  var keyword = '', words = [], word_lists = [], word_inputs_list, layers, positions = [];
  var xp_all = new $XE('descendant::font[starts-with(@name,"' + PRE + '_word")]', document.body);
  var keyCodeStr = {
    8:  'BAC',
    9:  'TAB',
    10: 'RET',
    13: 'RET',
    27: 'ESC',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12'
  };
  var whichStr = {
    32: 'SPC'
  };
  var htmlDoc = isChromium ? document.implementation.createHTMLDocument('hogehoge') : document;
  var highlight_reset = function(){};
  var canvas, cw, c2context;
  var root = /BackCompat/i.test(document.compatMode) ? document.body : document.documentElement;
  var CanvasWidth = 150;
  var ratio = 1;
  init_keyboard();
  if (init_keyword() !== false)
    setup();

  function highlight(doc, ext_word) {
    var _words = words.filter(function(w){
      if (word_lists.some(function(wl){if(wl.word===w&&wl.disabled)return true;})){
        return false;
      }
      return w;
    });
    if (_words.length <= 0)
      return;
    var _index;
    if (ext_word && ext_word.words) {
      _words = ext_word.words;
      _index = ext_word.index;
    }
    var exd_words, xw;
    if (_words.length === 1 && _words[0].exp) {
      exd_words = _words.map(function(e){return e.exp;});
      xw = '';
    } else {
      exd_words = _words.map(function(w){return w.test ? w : new RegExp('(' + w.replace(/\W/g,'\\$&') + ')(?!##)', 'ig');});
      xw = ' and (' + _words.map(function(w){return ' contains(translate(self::text(),"abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ"),'+escapeXPathExpr(w.toUpperCase())+') ';}).join(' or ') + ') ';
    }
    $X('descendant::text()[string-length(normalize-space(self::text())) > 0 ' + xw +' and not(ancestor::textarea or ancestor::script or ancestor::style or ancestor::aside)]', doc).forEach(function(text_node) {
      var df, text = text_node.nodeValue, id_index = 0,
      parent = text_node.parentNode, range = document.createRange(), replace_strings = [],
      new_text = reduce(exd_words, function(text,ew,i) {
        var _i = _index || i;
        return text.replace(ew,function($0,$1) {
          replace_strings[id_index] = '<font id="' + ID_PRE + id_index + '" class="' + STYLE_CLASS[_i%10] + '" name="'+PRE+'_word'+_i+'">' + $1 + '</font>';
          return '##'+(id_index++)+'##';
        });
      }, text).
        replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').
        replace(/##(\d+)##/g, function($0,$1) {
        return replace_strings[$1] || '';
      });
      if (replace_strings.length) {
        try {
          if (isChromium) {
            range.selectNodeContents(htmlDoc.documentElement);
          } else {
            range.selectNode(text_node);
          }
          df = range.createContextualFragment(new_text);
          if (df.firstChild) parent.replaceChild(df, text_node);
          range.detach();
        } catch (e) {
          error(e);
        }
      }
    });
  }

  function setup(){
    setuped = true;
    var sheet = addCSS(STYLE_COLOR.map(function(rgb,i){
      return 'font.' + PRE + '_word'+i+',.' + PRE + '_item'+i+'{display:inline;background:'+rgb+';color:black;}';
    }).concat([
      '#' + PRE + '_words{line-height:1;cursor:move;position:fixed;z-index:1024;right:1em;opacity:0.8;list-style-type:none;margin:0;padding:0;width:auto;bottom:1em;max-width:40%;}',
      '#' + PRE + '_words > section{clear:right;line-height:1;border:1px solid #333;background:rgba(255,255,255,0.8);display:block;border-radius:3px;}',
      '#' + PRE + '_words * {margin:0;padding:0;width:auto;height:auto;}',
      '#' + PRE + '_words:hover{opacity:1;background:rgba(255,255,255,0.4);}',
      '#' + PRE + '_words > nav{display:none;width:100%;padding:3px;position:relative;}',
      '#' + PRE + '_words > nav > canvas.backport{background:rgba(122,122,122,0.5);cursor:pointer;position:absolute;right:6px;}',
      '#' + PRE + '_words > nav > canvas.viewport{background:rgba(255,255,255,0.5);cursor:default;position:absolute;bottom:0px;right:6px;}',
      '#' + PRE + '_words > nav:hover > canvas.backport{background:#000000;}',
      '#' + PRE + '_words:hover > nav{display:block;}',
      '#' + PRE + '_words:hover > nav > canvas.backport{bottom:0px;}',
      '#' + PRE + '_words.edit{opacity:1;cursor:default;}',
      '#' + PRE + '_words.edit #' + PRE + '_word_inputs_list{display:none;}',
      '#' + PRE + '_words form.' + PRE + '_editor{display:none;}',
      '#' + PRE + '_words.edit form.' + PRE + '_editor{display:inline-block;}',
      '#' + PRE + '_words.edit form.' + PRE + '_editor input{max-width:400px;}',
      '#' + PRE + '_words li{display:inline-block;margin:0.2em;line-height:1.5;padding:0;border:none;font-size:medium;}',
      '#' + PRE + '_words > section > * {vertical-align:middle;}',
      '#' + PRE + '_words > section > h3.' + PRE + '_title{display:inline-block;background:#333;color:#fff;padding:0.1em 0.3em;border:none;margin:0 0.2em;}',
      '#' + PRE + '_words > section > form.' + PRE + '_ctrl{display:inline-block;}',
      '#' + PRE + '_words > section > form.' + PRE + '_ctrl > input{display:inline-block;margin:0.1em 0.2em;padding:0.1em;background:#aaa;border:2px solid #666;cursor:pointer;border-radius:3px;}',
      '#' + PRE + '_word_inputs_list {padding:0;margin:0.2em;display:inline-block;}',
      '#' + PRE + '_word_inputs_list > li{position:relative;}',
      '#' + PRE + '_word_inputs_list > li > label{cursor:pointer;}',
      '#' + PRE + '_word_inputs_list > li > input{cursor:pointer;}',
      '#' + PRE + '_word_inputs_list > li > label.'+PRE+'_movelabel{height:4px;line-height:4px;position:absolute;background:#555555;width:100%;text-align:center;margin:0;padding:0;left:0px;}',
      '#' + PRE + '_word_inputs_list > li > label.'+PRE+'_movelabel.prev{top:-4px;}',
      '#' + PRE + '_word_inputs_list > li > label.'+PRE+'_movelabel.next{bottom:-4px;}',
      '#' + PRE + '_word_inputs_list > li > label.'+PRE+'_movelabel input{display:none;}',
      '#' + PRE + '_word_inputs_list > li:hover > label.'+PRE+'_movelabel{line-height:15px;height:15px;}',
      '#' + PRE + '_word_inputs_list > li:hover > label.'+PRE+'_movelabel.prev{top:-15px;}',
      '#' + PRE + '_word_inputs_list > li:hover > label.'+PRE+'_movelabel.next{bottom:-15px;}',
      '#' + PRE + '_word_inputs_list > li:hover > label.'+PRE+'_movelabel input{display:inline;}',
      '#' + PRE + '_word_inputs_list > li > label.'+PRE+'_movelabel:hover{background:#999999;}',
      '#' + PRE + '_word_inputs_list > li > label > input[type=image]{vertical-align:top;padding:0;height:12px;}'
    ]).join('\n'));
    highlight(document.body);
    var aside = document.createElement('aside');
    aside.id = PRE + '_words';
    aside.className = 'fixed';
    var section = document.createElement('section');
    var editor = document.createElement('form');
    editor.className = PRE + '_editor';
    var text_input = document.createElement('input');
    text_input.type = 'text';
    editor.addEventListener('submit',function(e){
      edit.value = 'edit';
      aside.className = '';
      keyword = text_input.value;
      init_words();
      resetup();
      e.preventDefault();
    },false);
    editor.appendChild(text_input);
    section.appendChild(editor);
    var ctrl = document.createElement('form');
    ctrl.className = PRE + '_ctrl';
    var edit = document.createElement('input');
    edit.type = 'button';
    edit.value = 'edit';
    ctrl.appendChild(edit);
    edit.addEventListener('click',function(){
      if (aside.className == 'edit') {
        edit.value = 'edit';
        aside.className = '';
        keyword = text_input.value;
        init_words();
        resetup();
      } else {
        text_input.style.width = Math.max(keyword.length,10) + 'em';
        aside.className = 'edit';
        edit.value = 'set';
        text_input.value = keyword;
        text_input.focus();
      }
    },false);
    var off = document.createElement('input');
    off.type = 'button';
    off.value = 'off';
    ctrl.appendChild(off);
    off.addEventListener('click',function(){
      document.body.removeChild(aside);
      restore_words();
      sheet.disable = true;
      if (addCSS.__style.parentNode) addCSS.__root.removeChild(addCSS.__style);
      window.name = '';
      word_lists = [];
      _words = [];
      setuped = false;
      highlight_reset();
    },false);
    word_inputs_list = document.createElement('ul');
    word_inputs_list.id = PRE + '_word_inputs_list';
    word_inputs_list.className = PRE + '_inputs';
    section.appendChild(word_inputs_list);
    section.appendChild(ctrl);
    word_lists = create_inputlist(words);
    aside.appendChild(section);
    document.body.appendChild(aside);
    var drag = endrag(aside,{x:'right',y:'bottom'});
    drag.hook('__drag_begin', function(e){
      if ((this.element && this.element.className === 'edit') || /^canvas$/i.test(e.target.localName))
        return false;
    });
    layers = xp_all.get();
    var nav = document.createElement('nav');
    canvas = document.createElement('canvas');
    nav.appendChild(canvas);
    var c2 = c2context = canvas.getContext('2d');
    aside.insertBefore(nav,aside.firstChild);
    canvas.addEventListener('click',function(evt){
      var x = (evt.offsetX || evt.layerX)/ratio - root.clientWidth/2;
      var y = (evt.offsetY || evt.layerY)/ratio - root.clientHeight/2;
      window.scrollTo(x, y);
    },false);
    cw = document.createElement('canvas');
    canvas.className='backport';
    cw.className='viewport';
    window.addEventListener('scroll',function(){
      var x = window.pageXOffset * ratio;
      var y = window.pageYOffset * ratio;
      cw.style.bottom = (canvas.height - cw.height - y) + 'px';
      cw.style.right = (-x + 6) + 'px';
    },false);
    nav.appendChild(cw);
    draw_wordmap();
    init_autopager();
  }

  function restore_words(words) {
    (words||xp_all.get()).forEach(function(layer,i){
      var parent = layer.parentNode;
      while (layer.firstChild){
        parent.insertBefore(layer.firstChild, layer);
      }
      parent.removeChild(layer);
    });
  }

  function draw_wordmap() {
    var c2 = c2context;
    var _height = root.clientHeight * 0.7;
    if (_height > CanvasWidth * (root.scrollHeight/root.scrollWidth)) {
      canvas.width = CanvasWidth;
      canvas.height = CanvasWidth * (root.scrollHeight/root.scrollWidth);
      ratio = CanvasWidth / root.scrollWidth;
    } else {
      canvas.height = _height;
      canvas.width = _height * (root.scrollWidth/root.scrollHeight);
      ratio = _height / root.scrollHeight;
    }
    cw.width  = root.clientWidth  * ratio;
    cw.height = root.clientHeight * ratio;
    cw.style.bottom = (canvas.height - cw.height)+'px';
    c2.clearRect(0,0,window.innerWidth,window.innerHeight);
    c2.beginPath();
    word_lists.forEach(function(item,i){
      c2.fillStyle = STYLE_COLOR[i%10];
      item.get_w().forEach(function(ly,j){
        var recs = ly.getClientRects();
        for (var i = 0, l = recs.length;i < l;++i){
          var rec = recs[i];
          var x = root.scrollLeft + rec.left;
          var y = root.scrollTop  + rec.top;
          var width  = rec.width ||(rec.right-rec.left);
          var height = rec.height||(rec.bottom-rec.top);
          c2.fillRect(x*ratio, y*ratio, width * ratio, height * ratio);
        }
      });
    });
    c2.fill();
  }

  function add_word(word) {
    window.name = PRE + '::' + encodeURIComponent(keyword);
    highlight(document.body,{words:[word],index:words.length});
    word_lists.push.apply(word_lists,create_inputlist([word], words.length));
    layers = xp_all.get();
  }

  function resetup() {
    restore_words();
    word_lists.forEach(function(item){item.item.parentNode.removeChild(item.item);});
    window.name = PRE + '::' + encodeURIComponent(keyword);
    highlight(document.body);
    layers = xp_all.get();
    word_lists = create_inputlist(words);
  }

  function move(node) {
    if (!node) return;
    node.style.outline = node.style.WebkitOutline = '4px solid #33ccff';
    if (node.getBoundingClientRect) {
      var pos = node.getBoundingClientRect();
      document.documentElement.scrollTop = document.body.scrollTop =
        pos.top + window.pageYOffset - window.innerHeight/2 + (pos.bottom - pos.top);
    } else {
      node.scrollIntoView();
    }
    setTimeout(function(){
      node.style.outline = node.style.WebkitOutline = 'none';
    },2000);
  }

  function create_inputlist(words, start) {
    return words.map(function(w, i){
      var _i = i + (start||0);
      var li = document.createElement('li');
      li.className = PRE + '_item' + _i%10;
      var _next = document.createElement('input');
      var _prev = document.createElement('input');
      var next_label = document.createElement('label');
      var prev_label = document.createElement('label');
      _next.type = _prev.type = 'image';
      _next.src = DOWN_IMAGE;
      _prev.src = UP_IMAGE;
      _next.id = next_label.htmlFor = PRE + '_next_button' + _i;
      _prev.id = prev_label.htmlFor = PRE + '_prev_button' + _i;
      prev_label.className = next_label.className = PRE + '_movelabel';
      prev_label.className += ' prev';
      next_label.className += ' next';
      positions[i+1] || (positions[i+1]=-1);
      var xp = new $XE('descendant::font[@name="' + PRE + '_word' + _i +'"]', document.body);
      var xp_count = new $XE('count(descendant::font[@name="' + PRE + '_word' + _i +'"])', document.body);
      _next.addEventListener('click',function(){
        var layers = xp.get();
        next(i,layers);
      },false);
      _prev.addEventListener('click',function(){
        var layers = xp.get();
        prev(i,layers);
      },false);
      prev_label.appendChild(_prev);
      li.appendChild(prev_label);
      var label = document.createElement('label');
      label.textContent = w + '(' + xp_count.get({result_type:XPathResult.NUMBER_TYPE}).numberValue + ')';
      var check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = true;
      var _id = check.id = ID_PRE + '_check' + _i;
      label.htmlFor = _id;
      label.className = PRE + '_label' + _i % 10;
      li.appendChild(check);
      li.appendChild(label);
      next_label.appendChild(_next);
      li.appendChild(next_label);
      word_inputs_list.appendChild(li);
      var list = {item:li,word:w,label:label,get_count:xp_count.get,get_w:xp.get,disabled:false};
      check.addEventListener('change', function(){
        list.disabled = !list.disabled;
        if (check.checked) {
          highlight(document.body,{words:[w],index:_i});
        } else {
          restore_words(xp.get());
        }
      },false);
      return list;
    });
  }

  function endrag(element,opt){
    endrag = function(element,opt){
      return new endrag.proto(element,opt||{});
    }
    endrag.proto = function(elem,opt){
      var self = this;
      this.element = elem;
      this.style = elem.style;
      var _x = opt.x !== 'right';
      var _y = opt.y !== 'bottom';
      this.x = _x ? 'left' : 'right';
      this.y = _y ? 'top' : 'bottom';
      this.xd = _x ? -1 : 1;
      this.yd = _y ? -1 : 1;
      this.computed_style = document.defaultView.getComputedStyle(elem, '');
      this.drag_begin = function(e){self.__drag_begin(e);};
      elem.addEventListener('mousedown', this.drag_begin, false);
      this.dragging = function(e){self.__dragging(e)};
      document.addEventListener('mousemove', this.dragging, false);
      this.drag_end = function(e){self.__drag_end(e)};
      document.addEventListener('mouseup', this.drag_end, false);
    };
    endrag.proto.prototype = {
      __drag_begin:function(e){
        var _c = this.computed_style;
        this.isDragging = true;
        this.position = {
          _x:parseFloat(_c[this.x]),
          _y:parseFloat(_c[this.y]),
          x:e.pageX,
          y:e.pageY
        };
        e.preventDefault();
      },
      __dragging:function(e){
        if (!this.isDragging) return;
        var x = e.pageX, y = e.pageY, p = this.position;
        p._x = p._x + (p.x - x) * this.xd;
        p._y = p._y + (p.y - y) * this.yd;
        this.style[this.x] = p._x + 'px';
        this.style[this.y] = p._y + 'px';
        p.x = x;
        p.y = y;
      },
      __drag_end:function(e){
        if (this.isDragging)
          this.isDragging = false;
      },
      hook:function(method,func){
        if (typeof this[method] === 'function') {
          var o = this[method];
          this[method] = function(){
            if (func.apply(this,arguments) === false)
              return;
            o.apply(this,arguments);
          };
        }
      }
    };
    return endrag(element,opt);
  }

  function target_google(doc,index){
    var as = $X('descendant::a[@href and @target="_blank" and not(starts-with(@href,"javascript:") or starts-with(@href,"#"))]',doc);
    as.forEach(function(a,i){
      if (a.target != 'self')
        a.target = PRE + (i + (index || 0) * as.length) + '::' + encodeURIComponent(keyword);
    });
  }

  function init_keyword(){
    var ref = document.referrer;
    var name = window.name;
    var host = location.host;
    if (/google\./.test(host) && /^(\/news)?\/search/.test(location.pathname)) {
      var _q = $X('descendant::input[@name="q"]',document.body)[0];
      keyword = clean(_q.value);
      window.name = PRE + '::' + encodeURIComponent(keyword);
      if (TARGET_BLANK) target_google(document.getElementById('res'));
    } else if (/search\.yahoo\.co\.jp/.test(host) && /^\/search/.test(location.pathname)) {
      var _q = $X('descendant::input[@name="p"]',document.body)[0];
      keyword = clean(_q.value);
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else if (/www\.bing\.com/.test(host) && /^\/search/.test(location.pathname)) {
      var _q = $X('descendant::input[@name="q"]',document.body)[0];
      keyword = clean(_q.value);
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else if (/www\.baidu\.\w+/.test(host) && /^\/s$/.test(location.pathname)) {
      var _q = $X('descendant::input[@name="wd"]',document.body)[0];
      keyword = clean(_q.value);
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else if (window.name.indexOf(PRE) == 0) {
      keyword = new RegExp(PRE + '\\d*::(.+)').exec(decodeURIComponent(window.name))[1];
    } else if (/google/.test(ref)) {
      var _a = document.createElement('a');
      _a.href = ref;
      if (!/google\./.test(_a.host) || !/[&?]q=([^&]+)/.test(_a.search))
        return false;
      keyword = clean(decodeURIComponent(/[&?]q=([^&]+)/i.exec(_a.search)[1]));
      keyword = keyword.split(/\+/).filter(function(s){return !!trim(s);}).join(' ');
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else if (/yahoo/.test(ref)) {
      var _a = document.createElement('a');
      _a.href = ref;
      if (!/search\.yahoo\.co\.jp/.test(_a.host) || !/[&?]p=([^&]+)/.test(_a.search))
        return false;
      keyword = clean(decodeURIComponent(/[&?]p=([^&]+)/i.exec(_a.search)[1]));
      keyword = keyword.split(/\+/).filter(function(s){return !!trim(s);}).join(' ');
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else if (/bing/.test(ref)) {
      var _a = document.createElement('a');
      _a.href = ref;
      if (!/www\.bing\.com/.test(_a.host) || !/[&?]q=([^&]+)/.test(_a.search))
        return false;
      keyword = clean(decodeURIComponent(/[&?]q=([^&]+)/i.exec(_a.search)[1]));
      keyword = keyword.split(/\+/).filter(function(s){return !!trim(s);}).join(' ');
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else if (/baidu/.test(ref)) {
      var _a = document.createElement('a');
      _a.href = ref;
      if (!/www\.baidu\.\w+/.test(_a.host) || !/[&?]wd=([^&]+)/.test(_a.search))
        return false;
      keyword = clean(decodeURIComponent(/[&?]wd=([^&]+)/i.exec(_a.search)[1]));
      keyword = keyword.split(/\+/).filter(function(s){return !!trim(s);}).join(' ');
      window.name = PRE + '::' + encodeURIComponent(keyword);
    } else {
      return false;
    }
    keyword = trim(keyword);
    if (!keyword) return false;
    init_words();
    return true;
  }

  function trim(str) {
    return str.replace(/[\n\r]+/g,' ').replace(/^\s+|\s+$/g,'');
  }

  function clean(str) {
    return str.replace(/(?:(?:\s?(?:site|(?:all)?in(?:url|title|anchor|text)):|(?:\s|^)-|[()])\S*|(\s)OR\s)/g,'$1');
  }

  function init_words(){
    var erg = keyword.match(new RegExp("^ ?/(.+)/([gim]+)?$"));
    if (erg) {
      var ew = erg[1], flag = erg[2] || '';
      words = [{exp:new RegExp('(' + ew + ')(?!##)', flag), text:ew, toString:function(){return ew;}}];
    } else if (keyword) {
      var ret=[], eword = keyword.replace(/"([^"]+)"/g,function($0,$1){$1 && ret.push($1);return '';});
      words = eword.split(/[\+\s\.:\|#]/).filter(function(w){return !!w;}).concat(ret);
    }
  }

  function init_minibuffer() {
    if (window.Minibuffer)
      document.removeEventListener('keypress', keyhandler, false);
    var mini = window.Minibuffer;
    mini.addCommand({
      name: 'keyword-search',
      command: function(stdin){
        keyword += ' ' + this.args.join(' ');
        init_words();
        if (setuped) resetup();
        else setup();
        return stdin;
      }
    });
    mini.addShortcutkey({
      key:KEY_NEXT,
      command:next,
      description: 'emphasis next keyword'
    });
    mini.addShortcutkey({
      key:KEY_PREV,
      command:prev,
      description: 'emphasis prev keyword'
    });
    mini.addShortcutkey({
      key:KEY_SEARCH,
      command:function(e){
        instant_search();
      },
      description: 'emphasis prev keyword'
    });
  }
  function next(index,_layers) {
    _layers || (_layers = (layers || (layers = xp_all.get()) ));
    index || (index = 0);
    move(_layers[positions[index]++] || (positions[index]=1,_layers[0]));
  }
  function prev(index,_layers) {
    _layers || (_layers = (layers || (layers = xp_all.get()) ));
    index || (index = 0);
    move(_layers[positions[index]--] || (positions[index]=_layers.length-1,_layers[positions[index]--]));
  }
  function init_keyboard() {
    if (isOpera) {
    } else if (window.Minibuffer) {
      init_minibuffer();
      return;
    } else {
      window.addEventListener('GM_MinibufferLoaded', init_minibuffer, false);
    }
    if (!window.chromium) {
      document.addEventListener('keypress', keyhandler, false);
    } else {
      document.addEventListener('keydown', keyhandler, false);
    }
  }
  function get_key(evt){
    var key = String.fromCharCode(evt.which),
    ctrl = evt.ctrlKey ? 'C-' : '',
    meta = (evt.metaKey || evt.altKey) ? 'M-' : '';
    if (!evt.shiftKey){
      key = key.toLowerCase();
    }
    if (evt.ctrlKey && evt.which >= 186 && evt.which < 192) {
      key = String.fromCharCode(evt.which - 144);
    }
    if (evt.keyIdentifier && evt.keyIdentifier !== 'Enter' && !/^U\+/.test(evt.keyIdentifier) ) {
      key = evt.keyIdentifier;
    } else if ( evt.which !== evt.keyCode ) {
      key = keyCodeStr[evt.keyCode] || whichStr[evt.which] || key;
    } else if (evt.which <= 32) {
      key = keyCodeStr[evt.keyCode] || whichStr[evt.which];
    }
    return ctrl+meta+key;
  }
  function keyhandler(evt){
    if (/^(?:input|textarea)$/i.test(evt.target.localName)) return;
    var fullkey = get_key(evt);
    if (keyword){
      switch (fullkey) {
      case KEY_NEXT:
        next();
        break;
      case KEY_PREV:
        prev();
        break;
      }
    }
    switch (fullkey) {
    case KEY_SEARCH:
      evt.preventDefault();
      evt.stopPropagation();
      instant_search();
      break;
    }
  }
  function instant_search(){
    if (instant_search.input) {
      instant_search.input.focus();
      return;
    }
    var input = instant_search.input = document.createElement('input');
    input.id = PRE + '_textinput';
    input.setAttribute('style','border:none;margin:0px;padding:0px;position:fixed;bottom:0px;left:0.5em;background:#000;color:#fff;font-weight:bold;width:40%;font-size:large;');
    input.addEventListener('keypress',function(evt) {
      var fullkey = get_key(evt);
      switch (fullkey) {
      case 'RET':
        evt.preventDefault();
        evt.stopPropagation();
        keyword += ' ' + input.value;
        init_words();
        if (setuped) add_word(input.value);
        else setup();
      case 'ESC':
        document.body.removeChild(input);
        instant_search.input = null;
      }
    },false);
    input.addEventListener('input',function(e) {
      var text = input.value;
      if (!/\S/.test(text)) return;
      var x = 'descendant::text()[contains(self::text(),"' + escapeXPathExpr(text) + '") and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]/parent::*';
      var node = document.evaluate(x, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (node) {
        move(node);
      }
    },false);
    document.body.appendChild(input);
    input.focus();
  }

  function init_autopager(e){
    var page = 0, disabled = false;
    var inserted_highlight = function(e){
      highlight(e.target);
      if (TARGET_BLANK) target_google(e.target, ++page);
    };
    var after_load = function(e){
      word_lists.forEach(function(item){
        item.label.textContent = item.word + '(' + item.get_count({result_type:XPathResult.NUMBER_TYPE}).numberValue + ')';
      });
      layers = xp_all.get();
      draw_wordmap();
    };
    window.addEventListener('AutoPatchWork.DOMNodeInserted', inserted_highlight,false);
    window.addEventListener('AutoPatchWork.pageloaded', after_load,false);
    window.addEventListener('AutoPagerize_DOMNodeInserted', inserted_highlight,false);
    window.addEventListener('GM_AutoPagerizeNextPageLoaded', after_load,false);
    highlight_reset = function(){
      window.removeEventListener('AutoPatchWork.DOMNodeInserted', inserted_highlight,false);
      window.removeEventListener('AutoPatchWork.pageloaded', after_load,false);
      window.removeEventListener('AutoPagerize_DOMNodeInserted', inserted_highlight,false);
      window.removeEventListener('GM_AutoPagerizeNextPageLoaded', after_load,false);
    }
  }

  function $XE(exp, context) {
    var xe = new XPathEvaluator();
    var resolver = xe.createNSResolver(document.documentElement);
    //var defaultNS = document.lookupNamespaceURI(window.opera ? '' : null);
    var defaultNS = (document.documentElement.nodeName !== 'HTML') ? context.namespaceURI : null;
    if (defaultNS) {
      var defaultPrefix = '__default__';
      if (!isChromium)
        exp = addDefaultPrefix(exp, defaultPrefix);
      var defaultResolver = resolver;
      resolver = function (prefix) {
        return (prefix == defaultPrefix) ? defaultNS : defaultResolver.lookupNamespaceURI(prefix);
      };
    }
    var ex = xe.createExpression(exp, resolver);
    this.get = function(param) {
      param || (param={});
      var result = this.result = 
        ex.evaluate(param.context||context, param.result_type||XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,this.result);
      if (param.result_type) return result;
      for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
        res[i] = result.snapshotItem(i);
      }
      return res;
    };
  }

  // via AutoPagerize Thx! nanto_vi
  function addDefaultPrefix(xpath, prefix) {
    var tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g;
    var TERM = 1, OPERATOR = 2, MODIFIER = 3;
    var tokenType = OPERATOR;
    prefix += ':';
    function replacer(token, identifier, suffix, term, operator, modifier) {
      if (suffix) {
        tokenType =
          (suffix == ':' || (suffix == '::' && (identifier == 'attribute' || identifier == 'namespace')))
          ? MODIFIER : OPERATOR;
      } else if (identifier) {
        if (tokenType == OPERATOR && identifier != '*') {
          token = prefix + token;
        }
        tokenType = (tokenType == TERM) ? OPERATOR : TERM;
      } else {
        tokenType = term ? TERM : operator ? OPERATOR : MODIFIER;
      }
      return token;
    }
    return xpath.replace(tokenPattern, replacer);
  }

  // http://d.hatena.ne.jp/amachang/20090917/1253179486
  function escapeXPathExpr(text) {
    var matches = text.match(/[^"]+|"/g);
    function esc(t) {
      return t == '"' ? ('\'' + t + '\'') : ('"' + t + '"');
    }
    if (matches) {
      if (matches.length == 1) {
        return esc(matches[0]);
      } else {
        var results = [];
        for (var i = 0, len = matches.length; i < len; i ++) {
          results.push(esc(matches[i]));
        }
        return 'concat(' + results.join(', ') + ')';
      }
    } else {
      return '""';
    }
  }

  function $X(exp, context, resolver, result_type) {
    context || (context = document);
    var Doc = context.ownerDocument || context;
    var result = Doc.evaluate(exp, context, resolver, result_type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (result_type) return result;
    for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
      res[i] = result.snapshotItem(i);
    }
    return res;
  }

  // reduce https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce#Compatibility
  function reduce(arr, fun){
    var len = arr.length, i = 0, rv;
    if (arguments.length >= 3) rv = arguments[2];
    else {do {
      if (i in arr) {
        rv = arr[i++];break;
      }
      if (++i >= len) throw new TypeError();
    } while (true)};
    for (; i < len; i++) if (i in arr) rv = fun.call(null, rv, arr[i], i, arr);
    return rv;
  }

  function error(e){
    if (isOpera) {
      opera.postError(e);
    } else if (window.console) {
      console.error(e);
    }
  }

  function addCSS(css){
    var sheet, self = arguments.callee;
    if (document.createStyleSheet) { // for IE
      sheet = document.createStyleSheet();
      sheet.cssText = css;
      return sheet;
    } else if (!self.__style || !self.__root) {
      sheet = document.createElement('style');
      sheet.type = 'text/css';
      self.__style = sheet;
      self.__root = document.getElementsByTagName('head')[0] || document.documentElement;
    }
    sheet = self.__style.cloneNode(false);
    sheet.textContent = css;
    return self.__root.appendChild(sheet).sheet;
  }
})();
//console.timeEnd("highlight");

// Bench: http://www.google.com/search?hl=en&q=HTML+5+Markup+Language
