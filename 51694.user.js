// ==UserScript==
// @name           GMail Automatically Show Images
// @namespace      http://userscripts.org/users/tim
// @include        https://mail.google.com*
// @include        http://mail.google.com*
// @require        http://userscripts.org/scripts/source/56812.user.js
// ==/UserScript==

var api = new USO.Gmail()

api.on('view:cv', function () {
  var view = this.view
    , span = view.ownerDocument.evaluate
      ( ".//span[contains(., 'Always display images from ')]"
      , view
      , null
      , XPathResult.FIRST_ORDERED_NODE_TYPE
      , null
      )
      .singleNodeValue

  if (span) {
    api.click(span)
  }
})
