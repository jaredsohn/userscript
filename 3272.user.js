// ==UserScript==// @name         GMail Label Title Updater// @description  Updates document title to include new mail in labels, as well as inbox.// @author       Honks// @include      http*://*mail.google.com/*mail/*// ==/UserScript==

//unsafeWindow.inbox = 0;
//unsafeWindow.labels = 0;

try
{
	if (unsafeWindow.P && typeof(unsafeWindow.P) == "function")
	{
		var oldP = unsafeWindow.P;
		unsafeWindow.P = function(iframe, data) 
		{		
			if (arguments.length == 2) 
			{				hookData(iframe, data);			}			oldP.apply(iframe, arguments);
			if ((window.inbox != 0) || (window.labels != 0))
			{
				if (!window.inbox)
				{
					window.inbox = "0";
				}
				if (!window.labels)
				{
					window.labels = "0";
				}
				currentTitle = window.top.document.title;
				var leftParent = currentTitle.indexOf("(");
				var newTitle = currentTitle;
				if (leftParent != -1)
				{
					newTitle = currentTitle.substr(0, leftParent - 1);
				}
				newTitle = newTitle + " ( " + window.inbox + " / " + window.labels + " )";
				window.top.document.title = newTitle;
			}
		}	}
}
catch (error)
{
}

function hookData(iframe, data)
{
	if (data[0] == "ct")
	{
		var sigma=0;		var labellist=data[1]		for (i = 0; i < labellist.length; i++)		{		        label=labellist[i];		        sigma += label[1];		}
		window.labels = sigma;
	}
	else if (data[0] == "ds")
	{
		window.inbox = data[1][0][1];
	}
}