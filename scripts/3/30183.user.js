// ==UserScript==
// @name           Blackboard Thread Detail Tweaks
// @namespace      https://cyberactive.bellevue.edu
// @description    Various tweaks to improve display of forum threads in Blackboard
// @include        https://cyberactive.bellevue.edu/webapps/discussionboard/do/message*
// ==/UserScript==

var changeAmt = 50;

function sizeIncrease() { alterFieldSize(changeAmt) }
function sizeDecrease() { alterFieldSize(changeAmt*-1) }

// Remove header image/title
var headerNode = document.getElementsByTagName("h1")[0];

if( headerNode.className == 'pageTitle')
{
	headerNode.parentNode.removeChild(headerNode);
}

// Create +/- buttons
var selectBoxNode = document.getElementById("selectBox");
if( selectBoxNode )
{
	var selectBoxTD = selectBoxNode.getElementsByTagName("td")
	if( selectBoxTD )
	{
		// Create new 'td' element
		var tdContainer = document.createElement("td");
		tdContainer.align = 'right';

		// Create '+' button
		var sizeIncreaseButton = document.createElement("button");
		sizeIncreaseButton.id = 'sizeIncreaseButton';
		sizeIncreaseButton.addEventListener("click", sizeIncrease, true);
		sizeIncreaseButton.innerHTML = '+';
		tdContainer.appendChild(sizeIncreaseButton);

		// Create '-' button
		var sizeDecreaseButton = document.createElement("button");
		sizeDecreaseButton.id = 'sizeDecreaseButton';
		sizeDecreaseButton.addEventListener("click", sizeDecrease, true);
		sizeDecreaseButton.innerHTML = '-';
		tdContainer.appendChild(sizeDecreaseButton);

		selectBoxTD[0].parentNode.appendChild(tdContainer);
	}
}

function alterFieldSize(amt)
{
	var threadField = document.getElementById("tree");
	if( threadField )
	{
		var threadFieldHeight = parseInt(threadField.style.height);

		// If new size won't take us below 20 px, make the adjustment
		if( threadFieldHeight + amt > 20 )
		{
			threadField.style.height = threadFieldHeight + amt + 'px';
		}
	}
}
