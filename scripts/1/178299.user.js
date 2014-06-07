// ==UserScript==
// @name          Facebook Redirect Remover
// @author        Jan Strohbeck (mail@jan-strohbeck.de)
// @provided by   Jan Strohbeck
// @description	  Rewrites all external links on Facebook to not go via facebook.com/l.php, so that Facebook cannot trace the links you clicked. It also disables facebook's internal mechanisms to restore the default links onclick/onmouseover.
// @include       *facebook.com*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @grant         none
// ==/UserScript==

function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function remove_trackers ()
{
    $(this).removeAttr ('onclick');
    $(this).removeAttr ('onmouseover');
    $(this).removeAttr ('onmousedown');
    $(this).removeAttr ('data-reactid');
    var href = $(this).attr ("href");
    var res = href.match (/l\.php\?u=http[^&]+&/);
    if (res.length == 1)
    {
        var h = res[0];
        h = h.replace (/l\.php\?u=/, "");
        h = h.replace (/&$/, "");
        h = urldecode (h);
        $(this).attr ("href", h);
    }
    $(this).unbind ();
}

$(document).ready (function ()
{
    // $("#home_stream").on ("mouseover", "a", remove_trackers);
    // $("#pagelet_ego_pane").on ("mouseover", "a", remove_trackers);
    $("body").on ("mouseover", "a[target='_blank']", remove_trackers);
});
