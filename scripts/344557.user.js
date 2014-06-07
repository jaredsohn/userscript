// ==UserScript==
// @name        mmmturkeybacon AutoApprove Time and Ghost HIT Buster
// @author      mmmturkeybacon
// @description Shows formated automatic approval time and if a HIT is
//              truly available by replacing the text of its link in the
//              search results. Using this script will greatly increase
//              the number of page requests you make while searching and
//              may cause Page Monitor to give false alarms.
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/viewhits*
// @match       https://*.mturk.com/mturk/findhits*
// @match       https://*.mturk.com/mturk/sorthits*
// @match       https://*.mturk.com/mturk/searchbar*
// @match       https://*.mturk.com/mturk/viewsearchbar*
// @match       https://*.mturk.com/mturk/sortsearchbar*
// @match       https://*.mturk.com/mturk/preview?*
// @match       https://*.mturk.com/mturk/return*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/344557.user.js
// @updateURL   http://userscripts.org/scripts/source/344557.meta.js
// @version     1.01
// @grant       none
// ==/UserScript==

// Only run if on search results.
var is_a_HIT = $('input[type="hidden"][name="isAccepted"]').length > 0;
if (!is_a_HIT)
{
    var $preview_links = $('a[href^="/mturk/preview?"]');
    
    function bustin_makes_me_feel_good($link)
    {
        $.get($link.attr('href'), function(data)
        {
            var $src = $(data);
            var maxpagerate = $src.find('td[class="error_title"]:contains("You have exceeded the maximum allowed page request rate for this website.")');
            if (maxpagerate.length == 0)
            {
                var is_a_HIT = $src.find('input[type="hidden"][name="isAccepted"]').length > 0;
                if (is_a_HIT)
                {
                    var hitAutoAppDelayInSeconds = $src.find('input[type="hidden"][name="hitAutoAppDelayInSeconds"]').val();
                    
                    // time formatting code modified from http://userscripts.org/scripts/show/169154
                    var days  = Math.floor((hitAutoAppDelayInSeconds/(60*60*24)));
                    var hours = Math.floor((hitAutoAppDelayInSeconds/(60*60)) % 24);
                    var mins  = Math.floor((hitAutoAppDelayInSeconds/60) % 60);
                    var secs  = hitAutoAppDelayInSeconds % 60;
                    
                    var time_str = (days  == 0 ? '' : days  + (days  > 1 ? ' days '    : ' day '))    +
                                   (hours == 0 ? '' : hours + (hours > 1 ? ' hours '   : ' hour '))   + 
                                   (mins  == 0 ? '' : mins  + (mins  > 1 ? ' minutes ' : ' minute ')) + 
                                   (secs  == 0 ? '' : secs  + (secs  > 1 ? ' seconds ' : ' second '));
    
                    time_str = time_str.replace(/\s+$/, ''); 
    
                    if (hitAutoAppDelayInSeconds == 0)
                    {
                        time_str = "0 seconds";
                    }
                    $link.text('['+time_str+'] Available');
                }
                else
                {
                    $link.text('G-G-Ghost!');
                }
            }
            else
            {
                    $link.text('Page Request Rate Exceeded');
            }
        });
    }
    
    function preview_links_loop(i)
    {
        var $next_link = $preview_links.eq(i);
        i++;
        if ($next_link.length > 0)
        {
            bustin_makes_me_feel_good($next_link);        
            // Slow don't page request rate.
            // This won't make the script immune to page request
            // errors. Retrying after an error would take to long.
            setTimeout(function(){preview_links_loop(i)}, 300);
        }
    }
    
    if ($preview_links.length > 0)
    {
        preview_links_loop(0);
    }
}
