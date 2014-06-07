// ==UserScript==
// @name           FrontPage Role Adder
// @namespace      http://www.edwinbush.com
// @description    Adds the 5 default FrontPage roles if they were not previously created, usually for failed setups.
// @include        *fpadmdll.dll?page=addrole.htm
// @include        *fpadmdll.dll?page=role.htm
// @version 1.0.0
// ==/UserScript==

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

var hash = getUrlVars();

var time = 1;

function fillOutRoleInfo(state)
{

	for(r = 0;r < document.forms.length;r++)
	{
		var e = document.forms[r].elements;
		var stuff="";
		for(i = 0;i < e.length;i++)
		{ 
			if (e[i].type == "text")
			{ 
				e[i].value=elementValue(e[i],state);
			}
			if (e[i].type == "checkbox")
			{
				e[i].checked=elementValue(e[i],state);
			}
		} 
	}
}

function elementValue(elem,state)
{
	switch(state)
	{
		case 0:
		{
			if( elem.type == "text")
			{
				switch (elem.name)
				{ 
				case 'name':
				return 'Administrator';
				case 'description':
				return 'View, add, and change all server content; manage server settings and accounts.'
				}
			}
			else if( elem.type == "checkbox")
			{
				switch (elem.value)
				{
				case 'on':
				return "TRUE";
				case 'AuthorPages':
				return "TRUE";
				case 'ViewPages':
				return "TRUE";
				case 'SetSourceControl':
				return "TRUE";
				case 'ThemeWeb':
				return "TRUE";
				case 'BorderWeb':
				return "TRUE";
				case 'StyleSheetWeb':
				return "TRUE";
				case 'ConfigureRoles':
				return "TRUE";
				case 'CreateAccounts':
				return "TRUE";
				case 'ManageServerHealth':
				return "TRUE";
				case 'ManageUsageAnalysis':
				return "TRUE";
				case 'ManageSubweb':
				return "TRUE";
				case 'RecalcWeb':
				return "TRUE";
				}
			}
		}
		break;
		case 1:
		{
			if( elem.type == "text")
			{
				switch (elem.name)
				{ 
				case 'name':
				return 'Advanced Author';
				case 'description':
				return 'View, add, and change pages, documents, themes, and borders; recalculate hyperlinks.'
				}
			}
			else if( elem.type == "checkbox")
			{
				switch (elem.value)
				{
				case 'on':
				return "";
				case 'AuthorPages':
				return "TRUE";
				case 'ViewPages':
				return "TRUE";
				case 'SetSourceControl':
				return "";
				case 'ThemeWeb':
				return "TRUE";
				case 'BorderWeb':
				return "TRUE";
				case 'StyleSheetWeb':
				return "TRUE";
				case 'ConfigureRoles':
				return "";
				case 'CreateAccounts':
				return "";
				case 'ManageServerHealth':
				return "";
				case 'ManageUsageAnalysis':
				return "";
				case 'ManageSubweb':
				return "";
				case 'RecalcWeb':
				return "TRUE";
				}
			}
		}
		break;
		case 2:
		{
			if( elem.type == "text")
			{
				switch (elem.name)
				{ 
				case 'name':
				return 'Author';
				case 'description':
				return 'View, add, and change pages and documents.'
				}
			}
			else if( elem.type == "checkbox")
			{
				switch (elem.value)
				{
				case 'on':
				return "";
				case 'AuthorPages':
				return "TRUE";
				case 'ViewPages':
				return "TRUE";
				case 'SetSourceControl':
				return "";
				case 'ThemeWeb':
				return "";
				case 'BorderWeb':
				return "";
				case 'StyleSheetWeb':
				return "";
				case 'ConfigureRoles':
				return "";
				case 'CreateAccounts':
				return "";
				case 'ManageServerHealth':
				return "";
				case 'ManageUsageAnalysis':
				return "";
				case 'ManageSubweb':
				return "";
				case 'RecalcWeb':
				return "";
				}
			}
		}
		break;
		case 3:
		{
			if( elem.type == "text")
			{
				switch (elem.name)
				{ 
				case 'name':
				return 'Contributor';
				case 'description':
				return 'View pages and documents, view and contribute to discussions.'
				}
			}
			else if( elem.type == "checkbox")
			{
				switch (elem.value)
				{
				case 'on':
				return "";
				case 'AuthorPages':
				return "";
				case 'ViewPages':
				return "TRUE";
				case 'SetSourceControl':
				return "";
				case 'ThemeWeb':
				return "";
				case 'BorderWeb':
				return "";
				case 'StyleSheetWeb':
				return "";
				case 'ConfigureRoles':
				return "";
				case 'CreateAccounts':
				return "";
				case 'ManageServerHealth':
				return "";
				case 'ManageUsageAnalysis':
				return "";
				case 'ManageSubweb':
				return "";
				case 'RecalcWeb':
				return "";
				}
			}
		}
		break;
		case 4:
		{
			if( elem.type == "text")
			{
				switch (elem.name)
				{ 
				case 'name':
				return 'Browser';
				case 'description':
				return 'View pages and documents.'
				}
			}
			else if( elem.type == "checkbox")
			{
				switch (elem.value)
				{
				case 'on':
				return "";
				case 'AuthorPages':
				return "";
				case 'ViewPages':
				return "TRUE";
				case 'SetSourceControl':
				return "";
				case 'ThemeWeb':
				return "";
				case 'BorderWeb':
				return "";
				case 'StyleSheetWeb':
				return "";
				case 'ConfigureRoles':
				return "";
				case 'CreateAccounts':
				return "";
				case 'ManageServerHealth':
				return "";
				case 'ManageUsageAnalysis':
				return "";
				case 'ManageSubweb':
				return "";
				case 'RecalcWeb':
				return "";
				}
			}
		}
		break;
	}
}


