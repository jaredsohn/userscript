// ==UserScript==
// @name           G/a/ia usernames for G/a/ia
// @namespace      JYC
// @description    Gives everyone on G/a/ia a random username from Gaia
// @include        http://boards.4chan.org/a/
// @include        http://boards.4chan.org/a/res/*
// ==/UserScript==

var MAX = 40000;

var OP = document.getElementsByClassName("postername");
var names = document.getElementsByClassName("commentpostername");

function requestID(item)
{
	// Remove this line to change tripfags/friends' names too
	if(item.innerHTML == "Anonymous")
	{
		var randomID = "http://www.gaiaonline.com/profiles/" + Math.floor(Math.random() * MAX);
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: randomID,
			onload: function(responseDetails)
			{
				var index = responseDetails.responseText.indexOf("<title>");
				if(index == -1)
					return;
				var end = responseDetails.responseText.indexOf("'", index);
				if(end == -1)
					return;
				var name = responseDetails.responseText.substring(index + 7, end);
				if(name.indexOf("General Error") != -1)
				{
					// Do it AGAIN!
					requestID(item);
					return;
				}
				
				item.textContent = name;
			}
		});
	}
}

for(var i = 0; i < OP.length; i++)
	requestID(OP[i]);
for(var i = 0; i < names.length; i++)
	requestID(names[i]);
	
document.body.addEventListener('DOMNodeInserted',
	function (e)
	{
		var target = e.target;
		if(target.nodeName == 'TABLE')
		{
			var newNames = target.getElementsByClassName("commentpostername");
			for(var i = 0; i < newNames.length; i++)
				requestID(newNames[i]);
		}
	},
	true);