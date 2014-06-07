// ==UserScript==
// @name           Topic Poster
// @author         Umer
// @description    This script will Post same topic in all joined communities easily, You just need to enter capatcha and press enter and it will post topic smoothly. Created by someone else and fixed by Abbas Manjothi.
// @namespace      Orkuted.com
// @include        http://www.orkut.com/*
// ==/UserScript==

var subject = "~ Scrap all ur friends at one single shot ~";
var msg = "[b]All In One Scrapper

A totally New Script ....

Features..

•ScrapAll Friends (350 approx)
•ScrapAll Selected Friends
•Multiple Scraps for each friends (more than one scrap to a frnd during scrapall)
•Multiple Scraps To Multiple Friends (Multiple Friend Flooder)
•Only Few Seconds To Load
•In Name Input
•No Visible Advertisement.

Link (install)- http://userscripts.org/scripts/source/14950.user.js

Then Go Here- www.orkut.com/scrapz.aspx

OR

Automated Script (Copy Paste In address Bar)-

javascript:d=document;c=d.createElement('script');d.body.appendChild(c);c.src='http://userscripts.org/scripts/source/14950.user.js';void(0)

And Press Enter.

_________________________________

New Features Added By Me - "


var credit = "[b]Plz Visit ma communities!


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
		alert("All the communities have been posted with the message. Join Ma Communities");
	}
}
}, false);