// ==UserScript==
// @name        MeerooNav
// @namespace   http://www.worldofmeeroos.com/meeroos/
// @description Restyles WWoM Meeroo Details to simplify viewing and add navigation buttons.
// @include     http://www.worldofmeeroos.com/meeroos/meeroo/*
// @include     http://www.worldofmeeroos.com/?q=meeroos/meeroo/*
// @updateURL	   https://userscripts.org/scripts/source/145297.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/145297.user.js
// @version	   1.0
// @grant none
// ==/UserScript==

headNode = document . documentElement . getElementsByTagName ("head") [0];
bodyNode = document . documentElement . getElementsByTagName ("body") [0];

linkNodeList = document . getElementsByTagName ("link");
for (i = 0; (i < linkNodeList . length); i++)
{
	if (linkNodeList [i] . getAttribute ("rel") == "shortcut icon")
	{
		icon = linkNodeList [i] . getAttribute ("href");
	}
}

offspringTable = 0;
meerooFound = 0;
meerooDateBorn = 0;
tableList = document . getElementsByTagName ("table");
for (i = 0; (i < tableList . length); i++)
{
	parentNode = tableList [i] . parentNode . parentNode;
	if (parentNode . nodeName . toLowerCase () == "div")
	{
		if (parentNode . getAttribute ("id") == "block-system-main")
		{
			if (tableList [i] . previousSibling)
			{
				offspringTable = tableList [i] . cloneNode (true);
			}
			else
			{
				meerooFound = 1;
				meerooName = tableList [i] . getElementsByTagName ("h2") [0] . childNodes [0] . data;
				meerooImage = tableList [i] . getElementsByTagName ("img") [0] . getAttribute ("src");
				pNode = tableList [i] . getElementsByTagName ("p") [0];
				meerooID = parseInt (pNode . childNodes [0] . data . split (": ") [1]);
				j = 2;
				if (pNode . childNodes [j] . data . split (": ") [0] == "Date Born")
				{
					meerooDateBorn = pNode . childNodes [j] . data . split (": ") [1];
					j += 2;
				}
				meerooStatus = pNode . childNodes [j] . data . split (": ") [1];
				meerooAge = parseFloat (pNode . childNodes [j + 2] . data . split (": ") [1]);
				meerooGeneration = parseInt (pNode . childNodes [j + 4] . data . split (": ") [1]);
				meerooBirths = parseInt (pNode . childNodes [j + 6] . data . split (": ") [1]);
				meerooRegard = parseInt (pNode . childNodes [j + 8] . data . split (": ") [1]);
				meerooLastSeen = pNode . childNodes [j + 10] . data . split (": ") [1];
				if (meerooID > 4)
				{
					meerooFatherID = parseInt (pNode . childNodes [j + 13] . getAttribute ("href") . split("\/") [3]);
					meerooFatherName = pNode . childNodes [j+13] . childNodes [0] . data;
					meerooMotherID = parseInt (pNode . childNodes [j + 16] . getAttribute ("href") . split("\/") [3]);
					meerooMotherName = pNode . childNodes [j+16] . childNodes [0] . data;
				}
			}
		}
	}
}

newHeadNode = document . createElement ("head");
newBodyNode = document . createElement ("body");

