// ==UserScript==
// @name           addTarget
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http*
// ==/UserScript==

function addTarget(doc) {
  var links = doc.getElementsByTagName('a');
  Array.forEach(links,
  function(link) {
    switch (link.target) {
    case '':
    case '_blank':
    case '_self':
      {
        if (link.host != location.host || link.protocol != location.protocol && link.href.indexOf('javascript:')) link.setAttribute('target', '_blank');
        else link.removeAttribute('target');

        break;
      }
    }

  })
}
addTarget(document.body);

window.AutoPagerize && window.AutoPagerize.addFilter(function(docs) {
  docs.forEach(addTarget)
})

