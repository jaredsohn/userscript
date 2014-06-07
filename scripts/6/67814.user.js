// ==UserScript==
// @name           RC Groups Thread Hider V2.1
// @namespace      RRB
// @include        http://www.rcgroups.com/*
// ==/UserScript==




td = new Date();
var today = Math.floor(td.getTime()/86400000);		//get number of days since the happy 70's

var arrayThreadId = [];

if (GM_getValue("lastPurge",0) != today)			//purge entries not used in 60 days from database.
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
			if (today - threadDate < 60)
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
GM_log("arrayLenght: "+arrayLength);

if (arrayLength)					
{
	for (var i=0; i<arrayLength; i++)		
	{
		arrayThreadId[i] = GM_getValue("T"+i);		
	}
}

var threadTable = document.getElementById("threadslist");

if (!threadTable) return;

var button = document.createElement("input");	//Add undo last hide button
button.setAttribute("type", "button");
button.setAttribute("value", "Undo last hide");
button.setAttribute("height", "25px");
button.setAttribute("with", "150px");
button.setAttribute("title", "Undo last hide");
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


function updatePage()		// Hide threads to be hidden and insert buttons to the visible ones
{	
	var arrayLength = GM_getValue("arrayLength",0);	
	
	for (var row=0; row<threadTable.rows.length; row++)
	{
		GM_log("# of cells: "+threadTable.rows[row].cells.length );
		if (threadTable.rows[row].cells.length > 4 )
		{
			if (threadTable.rows[row].cells[1].hasAttribute("id"))
			{
				var threadIdAtt = threadTable.rows[row].cells[1].getAttribute("id");
				GM_log("threadIdAtt: "+threadIdAtt);
				if (threadIdAtt.substring(0,15) == "td_threadtitle_")			//is this row a thread?
				{	
					threadId = parseInt(threadIdAtt.substring(15));	
					GM_log("threadId: "+threadId);
					var index = searchArrayThreadId(threadId, arrayLength);		//check if this thread is in the list
					
					if (index != -1)
					{
						threadTable.rows[row].style.display = "none";	//hide thread
						
						GM_setValue("D"+index,today);					//timestamp last used
					}
					else
					{
						threadTable.rows[row].style.display = "";		//show thread
						
						GM_log(threadTable);
						var button = document.createElement("input");	//add hide thread button
						button.setAttribute("type", "button");
						button.setAttribute("value","X");
						button.setAttribute("height", "25px");
						button.setAttribute("with", "25px");
						button.setAttribute("title", threadId);
						button.setAttribute("id",threadId);
						button.addEventListener("click", threadButtonsCallBack, false);
						if (threadTable.rows[row].cells[0].hasChildNodes())
						{
							threadTable.rows[row].cells[0].replaceChild(button,threadTable.rows[row].cells[0].childNodes[0]);
						}
						else
						{
							threadTable.rows[row].cells[0].appendChild(button,threadTable.rows[row].cells[0].childNodes[0]);
						}
						
						delete button;
					}			
				}
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
