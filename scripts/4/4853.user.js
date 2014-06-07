// ==UserScript==
// @name          Forum Skin - View All TOpics PAge - manacim (egg Lovers)
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
		{thisLink.src='http://img147.imageshack.us/img147/6342/1dotcopyhl6.jpg';
		 thisLink.style.width='100';
 		 thisLink.style.height='100';}
	

}



//hide codes (self explanatory)
s= "#msft{display:none!important;}\n";
s+= "a[href*='classifieds']{display:none;}\n";








//background Code
s+= "body {background-color:#FCD707!important;margin-top:-130px!important;}\n";


//disable the white background
s+= "div table tbody tr td{background-color:#FCD707!important;}\n";


//kill the boders
s+= "div table tbody tr td div table{background-color:#9965ff!important;}\n";


//fucking hell...finally i can make it identical to BBZ..fucking long hurs to figure it out...damn..
s+= "div table tr td div table tr td td{background-color:#66ccff!important; border:3px dashed #9965ff!important;}\n";
s+= "div table tr td div table tr td td td{background-color:#66ccff!important;border:none!important;}\n";
s+= "div div table tr td table tr td { border:3px dashed #9965ff !important;}\n";




//navbar background and Headings
s+= "div div table tr td table tr td {background-color:#66ccff!important;}\n";










//navbar code
s+= ".navbar{width:792px!important;text-align:center;height:20px;font-color:black!important;}\n";













//typical links color
s+= "a{color:#9966ff!important;text-decoration:none!important;text-decoration: none!important;font-weight:bold!important;}\n";




s+= "a:hover{color:#00b6f1!important;text-decoration: none!important;}\n";




s+= "a:active {color:#9966ff!important;}\n";




s+= "a:visited {color:#9966ff!important;}\n";




s+= "a: img {border:1px!important; border-color:#9966ff!important;}\n";

s+= "a:hover img {border:1px!important; border-color:lightblue!important;}\n";










GM_addStyle(s);