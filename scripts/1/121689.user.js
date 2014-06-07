// ==UserScript==
// @name kuzu's fix for vegweb
// @version 2.0.3
// @description Fixes a few things on vegweb.com
// @include http://vegweb.com/*
// @require http://sizzlemctwizzle.com/updater.php?id=121689
// ==/UserScript==


function main(noJS) {
"use strict";

//
// utilities
//

function log() {
  /*global GM_log:false, console:false */
  if (typeof(console) !== 'undefined' && console.log) {
    try {
      return console.log.apply(console, arguments);
    } catch (e) {
      return console.log(arguments);
    }
  } else if (typeof(GM_log) !== 'undefined') {
    var l = GM_log; // to avoid newcap warning
    return l(arguments);
  }
}

var StopIteration = window.StopIteration || 'StopIteration';

function addCSS(css) {
  var head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var style = document.createElement('style');
  style.type = 'text/css';
  try {
    style.innerHTML = css;
  } catch(e) {
    style.innerText = css;
  }
  head.appendChild(style);
}

var Klass = (function () {
  // Note: using new should be unnecessary, but harmless.

  // Note that greasemonkey's Boolean (etc.) != window's Boolean :/
  var typeofMap = {'undefined': undefined, 'null': null, 'boolean': Boolean,
      'number': Number, 'string': String, 'function': Function,
      'object': Object };

  function isInst(o, t, defT) {
    var tt = (arguments.length > 1 ? t : defT);
    try {
      if (o instanceof tt) { return true; }
    } catch (e) {
      return (o === tt && (tt === null || tt === undefined));
    }
    if (o) {
      var sup = o._klass;
      while (sup) { if (sup === tt) { return true; } sup = sup._super; }
    }
    var ot = typeofMap[typeof(o)];
    return (ot && ot === tt);
  }
  
  var yes = {}; // must be unique and private
  var noInit = {};

  function Klass() {
    if (!(arguments.length >= 1 && arguments.length <= 2)) {
      throw new Error("Wrong number of arguments");
    }
    var cl, sup;
    if (arguments.length > 1) {
      sup = arguments[0];
      cl = arguments[1];
    } else {
      sup = undefined;
      cl = arguments[0];
    }
    var aKlass;
    if (isInst(cl, Function)) {
      if (cl !== Klass && isInst(sup, Klass)) {
        aKlass = function metaKlass() {
          var inst = cl.apply(aKlass, arguments);
          var scl = cl._super;
          while (scl && !inst._klass) {
            inst = scl.call(cl, inst);
            scl = scl._super;
          }
          return inst;
        };
      } else {
        // this is pretty much useless except for bootstrapping cl === Klass
        aKlass = cl;
      }
    } else {
      aKlass = function basicKlass(useArgs, args) {
        if (this && this._init === aKlass.prototype._init) {
          if (useArgs === noInit) { return; }
          var initChain = [];
          var sup = this._klass._super;
          while (sup) {
            initChain.push(sup.prototype._init);
            sup = sup._super;
          }
          initChain.reverse();
          this._superInit = function _superInit() { 
            var init = initChain.pop();
            if (init) { init.apply(this, arguments); }
          };
          var init = this._init;
          this._init = undefined;
          init.apply(this, (useArgs === yes ? args : arguments));
          while (initChain.length > 0) {
            initChain.pop().call(this);
          }
          delete this._superInit;
        } else { 
          //log("didn't use the new operator");
          var AK = aKlass;
          return new AK(yes, arguments);
        }
      };
    }
    var init = cl._init || cl.reset || function () { };
    cl._klass = aKlass;
    var proto;
    if (isInst(sup, Klass)) {
      var Sup = sup;
      proto = new Sup(noInit);
    } else if (sup) {
      proto = sup;
    }
    var k;
    if (proto === undefined) {
      proto = cl;
    } else {
      for (k in cl) {
        if (cl.hasOwnProperty(k)) {
          proto[k] = cl[k];
        }
      }
    }
    if (proto._static) {
      var st = proto._static;
      for (k in st) {
        if (st.hasOwnProperty(k)) {
          aKlass[k] = st[k];
        }
      }
    }
    proto._init = init;
    aKlass.prototype = proto;
    aKlass.isInst = curryTail(isInst, aKlass);
    aKlass._klass = Klass;
    aKlass._super = sup;
    return aKlass;
  }

  Klass.typeofMap = typeofMap; // XXX just for testing
  return new Klass(Klass);
})();


var XPIter = new Klass({
  _init: function() {
    this._results = null;
    this.reset.apply(this, arguments);
  },
  reset: function(s, root) {
    this._dirty = true;
    this._query = (s || '');
    this._root = (root || document);
    return this;
  },
  setRoot: function(root) {
    this._dirty = true;
    this._root = (root || document);
    return this;
  },

  _evaluate: function() {
    this._results = document.evaluate(this._query, this._root,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, this._results);
    this._i = -1;
    this._dirty = false;
  },

  hasNext: function() {
    if (this._dirty) {
      this._evaluate();
    }
    return (this._i + 1 < this._results.snapshotLength);
  },

  //__iterator__: function() { return this; },

  next: function(df) {
    if (this.hasNext()) {
      this._i += 1;
      return this.get();
    }
    if (arguments.length === 1) {
      return df;
    }
    throw StopIteration;
  },

  get: function(i) {
    if (this._dirty) {
      this._evaluate();
    }
    if (arguments.length < 1) {
      if (this._i < 0) {
        this._i = 0;
      }
      i = this._i;
    }
    if (i < 0) {
      i += this._results.snapshotLength;
    }
    return this._results.snapshotItem(i);
  },

  aq: function(s) { // append s to query
    this._dirty = true;
    this._query += s;
    return this;
  },
  acq: function(c, s) { // append contains class to query
    if (c) {
      this.aq("contains(concat(' ', normalize-space(@class), ' '), " +
          "' " + c + " ')");
    }
    if (s) {
      this.aq(s);
    }
    return this;
  }
});


var XPSetIter = new Klass({
  _init: function(headXp, leafXps) {
    this._head = headXp;
    this._leaves = leafXps;
  },

  hasNext: function() {
    return this._head.hasNext();
  },

  next: function(r) {
    if (!r) {
      r = {};
    }
    var root = this._head.next();
    for (var k in this._leaves) {
      if (this._leaves.hasOwnProperty(k)) {
        var leaf = this._leaves[k];
        leaf.setRoot(root);
        r[k] = leaf.get();
      }
    }
    return r;
  }
});
    

var NodeBuilder = new Klass({
  reset: function(n, doc) {
    this._n = (n || null);
    this._doc = (doc || document);
  },
  make: function(name, attr, text) {
    if (!name && !attr) {
      if (!text) {
        return this.frag();
      } else {
        return this.text(text);
      }
    }
    var n = this._doc.createElement(name);
    for (var k in (attr || {})) {
      if (attr.hasOwnProperty(k)) {
        n.setAttribute(k, attr[k]);
      }
    }
    if (text) {
      n.textContent = text;
    }
    return n;
  },
  text: function(s) {
    return this._doc.createTextNode(s);
  },
  frag: function() {
    return this._doc.createDocumentFragment();
  },

  put: function(n, loc, rel, overwrite) {
    if (!rel) {
      if (!this._n) {
        this._n = this.frag();
      }
      rel = this._n;
    }
    var oth = null;
    if (loc < 0) {
      loc = rel.childNodes.length + loc + 1;
    }
    if (loc <= 0 || loc === 'first') {
      oth = rel.firstChild;
    } else if (loc < rel.childNodes.length) {
      oth = rel.childNodes[loc];
    } else if (loc === rel.childNodes.length) {
      oth = null;
    } else if (loc === 'before') {
      oth = rel;
      rel = rel.parentNode;
    } else if (loc === 'after') {
      oth = rel.nextSibling;
      rel = rel.parentNode;
    } else if (loc) {
      throw new Error("Unknown location: " + loc);
    }
    if (overwrite && oth) {
      rel.replaceChild(n, oth);
    } else {
      rel.insertBefore(n, oth);
    }
  },

  add: function(name, attr, text, loc, rel) {
    var n = this.make(name, attr, text);
    this.put(n, loc, rel);
    return n;
  },
  push: function(name, attr, text, loc, rel) {
    var n = this.make(name, attr, text);
    this.put(n, loc, rel);
    this.use(n);
    return n;
  },
  top: function() {
    var r = this._n;
    while (r && r.parentNode) {
      r = r.parentNode;
    }
    return r;
  },
  get: function() {
    return this._n;
  },
  use: function(n) {
    this._n = n;
    return this;
  }
});


function bind(that, f) {
  return function () { return f.apply(that, arguments); };
}

function curry(f) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return f.apply(this, Array.prototype.concat.apply(args, arguments));
  };
}
function curryTail(f) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return f.apply(this, Array.prototype.slice.call(arguments).concat(args));
  };
}

