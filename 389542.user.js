// ==UserScript==
// @name        mmmturkeybacon Save Automatic Approval Time
// @author      mmmturkeybacon
// @description Saves automatic approval time and shows the time
//              remaining until approval in the status field of 
//              completed HITs that are still pending approval.
//              Displays the total automatic approval time when
//              the mouse pointer hovers over the status field.
// @namespace   http://userscripts.org/users/523367
// @match       https://www.mturk.com/mturk/accept*
// @match       https://www.mturk.com/mturk/preview*
// @match       https://www.mturk.com/mturk/continue*
// @match       https://www.mturk.com/mturk/submit
// @match       https://www.mturk.com/mturk/return*
// @match       https://www.mturk.com/mturk/statusdetail*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/389542.user.js
// @updateURL   http://userscripts.org/scripts/source/389542.meta.js
// @version     1.52
// @grant       none
// ==/UserScript==

/*
 * Automatic approval data is saved whenever a HIT page is unloaded. Usually when a 
 * HIT page is unloaded it means the HIT was submitted, but this isn't necessarily
 * so. It could also be that the user accepted the HIT, then closed the tab to
 * work on the HIT from his queue later. If this is the case, once the user eventually
 * submits the HIT the automatic approval data will be updated when the page unloads.
 * However, if the user returns the HIT then automatic approval data will have been
 * saved in local storage that isn't associated with any completed HITs. There's really
 * no good way to prevent this from happening or to remove the data.
 */ 

var hit_returned = false;

function create_title_str(hitId)
{
    var title_str = '';
    var autoapprove_data = localStorage.getItem('autoapprove_data.' + hitId);
    if (autoapprove_data == null)
    {
        return title_str;
    }
    var hitAutoAppDelayInSeconds = parseInt(autoapprove_data.split('?')[1]);

    if (hitAutoAppDelayInSeconds)
    {
        // time formatting code modified from http://userscripts.org/scripts/show/169154
        var days  = Math.floor((hitAutoAppDelayInSeconds/(60*60*24)));
        var hours = Math.floor((hitAutoAppDelayInSeconds/(60*60)) % 24);
        var mins  = Math.floor((hitAutoAppDelayInSeconds/60) % 60);
        var secs  = hitAutoAppDelayInSeconds % 60;
        
        title_str = 'Automatically approved after ';
        title_str += (days  == 0 ? '' : days  + (days  > 1 ? ' days '    : ' day '))    +
                     (hours == 0 ? '' : hours + (hours > 1 ? ' hours '   : ' hour '))   + 
                     (mins  == 0 ? '' : mins  + (mins  > 1 ? ' minutes ' : ' minute ')) + 
                     (secs  == 0 ? '' : secs  + (secs  > 1 ? ' seconds'  : ' second'));
        
        if (hitAutoAppDelayInSeconds == 0)
        {
            title_str = "Automatically approved after 0 seconds";
        }
    }
    return title_str;
}

function create_time_remaining_str(hitId)
{
    var time_str = '';
    var autoapprove_data = localStorage.getItem('autoapprove_data.' + hitId);
    if (autoapprove_data == null)
    {
        return time_str;
    }
    var submit_time_seconds = parseInt(autoapprove_data.split('?')[0]);
    var hitAutoAppDelayInSeconds = parseInt(autoapprove_data.split('?')[1]);
    var now_in_seconds = new Date().getTime()/1000;
    var seconds_remaining = Math.round(submit_time_seconds + hitAutoAppDelayInSeconds - now_in_seconds);

    if (seconds_remaining > 0)
    {
        // time formatting code modified from http://userscripts.org/scripts/show/169154
        var days  = Math.floor((seconds_remaining/(60*60*24)));
        var hours = Math.floor((seconds_remaining/(60*60)) % 24);
        var mins  = Math.floor((seconds_remaining/60) % 60);
        var secs  = seconds_remaining % 60;
        
        time_str = '\n(';
        time_str += (days  == 0 ? '' : days  + 'd') +
                    (hours == 0 ? '' : hours + 'h') + 
                    (mins  == 0 ? '' : mins  + 'm') + 
                    (secs  == 0 ? '' : secs  + 's');
        time_str += ')';
        
        if (seconds_remaining == 0)
        {
            time_str = "\n(0 seconds)";
        }
    }
    return time_str;
}

function store_autoapprove_data()
{
    var $isAccepted = $('input[type="hidden"][name="isAccepted"][value="true"]')
    if ($isAccepted.length > 0 && !hit_returned)
    {
        var hitReview_hitId = $('form[name="hitForm"][action="/mturk/hitReview"]').children('input[name="hitId"]').val();
        var hitAutoAppDelayInSeconds = $('input[type="hidden"][name="hitAutoAppDelayInSeconds"]').val();
        var now_in_seconds = new Date().getTime()/1000;
        var autoapprove_data = now_in_seconds +'?'+ hitAutoAppDelayInSeconds;
        localStorage.setItem('autoapprove_data.' + hitReview_hitId, autoapprove_data);
    }
}

if(typeof(Storage)!=="undefined")
{
    // modified return click snippet from https://userscripts.org/scripts/review/175838
    $('img[src="/images/return_hit.gif"]').parent().click(function()
    {
        hit_returned = true;        
    });

    window.addEventListener('beforeunload', store_autoapprove_data);

    var $requesters = $('td[class="statusdetailRequesterColumnValue"]');
    if ($requesters.length > 0)
    {
        $requesters.each(function()
        {
           // trick to get hitId snippet from http://userscripts.org/scripts/show/170845
           var hitId = $(this).find('a[href^="/mturk/contact?"]').attr('href').match(/[A-Z0-9]{30}/); 
           var $status_value = $(this).parent().find('td[class="statusdetailStatusColumnValue"]');

           var title_str = create_title_str(hitId);
           $status_value.attr('title', title_str);

           if ($status_value.text() == 'Pending Approval')
           {
               var time_remaining_str = create_time_remaining_str(hitId);
               var status_value = $status_value.text() + time_remaining_str;
               $status_value.text(status_value);
           }
        });
    }
}
