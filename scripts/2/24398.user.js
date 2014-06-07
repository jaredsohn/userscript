// ==UserScript==
// @name           Endless Tweets
// @namespace      http://mislav.caboo.se/
// @description    Loads older tweets endlessly when you scroll on Twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function(realWindow){

/*** toolkit/gm_functions.js ***/
if (typeof GM_getValue == "function") {
  var getValue = GM_getValue
  var setValue = GM_setValue
} else {
  var Cookie = {
    PREFIX: '_greasekit_',
    prefixedName: function(name){
      return Cookie.PREFIX + name;
    },
    
    get: function(name) {
      var name = escape(Cookie.prefixedName(name)) + '='
      if (document.cookie.indexOf(name) >= 0) {
        var cookies = document.cookie.split(/\s*;\s*/)
        for (var i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf(name) == 0)
            return unescape(cookies[i].substring(name.length, cookies[i].length))
        }
      }
      return null
    },
    set: function(name, value, options) {
      newcookie = [escape(Cookie.prefixedName(name)) + "=" + escape(value)]
      if (options) {
        if (options.expires) newcookie.push("expires=" + options.expires.toGMTString())
        if (options.path)    newcookie.push("path=" + options.path)
        if (options.domain)  newcookie.push("domain=" + options.domain)
        if (options.secure)  newcookie.push("secure")
      }
      document.cookie = newcookie.join('; ')
    }
  }

  var getValue = function(name, defaultValue) {
    var value = Cookie.get(name)
    if (value) {
      if (value == 'true')  return true
      if (value == 'false') return false
      return value
    }
    else return defaultValue
  }
  var setValue = function(name, value) {
    var expiration = new Date()
    expiration.setFullYear(expiration.getFullYear() + 1)
    
    Cookie.set(name, value, { expires: expiration })
  }
}

if (typeof GM_xmlhttpRequest == "function") {
  var xhr = GM_xmlhttpRequest
} else {
  var xhr = function(params) {
    var request = new XMLHttpRequest()
    
    request.onreadystatechange = function() {
      if (params.onreadystatechange) params.onreadystatechange(request)
      if (request.readyState == 4) {
        if (request.status >= 200 && request.status < 400) if (params.onload) params.onload(request)
        else if (params.onerror) params.onerror(request)
      }
    }
    
    request.open(params.method, params.url, true)
    if (params.headers) for (name in params.headers)
      request.setRequestHeader(name, params.headers[name])
    
    request.send(params.data)
    return request
  }
}

var styleElement = null

