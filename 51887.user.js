// ==UserScript==
// @name           Monster JobSearch List
// @namespace      vgabor.com
// @description    Show salaries in the monster jobsearch list
// @include        http*://jobsearch.monster.*/Search.aspx*
// ==/UserScript==

function showSalaries(event)
{
	var allLinks, thisLink, salaryText, textNode;
	
	// pre-requisite check, we do not evaluete every one DOMNodeInserted event, just our events or when we are called without event.
	if (typeof event == "undefined" || (event.target.nodeName == 'TABLE' && event.target.innerHTML && event.target.innerHTML.search('salaryIcon') != -1))
	{
		// get all of the salary links (without event we are doing the evaluate on the document)
		allLinks = document.evaluate(
			"//a[@class='salaryIcon']",
			(typeof event == "undefined" ? document : event.target), 
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		// loop through them
		for (var i = 0; i < allLinks.snapshotLength; i++)
		{
			thisLink = allLinks.snapshotItem(i);
			
			// get the correct salary information
			salaryText = '';
		 	for (var a = 0; a < thisLink.attributes.length; a++)
			{
				if (thisLink.attributes[a].nodeName == 'onclick')
				{
					salaryText = thisLink.attributes[a].nodeValue.split('"')[1].replace("-", "");
					break;
				}
			}

			// we found salary, so replace the link with that
			if (salaryText != '')
			{
				textNode = document.createTextNode(salaryText);
				thisLink.parentNode.replaceChild(textNode, thisLink);
				textNode.parentNode.align = 'right';
			}
		}
	}
}

window.addEventListener("load", init, false);
function init()
{
	showSalaries();
	document.addEventListener("DOMNodeInserted", showSalaries, false);
}
