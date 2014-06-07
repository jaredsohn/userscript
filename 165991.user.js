// ==UserScript==
// @name        gags4us.com
// @namespace   http://userscripts.org/gags4us.com
// @description Removes the requirement to give a facebook "like" for http://gags4us.com and http://ga-4.us/ in order to access the websites (disables jquery like2unlock plugin).
// @include     http://ga-4.us/*
// @include     https://ga-4.us/*
// @include     http://gags4us.com/*
// @include     https://gags4us.com/*
// @run-at      document-start
// @version     1
// ==/UserScript==

/* LICENSE
    This program was first published on 23 April 2013.
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License version 3 (GPLv3), as 
    published by the Free Software Foundation. A copy of this license 
    is available at <http://www.gnu.org/licenses/>.
    
    When distributing this program, include a credit to the address:
    <https://userscripts.org/users/87483>.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

// don't run on frames or iframes
if (window.top !== window.self){
  return;
}

(function(){
  "use strict";
  // disable intrusive popups
  document.addEventListener('beforescriptexecute', function(e) {
    var src = e.target.src;
    if (src.search(/(?:like2unlock)|(?:jquery\.lightbox\.?).*\.js$/i) !== -1) {
      e.preventDefault();
      e.stopPropagation();
      console.log("- Disabling script: ", src);
    }
  });

  /*
      Sometimes the image is blurred some period after the page loads, possibly due to bahaviour described in:
      http://www.chromium.org/developers/design-documents/user-scripts
      This script unblurs the image on `DOMContentLoaded` and `load`, and adds a click event so that the user can unblur manually if all else fails
      Todo: Further investigation to make script more reliable on Chrome
  */

  document.addEventListener('DOMContentLoaded', function(){
    addCssHideRule('#midadcontainer, #fake-content-to-lock, .ui-locker-facebook-style, .ui-facebook-locker-error, #image-overlay-placeholder, .jquery-lightbox-move, .jquery-lightbox-overlay');
    var img = document.evaluate('.//*[@id="image-border"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (img){
      console.log("Original image: ", img.src);
      var originalImgSrc = img.src;
      var modifiedImgSrc = unblurImgSrc(originalImgSrc);
      if (modifiedImgSrc !== originalImgSrc){
        img.src = modifiedImgSrc;
        console.log("New image:      ", img.src);

        document.addEventListener('load', function(){
          img.src = modifiedImgSrc;
        });

        var evtClickUnblur = function(e){
          if (e.target.tagName === 'IMG'){
            if (e.target.src !== modifiedImgSrc){
              e.target.src = modifiedImgSrc;
              e.target.removeEventListener(e.type, evtClickUnblur);
            }
          }
        };
        img.addEventListener('click', evtClickUnblur);
      }        
      img = null;
    }
  });

  function addCssHideRule(selectors){
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = selectors + ' { display: none !important; height: 0 !important; }';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    var head = document.head;
    head.appendChild(style);
  }
  
  function unblurImgSrc(url){
      var regex = /_r(\.[a-zA-Z]{3})$/i;
      return url.replace(regex, '$1');
  }
})();