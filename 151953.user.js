// ==UserScript==
// @name        Nico Next Live Watcher
// @namespace   http://userscripts.org/users/121129
// @description ニコニコ生放送の次枠への移動をサポート
// @include     http://live.nicovideo.jp/watch/*
// @version     4
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*
 * DOMParser HTML extension
 * 2012-09-04
 * 
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
 
/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/
 
(function(DOMParser) {
	"use strict";
 
//	var
//	   DOMParser_proto = DOMParser.prototype
//	  DOMParser_proto = Object.getPrototypeOf(new DOMParser())
//	, real_parseFromString = DOMParser_proto.parseFromString
//	;

	var DOMParser_proto = DOMParser.prototype;
	if (typeof DOMParser_proto === 'undefined') {
		DOMParser_proto = DOMParser.wrappedJSObject.prototype
	}
	var real_parseFromString = DOMParser_proto.parseFromString

	// Firefox/Opera/IE throw errors on unsupported types
	try {
		// WebKit returns null on unsupported types
		if ((new DOMParser).parseFromString("", "text/html")) {
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}
 
	DOMParser_proto.parseFromString = function(markup, type) {
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var
			  doc = document.implementation.createHTMLDocument("")
			;
 
			doc.body.innerHTML = markup;
			return doc;
		} else {
			return real_parseFromString.apply(this, arguments);
		}
	};
}(DOMParser));

;(function() {
  'use strict'

  var HTTP_OK = 200
  var MAX_REQUEST_COUNT = 45
  var REQUEST_INTERVAL = 20000

  function LivePage() {}
  LivePage.prototype.init = function() {
    this.nextLiveButton = this.newNextLiveButton()
    this.nextLiveButtonListener = this.startWaitingNextLive.bind(this)
    this.enableNextLiveButton()
    this.errorInfoNode = this.newErrorInfoNode()
  }
  LivePage.prototype.newNextLiveButton = function() {
    var result = document.createElement('span')
    result.style.color = this.nextLiveButtonColor
    return result
  }
  LivePage.prototype.enableNextLiveButton = function() {
    this.nextLiveButton.textContent = '次枠へ移動'
    this.nextLiveButton.style.textDecoration = 'underline'
    this.nextLiveButton.style.cursor = 'pointer'
    this.nextLiveButton.addEventListener('click'
                                       , this.nextLiveButtonListener
                                       , false)
  }
  LivePage.prototype.disableNextLiveButton = function() {
    this.nextLiveButton.textContent = '次枠を待っています...'
    this.nextLiveButton.style.textDecoration = ''
    this.nextLiveButton.style.cursor = ''
    this.nextLiveButton.removeEventListener('click'
                                          , this.nextLiveButtonListener
                                          , false)
  }
  LivePage.prototype.newErrorInfoNode = function() {
    var result = document.createElement('span')
    result.style.color = 'red'
    return result
  }
  LivePage.prototype.showErrorInfo = function(errorMessage) {
    this.errorInfoNode.textContent = '(' + errorMessage + ')'
    this.nextLiveButton.parentNode.appendChild(this.errorInfoNode)
  }
  LivePage.prototype.hideErrorInfo = function() {
    if (this.errorInfoNode.parentNode) {
      this.errorInfoNode.parentNode.removeChild(this.errorInfoNode)
    }
  }
  LivePage.prototype.isValid = function() {
    return this.getMenu() && this.getCommunityURL()
  }
  LivePage.prototype.getMenu = function() {
    return document.querySelector(this.menuSelector)
  }
  LivePage.prototype.getCommunityURL = function() {
    var a = document.querySelector(this.communityLinkSelector)
    return a ? a.href : ''
  }
  LivePage.prototype.resetStateWithErrorMessage = function(errorMessage) {
    this.showErrorInfo(errorMessage)
    this.enableNextLiveButton()
  }
  LivePage.prototype.moveToNextLiveOrRewait = function(count, response) {
    if (response.status === HTTP_OK) {
      var d = new DOMParser().parseFromString(response.responseText
                                            , 'text/html')
      var next = d.querySelector(
                     '#now_live div.frm_now_cnt div.now_item p.r a')
      if (next) {
        window.location.assign(next.href)
      } else {
        var c = (count || 0) + 1
        if (c <= MAX_REQUEST_COUNT) {
          window.setTimeout(this.waitNextLive.bind(this, c), REQUEST_INTERVAL)
        } else {
          this.resetStateWithErrorMessage('時間切れ')
        }
      }
    } else {
      this.resetStateWithErrorMessage(response.statusText)
    }
  }
  LivePage.prototype.startWaitingNextLive = function() {
    this.hideErrorInfo()
    this.disableNextLiveButton()
    this.waitNextLive()
  }
  LivePage.prototype.waitNextLive = function(count) {
    GM_xmlhttpRequest({
        method: 'GET'
      , url: this.getCommunityURL()
      , timeout: 30000
      , onload: this.moveToNextLiveOrRewait.bind(this, count)
      , onerror: this.resetStateWithErrorMessage.bind(this, 'エラー')
      , ontimeout: this.resetStateWithErrorMessage
                       .bind(this, 'リクエストタイムアウト')
    })
  }


  function QLivePage() {
    this.nextLiveButtonColor = '#333333'
    this.menuSelector = '#watch_player_bottom_box div.box_inner ul.utilty_menu'
    this.communityLinkSelector = '#watch_title_box div.box_inner a.commu_name'
  }
  QLivePage.prototype = new LivePage()
  QLivePage.prototype.addNextLiveButtonToMenu = function() {
    var li = document.createElement('li')
    li.appendChild(this.nextLiveButton)
    this.getMenu().appendChild(li)
  }


  function HarajukuLivePage() {
    this.nextLiveButtonColor = '#003399'
    this.menuSelector = '#player_btm > div:last-child'
    this.communityLinkSelector = 'div#titlebar h2#title a#title'
  }
  HarajukuLivePage.prototype = new LivePage()
  HarajukuLivePage.prototype.addNextLiveButtonToMenu = function() {
    var menu = this.getMenu()
    menu.appendChild(document.createTextNode(' | '))
    menu.appendChild(this.nextLiveButton)
  }


  function getPage() {
    var qLivePage = new QLivePage()
    if (qLivePage.isValid()) return qLivePage

    var harajukuLivePage = new HarajukuLivePage()
    if (harajukuLivePage.isValid()) return harajukuLivePage

    return null
  }

  var page = getPage()
  if (page) {
    page.init()
    page.addNextLiveButtonToMenu()
  }

})()
