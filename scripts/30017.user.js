// ==UserScript==
// @name           Open Forum Responses
// @namespace      tapuz.forum.openall
// @include        http://www.tapuz.co.il/tapuzforum/main/forumpage.asp*
// @include        http://www.tapuz.co.il/forums/main/forumpage.asp*
// @date           2008-12-26
// @version        0.3
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
	var contentBlock;
	
	for (i = 0; i < document.body.childNodes.length; i++)
	{
		contentBlock = document.body.childNodes[i];
		//GM_log("contentBlock.childNodes[i]=" + contentBlock.nodeName);
		if (contentBlock.nodeName == "DIV")
		{
			divCount++;
			if (divCount == 4)  break;
		}
	}

	for (i = 0; i < contentBlock.childNodes.length; i++)
	{
		theTable = contentBlock.childNodes[i];
		if( (theTable.nodeName == "TABLE") && (theTable.rows[0].cells[0].childNodes.length == 1))
		{
			if (theTable.rows[0].cells[0].childNodes.length == 1)
			{
				//GM_log("thatLink.nodeName=" + theTable.rows[0].cells[0].childNodes[0].nodeName);
				//GM_log("bFirstWasTagged=" + bFirstWasTagged);
				if (theTable.rows[0].cells[0].childNodes[0].nodeName == "TABLE")
				{
					if (bFirstWasTagged == false)
					{
						// give it a tag
						thatLink = theTable.rows[0].cells[0].childNodes[0];
						thatLink = thatLink.rows[0].cells[0];
						//GM_log("thatLink.nodeName=" + thatLink.nodeName);
						showMessages = "show_msg(" + x + ");"
						bFirstWasTagged = true;
					}
					else
					{
						//GM_log("theTable.rows[0].cells[0].childNodes[0].nodeName=" + theTable.rows[0].cells[0].childNodes[0].nodeName);
						showMessages += "show_msg(" + x + ");"
					}
					x++;
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
}

main();
