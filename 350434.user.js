// ==UserScript==
// @name        mmmturkeybacon Ghost HIT Buster for Forums
// @author      mmmturkeybacon
// @description Searches forum posts for HIT links, follows them,
//              determines if the HIT is still available, and 
//              strikes the post if the HIT is ghost or changes 
//              the link text to show the automatic approval time 
//              if the HIT is available. Using this script will 
//              increase the number of page requests you make to 
//              mturk and may cause Page Monitor to give false alarms.
// @namespace   http://userscripts.org/users/523367
// @match       http://www.mturkgrind.com/threads/*
// @match       http://www.mturkgrind.com/showthread.php?*
// @match       http://mturkforum.com/showthread.php?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/350434.user.js
// @updateURL   http://userscripts.org/scripts/source/350434.meta.js
// @version     1.22
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var REQUEST_DELAY = 500; // milliseconds
var posts_dict = {};

$(document).ready(function ()
{
    var $preview_links = $('a[href*="/mturk/preview?"]');
    
    var $hit_posts = $('div[id^="post_message_"]').has('a[href*="/mturk/preview?"]');
    $hit_posts.each(function()
    {
        var num_links = $(this).find('a[href*="/mturk/preview?"]').length;
        posts_dict[$(this).attr('id')] = {num_links: num_links, link_cnt: 0, strike_all: false, strike_all_override: false};
    });

    function bustin_makes_me_feel_good($link)
    {
        GM_xmlhttpRequest(
        {
        method: "GET",
        url: $link.attr('href'),
        onerror: function(){alert('failed');},
        onload: function (response)
        {
            var $src = $(response.responseText);
            var id = $link.closest('div[id^="post_message_"]').attr('id');
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
                    $link.text('[AA: '+time_str+'] -- ' + $link.text());
                    posts_dict[id].link_cnt++;
                    posts_dict[id].strike_all_override = true;
                }
                else
                {
                    var $hit_container = $link.closest('div[class="cms_table"]');
                    if ($hit_container.length > 0)
                    {
                        $hit_container.css('text-decoration', 'line-through');
                        posts_dict[id].link_cnt++;
                    }
                    else
                    {
                        $link.css('text-decoration', 'line-through');
                        posts_dict[id].link_cnt++;
                        posts_dict[id].strike_all = true;
                    }
                }
            }
            else
            {
                $link.text('[Page Request Rate Error] -- ' + $link.text());
                posts_dict[id].link_cnt++;
                posts_dict[id].strike_all_override = true;
            }

            if ((posts_dict[id].strike_all_override == false) &&
                (posts_dict[id].strike_all == true) &&
                (posts_dict[id].link_cnt == posts_dict[id].num_links))
            {
                $link.closest('div[id^="'+id+'"]').css('text-decoration', 'line-through');
            }
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
            setTimeout(function(){preview_links_loop(i)}, REQUEST_DELAY);
        }
    }
    
    if ($preview_links.length > 0)
    {
        preview_links_loop(0);
    }
});