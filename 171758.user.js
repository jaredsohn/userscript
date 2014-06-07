// ==UserScript==
// @name          CECIL-be-gone!
// @description	  Auto-renew your CECIL sessions!
// @include       http://cecil.auckland.ac.nz/Cecil.aspx*
// ==/UserScript==

var payload = '                                                                 \n\
// take a few constants from the original source                                \n\
var timeout = 60;                                                               \n\
var timeToExpireInMin = 1000 * 60 *(timeout - 5);                               \n\
                                                                                \n\
// make SessionAlert more passive                                               \n\
window.SessionAlert.ResetSession = (function(fn)                                \n\
{                                                                               \n\
    return function()                                                           \n\
    {                                                                           \n\
        return fn(true);                                                        \n\
    }                                                                           \n\
})(window.SessionAlert.ResetSession);                                           \n\
                                                                                \n\
// clear the current session alert timeout                                      \n\
var _setTimeout = window.setTimeout;                                            \n\
window.setTimeout = function() { };                                             \n\
window.SessionAlert.resetAlert();                                               \n\
window.setTimeout = _setTimeout;                                                \n\
                                                                                \n\
var mytimer;                                                                    \n\
                                                                                \n\
// inject a new resetAlert function                                             \n\
window.SessionAlert.resetAlert = function()                                     \n\
{                                                                               \n\
    clearTimeout(mytimer);                                                      \n\
    mytimer = window.setTimeout(function()                                      \n\
    {                                                                           \n\
        window.SessionAlert.ResetSession();                                     \n\
        window.SessionAlert.resetAlert();                                       \n\
    }, timeToExpireInMin);                                                      \n\
};                                                                              \n\
                                                                                \n\
// give window the new resetAlert function                                      \n\
window.resetAlert = window.SessionAlert.resetAlert;                             \n\
                                                                                \n\
// go!                                                                          \n\
resetAlert();                                                                   \n\
';

var scriptNode = document.createElement("script");
scriptNode.textContent = payload;
document.head.appendChild(scriptNode);