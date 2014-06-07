// ==UserScript==
// @name           Kongregate AFK Color Chooser
// @namespace      http://matthewammann.com
// @description    Choose your own color for AFK users
// @include        http://www.kongregate.com/games/*
// @author         Matthew Ammann
// @version        1.1
// @date           04/16/09
// ==/UserScript==

//This is a variation on a similar script written by Ventero. You can find his scripts here: http://userscripts.org/users/82514/scripts

//alert(navigator.userAgent);

function init(){

	var dom;

	try{
		if(unsafeWindow){
			dom = unsafeWindow;
		} else {
			dom = this;
		}
	}catch(e){
		dom = this;
	}

	var holodeck = dom.holodeck;
	if(!holodeck) return;

		dom.holodeck.addChatCommand("afkcolor", function(l,n)
		{
			var k = n.match(/^\/\S+\s+([0-9a-f]{6})/i),
			z = "",
			sheet = document.styleSheets[1];
			k&&(z = "#"+k[1]);
			if (z)
			{
			
				//Step 1:  Create a loop for the sheet.ccsRules[] array
				//Step 2: Test each rule to see if it contains #kong_game_ui .user_row.away .username { color:'
				//Step 3: Delete the rule via the deleteRule() method
				//Step 4: Save the rule to greasemonkey so it will remember it on refresh
				for (i=0; i<sheet.cssRules.length; i++)
				{
					if (sheet.cssRules[i].selectorText=="#kong_game_ui .user_row.away .username")
					sheet.cssRules[i].style.color = z;
					window.setTimeout(function(){GM_setValue("kong_afk_color", z.toLowerCase());}, 0);
				}

				l.activeDialogue().displayMessage("Kong Bot", "New AFK color: "+z, {"class":"whisper received_whisper"}, {non_user: true});
			} 
			else 
			{
				l.activeDialogue().displayMessage("Kong Bot", "Not a valid color! Format is /afkcolor ###### (# = hex character)", {"class":"whisper received_whisper"}, {non_user: true})
			}
			return false;
		});
		
		holodeck._chat_commands.afkcolour = holodeck._chat_commands.afkcolor;
		
	if (navigator.userAgent.indexOf("Firefox")>=0)
	{ 
		var color = GM_getValue("kong_afk_color")||"#556B2F";
	} 
	else if (navigator.appVersion.indexOf("Chrome")==-1)
	{
		GM_getValue = function(a){};
		GM_setValue = function(a,b){};
	}
	
	sheet = document.styleSheets[1];
	sheet.insertRule('#kong_game_ui .user_row.away .username { color:' + color +';font-style: italic;}',sheet.cssRules.length);

}

setTimeout(init, 500);