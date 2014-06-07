// ==UserScript==
// @name          Custom -blam!-s
// @namespace     Custom -blam!-s
// @description   ETS was tired of -blam!-.
// @include       http://*bungie.net/fanclub/315885*
// ==/UserScript==

var numberMemes = 4;
var memes = new Array(numberMemes);

memes[0] = "blame Bradllez";
memes[1] = "blarg";
memes[2] = "flaps"
memes[3] = "Dog55 is aweshome... I heard"
memes[4] = "Elites rule... dog drulez"

function PickRandomMeme() {
    var rnd = Math.floor(Math.random() * numberMemes);
    return memes[rnd];
}


var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++)
	{
	if(divArray[i].getAttribute("class") == "postbody")
		{
		if(!(divArray[i].innerHTML.match(/-blam\!-/gi))){}
		else
			{
			var splits = new Array();
			splits = divArray[i].innerHTML.split("-blam!-");
			var newstr = "";
			for (var j = 0; j<splits.length; j++)
				{
				if(j > 0)
					{
					newstr = newstr+"-"+PickRandomMeme()+"!-";
					}
				newstr = newstr+splits[j];
				}
			divArray[i].innerHTML = newstr;
			}
		}
	}
