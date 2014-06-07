// ==UserScript==
// @name          Hide Personalized Google Search Box
// @author        Michael Felix - gm@mfelix.allmail.net
// @namespace     http://felixfamily.net
// @description   Hides the search box on personalized Google homepages (for those who use the Google toolbar and don't need it wasting their screen space). Adds a link at the top to reshow it.
// @include       http://google.com/ig
// @include       http://www.google.com/ig
// ==/UserScript==

(function(){
  var link = document.getElementById('1a');
  if (!link) return;
  
  var container = link;
  while (!container.tagName.match(/table/i) || !/logo_sm\.gif/.test(container.innerHTML)){
  	container = container.parentNode;
  }
  
  var sibling = container.nextSibling;
  container.parentNode.removeChild(container);

  var links = document.evaluate("//a[contains(@href, '/logout')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (links.snapshotLength == 0) return;
  var logoutlink = links.snapshotItem(0);
  
  link = document.createElement('a');
  link.innerHTML = 'Search';
  link.href= 'javascript://';
  logoutlink.parentNode.insertBefore(link, logoutlink);
  logoutlink.parentNode.insertBefore(document.createTextNode(' | '), logoutlink);
  
  link.onclick = function(){
    if (this.innerHTML == 'Search'){
      sibling.parentNode.insertBefore(container, sibling);
      this.innerHTML = 'Hide Search';
    }
    else {
      container.parentNode.removeChild(container);
      this.innerHTML = 'Search';
    }
  }  	
})();
