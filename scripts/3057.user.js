// ==UserScript==
// @name           Limit del.icio.us description field to 255 characters
// @namespace      http://philwilson.org/
// @include        http://del.icio.us/*
// ==/UserScript==

(function() {

  var desc = document.getElementById("description");
  desc.maxLength = "255";

   function setMaxLength()
   {
      var counter = document.createElement('span');
      counter.className = 'counter';
      counter.innerHTML = ' <span>'+desc.value.length+'</span>/'+desc.getAttribute('maxlength');
      desc.parentNode.insertBefore(counter,desc.nextSibling);

      document.addEventListener("keyup",checkMaxLength,true);
      desc.onKeyUp();
   }

   function checkMaxLength()
   {
      var maxLength = 255;
      var currentLength = desc.value.length;
      // stupid text nodes.
      desc.nextSibling.firstChild.nextSibling.firstChild.nodeValue = currentLength;
   }

   window.addEventListener("load", function(e) { setMaxLength(); }, false);   

})();