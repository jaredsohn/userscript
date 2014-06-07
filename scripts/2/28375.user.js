// ==UserScript==
// @author         pbihler
// @version        1.0
// @name           KodakGallerySet9x13
// @namespace      kodakgallery
// @description    In KodakFoto Gallery, there is no way to quickly select 9x13cm-fotos (just bigger ones...). This script adds a menu item to set on all fotos of a shopping cart page the 9x13cm option to "1".
// @include        http://www.kodakgallery.*/ViewCart.jsp
// ==/UserScript==

// Anonymous function wrapper
(function() {

var scripts = [
    'http://wiki.script.aculo.us/javascripts/prototype.js'
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}
 
})(); // end anonymous function wrapper


function select9x13(e) {

 var cartPhototable = unsafeWindow['document'].getElementsByClassName('cart-phototable');
 
 
 stripAnonymousFunction =  unsafeWindow['stripAnonymousFunction'];
 showHidePreview =  unsafeWindow['showHidePreview'];
 showHideLargePrintSizes =  unsafeWindow['showHideLargePrintSizes'];
 
 for (var i = 0; i < cartPhototable.length; i++) {
   var tb = cartPhototable[i];
   var theId = tb.id.substr(11);
   var quantities = tb.getElementsByClassName('quantity');
   if (quantities[1].parentNode.style.display == "none") {
      showHideLargePrintSizes(theId);
   }
   var myObj = quantities[1].getElementsByTagName('input')[0];
   myObj.value = '1';
   
   keyup = myObj.getAttribute('onkeyup');
   eval(stripAnonymousFunction(keyup));
   
 }

}





GM_registerMenuCommand("Select 9x13cm fotos",	select9x13, "s", "control alt", "s");
