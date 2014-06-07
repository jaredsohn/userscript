// ==UserScript==
// @name        mmmturkeybacon Logged Out Alert
// @author      mmmturkeybacon
// @description Alerts you if you've been logged out of mturk.
//              Your dashboard page must remain open in a tab
//              for this script to work.
// @namespace   http://userscripts.org/users/523367
// @match       https://www.mturk.com/mturk/dashboard
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/467053.user.js
// @updateURL   http://userscripts.org/scripts/source/467053.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==

var load_busy = false;

// 61 is prime so it's less likely to cause a conflict with page monitor
// because it's not a multiple of common delays
var waitforit = 61; // seconds delay between logged in check

function check_logged_in()
{
    if (load_busy == false)
    {
        load_busy = true;
        $.ajax({
            url: 'https://www.mturk.com/mturk/dashboard',
            type: 'GET',
            success: function()
            {
                load_busy = false;
                setTimeout(check_logged_in, waitforit*1000);
            },
            error: function()
            {
                load_busy = false;
                alert('Are you signed in?');
                setTimeout(check_logged_in, waitforit*1000);
            }
        });
    }
    else
    {
        setTimeout(check_logged_in, 1000);
    }
}

check_logged_in();
