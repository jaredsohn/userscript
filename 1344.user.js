// 4rthur quickreply
// version 0.5.8
// 2005-04-22
// Copyright (c) 2005, Rob Sargant, mucked about with by munkt0n, mangled by boogs, pillaged by sargant again
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "4rthur quickreply", and click Uninstall.
//
// OPERA 8 USERS
// Create a directory to hold scripts in your Opera profile folder.
// Go to (Tools > Preferences > Advanced > Content > Javascript Options)
// and enter the folder you chose in the "My JavaScript Files" input.
// Save this script into that folder, and reload the page to activate
// the script.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          4rthur quickreply
// @namespace     http://www.sargant.com
// @description   changes the reply link for instant inline replies
// @include       http://4rthur.com/board/*
// @include       http://*.4rthur.com/board/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Versions
//
// 0.1 - sargant
//         Initial script
//
// 0.2 - sargant
//         I have no idea what happened here
//
// 0.3 - munkt0n
//         Prevents more than one reply box being open, some clever
//         automatic gubbins and proper removal from DOM of old boxes
//
// 0.4 - boogs
//         Editing functionality added
//
// 0.5 - sargant
//         Edit box now inline as opposed to below, box destruction
//         function changed to be called whenever the DOM is altered.
//
// 0.5.1 - boogs
//         Link checking on URL as well as enclosed text
//         Rows on edit & reply boxes altered
//
// 0.5.2 - sargant
//         Fixes HTML character nonsense in the subject line
//
// 0.5.3 - sargant
//         Now compatible with Opera user javascripts
//
// 0.5.4 - munkt0n
//         Autolinks!	
//
// 0.5.5 - sargant
//         Additional opera compatibility.  Less reliance on string
//         chopping and more DOM orientated.
//
// 0.5.6 - munkt0n
//         Editing compatible with moderator's messages
//
// 0.5.7 - sargant
//         Compressed all box code into one function
//         Replaced code-walker with a listener event
//
// 0.5.8 - sargant
//         made the buttons pretty. ooh.

document.getElementsByTagName('style')[0].innerHTML += ".GM_quickBox {font-weight: bold; border: 1px solid #fdb; color: #c60; padding: 2px 0px 2px 14px; margin: 0px 10px 0px 0px;} .GM_quickBox:hover {border-bottom-color: #c60 } .GM_quickBox:active {position: relative; top: 1px; left: 1px;} ";
 
