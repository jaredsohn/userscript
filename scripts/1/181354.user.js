// ==UserScript==
// @name     RedCafe - Hide Youtube videos behind button
// @include  http://www.redcafe.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/
waitForKeyElements ("iframe[src*='youtube.com']", hideYoutubeVideo);

function hideYoutubeVideo (jNode) {
    if ( ! jNode.hasClass ("gmSpoiledAlready") ) {
        jNode.addClass ("gmSpoiledAlready");

        var srcCode     = jNode[0].outerHTML;

        jNode.after ('<button class="gmYT_hide" style="background:#d00000; color: #ffffff; font-weight:bold; border:1px solid #b80202; border-radius: 3px; padding:2px;">Show YouTube video</button>');
        jNode.next ('button').data ("frmCode", srcCode);
        jNode.remove ();
    }
}

//--- Activate any and all of the spoiler buttons
$(document.body).on ("click", "button.gmYT_hide", restoreYoutubeVideo)

function restoreYoutubeVideo (evnt) {
    var jThis   = $(evnt.target);
    var frmCode = jThis.data ("frmCode");

    jThis.replaceWith (frmCode);
}