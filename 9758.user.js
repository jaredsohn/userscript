// ==UserScript==
// @name       COMPOSITE -Yet another Tumblr photo viewer-
// @namespace  http://d.hatena.ne.jp/koyachi
// @include    http://*.tumblr.com/
// ==/UserScript==
//
// 2007-06-16 t.koyachi
//   Adjustment of timing, prefetch_remain. fader,...
//
// 2007-06-12 t.koyachi
//   Bug fix(href when paused)
//
// 2007-06-11 t.koyachi
//   Fix first 100 photos restirction.
//
// 2007-06-10 t.koyachi
//   First release.
//
// Many classes/functions are based on STROBO(http://userscripts.org/scripts/show/9370).
//

GM_registerMenuCommand('Composite Tumblr Photos', function() {

  var Config = {
//    SELECT_TARGETS_NUM: 100,
    SELECT_TARGETS_NUM: 30,
    SELECT_NUM: 2,
    WIDTH: 400,
    INTERVAL: 1800,
    BOOTTIMEOUT: 1100,
    HISTORY_SIZE: 21, // history(20) + prefetch(1)
    ENTRY_PREFETCH_NUM: 1,
    PAGE_PREFETCH_REMAIN: 7,
    FADER_COLOR_START: 0xFF0000,
    FADER_COLOR_END: 0xFFFFFF
  };

  var KEY_SPACEBAR = 32;
  var KEY_J = 74;
  var KEY_K = 75;
  
  GM_addStyle(<><![CDATA[
                         #lightbox{
                           display: block;
                           position: absolute;
                           left: 0;
                           top: 0;
                           background-color: #fff;
                           width: 100%;
                           height: 100%;
                           overflow : hidden;
                         }
                         
                         #status {
                           display: none;
                           font-size: xx-large;
                           font-weight: bolder;
                           color: #FFF;
                           background-color: #444;
                           width: 100%;
                           padding: 20px;
                         }
                         
                         #info {
                           display: none;
                           position: relative;
                           top: -20px;
                           float: right;
                           color: #fff;
                         }
                         
                         #lightbox img{
                           border : none;
                           xborder: solid 3px;
                           padding: 5px;
                           background-color: #f00;
                         }

                         #lightbox .image{
                           border : none;
                           xborder: solid 3px;
                           padding: 5px;
                           xbackground-color: #f00;
                         }
                         #lightbox .image:hover{
                           padding: 5px;
                           background-color: #f00;
                         }
                         
                         #lightbox .picture_frame {
                           float: left;
                           top: 0px;
                           xxbackground-color: #ccc;
                           width: 400px;
                           height: 400px;
                           padding: 50px;
                         }
                         #lightbox .picture_frame .imagetitle {
                           xdisplay: none;
                           display: block;
                           height: 20px;
                           xxbackground-color: #888;
                           xxwidth: 400px;
                           xxheight: 400px;
                         }
                         #lightbox .picture_frame .placeholder {
                           xxbackground-color: #F00;
                           width: 400px;
                           height: 400px;
                         }
                         ]]></>);
  // ---------------------------------------------------------------------------
  // Tumblr

  Tumblr = {};