function magicGlobals(table) {
  // TODO: allow detection of values from pages even if they are only needed
  // some other page (where they might not be available).

  function stripMethods(i) {
    var o = (i instanceof Array ? [] : {});
    for (var k in i) {
      if (i.hasOwnProperty(k)) {
        var v = i[k];
        if (v === null || v === undefined) { continue; }
        var t = typeof(v);
        if (t === 'function') { continue; }
        if (t === 'object') {
          o[k] = stripMethods(v);
        } else {
          o[k] = v;
        }
      }
    }
    return o;
  }

  function MagicGlobals() { }
  var proto = MagicGlobals.prototype = {}; 
  var vs = {};
  var lvs;
  try {
    lvs = localStorage.getItem('kuzu_magicGlobals');
  } catch (e) {
    log("Can't load MagicGlobals: " + e);
  }
  lvs = (lvs ? JSON.parse(lvs) : {});
  function storeLv(k, lv) {
    lvs[k] = lv;
    try {
      localStorage.setItem('kuzu_magicGlobals', JSON.stringify(
          stripMethods(lvs)));
    } catch (e) {
      log("Can't store MagicGlobals: " + e);
    }
  }
  function makeGetter(k, dv, f) {
    return function () {
      if (vs.hasOwnProperty(k)) { return vs[k]; }
      if (f) {
        var v = f(dv);
        // XXX just let f worry about bound methods of dv?
        if (v !== undefined) {
          vs[k] = v;
          storeLv(k, v);
          return v;
        }
      }
      return dv;
    };
  }
  for (var k in table) {
    if (table.hasOwnProperty(k)) {
      var sk;
      if (typeof(table[k]) === 'function') {
        proto[k] = table[k];
      } else {
        var dv = table[k][0], f = table[k][1];
        for (sk in dv) {
          if (dv.hasOwnProperty(sk) && typeof(dv[sk]) === 'function') {
            dv[sk] = bind(dv, dv[sk]);
          }
        }
        if (lvs.hasOwnProperty(k)) {
          var lv = lvs[k];
          if (typeof(dv) === 'object') {
            // allow stuff not in lv (e.g. functions) to remain in dv
            for (sk in lv) {
              if (lv.hasOwnProperty(sk) && typeof(dv[sk]) !== 'function') {
                dv[sk] = lv[sk];
              }
            }
          } else {
            dv = lv;
          }
        }
        var g = makeGetter(k, dv, f);
        if (Object.defineProperty) {
          Object.defineProperty(proto, k, {get: g, enumerable: true});
        } else {
          proto.__defineGetter__(k, g);
        }
      }
    }
  }
  return new MagicGlobals();
}

var Prefs = (function () {
  var data = null;
  var lsKey = 'kuzu_prefs';
  var prefs = {
    _load: function() {
      var raw = localStorage.getItem(lsKey);
      data = (raw ? JSON.parse(raw) : {});
    },
    get: function (k, df) {
      if (!data) { prefs._load(); }
      return (data.hasOwnProperty(k) ? data[k] : df);
    },
    set: function (k, v) {
      if (!data) { prefs._load(); }
      data[k] = v;
      var raw = JSON.stringify(data);
      localStorage.setItem(lsKey, data);
    }
  };
  return prefs;
})();

//
// (mostly) VegWeb-specific stuff
//