function RoleSetupInit()
{
	GM_setValue("fpINIT", 1 );
	GM_setValue("fpUser", 0);
	if(hash['page'] == "role.htm")
	window.location= window.location.href.replace("role.htm","addrole.htm");
	else
	{
		fillOutRoleInfo(GM_getValue("fpUser"));
		GM_setValue("fpUser", (GM_getValue("fpUser") + 1));
		newr();
	}	
}

if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
} else {
	GM_registerMenuCommand( "Add roles", function() {RoleSetupInit();} );
	GM_registerMenuCommand( GM_getValue("targetScriptName", "FrontPage Role Setup Script") + " - Manual Update Check", function() {updateCheck(true);});

}

if( GM_getValue("fpINIT", -1) == 1 )
{
	//setup has been initiated.  Great.  Find out what page your on and then act appropirately.
	if(hash['page'] == "role.htm")
	{
		//your on the role page.  You want to go to the page addrole.
		//have you filled in all of the roles, lets check, if so, nothing to do but reset your variables.
		if( ( GM_getValue("fpUser", -1) < 1 ) || ( GM_getValue("fpUser", -1) == 5 ) )
		{
		// your on 5, roles have been setup.  reset yoru variables:
		GM_setValue("fpUser", 0);
		GM_setValue("fpINIT", 0);
		}
		else
		window.location= window.location.href.replace("role.htm","addrole.htm");		
	}
	else
	{
	//your on the add role page.  Add the role.
	fillOutRoleInfo(GM_getValue("fpUser"));
	GM_setValue("fpUser", (GM_getValue("fpUser") + 1));
	setTimeout( "newr();" , time * 1000 );
	}
}

function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://userscripts.org/scripts/review/42521",
				headers: {'Cache-Control': 'no-cache'},
				onload: function(result)
				{
					GM_setValue("lastUpdate", new Date().getTime() + "");
					if (result.responseText.indexOf('@version 1.0.0') == -1)
					{
						if (confirm("There is an update available for the Greasemonkey script \"FrontPage Role Adder\".\nWould you like to go to the install page now?"))
							{GM_openInTab("http://userscripts.org/scripts/source/42521.user.js");}
					}
					else if (forced)
						{alert("No update is available for \"FrontPage Role Adder\".");}
				}
			});
		}
		catch (err)
		{
			if (forced)
				{alert("An error occurred while checking for updates:\n" + err);}
		}
	}
}


