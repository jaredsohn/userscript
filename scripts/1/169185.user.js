// ==UserScript==
// @name Tategaki Novel
// @namespace http://userscripts.org/users/121129
// @description 投稿された小説を縦書き表示
// @include http://ncode.syosetu.com/n*
// @include http://novel18.syosetu.com/n*
// @include http://www.mai-net.net/bbs/sst/sst.php?*
// @include http://novel.syosetu.org/*
// @include http://www.pixiv.net/novel/show.php?*
// @include http://www.akatsuki-novels.com/stories/view/*
// @version 8
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// ==/UserScript==

;(function() {
  'use strict'
  
  var onIFrame = window.top !== window.self
  if (onIFrame) return
  
  var Default = { LINE_NUM: 22
                , LINE_CHAR_NUM: 28
                , FONT_TYPE: 'gothic'
                , GOTHIC_FONT_FAMILY: [ '"メイリオ"'
                                      , '"IPAexゴシック"'
                                      , '"IPAゴシック"'
                                      , '"ＭＳ ゴシック"'
                                      , '"SimSun"'
                                      , 'monospace'
                                      ].join(', ')
                , MINCHO_FONT_FAMILY: [ '"IPAex明朝"'
                                      , '"IPA明朝"'
                                      , '"ＭＳ 明朝"'
                                      , '"SimSun"'
                                      , 'serif'
                                      ].join(', ')
                , FONT_SIZE: '20px'
                , MARGIN_TOP: '20px'
                , SPACE_BETWEEN_LINES: '0.7em'
                , COLOR: '#2F4F4F'
                , BACKGROUND_COLOR: '#D3D3D3'
                , TOOLBAR_VISIBLE: true
                }

  var _getValue, _setValue, _deleteValue
 ;(function() {
    function addPrefix(name) {
      return 'http://userscripts.org/users/121129/Tategaki Novel.' + name
    }
    if (typeof(GM_deleteValue) === 'undefined') {
      _getValue = function(name, def) {
        var v = localStorage.getItem(addPrefix(name))
        return v === null ? def : JSON.parse(v)
      }
      _setValue = function(name, value) {
        localStorage.setItem(addPrefix(name), JSON.stringify(value))
      }
      _deleteValue = function(name) {
        localStorage.removeItem(addPrefix(name))
      }
    } else {
      _getValue = GM_getValue
      _setValue = GM_setValue
      _deleteValue = GM_deleteValue
    }
  })()

  function GM_getLineNum() { return _getValue('lineNum', Default.LINE_NUM) }
  function GM_getLineCharNum() {
    return _getValue('lineCharNum', Default.LINE_CHAR_NUM)
  }
  function GM_getFontType() { return _getValue('fontType', Default.FONT_TYPE) }
  function GM_getGothicFontFamily() {
    return _getValue('gothicFontFamily', Default.GOTHIC_FONT_FAMILY)
  }
  function GM_getMinchoFontFamily() {
    return _getValue('minchoFontFamily', Default.MINCHO_FONT_FAMILY)
  }
  function GM_getFontFamily(fontType) {
    switch (fontType || GM_getFontType()) {
      case 'gothic': return GM_getGothicFontFamily()
      case 'mincho': return GM_getMinchoFontFamily()
      default: throw new Error(fontType || GM_getFontType())
    }
  }
  function GM_getColor() { return _getValue('color', Default.COLOR) }
  function GM_getBackgroundColor() {
    return _getValue('backgroundColor', Default.BACKGROUND_COLOR)
  }
  function GM_isToolbarVisible() {
    return _getValue('toolbarVisible', Default.TOOLBAR_VISIBLE)
  }
  function GM_getFontSize() { return _getValue('fontSize', Default.FONT_SIZE) }
  function GM_getMarginTop() {
    return _getValue('marginTop', Default.MARGIN_TOP)
  }
  function GM_getSpaceBetweenLines() {
    return _getValue('spaceBetweenLines', Default.SPACE_BETWEEN_LINES)
  }
  function GM_clear() {
   ;[ 'lineNum'
    , 'lineCharNum'
    , 'fontType'
    , 'gothicFontFamily'
    , 'minchoFontFamily'
    , 'color'
    , 'backgroundColor'
    , 'toolbarVisible'
    , 'fontSize'
    , 'marginTop'
    , 'spaceBetweenLines'
    , 'auto'
    ].forEach(function(name) { _deleteValue(name) })
  }

  function hasParam(location, name, val) {
    return location.search.substring(1).split('&').some(function(param) {
      var i = param.indexOf('=')
      if (name !== param.substring(0, i)) return false
      var v = param.substring(i + 1)
      return val instanceof RegExp ? val.test(v) : val === v
    })
  }
  function getHRef(selector, textContent) {
    var anchors = document.querySelectorAll(selector)
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i]
      if (a.textContent === textContent) return a.href
    }
    return ''
  }
  function insertCell(row, child) {
    var result = row.insertCell(-1)
    result.style.border = '1px solid'
    result.style.padding = '5px'
    result.style.fontSize = '18px'
    if (child) {
      if (child.nodeType) result.appendChild(child)
      else result.textContent = child
    }
    return result
  }
  var newTextNode = document.createTextNode.bind(document)
  function getLine(selector) {
    var n = document.querySelector(selector)
    return n ? Line.parse(n.childNodes) : null
  }
  function getLines(selector) {
    var n = document.querySelector(selector)
    return n ? Lines.parse(n.childNodes) : []
  }
  function newRotatedElem(text) {
    var result = document.createElement('span')
    result.textContent = text
    result.style.display = 'inline-block'
    result.style.transform = 'rotate(90deg)'
    result.style.webkitTransform = 'rotate(90deg)'
    return result
  }
  
  function Block() {}
  Block.prototype.startsWithBadChar = function() { return false }
  Block.prototype.endsWithBadChar = function() { return false }
  Block.prototype.setLine = function(line) { return this }
  
  var Text = (function() {
    var replaceByVerticalChars = (function() {
      var map = { '「':'﹁', '」':'﹂', '｢':'﹁', '｣':'﹂'
                , '『':'﹃', '』':'﹄', '（':'︵', '）':'︶'
                , '｛':'︷', '｝':'︸', '〈':'︿', '〉':'﹀'
                , '＜':'︿', '＞':'﹀', '《':'︽', '》':'︾'
                , '≪':'︽', '≫':'︾', '〔':'︹', '〕':'︺'
                , '【':'︻', '】':'︼', '－':'︱', '―':'︱'
                , '─':'︱', '—':'︱', 'ー':'丨', '−':'︱'
                , '…':'︙', '‥':'︰'
                , '、':'︑', '。':'︒', '，':'︐'
                }
        , regExp = new RegExp(Object.keys(map).join('|'), 'g')
      return function(str) {
        return str.replace(regExp, function(match) { return map[match] })
      }
    })()
    var replaceIsolatedAsciiByZenkaku = (function() {
      var regExp = /(^|[^\x20-\x7e])([\x21-\x7e])(?=$|[^\x20-\x7e])/g
        , diff = '！'.charCodeAt(0) - '!'.charCodeAt(0)
      return function(str) {
        return str.replace(regExp, function(match, p1, p2) {
          return p1 + String.fromCharCode(p2.charCodeAt(0) + diff)
        })
      }
    })()
    function removeAllWhiteSpace(str) {
      return str.replace(/[ \t\r\n\u00A0]/g, '')
    }
    var replaceTwoExclamationOrQuestion = (function() {
      var map = { '！！': '‼', '？？': '⁇', '？！': '⁈', '！？': '⁉' }
        , regExp = /(^|[^！？])([！？]{2})(?=$|[^！？])/g
      return function(str) {
        return str.replace(regExp, function(match, p1, p2) {
          return p1 + map[p2]
        })
      }
    })()
    var reverseQuotationMark = (function() {
      var map = { '“':'”', '”':'“', '‘':'’', '’':'‘' }
        , regExp = new RegExp(Object.keys(map).join('|'), 'g')
      return function(str) {
        return str.replace(regExp, function(match) { return map[match] })
      }
    })()
    function replace(text) {
      var str = removeAllWhiteSpace(text)
      str = replaceIsolatedAsciiByZenkaku(str)
      str = replaceByVerticalChars(str)
      str = replaceTwoExclamationOrQuestion(str)
      str = reverseQuotationMark(str)
      return str
    }
    
    function Text(text, replaced) {
      this.val = replaced ? text : replace(text)
      Object.freeze(this)
    }
    Text.prototype = Object.create(Block.prototype)
    Text.prototype.isEmpty = function() { return !this.val }
    Text.prototype.getLength = function() { return this.val.length }
    Text.prototype.canCut = function(index) {
      return 0 < index && index < this.getLength()
    }
    Text.prototype.cut = function(index) {
      return { before: new Text(this.val.substring(0, index), true)
             , after: new Text(this.val.substring(index), true)
             }
    }
    Text.prototype.startsWithBadChar = function() {
      return /[﹂﹄︶︸﹀︾︺︼︑︒︐］“‘]/.test(this.val[0])
    }
    Text.prototype.endsWithBadChar = function() {
      return /[﹁﹃︵︷︿︽︹︻［”’]/.test(this.val[this.val.length - 1])
    }
    Text.prototype.newNode = (function() {
      function replaceMatchedTextByCreatedElem(textNode, regExp, createElem) {
        var result = document.createDocumentFragment()
          , begin = 0
          , text = textNode.nodeValue
        for (var r; r = regExp.exec(text);) {
          result.appendChild(newTextNode(text.substring(begin, r.index)))
          result.appendChild(createElem(r[0]))
          begin = regExp.lastIndex
        }
        result.appendChild(newTextNode(text.substring(begin)))
        result.normalize()
        return result
      }
      function replaceTextNodeIfMatched(node, regExp, createElem) {
        Array.prototype.filter.call(node.childNodes, function(child) {
          return child.nodeType === Node.TEXT_NODE
        }).forEach(function(textNode) {
          node.replaceChild(replaceMatchedTextByCreatedElem(textNode
                                                          , regExp
                                                          , createElem)
                          , textNode)
        })
        return node
      }
      function rotateNoVerticalChars(node) {
        return replaceTextNodeIfMatched(node
                                      , /[［］＝：；〜～]/g
                                      , newRotatedElem)
      }
      var translateSutegana = (function() {
        var regExp = /[ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ]/g
        function newSuteganaElem(text) {
          var result = document.createElement('span')
          result.textContent = text
          result.style.position = 'relative'
          result.style.left = '0.1em'
          result.style.top = '-0.1em'
          return result
        }
        return function(node) {
          return replaceTextNodeIfMatched(node, regExp, newSuteganaElem)
        }
      })()
      var translateQuotationMark = (function() {
        var regExp = /[”“’‘]/g
        function newQuotationMarkElem(text) {
          var result = document.createElement('span')
          result.textContent = text
          result.style.position = 'relative'
          if (text === '”' || text === '’') {
            result.style.top = '0.5em'
            if (text === '”') result.style.left = '0.5em'
            else result.style.left = '0.7em'
          } else {
            result.style.top = '0.2em'
            if (text === '“') result.style.right = '0.5em'
            else result.style.right = '0.7em'
          }
          return result
        }
        return function(node) {
          return replaceTextNodeIfMatched(node, regExp, newQuotationMarkElem)
        }
      })()
      return function() {
        var df = document.createDocumentFragment()
        df.appendChild(newTextNode(this.val))
        df = rotateNoVerticalChars(df)
        df = translateSutegana(df)
        df = translateQuotationMark(df)
        return df
      }
    })()
    return Text
  })()

  var Ascii = (function() {
    function Cache() {
      this.charToPxWidth = Object.create(null)
      this.fontPxSize = null
      Object.seal(this)
    }
    Cache.prototype.getFontPxSize = (function() {
      function calcFontPxSize() {
        var e = document.createElement('div')
        e.style.position = 'absolute'
        e.style.fontSize = GM_getFontSize()
        document.body.appendChild(e)
        try {
          var cs = window.getComputedStyle(e)
          return parseFloat(cs.fontSize)
        } finally { document.body.removeChild(e) }
      }
      return function() {
        var result = this.fontPxSize
        if (!result) this.fontPxSize = result = calcFontPxSize()
        return result
      }
    })()
    Cache.prototype.getCharPxWidth = (function() {
      function calcPxWidth(ch) {
        var e = document.createElement('pre')
        e.style.position = 'absolute'
        e.textContent = ch
        e.style.fontFamily = GM_getFontFamily()
        e.style.fontSize = GM_getFontSize()
        document.body.appendChild(e)
        try {
          var cs = window.getComputedStyle(e)
          return parseFloat(cs.width)
        } finally { document.body.removeChild(e) }
      }
      return function(ch) {
        var result = this.charToPxWidth[ch]
        if (!result) this.charToPxWidth[ch] = result = calcPxWidth(ch)
        return result
      }
    })()
  
    var cache = new Cache()
    function toIntEmLength(pxLength) {
      return Math.ceil(pxLength / cache.getFontPxSize())
    }
    function getTextPxWidth(str) {
      return Array.prototype.reduce.call(str, function(pre, ch) {
        return pre + cache.getCharPxWidth(ch)
      }, 0)
    }
    function getIntEmLength(str) { return toIntEmLength(getTextPxWidth(str)) }
    function compressWhiteSpaces(str) {
      return str.replace(/[ \t\r\n]+/g, ' ')
    }
    
    function Ascii(asciiText) {
      this.val = compressWhiteSpaces(asciiText)
      Object.freeze(this)
    }
    Ascii.clearCache = function() { cache = new Cache() }
    Ascii.prototype = Object.create(Block.prototype)
    Ascii.prototype.getLength = function() { return getIntEmLength(this.val) }
    Ascii.prototype.canCut = function(index) {
      var v = this.val, i = v.indexOf(' ')
      if (i === -1) return false
      return getIntEmLength(v.substring(0, i)) <= index
    }
    Ascii.prototype.cut = function(index) {
      var sub = this.val.split(' ')
      for (var i = 2, n = sub.length; i <= n; i++) {
        var pxLen = getTextPxWidth(sub.slice(0, i).join(' '))
        if (toIntEmLength(pxLen) >= index) break
      }
      return { before: new Ascii(sub.slice(0, i - 1).join(' '))
             , after: new Ascii(sub.slice(i - 1).join(' ')) }
    }
    Ascii.prototype.newNode = function() {
      var result = newRotatedElem(this.val)
      result.style.transformOrigin = '0.5em 0.5em 0px'
      result.style.webkitTransformOriginX = '0.5em'
      result.style.webkitTransformOriginY = '0.5em'
      result.style.textAlign = 'center'
      var em = this.getLength()
      result.style.width = em + 'em'
      result.style.marginBottom = (em - 1) + 'em'
      return result
    }
    return Ascii
  })()

  function Ruby(base, val, line) {
    this.base = base
    this.val = val
    this.line = line
    Object.freeze(this)
  }
  Ruby.parse = (function() {
    var map = { 'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お'
              , 'っ': 'つ', 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'ゎ': 'わ'
              , 'ァ': 'ア', 'ィ': 'イ', 'ゥ': 'ウ', 'ェ': 'エ', 'ォ': 'オ'
              , 'ッ': 'ツ', 'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ', 'ヮ': 'ワ'
              , 'ヵ': 'カ', 'ヶ': 'ケ'
              }
    var re = new RegExp(Object.keys(map).join('|'), 'g')
    function replaceSuteganaByBigChar(str) {
      return str.replace(re, function(match) { return map[match] })
    }
    return function(rubyElem) {
      var rb = '', rt = ''
      Array.prototype.forEach.call(rubyElem.childNodes, function(n) {
        if (n.tagName === 'RB') rb += n.textContent
        else if (n.tagName === 'RT') rt += n.textContent
        else if (n.nodeType === Node.TEXT_NODE) rb += n.nodeValue
      })
      rb = rb.trim()
      rt = replaceSuteganaByBigChar(rt.trim())
      return rb && rt ? new Ruby(Line.newByStr(rb), Line.newByStr(rt)) : null
    }
  })()
  Ruby.prototype = Object.create(Block.prototype)
  Ruby.prototype.hasRubyNeighbor = function() {
    if (!this.line) return false
    var blocks = this.line.blocks, i = blocks.indexOf(this)
    if (i === -1) return false
    return (blocks[i - 1] && blocks[i - 1] instanceof Ruby)
        || (blocks[i + 1] && blocks[i + 1] instanceof Ruby)
  }
  Ruby.prototype.getLength = function() {
    var rubyLen = this.val.getLength()
    var baseLen = this.base.getLength()
    var rubyLenCapacity = this.base.getLength() * 2
                          + (this.hasRubyNeighbor() ? 0 : 2)
    if (rubyLen <= rubyLenCapacity) return baseLen
    return baseLen + Math.ceil((rubyLen - rubyLenCapacity) / 2)
  }
  Ruby.prototype.canCut = function(index) { return false }
  Ruby.prototype.getRubyNodeTop = function() {
    var diff = this.base.getLength() * 2 - this.val.getLength()
    if (diff >= 0) return (diff * 0.5) + 'em'
    var top = diff % 2 ? -0.5 : -1
    return (this.hasRubyNeighbor() ? top + 1 : top) + 'em'
  }
  Ruby.prototype.newRubyNode = function() {
    var result = document.createElement('div')
    result.style.position = 'absolute'
    result.style.width = '1em'
    result.style.lineHeight = '1em'
    result.style.fontSize = '0.5em'
    result.style.top = this.getRubyNodeTop()
    result.style.left = '2em'
    Array.prototype.forEach.call(this.val.newNode().childNodes, function(n) {
      result.appendChild(n)
    })
    return result
  }
  Ruby.prototype.newBaseNode = function() {
    var result = document.createDocumentFragment()
    Array.prototype.forEach.call(this.base.newNode().childNodes, function(n) {
      result.appendChild(n)
    })
    return result
  }
  Ruby.prototype.getNodePadding = function() {
    var p = (this.getLength() - this.base.getLength()) * 0.5
    return p + 'em 0em'
  }
  Ruby.prototype.newNode = function() {
    var result = document.createElement('span')
    result.style.display = 'inline-block'
    result.style.position = 'relative'
    result.style.width = '1em'
    result.style.padding = this.getNodePadding()
    result.appendChild(this.newBaseNode())
    result.appendChild(this.newRubyNode())
    return result
  }
  Ruby.prototype.setLine = function(line) {
    return new Ruby(this.base, this.val, line)
  }
  Ruby.prototype.isEmphasized = function() {
    var bbs = this.base.blocks, rbs = this.val.blocks
    if (!(bbs.length === 1 && rbs.length === 1)) return false
    var bb = bbs[0], rb = rbs[0]
    if (!(bb instanceof Text && rb instanceof Text)) return false
    var bv = bb.val, rv = rb.val
    return bv.length === rv.length && /^([・﹅])\1*$/.test(rv)
  }
  Ruby.prototype.splitIntoEmphasisDots = function() {
    var bv = this.base.blocks[0].val
    return Array.prototype.map.call(bv, function(c) {
      return new Ruby(Line.newByStr(c), Line.newByStr('﹅'), this.line)
    }, this)
  }
  
  var Line = (function() {
    function addTextIfNotEmpty(blocks, str) {
      if (!str) return
      var t = new Text(str)
      if (!t.isEmpty()) blocks.push(t)
    }
    function parseText(blocks, text) {
      var re = /[\x21-\x7e][\x20-\x7e\n\t\r]*[\x21-\x7e]/g, begin = 0
      for (var r; r = re.exec(text);) {
        addTextIfNotEmpty(blocks, text.substring(begin, r.index))
        blocks.push(new Ascii(r[0]))
        begin = re.lastIndex
      }
      addTextIfNotEmpty(blocks, text.substring(begin))
    }
    
    function Line(blocks) {
      this.blocks = Object.freeze((blocks || []).map(function(b) {
        return b.setLine(this)
      }, this))
      Object.freeze(this)
    }
    Line.EMPTY = new Line()
    Line.parse = function(childNodes) {
      var blocks = [], text = ''
      Array.prototype.forEach.call(childNodes, function(n) {
        if (n.tagName === 'RUBY') {
          var ruby = Ruby.parse(n)
          if (ruby) {
            parseText(blocks, text)
            text = ''
            Array.prototype.push.apply(blocks, ruby.isEmphasized()
                                               ? ruby.splitIntoEmphasisDots()
                                               : [ruby])
          } else {
            text += n.textContent
          }
        } else {
          text += n.textContent
        }
      })
      parseText(blocks, text)
      return blocks.length ? new Line(blocks) : Line.EMPTY
    }
    Line.newByStr = function(str) { return Line.parse([newTextNode(str)]) }
    Line.prototype.getLength = function() {
      return this.blocks.reduce(function(pre, block) {
        return pre + block.getLength()
      }, 0)
    }
    Line.prototype.cut = (function() {
      function cut(block, index, before, after) {
        var o = block.cut(index)
        before.push(o.before)
        after.unshift(o.after)
      }
      function endsWithBadChar(blocks) {
        if (!blocks.length) return false
        var last = blocks[blocks.length - 1]
        return last.endsWithBadChar()
            && !(last.getLength() === 1 && blocks.length === 1)
      }
      function pollLastChar(before, after) {
        var b = before.pop()
        if (b.getLength() === 1) after.unshift(b)
        else cut(b, b.getLength() - 1, before, after)
      }
      function pollTopChar(after, before) {
        var b = after.shift()
        if (b.getLength() === 1) before.push(b)
        else cut(b, 1, before, after)
      }
      return function(index) {
        var after = this.blocks.slice(), before = []
        for (var b, begin = 0; b = after.shift(); begin += b.getLength()) {
          var end = begin + b.getLength()
          if (end === index) {
            before.push(b)
            break
          }
          if (begin <= index && index < end) {
            if (b.canCut(index - begin)) cut(b, index - begin, before, after)
            else if (begin === 0) before.push(b)
            else after.unshift(b)
            break
          }
          before.push(b)
        }
        if (endsWithBadChar(before)) {
          pollLastChar(before, after)
        } else if (after.length && after[0].startsWithBadChar()) {
          pollTopChar(after, before)
        }
        return after.length
             ? { before: new Line(before), after: new Line(after) }
             : { before: this, after: null }
      }
    })()
    Line.prototype.split = function(lineCharNum) {
      var result = [], line = this
      do {
        var o = line.cut(lineCharNum)
        result.push(o.before)
      } while (line = o.after)
      return result
    }
    Line.prototype.isEmpty = function() { return !this.blocks.length }
    Line.prototype.newNode = function() {
      var result = document.createElement('div')
      result.style.cssFloat = 'right'
      result.style.width = '1em'
      result.style.wordWrap = 'break-word'
      if (this.isEmpty()) {
        result.appendChild(newTextNode('　'))
      } else {
        this.blocks.forEach(function(b) { result.appendChild(b.newNode()) })
      }
      return result
    }
    return Line
  })()

  var Lines = {
    parse: (function() {
      function trim(lines) {
        var begin = 0, end = lines.length
        while (lines[begin] && lines[begin].isEmpty()) begin++
        while (lines[end - 1] && lines[end - 1].isEmpty()) end--
        return lines.slice(begin, end)
      }
      return function(childNodes) {
        var result = [], sub = []
        Array.prototype.forEach.call(childNodes, function(n) {
          if (n.tagName === 'BR' || n.tagName === 'P') {
            result.push(Line.parse(sub))
            sub = []
            if (n.tagName === 'P') {
              result.push(Line.EMPTY)
              result.push(Line.parse([n]))
              result.push(Line.EMPTY)
            }
          } else {
            sub.push(n)
          }
        })
        result.push(Line.parse(sub))
        return trim(result)
      }
    })()
  , split: function(lines, lineCharNum) {
      var result = []
      lines.forEach(function(line) {
        Array.prototype.push.apply(result, line.split(lineCharNum))
      })
      return result
    }
  }

  function Episode(obj) {
    this.novelTitle = obj.novelTitle || null
    this.chapterTitle = obj.chapterTitle || null
    this.author = obj.author || null
    this.title = obj.title || null
    this.text = Object.freeze((obj.text || []).slice())
    this.preface = Object.freeze((obj.preface || []).slice())
    this.postscript = Object.freeze((obj.postscript || []).slice())
    this.nextURL = obj.nextURL || ''
    this.prevURL = obj.prevURL || ''
    Object.freeze(this)
  }
  
  function Site() {}
  Site.prototype.newButton = function() {
    var result = document.createElement('button')
    result.textContent = '縦書き'
    result.style.padding = '0px 6px'
    result.addEventListener('click', this.showBookView.bind(this), false)
    result.addEventListener('click', function() { result.blur() }, false)
    return result
  }
  Site.prototype.showBookView = function() {
    var book = new Book(this.parse())
    var view = new BookView(book)
    book.setView(view)
    document.documentElement.style.overflowY = 'hidden'
    view.onhide = function() { document.documentElement.style.overflowY = '' }
    view.show()
  }
  
  var Narou = (function() {
    function isShortNovel() {
      return Boolean(document.querySelector('.novel_writername'))
    }
    function getParser() {
      return isShortNovel() ? new ShortParser() : new Parser()
    }
    function getNovelTitleDivSelector() {
      return isShortNovel() ? '.novel_title' : '.novel_subtitle'
    }
    
    function Parser() {}
    Parser.prototype.novelTitleSelector = '.contents1 > a:first-of-type'
    Parser.prototype.authorSelector = '.contents1 > a:last-of-type'
    Parser.prototype.titleSelector = '.novel_subtitle'
    Parser.prototype.getTitle = function() {
      var n = document.querySelector(this.titleSelector)
      return n && n.firstChild ? Line.parse([n.firstChild]) : null
    }
    Parser.prototype.getChapterTitle = function() {
      return getLine('.chapter_title')
    }
    Parser.prototype.parse = function() {
      var navSelector = '.novel_bn > a'
      return new Episode({
        novelTitle: getLine(this.novelTitleSelector)
      , chapterTitle: this.getChapterTitle()
      , author: getLine(this.authorSelector)
      , title: this.getTitle()
      , text: getLines('#novel_honbun')
      , preface: getLines('#novel_p')
      , postscript: getLines('#novel_a')
      , nextURL: getHRef(navSelector, '次の話\xA0>>')
      , prevURL: getHRef(navSelector, '<<\xA0前の話')
      })
    }
    
    function ShortParser() {}
    ShortParser.prototype = Object.create(Parser.prototype)
    ShortParser.prototype.novelTitleSelector = '.series_title > a'
    ShortParser.prototype.authorSelector = '.novel_writername > a'
    ShortParser.prototype.titleSelector = '.novel_title'
    ShortParser.prototype.getChapterTitle = function() { return null }
    
    function Narou() {}
    Narou.prototype = Object.create(Site.prototype)
    Narou.prototype.is = function(location) {
      var h = location.hostname
      return (h === 'ncode.syosetu.com' || h === 'novel18.syosetu.com')
          && /^\/n\d+[a-z]+/.test(location.pathname)
          && Boolean(document.getElementById('novel_honbun'))
    }
    Narou.prototype.parse = function() { return getParser().parse() }
    Narou.prototype.addButton = function() {
      var d = document.querySelector(getNovelTitleDivSelector())
      d.appendChild(this.newButton())
    }
    return Narou
  })()

  var Arcadia = (function() {
    function getAuthor() {
      var n = document.querySelector('.bgc > table td:first-child tt')
      var s = /^Name: ([^◆]+)/.exec(n.textContent)[1]
      return Line.parse([newTextNode(s)])
    }
    function getTitleFontElem() { return document.querySelector('.bgb font') }
    
    function Arcadia() {}
    Arcadia.prototype = Object.create(Site.prototype)
    Arcadia.prototype.is = function(location) {
      return location.hostname === 'www.mai-net.net'
          && location.pathname === '/bbs/sst/sst.php'
          && hasParam(location, 'act', 'dump')
          && hasParam(location, 'all', /[0-9]+/)
    }
    Arcadia.prototype.parse = function() {
      var navSelector = '.bgc > table td[align="right"] a'
      return new Episode({ author: getAuthor()
                         , title: Line.parse(getTitleFontElem().childNodes)
                         , text: getLines('.bgc blockquote div')
                         , nextURL: getHRef(navSelector, '次を表示する')
                         , prevURL: getHRef(navSelector, '前を表示する')
                         })
    }
    Arcadia.prototype.addButton = function() {
      getTitleFontElem().parentNode.appendChild(this.newButton())
    }
    return Arcadia
  })()

  var Hameln = (function() {
    function isEpisodeListPage() {
      return Boolean(document.querySelector('#maind > .ss > table'))
    }
    function hasPreface() {
      return Boolean(document.getElementById('maegaki'))
    }
    function hasPostscript() {
      return Boolean(document.getElementById('atogaki'))
    }
    function hasTextOnly() { return !(hasPreface() || hasPostscript()) }
    function hasPostscriptOnly() { return !hasPreface() && hasPostscript() }
    function getParser() {
      if (hasTextOnly() || hasPostscriptOnly()) return new Parser2()
      return new Parser()
    }
    var novelTitleAnchorSelector = '.ss > p > font > a'
    
    function Parser() {}
    Parser.prototype.titleSelector = '.ss > font'
    Parser.prototype.textSelector = '.ss > font'
    Parser.prototype.getTextLines = function() {
      var n = document.querySelector(this.textSelector), nodes = []
      for (var s = n; (s = s.nextSibling) && s.tagName !== 'HR';) nodes.push(s)
      return Lines.parse(nodes)
    }
    Parser.prototype.parse = function() {
      var navSelector = '.ss > div:last-of-type > a'
      return new Episode({ novelTitle: getLine(novelTitleAnchorSelector)
                         , author: getLine('.ss > p > a:first-of-type')
                         , title: getLine(this.titleSelector)
                         , text: this.getTextLines()
                         , preface: getLines('#maegaki')
                         , postscript: getLines('#atogaki')
                         , nextURL: getHRef(navSelector, '次の話 >>')
                         , prevURL: getHRef(navSelector, '<< 前の話')
                         })
    }
    
    function Parser2() {}
    Parser2.prototype = Object.create(Parser.prototype)
    Parser2.prototype.titleSelector = '.ss > p > font:last-of-type'
    Parser2.prototype.textSelector = '.ss > p > font:last-of-type'
    
    function Hameln() {}
    Hameln.prototype = Object.create(Site.prototype)
    Hameln.prototype.is = function(location) {
      return location.hostname === 'novel.syosetu.org'
          && /^\/\d+\/(\d+\.html)?/.test(location.pathname)
          && !isEpisodeListPage()
    }
    Hameln.prototype.parse = function() { return getParser().parse() }
    Hameln.prototype.addButton = function() {
      var a = document.querySelector(novelTitleAnchorSelector)
      var fontElem = a.parentNode
      fontElem.parentNode.insertBefore(this.newButton(), fontElem.nextSibling)
    }
    return Hameln
  })()

  var Pixiv = (function() {
    var titleSelector = '.work-info .title'
    function getTitle() {
      var e = document.querySelector(titleSelector)
      return e && e.firstChild ? Line.parse([e.firstChild]) : null
    }
    function newBR() { return document.createElement('br') }
    function getTextLines() {
      var nodes = document.querySelectorAll('#preview_area > .novel_article')
      var children = []
      Array.prototype.forEach.call(nodes, function(node) {
        Array.prototype.push.apply(children, node.childNodes)
        children.push(newBR(), newBR())
      })
      return Lines.parse(children)
    }
    
    function Pixiv() {}
    Pixiv.prototype = Object.create(Site.prototype)
    Pixiv.prototype.is = function(location) {
      return location.hostname === 'www.pixiv.net'
          && location.pathname === '/novel/show.php'
          && hasParam(location, 'id', /\d+/)
    }
    Pixiv.prototype.parse = function() {
      return new Episode({ title: getTitle()
                         , author: getLine('.user')
                         , text: getTextLines()
                         })
    }
    Pixiv.prototype.addButton = function() {
      document.querySelector(titleSelector).appendChild(this.newButton())
    }
    return Pixiv
  })()

  var Akatsuki = (function() {
    function selector(suffix) {
      return '#contents-inner2 > div.box.story > div.box.story ' + suffix
    }
    function getH2() {
      var h2 = document.querySelector(selector('h2'))
      var s = ''
      for (var n = h2.firstChild; n !== h2.lastChild; n = n.nextSibling) {
        if (n.tagName === 'BR') s += '　'
        else s += n.textContent
      }
      return { title: Line.parse([h2.lastChild])
             , chapterTitle: s ? Line.newByStr(s.trim()) : null
             }
    }
    function href(selector) {
      var a = document.querySelector(selector)
      return a ? a.href : ''
    }
    function getNovelTitle() {
      var h1 = document.querySelector(selector('h1'))
      return Line.newByStr(h1.firstChild.textContent)
    }
    function getUnbalancedContent(nodeList) {
      if (nodeList[0].previousSibling.textContent === '前書き') {
        return { preface: Lines.parse(nodeList[0].childNodes)
               , text: Lines.parse(nodeList[1].childNodes)
               , postscript: null
               }
      }
      return { preface: null
             , text: Lines.parse(nodeList[0].childNodes)
             , postscript: Lines.parse(nodeList[1].childNodes)
             }
    }
    function getContent() {
      var nl = document.querySelectorAll(selector('.body-novel'))
      switch (nl.length) {
        case 1: return { text: Lines.parse(nl[0].childNodes)
                       , preface: null
                       , postscript: null }
        case 2: return getUnbalancedContent(nl)
        case 3: return { text: Lines.parse(nl[1].childNodes)
                       , preface: Lines.parse(nl[0].childNodes)
                       , postscript: Lines.parse(nl[2].childNodes)
                       }
        default: throw new Error(nl.length)
      }
    }
    
    function Akatsuki() {}
    Akatsuki.prototype = Object.create(Site.prototype)
    Akatsuki.prototype.is = function(location) {
      return location.hostname === 'www.akatsuki-novels.com'
          && /\/stories\/view\/\d+\/novel_id~\d+/.test(location.pathname)
    }
    Akatsuki.prototype.parse = function() {
      var h2 = getH2(), c = getContent()
      return new Episode({ novelTitle: getNovelTitle()
                         , chapterTitle: h2.chapterTitle
                         , title: h2.title
                         , author: getLine(selector('a[href^="/users/view/"]'))
                         , text: c.text
                         , preface: c.preface
                         , postscript: c.postscript
                         , nextURL: href(selector('.paging_for_view .next a'))
                         , prevURL: href(selector('.paging_for_view .prev a'))
                         })
    }
    Akatsuki.prototype.addButton = function() {
      document.querySelector(selector('h1')).appendChild(this.newButton())
    }
    return Akatsuki
  })()

  var Book = (function() {
    function newPageLines(lines, lineNum) {
      var result = []
      for (var i = 0, n = lines.length; i < n; i += lineNum) {
        result.push(lines.slice(i, i + lineNum))
      }
      return result
    }
    function joinTopPageItems(episode) {
      return [ episode.novelTitle
             , episode.chapterTitle
             , episode.title
             , episode.author
             ].filter(function(line) { return line !== null })
    }
    
    function RangedLine(begin, pageLines) {
      this.begin = begin
      this.end = begin + pageLines.length
      this.pageLines = Object.freeze(pageLines.slice())
      Object.freeze(this)
    }
    RangedLine.prototype.contain = function(pageIndex) {
      return this.begin <= pageIndex && pageIndex < this.end
    }
    RangedLine.prototype.getLines = function(pageIndex) {
      return this.pageLines[pageIndex - this.begin]
    }
    
    function Book(episode) {
      this.episode = episode
      this.topLines = joinTopPageItems(episode)
      this.prefaceLines = episode.preface.length
                          ? [ Line.newByStr('まえがき')
                            , Line.EMPTY
                            ].concat(episode.preface)
                          : []
      this.postscriptLines = episode.postscript.length
                             ? [ Line.newByStr('あとがき')
                               , Line.EMPTY
                               ].concat(episode.postscript)
                             : []
      this.lineCharNum = GM_getLineCharNum()
      this.lineNum = GM_getLineNum()
      this.rangedLines = this.newRangedLines()
      this.pageNum = this.rangedLines[this.rangedLines.length - 1].end
      this.pageIndex = 0
      this.view = null
      Object.seal(this)
    }
    Book.prototype.setView = function(view) {
      this.view = view
      view.update()
    }
    Book.prototype.newRangedLine = function(begin, lines) {
      return new RangedLine(begin
                          , newPageLines(Lines.split(lines, this.lineCharNum)
                                       , this.lineNum))
    }
    Book.prototype.newRangedLines = function() {
      var top = this.newRangedLine(0, this.topLines)
      var preface = this.newRangedLine(top.end, this.prefaceLines)
      var text = this.newRangedLine(preface.end, this.episode.text)
      var postscript = this.newRangedLine(text.end, this.postscriptLines)
      return [top, preface, text, postscript]
    }
    Book.prototype.update = function() {
      this.rangedLines = this.newRangedLines()
      this.pageNum = this.rangedLines[this.rangedLines.length - 1].end
      this.pageIndex = Math.min(this.pageIndex, this.pageNum - 1)
      this.view.update()
    }
    Book.prototype.setLineCharNum = function(lineCharNum) {
      var n = Math.max(lineCharNum, 1)
      if (this.lineCharNum === n) return
      this.lineCharNum = n
      this.update()
    }
    Book.prototype.setLineNum = function(lineNum) {
      var n = Math.max(lineNum, 1)
      if (this.lineNum === n) return
      this.lineNum = n
      this.update()
    }
    Book.prototype.getRangedLine = function() {
      var rls = this.rangedLines
      for (var i = 0, n = rls.length; i < n; i++) {
        var rl = rls[i]
        if (rl.contain(this.pageIndex)) return rl
      }
      throw new Error(this.pageIndex)
    }
    Book.prototype.setPageIndex = function(pageIndex) {
      var i = Math.min(Math.max(pageIndex, 0), this.pageNum - 1)
      if (this.pageIndex === i) return
      this.pageIndex = i
      this.view.update()
    }
    Book.prototype.turnPage = function() {
      this.setPageIndex(this.pageIndex + 1)
    }
    Book.prototype.returnPage = function() {
      this.setPageIndex(this.pageIndex - 1)
    }
    Book.prototype.begin = function() { this.setPageIndex(0) }
    Book.prototype.end = function() { this.setPageIndex(this.pageNum - 1) }
    Book.prototype.loadNextEpisode = function() {
      var u = this.episode.nextURL
      if (!u) return
      _setValue('auto', true)
      window.location.assign(u)
    }
    Book.prototype.loadPrevEpisode = function() {
      var u = this.episode.prevURL
      if (!u) return
      _setValue('auto', true)
      window.location.assign(u)
    }
    Book.prototype.isTop = function() { return this.pageIndex === 0 }
    Book.prototype.isLast = function() {
      return this.pageIndex === this.pageNum - 1
    }
    Book.prototype.getLines = function() {
      return this.getRangedLine().getLines(this.pageIndex)
    }
    return Book
  })()

  var Key = { ESCAPE: 27
            , SPACE: 32
            , END: 35
            , HOME: 36
            , LEFT: 37
            , UP: 38
            , RIGHT: 39
            , DOWN: 40
            , E: 69
            , H: 72
            , N: 78
            , P: 80
            , SLASH: 191
            }

  function KeyMap() {
    this.entries = []
    this.keyDownListener = this.keyDowned.bind(this)
    Object.freeze(this)
  }
  KeyMap.prototype.add = function(key, action) {
    var entry = { action: action }
    if (typeof(key) === 'object') {
      entry.keyCode = key.keyCode
      entry.shift = key.shift
    } else {
      entry.keyCode = key
      entry.shift = false
    }
    this.entries.push(entry)
  }
  KeyMap.prototype.keyDowned = function(keyEvent) {
    this.entries.filter(function(entry) {
      return !keyEvent.altKey
          && !keyEvent.ctrlKey
          && !keyEvent.metaKey
          && keyEvent.shiftKey === entry.shift
          && keyEvent.keyCode === entry.keyCode
    }).forEach(function(entry) {
      keyEvent.stopImmediatePropagation()
      entry.action()
    })
  }

  var BookView = (function() {
    function newLineBox() {
      var result = document.createElement('div')
      result.style.marginTop = GM_getMarginTop()
      result.style.lineHeight = '1em'
      result.style.fontSize = GM_getFontSize()
      result.style.display = 'inline-block'
      result.style.fontFamily = GM_getFontFamily()
      return result
    }
    function newRoot(lineBox) {
      var result = document.createElement('div')
      result.style.position = 'fixed'
      result.style.top = '0px'
      result.style.left = '0px'
      result.style.width = '100%'
      result.style.height = '100%'
      result.style.backgroundColor = GM_getBackgroundColor()
      result.style.color = GM_getColor()
      result.style.textAlign = 'center'
      result.appendChild(lineBox)
      return result
    }
    var wheelEventType = (function () {
      if ('onwheel' in document) return 'wheel'
      if ('onmousewheel' in document) return 'mousewheel'
      return ''
    })()
    function newNumElem() {
      var result = document.createElement('span')
      result.textContent = '0'
      result.style.display = 'inline-block'
      result.style.width = '3em'
      return result
    }
    function newPageIndexElem() {
      var result = newNumElem()
      result.style.textAlign = 'right'
      return result
    }
    function newPageNumElem() {
      var result = newNumElem()
      result.style.textAlign = 'left'
      return result
    }
    var newButton = (function() {
      var preventFocus = function(e) { e.target.blur() }
      return function(textContent, clickListener, title) {
        var result = document.createElement('button')
        result.textContent = textContent
        result.addEventListener('click', clickListener, false)
        result.addEventListener('focus', preventFocus, false)
        if (title) result.title = title
        result.style.width = '3em'
        result.style.padding = '0px'
        return result
      }
    })()
    function setSpaceBetweenLines(lineBox, spaceBetweenLines) {
      var sp = spaceBetweenLines || GM_getSpaceBetweenLines()
      var cn = lineBox.childNodes
      for (var i = 0, n = cn.length - 1; i < n; i++) {
        cn[i].style.marginLeft = sp
      }
    }
    
    function BookView(book) {
      this.book = book
      this.lineBox = newLineBox()
      this.root = newRoot(this.lineBox)
      this.pageIndexElem = newPageIndexElem()
      this.pageNumElem = newPageNumElem()
      this.turnPageButton = newButton('<'
                                    , book.turnPage.bind(book)
                                    , '次のページ')
      this.returnPageButton = newButton('>'
                                      , book.returnPage.bind(book)
                                      , '前のページ')
      this.endButton = newButton('|<', book.end.bind(book), '最後のページ')
      this.beginButton = newButton('>|', book.begin.bind(book), '最初のページ')
      this.loadNextEpisodeButton = newButton('<<'
                                           , book.loadNextEpisode.bind(book)
                                           , '次の話')
      this.loadPrevEpisodeButton = newButton('>>'
                                           , book.loadPrevEpisode.bind(book)
                                           , '前の話')
      this.listShortcutKeysButton = newButton('?'
                                            , this.listShortcutKeys.bind(this)
                                            , 'ショートカットキー一覧')
      this.showConfigDialogButton = newButton('設定'
                                            , this.showConfigDialog.bind(this))
      this.toolbar = this.newToolbar()
      this.keyDownListener = this.newKeyDownListener()
      this.wheelListener = this.wheeled.bind(this)
      this.mouseMoveListener = this.mouseMoved.bind(this)
      this.shortcutKeyList = null
      this.configDialog = null
      this.hiddenNodes = []
      this.onhide = null
      Object.seal(this)
    }
    BookView.prototype.newNavigator = function() {
      var result = document.createElement('span')
      result.appendChild(this.loadNextEpisodeButton)
      result.appendChild(this.endButton)
      result.appendChild(this.turnPageButton)
      result.appendChild(this.pageIndexElem)
      result.appendChild(newTextNode('/'))
      result.appendChild(this.pageNumElem)
      result.appendChild(this.returnPageButton)
      result.appendChild(this.beginButton)
      result.appendChild(this.loadPrevEpisodeButton)
      return result
    }
    BookView.prototype.newRightBottomBox = function() {
      var result = document.createElement('div')
      result.style.position = 'absolute'
      result.style.right = '0px'
      result.style.bottom = '0px'
      result.appendChild(this.listShortcutKeysButton)
      result.appendChild(this.showConfigDialogButton)
      result.appendChild(newButton('X', this.hide.bind(this), '閉じる'))
      return result
    }
    BookView.prototype.newToolbar = function() {
      var result = document.createElement('div')
      result.style.position = 'absolute'
      result.style.left = '0px'
      result.style.bottom = '0px'
      result.style.width = '100%'
      result.style.fontFamily = Default.GOTHIC_FONT_FAMILY
      result.style.fontSize = '16px'
      result.style.backgroundColor = GM_getBackgroundColor()
      result.style.display = GM_isToolbarVisible() ? '' : 'none'
      result.appendChild(this.newNavigator())
      result.appendChild(this.newRightBottomBox())
      this.root.appendChild(result)
      return result
    }
    BookView.prototype.escKeyDowned = function() {
      if (this.shortcutKeyList) this.shortcutKeyList.hide()
      else if (this.configDialog) this.configDialog.hide()
      else this.hide()
    }
    BookView.prototype.newKeyDownListener = function() {
      var b = this.book
      var km = new KeyMap()
      km.add(Key.SPACE, b.turnPage.bind(b))
      km.add(Key.LEFT, b.turnPage.bind(b))
      km.add(Key.RIGHT, b.returnPage.bind(b))
      km.add({ keyCode: Key.SPACE, shift: true }, b.returnPage.bind(b))
      km.add(Key.H, b.begin.bind(b))
      km.add(Key.HOME, b.begin.bind(b))
      km.add(Key.E, b.end.bind(b))
      km.add(Key.END, b.end.bind(b))
      km.add(Key.N, b.loadNextEpisode.bind(b))
      km.add(Key.DOWN, b.loadNextEpisode.bind(b))
      km.add(Key.P, b.loadPrevEpisode.bind(b))
      km.add(Key.UP, b.loadPrevEpisode.bind(b))
      km.add(Key.ESCAPE, this.escKeyDowned.bind(this))
      km.add({ keyCode: Key.SLASH, shift: true }
           , this.listShortcutKeys.bind(this))
      return km.keyDownListener
    }
    BookView.prototype.addListeners = function() {
      window.addEventListener('keydown', this.keyDownListener, true)
      window.addEventListener('mousemove', this.mouseMoveListener, false)
      if (wheelEventType) {
        window.addEventListener(wheelEventType, this.wheelListener, false)
      }
    }
    BookView.prototype.removeListeners = function() {
      window.removeEventListener('keydown', this.keyDownListener, true)
      window.removeEventListener('mousemove', this.mouseMoveListener, false)
      if (wheelEventType) {
        window.removeEventListener(wheelEventType, this.wheelListener, false)
      }
    }
    BookView.prototype.hideBodyChildNodes = function() {
      this.hiddenNodes = []
      Array.prototype.filter.call(document.body.childNodes, function(child) {
        return child.nodeType === Node.ELEMENT_NODE
      }).forEach(function(elem) {
        var s = window.getComputedStyle(elem)
        if (s.display !== 'none') {
          elem.style.display = 'none'
          this.hiddenNodes.push(elem)
        }
      }, this)
    }
    BookView.prototype.restoreHiddenBodyChildNodes = function() {
      this.hiddenNodes.forEach(function(n) { n.style.display = '' })
    }
    BookView.prototype.show = function() {
      this.hideBodyChildNodes()
      document.body.appendChild(this.root)
      this.addListeners()
    }
    BookView.prototype.hide = function() {
      this.removeListeners()
      this.root.parentNode.removeChild(this.root)
      this.restoreHiddenBodyChildNodes()
      if (this.onhide) this.onhide()
    }
    BookView.prototype.clear = function() {
      var b = this.lineBox
      while (b.hasChildNodes()) b.removeChild(b.firstChild)
    }
    BookView.prototype.padLines = function() {
      var paddingLineNum = this.book.lineNum - this.book.getLines().length
      for (var i = 0; i < paddingLineNum; i++) {
        this.lineBox.appendChild(Line.EMPTY.newNode())
      }
    }
    BookView.prototype.writeLines = function() {
      this.book.getLines().forEach(function(line) {
        this.lineBox.appendChild(line.newNode())
      }, this)
    }
    BookView.prototype.updateButtonDisabled = function() {
      var b = this.book
      this.loadNextEpisodeButton.disabled = !b.episode.nextURL
      this.loadPrevEpisodeButton.disabled = !b.episode.prevURL
      this.turnPageButton.disabled = b.isLast()
      this.endButton.disabled = b.isLast()
      this.returnPageButton.disabled = b.isTop()
      this.beginButton.disabled = b.isTop()
    }
    BookView.prototype.updatePageIndexAndPageNum = function() {
      this.pageIndexElem.textContent = this.book.pageIndex + 1
      this.pageNumElem.textContent = this.book.pageNum
    }
    BookView.prototype.update = function() {
      this.clear()
      this.writeLines()
      if (!this.book.isTop()) this.padLines()
      setSpaceBetweenLines(this.lineBox)
      this.updateButtonDisabled()
      this.updatePageIndexAndPageNum()
    }
    BookView.prototype.wheeled = (function() {
      function convert(e) {
        if (e.deltaY) return { down: e.deltaY > 0, up: e.deltaY < 0 }
        return e.wheelDelta
             ? { down: e.wheelDelta < 0, up: e.wheelDelta > 0 }
             : null
      }
      return function(e) {
        var wheel = convert(e)
        if (!wheel) return
        if (wheel.down) this.book.turnPage()
        else if (wheel.up) this.book.returnPage()
      }
    })()
    BookView.prototype.showConfigDialog = function() {
      if (this.configDialog) return
      this.showConfigDialogButton.disabled = true
      this.configDialog = new ConfigDialog(this.book, this)
      this.configDialog.onhide = (function() {
        this.configDialog = null
        this.showConfigDialogButton.disabled = false
      }).bind(this)
      this.configDialog.show(this.root)
    }
    BookView.prototype.listShortcutKeys = function() {
      if (this.shortcutKeyList) return
      this.listShortcutKeysButton.disabled = true
      this.shortcutKeyList = new ShortcutKeyList()
      this.shortcutKeyList.onhide = (function() {
        this.shortcutKeyList = null
        this.listShortcutKeysButton.disabled = false
      }).bind(this)
      this.shortcutKeyList.show(this.root)
    }
    BookView.prototype.setFontType = function(fontType) {
      this.lineBox.style.fontFamily = GM_getFontFamily(fontType)
    }
    BookView.prototype.setFontFamily = function(fontFamily) {
      this.lineBox.style.fontFamily = fontFamily
    }
    BookView.prototype.setFontSize = function(fontSize) {
      this.lineBox.style.fontSize = fontSize
    }
    BookView.prototype.setMarginTop = function(marginTop) {
      this.lineBox.style.marginTop = marginTop
    }
    BookView.prototype.setSpaceBetweenLines = function(spaceBetweenLines) {
      setSpaceBetweenLines(this.lineBox, spaceBetweenLines)
    }
    BookView.prototype.setColor = function(color) {
      this.root.style.color = color
    }
    BookView.prototype.setBackgroundColor = function(backgroundColor) {
      this.root.style.backgroundColor = backgroundColor
      this.toolbar.style.backgroundColor = backgroundColor
    }
    BookView.prototype.setToolbarVisible = function(visible) {
      this.toolbar.style.display = visible ? '' : 'none'
    }
    BookView.prototype.mouseMoved = (function() {
      var toolbarVisibleToggleHeight = 50
      function onToolbarVisibleArea(clientY) {
        return clientY >= window.innerHeight - toolbarVisibleToggleHeight
      }
      return function(mouseEvent) {
        if (GM_isToolbarVisible()) return
        this.toolbar.style.display = onToolbarVisibleArea(mouseEvent.clientY)
                                     ? ''
                                     : 'none'
      }
    })()
    return BookView
  })()

  function Dialog() {
    this.root = this.newRoot()
    this.onhide = null
  }
  Dialog.prototype.newRoot = function() {
    var result = document.createElement('div')
    result.style.position = 'absolute'
    result.style.fontFamily = Default.GOTHIC_FONT_FAMILY
    result.style.fontSize = '16px'
    result.style.backgroundColor = 'white'
    result.style.color = 'black'
    result.style.padding = '0px 5px 5px'
    result.appendChild(this.newTopBar())
    return result
  }
  Dialog.prototype.newTopBar = function() {
    var result = document.createElement('div')
    result.style.textAlign = 'right'
    result.appendChild(this.newCloseButton())
    return result
  }
  Dialog.prototype.newCloseButton = function() {
    var result = document.createElement('button')
    result.textContent = 'X'
    result.style.width = '3em'
    result.addEventListener('click', this.hide.bind(this), false)
    return result
  }
  Dialog.prototype.center = function() {
    var cs = getComputedStyle(this.root)
    var h = parseInt(cs.height, 10)
    var w = parseInt(cs.width, 10)
    this.root.style.top = ((window.innerHeight - h) / 2) + 'px'
    this.root.style.left = ((window.innerWidth - w) / 2) + 'px'
  }
  Dialog.prototype.show = function(owner) {
    owner.appendChild(this.root)
    this.center()
  }
  Dialog.prototype.hide = function() {
    this.root.parentNode.removeChild(this.root)
    if (this.onhide) this.onhide()
  }
  
  var ShortcutKeyList = (function() {
    function newList() {
      var result = document.createElement('table')
      result.style.textAlign = 'left'
      result.style.borderCollapse = 'collapse'
      result.style.color = 'black'
     ;[ ['←, スペース', '次のページ']
      , ['→, Shift+スペース', '前のページ']
      , ['End, e', '最後のページ']
      , ['Home, h', '先頭のページ']
      , ['↓, n', '次の話']
      , ['↑, p', '前の話']
      , ['?', 'ショートカットキー一覧']
      , ['Esc', '閉じる']
      ].forEach(function(e) {
        var row = result.insertRow(-1)
        insertCell(row, e[0])
        insertCell(row, e[1])
      })
      return result
    }

    function ShortcutKeyList() {
      Dialog.call(this)
      this.root.appendChild(newList())
      Object.seal(this)
    }
    ShortcutKeyList.prototype = Object.create(Dialog.prototype)
    return ShortcutKeyList
  })()

  var ConfigDialog = (function() {
    function newColorCellChild() {
      var colorBox = document.createElement('span')
      colorBox.innerHTML = '&nbsp;'
      colorBox.style.display = 'inline-block'
      colorBox.style.width = '1em'
      colorBox.style.height = '100%'
      colorBox.style.marginRight = '8px'
      colorBox.style.border = '1px solid'
      var result = document.createDocumentFragment()
      result.appendChild(colorBox)
      result.appendChild(newTextNode(''))
      return result
    }
    function setColorCell(cell, color) {
      cell.firstChild.style.backgroundColor = color
      cell.lastChild.nodeValue = color
    }
    function newRadio(value, clickListener) {
      var result = document.createElement('input')
      result.type = 'radio'
      result.name = 'font-type'
      result.value = value
      result.addEventListener('click', clickListener, false)
      return result
    }
    function newLabel(inputElem, text) {
      var result = document.createElement('label')
      result.appendChild(inputElem)
      result.appendChild(newTextNode(text))
      return result
    }
    function newButton(clickListener, textContent) {
      var result = document.createElement('button')
      result.textContent = textContent || '変更'
      result.style.padding = '0px 6px'
      result.addEventListener('click', clickListener, false)
      return result
    }
    var promptCssPropertyValue = (function() {
      function isValidCssPropertyValue(propertyName, propertyValue) {
        var e = document.createElement('span')
        e.style[propertyName] = propertyValue
        return e.style[propertyName] !== ''
      }
      return function(propertyName, message, initValue) {
        var r = window.prompt(message, initValue)
        return r && isValidCssPropertyValue(propertyName, r) ? r : null
      }
    })()
    function promptInteger(message, initValue) {
      var r = parseInt(window.prompt(message, initValue), 10)
      return isNaN(r) ? null : r
    }
    function newDiv() {
      var result = document.createElement('div')
      result.style.textAlign = 'left'
      result.style.marginTop = '5px'
      return result
    }

    function ConfigDialog(book, bookView) {
      Dialog.call(this)
      this.book = book
      this.bookView = bookView
      this.gothicRadio = newRadio('gothic'
                                , this.fontTypeRadioClicked.bind(this))
      this.minchoRadio = newRadio('mincho'
                                , this.fontTypeRadioClicked.bind(this))
      this.toolbarVisibleCheckbox = this.newToolbarVisibleCheckbox()
      this.root.appendChild(this.newConfigTable())
      this.root.appendChild(this.newToolbarVisibleDiv())
      this.root.appendChild(this.newConfigClearDiv())
      this.setConfigValues()
      Object.seal(this)
    }
    ConfigDialog.prototype = Object.create(Dialog.prototype)
    ConfigDialog.prototype.newToolbarVisibleCheckbox = function() {
      var result = document.createElement('input')
      result.type = 'checkbox'
      result.addEventListener('click', (function() {
        this.bookView.setToolbarVisible(result.checked)
        _setValue('toolbarVisible', result.checked)
      }).bind(this), false)
      return result
    }
    ConfigDialog.prototype.newToolbarVisibleDiv = function() {
      var result = newDiv()
      result.style.textAlign = 'left'
      result.style.marginTop = '5px'
      result.appendChild(newLabel(this.toolbarVisibleCheckbox
                                , 'ツールバーを常に表示する'))
      return result
    }
    ConfigDialog.prototype.insertFontRows = function(table) {
      var gothicRow = table.insertRow(-1)
      insertCell(gothicRow, 'フォント').rowSpan = 2
      insertCell(gothicRow, newLabel(this.gothicRadio, 'ゴシック'))
      insertCell(gothicRow
               , newButton(this.gothicFontEditButtonClicked.bind(this)))
      var minchoRow = table.insertRow(-1)
      insertCell(minchoRow, newLabel(this.minchoRadio, '明朝'))
      insertCell(minchoRow
               , newButton(this.minchoFontEditButtonClicked.bind(this)))
    }
    ConfigDialog.prototype.insertRow = function(table
                                              , configName
                                              , configValueCellName
                                              , clickListener
                                              , valueCellChild) {
      var row = table.insertRow(-1)
      insertCell(row, configName)
      this[configValueCellName] = insertCell(row, valueCellChild)
      insertCell(row, newButton(clickListener))
    }
    ConfigDialog.prototype.newConfigTable = function() {
      var result = document.createElement('table')
      result.style.textAlign = 'left'
      result.style.borderCollapse = 'collapse'
      result.style.color = 'black'
      this.insertFontRows(result)
      this.insertRow(result
                   , 'フォントサイズ'
                   , 'fontSizeCell'
                   , this.fontSizeEditButtonClicked.bind(this))
      this.insertRow(result
                   , '行数'
                   , 'lineNumCell'
                   , this.lineNumEditButtonClicked.bind(this))
      this.insertRow(result
                   , '一行の文字数'
                   , 'lineCharNumCell'
                   , this.lineCharNumEditButtonClicked.bind(this))
      this.insertRow(result
                   , '上余白'
                   , 'marginTopCell'
                   , this.marginTopEditButtonClicked.bind(this))
      this.insertRow(result
                   , '行間'
                   , 'spaceBetweenLinesCell'
                   , this.spaceBetweenLinesEditButtonClicked.bind(this))
      this.insertRow(result
                   , '文字色'
                   , 'colorCell'
                   , this.colorEditButtonClicked.bind(this)
                   , newColorCellChild())
      this.insertRow(result
                   , '背景色'
                   , 'backgroundColorCell'
                   , this.backgroundColorEditButtonClicked.bind(this)
                   , newColorCellChild())
      return result
    }
    ConfigDialog.prototype.newConfigClearDiv = function() {
      var result = newDiv()
      result.appendChild(newButton(this.clearConfigButtonClicked.bind(this)
                                 , '初期設定に戻す'))
      return result
    }
    ConfigDialog.prototype.setConfigValues = function() {
      this.gothicRadio.checked = GM_getFontType() === 'gothic'
      this.minchoRadio.checked = GM_getFontType() === 'mincho'
      this.fontSizeCell.textContent = GM_getFontSize()
      this.lineNumCell.textContent = GM_getLineNum()
      this.lineCharNumCell.textContent = GM_getLineCharNum()
      this.marginTopCell.textContent = GM_getMarginTop()
      this.spaceBetweenLinesCell.textContent = GM_getSpaceBetweenLines()
      setColorCell(this.colorCell, GM_getColor())
      setColorCell(this.backgroundColorCell, GM_getBackgroundColor())
      this.toolbarVisibleCheckbox.checked = GM_isToolbarVisible()
    }
    ConfigDialog.prototype.notifyConfigCleared = function() {
      this.book.setLineNum(GM_getLineNum())
      this.book.setLineCharNum(GM_getLineCharNum())
      this.bookView.setFontType(GM_getFontType())
      this.bookView.setFontSize(GM_getFontSize())
      this.bookView.setMarginTop(GM_getMarginTop())
      this.bookView.setSpaceBetweenLines(GM_getSpaceBetweenLines())
      this.bookView.setColor(GM_getColor())
      this.bookView.setBackgroundColor(GM_getBackgroundColor())
      this.bookView.setToolbarVisible(GM_isToolbarVisible())
    }
    ConfigDialog.prototype.clearConfigButtonClicked = function() {
      GM_clear()
      this.setConfigValues()
      this.notifyConfigCleared()
      Ascii.clearCache()
      this.book.update()
    }
    ConfigDialog.prototype.fontTypeRadioClicked = function() {
     ;[this.gothicRadio, this.minchoRadio].forEach(function(e) {
        if (!e.checked) return
        this.bookView.setFontType(e.value)
        _setValue('fontType', e.value)
        Ascii.clearCache()
        this.book.update()
      }, this)
    }
    ConfigDialog.prototype.gothicFontEditButtonClicked = function() {
      var r = promptCssPropertyValue('fontFamily'
                                   , 'ゴシックフォント'
                                   , GM_getGothicFontFamily())
      if (!r) return
      _setValue('gothicFontFamily', r)
      if (GM_getFontType() !== 'gothic') return
      this.bookView.setFontFamily(r)
      Ascii.clearCache()
      this.book.update()
    }
    ConfigDialog.prototype.minchoFontEditButtonClicked = function() {
      var r = promptCssPropertyValue('fontFamily'
                                   , '明朝フォント'
                                   , GM_getMinchoFontFamily())
      if (!r) return
      _setValue('minchoFontFamily', r)
      if (GM_getFontType() !== 'mincho') return
      this.bookView.setFontFamily(r)
      Ascii.clearCache()
      this.book.update()
    }
    ConfigDialog.prototype.fontSizeEditButtonClicked = function() {
      var r = promptCssPropertyValue('fontSize'
                                   , 'フォントサイズ'
                                   , GM_getFontSize())
      if (!r) return
      this.bookView.setFontSize(r)
      this.fontSizeCell.textContent = r
      _setValue('fontSize', r)
      Ascii.clearCache()
    }
    ConfigDialog.prototype.lineNumEditButtonClicked = function() {
      var r = promptInteger('行数', GM_getLineNum())
      if (r === null) return
      this.book.setLineNum(r)
      this.lineNumCell.textContent = this.book.lineNum
      _setValue('lineNum', this.book.lineNum)
    }
    ConfigDialog.prototype.lineCharNumEditButtonClicked = function() {
      var r = promptInteger('一行の文字数', GM_getLineCharNum())
      if (r === null) return
      this.book.setLineCharNum(r)
      this.lineCharNumCell.textContent = this.book.lineCharNum
      _setValue('lineCharNum', this.book.lineCharNum)
    }
    ConfigDialog.prototype.marginTopEditButtonClicked = function() {
      var r = promptCssPropertyValue('marginTop', '上余白', GM_getMarginTop())
      if (!r) return
      this.bookView.setMarginTop(r)
      this.marginTopCell.textContent = r
      _setValue('marginTop', r)
    }
    ConfigDialog.prototype.spaceBetweenLinesEditButtonClicked = function() {
      var r = promptCssPropertyValue('marginLeft'
                                   , '行間'
                                   , GM_getSpaceBetweenLines())
      if (!r) return
      this.bookView.setSpaceBetweenLines(r)
      this.spaceBetweenLinesCell.textContent = r
      _setValue('spaceBetweenLines', r)
    }
    ConfigDialog.prototype.colorEditButtonClicked = function() {
      var r = promptCssPropertyValue('color', '文字色', GM_getColor())
      if (!r) return
      this.bookView.setColor(r)
      setColorCell(this.colorCell, r)
      _setValue('color', r)
    }
    ConfigDialog.prototype.backgroundColorEditButtonClicked = function() {
      var r = promptCssPropertyValue('backgroundColor'
                                   , '背景色'
                                   , GM_getBackgroundColor())
      if (!r) return
      this.bookView.setBackgroundColor(r)
      setColorCell(this.backgroundColorCell, r)
      _setValue('backgroundColor', r)
    }
    return ConfigDialog
  })()

  function main() {
   ;[ new Narou()
    , new Arcadia()
    , new Hameln()
    , new Pixiv()
    , new Akatsuki()
    ].forEach(function(site) {
      if (!site.is(window.location)) return
      site.addButton()
      if (!_getValue('auto', false)) return
      _setValue('auto', false)
      site.showBookView()
    })
  }
  
  main()
})()
