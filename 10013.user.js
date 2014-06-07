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
	document.getElementById("subject").value="Make Your Slow internet..SUPER FAST(MUST SEE)";
	document.getElementById("messageBody").value="Are you tired of your slow internet and downloading speed?\n\n[b][GREEN] TO MAKE YOUR INTERNET SPEED FASTER AND SMOOTHER, THEN JUST VISIT THE LINK BELOWN AND DOWNLOAD FIrFOX BROWSER\n\n [blue]Http://[RED][/RED]realfun.page.tl/FAST-INTERNET-FIRFOX.htm\n\n\n [GREEN](copy & paste the ABOVE link in adress baar)[RED]\n\nALSO THERE YOU WILL GET\n\n 1- SMS COLLECTION\n 2- MOBILE MANIA \n 3-SONGS \n\n AND MUCH MORE!n\n [blue]";
	document.location.href="javascript:submitForm(document.getElementsByTagName('tr').item(15),'submit','');"
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