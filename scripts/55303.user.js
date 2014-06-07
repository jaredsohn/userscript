// ==UserScript==
// @name           Quick Link Favorites (CoH)
// @namespace      tag:stargazer.coh,2009
// @description    Puts the links of your choosing on the Quick Links nav menu item on the City of Heroes forums
// @include        http://boards.cityofheroes.com*
// @include        http://boards.cityofvillains.com*
// ==/UserScript==



/*Begin user-configuration
-------------------------------*/


//List of item names. Names should be surrounded by "" and separated by ,
var names=["Favorites:",
"Main forums",
"Dev Digest",
"Comm. Digest",
"Miscellaneous:",
"Mark Forums Read",
"Tags",
"Subscribed Threads",
"How to:",
"Use this menu"];

//List of item link targets. Links should be surrounded by "" and separated by ,
var links=["",
"/forumdisplay.php?f=547",
"/forumdisplay.php?f=673",
"/tracker.php?do=showresults&type=community&language=en",
"",
"/forumdisplay.php?do=markread",
"/tags.php",
"/subscription.php",
"",
"/showthread.php?p=2644217"];



//OPTIONAL: selects if an entry should be on a grey background (0) or a blue/red (skin dependant) background (1).
//If a complete list of colors (one color for each entry specified above) is not provided, all entries will use blue/red.
var bg_color =[0, 1, 1, 1, 0, 1, 1, 1, 0, 1];

//OPTIONAL: selects if an entry should act as a link (1) or be a plain text entry (0).
//If a complete list of types (one type for each entry specified above) is not provided, all entries will act as links.
//Plain text entries still need an entry on the links list above, but you can use ""
var is_link = [0, 1, 1, 1, 0, 1, 1, 1, 0, 1];


/*-------------------------------
End user-configuration*/




len=names.length;
if (bg_color.length!=len)
	for(var i=0;i<len;i++)
		bg_color[i]=1;

if (is_link.length!=len)
	for(var i=0;i<len;i++)
		is_link[i]=1;




var str = "<table cellpadding=\"4\" cellspacing=\"1\" border=\"0\">";
var classes=["\"thead\"","\"vbmenu_option\""];
var nav_links = document.getElementById('usercptools_menu');


   for(var i=0;i<len;i++) {
	str=str+"<tr><td class="+classes[bg_color[i]];
	if(!is_link[i]) str=str+">"+names[i]+"</td></tr>";
	else str=str+"><a href=\""+links[i]+"\">"+names[i]+"</a></td></tr>";

	}

str=str+"</table>";


nav_links.innerHTML=(str);