// ==UserScript==
// @name         jQuery Remove Form Validation
// @namespace    jQuery
// @include      *
// @author       jmolivas
// @description  This userscript is meant to remove client side validation
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    //script.textContent = "window.jQuery=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

jQuery(document).ready(function(){

  jQuery('input,text,textarea,select,button').removeAttr('disabled');
  jQuery('input,text,textarea,select,button').removeAttr('required');

});