var MG = magicGlobals({
  postsPerPage: [20, null],

  maxImgWidth: [525, function() {
    var div = new XPIter("//div[").acq("node-forum-post", "]//div" +
        "[@property='content-encoded']").get();
    if (!div) { return; }
    var w = div.scrollWidth;
    // try to ensure somewhat reasonable values.
    if (w >= 480 && w <= 1024) {
      return w;
    } else {
      log("Unexpectedly small/big max comment width: " + w);
    }
  }],

  userInfo: [{imgUrlHead: 'http://vegweb.com/sites/default/files/styles/',
      imgUrlTail: '/public/default_images/VegWebMissingProfile.darkgray.gif',
      profileUrl: '/users/',
      name: 'anonymous',
      getImgUrl: function (which) {
        return this.imgUrlHead + (which || 'user_block_image') +
            this.imgUrlTail;
      }}, function (self) {
    var updated = false;
    var userBlock = document.getElementById('block-vegweb-user-user-block');
    var xp = new XPIter(".//div[", userBlock).acq(
        "field-name-field-profile-picture", "]//a[@href]/img[@src]");
    if (xp.hasNext()) {
      var img = xp.next();
      var src = img.getAttribute('src');
      self.imgUrlTail = src.replace(/.*\/files\/styles\/[^\/]*/, '');
      self.imgUrlHead = src.replace(/[^\/]*\/public\/.*/, '');
      self.profileUrl = img.parentNode.getAttribute('href');
      updated = true;
    }
    xp.reset(".//div[@property='foaf:name']/h2", userBlock);
    if (xp.hasNext()) {
      self.name = xp.get().textContent;
      updated = true;
    }
    if (updated) { return self; }
  }]
});


function colorizePosts(user, color) {
  var xp = new XPIter("//div[").acq("comment", "][.//a/@href='/users/" +
      user + "']//div[").acq("field-name-comment-body", "]");
  while (xp.hasNext()) {
    var commentBody = xp.next();
    commentBody.style.color = color;
  }
}

function quotePost(comment, editor) {
  var xp = new XPIter(".//a[@id]", comment.parentNode);
  var id = xp.get().getAttribute('id');
  var loc = window.location;
  var postUrl = "http://vegweb.com" + loc.pathname + loc.search + '#' + id;
  xp.reset(".//a[@class='username']", comment);
  var a = xp.get();
  var author = '<a href="' + a.getAttribute('href') + '">' + a.textContent + 
      "</a>, " + a.nextSibling.textContent + ",";
  xp.reset(".//div[@property='content:encoded']", comment);
  var body = xp.get().innerHTML;
  // seems to be a <p></p> added at the beginning and end of everything.
  body = body.replace(/^<p><\/p>/, '').replace(/<p><\/p>$/, '');
  body = body.replace(/\n/g, '');
  insertText('<div class="quote"><span>' + author + ' <a href="' + postUrl +
      '">wrote</a>:</span> <blockquote>' + body + '</blockquote></div>\n',
      editor);
  (document.getElementById('comment-form--2') || editor).scrollIntoView();
}

function addQuoteButtons() {
  var nb = new NodeBuilder();
  var xp = new XPIter("//div[").acq("comment",
      "]//div[").acq("field-name-comment-like-button", "]");
  var editor = document.getElementById("edit-comment-body-und-0-value--2");
  while (xp.hasNext()) {
    var likeButton = xp.next();
    nb.reset();
    nb.push('div', {'class':"field field-name-comment-quote-button " +
        "field-type-ds field-label-hidden"});
    nb.push('div', {'class':"field-items"});
    nb.push('div', {'class':"field-item even"});
    var a = nb.add('a', {href:'javascript:;'}, "Quote");
    var comment = likeButton;
    while (comment &&
        !/( |^)comment( |$)/.test(comment.getAttribute('class'))) {
      comment = comment.parentNode;
    }
    if (!comment) { log("like button but no comment..."); continue; }
    a.addEventListener('click', curry(quotePost, comment, editor), false);
    nb.put(nb.top(), 'after', likeButton);
  }
}

function wrapText(pre, post, editor) { 
  var ss = editor.selectionStart;
  var se = editor.selectionEnd;
  var v = editor.value;
  editor.value = v.slice(0, ss) + pre + v.slice(ss, se) + post + v.slice(se);
  editor.selectionStart = ss + pre.length;
  editor.selectionEnd = se + pre.length;
  editor.focus();
}
function updateText(oldS, newS, editor) {
  var ss = editor.selectionStart;
  var se = editor.selectionEnd;
  var v = editor.value;
  var i = v.lastIndexOf(oldS);
  if (i === -1) { return; }
  editor.value = v.slice(0, i) + newS + v.slice(i + oldS.length);
  var ld = newS.length - oldS.length;
  if (ss >= i + oldS.length) {
    ss += ld;
  } else if (se > i) {
    ss = i;
  }
  if (se >= i + oldS.length) {
    se += ld;
  } else if (se > i) {
    ss = i + newS.length;
  }
  editor.selectionStart = ss;
  editor.selectionEnd = se;
}
function insertText(s, editor) {
  // XXX maybe this should replace the selection?
  var se = editor.selectionEnd;
  var v = editor.value;
  editor.value = v.slice(0, se) + s + v.slice(se);
  editor.selectionStart = se;
  editor.selectionEnd = se + s.length;
  editor.focus();
}
function wrapHTMLElem(tag, editor) {
  return wrapText('<' + tag + '>', '</' + tag + '>', editor);
}


function unmangleImageUrl(s) {
  // returns: [imgSrc, title, hostUrl] or []
  var tests = [[/^((ht|f)tps?:\/\/.+\..+\/.+)$/i, 1], // [
      [/(\[url=(.*)\])?\s*\[(ima?ge?)\](.*)\[\/\3\](\[\url\])?/i,
        4, 2],
      [/(\[url=(.*)\])?\s*\[(ima?ge?)=(.*?)\](\[\/\3\])?(\[\url\])?/i,
        4, 2],
      [/((<)(a).+?href="(.*?)".*?(>))?.*<img.+?src="(.*?)".*?>.*\2\/?\3\5/i,
        6, 4, /\stitle="(.*?)"/i, 1]];
  var host, img, title;
  for (var i = 0, l = tests.length; i < l; ++i) {
    var test = tests[i];
    var m = test[0].exec(s);
    if (m) {
      img = m[test[1] || 0];
      host = (test[2] ? m[test[2]] : null);
      if (test.length > 4) {
        m = test[3].exec(s);
        if (m) {
          title = m[test[4]];
        }
      } else {
        title = (test[3] ? m[test[3]] : null);
      }
      return [img, host, title];
    }
  }
  return [];
}

