// ==UserScript==
// @name           	Kongregate Precise Page Titles
// @namespace     	http://matthewammann.com
// @description   	Gives a logical title to every Kongregate webpage. No more "Kongregate: Play Free Games Online".
// @include        	http://www.kongregate.com/*
// @author			Matthew Ammann
// @version			3.0
// @date 			06/22/10
// ==/UserScript==

//Credit for the idea of the [Kongregate] appendage on game pages goes to SwornPacifist

var path = location.pathname;
var pathArray = path.split("/");
var qs = document.location.search;

if(document.title.indexOf("on Kongregate") != -1  && pathArray[1] != "games")
{
	document.title = document.title.replace("on Kongregate", "");
	
	if(document.title.indexOf("forums" != -1))
		document.title = document.title.replace("forums", "Forum");
}

if (pathArray[4] != undefined)
{
	if(pathArray[4] == "comments")
	{
		String.prototype.capitalize = function(){
			return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );};
		
		var title = pathArray[3].replace(/-/g, " ");
		document.title = "Comments for " + title.capitalize()
	}

	else if (pathArray[4] == "new" && pathArray[1] == "forums")
		document.title = "New Topic";
		
	else if (pathArray[4] == "edit") 
		document.title = document.getElementsByTagName("h1")[0].innerHTML;	
		
	else if (pathArray[4] == "statistics") 
		document.title = document.getElementsByTagName("h1")[0].innerHTML;
}

else if (pathArray[3] != undefined)
{	
	if(pathArray[1] == "games")
	{
		GM_getValue("onOption", false);

		if(GM_getValue("onOption") == true)
		{
			GM_registerMenuCommand( "Game Page titles use brackets instead of 'on Kongregate'", toggleOnOption);
			document.title = document.title.replace("Play ", "").replace(", a free online game", "");
		}
		else
		{
			GM_registerMenuCommand( "Game Page titles use 'on Kongregate' instead of brackets", toggleOnOption);
			
			if(document.title.indexOf("a free online game") != -1)
				document.title = document.title.replace("Play ", "").replace(", a free online game on ", " [") + "]";
		}
	}

	if(pathArray[3] == "badges")
	{
		var user = pathArray[2];
		document.title = user + "'s Badges";
	}
	
	else if (pathArray[3] == "card_album")
	{	
		if(qs.indexOf("card_set=1") != -1)
			document.title = pathArray[2] + "'s Card Album: Martial Artists";
			
		else if(qs.indexOf("card_set=2") != -1)
			document.title = pathArray[2] + "'s Card Album: Amazons";
			
		else if(qs.indexOf("card_set=3") != -1)
			document.title = pathArray[2] + "'s Card Album: Tiki Villagers";

		else if(qs.indexOf("card_set=4") != -1)
			document.title = pathArray[2] + "'s Card Album: Vampires";

		else if(qs.indexOf("card_set=5") != -1)
			document.title = pathArray[2] + "'s Card Album: Pirates";

		else if(qs.indexOf("card_set=0") != -1)
			document.title = pathArray[2] + "'s Card Album: General Items";
		else
			document.title = pathArray[2] + "'s Card Album";
	}

	else if(pathArray[3].indexOf("messages") != -1)
	{
		var user = pathArray[2];
	
		if (pathArray[3] == "sent_messages")
			document.title = user + "'s Sent Messages";
			
		else if (pathArray[3] == "private_messages")
			document.title = user + "'s Whispers";

		else if (pathArray[3] == "messages")
			document.title = user + "'s Shouts";
	}
	
	else if (pathArray[3] == "revenue_summary")
		document.title = "My Revenue Report";
	else if (pathArray[3] == "monitored")
		document.title = "Monitored Posts";	
	else if (pathArray[3] == "edit_profile")
		document.title = "Edit Your Profile";		
	else if (pathArray[3] == "ad_revenues")
		document.title = "My Ad Revenue";
	else if (pathArray[3] == "kred_revenues")
		document.title = "My Kred Revenue";
}

else if (pathArray[2] != undefined)
{
	if(pathArray[2] == "conduct")
		document.title = "Conduct Guidelines";

	else if(pathArray[1] == "game_groups")
	{
		if(pathArray[2] == "gregs-picks")
			document.title = "Greg's Picks";
	}
	else if (pathArray[2] == "new" && pathArray[1] == "plugs")
		document.title = "Invite A Friend";
	
	else if (pathArray[2] == "new" && pathArray[1] == "feedbacks")
		document.title = "Contact Us";
		
	else if (pathArray[2] == "games" && pathArray[1] == "forums")
		document.title = "All Game Forums";

	else if (pathArray[2] == "kongregate-news")
		document.title = "Kongregate News";

	else if(pathArray[1] == "announcements")
		document.title = document.getElementsByTagName("h2")[1].innerHTML;	
}

else if (pathArray[1] != undefined)
{	
	if(pathArray[1] == "")
		document.title = "Kongregate Homepage";

	if(pathArray[1] == "forums")
	{
		if(pathArray[2] == undefined)
			document.title = "Forums on Kongregate";
	}

	else if(pathArray[1] == "badges" && qs == "")
		document.title = "All Badges";
	
	else if(qs.indexOf("category=") != -1)
	{
		if(qs.indexOf("action") != -1)
			document.title = "Badges >> Action";
		
		else if(qs.indexOf("shooter") != -1)
			document.title = "Badges >> Shooter";
		
		else if(qs.indexOf("adventure-rpg") != -1)
			document.title = "Badges >> Adventure & RPG";
			
		else if(qs.indexOf("sports-racing") != -1)
			document.title = "Badges >> Sports & Racing";
			
		else if(qs.indexOf("multiplayer") != -1)
			document.title = "Badges >> Multiplayer";
			
		else if(qs.indexOf("strategy-defense") != -1)
			document.title = "Badges >> Strategy & Defense";
			
		else if(qs.indexOf("puzzle") != -1)
			document.title = "Badges >> Puzzle";
			
		else if(qs.indexOf("more") != -1)
			document.title = "Badges >> Music & More";
	}

	else if(pathArray[1] == "games")
	{
		if (qs.indexOf("sort=newest") != -1)
			document.title = "New Games";
		else
			document.title = "Games";
	}
	
	else if (pathArray[1] == "top-rated-games")
		document.title = "Top Rated Games";

	else if(pathArray[1] == "tutorials-games")
		document.title = "Tutorials";
	
	else if (pathArray[1] == "current_challenges")
		document.title = "Current Challenges";	
			
	else if (pathArray[1] == "contests")
		document.title = "Contests";
	
	else if (pathArray[1] == "logos")
		document.title = "Logos & Assets";
		
	else if(pathArray[1] == "collabs")
	{
		if (document.title.indexOf("Where art, music & games meet") != -1)	
			document.title = document.title.replace(": Where art, music & games meet", "");

		else if (document.title.indexOf("Explore & enjoy art") != -1)
			document.title = document.title.replace("Explore & enjoy art", "Art");

		else if (document.title.indexOf("Explore & enjoy audio clips") != -1)	
			document.title = document.title.replace("Explore & enjoy audio clips", "Sounds");
	}
	
	else if(pathArray[1] == "announcements")
		document.title = "Kongregate News";
}

function toggleOnOption()
{
	if(GM_getValue("onOption") == false)
		GM_setValue("onOption", true);
	else
		GM_setValue("onOption", false);
}