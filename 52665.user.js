// ==UserScript==
// @name           IMVU - Open new message dialog in new window/tab
// @namespace      IMVU
// @description    This script will replace the imvu function for new messages to make them appear in a new window.
// @include        http://*.imvu.com/*
// @author         Productions, http://avatars.imvu.com/Productions
// ==/UserScript==
unsafeWindow.IMVU.messagePopupShow = function(obj) {
  var recipientId = (typeof obj.force_recipient_id != 'undefined' ? obj.force_recipient_id : (typeof obj.recipient_id ? obj.recipient_id : ''));
  unsafeWindow.open('http://www.imvu.com/catalog/web_send_message_widget.php?recipient_id='+recipientId, '_blank');
}