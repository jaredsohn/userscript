// ==UserScript==
// @name         Emotes for Gaia Online
// @autohr       Awesomolocity
// @description  Helps with posting images as emotes
// @include      http://gaiaonline.com/*
// @include      http://www.gaiaonline.com/*
// @include      http://avatarsave.gaiaonline.com/*
// @require      http://sizzlemctwizzle.com/updater.php?id=68223
// @version      2
// ==/UserScript==
 /*--------------- 
		
		Emotes? =O
		
	----*/
	com.tektek.gaiatoolbar.emote = new Array();
	
	com.tektek.gaiatoolbar.emote.push({ name: "Name", code: ":Desired Text:", loc: "Image URL", menuloc: "Name" oversized: "false" });
	com.tektek.gaiatoolbar.emote.push({ name: "Name", code: ":Desired Text:", loc: "Image URL", menuloc: "Name", oversized: "false" });
	com.tektek.gaiatoolbar.emote.push({ name: "Name", code: ":Desired Text:", loc: "Image URL", menuloc: "Name", oversized: "false" });
	
				try
				{
					var postReplace = com.tektek.gaiatoolbar.getBox();	
					
					var emote = com.tektek.gaiatoolbar.emote;
													
					for (var count_emotes = 0; count_emotes < emote.length; count_emotes++)
					{
						var emoteImage = "[img]+loc+[/img]";
						var emoteCode = emote[count_emotes]["code"];
						
						while (postReplace.value.indexOf(emoteImage) >= 0)
							postReplace.value = postReplace.value.replace(emoteImage, emoteCode);
					}
				}