// ==UserScript==
// @name        BoobTubeJunkie
// @namespace   https://www.netflix.com/
// @description Calculate daily viewing time from Netflix Viewing Activity page
// @include     https://www.netflix.com/WiViewingActivity
// @version     2
// @grant       none
// ==/UserScript==
//
// To use:
//    Log in to Netflix
//    Choose the profile you want a report on
//    Under that profile, choose "Your Account"
//    In the "Your Profile" section, choose "Viewing Activity"
//    After the page loads it's data, the report will be shown at the top-left
//
// Thanks to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
//    for the draggable script
//
/*global jQuery, document */
(function($) {
    var data = ['<table style="border:1px solid #ccc;border-collapse:collapse;">',
                '<tr><th style="padding:4px;border:1px solid #ccc;">Date</th>',
                '<th style="padding:4px;border:1px solid #ccc;">Minutes Watched</th></tr>'];
    
    if ( 'function' !== typeof $.fn.drags ) {
       $.fn.drags = function(opt) {
            opt = $.extend({handle:"",cursor:"move"}, opt);
    
            if(opt.handle === "") {
                var $el = this;
            } else {
                var $el = this.find(opt.handle);
            }

            return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
                if(opt.handle === "") {
                    var $drag = $(this).addClass('draggable');
                } else {
                    var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
                }
                var z_idx = $drag.css('z-index'),
                    drg_h = $drag.outerHeight(),
                    drg_w = $drag.outerWidth(),
                    pos_y = $drag.offset().top + drg_h - e.pageY,
                    pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                    $('.draggable').offset({
                        top:e.pageY + pos_y - drg_h,
                        left:e.pageX + pos_x - drg_w
                    }).on("mouseup", function() {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                    });
                });
                e.preventDefault(); // disable selection
            }).on("mouseup", function() {
                if(opt.handle === "") {
                    $(this).removeClass('draggable');
                } else {
                    $(this).removeClass('active-handle').parent().removeClass('draggable');
                }
            });
       };
    }
       
    // Wait 5 seconds for the table data to load before processing
    setTimeout( function() {
        var curDate = null, curMin = 0;
        // Get an array of the history table rows        
        $('.videotable>tbody>tr').each( function(index,value) {
            var d = $('td:nth-of-type(3)',this).html();   // viewing date
            if ( curDate === null || d !== curDate ) {
                if ( curDate !== null ) {
                    data.push('<tr><td style="padding:4px;border-right:1px solid #ccc;">'
                               + curDate +
                               '</td><td style="padding:4px;">'
                               + curMin +
                               '</td></tr>');
                }
                curDate = d;
                curMin = 0;
            }
            var tw = $('td:nth-of-type(4)>div>label:first-of-type',this).html();
            tw = tw.slice(0,-1);
            curMin += +tw;
        } );
        
        data.push('<tr><td style="padding:4px;border-right:1px solid #ccc;">'
                   + curDate +
                   '</td><td style="padding:4px;">'
                   + curMin +
                   '</td></tr></table>');
        
        // Build a table overlay and attach it to the body
        $('<div id="report" style="position:absolute;top:100px;left:20px;background:#000;color:#fff;">'
            +' <div id="close_report" style="text-align:right">&nbsp;&nbsp;X&nbsp;&nbsp;</div></div>')
            .append(data.join('\n'))
            .appendTo('body');
        $('#close_report').click(function(){ $('#report').remove(); });
        $('#report').drags();
    }, 5000 );
    
}(jQuery));