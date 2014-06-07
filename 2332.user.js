// ==UserScript==
// @name          Sage - Blogger Links
// @namespace     http://loucypher.wordpress.com/
// @include       file:///*/chrome/sage.html
// @description	  Repace Technorati trackback links with Blogger search
// ==/UserScript==

(function() {
  var searchLinks, searchLink;
  searchLinks = document.evaluate('//a[@title="Technorati Trackback"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for(var i = 0; i < searchLinks.snapshotLength; i++) {
    searchLink = searchLinks.snapshotItem(i);
    searchLink.title = 'Blogger Search';
    searchLink.href = searchLink.href.replace(/www\.technorati\.com\/cosmos\/search\.html\?url/, 'search.blogger.com/?q');

    searchLink.firstChild.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATBAMAAACAfiv%2FAAAAB3RJTUUH1QwNAg4q%2FwEi1gAAAAlwSFlzAAAK8AAACvABQqw0mAAAADBQTFRFPxkA%2FmYC%2FnIS%2FoIy%2Fp5e%2Fqpu%2FrKC%2Fr6O%2Fs6u%2Ftq%2B%2Fvbu%2Fv7%2BAAAAAAAAAAAAAAAAwVATTQAAAAF0Uk5TAEDm2GYAAABUSURBVHjaY2BAAoyCICAAYgpCAFwQLMwoKL56dxOUWb17904oc%2FUWr92GEObuQJHdyVAmCGAyAwVFd8O0uXjvghu2ezvcil2FECbcYiTnIDsSGwAAwLwgVQZxcTgAAAAASUVORK5CYII%3D';
    //you can remove the following lines if you're not using sageZine.css
    searchLink.firstChild.style.visibility = 'visible';
    searchLink.parentNode.setAttribute('style', 'background-color: transparent; background-image: none !important;');
  }
})();

