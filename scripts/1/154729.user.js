// ==UserScript==
// @name        Center the clicked position on click-to-zoom images
// @namespace   Silico
// @description If a picture changes size when it's clicked, the point on the image that was clicked is scrolled as close as possible to the centre of the window, just like what happens when the browser zooms a stand-alone image.
// @include     *
// @version     2
// ==/UserScript==
document.addEventListener('click', function (event) {
  var i = event.target;
  if (i.tagName == 'IMG') {
    var op = i.getBoundingClientRect();
    setTimeout( function () {
      var np = i.getBoundingClientRect();
      if (np.height != op.height || np.width != op.width) {
        window.scrollBy((event.clientX-op.left)/op.width*np.width+np.left-innerWidth/2,
                        (event.clientY-op.top)/op.height*np.height+np.top-innerHeight/2);
      }
    }, 100);
  }
}, true);