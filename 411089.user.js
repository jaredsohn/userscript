// ==UserScript==
// @name jpopsuki_ichigo_o0
// @namespace https://userscripts.org/users/605276
// @description Some improvements for jpopsuki 2.0
// @version 1.0.0
// @updateURL https://userscripts.org/scripts/source/411089.meta.js
// @downloadURL https://userscripts.org/scripts/source/411089.user.js
// @include /https?://(www\.|ssl\.)?jpopsuki\.(eu|tv)/.*/
// @grant none
// ==/UserScript==


/*global console:false */

function main(nojs) {
"use strict";

var VERBOSE_LOGGING = false;

function addCSS(s) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = s;
  head.appendChild(style);
  return style;
}

function viewportY(el) {
  var y = -window.pageYOffset;
  while (el) {
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return y;
}

function removeEl(el) {
  if (el && el.parentNode) { el.parentNode.removeChild(el); return true; }
  else { return false; }
}

function nthCol(tr, i) { // logical nth column, indexed from 0
  var j, cells = tr.cells;
  if (i >= 0) {
    for (j = 0; j < cells.length; ++j) {
      i -= cells[j].colSpan;
      if (i < 0) { break; }
    }
  } else {
    for (j = cells.length - 1; j >= 0; --j) {
      i += cells[j].colSpan;
      if (i >= 0) { break; }
    }
  }
  return cells[j];
}

// functions to evaluate boolean expressions
function mk(op, a, b, nb) { var f = function (x) { return op(x, a, b); };
    f.op = op; f.a = a; f.b = b; f.nb = nb; return f; }
mk.toSpan = function (f) {
  var span = document.createElement('span');
  span.className = f.op.name;
  if (!f.b) { span.textContent = f.op.str || f.op.name; }
  if (f.a) {
    if (f.a.op) { span.appendChild(mk.toSpan(f.a)); }
    else { span.textContent = f.a; }
  }
  if (f.b) {
    span.appendChild(document.createTextNode(f.op.str || f.op.name));
    if (f.b.op) { span.appendChild(mk.toSpan(f.b)); }
    else { span.appendChild(document.createTextNode(f.nb || f.b)); }
  }
  return span;
};
mk.toStr = function (f, ss, lit) {
  var join = !ss;
  if (!ss) { ss = []; }
  if (!f.op) { ss.push(f); return (join ? ss.join('') : ''); }
  if (!f.b) { ss.push(f.op.str || f.op.name); }
  if (f.a) {
    if (!lit && (!f.a.op || f.a.op === f.op || f.a.op === sin)) {
        mk.toStr(f.a, ss); }
    else { ss.push('('); mk.toStr(f.a, ss); ss.push(')'); }
  }
  if (f.b) {
    ss.push(f.op.str || f.op.name);
    if (!lit && (!f.b.op || f.b.op === f.op || f.b.op === sin)) {
        mk.toStr(f.nb || f.b, ss); }
    else { ss.push('('); mk.toStr(f.b, ss); ss.push(')'); }
  }
  if (join) {
    return ss.join('').trim();
  }
};
mk.trim = function (f, op, a, b) {
  if (f.op === op && f.a === a && f.b === b) { return pass; }
  var ra = f.a, rb = f.b;
  if (f.a && f.a.op) { ra = mk.trim(f.a, op, a, b); }
  if (f.b && f.b.op) { rb = mk.trim(f.b, op, a, b); }
  if (ra === f.a && rb === f.b) { return f; }
  if (ra === pass) { return rb || pass; }
  if (rb === pass && ra) { return ra; }
  return mk(f.op, ra, rb, f.nb);
};
var pass = mk(function pass() { return true; }); pass.op.str=' ';
function and(x, a, b) { return a(x) && b(x); }
and.str = ' ';
function or(x, a, b) { return a(x) || b(x); }
or.str = ' | ';
function not(x, a) { return !a(x); }
not.str = ' -';
// s[tring contained ]in
function sin(x, a, b) { var s=x.dataset[a]; return s && s.indexOf(b)!==-1; }
sin.str = '=';
mk.parse = function (s, keys) {
  var d = 0;
  // tag parentheses with nesting depth
  s = s.replace(/[()]/g, function (m) {
    if (m === '(') { return '(' + (++d) + '_'; } // else (m === ')')
    else if (d > 0) { return '_' + (d--) + ')'; }
    else { return m; }
  });
  var pat =
      /^\s*(-)?((\((\d+)_(.*?)_\4\))|((.+?)\s*(=)\s*([^ ()|]+)))\s*(\|)?/;
  // recursive parsing
  function p(s, op, a) {
    var m = pat.exec(s), b, ba, bb, bop, i;
    if (!m) { return a || pass; } // XXX error handling?
    var last = (m[0] ? m[0].length : s.length);
    if (m[4]) { // parenthesis
      b = p(m[5]);
    } else { // simple test
      ba = m[7]; bop = m[8]; bb = m[9];
      ba = ba.toLowerCase();
      if (keys) {
        for (i = 0; i < keys.length; ++i) {
          if (keys[i].startsWith(ba)) { ba = keys[i]; break; }
        }
      }
      bb = bb.replace(/&(\d+);/g,
          function (m, p1) { return String.fromCharCode(p1); });
      b = mk(sin, ba, '|' + bb + '|', bb);
    }
    if (m[1] === '-') { b = mk(not, b); }
    a = (op ? mk(op, a, b) : b);
    op = (m[10] ? or : and);
    s = s.slice(last);
    return (s ? p(s, op, a) : a);
  }
  return p(s);
};


//=- Utility to construct document fragments

function FragmentConstructor (top, cls) {
  this.reset(top, cls);
}
FragmentConstructor.prototype = {
  reset: function (top, cls) {
    if (top === null) {
      this.top = null;
    } else if (typeof(top) === 'string') {
      this.top = document.createElement(top);
      if (cls) { this.top.className = cls; }
    } else {
      this.top = top || document.createDocumentFragment();
    }
    this.el = this.top;
    return this;
  },
  up: function (i) {
    i = i || 1;
    while (--i >= 0) {
      this.el = this.el.parentNode;
    }
    return this;
  },
  push: function (tag, cls) {
    this.el = this.el.insertBefore((typeof tag === 'object' ? tag :
        document.createElement(tag)), null);
    if (cls) { this.el.className = cls; }
    return this;
  },
  addText: function (s) {
    this.el.insertBefore(document.createTextNode(s), null);
    return this;
  },
  datum: function (k, v) {
    this.el.dataset[k] = v;
    return this;
  },
  attr: function (k, v) { this.el.setAttribute(k, v); return this; },
  css: function (k, v) { this.el.style[k] = v; return this; },
  evt: function (evt, f, capture) {
    this.el.addEventListener(evt, f, capture || false);
    return this;
  },

  remove: function () { this.top.parentNode.removeChild(this.top); },
  before: function (el) { el.parentNode.insertBefore(this.top, el); },
  after: function (el) {
      el.parentNode.insertBefore(this.top, el.nextSibling); },
  first: function (el) { el.insertBefore(this.top, el.firstChild); },
  last: function (el) { el.insertBefore(this.top, null); }
};


//=- Support for userscript preferences

function Pref(name, label, value, hint, type, group, f) {
  this.name = name;
  this.label = label;
  this.type = type;
  if (type === 'checkbox') { value = (value ? 1 : 0); }
  this.value = this.savedValue = this.defaultValue = value;
  this.hint = hint || '';
  this.pdat = {}; // data for this specific page (not persistent)
  this.group = group;
  this.updater = f;
}
Pref.prototype = {
  get: function () {
    if (this.type === 'group' || this.type === 'tab') {
      return this.value;
    } else if (this.type === 'checkbox') {
      return (this.value ? 1 : 0);
    } else {
      return this.value;
    }
  },

  set: function (value) {
    if (this.type === 'group' || this.type === 'tab') {
      if (typeof(value) === 'object') {
        this.value.load(value);
      } // XXX else warn?
    } else if (this.type === 'checkbox') {
      this.value = (value ? 1 : 0);
    } else {
      this.value = value;
    }
  },

  update: function () {
    if (this.value === this.prevValue) { return; }
    if (this.group) { this.group.update(); }
    if (!this.updater) { return; }
    if (VERBOSE_LOGGING) {
      console.log("Updating", this.name, ':', this.prevValue, '->', this.value);
    }
    this.updater(this.value, this.pdat, this.prevValue);
    this.prevValue = this.value;
  }
};

function Prefs(name, tabLabel, tabHint) {
  this.name = 'userscript_prefs__' + name;
  this.map = {};
  this.order = [];
  this.styleClass = undefined;
  this.prefObj = null;
  this.tabLabel = tabLabel || '';
  this.tabHint = tabHint || '';
  this.tabs = [];
  this.css = null;
}
// jpopsuki.tv's #mainmenu currently uses z-index:99999
// maybe we should just put the link elsewhere?
Prefs.cssStr = "#ichigo_o0_prefs { position: relative; z-index: 999999;\n" +
    "  display: inline-block; vertical-align: top; text-align: left; }\n" +
    "#ichigo_o0_prefs form { padding: .5em 1em 1em 1em;\n" +
    "  background: #f2f2f2; position: absolute; white-space: nowrap;\n" +
    "  border: medium solid; color: #3f3f3f; }\n" +
    "#ichigo_o0_prefs input { width: auto; min-width: 0; margin: .2em; }\n" +
    '#ichigo_o0_prefs input[value="Save"] { margin: 0 0 1em 2em; }\n' +
    "#ichigo_o0_prefs label { display: inline-block; margin: 1px; " +
    "  border: 1px solid rgba(0, 0, 0, 0.1); padding: 1px; }\n" +
    "#ichigo_o0_prefs ul { display: block; list-style: none; " +
    "  padding: 0.2em }\n" +
    "#ichigo_o0_prefs ul li { display: list-item; }\n" +
    "#ichigo_o0_prefs ul.ichigo_o0_compact { white-space: normal; }\n" +
    "#ichigo_o0_prefs ul.ichigo_o0_compact li { display: inline; }\n" +
    "#ichigo_o0_prefs .ius_prefs_tabs { list-style: none; display: block; " +
    "  margin: 0 3px; }\n" +
    "#ichigo_o0_prefs .ius_prefs_tabs li { display: inline-block; " +
    "  border: 2px dashed rgba(0,0,0,.2); padding: .2em .3em; " +
    "  border-radius: .5em .5em 1px 1px; margin: -2px 2px; " +
    "  border-width: 2px 2px 0 2px; color: #4f4f4f; }\n" +
    "#ichigo_o0_prefs .ius_prefs_tabs li.ius_show { border-style: solid; " +
    "  border-color: rgba(0,0,0,.4); color: #3f3f3f; font-weight: bold; " +
    "  border-width: 2px; border-bottom-color: #f2f2f2; }\n" +
    "#ichigo_o0_prefs .ius_tab_body { border: 2px solid rgba(0,0,0,.4); " +
    "  border-radius: 4px 4px 5px 5px; }\n" +
    "#ichigo_o0_prefs .ius_tab_body > div { display: none; }\n" +
    "#ichigo_o0_prefs .ius_tab_body > div.ius_show { display: block; }\n" +
  "";
Prefs.prototype = {
  makeUpdater: function(p, i) {
    return function () {
      if (p.type === 'checkbox') {
        p.set(i.checked);
      } else {
        p.set(i.value);
      }
      p.update();
    };
  },
  style: function (s) { this.styleClass = s; return this; },
  show: function (before, fc) {
    var i, p, that = this;
    if (!fc) {
      fc = new FragmentConstructor('div').attr('id', 'ichigo_o0_prefs');
      fc.push('form');
      fc.push('input').attr('type', 'button').attr('value', "Cancel");
      fc.evt('click', function () { that.cancel(); fc.remove(); });
      fc.up().push('input').attr('type', 'button').attr('value', "Save");
      fc.evt('click', function () { that.store(); fc.remove(); });
      fc.up();
      if (!this.css) {
        this.css = addCSS(Prefs.cssStr);
      }
    }
    var tabBody = fc.el;
    if (this.tabs.length) {
      var switchTab = function (evt) {
        var el = evt.target, i = el.dataset.i * 1;
        if (el.dataset === '' || isNaN(i) || i < 0) { return; }
        that.activeTabLabel.classList.remove('ius_show');
        that.activeTabBody.classList.remove('ius_show');
        that.activeTabLabel = el;
        el.classList.add('ius_show');
        el = el.parentNode.parentNode.querySelector('.ius_tab_body');
        el = el.firstElementChild;
        while (--i >= 0) {
          el = el.nextElementSibling;
        }
        that.activeTabBody = el;
        el.classList.add('ius_show');
      };
      fc.push('ol', 'ius_prefs_tabs').evt('click', switchTab, false);
      fc.push('li', 'ius_show').addText(this.tabLabel).datum('i', 0);
      if (this.tabHint) { fc.attr('title', this.tabHint); }
      this.activeTabLabel = fc.el;
      for (i = 0; i < this.tabs.length; ++i) {
        p = this.map[this.tabs[i]];
        fc.up().push('li').addText(p.label).datum('i', i + 1);
        if (p.hint) { fc.attr('title', p.hint); }
      }
      tabBody = fc.up(2).push('div', 'ius_tab_body').el;
      this.activeTabBody = fc.push('div', 'ius_show').el;
    }
    fc.push('ul');
    if (this.styleClass === 'compact') {
      fc.attr('class', 'ichigo_o0_compact');
    }
    for (i = 0; i < this.order.length; ++i) {
      var name = this.order[i];
      p = this.map[name];
      fc.push('li');
      if (p.type === 'group') {
        if (p.hint) { fc.attr('title', p.hint); }
        fc.addText(p.label);
        p.value.show(null, fc);
      } else if (p.type === 'checkbox') {
        fc.push('label');
        if (p.hint) { fc.attr('title', p.hint); }
        fc.push('input', 0).attr('type', p.type).attr('name', name);
        fc.evt('click', this.makeUpdater(p, fc.el));
        if (p.value) {
          fc.attr('checked', true);
        }
        fc.up().addText(p.label).up();
      }
      fc.up();
    }
    for (i = 0; i < this.tabs.length; ++i) {
      fc.el = tabBody;
      fc.push('div');
      p = this.map[this.tabs[i]];
      p.value.show(null, fc);
    }
    fc.el = tabBody;
    if (before) {
      fc.before(before);
    }
  },

  cancel: function() {
    for (var k in this.map) {
      if (this.map.hasOwnProperty(k)) {
        var p = this.map[k];
        if (p.value && p.value.cancel) {
          p.value.cancel();
        }
        if (p.value !== p.savedValue) {
          p.value = p.savedValue;
          p.update();
        }
      }
    }
  },

  make: function (name, label, value, hint, type, f) {
    if (type === undefined) {
      if (value === undefined) {
        value = false;
      }
      if (value === true || value === false) {
        type = 'checkbox';
      }
    }
    if (this.map.hasOwnProperty(name)) {
      throw new Error("pref '" + name + "' already exists");
    }
    var p = new Pref(name, label, value, hint, type, this.prefObj, f);
    this.map[name] = p;
    if (type === 'tab') {
      this.tabs.push(name);
    } else {
      this.order.push(name);
    }
    return p;
  },

  add: function () { this.make.apply(this, arguments); return this; },

  attach: function (name, f) {
    var p = this.map[name];
    if (!p && VERBOSE_LOGGING) { console.log("pref not found: ", name); }
    p.updater = f;
  },
  
  tab: function (name, label, hint, defaultTabLabel, defaultTabHint) {
    var v = new Prefs('', defaultTabLabel, defaultTabHint);
    v.prefObj = this.make(name, label, v, hint, 'tab');
    return v;
  },

  group: function (name, label, hint) {
    var v = new Prefs();
    v.prefObj = this.make(name, label, v, hint, 'group');
    return v;
  },

  listEnabled: function () {
    var k, list = [];
    for (k in this.map) {
      if (this.map.hasOwnProperty(k) && this.map[k].value) {
        list.push(k);
      }
    }
    return list;
  },

  get: function(name) {
    var p = this.map[name];
    if (VERBOSE_LOGGING) { console.log(name, p && p.get()); }
    if (p) {
      return p.get();
    }
  },

  store: function (ret) {
    var d = {};
    for (var k in this.map) {
      if (this.map.hasOwnProperty(k)) {
        var p = this.map[k];
        if (p.value && p.value.store) {
          d[k] = p.value.store(true);
        } else {
          d[k] = p.get();
          p.savedValue = p.value;
        }
      }
    }
    if (!ret) {
      localStorage.setItem(this.name, JSON.stringify(d));
    } else {
      return d;
    }
  },

  load: function (d) {
    if (d === undefined) {
      d = localStorage.getItem(this.name);
      d = (d ? JSON.parse(d) : {});
    }
    for (var k in d) {
      if (d.hasOwnProperty(k) && this.map.hasOwnProperty(k)) {
        var p = this.map[k];
        p.set(d[k]);
        p.savedValue = p.value;
      }
    }
    this.update();
  },

  update: function() {
    var k, p;
    for (k in this.map) {
      if (this.map.hasOwnProperty(k)) {
        p = this.map[k];
        if (p) { p.update(); }
      }
    }
  }
};

var prefs;
//=- for jpopsuki.eu
if (/jpopsuki\.eu/.test(window.location.host)) {
  
  //=- prefs for jpopsuki.eu
  prefs = new Prefs('jpopsuki_ichigo_o0', "Basics");
  prefs.add('usePlaceholder',
      "Update search bars to use HTML5 placeholder attribute", true,
      "Prevent drag & dropped text from mixes with the label");
  prefs.add('addURLbar', "Add URL bar to AJAX torrent searches", true,
      "To ease copying search parameters e.g. into forum posts.");
  prefs.group('expand', "On artist page auto-expand (does nothing if " +
      "default is not set to closed)",
      "Specifically, for this to have an effect, you must set 'Discography " +
      "View' to 'Closed by default' on your profile settings page."
      ).style('compact').add(
      'album', "Albums").add('single', "Singles").add('pv', "PVs").add(
      'dvd', "DVDs").add('tv-music', "TV-Music").add(
      'tv-variety', "TV-Variety").add('fansubs', "Fansubs").add(
      'pictures', "Pictures").add('misc', "Misc").add(
      'contribs', "Contributions");
  prefs.add('avatarWidth',
      "Resize avatars to max width/height of 150px", true,
      "Also makes large avatars clickable to view in more detail.");
  prefs.add('fixTorrentPageReleaseLinks', "On torrent description page, " +
      "use full url in expand details link", true,
      "This makes the url for a specific format easier to copy.");
  prefs.add('markAfterBookmark',
      "Update bookmark link after clicking", true,
      "To remind you that you've already clicked it. The mark is not " +
      "currently retained after you leave the page.");
  prefs.add('addArtistBookmark',
      "Add button for bookmarking artists", true,
      "Bookmarked artists will be listed in the 'Other' category.");
  prefs.add('altRecPage',
      "Alternate recommendation page (may be buggy) without thumbnails", true,
      "For faster loading. Note that it doesn't work unless you either " +
      "click a link to the recommendations page from another jpopsuki.eu " +
      "page (don't use e.g. a bookmark to the normal recomendations page) " +
      "or access it's own url (which you can bookmark).");
  prefs.add('recFilter',
      "Add recommendation filtering", true,
      "E.g. click a username to show only that user's recommendations.");

  //=- add prefs link
  (function () {
    var el, fc = new FragmentConstructor('span');
    el = document.querySelector(
        '#userinfo_username a[href^="user.php?action=edit&userid="]');
    fc.css('position', 'relative').addText(el.textContent);
    fc.push('div', 'ichigo_o0_popup');
    fc.push('div');
    el.textContent = "Settings for JPopsuki";
    var parentNode = el.parentNode;
    fc.push(el).up();
    fc.push('div').push('a').css('cursor', 'pointer');
    fc.addText("Settings for ichigo_o0's Userscript");
    var top = fc.top;
    fc.evt('click', function () { prefs.show(top); });
    addCSS(
        "div.ichigo_o0_popup {\n" +
        "  background: #fafafa; border: none;\n" +
        "  left: 0; padding: 0 0.5em; position: absolute; text-align: left;\n" +
        "  top: -0.5em; white-space: nowrap; z-index: 10;\n" +
        "}\ndiv.ichigo_o0_popup > div { display: none; }" +
        "span:hover > .ichigo_o0_popup { border: dotted 2px; }\n" +
        "span:hover > .ichigo_o0_popup > div { display: block;\n" +
        "  text-align: left; white-space: nowrap;\n}"
    );
    fc.first(parentNode);
  })();


  //=- use placeholder in search fields
  prefs.attach('usePlaceholder', function (v, d) {
    var i, el;
    var els = document.querySelectorAll("#searchbars input[type='text']");
    if (!v) {
      if (!d.old) { return; }
      for (i = 0; i < d.old.length; ++i) {
        el = d.old[i].el;
        el.placeholder = '';
        el.onfocus = d.old[i].onfocus;
        el.onblur = d.old[i].onblur;
        if (!el.value) { el.value = el.defaultValue; }
      }
      delete d.old;
    } else if (els && 'placeholder' in els[0]) {
      d.old = [];
      var old;
      for (i = 0; i < els.length; ++i) {
        el = els[i];
        if (!el.placeholder && el.defaultValue) {
          el.placeholder = el.defaultValue;
          if (el.value === el.defaultValue) {
            el.value = '';
          }
          old = { el: el, onblur: el.onblue, onfocus: el.onfocus };
          d.old.push(old);
          el.onfocus = el.onblur = null;
        }
      }
    }
  });


  //=- Display url near AJAX search div
  prefs.attach('addURLbar', function (v, d) {
    if (v) {
      var el = document.getElementById('ajax_torrents');
      if (el && window.loadHtml) {
        var fc = new FragmentConstructor('form');
        fc.css('display', 'none').css('width', '95%').css('margin', 'auto');
        fc.push('input').attr('type', 'text').css('width', '100%').css(
            'color', '#666');
        var loadHtml_orig = d.loadHtml = window.loadHtml, input = fc.el;
        d.top = fc.top;
        window.loadHtml = function(section, querystr) {
            if (section === 'torrents' && querystr) {
              var i, args = querystr.split('&'), args2 = [];
              for (i = 0; i < args.length; ++i) {
                if (!/\=$/.test(args[i])) {
                  args2.push(args[i]);
                }
              }
              input.value = [location.origin, '/', section, ".php?",
                  args2.join('&')].join('');
              input.parentNode.style.display = 'block';
            }
            return loadHtml_orig.apply(this, arguments);
          };
        fc.before(el);
      }
    } else {
      if (d.loadHtml) {
        window.loadHtml = d.loadHtml;
        delete d.loadHtml;
      }
      removeEl(d.top);
      delete d.top;
    }
  });
  
  //=- Improve scaling of avatars
  var callPreview = function callPreview(evt) { window.Preview(evt.target); };
  prefs.attach('avatarWidth', function (v, d) {
    var i, img, imgs = document.querySelectorAll('.avatar > img');
    if (v) {
      if (!d.css) {
        d.css = addCSS(".avatar > img { width: auto; max-width: 150px; " +
            "max-height: 150px; }\n" +
            ".avatar { width: 150px; text-align: center; }\n" +
            ".avatar > img.largeAvatar { cursor: pointer; cursor: " +
            "-moz-zoom-in; cursor: -webkit-zoom-in; cursor: zoom-in; }");
      }
      d.tagged = [];
      if (window.Preview) {
        var load = function(evt, img) {
          if (evt && !prefs.get('avatarWidth')) { return; }
          img = img || evt.target;
          if (img.naturalHeight > 150 || img.naturalWidth > 150) {
            img.addEventListener('click', callPreview, false);
            if (!img.classList.contains('largeAvatar')) {
              img.classList.add('largeAvatar');
              img.title = img.naturalWidth + 'px, ' + img.naturalHeight + 'px';
              d.tagged.push(img);
            }
          }
        };
        for (i = 0; i < imgs.length; ++i) {
          img = imgs[i];
          if (!img.naturalHeight && !img.naturalWidth) {
            img.addEventListener('load', load, false);
          } else {
            load(null, img);
          }
        }
      }
    } else {
      removeEl(d.css);
      delete d.css;
      for (i = 0; i < imgs.length; ++i) {
        img = imgs[i];
        if (img.naturalHeight > 150 || img.naturalWidth > 150) {
          img.removeEventListener('click', callPreview, false);
        }
      }
      for (i = 0; d.tagged && i < d.tagged.length; ++i) {
        d.tagged[i].classList.remove('largeAvatar');
        delete d.tagged[i].title;
      }
      delete d.tagged;
    }
  });


  //=- expand album & singles on artist page
  prefs.attach('expand', function (v, d) {
    // XXX doesn't update properly
    if (/\/artist.php\?/.test(window.location) && window.toggleGroupDisp) {
      var list = v.listEnabled();
      var el, item, i, m, swaplink, show = 'Show', hide = 'Hide';

      for (i = 0; i < list.length; ++i) {
        item = list[i];
        swaplink = 'swaplink_' + item;
        el = document.getElementById(swaplink);
        if (!el) { continue; }
        if (!m) {
          m = new RegExp(".*toggleGroupDisp[(]'discog_.*',\\s*'swaplink_.*'," +
              "\\s*'(.*)',\\s*'(.*)'[)]").exec(el.onclick);
          if (m) {
            show = m[1] || show;
            hide = m[2] || hide;
          }
        }
        if (el && el.textContent === show) {
          window.toggleGroupDisp('discog_' + item, swaplink, show, hide);
        }
      }
    }
  });

  //=- add bookmark link to artist page
  prefs.attach('addArtistBookmark', function (v, d) {
    if (!/\/artist.php\?/.test(window.location)) { return; }
    var i, el, list;
    if (v) {
      list = document.querySelectorAll(".sidebar > .box > ul.stats > li > a");
      // search won't find anything if language isn't English, but Report
      // happens to be the last element anyway.
      for (i = 0; i < list.length; ++i) {
        el = list[i];
        if (el.textContent === 'Report') {
          break;
        }
      }
      if (el) {
        var ul = el.parentNode.parentNode;
        var li = d.top = document.createElement('li');
        var a = document.createElement('a');
        //if (window.Bookmark) {
        //  a.onclick = window.Bookmark;
        //} else {
        a.setAttribute('href', "javascript:Bookmark();"); // jshint ignore:line
        //}
        a.textContent = "Bookmark";
        li.appendChild(a);
        ul.insertBefore(li, el.parentNode);
      }
    } else {
      removeEl(d.top);
      delete d.top;
    }
  });


  //=- set href for release links on torrent page
  prefs.attach('fixTorrentPageReleaseLinks', function (v, d) {
    if (!/\/torrents.php\?id=/.test(window.location)) { return; }
    var i;
    if (v) {
      var id = /[?&]id=(\d+)/.exec(window.location)[1];
      var base = '/torrents.php?id=' + id + '&torrentid=';
      d.old = [];
      var ta, tas = document.querySelectorAll('.group_torrent td > a');
      for (i = 0; i < tas.length; ++i) {
        try {
          ta = tas[i];
          var ida = ta.parentNode.querySelector('span a');
          var tid = /[?&]id=(\d+)/.exec(ida.href)[1];
          d.old.push(ta);
          d.old.push(ta.getAttribute('href'));
          ta.setAttribute('href', base + tid);
        } catch (err) {
          console.log('fixTorrentPageReleaseLinks error:', err);
        }
      }
    } else if (d.old) {
      for (i = 0; i < d.old.length; i += 2) {
        d.old[i].setAttribute('href', d.old[i + 1]);
      }
      delete d.old;
    }
  });

  //=- update bookmark link text after clicking
  prefs.attach('markAfterBookmark', function (v, d) {
    if (v) {
      var saveBookmark = d.saveBookmark = window.Save_Bookmark;
      window.Save_Bookmark = function () {
        var i, els = document.querySelectorAll(
            'a[href="javascript:Bookmark();"]');
        for (i = 0; i < els.length; ++i) {
          els[i].textContent += ' [\u2713]'; // U+2713 is a check mark
        }
        saveBookmark();
      };
    } else if (d.saveBookmark) {
      window.Save_Bookmark = d.saveBookmark;
      delete d.saveBookmark;
    }
  });

  //=- alternate recommendations page
  var altRecPage = {
    open: function (evt) {
      var cache = localStorage.hack_recommended_cache;
      if (cache) { if (evt) { evt.preventDefault(); }
          altRecPage.load(null, cache); return; }
      var req = new XMLHttpRequest();
      req.onload = altRecPage.load;
      req.addEventListener('progress', altRecPage.progress, false);
      req.open('get', location.origin + "/index.php?action=recommended", true);
      req.responseType = "document"; // must be set AFTER req.open()
      var old = altRecPage.oldContent = document.getElementById('content');
      var next = old.nextSibling;
      removeEl(old);
      var el = document.createElement('div');
      el.id = 'content';
      el.innerHTML = 'Loading Recommendations... <span />';
          //'<img src="static/shadowbox-3.0.3/loading.gif" />';
      altRecPage.span = el.querySelector('span');
      next.parentNode.insertBefore(el, next);
      req.send();
      if (!history.state || history.state.mode !== 'recommended') {
        var state = {mode:'recommended'};
        history.pushState(state, 'Recommendations', '/index.php#recommended');
      }
      if (evt) { evt.preventDefault(); }
    },

    progress: function (evt) {
      // XXX It would feel more responsive to start displaying the content
      // as we receive it, rather than just a progress number.
      if (evt.lengthComputable) {
        altRecPage.span.textContent = Math.round(evt.loaded / evt.total *
            100) + '%';
      } else {
        var size = evt.loaded * 1, i = -1, sufs = ['B', 'KB', 'MB', 'GB'];
        while (++i < sufs.length && size > 1024) { size /= 1024; }
        size = Math.round(size * 100) / 100;
        altRecPage.span.textContent = [size, sufs[i]].join(' ');
      }
    },

    load: function (evt, cache) {
      var doc = this.responseXML;
      var el = doc.getElementById('collage_table');
      el.innerHTML = '';
      el = doc.getElementById('content');
      function swap(id) {
        var el = doc.getElementById(id);
        if (!el) { return false; }
        var old = document.getElementById(id);
        old.parentNode.replaceChild(el, old);
        return true;
      }
      swap('content'); swap('footer'); swap('userinfo_stats');
      document.title = doc.title;
      location.hash = "recommended";
      if (prefs.get('recFilter')) {
        altRecPage.prepFilter();
      }
    },

    remove: function () {
      var i, rows = document.querySelectorAll( '.torrent_table tr');
      for (i = 0; i < rows.length; ++i) {
        rows[i].style.display = '';
        delete rows[i].dataset.user;
        delete rows[i].dataset.artist;
        delete rows[i].dataset.tag;
        delete rows[i].dataset.category;
      }
      removeEl(altRecPage.filtBox);
      removeEl(altRecPage.css);
      var list = altRecPage.listeners || [];
      while (list.length) {
        list.pop().removeEventListener('click', altRecPage.clickFilter, false);
      }
    },

    reset: function () {
      altRecPage.activeFilter = pass;
      altRecPage.applyFilter();
    },

    prepFilter: function () {
      var el, i, row, rows = document.querySelectorAll(
          '.torrent_table .group, .torrent_table .torrent');
      altRecPage.css = addCSS(
        ".ichigo_recFilter form > div { display: table-cell; }\n" +
        ".ichigo_recFilter .irf_wide { width: 100%; " +
        "  padding-right: 1em; }\n" +
        ".ichigo_recFilter .irf_wide > input { width: 100%; }\n" +
        ".ichigo_recFilter > .irf_filters { " +
        "  border: 1px dotted rgba(0, 0, 0, 0.3); }\n" +
        ".ichigo_recFilter .irf_settings div { margin: .3em .6em; }\n" +
        ".ichigo_recFilter .irf_settings label { margin: .1em .3em; }\n" +
      "");
      var fc = new FragmentConstructor('div', 'ichigo_recFilter');
      var box = altRecPage.filtBox = { top: fc.el };
      fc.push('form').evt('submit', function () {
        var val = altRecPage.filtBox.input.value;
        altRecPage.activeFilter = mk.parse(val,
            ['tag', 'artist', 'user', 'category']);
        altRecPage.applyFilter();
        altRecPage.filtBox.input.value = val;
      }, false);
      // input apparently can't use display:table-cell, so wrap them in divs
      box.input = fc.push('div', 'irf_wide').push('input').el;
      fc.up(2).push('div').push('input').attr('type', 'submit');
      fc.el.value = "Apply";
      fc.up(2).push('div').push('input').attr('type', 'reset'
          ).evt('click', altRecPage.reset, false);
      fc.el.value = "Reset";
      fc.el = fc.top;
      fc.push('div', 'irf_settings');
      fc.push('div').addText("Filter on click: ");
      fc.push('label').push('input').attr('type', 'checkbox');
      box.click = {};
      box.click.artist = fc.el;
      fc.attr('checked', 1).up().addText('Artists');
      fc.up().push('label').push('input').attr('type', 'checkbox');
      box.click.category = fc.el;
      fc.attr('checked', 1).up().addText('Categories');
      fc.up().push('label').push('input').attr('type', 'checkbox');
      box.click.user = fc.el;
      fc.attr('checked', 1).up().addText('Users');
      fc.up().push('label').push('input').attr('type', 'checkbox');
      box.click.tag = fc.el;
      fc.attr('checked', 1).up().addText('Tags');
      fc.up().addText(" Combining mode: ");
      fc.push('label').push('input').attr('type', 'checkbox');
      box.exclude = fc.el;
      fc.up().addText('Exclude');
      fc.up().push('label').push('input').attr('type', 'checkbox');
      box.any = fc.el;
      fc.up().addText('Any');
      fc.el = fc.top;
      box.filter = fc.push('span', 'irf_filters').el;
      fc.evt('click', altRecPage.clickFilter, false);
      box.count = fc.up().push('span').addText(" [count: ").push('span').el;
      fc.up().addText("] ");
      fc.before(document.querySelector('.torrent_table'));
      for (i = 0; i < rows.length; ++i) {
        row = rows[i];
        el = row.querySelector('td:nth-of-type(2) a');
        row.dataset.category = '|' + el.textContent + '|';
        el = row.querySelector('td:nth-of-type(3) > .tags b');
        row.dataset.user = '|' + el.textContent + '|';
        el = row.querySelector('td:nth-of-type(3) > .tags:nth-of-type(1)');
        row.dataset.tag = '|' + el.textContent.replace(/, /g, '|') + '|';
        el = row.querySelector('td:nth-of-type(3) > strong a:nth-of-type(1)');
        row.dataset.artist = '|' + el.textContent + '|';
      }
      el = document.querySelector('.sidebar');
      if (!altRecPage.listeners) { altRecPage.listeners = []; }
      el.addEventListener('click', altRecPage.clickFilter, false);
      altRecPage.listeners.push(el);
      el = document.querySelector('.torrent_table');
      el.addEventListener('click', altRecPage.clickFilter, false);
      altRecPage.listeners.push(el);
      altRecPage.reset();
    },

    applyFilter: function () {
      var i, row, rows = document.querySelectorAll('.torrent_table tr');
      var last = true, hits = 0;
      var filt = altRecPage.activeFilter;
      for (i = 0; i < rows.length; ++i) {
        row = rows[i];
        if (!row.dataset.user) {
          row.style.display = (last ? '' : 'none');
          continue;
        }
        last = filt(row);
        row.style.display = (last ? (++hits && '') : 'none');
      }
      var fbox = altRecPage.filtBox;
      var nfilter = mk.toSpan(filt);
      fbox.input.value = mk.toStr(filt);
      if (fbox.filter.firstChild) {
        fbox.filter.replaceChild(nfilter, fbox.filter.firstChild);
      } else {
        fbox.filter.appendChild(nfilter);
      }
      altRecPage.filtBox.count.textContent = hits;
    },

    clickFilter: function (evt) {
      var el = evt.target;
      var mode, target;
      if (el.className === 'sin') {
        var m = /(.*?)=(.*)/.exec(el.textContent);
        mode = m[1];
        target = m[2];
      } else if (el.tagName.toLowerCase() === 'b' &&
          el.parentNode.classList.contains('tags')) {
        mode = 'user';
        target = el.textContent;
      } else if (el.tagName.toLowerCase() === 'a') {
        if (/taglist/.test(el.href)) {
          mode = 'tag';
        } else if (/filter_cat/.test(el.href)) {
          mode = 'category';
        } else if (/artist.php/.test(el.href)) {
          mode = 'artist';
        } else if (/user.php/.test(el.href)) {
          mode = 'user';
        }
        target = el.textContent;
      }
      if (!mode || !target) { return; }
      if (!altRecPage.filtBox.click[mode].checked) { return; }
      evt.preventDefault();
      var ntarget = target;
      target = '|' + target + '|';
      var r = mk.trim(altRecPage.activeFilter, sin, mode, target);
      if (r === altRecPage.activeFilter) {
        var node = mk(sin, mode, target, ntarget);
        if (altRecPage.filtBox.exclude.checked) {
          node = mk(not, node);
        }
        if (r === pass) {
          altRecPage.activeFilter = node;
        } else {
          altRecPage.activeFilter = mk(
              (altRecPage.filtBox.any.checked ? or : and), r, node);
        }
      } else {
        altRecPage.activeFilter = r;
      }
      while (el && (!el.tagName || el.tagName.toLowerCase() !== 'tr')) {
        el = el.parentNode;
      }
      var vy = (el ? viewportY(el) : null);
      altRecPage.applyFilter();
      if (el) {
        // XXX and what if el was hidden?
        var sy = window.pageYOffset + viewportY(el) - vy;
        if (!isNaN(sy)) {
          window.scrollTo(window.pageXOffset, (sy > 0 ? sy : 0));
        }
      }
    }
  };

  prefs.attach('altRecPage', function (v) {
    // XXX Disabling while viewing doesn't restore the original page.
    var i, el, els = document.querySelectorAll(
        'a[href$="index.php?action=recommended"]');
    if (v) {
      if (history.state && history.state.mode === 'recommended' ||
          /index.php#recommended$/.test(location)) {
        altRecPage.open();
      } else {
        for (i = 0; i < els.length; ++i) {
          el = els[i];
          el.addEventListener('click', altRecPage.open, false);
        }
      }
    } else {
      for (i = 0; i < els.length; ++i) {
        el = els[i];
        el.removeEventListener('click', altRecPage.open, false);
      }
    }
  });

  prefs.attach('recFilter', function (v) {
    // XXX should allow disabling on altRecPage too.
    if (!/index.php\?action=recommended/.test(location)) { return; }
    if (v) { altRecPage.prepFilter();
    } else { altRecPage.remove(); }
  });


} // end jpopsuki.eu section


if (/jpopsuki\.tv/.test(window.location.host)) {
  //
  // XXX none of the jpopsuki.tv stuff is very well tested.
  //

  //=- prefs for jpopsuki.tv
  prefs = new Prefs('jpopsukiTV_ichigo_o0');
  prefs.add('addVideoLink',
      "Add direct link to video data on jpopsuki.tv", true);

  //=- add prefs link
  (function () {
    var div = document.createElement('div');
    div.style.position = "relative";
    var el = document.createElement('a');
    el.href = "#pref_box";
    el.style.cursor = "pointer";
    el.textContent = "Settings for ichigo_o0's userscript";
    el.addEventListener('click', function () { prefs.show(el); }, false);
    div.appendChild(el);
    var next = document.getElementById('topmenu');
    next.parentNode.insertBefore(div, next);
  })();

  //=- Add direct video link
  prefs.attach('addVideoLink', function (v, d) {
    if (!/\/video\//.test(window.location)) { return; }
    if (v) {
      var src = document.querySelector('video source');
      if (!src) {
        if (d.src) {
          src = d.src;
        } else {
          console.log("video source not found");
          // XXX it appears to be stripped away by the page's javascript.
          // Not sure if it is stored somewhere accessible or not.
          return;
        }
      }
      d.src = src;
      var next = document.querySelector('#mediaInfo'); // #description
      var link = d.top = document.createElement('a');
      link.textContent = 'Direct Link (' + src.type + ')';
      link.setAttribute('href', src.src);
      var title = document.querySelector('meta[name="og:title"]');
      if (title) {
        link.setAttribute('download', title.content +
            (/.*[^.](\..+)/.exec(src.src) || ['',''])[1]);
      }
      next.parentNode.insertBefore(link, next);
    } else {
      removeEl(d.top);
      delete d.top;
    }
  });

} // end of jpopsuki.tv section


prefs.load();
} // main

// inject the main script
// XXX is this even necessary since we are using grant:none?
(function () {
"use strict";

function scriptTester () {
  var self = document.querySelector('script.scriptTester');
  self.parentNode.removeChild(self);
}

function inject(func, cls) {
  var script = document.createElement('script');
  if (cls === true) {
    script.className = func.name;
  } else if (cls) {
    script.className = cls;
  }
  script.appendChild(document.createTextNode('('+ func +')();'));
  (document.body || document.head ||
      document.documentElement).appendChild(script);
}

inject(scriptTester, true);
if (document.querySelector('script.scriptTester')) {
  main(true);
} else {
  inject(main);
}

})();
