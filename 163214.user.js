// ==UserScript==
// @name        Outlook Web App
// @namespace   outlook
// @include     https://exchange-server/owa/*
// @grant       none
// @version     1.3
// ==/UserScript==

// language strings
var LANG_ACTION_NEWMESSAGE = "Compose new message";
var LANG_ACTION_MAIL = "Mail";
var LANG_ACTION_CONTACTS = "Contacts";
var LANG_ACTION_CALENDAR = "Calendar";
var LANG_ACTION_TASKS = "Tasks";
var LANG_ACTION_PUBLICFOLDERS = "Public folders";
var LANG_UNREAD_FOLDER = "Unread mail";
var LANG_RECEIVED_MAIL = "You have new mail";
var LANG_EXCLUDED_FOLDERS = new Array("Deleted items", "Trash");

// Time in seconds
var refreshTime = 15;
var firstLoadWaitTime = 3;

// version number; default is Exchange 2010 (14.x)
var owaVersion = 14;

var originalTitle = unsafeWindow.document.title;
var lastUnreadCount = -1;

function fbLog(message) {
    if (unsafeWindow.console) unsafeWindow.console.log(message);
}

function checkOutlookVersion() {
    var s = unsafeWindow.sver;
    if (s != null) {
        owaVersion = parseInt(s.split(".")[0]);
    } else {
        // for login page
        var links = document.getElementsByTagName("link");
        if (links.length>0) {
            if (links[0].href.indexOf("/15.")>0) owaVersion = 15;
        }
    }
}

function evalInPageContext(func) {
    var script = unsafeWindow.document.createElement('script');
    script.appendChild(unsafeWindow.document.createTextNode('(' + func + ')();'));
    (unsafeWindow.document.body || unsafeWindow.document.head || unsafeWindow.document.documentElement).appendChild(script);
}

function linkCallbackById(id) {
    return function () { 
        fbLog("Link: " + id);
        document.getElementById(id).click();
    };
}

function linkCallbackByClassName(className, index) {
    return function () { 
        fbLog("Class: " + className);
        document.getElementsByClassName(className)[index].click();
    };
}

function indicatorCallbackParent(node) {
    return function () { node.parentNode.click(); };
}

function indicatorCallbackParentParent(node) {
    return function () { node.parentNode.parentNode.click(); };
}

function setActions2010() {
    Unity.Launcher.addAction(LANG_ACTION_NEWMESSAGE, linkCallbackById("newmsgc"));
    Unity.Launcher.addAction(LANG_ACTION_MAIL, linkCallbackById("lnkInbx"));
    Unity.Launcher.addAction(LANG_ACTION_CALENDAR, linkCallbackById("lnkCal"));
    Unity.Launcher.addAction(LANG_ACTION_CONTACTS, linkCallbackById("lnkCtcts"));
    Unity.Launcher.addAction(LANG_ACTION_TASKS, linkCallbackById("lnkTsks"));
    Unity.Launcher.addAction(LANG_ACTION_PUBLICFOLDERS, linkCallbackById("lnkPFs"));
    Unity.MessagingIndicator.addAction(LANG_ACTION_NEWMESSAGE, linkCallbackById("newmsgc"));
}

function setActions2013() {
    Unity.Launcher.addAction(LANG_ACTION_NEWMESSAGE, linkCallbackByClassName("_newItemContainer_MailModuleView_r2", 0));
    Unity.Launcher.addAction(LANG_ACTION_MAIL, linkCallbackByClassName("_navItem_HeaderNavigationView_r", 0));
    Unity.Launcher.addAction(LANG_ACTION_CALENDAR, linkCallbackByClassName("_navItem_HeaderNavigationView_r", 1));
    Unity.Launcher.addAction(LANG_ACTION_CONTACTS, linkCallbackByClassName("_navItem_HeaderNavigationView_r", 2));
    Unity.Launcher.addAction(LANG_ACTION_TASKS, linkCallbackByClassName("_navItem_HeaderNavigationView_r", 3));
    Unity.MessagingIndicator.addAction(LANG_ACTION_NEWMESSAGE, linkCallbackByClassName("_newItemContainer_MailModuleView_r2", 0));    
}

