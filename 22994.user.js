// ==UserScript==
// @name           userscripts forum search minimiser
// @description    Minimises reaults of userscripts forum searches, allowing you to quickly scan topic titles of search results.
// @namespace      znerp
// @include        http://userscripts.org/posts/search?q=*
// @include        http://userscripts.org/posts/search?page=*q=*
// @include        http://userscripts.org/posts/search?q=*page=*
// @include        http://userscripts.org/posts
// @include        http://userscripts.org/posts?page=*
// ==/UserScript==

var parent;
var results = document.evaluate('//table[@class="posts wide"]/tbody/tr[@class="post hentry"]/td[@class="body entry-content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = results.snapshotLength - 1; i >= 0; i--) {
  parent = results.snapshotItem(i)
  
  topic = parent.removeChild(parent.getElementsByTagName("p")[0])
  
  details = document.createElement("div")
  details.setAttribute("class", "details")
  while(parent.firstChild) details.appendChild(parent.removeChild(parent.firstChild))
  
  parent.appendChild(topic)
  
  if (details.innerHTML.length > 200) {
    details.style.display = "none";
    
    beginning = document.createElement("span")
    beginning.innerHTML = details.innerHTML.slice(0, 200) + "...."
    
    showAll = document.createElement("a")
    showAll.textContent = "<show all>"
    showAll.setAttribute("style", "font-size: 0.75em; cursor: pointer;")
    showAll.addEventListener(
      "click",
      function (e) {
        this.parentNode.nextSibling.style.display = "block"
        this.parentNode.parentNode.removeChild(this.parentNode)
      },
      true);
      
    beginning.appendChild(showAll)
    parent.appendChild(beginning)
  }
  
  parent.appendChild(details)
}