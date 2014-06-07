// ==UserScript==
// @name           GameFAQs Spoilers
// @namespace      gfaqsspoilers
// @description    Allows for spoiler tags on GameFAQs message boards
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

/* CHANGE THIS VALUE FOR FUN COLORZ*/
var spoiledTextColor = '#bebebe';

var spoilerPattern = /\*.*?spoil.*?\*/gi;
var messages = document.getElementsByClassName('msg_body');
for (i = 0; i < messages.length; i++)
{
	var msgBody = messages[i];
	for (j = 0; j < msgBody.childNodes.length; j++)
	{
		var node = msgBody.childNodes[j];
		if(node.textContent.search(spoilerPattern) >= 0)
		{
			var newDiv = document.createElement('div');
			newDiv.style.backgroundColor = 'black';	
			newDiv.style.color = spoiledTextColor;	
			newDiv.setAttribute('onmouseover', "test(this)");
			newDiv.addEventListener("mouseover", function(){this.lastChild.style.color = spoiledTextColor;}, false);
			newDiv.addEventListener("mouseout", function(){this.lastChild.style.color = 'black';}, false);	
			var resultNode = document.createTextNode(spoilerPattern.exec(node.textContent));
			var newNode = document.createElement('p');		
			newNode.setAttribute('onmouseover', "style.color = " + spoiledTextColor);
			newNode.setAttribute('onmouseout', "style.color = 'black'");
			newNode.class = 'spoiler';
			newNode.style.backgroundColor = 'black';
			newNode.style.color = 'black';
			newNode.textContent = node.textContent.replace(spoilerPattern, "");
			newDiv.appendChild(resultNode);
			newDiv.appendChild(newNode);
			node.parentNode.replaceChild(newDiv, node);
		}
	}		
}