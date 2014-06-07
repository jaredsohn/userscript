// ==UserScript==
// @name           TSRProfilePics
// @namespace      thestudentroom.co.uk
// @description    Preview profile photo in thread view
// @include        http://www.thestudentroom.co.uk/showthread.php*
// ==/UserScript==

var allUsers = document.evaluate("//a[@class='bigusername']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var nodecount = allUsers.snapshotLength;
var userNum;
for(var i=0;i<nodecount;i++)
{
    thisUser = allUsers.snapshotItem(i);
	var thisHref=thisUser.getAttribute('href');
	userNum=thisHref.substr(thisHref.indexOf("=")+1);

    if(thisUser!=null)
    {
    	newDiv=document.createElement('div');
    	thisUser.parentNode.parentNode.parentNode.insertBefore(newDiv,null);
    	newDiv.innerHTML='<img height="50" onMouseOut="this.height=50;return;" onMouseover="this.height=300;return;" src="http://www.thestudentroom.co.uk/image.php?u=' + userNum + '&type=profile">';
    }
}


