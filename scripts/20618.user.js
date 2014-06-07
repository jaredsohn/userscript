// ==UserScript==
// @name           Topic Poster
// @author         ShAfe - http://www.orkut.com/Profile.aspx?uid=13292034570265760077
// @description    This script will Post same topic in all joined communities easily, You just need to enter capatcha and press enter and it will post topic smoothly. Created by someone else and fixed by Abbas Manjothi.
// @namespace      Orkuted.com
// @include        http://www.orkut.com/*
// ==/UserScript==

var subject = "~ Join this it rocks ~";
var msg = "[b][green]Please join this community \n http://www.orkut.com/Community.aspx?cmm=38842764~ \n \n";





var credit = "[b]Invite ur friends too [/b]"; // This is by Shafe

window.addEventListener("load", function(e) {
if(document.location.href.indexOf("Communities.aspx")>=0)
{
	var anchorTags = document.getElementsByTagName('a');
	var communities = "";
	var j=0;
	for(var i=0;i<anchorTags.length-1;i++)
	{
		if(anchorTags[i].href.indexOf("Community.aspx")>=0)
		{
			if(j>0)
			{
				communities=communities+",";
			}
			communities=communities+anchorTags[i].href.split("cmm=")[1];
			j++;
		}	
	}
	GM_setValue("communities",communities);
	GM_setValue("postCount",0);
	document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
}
if(document.location.href.indexOf("CommMsgPost.aspx")>=0)
{
	GM_setValue("postCount",GM_getValue("postCount")+1);
	document.getElementById("subject").value= subject;
	document.getElementById("messageBody").value= msg + credit;
	document.location.href="javascript:_submitForm(document.forms[1], 'submit', '')"
}
if(document.location.href.indexOf("CommMsgs.aspx")>=0)
{
	if(GM_getValue("communities").split(",").length>GM_getValue("postCount"))
	{
		document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
	}
	else
	{
		alert("All the communities have been posted with the message. Thanks Shafe For This Script");
	}
}
}, false);