if (! meerooFound)
{
	newBodyNode . appendChild (node = document . createElement ("h1"));
	node . appendChild (document . createTextNode ("Meeroo not found."));
}
else
{
	newHeadNode . appendChild (node = document . createElement ("title"));
	node . appendChild ( document . createTextNode (meerooName + " Meeroo (" + meerooID + ")"));

	newHeadNode . appendChild (node = document . createElement ("link"));
	node . setAttribute ("type", "image/vnd.microsoft.icon");
	node . setAttribute ("rel", "shortcut icon");
	node . setAttribute ("href", icon);

	newHeadNode . appendChild(node = document . createElement ("style"));
	node . setAttribute ("type", "text/css");
	node . appendChild (document . createTextNode ("#navigate { width:100%; background:#E0E0E0; }\n"));
	node . appendChild (document . createTextNode ("#previous { width:20%; }\n"));
	node . appendChild (document . createTextNode ("#MeerooID { width:60%; font-size:30px; text-align:center; }\n"));
	node . appendChild (document . createTextNode ("#next, #label { text-align:right; }\n"));
	node . appendChild (document . createTextNode ("#MeerooName { font-size:30px; text-align:center; }\n"));
	node . appendChild (document . createTextNode ("#content { margin-left:auto; margin-right:auto; width:70%; }\n"));
	node . appendChild (document . createTextNode ("#info, #offspring { vertical-align:top; }\n"));
	node . appendChild (document . createTextNode ("#info { width:30%; }\n"));
	node . appendChild (document . createTextNode ("#details { vertical-align:top; width:512px; }\n"));

	newBodyNode . appendChild (table = document . createElement ("table"));
	table . setAttribute ("id", "navigate");
	table . appendChild (row = document . createElement ("tr"));

	row . appendChild (node = document . createElement ("td"));
	node . setAttribute ("id", "previous");
	if (meerooID > 1)
	{
		previous = meerooID - 1;
		node . appendChild (aNode = document . createElement ("a"));
		aNode . setAttribute ("href", "\/?q=meeroos/meeroo/" + previous);
		aNode . appendChild (document . createTextNode ("Previous"));
	}

	row . appendChild (node = document . createElement ("td"));
	node . setAttribute ("id", "MeerooID");
	node . appendChild (document . createTextNode ("Meeroo ID #" + meerooID));

	row . appendChild (node = document . createElement ("td"));
	node . setAttribute ("id", "next");
	{
		next = meerooID + 1;
		node. appendChild (aNode = document . createElement ("a"));
		aNode . setAttribute ("href", "\/?q=meeroos/meeroo/" + next);
		aNode . appendChild ( document . createTextNode ("Next"));
	}

	newBodyNode . appendChild (node = document . createElement ("p"));
	node . setAttribute ("id", "MeerooName");
	node . appendChild (document . createTextNode (meerooName));

	newBodyNode . appendChild (tableNode = document . createElement ("table"));
	tableNode . setAttribute ("id", "content");
	tableNode . appendChild (row = document . createElement ("tr"));

	row . appendChild (node = document . createElement ("td"));
	node . setAttribute ("id", "info");

	node . appendChild (tableNodeInfo = document . createElement ("table"));
	if (meerooID <= 4)
	{
		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Generation:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		tdNodeInfo . appendChild (document . createTextNode (meerooGeneration));

		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Births:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		tdNodeInfo . appendChild (document . createTextNode (meerooBirths));
	}
	else
	{
		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Status:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		tdNodeInfo . appendChild (document . createTextNode (meerooStatus));

		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Last Seen:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		tdNodeInfo . appendChild (document . createTextNode (meerooLastSeen));

		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Generation:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		tdNodeInfo . appendChild (document . createTextNode (meerooGeneration));

		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Regard:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		tdNodeInfo . appendChild (document . createTextNode (meerooRegard));

		if ((meerooDateBorn != "") && (meerooDateBorn != "0000-00-00 00:00:00"))
		{
			trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
			tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
			tdNodeInfo . setAttribute ("id", "label");
			tdNodeInfo . appendChild (document . createTextNode ("Date Born:"));
			tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
			tdNodeInfo . setAttribute ("id", "value");
			tdNodeInfo . appendChild (document . createTextNode (meerooDateBorn));

			trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
			tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
			tdNodeInfo . setAttribute ("id", "label");
			tdNodeInfo . appendChild (document . createTextNode ("Age:"));
			tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
			tdNodeInfo . setAttribute ("id", "value");
			tdNodeInfo . appendChild (document . createTextNode (meerooAge));

			trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
			tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
			tdNodeInfo . setAttribute ("id", "label");
			tdNodeInfo . appendChild (document . createTextNode ("Births:"));
			tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
			tdNodeInfo . setAttribute ("id", "value");
			tdNodeInfo . appendChild (document . createTextNode (meerooBirths));
		}

		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Father:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		aNodeInfo = document . createElement ("a"); tdNodeInfo . appendChild (aNodeInfo);
		aNodeInfo . setAttribute ("href", "\/?q=meeroos/meeroo/" + meerooFatherID);
		aNodeInfo . appendChild (document . createTextNode (meerooFatherName));

		trNodeInfo = document . createElement ("tr"); tableNodeInfo . appendChild (trNodeInfo);
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "label");
		tdNodeInfo . appendChild (document . createTextNode ("Mother:"));
		tdNodeInfo = document . createElement ("td"); trNodeInfo . appendChild (tdNodeInfo);
		tdNodeInfo . setAttribute ("id", "value");
		aNodeInfo = document . createElement ("a"); tdNodeInfo . appendChild (aNodeInfo);
		aNodeInfo . setAttribute ("href", "\/?q=meeroos/meeroo/" + meerooMotherID);
		aNodeInfo . appendChild (document . createTextNode (meerooMotherName));
	}

	row . appendChild (node = document . createElement ("td"));
	node . setAttribute ("id", "details");
	node . appendChild (imgNode = document . createElement ("img"));
	imgNode . setAttribute ("src", meerooImage);

	row . appendChild (node = document . createElement ("td"));
	node . setAttribute ("id", "offspring");
	if (offspringTable) node. appendChild (offspringTable);
}

document . documentElement . replaceChild (newHeadNode, headNode);
document . documentElement . replaceChild (newBodyNode, bodyNode);
