// ==UserScript==
// @name           GMail 'Archive' and 'Delete' next conversation.
// @namespace      http://userscripts.org/users/tim
// @description    Instead of returning to the Inbox after archiving or deleting a conversation, you switch to the next one in line.
// @include        http://mail.google.com*
// @include        https://mail.google.com*
// @require        http://userscripts.org/scripts/source/56812.user.js
// ==/UserScript==

var api   = new USO.Gmail()
  , older = null

api.on('view:cv', function () {
  var view = this.view
    , buttons, button

  older = view.ownerDocument.evaluate
  ( ".//span[contains(., 'Older') and @role='link']"
  , view
  , null
  , XPathResult.FIRST_ORDERED_NODE_TYPE
  , null
  )
  .singleNodeValue

  if (!older) {
    return
  }

  buttons = view.ownerDocument.evaluate
  ( ".//div[(contains(., 'Archive') or contains(., 'Delete')) and @role='button']"
  , view
  , null
  , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
  , null
  )

  if (4 !== buttons.length) {
    return
  }

  for (var i = 0; i < buttons.snapshotLength; i++) {
    button = buttons.snapshotItem(i)
    button.addEventListener
    ( 'mouseup', function () {
        if (!older) {
          return
        }
        api.click(older)
      }
    , false
    )
  }
})

api.on('loaded', function () {
  this
    .canvas
    .ownerDocument
    .addEventListener
    ( 'keydown', function (event) {
        if (!older) {
          return
        }

        switch (event.keyCode) {
        case 69:
          break
        case 51:
          if (!event.shiftKey) {
            return
          }
          break
        default:
          return
        }

        setTimeout(function () { api.click(older) }, 0)
      }
    , false
    )
})
