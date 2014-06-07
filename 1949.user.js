// ==UserScript==
// @name          Google Paragraph Linker
// @namespace     http://zoolcar9.lhukie.net/
// @include       http://www.google.com/search*
// @include       http://www.google.com/custom*
// @description	  http://www.extensionsmirror.nl/index.php?showtopic=4391
// ==/UserScript==

(function() {

  //Add global style. You can remove this if you have your own custom style
  var style, head;
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'p.g:hover { cursor: pointer; background-color: #e5ecf9; }';
  head = document.getElementsByTagName('head')[0];
  head.appendChild(style);  

  //Initiate
  var links, link;
  links = document.evaluate('//p[@class="g"]/a',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(!links) return;

  for(var i = 0; i < links.snapshotLength; i++) {
    link = links.snapshotItem(i);
    link.parentNode.style.cursor = 'pointer';
    link.parentNode.title = link.href;
    link.parentNode.addEventListener('click', function(event) {
      url = this.getElementsByTagName('a')[0].href;
      document.location.href = url;
    }, false);
  }

})();

