// ==UserScript==
// @name           IBOOD HUNT SCRIPT
// @description    When Ibood organises a "hunt", it can be very hard to obtain some objects due to the limited quantity. This script will auto-submit the first two forms for you so you go faster, and thus have a bigger chance to get the object.
// @include        https://order.ibood.com/*
// @version       1.0
// @history       1.0 Initial release       
// ==/UserScript==
// Made for Dutch IBOOD
// Gemaakt voor de Nederlandse IBOOD!

// create virtual click
function simulateClick(node) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return node.dispatchEvent(ev);
}
// sumbit first 2 page and prevent last page from generating an error
$(document).ready(function() {
    $("input[pmmethod=ideal]").click(); //Change ideal to whatever method you like to use: mastercard, visa, sofortbanking

    (function($){
      $(document).ready(function(){
         var url = window.location.href;
    
         if(/order_request/g.test(url)){
            
         }
         else{
            simulateClick( $(".submit-button")[0] );
         }
      });
    })(jQuery);
    
});