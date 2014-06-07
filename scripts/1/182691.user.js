// ==UserScript==
// @name        Youtube Messages Expander
// @namespace   http://userscripts.org/users/69817
// @description Expands the messages from the Youtube Inbox to allow the user to make copies of  message sets manually.
// @include     http://www.youtube.com/inbox?folder=messages*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @resource    PrintStyle http://userstyles.org/styles/94978.css
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @version     0.2
// ==/UserScript==

function OpenMessages()
{
    var userTypeNodes = $(".message.closed");
    userTypeNodes.removeClass ("closed");
    userTypeNodes.addClass ("open");
}

function CloseMessages()
{
    var userTypeNodes = $(".message.open");
    userTypeNodes.removeClass ("open");
    userTypeNodes.addClass ("closed");
}

/* ref.: http://stackoverflow.com/a/13104014 */

$("#commands2").append('                                \
    <span id="pf_banner"                                \
        class="page-numbers"                            \
        style="padding-left:2em;">                      \
            Para imprimir:                              \
    </span>                                             \
');

/* ref.: http://stackoverflow.com/a/14249787 */

/* opt.: http://greasemonkey.win-start.de/patterns/insert-after.html */

$("#commands2").append('                                                        \
    <button id="pf_expand_button"                                               \
        type="button"                                                           \
        class="yt-uix-button yt-uix-button-default yt-uix-button-size-default"  \
        role="button">                                                          \
            <span class="yt-uix-button-content">Expandir</span>                 \
    </button>                                                                   \
');

$("#pf_expand_button").click(OpenMessages);

/* ref.: http://stackoverflow.com/a/9049963 */

$("#commands2").append('                                                        \
    <button id="pf_collapse_button"                                             \
        type="button"                                                           \
        class="yt-uix-button yt-uix-button-default yt-uix-button-size-default"  \
        role="button">                                                          \
            <span class="yt-uix-button-content">Recolher</span>                 \
    </button>                                                                   \
');

$("#pf_collapse_button").click(CloseMessages);

GM_registerMenuCommand("Close Messages", CloseMessages);
GM_registerMenuCommand("Open Messages", OpenMessages);

/* ref.: http://wiki.greasespot.net/GM_registerMenuCommand */

GM_addStyle(GM_getResourceText("PrintStyle"));

/* http://wiki.greasespot.net/Multi_Line_Strings */

