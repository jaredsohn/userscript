// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Image resizing for pixiv
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Resizes an image in full resolution view so it fits into the screen. Enlarge it by clicking on it + automatic scrolling to the clicked position...
// @include        http://www.pixiv.net/*mode=big*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//



//========Variables========
//Note: "true" switches an option on, "false" switches it off

//Autoresize the image on pageload?
autoresize = true;

//Do not edit below this line, unless you know what you're doing...
//=========================



image = document.getElementsByTagName('img')[0];

function styleImage() {
   if ( image ) {
      oldstyle = image.getAttribute("style");
      if ( oldstyle == null ) oldstyle = "";
      newstyle = oldstyle + ";" + "cursor:pointer;cursor:-moz-zoom-out;";

      //If the image is small resizing does nothing and therefore the default cursor is used instead, so that the user doesn't
      //expect something to happen if he clicks onto the image...
      if ( parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("width")) &&
           parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("height")) ) {
         if ( (parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("width")) < (screen.availWidth-125)) &&
              (parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("height")) < (screen.availHeight-225)) ) {
            newstyle = newstyle.replace(/cursor.pointer./, "cursor:default;");
            newstyle = newstyle.replace(/cursor..moz[^;]*;/i, "");
        }
      }

      image.setAttribute("style", newstyle);
   }
}

function updateCursor() {
   if ( image ) {
      //Note: Firefox seems to add a space after the colon automatically. Therefore we need ... instead of .. in the regexp!
      cursorStyle = image.getAttribute('style').match(/cursor...?moz[^;]*;/i);
      if ( cursorStyle ) {
         if (oldstyle.indexOf("max-width") != -1 ){
            newstyle = image.getAttribute('style').replace(/cursor...?moz[^;]*;/i, "cursor:-moz-zoom-out;");
            image.setAttribute('style', newstyle);
         }
         else {
            newstyle = image.getAttribute('style').replace(/cursor...?moz[^;]*;/i, "cursor:-moz-zoom-in;");
            image.setAttribute('style', newstyle);
         }
      }
   }
}

function resizeImage() {
   max_x = screen.availWidth-125;
   max_y = screen.availHeight-225;
   oldstyle = image.getAttribute("style");
   if ( oldstyle == null ) oldstyle = "";
   if ( oldstyle.indexOf("max-width") == -1 ) {
      image.setAttribute("style", oldstyle + "; max-width: " + max_x + "px; max-height: " + max_y + "px; height: auto; width: auto;");
   }
   else {
      newstyle = oldstyle.replace(/max.*auto/, "");
      image.setAttribute("style", newstyle);
   }
   updateCursor();
}

function autoresizeImage() {
   //Autoresize the image if switched on
   if ( autoresize) {
      if ( image ) {
         resizeImage();
      }
   }
}

function scrollAndResize(coords) {
   leftOffset = 225;
   topOffset = 125;
   click_x = coords.pageX-leftOffset;
   click_y = coords.pageY-topOffset;
   imageWidth = parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("width"));
   imageHeight = parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("height"));
   relative_x = click_x/imageWidth;
   relative_y = click_y/imageHeight;

   //DEBUG:
   //alert(leftOffset + " " + topOffset);
   //alert(click_x + " " + click_y);
   //alert(imageWidth + " " + imageHeight);
   //alert(relative_x + " " + relative_y);

   resizeImage();

   new_imageWidth = parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("width"));
   new_imageHeight = parseInt(document.defaultView.getComputedStyle(image,null).getPropertyValue("height"));
   absolute_x = new_imageWidth * relative_x;
   absolute_y = new_imageHeight * relative_y;
   scrollpos_x = leftOffset + absolute_x - screen.availWidth/2;
   scrollpos_y = topOffset + absolute_y - screen.availHeight/3;

   //DEBUG:
   //alert(new_imageWidth + " " + new_imageHeight);
   //alert(absolute_x + " " + absolute_y);
   //alert(scrollpos_x + " " + scrollpos_y);

   //if we switched to "fit into screen view" we scroll back to be actually able to see the whole image,
   //if we switched to "full resolution view" we scroll to the clicked position (the position of interest).
   if ( image.getAttribute("style").indexOf("max-width") != -1 ) {
      window.scrollTo(leftOffset/2, topOffset/2);
   }
   else {
      window.scrollTo(scrollpos_x, scrollpos_y);
   }
   coords.stopPropagation();
}

oldcoords = undefined;
scrolled = false;
mouseButtonPressed = false;
function moveImage(coords) { 
   if ((!oldcoords) && mouseButtonPressed) {
      oldcoords = coords;
   }
   if (mouseButtonPressed) {
      var coordX_diff = oldcoords.clientX - coords.clientX;
      var coordY_diff = oldcoords.clientY - coords.clientY;
      if ((coordX_diff > 2) || (coordX_diff < -2) || (coordY_diff > 2) || (coordY_diff < -2)) {
         window.scrollBy(coordX_diff, coordY_diff)
         oldcoords = coords;
         scrolled = true;
         newstyle = image.getAttribute('style').replace(/cursor...?moz[^;]*;/i, "cursor: move;");
         image.setAttribute('style', newstyle);
      }
   }
}

function stopMove(coords) {
   oldcoords = undefined;
   mouseButtonPressed = false;
   if (!scrolled && (coords.button == 0)) {
      scrollAndResize(coords);
   }
   scrolled = false;
   newstyle = image.getAttribute('style').replace(/cursor..move;/i, "cursor: hand; cursor: -moz-zoom-out;");
   image.setAttribute('style', newstyle);
   updateCursor();
}

//Attach eventlistener to the image
if ( image ) {
   image.parentNode.addEventListener("mousedown", function(e) {mouseButtonPressed = true; e.preventDefault();}, false);
   image.parentNode.addEventListener("mouseup", function(e) {mouseButtonPressed = false; e.preventDefault();}, false);

   image.addEventListener("mouseup", function(e) {stopMove(e)}, false);
   image.addEventListener("mousemove", function(e) {moveImage(e)}, false);
}

//Wait until the page has finished loading
if ( image ) {
   window.addEventListener("load", function(e) {styleImage()}, false);
   window.addEventListener("load", function(e) {autoresizeImage()}, false);
}