// ==UserScript==
// @name          Drag to Resize
// @namespace 	  http://kylej.name/
// @description	  Drag to resize images, based on code in the RES.
// @author        Kabaka
// @include       *
// @exclude       http://www.chess.com/*
// @exclude       http://chess.com/*
// ==/UserScript==

/* 
 * Drag to Resize - Drag images to resize them no matter where you are.
 * 
 * The image resizing code was extracted from honestbleeps's
 * (steve@honestbleeps.com) Reddit Enhancement Suite, a GPL
 * Greasemonkey script. The idea was, as far as I know, all his. What
 * I've done is duplicated that feature in this script and started
 * adding on things to make it useful in different contexts.
 *
 * Because it now runs everywhere, it will likely break some web
 * sites. And it definitely opens up doors for some silliness such as
 * making images hilariously gigantic. If this script causes you to
 * lose data, money, or time, don't hold me responsible!
 *
 *
 * Instructions:
 *
 *   To resize an image, hold the left mouse button and drag. Down and to the
 *   right will expand. Up and to the left will shrink. Images aligned to the
 *   right will expand in an unusual way. Sorry.
 *
 *   To reset an image to original size, right-click it.
 *
 *   To make an image fit the screen (by height), double-click.
 *
 *   To drag an image without resizing (as if the script were not installed),
 *   hold control (or command on Mac) and drag.
 *
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var imageData = Array();

/*
 * Find all img elements on the page and feed them to makeImageZoomable().
 * Also, record the image's original width in imageData[] in case the user
 * wants to restore size later.
 */
function findAllImages()
{
  var imgs = document.getElementsByTagName('img');
  
  for (i=0; i<imgs.length; i++)
  {
    // We will populate this as the user interacts with the image, if they
    // do at all.
    imageData[imgs[i]] = {};
    imageData[imgs[i]].resized = false;

    makeImageZoomable(imgs[i]);
  }

}

/*
 * Calculate the drag size for the event. This is taken directly from
 * honestbleeps's Reddit Enhancement Suite.
 *
 * @param e mousedown or mousemove event.
 * @return Size for image resizing.
 */
function getDragSize(e)
{
		return (p = Math.pow)(p(e.clientX - (rc = e.target.getBoundingClientRect()).left, 2) + p(e.clientY - rc.top, 2), .5);
}

/*
 * Get the viewport's vertical size. This should work in most browsers. We'll
 * use this when making images fit the screen by height.
 *
 * @return Viewport size.
 */
function getHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

/*
 * Set up events for the given img element to make it zoomable via
 * drag to zoom. Most of this is taken directly from honestbleeps's
 * Reddit Enhancement Suite. Event functions are currently written
 * inline. For readability, I may move them. But the code is small
 * enough that I don't yet care.
 *
 * @param imgTag Image element.
 */
function makeImageZoomable(imgTag)
{
  dragTargetData = {};

  imgTag.addEventListener('mousedown', function(e)
  {
    if(e.ctrlKey != 0)
      return true;

    /*
     * This is so we can support the command key on Mac. The combination of OS
     * and browser changes how the key is passed to JavaScript. So we're just
     * going to catch all of them. This means we'll also be catching meta keys
     * for other systems. Oh well! Patches are welcome.
     */
    if(e.metaKey != null) // Can be on some platforms
      if(e.metaKey != 0)
        return true;


    if(e.button == 0)
    {
      // Store some data about the image in case we want to restore size later.
    
      // This would be easier if we could just keep imgs[i].style and set it
      // directly, but that doesn't seem to work.
      if(imageData[e.target].position ==  null)
      {
        imageData[e.target].zIndex = e.target.style.zIndex;
        imageData[e.target].width = e.target.style.width;
        imageData[e.target].height = e.target.style.height;
        imageData[e.target].position = e.target.style.position;
      }

      dragTargetData.iw = e.target.width;
      dragTargetData.d = getDragSize(e);
      dragTargetData.dr = false;

      e.preventDefault();
    }

  }, true);

  imgTag.addEventListener('contextmenu', function(e){
    if(imageData[e.target].resized)
    {
      imageData[e.target].resized = false;
      e.target.style.zIndex = imageData[e.target].zIndex;
      e.target.style.maxWidth = e.target.style.width = imageData[e.target].width;
      e.target.style.maxHeight = e.target.style.height = imageData[e.target].height;
      e.target.style.position = imageData[e.target].position;

      // Prevent the context menu from actually appearing.
      e.preventDefault();
      e.returnValue = false;
      e.stopPropagation();
      return false;
    }
  
  }, true);
  imgTag.addEventListener('dblclick', function(e)
  {
    if(e.ctrlKey != 0)
      return true;

    if(e.metaKey != null) // Can be on some platforms
      if(e.metaKey != 0)
        return true;


    if(imageData[e.target].resized)
    {
      // If we've already resized it, we have to set this back to the
      // original value. Otherwise, the max size image will keep the
      // original width. Dunno why!
      e.target.style.maxWidth = e.target.style.width = imageData[e.target].width;
    }

    e.target.style.position = "fixed";
    e.target.style.zIndex = 1000;
    e.target.style.top = 0;
    e.target.style.left = 0;
    e.target.style.maxWidth = e.target.style.width = "auto";
    e.target.style.maxHeight = e.target.style.height = getHeight() + "px";
      
    imageData[e.target].resized = true;

    // Most browsers will want to save the image or something. Prevent that.
    e.preventDefault();
    e.returnValue = false;
    e.stopPropagation();
    return false;

  }, true);
  imgTag.addEventListener('mousemove', function(e)
  {
    if (dragTargetData.d){
      e.target.style.maxWidth = e.target.style.width = ((getDragSize(e)) * dragTargetData.iw / dragTargetData.d) + "px";
      e.target.style.maxHeight = '';
      e.target.style.height = 'auto';
      e.target.style.zIndex = 1000; // Make sure the image is on top.

      if(e.target.style.position == '')
      {
        e.target.style.position = 'relative';
      }

      dragTargetData.dr = true;
      imageData[e.target].resized = true;
    }
  }, false);

  imgTag.addEventListener('mouseout', function(e)
  {
    dragTargetData.d = false;
      if (dragTargetData.dr) return false;
  }, false);

  imgTag.addEventListener('mouseup', function(e)
  {
    dragTargetData.d = false;
    if (dragTargetData.dr) return false;

  }, true);

  imgTag.addEventListener('click', function(e)
  {
    if(e.ctrlKey != 0)
      return true;

    if(e.metaKey != null) // Can be on some platforms
      if(e.metaKey != 0)
        return true;

    dragTargetData.d = false;
    if (dragTargetData.dr) {
      e.preventDefault();
      return false;
    }
    if(imageData[e.target].resized)
    {
      // Prevent the context menu from actually appearing.
      e.preventDefault();
      e.returnValue = false;
      e.stopPropagation();
      return false;
    }
  }, false);

}

findAllImages();
document.addEventListener('dragstart', function() {return false}, false);

