//
// ==UserScript==
// @name           instapaperIt altClick
// @version			1.05
// @description    Lets you send a link to your instapaper account in the background by alt-clicking on the link.   
// @description     Make sure and change YOURUSERNAME and YOURPASSWORD appropriately. 
// @description     If you don't have a password,  change "YOURPASSWORD" to ""  (two quotation marks).
// @include        *
// @copyright   2010, ElasticThreads
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var usrNm="YOURUSERNAME",
psswrd="YOURPASSWORD";
initLinks();
function initLinks() {
	var allLinks=document.evaluate("//a[@href]",
	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(i=0;i<allLinks.snapshotLength;i++){
		thisLink=allLinks.snapshotItem(i);
		if (thisLink.hasAttribute('href') && ! thisLink.href.match(/^javascript:/i)) {
			thisLink.addEventListener('click', clickHandler, false);
		}
	}
}

function clickHandler(e) {
		if(e.altKey==1){
			e.preventDefault();
			var d = document,
			zed=d.createElement('SCR'+'IPT'),
			bob=d.body;	
			zed.setAttribute('src','https://www.instapaper.com/api/add?url='+escape(this.href)+'&auto-title=1&username='+usrNm+'&password='+psswrd);
			bob.appendChild(zed);
			this.style.color="#2e2e2e";
		}else{
		window.onclick=true;
		}
}