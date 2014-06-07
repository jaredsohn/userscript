// ==UserScript==
// @name           Rename Add Friend Links
// @namespace      http://myspace.com/
// @description    Rename Add Friend Links
// @include        http://musicsearch.myspace.com/*
// @include        http://music.myspace.com/*
// @include        http://searchresults.myspace.com/*
// ==/UserScript==
var alinks = document.getElementsByTagName('a');
for (var i = 0; i < alinks.length; i++) {
    thisElement = alinks[i];
	temp = thisElement.href.split('&');
	for(var b = 0; b < temp.length; b++)
	{
		mytemp = temp[b].split('=');
		if(mytemp[0] == "friendID")
		{
			//alert(mytemp[1])
			thisElement.href = "http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID=" + mytemp[1];
			thisElement.target = "mysubmit";
		}
	}
}
