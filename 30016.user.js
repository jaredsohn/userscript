// ==UserScript==
// @name           Open Communa Responses
// @namespace      tapuz.Communa.openall
// @include        http://www.tapuz.co.il/Communa/userCommunaMsges.asp*
// @date           2008-07-14
// @version        0.1
// ==/UserScript==

function main()
{
	var theTable;
	var i;
	var x = 0;
	var divCount = 0;
	var bFirstWasTagged = false;
	var showMessages = "";
	var thatLink;
	var contentBlock = document.getElementById("contentBlock");
	if (contentBlock == null)
	{
		for (i = 0; i < document.body.childNodes.length; i++)
		{
			contentBlock = document.body.childNodes[i];
			//GM_log("contentBlock.childNodes[i]=" + contentBlock.nodeName);
			if (contentBlock.nodeName == "DIV")
			{
				divCount++;
				if (divCount == 3)  break;
			}
			//if (contentBlock.hasAttribute('id'))
			//	GM_log("contentBlock.hasAttribute=" + contentBlock.id);
				
		}
		//return;
	}
	for (i = 0; i < contentBlock.childNodes.length; i++)
	{
		theTable = contentBlock.childNodes[i];
		if(theTable.nodeName == "TABLE")
		{
			if (theTable.hasAttribute('id'))
			{
				x++;
				if (bFirstWasTagged == false)
				{
					// give it a tag
					thatLink = theTable.rows[0].cells[0].childNodes[0];
					if ((thatLink == null) || (thatLink.nodeName != "TABLE"))
						continue;
					thatLink = thatLink.rows[0].cells[0];
					//GM_log("thatLink.nodeName=" + thatLink.nodeName);
					//GM_log("thatLink.innerHTML=" + thatLink.innerHTML);
					showMessages = "show_msg(" + x + ");"
					bFirstWasTagged = true;
				}
				else
				{
					showMessages += "show_msg(" + x + ");"
				}
			}
			else
			{
				if (bFirstWasTagged == true)
				{
					thatLink = thatLink.innerHTML = "<span id='hashi1' class='rColor' onclick='"
									+ showMessages 
									+ "' style='cursor: pointer;'><font face='verdana' color='#517ba3'><b>+</b></font></span>" 
									+ thatLink.innerHTML;
					bFirstWasTagged = false;
					showMessages = "";
				}
			}
		}
	}
}

main();
