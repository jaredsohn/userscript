//
// ==UserScript==
// @name          mu-ser block
// @namespace     http://madeupdomain.com
// @description   Specify users to block on the planet-mu forum
// @include       http://planet-mu.com/forums/*
// ==/UserScript==



var blockList = [];
var allLinks, thisLink;

if (!GM_getValue)
{
	alert("This old version of GreaseMonkey won't cut it, yo. Upgrade innit !!");
	return;
}


function initialise()
{

GM_registerMenuCommand("Block User!", callbackTrollBlock);
GM_registerMenuCommand("Clear block list", callbackTrollUnblockAll);


trollString = GM_getValue("TROLLS", "");

if (trollString.length != 0)
    blockList = trollString.split("\t");

}

function callbackTrollUnblockAll()
{
if (!confirm("Clear the block list?"))return;

blockList = [];

GM_setValue("TROLLS","");

alert("Block list has been cleared");

}


function callbackTrollBlock()
{

	var trollToBlock = getSelText().toString();

	if (!trollToBlock)
	{
		alert("Please select the user to block (highlight/select the text of their name)");
		return;
	}


	trollToBlock = trollToBlock.replace(/^\s+|\s+$/g, '');

	//trollToBlock = trollToBlock.toUpperCase();

	if (trollToBlock.length==0)
	{
		alert("Please select the user to block (highlight/select the text of their name)");
		return;
	}

	if (trollToBlock.indexOf("\r") != -1 || trollToBlock.indexOf("\n") != -1 ||
		trollToBlock.indexOf("\0") != -1 || trollToBlock.length > 32)
	{
		alert("Please select a valid user to block (highlight/select the text of their name)");
		return;

	}

	if (confirm("Sure you want to block '"+trollToBlock+"'?"))
		addToBlockList(trollToBlock);
}



function addToBlockList(userName)
{

var blockString = "";
var indext = blockList.length;

blockList.push(userName);


for (var t=0; t<blockList.length; t++)
{
	blockString += blockList[t];
	if(t<blockList.length-1)
	    blockString +="\t";
}

GM_setValue("TROLLS", blockString);

killTheTrolls();

}



function getSelText()
{
    var txt = '';
     if (window.getSelection)
    {
        txt = window.getSelection();
             }
    else if (document.getSelection)
    {
        txt = document.getSelection();
            }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
            }
    else return "";

return txt;
}



function killTheTrolls()
{


allLinks = document.evaluate(
    '//div[@class]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var x=0; x<blockList.length;x++)
{
	//alert(blockList[x]);
}


for (var i = 0; i < allLinks.snapshotLength; i++) {

var divh = allLinks.snapshotItem(i);


if (divh.className.toUpperCase() == "TOPIC")
{


	// Is this the Thread list on the main page?

	if (divh.innerHTML.indexOf("topicReplied") != -1)
	{

	// Yes....

		var children = divh.getElementsByTagName("div");


		for (var t=0; t<children.length; t++)
		{

			// Who _posted_ the thread?
			if (children[t].className.toUpperCase() == "TOPICPOSTED")
			{
				for (var g=0; g<blockList.length; g++)
				{
					if (children[t].innerHTML.indexOf(blockList[g]) != -1)
						divh.style.display='none';
				}
			}
		}
		


	} else {

	// ....No, we're inside the thread, looking at the replies


		var children = divh.getElementsByTagName("a");

		for (var t=0; t<children.length; t++)
		{
			for (var g=0; g<blockList.length; g++)
			{

			//alert("'"+children[t].innerHTML+"' <-> '"+blockList[g]+"'");

			if (children[t].innerHTML == blockList[g])
					divh.style.display='none';
			}		
		}

	}


}



}

}


initialise();
killTheTrolls();