window.GM_4rthur_replyBox_cookieCutter = function(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

// Autolinks
// munkt0n - 17/05/05
window.GM_4rthur_autoLinks = function()
{
	msg = document.newmsg.msg.value;
	msg = msg.replace(/(\s|^)(www\.)([^.\s]([a-z0-9\-\.\/\-_%~!?=,:;&+*#])+)/g,"$1<a href=\"http://$2$3\" target=\"_blank\">$2$3</a>");
	msg = msg.replace(/(\s|^)(http:\/\/)(([a-z0-9\-\.\/\-_%~!?=,:;&+*#])+)/g,"$1<a href=\"http://$3\" target=\"_blank\">$3</a>");
	document.newmsg.msg.value=msg;
}

// Quickbox cleaning function
// Developed from GM_4rthur_removeBox
// sargant - 16/05/05 23:32
window.GM_4rthur_cleanBoxes = function()
{
  var quickBox = document.getElementById('GM_4rthur_quickBox');
  if(quickBox)
  {
    quickBox.parentNode.removeChild(quickBox);
  }
  
  var hiddenBox = document.getElementById('GM_4rthur_quickBox_hiddenBox');
  if(hiddenBox)
  {
    unhideStyle = hiddenBox.getAttribute("style").replace(/display: none;/g, "");
    hiddenBox.setAttribute("style", unhideStyle);
    hiddenBox.setAttribute("id", "");
  }
}

window.GM_4rthur_quickBox = function(clickedLink, boxType)
{
  //only allow 1 instance of reply box
  //munkt0n - 16/05/05 19:13
  //sargant - 16/05/05 23:27
  GM_4rthur_cleanBoxes();
  
  // Get some parameters to insert later
  var verifyString = GM_4rthur_replyBox_cookieCutter('password');
  var parentStyle = clickedLink.parentNode.getAttribute("style");
  // use regexp for opera compatibility
  // sargant - 17/05/05 19:41
  var parentID = clickedLink.getAttribute('href').match(/\d+$/);

  // Create the main div
  var replyBlock = document.createElement('div');
  replyBlock.setAttribute("class", "post1");
  //added quickreply id
  //munkt0n 16/05/05 19:13
  replyBlock.setAttribute("id","GM_4rthur_quickBox");
  replyBlock.setAttribute("style", "background: #fdb; margin-bottom: 0px; " + parentStyle);
  
  // Create the form block
  var formBlock = document.createElement('form');
  formBlock.setAttribute("method", "post");
  formBlock.setAttribute("name","newmsg");
  formBlock.setAttribute("id","newmsg");
  
  // Create a close link
  var closeButton = document.createElement('input');
  // remove quickreply box
  // munkt0n 16/05/05 19:39
  // make name less generic
  // sargant 16/05/05 23:33
  closeButton.setAttribute("onclick", "GM_4rthur_cleanBoxes();");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("value", "close");
  closeButton.setAttribute("class", "GM_quickBox");
  closeButton.setAttribute("style", "background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAVklEQVR42mNgGGjAiC5wJo3hPy7FJrMw1TMSqxmXIYykaMZmCAs%2ByTNpDP%2FR%2BejqmfCFASHNWA3Aphif95iICShsoY%2FTAFzOxmUIxbFAvXRAbkocBgAADUQnE4q2XPAAAAAASUVORK5CYII%3D)");

  // Create "preview" button, actually only autolinks at the mo
  // munkt0n 17/05/05 
  var previewButton = document.createElement('input');
  previewButton.setAttribute("name", "Preview");
  previewButton.setAttribute("type", "button");
  previewButton.setAttribute("value", "autolinks");
  previewButton.setAttribute("onclick", "GM_4rthur_autoLinks();");
  previewButton.setAttribute("class", "GM_quickBox");
  previewButton.setAttribute("style", "background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAOUlEQVR42mNgGAUUA0YY40waw38Y22QWQhwZYFPDiE8RNoDLcBTN2AzBJcdEtTAg1wsUB%2BIooAIAALsHGsvxgmaSAAAAAElFTkSuQmCC)");
  
  // Create generic BRs
  var br1 = document.createElement('br');
  var br3 = document.createElement('br');
  
  // Create a "verify" input
  var verifyHidden = document.createElement('input');
  verifyHidden.setAttribute("type", "hidden");
  verifyHidden.setAttribute("name", "verify");
  verifyHidden.setAttribute("value", verifyString);
  
  // Create a "parent" input
  var parentHidden = document.createElement('input');
  parentHidden.setAttribute("type", "hidden");
  parentHidden.setAttribute("value", parentID);
  
  // Create a "done" input
  var doneHidden = document.createElement('input');
  doneHidden.setAttribute("type", "hidden");
  doneHidden.setAttribute("name", "done");
  doneHidden.setAttribute("value", "1");
  
  // Create the "subject" input
  var subjectInput = document.createElement('input');
  subjectInput.setAttribute("name", "subject");
  subjectInput.setAttribute("type", "text");
  subjectInput.setAttribute("size", "83");
  subjectInput.setAttribute("style", "background: #fed; border: 1px solid #f90; margin-bottom: 5px;");
  
  // Create the "message" input
  var msgInput = document.createElement('textarea');
  msgInput.setAttribute("name", "msg");
  // id! always useful.. munkt0n 17/05/05
  msgInput.setAttribute("id", "msg");
  msgInput.setAttribute("cols", "80");
  msgInput.setAttribute("rows", "5");
  msgInput.setAttribute("style", "background: #fed; border: 1px solid #f90; margin-bottom: 5px;");
  
  // Create a submit input
  
  var submitInput = document.createElement('input');
  submitInput.setAttribute("name", "Submit");
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("class", "GM_quickBox");
  
  // set some box-specific attributes
  // sargant - 18/05/05
  
  if(boxType == "edit")
  {
    // NEW DOM METHOD STARTS HERE
    // sargant - 17/05/05
    var subject = clickedLink.parentNode.getElementsByTagName('b')[0].innerHTML;
    
    var postBodyStart = clickedLink.parentNode.innerHTML.toLowerCase().indexOf('<br');
    var postBodyEnd = clickedLink.parentNode.innerHTML.toLowerCase().lastIndexOf('<b');
    var postBodyString = clickedLink.parentNode.innerHTML.substring(postBodyStart + 6, postBodyEnd - 6);
   
    postBodyString = postBodyString.replace(/\s+/g, " ");
    postBodyString = postBodyString.replace(/(<br( \/|\/)?>)/gi, "\n");
    // END NEW DOM METHOD
   
    // Hide the original box
    clickedLink.parentNode.setAttribute("style", "display: none; " + parentStyle);
    clickedLink.parentNode.setAttribute("id", "GM_4rthur_quickBox_hiddenBox");
   
    // HTML specialchard break subject - quick fix
    // sargant 17/05/05 11:42
    subject = subject.replace(/&amp;/gi, "&");
    subject = subject.replace(/&gt;/gi, ">");
    subject = subject.replace(/&lt;/gi, "<");
    
    subjectInput.value = subject;
    submitInput.setAttribute("style", "background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAeElEQVR42mNgoBAwwhhn0hj%2B41JkMouBEVneZBZCHwMhA9DF0flM2DTAMC7DsFpGrgtY8GnA5ld0MZRARJdEMuwrAwMDNzaDWAg4%2BbXJLAYxfGpY8DkRW6Chu5KFmIDEGu%2FoBmBTRLIL8KVEgi7ABwbWBfgyGVUAABXtRRM%2FWxHxAAAAAElFTkSuQmCC)");
    msgInput.value = postBodyString;
    
    submitInput.value = "quickEdit";
    
    formBlock.setAttribute("action", "edit.html");
    parentHidden.setAttribute("name", "msgid");
  }
  
  if(boxType == "reply")
  {
    submitInput.value = "quickReply";
    submitInput.setAttribute("style", "background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAARElEQVR42mNgGPKAEZlzJo3hP4xtMgtVDhdgotQF9DEA2WtkuwCXIYzE2oQrcEkOA3RLGEnxLynRi2EoMd4jKxaGAQAABHkWNEtPISAAAAAASUVORK5CYII%3D)");
    formBlock.setAttribute("style", "margin-left: 35px;");
    formBlock.setAttribute("action", "post.html");
    parentHidden.setAttribute("name", "parent");
  }
  
  // Stick in the objects
  formBlock.appendChild(verifyHidden);
  formBlock.appendChild(parentHidden);
  formBlock.appendChild(doneHidden);
  formBlock.appendChild(subjectInput);
  formBlock.appendChild(br1);
  formBlock.appendChild(msgInput);
  formBlock.appendChild(br3);
  formBlock.appendChild(submitInput); 
  formBlock.appendChild(previewButton);
  formBlock.appendChild(closeButton);
  replyBlock.appendChild(formBlock);
  
  clickedLink.parentNode.parentNode.insertBefore(replyBlock, clickedLink.parentNode.nextSibling);
}

// Use a listener to capture user clicks instead of walking the code
// A lot faster and a lot more efficient
// sargant - 18/05/05
window.document.addEventListener('click', function(event)
{
  var eventCaptured = false;
  
  if(event.target.innerHTML == 'reply' && event.target.href.indexOf("4rthur.com/board/post.html") != -1)
  {
    GM_4rthur_quickBox(event.target, "reply");
    eventCaptured = true;
  }
  if(event.target.innerHTML == 'edit' && event.target.href.indexOf("4rthur.com/board/edit.html") != -1)
  {
    GM_4rthur_quickBox(event.target, "edit");
    eventCaptured = true;
  }
  
  if(eventCaptured)
  {
    event.stopPropagation();
    event.preventDefault();
  }
}, true);