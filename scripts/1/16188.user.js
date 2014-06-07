// ==UserScript==
// @name           Usercripts.org Scrap All Browse Filter
// @namespace      http://diveintogreasemonkey.org/download/
// @include        *userscripts.org/scripts*
// @include        *userscripts.org/
// @description Filter out any script with scrap all in title on Userscripts.org.
// @author Ben Winston
// ==/UserScript==x

function docEval(evalString)
{
	var evaluated;
	var evaluated  = document.evaluate(
	evalString,
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	return evaluated;
}

function Ev(evalString)
{
	var evaluated  = docEval(evalString);
	var evaluatedReturn = evaluated.snapshotItem(0);
	return evaluatedReturn;
}
function containsScrapAll(searchString)
{
	if ( ( searchString.indexOf('scrap') > -1 ) && ( searchString.indexOf('all')>-1 ) )
	{
		return true;
	}
}
if(window.location.href == 'http://userscripts.org/')
{
	var areas = document.getElementsByTagName('a');
	for(var h = 0; h < areas.length; h++ ) {
		var thisArea = areas[h];
		var areaText = thisArea.innerHTML.toLowerCase();
		if ( containsScrapAll(areaText) )
		{
			var beforeBreak = thisArea.previousSibling.previousSibling;
			var afterBreak = thisArea.nextSibling;
			if(beforeBreak.tagName == 'BR')
			{
				beforeBreak.parentNode.removeChild(beforeBreak);
			}
			else if (afterBreak.tagName == 'BR')
			{
				afterBreak.parentNode.removeChild(afterBreak);
			}
			thisArea.parentNode.removeChild(thisArea);
			h--;
		}
	}
}
else
{
	var links = docEval('/html/body/div[2]/div/table/tbody/tr[*]/td[2]/a');
	for(var i=0;i<links.snapshotLength;i++)
	{
		var thisLink = links.snapshotItem(i);
		var desc = thisLink.nextSibling.nextSibling.innerHTML;
		var text = thisLink.innerHTML.toLowerCase();
		var thisTR = thisLink.parentNode.parentNode;
		if( (containsScrapAll(text)) ||  containsScrapAll(desc) )
		{
			thisTR.parentNode.removeChild(thisTR);
		}
	}
	var descriptions = docEval('/html/body/div[2]/div/table/tbody/tr[13]/td[2]/p')
}