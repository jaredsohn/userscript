// ==UserScript==
// @name        Tom's Hardware Print View++
// @description Edit of http://userscripts.org/scripts/show/73871, makes it rss friendly.
// @include     http://*tomshardware.com*
// @version     2011.11.7
// ==/UserScript==

(function ()
{
  var links, style;
  if (location.href.match('review_print')) {
    style = document.createElement('style');
    style.textContent = 'body {max-width: 40em; margin: 1em auto}';
    document.getElementsByTagName('head')[0].appendChild(style);
    document.body.setAttribute('onload', ''); // disable window.print()
  }
  else if(location.href.match('/reviews/') && location.href.match(/.*,\d*\.html/))
  {
      window.location = 
      location.href.replace('.html', '')
      .replace(/reviews.*,/, 'review_print.php?p1=');
  }
  else {
    links = document.evaluate("//a[contains(@href, '/reviews/')]",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var index = 0; index < links.snapshotLength; index++)
      if (links.snapshotItem(index).href.match(/.*,\d*\.html/))
      links.snapshotItem(index).href =
      links.snapshotItem(index).href.replace('.html', '')
      .replace(/reviews.*,/, 'review_print.php?p1=');
  }
})();