// ==UserScript==

// @name           RoundcubeNotify
// @description    Fluid Growl Notification for Roundcube
// @namespace      http://www.quist.de/

// @include        *
// ==/UserScript==

if (unsafeWindow['rcmail']) {
  var rcmail = unsafeWindow.rcmail;
  rcmail._set_unread_count = rcmail.set_unread_count;
  rcmail.set_unread_count = function(mbox, count, set_title) {
    if (count > 0 && count != this.env.unread_counts[mbox]) {
      unsafeWindow.fluid.showGrowlNotification({
        title:'New mail',
        description: 'New mails in ' + mbox,
        onclick: function() {
          if (unsafeWindow.rcmail.env.mailbox != mbox)
            unsafeWindow.rcmail.list_mailbox(mbox);
        }
      });
    }
    return this._set_unread_count(mbox, count, set_title);
  };
}