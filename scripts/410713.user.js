// ==UserScript==
// @name        HTML5 Notifications fix for Firefox
// @namespace   https://zornco.com/
// @include     http*://mightytext.net/web*/*
// @version     1.0.3
// @run-at      document-start
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @downloadURL https://userscripts.org/scripts/source/410713.user.js
// @updateURL   https://userscripts.org/scripts/source/410713.meta.js
// @grant       none
// ==/UserScript==

/**
 * Fix weird error MightyText was having with loading jQuery
 */
jQ = jQuery.noConflict(true);
function starting(e)
{
    if(e.target.src.indexOf("jquery-") != -1 && e.target.src.indexOf(".min") != -1)
    {
        script = document.createElement('script');
        script.src = 'scripts/jquery-1.8.3.js';
        
        unsafeWindow.jQuery = unsafeWindow.$ = jQ;
        
        e.stopPropagation();
        e.preventDefault();
    }
}
unsafeWindow.document.addEventListener("beforescriptexecute", starting, true);
/**
 * end jQuery fix
 */

unsafeWindow.webkitNotifications = unsafeWindow.Notification;

unsafeWindow.webkitNotifications.checkPermission =
    function()
{
    return (unsafeWindow.Notification.permission == 'granted'? 0:1);
};

unsafeWindow.webkitNotifications.createNotification = 
    function(icon, title, body)
{
    var g = new unsafeWindow.Notification(title, {icon: icon, body: body});
    g.onshow = function(){ this.ondisplay(); };
    g.show = function(){};
    g.cancel = function(){ this.close(); };
    return g;
};