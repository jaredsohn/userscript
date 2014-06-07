// ==UserScript==
// @name          Quickr Flickr
// @namespace     http://photography.dustindiaz.com/download/
// @description   This allows you to do browse flickr with keyboard shortcuts. It 'sticks' the comment form, and allows the ability to 'reply' to specific comments
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// ==/UserScript==


// selector utility... thanks jack ;)
var Ext = {};
Ext.DomQuery = function(){
  var cache = {}, simpleCache = {}, valueCache = {};
  var nonSpace = /\S/;
  var trimRe = /^\s+|\s+$/g;
  var tplRe = /\{(\d+)\}/g;
  var modeRe = /^(\s?[\/>+~]\s?|\s|$)/;
  var tagTokenRe = /^(#)?([\w-\*]+)/;
  var nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/;

  function child(p, index){
    var i = 0;
    var n = p.firstChild;
    while(n){
      if(n.nodeType == 1){
        if(++i == index){
          return n;
        }
      }
      n = n.nextSibling;
    }
    return null;
  };

  function next(n){
    while((n = n.nextSibling) && n.nodeType != 1);
    return n;
  }

  function prev(n){
    while((n = n.previousSibling) && n.nodeType != 1);
    return n;
  }

  function children(d){
    var n = d.firstChild, ni = -1;
    while(n){
      var nx = n.nextSibling;
      if(n.nodeType == 3 && !nonSpace.test(n.nodeValue)){
        d.removeChild(n);
      }else{
        n.nodeIndex = ++ni;
      }
      n = nx;
    }
    return this;
  }

  function byClassName(c, a, v) {
    if(!v){
      return c;
    }
    var r = [], ri = -1, cn;
    for(var i = 0, ci; ci = c[i]; i++){
      if((' '+ci.className+' ').indexOf(v) != -1){
        r[++ri] = ci;
      }
    }
    return r;
  }

  function attrValue(n, attr){
    if(!n.tagName && typeof n.length != "undefined"){
      n = n[0];
    }
    if(!n){
      return null;
    }
    if(attr == "for"){
      return n.htmlFor;
    }
    if(attr == "class" || attr == "className"){
      return n.className;
    }
    return n.getAttribute(attr) || n[attr];

  }

  function getNodes(ns, mode, tagName){
    var result = [], ri = -1, cs;
    if(!ns){
      return result;
    }
    tagName = tagName || "*";
    if(typeof ns.getElementsByTagName != "undefined"){
      ns = [ns];
    }
    if(!mode){
      for(var i = 0, ni; ni = ns[i]; i++){
        cs = ni.getElementsByTagName(tagName);
        for(var j = 0, ci; ci = cs[j]; j++){
          result[++ri] = ci;
        }
      }
    }else if(mode == "/" || mode == ">"){
      var utag = tagName.toUpperCase();
      for(var i = 0, ni, cn; ni = ns[i]; i++){
        cn = ni.children || ni.childNodes;
        for(var j = 0, cj; cj = cn[j]; j++){
          if(cj.nodeName == utag || cj.nodeName == tagName  || tagName == '*'){
            result[++ri] = cj;
          }
        }
      }
    }else if(mode == "+"){
      var utag = tagName.toUpperCase();
      for(var i = 0, n; n = ns[i]; i++){
        while((n = n.nextSibling) && n.nodeType != 1);
        if(n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')){
          result[++ri] = n;
        }
      }
    }else if(mode == "~"){
      for(var i = 0, n; n = ns[i]; i++){
        while((n = n.nextSibling) && (n.nodeType != 1 || (tagName == '*' || n.tagName.toLowerCase()!=tagName)));
        if(n){
          result[++ri] = n;
        }
      }
    }
    return result;
  };

  function concat(a, b){
    if(b.slice){
      return a.concat(b);
    }
    for(var i = 0, l = b.length; i < l; i++){
      a[a.length] = b[i];
    }
    return a;
  }

  function byTag(cs, tagName){
    if(cs.tagName || cs == document){
      cs = [cs];
    }
    if(!tagName){
      return cs;
    }
    var r = [], ri = -1;
    tagName = tagName.toLowerCase();
    for(var i = 0, ci; ci = cs[i]; i++){
      if(ci.nodeType == 1 && ci.tagName.toLowerCase()==tagName){
        r[++ri] = ci;
      }
    }
    return r;
  };

  function byId(cs, attr, id){
    if(cs.tagName || cs == document){
      cs = [cs];
    }
    if(!id){
      return cs;
    }
    var r = [], ri = -1;
    for(var i = 0,ci; ci = cs[i]; i++){
      if(ci && ci.id == id){
        r[++ri] = ci;
        return r;
      }
    }
    return r;
  };

  function byAttribute(cs, attr, value, op, custom){
    var r = [], ri = -1, st = custom=="{";
    var f = Ext.DomQuery.operators[op];
    for(var i = 0, ci; ci = cs[i]; i++){
      var a;
      if(st){
        a = Ext.DomQuery.getStyle(ci, attr);
      }
      else if(attr == "class" || attr == "className"){
        a = ci.className;
      }else if(attr == "for"){
        a = ci.htmlFor;
      }else if(attr == "href"){
        a = ci.getAttribute("href", 2);
      }else{
        a = ci.getAttribute(attr);
      }
      if((f && f(a, value)) || (!f && a)){
        r[++ri] = ci;
      }
    }
    return r;
  };

  function byPseudo(cs, name, value){
    return Ext.DomQuery.pseudos[name](cs, value);
  };

  // This is for IE MSXML which does not support expandos.
  // IE runs the same speed using setAttribute, however FF slows way down
  // and Safari completely fails so they need to continue to use expandos.
  var isIE = window.ActiveXObject ? true : false;

  // this eval is stop the compressor from
  // renaming the variable to something shorter
  eval("var batch = 30803;");

  var key = 30803;

  function nodupIEXml(cs){
    var d = ++key;
    cs[0].setAttribute("_nodup", d);
    var r = [cs[0]];
    for(var i = 1, len = cs.length; i < len; i++){
      var c = cs[i];
      if(!c.getAttribute("_nodup") != d){
        c.setAttribute("_nodup", d);
        r[r.length] = c;
      }
    }
    for(var i = 0, len = cs.length; i < len; i++){
      cs[i].removeAttribute("_nodup");
    }
    return r;
  }

  function nodup(cs){
    if(!cs){
      return [];
    }
    var len = cs.length, c, i, r = cs, cj, ri = -1;
    if(!len || typeof cs.nodeType != "undefined" || len == 1){
      return cs;
    }
    if(isIE && typeof cs[0].selectSingleNode != "undefined"){
      return nodupIEXml(cs);
    }
    var d = ++key;
    cs[0]._nodup = d;
    for(i = 1; c = cs[i]; i++){
      if(c._nodup != d){
        c._nodup = d;
      }else{
        r = [];
        for(var j = 0; j < i; j++){
          r[++ri] = cs[j];
        }
        for(j = i+1; cj = cs[j]; j++){
          if(cj._nodup != d){
            cj._nodup = d;
            r[++ri] = cj;
          }
        }
        return r;
      }
    }
    return r;
  }

  function quickDiffIEXml(c1, c2){
    var d = ++key;
    for(var i = 0, len = c1.length; i < len; i++){
      c1[i].setAttribute("_qdiff", d);
    }
    var r = [];
    for(var i = 0, len = c2.length; i < len; i++){
      if(c2[i].getAttribute("_qdiff") != d){
        r[r.length] = c2[i];
      }
    }
    for(var i = 0, len = c1.length; i < len; i++){
      c1[i].removeAttribute("_qdiff");
    }
    return r;
  }

  function quickDiff(c1, c2){
    var len1 = c1.length;
    if(!len1){
      return c2;
    }
    if(isIE && c1[0].selectSingleNode){
      return quickDiffIEXml(c1, c2);
    }
    var d = ++key;
    for(var i = 0; i < len1; i++){
      c1[i]._qdiff = d;
    }
    var r = [];
    for(var i = 0, len = c2.length; i < len; i++){
      if(c2[i]._qdiff != d){
        r[r.length] = c2[i];
      }
    }
    return r;
  }

  function quickId(ns, mode, root, id){
    if(ns == root){
      var d = root.ownerDocument || root;
      return d.getElementById(id);
    }
    ns = getNodes(ns, mode, "*");
    return byId(ns, null, id);
  }

  return {
    getStyle : function(el, name){
      return Ext.fly(el).getStyle(name);
    },
    /**
    * Compiles a selector/xpath query into a reusable function. The returned function
    * takes one parameter "root" (optional), which is the context node from where the query should start.
    * @param {String} selector The selector/xpath query
    * @param {String} type (optional) Either "select" (the default) or "simple" for a simple selector match
    * @return {Function}
    */
    compile : function(path, type){
      type = type || "select";

      var fn = ["var f = function(root){ \n var mode; ++batch; var n = root || document; \n"];
      var q = path, mode, lq;
      var tk = Ext.DomQuery.matchers;
      var tklen = tk.length;
      var mm;

      // accept leading mode switch
      var lmode = q.match(modeRe);
      if(lmode && lmode[1]){
        fn[fn.length] = 'mode="'+lmode[1].replace(trimRe, "")+'";';
        q = q.replace(lmode[1], "");
      }
      // strip leading slashes
      while(path.substr(0, 1)=="/"){
        path = path.substr(1);
      }

      while(q && lq != q){
        lq = q;
        var tm = q.match(tagTokenRe);
        if(type == "select"){
          if(tm){
            if(tm[1] == "#"){
              fn[fn.length] = 'n = quickId(n, mode, root, "'+tm[2]+'");';
            }else{
              fn[fn.length] = 'n = getNodes(n, mode, "' + tm[2] + '");';
            }
            q = q.replace(tm[0], "");
          }else if(q.substr(0, 1) != '@'){
            fn[fn.length] = 'n = getNodes(n, mode, "*");';
          }
        }else{
          if(tm){
            if(tm[1] == "#"){
              fn[fn.length] = 'n = byId(n, null, "'+tm[2]+'");';
            }else{
              fn[fn.length] = 'n = byTag(n, "'+tm[2]+'");';
            }
            q = q.replace(tm[0], "");
          }
        }
        while(!(mm = q.match(modeRe))){
          var matched = false;
          for(var j = 0; j < tklen; j++){
            var t = tk[j];
            var m = q.match(t.re);
            if(m){
              fn[fn.length] = t.select.replace(tplRe, function(x, i){
                return m[i];
              });
              q = q.replace(m[0], "");
              matched = true;
              break;
            }
          }
          // prevent infinite loop on bad selector
          if(!matched){
            throw 'Error parsing selector, parsing failed at "' + q + '"';
          }
        }
        if(mm[1]){
          fn[fn.length] = 'mode="'+mm[1].replace(trimRe, "")+'";';
          q = q.replace(mm[1], "");
        }
      }
      fn[fn.length] = "return nodup(n);\n}";
      eval(fn.join(""));
      return f;
    },

    /**
    * Selects a group of elements.
    * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
    * @param {Node} root (optional) The start of the query (defaults to document).
    * @return {Array}
    */
    select : function(path, root, type) {
      if(!root || root == document){
        root = document;
      }
      if(typeof root == "string"){
        root = document.getElementById(root);
      }
      var paths = path.split(",");
      var results = [];
      for(var i = 0, len = paths.length; i < len; i++){
        var p = paths[i].replace(trimRe, "");
        if(!cache[p]){
          cache[p] = Ext.DomQuery.compile(p);
          if(!cache[p]){
            throw p + " is not a valid selector";
          }
        }
        var result = cache[p](root);
        if(result && result != document){
          results = results.concat(result);
        }
      }
      if(paths.length > 1){
        return nodup(results);
      }
      return results;
    },

    /**
    * Selects a single element.
    * @param {String} selector The selector/xpath query
    * @param {Node} root (optional) The start of the query (defaults to document).
    * @return {Element}
    */
    selectNode : function(path, root){
      return Ext.DomQuery.select(path, root)[0];
    },

    /**
    * Selects the value of a node, optionally replacing null with the defaultValue.
    * @param {String} selector The selector/xpath query
    * @param {Node} root (optional) The start of the query (defaults to document).
    * @param {String} defaultValue
    */
    selectValue : function(path, root, defaultValue){
      path = path.replace(trimRe, "");
      if(!valueCache[path]){
        valueCache[path] = Ext.DomQuery.compile(path, "select");
      }
      var n = valueCache[path](root);
      n = n[0] ? n[0] : n;
      var v = (n && n.firstChild ? n.firstChild.nodeValue : null);
      return ((v === null||v === undefined||v==='') ? defaultValue : v);
    },

    /**
    * Selects the value of a node, parsing integers and floats.
    * @param {String} selector The selector/xpath query
    * @param {Node} root (optional) The start of the query (defaults to document).
    * @param {Number} defaultValue
    * @return {Number}
    */
    selectNumber : function(path, root, defaultValue){
      var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
      return parseFloat(v);
    },

    /**
    * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
    * @param {String/HTMLElement/Array} el An element id, element or array of elements
    * @param {String} selector The simple selector to test
    * @return {Boolean}
    */
    is : function(el, ss){
      if(typeof el == "string"){
        el = document.getElementById(el);
      }
      var isArray = (el instanceof Array);
      var result = Ext.DomQuery.filter(isArray ? el : [el], ss);
      return isArray ? (result.length == el.length) : (result.length > 0);
    },

    /**
    * Filters an array of elements to only include matches of a simple selector (e.g. div.some-class or span:first-child)
    * @param {Array} el An array of elements to filter
    * @param {String} selector The simple selector to test
    * @param {Boolean} nonMatches If true, it returns the elements that DON'T match
    * the selector instead of the ones that match
    * @return {Array}
    */
    filter : function(els, ss, nonMatches){
      ss = ss.replace(trimRe, "");
      if(!simpleCache[ss]){
        simpleCache[ss] = Ext.DomQuery.compile(ss, "simple");
      }
      var result = simpleCache[ss](els);
      return nonMatches ? quickDiff(result, els) : result;
    },

    /**
    * Collection of matching regular expressions and code snippets.
    */
    matchers : [{
      re: /^\.([\w-]+)/,
      select: 'n = byClassName(n, null, " {1} ");'
    }, {
      re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
      select: 'n = byPseudo(n, "{1}", "{2}");'
    },{
      re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
      select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
    }, {
      re: /^#([\w-]+)/,
      select: 'n = byId(n, null, "{1}");'
    },{
      re: /^@([\w-]+)/,
      select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
    }
    ],

    /**
    * Collection of operator comparison functions. The default operators are =, !=, ^=, $=, *=, %=, |= and ~=.
    * New operators can be added as long as the match the format <i>c</i>= where <i>c</i> is any character other than space, &gt; &lt;.
    */
    operators : {
      "=" : function(a, v){
        return a == v;
      },
      "!=" : function(a, v){
        return a != v;
      },
      "^=" : function(a, v){
        return a && a.substr(0, v.length) == v;
      },
      "$=" : function(a, v){
        return a && a.substr(a.length-v.length) == v;
      },
      "*=" : function(a, v){
        return a && a.indexOf(v) !== -1;
      },
      "%=" : function(a, v){
        return (a % v) == 0;
      },
      "|=" : function(a, v){
        return a && (a == v || a.substr(0, v.length+1) == v+'-');
      },
      "~=" : function(a, v){
        return a && (' '+a+' ').indexOf(' '+v+' ') != -1;
      }
    },

    /**
    * Collection of "pseudo class" processors. Each processor is passed the current nodeset (array)
    * and the argument (if any) supplied in the selector.
    */
    pseudos : {
      "first-child" : function(c){
        var r = [], ri = -1, n;
        for(var i = 0, ci; ci = n = c[i]; i++){
          while((n = n.previousSibling) && n.nodeType != 1);
          if(!n){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "last-child" : function(c){
        var r = [], ri = -1, n;
        for(var i = 0, ci; ci = n = c[i]; i++){
          while((n = n.nextSibling) && n.nodeType != 1);
          if(!n){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "nth-child" : function(c, a) {
        var r = [], ri = -1;
        var m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a);
        var f = (m[1] || 1) - 0, l = m[2] - 0;
        for(var i = 0, n; n = c[i]; i++){
          var pn = n.parentNode;
          if (batch != pn._batch) {
            var j = 0;
            for(var cn = pn.firstChild; cn; cn = cn.nextSibling){
              if(cn.nodeType == 1){
                cn.nodeIndex = ++j;
              }
            }
            pn._batch = batch;
          }
          if (f == 1) {
            if (l == 0 || n.nodeIndex == l){
              r[++ri] = n;
            }
          } else if ((n.nodeIndex + l) % f == 0){
            r[++ri] = n;
          }
        }

        return r;
      },

      "only-child" : function(c){
        var r = [], ri = -1;;
        for(var i = 0, ci; ci = c[i]; i++){
          if(!prev(ci) && !next(ci)){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "empty" : function(c){
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          var cns = ci.childNodes, j = 0, cn, empty = true;
          while(cn = cns[j]){
            ++j;
            if(cn.nodeType == 1 || cn.nodeType == 3){
              empty = false;
              break;
            }
          }
          if(empty){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "contains" : function(c, v){
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          if((ci.textContent||ci.innerText||'').indexOf(v) != -1){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "nodeValue" : function(c, v){
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          if(ci.firstChild && ci.firstChild.nodeValue == v){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "checked" : function(c){
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          if(ci.checked == true){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "not" : function(c, ss){
        return Ext.DomQuery.filter(c, ss, true);
      },

      "odd" : function(c){
        return this["nth-child"](c, "odd");
      },

      "even" : function(c){
        return this["nth-child"](c, "even");
      },

      "nth" : function(c, a){
        return c[a-1] || [];
      },

      "first" : function(c){
        return c[0] || [];
      },

      "last" : function(c){
        return c[c.length-1] || [];
      },

      "has" : function(c, ss){
        var s = Ext.DomQuery.select;
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          if(s(ss, ci).length > 0){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "next" : function(c, ss){
        var is = Ext.DomQuery.is;
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          var n = next(ci);
          if(n && is(n, ss)){
            r[++ri] = ci;
          }
        }
        return r;
      },

      "prev" : function(c, ss){
        var is = Ext.DomQuery.is;
        var r = [], ri = -1;
        for(var i = 0, ci; ci = c[i]; i++){
          var n = prev(ci);
          if(n && is(n, ss)){
            r[++ri] = ci;
          }
        }
        return r;
      }
    }
  };
}();



















(function() {
  
  
  
  
  
  
  
  var nsid = unsafeWindow['global_nsid'];
  var iconUrl = unsafeWindow['global_icon_url'];
  window.addEventListener('load', function() {
    function ajax(url, vars, callbackFunction) {
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");
      request.onreadystatechange = function() {
        var done = 4, ok = 200;
        if (request.readyState == done && request.status == ok) {
          if (request.responseText) {
            callbackFunction(request.responseText);
          }
        }
      };
      request.send(vars);
    }
    function getCommentHTML(text) {
      var text = text.replace(/\n/, '<br>');
      var commentHTML = '<div id="your-comment"><table><tbody><tr valign="top"><td width="48" class="Who">' + 
        '<a href="/photos/' + nsid + '/">' +
        '<img width="48" height="48" alt="view profile" src="' + iconUrl + '"/></a></td>' +
        '<td class="Said"><h4><a href="/photos/' + nsid + '/">You</a> said:</h4>' + text +
        '<br/><small>(Posted just now)</small></p></td></tr></tbody></table></div>';
      return commentHTML;
    }
    var idCounter = 0;
    function gen() {
      return 'gen-' + ++idCounter;
    }
    
    function addCSS(css) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
    }
    function simulateClick(el) {
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
      var cb = document.getElementById(el); 
      var canceled = !cb.dispatchEvent(evt);
    }
    
    addCSS('form.comment-form { margin: 0;width: 240px;padding: 0; } ');
    addCSS('form.fix-it { position: fixed;top: 0; } ');
    addCSS('textarea.message-css { width: 240px !important;border: 1px solid #cccccc;padding: 3px;font-size: 13px;font-family: tahoma; } ');
    
    
    
    
    
    var path = window.location.pathname;
    var pieces = path.match(/\//g);
    var delComment = location.href.match(/deletecomment/);
    
    var Y = unsafeWindow['YAHOO']['util'];
    var $$ = function(s, p) {
      return Ext.DomQuery.select(s, p);
    };
    var contextId = unsafeWindow['nextprev_currentContextID']; // stream38687875@N00
    
    function addKeyNavigation() {
      var hasFocus = false;
      Y.Event.on('message', 'focus', function() {
        hasFocus = true;
      });
      Y.Event.on('message', 'blur', function() {
        hasFocus = false;
      });
      
      
      /*
        * set72157612019180879
        * streamNSID_OF_Stream
        * poolNSID_OF_Pool
      */

      // nextprev_currentContextID
      
      var els = document.getElementById('nextprev_mover_div_' + contextId).
                getElementsByTagName('a');
      
      
      
      
      Y.Event.on(window, 'keypress', function(e) {
        if (hasFocus) {
          return;
        }
        var t = Y.Event.getTarget(e);
        if (t.tagName.toLowerCase() == 'textarea' || t.tagName.toLowerCase() == 'input') {
          return;
        }
        var code = Y.Event.getCharCode(e);
        var flag = false;
        var prevent = false;
        switch (code) {
          case 37: // left
            flag = true;
            if (els[0].href && els[0].href != '') {
              window.location.href = els[0].href;
            } else {
              alert('you are at the last photo of this ' + which);
            }
            prevent = true;
          break;
          case 39: // right
            flag = true;
            if (els[1].href && els[1].href != '') {
              window.location.href = els[1].href;
            } else {
              alert('you are at the first photo of this ' + which);
            }
            prevent = true;
          break;
          case 27: // esc
            Y.Dom.get('message').focus();
          break;
          case 115: // 's'
            simulateClick('photo_gne_button_add_to_faves');
            prevent = true;
          break;
        }
        if (prevent) {
          Y.Event.stopEvent(e);
        }
      });
    }
    
    
    
    function hijackForm() {
      var forms = $$('#DiscussPhoto form');
      var f = forms[forms.length - 1];
      
      var h3 = $$('#DiscussPhoto h3');
      if (h3.length > 1) {
        Y.Dom.get('DiscussPhoto').removeChild(h3[1]);
      }
      
      var form = f.cloneNode(true);
      form.id = 'new-comment-form';
      f.parentNode.removeChild(f);
      Y.Dom.getElementsByClassName('RHS', 'td')[0].appendChild(form);
      Y.Dom.addClass(form, 'comment-form');
      Y.Dom.addClass('message', 'message-css');
      Y.Dom.setStyle('tbl_comment_stuff', 'display', 'none');
      
      
      var XY = Y.Dom.getXY(form);
      
      
      var icon = Y.Dom.getElementsByClassName('rightSideContactChanger', 'img', 'Photo')[0].src;
      var commentArea = $$('#DiscussPhoto h3')[0];
      var text = form.getElementsByTagName('textarea')[0];
      var p = form.getElementsByTagName('p')[0];
      Y.Dom.setStyle(p, 'text-align', 'left');
      
      var html = '<input type="submit" value="Add Comment" class="Butt" name="Submit" id="btn_post_comment" tabindex="2">';
      html += ' <img src="http://l.yimg.com/g/images/pulser2.gif" style="display:none" id="f-spin"">';
      p.innerHTML = html;
      var url = form.action.replace(/\#preview/, '');
      
      Y.Event.on(window, 'scroll', function(e) {
        if (document.body.scrollTop > XY[1]) {
          Y.Dom.addClass(form, 'fix-it');
        } else {
          Y.Dom.removeClass(form, 'fix-it');
        }
      });
      
      Y.Event.on(form, 'submit', function(e) {
        Y.Event.stopEvent(e);
        Y.Dom.setStyle('f-spin', 'display', 'block');
        var serial = Y.Connect.setForm(form);
        // ajax(form.action, serial, callbackFunction)
        
        Y.Connect.asyncRequest('POST', form.action, {
          success: function(o) {
            Y.Dom.setStyle('f-spin', 'display', 'none');
            var val = text.value.replace(/\n/g, "<br>");
            var html = getCommentHTML(val);
            var div = document.createElement('div');
            div.id = 'insert-comment';
            div.innerHTML = html;
            Y.Dom.get('DiscussPhoto').appendChild(div);
            form.reset();
            // Effect.SlideDown('insert-comment', { duration: 1.0 });
          },
          failure: function(o) {
            alert('could not send comment');
          }
        });
      });
    }
    
    function appendBuddyIcons() {
      var childs = Y.Dom.getElementsByClassName('comment-block', 'div');
      
      childs.forEach(function(el) {
        var a = $$('a', el)[0];
        var href = a.href;
        var img = $$('img', a)[0].src;
        var person = $$('h4 a', el)[0].innerHTML;
        var replyText = $$('small', el)[0];
        replyText.innerHTML = replyText.innerHTML.replace(/\(|\)/g, "") + ' | ';
        var anchor = document.createElement('a');
        anchor.className = "Plain";
        anchor.href = "#";
        anchor.innerHTML = "Reply";
        replyText.appendChild(anchor);
        Y.Event.on(anchor, 'click', function(e) {
          Y.Event.stopEvent(e);
          var message = Y.Dom.get('message');
          message.value += '<a href="' + href + '"><img src="' + img + '" width="25" height="25"></a> <b>' + person + '</b>: ';
          message.focus();
          message.scrollTop = message.scrollHeight;
        });
      });
    }
    
    if (pieces.length >= 4 && !delComment && document.getElementById('button_bar')) {
      hijackForm();
      addKeyNavigation();
      appendBuddyIcons();
    }
    
    
    
  }, false);
})();