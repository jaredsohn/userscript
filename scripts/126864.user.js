// ==UserScript==
// @name           TF2TP "Add friend" Button
// @namespace      Rissole
// @description    Adds an "Add friend" Button next to TF2TP trades.
// @include        http://tf2tp.com/*
// @include        http://www.tf2tp.com/*
// ==/UserScript==

(function(){

var tradeElements = document.getElementsByClassName("trade");

function addButton(e)
{
	// icon
	var icon = document.createElement("img");
	icon.src = "http://cdn.steamcommunity.com/public/images/skin_1/iconAddFriend.gif";
	icon.border = "0";

	// link
	var link1 = document.createElement("a");
	link1.href = "javascript:void(0);";
	link1.onclick = function() { addFriend(e.getElementsByTagName("a")[0].href); };
	link1.appendChild(icon);
	
	var afterElement = e.getElementsByTagName("h5")[0];
	afterElement.appendChild(link1);
}

for (var i in tradeElements)
{
	var e = tradeElements[i];
	addButton(e);
}

function addFriend(tradeURL)
{
	var req = new XMLHttpRequest();
	req.open("GET", tradeURL, true);
	req.onreadystatechange = function() {
		if (req.readyState === 4)
		{
			if (req.status === 200)
			{
				var docText = req.responseText;
				var regResult = docText.match(/\/profiles\/(\d{17})/);
				if (regResult != null)
				{
					window.location = "steam://friends/add/"+regResult[1];
				}
				else
				{
					alert("Could not add friend");
				}
			}
			else
			{
				alert("Could not add friend");
			}
		}
	}
	req.send();
}

})();