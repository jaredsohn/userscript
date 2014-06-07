// ==UserScript==
// @name           Assembla Estimates Counter
// @namespace      http://i1t2b3.com/
// @description    Counts total estimate for each tickets group
// @include        https://*.assembla.com/spaces/*/tickets/*
// ==/UserScript==

// load jQuery if none
if (document.getElementById('werul_jquery') == null) {
    var script = document.createElement('script');
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    script.type = 'text/javascript';
    script.id = 'werul_jquery';
    document.getElementsByTagName('head')[0].appendChild(script);
}

//wait for jQuery to load
function GM_wait() {
    if(unsafeWindow.jQuery == null) {
        window.setTimeout(GM_wait,100);
    }
    else { 
        jQuery = unsafeWindow['jQuery'];
        jQuery.noConflict();
        (function($) { 
          $(function() {
            jqAssemblaEstimates($);
          });
        })(jQuery);					
    }
}
GM_wait();

//this function does all work
function jqAssemblaEstimates($) {
    var ticketList = $('#ticket_list');
    $('#ticket_list table.tickets').each(function(index, domElement){
        
        //step 1 - count total for each group
        var total = 0;
        $(this).find('td.working_hours').each( function() {
            var val = parseFloat( $(this).find('a:first').text(), 10);
            if( !isNaN( val ) ) total += val;
        });
        
        //step 2 - output the total if it's bigger than 0
        if( total > 0 ) {
            $(this).prev('div').children('h3').append(' - ' + total + ' working hours' );
        }
    })
}