// ==UserScript==
// @name           dom2markdown
// @description    Converts some dom elements to markdown.
// @namespace      http://userscripts.org/users/tim
// @copyright      (c) 2011 Tim Smart
// @license        MIT (See top of file)
// ==/UserScript==

// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

if ('object' !== typeof USO) {
  var USO = {}
}

// Function wrapper
(function (USO) {

var NODES = {}

// --------------------

function getTexts (dom) {
  return document.evaluate
    ( ".//text()"
    , dom
    , null
    , XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
    , null
    )
}

function getElements (dom, type) {
  return document.evaluate
    ( ".//" + type
    , dom
    , null
    , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
    , null
    )
}

function textWrapElements (parser, xpath, wrap) {
  var element, text

  for (var i = 0; i < xpath.snapshotLength; i++) {
    element = xpath.snapshotItem(i)
    parser.sanitize(element)
    text    = document.createTextNode(wrap + element.textContent + wrap)
    element.parentNode.replaceChild(text, element)
  }
}

// --------------------

function Parser (dom) {
  this.dom = dom.cloneNode(true)
  // So we can sort by level later
  this.nodes = []
}

Parser.prototype.parse = function () {
  this.sanitize(this.dom)

  var root = new Root(this.dom)
  root.compile()

  return root
}

function markdownEntityReplace ($0) {
  return '\\' + $0
}

Parser.prototype.sanitize = function (dom) {
  var imgs, img, src, alt, title
    , links, link, href
    , texts, text, next
    , codes, code
    , brs, br, prev
    , i

  // Clean entities first
  texts = getTexts(dom)
  for (i = 0; i < texts.snapshotLength; i++) {
    text = texts.snapshotItem(i)
    if (  text.parentNode.nodeName === 'CODE'
       || text.parentNode.nodeName === 'PRE') {
      continue
    }
    text.textContent = text
      .textContent
      .replace(/[_*]/g, markdownEntityReplace)
  }

  // Parse out strongs
  textWrapElements(this, getElements(dom, 'strong'), '**')

  // Parse out em
  textWrapElements(this, getElements(dom, 'em'), '*')

  // Codes
  codes = getElements(dom, 'code')
  for (i = 0; i < codes.snapshotLength; i++) {
    code = codes.snapshotItem(i)
    if (code.parentNode.nodeName === 'PRE') {
      html             = code.innerHTML
      html.textContent = html
      continue
    }
    text = document.createTextNode('`` ' + code.textContent + ' ``')
    code.parentNode.replaceChild(text, code)
  }

  // Images
  imgs = getElements(dom, 'img')
  for (i = 0; i < imgs.snapshotLength; i++) {
    img   = imgs.snapshotItem(i)
    this.sanitize(img)

    src   = img.getAttribute('src')
    alt   = img.getAttribute('alt') || ''
    title = img.getAttribute('title')
    title = title ? ' "' + title + '"' : ''

    text = '![' + alt + '](' + src + title + ')'
    text = document.createTextNode(text)
    img.parentNode.replaceChild(text, img)
  }

  // Links. Assume they have nothing complex in them.
  links = getElements(dom, 'a')
  for (i = 0; i < links.snapshotLength; i++) {
    link = links.snapshotItem(i)
    href = link.getAttribute('href')
    title = link.getAttribute('title')
    title = title ? ' "' + title + '"' : ''

    text = '[' + link.textContent + '](' + href + title + ')'
    text = document.createTextNode(text)
    link.parentNode.replaceChild(text, link)
  }

  // Merge text elements together
  texts = getTexts(dom)
  for (i = 0; i < texts.snapshotLength; i++) {
    text = texts.snapshotItem(i)

    next = text.nextSibling
    while (next && next.nodeName === '#text') {
      text.textContent = text.textContent + next.textContent
      next.parentNode.removeChild(next)
      next = text.nextSibling
    }

    texts = getTexts(dom)
  }

  // Clean texts
  texts = getTexts(dom)
  for (i = 0; i < texts.snapshotLength; i++) {
    text             = texts.snapshotItem(i)
    text.textContent = text.textContent.trim()

    if ('' === text.textContent) {
      text.parentNode.removeChild(text)
    }
  }

  // <br />
  brs = getElements(dom, 'br')
  for (i = 0; i < brs.snapshotLength; i++) {
    br   = brs.snapshotItem(i)
    prev = br.previousSibling
    next = br.nextSibling

    if (prev && prev.nodeName === '#text') {
      prev.textContent += '<br />'
    } else if (next && next.nodeName === '#text') {
      next.textContent = '<br />' + next.textContent
    }

    br.parentNode.removeChild(br)
  }

  // Lose the element references
  links = imgs = texts
        = codes = brs = null
}

// --------------------

// Represents a line of text
function Line (node, text) {
  this.owner            = node
  this.indent           = []
  this.text             = text || ''
  // Padding
  this.top              = false
  this.absorb_top       = false
  this.important_top    = false
  this.bottom           = false
  this.absorb_bottom    = false
  this.important_bottom = false
  this.before           = []
  this.after            = []
}

// --------------------

// Represents a node
function Node (root, parent, dom) {
  this.dom      = dom

  this.root     = root
  this.parent   = parent
  this.level    = parent.level + 1
  this.children = []
  this.lines    = []
  this.within   = {}

  this.within[dom.nodeName]        = true
  this.within[parent.dom.nodeName] = true

  // Lists
  if (parent instanceof UL || parent instanceof OL) {
    this.list = parent
  } else if (parent.list) {
    this.list = parent.list
  }

  this.parseChildren()
}

Node.prototype.parseChildren = function () {
  var node

  for (var i = 0, il = this.dom.childNodes.length; i < il; i++) {
    node = this.dom.childNodes[i]

    switch (node.nodeName) {
    case '#comment':
      break
    case '#text':
      this.parseText(node.textContent)
      break
    default:
      this.parseNode(node)
      break
    }
  }
}

Node.prototype.parseText = function (text) {
  var lines = text.split('\n')
    , clean = []
    , line

  for (var i = 0, il = lines.length; i < il; i++) {
    line = lines[i].trim()
    if ('' === line) {
      continue
    }
    clean.push(line)
  }

  for (i = 0, il = clean.length; i < il; i++) {
    this.addLine(clean[i])
  }

  return this
}

Node.prototype.parseNode = function (node) {
  var name = node.nodeName

  if (NODES[name]) {
    node = new NODES[name](this.root, this, node)
  } else if (/^H\d+$/.test(name)) {
    node = new NODES.Header(this.root, this, node)
  } else {
    node = new HtmlNode(this.root, this, node)
  }
  this.add(node)

  return this
}

Node.prototype.add = function (n) {
  this.children.push(n)
  this.root.register(n)
  return this
}

Node.prototype.remove = function (node) {
  var index = this.children.indexOf(node)
  this.children.splice(index, 1)
  this.parent.remove(node)
  return this
}

Node.prototype.addLine = function (line) {
  if ('string' === typeof line) {
    line = new Line(this, line)
  }

  this.lines.push(line)
  this.parent.addLine(line)
  return this
}

Node.prototype.toString = function () {
  var line, j, before, after, next, prev
    , lines  = []
    , in_pad = true

  for (var i = 0, il = this.lines.length; i < il; i++) {
    prev = this.lines[i - 1] || {}
    line = this.lines[i]
    next = this.lines[i + 1] || {}

    if (line.top && !prev.absorb_bottom && !in_pad) {
      if (prev.important_bottom) {
        lines.push(prev.indent.join(''))
      } else if (line.top === 'INDENT') {
        lines.push(line.indent.join(''))
      } else {
        lines.push(line.indent.slice(0, -1).join(''))
      }
    }
    in_pad = false

    for (j = 0, jl = line.before.length; j < jl; j++) {
      before = line.before[j]
      lines.push(line.indent.join('') + before)
    }

    lines.push(line.indent.join('') + line.text)

    for (j = 0, jl = line.after.length; j < jl; j++) {
      after = line.after[j]
      lines.push(line.indent.join('') + after)
    }

    if (line.bottom && !next.absorb_top) {
      in_pad = true

      if (next.important_top) {
        lines.push(next.indent.join(''))
      } else if (line.bottom === 'INDENT') {
        lines.push(line.indent.join(''))
      } else {
        lines.push(line.indent.slice(0, -1).join(''))
      }
    }
  }

  return lines.join('\n')
}

Node.prototype.compile = function () {
  var first = this.lines[0]
    , last  = this.lines[this.lines.length - 1]

  first.top   = true
  last.bottom = true
}

// --------------------

// Top level node.
function Root (dom) {
  this.dom      = dom
  this.level    = 0
  this.children = []
  this.root     = this
  this.all      = []
  this.lines    = []

  this.parseChildren()

  this.all.sort(function (a, b) {
    return b.level - a.level
  })
}

Root.prototype.__proto__ = Node.prototype

Root.prototype.remove = function (node) {
  var index = this.children.indexOf(node)
  this.children.splice(index, 1)

  index = this.all.indexOf(node)
  this.all.splice(index, 1)

  return this
}

Root.prototype.compile = function () {
  var node
    , nodes = this.all.slice(0)

  for (var i = 0, il = nodes.length; i < il; i++) {
    node = nodes[i]
    if (node.lines.length === 0) {
      node.parent.remove(node)
    }
  }
  for (i = 0, il = this.all.length; i < il; i++) {
    node      = this.all[i]
    node.prev = this.all[i - 1] || node.prev
    node.next = this.all[i + 1] || node.next
  }
  for (i = 0, il = this.all.length; i < il; i++) {
    node = this.all[i]
    node.compile()
  }

  return this
}

Root.prototype.addLine = function (line) {
  if ('string' === typeof line) {
    line = new Line(this, line)
  }

  this.lines.push(line)
  return this
}

Root.prototype.register = function (node) {
  this.all.push(node)
  return this
}

// --------------------

function HtmlNode (root, parent, dom) {
  Node.call(this, root, parent, dom)
}

HtmlNode.prototype.__proto__ = Node.prototype

HtmlNode.prototype.parseChildren = function () {
  var attrs  = this.dom.attributes
    , name   = this.dom.nodeName.toLowerCase()
    , before = '<' + name
    , after  = '</' + name + '>'

  for (i = 0, il = attrs.length; i < il; i++) {
    attr    = attrs[i]
    before += ' ' + attr.name + '="' + attr.value + '"'
  }

  if (false === this.parent instanceof HtmlNode) {
    before               = new Line(this, before)
    before.top           = true
    before.absorb_bottom = true
    after                = new Line(this, after)
    after.bottom         = true
    after.absorb_top     = true
  }

  this.addLine(before)
  Node.prototype.parseChildren.call(this)

  if (this.lines.length === 1) {
    before       = this.lines[0]
    before.text += ' />'
    if (false === this.parent instanceof HtmlNode) {
      before.bottom = true
    }
  } else {
    this.lines[0].text += '>'
    this.addLine(after)
  }
}

HtmlNode.prototype.compile = function () {
  var lines = this.lines.slice(1, -1)
    , line

  for (var i = 0, il = lines.length; i < il; i++) {
    line = lines[i]
    line.indent.unshift('  ')
  }

  return this
}

// --------------------

function P (root, parent, dom) {
  Node.call(this, root, parent, dom)
}

P.prototype.__proto__ = Node.prototype
NODES.P               = P

P.prototype.compile = function () {
  Node.prototype.compile.call(this)

  this.lines[0].top                        = 'INDENT'
  this.lines[this.lines.length - 1].bottom = 'INDENT'
}

// --------------------

function Header (root, parent, dom) {
  Node.call(this, root, parent, dom)
  this.weight = +/^H([0-9]+)$/.exec(dom.nodeName)[1]
}

Header.prototype.__proto__ = Node.prototype
NODES.Header               = Header

Header.prototype.compile = function () {
  Node.prototype.compile.call(this)

  var indent = new Array(this.weight + 1).join('#') + ' '
    , line

  for (var i = 0, il = this.lines.length; i < il; i++) {
    line = this.lines[i]
    line.indent.unshift(indent)
  }
}

// --------------------

function PRE (root, parent, dom) {
  Node.call(this, root, parent, dom)
}

PRE.prototype.__proto__ = Node.prototype
NODES.PRE               = PRE

PRE.prototype.parseText = function (text) {
  var lines = text.split('\n')
    , line

  for (var i = 0, il = lines.length; i < il; i++) {
    line = lines[i]
    this.addLine(line)
  }
}

PRE.prototype.compile = function () {
  Node.prototype.compile.call(this)

  var line

  for (var i = 0, il = this.lines.length; i < il; i++) {
    line = this.lines[i]
    line.indent.unshift('    ')
  }
}

// --------------------

function CODE (root, parent, dom) {
  Node.call(this, root, parent, dom)
}

CODE.prototype.__proto__ = PRE.prototype
NODES.CODE               = CODE

CODE.prototype.compile = function () {}

// --------------------

function HR (root, parent, dom) {
  Node.call(this, root, parent, dom)
}

HR.prototype.__proto__ = Node.prototype
NODES.HR               = HR

HR.prototype.parseChildren = function () {
  this.addLine('----------')
}

// --------------------

function BLOCKQUOTE (root, parent, dom) {
  Node.call(this, root, parent, dom)
}

BLOCKQUOTE.prototype.__proto__ = Node.prototype
NODES.BLOCKQUOTE               = BLOCKQUOTE

BLOCKQUOTE.prototype.compile = function () {
  Node.prototype.compile.call(this)

  var line

  for (var i = 0, il = this.lines.length; i < il; i++) {
    line = this.lines[i]
    line.indent.unshift('> ')
  }

  this.lines[this.lines.length - 1].important_bottom = true
}

// --------------------

function UL (root, parent, dom) {
  this.items = []
  this.indent = '  '

  Node.call(this, root, parent, dom)
}

UL.prototype.__proto__ = Node.prototype
NODES.UL               = UL

UL.prototype.bullet = function () {
  return '* '
}

UL.prototype.compile = function () {
  if (this.list) {
    this.lines[this.lines.length - 1].bottom = false
  }
}

// --------------------

function OL (root, parent, dom) {
  UL.call(this, root, parent, dom)
  this.count  = 0
  this.max    = (this.items.length + '. ').length
  this.indent = new Array(this.max + 1).join(' ')
}

OL.prototype.__proto__ = UL.prototype
NODES.OL               = OL

OL.prototype.bullet = function () {
  var ret = (++this.count) + '. '

  while (ret.length < this.max) {
    ret += ' '
  }

  return ret
}

// --------------------

function LI (root, parent, dom) {
  Node.call(this, root, parent, dom)

  if (this.list) {
    this.list.items.push(this)
  }
}

LI.prototype.__proto__ = Node.prototype
NODES.LI               = LI

LI.prototype.compile = function () {
  if (!this.list) return

  var lines = this.lines.slice(0)
    , first = lines.shift()
    , line, last

  first.indent.unshift(this.list.bullet())
  first.top = false

  if (first.bottom && lines[0]) {
    lines[0].important_top = true
  }

  for (var i = 0, il = lines.length; i < il; i++) {
    line = lines[i]
    line.indent.unshift(this.list.indent)
  }

  last = lines.pop() || first
  if (last.bottom === 'INDENT') {
    last.bottom = true
  }
}

// ====================

// Parser
USO.Dom2Markdown = Parser

// Simple API
USO.dom2markdown = function (dom) {
  var root = new Parser(dom).parse()
  return root.toString()
}

})(USO);


