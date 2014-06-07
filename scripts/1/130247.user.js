// ==UserScript==
// @name           DotupThumbrize
// @namespace      http://polygonpla.net/
// @description    Create thumbnail image in dotup.org uploader
// @include        http://www.dotup.org/
// @include        http://www.dotup.org/*
// @version        1.00
// @author         polygon planet <http://twitter.com/polygon_planet>
// @.updateURL      https://userscripts.org/scripts/source/{xxxxxxxx}.meta.js
// ==/UserScript==
/*
 * どっとうｐろだ.org の画像をサムネイル表示するスクリプト
 */
(function(undefined) {
D();

window.addEventListener('load', function() {
  Deferred.wait(1).next(function() { doit() });
}, true);


function doit() {
  var links, xpath;
  
  document.body.addEventListener('error', function(event) {
    if (event.target &&
        (event.target.tagName || '').toLowerCase() === 'img') {
      setTimeout(function() {
        createImageWithoutReferrer(event.target);
      }, 0);
    }
  }, true);
  
  xpath = '//body//table[@summary="upinfo"]//a';
  links = $x(xpath, document, true);
  
  Deferred.wait(0).next(function() {
    addPager();
  });
  
  Deferred.loop(links.length, function(idx) {
    var a = links[idx];
    var text = trim(a.textContent);
    if (isImageExt(text)) {
      var uri = buildURI(a.href);
      if (isImageURI(uri)) {
        uri = toImageURI(uri);
        var frame = document.createElement('div');
        var img = createImage(uri, function(event) {
          var size = getImageSize(event.target);
          sizeBox.appendChild(
            document.createTextNode(size.width + 'x' + size.height));
        });
        var br = document.createElement('br');
        var sizeBox = document.createElement('div');
        sizeBox.style.textAlign = 'right';
        var link = document.createElement('a');
        link.href = uri;
        link.target = '_blank';
        link.appendChild(img);
        link.appendChild(br);
        link.appendChild(document.createTextNode(text));
        frame.appendChild(link);
        frame.appendChild(sizeBox);
        a.parentNode.insertBefore(frame, a.nextSibling);
        a.parentNode.removeChild(a);
        
        var tr, td = frame.parentNode;
        while (td && td.tagName.toLowerCase() !== 'td') {
          td = td.parentNode;
        }
        tr = td && td.parentNode;
        if (tr && td) {
          var tds = [].slice.call(tr.querySelectorAll('td'));
          tds.forEach(function(td) {
            td.style.border = '1px dashed #ccc';
            td.style.borderTop = td.style.borderBottom = '5px solid #999';
            td.style.padding = '5px';
          });
          var table = tr.parentNode;
          while (table && table.tagName.toLowerCase() !== 'table') {
            table = table.parentNode;
          }
          if (table) {
            table.style.emptyCells = 'hide';
            table.style.borderCollapse = 'collapse';
            table.style.width = (window.innerWidth ||
              (document.documentElement &&
               document.documentElement.clientWidth) ||
              (window.screen && window.screen.availWidth) ||
               800) - 60 + 'px';
          }
        }
      }
    }
    return Deferred.wait(0.05);
  });
  
  
  function addPager() {
    var xpath, links, frame, footer, prev,
        prevPage, curPage, nextPage, pageFrame, setPageStyle, doneCurPage;
    
    xpath = '//body//div//a[starts-with(normalize-space(text()),"[")][contains(text(),"]")]';
    links = $x(xpath, document, true);
    
    frame = document.createElement('div');
    frame.style.margin = '20px';
    frame.style.padding = '5px';
    frame.style.textAlign = 'center';
    frame.id = 'potdotupthumbrizebottompager' + (new Date()).getTime();
    
    doneCurPage = false;
    links.forEach(function(link) {
      var num, strong, text, a;
      num = trim(link.textContent).replace(/^\[|\]$/g, '') - 0;
      if (!isNaN(num) && !doneCurPage && prev === num - 2) {
        strong = document.createElement('strong');
        strong.innerHTML = '[' + (num - 1) + ']';
        frame.appendChild(strong);
        curPage = strong;
        doneCurPage = true;
      }
      a = document.createElement('a');
      a.href = link.href;
      a.innerHTML = link.innerHTML;
      frame.appendChild(a);
      prev = num;
    });
    setPageStyle = function(page) {
      page.style.fontSize = 'larger';
      page.style.fontWeight = 'bolder';
      page.style.margin = '10px';
      page.style.padding = '5px 20px';
    };
    if (curPage) {
      pageFrame = document.createElement('div');
      pageFrame.style.margin = '10px';
      pageFrame.style.textAlign = 'center';
      if (curPage.previousSibling) {
        prevPage = curPage.previousSibling.cloneNode(true);
        setPageStyle(prevPage);
        prevPage.innerHTML = '&#171; Previous ' + prevPage.innerHTML;
        pageFrame.appendChild(prevPage);
      }
      if (curPage.nextSibling) {
        nextPage = curPage.nextSibling.cloneNode(true);
        setPageStyle(nextPage);
        nextPage.innerHTML += ' Next &#187;';
        pageFrame.appendChild(nextPage);
      }
      if (prevPage || nextPage) {
        frame.insertBefore(pageFrame, frame.firstChild);
      }
    }
    xpath = '//body//table[@summary="footer"]';
    footer = $x(xpath);
    footer.parentNode.insertBefore(frame, footer);
  }
  
  
  function createImageWithoutReferrer(old) {
    var id, iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.position = 'absolute';
    
    id = 'potiframenode' + (new Date()).getTime();
    iframe.id = id;
    
    iframe.src = 'data:text/html,' + encodeURI([
      "<html><head></head><body><script>",
      "var LIMIT = 6;",
      "function trigger(ifmImg) {",
        "setTimeout(function() { doTrigger(ifmImg) }, 0);",
      "}",
      "function doTrigger(ifmImg) {",
        "var imgs, img, ifm, size, sizeFrame, link;",
        "try {",
          "imgs = window.parent.document.getElementsByTagName('img');",
          "img = [].slice.call(imgs).filter(function(el) {",
            "return ifmImg.src === el.src;",
          "}).shift();",
          "ifmImg.setAttribute('style', img.getAttribute('style'));",
          "ifmImg.removeAttribute('onload');",
          "ifmImg.removeAttribute('onerror');",
          "ifmImg.parentNode.removeChild(ifmImg);",
          "img.parentNode.insertBefore(ifmImg, img.nextSibling);",
          "img.parentNode.removeChild(img);",
          "ifm = window.parent.document.getElementById(ifmImg.id.slice(0, -1));",
          "ifm.parentNode.removeChild(ifm);",
          "size = {",
            "width: ifmImg.naturalWidth || ifmImg.width || ifmImg.clientWidth,",
            "height: ifmImg.naturalHeight || ifmImg.height || ifmImg.clientHeight",
          "};",
          "sizeFrame = document.createElement('div');",
          "sizeFrame.style.textAlign = 'right';",
          "sizeFrame.innerHTML = size.width + 'x' + size.height;",
          "link = ifmImg.parentNode;",
          "link.parentNode.insertBefore(sizeFrame, link.nextSibling);",
        "} catch (e) {}",
      "}",
      "function retry(ifmImg) {",
        "setTimeout(function() { doRetry(ifmImg) }, 0);",
      "}",
      "function doRetry(ifmImg) {",
        "var img, src, ifm;",
        "if (--LIMIT >= 0) {",
          "img = document.createElement('img');",
          "img.addEventListener('load', function(event) {",
            "trigger(event.target);",
          "}, true);",
          "img.addEventListener('error', function(event) {",
            "retry(event.target);",
          "}, true);",
          "img.id = ifmImg.id;",
          "src = ifmImg.src;",
          "ifmImg.removeAttribute('src');",
          "ifmImg.removeAttribute('onload');",
          "ifmImg.removeAttribute('onerror');",
          "ifmImg.parentNode.removeChild(ifmImg);",
          "img.src = src;",
          "document.body.appendChild(img);",
        "} else {",
          "ifmImg.removeAttribute('src');",
          "ifmImg.removeAttribute('onload');",
          "ifmImg.removeAttribute('onerror');",
          "ifmImg.parentNode.removeChild(ifmImg);",
          "ifm = window.parent.document.getElementById(ifmImg.id.slice(0, -1));",
          "ifm.parentNode.removeChild(ifm);",
        "}",
      "}",
      "</script>",
      "<img onload=\"trigger(this)\" onerror=\"retry(this)\" ",
           "id=\"{{ID}}\" src=\"{{SRC}}\"/>",
     "</body></html>"
    ].join('\n').
      replace('{{ID}}', id + 'i').
      replace('{{SRC}}', old.src)
    );
    document.body.appendChild(iframe);
  }
  
  
  function createImage(src, callback) {
    var img = document.createElement('img');
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.style.border = '2px solid #ccc';
    img.addEventListener('load', callback || (function() {}), true);
    img.src = src;
    return img;
  }
  
  
  function getImageSize(img) {
    return {
      width: img.naturalWidth || img.width || img.clientWidth,
      height: img.naturalHeight || img.height || img.clientHeight
    };
  }
  
  
  function buildURI(s) {
    var base = document.location.protocol + '//' + document.location.host;
    if (s.indexOf(base) === -1) {
      s = base + '/' + s.replace(/^[.\/]+/g, '');
    }
    return s;
  }
  
  
  function toImageURI(s) {
    return s.replace(/(?:[.]html)?$/gi, '');
  }
  
  
  function isImageURI(s) {
    return isImageExt(toImageURI(s));
  }
  
  
  function isImageExt(s) {
    return /[.](?:jpe?g|gif|png)$/i.test(s);
  }
}


function stringify(x) {
    var result = '';
    if (x !== null) {
        switch (typeof x) {
            case 'string':
                result = x;
                break;
            case 'xml':
            case 'number':
                result = x.toString();
                break;
            case 'boolean':
                result = x ? 1 : '';
                break;
            default:
                break;
        }
    }
    return String(result);
}


function trim(s) {
  return stringify(s).replace(/^[\s\u00A0\u3000]+|[\s\u00A0\u3000]+$/g, '');
}


// $X | $x | XPath via Tombloo library
function $x(expr, context, multi) {
  const XUL_NS  = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
  const HTML_NS = 'http://www.w3.org/1999/xhtml';
  var result, ret, doc, toValue, nodes, i, len;
  
  context = context || document;
  doc = context.ownerDocument || context;
  expr = doc.createExpression(expr, {
    lookupNamespaceURI: function(prefix) {
      var ns;
      switch (String(prefix).toLowerCase()) {
        case 'xul':
            ns = XUL_NS;
            break;
        case 'html':
        case 'xhtml':
            ns = HTML_NS;
            break;
        default:
            ns = '';
            break;
      }
      return ns;
    }
  });
  toValue = function(node) {
    var res;
    
    //#Bug: FIXME: Bug!!!!!
    //res = node;
    //return res;
    
    if (node) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            res = node.singleNodeValue || node.cloneNode(true);
            break;
        case Node.ATTRIBUTE_NODE:
            res = node.value || node.nodeValue || node.textContent;
            break;
        case Node.TEXT_NODE:
            res = node.textContent;
            break;
        default:
            res = node.value || node.nodeValue || node.textContent || null;
            break;
      }
    }
    return res;
  };
  ret = expr.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (ret.resultType) {
    case ret.STRING_TYPE:
        result = ret.stringValue;
        break;
    case ret.NUMBER_TYPE:
        result = ret.numberValue;
        break;
    case ret.BOOLEAN_TYPE:
        result = ret.booleanValue;
        break;
    case ret.UNORDERED_NODE_ITERATOR_TYPE:
    default:
        if (!multi) {
          //result = toValue(ret.iterateNext());
          result = ret.iterateNext();
        } else {
          
          
          
          //ret = expr.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          result = [];
          //for (i = 0, len = ret.snapshotLength; i < len ; i++) {
            //result.push(toValue(ret.snapshotItem(i)));
            //result.push(ret.snapshotItem(i));
          //}
          var next;
          while (next = ret.iterateNext()) {
            result.push(next);
          }
        }
        break;
    //default:
    //    result = result.singleNodeValue || result || null;
    //    break;
  }
  return result;
}



