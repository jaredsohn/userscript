// ==UserScript==
// @name           show 2 field location box
// @namespace      lh_new_hp
// @description    hide the 1 field form and show the 2 fields form
// @version    0.1
// @copyright  2011+, You
// ==/UserScript==
(function(){
document.observe("dom:loaded", function() {
$("#only_zip").hide();
$("#zip_and_address_logout").show();
});
})(); 