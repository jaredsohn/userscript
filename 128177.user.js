// ==UserScript== 
// @name           reistijden
// @namespace      deredactie
// @include        http://www.deredactie.be/cm/vrtnieuws/verkeer/reistijden 
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js 
// ==/UserScript== 

  // Load jQuery if needed.
  (function () {
    if(typeof unsafeWindow.jQuery == 'undefined') {
      // Recursively call anonymous function.
      window.setTimeout(arguments.callee, 50);
    }
    else {
      $ = unsafeWindow.jQuery;
    }
  })();

  //<select multiple="" filter="road" class="traffic-traveltimes-road-filter"
    alert('hello world2');
    //var $element = $('.traffic-traveltimes-road-filter').html();
    //alert($element);
 
  $(".traffic-traveltimes-road-filter").val('E34');	
