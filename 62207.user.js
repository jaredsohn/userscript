// ==UserScript==
// @name          Facebook pager
// @namespace     http://jeffpalm.com/facebookpager
// @description   Adds a pager to the bottom of facebook photo pagers
// @include       http://*facebook.com/album.php*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

const NEW_ID = '_new_pager_id';

function doDeepCopy(div,n) {
  div.className = n.className;
  var kids = n.childNodes;
  if (kids) {
    for (var i in kids) {
      if (kids[i].nodeName != '#text') {
        var newNode = document.createElement(kids[i].nodeName);
        doDeepCopy(newNode,kids[i]);
        div.appendChild(newNode);
      }
      if (kids[i].nodeName.toLowerCase() == 'a') {
        newNode.href = kids[i].href;
        newNode.innerHTML = kids[i].innerHTML;
      }
    }

  }
}

function deepCopy(n) {
  var div = document.createElement(n.nodeName);
  doDeepCopy(div,n);
  return div;
}

function addNewPager(div) {
  var newDiv = deepCopy(div);
  newDiv.id = NEW_ID;
  var albumContainer = document.getElementById('album_container');
  albumContainer.parentNode.insertBefore(newDiv,albumContainer.nextSibling);
}

function main() {
  // 
  // We have to repeat this because it disappears for some reason?
  //
  checkPager();
  setInterval(checkPager,3000);
}
 
function checkPager() {
  //
  // Don't do this again
  //
  if (document.getElementById(NEW_ID)) return;
  //
  // Now insert the new pager and get some mexican food
  //
  var divs = document.getElementsByTagName('div');
  for (var i in divs) {
    if (divs[i].className && divs[i].className == 'pagerpro_container') {
      addNewPager(divs[i]);
      break;
    }
  }
}

main();
