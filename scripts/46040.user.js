// ==UserScript==
// @name           Gametrailers.com - No age verification and no ads (v2)
// @namespace      ...
// @description    Removes age-verification and ads from any players!
// @include        http://www.gametrailers.com/video/*
// @include        http://www.gametrailers.com/player/*
// ==/UserScript==

// div-containers containing the player
var array_divs = new Array("HDMovie","SDMovie","QuictimeSDMovie","QuicktimeHDMovie","WindowsMediaPlayer");

function fixFlash(obj) {
  try {
    var is_flv = false;
    if(unsafeWindow.document.getElementById("HDMovie")) {
      is_flv = true;
    } else if(unsafeWindow.document.getElementById("SDMovie")) {
      is_flv = true;
    }
    if(is_flv) {
      obj.addVariable("adurl","");
      obj.addVariable("agegatebool","0");
      obj.addParam("allowFullScreen","true");
      for(k in array_divs)
        if(unsafeWindow.document.getElementById(array_divs[k]))
          obj.write(array_divs[k]);
    }
  } catch(e) {return false;}
  return true;
}

function fixNeo() {
  try {
    for(k in array_divs)
      if(unsafeWindow.document.getElementById(array_divs[k]))
        unsafeWindow.NeoPlayer.ageCheck(1, 1, 1989, array_divs[k]);
  } catch(e) {return false;}
  return true;
}

function setCookie() {
  try {
    unsafeWindow.ageCookie();
  } catch(e) {return false;}
  return true;
}

function ageSkip(obj) {
  fixFlash(obj); // type 1
  fixNeo();      // type 2
  setCookie();   // type 3
}

(function(){
  ageSkip(unsafeWindow.so); // this may change when GT sourcecode is updated
})();
