// ==UserScript==
// @name			Tibia World / House Linker / Guild Who Is On
// @namespace		http://www.tibia.com
// @description		This will link all Worlds and Houses from the Character's Page and tell who is Online or Offline in the Guild's Page
// @version			1.1
// @author			Jiwe a.k.a (Raydramon)
// @include			http://www.tibia.com/community/?subtopic=characters*
// @include			http://www.tibia.com/community/?subtopic=guilds*
//
// @history 1.1		<em>Bugfix</em>: Fixed house city regular expression which was causing an inifinite loop.
// ==/UserScript==
//
// Browser Compatibility
// 		- Firefox

/*       Global Variables       \/ */


var Data			=	Data = document.getElementsByTagName("td");

var Cities			=	["Ab'Dendriel", "Ankrahmun", "Carlin", "Darashia", "Edron", "Kazordoon",
						"Liberty Bay", "Port Hope", "Svargrond", "Thais", "Venore", "Yalahar"];

var World			=	"";

var City			=	"";

var House			=	false;

var HouseName		=	"";

var HouseId			=	"";

var Members			=	-1;

var WhoIsWorld		=	"";

var PlayerName		=	new Array();

var PlayerStatus	=	new Array();


/*       Function Calls       \/ */


// If User is on the Characters Page
if(document.location.href.match(/characters/))
{
	// Link Worlds
	SetWorld();

	// Gets the House Location
	GetHouseCity();

	// Links House - If player has one
	if(House == true)
	{
		// Gets the House Location
		GetHouseCity();
		
		// Gets the House Name
		GetHouseName();
		
		// Gets the House ID
		GetHouseId();
	}
}

// If User is Viewing the Guild Page
if(document.location.href.match(/guilds/))
{
	// Get Links to Members Character Page
	GetPlayerNames();

	// Get each Member Status & Set it
	GetPlayerStatus();
}


/*       Functions       \/ */


function SetWorld()
{
	// Links the world to its Page in WhoIsOnline
	for(i=0; i<Data.length; i++)
	{
		if(Data[i].innerHTML == "World:")
		{
			i++;
			
			World = Data[i].innerHTML;
			
			Data[i].innerHTML = "<a href='http://www.tibia.com/community/?subtopic=whoisonline&world="
			+ Data[i].innerHTML + "'>" + Data[i].innerHTML + "</a>"
		}
		
		if(Data[i].innerHTML == "House:")
		{
			House = true;
		}
	}
}

function SetHouse()
{
	// Links the house to its Page
	for(i=0; i<Data.length; i++)
	{
		if(Data[i].innerHTML == "House:")
		{
			i++;
			
			Data[i].innerHTML = "<a href='http://www.tibia.com/community/?subtopic=houses&page=view&world="
			+ World + "&town=" + City + "&houseid=" + HouseId + "'>" + HouseName + "(" + City + ")" + "</a>";
		}
	}
}

function SetPlayerStatus(x,Status)
{
	// Adds a Online[GREEN]/Offline[RED] to the Players on the Guilds Page
	var Links	=	document.getElementsByTagName('A');
	
	PlayerStatus[x] = Status;
	
	for(i=0; i<Links.length; i++)
	{
		if(Links[i].innerHTML.replace(/\&nbsp;/g, ' ') == PlayerName[x])
		{
			if(PlayerStatus[x] == 'Online')
			{
				Links[i].parentNode.innerHTML = Links[i].parentNode.innerHTML + " - " + "<b style='color: green'>" + PlayerStatus[x] + "</b>";
			}
			
			else
			{
				Links[i].parentNode.innerHTML = Links[i].parentNode.innerHTML + " - " + "<b style='color: red'>" + PlayerStatus[x] + "</b>";
			}
		}
	}
}

function GetHouseCity()
{
	// Loop through Table data on the Character's Page to find where the House is
	for(i=0; i<Data.length; i++)
	{
		if(Data[i].innerHTML == "House:")
		{
			var Exp =	new RegExp('(.*?) is', 'gi');
			
			i++;
			
			City = Exp.exec(Data[i].innerHTML);
			
			for(x=0; x<=Cities.length; x++)
			{
				if(City[1].match(Cities[x]))
				{
					City = Cities[x];
				}
			}
		}
	}
}

function GetHouseName()
{
	// Loop through Table data on the Character's Page to find the House Name
	for(i=0; i<Data.length; i++)
	{
		if(Data[i].innerHTML == "House:")
		{
			i++;
			
			var x = 0;
			
			while(Data[i].innerHTML[x] + Data[i].innerHTML[x+1] != '(' + City[0])
			{
				HouseName += Data[i].innerHTML[x];
				x++;
			}
		}
	}
}

function GetHouseId()
{
	GM_xmlhttpRequest
	({
		method: 'GET',
		url: "http://www.tibia.com/community/?subtopic=houses&world=" + World + "&town=" + City,
		onload: function(page)
		{
			// Get the DOM of the Houses Page
			var Dom		=	page.responseText.replace(/\&#160;/g, ' ');
			
			// Expression to find Houses Name
			var Exp1	=	new RegExp('<TD WIDTH=40%>(.*?)</TD>', 'gi');
			
			// Expression to find Houses ID
			var Exp2	=	new RegExp('<INPUT TYPE=hidden NAME=houseid VALUE=(.*?)>', 'gi');
			
			// Holds the House Name for Comparison
			var hName	=	"";
			
			// Holds the House ID
			var hId		=	"";
			
			var c		=		0;
			
			while((hName = Exp1.exec(Dom)) != null)
			{	
				// Count the Number of Houses
				c++;
				
				// Get Houses Names
				hName[1]	=	hName[1].replace(/<NOBR>|<\/NOBR>/gi, '');
				
				// If Houses Names match then extract House ID
				if(hName[1].replace(/\s/gi, '') == HouseName.replace(/\s/gi, ''))
				{			
					// Get House ID
					for(i=0; i<=c/2-1; i++)
					{
						hId = Exp2.exec(Dom);
					}
					
					// Set House ID
					HouseId = hId[1];
					
					// Link House
					SetHouse();
				}
			}
		}
	});
}

function GetPlayerNames()
{
	// Get the DOM of the Guilds' Page
	var Dom				=	document.documentElement.innerHTML;
	
	// Expression to find Player Names
	var Exp1			=	new RegExp('subtopic=characters&amp;name=(.*?)">', 'gi');
	
	// Expression to find the Guilds' World
	var Exp2			=	new RegExp('on (.*?) on', 'gi');
	
	var PageLinks		=	"";
	
	// Assign Player Names
	while((PageLinks = Exp1.exec(Dom)) != null)
	{
		Members++;
		
		PlayerName[Members] = PageLinks[1].replace(/\+/g, ' ');
	}
	
	// Create a link to WhoIsOnline page of the Guild's World
	WhoIsWorld = "http://www.tibia.com/community/?subtopic=whoisonline&world=" + Exp2.exec(Dom)[1];
}

function GetPlayerStatus()
{
	var x;
	
	// Get WhoIsOnline DOM
	GM_xmlhttpRequest
	({
		method: 'GET',
		url: WhoIsWorld,
		onload: function(page)
		{
			// Loop through all members
			for(x=0; x<=Members; x++)
			{
				if(page.responseText.replace(/\&nbsp;/g, ' ').match(PlayerName[x]))
				{
					// Set the Player Status to Online
					SetPlayerStatus(x,'Online');
				}
				
				else
				{
					// Set the Player Status to Offline
					SetPlayerStatus(x,'Offline');
				}
			}
		}
	});
}