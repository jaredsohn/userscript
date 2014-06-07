// ==UserScript==
// @name           GMail Inbox After Reply
// @namespace      http://userscripts.org/users/63868
// @include        http://mail.google.com*
// @include        https://mail.google.com*
// @require        http://userscripts.org/scripts/source/56812.user.js
// ==/UserScript==

var api = new USO.Gmail()

api.on('view:cv', function () {
  this.view.addEventListener('DOMNodeInserted', onNodeInsert, false)
})

var onNodeInsert = function onNodeInsert () {
  if (api.view_type !== 'cv') {
    return this.removeEventListener('DOMNodeInserted', onNodeInsert, false)
  }

  var alert = this.ownerDocument.evaluate
    (   ".//div[contains(., 'Your message has been sent.') "
      + "and @aria-atomic='true' and @aria-live='polite']"
    , this
    , null
    , XPathResult.FIRST_ORDERED_NODE_TYPE
    , null
    )
    .singleNodeValue

  if (alert) {
    top.location.hash = '#mbox'
  }
}
