// ==UserScript==
// @name           Facebook Memory Forgetter
// @author         Adam Krebs
// @version        1.9
// @description    Removes "photo memories" on Facebook unobtrusively
// @include        *.facebook.com*
// @exclude        *apps.facebook.com*
// ==/UserScript==

function Remove_Facebook_Memories() {

   var egos = document.getElementsByClassName('ego_fb_photo');
   var esug = document.getElementsByClassName('egoFullPhotoSuggestion');

   if (egos && egos[0].style.visibility != 'none') { //Prevents the visibility from being set multiple times unnecessarily
      for ( i=0; i<egos.length; i++ ) {
         egos[i].parentElement.style.display = 'none';
         egos[i].parentNode.findElementsByClassName('uiHeader')[0].style.display = 'none';
      }

      for ( i=0; i<egos.length; i++ ) {
         esug[i].parentElement.style.display = 'none';
         esug[i].parentNode.findElementsByClassName('uiHeader')[0].style.display = 'none';
      }
   }
}

document.addEventListener("DOMNodeInserted", Remove_Facebook_Memories, true);