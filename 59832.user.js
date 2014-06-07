// ==UserScript==
// @name           Castle Age - Conscription
// @description    Player names in the Send Castle Age Request list are changed to 'join their army' links; they get the gift items but you don't have to wait or plead.
// @copyright      2009, Benjamin Sorensen
// @license        GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http*://apps.*facebook.com/castle_age/army.php*
// @namespace      http://userscripts.org/users/sparafucile
// @require        http://usocheckup.dune.net/59832.js
// @version        1
// ==/UserScript==

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
var DraftDodgers = document.evaluate("//DIV[@class='condensed_multi_friend_selector']/DIV/LABEL/INPUT", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var idx = DraftDodgers.snapshotLength - 1; idx >= 0; idx--) {
  var ProfileID = DraftDodgers.snapshotItem(idx);
  var Conscript = String(ProfileID.nextSibling.textContent).trim();
  ProfileID.nextSibling.innerHTML = '<a href="http://apps.facebook.com/castle_age//index.php?tp=cht&lka=' + ProfileID.value + '&buf=1"><img src="http://photos-f.ak.fbcdn.net/photos-ak-sf2p/v43/25/46755028429/app_2_46755028429_6218.gif">' + Conscript + '</a>';
}