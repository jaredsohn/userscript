// ==UserScript==
// @name           Remove Meme Garbage
// @author         Michael Mitchell
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/125391
// @description    Removes meme garbage
// @include        *facebook.com*
// ==/UserScript==

function removeMemes() {
  var elems = document.getElementsByTagName('*'), i;
  for (i in elems) {
    if (elems[i].className.indexOf("actorDescription actorName") != -1) {
      if (elems[i].childNodes[0].innerHTML.toLowerCase().indexOf("memes") != -1) {
        var parent = elems[i], j = 12;
        while (j-- && (parent = parent.parentNode));
        parent.style.display = 'None';
      }
    }
    if (elems[i].childNodes.length == 3 && 
       elems[i].className.indexOf("actorName") != -1) {
      if (elems[i].childNodes[2].innerHTML.toLowerCase().indexOf("memes") != -1) {
        var parent = elems[i], j = 12;
        while (j-- && (parent = parent.parentNode));
        parent.style.display = 'None';
      }
    }
    if (elems[i].className.indexOf("uiAttachmentTitle") != -1) {
      if (elems[i].childNodes[0].innerHTML.toLowerCase().indexOf("memes") != -1) {
        var parent = elems[i], j = 14;
        while (j-- && (parent = parent.parentNode));
        parent.style.display = 'None';
      }
    }
    if (elems[i].className.indexOf("uiAttachmentDetails") != -1) {
      if (elems[i].childNodes[0].innerHTML.toLowerCase().indexOf("memes") != -1) {
        var parent = elems[i], j = 11;
        while (j-- && (parent = parent.parentNode));
        parent.style.display = 'None';
      }
    }
  }
}

document.addEventListener("DOMNodeInserted", removeMemes, true);