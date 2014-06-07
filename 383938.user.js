// ==UserScript==
// @name        mmmturkeybacon Target Window Picker
// @author      mmmturkeybacon
// @description Let's you pick which window a link opens in. Hover over
//              a link and pick a number 1-9 to set the target window.
//              Use 0 to set the target window to the current window.
// @namespace   http://userscripts.org/users/523367
// @include     *
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/383938.user.js
// @updateURL   http://userscripts.org/scripts/source/383938.user.js
// @version     1.0
// @grant       none
// ==/UserScript==

var SET_ALL_TARGETS = true;

var link_elm;

$('a[href^="http"]').each(function()
{
    $(this).bind('mouseenter', function(e)
    {
        link_elm = $(this).get(0);
    });

    $(this).bind('mouseleave', function(e)
    {
        link_elm = null;
    });
});

$(document).keypress(function(e)
{
    if (link_elm && e.which > 47 && e.which < 58) // 0-9
    {
        if (e.which == 48) // 0 to open in current window
        {
            var target = '';
        }
        else
        {
            var target = 'myWindow'+e.which;
        }
        
        if (SET_ALL_TARGETS == true)
        {
            $('a[href^="http"]').each(function()
            {
                $(this).attr('target', target);
            });
        }
        else
        { // set targets individually
            link_elm.target = target;
        }
    }
});