//  Tumblr.PAGE_LIMIT = 50;
  Tumblr.PAGE_LIMIT = 20;
  Tumblr.photo = function(start, count, size, callback){
    Tumblr.read('photo', start, count, function(res){
      log('Tumblr.photo');
      var imgs = [];
      res.forEach(function(doc){
        log('Tumblr.photo,foreach');
        var links = $x('//post', doc).map(function(post){
          return post.getAttribute('url');
        });
        var srcs = $x('//photo-url[@max-width="'+size+'"]',
                      doc).map(function(photo){
                        return photo.textContent;
                      });
        
        links.forEach(function(link, i){
          imgs.push({link:link, src:srcs[i]});
        });
      });
      
      callback(imgs);
    });
  };
  
  Tumblr.read = function(type, start, count, callback){
    log('Tumblr.read');
    var pages = Tumblr.split(start, count);
    var res = [];
    
    (function me(){
      var page = pages.shift();
      var url = Tumblr.buildURL({
        type : type,
        start : page[0],
        num : page[1],
      }); 
      log('Tumblr.read.me ' + url);
      
      ajax(url, function(text){
        res.push(xml(text));
        if(pages.length){
          me();
        } else {
          callback(res);
        }
      });
    })();
  };
  
  Tumblr.getTotal = function(type, callback){
    var url = Tumblr.buildURL({
      type : type,
      start : 0,
      num : 0,
    }); 
    
    ajax(url, function(text){
      callback(xml(text).getElementsByTagName('posts')[0].getAttribute('total'));
    });
  };
  
  Tumblr.split = function(start, count){
    var res = [];
    var limit = Tumblr.PAGE_LIMIT;
    for(var i=0,len=Math.ceil(count/limit) ; i<len ; i++){
      //res.push([start + i * limit, start + limit]);
      res.push([start + i * limit, limit]);
    }
    count%limit && (res[res.length-1][1] = count%limit);
    return res;
  };
  
  Tumblr.buildURL = function(params){
    return Tumblr.getEndPoint() + queryString(params);
  };
  
  Tumblr.getEndPoint = function(){
    return 'http://'+location.host+'/api/read?';
  };

  // ---------------------------------------------------------------------------
  // History(FIFO)

  function History(size) {
    this.list = [];
    this.size = size;
  };
  History.prototype = {
    push: function(obj) {
      if (this.list.length >= this.size) {
        var first = this.list.shift();
      }
      var new_object = obj;
      this.list.push(new_object);
    }
    ,
    // reference
    getFromLast: function(index) {
      var list = this.list;
      index = (index > (list.length -1)) ? list.length - 1 : index;
      return list[(list.length - 1) - index];
    }
    ,
    deleteFromLast: function(index) {
      var list = this.list;
      this.list = list.slice(0, list.length - index);
    }
    ,
    length: function() {
      return this.list.length;
    }
  };

  // ---------------------------------------------------------------------------
  // BetterRandom

  function BetterRandom(size) {
    this.pool = [];
    for (var i = 0; i < size; i++) {
      this.pool[i] = Math.random();
    }
  };
  BetterRandom.prototype = {
    process: function(max) {
      var result;
      var i = this.pool.length - 1;
      var tmp_i = i;
      var tmp_v = this.pool[i];
      i = Math.floor(this.pool.length * this.pool[i]);
      result = Math.floor(this.pool[i] * max);
      this.pool[i] = Math.random();;
      //log('random ' + [max, i, tmp_i, tmp_v, result, this.pool[i]].join(', '));
      return result;
    }
  };

  // ---------------------------------------------------------------------------
  // Fader

  function Fader(elm, startColor, stopColor, num, interval, lastAction) {
    this.index = 0;
    this.elm = elm; //document.getElementById(id);;
    this.colors = [];
    var interval = interval || 150;
    var start = {
      r: (startColor & 0x00FF0000) >> 16,
      g: (startColor & 0x0000FF00) >> 8,
      b: (startColor & 0x000000FF)
    };
    var end = {
      r: (stopColor & 0x00FF0000) >> 16,
      g: (stopColor & 0x0000FF00) >> 8,
      b: (stopColor & 0x000000FF)
    };
    var diff = {
      r: end.r - start.r,
      g: end.g - start.g,
      b: end.b - start.b
    };

    for (var i = 0; i < num; i++) {
      var rate = i / (num - 1);
      rate = rate * rate * rate * rate; // via amachang
      this.colors[i] =
        '#' +
        (  ((start.r + diff.r * rate) & 0xFF) << 16
         | ((start.g + diff.g * rate) & 0xFF) << 8
         | ((start.b + diff.b * rate) & 0xFF)).toString(16);
    }
    this.colors[num - 1] = '#' + stopColor.toString(16);

    lastAction = (lastAction) ? lastAction : function(){};
    var self = this;
    function fade() {
      self.elm.style.backgroundColor = self.colors[self.index];
      self.index++;
      if (self.index <= self.colors.length) {
        setTimeout(fade, interval);
        if (self.index == self.colors.length) {
          lastAction();
        }
      }
    }
    setTimeout(fade, interval);
  };

  // ---------------------------------------------------------------------------
  // Composition

  function Composition() {
    this.elmLightbox = {};
    this.elmStatus = {};
    this.elmInfo = {};
    this.elmImageTitles = [];
    this.elmImageHolders = [];
    this.elmImages = [];
    this.elmPreFetchedImages = {};
    this.tid = null;
    this.status = 'STOPPED';
    this.setHistory = new History(Config.HISTORY_SIZE);
    this.cursorFromLast = 0;
    this.selectedList = [];
    this.pageRequestCount = 0;

    this.random;

    this.next = bind(this, 'next');
    this.keyhandler = bind(this, 'keyhandler');
    this.onmouseover = bind(this, 'onmouseover');
    this.onmouseout = bind(this, 'onmouseout');
    //this.fadeTimers = [];
  };

  Composition.swapBody = swapper(document.body, E('body', {id:'CP_body'}));

  keys(Config).forEach(function(key) {
    Composition[key] = Config[key]
  });

  Composition.STATUS = {
    STOPPED: {
      next: 'PLAYING',
      proc: 'next'
    },
    PLAYING: {
      next: 'STOPPED',
      proc: 'pause'
    }
  }

  Composition.prototype = {
    select: function(num) {
      log('select');
      var results = [];
      var select_num = Math.min((Composition.SELECT_TARGETS_NUM) * this.pageRequestCount, this.total);
      log('  select_num ' + select_num);
      for (var i = 0; i < num; i++) {
        var index = this.random.process(select_num);
        log('    selected_index ' + index);
        results.push(this.imgs[index]);

        var image = new Image();
        image.src= this.imgs[index].src;
        image.className = 'image';
        this.elmPreFetchedImages[image.src] = image;
      }
      if (this.cursorFromLast != 0) {
        // delete old entries
        this.setHistory.deleteFromLast(this.cursorFromLast);
        this.cursorFromLast = 0;
      }
      this.selectedList.push(results);
      this.setHistory.push(results);
      return results;
    }
    ,
    setupLightbox: function(image_num) {
      this.elmLightbox = this.parent.appendChild(E('div'));
      this.elmLightbox.id = 'lightbox';
      window.addEventListener('keydown', this.keyhandler, false);

      this.elmStatus = this.elmLightbox.appendChild(E('div'));
      this.elmStatus.id = 'status';
      this.elmStatus.innerHTML = 'COMPOSITE';

      this.elmInfo = this.elmLightbox.appendChild(E('a'));
      this.elmInfo.id = 'info';
      this.elmInfo.innerHTML = 'info';
      this.elmInfo.href = 'http://userscripts.org/scripts/show/9758';

      for (var i = 0; i < image_num; i++) {
        var elmImageHolder = this.elmLightbox.appendChild(E('div'));
        elmImageHolder.id = 'imgae_' + i;
        elmImageHolder.className = 'picture_frame';

        var elmImageTitle = elmImageHolder.appendChild(E('a'));
        elmImageTitle.className = 'imagetitle';
        this.elmImageTitles.push(elmImageTitle);

        var elmPlaceholder = elmImageHolder.appendChild(E('div'));
        elmPlaceholder.className = 'placeholder';
        this.elmImageHolders.push(elmPlaceholder);
      }
      this.elmStatus.style.display = 'block';
    }
    ,

    keyhandler: function(e) {
      switch (e.keyCode) {
      case KEY_SPACEBAR:
        this.toggle();
        break;
      case KEY_K:
        if (this.status == 'STOPPED') {
          this.reverseHistory();
          log('curosr = ' + this.cursorFromLast);
        }
        break;
      case KEY_J:
        if (this.status == 'STOPPED') {
          this.forwardHistory();
          log('curosr = ' + this.cursorFromLast);
        }
        break;
      default:
        break;
      }
    }
    ,
    onmouseout: function(e) {
      this.hideImageTitle(e);
    }
    ,
    onmouseover: function(e) {
      if (this.status == 'STOPPED') {
        this.showImageTitle(e);
        var fader = new Fader(e.target,
                              Composition.FADER_COLOR_START,
                              Composition.FADER_COLOR_END,
                              8,
                              100);
      }
    }
    ,
    forwardHistory: function() {
      var prefetched_num = Composition.ENTRY_PREFETCH_NUM;
      this.cursorFromLast--;
      if (this.cursorFromLast <= prefetched_num)
        this.cursorFromLast = prefetched_num;

      var kind2HUI_offset = 1;
      this.elmStatus.innerHTML
        = 'pause' + ': forward set-history ['
        + (this.cursorFromLast - prefetched_num + kind2HUI_offset) + ']';
      var imgs = this.setHistory.getFromLast(this.cursorFromLast);
      this.swap(imgs);
    }
    ,
    reverseHistory: function() {
      var prefetched_num = Composition.ENTRY_PREFETCH_NUM;
      this.cursorFromLast++;
      if (this.cursorFromLast >= Composition.HISTORY_SIZE)
        this.cursorFromLast = Composition.HISTORY_SIZE - 1;
      if (this.cursorFromLast >= this.setHistory.length())
        this.cursorFromLast = this.setHistory.length() - 1;
      if (this.cursorFromLast == 1)
        this.cursorFromLast++;

      var kind2HUI_offset = 1;
      this.elmStatus.innerHTML
        = 'pause' + ': reverse set-history ['
        + (this.cursorFromLast - prefetched_num + kind2HUI_offset) + ']';
      var imgs = this.setHistory.getFromLast(this.cursorFromLast);
      this.swap(imgs);
    }
    ,
    toggle: function() {
      var current = Composition.STATUS[this.status];
      this.status = current.next;
      this[current.proc]();
    }
    ,
    imageSetIndex: function(e) {
      var img_width = 400;
      var img_padding = 5;
      var place_padding = 50;
      var left_space = (place_padding + img_padding) * 2 + img_width;
      var right_left = left_space;// + place_padding + img_padding;
      return (e.screenX > right_left) ? 1 : 0;
    }
    ,
    showImageTitle: function(e) {
      var cursorOffset = (this.cursorFromLast == 0) ? 1 : 0;
      var imgs = this.setHistory.getFromLast(this.cursorFromLast + cursorOffset);
      var i = this.imageSetIndex(e);
      this.elmImageTitles[i].innerHTML = imgs[i].link;
      this.elmImageTitles[i].href = imgs[i].link;
      this.elmImageTitles[i].style.display = 'block';
    }
    ,
    hideImageTitle: function(e) {
      var i = this.imageSetIndex(e);
      var self = this;
      setTimeout(function(){
        self.elmImageTitles[i].innerHTML = '';
      }, 1200)
    }
    ,
    pause: function() {
      log('pause');
      this.elmStatus.innerHTML = 'pause';
      this.elmStatus.style.display = 'block';
      this.elmInfo.style.display = 'block';
      clearTimeout(this.tid);
      this.tid = null;
      for (var i = 0; i < this.elmImages.length; i++) {
        var fader = new Fader(this.elmImages[i],
                              Composition.FADER_COLOR_START,
                              Composition.FADER_COLOR_END,
                              8,
                              100);
      }
    }
    ,
    next: function() {
      var self = this;
      if (self.tid != null)
        return;
      log('next');
      this.elmStatus.innerHTML = '';
      this.elmStatus.style.display = 'none';
      this.elmInfo.style.display = 'none';
      var imgs = self.select(Composition.SELECT_NUM);
      this.tid = setInterval(function() {
        self.swap(imgs);
        imgs = self.select(Composition.SELECT_NUM);

        var page_count = Math.min(Composition.SELECT_TARGETS_NUM, Tumblr.PAGE_LIMIT);
        if ((page_count - self.selectedList.length) <= Composition.PAGE_PREFETCH_REMAIN) {
          log('  before call Tumblr.photo in "next"');
          log('    ' + [ self.pageRequestCount,
                         page_count,
                         self.selectedList.length,
                         Composition.PAGE_PREFETCH_REMAIN ].join(', '));
          self.selectedList = [];
          Tumblr.photo(self.pageRequestCount * page_count,
                       Math.min(self.pageRequestCount + Composition.SELECT_TARGETS_NUM, self.total),
                       Composition.WIDTH, function(imgs) {
            extend(self.imgs, imgs);
            self.pageRequestCount++;
          });
        }
      }, Composition.INTERVAL);
    }
    ,
    swap: function(imgs) {
      var self = this;
      var i = 0;
      imgs.forEach(function(img) {
        log('  img.src = ' + img.src);
        self.elmImages[i].src = img.src;
        i++;
      });
    }
    ,
    run: function(total, imgs) {
      var self = this;
      self.imgs = imgs;
      self.total = total;
      self.random = new BetterRandom(total);
      self.elmStatus.style.display = 'none';
      var imgs = this.select(Composition.SELECT_NUM);
      log(imgs);
      var i = 0;
      log('before imgs.forEach');
      imgs.forEach(function(img) {
        log('  img.src = ' + img.src);
        var image = new Image();
        image.src= img.src;
        image.className = 'image';
        var id = 'image_' + i;
        image.id = id;
        self.elmImages[i] = self.elmImageHolders[i].appendChild(image);
        self.elmImages[i].addEventListener('mouseover', function(e){self.onmouseover(e)}, false);
        self.elmImages[i].addEventListener('mouseout', function(e){self.onmouseout(e)}, false);
        var fader = new Fader(self.elmImages[i],
                              Composition.FADER_COLOR_START,
                              Composition.FADER_COLOR_END,
                              8,
                              100
        );
        i++;
      });
    }
    ,
    bootstrap: function() {
      Composition.swapBody();
      this.parent = document.getElementById('CP_body');
      this.setupLightbox(Composition.SELECT_NUM);
    }
  }

  // ---------------------------------------------------------------------------
  // Main

  var composition;
  composition = new Composition();
  unsafeWindow.composition = composition; // FOR DEBUG
  composition.bootstrap();

  var self = composition;
  Tumblr.getTotal('photo', function(total){
    Tumblr.photo(0, Math.min(Composition.SELECT_TARGETS_NUM, total), Composition.WIDTH, function(imgs){
      log('Tumblr.main.callback');
      var us = unsafeWindow.Survey = {
        total: total,
        imgs: imgs
      };
      self.pageRequestCount = 1;
      composition.run(total, imgs);
      setTimeout(function() {composition.toggle()}, Composition.BOOTTIMEOUT);
    });
  });

  // ---------------------------------------------------------------------------
  // Utility

  // via MochiKit.Base
  function keys(obj) {
    var rval = [];
    for (var prop in obj) {
      rval.push(prop);
    }
    return rval;
  }

  function extend(self, obj, /* optional */skip) {        
    // Extend an array with an array-like object starting
    // from the skip index
    if (!skip) {
      skip = 0;
    }
    if (obj) {
      // allow iterable fall-through, but skip the full isArrayLike
      // check for speed, this is called often.
      var l = obj.length;
      if (typeof(l) != 'number' /* !isArrayLike(obj) */) {
        if (typeof(MochiKit.Iter) != "undefined") {
          obj = MochiKit.Iter.list(obj);
          l = obj.length;
        } else {
          throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
        }
      }
      if (!self) {
        self = [];
      }
      for (var i = skip; i < l; i++) {
        self.push(obj[i]);
      }
    }
    // This mutates, but it's convenient to return because
    // it's often used like a constructor when turning some
    // ghetto array-like to a real array
    return self;
  }

  function queryString(params){
    var qeries = [];
    for(var key in params)
      qeries.push(key + '='+ encodeURIComponent(params[key]));
    return qeries.join('&');
  }
  
  function bind(obj, func) {
    func = (func instanceof Function)? func : obj[func];
    return function() {
      func.apply(obj, arguments);
    }
  }
  
  function log() {
    if (unsafeWindow.console) {
      unsafeWindow.console.log.apply(unsafeWindow.console,
                                     Array.slice(arguments));
    }
  }

  function ajax(url, onload){
    GM_xmlhttpRequest({
      method : 'get',
      url : url,
      onload : function(res){
        onload(res.responseText);
      }
    });
  }

  function removeElement(elm){
    return elm.parentNode.removeChild(elm);
  }
  
  function insertBefore(target, node){
    return target.parentNode.insertBefore(node, target);
  }
  
  function insertAfter(target, node){
    return target.parentNode.insertBefore(node, target.nextSibling);
  }

  function swapper(elmOld, elmNew) {
    var toggle = function(){
      insertBefore(elmOld, elmNew);
      removeElement(elmOld);
      var temp = elmOld;
      elmOld = elmNew;
      elmNew = temp;
    }
    return toggle;
  }
  
  function E() {
    var tag = Array.prototype.shift.call(arguments);
    var elm = document.createElement(tag);
    var text = [];
    Array.prototype.forEach.call(arguments, function(value){
      if(!value)
        return;
      if(value && value.nodeType){
        elm.appendChild(value);
        return;
      }
      switch (typeof(value)) {
      case 'string':
      case 'number':
        elm.appendChild(document.createTextNode(value));
        break;
      default:
        for(var key in value) {
          var attr = value[key];
          switch(key){
          case 'class':
            elm.className = attr;
          case 'style':
            elm.style.cssText = attr;
          default:
            elm.setAttribute(key, attr);
          }
        };
        break;
      }
    });
    return elm;
  }
  function xml(text){
    return (new DOMParser).parseFromString(text, "application/xml");
  }
  
  function $x(exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o
               : (document.contentType == "text/html")
                 ? ""
                 : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return ret;
      }
    }
    return null;
  }
  
})
