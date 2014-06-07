// ==UserScript==
// @name           Flickr Photo Prefetch
// @namespace      http://pobox.com/~kragen/
// @description    Prefetches the "next" page on Flickr in an iframe so it loads faster.
// @include        http://flickr.com/photos/*
// ==/UserScript==

(function () {
   if (window != top) return  // avoid creating infinitely deep nested frames

   // Is this checking good or bad?  On the good side, it avoids
   // throwing errors on pages where the script doesn't apply, but it
   // will probably make it hard to figure out what went wrong when
   // the script breaks.
   var ebc = unsafeWindow.document.getElementsByClass
   if (!ebc) return
   var next_link = ebc('contextThumbLink')[1]
   if (!next_link) return
   // end of paranoid checking.

   nhref = next_link.getAttribute('href')
   var myif = document.createElement('iframe')
   myif.setAttribute('src', nhref)
   myif.style.display = 'none'
   document.body.appendChild(myif)
})()