// ==UserScript==
// @name           Fast Editor Basic
// @description    Built for editing item fast in store editor.
// @namespace      edit.store.yahoo.net
// @include        http://*.us-dc*-edit.store.yahoo.net/RT/NEWEDIT.*
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  jQuery(document).ready( function() {
    jQuery("a[href$=.html]").each( function() {
        if (
            this.href.substr(this.href.length-5)=='.html' && 
            (this.href.substr(0,5).toLowerCase() != 'http:' || this.href.indexOf

('edit.store.yahoo.net') > -1) && 
            jQuery.trim(jQuery(this).text()) != '' &&
            jQuery(this).css("display") != "block"
            )
        {
            jQuery(this).after("<a href=" + this.href + "?dired=1 '><font size=3 

color=red>*</font></a>");
        }
    });
});
}, false);