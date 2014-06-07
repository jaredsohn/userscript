//Filtering script to hide unwanted content at wykop.pl site
//version 0.2 Beta
//This code is licensed under BSD Licence
//for more info visit:
//http://www.opensource.org/licenses/bsd-license.php
//
// ==UserScript==
// @name          Wykop Censor
// @description   script to hide unwanted content at wykop.pl site
// @include       http://www.wykop.pl/*
// @include       http://wykop.pl/*
// ==/UserScript==

//Define array of regexps to match link content
//You should customize it to fit Your needs
//threat rules below as examples

//links rules
var WL = Array();
//WL.push(r =/.*a\s+href=\S*service.pl.*/);
//WL.push(r =/.*a\s+href=\S*service.com.*/);

//user rules
var WU = Array();
//WU.push(r =/.*href="\/ludzie\/username".*/);

//user comment rules
var UC = Array();
//UC.push(r =/.*href="\/ludzie\/username".*/);

//etc, etc. Just copy, paste, and change service to fit unwanted service name.
//Feel free to make Your own rules as well.

var allLinks, thisLink;

allLinks = document.evaluate(
  "//h3[@class='link_title']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
  thisLink = allLinks.snapshotItem(i);
  var L = thisLink.innerHTML;
  for(r in WL){
	  if(L.match(WL[r])){
	    var w = thisLink.parentNode;
	    w.parentNode.removeChild(w);
	  }
  }
}

var allUsers, thisUser;

allUsers = document.evaluate(
  "//p[@class='link_info']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < allUsers.snapshotLength; i++) {
  thisUser = allUsers.snapshotItem(i);
  var U = thisUser.innerHTML;
  for(r in WU){
	  if(U.match(WU[r])){
	    var u = thisUser.parentNode;
	    u.parentNode.removeChild(u);
	  }
  }
}

var allComments, thisComment;

allComments = document.evaluate(
  "//p[@class='comment_info']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < allComments.snapshotLength; i++) {
  thisComment = allComments.snapshotItem(i);
  var C = thisComment.innerHTML;
  for(r in UC){
	  if(C.match(UC[r])){
	    var c = thisComment.parentNode;
	    c.parentNode.removeChild(c);
	  }
  }
}

//Anyway, it may not solve all problems. In case someone craft url using tiny.url ie.
//and You are _sure_, You won't want to read contents from that particular service, do what follows:
//
//*NIX and Linux users:
//edit /etc/hosts.conf
//add line: 
//127.0.0.1   service.pl
//or if You want something more interesting:
//216.222.200.11  service.pl
//
//Windows users should look for
//c:\windows\system32\drivers\etc\hosts
//and make same changes as above
