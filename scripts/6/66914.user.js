// ==UserScript==
// @name           betting ease
// @namespace      kolCtH
// @include        *kingdomofloathing.com/bet.php*
// ==/UserScript==

moveBettingNodes();

function moveBettingNodes()
{
	var center = document.getElementsByTagName('center');
	//get space for placing node, right after MMGGuy's speech
	var nodePlacement = document.evaluate('//br/following-sibling::center', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	//check all confirm boxes
	boxes = document.evaluate('//input[@type="checkbox"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0;i<boxes.snapshotLength;i++)
	{
		boxes.snapshotItem(i).checked = true;
	}
	var div = document.createElement('div');
	var pendingBetNode = document.createElement('center');
	var addBetNode = document.createElement('div');
	var refresh = document.createElement('input')
	refresh.setAttribute('class','button')
	refresh.type = 'button'
	refresh.value = 'Refresh'
	refresh.addEventListener('click', function(){location.reload()},false)
	refreshPlacement = document.evaluate('//a[@href="betarchive.php"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	refreshPlacement.parentNode.insertBefore(document.createElement('br'),refreshPlacement.parentNode.firstChild)
	refreshPlacement.parentNode.insertBefore(refresh,refreshPlacement.parentNode.firstChild)
	pendingBetNode.appendChild(document.createElement('br'))
	var index1 = parseInt(center.length) - 1;
	var index2 = parseInt(center.length) - 2;
	var index3 = parseInt(center.length) - 3;
	//index1 is the index of the add a bet node
	var temp = center[index1];
	addBetNode.appendChild(temp);
	//index2 is the index for text of how many pending bets. 
	temp = center[index2];
	//if index2 shows the available bets, the player has no bets pending, so move text only
	if (temp.textContent.indexOf('Player') != -1)
	{
		temp = document.evaluate('//hr/following-sibling::text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		pendingBetNode.appendChild(temp);
	}
	else
	//node index shows table containing player's pending bets, move it
	{
		pendingBetNode.appendChild(temp);
		temp = document.getElementsByTagName('table')[index3];
		pendingBetNode.appendChild(temp);
   }
	document.getElementsByTagName('hr')[3].parentNode.removeChild(document.getElementsByTagName('hr')[3]);
	document.getElementsByTagName('hr')[2].parentNode.removeChild(document.getElementsByTagName('hr')[2]);
	div.appendChild(document.createElement('hr'));
	div.appendChild(addBetNode);
	div.appendChild(document.createElement('hr'));
	div.appendChild(pendingBetNode);
	div.appendChild(document.createElement('hr'));
	nodePlacement.parentNode.insertBefore(div, nodePlacement);
	document.evaluate('//input[@name="howmuch"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.focus();
}
