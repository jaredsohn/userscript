// ==UserScript==
// @name           Blacklist PartyPoker or any Poker site
// @namespace      Site Blocker
// @include        *
// @author         maxispin adapted from http://userscripts.org/topics/46851
// @description    Allows you to set a list of keywords in lower case to block automatically
// ==/UserScript==

var array 		= ["poker", "party poker", "partypoker"]; // Add as many word or phrases as you wish, separated with ,

for (i=0;i<array.length;i++)
{
	var re = new RegExp(array[i], "i");
	if (document.URL.match(re))                    //Check URL
	{
         var x=window.open("","_self");x.close();      // Closes window
                break;
	}

	var re = new RegExp(array[i], "i");
	if (document.title(re))                    //Check title
	{
         var x=window.open("","_self");x.close();      // Closes window
                break;
	}

}