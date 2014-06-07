// ==UserScript==
// @name           ACSSL ShoutBox Mod
// @namespace      acsslsb
// @include        http://*acssl.com/board/index.php*
// ==/UserScript==

var a = document.getElementById('shoutbox-smilies-button_menucontent').nextSibling.nextSibling.nextSibling.nextSibling;
if (a) {
    a.parentNode.removeChild(a);
    var d = document.getElementById('secondary_nav');
    if (d) {
        d.parentNode.insertBefore(a, d);
    }
}

//var newBody = document.body.innerHTML;
//newBody = newBody.replace("ipshoutbox.can_edit         = parseInt(0)","ipshoutbox.can_edit         = parseInt(1)");
//newBody = newBody.replace("ipshoutbox.flood_limit      = parseInt(2)","ipshoutbox.flood_limit      = parseInt(0)");
//newBody = newBody.replace("ipshoutbox.bypass_flood     = parseInt(0)","ipshoutbox.bypass_flood     = parseInt(1)");
//newBody = newBody.replace("ipshoutbox.can_access_acp   = parseInt(0)","ipshoutbox.can_access_acp   = parseInt(1)");
//newBody = newBody.replace("ipshoutbox.inactive_timeout = parseInt(10)","ipshoutbox.inactive_timeout = parseInt(0)");
//newBody = newBody.replace("ipshoutbox.shout_order      = 'desc'","ipshoutbox.shout_order      = 'asc'");
//newBody = newBody.replace("ipshoutbox.moderator        = 0","ipshoutbox.moderator        = 1");
//document.body.innerHTML = newBody;

var target = document.getElementById('tab_link_topics');
var oEvent = document.createEvent('MouseEvents');
oEvent.initMouseEvent('click', true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);

window.addEventListener(
    'load', 
    function() { target.dispatchEvent(oEvent); },
    true);