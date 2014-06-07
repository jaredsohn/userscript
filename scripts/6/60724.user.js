// ==UserScript==
// @name          Variant IDs
// @namespace     11heavens
// @description	  Show variant IDs in admin
// @author        Caroline Schnapp
// @homepage      http://11heavens.com
// @include       http://*.myshopify.com/admin/products/*
// ==/UserScript==


// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  jQuery('#row-head th:last').before('<th class="variant-id" style="width:100px;">Variant&nbsp;ID</th>');
  jQuery('#variants-list li').each(function() {
    var id = jQuery(this).attr('id').replace('variant_','');
    jQuery(this).find('tr.inventory-row td:last').before('<td style="width: 100px;">' + id + '</td>').css('whiteSpace', 'nowrap');
  });
}, false);
var variantsList = document.getElementById("variants-list");
var variants = variantsList.getElementsByTagName("li"); 
for (var i = 0; i < variants.length; i++) {
var li = variants[i];
var id = li.id;
id = id.replace("variant_", "");
li.title = id;
}