// ==UserScript==
// @id              465249
// @name            PlentyMarkets ColorHashMenu
// @version         0.3
// @namespace       samenhaus.de
// @author          Daniel Jackel
// @description     Color the PlentyMarkets menu at the top according to hostname. Extremely usefull if you have multiple accounts instead of multishops. 
// @include         */plenty/ui/*
// @require         jquery-2.1.0.min.js

// @run-at          document-end
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_notification
// ==/UserScript==

const VERSION = "0.3";
(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();
  // All your GM code must be inside this function
  function letsJQuery($)
  {
    $.noConflict();
    console.log("PlentyColorBar " + VERSION + " gestartet. (jQuery " + $().jquery + ")");   
    var login = 0;

    window.setTimeout(colorHost, 2500);  

    // https://stackoverflow.com/a/3426956
    function hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    } 
    function intToRGB(i){
        return ((i>>16)&0xFF).toString(16) + 
               ((i>>8)&0xFF).toString(16) + 
               (i&0xFF).toString(16);
    }
    
    // https://stackoverflow.com/a/13542669
    function shadeColor1(color, percent) {  
        var num = parseInt(color,16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
        return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    }
    
    // here the work gets done
    function colorHost() {
        var color = intToRGB(hashCode(window.location.hostname));
        var color2 = shadeColor1(color, -10);
        var color3 = shadeColor1(color, -40);
        
        //$('.plentyAdminHeadWrapper').css('background','linear-gradient(to bottom , #' + color2 + ' 25%, #' + color3 + ' 90%, #000 100%) repeat scroll 0% 0% transparent');
        //$('head').append('<style> .horizontalNavigationWrapper{background-color: #' + color2 + ' !important} </style>');
        $('head').append('<style> .horizontalNavigationWrapper, .PlentyMainMenuBar.gwt-MenuBar-vertical .gwt-MenuItem-selected, .PlentyMainMenuBar.gwt-MenuBar-vertical tr:hover > td, .PlentyMainMenuBar.gwt-MenuBar-vertical .gwt-MenuItem-selected + .subMenuIcon-selected {background-color: #' + color2 + ' !important} </style>');
    }
  }
})();