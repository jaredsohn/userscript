// ==UserScript==
// @name        Pixiv Shortcut Keys
// @namespace   http://userscripts.org/users/121129
// @description pixiv にショートカットキーを追加
// @include     http://www.pixiv.net/search.php*
// @include     http://www.pixiv.net/new_illust.php*
// @include     http://www.pixiv.net/new_illust_r18.php*
// @include     http://www.pixiv.net/member_illust.php*
// @include     http://www.pixiv.net/bookmark.php*
// @include     http://www.pixiv.net/ranking.php*
// @include     http://www.pixiv.net/mypage.php*
// @include     http://www.pixiv.net/cate_r18.php*
// @version     14
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

;(function() {
  'use strict'

  function onIFrame() { return window.top !== window.self }
  if (onIFrame()) return
  

  var Key = { LEFT: 37
            , UP: 38
            , RIGHT: 39
            , DOWN: 40
            , B: 66
            , F: 70
            , H: 72
            , J: 74
            , K: 75
            , L: 76
            , N: 78
            , O: 79
            , P: 80
            , V: 86
            , W: 87
            }

  function KeyMap() {
    this.entries = []
    this.keyDownListener = this.keyDowned.bind(this)
  }
  KeyMap.prototype.add = function(key, action) {
    this.entries.push({ keyCode: key, action: action})
  }
  KeyMap.prototype.remove = function(key) {
    this.entries = this.entries.filter(function(e) { return e.keyCode !== key })
  }
  KeyMap.prototype.keyDowned = function(keyEvent) {
    var tagName = keyEvent.target.tagName
    if (tagName === 'INPUT' || tagName === 'TEXTAREA') return
    
    this.entries.filter(function(entry) {
      return !keyEvent.altKey
          && !keyEvent.ctrlKey
          && !keyEvent.metaKey
          && !keyEvent.shiftKey
          && keyEvent.keyCode === entry.keyCode
    }).forEach(function(entry) {
      keyEvent.stopImmediatePropagation()
      keyEvent.preventDefault()
      entry.action()
    })
  }
  
  function PixivPage() {}
  PixivPage.prototype.focusSearchTextInput = function() {
    document.getElementById('suggest-input').focus()
  }
  PixivPage.prototype.addShortcuts = function() {
    var km = this.keyMap = new KeyMap()
    window.addEventListener('keydown', km.keyDowned.bind(km), true)
    km.add(Key.F, this.focusSearchTextInput.bind(this))
  }
  
  var IllustAnchorTable = (function() {
    function getOffsetTop(anchor) {
      return window.pageYOffset + anchor.parentNode.getBoundingClientRect().top
    }
    function IllustAnchorTable(illustAnchors) {
      this.data = []
      var prevOffsetTop
      for (var i = 0; i < illustAnchors.length; i++) {
        var offsetTop = getOffsetTop(illustAnchors[i])
        if (prevOffsetTop === offsetTop) {
          this.data[this.data.length - 1].push(illustAnchors[i])
        } else {
          this.data.push([illustAnchors[i]])
        }
        prevOffsetTop = offsetTop
      }
    }
    IllustAnchorTable.prototype.getPointOf = function(illustAnchor) {
      for (var row = 0; row < this.data.length; row++) {
        var col = this.data[row].indexOf(illustAnchor)
        if (col !== -1) return { row: row, column: col }
      }
      return null
    }
    IllustAnchorTable.prototype.getIllustAnchorAt = function(row, column) {
      return this.data[row][column]
    }
    IllustAnchorTable.prototype.getRowLength = function() {
      return this.data.length
    }
    IllustAnchorTable.prototype.getColumnLength = function(row) {
      return this.data[row].length
    }
    IllustAnchorTable.prototype.getIllustAnchorsOnRow = function(row) {
      return this.data[row].slice()
    } 
    return IllustAnchorTable
  })()
  
  var IllustListPage = (function() {
    function ArrowKeyHandler() {}
    ArrowKeyHandler.prototype.handle = function(page) {
      var illustAnchors = page.getIllustAnchors()
      if (illustAnchors.length === 0) return
      
      var table = new IllustAnchorTable(illustAnchors)
      var focused = page.getFocusedIllustAnchor()
      if (focused) {
        var p = table.getPointOf(focused)
        if (this.isFocusOnEdge(table, p)) {
          this.doIfFocusOnEdge(page)
        } else {
          this.doIfNotFocusOnEdge(page, table, p)
        }
      } else {
        this.doIfHasNoFocus(page, table)
      }
    }
    
    function DownKeyHandler() {}
    DownKeyHandler.prototype = Object.create(ArrowKeyHandler.prototype)
    DownKeyHandler.prototype.isFocusOnEdge = function(table, point) {
      return point.row === table.getRowLength() - 1
    }
    DownKeyHandler.prototype.doIfFocusOnEdge = function(page) {
      page.moveToNextPage()
    }
    DownKeyHandler.prototype.doIfNotFocusOnEdge = function(page, table, point) {
      var row = point.row + 1
      var col = Math.min(point.column, table.getColumnLength(row) - 1)
      page.activateIllustAnchor(table.getIllustAnchorAt(row, col))
    }
    DownKeyHandler.prototype.doIfHasNoFocus = function(page, table) {
      page.activateIllustAnchor(table.getIllustAnchorAt(0, 0))
    }
    
    function UpKeyHandler() {}
    UpKeyHandler.prototype = Object.create(ArrowKeyHandler.prototype)
    UpKeyHandler.prototype.isFocusOnEdge = function(table, point) {
      return point.row === 0
    }
    UpKeyHandler.prototype.doIfFocusOnEdge = function(page) {
      page.moveToPrevPage()
    }
    UpKeyHandler.prototype.doIfNotFocusOnEdge = function(page, table, point) {
      var row = point.row - 1
      var col = Math.min(point.column, table.getColumnLength(row) - 1)
      page.activateIllustAnchor(table.getIllustAnchorAt(row, col))
    }
    UpKeyHandler.prototype.doIfHasNoFocus = function(page, table) {
      var row = table.getRowLength() - 1
      page.activateIllustAnchor(table.getIllustAnchorAt(row, 0))
    }
      
    function IllustListPage() {
      PixivPage.call(this)
      this.selector = {
          nextAnchor: 'a[rel~="next"]'
        , prevAnchor: 'a[rel~="prev"]'
        , illustAnchors: 'ul.image-items li.image-item a.work'
      }
    }
    IllustListPage.prototype = Object.create(PixivPage.prototype)
    IllustListPage.prototype.isCurrent = function() {
      var p = window.location.pathname
      return p === '/new_illust.php'
          || p === '/new_illust_r18.php'
    }
    IllustListPage.prototype.moveToNextPage = function() {
      var nextAnchor = document.querySelector(this.selector.nextAnchor)
      if (nextAnchor) window.location.assign(nextAnchor.href)
    }
    IllustListPage.prototype.moveToPrevPage = function() {
      var prevAnchor = document.querySelector(this.selector.prevAnchor)
      if (prevAnchor) window.location.assign(prevAnchor.href)
    }
    IllustListPage.prototype.getIllustAnchors = function() {
      return Array.prototype.slice.call(
               document.querySelectorAll(this.selector.illustAnchors))
    }
    IllustListPage.prototype.getFocusedIllustAnchor = function() {
      var illustAnchors = this.getIllustAnchors()
      var i = illustAnchors.indexOf(document.activeElement)
      return i === -1 ? null : illustAnchors[i]
    }
    IllustListPage.prototype.getAdjustedClientRectTop = function(rect) {
      var result = rect.top - (this.additionalScrollYOffset || 0)
        , uiFixed = document.querySelector('._header.ui-fixed')
      if (uiFixed) result -= uiFixed.offsetHeight
      return result
    }
    IllustListPage.prototype.scrollIfOutOfViewport = function(element) {
      var rect = element.getBoundingClientRect()
      var add = this.additionalScrollYOffset || 0
      if (rect.bottom + add > window.innerHeight) {
        window.scrollBy(0, rect.bottom - window.innerHeight + add)
      } else if (this.getAdjustedClientRectTop(rect) < 0) {
        window.scrollBy(0, this.getAdjustedClientRectTop(rect))
      }
    }
    IllustListPage.prototype.getElementToScrollTo = function(illustAnchor) {
      return illustAnchor.parentNode
    }
    IllustListPage.prototype.activateIllustAnchor = function(illustAnchor) {
      var elementToScrollTo = this.getElementToScrollTo(illustAnchor)
      this.scrollIfOutOfViewport(elementToScrollTo)
      illustAnchor.focus()
    }
    IllustListPage.prototype.moveToNextIllust = function() {
      var illustAnchors = this.getIllustAnchors()
      if (illustAnchors.length === 0) return
  
      var i = illustAnchors.indexOf(document.activeElement)
      if (i === illustAnchors.length - 1) {
        this.moveToNextPage()
      } else {
        var target = (i === -1 ? illustAnchors[0] : illustAnchors[i + 1])
        this.activateIllustAnchor(target)
      }
    }
    IllustListPage.prototype.moveToPrevIllust = function() {
      var illustAnchors = this.getIllustAnchors()
      if (illustAnchors.length === 0) return
  
      var i = illustAnchors.indexOf(document.activeElement)
      if (i === 0) {
        this.moveToPrevPage()
      } else {
        var target = (i === -1 ? illustAnchors[illustAnchors.length - 1]
                               : illustAnchors[i - 1])
        this.activateIllustAnchor(target)
      }
    }
    IllustListPage.prototype.moveToLowerIllust = function() {
      new DownKeyHandler().handle(this)
    }
    IllustListPage.prototype.moveToUpperIllust = function() {
      new UpKeyHandler().handle(this)
    }
    IllustListPage.prototype.openImage = function() {
      var illustAnchors = this.getIllustAnchors()
      var i = illustAnchors.indexOf(document.activeElement)
      if (i !== -1) window.open(illustAnchors[i].href, '_blank')
    }
    IllustListPage.prototype.addShortcuts = function() {
      PixivPage.prototype.addShortcuts.call(this)
      this.keyMap.add(Key.N, this.moveToNextPage.bind(this))
      this.keyMap.add(Key.P, this.moveToPrevPage.bind(this))
      
      this.keyMap.add(Key.L, this.moveToNextIllust.bind(this))
      this.keyMap.add(Key.RIGHT, this.moveToNextIllust.bind(this))
      
      this.keyMap.add(Key.H, this.moveToPrevIllust.bind(this))
      this.keyMap.add(Key.LEFT, this.moveToPrevIllust.bind(this))
      
      this.keyMap.add(Key.K, this.moveToUpperIllust.bind(this))
      this.keyMap.add(Key.UP, this.moveToUpperIllust.bind(this))
      
      this.keyMap.add(Key.J, this.moveToLowerIllust.bind(this))
      this.keyMap.add(Key.DOWN, this.moveToLowerIllust.bind(this))
      
      this.keyMap.add(Key.O, this.openImage.bind(this))
      this.keyMap.add(Key.V, this.openImage.bind(this))
    }
    return IllustListPage
  })()
  
  function SearchResultPage() {
    IllustListPage.call(this)
    this.selector.illustAnchors = 'li.image-item > a:not(.user)'
    this.additionalScrollYOffset = 25
  }
  SearchResultPage.prototype = Object.create(IllustListPage.prototype)
  SearchResultPage.prototype.isCurrent = function() {
    return window.location.pathname === '/search.php'
  }
  
  function AnyHeightThumbPage() {
    IllustListPage.call(this)
  }
  AnyHeightThumbPage.prototype = Object.create(IllustListPage.prototype)
  AnyHeightThumbPage.prototype.getElementToScrollTo = function(illustAnchor) {
    var table = new IllustAnchorTable(this.getIllustAnchors())
      , point = table.getPointOf(illustAnchor)
      , illustAnchorsOnRow = table.getIllustAnchorsOnRow(point.row)
      , maxHeight = 0
      , result = null
    illustAnchorsOnRow.forEach(function(illustAnchor) {
      var parent = illustAnchor.parentNode
        , height = parent.getBoundingClientRect().height
      if (height > maxHeight) {
        maxHeight = height
        result = parent
      }
    })
    return result
  }
  
  function MemberIllustPage() {
    AnyHeightThumbPage.call(this)
    this.selector.illustAnchors =
      'div.display_works > ul > li > a:first-of-type'
    this.additionalScrollYOffset = 30
  }
  MemberIllustPage.prototype = Object.create(AnyHeightThumbPage.prototype)
  MemberIllustPage.prototype.isCurrent = function() {
    return (this.isMemberIllustPHP()
         && !this.isMedium()
         && !this.isManga()
         && !this.isBig())
        || window.location.pathname === '/bookmark.php'
  }
  MemberIllustPage.prototype.isMemberIllustPHP = function() {
    return window.location.pathname === '/member_illust.php'
  }
  MemberIllustPage.prototype.isMedium = function() {
    return window.location.search.indexOf('mode=medium') >= 0
  }
  MemberIllustPage.prototype.isManga = function() {
    return window.location.search.indexOf('mode=manga') >= 0
  }
  MemberIllustPage.prototype.isBig = function() {
    return window.location.search.indexOf('mode=big') >= 0
  }
  MemberIllustPage.prototype.getMemberId = function() {
    var a = document.querySelector('a.user-link')
    return /id=(\d+)/.exec(a.href)[1]
  }
  MemberIllustPage.prototype.moveToWorkPage = function() {
    window.location.assign(
        'http://www.pixiv.net/member_illust.php?id=' + this.getMemberId())
  }
  MemberIllustPage.prototype.moveToBookmarkPage = function() {
    window.location.assign(
        'http://www.pixiv.net/bookmark.php?id=' + this.getMemberId())
  }
  MemberIllustPage.prototype.addShortcuts = function() {
    AnyHeightThumbPage.prototype.addShortcuts.call(this)
    this.keyMap.add(Key.W, this.moveToWorkPage.bind(this))
    this.keyMap.add(Key.B, this.moveToBookmarkPage.bind(this))
  }
  
  function MediumMemberIllustPage() {
    MemberIllustPage.call(this)
    this.selector.nextAnchor = 'li.after > a'
    this.selector.prevAnchor = 'li.before > a'
    this.scrollAmount = 51
  }
  MediumMemberIllustPage.prototype = Object.create(MemberIllustPage.prototype)
  MediumMemberIllustPage.prototype.isCurrent = function() {
    return this.isMemberIllustPHP() && this.isMedium()
  }
  MediumMemberIllustPage.prototype.moveToNextIllust = function() {
    this.moveToNextPage()
  }
  MediumMemberIllustPage.prototype.moveToPrevIllust = function() {
    this.moveToPrevPage()
  }
  MediumMemberIllustPage.prototype.openImage = function() {
    var imgLink = document.querySelector('div.works_display > a')
    imgLink.click()
  }
  MediumMemberIllustPage.prototype.scrollDown = function() {
    window.scrollBy(0, this.scrollAmount)
  }
  MediumMemberIllustPage.prototype.scrollUp = function() {
    window.scrollBy(0, -this.scrollAmount)
  }
  MediumMemberIllustPage.prototype.addShortcuts = function() {
    MemberIllustPage.prototype.addShortcuts.call(this)
    this.keyMap.remove(Key.RIGHT)
    this.keyMap.remove(Key.LEFT)
    this.keyMap.remove(Key.UP)
    this.keyMap.remove(Key.DOWN)
    
    this.keyMap.remove(Key.J)
    this.keyMap.add(Key.J, this.scrollDown.bind(this))
    
    this.keyMap.remove(Key.K)
    this.keyMap.add(Key.K, this.scrollUp.bind(this))
  }
  
  function RankingPage() {
    AnyHeightThumbPage.call(this)
    this.selector.illustAnchors = '.ranking-items a.work'
    this.selector.nextAnchor = 'li.after > a'
    this.selector.prevAnchor = 'li.before > a'
    this.additionalScrollYOffset = 30
  }
  RankingPage.prototype = Object.create(AnyHeightThumbPage.prototype)
  RankingPage.prototype.isCurrent = function() {
    return window.location.pathname === '/ranking.php'
  }
  RankingPage.prototype.getAdjustedClientRectTop = function(rect) {
    var prot = AnyHeightThumbPage.prototype
      , result = prot.getAdjustedClientRectTop.call(this, rect)
      , uiFixed = document.querySelector('.ui-fixed.ranking-menu')
    if (uiFixed) result -= uiFixed.offsetHeight
    return result
  }
  
  function MyPage() { PixivPage.call(this) }
  MyPage.prototype = Object.create(PixivPage.prototype)
  MyPage.prototype.isCurrent = function() {
    return window.location.pathname === '/mypage.php'
        || window.location.pathname === '/cate_r18.php'
  }
  
  var GM_addStyle = window.GM_addStyle
  if (GM_addStyle === undefined) {
    GM_addStyle = function(css) {
      var style = document.createElement('style')
      style.type = 'text/css'
      style.textContent = css
      document.documentElement.appendChild(style)
    }
  }
  GM_addStyle(
      'section.image-list ul.images li.image a:focus img,'
    + 'li.image-item > a:not(.user):focus img,'
    + '.ranking-items a.work:focus img {'
    + '  border-color: red !important;'
    + '}'
    + 'section.image-list ul.images li.image a:focus h2 {'
    + '  text-decoration: underline !important;'
    + '}'
    + '.display_works a:focus img {'
    + '  background: none repeat scroll 0 0 #FFFFFF !important;'
    + '  border: 1px solid red !important;'
    + '  padding: 2px !important;'
    + '}'
    + '.linkStyleWorks a:focus {'
    + '  text-decoration: underline !important;'
    + '}')
  
 ;[ new IllustListPage()
  , new MemberIllustPage()
  , new MediumMemberIllustPage()
  , new RankingPage()
  , new MyPage()
  , new SearchResultPage()
  ].forEach(function(page) {
    if (page.isCurrent()) page.addShortcuts()
  })
})()
