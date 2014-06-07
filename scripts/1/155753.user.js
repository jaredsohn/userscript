// ==UserScript==
// @name          BRAVERY ALL AROUND
// @description   Replaces deleted comments with bravery.
// @match          http://*.reddit.com/*
// @include        http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        https://*.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function()
{

	var names = ["Vivalocaaa", "intermerda", "AbsolutelyPointless", "ytknows", "Baladas_Demnevanni", "Shasne", "Tdamon", "vasdefriendz", "TheSox", "Cats_and_atheists", "EatsYourBaby"];
	var bravery = ["le", "k", "negr pls", "DAE?", "LE BRAVERY", "lel", "brave", "so brave", "That's pretty brave of you.", "this", "that", "true", "I concur.", "pretty brave", "Le!", "This, coming from a man delete my son two years ago. How can you live with yourself Lucious?", "fak u, u srs"];
	if(!window.frameElement)	//(window==window.top) get script to ignore iframes
	{
	var a = document.getElementsByClassName("tagline");
		for(var i=1;i<a.length;i++)
			{
			try
				{
				keyword = names[Math.floor(Math.random()*names.length)]
				if (a[i].childNodes[1].firstChild.nodeValue == "[deleted]") 
					{
						a[i].childNodes[1].firstChild.nodeValue = keyword;
						var points = document.createElement("span");
						points.innerHTML = " " + Math.floor((Math.random()*80)+45).toString() + " points";
						a[i].insertBefore(points, a[i].childNodes[2]);
						a[i].childNodes[1].setAttribute("style","color: #369!important;text-decoration: none;font-weight: bold;");
					}
				}
			catch (err)
				{
				
				}
			}

		var a = document.getElementsByClassName("usertext-body");
		for(var i=0;i<a.length;i++)
		{
			a[i].setAttribute("style","background-color:inherit;");
		}
		var a = document.getElementsByClassName("md");
		for(var i=0;i<a.length;i++)
		{
			test = bravery[Math.floor(Math.random()*bravery.length)]
			if (a[i].childNodes[0].firstChild.nodeValue == "[deleted]") {
			a[i].childNodes[0].firstChild.nodeValue = test;
			a[i].childNodes[0].setAttribute("style","color: #000!important");
			}
		}
	}
	
})();





//function myFunction()
//{
//var newItem=document.createElement("LI")
//var textnode=document.createTextNode("Water")
//newItem.appendChild(textnode)

//var list=document.getElementById("myList")
//list.insertBefore(newItem,list.childNodes[0]);
//}



