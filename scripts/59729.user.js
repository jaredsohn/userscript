// ==UserScript==
// @name           Mafia Wars Requests Helper
// @namespace      http://www.wretmo.se/GM/MafiaWars/RequestsHelper
// @description    Auto click on requests
// @include        http://*.facebook.com/*reqs.php*
// ==/UserScript==

javascript: (//)
    function() {
        function IgnoreMafiaWarInvites() {
            var nodesSnapshot = document.evaluate("//div[contains(@id, 'confirm_10979261223_')]//input[@value='Ignore' and contains(@onclick, \"'Mafia Wars'\")]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Ignore Mafia War Invites", IgnoreMafiaWarInvites);

        function ConfirmFriendRequests() {
            var nodesSnapshot = document.evaluate("//div[@id='friend_connect']//input[@value='Confirm']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Confirm Friend Requests", ConfirmFriendRequests);

        function IgnoreFriendSuggestions() {
            var nodesSnapshot = document.evaluate("//div[@id='friend_suggestion']//input[@value='Ignore']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Ignore Friend Suggestions", IgnoreFriendSuggestions);

        function IgnoreEventInvitations() {
            var nodesSnapshot = document.evaluate("//div[@id='event_invite']//input[@value='No']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Ignore Event Invitations", IgnoreEventInvitations);

        function IgnoreGroupInvitations() {
            var nodesSnapshot = document.evaluate("//div[@id='group_invite']//input[@value='Ignore']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Ignore Group Invitations", IgnoreGroupInvitations);

        function IgnorePageSuggestions() {
            var nodesSnapshot = document.evaluate("//div[@id='fbpage_fan_confirm']//input[@value='Ignore']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Ignore Page Suggestions", IgnorePageSuggestions);

        function IgnoreOtherApplicationRequestsAndInvitations() {
            var nodesSnapshot = document.evaluate("//div[starts-with(@id, 'confirm_') and not(contains(@id, '10979261223'))]//input[@value='Ignore']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
                nodesSnapshot.snapshotItem(i).click();
            }
        }
        GM_registerMenuCommand("Ignore Other Application Requests and Invitations", IgnoreOtherApplicationRequestsAndInvitations);

        function IgnoreMost() {
            IgnoreFriendSuggestions();
            IgnoreEventInvitations();
            IgnoreGroupInvitations();
            IgnorePageSuggestions();
            IgnoreOtherApplicationRequestsAndInvitations();
        }
        GM_registerMenuCommand("Ignore Friend, Event, Group, Page and other Application Requests and Invitations", IgnoreMost);

        function DoAll() {
            ConfirmFriendRequests();
            IgnoreMafiaWarInvites();
            IgnoreMost();
        }
        GM_registerMenuCommand("Do all", DoAll);
    })();