function makeImgCode(src, link, attr) {
  var r = '<img src="' + src + '" ';
  for (var k in attr) {
    if (attr.hasOwnProperty(k) && attr[k]) {
      r += k + '="' + attr[k] + '" ';
    }
  }
  r += '/>';
  if (link) {
    r = '<a href="' + link + '">' + r + '</a>';
  }
  return r;
}

function htmlizeImageUrl(s, insertCB, replaceCB, maxWidth) {
  if (!s) {
    return '';
  }
  var m = unmangleImageUrl(s);
  if (!m || m.length < 1) {
    return s; // XXX unmangle failed; warn?
  }
  var src = m[0], link = m[1], title = m[2];
  var s1 = makeImgCode(src, link, {title:title});
  if (insertCB) {
    var nb = new NodeBuilder();
    var img = nb.push('img');
    if (replaceCB) {
      insertCB(s1);
    }
    img.addEventListener('load',
        function () {
          var w = img.width;
          var h = img.height;
          if (!maxWidth && maxWidth !== 0) { // undefined, NaN, etc.
            maxWidth = MG.maxImgWidth;
          }
          if (maxWidth > 0) {
            h = Math.round(h * maxWidth / w);
            w = maxWidth;
          }
          var s2 = makeImgCode(src, link, {title:title, width:w, height:h});
          if (replaceCB) {
            replaceCB(s1, s2);
          } else {
            insertCB(s2);
          }
        }, false);
    img.setAttribute('src', src);
  } else {
    return s1;
  }
}


function updatePreview(editor) {
  var body = document.getElementById('kuzu_preview_comment_body');
  var previewTop;
  if (!body) {
    var nb = new NodeBuilder();
    previewTop = nb.push('div', {style:"border: 1px dashed red; " +
        "padding: .3em; margin: .2em;", id:'kuzu_preview_top'});
    nb.add('span', {style:'text-align: center;'},
        "Warning: in some cases, the preview may be misleading! ");
    nb.push('span', null, "(If you find significant differences between " +
        "the preview and the final result, please try to use the '");
    nb.add('span', {'class':'kuzu_clickable'}, "Recall Last Post"
        ).addEventListener('click', curry(recallLastPost, editor), false);
    nb.add(null, null, "' button to get the post's original content and " +
        "send it to me, ");
    nb.add('a', {'href':'/users/kuzu'}, "kuzu");
    nb.add(null, null, ".)");
    nb.use(previewTop.parentNode);
    nb.push('div', {'class':"view-content"});
    nb.push('div', {'class':"views-row views-row-2 views-row-even " +
        "views-row-last"});
    nb.add('a', {id:"kuzu_preview_comment"});
    var comment = nb.push('div', {'class':"ds-2col-stacked-fluid comment " +
        "comment-by-node-author view-mode-full clearfix"});

    nb.push('div', {'class':"group-left"});
    nb.push('div', {'class':"field field-name-author-picture " +
        "field-type-ds field-label-hidden"});
    nb.push('div', {'class':"field-items"});
    nb.push('div', {'class':"field-item even"});
    nb.push('div', {'class':"field field-name-field-profile-picture " +
        "field-type-image field-label-hidden"});
    nb.push('div', {'class':"field-items"});
    nb.push('div', {'class':"field-item even"});
    var uinfo = MG.userInfo;
    nb.push('img', {'width':"70", 'height':"69", 'alt':"",
        'typeof':"foaf:Image",
        'src':MG.userInfo.getImgUrl("user_picture_comment_thumb")});

    nb.use(comment);
    var rightGroup = nb.push('div', {'class':"group-right"});
    nb.push('div', {'class':"field field-name-forum-comment-submitted " +
        "field-type-ds field-label-hidden"});
    nb.push('div', {'class':"field-items"});
    nb.push('div', {'class':"field-item even"});
    nb.add(null, null, "(Not yet) posted by ");
    var now = new Date();
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'];
    nb.add('a', {'class':"username", property:"foaf:name",
        'typeof':"sioc:UserAccount", about:uinfo.profileUrl, 'xml:lang':'',
        title:"View user profile.", href:uinfo.profileUrl},
        uinfo.name);
    nb.add(null, null, " on " + month[now.getMonth()] + " " + now.getDate() + 
        ", " + now.getFullYear());

    nb.use(rightGroup);
    nb.push('div', {'class':"field field-name-comment-body " +
        "field-type-text-long field-label-hidden"});
    nb.push('div', {'class':"field-items"});
    body = nb.push('div', {'class':"field-item even",
        property:"content:encoded", id:"kuzu_preview_comment_body"});
    var xp = new XPIter("//div[").acq("view-comments", "][").acq(
        "view-id-comments", "]");
    nb.put(nb.top(), -1, xp.get());
  } else {
    previewTop = document.getElementById('kuzu_preview_top');
  }
  var s = editor.value;
  var ss = '';
  var stack = [];
  var blockTag = {p:true, blockquote:true, ul:true, ol:true, div:true,
    em:false, strong:false, a:false, img:false, span:false};
  while (s) {
    var m = /([\s\S]*?)(<\s*(\/?)\s*(p|blockquote)[^>]*>)([\s\S]*)/i.exec(s);
    var t, tag, close, tagName;
    if (m) {
      t = m[1];
      tag = m[2];
      close = m[3];
      tagName = m[4].toLowerCase();
      s = m[5];
      if (!blockTag.hasOwnProperty(tagName)) {
        tag = '';
      }
    } else {
      t = s;
      tag = '';
      s = '';
    }
    if (stack.length === 0) {
      ss += '<p>' + t.replace(/(\n|\r)(\n|\r)+/g, '</p><p>') + '</p>';
    } else {
      ss += t;
    }
    if (tag) {
      if (blockTag[tagName]) {
        if (close) {
          if (tagName === stack[stack.length - 1]) {
            stack.pop();
          } else {
            // XXX unbalanced tags; probably should warn user
            log("unbalanced tag: " + tag);
          }
        } else {
          stack.push(tagName);
        }
      }
      ss += tag;
    }
  }
  if (stack.length) {
    // XXX unclosed elements; should warn
    log("unclosed tags: " + stack);
  }
  body.innerHTML = '<p></p>' + ss + '<p></p>';
  previewTop.scrollIntoView();
  //localStorage.setItem('kuzu_lastPost', editor.value);
}

