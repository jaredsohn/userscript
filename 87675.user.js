// ==UserScript==
// @name        Bugzilla attachments preview
// @namespace   http://userscripts.ru/js/bugzilla-attachments-preview/
// @include     https://bugs.webkit.org/*
// @include     https://bugzilla.mozilla.org/*
// @description Shows attached images
// @copyright   2010+, Nikita Vasilyev
// @version     1.0
// @licence     MIT
// ==/UserScript==


[].forEach.call(document.querySelectorAll("#attachment_table .bz_attach_extra_info"), function(a){
  if (a.textContent.indexOf("image/") > -1) {
    var img = new Image();
    img.style.display = "block";
    img.src = a.previousElementSibling.href;
    a.parentNode.insertBefore(img, a.parentNode.firstChild);
  }
});