function addCSS(css) {
  if (typeof GM_addStyle == "function") GM_addStyle(css)
  else {
    if (!styleElement) {
      var head = document.getElementsByTagName('head')[0]
      var styleElement = $E('style', { type: 'text/css' })
      head.appendChild(styleElement)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}
/*** toolkit/time.js ***/
var Time = (function() {
  var sec = { s: 1, m: 60, h: 60 * 60, d: 24 * 60 * 60 }
  
  return {
    agoInWords: function(time, relativeTo) {
      if (!relativeTo) relativeTo = new Date()
      var delta = (relativeTo - time) / 1000
      if (delta < 5) return 'less than 5 seconds'
      else if (delta < 10) return 'less than 10 seconds'
      else if (delta < 20) return 'less than 20 seconds'
      else if (delta < sec.m) return 'less than a minute'
      else if (delta < sec.m * 2) return 'about a minute'
      else if (delta < sec.h) return Math.round(delta / 60) + ' minutes'
      else if (delta < sec.h * 2) return 'about an hour'
      else if (delta < sec.d) return 'about ' + Math.round(delta / 3600) + ' hours'
      else if (delta < sec.d * 2) return '1 day'
      else return Math.round(delta / sec.d) + ' days'
    },
    agoToDate: function(string, relativeTo) {
      if (!relativeTo) relativeTo = new Date()
      var match = string.match(/(?:(?:about|less than) )?(a|an|\d+) ([smhd])/)
      if (match) {
        var amount = Number(match[1]) || 1, metric = match[2]
        return new Date(relativeTo - sec[metric] * amount * 1000)
      }
    }
  }
})()

var jQuery = realWindow.jQuery,
    twttr = realWindow.twttr

function livequeryRun() {
  jQuery.livequery && jQuery.livequery.run()
}

var $et = {
  getTimeline: function() { return(this.timeline = $('timeline')) },
  getPage: function() { return(this.page = document.body.id) },
  getUpdateForm: function() { return(this.updateForm = find(null, 'form.status-update-form')) },
  inspectPage: function() { this.getTimeline(); this.getPage(); this.getUpdateForm() },
  sidebar: $('side'),
  
  currentUser: selectString('meta[@name="session-user-screen_name"]/@content'),
  lastRead: Number(getValue('lastReadTweet', 0)),
  setLastRead: function(id) { setValue('lastReadTweet', (this.lastRead = id).toString()) },
  debug: getValue('debugMode', false),
  sourceString: 'endlesstweets',
  version: '0.9.10',
  scriptSize: 46001,
  
  getSessionCookie: function() {
    return (document.cookie.toString().match(/_twitter_sess=[^\s;]+/) || [])[0]
  }
}

/*** toolkit/analytics.js ***/
function applyAnalytics($, gat, account) {
  var pageTracker = gat && gat._getTracker(account)
  
  if (pageTracker) {
    pageTracker._setDetectFlash(false)
  } else {
    $.segmentUser = $.trackPageview = $.trackEvent = $.trackClicks = function(){}
    return
  }
  
  $.segmentUser = function(seg) {
    try { pageTracker._setVar(seg) } catch(err) {}
  }
  $.trackPageview = function(path) {
    if (path) {
      var url = new URL(path)
      path = url.pathWithQuery()
      if (url.external()) path = '/' + url.host + path
    }
    try { pageTracker._trackPageview(path) } catch(err) {}
  }
  $.trackEvent = function(category, action, label, value) {
    try { pageTracker._trackEvent(category, action, label, value) } catch(err) {}
  }
  $.trackClicks = function(element, fn) {
    element.addEventListener('mousedown', function(e) {
      if (e.button == 0) {
        var url = null
        if (typeof fn == "function") url = fn.call(this, e)
        else if (fn) url = fn
        else if (element.href) url = element.href

        if (url) this.trackPageview(url)
      }
    }, false)
  }
  
  $.trackPageview()
}
applyAnalytics($et, realWindow._gat, "UA-87067-6")

$et.inspectPage()

// have "from Endless Tweets" appear when users post updates
var statusUpdateSource = find($et.updateForm, '#source')
if (statusUpdateSource) statusUpdateSource.value = $et.sourceString

function log(message) {
  if ($et.debug) {
    for (var i = 1; i < arguments.length; i++)
      message = message.replace('%s', arguments[i])
      
    if (typeof GM_log == "function") GM_log(message)
    else if (window.console) console.log(message)
  }
}

if (typeof GM_registerMenuCommand == "function") {
  GM_registerMenuCommand('Endless Tweets debug mode', function() {
    setValue('debugMode', (debugMode = !debugMode))
    alert('debug mode ' + (debugMode ? 'ON' : 'OFF'))
  })
}

if ($et.timeline) {
  var enablePreloading = true,
      loading = false
      
  function stopPreloading(text) {
    enablePreloading = false
    var message = $E('p', { id: 'pagination-message' }, text)
    insertAfter(message, $et.timeline)
  }
  
  function clearPaginationMessage() {
    var message = $('pagination-message')
    if (message) removeChild(message)
  }
  
  var oldLastRead = $et.lastRead
  
  function processTweet(item) {
    var id = Number(item.id.split('_')[1])
    
    if ('home' == $et.page) {
      if (id > $et.lastRead) {
        // a tweet newer than the last read? mark it as new last read
        $et.setLastRead(id)
      } else if (id == oldLastRead) {
        stopPreloading("You have reached the last read tweet.")
        addClassName(item, 'last-read')
      } else if (id < oldLastRead && !enablePreloading) {
        addClassName(item, 'aready-read')
      }
    }
  }
  function processTimeline() {
    forEach(select('> li', $et.timeline), processTweet)
  }
  processTimeline()

  function nearingBottom() {
    var viewportBottom = window.scrollY + window.innerHeight,
        nearNextPageLink = document.body.clientHeight - window.innerHeight/3
    return viewportBottom >= nearNextPageLink
  }
  
  // core functionality of Endless Tweets: global handler that will
  // simulate a click to the "more" link when approaching bottom
  window.addEventListener('scroll', function(e) {
    if (enablePreloading && !loading && nearingBottom()) {
      var moreButton = jQuery('#pagination #more')
      if (moreButton.length) {
        var matches = moreButton.attr('href').match(/\bpage=(\d+)/)
        loading = matches[0]
        var pageNumber = Number(matches[1])
        log('nearing the end of page; loading page %s', pageNumber)
        
        // simulate click by manually invoking cached event handlers
        // (jQuery's trigger functionality doesn't work in Greasemonkey sandbox)
        var handlers = jQuery(realWindow.document).data('events').live
        for (var key in handlers)
          if (key.indexOf(moreButton.selector + 'click') >= 0)
            handlers[key].call(moreButton.get(0))
      }
    }
  }, false)
  
  /*** endless_tweets/polling.js ***/
  var polling = getValue('polling', false)

  function updateTimestamps() {
    var now = new Date()
    
    forEach(select('.meta .published', $et.timeline), function(span) {
      var time, title = span.getAttribute('title')
      if (title) {
        time = new Date(title)
        span.innerHTML = Time.agoInWords(time, now) + ' ago'
      } else if (time = Time.agoToDate(span.textContent, now)) {
        span.setAttribute('title', time.toString())
      }
    })
  }
  updateTimestamps()

  function deliverUpdate(data) {
    var update = buildUpdateFromJSON(data)
    
  	// finally, insert the new tweet in the timeline ...
    insertTop(update, $et.timeline)
    // ... and remove the oldest tweet from the timeline
    removeChild(find($et.timeline, '> li[last()]'))
    
    // never send Growl notifications for own tweets
    if (Notification.supported && data.user.screen_name != $et.currentUser) {
      var title = data.user.screen_name + ' updated ' + strip(find(update, '.published').textContent),
          description = data.text.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      Notification.enqueue({
        title: title, description: description, icon: find(update, '.author img'),
        identifier: 'tw' + data.id, onclick: function() { window.fluid.activate() }
      })
    }
  }

  var debug = false // temp set to true for testing purposes

  function checkUpdates() {
    var url = '/statuses/friends_timeline.json'
    url += debug ? '?count=2' : '?since_id=' + $et.lastRead
    
    log('checking for new tweets (%s)', url)
    loadJSON(url, function(updates) {
      log('found %s new tweets', updates.length)
      var data, count = 0
      for (var i = updates.length - 1; i >= 0; i--) {
        data = updates[i]
        // only show the update if an element with that status ID is not already present
        if (debug || !$('status_' + data.id)) {
          deliverUpdate(data)
          count++
        }
      }
      Notification.release()
      
      if (count) {
        $et.setLastRead(data.id)
        livequeryRun()
        $et.trackEvent('timeline', 'polling', 'found updates for ' + $et.currentUser, count)
      }
    })
  }

  function checkUpdatesConditionally() {
    if (polling && 'home' == $et.page) checkUpdates()
  }

  var updateInterval = setInterval(function() {
    updateTimestamps()
    checkUpdatesConditionally()
  }, (debug ? 12 : 120) * 1000)

  var target = $('rssfeed')
  if (target) {
    var label = $E('label', {id: 'auto_update', title: 'updates your timeline every 2 minutes'})
    var pollToggle = $E('input', { type: 'checkbox' })
    pollToggle.checked = polling
    label.appendChild(pollToggle)
    label.appendChild(document.createTextNode(' auto-update'))
    target.appendChild(label)

    pollToggle.addEventListener('change', function(e) {
      setValue('polling', (polling = pollToggle.checked))
      checkUpdatesConditionally()
      log('polling: %s', polling)
    }, false)
  }
  
  var dynamicPages = ['/home', '/replies', '/inbox', '/favorites', '/search.html'],
      pageSwitched = function() {
        enablePreloading = true
        clearPaginationMessage()
        $et.inspectPage()
      }
  
  // listen to jQuery ajax request to do extra processing after they are done
  jQuery($et.sidebar).bind('ajaxSuccess', function(e, xhr, ajax){
    var url = new URL(ajax.url)
  
    if (ajax.url.indexOf(loading) > -1) {
      loading = false
    } else if (dynamicPages.indexOf(url.path) != -1) {
      $et.trackPageview(url)
      // it's hard to detect searches with DOMNodeInserted below, so do it here
      if (url.path == '/search.html') pageSwitched()
    }
  })
  
  find('container', '.columns').addEventListener('DOMNodeInserted', function(event) {
    var element = event.target
    if (element.nodeType != 1) return
    
    if ('timeline' == element.id) {
      // defer the next step to allow for window.location and body.id to update
      setTimeout(function(){
        pageSwitched()
        if ('home' == $et.page) processTimeline()
      }, 10)
    } else if ('home' == $et.page && $et.timeline == element.parentNode) {
      processTweet(element)
    } else if ('following' == element.parentNode.id) {
      sortFriends()
    }
  }, false)
} else if ('show' == $et.page) {
  /*** endless_tweets/inline_reply.js ***/
  var replyLink = find('content', '.actions .reply')
  if (replyLink) {
    var actions = replyLink.parentNode
    actions.style.top = actions.offsetTop + 'px'
    
    var replyHandler = function(e) {
      var container = $E('div')
      container.innerHTML = "<form action='http://twitter.com/status/update' class='status-update-form' id='status_update_form' method='post'>\
        <fieldset class='common-form standard-form'>\
          <div class='bar'>\
            <h3>\
              <label class='doing' for='status'>What are you doing?</label>\
            </h3>\
            <span class='numeric' id='chars_left_notice'>\
              <strong class='char-counter' id='status-field-char-counter'>\
                140\
              </strong>\
            </span>\
          </div>\
          <div class='info'>\
            <textarea cols='40' id='status' name='status' rows='2'></textarea>\
            <div class='status-btn'>\
              <input class='status-btn round-btn disabled' id='update-submit' name='update' type='submit' value='reply' />\
            </div>\
          </div>\
        </fieldset>\
      </form>"
      
      var username = selectString('meta[@name="page-user-screen_name"]/@content'),
          replyForm = $('permalink').parentNode.appendChild(container.firstChild),
          label = find(replyForm, 'label.doing'),
          textInput = $('status'),
          counter = $('status-field-char-counter'),
          submitButton = $('update-submit'),
          submitDisabled = true,
          updateCounter = function(e) {
            counter.innerHTML = 140 - this.value.length
            if (e && submitDisabled) {
              removeClassName(submitButton, 'disabled')
              submitDisabled = false
            }
          }
          
      label.innerHTML = 'Reply to ' + username + ':'
      textInput.value = '@' + username + ' '
      textInput.focus()
      cursorEnd(textInput)
      updateCounter.call(textInput)
      textInput.addEventListener('keyup', updateCounter, false)
      
      replyForm.addEventListener('submit', function(e) {
        e.preventDefault()
        if (!submitDisabled) {
          addClassName(submitButton, 'disabled')
          submitDisabled = true
          // submit the reply to the server
          twttr.loading()
          loadJSON(replyForm.getAttribute('action'), function(response) {
            twttr.loaded()
            removeChild(replyForm)
            // twitter can return the full HTML for the status
            if (response.status_li) {
              var miniTimeline = $E('ol', { 'class': 'statuses' }, response.status_li)
            } else {
              var miniTimeline = buildUpdateFromJSON(response).parentNode
            }
            insertAfter(miniTimeline, $('permalink'))
            reveal(miniTimeline.firstChild)
            $et.trackEvent('timeline', 'inline_reply', 'replied to ' + username)
          }, {
            method: replyForm.getAttribute('method'),
            data: {
              status: textInput.value,
              in_reply_to_status_id: window.location.toString().match(/\d+/)[0],
              return_rendered_status: true, twttr: true,
              authenticity_token: twttr.form_authenticity_token,
              source: $et.sourceString
            },
            headers: { 'Cookie': $et.getSessionCookie() }
          })
        }
      }, false)
      
      e.preventDefault()
      replyLink.removeEventListener('click', replyHandler, false)
      $et.trackEvent('timeline', 'inline_reply_form', 'replying to ' + username)
    }
    replyLink.addEventListener('click', replyHandler, false)
  }
}

var content = $('content')
if (content) {
  // catch click to "in reply to ..." links
  content.addEventListener('click', function(e) {
    var link = up(e.target, 'a', this)
    if (link && /^\s*in reply to /.test(link.textContent)) {
      var statusID = link.href.match(/(\d+)$/)[1],
          statusUrl = '/statuses/show/' + statusID + '.json',
          fallback = function(xhr) { window.location = link.href }
          
      twttr.loading()
      loadJSON(statusUrl, function(response, xhr) {
        if (xhr.status >= 400) { fallback(xhr); return }
        onAvatarLoad(response, function() {
          var update = buildUpdateFromJSON(response),
              currentStatus = up(link, '.status', content)
              
          if (currentStatus) {
            // we're in a list of statuses
            insertAfter(update, currentStatus)
          } else {
            // we're on a fresh single tweet page
            insertAfter(update.parentNode, $('permalink'))
          }
          reveal(update)
          twttr.loaded()
          livequeryRun()
          $et.trackEvent('timeline', 'in_reply_to', 'loaded status ' + statusID)
        })
      }, { onerror: fallback })
      e.preventDefault()
    }
  }, false)
  
  // catch TAB keypresses in the update form
  content.addEventListener('keydown', function(e) {
    var textarea = null
    if (e.keyCode == 9 && (textarea = up(e.target, 'textarea', this))) {
      if (completeName(textarea)) e.preventDefault()
    }
  }, false)
}

var miniMode = false

function checkViewportWidth() {
  if (document.body.clientWidth < 780) {
    if (!miniMode) {
      addClassName(document.body, 'mini')
      miniMode = true
      $et.trackEvent('layout', 'mini')
    }
  }
  else if (miniMode) {
    removeClassName(document.body, 'mini')
    miniMode = false
    $et.trackEvent('layout', 'restore')
  }
}
window.addEventListener('resize', checkViewportWidth, false)
checkViewportWidth()

// *** JSON to HTML markup for a single update *** //

var buildUpdateFromJSON = (function() {
  var updateContainer,
      updateHTML = "<li class='hentry status u-USERNAME' id='status_ID'>\
        <span class='thumb vcard author'><a class='tweet-url profile-pic url' href='/USERNAME'>\
          <img alt='REAL_NAME' class='photo fn' height='48' src='AVATAR' width='48' />\
        </a></span>\
        <span class='status-body'>\
          <img alt='Icon_lock' class='lock' src='http://assets2.twitter.com/images/icon_lock.gif' title='REAL_NAME’s updates are protected— please don’t share!' />\
          <strong><a class='tweet-url screen-name' href='/USERNAME' title='REAL_NAME'>USERNAME</a></strong>\
          <span class='actions'>\
            <div>\
              <a class='fav-action FAV_CLASS' id='status_star_ID' title='FAV_ACTION this tweet'>&nbsp;&nbsp;</a>\
            </div>\
          </span>\
          <span class='entry-content'>TEXT</span>\
          <span class='meta entry-meta'>\
            <a class='entry-date' href='/USERNAME/status/ID' rel='bookmark'>\
              <span class='published timestamp' title='CREATED_AT'>CREATED_AGO</span>\
            </a>\
            <span>from SOURCE</span>\
            <a href='/IN_REPLY_TO/status/IN_REPLY_TO_STATUS'>in reply to IN_REPLY_TO</a>\
          </span>\
        </span>\
        <ul class='actions-hover'><li>\
          <span class='del'><span class='delete-icon icon'></span><a href='#' title='delete this tweet'>Delete</a></span>\
          <span class='reply'><span class='reply-icon icon'></span><a href='/home?status=@USERNAME%20&amp;in_reply_to_status_id=ID&amp;in_reply_to=USERNAME' title='reply to USERNAME'>Reply</a></span>\
        </li></ul>\
      </li>"
  
  function prepareContainer() {
    if (!updateContainer || updateContainer.parentNode)
      updateContainer = $E('ol', { 'class': 'statuses' })
    return updateContainer
  }
  
  return function(data) {
    var isReply = data.in_reply_to_screen_name,
      date = new Date(data.created_at),
      preparedData = {
        id: data.id,
        username: data.user.screen_name, avatar: data.user.profile_image_url, real_name: data.user.name,
        created_at: date.toString(), created_ago: Time.agoInWords(date) + ' ago',
        text: twitterLinkify(data.text), source: data.source,
        in_reply_to: data.in_reply_to_screen_name, in_reply_to_status: data.in_reply_to_status_id,
        fav_action: data.favorited ? 'un-favorite' : 'favorite',
        fav_class: data.favorited ? 'fav' : 'non-fav',
      },
      own = preparedData.username == $et.currentUser

    prepareContainer()
    updateContainer.innerHTML = updateHTML.replace(/[A-Z][A-Z0-9_]+/g, function(key) {
      return preparedData[key.toLowerCase()] || key
    })
    var update = updateContainer.firstChild
    
    // remove excess elements
    if (!data.user.protected) removeChild(find(update, '.status-body > img'))
    if (!data.in_reply_to_status_id) removeChild(find(update, '.meta > a[last()]'))
    removeChild(find(update, '.actions-hover' + (own ? ' .reply' : ' .del')))
    
    return update
  }
})()

function onAvatarLoad(data, callback) {
  var avatar = new Image()
  avatar.addEventListener('load', callback, false)
  avatar.src = data.user.profile_image_url
}

/*** endless_tweets/friends.js ***/
var friendNames = []

function memoizeFriendName(name) {
  name = name.toLowerCase()
  if (friendNames.indexOf(name) < 0) friendNames.push(name)
}

function detectTimelineMentions() {
  if ($et.timeline) {
    // pick up any author names on the current timeline
    forEach(select('.status-body > strong a/text()', $et.timeline), function(name) {
      memoizeFriendName(name.nodeValue)
    })
    // detect any mentioned names
    forEach(select('.entry-content', $et.timeline), function(body) {
      var matches = body.textContent.match(/@(\w+)/g)
      if (matches) matches.forEach(function(name) {
        memoizeFriendName(name.slice(1, name.length))
      })
    })
    friendNames = friendNames.sort()
  }
}

function completeName(textarea) {
  var slice = function(start, end) {
    return textarea.value.slice(start, end)
  }
  
  var beforeText = slice(0, textarea.selectionStart),
      afterText = slice(textarea.selectionEnd, textarea.value.length),
      selected = slice(textarea.selectionStart, textarea.selectionEnd),
      completionSelection = /^(\w+) ?$/.test(selected),
      match = beforeText.match(/@(\w+)$/),
      trailingWhitespace = /\s/.test(slice(textarea.selectionEnd - 1, textarea.selectionEnd + 1)),
      cursorMode = !selected && (!afterText || trailingWhitespace),
      selectionMode = completionSelection && trailingWhitespace
  
  if (match && (cursorMode || selectionMode)) {
    var completion, found = [], partial = match[1]
    if (!selectionMode) detectTimelineMentions()
    
    friendNames.forEach(function(friend) {
      if (friend.indexOf(partial) === 0 && friend > partial) found.push(friend)
    })
    
    if (found.length == 0) return false
    
    if (selectionMode) {
      var nextIndex = found.indexOf(strip(partial + selected)) + 1
      completion = nextIndex == found.length ? found[0] : found[nextIndex]
    } else {
      completion = found[0]
    }
    
    var fill = completion.replace(partial, '') + ' '
    textarea.value = beforeText + fill + afterText.replace(/^ /, '')
    
    if (found.length > 1) positionCursor(textarea, beforeText.length, beforeText.length + fill.length)
    else if (afterText) positionCursor(textarea, -afterText.length)
    
    return true
  }
}

function compare(a, b, filter) {
  if (filter) {
    a = filter(a); b = filter(b);
  }
  if (a == b) return 0;
  return a < b ? -1 : 1;
}

function sortFriends() {
  var friends = xpath2array(select('#following_list .vcard', $et.sidebar, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE))

  if (friends.length) {
    friends.sort(function(a, b) {
      return compare(a, b, function(vcard) {
        if (!vcard._name) {
          vcard._name = selectString('./a/@href', vcard).match(/(\w+)\s*$/)[1]
          vcard._nameDowncase = vcard._name.toLowerCase()
        }
        return vcard._nameDowncase
      })
    })

    friends.forEach(function(vcard) {
      vcard.parentNode.appendChild(vcard)
      friendNames.push(vcard._nameDowncase)
    })
  }
}
sortFriends()

var jQueryOldCookie = jQuery.cookie
jQuery.cookie = function(name, value, options) {
  if (value && name == "menus" && !(options && options.expires)) {
    if (!options) options = {}
    options.expires = 365
  }
  jQueryOldCookie(name, value, options)
}

// *** iPhone location map *** //

var address = find($et.sidebar, '.vcard .adr')

if (address && /[+-]?\d+\.\d+,[+-]?\d+\.\d+/.test(address.textContent)) {
  var API_KEY = 'ABQIAAAAfOaovFhDnVE3QsBZj_YthxSnhvsz13Tv4UkZBHR3eJwOymtuUxT045UEYNAo1HL_pePrMexH4SYngg',
      coordinates = RegExp['$&']
  // create static map that links to Google Maps
  address.innerHTML = '<a class="googlemap" target="_blank" href="http://maps.google.com/maps?q=' + coordinates + '"><img src="http://maps.google.com/staticmap?center=' + coordinates + '&markers=' + coordinates + ',red&zoom=13&size=165x165&key=' + API_KEY + '" alt=""></a>'
  
  $et.trackClicks(down(address), window.location + '/map')
}

/*** toolkit/update_notifier.js ***/
var checkUserscriptUpdate = (function(){
  // return a no-op function if this is not Greasemonkey
  // (in other browsers we don't have cross-domain permissions)
  if (typeof GM_xmlhttpRequest != "function") return (function() {})
  
  var update = {
    get available() { return getValue('updateAvailable', false) },
    set available(value) { setValue('updateAvailable', value) },
    get scriptLength() { return getValue('scriptLength') },
    set scriptLength(value) { setValue('scriptLength', value) },
    get checkedAt() { return getValue('updateTimestamp') },
    set checkedAt(value) { setValue('updateTimestamp', value) },
    interval: 172800 // 2 days
  }
  
  function validateScriptLength(length, scriptLength) {
    update.available = scriptLength != length
  }
  
  return function(scriptURL, scriptLength, callback) {
    if (!scriptLength) return // we're probably in development mode
  
    // detect user has updated script
    if (update.scriptLength != scriptLength) {
      update.available = false
      update.scriptLength = scriptLength
    }
    var sourceURL = scriptURL.replace(/show\/(\d+)$/, 'source/$1.user.js?update')

    if (!update.available) {
      var time = Math.floor(new Date().getTime() / 1000),
          performCheck = time > update.checkedAt + update.interval

      if (update.checkedAt && performCheck) {
        GM_xmlhttpRequest({
          url: sourceURL, method: 'HEAD',
          headers: { 'Accept-Encoding': '' }, // no gzip, k thx bai
          onload: function(r) {
            var match = r.responseHeaders.match(/Content-Length: (\d+)/)
            if (match) validateScriptLength(Number(match[1]), scriptLength)
            log('Performed check for userscript update (result: %s)', update.available)
          }
        })
      }
      if (!update.checkedAt || performCheck) update.checkedAt = time
    }

    if (update.available) callback()
  }
})()

var scriptURL = 'http://userscripts.org/scripts/show/24398',
    wrapper = find(null, '#content > .wrapper')
    
if ($et.sidebar) {
  var scriptInfo = $E('div', { id: 'endless_tweets', 'class': 'section' }, 'with '),
      scriptLink = $E('a', { href: scriptURL, target: '_blank' }, 'Endless Tweets')
  scriptInfo.appendChild(scriptLink)
  scriptInfo.appendChild(document.createTextNode(' v' + $et.version))
  $et.sidebar.appendChild(scriptInfo)
  $et.trackClicks(scriptLink, '/endless-tweets/sidebar-link')
}

if (wrapper) checkUserscriptUpdate(scriptURL, $et.scriptSize, function() {
  var notice = $E('span', { id: 'userscript_update' },
    '“Endless Tweets” user script has updates (you have v' + scriptVersion + '). ')
  var install = $E('a', { 'href': scriptURL }, 'Get the upgrade')
  notice.appendChild(install)
  
  var topAlert = find('content', '.bulletin.info')
  if (!topAlert && 'home' == $et.page) topAlert = insertTop($E('div', { 'class': 'bulletin info' }), find(wrapper, '.section'))
  if (topAlert) topAlert.appendChild(notice)
  else insertTop(notice, wrapper)
  $et.trackClicks(install, '/endless-tweets/update-link')
})

/*** toolkit/toolkit.js ***/
function $(id){
  return typeof id == 'string' ? document.getElementById(id) : id
}

function down(node) {
  var child = node.firstChild
  while(child && child.nodeType != 1) child = child.nextSibling
  return child
}

function up(node, selector, stopNode) {
  for (; node && (!stopNode || node != stopNode); node = node.parentNode)
    if (matchesCss(node, selector)) return node
}

function matchesCss(node, selector) {
  var tests = selector.match(/^(\w*)(#\w+)?((?:\.\w+)*)$/),
      tag = tests[1],
      id = tests[2],
      classes = tests[3]
  
  if (classes) {
    var classmatch = true
    forEach(classes.split('.'), function(klass) {
      if (klass && !hasClassName(node, klass)) classmatch = false
    })
  }
      
  return (!tag || node.nodeName.toLowerCase() == tag.toLowerCase()) &&
    (!id || node.id == id) && (!classes || classmatch)
}

function hasClassName(element, className) {
  var elementClassName = element.className
  return (elementClassName.length > 0 && (elementClassName == className || 
    new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)))
}

function addClassName(element, className) {
  if (!hasClassName(element, className))
    element.className += (element.className ? ' ' : '') + className
  return element
}

function removeClassName(element, className) {
  element.className = element.className.replace(
    new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ')
  return element
}

function removeChild(element) {
  return element.parentNode.removeChild(element)
}

function insertAfter(element, node) {
  return node.parentNode.insertBefore(element, node.nextSibling)
}

function insertTop(element, node) {
  return node.insertBefore(element, node.firstChild)
}

function $E(name, attributes, content) {
  if (typeof attributes == 'string') {
    content = attributes
    attributes = null
  }
  var node = document.createElement(name)
  if (attributes) for (var attr in attributes) node.setAttribute(attr, attributes[attr])
  if (content) node.innerHTML = content
  return node
}

function forEach(object, block, context) {
  var xpath = typeof object.snapshotItem == "function"
  for (var i = 0, length = xpath ? object.snapshotLength : object.length; i < length; i++)
    block.call(context, xpath ? object.snapshotItem(i) : object[i], i, object)
}

function xpath2array(result) {
  var item, arr = []
  for (var i = 0, length = result.snapshotLength; i < length; i++)
    arr.push(result.snapshotItem(i))
  return arr
}

function select(xpath, parent, type) {
  if (!/^\.?\/./.test(xpath)) xpath = css2xpath(xpath)
  return document.evaluate(xpath, parent || document, null, type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
}
function selectString(xpath, parent) {
  var result = select(xpath, parent, XPathResult.STRING_TYPE)
  return result && result.stringValue
}

function find(parent, xpath, index) {
  parent = $(parent)
  if (index == undefined)
    return select(xpath, parent, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue
  else
    return select(xpath, parent).snapshotItem(index)
}

function xpathClass(name) {
  return "[contains(concat(' ', @class, ' '), ' " + name + " ')]"
}

// only handles child selectors, classnames and IDs
function css2xpath(css) {
  var fragments = css.split(/\s+/), xpath = ['.'], child = false

  xpath.add = function(part) {
    xpath.push(child ? '/' : '//')
    child = false
    xpath.push(part || '*')
  }
  
  fragments.forEach(function(fragment) {
    if (!fragment) return;
    if (fragment == '>') child = true;
    else if (/^([^.]*)\.([\w.-]+)/.test(fragment)) {
      xpath.add(RegExp.$1)
      RegExp.$2.split('.').forEach(function(className) {
        xpath.push(xpathClass(className))
      })
      if (RegExp["$'"]) xpath.push(RegExp["$'"])
    }
    else if (/^([^.]*)#([\w-]+)/.test(fragment)) {
      xpath.add(RegExp.$1)
      xpath.push('[@id="' + RegExp.$2 + '"]')
      if (RegExp["$'"]) xpath.push(RegExp["$'"])
    }
    else xpath.add(fragment)
  })
  return xpath.join('')
}

function getStyle(element, style) {
  element = $(element)
  if (style == 'float') style = 'cssFloat'
  var value = element.style[style]
  if (!value) {
    var css = document.defaultView.getComputedStyle(element, null)
    value = css ? css[style] : null
  }
  if (style == 'opacity') return value ? parseFloat(value) : 1.0
  return value == 'auto' ? null : value
}

function ajax(params) {
  var defaults = {
    method: 'GET',
    onerror: function(response) { log('ERROR ' + response.status) }
  }
  var defaultHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json, text/javascript, text/html, */*'
  }
      
  params = extend(defaults, params)
  params.headers = extend(defaultHeaders, params.headers || {})
  params.url = new URL(params.url).absolutize().toString()
  
  if (typeof params.data == 'object') {
    params.data = objectToQueryString(params.data)
    params.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  
  return xhr(params)
}

function loadJSON(url, onload, params) {
  url = new URL(url)
  
  if (params && params.jsonp) {
    var head = document.getElementsByTagName('head')[0],
		    script = document.createElement('script'),
		    jsonp = ('string' == typeof params.jsonp) ? params.jsonp : '_callback',
		    callback = 'loadJSON' + (++loadJSON.$uid)
		
		window[callback] = function(object) {
		  onload(object)
		  window[callback] = null
		}
		script.src = url.addQuery(jsonp + '=' + callback)
		head.appendChild(script)
  } else {
    params = extend({ url: url, onload: onload }, params || {})
    var handler = params.onload
  
    params.onload = function(response) {
      if (typeof response.getResponseHeader == 'function') {
        // native XMLHttpRequest interface
        var responseType = (response.getResponseHeader('Content-type') || '').split(';')[0]
      } else {
        // GM_xmlhttpRequest interface
        var responseType = (response.responseHeaders.match(/^Content-[Tt]ype:\s*([^\s;]+)/m) || [])[1]
      }
      if (responseType == 'application/json' || responseType == 'text/javascript') {
        var object = eval("(" + response.responseText + ")")
        if (object) handler(object, response)
      }
    }
    return ajax(params)
  }
}
loadJSON.$uid = 0

function strip(string) {
  return string.replace(/^\s+/, '').replace(/\s+$/, '')
}

function objectToQueryString(hash) {
  var pairs = []
  for (key in hash) {
    var value = hash[key]
    if (typeof value != 'undefined') pairs.push(encodeURIComponent(key) + '=' +
      encodeURIComponent(value == null ? '' : String(value)))
  }
  return pairs.join('&')
}

function countOccurences(string, pattern) {
  return string.split(pattern).length - 1
}

var bracketMap = { ']': '[', ')': '(', '}': '{' }

function linkify(text, external) {
  return text.replace(/\b(https?:\/\/|www\.)[^\s]+/g, function(href) {
    // check for punctuation character at the end
    var punct = '', match = href.match(/[.,;:!?\[\](){}"']$/)
    if (match) {
      var punct = match[0], opening = bracketMap[punct]
      // ignore closing bracket if it should be part of the URL (think Wikipedia links)
      if (opening && countOccurences(href, opening) == countOccurences(href, punct)) punct = ''
      // in other cases, last punctuation character should not be a part of the URL
      else href = href.slice(0, -1)
    }
    
    var fullHref = (href.indexOf('http') == 0) ? href : 'http://' + href
    return '<a href="' + fullHref + '"' + (external ? ' target="_blank"' : '') + '>' + href + '</a>' + punct
  })
}

function extend(destination, source) {
  for (var property in source) destination[property] = source[property]
  return destination
}

function cursorEnd(field) {
  positionCursor(field, field.value.length)
}

function positionCursor(field, start, end) {
  if (start < 0) start = field.value.length + start
  if (!end) end = start
  field.selectionStart = start
  field.selectionEnd = end
}

function URL(string) {
  if (string instanceof URL) return string
  
  var match = string.match(/(?:(https?:)\/\/([^\/]+))?([^?]*)(?:\?([^#]*))?(?:#(.*))?/)
  string = match[0]
  this.protocol = match[1]
  this.host = match[2]
  this.path = match[3]
  this.query = match[4]
  this.hash = match[5]
  
  this.toString = function() {
    return string
  }
}

URL.prototype.pathWithQuery = function() {
  return this.path + (this.query ? '?' + this.query : '')
}
URL.prototype.external = function() {
  return this.host && (this.host != window.location.host ||
    this.protocol != window.location.protocol)
}
URL.prototype.absolutize = function() {
  if (this.host) {
    return this
  } else {
    return new URL(window.location.protocol + '//' + window.location.host + this)
  }
}
URL.prototype.addQuery = function(string) {
  return new URL(this.toString() + (this.query ? '&' : '?') + string)
}
/*** toolkit/notification.js ***/
var Notification = (function() {
  var fluid = window.fluid && typeof window.fluid.showGrowlNotification == "function",
      prism = window.platform && typeof window.platform.showNotification == "function",
      supported = fluid || prism,
      queue = []
  
  if (!supported) {
    var show = function() {}
  } else if (fluid) {
    var show = function(params) {
      window.fluid.showGrowlNotification(params)
    }
  } else {
    var show = function(params) {
      window.platform.showNotification(params.title, params.description, params.icon)
    }
  }
  
  return {
    supported: supported,
    show: show,
    enqueue: function(params) {
      if (!supported) return
      queue.push(params)
    },
    release: function() {
      if (!supported) return
      var limit = queue.length - 4
      for (var i = queue.length - 1; i >= 0; i--) {
        if (i < limit) {
          Notification.show({
            title: '(' + limit + ' more update' + (limit > 1 ? 's' : '') + ')',
            description: '',
            onclick: function() { if (fluid) window.fluid.activate() }
          })
          break
        }
        Notification.show(queue[i])
      }
      queue = []
    }
  }
})()

function twitterLinkify(text) {
  // TODO: add class "tweet-url web" to external links
  return linkify(text, true)
    .replace(/(^|\W)@(\w+)/g, '$1@<a href="/$2">$2</a>')
    .replace(/(^|\W)#(\w+)/g, '$1<a href="/search?q=%23$2" title="#$2" class="tweet-url hashtag">#$2</a>')
}

function reveal(element) {
  jQuery(element).hide().slideDown()
}

/*** endless_tweets/endless_tweets.sass ***/
addCSS("#timeline .status-body .meta { white-space: nowrap; }\
#timeline .status.last-read { background: #ffffe8; }\
#timeline .status.last-read.hentry_hover:hover { background: #ffc; }\
#timeline .status.aready-read { color: #555; }\
#timeline .status.aready-read a { color: #444 !important; }\
#timeline .status.aready-read td.content strong a { text-decoration: none; }\
#timeline .status.aready-read td.thumb img { opacity: .6; }\
#pagination-message { font-style: italic; text-align: right; margin: 1em 0 !important; }\
#pagination-message + div.bottom_nav { margin-top: 0 !important; }\
a.googlemap { display: block; margin-top: 4px; }\
#auto_update { margin: 0.5em 14px 1em; display: block; padding: 2px 0; }\
#auto_update input[type=checkbox] { vertical-align: top; }\
body#show .user-info { border-top-color: white; }\
body#show ol.statuses .status-body { font-size: inherit; padding-bottom: 0; }\
body#show ol.statuses .screen-name { font-size: inherit; }\
body#show ol.statuses .actions a { padding: 3px 8px; }\
body#show #content ol.statuses .entry-content { font-size: inherit; font-family: inherit; font-weight: normal; background: transparent; display: inline; line-height: 1.2em; }\
body#show #content ol.statuses .meta { font-size: 0.8em; white-space: nowrap; }\
body#show #status_update_form #chars_left_notice { top: -4px !important; }\
body#profile ol.statuses .thumb + span.status-body { margin-left: 55px; min-height: 50px; }\
body.mini #container { width: 564px; padding: 0; margin: 0; }\
body.mini #container > .columns { margin-bottom: 0; border-collapse: collapse; background: white; }\
body.mini #container > .content-bubble-arrow { display: none; }\
body.mini #content { -moz-border-radius: 0 !important; -webkit-border-radius: 0 !important; padding-top: 40px; }\
body.mini #content .wrapper { padding: 0; }\
body.mini #side_base { -moz-border-radius: 0 !important; -webkit-border-radius: 0 !important; border-left: none !important; display: block; position: absolute; left: 0; top: 0; height: 40px; width: 424px; padding-left: 140px; margin: 0; }\
body.mini#show #container { width: 564px; }\
body.mini#show #content { width: 534px; padding-top: 40px; }\
body.mini ul#primary_nav li { border: none; display: inline; width: auto; }\
body.mini ul.sidebar-menu li.active a { font-weight: normal; }\
body.mini #primary_nav a { display: block !important; float: left; clear: none !important; font-size: 10px !important; padding: 9px 4px !important; }\
body.mini #primary_nav #direct_messages_tab a + a { display: none !important; }\
body.mini #side { margin-bottom: 0; padding-top: 5px; width: auto !important; }\
body.mini #side div.section { padding: 0; }\
body.mini #side #primary_nav ~ *, body.mini #side #message_count, body.mini #side .about, body.mini #side .promotion, body.mini #side #profile_tab { display: none; }\
body.mini #side #profile #me_name, body.mini #side #profile #me_tweets { display: none; }\
body.mini #side #profile .section-links { margin-right: 4px; }\
body.mini #side #profile.section { padding: 0; }\
body.mini #side #profile.profile-side { margin-bottom: 0 !important; }\
body.mini #side .stats { clear: none; float: left; margin: 5px 7px; }\
body.mini #side .stats td + td { border-right: none; padding-right: 0; }\
body.mini #side .stats td + td + td { display: none; }\
body.mini #side .stats a .label { display: none; }\
body.mini #side .user_icon { clear: none !important; float: left !important; width: 31px; position: static !important; }\
body.mini #side #custom_search { display: block; padding: 0; }\
body.mini #side #custom_search.active { background: none !important; }\
body.mini #side #custom_search input[name=q] { margin: 0; width: 55px !important; }\
body.mini #navigation, body.mini #footer { display: none; }\
body.mini #status_update_box { max-width: 540px; }\
body.mini #status_update_box h3 { font-size: 1.1em; }\
body.mini #status_update_box #chars_left_notice { font: 1.2em \"Lucida Grande\", Helvetica, sans-serif; }\
body.mini #status_update_box div.info { text-align: left; }\
body.mini #status_update_box textarea { width: 374px; margin-left: 10px; float: left; }\
body.mini #status_update_box #currently { min-height: auto; width: auto; float: none; clear: both; padding-top: 6px; }\
body.mini #status_update_box ~ .section { padding: 0 7px; }\
body.mini #header { margin: 0 !important; }\
body.mini #header #logo { position: absolute; top: 0; left: 0; z-index: 1; }\
body.mini #header #logo img { margin-top: 0; padding: 5px 8px; width: 125px; height: 29px; }\
body.mini #header #logo ~ * { display: none; }\
body.mini #loader { right: 5px; top: 5px; }\
body.mini.lists #side_base { display: none; }\
body.mini.lists table.columns { margin-top: 0; }\
body.mini.lists #content { padding-top: 0; }\
body.mini.lists #content .list-header { height: 20px; padding-left: 150px; margin-right: -10px !important; }\
body.mini.lists #content .list-header h2 { height: auto; width: auto; font-size: 20px; }\
body.timeline #content h1 { font-size: 1em; color: #333; }\
body.timeline #content h1 b { font-size: 1.2em; }\
body.timeline #content h1 label { font-size: 18px; vertical-align: top; }\
body.timeline #content h1 label a { margin-top: 0 !important; }\
#endless_tweets { padding-top: 0 !important; margin-top: 13px; font-size: 11px; font-variant: small-caps; }\
#endless_tweets a { font-size: 12px; }\
#userscript_update { display: block; }\
.wrapper > #userscript_update { text-align: right; color: gray; padding: 0; font-size: 90%; }\
.bulletin.info #userscript_update { text-align: inherit; }\
body#show #userscript_update { margin: -0.6em 0 0.6em 0; }\
")

// get a reference to the jQuery object, even if it requires
// breaking out of the GreaseMonkey sandbox in Firefox
// (we need to trust Twitter.com)
})(typeof jQuery == "undefined" ? unsafeWindow : window)
