// ==UserScript==
// @name        Hide Posts of Ignored Users on Lithium Forums
// @namespace   JeffersonScher
// @include     http://forums.lenovo.com/t5/*
// @version     0.1
// @copyright   Copyright 2012 Jefferson Scher
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @description Hide posts on Lenovo support forum (Lithium) from ignored users, 2012-09-26 PROOF OF CONCEPT ONLY!
// @grant none
// ==/UserScript==

var allusers, userwin;
if (document.querySelector("div.message-list")){
  // Retrieve ignored users from DOM localStorage
  if (window.localStorage){
    if (window.localStorage.ignoredUsers) allusers = window.localStorage.ignoredUsers;
    else getIgnoredUsers(); // kludgey at the moment
  }
  // Apply blocking
  if (allusers) {
    if (allusers.length > 0) doBlock();
  }
} else {
  if (window.location.pathname == "/t5/notes/privatenotespage/tab/ignored"){
    var users = document.querySelectorAll(".lia-list-wide .lia-user-name-link");
    var uarray = new Array();
    for (var i=0; i<users.length; i++) uarray[i] = users[i].textContent;
    allusers = "|"+uarray.join("|")+"|";
    window.localStorage.ignoredUsers = allusers;
  }
}
// TODO - UI for the script

function doBlock(){
  var posts = document.querySelector("div.message-list").children;
  for(var j=0; j<posts.length; j++){
    var un = posts[j].querySelector(".lia-user-name-link").textContent;
    if (allusers.indexOf("|"+un+"|")>-1) posts[j].style.display="none";
  }
}

function getIgnoredUsers(){
  // pop up ignored users list; can't get by AJAX at the moment
  userwin = window.open(window.location.protocol+"//forums.lenovo.com/t5/notes/privatenotespage/tab/ignored", "_blank", "width=640,height=480");
  var sEl = userwin.document.createElement("script");
  sEl.appendChild(userwin.document.createTextNode("self.blur();window.setTimeout(function(){opener.location.reload();self.close();}, 3000);"));
  userwin.document.body.appendChild(sEl);  
}
