// Better All-inkl.com Webmail
// version 0.1
// 2007-12-18
// Copyright (c) 2007, Mario Rutz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// You should configure the Included and Excluded pages in the GreaseMonkey
//      configuration pane.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Auto Reload", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//  Auto Reloads the page configured in the Included page list every minute
//  and counts the unread mails.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Better All-inkl.com Webmail
// @description     For allinkl(german shared webhoster) webmail users: "Included pages" will get reloaded and checked for new mail every minute.
// @include         *webmail.all-inkl.com/index.php?open=abrufen*
// ==/UserScript==

(function()
{
    setTimeout("document.location.reload();", 60000);

        var allImg, thisImg, newMailCount;
        allImg = document.evaluate(
        '//img[@src]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
        newMailCount = 0;
        for (var i = 0; i < allImg.snapshotLength; i++) {
                thisImg = allImg.snapshotItem(i);

                if(thisImg.src.match(/mail_new\.gif/)){
                        newMailCount++;
                }

        }

        if(newMailCount > 0){
                        document.getElementsByTagName("title").item(0).text = "(" + newMailCount + ") " + document.getElementsByTagName("title").item(0).text;
        }
})();
