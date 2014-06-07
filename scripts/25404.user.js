// ==UserScript==
// @name           PixivImageEnlarger
// @namespace      http://polog.org/
// @description    Enlarge Pixiv Images
// @include        http://www.pixiv.net/member_illust.php*
// ==/UserScript==

var visibilize_by_id = function(id){document.getElementById(id).style.overflow = 'visible';};

Array.some(document.images,function(e){
  var matcher = null;
  if(matcher = e.src.match(/^(.*?)_m\.(jpg|jpeg|gif|png)$/i)){
    e.src = matcher[1] + '.' + matcher[2];
    return true;
  }
  return false;
});
