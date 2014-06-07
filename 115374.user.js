
// ==UserScript==
// @name           fb BigChat
// @namespace      http://userscripts.org/users/null
// @description    Modify the facebook chat window to take up more of the browser window
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
 
 
var chatNewHeight = 1200; //limited by other stuff not to fly off the page
var chatNewWidth = (window.innerWidth - 222); // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 205
 
//----
var elmNewContent = document.createElement('span');
elmNewContent.addEventListener('click',chatResizeAction, false);
elmNewContent.style.color = '#FFFFFF'
elmNewContent.style.backgroundColor = '#3B5998';
elmNewContent.style.border = '#AAAAAA 1px';
elmNewContent.style.float = 'right;';
elmNewContent.style.fontSize = 'x-small';
elmNewContent.appendChild(document.createTextNode('Click to Resize Chat'));
var elmFoo = document.getElementById('leftColContainer');
elmFoo.insertBefore(elmNewContent, elmFoo.parent); 

 
function chatResizeAction() { 
    if (chatNewWidth != 300) {
        // small chat
        chatNewWidth = 300;
        chatNewHeight = 430;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    } else {
        // Big chat
        chatNewWidth = (window.innerWidth - 222);
        chatNewHeight = (window.innerHeight - 73);
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
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

    // And "clearfix" margin
    addGlobalStyle(".fbDockWrapperRight .fbDock { margin: 0px; }");
 
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
 
    // Other Misc size changes
    addGlobalStyle(".fbMercuryChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbMercuryChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");

    addGlobalStyle(
      ".fbMercuryChatTab .fbDockChatTabFlyout  { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )

    // Changing custom emotes from 16x16 to 32x32
    addGlobalStyle(".emote_custom { height: 32px !important; width: 32px !important; } ");
	
    addGlobalStyle("tbody { vertical-align: bottom; }");

}
 
reFlow();
/*
.fbMercuryChatTab .fbMercuryChatTabFlyout {
bottom: 0;
height: 800px; <- Set this to chatNewHeight
width: 800px; <- set this to chatNeWidth
}
 
 
.fbMercuryChatTab .input {
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
width: 774px;} <- Set this chatNewWidth-26
*/
