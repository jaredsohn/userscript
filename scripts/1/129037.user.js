// ==UserScript==
// @name            Higher Facebook Chat by cassanova
// @description     Modify the Higher of the Fb chat
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @include         https://apps.facebook.com/*
// @include         http://apps.facebook.com/*
// @version 	    1.4
// @source 	    http://userscripts.org/scripts/review/431413
// @namespace       http://userscripts.org/users/431413
// ==/UserScript==

var chatNewHeight = 600; //limited by other stuff not to fly off the page
var chatNewWidth = 360; // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 100

function chatResizeAction() { 

        chatNewWidth = 360;
        chatNewHeight = 600;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
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

 
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
	
addGlobalStyle(".fbMercuryChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbMercuryChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");

    addGlobalStyle(
      ".fbMercuryChatTab .fbDockChatTabFlyout  { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )

 addGlobalStyle(".emote_custom { height: 32px !important; width: 32px !important; } ");
	
    addGlobalStyle("tbody { vertical-align: bottom; }");

}
reFlow();