// ==UserScript==
// @name           Slickdeals Parser
// @namespace      http://www.google.com/
// @include        http://slickdeals.net/forums/forumdisplay.php?f=9*
// ==/UserScript==

function FilterThreads()
{
	GM_log('Parsing Slickdeals threads');

	var mainTable = document.getElementById('threadslist');
	var badThreads = new Array();
	var ThreadIds = new RegExp("rating([7-9]{1}|10)");
	
	//GM_log("Array ubound: " + badThreads.length);
	//GM_log("Number of threads in table: " + mainTable.rows.length);

	//GM_log(mainTable.rows[0].innerHTML);
	for (i = 0; i < mainTable.rows.length; i++)
	{
		CurrRow = mainTable.rows[i];
		var results = CurrRow.innerHTML.match(ThreadIds);
		if (results == null && CurrRow.getAttribute("id") != "")
		{
			//GM_log("adding bad thread" + CurrRow.getAttribute("id"));
			badThreads[badThreads.length+1] = CurrRow.getAttribute("id");
		}
		else
		{
			//GM_log("Thread OK: " + CurrRow.getAttribute("id"));
		}
	}
	//GM_log(badThreads.length);
	//GM_log(badThreads.toString());
	DeleteRows(badThreads);
}

function DeleteRows(ThreadIds)
{
	var mainTable = document.getElementById('threadslist');

	for (var index in ThreadIds)
	{
		//GM_log("Deleting " + ThreadIds[index]);
		for (i = 0; i < mainTable.rows.length; i++)
		{
			if (mainTable.rows[i].getAttribute("id") == ThreadIds[index])
			{
				mainTable.deleteRow(i);
			}
		}
	}
}
setTimeout(FilterThreads, 50);
