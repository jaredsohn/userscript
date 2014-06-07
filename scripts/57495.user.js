// ==UserScript==
// @name           GMail Auto "Show Details"
// @namespace      http://userscripts.org/users/tim
// @description    Automatically shows the details of a message.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @require        http://userscripts.org/scripts/source/56812.user.js
// ==/UserScript==

// Initialise the GMailAPI
var api = new USO.Gmail()

api.on('view:cv', function () {
  var view  = this.view
  var links = view.ownerDocument.evaluate(
        './/span[contains(., "show details")]'
      , view
      , null
      , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
      , null
      )
  var link  = null

  for (var i = 0; i < links.snapshotLength; i++) { 
    link = links.snapshotItem(i)
    this.click(link)
  }
})