//
// list nodes matching this expression, optionally relative to the node 'root'
// Based: http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
//
/*
function $x(xpath, context, multi) {
  var result, ret, doc, next;
  if (context) {
    doc = context.evaluate ? context : context.ownerDocument;
  } else {
    doc = document;
  }
  ret = doc.evaluate(xpath, doc, null, 0, null);
  switch (ret.resultType) {
    case ret.STRING_TYPE:
        result = ret.stringValue;
        break;
    case ret.NUMBER_TYPE:
        result = ret.numberValue;
        break;
    case ret.BOOLEAN_TYPE:
        result = ret.booleanValue;
        break;
    default:
        if (multi) {
          result = [];
          var i = 0;
          while (next = ret.iterateNext()) {
            result.push(next);
          }
        } else {
          result = ret.iterateNext();
        }
        break;
  }
  return result;
}
*/

// via AutoPagerize
function createHTMLDocumentByString(s) {
  var result, html, doc, fragment, re;
  if (document.documentElement.nodeName !== 'HTML') {
    html = String(s || '');
    result = new DOMParser().parseFromString(html, 'application/xhtml+xml');
  } else {
    re = /<!DOCTYPE\b[^>]*>|<html\b[^>]*>|<\/html\s*>[\s\S]*/gi;
    html = String(s || '').replace(re, '');
    try {
      doc = document.cloneNode(false);
      doc.appendChild(doc.importNode(document.documentElement, false));
    } catch(e) {
      doc = document.implementation.createDocument(null, 'html', null);
    }
    fragment = createDocumentFragmentByString(html);
    try {
      fragment = doc.adoptNode(fragment);
    } catch(e) {
      fragment = doc.importNode(fragment, true);
    }
    doc.documentElement.appendChild(fragment);
    result = doc;
  }
  return result;
}


