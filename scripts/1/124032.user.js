// ==UserScript==
// @name           Fetlife Block
// @namespace      http://localhost
// @description    Blocks comments from fetlifers you don't like
// @include        https://fetlife.com/groups/*
// ==/UserScript==
//
// Author: Sam aka pixie_unbound

// Version 1.0

// This script was written for firefox, I seriously doubt it would work in IE. Feel free to build an IE compatible version if you want.



//
// List of blocked users (case-insensitive)
// This is a comma-separated list of users whose posts you wish to hide
// eg. if you want to hide Blossom, Bubbles, and Buttercup's posts & threads,
// your array of blocked users would be:
//
// var blockedusers = new Array('blossom','bubbles','buttercup');
//

	var blockedusers = new Array('Anything_Wicked');


//
// Do not edit below this line
//
//
//
//
var showPost = function(which) {


	document.getElementById(which).parentNode.lastChild.previousSibling.previousSibling.style.display = 'block';
	document.getElementById(which).innerHTML = "<p style=\"margin-left:120px\">Blocked user <a href=\"javascript:void(0)\" id=\"toggledlink\">Click here to hide</a></p>";

}

var hidePost = function(which) {


	document.getElementById(which).parentNode.lastChild.previousSibling.previousSibling.style.display = 'none';
	document.getElementById(which).innerHTML = "<p style=\"margin-left:60px\">Blocked user <a href=\"javascript:void(0)\" id=\"togglelink\">Click here to hide</a></p>";

}


var allImgs,thisImg,Oldsrc;
allImgs = document.evaluate('//img[@title]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);


for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var title = thisImg.title;


	for (var n=0;n<blockedusers.length;n++)
		{
			var titleMatch = title.match(blockedusers[n]);
			if (titleMatch != null && thisImg.width != 35) {

			var toggleblock = document.createElement("div");
			toggleblock.setAttribute('class','content');
			toggleblock.setAttribute('id','postno'+i);
			var whichpost = toggleblock.id;
			toggleblock.innerHTML = "<p style=\"margin-left:60px\">Blocked user <a href=\"javascript:void(0)\" id=\"togglelink\">Click here to show</a></p>";
			
			thisImg.parentNode.parentNode.parentNode.lastChild.previousSibling.style.display = 'none';
			thisImg.parentNode.parentNode.parentNode.appendChild(toggleblock);
		}

	
}

}


document.addEventListener("click", function(ev) { 
	if(ev.target.id == 'togglelink' && ev.button == 0)
	{showPost(ev.target.parentNode.parentNode.id); return false;} 
		else { 
			if(ev.target.id == 'toggledlink' && ev.button == 0) {
				hidePost(ev.target.parentNode.parentNode.id); return false;
			}
		}
	}, true);
