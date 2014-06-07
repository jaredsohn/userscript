// ==UserScript==
// @name           Useless Spy Missions removal
// @namespace      http://userscripts.org/users/83443
// @description    Removes useless spy missions
// @include        *.ikariam.*/index.php?view=safehouseMissions*
// ==/UserScript==

// Version 1.1.1
//
// Made a much more robust and slightly better version by using some css techniques from oliezekat's Thin Views script: http://userscripts.org/scripts/show/46868
// Plus I learned some javascript data structures

// To choose which missions show up, set the values in the table below to true or false
var infos =
[
	{cssClass: 'gold', 	show: false	},	// spy treasure chamber
	{cssClass: 'resources', show: true	},	// inspect warehouse
	{cssClass: 'research', 	show: false	},	// spy out level of research
	{cssClass: 'online', 	show: true	},	// check online status
	{cssClass: 'garrison', 	show: true	},	// inspect garrison
	{cssClass: 'fleet', 	show: true	},	// observe fleet & troop movements
	{cssClass: 'message', 	show: true	},	// observe communication
	{cssClass: 'retreat', 	show: true	},	// recall spy
];

// No more edits below this line

// First take care of the gold.  We can't do gold the same way as everything else, because Ikariam has two things that use the gold class
var lis = document.getElementsByTagName('li');
var goldIndex = 0;
if (infos[0].show == false)
 	lis[goldIndex].innerHTML = "";

// Now take care of everything else	
for (var i=1; i<infos.length; ++i)
{
	if (infos[i].show == false)
		GM_addStyle("body ." + infos[i].cssClass + " { display: none; }");
}