//-----------------------------------------------------------------------------
// JSDeferred
//-----------------------------------------------------------------------------
/**
 * JSDeferred
 *
 * Usage:: with (D()) { your code }
 *
 * JSDeferred 0.4.0 Copyright (c) 2007 cho45 ( www.lowreal.net )
 *
 * See http://github.com/cho45/jsdeferred
 * http://cho45.stfuawsc.com/jsdeferred/
 *
 * Fixed.
 */
function D() {
  function Deferred() {
      return (this instanceof Deferred) ? this.init() : new Deferred();
  }
  Deferred.ok = function(x) { return x };
  Deferred.ng = function(x) { throw  x };
  Deferred.prototype = {
    _id: 0xe38286e381ae,
    init: function() {
      this._next = null;
      this.callback = {
          ok: Deferred.ok,
          ng: Deferred.ng
      };
      return this;
    },
    next: function(fun) { return this._post("ok", fun) },
    error: function(fun) { return this._post("ng", fun) },
    call: function(val) { return this._fire("ok", val) },
    fail: function(err) { return this._fire("ng", err) },
    cancel: function() {
      (this.canceller || function() {})();
      return this.init();
    },
    _post: function(okng, fun) {
      this._next = new Deferred();
      this._next.callback[okng] = fun;
      return this._next;
    },
    _fire: function(okng, value) {
      var next = "ok";
      try {
        value = this.callback[okng].call(this, value);
      } catch (e) {
        next = "ng";
        value = e;
        if (Deferred.onerror) {
          Deferred.onerror(e);
        }
      }
      if (Deferred.isDeferred(value)) {
        value._next = this._next;
      } else {
        if (this._next) {
          this._next._fire(next, value);
        }
      }
      return this;
    }
  };
  Deferred.isDeferred = function(obj) {
    return !!(obj && obj._id == Deferred.prototype._id);
  };
  Deferred.next_default = function(fun) {
    var d = new Deferred();
    var id = setTimeout(function() { d.call() }, 0);
    d.canceller = function() { clearTimeout(id) };
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_faster_way_readystatechange = 
    ((typeof window === 'object') && (location.protocol == "http:") &&
    !window.opera && /\bMSIE\b/.test(navigator.userAgent)) && function(fun) {
    var d = new Deferred();
    var t = new Date().getTime();
    if (t - arguments.callee._prev_timeout_called < 150) {
      var cancel = false;
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src  = "data:text/javascript,";
      script.onreadystatechange = function() {
        if (!cancel) {
          d.canceller();
          d.call();
        }
      };
      d.canceller = function() {
        if (!cancel) {
          cancel = true;
          script.onreadystatechange = null;
          document.body.removeChild(script);
        }
      };
      document.body.appendChild(script);
    } else {
      arguments.callee._prev_timeout_called = t;
      var id = setTimeout(function() { d.call() }, 0);
      d.canceller = function() { clearTimeout(id) };
    }
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_faster_way_Image = 
    ((typeof window === 'object') && (typeof(Image) != "undefined") &&
    !window.opera && document.addEventListener) && function(fun) {
    var d = new Deferred();
    var img = new Image();
    var handler = function() {
      d.canceller();
      d.call();
    };
    img.addEventListener("load", handler, false);
    img.addEventListener("error", handler, false);
    d.canceller = function() {
      img.removeEventListener("load", handler, false);
      img.removeEventListener("error", handler, false);
    };
    img.src = "data:image/png," + Math.random();
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_tick =
    (typeof process === 'object' &&
     typeof process.nextTick === 'function') && function(fun) {
    var d = new Deferred();
    process.nextTick(function() { d.call() });
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next = Deferred.next_faster_way_readystatechange ||
                Deferred.next_faster_way_Image ||
                Deferred.next_tick ||
                Deferred.next_default;
  Deferred.chain = function() {
    var chain = Deferred.next();
    for (var i = 0, len = arguments.length; i < len; i++) (function(obj) {
      switch (typeof obj) {
        case "function":
          var name = null;
          try {
            name = obj.toString().match(/^\s*function\s+([^\s()]+)/)[1];
          } catch (e) {}
          if (name != "error") {
            chain = chain.next(obj);
          } else {
            chain = chain.error(obj);
          }
          break;
        case "object":
          chain = chain.next(function() { return Deferred.parallel(obj) });
          break;
        default:
          throw "unknown type in process chains";
      }
    })(arguments[i]);
    return chain;
  };
  Deferred.wait = function(n) {
    var d = new Deferred(), t = new Date();
    var id = setTimeout(function() {
      d.call((new Date).getTime() - t.getTime());
    }, n * 1000);
    d.canceller = function() { clearTimeout(id) };
    return d;
  };
  Deferred.call = function(fun) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Deferred.next(function() {
        return fun.apply(this, args);
    });
  };
  Deferred.parallel = function(dl) {
    if (arguments.length > 1) {
      dl = Array.prototype.slice.call(arguments);
    }
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function(d, i) {
      if (typeof d == "function") d = Deferred.next(d);
      d.next(function(v) {
        values[i] = v;
        if (--num <= 0) {
          if (dl instanceof Array) {
            values.length = dl.length;
            values = Array.prototype.slice.call(values, 0);
          }
          ret.call(values);
        }
      }).error(function (e) {
        ret.fail(e);
      });
      num++;
    })(dl[i], i);
    if (!num) Deferred.next(function() { ret.call() });
    ret.canceller = function() {
        for (var i in dl) if (dl.hasOwnProperty(i)) {
          dl[i].cancel();
        }
    };
    return ret;
  };
  Deferred.earlier = function(dl) {
    if (arguments.length > 1) {
      dl = Array.prototype.slice.call(arguments);
    }
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function(d, i) {
      d.next(function(v) {
        values[i] = v;
        if (dl instanceof Array) {
          values.length = dl.length;
          values = Array.prototype.slice.call(values, 0);
        }
        ret.canceller();
        ret.call(values);
      }).error(function(e) {
        ret.fail(e);
      });
      num++;
    })(dl[i], i);
    if (!num) Deferred.next(function() { ret.call() });
    ret.canceller = function() {
      for (var i in dl) if (dl.hasOwnProperty(i)) {
        dl[i].cancel();
      }
    };
    return ret;
  };
  Deferred.loop = function(n, fun) {
    var o = {
      begin: n.begin || 0,
      end: (typeof n.end == "number") ? n.end : n - 1,
      step: n.step  || 1,
      last: false,
      prev: null
    };
    var ret, step = o.step;
    return Deferred.next(function() {
      function _loop(i) {
        if (i <= o.end) {
          if ((i + step) > o.end) {
            o.last = true;
            o.step = o.end - i + 1;
          }
          o.prev = ret;
          ret = fun.call(this, i, o);
          if (Deferred.isDeferred(ret)) {
            return ret.next(function (r) {
              ret = r;
              return Deferred.call(_loop, i + step);
            });
          } else {
            return Deferred.call(_loop, i + step);
          }
        } else {
          return ret;
        }
      }
      return (o.begin <= o.end) ? Deferred.call(_loop, o.begin) : null;
    });
  };
  Deferred.repeat = function(n, fun) {
    var i = 0, end = {}, ret = null;
    return Deferred.next(function() {
      var t = (new Date()).getTime();
      divide: {
        do {
          if (i >= n) break divide;
          ret = fun(i++);
        } while ((new Date()).getTime() - t < 20);
        return Deferred.call(arguments.callee);
      }
      return null;
    });
  };
  Deferred.register = function(name, fun) {
    this.prototype[name] = function() {
      var a = arguments;
      return this.next(function() {
        return fun.apply(this, a);
      });
    };
  };
  Deferred.register("loop", Deferred.loop);
  Deferred.register("wait", Deferred.wait);
  Deferred.connect = function(funo, options) {
    var target, func, obj;
    if (typeof arguments[1] == "string") {
      target = arguments[0];
      func = target[arguments[1]];
      obj = arguments[2] || {};
    } else {
      func = arguments[0];
      obj = arguments[1] || {};
      target = obj.target;
    }
    var partialArgs = obj.args ? Array.prototype.slice.call(obj.args, 0) : [];
    var callbackArgIndex = isFinite(obj.ok) ? obj.ok : 
                                   obj.args ? obj.args.length : undefined;
    var errorbackArgIndex = obj.ng;
    return function() {
      var d = new Deferred().next(function(args) {
        var next = this._next.callback.ok;
        this._next.callback.ok = function() {
          return next.apply(this, args.args);
        };
      });
      var args = partialArgs.concat(Array.prototype.slice.call(arguments, 0));
      if (!(isFinite(callbackArgIndex) && callbackArgIndex !== null)) {
        callbackArgIndex = args.length;
      }
      var callback = function() {
        d.call(new Deferred.Arguments(arguments))
      };
      args.splice(callbackArgIndex, 0, callback);
      if (isFinite(errorbackArgIndex) && errorbackArgIndex !== null) {
        var errorback = function() { d.fail(arguments) };
        args.splice(errorbackArgIndex, 0, errorback);
      }
      Deferred.next(function() { func.apply(target, args) });
      return d;
    }
  };
  Deferred.Arguments = function(args) {
    this.args = Array.prototype.slice.call(args, 0);
  };
  Deferred.retry = function (retryCount, funcDeferred, options) {
    if (!options) options = {};
    var wait = options.wait || 0;
    var d = new Deferred();
    var retry = function() {
      var m = funcDeferred(retryCount);
      m.next(function (mes) {
          d.call(mes);
        }).
        error(function(e) {
          if (--retryCount <= 0) {
            d.fail(['retry failed', e]);
          } else {
            setTimeout(retry, wait * 1000);
          }
        });
    };
    setTimeout(retry, 0);
    return d;
  };
  Deferred.methods = [
    "parallel", "wait", "next", "call", "loop", "repeat", "chain"
  ];
  Deferred.define = function (obj, list) {
    if (!list) list = Deferred.methods;
    if (!obj)  obj  = (function getGlobal() { return this })();
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      obj[n] = Deferred[n];
    }
    return Deferred;
  };
  this.Deferred = Deferred;
  function http(opts) {
    var d = Deferred();
    var req = new XMLHttpRequest();
    req.open(opts.method, opts.url, true);
    if (opts.headers) {
      for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {
        req.setRequestHeader(k, opts.headers[k]);
      }
    }
    req.onreadystatechange = function() {
      if (req.readyState == 4) d.call(req);
    };
    req.send(opts.data || null);
    d.xhr = req;
    return d;
  }
  http.get = function(url) {
    return http({method: "get",  url: url});
  };
  http.post = function(url, data) {
    return http({
      method: "post",
      url: url, 
      data: data, 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  http.jsonp = function(url, params) {
    if (!params) params = {};
    var Global = (function() { return this })();
    var d = Deferred();
    var cbname = params["callback"];
    if (!cbname) do {
      cbname = "callback" + String(Math.random()).slice(2);
    } while (typeof(Global[cbname]) != "undefined");
    params["callback"] = cbname;
    url += (url.indexOf("?") == -1) ? "?" : "&";
    for (var name in params) if (params.hasOwnProperty(name)) {
      url = url + encodeURIComponent(name) + "=" + 
                  encodeURIComponent(params[name]) + "&";
    }
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = url;
    document.body.appendChild(script);
    Global[cbname] = function callback(data) {
      delete Global[cbname];
      document.body.removeChild(script);
      d.call(data);
    };
    return d;
  };
  function xhttp(opts) {
    var d = Deferred();
    if (opts.onload)  d = d.next(opts.onload);
    if (opts.onerror) d = d.error(opts.onerror);
    opts.onload = function(res) {
      d.call(res);
    };
    opts.onerror = function(res) {
      d.fail(res);
    };
    setTimeout(function() {
      GM_xmlhttpRequest(opts);
    }, 0);
    return d;
  }
  xhttp.get = function(url) {
    return xhttp({method: "get", url: url});
  };
  xhttp.post = function(url, data) {
    return xhttp({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  Deferred.Deferred = Deferred;
  Deferred.http = http;
  Deferred.xhttp = (typeof(GM_xmlhttpRequest) == 'undefined') ? http : xhttp;
  return Deferred;
}
//-----------------------------------------------------------------------------
// End of JSDeferred
//-----------------------------------------------------------------------------
}());
