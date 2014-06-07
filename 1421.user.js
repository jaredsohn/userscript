// ==UserScript==
// @name          MozillaZine Article Collapser
// @namespace     http://zoolcar9.lhukie.net/
// @include       http://mozillazine.org/
// @include       http://www.mozillazine.org/
// @description	  Expand/collapse articles. Screenshot: http://xrl.us/guiw
// ==/UserScript==

(function() {
  function addGlobalStyle() {
    style = document.createElement('style');
    style.id = 'gmstyle';
    style.setAttribute('type', 'text/css');
    style.innerHTML = (
      '#headlines h2 {\n' +
      '  margin-top: 1em !important;\n' +
      '}\n\n' +
      '#headlines h3 {\n' +
      '  color: #066;\n' +
      '}\n\n' +
      '#headlines h3:hover {\n' +
      '  text-decoration: underline;\n' +
      '  cursor: pointer;\n' +
      '}\n\n'
    );
    head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }

  addGlobalStyle();

  var aTitles, aTitle, stryTxt, stryRspncLnk;

  aTitles = document.evaluate('//div[@id="headlines"]/h3',
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for(var i = 0; i < aTitles.snapshotLength; i++) {
    aTitle = aTitles.snapshotItem(i);
    stryTxt = aTitle.nextSibling.nextSibling;
    stryTxt.style.display = 'none';
    stryRspncLnk = stryTxt.nextSibling.nextSibling;
    stryRspncLnk.style.display = 'none';
    aTitle.addEventListener('click', function(event) {
      var stryTxt = this.nextSibling.nextSibling;
      var stryRspncLnk = stryTxt.nextSibling.nextSibling;
      if(!stryRspncLnk.style.display) {
        stryTxt.style.display = 'none';
        stryRspncLnk.style.display = 'none';
      } else {
        stryTxt.removeAttribute('style');
        stryRspncLnk.removeAttribute('style');
      }
    }, false);
  }
})();