function checkUnreadMail2010() {
    var unreadCount = 0;
    // read all SPAN tags
    var ss = unsafeWindow.document.getElementsByTagName('span');
    for (var i = 0, l = ss.length; i < l; i++) {
        // if tag does not have id = spnFldrNm, is not a folder, exclude it
        if (ss[i].id != "spnFldrNm") continue;
        // read folder name
        var folderName = ss[i].getAttribute('fldrnm');
        // if no folder name, exclude it
        if (!folderName) continue;
        // exclude specified folders (i.e. trash)
        if (inArray(folderName, LANG_EXCLUDED_FOLDERS)) continue;
        // if class is not fufw, there are no unread messages, clear the indicator
        if (ss[i].className.trim() != "fufw") {
            Unity.MessagingIndicator.clearIndicator(folderName);
        } else {
            // take counter for this folder
            var children = ss[i].parentNode.childNodes;
            var count = 0;
            if (children.length == 2) {
                messageCount = children[1].childNodes[1].innerHTML;
            }
            // notify to Messagging Indicator
            Unity.MessagingIndicator.showIndicator(folderName, {
                count: messageCount, callback: indicatorCallbackParentParent(ss[i])}
            );
            // if "unread mail" folder, use for launcher counter
            if (ss[i].getAttribute('fldrnm') == LANG_UNREAD_FOLDER) {﻿﻿
                unreadCount = messageCount;
            }
        }
    }
    // set Launcher counter
    Unity.Launcher.setCount(Number(unreadCount));
}

function checkUnreadMail2013() {
    var unreadCount = 0;
    var items = document.getElementsByClassName("_unreadCount_MailFolderTreeNodeView2Mouse_0b");
    for (var i = 0, l = items.length; i < l; i++) {
        // for each folder, take unread count and folder name
        var messageCount = items[i].textContent.trim();
        var folderName = items[i].parentNode.childNodes[3].textContent;        
        // exclude specified folders (i.e. trash)
        if (inArray(folderName, LANG_EXCLUDED_FOLDERS)) continue;
        if (messageCount == "") {
            // if itemCount is empty, clear the indicator
            Unity.MessagingIndicator.clearIndicator(folderName);
        } else {
            // convert to integer number
            messageCount = parseInt(messageCount);
            // notify to Messagging Indicator
            Unity.MessagingIndicator.showIndicator(folderName, {
                count: messageCount, callback: indicatorCallbackParent(items[i])}
            );
            // if is inbox use for launcher counter
            if (folderName == "Posta in arrivo") {
                unreadCount = messageCount;
            }
        }
    }
    
    // set Launcher counter
    Unity.Launcher.setCount(unreadCount);
    
    // show unread mail notification
    if (lastUnreadCount>=0 && unreadCount>lastUnreadCount) {
        Unity.Notification.showNotification("Outlook Web App", LANG_RECEIVED_MAIL, null);
    }
    
    lastUnreadCount = unreadCount;
}

function unityLoaded() {
    checkOutlookVersion();
    if (owaVersion==15) {
        setActions2013();
        checkUnreadMail2013();
        setInterval(checkUnreadMail2013, refreshTime * 1000);
    } else {
        setActions2010();
        checkUnreadMail2010();
        setInterval(checkUnreadMail2010, refreshTime * 1000);
    }
}

window.Unity = external.getUnityObject(1);

Unity.init({    name: 'Outlook Web App',
                domain: 'exchange-server',
                homepage: 'https://exchange-server/owa/',
                iconUrl: 'http://www.stefanobagnatica.it/unity-webapps/outlook.png',
		onInit: unityLoaded
});
