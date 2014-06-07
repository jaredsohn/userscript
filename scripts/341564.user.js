// ==UserScript==
// @name        AA Time
// @match       https://*.mturk.com/mturk/viewhits*
// @match       https://*.mturk.com/mturk/findhits*
// @match       https://*.mturk.com/mturk/sorthits*
// @match       https://*.mturk.com/mturk/searchbar*
// @match       https://*.mturk.com/mturk/viewsearchbar*
// @match       https://*.mturk.com/mturk/sortsearchbar*
// @match       https://*.mturk.com/mturk/preview?*
// @match       https://*.mturk.com/mturk/statusdetail*
// @match       https://*.mturk.com/mturk/return*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(function(){
    $('a[id^="capsule"]').each(function(index) {
        $(this).click(function(){
            var this_row = $(this).parent().parent();
            var url="";      
            this_row.find("a").each(function() {
                if (this.href.indexOf("preview?") !== -1)
                {
                    url = "https://www.mturk.com" + $(this).attr('href');
                    
                }  });
            if (url !=="" )
            {
            var $src;
            jQuery.ajax({
                url:    url,
                success: function(data) {$src = $(data);},
                async:   false
            });
            var hitAutoAppDelayInSeconds = $src.find("input[type='hidden'][name='hitAutoAppDelayInSeconds']").val();
            var days  = Math.floor((hitAutoAppDelayInSeconds/(60*60*24)));
            var hours = Math.floor((hitAutoAppDelayInSeconds/(60*60)) % 24);
            var mins  = Math.floor((hitAutoAppDelayInSeconds/60) % 60);
            var secs  = hitAutoAppDelayInSeconds % 60;
            
            var time_str = (days  == 0 ? "" : days  + (days  > 1 ? " days "    : " day "))    +
                           (hours == 0 ? "" : hours + (hours > 1 ? " hours "   : " hour "))   + 
                           (mins  == 0 ? "" : mins  + (mins  > 1 ? " minutes " : " minute ")) + 
                           (secs  == 0 ? "" : secs  + (secs  > 1 ? " seconds " : " second "));
        
            if (hitAutoAppDelayInSeconds == 0)
            {
                time_str = '0 seconds';
            }
            //var sea = "#AA"+index;
            //if !($(document).find(sea) == null)
            if($(this).parent().parent().find("[id^='AA']").length==0)
                $(this).after("<tr><td colspan='11' id='AA" + index+ "' valign='top' nowrap='' align='left'><b>&nbsp;Automatically Approved in&nbsp;"+time_str+"</b></td></tr>");
            }
        });
    });
});