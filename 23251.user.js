// ==UserScript==
// @name          Anorak Zone Informe Wiki Fixer
// @description	  Make the text entry box on Informe wikis big enough to actually use
// @include       http://anorakzoneforum.informe.com/wiki/*
// ==/UserScript==

(function() {
var el,thisel;

el = document.evaluate(
    '//textarea',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < el.snapshotLength; i++)
{
  thisel = el.snapshotItem(i);
  thisel.setAttribute("rows","25");
  thisel.setAttribute("cols","80");
}
}

)();
