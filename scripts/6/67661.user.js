// ==UserScript==
// @name        Nico User Ads Hider
// @namespace   http://userscripts.org/users/121129 
// @description ニコニコ動画のランキングから宣伝コメントと宣伝による装飾を削除
// @match       http://www.nicovideo.jp/ranking*
// @version     3
// @grant       none
// @run-at      document-end
// ==/UserScript==

/*
 このスクリプトが Google Chrome にインストールされるとき、
 manifest.json の run_at プロパティに document_end が設定されるように、
 "@run-at document-end" を明示する。
*/

(function() {
  'use strict'
  
  var ginzaBody = document.querySelector('div.contentBody.video')
  if (ginzaBody) {
    newMutationObserver(function(mutationRecords) {
      mutationRecords.forEach(function(r) {
        if (r.type !== 'attributes') return
        if (r.attributeName === 'class'
         && r.target.className.indexOf('uadlevel') >= 0) {
          r.target.className = r.oldValue
        } else if (r.attributeName === 'style'
                && r.target.style.display === ''
                && (r.target.hasAttribute('data-video-comments')
                 || r.target.className === 'count ads')) {
          r.target.style.display = 'none'
        }
      })
    }).observe(ginzaBody, {
      attributes: true,
      subtree: true,
      attributeOldValue: true,
      attributeFilter: ['class', 'style'],
    })
    return
  }

  function newMutationObserver(callback) {
    if (typeof MutationObserver === 'undefined') {
      return new WebKitMutationObserver(callback)
    }
    return new MutationObserver(callback)
  }
  
  function isUserAdsCommentShown(mutationRecord) {
    return mutationRecord.attributeName === 'style'
        && /^item\d{1,3}_uad_current$/.test(mutationRecord.target.id)
        && mutationRecord.target.style.display !== 'none'
  }

  var pageObj = (function() {
    
    function isCategoryRankingPage() {
      return /^\/ranking\/.+$/.test(window.location.pathname)
    }
    
    function isOverallRankingPage() {
      return /^\/ranking\/?$/.test(window.location.pathname)
    }
    
    if (isOverallRankingPage()) {
      return {
          decorationClassNameRegExp: /(silver|gold)/
        , setClassName: function(target) {
            target.className = target.className.split(' ').filter(function(c) {
              return !(c === 'silver' || c === 'gold')
            }).join(' ')
          }
        , observationTargetId: 'ranking_main'
      }
    } else if (isCategoryRankingPage()) {
      return {
          decorationClassNameRegExp: /thumb_frm_rank_/
        , setClassName: function(target) { target.className = 'thumb_frm' }
        , observationTargetId: 'mainContainer'
      }
    } else {
      throw new Error(window.location.toString())
    }
  })()

  function isMovieDecorated(mutationRecord) {
    var r = mutationRecord
    return r.attributeName === 'class'
        && /^item\d{1,3}$/.test(r.target.id)
        && pageObj.decorationClassNameRegExp.test(r.target.className)
  }
  
  newMutationObserver(function(mutationRecords) {
    mutationRecords.forEach(function(mutationRecord) {
      if (isUserAdsCommentShown(mutationRecord)) {
        mutationRecord.target.style.display = 'none'
      } else if (isMovieDecorated(mutationRecord)) {
        pageObj.setClassName(mutationRecord.target)
      }
    })
  }).observe(document.getElementById(pageObj.observationTargetId), {
      attributes: true
    , subtree: true
    , attributeFilter: ['class', 'style']
  })

})()
