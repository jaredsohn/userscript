// ==UserScript==
// @name        Time YouTube
// @description Time YouTube
// @namespace   time_youtube
// @author         Romaric, thank you to Brock Adams
// @include     *youtube.com/watch*
// @icon        http://aux3.iconpedia.net/uploads/520882026785186105.png
// @grant       GM_setValue
// @grant       GM_addStyle
// @version     2
// ==/UserScript==

//-- Only run in the top page, not the various iframes.
if (window.top === window.self) {
    var timeBtn         = document.createElement ('a');
    timeBtn.id          = "gmTimeBtn";
    timeBtn.textContent = "Time";
    //-- Button is styled using CSS, in GM_addStyle, below.

    document.body.appendChild (timeBtn);

    addJS_Node (null, null, activateTimeButton);
}

function activateTimeButton () {
    var timeBtn = document.getElementById ("gmTimeBtn");
    if (timeBtn) {
        timeBtn.addEventListener ('click',
            function () {
                var ytplayer = document.getElementById ("movie_player");
                //-- IMPORTANT:  GM_functions will not work here.

                console.log ("getCurrentTime(): ", ytplayer.getCurrentTime() );
                alert (ytplayer.getCurrentTime() );
            },
            false
        );
    }
    else {
        alert ("Time button not found!");
    }
}

//-- Style and position our button the CSS way.
GM_addStyle ( "                 \
    #gmTimeBtn {                \
        position:   fixed;      \
        top:        200px;      \
        left:       3px;        \
        color:      black;      \
        margin:     0;          \
        padding:    0;          \
    }                           \
" );

//-- This is a standard-ish utility function...
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}