function recallLastPost(editor) {
  var lastPostBox = document.getElementById('kuzu_last_post_box');
  if (!lastPostBox) {
    var nb = new NodeBuilder();
    lastPostBox = nb.push('textarea', {id:'kuzu_last_post_box',
        readonly:"readonly", rows:editor.getAttribute('rows'),
        cols:editor.getAttribute('cols'), style:'height:auto;'});
    nb.put(nb.top(), 0,
        document.getElementById('comment-body-add-more-wrapper--2'));
  }
  var s = localStorage.getItem('kuzu_lastPost');
  lastPostBox.value = s;
  lastPostBox.selectionStart = 0;
  lastPostBox.selectionEnd = s.length;
  lastPostBox.focus();
  lastPostBox.scrollIntoView();
}

function commentSubmitCheck(editor, evt) {
  var abort = false;
  if (editor.value.trim() === localStorage.getItem('kuzu_lastPost').trim()) {
    if (!window.confirm("You appear to have already submitted an " +
        "identical post. Submit again?")) {
      abort = true;
    }
  } else if (Prefs.get('alwaysConfirmBeforeSubmit', true)) {
    if (!window.confirm("Are you sure you want to post this?")) {
      abort = true;
    }
  }
  if (abort) {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  } else {
    localStorage.setItem('kuzu_lastPost', editor.value);
  }
}

var Dialog = new Klass({
  _static: {
    getOverlay: function (nb) {
      var overlay = document.getElementById('kuzu_dark_overlay');
      if (overlay) { return overlay; }
      nb = nb || new NodeBuilder();
      overlay = nb.add('div', {id:'kuzu_dark_overlay', style:
          'position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; ' +
          'margin: 0px; padding: 0px; opacity: 0.4; background-color: ' +
          'black; display: none; z-index:108;'}, '', 0, document.body);
      return overlay;
    },
    makePopupOnClick: function (base, popup) {
      var overlay = Dialog.getOverlay();
      popup.style.display = 'none';
      popup.style.setProperty('z-index', 109);
      function hide() {
          popup.style.display = 'none'; overlay.style.display = 'none'; }
      function flip() {
        if (popup.style.display === 'none') {
          popup.style.display = 'block';
          overlay.style.display = 'block';
        } else {
          popup.style.display = 'none';
          overlay.style.display = 'none';
        }
      }
      overlay.addEventListener('click', hide, false);
      base.addEventListener('click', flip, false);
      return hide;
    }
  },
  _init: function (base, title, okLabel, nb) {
    nb = nb || new NodeBuilder();
    nb.use(base);
    var popup = nb.push('div', {'class': 'kuzu_popup'});
    popup.addEventListener('click', function (evt) {
        evt.stopPropagation(); }, false);
    var hide = Dialog.makePopupOnClick(base, popup);
    var head = nb.push('div', {'class': 'kuzu_dialog_head'});
    nb.push('div', {'class': 'kuzu_clickable', 'style': 'float: left;'});
    var close = nb.add('span', null, 'close');
    close.addEventListener('click', hide, false);
    nb.use(head);
    nb.push('div', {'style': 'text-align: center;'});
    nb.add('span', null, title);
    nb.use(popup);
    this.body = nb.add('div', {'class': 'kuzu_dialog_body'});
    nb.push('div', {'class': 'kuzu_dialog_foot'});
    this.okayButton = nb.add('input', {'type': "button", 'value': okLabel});
    this.cancelButton = nb.add('input', {'type': "button", 'value': "Cancel"});
    var that = this;
    this.cancelButton.addEventListener('click', function (evt) {
        hide(); if (that.cancel) { that.cancel(evt); }
        evt.stopPropagation(); evt.preventDefault(); }, false);
    this.okayButton.addEventListener('click', function (evt) {
        hide(); if (that.okay) { that.okay(evt); }
        evt.stopPropagation(); evt.preventDefault(); }, false);
    nb.use(this.body);
  }
});



