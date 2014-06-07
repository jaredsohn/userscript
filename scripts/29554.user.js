// ==UserScript==
// @name           Open in New Window
// @namespace      http://ellab.org/
// @description    Add alternate "open in new window" link besides normal links
// @include        *
// ==/UserScript==

function addOpenInNewWindowLink(item) {
  if (item.getAttribute('ellab-openinnewwindow-addedlink')) return;
  item.setAttribute('ellab-openinnewwindow-addedlink', 'true');

  var a = document.createElement('a');
  a.innerHTML = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC' width='10' height='10' border='0' style='padding:0px; margin:0px; border:0px; float:none; width:10px; height:10px;'/>";
  a.setAttribute('style', 'padding:0px 5px; margin:0px; background:none; border:0px;');
  a.href = item.href;
  a.target = '_blank';
  a.setAttribute('ellab-openinnewwindow-addedlink', 'true');
  var nextSibling = item.nextSibling;
  if (nextSibling) {
    item.parentNode.insertBefore(a, nextSibling);
  }
  else {
    item.parentNode.appendChild(a);
  }
}

function modifyLink(item) {
  item.target = '';
  //addOpenInNewWindowLink(item);
  item.addEventListener('mouseover', function(e) { addOpenInNewWindowLink(item); }, false);
}

var res = document.evaluate("//a[starts-with(@href, 'http')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0;i<res.snapshotLength;i++) {
  var item = res.snapshotItem(i);
  // only apply on simple link (i.e. with simple text, no img, no nested elements)
  if (item.href != document.location.href &&
      item.innerHTML && item.innerHTML.indexOf('<') < 0) {
    modifyLink(res.snapshotItem(i));
  }
}