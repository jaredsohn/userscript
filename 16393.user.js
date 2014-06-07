// ==UserScript==
// @name           Recent Post Scroller
// @author         Computer Geek
// @provided by    http://www.computergeekontheweb.blogspot.com
// @description    Recent Post Scroller
// @include        Geeks
// ==/UserScript==

function RecentPostsScrollerv2(json) 
{
			var sHeadLines;
			var sPostURL;
			var objPost;
			var sMoqueeHTMLStart;
			var sMoqueeHTMLEnd;
			var sPoweredBy;
			var sHeadlineTerminator;
			var sPostLinkLocation;
			
			
			try
			{			
			
			sMoqueeHTMLStart = "\<MARQUEE onmouseover=\"this.stop();\" onmouseout=\"this.start();\" ";			
			
			
			if( nWidth)
			{
				sMoqueeHTMLStart = sMoqueeHTMLStart + " width = \"" + nWidth + "%\"";
			}
			else
			{
				sMoqueeHTMLStart = sMoqueeHTMLStart + " width = \"100%\"";
			}

			if( nScrollDelay)
			{
				sMoqueeHTMLStart = sMoqueeHTMLStart + " scrolldelay = \"" + nScrollDelay + "\"";
			}
			if(sDirection)
			{
				sMoqueeHTMLStart = sMoqueeHTMLStart + " direction = \"" + sDirection + "\"";
				
				if(sDirection == "left" || sDirection =="right")
				{
					//For left and right directions seperate the headilnes by two spaces. 
					sHeadlineTerminator = "&nbsp;&nbsp;";
				}
				else
				{
					//For down and up directions seperate headlines by new line
					sHeadlineTerminator = "\<br/\>";
				}
			}
			if(sOpenLinkLocation =="N")
			{
				sPostLinkLocation = " target= \"_blank\" ";
			}
			else
			{
				sPostLinkLocation = " ";
			}
			
			
			sMoqueeHTMLEnd = "\</MARQUEE\>"
					
			sHeadLines = "";
			
			for(var nFeedCounter = 0; nFeedCounter < nMaxPosts; nFeedCounter++)
			{
				objPost = json.feed.entry[nFeedCounter];
               
					  
				for (var nCounter = 0; nCounter < objPost.link.length; nCounter++) 
			   	{
                	if (objPost.link[nCounter].rel == 'alternate') 
					{
                  		sPostURL = objPost.link[nCounter].href;
                  		break;
    				}
    			}
			   sHeadLines = sHeadLines + "\<b\>"+sBulletChar+"\</b\> \<a " + sPostLinkLocation + " href=\"" + sPostURL + "\">"  + objPost.title.$t + "\</a\>" + sHeadlineTerminator;
			}
			sPoweredBy = " Powered By \<a tareget =\"_blank\" href=\"http://www.computergeekontheweb.blogspot.com\"\>Computer Geek\</a\>"; 
			
			if(sDirection == "left")
			{
				//
				sHeadLines = sHeadLines + "&nbsp;" +  sPoweredBy;
			}
			else if(sDirection == "right")
			{
				sHeadLines = sPoweredBy +  "&nbsp;" + sHeadLines ;
			}
			else if(sDirection == "up")
			{
				sHeadLines = sHeadLines + "\<br/\>" +  sPoweredBy;
			}
			else
			{
				//For down and up directions seperate headlines by new line
				sHeadLines = sPoweredBy + "\<br/\>" +  sHeadLines;
			}
				
			
			document.write(sMoqueeHTMLStart + sHeadLines + sMoqueeHTMLEnd )
			
			}
			catch(exception)
			{
				alert(exception);
			}
}