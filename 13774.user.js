// ==UserScript==
// @name           JKA48 - Jaiku Comment's Anchor Linker
// @namespace      http://d.hatena.ne.jp/Cormorant/
// @description    creating link to Jaiku comment's anchor ([link=46]+er)
// @include        http://*.jaiku.com/presence/*
// @include        http://jaiku.com/channel/*/presence/*
// @version        0.2.4
// ==/UserScript==
//
// last modified: 2007/11/12 14:06:03
//


(function() {

  // --- user customize start ---

  var useAppendNumber   = true
  var useMakeAnchorLink = true
  var usePopupComment   = true // automatically false if useMakeAnchorLink is false

  // --- user customize end   ---


  var $X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }
  var Jaiku = function() { this.init.apply(this, arguments) }

  Jaiku.prototype.init = function() {
    this.l = $X('//div[@id="comments"]/ul/li')

    GM_addStyle("\
      div.jka_expand {\
        position: absolute;\
        min-width: 200px;\
        max-width: 400px;\
        padding: 7px;\
        text-align: left;\
        background-color: #fffddd;\
        border: 1px solid #f8e788;\
      }\
      div.jka_expand img.photo {\
        float: left;\
        margin: 0 7px 7px 0;\
        padding: 2px;\
        border: 1px solid #e5e5e5;\
      }\
      div.jka_expand p,\
      div.jka_expand blockquote,\
      div.jka_expand pre,\
      div.jka_expand ul {\
        margin: 0pt 5px;\
        padding: 0.3em 0pt 0.2em;\
      }\
      div.jka_expand ol {\
        margin-left: 1.8em;\
      }\
      div.jka_expand li {\
        margin: 0;\
        padding: 0;\
      }\
      div.jka_expand pre {\
        font-size: 1.1em;\
        overflow: hidden;\
      }\
      div.jka_expand blockquote {\
        color: #666;\
      }\
      div.jka_expand a,\
      div.jka_expand a:hover {\
        color: #000;\
        background: none;\
        text-decoration: underline;\
      }\
    ")

    if (useMakeAnchorLink) this.makeAnchorLink()
    if (useAppendNumber)   this.appendNumber()

    addEventListener('click', function(e) {
      var f = 0, t = e.target
      while (t) {
        if (t.className == 'jka_expand') { f++; break }
        t = t.parentNode
      }
      if (!f) {
        $X('//body/div[@class="jka_expand"]').forEach(function(s,i) {
          s.parentNode.removeChild(s)
        })
      }
    }, true)
  }

  Jaiku.prototype.appendNumber = function() {
    var self = this

    $X('//div[@id="comments"]//p[@class="meta"]').forEach(function(s,i) {
      var a = document.createElement('a')
      var t = document.createTextNode(' ...')

      a.href = "#"+self.l[i].id
      a.appendChild(document.createTextNode('No.' + (i+1)))
      a.addEventListener('click', function() { return false }, true)
      a.addEventListener('mousedown', function() {
        var c = document.getElementById('comment')

        if (!c) return

        this.t = setTimeout(function() {
          var u = c.wrappedJSObject || c
          u.scrollIntoView()
          u.focus()
        }, 500)

        var v = ">>"+(i+1)+" "
        if (!c.value) v = "."+v
        c.value += v
      }, true)
      a.addEventListener('mouseup', function() { clearTimeout(this.t) }, true)

      s.insertBefore(t, s.firstChild)
      s.insertBefore(a, s.firstChild)
    })
  }

  Jaiku.prototype.makeAnchorLink = function() {
    var self = this
    var ch = function(r) { return String.fromCharCode(r.charCodeAt(0) - 65248) }
    var mo = function(i) {
      return usePopupComment ? ' onmouseover="' +
        "var b=$('div.bottom',document.getElementById('"+i+"'))[0].cloneNode(true),"+
        "d=document.createElement('div');"+
        "d.style.cssText='top:'+(event.pageY-3)+'px;left:'+(event.pageX+3)+'px;';"+
        "d.className='jka_expand';$($('p.meta',b)[0]).remove();$(d).append(b);"+
        "$(document.body).append(d);" + '"' : ''
    }

    $X('//div[@id="comments"]//div[@class="bottom"]/*[not(@class)]').forEach(function(s,i) {
      s.innerHTML = s.innerHTML.replace(/(&gt;&gt;|\uFF1E\uFF1E)([\d\uFF11-\uFF19]+)/g, function(m,a,n) {
        var n2 = n.replace(/[\uFF11-\uFF19]/g, ch)

        return self.l[n2-1] ? '<a href="#'+self.l[n2-1].id+'"'+mo(self.l[n2-1].id)+'>'+a+n+'</a>' : m
      })
    })
  }

  new Jaiku()

})()
