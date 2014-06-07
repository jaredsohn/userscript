// ==UserScript==
// @name           Animwallscenter: link changes
// @namespace      http://userscripts.org/users/87790
// @author         Hadogenes
// @description    Changes link to wallpapers to direct one on animwallscenter.free.fr
// @include        http://animwallscenter.free.fr/WebGallery/*
// ==/UserScript==

function getElementByClass(tagName,className){
  var tags = document.getElementsByTagName(tagName);
  var finds = [];
  
  for(var i = 0, len = tags.length; i < len;++i){
    if(tags[i].className.indexOf(className) != -1)
       finds.push(tags[i]);
  }
   
  return finds;
}

function change_links() {
  // Make a list of images
  var imgList = getElementByClass("img", "thumbnail");
  
  var newUrl = "";
  var oldUrl_ar;
  
  for (var i = 0; i < imgList.length; ++i) {
    oldUrl_ar = imgList[i].src.split('/');
    
    newUrl = "";
    
    // Pobieranie tylko z linku galleries/<nazwa anime>
    for (var i2 = 0; oldUrl_ar[i2] != "thumbnail"; ++i2) {
      newUrl += oldUrl_ar[i2] + "/";
    }
    
    newUrl += imgList[i].alt;
    
    imgList[i].parentNode.href = newUrl;
  }
}

change_links();