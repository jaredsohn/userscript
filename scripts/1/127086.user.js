// ==UserScript==
// @name           The Gear Page Emporium Thread Hider V0.1b
// @namespace      RRB
// @description    Hide threads you don't want to read again.
// @include        http://www.thegearpage.net/board/search.php?searchid=*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=6*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=7*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=22*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=33*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=42*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=77*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=60*
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=59*
// ==/UserScript==

/*
Based on  HBF Forum Thread Hider V2.1  By FunJet 

Things to implement:
* "purge all" button to clear the list of the hidden threads
* hidden threads count
AND The most desirible:
* Filtering threads  wich titles contain user input words 

*/

td = new Date();
var today = Math.floor(td.getTime()/86400000);		//get number of days since the happy 70's
const buttstyle="background: #D1D1E1; border: 1px solid #CCCCCC; font:9px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; margin: 2px 2px 2px 2px;"
var arrayThreadId = [];

if (GM_getValue("lastPurge",0) != today)			//purge entries not used in 7 days from database.
{
	var arrayLength = GM_getValue("arrayLength",0);
	if (arrayLength)
	{
		var destinationIndex = 0;
		for (var sourceIndex=0; sourceIndex<arrayLength; sourceIndex++)
		{
			var threadId = GM_getValue("T"+sourceIndex);
			GM_deleteValue("T"+sourceIndex);
			var threadDate = GM_getValue("D"+sourceIndex);
			GM_deleteValue("D"+sourceIndex);
			if (today - threadDate < 7) // Change the number to the preferable one
			{
				GM_setValue("T"+destinationIndex,threadId);
				GM_setValue("D"+destinationIndex++,threadDate);
			}
		}
		GM_setValue("arrayLength",destinationIndex);
		GM_setValue("lastPurge",today);
	}
}



var arrayLength = GM_getValue("arrayLength",0); 		//Read array of thread id's to be hidden.

if (arrayLength)					
{
	for (var i=0; i<arrayLength; i++)		
	{
		arrayThreadId[i] = GM_getValue("T"+i);		
	}
}

var threadTable = document.getElementById("threadslist");

var button = document.createElement("input");	//Add undo last hide button
button.setAttribute("type", "button");
button.setAttribute("value", "Undo");
button.setAttribute("style",buttstyle+" width:40px;");
button.setAttribute("title", "Show last hidden thread");
button.addEventListener("click", undoLastHideCallBack, false);
threadTable.rows[0].cells[0].replaceChild(button,threadTable.rows[0].cells[0].childNodes[0]);

delete button;

updatePage();

return;



function threadButtonsCallBack()
{
	var arrayLength = GM_getValue("arrayLength",0);		//insert ID of thread to be hidden to end of array

	GM_setValue("T"+arrayLength, parseInt(this.getAttribute("id")));
	arrayThreadId[arrayLength++] = parseInt(this.getAttribute("id"));
	GM_setValue("arrayLength",arrayLength);
	 
	updatePage();
	return;
}

function hidetheThreads(thIdAtt,row) // Hide threads to be hidden and insert buttons to the visible ones
{
	var arrayLength = GM_getValue("arrayLength",0);	
	if (thIdAtt.substring(0,15) == "td_threadtitle_")			//is this row a thread?
					{	
						threadId = parseInt(thIdAtt.substring(15));	
						var index = searchArrayThreadId(threadId, arrayLength);		//check if this thread is in the list
				
						if (index != -1)
						{
							threadTable.rows[row].style.display = "none";	//hide thread
							
							GM_setValue("D"+index,today);					//timestamp last used
						}
						else
						{
							threadTable.rows[row].style.display = "";		//show thread
							
							var button = document.createElement("input");	//add hide thread button
							button.setAttribute("type", "button");
							button.setAttribute("value","x");
							button.setAttribute("style",buttstyle+" width:16px;");
							button.setAttribute("title", "Thread Id="+threadId);
							button.setAttribute("id",threadId);
							button.addEventListener("click", threadButtonsCallBack, false);
	
							threadTable.rows[row].cells[0].replaceChild(button,threadTable.rows[row].cells[0].childNodes[2]);
						
							delete button;
						}	
					}
	return;
}

function updatePage()		
{	
	for (var row=0; row<threadTable.rows.length; row++)
	{
		if (threadTable.rows[row].cells.length > 4 )
		{   
			if      (threadTable.rows[row].cells[1].hasAttribute("id"))
			{
				hidetheThreads((threadTable.rows[row].cells[1].getAttribute("id")),row);
			}
			else if (threadTable.rows[row].cells[2].hasAttribute("id"))
			{ 
				hidetheThreads((threadTable.rows[row].cells[2].getAttribute("id")),row);
			}
		}
	}
	return;
}

function searchArrayThreadId(threadId, arrayLength)
{
	if (arrayLength)
	{
		for (var i=0; i<arrayLength; i++)
		{
		if (arrayThreadId[i] == threadId) return i;
		}
	}
	return -1;
}


function undoLastHideCallBack()
{
	var arrayLength = GM_getValue("arrayLength",0);
	if (arrayLength) arrayLength--;
	GM_setValue("arrayLength",arrayLength);
	
	updatePage();
	
	return
}
