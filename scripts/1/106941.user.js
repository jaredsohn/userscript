// ==UserScript==
// @name           Check seats remaining
// @namespace      Pi
// @include        *
// ==/UserScript==

var courseURL = "https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=5&dept=MATH&course=002&section=971"
var matchText = "Total Seats Remaining:";
//var matchText = "General Seats Remaining:";

function getChildrenByXPath(currentNode, xpath, CallBack)
{
	var returnArray = new Array();	
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i)) : nodesSnapshot.snapshotItem(i));

	return returnArray;
}

var alerted = false;

function checkRemainingSeats()
{
	GM_xmlhttpRequest ({
		method: "GET",
		url: courseURL,
		onload: function (response)
		{
			var container = document.createElement('div');
			container.innerHTML = response.responseText;
			children = getChildrenByXPath(container, '//td[text() = "' + matchText + '"]');
			if(children.length > 0)
			{
				if(parseInt(children[0].nextSibling.textContent, 10) > 0 && !alerted)
				{
					alerted = true;
					document.location = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&submit=Register%20Selected&wldel=MATH|002|971';
				}
				else
					setTimeout(checkRemainingSeats, 1 * 60000);
			}
		}
	});
}

checkRemainingSeats();
