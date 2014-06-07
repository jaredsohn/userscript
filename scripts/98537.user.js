// ==UserScript==
// @name           GMail - Compose In Peace (HTML)
// @namespace      http://biagio.arobba.com/greasemonkey/
// @description    Removes GMail sidebar on the "compose" and "draft" pages only. (HTML mode)
// @include        https://mail.google.com/mail/h/*/?v=b&pv=tl&cs=b
// @include        https://mail.google.com/mail/h/*/?v=b&pv=tl&cs=b&f=1
// @include        https://mail.google.com/mail/h/*/?draft=*&search=drafts&cpt=c&pv=tl&view=b&rfpc=?&cs=c
// @include        https://mail.google.com/mail/h/*/?v=b&draft=*&s=d&pv=tl&cs=wd

// ==/UserScript==
var elements = document.evaluate("/html/body/table[3]/tbody/tr/td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var elem = elements.snapshotItem(0);
elem.style.display = 'none';
