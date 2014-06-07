// ==UserScript==
// @name        mmmturkeybacon Scroll To Workspace
// @author      mmmturkeybacon
// @description When a HIT has been accepted, this script scrolls the mturk workspace to the
//              top of the window.
//              When a HIT is being previewed, this script scrolls the 'Accept HIT' button to
//              the top of the window, unless there is a CAPTCHA.
//              Whenever a HIT is previewed or accepted, this script sets the iframe height
//              equal to the browser's viewport height to ensure proper scrolling and gives
//              focus to the iframe.
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/preview*
// @match       https://*.mturk.com/mturk/accept*
// @match       https://*.mturk.com/mturk/continue*
// @match       https://*.mturk.com/mturk/submit*
// @match       https://*.mturk.com/mturk/return*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/180709.user.js
// @updateURL   http://userscripts.org/scripts/source/180709.user.js
// @version     3.04
// @grant       none
// ==/UserScript==

$(document).ready(function ()
{   
    var is_a_HIT = document.evaluate("//input[@type='hidden' and @name='isAccepted']", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
    if (is_a_HIT == true)
    {
        var workspace;
        var iframe = document.getElementsByTagName('iframe')[0];
        var hit_wrapper = document.evaluate("//div [@id='hit-wrapper']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var isAccepted = document.evaluate("//input[@type='hidden' and @name='isAccepted' and @value='true']", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
        var captcha = document.evaluate("//input[@name='userCaptchaResponse']", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;

        if (iframe)
        {
            iframe.height = window.innerHeight;
            $(window).load(function(){iframe.focus();});
            workspace = iframe;
        }
        else if (hit_wrapper)
        {
            /* Changing the hit_wrapper height doesn't work correctly because
             * this script runs before all images are are loaded. This makes it
             * impossible to know what the final hit_wrapper height will be and
             * setting the hit_wrapper height before images are loaded may 
             * result in a hit_wrapper that is too small.
             * Padding is added to the end of the page to ensure proper scrolling.
             */
            var hit_wrapper_ypos = hit_wrapper.getBoundingClientRect().top;
            var pad = hit_wrapper_ypos+window.innerHeight-$(document).height();
            if (pad > 0)
            {
                var pad_div = document.createElement("div");
                pad_div.style.height = pad;
                document.body.appendChild(pad_div);
            }
            workspace = hit_wrapper;
        }
        
        // If isAccepted is true then there is almost certainly not a CAPTCHA but I'm not positive and I can't test for that
        // case, so it's better to be safe than sorry.
        if (captcha == false)
        {
            if (isAccepted == true && workspace)
            { // HIT accepted
                workspace.scrollIntoView();
                
                //if (window.chrome)
                //{
                //    /* This solves the problem of chrome scrolling to the last position it
                //     * remembers. However, if a page is loaded that chrome doesn't remember
                //     * a position for this will snap back to the top of the workspace the
                //     * first time the user scrolls, which is not an ideal solution and why
                //     * this is commented out.
                //     * A timeout of 0 works, but it is jarring and looks buggy.
                //     */
                //    $(window).load(function(){window.onscroll = function(){ window.onscroll=null; setTimeout( function(){workspace.scrollIntoView();}, 500 ); }});
                //}
            }
            else
            { // previewing HIT
                var timer = document.evaluate("//span[@id='theTime' and @class='title_orange_text' and @style='text-align: right;']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                timer.scrollIntoView();
                //if (window.chrome)
                //{
                //    $(window).load(window.onscroll = function(){ window.onscroll=null; setTimeout( function(){timer.scrollIntoView();}, 500);});
                //}
            }
        }
    }
});