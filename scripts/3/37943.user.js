// ==UserScript==
// @name           GMail Auto-Expand
// @namespace      http://userscripts.org/users/63868
// @description    Expand conversations automatically
// @include        http://mail.google.com*
// @include        https://mail.google.com*
// @require        http://userscripts.org/scripts/source/56812.user.js
// ==/UserScript==

var api = new USO.Gmail()

api.on('view:cv', function () {
  var view   = this.view
    , expand = view.ownerDocument.evaluate
      ( ".//img[@alt='Expand all']"
      , view
      , null
      , XPathResult.FIRST_ORDERED_NODE_TYPE
      , null
      )
      .singleNodeValue

  if (expand) {
    this.click(expand.parentNode)
  }
})
