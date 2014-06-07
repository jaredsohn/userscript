// ==UserScript==
// @name            4chan Flash Size Selector
// @namespace       http://loopzy.com
// @description     Remove download link for files larger than the given value.
// @include         http://boards.4chan.org/f/up.html
// @version         1.0.2
// @author          killian
// @homepage        http://loopzy.com
// ==/UserScript==

var maxSize = parseInt(prompt('Max Size (KB):', 1024));

if (!isNaN(maxSize)) {
 var  flashSize, domMap = document.getElementsByTagName('TR');
 for (i = 0; i < domMap.length; i++)
  if (domMap[i].childNodes[1] != null)
   if (domMap[i].childNodes[1].firstChild != null)
    if (domMap[i].childNodes[1].firstChild.className === 'commentpostername') {
     flashSize = new String(domMap[i].childNodes[5].innerHTML);
     if (parseInt(flashSize.substring(0, flashSize.length - 2)) > maxSize) {
      domMap[i].style.background = '#D01F3C';
      domMap[i].childNodes[2].innerHTML = '['+domMap[i].childNodes[2].childNodes[1].innerHTML+']';
     } else {
      domMap[i].style.background = '#6BBA70';
     }
    }
}