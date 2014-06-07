// ==UserScript==
// @name Nico Nico Ranking NG
// @namespace http://userscripts.org/users/121129 
// @description ニコニコ動画のランキングにＮＧ機能を追加
// @match http://www.nicovideo.jp/ranking*
// @version 6
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_xmlhttpRequest
// ==/UserScript==

;(function() {
  'use strict'

  function removeAllChild(parent) {
    while (parent.firstChild) parent.removeChild(parent.firstChild)
  }
  function elem(tagName, attrMap, styleMap) {
    var result = document.createElement(tagName)
    for (var attrName in attrMap)
      if (attrMap.hasOwnProperty(attrName))
        result.setAttribute(attrName, attrMap[attrName])
    for (var styleName in styleMap)
      if (styleMap.hasOwnProperty(styleName))
        result.style.setProperty(styleName, styleMap[styleName], null)
    for (var i = 3, n = arguments.length; i < n; i++) {
      var arg = arguments[i]
      if (typeof(arg) === 'string')
        result.appendChild(document.createTextNode(arg))
      else
        result.appendChild(arg)
    }
    return result
  }
  function label(element, text) {
    return elem('label', {}, {}, element, text)
  }
  function array(likeArray) {
    return Array.prototype.slice.call(likeArray)
  }
  function checkbox(clickListener, checked) {
    var result = elem('input', { type: 'checkbox' })
    result.checked = checked
    result.addEventListener('click', clickListener, false)
    return result
  }
  function alertAlreadyAdded(value) {
    alert('"' + value + '"は登録済みです。')
  }
  
  var Movie = (function() {
    function Movie(id, title, view) {
      this.id = id
      this.title = title
      this.visited = false
      this.ngId = false
      this.ngTitle = false
      this.matchedNgTitle = ''
      this.tags = []
      this.ngTags = []
      this.userId = -1
      this.ngUser = false
      this.view = view
    }
    Movie.prototype.setVisited = function(visited) {
      if (this.visited !== visited) {
        this.visited = visited
        this.view.updateVisited(this)
      }
    }
    Movie.prototype.setVisitedByRegExp = function(regExp) {
      this.setVisited(regExp.test(this.id))
    }
    Movie.prototype.setNgId = function(ngId) {
      if (this.ngId !== ngId) {
        this.ngId = ngId
        this.view.updateNgId(this)
      }
    }
    Movie.prototype.setNgIdByRegExp = function(regExp) {
      this.setNgId(regExp.test(this.id))
    }
    Movie.prototype.setNgTitleByRegExp = function(regExp) {
      var execResult = regExp.exec(this.title)
      
      var preNgTitle = this.ngTitle
      this.ngTitle = Boolean(execResult)
      
      var preMatchedNgTitle = this.matchedNgTitle
      this.matchedNgTitle = execResult ? execResult[0] : ''
      
      if (preNgTitle !== this.ngTitle)
        this.view.updateNgTitle(this)
      else if (preNgTitle
            && this.ngTitle
            && preMatchedNgTitle !== this.matchedNgTitle)
        this.view.updateMatchedNgTitle(this)
    }
    Movie.prototype.isNG = function() {
      return this.ngId
          || this.ngTitle
          || Boolean(this.ngTags.length)
          || this.ngUser
    }
    function equalArray(a1, a2) {
      if (a1.length !== a2.length) return false
      for (var i = 0; i < a1.length; i++)
        if (a1[i] !== a2[i]) return false
      return true
    }
    Movie.prototype.setTags = function(tags) {
      if (!equalArray(this.tags, tags)) {
        this.tags = tags
        this.view.updateTags(this)
      }
    }
    Movie.prototype.setNgTagsByRegExp = function(regExp) {
      var ngTags = this.tags.filter(function(tag) { return regExp.test(tag) })
      if (!equalArray(this.ngTags, ngTags)) {
        this.ngTags = ngTags
        this.view.updateNgTags(this)
      }
    }
    Movie.prototype.setUserId = function(userId) {
      if (this.userId !== userId) {
        this.userId = userId
        this.view.updateUserId(this)
      }
    }
    Movie.prototype.setNgUserByNgUserIds = function(ngUserIds) {
      var ngUser = (ngUserIds.indexOf(this.userId) !== -1)
      if (this.ngUser !== ngUser) {
        this.ngUser = ngUser
        this.view.updateNgUser(this)
      }
    }
    return Movie
  })()

  var Model = (function() {
    function Model(movies, view) {
      this.movies = movies
      this.view = view
      this.ngMovieVisible = false
      this.idToMovie = newIdToMovieMap(movies)
    }
    function newIdToMovieMap(movies) {
      var result = {}
      movies.forEach(function(movie) { result[movie.id] = movie })
      return result
    }
    Model.NEVER_MATCHED_REGEXP = /^[^\d\D]/
    Model.prototype.getVisitedMovieViewMode = function() {
      // cache for http://wiki.greasespot.net/Greasemonkey_access_violation
      if (!this.visitedMovieViewModeName)
        this.visitedMovieViewModeName =
          GM_getValue('visitedMovieViewMode', 'reduce')
      return ViewMode.get(this.visitedMovieViewModeName)
    }
    Model.prototype.setVisitedMovieViewMode = function(viewMode) {
      if (!this.getVisitedMovieViewMode().hasSameName(viewMode)) {
        GM_setValue('visitedMovieViewMode', viewMode.name)
        this.visitedMovieViewModeName = viewMode.name
        this.view.updateVisitedMovieViewMode()
      }
    }
    Model.prototype.setNgMovieVisible = function(ngMovieVisible) {
      if (this.ngMovieVisible !== ngMovieVisible) {
        this.ngMovieVisible = ngMovieVisible
        this.view.updateNgMovieVisible()
      }
    }
    Model.prototype.isNewWindowOpen = function() {
      return GM_getValue('openNewWindow', true)
    }
    Model.prototype.setNewWindowOpen = function(newWindowOpen) {
      if (this.isNewWindowOpen() !== newWindowOpen) {
        GM_setValue('openNewWindow', newWindowOpen)
        this.view.updateNewWindowOpen()
      }
    }
    Model.prototype.isUseGetThumbInfo = function() {
      return GM_getValue('useGetThumbInfo', true)
    }
    Model.prototype.setUseGetThumbInfo = function(useGetThumbInfo) {
      if (this.isUseGetThumbInfo() !== useGetThumbInfo)
        GM_setValue('useGetThumbInfo', useGetThumbInfo)
    }
    Model.prototype.isMovieInfoTogglable = function() {
      return GM_getValue('movieInfoTogglable', true)
    }
    Model.prototype.setMovieInfoTogglable = function(movieInfoTogglable) {
      if (this.isMovieInfoTogglable() !== movieInfoTogglable) {
        GM_setValue('movieInfoTogglable', movieInfoTogglable)
        this.view.updateMovieInfoTogglable()
      }
    }
    function GM_getArray(name) {
      return JSON.parse(GM_getValue(name, '[]'))
    }
    function indexOfRegExp(array, value) {
      var re = new RegExp('^' + escapeNoWordChars(value) + '$', 'i')
      return array.some(function(e) { return re.test(e) })
    }
    function GM_addToArray(name, value) {
      var values = GM_getArray(name)
      if (indexOfRegExp(values, value)) return false
      values.push(value)
      GM_setValue(name, JSON.stringify(values))
      return true
    }
    function GM_removeFromArray(name, value) {
      var newValue = GM_getArray(name).filter(function(element) {
        return element !== value
      })
      GM_setValue(name, JSON.stringify(newValue))
    }
    Model.prototype.getVisitedIds = function() {
      return GM_getArray('visitedMovies')
    }
    Model.prototype.addVisitedId = function(movieId) {
      GM_addToArray('visitedMovies', movieId)
      if (this.idToMovie[movieId]) this.idToMovie[movieId].setVisited(true)
    }
    Model.prototype.removeVisitedId = function(movieId) {
      GM_removeFromArray('visitedMovies', movieId)
      if (this.idToMovie[movieId]) this.idToMovie[movieId].setVisited(false)
    }
    Model.prototype.clearVisitedIds = function() {
      GM_deleteValue('visitedMovies')
      this.movies.forEach(function(movie) { movie.setVisited(false) })
    }
    Model.prototype.getNgIds = function() { return GM_getArray('ngMovies') }
    Model.prototype.addNgId = function(movieId) {
      GM_addToArray('ngMovies', movieId)
      if (this.idToMovie[movieId]) this.idToMovie[movieId].setNgId(true)
    }
    Model.prototype.removeNgId = function(movieId) {
      GM_removeFromArray('ngMovies', movieId)
      if (this.idToMovie[movieId]) this.idToMovie[movieId].setNgId(false)
    }
    Model.prototype.clearNgIds = function() {
      GM_deleteValue('ngMovies')
      this.movies.forEach(function(movie) { movie.setNgId(false) })
    }
    Model.prototype.getNgTitles = function() { return GM_getArray('ngTitles') }
    function escapeNoWordChars(s) { return String(s).replace(/\W/g, '\\$&') }
    Model.prototype.addNgTitle = function(movieTitle) {
      if (GM_addToArray('ngTitles', movieTitle)) {
        var regExp = new RegExp(escapeNoWordChars(movieTitle), 'i')
        this.movies.forEach(function(movie) {
          if (!movie.ngTitle) movie.setNgTitleByRegExp(regExp)
        })
        return true
      }
      return false
    }
    Model.prototype.removeNgTitle = function(movieTitle) {
      this.removeNgTitles([movieTitle])
    }
    Model.prototype.removeNgTitles = function(movieTitles, ignoreCase) {
      ignoreCase = ignoreCase === undefined ? true : ignoreCase
      var re = new RegExp(newStrictPattern(movieTitles), ignoreCase ? 'i' : '')
      var newValue = this.getNgTitles().filter(function(element) {
        return !re.test(element)
      })
      GM_setValue('ngTitles', JSON.stringify(newValue))
      this.updateAllNgTitles()
    }
    Model.prototype.clearNgTitles = function() {
      GM_deleteValue('ngTitles')
      this.movies.forEach(function(movie) {
        movie.setNgTitleByRegExp(Model.NEVER_MATCHED_REGEXP)
      })
    }
    Model.prototype.getNgTags = function() { return GM_getArray('ngTags') }
    Model.prototype.addNgTag = function(movieTag) {
      if (GM_addToArray('ngTags', movieTag)) {
        this.updateAllNgTags()
        return true
      }
      return false
    }
    Model.prototype.removeNgTag = function(movieTag) {
      this.removeNgTags([movieTag])
    }
    Model.prototype.removeNgTags = function(movieTags, ignoreCase) {
      ignoreCase = ignoreCase === undefined ? true : ignoreCase
      var re = new RegExp(newStrictPattern(movieTags), ignoreCase ? 'i' : '')
      var newValue = this.getNgTags().filter(function(element) {
        return !re.test(element)
      })
      GM_setValue('ngTags', JSON.stringify(newValue))
      this.updateAllNgTags()
    }
    Model.prototype.clearNgTags = function() {
      GM_deleteValue('ngTags')
      this.movies.forEach(function(movie) {
        movie.setNgTagsByRegExp(Model.NEVER_MATCHED_REGEXP)
      })
    }
    Model.prototype.getNgUserIds = function() {
      return GM_getArray('ngUserIds')
    }
    Model.prototype.addNgUserId = function(ngUserId) {
      GM_addToArray('ngUserIds', ngUserId)
      this.updateAllNgUser()
    }
    Model.prototype.removeNgUserId = function(ngUserId) {
      GM_removeFromArray('ngUserIds', ngUserId)
      this.updateAllNgUser()
    }
    Model.prototype.clearNgUserIds = function() {
      GM_deleteValue('ngUserIds')
      this.updateAllNgUser()
    }
    function newPattern(elements) {
      var s = '('
      elements.forEach(function(e) { s += escapeNoWordChars(e) + '|' })
      return s.slice(0, -1) + ')'
    }
    function newStrictPattern(elements) {
      return '^' + newPattern(elements) + '$'
    }
    Model.prototype.updateAllVisited = function() {
      var visitedIds = this.getVisitedIds()
      if (visitedIds.length) {
        var re = new RegExp(newStrictPattern(visitedIds))
        this.movies.forEach(function(movie) { movie.setVisitedByRegExp(re) })
      } else {
        this.movies.forEach(function(movie) { movie.setVisited(false) })
      }
    }
    Model.prototype.updateAllNgIds = function() {
      var ngIds = this.getNgIds()
      if (ngIds.length) {
        var re = new RegExp(newStrictPattern(ngIds))
        this.movies.forEach(function(movie) { movie.setNgIdByRegExp(re) })
      } else {
        this.movies.forEach(function(movie) { movie.setNgId(false) })
      }
    }
    Model.prototype.updateAllNgTitles = function() {
      var ngTitles = this.getNgTitles()
        , re = ngTitles.length ? new RegExp(newPattern(ngTitles), 'i')
                               : Model.NEVER_MATCHED_REGEXP
      this.movies.forEach(function(movie) { movie.setNgTitleByRegExp(re) })
    }
    Model.prototype.updateAllNgTags = function() {
      var ngTags = this.getNgTags()
        , re = ngTags.length ? new RegExp(newStrictPattern(ngTags), 'i')
                             : Model.NEVER_MATCHED_REGEXP
      this.movies.forEach(function(movie) { movie.setNgTagsByRegExp(re) })
    }
    Model.prototype.updateAllNgUser = function() {
      var ngUserIds = this.getNgUserIds()
      this.movies.forEach(function(movie) {
        movie.setNgUserByNgUserIds(ngUserIds)
      })
    }
    Model.prototype.isVisible = function(movie) {
      return !movie.isNG() || this.ngMovieVisible
    }
    Model.prototype.isHidden = function(movie) {
      return !this.isVisible(movie)
          || (movie.visited && this.getVisitedMovieViewMode().isHideMode())
    }
    Model.prototype.isReduced = function(movie) {
      return this.isVisible(movie)
          && movie.visited
          && this.getVisitedMovieViewMode().isReduceMode()
    }
    Model.prototype.getMovieViewMode = function(movie) {
      if (this.isHidden(movie)) return new ViewMode.Hide()
      if (this.isReduced(movie)) return new ViewMode.Reduce()
      return new ViewMode.DoNothing()
    }
    function evaluateTags(doc, movie) {
      var r = doc.evaluate('/nicovideo_thumb_response/thumb/tags/tag'
                         , doc
                         , null
                         , XPathResult.ORDERED_NODE_ITERATOR_TYPE
                         , null)
      var tags = []
      for (var tag; tag = r.iterateNext();) tags.push(tag.textContent)
      movie.setTags(tags)
    }
    function evaluateUserId(doc, movie) {
      var r = doc.evaluate('/nicovideo_thumb_response/thumb/user_id/text()'
                         , doc
                         , null
                         , XPathResult.STRING_TYPE
                         , null)
      var userId = parseInt(r.stringValue, 10)
      if (!isNaN(userId)) movie.setUserId(userId)
    }
    Model.prototype.evalResAndRequestNext = function(movies, movie, res) {
      var d = new DOMParser().parseFromString(res.responseText
                                            , 'application/xml')
      evaluateTags(d, movie)
      evaluateUserId(d, movie)
      
      var ngTags = this.getNgTags()
      if (ngTags.length)
        movie.setNgTagsByRegExp(new RegExp(newStrictPattern(ngTags), 'i'))
      
      movie.setNgUserByNgUserIds(this.getNgUserIds())
      
      this.requestNext(movies)
    }
    Model.prototype.requestNext = function(movies) {
      var nextMovie = movies.shift()
      if (nextMovie) {
        GM_xmlhttpRequest(
          { method: 'GET'
          , url: 'http://ext.nicovideo.jp/api/getthumbinfo/' + nextMovie.id
          , onload : this.evalResAndRequestNext.bind(this, movies, nextMovie)
          })
      }
    }
    Model.prototype.postponeHiddenMovies = function() {
      var self = this
      return this.movies.map(function(movie, i) {
        return { rank: i, movie: movie }
      }).sort(function(a, b) {
        var aIsHidden = self.isHidden(a.movie)
        var bIsHidden = self.isHidden(b.movie)
        if (!aIsHidden && bIsHidden) return -1
        if (aIsHidden && !bIsHidden) return 1
        if (a.rank < b.rank) return -1
        if (a.rank > b.rank) return 1
        return 0
      }).map(function(e) { return e.movie })
    }
    Model.prototype.requestGetThumbInfo = function() {
      if (this.isUseGetThumbInfo())
        this.requestNext(this.postponeHiddenMovies())
    }
    return Model
  })()

  var Action = {}
  Action.ADD =
    { ngIdButtonText: 'NG登録'
    , ngTitleButtonText: 'NGタイトル追加'
    , visitButtonText: '閲覧済み'
    , doVisitedId: function(model, movieId) { model.addVisitedId(movieId) }
    , doNgId:  function(model, movieId) { model.addNgId(movieId) }
    , doNgTitle: function(model, movieId) {
        var r = null
        do {
          var msg = (r ? '"' + r + '"は登録済みです。\n' : '')
                  + 'NGタイトルを入力'
          var r = prompt(msg, r ? r : model.idToMovie[movieId].title)
        } while (r && !model.addNgTitle(r))
      }
    , doNgTag: function(model, tag) { model.addNgTag(tag) }
    , doNgUserId: function(model, movieId) {
        model.addNgUserId(model.idToMovie[movieId].userId)
      }
    }
  Action.REMOVE =
    { ngIdButtonText: 'NG解除'
    , ngTitleButtonText: 'NGタイトル削除'
    , visitButtonText: '未閲覧'
    , doVisitedId: function(model, movieId) { model.removeVisitedId(movieId) }
    , doNgId: function(model, movieId) { model.removeNgId(movieId) }
    , doNgTitle: function(model, movieId) {
        model.removeNgTitle(model.idToMovie[movieId].matchedNgTitle)
      }
    , doNgTag: function(model, tag) { model.removeNgTag(tag) }
    , doNgUserId: function(model, movieId) {
        model.removeNgUserId(model.idToMovie[movieId].userId)
      }
    }
  
  function ViewMode() {}
  ViewMode.get = function(name) {
    switch(name) {
    case ViewMode.DoNothing.prototype.name: return new ViewMode.DoNothing()
    case ViewMode.Reduce.prototype.name: return new ViewMode.Reduce()
    case ViewMode.Hide.prototype.name: return new ViewMode.Hide()
    default: throw new Error(name)
    }
  }
  ViewMode.prototype.isDoNothingMode = function() {
    return this instanceof ViewMode.DoNothing
  }
  ViewMode.prototype.isHideMode = function() {
    return this instanceof ViewMode.Hide
  }
  ViewMode.prototype.isReduceMode = function() {
    return this instanceof ViewMode.Reduce
  }
  ViewMode.prototype.hasSameName = function(viewMode) {
    return this.name === viewMode.name
  }
  
  ViewMode.DoNothing = function() {}
  ViewMode.DoNothing.prototype = new ViewMode()
  ViewMode.DoNothing.prototype.name = 'doNothing'
  ViewMode.DoNothing.prototype.restoreViewMode = function(movieId, view) {}
  ViewMode.DoNothing.prototype.setViewMode = function(movieId, view) {}
  ViewMode.DoNothing.prototype.updateView = function(view) {
    view.doNothingRadio.checked = true
  }
  
  ViewMode.Hide = function() {}
  ViewMode.Hide.prototype = new ViewMode()
  ViewMode.Hide.prototype.name = 'hide'
  ViewMode.Hide.prototype.restoreViewMode = function(movieId, view) {
    view.setMovieVisible(movieId, true)
  }
  ViewMode.Hide.prototype.setViewMode = function(movieId, view) {
    view.setMovieVisible(movieId, false)
  }
  ViewMode.Hide.prototype.updateView = function(view) {
    view.hideRadio.checked = true
  }

  ViewMode.Reduce = (function() {
    function setStyle(root, obj) {
      var r = root, o = obj
     ;['.rankingPt', '.itemTime', '.wrap', '.itemData'].forEach(function(s) {
        r.querySelector(s).style.display = o.display
      })
      
      r.querySelector('.rankingNum').style.fontSize = o.rankingNumFontSize
      r.querySelector('.videoList01Wrap').style.width = o.videoListWrapWidth
      r.querySelector('.itemTitle').style.width = o.itemTitleWidth
      
      setItemThumbSize(r, '.itemThumb', o.itemThumb)
      setItemThumbSize(r, '.itemThumbWrap', o.itemThumb)
      setItemThumbSize(r, '.itemThumbBox', o.itemThumb)
    }
    function setItemThumbSize(root, selector, size) {
      var itemThumb = root.querySelector(selector)
      itemThumb.style.width = size.width
      itemThumb.style.height = size.height
    }
    function setTagAndUserIdDisplay(movieView, display) {
      movieView.tagP.style.display = display
      movieView.userIdP.style.display = display
    }
    
    function Reduce() {}
    Reduce.prototype = new ViewMode()
    Reduce.prototype.name = 'reduce'
    Reduce.prototype.restoreViewMode = function(movieId, view) {
      var o = { display: ''
              , rankingNumFontSize: ''
              , videoListWrapWidth: ''
              , itemTitleWidth: ''
              , itemThumb: { width: '', height: '' }
              }
      var r = view.getMovieRootById(movieId)
      setStyle(r, o)
      this.restoreThumb(r.querySelector('.thumb'))
      setTagAndUserIdDisplay(view.idToMovieView[movieId], '')
      view.updateMovieInfoVisible(movieId)
    }
    Reduce.prototype.setViewMode = function(movieId, view) {
      var o = { display: 'none'
              , rankingNumFontSize: '150%'
              , videoListWrapWidth: '80px'
              , itemTitleWidth: 'auto'
              , itemThumb: { width: '80px', height: '45px' }
              }
      var r = view.getMovieRootById(movieId)
      setStyle(r, o)
      this.halfThumb(r.querySelector('.thumb'))
      setTagAndUserIdDisplay(view.idToMovieView[movieId], 'none')
    }
    Reduce.prototype.updateView = function(view) {
      view.reduceRadio.checked = true
    }
    Reduce.prototype.halfThumb = function(thumb) {
      var w = this.srcThumbWidth = parseInt(thumb.style.width)
      var t = this.srcThumbMarginTop = parseInt(thumb.style.marginTop)
      thumb.style.width = parseInt(w / 2) + 'px'
      thumb.style.marginTop = parseInt(t / 2) + 'px'
    }
    Reduce.prototype.restoreThumb = function(thumb) {
      thumb.style.width = this.srcThumbWidth + 'px'
      thumb.style.marginTop = this.srcThumbMarginTop + 'px'
    }
    return Reduce
  })()

  var GinzaView = (function() {
    function radio(value, clickListener) {
      var result = elem('input',
                        { 'type': 'radio'
                        , 'name': 'visitedMovieViewMode'
                        , 'value': value
                        })
      result.addEventListener('click', clickListener, false)
      return result
    }
    function anchor(text, clickListener) {
      var result = elem('a'
                      , { 'href': 'javascript:void(0)'
                        , 'style': 'color:#FFF;'
                        }
                      , {}
                      , text)
      if (clickListener) result.addEventListener('click', clickListener, false)
      return result
    }
    function movieIdInHRef(href) {
      var execResult = /^watch\/([^?]+)/.exec(href)
      return execResult ? execResult[1] : null
    }
    function addSeparator(elem, separator) {
      elem.appendChild(document.createTextNode(separator || ' | '))
    }
    var decodeHtmlCharRef = (function() {
      var e = elem('span')
      return function(text) {
        e.innerHTML = text
        return e.textContent
      }
    })()
    function getTagNameByTagButton(tagButton) {
      return tagButton.previousSibling.textContent
    }
    
    function MovieView(view) {
      this.viewMode = new ViewMode.DoNothing()
      this.ngIdAction = Action.ADD
      this.ngTitleAction = Action.ADD
      this.visitType = Action.ADD
      this.ngIdButton = view.newNgIdButton()
      this.ngTitleButton = view.newNgTitleButton()
      this.visitButton = view.newVisitButton()
      this.tagToView = {}
      this.ngUserAction = Action.ADD
      this.ngUserButton = view.newNgUserButton()
      this.userIdAnchor = elem('a')
      this.movieInfoToggleButton = view.newToggleButton()
      this.tagP = view.newParagraph()
      this.userIdP = view.newParagraph()
      this.movieInfoVisible = false
    }
    
    function GinzaView() {
      this.ngMovieVisibleCheckbox = checkbox(this.setNgMovieVisible.bind(this))
      this.configButton = this.newConfigButton()
      this.idToMovieView = {}
      
      var radioClickListener = this.setVisitedMovieViewMode.bind(this)
      this.reduceRadio = radio('reduce', radioClickListener)
      this.hideRadio = radio('hide', radioClickListener)
      this.doNothingRadio = radio('doNothing', radioClickListener)
    }
    GinzaView.prototype.setModel = function(model) {
      this.model = model
      
      var idToMovieView = this.idToMovieView
      model.movies.forEach(function(movie) {
        idToMovieView[movie.id] = new MovieView(this)
      }, this)
      
      this.updateVisitedMovieViewMode()
      this.updateNewWindowOpen()
      this.updateMovieInfoTogglable()
    }
    GinzaView.prototype.newConfigButton = function() {
      var result =  elem('span'
                       , {}
                       ,{ 'text-decoration': 'underline', 'cursor': 'pointer'}
                       , '設定')
      result.addEventListener('click', this.showConfigDialog.bind(this), false)
      return result
    }
    GinzaView.prototype.newNgUserButton = function() {
      var result = elem('span', {}, { cursor: 'pointer' }, '[+]')
      result.addEventListener('click'
                            , this.ngUserButtonListener
                              || (this.ngUserButtonListener =
                                    this.doNgUserId.bind(this))
                            , false)
      return result
    }
    GinzaView.prototype.newNgIdButton = function() {
      return anchor(Action.ADD.ngIdButtonText
                  , this.ngIdButtonListener
                    || (this.ngIdButtonListener = this.doNgId.bind(this)))
    }
    GinzaView.prototype.newNgTitleButton = function() {
      return anchor(Action.ADD.ngTitleButtonText
                  , this.ngTitleButtonListener
                    || (this.ngTitleButtonListener =
                          this.doNgTitle.bind(this)))
    }
    GinzaView.prototype.newVisitButton = function() {
      return anchor(Action.ADD.visitButtonText
                  , this.visitButtonListener
                    || (this.visitButtonListener =
                          this.doVisitedId.bind(this)))
    }
    GinzaView.prototype.getMovies = function() {
      return this.getWatchAnchors().map(function(a) {
        return new Movie(movieIdInHRef(a.getAttribute('href'))
                                     , a.textContent
                                     , this)
      }, this)
    }
    GinzaView.prototype.newVisitedMovieViewModeFragment = function() {
      var result = document.createDocumentFragment()
      result.appendChild(document.createTextNode('閲覧済みの動画を'))
      result.appendChild(label(this.reduceRadio, ' 縮小'))
      result.appendChild(label(this.hideRadio, ' 非表示'))
      result.appendChild(label(this.doNothingRadio, ' 通常表示'))
      return result
    }
    GinzaView.prototype.newControllers = function() {
      var result = document.createElement('div')
      result.appendChild(this.newVisitedMovieViewModeFragment())
      addSeparator(result)
      result.appendChild(label(this.ngMovieVisibleCheckbox, ' NG動画を表示'))
      addSeparator(result)
      result.appendChild(this.configButton)
      return result
    }
    GinzaView.prototype.addControllers = function() {
      var mainDiv = document.querySelector('div.contentBody.video')
      mainDiv.insertBefore(this.newControllers(), mainDiv.firstChild)
    }
    GinzaView.prototype.getMovieRoot = function(child) {
      return this.getItemElem(child)
    }
    GinzaView.prototype.getMovieRootById = function(movieId) {
      return this.getMovieRoot(this.getWatchAnchor(movieId))
    }
    GinzaView.prototype.getWatchAnchors = function() {
      return this.watchAnchors
          || (this.watchAnchors =
               array(document.querySelectorAll('p.itemTitle.ranking a')))
    }
    GinzaView.prototype.newIdToWatchAnchorMap = function() {
      var result = {}
      this.getWatchAnchors().forEach(function(anchor) {
        result[movieIdInHRef(anchor.getAttribute('href'))] = anchor
      })
      return result
    }
    GinzaView.prototype.getWatchAnchor = function(movieId) {
      var m = this.idToWatchAnchor
      return (m && m[movieId])
          || (this.idToWatchAnchor = this.newIdToWatchAnchorMap())[movieId]
    }
    GinzaView.prototype.getMovieAnchors = function() {
      return this.movieAnchors
          || (this.movieAnchors = this.getMovieImages().map(function(img) {
               return img.parentNode
             }).concat(this.getWatchAnchors()))
    }
    GinzaView.prototype.setMovieVisible = function(movieId, visible) {
      var r = this.getMovieRootById(movieId)
      if (visible) r.style.removeProperty('display')
      else r.style.display = 'none'
    }
    GinzaView.prototype.movieAnchorClicked = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      this.model.addVisitedId(movieId)
    }
    GinzaView.prototype.addAllMovieAnchorListener = function() {
      var listener = this.movieAnchorClicked.bind(this)
      this.getMovieAnchors().forEach(function(movieAnchor) {
        movieAnchor.addEventListener('click', listener, false)
      })
    }
    GinzaView.prototype.updateNewWindowOpen = function() {
      this.getMovieAnchors().forEach(function(movieAnchor) {
        if (this.model.isNewWindowOpen())
          movieAnchor.setAttribute('target', '_blank')
        else
          movieAnchor.removeAttribute('target')
      }, this)
    }
    GinzaView.prototype.updateViewMode = function(movie) {
      var movieView = this.idToMovieView[movie.id]
      var oldViewMode = movieView.viewMode
      var newViewMode = this.model.getMovieViewMode(movie)
      if (oldViewMode.hasSameName(newViewMode)) return
      oldViewMode.restoreViewMode(movie.id, this)
      newViewMode.setViewMode(movie.id, this)
      movieView.viewMode = newViewMode
      this.requestLoadingLazyImages()
    }
    GinzaView.prototype.updateVisitedMovieViewMode = function() {
      this.model.getVisitedMovieViewMode().updateView(this)
      this.model.movies.forEach(function(m) { this.updateViewMode(m) }, this)
    }
    GinzaView.prototype.updateNgMovieVisible = function() {
      this.ngMovieVisibleCheckbox.checked = this.model.ngMovieVisible
      this.model.movies.forEach(function(m) { this.updateViewMode(m) }, this)
    }
    GinzaView.prototype.updateNgId = function(movie) {
      this.updateViewMode(movie)
      if (movie.ngId)
        this.getWatchAnchor(movie.id).style.textDecoration = 'line-through'
      else
        this.getWatchAnchor(movie.id).style.removeProperty('text-decoration')
      var action = movie.ngId ? Action.REMOVE : Action.ADD
      var movieView = this.idToMovieView[movie.id]
      movieView.ngIdAction = action
      movieView.ngIdButton.textContent = action.ngIdButtonText
    }
    GinzaView.prototype.updateMatchedNgTitle = function(movie) {
      var a = this.getWatchAnchor(movie.id)
      if (!movie.ngTitle) {
        a.textContent = a.textContent
        return
      }
      removeAllChild(a)
      var m = movie.matchedNgTitle
      var t = movie.title
      var i = t.indexOf(m)
      if (i !== 0) a.appendChild(document.createTextNode(t.substring(0, i)))
      a.appendChild(elem('span'
                       , {}
                       , { 'color': 'white', 'background-color': 'fuchsia' }
                       , t.substring(i, i + m.length)))
      if (i + m.length !== t.length)
        a.appendChild(document.createTextNode(t.substring(i + m.length)))
    }
    GinzaView.prototype.updateNgTitle = function(movie) {
      this.updateViewMode(movie)
      this.updateMatchedNgTitle(movie)
      var movieView = this.idToMovieView[movie.id]
      var action = movie.ngTitle ? Action.REMOVE : Action.ADD
      movieView.ngTitleAction = action
      movieView.ngTitleButton.textContent = action.ngTitleButtonText
    }
    GinzaView.prototype.getItemContent = function(movieId) {
      return this.getWatchAnchor(movieId).parentNode.parentNode
    }
    GinzaView.prototype.updateTags = function(movie) {
      var movieView = this.idToMovieView[movie.id]
      var tagToView = movieView.tagToView
      
      var tagList = movieView.tagP
      if (movieView.viewMode.isReduceMode()) tagList.style.display = 'none'
      
      var listener = this.tagButtonListener
      if (!listener)
        listener = this.tagButtonListener = this.doNgTag.bind(this)
      
      movie.tags.forEach(function(tag) {
        var anchor = elem('a'
                        , { href: 'http://www.nicovideo.jp/tag/' + tag }
                        , { color: this.movieInfoAnchorColor }
                        , decodeHtmlCharRef(tag))
        
        var button = elem('span', {}, { cursor: 'pointer' }, '[+]')
        button.addEventListener('click', listener, false)
        
        tagList.appendChild(elem('span'
                               , {}
                               , { 'white-space': 'nowrap'
                                 , 'margin-right': '0.5em'
                                 }
                               , anchor
                               , button))
        tagList.appendChild(document.createTextNode(' '))
        
        tagToView[tag] = { anchor: anchor, button: button, action: Action.ADD }
      }, this)
  
      this.getItemContent(movie.id).appendChild(tagList)
      if (this.model.isMovieInfoTogglable())
        this.addMovieInfoToggleButton(movie)
    }
    GinzaView.prototype.setTagStyle = function(tagView, ng) {
      tagView.anchor.style.color = ng ? 'white' : this.movieInfoAnchorColor
      tagView.anchor.style.backgroundColor = ng ? 'fuchsia' : ''
      tagView.button.textContent = ng ? '[x]' : '[+]'
      tagView.action = ng ? Action.REMOVE : Action.ADD
    }
    GinzaView.prototype.updateNgTags = function(movie) {
      this.updateViewMode(movie)
      var tagToView = this.idToMovieView[movie.id].tagToView
      movie.tags.forEach(function(tag) {
        this.setTagStyle(tagToView[tag], false)
      }, this)
      movie.ngTags.forEach(function(ngTag) {
        this.setTagStyle(tagToView[ngTag], true)
      }, this)
    }
    GinzaView.prototype.updateVisited = function(movie) {
      this.updateViewMode(movie)
      var movieView = this.idToMovieView[movie.id]
      var action = movie.visited ? Action.REMOVE : Action.ADD
      movieView.visitType = action
      movieView.visitButton.textContent = action.visitButtonText
    }
    GinzaView.prototype.getMovieIdByComponent = function(actionButton) {
      return this.getMovieIdByRoot(this.getMovieRoot(actionButton))
    }
    GinzaView.prototype.getVisitedMovieViewMode = function() {
      if (this.doNothingRadio.checked) return new ViewMode.DoNothing()
      if (this.hideRadio.checked) return new ViewMode.Hide()
      if (this.reduceRadio.checked) return new ViewMode.Reduce()
      throw new Error()
    }
    GinzaView.prototype.getItemElem = function(child) {
      for (var e = child; e; e = e.parentNode) {
        if (e.className.split(' ').indexOf('item') >= 0) return e
      }
      return null
    }
    GinzaView.prototype.addAllActionButton = function() {
      var entered = (function(e) {
        var v = this.idToMovieView[this.getMovieIdByRoot(e.target)]
        v.visitButton.parentNode.style.display = ''
      }).bind(this)
      var leaved = (function(e) {
        var v = this.idToMovieView[this.getMovieIdByRoot(e.target)]
        v.visitButton.parentNode.style.display = 'none'
      }).bind(this)
      this.model.movies.forEach(function(movie) {
        var movieView = this.idToMovieView[movie.id]
        var menu = document.createElement('div')
        menu.style.position = 'absolute'
        menu.style.top = '10px'
        menu.style.right = '0px'
        menu.style.padding = '3px'
        menu.style.color = '#999'
        menu.style.backgroundColor = 'rgb(105, 105, 105)'
        menu.style.display = 'none'
        menu.appendChild(movieView.visitButton)
        menu.appendChild(document.createTextNode(' | '))
        menu.appendChild(movieView.ngIdButton)
        menu.appendChild(document.createTextNode(' | '))
        menu.appendChild(movieView.ngTitleButton)
        var root = this.getMovieRootById(movie.id)
        root.appendChild(menu)
        root.addEventListener('mouseenter', entered, false)
        root.addEventListener('mouseleave', leaved, false)
      }, this)
    }
    GinzaView.prototype.getMovieImages = function() {
      var result = this.movieImages
      if (!result) {
        var imgs = document.querySelectorAll('img.thumb')
        this.movieImages = result = array(imgs)
      }
      return result
    }
    GinzaView.prototype.getMovieDataElem = function(movieId) {
      return this.getMovieRootById(movieId).querySelector('ul.list')
    }
    GinzaView.prototype.newToggleButton = function() {
      var result = document.createElement('li')
      result.className = 'count'
      result.textContent = '▼'
      result.style.cursor = 'pointer'
      result.style.marginLeft = '10px'
      result.addEventListener('click'
                            , this.toggleButtonListener
                              || (this.toggleButtonListener =
                                    this.toggleMovieInfoVisible.bind(this))
                            , false)
      return result
    }
    GinzaView.prototype.getMovieIdByRoot = function(movieRoot) {
      return movieRoot.getAttribute('data-id')
    }
    GinzaView.prototype.movieInfoAnchorColor = '#333333'
    GinzaView.prototype.newParagraph = function() {
      return elem('p'
                , { 'class': 'font12' }
                , { 'margin-top': '4px', 'line-height': '1.5em' })
    }
    GinzaView.prototype.updateUserId = function(movie) {
      var v = this.idToMovieView[movie.id]
      var anchor = v.userIdAnchor
      anchor.href = 'http://www.nicovideo.jp/user/' + movie.userId
      anchor.textContent = movie.userId
      anchor.style.color = this.movieInfoAnchorColor
      var userId = v.userIdP
      userId.appendChild(document.createTextNode('ユーザーID: '))
      userId.appendChild(anchor)
      userId.appendChild(v.ngUserButton)
      if (v.viewMode.isReduceMode()) userId.style.display = 'none'
      this.getItemContent(movie.id).appendChild(userId)
      if (this.model.isMovieInfoTogglable())
        this.addMovieInfoToggleButton(movie)
    }
    GinzaView.prototype.updateNgUser = function(movie) {
      this.updateViewMode(movie)
      var v = this.idToMovieView[movie.id]
      var ng = movie.ngUser
      v.userIdAnchor.style.color = ng ? 'white' : this.movieInfoAnchorColor
      v.userIdAnchor.style.backgroundColor = ng ? 'fuchsia' : ''
      v.ngUserButton.textContent = ng ? '[x]' : '[+]'
      v.ngUserAction = ng ? Action.REMOVE : Action.ADD
    }
    GinzaView.prototype.addMovieInfoToggleButton = function(movie) {
      var v = this.idToMovieView[movie.id]
      v.movieInfoVisible = false
      var button = v.movieInfoToggleButton
      if (!button.parentNode && (movie.tags.length || movie.userId !== -1))
        this.getMovieDataElem(movie.id).appendChild(button)
      this.updateMovieInfoVisible(movie.id)
    }
    GinzaView.prototype.removeMovieInfoToggleButton = function(movie) {
      var v = this.idToMovieView[movie.id]
      v.movieInfoVisible = true
      this.updateMovieInfoVisible(movie.id)
      var button = v.movieInfoToggleButton
      if (button.parentNode) button.parentNode.removeChild(button)
      var viewMode = v.viewMode
      if (viewMode.isReduceMode()) {
        viewMode.restoreViewMode(movie.id, this)
        viewMode.setViewMode(movie.id, this)
      }
    }
    GinzaView.prototype.toggleMovieInfoVisible = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      var v = this.idToMovieView[movieId]
      v.movieInfoVisible = !v.movieInfoVisible
      this.updateMovieInfoVisible(movieId)
    }
    GinzaView.prototype.updateMovieInfoVisible = function(movieId) {
      var v = this.idToMovieView[movieId]
      var visible = v.movieInfoVisible
      v.movieInfoToggleButton.textContent = visible ? '▲' : '▼'
      v.tagP.style.display = visible ? '' : 'none'
      v.userIdP.style.display = visible ? '' : 'none'
    }
    GinzaView.prototype.updateMovieInfoTogglable = function() {
      if (this.model.isMovieInfoTogglable())
        this.model.movies.forEach(this.addMovieInfoToggleButton, this)
      else
        this.model.movies.forEach(this.removeMovieInfoToggleButton, this)
    }
    GinzaView.prototype.setVisitedMovieViewMode = function() {
      if (this.reduceRadio.checked)
        this.model.setVisitedMovieViewMode(new ViewMode.Reduce())
      else if (this.hideRadio.checked)
        this.model.setVisitedMovieViewMode(new ViewMode.Hide())
      else if (this.doNothingRadio.checked)
        this.model.setVisitedMovieViewMode(new ViewMode.DoNothing())
      else
        throw new Error()
    }
    GinzaView.prototype.setNgMovieVisible = function() {
      this.model.setNgMovieVisible(this.ngMovieVisibleCheckbox.checked)
    }
    GinzaView.prototype.showConfigDialog = function() {
      new ConfigDialog(this.model).show()
    }
    GinzaView.prototype.doVisitedId = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      this.idToMovieView[movieId].visitType.doVisitedId(this.model, movieId)
    }
    GinzaView.prototype.doNgId = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      this.idToMovieView[movieId].ngIdAction.doNgId(this.model, movieId)
    }
    GinzaView.prototype.doNgTitle = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      this.idToMovieView[movieId].ngTitleAction.doNgTitle(this.model, movieId)
    }
    GinzaView.prototype.doNgTag = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      var tag = getTagNameByTagButton(event.target)
      var movieView = this.idToMovieView[movieId]
      movieView.tagToView[tag].action.doNgTag(this.model, tag)
    }
    GinzaView.prototype.doNgUserId = function(event) {
      var movieId = this.getMovieIdByComponent(event.target)
      this.idToMovieView[movieId].ngUserAction.doNgUserId(this.model, movieId)
    }
    GinzaView.prototype.isInView = function(img) {
      var rect = img.getBoundingClientRect()
      return (rect.height && rect.width)
          && ((rect.top >= 0 && rect.top <= window.innerHeight)
           || (rect.bottom >= 0 && rect.bottom <= window.innerHeight)
           || (rect.top < 0 && rect.bottom > window.innerHeight))
    }
    GinzaView.prototype.loadLazyImages = function() {
      var imgs = document.querySelectorAll('img.thumb.jsLazyImage')
      Array.prototype.forEach.call(imgs, function(img) {
        if (this.isInView(img)) {
          img.src = img.getAttribute('data-original')
          img.setAttribute('data-original', '')
          img.className = img.className.split(' ').filter(function(name) {
            return name !== 'jsLazyImage'
          }).join(' ')
        }
      }, this)
    }
    GinzaView.prototype.requestLoadingLazyImages = function() {
      if (this.loadingLazyImagesRequested) return
      this.loadingLazyImagesRequested = true
      setTimeout((function() {
        this.loadLazyImages()
        this.loadingLazyImagesRequested = false
      }).bind(this), 0)
    }
    return GinzaView
  })()

  var ConfigDialog = (function() {
    function ConfigDialog(model) {
      this.model = model
      this.background = new DialogBackground(ConfigDialog.Z_INDEX - 1)
      
      this.ngTitleLabel = this.newNgTitleLabel()
      this.ngTitleSelect = this.newNgTitleSelect()
      this.ngTitleAddButton = newAddButton(this.addNgTitle.bind(this))
      this.ngTitleRemoveButton = this.newNgTitleRemoveButton()
      
      this.ngTagLabel = tabLabel('NGタグ', this.selectNgTagTab.bind(this))
      this.ngTagSelect = this.newNgTagSelect()
      this.ngTagAddButton = newAddButton(this.addNgTag.bind(this), 'none')
      this.ngTagRemoveButton = this.newNgTagRemoveButton()
      
      this.allNgIdRemoveButton = this.newAllNgIdRemoveButton()
      this.allNgTitleRemoveButton = this.newAllNgTitleRemoveButton()
      this.allVisitedIdRemoveButton = this.newAllVisitedIdRemoveButton()
      this.allNgTagRemoveButton = this.newAllNgTagRemoveButton()
      this.allNgUserIdRemoveButton = this.newAllNgUserIdRemoveButton()
      
      this.newWindowOpenCheckbox = this.newNewWindowOpenCheckbox()
      this.useGetThumbInfoCheckbox = this.newUseGetThumbInfoCheckbox()
      this.movieInfoTogglableCheckbox = this.newMovieInfoTogglableCheckbox()
      
      this.root = this.newRoot()
    }
    ConfigDialog.Z_INDEX = 10000
    function tabLabel(text, clickListener, styleMap) {
      var style = { 'margin-right': '5px'
                  , cursor: 'pointer'
                  , display: 'inline-block'
                  , padding: '3px'
                  }
      for (var p in styleMap)
        if (styleMap.hasOwnProperty(p)) style[p] = styleMap[p]
      var result = elem('span', {}, style, text)
      result.addEventListener('click', clickListener, false)
      return result
    }
    ConfigDialog.prototype.newNgTitleLabel = function() {
      return tabLabel('NGタイトル'
                    , this.selectNgTitleTab.bind(this)
                    , { 'background-color': 'gray', color: 'white' })
    }
    function select(optionTexts, changeListener, display) {
      var styleMap = { 'width': '250px'
                     , 'float': 'left'
                     , 'margin-bottom': '10px'
                     , 'margin-top': '0px'
                     }
      if (display) styleMap['display'] = display
      var result = elem('select'
                      , { size: '10', multiple: 'multiple' }
                      , styleMap)
      optionTexts.forEach(function(optionText) {
        result.appendChild(elem('option', {}, {}, optionText))
      })
      result.addEventListener('change', changeListener, false)
      return result
    }
    ConfigDialog.prototype.newNgTitleSelect = function() {
      return select(this.model.getNgTitles()
                  , this.updateNgTitleRemoveButtonDisabled.bind(this))
    }
    ConfigDialog.prototype.newNgTagSelect = function() {
      return select(this.model.getNgTags()
                  , this.updateNgTagRemoveButtonDisabled.bind(this)
                  , 'none')
    }
    ConfigDialog.prototype.newNewWindowOpenCheckbox = function() {
      return checkbox(this.updateNewWindowOpen.bind(this)
                    , this.model.isNewWindowOpen())
    }
    ConfigDialog.prototype.newUseGetThumbInfoCheckbox = function() {
      return checkbox(this.updateUseGetThumbInfo.bind(this)
                    , this.model.isUseGetThumbInfo())
    }
    ConfigDialog.prototype.newMovieInfoTogglableCheckbox = function() {
      return checkbox(this.updateMovieInfoTogglable.bind(this)
                    , this.model.isMovieInfoTogglable())
    }
    function button(text, clickListener, styleMap, disabled) {
      var result = elem('button', {}, styleMap, text)
      result.addEventListener('click', clickListener, false)
      result.disabled = disabled
      return result
    }
    function setWidth(styleMap) {
      styleMap['width'] = '70px'
      return styleMap
    }
    function newAddButton(clickListener, display) {
      var style = {}
      if (display) style['display'] = display
      return button('追加', clickListener, setWidth(style))
    }
    function newRemoveButton(clickListener, display) {
      var style = { 'margin-top': '5px' }
      if (display) style['display'] = display
      return button('削除', clickListener, setWidth(style), true)
    }
    ConfigDialog.prototype.newNgTitleRemoveButton = function() {
      return newRemoveButton(this.removeSelectedNgTitles.bind(this))
    }
    ConfigDialog.prototype.newNgTagRemoveButton = function() {
      return newRemoveButton(this.removeSelectedNgTags.bind(this), 'none')
    }
    ConfigDialog.prototype.newAllNgTitleRemoveButton = function() {
      return button('NGタイトルをすべて削除'
                  , this.removeAllNgTitle.bind(this)
                  , {}
                  , !this.model.getNgTitles().length)
    }
    ConfigDialog.prototype.newAllNgTagRemoveButton = function() {
      return button('NGタグをすべて削除'
                  , this.removeAllNgTag.bind(this)
                  , {}
                  , !this.model.getNgTags().length)
    }
    ConfigDialog.prototype.newAllNgIdRemoveButton = function() {
      return button('NG登録をすべて削除'
                  , this.removeAllNgId.bind(this)
                  , {}
                  , !this.model.getNgIds().length)
    }
    ConfigDialog.prototype.newAllVisitedIdRemoveButton = function() {
      return button('訪問履歴をすべて削除'
                  , this.removeAllVisitedId.bind(this)
                  , {}
                  , !this.model.getVisitedIds().length)
    }
    ConfigDialog.prototype.newAllNgUserIdRemoveButton = function() {
      return button('NGユーザーをすべて削除'
                  , this.removeAllNgUserId.bind(this)
                  , {}
                  , !this.model.getNgUserIds().length)
    }
    function marginTopDiv(child, styleMap) {
      var style = { 'margin-top': '10px' }
      for (var p in styleMap)
        if (styleMap.hasOwnProperty(p)) style[p] = styleMap[p]
      return elem('div', {}, style, child)
    }
    ConfigDialog.prototype.newRoot = function() {
      return elem('div'
                , {}
                , { 'background-color': 'white'
                  , 'z-index': String(ConfigDialog.Z_INDEX)
                  , 'position': 'fixed'
                  , 'padding': '15px'
                  , 'border': 'medium solid black'
                  , 'overflow': 'auto'
                  , 'width': '320px'
                  }
                , elem('div', {}, {}, this.ngTitleLabel, this.ngTagLabel)
                , this.ngTitleSelect
                , this.ngTitleAddButton
                , this.ngTitleRemoveButton
                , this.ngTagSelect
                , this.ngTagAddButton
                , this.ngTagRemoveButton
                , marginTopDiv(this.allNgTitleRemoveButton, { clear: 'left' })
                , marginTopDiv(this.allNgIdRemoveButton)
                , marginTopDiv(this.allVisitedIdRemoveButton)
                , marginTopDiv(this.allNgTagRemoveButton)
                , marginTopDiv(this.allNgUserIdRemoveButton)
                , marginTopDiv(label(this.newWindowOpenCheckbox
                                   , ' 動画を別窓で開く'))
                , marginTopDiv(label(this.useGetThumbInfoCheckbox
                                   , ' 動画情報を取得する'))
                , marginTopDiv(label(this.movieInfoTogglableCheckbox
                                   , ' 動画情報の表示切替ボタンを使用する'))
                , marginTopDiv(button('閉じる', this.hide.bind(this))
                             , { 'text-align': 'center' }))
    }
    ConfigDialog.prototype.show = function(owner) {
      this.background.show()
      
      var r = this.root
      document.body.appendChild(r)
      r.style.left = ((window.innerWidth - r.offsetWidth) / 2) + 'px'
      r.style.top = ((window.innerHeight - r.offsetHeight) / 2) + 'px'
    }
    ConfigDialog.prototype.hide = function() {
      this.root.parentNode.removeChild(this.root)
      this.background.hide()
    }
    ConfigDialog.prototype.removeAllVisitedId = function() {
      this.model.clearVisitedIds()
      this.allVisitedIdRemoveButton.disabled = true
    }
    ConfigDialog.prototype.removeAllNgId = function() {
      this.model.clearNgIds()
      this.allNgIdRemoveButton.disabled = true
    }
    ConfigDialog.prototype.removeAllNgTitle = function() {
      this.model.clearNgTitles()
      removeAllChild(this.ngTitleSelect)
      this.allNgTitleRemoveButton.disabled = true
      this.updateNgTitleRemoveButtonDisabled()
    }
    ConfigDialog.prototype.removeAllNgUserId = function() {
      this.model.clearNgUserIds()
      this.allNgUserIdRemoveButton.disabled = true
    }
    function selectedOptions(select) {
      return array(select.options).filter(function(o) { return o.selected })
    }
    function removeSelectedItems(select
                               , removeItems
                               , updateButtonDisabled
                               , removeAllButton) {
      var options = selectedOptions(select)
      removeItems(options.map(function(o) { return o.textContent }), false)
      options.forEach(function(o) { o.parentNode.removeChild(o) })
      updateButtonDisabled()
      if (!select.options.length) removeAllButton.disabled = true
    }
    ConfigDialog.prototype.removeSelectedNgTitles = function() {
      removeSelectedItems(this.ngTitleSelect
                        , this.model.removeNgTitles.bind(this.model)
                        , this.updateNgTitleRemoveButtonDisabled.bind(this)
                        , this.allNgTitleRemoveButton)
    }
    ConfigDialog.prototype.updateNewWindowOpen = function() {
      this.model.setNewWindowOpen(this.newWindowOpenCheckbox.checked)
    }
    ConfigDialog.prototype.updateUseGetThumbInfo = function() {
      this.model.setUseGetThumbInfo(this.useGetThumbInfoCheckbox.checked)
    }
    ConfigDialog.prototype.updateNgTitleRemoveButtonDisabled = function() {
      this.ngTitleRemoveButton.disabled =
        this.ngTitleSelect.selectedIndex === -1
    }
    ConfigDialog.prototype.removeSelectedNgTags = function() {
      removeSelectedItems(this.ngTagSelect
                        , this.model.removeNgTags.bind(this.model)
                        , this.updateNgTagRemoveButtonDisabled.bind(this)
                        , this.allNgTagRemoveButton)
    }
    ConfigDialog.prototype.removeAllNgTag = function() {
      this.model.clearNgTags()
      removeAllChild(this.ngTagSelect)
      this.allNgTagRemoveButton.disabled = true
      this.updateNgTagRemoveButtonDisabled()
    }
    ConfigDialog.prototype.updateNgTagRemoveButtonDisabled = function() {
      this.ngTagRemoveButton.disabled =
        this.ngTagSelect.selectedIndex === -1
    }
    ConfigDialog.prototype.getNgTitleObj = function() {
      return { label: this.ngTitleLabel
             , select: this.ngTitleSelect
             , addButton: this.ngTitleAddButton
             , removeButton: this.ngTitleRemoveButton
             }
    }
    ConfigDialog.prototype.getNgTabObj = function() {
      return { label: this.ngTagLabel
             , select: this.ngTagSelect
             , addButton: this.ngTagAddButton
             , removeButton: this.ngTagRemoveButton
             }
    }
    function setTabState(obj, selected) {
      obj.label.style.backgroundColor = selected ? 'gray' : ''
      obj.label.style.color = selected ? 'white' : ''
      ;[obj.select, obj.addButton, obj.removeButton].forEach(function(e) {
        e.style.display = selected ? '' : 'none'
      })
    }
    ConfigDialog.prototype.selectNgTitleTab = function() {
      setTabState(this.getNgTitleObj(), true)
      setTabState(this.getNgTabObj(), false)
    }
    ConfigDialog.prototype.selectNgTagTab = function() {
      setTabState(this.getNgTitleObj(), false)
      setTabState(this.getNgTabObj(), true)
    }
    ConfigDialog.prototype.addNgTitle = function() {
      var r = null
      do {
        r = window.prompt((r ? '"' + r + '"は登録済みです。\n' : '')
                        + 'NGタイトルを入力')
        if (!r) return
      } while (!this.model.addNgTitle(r))
      this.ngTitleSelect.appendChild(elem('option', {}, {}, r))
      this.allNgTitleRemoveButton.disabled = false
    }
    ConfigDialog.prototype.addNgTag = function() {
      var r = null
      do {
        r = window.prompt((r ? '"' + r + '"は登録済みです。\n' : '')
                        + 'NGタグを入力')
        if (!r) return
      } while (!this.model.addNgTag(r))
      this.ngTagSelect.appendChild(elem('option', {}, {}, r))
      this.allNgTagRemoveButton.disabled = false
    }
    ConfigDialog.prototype.updateMovieInfoTogglable = function() {
      this.model.setMovieInfoTogglable(this.movieInfoTogglableCheckbox.checked)
    }
    return ConfigDialog
  })()

  function DialogBackground(zIndex) {
    this.root = elem('div'
                    , {}
                    , { 'background-color': 'black'
                      , 'opacity': '0.5'
                      , 'z-index': String(zIndex)
                      , 'position': 'fixed'
                      , 'left': '0px'
                      , 'top': '0px'
                      , 'width': '100%'
                      , 'height': '100%'
                      })
  }
  DialogBackground.prototype.show = function() {
    document.body.appendChild(this.root)
  }
  DialogBackground.prototype.hide = function() {
    this.root.parentNode.removeChild(this.root)
  }

  function main() {
    var view = new GinzaView()
    var model = new Model(view.getMovies(), view)
    view.setModel(model)
    view.addControllers()
    view.addAllActionButton()
    view.addAllMovieAnchorListener()
    model.updateAllVisited()
    model.updateAllNgIds()
    model.updateAllNgTitles()
    
    window.addEventListener('scroll', function() {
      view.loadLazyImages()
    }, false)
    
    view.model.requestGetThumbInfo()
  }
  
  main()

})()
