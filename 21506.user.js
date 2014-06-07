// ==UserScript==
// @name           CoD4plug hax for internode
// @namespace      CoD4hax
// @description    lets you join cod4 games using the CoD4nz.net's codplug tool on the internode website
// @include        http://games.internode.on.net/gameservers.php
// ==/UserScript==
if(location.href.match("inter"))
{
window.onload = afterLoadInter();
}
else if(location.href.match("monitor"))
{
window.onload = afterLoadGame();
}

function afterLoadInter()
{
	//get to the server list tables wish they had some id values but meh
	svrlists = document.body.lastChild.lastChild.firstChild.lastChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes[3].lastChild.firstChild.childNodes[3].childNodes;
	n = -1;
	found = false;
	while(!found)
	{
		n++;
		if(!svrlists[n])
		{
			break;
		}
		
		if (svrlists[n].lastChild)
		{
			//alert(svrlists[n].lastChild.firstChild.childNodes[1].textContent);
			if(svrlists[n].lastChild.firstChild.childNodes[1].textContent.match("Duty 4"))
			{
				found = true;
				//alert(n);
			}
		}
		//alert(n);
	}

	if(found)
	{
		//alert(svrlists[n].lastChild.firstChild);
		tbleNode = svrlists[n].lastChild.firstChild;
		tbleNode = tbleNode.nextSibling
		do
		{
			if(tbleNode.childNodes[3])
			{
			var addy = document.createElement("a");
			addy.href = "cod4://"+ tbleNode.childNodes[3].childNodes[1].textContent;
			addy.appendChild(document.createTextNode("join"));
			//alert(addy);
			var tbc = document.createElement("td");
			tbc.bgColor = "#9a9a9a";
			tbleNode.appendChild(tbc);
			tbc.appendChild(addy);
			}
			tbleNode = tbleNode.nextSibling
		}
		while(tbleNode)
	}
	else
	{
		//alert("not found QQ");
	}
}

function afterLoadGame()
{
	for(i=1;i<31;i++)
	{
		temp = document.getElementById("r"+i);
		var addy = document.createElement("a");
		addy.href = "cod4://" + temp.childNodes[2].lastChild.href.match(/\d+\.\d+\.\d+\.\d+\:\d+/);
		addy.textContent = "  |join|";
		addy.style.textAlign = "right";
		temp.firstChild.appendChild(addy);
	}
}