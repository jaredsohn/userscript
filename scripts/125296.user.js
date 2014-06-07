// ==UserScript==
// @name           NYPL search on Worldswithoutend.com
// @namespace      maeki.org
// @description    Add a search link to search for a book on NYPL catalogue
// @include        https://www.worldswithoutend.com/novel.asp*
// @include        http://www.worldswithoutend.com/novel.asp*
// @include        https://worldswithoutend.com/novel.asp*
// @include        http://worldswithoutend.com/novel.asp*
// ==/UserScript==

var metadata = document.head.getElementsByTagName('meta')
for (var i=0;i<metadata.length;i++) {
    var currentElem = metadata[i];
    if(currentElem.getAttribute('property') == "og:title")
       var title = currentElem.getAttribute('content');

       i = metadata.length;
       var newElement = document.createElement('A');
       newElement.innerHTML = '<img src="https://www.mediabistro.com/galleycat/files/original/nypl.JPG"/>';
       newElement.href = "http://nypl.bibliocommons.com/search?custom_query=Title:" + title;
       var nb = document.getElementById('novelblock_big');
       nb.parentNode.childNodes[9].appendChild(newElement);
}
