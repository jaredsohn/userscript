// ==UserScript==
// @name        Google Top Bar Move Video Next to Images
// @namespace   YourNameHere
// @include     http*://www.google.tld/*
// @version     1
// @grant GM_log
// ==/UserScript==

function getListItem(container, matchString){
  var liNodes = container.getElementsByTagName("li");
  for (var i=0; i<liNodes.length; i++){
    if (liNodes[i].textContent == matchString) return liNodes[i];
  }
  return null;
}
function fixMenu(){
  var toplist = document.getElementById("gbzc");
  if (!toplist){
    retrycount++;
    if(retrycount<=3){
      GM_log("no top bar... rescheduling");
      window.setTimeout(fixMenu, 500);
    } else {
      GM_log("no top bar... failed");
    }
  }
  var vidNode = getListItem(toplist, "Videos");
  if (vidNode){
    var imgNode = getListItem(toplist, "Images");
    if (imgNode){
      var imgClone = imgNode.cloneNode(true);
      var vidLink = vidNode.children[0];
      var vidCloneLink = imgClone.children[0];
      vidCloneLink.onclick = vidLink.onclick;
      vidCloneLink.href = vidLink.href;
      vidCloneLink.id = vidLink.id;
      vidCloneLink.children[1].textContent = vidLink.textContent;
      imgNode.parentNode.insertBefore(imgClone, imgNode.nextElementSibling);
    }
  }
}
var retryCount = 0;
fixMenu();