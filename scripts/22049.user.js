// Neopets - Wider News
// by nungryscpro (nungryscpro@yahoo.com)
// Version 1.0
// Last Updated: 2008.01.31
//
// ==UserScript==
// @name           Neopets - Wider News
// @namespace      http://userscripts.org/users/22349
// @description    Removes 'New in NC Mall' and 'New Games' tables to make room for the News.  Removes scrolling from the News table.  
// @include        http://www.neopets.com/nf.phtml*
// @include        http://neopets.com/nf.phtml*
// ==/UserScript==
//
(function(){
  if (document.location.href.match('oldnews')){
    for (x = 0; x < document.getElementsByTagName('div').length; x++){
      thisDiv = document.getElementsByTagName('div')[x]
      if (thisDiv.getAttribute('style') && thisDiv.getAttribute('style').match('505px')){
        newDiv = document.createElement('div');
        newDiv.setAttribute('style', 'text-align: justify; padding-top: 7px;');
        newDiv.innerHTML = thisDiv.innerHTML;
        thisDiv.parentNode.insertBefore(newDiv, thisDiv.nextSibling);
        thisDiv.parentNode.removeChild(thisDiv);
        break;
      }
    }
  }
  else {
    document.getElementById('newfeatures').setAttribute('style', 'width: 100%; text-align: left;');
  }
  for (x = 0; x < document.getElementsByTagName('td').length; x++){
    thisCell = document.getElementsByTagName('td')[x]
    if (thisCell.getAttribute('width') == '302'){
      thisCell.parentNode.removeChild(thisCell.previousSibling.previousSibling);
      thisCell.parentNode.removeChild(thisCell);
      break;
    }
  }
})();