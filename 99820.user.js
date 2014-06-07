// ==UserScript== 
// @name          Salesforce Quick Links
// @version       1.6
// @date          2014-03-24
// @description	  adds handy links to the top of the Salesforce page
// @author        Andreas Schaefer aschaefer@salesfactory42.com
// @include       https://*.salesforce.com/*
// @exclude       https://*.*.com/umps/*
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==
// The customhtml holds the links, feel free to edit/expand to your liking


window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{
    if (window.top === window.self) {   //don't run on frames or iframes
    
        // salesforce blue = #1797C0
        // dark grey = #999999  - works for most Apps
    
        var elem = document.createElement('div');
    	document.body.appendChild(elem);
    	elem.innerHTML = "<div class=\"messages\" style=\"position: absolute; top: 10px; left: 600px; color: #999999; background: #FFFFFF; z-index: 999 \">" +
            "<a href=\"/ui/setup/Setup\" style=\"color: #999999\">Setup</a> | " +
            "<a href=\"/_ui/core/chatter/ui/ChatterPage\" style=\"color: #999999\">Chatter</a> | " +
            "<a href=\"/_ui/core/chatter/groups/GroupListPage\" style=\"color: #999999\">Groups</a> | " +
            "<a href=\"/_ui/core/chatter/files/FileTabPage\" style=\"color: #999999\">Files</a> | " +
            "<a href=\"/007\" style=\"color: #999999\">Tasks</a> | " +
            "<a href=\"/6AC?src=7\" style=\"color: #999999\">M2S</a> | " +
            "<a href=\"/secur/logout.jsp\" style=\"color: #999999\">logout</a>" +
            "</div>";
    }
}