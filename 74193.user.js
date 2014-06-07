// ==UserScript==
// @name           Mekusharim's forum pages
// @namespace      Mekusharim
// @description    Add Mekusharim's forums topics with page numbers - Now for new Mekusharim design
// @include        http:*//*mekusharim.walla.co.il/Forums/ForumDetails.aspx?ForumID=*
// @include        http:*//*mekusharim.walla.co.il/Forums/ForumsStart.aspx*
// @author		   Kendler
// ==/UserScript==

var i;
var p;

//Create Array of All HTML Tags
var allHTMLTags=document.getElementsByTagName("div");


//Loop through all tags using a for loop
for (i=0; i<allHTMLTags.length; i++) 
{
//	GM_log(allHTMLTags[i].className);

//Get all tags with the specified class name.
	if (allHTMLTags[i].className=="clearfix forum-small-topic-row-container" ||
		allHTMLTags[i].className=="clearfix forum-topic-row-container")
	{
		if (window.location.toString().indexOf("ForumsStart")==-1) 
		{
			var TopicResp = allHTMLTags[i].childNodes[1].childNodes[1].childNodes[1].childNodes[5].childNodes[0];
			var TopicLink = allHTMLTags[i].childNodes[7].childNodes[1].childNodes[1].childNodes[1].childNodes[1];
		}
		
		else
		{
			var TopicLink = allHTMLTags[i].childNodes[3].childNodes[1].childNodes[3].childNodes[1].childNodes[1];
			var TopicResp = allHTMLTags[i].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0];
		}
//		GM_log(TopicLink + " " + TopicResp.nodeValue);
//		GM_log(TopicLink);
//		GM_log(TopicResp.nodeValue);
		
		var NextElement = TopicLink.nextSibling;
			
		if (NextElement.nodeType==1) //NextElement is NOT a BLANK
		{
			NextElement = TopicLink;
		}
	
 		var LinkStr = TopicLink.href;
 		var PageNum = TopicResp.nodeValue/20;
		for (p=1;p < PageNum ;p)
		{
			p++;
 			var NextPage = document.createElement('a');
 			NextPage.innerHTML = '[' + p + '] ';
 			NextPage.href = LinkStr + '&CurrentPage=' + p;
 			NextPage.id = TopicLink.id + '_page' + p;

			TopicLink.parentNode.insertBefore(NextPage, NextElement.nextSibling);
//			
			NextElement = NextPage;
		}
	}
}