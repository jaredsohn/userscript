// ==UserScript==
// @name           Google Reader Skim Purge
// @namespace      http://userscripts.org/users/intangible
// @description    Removes read item content you've scrolled past in the reader expanded view pane to keep your reader experience speedy.
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// ==/UserScript==
var intPurgeTimeout = 5000; // set the timeout in ms to run the check for elements to purge

function purgeRead()
{
	var intPastRead = 3; // how many old elements to keep

	var objCurrent = document.getElementById('current-entry');
	if (objCurrent != undefined)
	{
		var intPast = 0;
		var objP = objCurrent;
		while (intPast <= intPastRead && objP != undefined)
		{
			objP = objP.previousSibling;
			intPast++;
		}
		while (objP != undefined)
		{
			var arrClasses = objP.className.split(' ');
			var intClasses = arrClasses.length;
			var boolPurged = false;
			var boolRead = false;
			for (var i=0;i<intClasses;i++)
			{
				if (arrClasses[i] == 'read')
				{
					boolRead = true;
				}
				if (arrClasses[i] == 'purged')
				{
					boolPurged = true;
				}
			}
			if (boolRead == true && boolPurged == false)
			{
				console.log('Google Reader Skim Purge: Removing item with class of "'+objP.className+'"');
				objP.className = objP.className+' purged';
				//var objRemoves = objP.childNodes;
				var objRemoves = objP.getElementsByClassName('entry-body');
				for (var i=objRemoves.length; i > 0; i--)
				{
					objRemoves[i-1].parentNode.style.height = objRemoves[i-1].parentNode.clientHeight+'px';
					
					objRemoves[i-1].innerHTML = 'Entry body removed by Google Reader Skim Purge';
					//objRemoves[i-1].parentNode.removeChild(objRemoves[i-1]);
				}
			}
			objP = objP.previousSibling;
		}
	}
}

console.log('Google Reader Skim Purge: Initilizing purger to '+intPurgeTimeout+' millisecond interval.');
setInterval(purgeRead, intPurgeTimeout);

