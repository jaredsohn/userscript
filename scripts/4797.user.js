// ==UserScript==
// @name          Forum Skin - View All TOpics PAge
// @namespace     http://www.myspace.com/jimbo
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
		{thisLink.src='http://img138.imageshack.us/img138/7061/745897001lnm9.jpg';
		 thisLink.style.width='125';
 		 thisLink.style.height='25';}
	

}





//background code
s = "body{background:url(http://img146.imageshack.us/img146/4706/1zm18pztu3.jpg) center repeat-y #black!important;margin-top:-130px!important}\n";




//hide bottom links
s+= "#msft{display:none!important;}\n";





//ALL LINKS IN THAT PAGE

//navbar box
s+= ".navbar{background:#black!important; color:#009900!important; padding-top:55px!important;}\n";



//typical links color
s+= "a{color:green!important;text-decoration:none!important;text-decoration: none!important;}\n";

s+= "a:hover{color:whitek!important;text-decoration: none!important;}\n";

s+= "a:active {color:green!important;} \n";
s+= "a:visited {color:white!important;} \n";

s+= "a:hover img {-moz-opacity:.5;opacity:.5;border:none!important;}\n";





//TABLE CODES

s+= "div table tr td div table tr td table tr td table{background:black!important;}\n";
s+= "div table tr td div table tr td table tr td table tr td{background:#black!important;}\n";
s+= "div table tr td div table tr td table tr td table tr td table{background:#black!important;}\n";









//navbar table
s+= "div{background:black!important;}\n";
s+= "tr{background:#black!important;}\n";
s+= "div table tr td div table tr td table{border-left:0px!important;border-right:0px!important;border-top:0px!important;border-bottom:1px!important;border-color:#white!important;background:black!important;}\n";








































GM_addStyle(s);
