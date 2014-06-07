// ==UserScript==
// @name           Higher Facebook Chat by King cassanova
// @description    Modify the height of the BF chat
// @include         http*://www.facebook.com/*
// @include         https*://www.facebook.com/*
// @version 	1.2
// @source 	http://userscripts.org/scripts/show/122917
// @identifier 	http://userscripts.org/scripts/show/122917.user.js
// @namespace		http://userscripts.org/users/433138
// ==/UserScript==
// source : http://userscripts.org/scripts/review/118430

var chatNewHeight = 600; //limited by other stuff not to fly off the page
var chatNewWidth = 330; // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (1 + 1 + 1); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 200

function chatResizeAction() { 

        chatNewWidth = 300;
        chatNewHeight = 500;
        chatNewEntryWidth = chatNewWidth - (5 + 5 + 5);
        chatNewTextEntry = chatNewWidth - 26;
    
    reFlow();
}

 //----
 
function addGlobalStyle(css) {
    if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    var docHead = document.getElementsByTagName('head')[0];
    docHead.appendChild(style).innerHTML=css;

    var docBody = document.getElementByTagName('body')[0];
    docBody.appendChild(style).innerHTML="";
}

function reFlow() {
	addGlobalStyle(
      ".rNubContainer .fbNub { margin-left: 0px; }"
    )
 
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle(".fbDock { margin: 0 0px; }");

addGlobalStyle("#fbDockChatTabs .fbDockChatTab.openToggler{ width: 330px; }");
 
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
	
    addGlobalStyle(".fbChatMessageGroup .profileLink .profilePhoto { height: 36px; }");
    addGlobalStyle(".fbChatMessageGroup .profileLink .profilePhoto { width: 36px; }");

 
    addGlobalStyle(".fbDockChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbDockChatTab .conversationContainer .fbChatMessage { max-width: 265px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");

    addGlobalStyle(
      ".fbDockChatTab .fbDockChatTabFlyout { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )

    addGlobalStyle("tbody { vertical-align: bottom; }");

}
reFlow();