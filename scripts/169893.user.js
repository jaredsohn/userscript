// ==UserScript==
// @name        GMail Inbox Count Removal
// @namespace   https://userscripts.org/users/djenkinsvd
// @description Remove the inbox count for GMail.
// @include     https://mail.google.com/*
// @version     1.1.beta
// @grant       none
// ==/UserScript==

function replaceInboxGmailText() {
    var inboxElement = document.getElementsByClassName("J-Ke");
    
    for (var i=0; i < inboxElement.length; i++) {
        var element = inboxElement[i];
        
        if (element.hash == '#inbox')
            element.innerHTML = "Inbox";
    }
    
    window.setTimeout(replaceInboxGmailText, 3000);
}

window.setTimeout(replaceInboxGmailText, 3000);