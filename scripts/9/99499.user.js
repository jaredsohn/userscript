// ==UserScript==
// @name           Next Image
// @namespace      kx
// @description    Scroll to the next image
//   NumPad5 - scroll to the next image
//   Shift + NumPad5 - scroll to the previous image
// ==/UserScript==

function getTop(el) {
  var top = 0;
  do { top += el.offsetTop; } while (el = el.offsetParent);
  return top;
}

window.addEventListener('keypress', function(e) {
  var minHeight = 200;

  if (e.keyCode == 12) { // numpad 5

    var allImages = unsafeWindow.document.images;
    var scrollTop = window.scrollY;

    if (e.shiftKey) { // scroll backward
      for (var i = allImages.length - 1; i >= 0; i--) {
        var img = allImages[i], 
            imgTop = getTop(img);
 
        if (img.clientHeight < minHeight || imgTop >= scrollTop) { continue; }
        img.scrollIntoView(true);
        return;
      }
    }
    else { // scroll forward
      for (var i=0, last = allImages.length; i < last; i++) {
        var img = allImages[i], 
            imgTop = getTop(img);
 
        if (img.clientHeight < minHeight || imgTop <= scrollTop + 1) { continue; }
        img.scrollIntoView(true);
        return;
      }
    }
  }
}, false);