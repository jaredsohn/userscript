// ==UserScript==
// @name        Rllmuk Show Likes
// @description Allows non-Supporters to view Likes by clicking on rep scores
// @namespace   https://github.com/insin/greasemonkey/
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// @version     1
// ==/UserScript==
var scoreNodes = document.evaluate(
  '//span[contains(@class, "rep_show")]'
, document
, null
, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
, null)

for (var i = 0; i < scoreNodes.snapshotLength; i++) {
  var scoreNode = scoreNodes.snapshotItem(i)
    , postId = scoreNode.parentNode.parentNode.parentNode.id.split('_').pop()
  console.log(postId)
  scoreNode.addEventListener('click', showLikes.bind(null, postId))
}

var ipb = unsafeWindow.ipb

function showLikes(id) {
  var app = 'forums'
    , type = 'pid'
  if (typeof ipb.global.popups['likeMore'] != 'undefined') {
    ipb.global.popups['likeMore'].kill()
  }
  var popid = 'showlikes' + id
    , _url = ipb.vars['base_url'] + '&app=core&module=ajax&section=reputation&do=more&secure_key=' + ipb.vars['secure_hash'] + '&f_app=' + app + '&f_type=' + type + '&f_id=' + id
  ipb.global.popups['likeMore'] = new ipb.Popup(popid, {
    type: 'pane'
  , ajaxURL: _url
  , stem: false
  , hideAtStart: false
  , h: 500
  , w: '450px'
  })
}