// ==UserScript==
// @name          Forum Skin - View All TOpics PAge - BBZ
// @namespace     http://www.myspace.com/yayie
// @description   A Customize forum skin at View all Topics page only
// @include       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory*
// @include       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewCategory*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageBoard.previewReply*
// @exclude       http://collect.myspace.com/index.cfm?fuseaction=messageboard.posted*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewThread*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.postReply*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageBoard.previewReply*
// @exclude       http://forum.myspace.com/index.cfm?fuseaction=messageboard.posted*
// ==/UserScript==



//	Change the POST/EDIT/CANCEL/REPLY linked images
allLinks = document.evaluate('//img[@src]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if(thisLink.src=='http://x.myspace.com/images/pinsmall.gif') 
		{thisLink.src='http://img100.imageshack.us/img100/9697/domokunnkq3.gif';
		 thisLink.style.width='40';
 		 thisLink.style.height='40';}
	

}



//hide codes (self explanatory)
s= "#msft{display:none!important;}\n";
s+= "a[href*='classifieds']{display:none;}\n";








//background Code
s+= "body {background-color:#6698cb!important;margin-top:-130px!important;}\n";


//disable the white background
s+= "div table tbody tr td{background-color:#6698cb!important;}\n";


//kill the boders
s+= "div table tbody tr td div table{background-color:white!important;}\n";


//fucking hell...finally i can make it identical to BBZ..fucking long hurs to figure it out...damn..
s+= "div table tr td div table tr td td{background-color:white!important;border:4px solid black!important;}\n";
s+= "div table tr td div table tr td td td{background-color:white!important;border:none!important;}\n";
s+= "div div table tr td table tr td {border:4px solid black !important;}\n";




//navbar background and Headings
s+= "div div table tr td table tr td {background-color:white!important;}\n";










//navbar code
s+= ".navbar{width:792px!important;text-align:center;height:20px;font-color:black!important;}\n";













//typical links color
s+= "a{color:black!important;text-decoration:none!important;text-decoration: none!important;font-weight:bold!important;}\n";




s+= "a:hover{background-color:#D5E8FB!important;text-decoration: none!important;}\n";




s+= "a:active {color:black!important;}\n";




s+= "a:visited {color:black!important;}\n";




s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:none!important;}\n";











GM_addStyle(s);