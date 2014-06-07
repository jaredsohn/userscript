// ==UserScript==
// @name       Ghingis
// @version    1.0
// @description  Megjeleníti a facebook által elrejtett és likeolás után megnézhető oldalaknál a rejtett tartalmat.
// @match      http://*/*
// @copyright  2012+, Ghingis
// ==/UserScript==
if(typeof unsafeWindow.jQuery == 'undefined') { 
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
};
// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
// All your GM code must be inside this function
function letsJQuery() {
            $('.wp-like-lock-content').removeClass('hidden');
}
