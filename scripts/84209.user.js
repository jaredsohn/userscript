// ==UserScript==
// @name           Makes posts more better
// @namespace      Makes posts more better
// @description    Makes the posts from the users in the "names" array much more better
// @include        http://*.forumwarz.com/discussions/view/*
// @include        http://forumwarz.com/discussions/view/*
// ==/UserScript==

var names = new Array("superannonon","James1011R");
var goodPosts = new Array("Aldo is a bad mod","Ricket is the best mod","DICKS IN MY BUTT DICKS IN MY BUTT OH LAWD DICKS IN MY BUTT","Shut up Celerysteve","<img src=http://uploads.forumwarz.com/cdn/37/075edf7c-3e9c-11df-a13b-003048db2566.gif>","Shut up Skyman","srtop it","I FUCKING DARE YOU","Good post upvoted","<img src=http://uploads.forumwarz.com/cdn/81/5b742a0a-b773-11de-b7b6-001ec94d5d3f.gif>","MILHOUSE","voted comedy option");

var namesNoSpace = new Array();
var quotePost = -1

for(var name in names) {
 var tempName = names[name];
 while(tempName.indexOf(" ") > -1) {
  tempName = tempName.slice(0,tempName.indexOf(" ")) + "%20" + tempName.slice(tempName.indexOf(" ")+1);
 }
 namesNoSpace[name] = tempName;
}

var h1 = document.getElementsByTagName("h1");
var karlKoch = new Array();

for(var i=0;i<h1.length;i++) {
  for(var nameNoSpace in namesNoSpace) {
  if(h1[i].children[0].pathname == "/profiles/" + namesNoSpace[nameNoSpace]) {
   karlKoch[karlKoch.length] = h1[i];
  }
  }
}

for(var i = 0; i<karlKoch.length;i++) {
var karl = karlKoch[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
var karledText = karl.children[1].children[1];
var karlPost = karl.nextSibling.nextSibling.children[1].children;
var myhref = karlPost[karlPost.length-1];
var karlID = myhref.href.slice(myhref.protocol.length + myhref.host.length + 25);
karledText.innerHTML = goodPosts[karlID % goodPosts.length] + "<p></p>";
 if (quotePost == -1) {
  quotePost = karlID % goodPosts.length;
 }
}

if (quotePost == -1) {
 quotePost = 0;
}

var blockQuotes = document.getElementsByTagName("blockquote");

for(var i = 0; i<blockQuotes.length;i++) {
 if(blockQuotes[i].children.length > 0) {
  for(var name in names) {
   if(blockQuotes[i].children[0].innerHTML == names[name] + " Posted:" && blockQuotes[i].children[0].tagName == "STRONG") {
    blockQuotes[i].innerHTML = "<strong>" + names[name] + " Posted:</strong><p></p><p>" + goodPosts[quotePost] + "</p>"
   }
  }
 }
}