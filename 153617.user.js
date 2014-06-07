// ==UserScript==
// @name        Pixiv Image Size Fitting
// @namespace   http://userscripts.org/users/121129
// @description pixiv の原寸画像が表示域内に収まるように画像サイズを変更
// @include     http://www.pixiv.net/member_illust.php?*
// @version     6
// @grant       none
// ==/UserScript==

;(function() {
  'use strict'
  
  var img = document.querySelector('img')
  
  function hasBigModeParam() {
    var s = window.location.search
    if (s.length === 0) return false
    var params = s.substring(1).split('&')
    return params.some(function(param) {
      return param === 'mode=big'
    })
  }
  function isIllustOutOfViewport() {
    var bodyStyle = window.getComputedStyle(document.body)
    
    var height = parseInt(bodyStyle.paddingTop, 10)
               + img.height
               + parseInt(bodyStyle.paddingBottom, 10)
    if (height > window.innerHeight) return true
    
    var width = parseInt(bodyStyle.paddingLeft, 10)
              + img.width
              + parseInt(bodyStyle.paddingRight, 10)
    return width > window.innerWidth ? true : false
  }
  function removeSurround() {
    document.body.style.padding = '0px'
  }
  function fitIllustInViewport() {
    if (img.height > window.innerHeight) img.height = window.innerHeight
    if (img.width > window.innerWidth) {
      if (img.hasAttribute('height')) {
        img.height = Math.round(img.height * (window.innerWidth / img.width))
      }
      img.width = window.innerWidth
    }
  }
  function isCharKeyEvent(event, character) {
    return !event.altKey
        && !event.ctrlKey
        && !event.metaKey
        && !event.shiftKey
        && String.fromCharCode(event.keyCode) === character.toUpperCase()
  }
  function isFitted() {
    return img.hasAttribute('height') || img.hasAttribute('width')
  }
  function clearFitting() {
    img.removeAttribute('height')
    img.removeAttribute('width')
  }
  function toggleIllustSize() {
    if (isFitted()) {
      clearFitting()
    } else {
      fitIllustInViewport()
    }
  }
  function fitIllustIfOutOfViewport() {
    if (!isIllustOutOfViewport()) return
    removeSurround()
    fitIllustInViewport()
  }
  function main() {
    if (!hasBigModeParam()) return
    if (img.complete) {
      fitIllustIfOutOfViewport()
    } else {
      img.addEventListener('load', fitIllustIfOutOfViewport)
    }
    window.addEventListener('resize', function() {
      if (!img.complete) return
      if (isFitted()) clearFitting()
      fitIllustIfOutOfViewport()
    })
    window.addEventListener('keydown', function(e) {
      if (isCharKeyEvent(e, 'o')) toggleIllustSize()
    }, false)
  }
  
  main()
})()