function addCommentEditButtons() {
  addCSS(
      // set overflow to visible so popups don't get hidden
      "#comment-form--2 { overflow: visible; }\n" +
      "#comment-form--2 .field-name-comment-body { margin-top: 0; " +
        "padding-top: 20px; }\n" +
      "ul.kuzu_comment_toolbar { padding: .2em; margin: 0; }\n" +
      ".kuzu_comment_toolbar li { float: left; padding: 0.2em 0.5em; " +
        "margin: 0px; }\n" +
      ".kuzu_comment_toolbar li.kuzu_comment_toolbar_right { " +
        "float: right; }\n" +
      ".kuzu_clickable { cursor: pointer; " +
        "background-color: #F8F4EB; border: 2px solid #F8F4EB; }\n" +
      ".kuzu_clickable:hover { " +
        "background-color: #FCFAF5; border: 2px solid #7F7C75; }\n" +
      ".kuzu_popup_base { position: relative; }\n" +
      ".kuzu_popup { display: none; position: absolute; " +
        "background: #F8F4EB; color: #333333; border: 3px double #CFCCC5; " +
        "z-index: 9; top: -2px; left: 0px; cursor: auto; }\n" +
      ".kuzu_popup_base:hover .kuzu_popup { display: block; }\n" +
      ".kuzu_popup_base table { border-spacing: 2px; " +
          "border-collapse: separate; }\n" +
      ".kuzu_popup_base ol { padding: 0em; }\n" +
      ".kuzu_popup li { float: none; padding: 0.5em; }\n" +
      ".kuzu_popup tr { border: 0 none; }\n" +
      ".kuzu_popup td { text-align: center; vertical-align: middle; " +
          "padding: 2px; }\n" +
      '.kuzu_popup input[type="button"] { cursor: pointer; }\n' +
      '.kuzu_popup .kuzu_dialog_foot input { float: right; }\n' +
      "form .kuzu_popup_base .kuzu_popup textarea { width: auto; " +
          "height: auto; font-size: 100%; }\n" +
      "");
  var nb = new NodeBuilder();
  var ul = nb.push('ul', {'class':'kuzu_comment_toolbar'});
  nb.add('div', {'class':'clearfix'}, '', 'after');
  var editor = document.getElementById('edit-comment-body-und-0-value--2');
  editor.form.addEventListener('submit', curry(commentSubmitCheck, editor),
      false);

  function addButtons(buttons, liAttr) {
    for (var k in buttons) {
      if (Object.prototype.hasOwnProperty.call(buttons, k)) {
        var action = buttons[k];
        var li = nb.add('li', liAttr);
        li.innerHTML = k;
        li.addEventListener('click', curry(action, editor), false);
      }
    }
  }
  // XXX The common parts of the add.*Popup functions should be merged.
  function addSmileyPanel(aUrl, imgUrlPre, imgUrlPost, imgs, cols) {
    if (!cols) {
      cols = Math.ceil(Math.sqrt(imgs.length) * 1.5);
    }
    var li = nb.push('li', {'class':'kuzu_clickable kuzu_popup_base'});
    nb.add('img', {'src': imgUrlPre + imgs[0] + imgUrlPost});
    nb.add(null, null, "\u2193");
    var popup = nb.push('div', {'class':'kuzu_popup'});
    Dialog.makePopupOnClick(li, popup);
    var table = nb.push('table');
    var row;
    for (var i = 0, l = imgs.length; i < l; ++i) {
      if ((i % cols) === 0) {
        nb.use(table);
        row = nb.push('tr');
      }
      var cell = nb.push('td', {'title':imgs[i], 'class':'kuzu_clickable'});
      var imgUrl = imgUrlPre + imgs[i] + imgUrlPost;
      nb.add('img', {'src':imgUrl});
      var s = '<img title="' + imgs[i] + '" border="0" src="' + imgUrl + 
          '" />';
      if (aUrl) {
        s = '<a href="' + aUrl + '">' + s + '</a>';
      }
      cell.addEventListener('click', curry(insertText, s, editor), false);
      nb.use(row);
    }
    nb.use(li.parentNode);
  }
  function addDropDownList(head, buttons, popupOnClick) {
    var start = nb.get();
    var li = nb.push('li', {'class':'kuzu_clickable kuzu_popup_base'});
    li.innerHTML = head;
    nb.add(null, null, "\u2193");
    var popup = nb.push('div', {'class':'kuzu_popup'});
    if (popupOnClick) {
      Dialog.makePopupOnClick(li, popup);
    }
    var ul = nb.push('ol');
    for (var k in buttons) {
      if (buttons.hasOwnProperty(k)) {
        li = nb.add('li', {'class':'kuzu_clickable'});
        li.innerHTML = k;
        li.addEventListener('click', curry(buttons[k], editor), false);
      }
    }
    nb.use(start);
  }
  function addImageDialogPopup(head) {
    var start = nb.get();
    var li = nb.push('li', {'class':'kuzu_clickable kuzu_popup_base'});
    li.innerHTML = head;
    nb.add(null, null, "\u2193");
    var dialog = new Dialog(li, "Image Dialog", "Insert tags", nb);
    nb.use(dialog.body);
    var ta = nb.add('textarea', {'rows': 4, 'cols': 80, 'placeholder':
        "Please enter an image url (or something similar)"});
    nb.add('span', null, "Max width (pixels):");
    var width = nb.add('input', {'type':"text", placeholder:'' +
        MG.maxImgWidth, 'size': 5});
    dialog.cancel = function () { ta.value = width.value = ''; };
    dialog.okay = function () {
      var v = ta.value; 
      ta.value = '';
      var w  = parseInt(width.value, 10);
      htmlizeImageUrl(v, curryTail(insertText, editor),
          curryTail(updateText, editor), w);
    };
    nb.use(start);
  }

  var buttons = {
    '<strong>Bold</strong>': curry(wrapHTMLElem, 'strong'),
    '<em>Italics</em>': curry(wrapHTMLElem, 'em')
  };
  var rightButtons = {
    'Preview': updatePreview,
    'Recall Last Post': recallLastPost
  };

  addButtons(buttons, {'class':"kuzu_clickable"});
  addImageDialogPopup("Image");
  addDropDownList('&amp;', {'&amp;': curry(insertText, '&amp;'),
      '&lt;': curry(insertText, '&lt;'),
      '&gt;': curry(insertText, '&gt;')}, true);
  addSmileyPanel('http://www.freesmileys.org/smileys.php', 
      'http://www.freesmileys.org/smileys/smiley-basic/', '.gif',
      ['biggrin', 'blink', 'cool', 'dry', 'huh', 'laugh', 'mad', 'mellow',
      'ohmy', 'rolleyes', 'sad', 'smile', 'tongue', 'unsure', 'wink',
      'angel', 'arms', 'badday', 'banned', 'bye', 'cloud9', 'cry', 'drool',
      'excited', 'fart', 'goodgrief', 'hug', 'locked', 'lol', 'popcorn',
      'rant', 'rip', 'rofl', 'tears', 'sick', 'sleep', 'stamp', 'stereo',
      'shy', 'sweat', 'therethere', 'thumbsup', 'ty', 'welcome', 'what']);
  addButtons(rightButtons, {'class':"kuzu_clickable " +
      "kuzu_comment_toolbar_right"});
  nb.put(nb.top(), 0,
      document.getElementById('comment-body-add-more-wrapper--2'));
  var submit = document.getElementById("edit-submit--2");
  nb.reset();
  var form = nb.push('form', {'style': "float: right;"});
  nb.push('label');
  var cb = nb.add('input', {'type': 'checkbox', 'value': 'alwaysConfirm',
      'checked': Prefs.get('alwaysConfirmBeforeSubmit', true)});
  nb.add(null, null, "Always confirm before submitting");
  cb.addEventListener('click', function () {
    Prefs.set('alwaysConfirmBeforeSubmit', cb.checked); }, false);
  nb.put(form, 'after', submit);
}


