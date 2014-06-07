// ==UserScript==
// @name            Higher Facebook Chat
// @description     Modify the height of the BF chat
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @include         https://apps.facebook.com/*
// @include         http://apps.facebook.com/*
// @version 	    1.4
// @source 	    http://userscripts.org/scripts/review/124377
// @namespace       http://userscripts.org/users/124377
// ==/UserScript==

var chatNewHeight = 600; //limited by other stuff not to fly off the page
var chatNewWidth = 260; // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 200

function chatResizeAction() { 

        chatNewWidth = 260;
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
      ".rNubContainer .fbNubFlyoutInner{ margin-left: 0px; }"
    )
 
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle("fbDockChatTabFlyout { margin: 0 0px; }");

 
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
	
addGlobalStyle(".fbMercuryChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbDockChat .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle("fbDockChat .metaInfoContainer { visibility: visible !important; }");

    addGlobalStyle(
      ".fbDockChat .fbDockChatTabFlyout  { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )

 addGlobalStyle(".emote_custom { height: 32px !important; width: 32px !important; } ");
	
    addGlobalStyle("tbody { vertical-align: bottom; }");

}
reFlow();