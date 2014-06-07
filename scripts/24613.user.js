// ==UserScript==
// @name          Post All Communities
// @namespace     http://cyberneticz.blogspot.com
// @description   Post a message in all the communities
// @include       http://www.orkut.com/*

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
	document.getElementById("Download some compressed files").value="Test";
	document.getElementById("<b>download kaspersky inter net security suite in just 6mb\r\n rapidshare.com/files/99647703/Kaspersky_Lab.exe \r\n sownload office 2006 in just 1.5 mb \r\n rapidshare.com/files/100154130/office_2006.kgb\r\n download mozilla thunderbird in 6mb \r\n rapidshare.com/files/99650235/Mozilla_Thunderbird.exe\r\n put http before the links</b>").value="Test Message. Ignore This";
			var form = document.forms[1];
		form.action=document.location.href+"&Action.submit=Submit+Query";
		form.submit();
		/*
	document.location.href="javascript:submitForm(document.getElementsByTagName('tr').item(15),'submit','');"*/
}
if(document.location.href.indexOf("CommMsgs.aspx")>=0)
{
	if(GM_getValue("communities").split(",").length>GM_getValue("postCount"))
	{
		document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
	}
	else
	{
		alert("All the communities have been posted with the message");
	}
}
}, false);