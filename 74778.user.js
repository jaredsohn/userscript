// ==UserScript==
// @name         rename_reddit_friends
// @description	 Replaces names of friended reddit users with an alias of your choice.
// @include	 http://reddit.com/*
// @include	 http://www.reddit.com/*
// ==/UserScript==

// Does not use jQuery this time

(function()
{
	//Some examples. friends is an array of {nick:"oldnick", alias:"youraliasofchoice"} pairs.
	var friends = [
			{nick:"KeyserSosa", alias:"Chris Slowe: reddit lead programmer"},
			{nick:"jedberg", alias:"Jeremy Edberg: runs entire reddit systems administration department"},
			{nick:"ketralnis", alias:"David King: reddit programmer"},
			{nick:"hueypriest", alias:"Erik Martin: reddit community manager"},
			{nick:"raldi", alias:"Mike Schiraldi: reddit programmer"},
			{nick:"spez", alias:"Steve Huffman: reddit founder"},
			{nick:"kn0thing", alias:"Alexis Ohanian: reddit founder"}
			];
	
	function getAlias(oldnick)
	{
		for(var i=0;i<friends.length;i++)if(friends[i].nick==oldnick)return friends[i].alias;
		return false;
	};
	
	if(!window.frameElement)	//(window==window.top) get script to ignore iframes
	{
		var a = document.getElementsByClassName("friend"), alias;
		
		for(var i=0;i<a.length;i++)
		{
			alias = getAlias(a[i].firstChild.nodeValue);
			if(alias)a[i].firstChild.nodeValue = alias;
		}
	}
	
})();