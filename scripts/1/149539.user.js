// ==UserScript==
// @name        Hide Posts of Ignored Users on Lithium Forums
// @namespace   JeffersonScher & Fox Next Sports scripts
// @include     http://community*.foxsportsnext.com/t5/*
// @version     0.1
// @copyright   Copyright 2012
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @description Ignore users on Fox Sports Next forums. 
// @grant none
// ==/UserScript==

// Original script by JeffersonScher, modified by Fox Next Sports scripts.


var allusers, userwin;
if (document.querySelector("div.message-list"))


{
  // Retrieve ignored users from DOM localStorage
  if (window.localStorage)


{
    if (window.localStorage.ignoredUsers) allusers = window.localStorage.ignoredUsers;
    else getIgnoredUsers(); // kludgey at the moment
  }



  // Apply blocking
  if (allusers) 

{
    if (allusers.length > 0) doBlock();
  }



} 




else {
  if (window.location.pathname == "/t5/notes/privatenotespage/tab/ignored")


{
    var users = document.querySelectorAll(".lia-list-wide .lia-user-name-link");
    var uarray = new Array();
    for (var i=0; i<users.length; i++) uarray[i] = users[i].textContent;
    allusers = "|"+uarray.join("|")+"|";
    window.localStorage.ignoredUsers = allusers;
  }

}



// TODO - UI for the script

function doBlock()


{
  var posts = document.querySelector("div.message-list").children;
  for(var j=0; j<posts.length; j++)

{
    var un = posts[j].querySelector(".lia-user-name-link").textContent;
    if (allusers.indexOf("|"+un+"|")>-1) posts[j].style.visibility="hidden";
  }



}



function GetReplyThreadNumber() {
  var links = document.getElementsByTagName('link');
  if (links.length) {
    var x; for (x = 0; x < links.length; x++) {
      if (links[x].rel == 'canonical') {
        var pathChop = links[x].href.split('/');
        var tdpIndex = pathChop.indexOf('td-p');
        if (~tdpIndex)
          return Number(pathChop[tdpIndex + 1]);
      }
    }
  }
  return 0;
}

function MakeThreadReplyButton() {
  // Is there an active reply button? If not, give up.
  var replySpan = document.getElementsByClassName('primary-action message-reply');
  if (replySpan.length) {
    var replyLink = replySpan[0].getElementsByTagName('a');
    if (replyLink.length == 0)
      return;
  }
  else
      return;

  var replyThreadNumber = GetReplyThreadNumber();
  if (replyThreadNumber) {
    // create the new button
    var threadReplyButton = document.createElement('span');
    threadReplyButton.className = 'primary-action';
    threadReplyButton.innerHTML = '<a class="lia-button lia-button-primary" style="margin-right: 10px" id="cerise-thread-reply-'
      + replyThreadNumber + '" rel="nofollow:"><span>Show Ignored Posts</span></button>';

    // squeeze in the new one
    var bottomBar = document.getElementsByClassName("lia-menu-bar lia-menu-bar-bottom");
    if (bottomBar.length) {
      var buttonDiv = bottomBar[0].getElementsByClassName('lia-menu-bar-buttons');
      if (buttonDiv.length) {
        buttonDiv[0].style.display = ''; // div is there but typically hidden
        buttonDiv[0].appendChild(threadReplyButton);

        // The button is installed, so add an event handler.
        threadReplyButton.firstChild.addEventListener('click', DoThreadReply, true);
      }
    }
  }
}

function DoThreadReply()
{
  var posts = document.querySelector("div.message-list").children;
  for(var j=0; j<posts.length; j++)

{
    var un = posts[j].querySelector(".lia-user-name-link").textContent;
    if (allusers.indexOf("|"+un+"|")>-1) posts[j].style.visibility="visible";
  }



}


MakeThreadReplyButton();