// ==UserScript==
// @name          Cleanup SuperFundo
// @description   Hides AD's and cleans up SuperFundo
// @include        http://superfundo.org/*
// @include        http://*.superfundo.org/*
// ==/UserScript==

var boxRight = document.getElementById('right');
boxRight.style.display='none';

var headRight = document.getElementById('headright');
headRight.style.display='none';

var content = document.getElementById('content');
content.style.width = '100%';

for (var i = 0; i < content.childNodes.length; i++){
  if (content.childNodes[i].nodeName == 'TABLE'){
    //leave the torrent table alone
  }
  else if (content.childNodes[i].nodeName == '#text'){
    content.childNodes[i].nodeValue = '';
  } 
  else {
    content.childNodes[i].style.display='none';
  }
}