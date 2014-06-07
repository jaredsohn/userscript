// ==UserScript==
// @name           MediaWatchNavigate
// @namespace      Abc.net.au
// @include        http://www.abc.net.au/mediawatch/transcripts/*
// ==/UserScript==

try
{
	var aLinks = BuildLinkList();

	
	if(aLinks != null)
	{
		var i;
		var oPrevAnch = null;
		var oNextAnch = null;

		for(i = 0; i < aLinks.length; i++)
		{
			if(aLinks[i].href == window.location)
			{
				if(aLinks[i - 1] != null)
				{

					oPrevAnch = document.createElement("a");				
					oPrevAnch.href = aLinks[i - 1].href;
					oPrevAnch.appendChild(document.createTextNode("<< " + aLinks[i - 1].text));
				}

				if(aLinks[i + 1] != null)
				{

					oNextAnch = document.createElement("a");
					oNextAnch.href = aLinks[i + 1].href;
					oNextAnch.appendChild(document.createTextNode(" | " + aLinks[i + 1].text + " >>"));
				}
				
				break;
			}
		}
		
		// Find the end of the text
		var oHeadings = document.getElementsByTagName("H4");
		var oCommentHeading = null;
		var oParent = null;
		
		for(i = 0; i < oHeadings.length; i++)
		{
			oCommentHeading = oHeadings[i];
			oParent = oCommentHeading.parentNode;
			
			/*var j;
			for(j = 0; j < oCommentHeading.childNodes.length; j++)
			{
				alert(oCommentHeading.childNodes[j]);
				alert(oCommentHeading.childNodes[j].text);
			}
			
			if(oHeadings[i].text == "YOUR COMMENTS")
			{
				alert("HERE");
				oCommentHeading = oHeadings[i];
				oParent = oCommentHeading.parentNode;
				
				break;
			}*/
		}
		

		if(oCommentHeading != null)
		{
			
			if(oPrevAnch != null)
			{
				//alert("Prev Page " + oPrevAnch.href + " | " + oPrevAnch.text);
				var oTmp = oParent.insertBefore(oPrevAnch, oCommentHeading);
			}

			if(oNextAnch != null)
			{
				//alert("Next Page " + oNextAnch.href);
				var oTmp = oParent.insertBefore(oNextAnch, oCommentHeading);
			}
			
			var oBr = document.createElement("BR");
			oParent.insertBefore(oBr, oCommentHeading);
			oBr = document.createElement("BR");
			oParent.insertBefore(oBr, oCommentHeading);
		}
	}
}
catch(err)
{
	alert(err);
}

function BuildLinkList()
{
	var oRet = null;
	
	var oDiv = document.getElementById("thisepisode");
	
	if(oDiv != null)
	{
		var aLinks = oDiv.getElementsByTagName("a");
		var i;
		
		oRet = new Array();
		var nLinkCount = 0;
		for(i = 0; i < aLinks.length; i++)
		{
			if(aLinks[i].className == "read")
			{
				oRet[nLinkCount++] = aLinks[i];
			}
		}
	}
	
	if(oRet.length == 0)
	{
		oRet = null;
	}
	
	return oRet;
}
