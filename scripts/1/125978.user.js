// ==UserScript==
// @id             qlchathistory@phob.net
// @name           Quake Live Chat History
// @version        0.54
// @namespace      phob.net
// @author         wn
// @description    Persist your Quake Live chat
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/125978.meta.js
// ==/UserScript==


// Helper to add CSS
function addStyle(aContent) {
  if (Array.isArray(aContent)) aContent = aContent.join("\n");
  var s = document.createElement("style");
  s.type = "text/css";
  s.textContent = aContent;
  document.body.appendChild(s);
}

// Stylin'
addStyle(".qlch_spacer { margin: 2px auto; width: 94%; border-bottom: 1px solid #ccc }");



var suffix = ":history";

var oldAddContact = quakelive.mod_friends.roster.AddContact;
quakelive.mod_friends.roster.AddContact = function(item) {
  var preLen = quakelive.mod_friends.roster.fullRoster.length;

  // Call the original to (possibly) get the contact added.
  oldAddContact.call(quakelive.mod_friends.roster, item);

  // If a contact wasn't added, stop now.
  if (preLen == quakelive.mod_friends.roster.fullRoster.length) {
    return;
  }

  // Get stuff from the latest roster item.
  var fullRoster = quakelive.mod_friends.roster.fullRoster
    , frLast = fullRoster[fullRoster.length - 1]
    , oldReceivedMsg = frLast.ReceivedMsg
    , oldSendMessage = frLast.SendMessage
    , oldOnSelected = frLast.OnSelected
    , oldAppendToHistory = frLast.AppendToHistory;

  // Helper to save chat history.  Only save non-spacer items from within the
  // past two weeks.
  // TODO: always keep a certain minimum, even if older than 2 weeks
  frLast.QLCH_SaveHistory = function() {
    var now = new Date().getTime();
    var saveHist = frLast.history.filter(function(el) {
      return !("qlchSpacer" in el || now - el.date.getTime() > 12096E5);
    });
    amplify.store(frLast.jid.bare + suffix, saveHist);
  }

  // Override the message functions for this contact to make them persist the
  // history.
  frLast.ReceivedMsg = function(what, raw) {
    oldReceivedMsg.call(frLast, what, raw);
    frLast.QLCH_SaveHistory();
  }

  frLast.SendMessage = function(what) {
    oldSendMessage.call(frLast, what);
    frLast.QLCH_SaveHistory();
  }

  // Restore the contact history from storage.
  // SelectContact will handle filling in the content.
  frLast.history = amplify.store(frLast.jid.bare + suffix) || [];

  // Dates don't get converted back by Amplify... needed for timestamps.
  for (var i = 0, e = frLast.history.length; i < e; ++i) {
    frLast.history[i].date = new Date(frLast.history[i].date);
  }

  // If there were history items, add a spacer to separate them.
  if (frLast.history.length) {
    frLast.history.push({"qlchSpacer": true});
  }

  // Override OnSelected to reset the "date changed" tracker.
  frLast.qlchLastDate = null;

  frLast.OnSelected = function() {
    oldOnSelected.call(frLast);
    frLast.qlchLastDate = null;
  }

  // Override AppendToHistory to replace the chat timestamp and handle spacers.
  // Only show the full date when it changes.
  frLast.AppendToHistory = function(hist) {
    // Intercept chat history spacers.
    if ("qlchSpacer" in hist) {
      quakelive.mod_friends.node.find("#im-chat-body-bottom")
          .before("<div class='qlch_spacer'></div>");

      // Reset the chat origin for new items.
      frLast.prevChatOrigin = null;

      return;
    }

    oldAppendToHistory.call(frLast, hist);

    var d = hist.date.getFullYear() + "-" + (hist.date.getMonth()+1) + "-"
          + hist.date.getDate();

    if (d != frLast.qlchLastDate) {
      frLast.prevChatNode.find("span.chat-timestamp").last().text(
          "(" + d + " " + hist.date.getHours() + ":"
        + ZeroPad(hist.date.getMinutes()) + ":" + ZeroPad(hist.date.getSeconds())
        + ")");
    }

    frLast.qlchLastDate = d;
  }
};
