// ==UserScript==
// @name           User Scripts GMail Library
// @description    A @require Library for UserScript's that offers a clean api to GMail.
// @namespace      http://userscripts.org/users/tim
// @license        MIT (See top of file)
// @copyright      Tim Smart (c) 2011
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

if (typeof USO !== 'object') {
  var USO = {}
}

(function (USO) {
  var G = USO.Gmail = function Gmail (options) {
    options || (options = {})

    this.window     = unsafeWindow || window
    this.canvas_win = null
    this.canvas_doc = null
    this.api        = null
    this.version    = options.version || 2
    this._events    = {}
    this.loaded     = false
    this._Observer  = null
    this._observers =
      { loading     : null
      , compose     : null
      }
    this.cache      =
      { composers   : []
      }

    var gmail       = this

    try {
      if (  this.window.gmonkey
         && 'function' === typeof this.window.gmonkey.load) {
        var gmonkey = this.window.gmonkey

        gmonkey.load(this.version, function (api) {
          gmail.api = api
          gmail.emit('loaded:api', api)
        })
      }
    } catch (err) {
      this.emit('error', err)
    }

    function updateElements () {
      if (null === gmail.compose_wrap) return

      gmail._observers.loading.disconnect()
      gmail.loaded = true
      gmail.emit('loaded', gmail.api)

      gmail._observers.compose = new gmail._Observer(composeObserver)
      gmail._observers.compose.observe(
        gmail.compose_wrap
      , { childList : true, subtree : true }
      )
    }

    function composeObserver () {
      if (!gmail.is_composing) {
        for (var i = 0, il = gmail.cache.composers.length; i < il; i++) {
          gmail.emit('compose:closed', gmail.cache.composers[i])
        }
        gmail.cache.composers = []

        return
      }

      var composers = gmail.compose_wrap.querySelectorAll('div.nH.nn > div.no')
      composers.__proto__ = Array.prototype

      var oldcomposers = gmail.cache.composers
      var compose      = null

      for (var i = 0, il = composers.length; i < il; i++) {
        composer = composers[i]
        if (-1 === oldcomposers.indexOf(composer)) {
          gmail.emit('compose', composer)
        }
      }

      for (var i = 0, il = oldcomposers.length; i < il; i++) {
        composer = oldcomposers[i]
        if (-1 === composers.indexOf(composer)) {
          gmail.emit('compose:closed', composer)
        }
      }

      gmail.cache.composers = composers
    }

    this.on('loaded:api', function () {
      this.api.registerViewChangeCallback(function () {
        var view = gmail.view_type

        if (!view) {
          return
        }

        gmail.emit('view', view)
        gmail.emit('view:' + view)
      })

      this.api.registerProfileCardCallback(function (e) {
        gmail.emit('profilecard', e)
      })

      this.api.registerButterbarCallback(function () {
        gmail.emit('butterbar')
      })

      this.api.registerMessageStateChangeCallback(function (message, state) {
        gmail.emit('message:state', message, state)
        // TODO : If start is always a string, message:state:{{state}}
      })

      this.api.registerMessageViewChangeCallback(function (message) {
        gmail.emit('message:view', message)
      })

      this.api.registerThreadStateChangeCallback(function (thread, state) {
        gmail.emit('thread:state', thread, state)
      })

      this.api.registerThreadViewChangeCallback(function (thread) {
        gmail.emit('thread:view', thread)
      })

      this.canvas_doc = this.canvas.ownerDocument
      this.canvas_win = this.canvas_doc.defaultView

      if (this.canvas_win.MutationObserver) {
        this._Observer = this.canvas_win.MutationObserver
      } else if (this.canvas_win.WebKitMutationObserver) {
        this._Observer = this.canvas_win.WebKitMutationObserver
      }

      this._observers.loading = new this._Observer(updateElements)
      this._observers.loading.observe(
        this.canvas_doc.body
      , { childList : true, subtree : true }
      )
    })
  }

  var convertToArray = function (thing) {
    var arr = []

    for (var i = 0, il = thing.length; i < il; i++) {
      arr.push(thing[i])
    }

    return arr
  }

  G.prototype.on = function (event, cb) {
    this._events[event] || (this._events[event] = [])
    this._events[event].push(cb)

    return this
  }

  G.prototype.removeListener = function (event, fn) {
    if (!this._events[event]) {
      return this
    }

    var index = this._events[event].indexOf(fn)

    if (-1 === index) {
      return this
    }

    this._events[event].splice(index, 1)

    return this
  }

  G.prototype.emit = function () {
    var args  = convertToArray(arguments)
      , event = args.shift()

    if (!this._events[event]) {
      return this
    }

    for (var i = 0, il = this._events[event].length; i < il; i++) {
      this._events[event][i].apply(this, args)
    }

    return this
  }

  G.prototype.__defineGetter__('compose_wrap', function () {
    if (this.cache.compose_wrap) return this.cache.compose_wrap

    var wrap = this.canvas_doc.querySelector('body > div.dw')
    this.cache.compose_wrap = wrap

    return this.cache.compose_wrap
  })

  G.prototype.__defineGetter__('is_composing', function () {
    return !this.hasClass(this.compose_wrap, 'np')
  })

  G.prototype.__defineGetter__('info', function () {
    return this.window.gmonkey.info(this.version)
  })

  G.prototype.__defineGetter__('view_type', function () {
    return this.api.getActiveViewType()
  })

  G.prototype.__defineGetter__('canvas', function () {
    if (this.cache.canvas) return this.cache.canvas
    this.cache.canvas = this.api.getCanvasElement()
    return this.cache.canvas
  })

  G.prototype.__defineGetter__('view', function () {
    return this.api.getActiveViewElement()
  })

  G.prototype.__defineGetter__('nav_pane', function () {
    return this.api.getNavPaneElement()
  })

  G.prototype.__defineGetter__('masthead', function () {
    return this.api.getMastheadElement()
  })

  G.prototype.__defineGetter__('labels', function () {
    return this.api.getSystemLabelsElement()
  })

  G.prototype.__defineGetter__('conv_rhs', function () {
    return this.api.getConvRhsElement()
  })

  G.prototype.__defineGetter__('footer', function () {
    return this.api.getFooterElement()
  })

  G.prototype.__defineGetter__('thread', function () {
    return this.api.getCurrentThread()
  })

  G.prototype.__defineGetter__('message', function () {
    return this.api.getCurrentMessage()
  })

  G.prototype.__defineGetter__('actions', function () {
    return this.api.getActionElements()
  })

  G.prototype.__defineGetter__('converstation_disabled', function () {
    return this.api.isConversationViewDisabled()
  })

  G.prototype.addNavModule = function (title, content, color) {
    return this.api.addNavModule(title, content, color)
  }

  G.prototype.click = function (element) {
    var click = document.createEvent('MouseEvents')

    click.initMouseEvent(
      'click', true, true
    , document.defaultView
    , 1, 0, 0, 0, 0
    , false, false, false, false
    , 0, null
    )
    element.dispatchEvent(click)

    return this
  }

  G.prototype.hasClass = function (element, classname) {
    return element.classList.contains(classname)
  }
})(USO);
