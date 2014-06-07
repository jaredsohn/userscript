// ==UserScript==
// @name           R3 side player
// @namespace      http://jenpollock.ca
// @description    Moves the CBC Radio 3 player to the side of the page on blog post pages, and keeps it in a fixed position.
// @include        http://radio3.cbc.ca/blogs/*
// ==/UserScript==

// get the divs to change
span2divs = document.getElementsByClassName("span-2");
blogdiv = span2divs.item(0);
sidebardiv = span2divs.item(1);
span4divs = document.getElementsByClassName("span-4");
playerdiv = span4divs.item(0);
commentsdiv = span4divs.item(1);
anothercommentsdiv = span4divs.item(2);

// rearrange page
blogdiv.className = "span-3";
commentsdiv.className = "span-3";
anothercommentsdiv.className = "span-3";
sidebardiv.className = "span-1";
sidebardiv.id = "sidebar-right";
playerdiv.className = null;
playerdiv.id = "player-parent";
sidebardiv.insertBefore(playerdiv,sidebardiv.firstChild);

// rearrange player, fix rearranged page
var addedStyles = document.createElement("style");
addedStyles.type = "text/css";
addedStyles.textContent = ".main-content { background:black}\
#sidebar-right>* { display:none }\
#sidebar-right div#player-parent { display:block }\
div#r3player { width:201px; height:300px; position:fixed }\
#r3player #prev { top:0; left:100px }\
#r3player #next { top:0; left:150px }\
#r3player #trackDisplay { top:50px; left:0; height:59px; width:200px; background:#3b3b3b; -moz-border-radius:7px }\
#r3player #info { left:10px; top:20px }\
#r3player #controls { top:110px; left:0; height:89px; width:200px; background:#545454; -moz-border-radius:7px } \
#r3player #progressTrack { width:180px; background:#474747; -moz-border-radius:2px }\
#r3player #stream { left:32px }\
#r3player #playlist { top:45px; left:32px }\
#r3player #tracks.selector { top:46px; left:112px }\
#r3player #volumeTrack { top:65px; left:48px; background:#3a3a3a; -moz-border-radius:5px; }\
#r3player #add { top:200px; left:0 }\
#r3player #thumbUp { top:200px; left:50px }\
#r3player #shuffle { top:200px; left:100px }\
#r3player #help { top:200px; left:150px }\
#r3player #addFavourite { top:250px; left:0 }\
#r3player #thumbDown { top:250px; left:50px }\
#r3player #permalink { top:250px; left:100px }\
#r3player #mp3Stream { top:250px; left:150px }\
.span-3 .blogPost img.large { margin: 20px 0 0 100px }\
.span-3 .comment .thumbnail { width:100px }\
.span-3 .comment .postSequence { margin-top: 15px }\
.span-3 .comment .content { width:410px }\
.span-3 .postComment.wide { height:370px }\
.span-3 .postComment.wide .submitBox { height:70px }";
document.getElementsByTagName("head").item(0).appendChild(addedStyles);
