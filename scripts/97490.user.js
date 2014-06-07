// ==UserScript==
// @name           Remove Facebook's Photo Viewer by thefacebookforum.net
// @copyright      Dion Designs - Developed for TheFacebookForum.net
// @description    Replaces new photo viewer by the old one
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/home.php?sk=lf
// @include        http://www.facebook.com/home.php?filter=app_*
// @include        http://www.facebook.com/photo.php*
// @include        https://www.facebook.com/*
// @include        https://www.facebook.com/home.php?sk=lf
// @include        https://www.facebook.com/home.php?filter=app_*
// @include        https://www.facebook.com/photo.php*
// ==/UserScript==

var isActive = false;

var parse_links = function() {

   if (isActive) {
      console.log('INFO: DOM modification function already active');
      return;
   }
   try {
      isActive = true;
      var links = document.getElementsByTagName("a");
      for(var i=0; i < links.length; i++){
         if(links[i].rel == "theater"){
            links[i].rel = "asdf";
         }
      }

     var url = document.location.href;
       if((url.indexOf("facebook.com") != -1) && (url.indexOf("&theater") != -1)){
       window.location.href = url.replace("&theater", "");
      }

    } catch(e) {
      console.error("ERROR: " + e.toString());
    } finally {
      isActive = false;
    }
};

document.body.addEventListener("DOMSubtreeModified", parse_links, false);