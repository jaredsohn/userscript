// MySpace View All Friends+ v1.0
// by mrk (bbzmark{at}gmail)
//
// ==UserScript==
// @name         MySpace View All Friends+
// @namespace    http://bbzspace.com/
// @description  Extra features for the "View All Friends" page.
// @include      http://home.myspace.com/*
// ==/UserScript==

var pattern = "//div[@id=\"friendsDisplay\"]//div[@class=\"friend\"]//a[1]";
var resultLinks = document.evaluate( pattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var i=0;
while ((res = resultLinks.snapshotItem(i) ) !=null ){

	var friendID = res.href.split("friendid=");

	var addCmt = "http://comments.myspace.com/index.cfm?fuseaction=user&circuitaction=viewProfile_commentForm&friendID="+friendID[1];
	var viewPics = "http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID="+friendID[1];
	var msgUsr = "http://mail.myspace.com/index.cfm?fuseaction=mail.message&friendID="+friendID[1];


	var pattern_c = "//div[@id=\"friendsDisplay\"]//div[@class=\"friend\"]//div[@id=\"indicator\"]//span";
	var resultCell = document.evaluate( pattern_c, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var thisCell = resultCell.snapshotItem(i);

	   newMsgUsr = document.createElement('a');
	   newMsgUsr.href = msgUsr;
	   thisCell.parentNode.appendChild(newMsgUsr);
	   newMsgUsr.innerHTML = 'Message';
	   
	   breakOne = document.createElement('br');
	   thisCell.parentNode.appendChild(breakOne);

	   newAddCmt = document.createElement('a');
	   newAddCmt.href = addCmt;
	   thisCell.parentNode.appendChild(newAddCmt);
	   newAddCmt.innerHTML = 'Comment';
	   
	   breakTwo = document.createElement('br');
	   thisCell.parentNode.appendChild(breakTwo);

	   newViewPics = document.createElement('a');
	   newViewPics.href = viewPics;
	   thisCell.parentNode.appendChild(newViewPics);
	   newViewPics.innerHTML = 'View Pics';

	i++;
}