function fixForumTopicsLinks() {
  var rowXp = new XPIter("//div[").acq("view-forum-topics", "]//tbody/tr");
  var ccXp = new XPIter("./td[").acq("views-field-comment-count", "]");
  var newXp = new XPIter("./td[").acq("views-field-title", "]//span/a");
  var tXp = new XPIter("./td[").acq("views-field-title", "]/a");
  var postsPerPage = MG.postsPerPage;
  var nb = new NodeBuilder();
  addCSS(".kuzu_lastPageLink { font-size: 75%; }");
  while (rowXp.hasNext()) {
    var row = rowXp.next();
    var cc = parseInt(ccXp.setRoot(row).get().textContent.replace(',', ''), 10);
    var lastPage = Math.floor((cc - 1) / postsPerPage);
    if (lastPage > 0) {
      var t = tXp.setRoot(row).get();
      nb.reset();
      nb.add(null, null, ' ');
      nb.push('strong', {'class':'kuzu_lastPageLink'}, '(');
      nb.add('a', {href:(t.getAttribute('href') + '?page=' + lastPage)},
          'page ' + (lastPage + 1));
      nb.add(null, null, ')');
      nb.put(nb.top(), 'after', t);
    }
    var newA = newXp.setRoot(row).get();
    if (newA) {
      // Note that the new comment count currently doesn't include the
      // first post in the thread (if that is the only new post, there is no
      // newA).
      var nc = parseInt(newA.textContent.replace(/\s*new.*/i,
          '').replace(',', ''), 10);
      var npPage = Math.floor((cc - nc) / postsPerPage);
      var m = /([^?#]*)((\?([^#]*&)?page=\d+(&[^#]*)?)|(\?([^#]*)))?(#.*)?/
          .exec(newA.getAttribute('href'));
      if (m) {
        var path = m[1] || '';
        var pre = m[4] || '';
        if (!m[4] && m[7]) {
          pre = m[7] + '&';
        }
        var post = m[5] || '';
        var query = '';
        if (npPage) {
          query = '?' + pre + 'page=' + npPage + post;
        } else {
          // remove the '&'
          pre = pre.slice(0, pre.length - 1);
          post = post.slice(1);
          if (pre && post) {
            query = '?' + pre + '&' + post;
          } else if (pre || post) { // xor
            query = '?' + pre + post;
          }
        }
        var hash = m[8] || '';
        if (hash === '#new') {
          // later, if we load a page a such a hash, jump to the right post
          // note: 0 means "first post on page"
          var jumpTo = (cc - nc) % postsPerPage;
          hash = '#new-' + jumpTo;
        }
        newA.setAttribute('href', path + query + hash);
      }
    }
  }
}


//
// page specific
//

function fixCommentThreadPage(noJS) {
  colorizePosts("shelloid", "purple");

  addQuoteButtons();
  addCommentEditButtons();

  if (noJS) {
    addCSS("form.comment-form .form-actions { display: block !important; }");
    var editor = document.getElementById('edit-comment-body-und-0-value--2');
    if (editor) {
      editor.setAttribute('rows', 10);
      editor.style.height = 'auto';
    }
  }

  // convert #new-(n) into #comment-(n'th post on page; starting from 0)
  var m = /#new-(\d+)$/.exec(window.location.hash);
  var remove = false;
  var targetUrl;
  function jumpToUrl() {
    window.location.replace(targetUrl);
    if (remove) { window.removeEventListener('load', jumpToUrl, false); }
  }
  if (m) {
    var jumpTo = parseInt(m[1], 10);
    var xp = new XPIter("//a[@id][following-sibling::div[").acq("comment",
        "]]");
    var dst = xp.get(jumpTo);
    m = /(.*#).*/.exec(window.location);
    targetUrl = m[1] + dst.getAttribute('id');
    jumpToUrl();
    remove = true;
    window.addEventListener('load', jumpToUrl, false);
  }
}

function fixTopicListPage(noJS) {
  fixForumTopicsLinks();
  // XXX forumsState should probably go in its own class...
  var fs = localStorage.getItem('kuzu_forumsState');
  if (fs) {
    fs = JSON.parse(fs);
    var m = /^\/forums\/([^\/]+)\/?/.exec(window.location.pathname);
    var forumName = m && m[1];
    if (forumName) {
      var pr = fs[forumName] || {};
      pr.unread = false;
      pr.lastRead = Date.now();
      fs[forumName] = pr;
      localStorage.setItem('kuzu_forumsState', JSON.stringify(fs));
    }
  }
}

function fixForumListPage(noJS) {
  addCSS(".view-mode-forum a .kuzu_newMarker { color: #B7280A; " +
      "font-size: 65%; }\n" +
    ".view-mode-forum a:hover .kuzu_newMarker { color: #D7483A; }");
  var nb;
  var xpSet = new XPSetIter(new XPIter("//div[").acq("view-mode-forum", "]"), {
    title:new XPIter(".//div[").acq("field-name-title", "]//h2/a"),
    posts:new XPIter(".//li[").acq("item-post-counts", "]/span[").acq(
      "item-value", "]"),
    topics:new XPIter(".//li[").acq("item-topics-count", "]/span[").acq(
      "item-value", "]"),
    last:new XPIter(".//li[").acq("item-last-post", "]/span[").acq(
      "item-value", "]/a"),
    time:new XPIter(".//li[").acq("item-last-post", "]//span[").acq(
      "time", "]"),
    user:new XPIter(".//li[").acq("item-last-post", "]/span[").acq(
      "item-value", "]/a[@property='foaf:name']")
  });
  var r = null;
  var prev = localStorage.getItem('kuzu_forumsState');
  prev = (prev ? JSON.parse(prev) : {});
  var cur = null;
  while (xpSet.hasNext()) {
    r = xpSet.next(r);
    var m = /\/community\/([^\/]+)\/(.*)/.exec(r.last.getAttribute('href'));
    var forumName = m[1];
    var topicPath = m[2];
    var nr = {posts: parseInt(r.posts.textContent, 10), 
        topics: parseInt(r.topics.textContent, 10),
        last: topicPath, quote: r.last.textContent, user: r.user.textContent};
    var tm = /((?:(\d+)\s*years?)?\s*(?:(\d+)\s*months?)?\s*(?:(\d+)\s*weeks?)?\s*(?:(\d+)\s*days?)?\s*(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*min(?:ute)?s?)?\s*(?:(\d+)\s*sec(?:ond)?s?)? ago|(now))/i.exec(r.time.textContent);
    var timeGuess; // timeGuess[0] <= trueTime <= timeGuess[1]
    var now = Date.now();
    if (tm && tm[0]) {
      if (tm[9]) {
        timeGuess = [now, now];
      } else {
        var td = 0, td2 = 0;
        var tmult = [1, 12, 52/12.0, 7, 24, 60, 60];
        var lastI = 0;
        var i, l = tmult.length;
        for (i = 0; i < l; ++i) {
          if (tm[i + 2]) { lastI = i; }
        }
        for (i = 0; i < l; ++i) {
          td = td * tmult[i] + (parseInt(tm[i + 2], 10) || 0);
          // In words, the last specified number underwent round, floor, or
          // ceil, but I'm not sure which (round, I'd guess), so maximum error
          // of 1. Everything bigger should be correct.
          if (i < lastI) { continue; }
          if (i === lastI) { td2 = 1; }
          else { td2 *= tmult[i]; }
        }
        td = Math.round(td * 1000);
        td2 = Math.round(td2 * 1000);
        timeGuess = [now - td - td2, now - td + td2];
      }
    } else {
      // XXX should probably log things like this
      log("Couldn't parse time of last post");
      timeGuess = [0, now];
    }
    var pr = prev[forumName];
    if (pr) {
      nr.unread = pr.unread || timeGuess[0] > pr.lastRead || (
          (timeGuess[1] >= pr.lastRead || !pr.lastRead) &&
          //(nr.quote !== pr.quote || nr.user !== pr.user)
          (nr.posts > pr.posts || nr.topics > pr.topics));
      nr.lastRead = pr.lastRead;
    } else {
      // XXX when the script is new, should we default everything to unread?
      nr.unread = null;
    }
    if (nr.unread) {
      if (!nb) {
        nb = new NodeBuilder();
      }
      nb.use(r.title);
      nb.add(null, null, ' ');
      nb.add('span', {'class': "kuzu_newMarker"}, "(new posts)");
    }
    if (!cur) { cur = {}; }
    cur[forumName] = nr;
    if ((nr.unread && !pr.unread) || (!nr.unread && pr && (nr.quote !==
        pr.quote || nr.user !== pr.user || nr.posts !== pr.posts ||
        nr.topics !== pr.topics))) {
      // for debugging. 
      pr.timeGuess = timeGuess;
      cur[forumName + '.previous-state'] = pr;
      log('' + forumName + (nr.unread ? '' : ' not') + " marked unread");
    }
  }
  if (cur) {
    localStorage.setItem('kuzu_forumsState', JSON.stringify(cur));
  }
}

function checkForMessages() {
  var div = document.getElementById(
      "block-vegweb-pm-vegweb-pm-notifications-block");
  if (!div) {
    log("No #block-vegweb-pm-vegweb-pm-notifications-block");
    return;
  }
  var m = /(\d+)\s*unread\s*message/.exec(div.textContent);
  if (!m) { log("Couldn't parse message count"); return; }
  var cnt = parseInt(m[1], 10);
  if (cnt > 0) {
    var a = document.getElementById("quicktabs-tab-user_block-1");
    var nb = new NodeBuilder(a);
    nb.add('span', {'class': 'marker'}, '(' + cnt + ' new) ', 0);
  }
}

function shortenTitle() {
  var t = document.getElementsByTagName('title');
  for (var i = 0, l = t.length; i < l; ++i) {
    var s = t[i].textContent;
    t[i].textContent = s.replace(/, The World.*?Recipes/, '');
  }
}

function fixAllPages() {
  try {
    shortenTitle();
    checkForMessages();
  } catch (e) {
    log('' + e);
  }
  if (/^\/community\/[^\/]+\/[^\/]+/.test(window.location.pathname)) {
    fixCommentThreadPage(noJS);
  } else if (/^\/forums\/[^\/]+\/?/.test(window.location.pathname)) {
    fixTopicListPage(noJS);
  } else if (/^\/community\/?$/.test(window.location.pathname)) {
    fixForumListPage(noJS);
  }
}
fixAllPages();

if (noJS) {
  // for testing purposes
  (function () {
    /*globals unsafeWindow:false */
    var w = (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window);
    w.Klass = Klass;
    w.XPIter = XPIter;
    w.NodeBuilder = NodeBuilder;
    w.MG = MG;
    w.Prefs = Prefs;
  })();
}

}

// Insert into the document and run from there if javascript is enabled
(function () {
"use strict";
  /*globals unsafeWindow:false */
  var noJS = !(window.Drupal ||
      (typeof(unsafeWindow) !== 'undefined' && unsafeWindow.Drupal));
  var w = (typeof(unsafeWindow) !== 'undefined' ? unsafeWindow : window);
  function log(s) {
    if (typeof(console) && console.log) { console.log(s); }
    else if (typeof(GM_log)) { (GM_log || function(){})(s); }
  }
  if (noJS) {
    log("js disabled; running from within greasemonkey");
    main(true);
  } else {
    // XXX surely there is a better way to get semi-meaningful names/
    // line numbers out of the profiler >_<
    var src = localStorage.getItem('kuzu_src');
    if (src) {
      src = 'console.log("using version from localStorage");\n' +
          'console.log(Date.now());\nconsole.profile();\n' +
          src + '\nmain(true);\n' +
          'console.profileEnd();\nconsole.log(Date.now());\n';
    } else {
      src = '(' + main + ')();';
    }
    var script = document.createElement('script');
    script.appendChild(document.createTextNode(src));
    (document.body || document.head ||
        document.documentElement).appendChild(script);
    if (w && w.main && w.main.toSource() !== main.toSource()) {
      log("used old version?");
    }
  }
})();
