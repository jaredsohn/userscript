// ==UserScript==
// @name Next Image/Previous Image
// @author arty <me@arty.name>
// @namespace http://arty.name/
// @version 1.0
// @description  Quick scroll to next/previous image on a page with f/r buttons
// @include *
// ==/UserScript==

(function(){
  var sizeLimit = 200;
  var rButton = 114;
  var fButton = 102;
  var positions = [];
  
  document.addEventListener('keypress', keypressHandler, false);
  
  function keypressHandler(event){
    if (event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.target.tagName && event.target.tagName.match(/input|select|textarea/i)) return;

    var code = event.keyCode || event.which;
    if (code != rButton && code != fButton) return;

    if (positions.length < document.images.length) {
      positions = [];
      for (var index = 0; index < document.images.length; index++) {
        var image = document.images[index];
        if (Math.min(image.width, image.height) < sizeLimit) continue;
        positions.push(getYOffset(image));
      }
    }

    var scroll = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    positions = positions.sort(sort);
    var next = true;

    if (code == rButton) {
      positions = positions.reverse();
      next = false;
    }

    for (index = 0; index < positions.length; index++) {
      var offset = positions[index];
      if ((next && offset <= scroll) || (!next && offset >= scroll)) continue;
      scrollTo(offset, scroll);
      return;
    }
  }
  
  function scrollTo(offset, currentScroll) {
    if (currentScroll == document.documentElement.scrollTop) {
      document.documentElement.scrollTop = offset;
    } else {
      document.body.scrollTop = offset;
    }
  }
  
  function getYOffset(node) {
    for (var offset = 0; node; offset += node.offsetTop, node = node.offsetParent);
    return offset;
  }
  
  function sort(a, b) { return a < b ? -1 : 1; }
})()
