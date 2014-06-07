// ==UserScript==
// @name           Big-Chat
// @description    Modify the facebook chat window
// @include         http*://www.facebook.com/*
// ==/UserScript==
 
var chatNewHeight = 450; //limited by other stuff not to fly off the page
var chatNewWidth = (window.innerWidth - 1024); // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (1 + 1 + 1); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 200

function chatResizeAction() { 
    if (chatNewWidth != 300) {
        // small chat
        chatNewWidth = 150;
        chatNewHeight = 430;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    } else {
        // Big chat
        chatNewWidth = (window.innerWidth - 222);
        chatNewHeight = (window.innerHeight - 73);
        chatNewEntryWidth = chatNewWidth - (5 + 5 + 5);
        chatNewTextEntry = chatNewWidth - 26;
    }
    
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
 
 
    addGlobalStyle(".fbDockChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbDockChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
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
/*
.fbDockChatTab .fbDockChatTabFlyout {
bottom: 0;
height: 800px; <- Set this to chatNewHeight
width: 100px; <- set this to chatNeWidth
}
 
 
.fbDockChatTab .input {
border: 0;
border-top: 1px solid #C9D0DA;
display: block;
height: 0;
margin: 0;
max-height: 77px;
min-height: 16px;
outline: none;
overflow: auto;
overflow-x: hidden;
padding: 5px 4px 3px 20px;
resize: none;
width: 74px;} <- Set this chatNewWidth-6
*/