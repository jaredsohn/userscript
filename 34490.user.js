// ==UserScript==
// @name           Silent Newbienudes
// @description    Disables the right-click alert box and removes the transparent layer to let you easily save the shown picture.
// @namespace      http://userscripts.org/users/67768
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js
// @include        http://www.newbienudes.com/*
// ==/UserScript==

(function() {
  $(document).ready(function() {
    var picwrapper = $("a[href='/photos/photoLink.asp']");
    var pic = picwrapper.contents();
    pic.get(0).removeAttribute("oncontextmenu"); // jQuery unbind() doesn't work
    picwrapper.replaceWith(pic);
    $("img[src$='dont_dist.gif']").remove();
    $("img[src$='1x1_trans.gif']").remove();
  });
})();
