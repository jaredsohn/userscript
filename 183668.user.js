// ==UserScript==
// @name        mmmturkeybacon Queue Order Fix
// @author      mmmturkeybacon
// @description After completing a HIT anywhere within your queue (i.e. HITs Assigned To You), this script 
//              will automatically continue the HIT at the top* of your queue. If you sort your queue by 
//              Time Left (least first), you can use this script to work around mturk's default** behavior
//              of ignoring what your queue is sorted by. You should only need to set the sort order once.
//              HITs accepted after setting the sort order will be sorted automatically.
//              Additionally you can manually continue the HIT at the top of your queue if you visit
//              "https://www.mturk.com/mturk/myhits?first". Create a bookmark on your
//              toolbar to quickly jump to the first HIT in your queue. This is especially useful if you
//              just caught a HIT that will expire quickly.
//              *The HIT at the top of the queue is determined when the HIT currently being worked on is
//              loaded. This means if a new HIT gets put on the top of the queue after the current HIT has
//              already been loaded it will not be the very next HIT, but the one just after that instead.
//              **To restore the default behavior sort by Assigned On (earliest first).
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/continue*
// @match       https://*.mturk.com/mturk/submit
// @match       https://*.mturk.com/mturk/myhits?first
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/183668.user.js
// @updateURL   http://userscripts.org/scripts/source/183668.meta.js
// @version     1.65
// @grant       none
// ==/UserScript==

/*
 * Mechanical Turk has two types of HITs. By far the ExternalQuestion HITs are 
 * the most common. These HITs use an iframe to display the task, disable the 
 * yellow Submit HIT button, and use the hidden link with the id hitExternalNextLink
 * to direct the browser to a new page after the task has been submitted in the
 * iframe. The second type of HIT is the QuestionForm HIT. These HITs do not use
 * an iframe, use the yellow Submit HIT button to submit, and do not use
 * hitExternalNextLink to direct the browser to a new page.
 *
 * For ExternalQuestion HITs, fixing the queue order is as simple as replacing
 * hitExternalNextLink with the URL of the next link you wish to work on.
 *
 * QuestionForm HITs don't use the hitExternalNextLink, however we can utilize
 * the fact that after a QuestionForm HIT is submitted the URL ends with 
 * /mturk/submit to redirect the browser to the top of the queue.
 *
 */

$(document).ready(function()
{
    var this_URL = window.location.href.split("mturk.com")[1];
    /* preview?groupId=GROUPIDSTRING&isPreviousIFrame= indicates not in queue
     * preview?isPreviousIFrame= indicates we are in the queue */
    var hitExternalNextLink = $('a[href^="/mturk/preview?isPreviousIFrame="][id="hitExternalNextLink"]');

    if (hitExternalNextLink.length > 0)
    { // inside queue
        if (this_URL.split('?')[0] == '/mturk/continue' && $('img[alt="Submit from within the iframe"][src="/images/submit_hit_disabled.gif"]').length > 0)
        { // ExternalQuestion HIT
          /* Setting hitExternalNextLink in a QuestionForm is harmless but doing
           * so would require an unnecessary $.get page request, so it's best to
           * only change hitExternalNextLink for ExternalQuestion HITs */
            $.get('/mturk/myhits', function(data)
            {
                var first_queue_URL = $(data).find('a[href^="/mturk/continue"]').eq(0).attr('href');
                if (first_queue_URL)
                {
                    if (this_URL == first_queue_URL)
                    {
                        var second_queue_URL = $(data).find('a[href^="/mturk/continue"]').eq(1).attr('href');
                        if (second_queue_URL)
                        {
                            hitExternalNextLink.attr('href', second_queue_URL);
                        }
                    }
                    else
                    {
                        hitExternalNextLink.attr('href', first_queue_URL);
                    }
                }
            });
        }
        else if (this_URL == '/mturk/submit')
        { // next HIT after a QuestionForm HIT was submitted
            $.get('/mturk/myhits', function(data)
            {
                var first_queue_URL = $(data).find('a[href^="/mturk/continue"]').eq(0).attr('href');
                if (first_queue_URL)
                {
                    window.location.replace(first_queue_URL);
                }
            });
        }
    }
    else if (this_URL == '/mturk/myhits?first')
    { // bookmark link was used
        $.get('/mturk/myhits', function(data)
        {
            var first_queue_URL = $(data).find('a[href^="/mturk/continue"]').eq(0).attr('href');
            if (first_queue_URL)
            {
                window.location.replace(first_queue_URL);
            }
        });
    }
    // else it's a submit link but not inside the queue, so do nothing

});