// ==UserScript==
// @name          Bravery Nostalgia Trip
// @namespace     http://diveintogreasemonkey.org/download/
// @description   (Much needed) Le nostalgia username changer.
// @match          http://*.reddit.com/*
// @include        http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        https://*.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function()
{

	var friends = [
			{nick:"ilovelogic", alias:"TheSox"},
			{nick:"TheSox3", alias:"TheSox"},
			{nick:"HairyRainDrop", alias:"Baladas_Demnevanni"},
			{nick:"BarbatisCollum", alias:"ytknows"},
			{nick:"spoderman_tim", alias:"Vivalocaaa"},
			{nick:"uprons", alias:"Vivalocaaa"},
			{nick:"vasdefriends", alias:"vasdefriendz"},
			{nick:"ytknows2", alias:"ytknows"},
			{nick:"TheSox33", alias:"TheSox"},
			{nick:"EatsYourBaby", alias:"AbsolutelyPointless"},
			{nick:"shadknasty", alias:"Shasne"},
			{nick:"shameful_execution", alias:"Tdamon"},
			{nick:"50shadesofbrave", alias:"intermerda"},
			];

	function getAlias(oldnick)
	{
		for(var i=0;i<friends.length;i++)if(friends[i].nick==oldnick)return friends[i].alias;
		return false;
	};
	
	if(!window.frameElement)	//(window==window.top) get script to ignore iframes
	{
		var a = document.getElementsByClassName("author"), alias;
		
		for(var i=0;i<a.length;i++)
		{
			alias = getAlias(a[i].firstChild.nodeValue);
			if(alias)a[i].firstChild.nodeValue = alias;
		}
	}
	
})();