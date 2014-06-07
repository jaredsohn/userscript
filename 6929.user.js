// ==UserScript==
// @name           One Click Conversations for GMail
// @namespace      http://keen.me/projects/oneclickconversations
// @description    Access recent conversations in one painless click.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==
/*

/*
### Author: Jeff Keen - http://keen.me

###	Features
  + Adds icon just to the left of sender name in list view and in message view
    + Clicking on icon takes you to the recent conversations with that user	
  + Option-clicking the icon searches for all messages from the sender's domain.

*/

const PERSON_IMAGE_OVER = "data:image/gif;base64,R0lGODlhCgAKALMAADMzM//M/9LS0mZmZrm5ue7u7v///+rq6t3d3QAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAAEALAAAAAAKAAoAAAQpMMhBh7xDGCMsPtvhTaAhXkF2HB2aEsQ4ITQyDkWNFB5e/D8PYEgcBiIAOw==";
const PERSON_IMAGE = "data:image/gif;base64,R0lGODlhCgAKAIABANXV1QAAACH5BAEAAAEALAAAAAAKAAoAAAITjIFgq7zRzotw2kurk09nn4RBAQA7";
const FIREFOX_3_STYLE =
"span.oneclick {                                                                                            " + 
"   background-image: url(" + PERSON_IMAGE + ");                                                            " + 
"   background-position: center bottom;                                                                     " + 
"   background-repeat: no-repeat;                                                                           " + 
"   padding:2px;                                                                                            " + 
"   margin-right:3px;                                                                                       " + 
"   display:inline-block;                                                                                   " + 
"   text-align:right;                                                                                       " + 
"   overflow:visible;                                                                                       " + 
"   width:8px;                                                                                              " + 
"   height:8px;                                                                                             " + 
"   position:relative;                                                                                      " + 
"}                                                                                                          " + 
"td.gL span.gI { position:relative; top:-3px!important; }                                                   " + 
"td.gL span.gI span.ik {                                                                                    " + 
"  top:3px!important;                                                                                       " + 
"}                                                                                                          " + 
"td.gL span.gI span.ik span.oneclick {                                                                      " + 
"  top:-3px!important;                                                                                      " + 
"}                                                                                                          " + 
"span.ik > span.oneclick {                                                                                  " + 
"  position:relative; top:-3px;                                                                             " + 
"}                                                                                                          " + 
"                                                                                                           " + 
"div.mF span + span.oneclick {                                                                              " + 
"  display:none; /* Buzz posts */                                                                           " + 
"}                                                                                                          " + 
"span.oneclick:hover {                                                                                      " + 
"  background-image: url(" + PERSON_IMAGE_OVER + "); " +
"}";

GM_addStyle(FIREFOX_3_STYLE);

function initialize(frame) {  
  var myEmailAddress = frame.getElementById('guser').querySelector('b').innerHTML;
  
  function jumpToConversation(e) {
    if (!e) var e = window.event;  
    console.log(e)     
    var searchterm = e.originalTarget.getAttribute('searchterm');
    if (searchterm) {
      /* Cancel the other events after this one.  This prevents gmail from loading a message from our click event. */
      e.preventDefault();
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
      if (e.altKey) {
        /* if alt/option key is down, search based on domain. */
        var terms = searchterm.split('@');
        if (terms.length > 1) {
            searchterm = "*@" + terms[1];
        }
      }
      top.location.hash = "#search/" + "from%3A" + encodeURIComponent(searchterm) + "+OR+to%3A" + encodeURIComponent(searchterm);
      return false;
    }
  }
  
  function urlHash(searchterm) {
    return "#search/" + "from%3A" + encodeURIComponent(searchterm) + "+OR+to%3A" + encodeURIComponent(searchterm);
  }

  function createClickSpan(searchterm) {
    var clickSpan = document.createElement("span");

    clickSpan.setAttribute("class", "oneclick");
    clickSpan.setAttribute("title", "View Recent Conversations With [" + searchterm + "]");
    clickSpan.setAttribute('searchterm', searchterm);
    clickSpan.textContent = " ";
    return clickSpan;
  }

  function addIcons() {
    modConversationView();
    modListView();
  }

  function modListView() {
    /* find all message objects, that haven't already been modified */      
    var messages = frame.querySelectorAll("tr.zA");
    for (i = 0; i < messages.length; i++) {
      /* Check if we have already modified this message.  This is a paranoia check.  Recursion on this thing gets ugly. */
      if (!messages[i].querySelector("span.oneclick")) {
        /* find the first email that isn't ours, corresponding to this message */
        var searchterm = messages[i].querySelector("span:not([email='" + myEmailAddress + "'])").getAttribute("email");
        if (!searchterm) { 
          searchterm = myEmailAddress;
        }

        /* Insert the span right before the sender name */
        var icon = createClickSpan(searchterm);
        var parent = messages[i].querySelector("td.yX div.yW");
        var after = parent.querySelector("span.yP, span.zF");  
        
        if (parent && after) { 
          parent.insertBefore(icon, after);
        }
      }
    }
  }
  
  function modConversationView() {
    var nodes = frame.querySelectorAll("img[jid]");
    for (i = 0; i < nodes.length; i++) {
      var parent = nodes[i].parentNode;

      if (!parent.querySelector("span.oneclick")) {
        var icon = createClickSpan(nodes[i].getAttribute('jid'));
        parent.appendChild(icon);          
      }
    }
  }
  
  addIcons();
  frame.addEventListener("DOMNodeInserted", addIcons, true);
  frame.addEventListener("DOMNodeRemoved", addIcons, true);
  frame.addEventListener("mousedown", jumpToConversation, true);
};

function initializeOnCanvasLoad() {
  if (document.getElementById("canvas_frame") && document.getElementById("canvas_frame").contentWindow.document.getElementById('guser')) {
    initialize(document.getElementById("canvas_frame").contentWindow.document);
  }
  else {
    // try again
    window.setTimeout(initializeOnCanvasLoad, 100);
  }
}

initializeOnCanvasLoad();
