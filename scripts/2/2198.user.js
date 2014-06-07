// ==UserScript==
// @name          Userscripts.org Spambot Comments Remover
// @namespace     http://zoolcar9.lhukie.net/mozilla/userscripts/
// @include       http://userscripts.org/scripts/show/*
// @include       http://www.userscripts.org/scripts/show/*
// @description	  Removes comments by spambot at USO
// ==/UserScript==

(function() {
  var spammers, spammer;

  spammers = document.evaluate(
    '//div[@class="comment"]/b/a[@href="/people/1859"]/parent::*/parent::*',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(!spammers.snapshotLength) return;

  for(var i = 0; i < spammers.snapshotLength; i++) {
    spammer = spammers.snapshotItem(i);
    spammer.parentNode.removeChild(spammer);
  }

})();

