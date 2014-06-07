// ==UserScript==
// @name           monkey avatars
// @description    Changes the avatars on userscripts.org back to the monkey face instead of gravatar's default kaleidoscope thing..
// @namespace      znerp
// @include        http://userscripts.org/*
// ==/UserScript==

avatars = document.evaluate('//img[contains(@src,"www.gravatar.com/avatar.php?gravatar_id")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = avatars.snapshotLength - 1; i >= 0; i--)
  avatars.snapshotItem(i).src = avatars.snapshotItem(i).src.replace(/default=identicon/, "default=http%3A%2F%2Fuserscripts.org%2Fimages%2Fgravatar_default.png")