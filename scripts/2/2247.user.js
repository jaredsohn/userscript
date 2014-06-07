// ==UserScript==

// @name           MySpace Title Fixer

// @namespace      http://migraineheartache.com/software/

// @description    Re-writes the page titles on myspace.com so that they actually reflect the page you're viewing.

// @include        http://*.myspace.com/*

// ==/UserScript==

(function() {
    var href = new String(document.location);
    
    GM_log("HREF: " + href);
    
    if(href.indexOf("home") != -1) {
        document.title = 'MySpace Home';
    } else if (href.indexOf("fuseaction=ad") != -1) {
        document.title = 'MySpace Ad';
    } else if (href.indexOf("browse") != -1) {
        document.title = 'MySpace Browse';
    } else if (href.indexOf("search") != -1) {
        document.title = 'MySpace Search';
    } else if (href.indexOf("invite") != -1) {
        document.title = 'MySpace Invite';
    } else if (href.indexOf("rank") != -1) {
        document.title = 'MySpace Rank';
    } else if (href.indexOf("mail") != -1) {
        fixMailTitle();
    } else if (href.indexOf("blog") != -1) {
        document.title = 'MySpace Blog';
    } else if (href.indexOf("favorites") != -1) {
        document.title = 'MySpace Favorites';
    } else if (href.indexOf("forum") != -1) {
        document.title = 'MySpace Forum';
    } else if (href.indexOf("groups") != -1) {
        document.title = 'MySpace Groups';
    } else if (href.indexOf("events") != -1) {
        document.title = 'MySpace Events';
    } else if (href.indexOf("music") != -1) {
        document.title = 'MySpace Music';
    } else if (href.indexOf("classifieds") != -1) {
        document.title = 'MySpace Classifieds';
    } else if (href.indexOf("topartists") != -1) {
        document.title = 'MySpace Top Artists';
    } else if (href.indexOf("videos") != -1) {
        document.title = 'MySpace Videos';
    } else if (href.indexOf("signup") != -1) {
        document.title = 'MySpace Signup';
    } else if (href.indexOf("bulletin") != -1) {
        fixBulletinTitle();
    } else if(href.indexOf("address") != -1) {
        fixADBTitle();
    }
    
    function fixADBTitle() {
        if(href.indexOf("fuseaction=adb&") != -1) {
            document.title = 'MySpace Address Book (View All)';
        } else if (href.indexOf("fuseaction=adb.addContact") != -1) {
            document.title = 'MySpace Address Book (Add Contact)';
        } else if (href.indexOf("fuseaction=adb.manageLists") != -1) {
            document.title = 'MySpace Address Book (Contact Lists)';
        }
    }
    
    function fixBulletinTitle() {
        if(href.indexOf("fuseaction=bulletin.read") != -1) {
            document.title = 'MySpace Read Bulletin';
        } else if (href.indexOf("fuseaction=bulletin.edit") != -1) {
            document.title = 'MySpace Post Bulletin';
        } else if (href.indexOf("fuseaction=bulletin.confirm") != -1) {
            document.title = 'MySpace Confirm Bulletin Post';
        } else if (href.indexOf("fuseaction=bulletin&") != -1) {
            document.title = 'MySpace Bulletin Board';
        } else if (href.indexOf("fuseaction=bulletin.ShowMyBulletins") != -1) {
            document.title = 'MySpace Bulletins I\'ve Posted';
        } else if (href.indexOf("fuseaction=bulletin.deleted") != -1) {
            document.title = 'MySpace Bulletin(s) Have Been Deleted';
        }
    }
    
    function fixMailTitle() {
        if(href.indexOf("fuseaction=mail.message&friendID=") != -1) {
            document.title = 'MySpace Compose Message';
        } else if (href.indexOf("fuseaction=mail.messagesent") != -1) {
            document.title = 'MySpace Message Sent';
        } else if (href.indexOf("fuseaction=mail.inbox") != -1) {
            document.title = 'MySpace Mail (Inbox)';
        } else if (href.indexOf("fuseaction=mail.readmessage") != -1) {
            document.title = 'MySpace Mail (Read Message)';
        } else if (href.indexOf("fuseaction=mail.sentbox") != -1) {
            document.title = 'MySpace Mail (Sent Messages)';
        } else if (href.indexOf("fuseaction=mail.trashbox") != -1) {
            document.title = 'MySpace Mail (Trash)';
        } else if (href.indexOf("fuseaction=mail.friendRequests") != -1) {
            document.title = 'MySpace Friend Requests';
        } else if (href.indexOf("fuseaction=mail.pendingFriendRequests") != -1) {
            document.title = 'MySpace Pending Friend Requests';
        } else if (href.indexOf("fuseaction=mail.EventInvite") != -1) {
            document.title = 'MySpace Mail (Event Invites)';
        } else if (href.indexOf("fuseaction=mail.savebox") != -1) {
            document.title = 'MySpace Mail (Saved Messages)';
        }
    }
})();