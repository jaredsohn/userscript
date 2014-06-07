// ==UserScript==
// @name            WoWI Cleanup
// @namespace       tag:tardmrr@gmail.com,11-07-2005:WoWICleanup
// @description     Removes the nasty Ogaming bar from the top of WoWInterface
// @include         *wowinterface*
// ==/UserScript==
(function ()
{
    var ogaming = document.getElementsByTagName('table')[0];
    if(ogaming.getAttribute("class") == "OGBar_table")
    {
        ogaming.parentNode.removeChild(ogaming);
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundPosition = "0px -32px";
    }
})();
